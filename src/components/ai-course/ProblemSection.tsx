'use client';

import { motion } from 'motion/react';
import { EASE, Reveal, SectionFrame } from './ui';

const POINTS = [
  'كيف تصوغ طلبك للحصول على نتيجة دقيقة',
  'أين توظّفها في حياتك اليومية',
  'كيف تحوّلها من تجربة عابرة إلى أداة تعمل لصالحك فعليًا',
];

export default function ProblemSection() {
  return (
    <SectionFrame num="01" label="المشكلة">
      <Reveal>
        <h2 className="text-[#f0ece2] font-black text-3xl sm:text-4xl md:text-5xl leading-[1.3] mb-8">
          هل جرّبت الذكاء الاصطناعي…
          <span className="block text-[#8fa0b8] mt-2">وما عرفت كيف تستفاد منه؟</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-[#c3cdd9] text-lg md:text-xl leading-[1.9] max-w-2xl">
          الجميع سمع عن ChatGPT وDeepSeek وGemini.
          <br />
          الجميع حمّل التطبيق، جرّبه مرة أو مرتين، ثم تركه.
        </p>
      </Reveal>

      {/* Oversized outlined question */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="my-10 md:my-14"
      >
        <span className="ac-stroke font-black text-6xl sm:text-7xl md:text-8xl leading-none select-none">
          لماذا؟
        </span>
      </motion.div>

      <Reveal>
        <p className="text-[#f0ece2] font-bold text-lg md:text-xl leading-relaxed mb-2 max-w-2xl">
          لأنه لا أحد شرح كيف تُستخدم هذه الأدوات بالشكل الصحيح:
        </p>
      </Reveal>

      <div className="max-w-2xl">
        {POINTS.map((point, i) => (
          <Reveal key={i} delay={0.12 * i}>
            <div className="flex items-start gap-5 py-5 border-b border-[#13203a] last:border-b-0">
              <span dir="ltr" className="font-jetbrains text-[#c9a84c] text-sm pt-1.5 shrink-0">
                0{i + 1}
              </span>
              <p className="text-[#c3cdd9] text-lg leading-relaxed">{point}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}
