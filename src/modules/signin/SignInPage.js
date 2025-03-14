import { useRef, useState } from "react";
import { fetchUser } from "../../api/apiList";
import { useUser } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router";
import ErrorModal from "../../modals/ErrorModal";

const SignInPage = () => {
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const signinFormRef = useRef();
  const { signin } = useUser() || {};
  const navigate = useNavigate();

  const handleUSer = async (event) => {
    event.preventDefault();
    const form = signinFormRef.current;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const res = await fetchUser({
      email: email || "",
      password: password || "",
    });
    if (!res?.success) {
      setError(true);
      setErrMsg(res?.message);
      return;
    }
    signin(res?.user);
    navigate("/protected");
  };
  return (
    <>
      <div>
        {error && (
          <ErrorModal message={errMsg} onClose={() => setError(false)} />
        )}
        <div className='flex min-h-screen items-center justify-center bg-white'>
          <div className='w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-white text-center mb-6'>
              Signin
            </h2>

            <form ref={signinFormRef}>
              <div className='mb-4'>
                <label className='block text-gray-400 mb-2'>Email</label>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  className='w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-400 mb-2'>Password</label>
                <input
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  className='w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  minLength={8}
                  maxLength={128}
                  required
                />
              </div>

              <button
                type='button'
                className='w-full p-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg'
                onClick={handleUSer}>
                Signin
              </button>
            </form>

            <p className='text-gray-400 text-center mt-4'>
              Don't have an account?{" "}
              <Link to={"/signup"} className='text-blue-400'>
                Sign up
              </Link>
            </p>
            <p className='text-gray-400 text-center mt-4'>
              Can use any user found in{" "}
              <a
                href='https://dummyjson.com/users?limit=208&skip=0'
                className='text-blue-400'
                target='_blank'>
                User list
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignInPage;
