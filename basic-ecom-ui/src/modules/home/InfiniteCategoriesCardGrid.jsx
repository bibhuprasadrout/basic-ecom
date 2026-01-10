import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CategoryCard from "../../components/common/CategoryCard";

const InfiniteCategoriesCardGrid = () => {
  const [visibleCardsCount, setVisibleCardsCount] = useState(10);
  const observerRef = useRef(null);

  useEffect(() => {
    // This useEffect is used for the explicit purpose of observing the categories card referance
    const target = observerRef.current; // capture the current ref value

    const observer = new IntersectionObserver( // creating an observer
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCardsCount((prev) => prev + 10);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target); // use the captured value here
      }
    };
  }, [visibleCardsCount]);

  // extracting the categories value from categories slice
  const categories = useSelector((state) => state.categories.value);

  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-12 py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center'>
        {/*  */}
        {/*  */}
        {/* cards array */}
        {categories.length > 0 &&
          categories.slice(0, visibleCardsCount).map((categoryItem, index) => {
            const isSentinel = index === visibleCardsCount - 1; // isSential is a boolean and will only be true for the last visible card
            return (
              <div key={index} ref={isSentinel ? observerRef : null}>
                {/*  */}
                {/*  */}
                {/* just the card nothing to do with the infinite card logic */}
                <CategoryCard category={categoryItem} />
                {/*  */}
              </div>
            );
          })}
        {/*  */}
      </div>
    </div>
  );
};

export default InfiniteCategoriesCardGrid;
