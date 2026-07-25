'use client';

import { Reveal, SectionFrame, ShieldCheckIcon } from './ui';

export default function GuaranteeSection() {
  return (
    <SectionFrame num="06" label="الضمان">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 max-w-3xl">
        {/* Rotating seal */}
        <Reveal className="shrink-0">
          <div className="relative w-28 h-28 grid place-items-center">
            <span className="ac-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-[#c9a84c]/40" />
            <span className="grid place-items-center w-20 h-20 rounded-full bg-[#0c1526] border border-[#c9a84c]/30 text-[#e8d48b] shadow-[0_0_30px_rgba(201,168,76,0.12)]">
              <ShieldCheckIcon className="w-9 h-9" />
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.08}>
            <h2 className="text-[#f0ece2] font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              ضمان بدون مخاطرة
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-[#c3cdd9] text-lg md:text-xl leading-[1.9] border-r-2 border-[#c9a84c]/60 pr-5">
              إذا حضرت الجلسة كاملة ولم تخرج بـ{' '}
              <span className="text-[#e8d48b] font-extrabold">ثلاث مهارات عملية</span> على الأقل تقدر تطبقها
              فورًا، نعيد لك جزءًا من قيمة التسجيل.
            </p>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  );
}
