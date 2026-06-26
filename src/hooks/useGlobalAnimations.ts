'use client';

import { useEffect, useRef } from 'react';

// Singleton state
let observer: IntersectionObserver | null = null;
const animatedElements = new Set<Element>();
const elementCallbacks = new WeakMap<Element, () => void>();

// Budgeting & Queueing
let animatingCount = 0;
const MAX_CONCURRENT = 5;
const animationQueue: (() => void)[] = [];

// Keyboard & Fallback
let isKeyboardOpen = false;
let fallbackScrollListener: (() => void) | null = null;
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
let lastScrollCheck = 0;

function processQueue() {
  if (animatingCount >= MAX_CONCURRENT || animationQueue.length === 0) return;
  const fn = animationQueue.shift();
  if (fn) {
    animatingCount++;
    fn();
    // Free up budget after 350ms (overlapping is fine for perceived speed)
    setTimeout(() => {
      animatingCount = Math.max(0, animatingCount - 1);
      processQueue();
    }, 350);
  }
}

function handleIntersection(entries: IntersectionObserverEntry[]) {
  if (isKeyboardOpen) return;

  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;

  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    if (animatedElements.has(entry.target)) return;

    const target = entry.target;
    
    // Check direction: if scrolling down and element is above viewport center, skip animation (set final state directly)
    const rect = target.getBoundingClientRect();
    const isAboveCenter = rect.top < window.innerHeight / 2;
    
    if (scrollingDown && isAboveCenter) {
      // User already scrolled past, trigger instantly
      animatedElements.add(target);
      observer?.unobserve(target);
      const cb = elementCallbacks.get(target);
      if (cb) cb();
      return;
    }

    // 60ms visibility guard (fast but still debounces scroll jitter)
    setTimeout(() => {
      if (isKeyboardOpen) return;
      const freshRect = target.getBoundingClientRect();
      const stillVisible = freshRect.top < window.innerHeight && freshRect.bottom > 0;
      
      if (stillVisible && !animatedElements.has(target)) {
        animatedElements.add(target);
        observer?.unobserve(target);
        const cb = elementCallbacks.get(target);
        if (cb) {
          animationQueue.push(cb);
          processQueue();
        }
      }
    }, 60);
  });
}

function initGlobalAnimations() {
  if (typeof window === 'undefined') return;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.body.classList.add('reduced-motion-enabled');
  }

  // Visual viewport keyboard detection
  if (window.visualViewport) {
    const initialHeight = window.visualViewport.height;
    window.visualViewport.addEventListener('resize', () => {
      const currentHeight = window.visualViewport?.height || initialHeight;
      isKeyboardOpen = currentHeight < initialHeight * 0.7;
    });
  }

  if (!observer) {
    observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px',
    });
  }

  // iOS Safari Fallback
  if (!fallbackScrollListener) {
    fallbackScrollListener = () => {
      if (isKeyboardOpen) return;
      const now = Date.now();
      if (now - lastScrollCheck < 100) return; // throttle 100ms
      lastScrollCheck = now;

      requestAnimationFrame(() => {
        // Find observed elements that are visible but not triggered
        // (Note: we iterate over map keys implicitly via stored elements if needed, 
        // but simpler approach is usually observer handles it, just need to ping observer.)
      });
    };
    window.addEventListener('scroll', fallbackScrollListener, { passive: true });
  }
}

export function useGlobalAnimation(
  elementRef: React.RefObject<Element | null>,
  onTrigger: () => void,
  staggerIndex: number = 0,
  staggerDelay: number = 50,
  maxStagger: number = 400
) {
  useEffect(() => {
    initGlobalAnimations();

    const el = elementRef.current;
    if (!el || !observer) return;

    if (animatedElements.has(el)) {
      onTrigger(); // already animated
      return;
    }

    const delay = Math.min(staggerIndex * staggerDelay, maxStagger);
    const cb = () => {
      setTimeout(() => {
        onTrigger();
      }, delay);
    };

    elementCallbacks.set(el, cb);
    observer.observe(el);

    return () => {
      if (el) {
        observer?.unobserve(el);
        elementCallbacks.delete(el);
      }
    };
  }, [elementRef, onTrigger, staggerIndex, staggerDelay, maxStagger]);
}
