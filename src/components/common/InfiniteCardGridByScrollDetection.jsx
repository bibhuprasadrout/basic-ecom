//  This is a scroll based detection infinite scrolling mechanism.
import { useEffect, useState, useRef } from "react";

export const InfiniteCardGridByScrollDetection = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const containerRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-12 py-8' ref={containerRef}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center'>
        {[...Array(visibleCount)].map((_, i) => (
          <div
            key={i}
            className='card w-full max-w-[320px] h-96 shadow-sm relative overflow-hidden group'>
            <figure className='h-full'>
              <img
                src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
                alt={`Card ${i + 1}`}
                className='w-full h-full object-cover'
                draggable={false}
              />
              <div className='absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-0'></div>
            </figure>
            <div className='card-body absolute bottom-0 left-0 right-0 z-10 flex justify-center items-center text-center'>
              <h2 className='card-title text-xl font-extrabold text-white'>
                Card {i + 1}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default InfiniteCardGridByScrollDetection;
