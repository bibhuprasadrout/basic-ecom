import { useState } from "react";
import { Link } from "react-router";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    maidenName: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    locality: "",
    city: "",
    state: "",
    stateCode: "",
    postalCode: "",
    country: "",
    username: "",
    password: "",
    birthDate: "",
    image: "",
    bloodGroup: "",
    height: "",
    weight: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-white p-24'>
      <div className='w-full max-w-lg xl:max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-bold text-white text-center mb-10'>
          Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            {Object.keys(formData).map((field) => (
              <div key={field} className='mb-4 col-span-2 xl:col-span-1'>
                <label className='block text-gray-400 mb-2 capitalize'>
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={`Enter ${field}`}
                  className='w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
          <button
            type='submit'
            className='w-full p-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg'>
            Signup
          </button>
        </form>
        <p className='text-gray-400 text-center mt-4'>
          Already have an account?{" "}
          <Link to='/signin' className='text-blue-400'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;
