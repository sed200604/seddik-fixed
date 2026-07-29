'use client';

import { motion } from 'motion/react';
import { EASE, EASE_BACK, VIEWPORT } from './motion';
import { Counter } from './ui';
import { REGISTERED_COUNT } from './constants';

/**
 * First-cohort state (default). Structured so real testimonials can drop into
 * TESTIMONIALS later and render as a grid without touching the layout.
 */
const TESTIMONIALS: { name: string; text: string; photo?: string }[] = [
  // TODO(placeholder): add real testimonials here once the first cohort finishes.
];

export default function SocialProofSection() {
  const hasTestimonials = TESTIMONIALS.length > 0;

  return (
    <section id="social-proof" className="relative w-full bg-ac-offwhite py-[clamp(4rem,10vw,7rem)] px-5">
      <div className="max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_BACK }}
          className="inline-flex items-center gap-2 rounded-full bg-ac-gold/15 px-4 py-2 text-sm font-extrabold text-[#9a7b1f] ring-1 ring-ac-gold/30"
        >
          🏅 أول فوج
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-5 font-tajawal font-extrabold text-ac-navy-deep leading-tight"
          style={{ fontSize: 'clamp(1.5rem,4.2vw,2.4rem)' }}
        >
          كن من الأوائل اللي يتعلمو هاذي المهارة في الجزائر
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 ring-1 ring-black/[0.06] shadow-[0_12px_40px_-18px_rgba(17,36,64,0.2)]"
        >
          <span dir="ltr" className="font-inter-tight font-extrabold text-4xl md:text-5xl text-ac-gold">
            <Counter target={REGISTERED_COUNT} />
          </span>
          {/* TODO(placeholder): wire to the real "signed up so far" count */}
          <span className="text-ac-ink font-semibold text-lg">شخص سجّلو حتى الآن</span>
        </motion.div>

        {hasTestimonials && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 text-start">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="rounded-2xl bg-white p-6 ring-1 ring-black/[0.06] shadow-[0_10px_40px_-18px_rgba(17,36,64,0.16)]"
              >
                <blockquote className="text-ac-ink leading-[1.8]">“{t.text}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-ac-gold/20" />
                  <span className="font-bold text-ac-navy-deep">{t.name}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
