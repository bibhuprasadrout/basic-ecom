import { Link } from "react-router";

const Navbar = () => {
  return (
    <>
      <div>
        <nav className='flex items-center justify-between px-7 py-3 bg-gray-900 text-white'>
          <div className='text-2xl font-bold'>LOGO</div>
          <div className=' flex gap-3 items-center justify-end'>
            <div className='flex border border-gray-600 rounded-lg overflow-hidden w-96'>
              <span
                className='flex px-3 bg-gray-800 
                    text-gray-400 flex-none'>
                <i className='fas fa-search justify-center items-center'>0-</i>
              </span>
              <input
                type='text'
                placeholder='Search...'
                className='grow w-full p-2 bg-gray-800 text-white focus:outline-none'
              />
              <button className='flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700'>
                Search
              </button>
            </div>

            <ul className='flex space-x-6'>
              <li>
                <Link to={"/login"} className='hover:text-gray-700'>
                  Sign In
                </Link>
                {/* <a href='#' className='hover:text-gray-700'></a> */}
              </li>
              <li>
                <a href='#' className='hover:text-gray-700'>
                  Sign Up
                </a>
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
                <span>0-</span>
                <a href='#' className='hover:text-gray-400'>
                  all categories
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
