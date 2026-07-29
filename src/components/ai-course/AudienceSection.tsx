'use client';

import { motion } from 'motion/react';
import { EASE_BACK, VIEWPORT, staggerContainer, fadeUp } from './motion';
import { SectionHeading } from './ui';

const AUDIENCE = [
  { icon: '🎓', title: 'الطالب', line: 'تحب مصدر دخل في الصيف أو بجانب الدراسة' },
  { icon: '💼', title: 'الموظف', line: 'تحب side income إضافي وتبني مهارة تأمنلك مستقبلك' },
  { icon: '💻', title: 'الفريلانسر الجديد', line: 'تحب تبدا تخدم أونلاين بلا رأس مال' },
  { icon: '🏪', title: 'صاحب بزنس', line: 'تحب تبني موقع لمشروعك بنفسك' },
];

export default function AudienceSection() {
  return (
    <section id="audience" className="relative w-full bg-ac-offwhite py-[clamp(4rem,10vw,7rem)] px-5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="لمن هذه الدورة؟" title="واش راك تشوف روحك هنا؟" tone="light" />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {AUDIENCE.map((a) => (
            <motion.div
              key={a.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group rounded-2xl bg-white p-6 ring-1 ring-black/[0.06] shadow-[0_10px_40px_-16px_rgba(17,36,64,0.16)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-18px_rgba(17,36,64,0.26)]"
            >
              <motion.span
                initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: EASE_BACK }}
                className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-ac-gold/12 text-3xl ring-1 ring-ac-gold/20 transition-transform duration-300 group-hover:scale-110"
              >
                {a.icon}
              </motion.span>
              <h3 className="mt-4 font-tajawal font-extrabold text-xl text-ac-navy-deep">{a.title}</h3>
              <p className="mt-2 text-ac-ink leading-relaxed">{a.line}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
