import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../config/Constants";
import { useDispatch } from "react-redux";
import { setCategories as setCategoriesAction } from "../../utils/slices/categoriesSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [visitor, setVisitor] = useState(false);
  () => setVisitor(true);

  const [categories, setCategories] = useState([]);
  const getCategorieslist = async () => {
    // TODO: Later we need to optimize the code of API calls, there is no eed to code axios in every pagewhere i sould call an API, make a api constructor function where i need to only pass method and data.
    try {
      const value = await axios({
        url: "categories",
        method: "get",
        baseURL: BASE_URL,
      });
      if (!value) throw new Error();
      value.data?.data && setCategories(value.data?.data);
      value.data?.data && dispatch(setCategoriesAction(value.data?.data));
      return value.data?.data;
    } catch (err) {
      console.log(err.status);
      console.log(err.message);
    }
  };
  useEffect(() => {
    const data = getCategorieslist();
    setCategories(data);
  }, []);
  return (
    <div>
      {/* Navbar */}
      <div className='navbar bg-primary text-primary-content w-full'>
        {/* Logo */}
        <div className='logo-wrapper flex-1  '>
          <Link
            to='home'
            className='logo btn btn-ghost text-xl text-nutral-content'>
            basic-ecom
          </Link>
        </div>

        <div className='flex gap-3'>
          {/* Search bar */}
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered w-24 md:w-auto'
          />

          {/* Cart feature */}
          <div className='flex-none'>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle'>
                <div className='indicator'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    {" "}
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                    />{" "}
                  </svg>
                  <span className='badge badge-sm indicator-item'>0</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className='card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow'>
                <div className='card-body'>
                  <span className='text-lg font-bold'>8 Items</span>
                  <span className='text-info'>Subtotal: $999</span>
                  <div className='card-actions'>
                    <NavLink
                      to='/cart'
                      className={({ isActive }) => (isActive ? "active" : "")}>
                      <button className='btn btn-primary btn-block'>
                        View cart
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {visitor ? (
            /* Sign up button */
            <div className='navbar-end'>
              <Link to='/signup' className='btn'>
                Sign Up`
              </Link>
            </div>
          ) : (
            /* Profile feature */
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img
                    alt='Tailwind CSS Navbar component'
                    src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  />
                </div>
              </div>
              <ul
                tabIndex='-1'
                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'>
                <li>
                  <Link to='/profile' className='justify-between btn'>
                    Profile
                    <span className='badge'>New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <Link to='/home'>Sign out</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Toggle theme -- TODO - not working now. */}
        <label className='swap swap-rotate'>
          {/* this hidden checkbox controls the state */}
          {/* <input
            type='checkbox'
            className='theme-controller'
            value='halloween'
          /> */}

          {/* sun icon */}
          {/* <div className='swap-off h-8 w-8 fill-current'>
            <svg
              className='swap-off h-7 w-7 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'>
              <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
            </svg>
          </div> */}

          {/* moon icon */}
          {/* <svg
            className='swap-on h-7 w-7 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'>
            <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
          </svg> */}
        </label>
      </div>

      {/* Sub-navbar */}
      <div className='navbar bg-neutral text-neutral-content w-full py-0 min-h-10 relative'>
        {/* Categories button and text */}
        <div
          className='hidden sm:flex items-center'
          onClick={() =>
            document
              .getElementById("categories_modal")
              .classList.toggle("hidden")
          }>
          <button className='btn btn-square btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block h-5 w-5 stroke-current'>
              {" "}
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'></path>{" "}
            </svg>
          </button>
          <a className='px-1'>All</a>
        </div>
        <div
          id='categories_modal'
          className='hidden absolute left-3 top-12 mt-2 z-50 rounded-box bg-base-100 text-primary-content shadow-lg'>
          <div className='flex flex-col p-4 min-w-80'>
            <button
              // close categories button
              className='btn btn-md btn-circle btn-ghost absolute right-2 top-2'
              onClick={() =>
                document
                  .getElementById("categories_modal")
                  .classList.toggle("hidden")
              }>
              ✕
            </button>
            <div className='text-lg font-bold pb-3'>Categories</div>
            <ul className='grid grid-cols-4 gap-y-3 gap-x-7 text-sm'>
              {categories?.length > 0 &&
                categories.map((category) => (
                  <Link
                    to={`/api/products?category=${category.slug}&page=2&limit=10`}
                    key={category?._id}
                    className='link link-hover'>
                    {category?.name}
                  </Link>
                ))}
            </ul>
          </div>
        </div>
        {/* <dialog id='categories_modal' className='modal text-primary-content'>
          <div className='modal-box'>
            <form method='dialog'>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                ✕
              </button>
            </form>
            <h3 className='font-bold text-lg'>Categories</h3>
            <footer className='footer sm:footer-horizontal text-l p-3'>
              <nav className='grid grid-cols-4 gap-4'>
                <a className='link link-hover'>Branding</a>
                <a className='link link-hover'>Design</a>
                <a className='link link-hover'>Marketing</a>
                <a className='link link-hover'>Advertisement</a>
                <a className='link link-hover'>About us</a>
                <a className='link link-hover'>Contact</a>
                <a className='link link-hover'>Jobs</a>
                <a className='link link-hover'>Press kit</a>
                <a className='link link-hover'>Terms of use</a>
                <a className='link link-hover'>Privacy policy</a>
                <a className='link link-hover'>Cookie policy</a>
              </nav>
            </footer>
          </div>
        </dialog> */}

        <div className='flex-none px-4 sm:px-7'>
          <a>{`Today's deals`}</a>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
