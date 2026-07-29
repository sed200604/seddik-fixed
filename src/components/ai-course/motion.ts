import type { Variants } from 'motion/react';

/* ============================================================
   Shared motion vocabulary — one source of truth so every
   section reveals with the same "expo-out" personality.
   (Master Build spec §4)
   ============================================================ */

/** Default reveal easing — expo-out feel. */
export const EASE = [0.22, 1, 0.36, 1] as const;
/** Micro-interaction easing — slight overshoot for buttons/badges. */
export const EASE_BACK = [0.34, 1.56, 0.64, 1] as const;

/** viewport prop reused on every whileInView — fires slightly before fully in view. */
export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/** clip-path reveal from the bottom — feels premium on headlines/media. */
export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
  show: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.85, ease: EASE },
  },
};

/** Parent that orchestrates staggered children. */
export const staggerContainer = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Reduced-motion fallback: opacity only, snappy. Swap variants with this when useReducedMotion() is true. */
export const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25, ease: 'linear' } },
};
