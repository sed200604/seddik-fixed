'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const animate = useCallback(() => {
    const el = cursorRef.current;
    if (!el) return;

    const lerp = 0.15;
    currentRef.current.x += (positionRef.current.x - currentRef.current.x) * lerp;
    currentRef.current.y += (positionRef.current.y - currentRef.current.y) * lerp;

    el.style.left = `${currentRef.current.x}px`;
    el.style.top = `${currentRef.current.y}px`;

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current.x = e.clientX;
      positionRef.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magnetic = target.closest('[data-magnetic]');
      const el = cursorRef.current;
      if (!el) return;

      if (magnetic) {
        el.classList.add('magnetic');
      } else {
        el.classList.remove('magnetic');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isFinePointer, animate]);

  if (!isFinePointer) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="ebook-custom-cursor"
      aria-hidden="true"
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    />
  );
}
