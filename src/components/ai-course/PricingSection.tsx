'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { EASE, EASE_BACK, VIEWPORT, staggerContainer, fadeUp } from './motion';
import { SectionHeading, Counter, SelectPlanButton, Countdown, CheckIcon } from './ui';
import { trackViewContent } from './tracking';
import {
  PRICE_STANDARD_OLD,
  PRICE_STANDARD_NEW,
  PRICE_VIP_OLD,
  PRICE_VIP_NEW,
} from './constants';

const STANDARD_FEATURES = [
  '5 أيام لايف مباشر (10 ساعات)',
  'التسجيلات الكاملة (تشوفهم وقتما تحب)',
  'دليل الأدوات PDF',
  'ملف Prompts الأساسية',
  'مجموعة واتساب للدعم',
  'شهادة إتمام',
];

const VIP_FEATURES = [
  'ساعتين Coaching فردي (جلستين × ساعة)',
  'ملف +50 Prompt متقدم حصري',
  'متابعة واتساب شخصية لشهر كامل',
  'مراجعة أول مشروع حقيقي',
  'أولوية في الفوج القادم مجاناً',
  'مرافقة حتى أول عميل',
];

function Price({ oldPrice, newPrice }: { oldPrice: number; newPrice: number }) {
  return (
    <div className="flex items-end gap-3">
      <span className="relative inline-block font-inter-tight font-semibold text-xl text-ac-danger" dir="ltr">
        {oldPrice.toLocaleString('en-US')}
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-[2px] bg-ac-danger"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          style={{ originX: 0 }}
        />
      </span>
      <span dir="ltr" className="font-inter-tight font-extrabold text-4xl md:text-5xl text-ac-gold leading-none">
        <Counter target={newPrice} /> <span className="text-2xl md:text-3xl">دج</span>
      </span>
    </div>
  );
}

function FeatureItem({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.4, ease: EASE, delay }}
      className="flex items-start gap-2.5"
    >
      <span className="mt-0.5 flex-shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-ac-success/15">
        <CheckIcon className="h-3.5 w-3.5 text-ac-success" />
      </span>
      <span className="text-ac-ink leading-relaxed">{text}</span>
    </motion.li>
  );
}

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  useEffect(() => {
    if (inView) trackViewContent();
  }, [inView]);

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative w-full overflow-hidden py-[clamp(4rem,10vw,7rem)] px-5"
      style={{ background: 'linear-gradient(180deg,#112440 0%,#1B3A5C 50%,#112440 100%)' }}
      aria-label="العروض والتسعير"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="العرض"
          title="اختر العرض اللي يناسبك"
          subhead="سعر أول فوج فقط — بمجرد ما يمتلئ، السعر يرجع لعاديّتو."
          tone="dark"
        />

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
        >
          {/* VIP first (emphasized) */}
          <motion.div
            variants={fadeUp}
            className="relative order-1 rounded-2xl bg-white p-6 md:p-8 ring-2 ring-ac-gold shadow-[0_0_50px_-8px_rgba(212,168,67,0.5)]"
          >
            <motion.span
              className="absolute -top-3.5 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ac-gold px-4 py-1 text-sm font-extrabold text-ac-navy-deep shadow-[0_6px_20px_rgba(212,168,67,0.4)]"
              initial={{ opacity: 0, y: -8, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.4, ease: EASE_BACK, delay: 0.2 }}
            >
              ⭐ الأكثر طلباً
            </motion.span>

            <h3 className="mt-2 font-tajawal font-extrabold text-2xl text-ac-navy-deep">العرض VIP</h3>
            <p className="mt-1 text-sm text-ac-ink/70">سعر أول فوج فقط</p>
            <div className="mt-4">
              <Price oldPrice={PRICE_VIP_OLD} newPrice={PRICE_VIP_NEW} />
            </div>

            <p className="mt-5 text-sm font-bold text-ac-navy-deep">كل ما في العرض العادي +:</p>
            <ul className="mt-3 space-y-2.5">
              {VIP_FEATURES.map((f, i) => (
                <FeatureItem key={f} text={f} delay={0.25 + i * 0.07} />
              ))}
            </ul>

            <div className="mt-7">
              <SelectPlanButton plan="vip" emphasized big>
                سجّل الآن — VIP
              </SelectPlanButton>
            </div>
          </motion.div>

          {/* Standard */}
          <motion.div
            variants={fadeUp}
            className="relative order-2 rounded-2xl bg-white p-6 md:p-8 ring-1 ring-black/10 shadow-[0_14px_50px_-20px_rgba(0,0,0,0.5)]"
          >
            <h3 className="font-tajawal font-extrabold text-2xl text-ac-navy-deep">العرض العادي</h3>
            <p className="mt-1 text-sm text-ac-ink/70">سعر أول فوج فقط</p>
            <div className="mt-4">
              <Price oldPrice={PRICE_STANDARD_OLD} newPrice={PRICE_STANDARD_NEW} />
            </div>

            <ul className="mt-6 space-y-2.5">
              {STANDARD_FEATURES.map((f, i) => (
                <FeatureItem key={f} text={f} delay={0.2 + i * 0.06} />
              ))}
            </ul>

            <div className="mt-7">
              <SelectPlanButton plan="standard">سجّل الآن</SelectPlanButton>
            </div>
          </motion.div>
        </motion.div>

        {/* microcopy + urgency */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 text-center space-y-4"
        >
          <p className="text-ac-muted text-lg">
            أقل من قهوة يومية لمدة أسبوع، مقابل مهارة تغيّر حياتك
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-ac-navy-deep/60 px-5 py-3 ring-1 ring-ac-gold/20">
            <span className="text-white font-semibold text-sm">سعر أول فوج ينتهي خلال</span>
            <Countdown />
          </div>
          <p className="text-ac-muted">
            <span dir="ltr" className="font-inter-tight font-bold text-ac-gold-light">12,000 دج</span>{' '}
            = أقل من سعر أول موقع تبيعو (
            <span dir="ltr" className="font-inter-tight">30,000 دج+</span>)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
