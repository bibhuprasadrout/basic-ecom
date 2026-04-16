import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const InfiniteCardGrid = ({
  initialItems = 8,
  increment = 4,
  titlePrefix = "Collection Item",
}) => {
  const [visibleCount, setVisibleCount] = useState(initialItems);
  const observerLoaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + increment);
        }
      },
      { rootMargin: "200px" }, // Load before the user actually reaches the bottom
    );

    if (observerLoaderRef.current) {
      observer.observe(observerLoaderRef.current);
    }

    return () => observer.disconnect();
  }, [increment]);

  return (
    <div className='w-full px-4 sm:px-6 lg:px-12 py-10'>
      {/* Responsive Grid:
          - 1 col on Mobile
          - 2 cols on Small/Medium
          - 3 cols on Large
          - 4 cols on XL+
      */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
        {[...Array(visibleCount)].map((_, i) => (
          <div
            key={i}
            className='group relative w-full aspect-[3/4] sm:aspect-square overflow-hidden rounded-2xl bg-base-300 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2'>
            {/* Image Layer */}
            <img
              src={`https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp`}
              alt={`${titlePrefix} ${i + 1}`}
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
              draggable={false}
            />

            {/* Overlay Gradient */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-60' />

            {/* Content Layer */}
            <div className='absolute inset-0 flex flex-col justify-end p-6'>
              <h2 className='text-xl sm:text-2xl font-black text-white tracking-tight transform transition-transform duration-300 group-hover:translate-x-2'>
                {titlePrefix} <span className='text-primary'>{i + 1}</span>
              </h2>
              <p className='text-white/70 text-sm mt-1 transform opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'>
                Explore this unique item
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sentinel: The "Trigger" for loading more */}
      <div
        ref={observerLoaderRef}
        className='flex justify-center items-center w-full h-20 mt-10'>
        {/* DaisyUI Loading Spinner */}
        <span className='loading loading-dots loading-lg text-primary'></span>
      </div>
    </div>
  );
};

InfiniteCardGrid.propTypes = {
  initialItems: PropTypes.number,
  increment: PropTypes.number,
  titlePrefix: PropTypes.string,
};

export default InfiniteCardGrid;
