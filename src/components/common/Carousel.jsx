import { useRef, useState } from "react";
import { leftArrow, rightArrow } from "../../assets";
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
            <a
              onClick={() => scrollByCards(-2)}
              className='btn btn-circle bg-base-100 text-2xl font-bold outline-none focus:outline-none'>
              <img src={leftArrow} className='opacity-30' alt='left' />
            </a>

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
            <a
              onClick={() => scrollByCards(2)}
              className='btn btn-circle bg-base-100 text-2xl font-bold outline-none focus:outline-none grayscale-100'>
              <img src={rightArrow} className='opacity-30' alt='right' />
            </a>
          </div>
        </div>
      </div>
    </section>
    // <section className='relative w-full'>
    //   {/* <div className='w-full flex justify-center items-center'>
    //     <div className='transform scale-50 origin-top w-full'> */}
    //   <div className='flex justify-center items-center gap-4 w-[calc(100%-8px)] max-w-480 mx-auto'>
    //     {/* Left Arrow */}
    //     <a
    //       onClick={() => scrollByCards(-2)}
    //       className='btn btn-circle text-2xl font-bold outline-none focus:outline-none'>
    //       <img
    //         src={leftArror}
    //         className='opacity-30'
    //         alt='left carousel indicator arrow'
    //       />
    //     </a>

    //     {/* Carousel */}
    //     {/* TODO: More features to add fetch cards based on category and discount provided, also further the complexity by adding a price range the user wants to purchase within */}
    //     {
    //       // <div class="
    //       // transform
    //       // scale-75
    //       // sm:scale-100
    //       // hover:scale-110
    //       // transition-transform
    //       // duration-300
    //       // origin-top-left
    //       // ">
    //     }
    //     <div
    //       ref={carouselRef}
    //       className='carousel carousel-center overflow-x-auto scroll-smooth py-3 cursor-grab active:cursor-grabbing select-none w-full'
    //       onMouseDown={handleMouseDown}
    //       onMouseMove={handleMouseMove}
    //       onMouseUp={handleMouseUp}
    //       onMouseLeave={handleMouseLeave}>
    //       {products.length > 0 &&
    //         products.map((productForCard, index) => (
    //           // The cards within the carousel
    //           <ProductCard
    //             key={productForCard?._id || index}
    //             product={productForCard}
    //           />
    //         ))}
    //     </div>

    //     {/* Right Arrow */}
    //     <a
    //       onClick={() => scrollByCards(2)}
    //       className='btn btn-circle text-2xl font-bold outline-none focus:outline-none grayscale-100'>
    //       <img
    //         src={rightArrow}
    //         className='opacity-30'
    //         alt='right carousel indicator arrow'
    //       />
    //     </a>
    //   </div>
    //   {/* </div>
    //   </div> */}
    // </section>
  );
};

export default Carousel;
