import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function ProductQuantityWheelHorizontal({ value, onChange }) {
  const scrollRef = useRef(null);
  const scrollTimeout = useRef(null);
  const itemWidth = 48; // Tailwind's w-12 is 48px

  // Dragging State Refs
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const draggedDistance = useRef(0);

  // 1. Convert vertical mouse wheel scroll to horizontal spin
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault(); // Stop the page from scrolling up/down
      el.scrollLeft += e.deltaY; // Spin the wheel sideways instead!
    };

    // We MUST use a native event listener with { passive: false } to allow e.preventDefault()
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // 2. Handle native scroll snapping
  const handleScroll = () => {
    if (!scrollRef.current || isDragging) return;

    // 1. Clear the timer every time the wheel moves even a single pixel
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    // 2. Set a new timer. This code will ONLY run if the wheel has been perfectly still for 100ms
    scrollTimeout.current = setTimeout(() => {
      const scrollLeft = scrollRef.current.scrollLeft;
      const selectedIndex = Math.round(scrollLeft / itemWidth);
      const newQuantity = selectedIndex + 1;

      if (newQuantity !== value) {
        onChange(newQuantity);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // 3. Click to Center: Sync scroll position when value changes
  useEffect(() => {
    if (scrollRef.current && !isDragging) {
      const scrollPosition = (value - 1) * itemWidth;
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }, [value, isDragging]);

  // --- MOUSE DRAG LOGIC ---
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.pageX;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
    draggedDistance.current = 0;

    // Temporarily turn off CSS snapping so dragging is buttery smooth
    scrollRef.current.style.scrollSnapType = "none";
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const x = e.pageX;
    const walk = x - dragStartX.current; // How far the mouse moved
    draggedDistance.current = Math.abs(walk); // Track total distance moved

    scrollRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Turn CSS snapping back on
    scrollRef.current.style.scrollSnapType = "x mandatory";

    // THE FIX: Only calculate nearest item and snap IF we actually dragged!
    // If draggedDistance is small, it was just a click, so let the onClick handler do its job.
    if (draggedDistance.current > 5) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const nearestIndex = Math.round(scrollLeft / itemWidth);
      const snapPosition = nearestIndex * itemWidth;

      scrollRef.current.scrollTo({ left: snapPosition, behavior: "smooth" });
      onChange(nearestIndex + 1);
    }
  };

  const handleItemClick = (quantityNumber) => {
    // Smart Click: If we dragged the mouse more than 5 pixels, it was a swipe, not a click!
    // Ignore it so we don't accidentally select a number we were just dragging past.
    if (draggedDistance.current > 5) return;

    onChange(quantityNumber); // This triggers the useEffect above to smoothly center the item
  };

  return (
    <div className='relative w-full max-w-40 h-12 bg-base-200 rounded-lg overflow-hidden border border-base-300 shadow-inner select-none'>
      {/* Center Highlight Box */}
      <div className='absolute top-0 left-1/2 w-12 h-full -translate-x-1/2 bg-base-100 border-x border-base-content/10 shadow-sm pointer-events-none z-0'></div>

      {/* Left Edge Fade */}
      <div className='absolute top-0 left-0 w-8 h-full bg-linear-to-r from-base-200 to-transparent pointer-events-none z-10'></div>

      {/* Right Edge Fade */}
      <div className='absolute top-0 right-0 w-8 h-full bg-linear-to-l from-base-200 to-transparent pointer-events-none z-10'></div>

      {/* The Scrolling Track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp} // Safety: Stop dragging if mouse leaves the box
        // Added dynamic cursor styling based on drag state
        className={`flex h-full w-full overflow-x-auto snap-x snap-mandatory items-center z-20 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          paddingLeft: `calc(50% - ${itemWidth / 2}px)`,
          paddingRight: `calc(50% - ${itemWidth / 2}px)`,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
        {Array.from({ length: 11 }).map((_, i) => {
          const quantityNumber = i + 1;
          const isSelected = value === quantityNumber;

          return (
            <div
              key={i}
              className={`w-12 h-full shrink-0 flex items-center justify-center snap-center transition-colors duration-200
                ${isSelected ? "text-lg font-bold text-primary" : "text-sm text-base-content/50 hover:text-base-content"}
              `}
              onClick={() => handleItemClick(quantityNumber)}>
              {quantityNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}

ProductQuantityWheelHorizontal.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
