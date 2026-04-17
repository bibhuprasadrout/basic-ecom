import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCategories as setCategoriesAction, request } from "../../utils";
import { Link } from "react-router";

const SubNavbar = () => {
  const dispatch = useDispatch(); // `dispatch` is a stable function extracted from the Redux store using the `useDispatch` hook. You use `dispatch` to send actions to the Redux store. These actions can be plain objects (for simple state updates) or functions (thunks for async operations).
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategorieslist = async () => {
      const { data, error } = await request({
        method: "get",
        url: "categories",
      });
      if (error) {
        console.log("Error fetching categories:", error);
        return;
      }
      data?.data && setCategories(data?.data);
      data?.data && dispatch(setCategoriesAction(data?.data));
    };
    getCategorieslist();
  }, [dispatch]);
  return (
    <>
      {/* Sub-navbar (Categories & Deals) */}
      <div className='navbar bg-neutral text-neutral-content w-full py-0 min-h-10 px-2 sm:px-4'>
        {/* Categories trigger */}
        <div className='flex items-center'>
          <button
            className='btn btn-square btn-ghost btn-sm sm:btn-md'
            onClick={() =>
              document
                .getElementById("categories_modal")
                .classList.toggle("hidden")
            }>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='h-5 w-5 stroke-current'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'></path>
            </svg>
          </button>
          <span
            className='text-xs sm:text-sm font-medium cursor-pointer'
            onClick={() =>
              document
                .getElementById("categories_modal")
                .classList.toggle("hidden")
            }>
            All
          </span>
        </div>

        <div
          id='categories_modal'
          className='hidden absolute left-0 sm:left-3 top-10 sm:top-12 mt-2 w-full sm:w-auto z-150 px-2 sm:px-0'>
          <div className='card bg-base-100 text-base-content shadow-2xl border border-base-300 w-full sm:min-w-[20rem] lg:min-w-160'>
            <div className='p-4 sm:p-6'>
              <button
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                onClick={() =>
                  document
                    .getElementById("categories_modal")
                    .classList.add("hidden")
                }>
                ✕
              </button>
              <h3 className='text-lg font-bold mb-4'>Categories</h3>
              <ul className='grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 overflow-y-auto max-h-[60vh]'>
                {categories?.map((category) => (
                  <li key={category?._id}>
                    <Link
                      to={`/products?category=${category.slug}`}
                      className='text-xs sm:text-sm hover:text-primary transition-colors block py-1'
                      onClick={() =>
                        document
                          .getElementById("categories_modal")
                          .classList.add("hidden")
                      }>
                      {category?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className='flex-1 flex justify-center sm:justify-start px-4'>
          <Link
            to='/deals'
            className='text-xs sm:text-sm font-medium hover:text-primary transition-colors'>
            {`Today's Deals`}
          </Link>
        </div>
      </div>
    </>
  );
};
export default SubNavbar;
