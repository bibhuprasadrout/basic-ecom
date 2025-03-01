import { Link, useNavigate } from "react-router";

const Navbar = () => {
  return (
    <>
      <div>
        <nav className='flex items-center justify-between px-7 py-3 bg-gray-900 text-white'>
          <Link to={"/"} className='text-2xl font-bold'>
            LOGO
          </Link>
          <div className=' flex gap-3 items-center justify-end'>
            <div className='flex border border-gray-600 rounded-lg overflow-hidden w-xs'>
              <input
                type='text'
                placeholder='Search...'
                className='grow w-full p-2 bg-gray-800 text-white focus:outline-none'
              />
              <span
                className='flex px-3 bg-gray-800 
                    text-gray-400 border-l border-gray-600 justify-center items-center flex-none'>
                <i className='justify-center items-center'>&#128269;</i>
              </span>
            </div>

            <ul className='flex space-x-6'>
              <li>
                <Link to={"/signin"} className='hover:text-gray-700'>
                  Sign In
                </Link>
                {/* <a href='#' className='hover:text-gray-700'></a> */}
              </li>
              <li>
                <Link to={"/signup"} className='hover:text-gray-700'>
                  Sign Up
                </Link>
              </li>
              <li>
                <a href='#' className='hover:text-gray-700'>
                  Cart
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* a subset navbar with an icon for 'all categories available list' and 'quick to access' tabs like buy gifts, todays deals */}
        <nav className='subnav flex items-center justify-start px-11 py-1 bg-amber-400 text-white'>
          <div className=' flex gap-3 items-center justify-end'>
            <ul className='flex space-x-6'>
              <li>
                <a href='#' className='hover:text-gray-400'>
                  All categories
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-400'>
                  Gifts
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-400'>
                  Todays deals!
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
