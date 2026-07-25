'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { EASE, Reveal, WhatsAppCTA } from './ui';

const EVENT_DATE = '2026-08-08T10:00:00+01:00';

function useCountdown(targetISO: string) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(targetISO).getTime();
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  if (remaining === null) return null;
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining % 86_400_000) / 3_600_000),
    minutes: Math.floor((remaining % 3_600_000) / 60_000),
    seconds: Math.floor((remaining % 60_000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function FinalCTASection() {
  const countdown = useCountdown(EVENT_DATE);

  const units = [
    { value: countdown?.days, label: 'يوم' },
    { value: countdown?.hours, label: 'ساعة' },
    { value: countdown?.minutes, label: 'دقيقة' },
    { value: countdown?.seconds, label: 'ثانية' },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 overflow-hidden border-t border-[#13203a]">
      {/* Gold hairline glow on top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.14)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Urgency */}
        <Reveal>
          <div className="inline-flex items-center gap-2.5 mb-7">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef4444]" />
            </span>
            <span className="text-[#ef4444] font-bold text-sm tracking-wide">الأماكن محدودة جدًا</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="text-[#f0ece2] font-black text-4xl sm:text-5xl md:text-6xl leading-[1.2] mb-4">
            لم يتبقَّ سوى
            <span className="block bg-gradient-to-l from-[#c9a84c] via-[#e8d48b] to-[#b3903a] bg-clip-text text-transparent mt-1">
              عدد محدود من المقاعد
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="text-[#8fa0b8] text-lg leading-relaxed mb-10">
            <span className="text-[#e8d48b] font-bold">8 أوت · مول باب الزوار، المحمدية</span>
            <span className="block mt-1">الدورة التطبيقية الوحيدة التي تحتاجها للبدء فعليًا</span>
          </p>
        </Reveal>

        {/* Live countdown */}
        <Reveal delay={0.18}>
          <div dir="ltr" className="flex items-start justify-center gap-3 sm:gap-5 mb-12">
            {units.map((unit, i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-5">
                <div className="flex flex-col items-center">
                  <span className="font-jetbrains text-[#e8d48b] text-4xl sm:text-5xl md:text-6xl leading-none tabular-nums">
                    {unit.value === undefined ? '--' : pad(unit.value)}
                  </span>
                  <span className="text-[#5d6e85] text-xs font-bold mt-2">{unit.label}</span>
                </div>
                {i < units.length - 1 && (
                  <span className="font-jetbrains text-[#39506f] text-3xl sm:text-4xl leading-none mt-1">:</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Seats bar */}
        <Reveal delay={0.22}>
          <div className="max-w-md mx-auto mb-12">
            <div className="flex justify-between items-center mb-3 text-sm font-bold">
              <span className="text-[#f0ece2]">المقاعد المتبقية</span>
              <span dir="ltr" className="font-jetbrains text-[#e8d48b]">12 / 20</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#13203a] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
                className="h-full rounded-full bg-gradient-to-l from-[#c9a84c] to-[#e8d48b] shadow-[0_0_14px_rgba(201,168,76,0.55)]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <WhatsAppCTA big source="final" className="ac-pulse-glow w-full sm:w-auto">
            راسلنا الآن على واتساب
          </WhatsAppCTA>
          <p className="text-[#5d6e85] text-sm mt-5">يتم تأكيد الحجز خلال 24 ساعة عبر واتساب</p>
        </Reveal>
      </div>
    </section>
  );
}
