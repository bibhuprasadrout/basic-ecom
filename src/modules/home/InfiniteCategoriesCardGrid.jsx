import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CategoryCard from "../../components/common/CategoryCard";

const InfiniteCategoriesCardGrid = () => {
  // extracting the categories value from categories slice
  const categories = useSelector((state) => state.categories.value);

  const [visibleCardsCount, setVisibleCardsCount] = useState(10); // number of cards visible in view port.
  const observer = useRef(null);

  const categoriesRef = useRef(categories);
  useEffect(() => {
    categoriesRef.current = categories;
  }, [categories]);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    // This useEffect is used for the explicit purpose of observing the categories card referance
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCardsCount((prev) =>
          categoriesRef.current.length > 0
            ? Math.min(categoriesRef.current.length, prev + 10)
            : prev
        );
      }
    });

    return () => {
      // This will execute at unmount
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const loaderRef = useCallback((node) => {
    if (observer.current && node) {
      observer.current.observe(node);
    }
  }, []);

  return (
    <div className='px-1 lg:px-3 xl:px-11 pt-4 pb-8'>
      <div className='flex flex-wrap justify-center gap-3 place-items-center'>
        {/*  */}
        {/*  */}
        {/* cards array */}
        {categories.length > 0 &&
          categories.slice(0, visibleCardsCount).map((categoryItem, index) => {
            const isSentinel = index === visibleCardsCount - 1; // isSential is a boolean and will only be true for the last visible card
            return (
              <div key={index} ref={isSentinel ? loaderRef : null}>
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
