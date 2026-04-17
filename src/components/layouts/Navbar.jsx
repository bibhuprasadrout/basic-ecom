import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, request } from "../../utils";
import { useAuth } from "../../hooks";
import RenderAlert from "../common/RenderAlert";
import SubNavbar from "./SubNavbar";

const Navbar = () => {
  const dispatch = useDispatch();
  const { auth, setAuth } = useAuth();

  // * Theme toggle state and handler
  const [theme, setTheme] = useState("bumblebee");
  useEffect(() => {
    // Check if the user previously saved a theme preference
    const storedTheme = localStorage.getItem("theme") || "bumblebee";
    setTheme(storedTheme);
    // Manually push the theme to the root HTML tag
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);
  const handleThemeToggle = (e) => {
    // If the checkbox is checked, switch to halloween, otherwise light
    const newTheme = e.target.checked ? "halloween" : "bumblebee";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save for next time
  };

  // Cart
  // 1. Read the state from your slice
  const { data: cart, status } = useSelector((state) => state.cart);

  // 2. Fetch the cart when the page loads
  useEffect(() => {
    if (status === "idle") {
      dispatch(getCart());
    }
  }, [status, dispatch, cart]);

  // 3. Extract data from the backend mirror
  const grandTotal = useMemo(() => cart?.totalPrice || 0, [cart?.totalPrice]);
  const totalItems = useMemo(() => cart?.totalItems || 0, [cart?.totalItems]);

  const navigate = useNavigate();
  const handleSignout = async () => {
    const { error } = await request({
      method: "post",
      url: "logout",
    });
    if (error) {
      console.log("Error during signout:", error);
    }
    setAuth(() => false);
    navigate("/", { replace: true });
  };

  return (
    <div className='relative h-auto w-full'>
      <header className='sticky top-0 z-100 w-full shadow-md'>
        {/* Top Navbar */}
        <div className='navbar bg-primary text-primary-content w-full px-2 sm:px-4 flex-wrap'>
          {/* RenderAlert - Ensure it's inside the header to move with it */}
          <div className='w-full'>
            <RenderAlert />
          </div>

          {/* Logo Section */}
          <div className='flex-1'>
            <Link to='/' className='btn btn-ghost text-lg sm:text-xl px-2'>
              basic-ecom
            </Link>
          </div>

          {/* Search & Actions Section */}
          <div className='flex items-center gap-1 sm:gap-3'>
            {/* Responsive Search bar — TODO: Search feature shall be implemented in further iterations. */}
            {/* <div className='form-control'>
              <input
                type='text'
                placeholder='Search'
                className='input input-sm sm:input-md input-bordered bg-base-100 text-base-content placeholder:text-base-content/50 w-28 xs:w-36 sm:w-48 md:w-64 lg:w-80 focus:outline-none transition-all'
              />
            </div> */}

            {/* Cart Feature */}
            {auth && (
              <div className='dropdown dropdown-end'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn btn-ghost btn-circle btn-sm sm:btn-md'>
                  <div className='indicator'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                    <span className='badge badge-xs sm:badge-sm indicator-item'>
                      {totalItems}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className='card card-compact dropdown-content bg-base-100 text-base-content mt-3 w-52 shadow-xl z-110'>
                  <div className='card-body'>
                    <span className='text-lg font-bold'>
                      Items: {totalItems}
                    </span>
                    <span className='text-info'>
                      Subtotal: ${grandTotal.toFixed(2)}
                    </span>
                    <div className='card-actions'>
                      <Link
                        to='/cart'
                        className='btn btn-primary btn-block btn-sm'>
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User Profile / Auth Links */}
            {auth ? (
              <div className='dropdown dropdown-end'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn btn-ghost btn-circle avatar btn-sm sm:btn-md'>
                  <div className='w-8 sm:w-10 rounded-full'>
                    <img
                      alt='User'
                      src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className='menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-110 mt-3 w-52 p-2 shadow-xl'>
                  <li>
                    <Link to='/profile' className='justify-between'>
                      Profile <span className='badge'>New</span>
                    </Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button onClick={handleSignout} className='text-left'>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className='flex gap-1 sm:gap-2'>
                <Link to='/signup' className='btn btn-neutral btn-xs sm:btn-sm'>
                  Sign Up
                </Link>
                <Link to='/signin' className='btn btn-ghost btn-xs sm:btn-sm'>
                  Sign In
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <label className='swap swap-rotate btn btn-ghost btn-circle btn-sm sm:btn-md'>
              <input
                type='checkbox'
                onChange={handleThemeToggle}
                checked={theme === "halloween"}
              />
              <svg
                className='swap-off h-5 w-5 sm:h-6 sm:w-6 fill-current'
                viewBox='0 0 24 24'>
                <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
              </svg>
              <svg
                className='swap-on h-5 w-5 sm:h-6 sm:w-6 fill-current'
                viewBox='0 0 24 24'>
                <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
              </svg>
            </label>
          </div>
        </div>
        <SubNavbar />
      </header>
    </div>
  );
};
export default Navbar;
