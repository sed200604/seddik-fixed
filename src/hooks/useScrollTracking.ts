'use client';

import { useEffect, useRef } from 'react';
import { trackSectionView, trackScrollDepth } from '@/lib/pixel';

// Hook to track section visibility (fires when 50% visible)
export const useSectionTracking = (sectionName: string) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView(sectionName);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [sectionName]);

  return ref;
};

// Hook to track page global scroll depth
export const useGlobalScrollTracking = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (documentHeight === 0) return;

      const percent = ((scrollTop + windowHeight) / documentHeight) * 100;

      if (percent >= 25) trackScrollDepth(25);
      if (percent >= 50) trackScrollDepth(50);
      if (percent >= 75) trackScrollDepth(75);
      if (percent >= 99) trackScrollDepth(100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load just in case page is short
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
