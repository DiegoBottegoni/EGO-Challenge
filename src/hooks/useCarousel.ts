import { useRef, useState, useEffect } from 'react';
import type { ModelFeature } from '../types';

export const useCarousel = (features: ModelFeature[]) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Multiply features for seamless infinite scroll
  // 9 copies ensures ample buffer for wide screens and smooth scrolling
  const displayFeatures = [...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features];
  const totalDots = Math.max(features.length, 3); 

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

  // Helper to get precise item width including gap
  const getScrollStride = (container: HTMLDivElement) => {
    if (!container.firstElementChild) return 0;
    const itemWidth = (container.firstElementChild as HTMLElement).offsetWidth;
    const gap = 24; 
    return itemWidth + gap;
  };

  // Auto-rotation (Marquee)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isPaused) {
        container.scrollLeft += 0.5; 

        const stride = getScrollStride(container);
        if (stride === 0) return;

        const scrollLeft = container.scrollLeft;
        const featureSetWidth = stride * features.length;
        
        if (scrollLeft >= featureSetWidth * 2) { 
           container.scrollLeft -= featureSetWidth;
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, displayFeatures.length, features.length]);

  // Track active dot & Initial positioning
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const stride = getScrollStride(container);
      if (stride === 0) return;

      const scrollLeft = container.scrollLeft;
      const realIndex = Math.round(scrollLeft / stride);
      
      const shiftedIndex = realIndex - features.length;
      const currentIndex = ((shiftedIndex % totalDots) + totalDots) % totalDots;
      setCurrentDotIndex(currentIndex);
    };

    const stride = getScrollStride(container);
    // Initialize position to hide start padding gap if needed
    if (container.scrollLeft === 0 && stride > 0) {
        container.scrollLeft = stride * features.length;
    }

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [displayFeatures.length, features.length, totalDots]);

  const handleDotClick = (targetIndex: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const stride = getScrollStride(container);
    const currentScroll = container.scrollLeft;
    const currentRealIndex = Math.round(currentScroll / stride);
    
    let bestIndex = currentRealIndex;
    let minDiff = Infinity;
    
    // Find closest index that matches the target dot
    for (let i = -totalDots; i <= totalDots; i++) {
        const candidateIndex = currentRealIndex + i;
        const candidateDot = ((candidateIndex - features.length) % totalDots + totalDots) % totalDots;
        if (candidateDot === targetIndex) {
            const diff = Math.abs(candidateIndex - currentRealIndex);
            if (diff < minDiff) {
                minDiff = diff;
                bestIndex = candidateIndex;
            }
        }
    }

    container.scrollTo({
        left: bestIndex * stride,
        behavior: 'smooth'
    });
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
    handleDotClick
  };
};
