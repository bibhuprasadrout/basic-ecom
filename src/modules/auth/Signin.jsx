import { useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/Constants";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { useDispatch } from "react-redux";
import { getCart } from "../../utils";
/* Explanation: This import block shows the typical dependencies of an authentication screen in a React SPA.`useCallback` is a React hook used to create a stable function reference between renders; this matters when you pass handlers into deeply nested components or when you want to avoid re-creating functions unnecessarily (it’s a performance/consistency tool, not a “must” for correctness). `axios` is an HTTP client used to call your backend API. `BASE_URL` is a constant that centralizes your API server address, which is useful because you can change environments (local, staging, prod) without rewriting every request. From React Router, `useNavigate` gives you imperative navigation (go to a route after an action), while `Navigate` is declarative navigation (render a redirect). `Link` creates SPA-friendly anchors that change the URL without a full page reload. `useAuth` is your app’s custom hook that reads the auth context (provided by `AuthProvider`), which is how the UI knows whether the user is already logged in and how it can update login status after a successful sign-in. */
const Signin = () => {
  const navigate = useNavigate();
  const authValues = useAuth();
  const { setAuth } = authValues;
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const user = { email: data.get("email"), password: data.get("password") };
      // const user = {
      //   email: "boby@laso.com",
      //   password: "Bobylaso1!",
      // };
      try {
        const res = await axios({
          method: "post",
          baseURL: BASE_URL,
          url: "signin",
          data: user,
          withCredentials: true,
        });
        // 1. Tell the app the user is logged in
        setAuth(() => res.data.success);

        // 2. NEW: Fetch their cart from the backend and load it into Redux.
        // We use 'await' so we ensure the cart is fetched before we navigate away.
        await dispatch(getCart());
        navigate("/profile", { replace: true });
      } catch (err) {
        console.log("Sign In err:", err);
      }
    },
    [navigate, setAuth, dispatch],
  );
  /* Explanation: This block is the “form submission pipeline” for signing in and it ties together browser concepts, React concepts, and backend concepts.`e.preventDefault()` stops the browser’s default form behavior (a full page reload submitting to the server). In an SPA, we want to stay on the same HTML document and handle the request with JavaScript so routing/state stay alive. `new FormData(e.currentTarget)` reads the form inputs by their `name` attributes; using `currentTarget` matters because `target` can be the button that triggered the submit event, while `currentTarget` is guaranteed to be the `<form>` element that owns the fields. We then build a `user` object (email/password) which becomes the JSON request body sent to your backend. The `axios` call uses `method: "post"` because credentials should not be placed in the URL (POST body is the standard approach). `baseURL` + `url: "signin"` forms the final endpoint, for example `http://localhost:PORT/signin` depending on your constants. After the backend replies, `setAuth(() => res.data.success)` updates your auth context so the rest of the app (Navbar, guards, etc.) can immediately reflect “logged in” state without a refresh. Finally `navigate("/profile", { replace: true })` redirects the user to a protected page. The `replace` option updates browser history so Back doesn’t send the user right back to the sign-in form, which is usually better UX. A production-quality version typically adds user-facing error messages (invalid credentials), disables the button while the request is in flight, and stores session info (cookie or token) depending on your backend strategy. */
  const { auth, loading } = authValues;
  if (loading) return <div>Loading...</div>;
  if (auth) return <Navigate to='/profile' replace={true} />;
  /* Explanation: This block is a simple “route guard” at the page level.It prevents confusing UX where a signed-in user can still see the sign-in form. `loading` exists because auth is often determined asynchronously (for example, validating a cookie by calling `/auth/profile`); while that’s happening, we avoid rendering the form. If `auth` is already true, we redirect the user to `/profile` immediately. This guard works together with your `AuthUser` guard: `AuthUser` protects private pages; this local guard protects the public sign-in page from logged-in users. */
  return (
    <div className='signin-page flex justify-center items-center min-h-screen max-h-180 bg-base-100 px-4'>
      <div className='signin-card flex flex-col items-center w-full max-w-sm'>
        <span className='signin-brand text-5xl font-bold text-primary py-7'>
          basic-ecom
        </span>
        <form onSubmit={handleSubmit} className='signin-form w-full'>
          <fieldset className='signin-fieldset fieldset bg-base-200 border-base-300 rounded-box w-full border p-6 shadow-sm'>
            <div className='signin-title inline-flex justify-center text-2xl pb-5 text-base-content font-semibold'>
              Sign In
            </div>
            <label className='signin-label label text-base-content font-bold mt-2'>
              Email
            </label>
            <input
              type='email'
              name='email'
              className='signin-input input input-bordered w-full bg-base-100 text-base-content'
              placeholder='Email'
              // value={"boby@laso.com"} // Temporary code remember to change back to empty string after testing error handling.
              required
            />
            <label className='signin-label label text-base-content font-bold mt-2'>
              Password
            </label>
            <input
              type='password'
              name='password'
              className='signin-input input input-bordered w-full bg-base-100 text-base-content'
              placeholder='Password'
              // value={"Bobylaso1!"} // Temporary code remember to change back to empty string after testing error handling.
              required
            />
            <button
              type='submit'
              className='signin-submit btn btn-primary w-full mt-6'>
              Sign In
            </button>
            <div className='signin-divider border-t border-base-300 mt-6 mb-4'></div>
            <div className='signin-legal text-center text-base-content/70 text-sm'>
              {"By continuing, you agree to basic-ecom's"}
              <Link className='signin-legal-link link link-primary'>
                Terms of service
              </Link>{" "}
              and{" "}
              <Link className='signin-legal-link link link-primary'>
                Privacy policy
              </Link>
              .
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
  /* Explanation: This JSX block describes the visual structure of the sign-in screen using a “card” layout pattern.The outer container centers the card in the viewport (`h-screen` + flex centering). The `signin-*` classNames are semantic markers that help you mentally map the UI (page → card → form → fieldset → fields). Tailwind/DaisyUI utility classes provide the actual styling (spacing, borders, typography). The `<form>` element gives you correct browser semantics (Enter key submits, native validation if you add `required`, accessibility hooks), and it’s also what makes `FormData` work reliably. Labels and inputs are paired by proximity and `name` attributes so the submit handler can read the values. The “legal” area at the bottom demonstrates how SPAs often include informational links on auth screens; using `<Link>` keeps navigation client-side. Over time, you can enhance this UI by adding controlled inputs, validation messages, a “show password” toggle, and error display based on server responses. */
};
export default Signin;
