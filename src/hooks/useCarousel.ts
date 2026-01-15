import { useRef, useState, useEffect } from 'react';
import type { ModelFeature } from '../types';

export const useCarousel = (features: ModelFeature[]) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(true);

  const totalDots = 3;
  const displayFeatures = features;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const getScrollStride = (container: HTMLDivElement) => {
    if (!container.firstElementChild) return 0;
    const itemWidth = (container.firstElementChild as HTMLElement).offsetWidth;
    const gap = 16;
    return itemWidth + gap;
  };

  useEffect(() => {
    const checkOverflow = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      setIsOverflowing(container.scrollWidth > container.clientWidth);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [features.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const animate = () => {
      // Don't auto-scroll if content fits
      if (!isOverflowing) return;

      const stride = getScrollStride(container);

      if (stride > 0 && !isPaused) {
        // Auto-scroll logic (Standard Marquee)
        // If we haven't reached the end, scroll.
        if (container.scrollLeft < container.scrollWidth - container.clientWidth) {
          container.scrollLeft += 1;
        }
        // If reached end, do nothing (Stay at end)
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, isOverflowing, features.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const stride = getScrollStride(container);
      if (stride === 0) return;

      const scrollLeft = container.scrollLeft;

      // Force last dot if we reached the end (within 10px tolerance)
      if (scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        setCurrentDotIndex(2);
        return;
      }

      const index = Math.round(scrollLeft / stride);

      // Map physical index to 3 dots (0, 1, 2)
      setCurrentDotIndex(index % 3);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [features, totalDots]);

  const handleDotClick = (targetIndex: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const stride = getScrollStride(container);

    // Find closest physical index matching the target dot
    const current = Math.round(container.scrollLeft / stride);
    let bestK = -1;
    let minDiff = Infinity;

    for (let k = 0; k < features.length; k++) {
      if (k % 3 === targetIndex) {
        const diff = Math.abs(k - current);
        if (diff < minDiff) {
          minDiff = diff;
          bestK = k;
        }
      }
    }

    if (bestK !== -1) {
      container.scrollTo({
        left: bestK * stride,
        behavior: 'smooth'
      });
    }
  };

  return {
    scrollContainerRef,
    displayFeatures,
    totalDots,
    currentDotIndex,
    isPaused,
    setIsPaused,
    scrollLeft,
    scrollRight,
    handleDotClick,
    isOverflowing
  };
};
