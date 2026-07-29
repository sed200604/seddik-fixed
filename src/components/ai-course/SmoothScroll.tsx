'use client';

import { useEffect } from 'react';

/**
 * Global buttery inertia scroll via Lenis, synced with GSAP ScrollTrigger so
 * scroll-linked timelines stay in lockstep. Disabled entirely when the user
 * prefers reduced motion (native scrolling takes over). (Master Build §1, §4.3)
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis: import('lenis').default | null = null;
    let rafId = 0;
    let cleanupScrollTrigger: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      /* eslint-disable @typescript-eslint/no-explicit-any */
      const gsap: any = (gsapMod as any).default ?? gsapMod;
      const ScrollTrigger: any = (stMod as any).ScrollTrigger ?? (stMod as any).default;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Let ScrollTrigger measure once fonts/layout settle.
      ScrollTrigger.refresh();
      cleanupScrollTrigger = () => ScrollTrigger.killAll();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      cleanupScrollTrigger?.();
    };
  }, []);

  return null;
}
