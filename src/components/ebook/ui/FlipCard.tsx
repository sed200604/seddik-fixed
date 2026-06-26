'use client';

import { useState, useEffect, useCallback, type ReactNode, type KeyboardEvent } from 'react';

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  index: number;
  className?: string;
}

export default function FlipCard({
  front,
  back,
  index,
  className = '',
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionMql.matches);
    const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionMql.addEventListener('change', motionHandler);

    const pointerMql = window.matchMedia('(pointer: coarse)');
    setIsCoarse(pointerMql.matches);
    const pointerHandler = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    pointerMql.addEventListener('change', pointerHandler);

    return () => {
      motionMql.removeEventListener('change', motionHandler);
      pointerMql.removeEventListener('change', pointerHandler);
    };
  }, []);

  const handleClick = useCallback(() => {
    if (isCoarse || prefersReducedMotion) {
      setIsFlipped((prev) => !prev);
    }
  }, [isCoarse, prefersReducedMotion]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    },
    []
  );

  if (prefersReducedMotion) {
    return (
      <div
        className={`${className}`}
        style={{ animationDelay: `${index * 100}ms` }}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? 'اضغط لإظهار الوجه الأمامي' : 'اضغط لإظهار الوجه الخلفي'}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div
          className="ebook-flip-card-front"
          style={{
            position: 'relative',
            backfaceVisibility: 'visible',
            WebkitBackfaceVisibility: 'visible',
          }}
        >
          {front}
        </div>
        <div
          className="ebook-flip-card-back"
          style={{
            position: 'relative',
            transform: 'none',
            backfaceVisibility: 'visible',
            WebkitBackfaceVisibility: 'visible',
            marginBlockStart: '1rem',
          }}
        >
          {back}
        </div>
      </div>
    );
  }

  const flippedClass = isFlipped ? 'flipped' : '';

  return (
    <div
      className={`ebook-flip-card ${flippedClass} ${className}`}
      style={{ animationDelay: `${index * 100}ms` }}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? 'اضغط لإظهار الوجه الأمامي' : 'اضغط لإظهار الوجه الخلفي'}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="ebook-flip-card-inner">
        <div className="ebook-flip-card-front ebook-card">
          {front}
        </div>
        <div className="ebook-flip-card-back ebook-card">
          {back}
        </div>
      </div>
    </div>
  );
}
