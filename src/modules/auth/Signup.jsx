import { useAuth } from "../../hooks"; //  `useAuth` reads authentication status from your global AuthProvider so you can guard this screen from already-authenticated users.
import { useState } from "react"; // `useState` provides local UI state.
import { Link, Navigate, useNavigate } from "react-router-dom";
import { request } from "../../utils";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(() => e.target.value);
  };

  // This block implements client-side password confirmation, which is a UX feature (not security).
  const validateConfirmPassword = (e) => {
    if (password === e.target.value) setError(null);
    else setError("Both passwords must match!");
  };
  /*
  Passwords is still be validated and hashed on the backend; the frontend confirmation check simply helps users avoid typos. We store the primary password in state so we can compare it against the confirm password field on every change. When there is a mismatch we set an error string; later in the JSX we show that message and disable the submit button.
  */
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset states on new submission
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const visitor = Object.fromEntries(formData.entries()); // Convert all form fields to a clean object. This is a concise way to build the payload without manually picking each field. It relies on the `name` attributes of the inputs to create keys in the `visitor` object. For example, an input with `name="email"` will result in `visitor.email`. This approach is scalable for forms with many fields and reduces boilerplate code. Just ensure that the backend expects the same field names as the form inputs.
    /* const visitor = Object.fromEntries(formData.entries());
    -- is short cut for --
    const visitor = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      userName: formData.get("userName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    */

    if (!visitor.email || !visitor.password || !visitor.userName) {
      setError("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }

    const { data, error } = await request("post", "signup", visitor);
    if (data?.success) {
      navigate("/signin", { replace: true });
    } else {
      console.log("Error during signup:", error);
      setError(error || "An error occurred during signup. Please try again.");
      setIsLoading(false);
    }
  };
  /*
  TODO: In a production app, you’d normally show success feedback, handle server validation errors (email already taken).
  */
  const { auth, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (auth) return <Navigate to='/profile' replace={true} />;
  /*
  This guard block prevents showing the registration form to a user who is already signed in. It also waits for auth resolution (`loading`) to avoid flashing the wrong UI. This guard complements your protected route guard (`AuthUser`): AuthUser protects private pages; this guard protects public auth pages from authenticated users.
  */
  return (
    <div className='signup-page bg-base-100 min-h-screen'>
      {/* 1. Use py-10 to ensure the card has room if the screen is short (mobile landscape).
      2. items-center + justify-center keeps the card dead-center on large screens.
    */}
      <div className='signup-viewport flex justify-center items-center min-h-screen px-4 py-10 sm:py-20'>
        <div className='signup-card flex flex-col items-center w-full max-w-sm sm:max-w-md lg:max-w-lg transition-all duration-300'>
          {/* Responsive Brand Size: Shrinks on mobile, pops on desktop */}
          <span className='signup-brand text-4xl sm:text-5xl lg:text-6xl font-black text-primary py-6 sm:py-10 tracking-tighter'>
            basic-ecom
          </span>

          <form onSubmit={handleSubmit} className='signup-form w-full'>
            {/* 1. rounded-2xl for a more modern look.
            2. Responsive padding (p-6 on mobile, p-10 on desktop).
            3. shadow-xl/2xl for depth on larger screens.
          */}
            <fieldset className='signup-fieldset fieldset bg-base-200 border-base-300 rounded-2xl w-full border p-6 sm:p-10 shadow-xl sm:shadow-2xl'>
              <div className='signup-title inline-flex justify-center text-2xl sm:text-3xl pb-6 text-base-content font-bold'>
                Sign Up
              </div>

              {/* Responsive Row: Switches from vertical stack to horizontal at 'sm' breakpoint */}
              <div className='signup-name-row flex flex-col sm:flex-row gap-4 w-full'>
                <div className='signup-field signup-field-firstName flex-1'>
                  <label className='signup-label label text-base-content font-bold'>
                    First Name *
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    className='signup-input input input-bordered w-full bg-base-100 text-base-content focus:input-primary'
                    placeholder='First Name'
                    required
                  />
                </div>
                <div className='signup-field signup-field-lastName flex-1'>
                  <label className='signup-label label text-base-content font-bold'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    className='signup-input input input-bordered w-full bg-base-100 text-base-content focus:input-primary'
                    placeholder='Last Name'
                  />
                </div>
              </div>

              <label className='signup-label label text-base-content font-bold mt-4'>
                User Name *
              </label>
              <input
                type='text'
                name='userName'
                className='signup-input input input-bordered w-full bg-base-100 text-base-content focus:input-primary'
                placeholder='User Name'
                required
              />

              <label className='signup-label label text-base-content font-bold mt-4'>
                Email *
              </label>
              <input
                type='email'
                name='email'
                className='signup-input input input-bordered w-full bg-base-100 text-base-content focus:input-primary'
                placeholder='Email'
                required
              />

              <label className='signup-label label text-base-content font-bold mt-4'>
                Password *
              </label>
              <input
                type='password'
                name='password'
                className='signup-input input input-bordered w-full bg-base-100 text-base-content focus:input-primary'
                placeholder='Password'
                required
                onChange={handlePasswordChange}
              />

              <label className='signup-label label text-base-content font-bold mt-4'>
                Confirm Password *
              </label>
              <input
                type='password'
                name='confirmPassword'
                className='signup-input input input-bordered w-full bg-base-100 text-base-content focus:input-primary'
                placeholder='Confirm Password'
                required
                onChange={validateConfirmPassword}
              />

              {error && (
                <div className='alert alert-error py-2 mt-4 shadow-sm text-sm'>
                  <span>{error}</span>
                </div>
              )}

              <button
                type='submit'
                className='signup-submit btn btn-primary w-full mt-8 sm:text-lg hover:scale-[1.01] transition-transform'
                disabled={isLoading || !!error}>
                {isLoading ? (
                  <>
                    <span className='loading loading-spinner loading-sm'></span>
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>

              <div className='signup-divider divider opacity-20 my-8'>OR</div>

              <div className='signup-legal text-center text-base-content/60 text-xs sm:text-sm leading-relaxed'>
                {"By continuing, you agree to basic-ecom's "}
                <Link className='signup-legal-link link link-hover link-primary font-medium'>
                  Terms of service
                </Link>{" "}
                and{" "}
                <Link className='signup-legal-link link link-hover link-primary font-medium'>
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
  /*
  This JSX block describes the registration screen UI as a centered form “card”.
  The `signup-*` classNames are semantic markers to help mentally parse the hierarchy (page → viewport → card → form → fieldset → rows/fields → actions → legal copy). The form uses real `<label>` and `<input>` elements, which is good for accessibility and for browser features like autofill.
  The form submission handler gathers all the form data into an object and sends it to the backend API. There’s also a guard at the top to redirect authenticated users away from this page, and a loading state to avoid flashing the form while auth status is being determined.
  */
};
export default Signup;
