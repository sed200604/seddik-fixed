'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EASE, VIEWPORT } from './motion';
import { SectionHeading } from './ui';

const FAQ = [
  {
    q: 'ما نعرفش حتى حاجة في البرمجة، ينفع؟',
    a: 'نعم 100%. الدورة مصممة للمبتدئين تماماً. ما راح تكتب حتى سطر كود. الأدوات اللي نستعملوها تخليك تبني مواقع بالكلام والتوجيهات فقط.',
  },
  {
    q: 'واش نقدر نحضر من الهاتف؟',
    a: 'الأفضل لابتوب باش تطبق مباشر. بصح تقدر تتابع من الهاتف وتطبق لاحقاً مع التسجيلات.',
  },
  {
    q: 'إذا ما قدرتش نحضر يوم؟',
    a: 'التسجيل يتوصلك بعد كل جلسة. وإذا حضرت 4 من 5 أيام تاخذ الشهادة عادي.',
  },
  {
    q: 'شنو الفرق بين العرض العادي و VIP؟',
    a: 'العرض العادي يعطيك الدورة كاملة + التسجيلات + الدعم الجماعي. الـ VIP يضيف coaching فردي + متابعة شخصية لشهر + مرافقة حتى تبيع أول موقع.',
  },
  {
    q: 'كيفاه نلقى عملاء بعد الدورة؟',
    a: 'اليوم 5 كامل مخصص لهذا: التسعير، إيجاد العملاء، تقديم العرض. وفي الـ VIP نرافقوك حتى تبيع أول موقع فعلياً.',
  },
  {
    q: 'شنو الـ Backend اللي راح نتعلمو؟',
    a: 'اليوم 4 تتعلم تربط فورم اتصال حقيقي، تضيف نظام دفع، تبني Dashboard للعميل، وتربط واتساب تلقائي. يعني موقعك يولّي يخدم فعلاً ماشي مجرد واجهة.',
  },
  {
    q: 'واش السعر يشمل الأدوات؟',
    a: 'الأدوات اللي نستعملوها فيها نسخ مجانية كافية للبداية. ما تحتاج تدفع حتى حاجة إضافية.',
  },
];

function Item({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="rounded-2xl bg-ac-offwhite ring-1 ring-black/[0.06] overflow-hidden">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-ac-gold/70 focus-visible:ring-inset"
        >
          <span className="font-tajawal font-bold text-ac-navy-deep text-base md:text-lg">{q}</span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={`flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full ${
              open ? 'bg-ac-gold text-ac-navy-deep' : 'bg-white text-ac-ink'
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-ac-ink leading-[1.9]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="relative w-full bg-ac-white py-[clamp(4rem,10vw,7rem)] px-5">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="أسئلة متكررة" title="واش راك تتسائل عليه؟" tone="light" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 space-y-3"
        >
          {FAQ.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
