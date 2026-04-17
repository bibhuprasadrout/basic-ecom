import { useCallback } from "react"; // `useCallback` is a React hook used to create a stable function reference between renders; this matters when handlers pass into deeply nested components or to avoid re-creating functions unnecessarily (it’s a performance/consistency tool, not a “must” for correctness).
import { Link, Navigate, useNavigate } from "react-router-dom"; // `useNavigate` provides imperative navigation (go to a route after an action), while `Navigate` is declarative navigation (render a redirect). `Link` creates SPA-friendly anchors that change the URL without a full page reload.
import { useAuth } from "../../hooks"; // `useAuth` is a custom hook of this app that reads the auth context (provided by `AuthProvider`)...helping the UI know if the user is already logged in.
import { useDispatch } from "react-redux"; // `useDispatch` is a React-Redux hook that gives you access to the Redux store’s `dispatch` function, which is how actions are sent to update global state in the redux store.
import { getCart } from "../../utils"; // `getCart` is a Redux thunk action that fetches the user’s cart from the backend and loads it into the Redux store; this is important to do immediately after signing in so the cart is ready when the user navigates to it.
import { request } from "../../utils"; // `request` is a pre-configured axios instance that centralizes API calls, for example by setting the base URL, default headers, or interceptors for auth tokens. Using a shared `request` instance helps maintain consistency and reduces boilerplate code across the app when making API calls.

const Signin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const dispatch = useDispatch();

  // This block is the “form submission pipeline” for signing in and it ties together browser concepts, React concepts, and backend concepts.
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault(); // `e.preventDefault()` stops the browser’s default form behavior (a full page reload submitting to the server). In an SPA, we want to stay on the same HTML document and handle the request with JavaScript so routing/state stay alive.
      const formData = new FormData(e.currentTarget); // `new FormData(e.currentTarget)` reads the form inputs by their `name` attributes; using `currentTarget` matters because `target` can be the button that triggered the submit event, while `currentTarget` is guaranteed to be the `<form>` element that owns the fields.
      const userData = {
        email: formData.get("email"),
        password: formData.get("password"),
      }; // We then build a `user` object (email/password) which becomes the JSON request body sent to your backend.
      // const user = {
      //   email: "boby@laso.com",
      //   password: "Bobylaso1!",
      // };
      const { data, error } = await request({
        method: "post",
        url: "signin",
        data: userData,
      }); // request(`axios` call) function uses `method: "post"` because credentials should not be placed in the URL (POST body is the standard approach).
      if (data?.success) {
        setAuth(true); // `setAuth(() => res.data.success)` updates your auth context so the rest of the app (Navbar, guards, etc.) can immediately reflect “logged in” state without a refresh.
        await dispatch(getCart());
        navigate("/profile", { replace: true }); // `navigate("/profile", { replace: true })` redirects the user to a protected page. The `replace` option updates browser history so Back doesn’t send the user right back to the sign-in form, which is usually better UX.
      } else {
        console.log("Sign In err:", error || "Unknown error");
        // Standardized error handling
        alert(error);
      }
    },
    [navigate, setAuth, dispatch],
  );
  // TODO: A production-quality version typically adds user-facing error messages (invalid credentials), disables the button while the request is in flight, and stores session info (cookie or token) depending on your backend strategy.

  const { auth, loading } = useAuth(); // This block is a simple “route guard” at the page level. It prevents confusing UX where a signed-in user might still see the sign-in form.
  if (loading)
    return (
      // `loading` exists because auth is often determined asynchronously (for example, validating a cookie by calling `/auth/profile`); while that’s happening, we avoid rendering the form.
      <div className='flex justify-center items-center min-h-screen'>
        <span className='loading loading-spinner loading-lg text-primary'></span>
      </div>
    );

  if (auth) return <Navigate to='/profile' replace={true} />; // If `auth` is already true, we redirect the user to `/profile` immediately. This guard works together with your `AuthUser` guard: `AuthUser` protects private pages; this local guard protects the public sign-in page from logged-in users.

  return (
    <div className='signin-page flex justify-center items-center min-h-screen bg-base-100 px-4 py-10 sm:py-20'>
      <div className='signin-card flex flex-col items-center w-full max-w-sm sm:max-w-md lg:max-w-lg transition-all duration-300'>
        {/* Responsive Brand Size */}
        <span className='signin-brand text-4xl sm:text-5xl lg:text-6xl font-black text-primary py-6 sm:py-10 tracking-tighter'>
          basic-ecom
        </span>

        <form onSubmit={handleSubmit} className='signin-form w-full'>
          <fieldset className='signin-fieldset fieldset bg-base-200 border-base-300 rounded-2xl w-full border p-6 sm:p-10 shadow-xl sm:shadow-2xl'>
            <div className='signin-title inline-flex justify-center text-2xl sm:text-3xl pb-6 text-base-content font-bold'>
              Sign In
            </div>

            <label className='signin-label label text-base-content font-bold'>
              Email
            </label>
            <input
              type='email'
              name='email'
              className='signin-input input input-bordered w-full bg-base-100 text-base-content focus:input-primary'
              placeholder='Email'
              required
              // value={"boby@laso.com"} // Temporary code remember to change back to empty string after testing error handling.
            />

            <label className='signin-label label text-base-content font-bold mt-4'>
              Password
            </label>
            <input
              type='password'
              name='password'
              className='signin-input input input-bordered w-full bg-base-100 text-base-content focus:input-primary'
              placeholder='Password'
              required
              // value={"Bobylaso1!"} // Temporary code remember to change back to empty string after testing error handling.
            />

            <button
              type='submit'
              className='signin-submit btn btn-primary w-full mt-8 sm:text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform'>
              Sign In
            </button>

            <div className='signin-divider divider opacity-20 my-8'>OR</div>

            <div className='signin-legal text-center text-base-content/60 text-xs sm:text-sm leading-relaxed'>
              {"By continuing, you agree to basic-ecom's "}
              <Link className='signin-legal-link link link-hover link-primary font-medium'>
                Terms of service
              </Link>{" "}
              and{" "}
              <Link className='signin-legal-link link link-hover link-primary font-medium'>
                Privacy policy
              </Link>
              .
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
/*
This JSX block describes the visual structure of the sign-in screen using a “card” layout pattern.
The outer container centers the card in the viewport (`h-screen` + flex centering).
The `signin-*` classNames are semantic markers that help you mentally map the UI (page → card → form → fieldset → fields).
Tailwind/DaisyUI utility classes provide the actual styling (spacing, borders, typography).
The `<form>` element gives you correct browser semantics (Enter key submits, native validation if you add `required`, accessibility hooks), and it’s also what makes `FormData` work reliably.
Labels and inputs are paired by proximity and `name` attributes so the submit handler can read the values.
The “legal” area at the bottom demonstrates how SPAs often include informational links on auth screens; using `<Link>` keeps navigation client-side.

TODO:enhance this UI by adding controlled inputs, validation messages, a “show password” toggle, and error display based on server responses.
*/
export default Signin;
