import { useRef, useState } from "react";
import { leftArror, rightArrow } from "../../assets";
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
    <section className='relative bg-amber-100 p-7 w-screen hidden sm:block'>
      <div className='flex justify-center items-center gap-4 w-[90vw] mx-auto'>
        {/* Left Arrow */}
        <a
          onClick={() => scrollByCards(-2)}
          className='btn btn-circle text-2xl font-bold outline-none focus:outline-none'>
          <img
            src={leftArror}
            className='opacity-30'
            alt='left carousel indicator arrow'
          />
        </a>

        {/* Carousel */}
        {/* TODO: More features to add fetch cards based on category and discount provided, also further the complexity by adding a price range the user wants to purchase within */}
        <div
          ref={carouselRef}
          className='carousel carousel-center space-x-4 overflow-x-auto scroll-smooth p-3 cursor-grab active:cursor-grabbing select-none'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}>
          {products.length > 0 &&
            products.map((productForCard, index) => (
              // The cards within the carousel
              <ProductCard
                key={productForCard?._id || index}
                product={productForCard}
              />
            ))}
        </div>

        {/* Right Arrow */}
        <a
          onClick={() => scrollByCards(2)}
          className='btn btn-circle text-2xl font-bold outline-none focus:outline-none grayscale-100'>
          <img
            src={rightArrow}
            className='opacity-30'
            alt='right carousel indicator arrow'
          />
        </a>
      </div>
    </section>
  );
};

export default Carousel;
