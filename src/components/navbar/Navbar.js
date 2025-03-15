import { useState } from "react";
import { Link } from "react-router"; // Ensure it's "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <nav className='bg-gray-900 text-white'>
        <div className='flex justify-between items-center px-6 py-4'>
          {/* Logo */}
          <Link to='/' className='text-2xl font-bold'>
            LOGO
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='lg:hidden text-white focus:outline-none text-2xl'
            aria-label='Toggle Menu'>
            {isOpen ? "✖" : "☰"}
          </button>

          {/* Desktop Menu */}
          <div className='hidden lg:flex items-center gap-6'>
            {/* Search Bar */}
            <div className='flex border border-gray-600 rounded-lg overflow-hidden'>
              <input
                type='text'
                placeholder='Search...'
                className='p-2 bg-gray-800 text-white focus:outline-none w-64'
              />
              <span className='px-3 bg-gray-800 text-gray-400 border-l border-gray-600 flex items-center'>
                🔍
              </span>
            </div>

            {/* Nav Links */}
            <ul className='flex space-x-6'>
              <li>
                <Link to='/signin' className='hover:text-gray-400'>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to='/signup' className='hover:text-gray-400'>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to='/cart' className='hover:text-gray-400'>
                  Cart 🛒
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu (Hidden on Large Screens) */}
        {isOpen && (
          <div className='lg:hidden flex flex-col space-y-3 bg-gray-800 p-4'>
            <Link to='/signin' className='hover:text-gray-400'>
              Sign In
            </Link>
            <Link to='/signup' className='hover:text-gray-400'>
              Sign Up
            </Link>
            <Link to='/cart' className='hover:text-gray-400'>
              Cart 🛒
            </Link>
          </div>
        )}
      </nav>

      {/* Sub Navbar */}
      <nav className='bg-amber-400 text-white px-6 py-2'>
        <ul className='flex justify-start space-x-6 overflow-x-auto no-scrollbar'>
          <li>
            <a href='#' className='hover:text-gray-700 whitespace-nowrap'>
              All Categories
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-700 whitespace-nowrap'>
              Gifts 🎁
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-700 whitespace-nowrap'>
              Today's Deals 🔥
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
