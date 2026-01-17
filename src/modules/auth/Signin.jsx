import { useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/Constants";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../../hooks";

const Signin = () => {
  const navigate = useNavigate();
  const authValues = useAuth();
  const { setAuth } = authValues;
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    // const data = new FormData(e.currentTarget); // e.target inside handleSubmit is the element that triggered the event. In a form submit handler, you should use e.currentTarget (the form itself). If the submit event bubbles from a child element (like a button), e.target might not be the form, so new FormData(e.target) could fail or return empty values.

    // const user = { email: data.get("email"), password: data.get("password") };
    const user = {
      email: "bob@laso.com",
      password: "Boblaso1!",
    };
    try {
      const res = await axios({
        method: "post",
        baseURL: BASE_URL,
        url: "signin",
        data: user,
      });
      setAuth(() => res.data.success);
      navigate("/profile", { replace: true });
    } catch (err) {
      console.log("Sign In err:", err);
    }
  }, []);

  // guarding from logged in users
  const { auth, loading } = authValues;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (auth) {
    return <Navigate to='/profile' replace={true} />;
  }
  return (
    <div className='flex justify-center items-center h-screen max-h-180'>
      <div className=' flex flex-col items-center'>
        <span to='home' className='bg-ghost text-5xl text-primary-content py-7'>
          basic-ecom
        </span>
        <form onSubmit={handleSubmit}>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4'>
            {/* <legend className='fieldset-legend'>Sign In</legend> */}
            <div className='inline-flex justify-center text-2xl pb-5 text-neutral-700'>
              Sign In
            </div>

            <label className='label text-nutral font-bold'>Email</label>
            <input
              type='email'
              name='email'
              className='input'
              placeholder='Email'
            />

            <label className='label text-nutral font-bold'>Password</label>
            <input
              type='password'
              name='password'
              className='input'
              placeholder='Password'
            />

            <button type='submit' className='btn btn-neutral mt-4'>
              Sign In
            </button>
            <div className='border-t-2 border-base-300 mt-5 mb-1 '></div>
            <div className='inline-flex flex-wrap justify-center text-base-content/30 text-md pb-5'>
              {`By continuing, you agree to basic-ecom's`}{" "}
              <Link className='text-info-content/50'>Terms of service</Link>
              &nbsp; and &nbsp;
              <Link className='text-info-content/50'> Privacy policy</Link>.
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
export default Signin;
