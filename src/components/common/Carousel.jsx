import { useRef, useState } from "react";
import ProductCard from "./ProductCard";

const Carousel = (carouselProducts) => {
  const products = carouselProducts?.products;
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollByCards = (count) => {
    const card = carouselRef.current?.querySelector(".carousel-item");
    if (card) {
      const scrollAmount = card.offsetWidth * count;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const handleMouseDown = (e) => {
    setIsDragging(false); // don't assume drag yet
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (startX === null) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setIsDragging(true); // only activate drag if movement is significant
    }
    if (isDragging) {
      e.preventDefault(); // only prevent default if dragging
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setStartX(null);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
    setStartX(null);
  };

  return (
    <section className='relative w-full'>
      <div className='w-full flex justify-center items-center'>
        <div className='w-full'>
          <div className='flex justify-center items-center gap-2 sm:gap-4 w-full max-w-7xl mx-auto px-2'>
            {/* Left Arrow */}
            <button
              onClick={() => scrollByCards(-2)}
              className='btn btn-circle btn-ghost bg-base-200/50 hover:bg-primary hover:text-primary-content border-none backdrop-blur-md transition-all duration-300 shadow-md group focus:outline-none'
              aria-label='Scroll Left'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className='w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5 8.25 12l7.5-7.5'
                />
              </svg>
            </button>

            {/* Carousel */}
            <div
              ref={carouselRef}
              className='carousel carousel-center overflow-x-auto scroll-smooth py-3 cursor-grab active:cursor-grabbing select-none w-full'
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}>
              {products.length > 0 &&
                products.map((productForCard, index) => (
                  <ProductCard
                    key={productForCard?._id || index}
                    product={productForCard}
                  />
                ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollByCards(2)}
              className='btn btn-circle btn-ghost bg-base-200/50 hover:bg-primary hover:text-primary-content border-none backdrop-blur-md transition-all duration-300 shadow-md group focus:outline-none'
              aria-label='Scroll Right'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className='w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m8.25 4.5 7.5 7.5-7.5 7.5'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
