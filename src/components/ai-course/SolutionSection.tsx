'use client';

import { Counter, Reveal, SectionFrame, WhatsAppCTA } from './ui';

const STATS = [
  { value: 6, unit: 'ساعات', label: 'تدريب مباشر وجهًا لوجه' },
  { value: 20, unit: 'مقعدًا', label: 'فقط — اهتمام شخصي بكل مشارك' },
  { value: 1, unit: 'يوم', label: 'نتائج تطبّقها فورًا' },
];

export default function SolutionSection() {
  return (
    <SectionFrame num="02" label="الحل">
      <Reveal>
        <h2 className="text-[#f0ece2] font-black text-3xl sm:text-4xl md:text-5xl leading-[1.3] mb-6">
          <span className="bg-gradient-to-l from-[#c9a84c] via-[#e8d48b] to-[#b3903a] bg-clip-text text-transparent">
            جلسة واحدة
          </span>{' '}
          تغيّر طريقتك في استخدام الذكاء الاصطناعي
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-[#8fa0b8] text-lg md:text-xl leading-[1.9] max-w-2xl mb-4">
          في جلسة تدريبية واحدة، وجهًا لوجه، ستتعلم الاستخدام العملي والصحيح للذكاء الاصطناعي — بأمثلة حقيقية
          تطبّقها من اليوم نفسه، بلا تعقيد وبلا لغة تقنية صعبة.
        </p>
      </Reveal>

      {/* Editorial stats — hairline-separated, no cards */}
      <Reveal delay={0.15}>
        <div className="grid grid-cols-3 border-y border-[#13203a] my-10 md:my-12 [&>*+*]:border-r [&>*+*]:border-[#13203a]">
          {STATS.map((stat, i) => (
            <div key={i} className="py-7 md:py-10 px-3 md:px-8 text-center md:text-right">
              <div className="flex items-baseline justify-center md:justify-start gap-2 mb-2">
                <span className="font-jetbrains text-[#e8d48b] text-4xl md:text-6xl leading-none">
                  <Counter target={stat.value} duration={1200} />
                </span>
                <span className="text-[#f0ece2] font-bold text-sm md:text-lg">{stat.unit}</span>
              </div>
              <p className="text-[#5d6e85] text-xs md:text-base leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <WhatsAppCTA source="solution">راسلنا الآن على واتساب</WhatsAppCTA>
      </Reveal>
    </SectionFrame>
  );
}
