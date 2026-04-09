import { useAuth } from "../../hooks";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/Constants";
/* Explanation: This import block sets up a typical registration page in a React SPA. `useState` provides local UI state (password + error message). `axios` is used for the signup API call. `useNavigate` and `Navigate` are for navigation flow (send users to the right screen after signup or if they’re already logged in). `Link` keeps legal/help links inside the SPA without reloading the page. `useAuth` reads authentication status from your global AuthProvider so you can guard this screen from already-authenticated users. */
const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(() => e.target.value);
  };
  const validateConfirmPassword = (e) => {
    if (password == e.target.value) setError(null);
    else setError("Both passwords must match!");
  };
  /* Explanation: This block implements client-side password confirmation, which is a UX feature (not security).Passwords must still be validated and hashed on the backend; the frontend confirmation check simply helps users avoid typos. We store the primary password in state so we can compare it against the confirm password field on every change. When there is a mismatch we set an error string; later in the JSX we show that message and disable the submit button. Disabling the submit button is a common pattern to prevent requests that are guaranteed to fail validation. */
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset states on new submission
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const visitor = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      userName: formData.get("userName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!visitor.email || !visitor.password || !visitor.userName) {
      setError("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      await axios({
        method: "post",
        baseURL: BASE_URL,
        url: "signup",
        data: visitor,
      });
      navigate("/signin", { replace: true });
    } catch (err) {
      console.log("Error during signup:", err);

      // 5. Extract the actual error message from your backend, or provide a fallback
      const serverMessage =
        err.response?.data?.message ||
        "An error occurred during signup. Please try again.";
      setError(serverMessage);
    } finally {
      // 6. The finally block always runs, whether the request succeeded or failed
      setIsLoading(false);
    }
  };
  /* Explanation: This block is the signup request workflow. Like sign-in, we prevent the default browser submit to keep SPA behavior. `FormData` reads field values by their `name` attributes. We then build a `visitor` payload that matches what a backend signup endpoint typically expects (identity fields + credentials). We POST to the API because credentials should never be placed in a URL. After success, we redirect to `/signin` so the user can log in (some apps auto-login instead; your flow is “signup then signin”). In a production app, you’d normally show success feedback, handle server validation errors (email already taken), and possibly show loading states (disable the button while the request runs). */
  const authStatus = useAuth();
  const { auth, loading } = authStatus;
  if (loading) return <div>Loading...</div>;
  if (auth) return <Navigate to='/profile' replace={true} />;
  /* Explanation: This guard block prevents showing the registration form to a user who is already signed in. It also waits for auth resolution (`loading`) to avoid flashing the wrong UI. This guard complements your protected route guard (`AuthUser`): AuthUser protects private pages; this guard protects public auth pages from authenticated users. */
  return (
    <div className='signup-page bg-base-100'>
      <div className='signup-viewport flex justify-center items-center min-h-screen px-4'>
        <div className='signup-card flex flex-col items-center w-full max-w-md'>
          <span
            to='home'
            className='signup-brand text-5xl font-bold text-primary py-7'>
            basic-ecom
          </span>
          <form onSubmit={handleSubmit} className='signup-form w-full'>
            <fieldset className='signup-fieldset fieldset bg-base-200 border-base-300 rounded-box w-full border p-6 shadow-sm'>
              <div className='signup-title inline-flex justify-center text-2xl pb-5 text-base-content font-semibold'>
                Sign Up
              </div>
              <div className='signup-name-row flex flex-col sm:flex-row gap-2 w-full'>
                <span className='signup-field signup-field-firstName flex-1'>
                  <label className='signup-label label text-base-content font-bold'>
                    First Name *
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    className='signup-input input input-bordered w-full bg-base-100 text-base-content'
                    placeholder='First Name'
                    required
                  />
                </span>
                <span className='signup-field signup-field-lastName flex-1'>
                  <label className='signup-label label text-base-content font-bold'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    className='signup-input input input-bordered w-full bg-base-100 text-base-content'
                    placeholder='Last Name'
                  />
                </span>
              </div>
              <label className='signup-label label text-base-content font-bold mt-2'>
                User Name *
              </label>
              <input
                type='text'
                name='userName'
                className='signup-input input input-bordered w-full bg-base-100 text-base-content'
                placeholder='User Name'
                required
              />
              <label className='signup-label label text-base-content font-bold mt-2'>
                Email *
              </label>
              <input
                type='email'
                name='email'
                className='signup-input input input-bordered w-full bg-base-100 text-base-content'
                placeholder='Email'
                required
              />
              <label className='signup-label label text-base-content font-bold mt-2'>
                Password *
              </label>
              <input
                type='password'
                name='password'
                className='signup-input input input-bordered w-full bg-base-100 text-base-content'
                placeholder='Password'
                required
                onChange={handlePasswordChange}
              />
              <label className='signup-label label text-base-content font-bold mt-2'>
                Confirm Password *
              </label>
              <input
                type='password'
                name='confirmPassword'
                className='signup-input input input-bordered w-full bg-base-100 text-base-content'
                placeholder='Password'
                required
                onChange={validateConfirmPassword}
              />
              {error && (
                <p className='signup-error text-error text-sm mt-2'>{error}</p>
              )}
              <button
                type='submit'
                className='signup-submit btn btn-primary w-full mt-6'
                disabled={isLoading || !!error}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
              <div className='signup-divider border-t border-base-300 mt-6 mb-4'></div>
              <div className='signup-legal text-center text-base-content/70 text-sm'>
                {"By continuing, you agree to basic-ecom's"}
                <Link className='signup-legal-link link link-primary'>
                  Terms of service
                </Link>{" "}
                and{" "}
                <Link className='signup-legal-link link link-primary'>
                  Privacy policy
                </Link>
                .
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
  /* Explanation: This JSX block describes the registration screen UI as a centered form “card”.The `signup-*` classNames are semantic markers so you can mentally parse the hierarchy (page → viewport → card → form → fieldset → rows/fields → actions → legal copy). This is helpful for debugging and for quickly finding where to add styles later. The form uses real `<label>` and `<input>` elements, which is good for accessibility and for browser features like autofill. The required fields use `required` so the browser can block empty submissions. The confirm password field is intentionally named `confirmPassword` so it doesn’t overwrite the real `password` field in FormData; we don’t send `confirmPassword` to the backend, it’s only used for UI validation. The submit button is disabled when `error` is present, which prevents a request that we already know is invalid from being sent. */
};
export default Signup;
