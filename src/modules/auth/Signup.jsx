import { useAuth } from "../../hooks";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { BASE_URL } from "../../config/Constants";
const Signup = () => {
  // controlled password fields
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(() => e.target.value);
  };
  const validateConfirmPassword = (e) => {
    if (password == e.target.value) {
      setError(null);
    } else {
      setError("Both passwords must match!");
    }
  };

  // handle submit
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const visitor = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      userName: formData.get("userName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const res = await axios({
        method: "post",
        baseURL: BASE_URL,
        url: "signup",
        data: visitor,
      });
      navigate("/signin", { replace: true });
      console.log("sign up res:", res);
    } catch (err) {
      console.log(err);
    }
  };

  // guarding from logged in users
  const authStatus = useAuth();
  const { auth, loading } = authStatus;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (auth) {
    return <Navigate to='/profile' replace={true} />;
  }
  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        <div className=' flex flex-col items-center'>
          <span
            to='home'
            className='bg-ghost text-5xl text-primary-content py-7'>
            basic-ecom
          </span>
          <form onSubmit={handleSubmit}>
            <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-md border p-4'>
              {/* <legend className='fieldset-legend'>Sign In</legend> */}
              <div className='inline-flex justify-center text-2xl pb-5 text-neutral-700'>
                Sign Up
              </div>

              <div className='flex gap-2'>
                <span>
                  <label className='label text-nutral font-bold'>
                    First Name *
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    className='input'
                    placeholder='First Name'
                    required='true'
                  />
                </span>
                <span>
                  <label className='label text-nutral font-bold'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    className='input'
                    placeholder='Last Name'
                  />
                </span>
              </div>

              <label className='label text-nutral font-bold'>User Name *</label>
              <input
                type='text'
                name='userName'
                className='input w-full'
                placeholder='User Name'
                required='true'
              />

              <label className='label text-nutral font-bold'>Email *</label>
              <input
                type='email'
                name='email'
                className='input w-full'
                placeholder='Email'
                required='true'
              />

              <label className='label text-nutral font-bold'>Password *</label>
              <input
                type='password'
                name='password'
                className='input w-full'
                placeholder='Password'
                required='true'
                onChange={handlePasswordChange}
              />

              <label className='label text-nutral font-bold'>
                Confirm Password *
              </label>
              <input
                type='password'
                name='password'
                className='input w-full'
                placeholder='Password'
                required='true'
                onChange={validateConfirmPassword}
              />

              {error && <p className='text-red-500'>{error}</p>}
              <button
                type='submit'
                className='btn btn-neutral mt-4'
                disabled={!!error}>
                Sign Up
              </button>
              <div className='border-t-2 border-base-300 mt-5 mb-1 '></div>
              <div className='inline-flex flex-wrap justify-center text-base-content/30 text-md pb-5'>
                {`By continuing, you agree to basic-ecom's`}{" "}
                <Link className='text-info-content/50'>
                  &nbsp;Terms of service
                </Link>
                &nbsp; and &nbsp;
                <Link className='text-info-content/50'> Privacy policy</Link>.
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
