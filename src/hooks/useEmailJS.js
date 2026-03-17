
import { useEffect, useState, useRef } from 'react';

/**
 * Hook to lazy load EmailJS when an element comes into view
 */
export const useEmailJS = (options = { threshold: 0.1 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          try {
            // Pre-fetch the library when user scrolls near the form
            await import('@emailjs/browser');
            setIsLoaded(true);
            observer.disconnect();
          } catch (err) {
            console.error('Failed to load EmailJS', err);
          }
        }
      },
      options
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoaded, options]);

  return { isLoaded, elementRef };
};
