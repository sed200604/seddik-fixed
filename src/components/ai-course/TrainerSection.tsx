'use client';

import { SectionFrame, Reveal, CheckIcon, Barcode } from './ui';

const CREDS = ['تدريب مباشر وتفاعلي', 'تطبيقات عملية حقيقية', 'متابعة مستمرة بعد الدورة'];

export default function TrainerSection() {
  return (
    <SectionFrame num="04" label="المدرّب">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Bio */}
        <div>
          <Reveal>
            <div className="border-r-2 border-[#c9a84c] pr-5 mb-8">
              <p className="text-[#f0ece2] font-black text-2xl md:text-3xl leading-snug">
                منهج واحد: تطبيق مباشر، بلا لغة تقنية معقدة.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="text-[#e8d48b] font-black text-2xl md:text-3xl mb-1">بن زغدة محمد</h2>
            <p className="text-[#8fa0b8] font-medium text-base mb-7">
              مدرب تسويق رقمي وتطبيقات الذكاء الاصطناعي
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-[#c3cdd9] text-base md:text-lg leading-[1.9] mb-5">
              خبرة عمليّة ممتدّة في تدريب المئات من أصحاب المشاريع والطلبة والمستقلين على استخدام التكنولوجيا
              المتقدمة وتطبيقات الذكاء الاصطناعي لرفع الإنتاجية وتطوير الأعمال.
            </p>
            <p className="text-[#c3cdd9] text-base md:text-lg leading-[1.9] mb-8">
              يركّز في منهجه على التطبيق المباشر، وتبسيط المفاهيم التقنية المعقدة إلى خطوات عمليّة يستطيع أي شخص
              تطبيقها فورًا للحصول على نتائج ملموسة.
            </p>
          </Reveal>

          <div className="space-y-3">
            {CREDS.map((cred, i) => (
              <Reveal key={i} delay={0.18 + i * 0.08}>
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-6 h-6 rounded-full border border-[#c9a84c]/50 bg-[#c9a84c]/10 text-[#e8d48b] shrink-0">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[#f0ece2] font-semibold text-base">{cred}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Trainer ID card */}
        <Reveal delay={0.1} className="flex justify-center md:justify-start">
          <div className="w-full max-w-sm rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 ease-out">
            <div className="rounded-2xl border border-[#1a2c48] bg-gradient-to-b from-[#0c1526] to-[#070d18] shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
              {/* Card header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#13203a]">
                <span dir="ltr" className="font-jetbrains text-[10px] tracking-[0.3em] text-[#5d6e85]">
                  TRAINER — ID
                </span>
                <span className="text-[#f0ece2] font-black text-sm">
                  GO <span className="text-[#c9a84c]">LLC</span>
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-col items-center text-center px-6 py-10">
                <div className="relative mb-6">
                  <div className="grid place-items-center w-28 h-28 rounded-2xl border-2 border-[#c9a84c] bg-[#0a1424] shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                    <span className="text-[#e8d48b] font-black text-3xl">م.ز</span>
                  </div>
                  <span className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#c9a84c]" />
                  <span className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#c9a84c]" />
                </div>

                <h3 className="text-[#f0ece2] font-black text-2xl mb-1">بن زغدة محمد</h3>
                <p className="text-[#c9a84c] font-bold text-sm mb-1">مدرّب معتمد واستشاري تقني</p>
                <p className="text-[#5d6e85] text-sm">خبير التسويق الرقمي وتطبيقات الذكاء الاصطناعي</p>
              </div>

              {/* Card footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-dashed border-[#1a2c48]">
                <span dir="ltr" className="font-jetbrains text-[10px] tracking-[0.25em] text-[#5d6e85]">
                  ALGIERS — AUG 08
                </span>
                <Barcode className="w-20 h-6 text-[#39506f]" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
