'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'motion/react';
import { EASE } from './motion';
import { SectionHeading } from './ui';

type Day = {
  n: number;
  icon: string;
  label: string;
  title: string;
  result: string;
  star?: boolean;
};

const DAYS: Day[] = [
  { n: 1, icon: '🔍', label: 'اليوم 1: اكتشف', title: 'تعرف على الأدوات وأول تجربة', result: 'النتيجة: تفهم كيفاش تخاطب الذكاء الاصطناعي وتبني بلوكك الأول' },
  { n: 2, icon: '🏗️', label: 'اليوم 2: ابني', title: 'أول موقع كامل أونلاين', result: 'النتيجة: عندك موقع حقيقي منشور على الأنترنت' },
  { n: 3, icon: '✨', label: 'اليوم 3: حيّره', title: 'animations واحتراف التفاصيل', result: 'النتيجة: موقعك يولّي يبان احترافي يحيّر في العين' },
  { n: 4, icon: '⚙️', label: 'اليوم 4: الـ Backend', title: 'وظائف حقيقية (فورم، دفع، Dashboard)', result: 'النتيجة: موقعك يخدم فعلاً ماشي مجرد واجهة', star: true },
  { n: 5, icon: '💰', label: 'اليوم 5: اربح', title: 'تسعير، عملاء، أول بيع', result: 'النتيجة: تعرف كيفاش تلقى عميل وتبيعلو موقع' },
];

function DayRow({ day }: { day: Day }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { once: true, margin: '-45% 0px -45% 0px' });

  return (
    <li ref={ref} className="relative ps-16 md:ps-20 pb-10 last:pb-0">
      {/* node */}
      <motion.span
        className="absolute start-[18px] md:start-[26px] top-1 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full text-lg ring-2 ring-white/12"
        animate={
          active
            ? { backgroundColor: '#D4A843', boxShadow: '0 0 0 6px rgba(212,168,67,0.15)', scale: 1 }
            : { backgroundColor: '#16324f', boxShadow: '0 0 0 0px rgba(212,168,67,0)', scale: 0.9 }
        }
        transition={{ duration: 0.45, ease: EASE }}
      >
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
        >
          {day.icon}
        </motion.span>
      </motion.span>

      {/* card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, ease: EASE }}
        className={`relative rounded-2xl p-5 ring-1 ${
          day.star
            ? 'bg-ac-gold/[0.08] ring-ac-gold/35 shadow-[0_0_30px_rgba(212,168,67,0.15)]'
            : 'bg-white/[0.04] ring-white/10'
        }`}
      >
        {day.star && (
          <span className="absolute -top-3 end-4 rounded-full bg-ac-gold px-2.5 py-0.5 text-xs font-bold text-ac-navy-deep">
            ⭐ الفارق الحقيقي
          </span>
        )}
        <span className="text-ac-gold text-sm font-bold">{day.label}</span>
        <h3 className="mt-1 font-tajawal font-extrabold text-lg md:text-xl text-white">{day.title}</h3>
        <p className="mt-2 text-ac-muted text-sm md:text-base leading-relaxed">{day.result}</p>
      </motion.div>
    </li>
  );
}

export default function CurriculumSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="curriculum" className="relative w-full bg-ac-navy py-[clamp(4rem,10vw,7rem)] px-5">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="برنامج الدورة — 5 أيام" tone="dark" />
        <div className="mt-5 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-ac-gold px-4 py-2 text-sm font-extrabold text-ac-navy-deep shadow-[0_6px_20px_rgba(212,168,67,0.3)]">
            📅 5 أيام = 5 مشاريع حقيقية
          </span>
        </div>

        <div ref={ref} className="relative mt-12">
          {/* spine track */}
          <span className="absolute start-[18px] md:start-[26px] top-2 bottom-2 w-[3px] -translate-x-1/2 rounded-full bg-white/10" />
          {/* drawn spine */}
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute start-[18px] md:start-[26px] top-2 bottom-2 w-[3px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-ac-gold-light to-ac-gold"
          />
          <ul className="relative">
            {DAYS.map((d) => (
              <DayRow key={d.n} day={d} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
