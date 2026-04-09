import { useState, useEffect } from 'react';

export function useHoverMedia() {
  // Check if the device has a mouse/pointer that can hover
  const [hasHover, setHasHover] = useState(
    // Default to false during SSR or initial load
    typeof window !== 'undefined' ? window.matchMedia('(hover: hover)').matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');

    // Function to update state if device capabilities change
    const handleChange = (e) => setHasHover(e.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return hasHover;
}