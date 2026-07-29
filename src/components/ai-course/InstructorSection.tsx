'use client';

import { motion } from 'motion/react';
import { EASE, VIEWPORT, staggerContainer, fadeUp } from './motion';
import { Counter } from './ui';
import { PROJECTS_BUILT } from './constants';

export default function InstructorSection() {
  return (
    <section id="instructor" className="relative w-full overflow-hidden bg-ac-navy py-[clamp(4rem,10vw,7rem)] px-5">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="ac-aurora-slow absolute top-[10%] end-[-10%] w-[40vw] h-[40vw] max-w-[480px] max-h-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.1),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
        {/* photo — mask-wipe reveal */}
        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, ease: EASE }}
          className="md:col-span-2"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            className="relative mx-auto max-w-[280px]"
          >
            {/* TODO(placeholder): replace with the real CodyX logo/photo */}
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#16324f] to-[#0d1b30] ring-1 ring-ac-gold/25 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center gap-3">
              <span className="font-tajawal font-black text-4xl text-white tracking-tight">
                Cody<span className="text-ac-gold">X</span>
              </span>
              <span className="text-xs text-ac-muted">صورة المدرب — placeholder</span>
            </div>
            <span className="absolute -bottom-4 start-1/2 -translate-x-1/2 rounded-full bg-ac-gold px-4 py-1.5 text-sm font-extrabold text-ac-navy-deep shadow-[0_8px_24px_rgba(212,168,67,0.35)] whitespace-nowrap">
              المدرب
            </span>
          </motion.div>
        </motion.div>

        {/* text */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="md:col-span-3 text-center md:text-start"
        >
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-ac-gold text-sm font-bold">
            <span className="h-px w-6 bg-ac-gold/60" /> شكون يعلّمك؟
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-tajawal font-extrabold text-white leading-tight"
            style={{ fontSize: 'clamp(1.6rem,4.5vw,2.6rem)' }}
          >
            مؤسس وكالة CodyX لتصميم المواقع
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mt-6 inline-flex items-baseline gap-2 rounded-2xl bg-white/[0.04] px-5 py-3 ring-1 ring-ac-gold/20"
          >
            <span dir="ltr" className="font-inter-tight font-extrabold text-4xl md:text-5xl text-ac-gold">
              +<Counter target={PROJECTS_BUILT} />
            </span>
            {/* TODO(placeholder): confirm real number of client sites built */}
            <span className="text-ac-muted font-semibold">موقع مبني للعملاء</span>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-ac-muted text-lg leading-[1.9]">
            نبني مواقع للعملاء بالذكاء الاصطناعي كل يوم — ماشي كلام نظري، تجربة حقيقية.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
