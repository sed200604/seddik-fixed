'use client';

import { motion } from 'motion/react';
import { EASE, VIEWPORT, staggerContainer, fadeUp } from './motion';

const PROBLEMS = [
  'الصيف يروح وما دير والو',
  'تبحث على خدمة وما تلقاش',
  'تبعث CVات وما حد يرد',
  'تشوف ناس تربح وإنت واقف',
];

const SOLUTIONS = [
  'تبني مواقع من دارك بلابتوب',
  'تبيع خدمة مطلوبة بزاف في السوق',
  'تدخّل فلوس من أول أسبوع',
  'تخدم وقتاش ما تحب وعلى روحك',
];

function XMark() {
  return (
    <span className="flex-shrink-0 mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ac-danger/15 ring-1 ring-ac-danger/30">
      <motion.svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-ac-danger"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <motion.path
          d="M6 6l12 12M18 6L6 18"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </motion.svg>
    </span>
  );
}

function CheckMark() {
  return (
    <span className="flex-shrink-0 mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ac-success/15 ring-1 ring-ac-success/40 shadow-[0_0_16px_rgba(34,197,94,0.25)]">
      <motion.svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-ac-success"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M5 13l4 4L19 7"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
        />
      </motion.svg>
    </span>
  );
}

export default function ProblemSolutionSection() {
  return (
    <section
      id="problem-solution"
      className="relative w-full overflow-hidden py-[clamp(4rem,10vw,7rem)] px-5"
      style={{ background: 'linear-gradient(180deg,#112440 0%,#1B3A5C 55%,#112440 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
          {/* growing gold divider (desktop) */}
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: EASE }}
            className="hidden md:block absolute top-6 bottom-6 left-1/2 w-px origin-top bg-gradient-to-b from-transparent via-ac-gold/70 to-transparent"
          />

          {/* Problem */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="md:pe-10"
          >
            <motion.h3
              variants={fadeUp}
              className="font-tajawal font-extrabold text-2xl md:text-3xl text-white/90 mb-6"
            >
              بلا المهارة <span className="text-ac-danger">❌</span>
            </motion.h3>
            <ul className="space-y-4">
              {PROBLEMS.map((p) => (
                <motion.li
                  key={p}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-xl bg-white/[0.03] px-4 py-3.5 ring-1 ring-white/5"
                >
                  <XMark />
                  <span className="text-ac-muted text-base md:text-lg leading-relaxed">{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="md:ps-10 mt-2 md:mt-0"
          >
            <motion.h3
              variants={fadeUp}
              className="font-tajawal font-extrabold text-2xl md:text-3xl text-white mb-6"
            >
              بالمهارة <span className="text-ac-success">✅</span>
            </motion.h3>
            <ul className="space-y-4">
              {SOLUTIONS.map((s) => (
                <motion.li
                  key={s}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-xl bg-ac-gold/[0.06] px-4 py-3.5 ring-1 ring-ac-gold/15"
                >
                  <CheckMark />
                  <span className="text-white text-base md:text-lg leading-relaxed font-medium">{s}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
