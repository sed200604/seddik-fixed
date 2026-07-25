'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Counter, Reveal, SectionFrame, TicketIcon, WhatsAppCTA } from './ui';
import { trackPixel } from './tracking';

const OFFER_ITEMS = [
  { name: 'دورة تدريبية حضورية كاملة — 6 ساعات مباشرة مع المدرب (تشمل ساعة تطبيق حر وأسئلة مباشرة)', value: '15,000' },
  { name: 'دليل PDF: أوامر (Prompts) جاهزة للاستخدام بعد الدورة', value: '3,000' },
  { name: 'جلسة أسئلة وأجوبة مباشرة', value: '2,000' },
  { name: 'عضوية مجموعة متابعة بعد الدورة', value: '2,500' },
  { name: 'شهادة حضور من GO LLC', value: '1,500' },
  { name: 'استراحة ووجبة خفيفة', value: '1,000' },
];

export default function OfferStackSection() {
  const viewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(viewRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      trackPixel('ViewContent', {
        content_name: 'ai_course_offer',
        content_category: 'offer_section',
        value: 8000,
        currency: 'DZD',
      });
    }
  }, [inView]);

  return (
    <SectionFrame num="05" label="العرض">
      <div ref={viewRef} className="max-w-xl">
        <Reveal>
          <div className="relative rounded-2xl border border-[#c9a84c]/25 bg-gradient-to-b from-[#0c1526] to-[#070d18] shadow-[0_0_60px_rgba(201,168,76,0.08)] overflow-hidden">
            {/* Receipt header */}
            <div className="flex items-start justify-between px-6 sm:px-8 pt-7 pb-5 border-b border-[#13203a]">
              <div>
                <span dir="ltr" className="block font-jetbrains text-[10px] tracking-[0.3em] text-[#5d6e85] mb-2">
                  GO LLC — RECEIPT N°001
                </span>
                <h2 className="text-[#f0ece2] font-black text-2xl sm:text-3xl">ماذا تحصل عليه؟</h2>
              </div>
              <span className="grid place-items-center w-11 h-11 rounded-xl border border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#e8d48b] shrink-0">
                <TicketIcon className="w-5 h-5" />
              </span>
            </div>

            {/* Items with dotted leaders */}
            <div className="px-6 sm:px-8 py-6 space-y-4">
              {OFFER_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-3"
                >
                  <span className="text-[#f0ece2] font-medium text-sm sm:text-base leading-snug shrink-1">
                    {item.name}
                  </span>
                  <span className="flex-1 border-b-2 border-dotted border-[#1e3a5f]/70 min-w-4 self-end mb-1.5" />
                  <span className="whitespace-nowrap shrink-0 text-[#8fa0b8] text-sm sm:text-base">
                    <span dir="ltr" className="font-jetbrains">{item.value}</span> دج
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Perforation */}
            <div className="relative my-2">
              <div className="border-t-2 border-dashed border-[#1a2c48] mx-4" />
              <span className="absolute top-1/2 -translate-y-1/2 -right-3.5 w-7 h-7 rounded-full bg-[#060c17] border border-[#13203a]" />
              <span className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-7 h-7 rounded-full bg-[#060c17] border border-[#13203a]" />
            </div>

            {/* Totals */}
            <div className="px-6 sm:px-8 py-7 text-center">
              <div className="flex items-center justify-center gap-3 mb-4 text-base">
                <span className="text-[#8fa0b8]">القيمة الإجمالية:</span>
                <span className="text-[#ef4444]/90 line-through font-bold">
                  <span dir="ltr" className="font-jetbrains">25,000</span> دج
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
                <span className="text-[#f0ece2] font-bold text-lg">سعرك اليوم:</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-jetbrains text-[#e8d48b] text-5xl sm:text-6xl leading-none">
                    <Counter target={8000} />
                  </span>
                  <span className="text-[#c9a84c] font-bold text-xl">دج</span>
                </div>
              </div>

              {/* Rubber-stamp savings badge */}
              <motion.div
                initial={{ opacity: 0, scale: 1.6, rotate: 4 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.35 }}
                className="inline-block border-2 border-[#4ade80]/70 text-[#4ade80] rounded-lg px-5 py-2 font-black text-base tracking-wide"
              >
                وفّر <span dir="ltr" className="font-jetbrains">17,000</span> دج
              </motion.div>
            </div>

            {/* CTA */}
            <div className="px-6 sm:px-8 pb-8 text-center">
              <WhatsAppCTA source="offer" className="w-full sm:w-auto">راسلنا الآن على واتساب</WhatsAppCTA>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
