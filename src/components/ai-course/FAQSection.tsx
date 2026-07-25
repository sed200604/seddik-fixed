'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EASE, PlusIcon, Reveal, SectionFrame, WhatsAppCTA } from './ui';

const FAQS = [
  {
    q: 'هل أحتاج خبرة سابقة؟',
    a: 'لا، الدورة مصممة للمبتدئين تمامًا.',
  },
  {
    q: 'هل يوم واحد كافٍ فعلاً؟',
    a: 'الدورة مصممة تعطيك أساسًا عمليًا قويًا تقدر تبني عليه، وليست دورة شاملة لكل شيء — التركيز على أكثر المهارات فائدة وتطبيقًا فوريًا. ولهذا خصصنا ساعة كاملة في نهاية اليوم للتطبيق الحر والأسئلة المباشرة مع المدرب، للتأكد أنك خرجت وطبّقت فعلاً. والتعلم لا يتوقف مع نهاية اليوم: تبقى ضمن مجموعة المتابعة بعد الدورة للأسئلة والدعم المستمر.',
  },
  {
    q: 'هل أحتاج حاسوب محمول؟',
    a: 'يفضّل إحضار حاسوبك المحمول لتطبيق التمارين مباشرة، وإن تعذّر ذلك يمكنك المتابعة والتطبيق من هاتفك الذكي.',
  },
  {
    q: 'هل يوجد استرجاع للمبلغ؟',
    a: 'نعم، إذا حضرت الجلسة كاملة ولم تخرج بثلاث مهارات عملية على الأقل تقدر تطبقها فورًا، نعيد لك قيمة التسجيل.',
  },
  {
    q: 'كيف أؤكد حجزي؟',
    a: 'أرسل اسمك الكامل ورقم هاتفك عبر واتساب وسنؤكد حجزك خلال 24 ساعة.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionFrame num="08" label="أسئلة شائعة">
      <div className="max-w-3xl">
        <Reveal>
          <h2 className="text-[#f0ece2] font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-10">
            كل ما تحتاج معرفته
          </h2>
        </Reveal>

        <div className="mb-12">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} delay={idx * 0.06}>
                <div className="border-t border-[#13203a] last:border-b">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full py-6 flex items-center gap-5 text-right cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded-sm group"
                  >
                    <span
                      dir="ltr"
                      className={`font-jetbrains text-sm shrink-0 transition-colors duration-300 ${
                        isOpen ? 'text-[#c9a84c]' : 'text-[#39506f] group-hover:text-[#c9a84c]'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={`flex-1 font-bold text-lg md:text-xl leading-snug transition-colors duration-300 ${
                        isOpen ? 'text-[#e8d48b]' : 'text-[#f0ece2]'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`grid place-items-center w-9 h-9 rounded-full border shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'rotate-45 border-[#c9a84c] bg-[#c9a84c]/15 text-[#e8d48b]'
                          : 'border-[#1a2c48] text-[#8fa0b8] group-hover:border-[#c9a84c]/50'
                      }`}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pr-10 pb-7 text-[#8fa0b8] text-base md:text-lg leading-[1.8]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <WhatsAppCTA source="faq">راسلنا الآن على واتساب</WhatsAppCTA>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
