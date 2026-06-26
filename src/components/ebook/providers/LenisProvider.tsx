'use client';

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisCtx = createContext<LenisContextValue>({ lenis: null });

interface LenisProviderProps {
  children: ReactNode;
  disabled?: boolean;
}

export function LenisProvider({ children, disabled = false }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    /* Respect prefers-reduced-motion */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (disabled || prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [disabled]);

  return (
    <LenisCtx.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisCtx.Provider>
  );
}

export function useLenis(): Lenis | null {
  const ctx = useContext(LenisCtx);
  return ctx.lenis;
}
