'use client';

import { motion, useReducedMotion } from 'motion/react';
import { EASE, EASE_BACK, VIEWPORT } from './motion';
import { WhatsAppCTA, MaskedWords, Counter } from './ui';
import { SEATS_LEFT, COURSE_START_LABEL } from './constants';

export default function FinalCTASection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="final-cta"
      className="relative w-full overflow-hidden py-[clamp(5rem,12vw,8rem)] px-5"
      style={{ background: 'linear-gradient(160deg,#1B3A5C 0%,#16324f 50%,#112440 100%)' }}
    >
      {/* full-circle ambient backdrop mirroring the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="ac-aurora absolute -top-[15%] start-[-8%] w-[45vw] h-[45vw] max-w-[560px] max-h-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.12),transparent_65%)] blur-3xl" />
        <div className="ac-aurora-slow absolute bottom-[-20%] end-[-10%] w-[50vw] h-[50vw] max-w-[640px] max-h-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,80,140,0.28),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2
          className="font-tajawal font-extrabold text-white leading-[1.2] text-balance"
          style={{ fontSize: 'clamp(1.8rem,5vw,3.2rem)' }}
        >
          <MaskedWords text="5 أيام تفصلك على مهارة تغيّر حياتك. واش راح تبدا؟" />
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_BACK, delay: 0.3 }}
          className="mt-9 flex justify-center"
        >
          <div className={reduce ? '' : 'ac-pulse-glow rounded-full'}>
            <WhatsAppCTA source="final" big>
              سجّل الآن — أول فوج
            </WhatsAppCTA>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          className="mt-6 text-white font-semibold"
        >
          {/* TODO(placeholder): real remaining seats */}
          بقاو <span dir="ltr" className="font-inter-tight font-extrabold text-ac-gold-light"><Counter target={SEATS_LEFT} /></span> بلاصة
        </motion.p>

        <p className="mt-2 text-ac-muted">
          {/* TODO(placeholder): confirm the cohort start date */}
          انطلاق الفوج الأول: <span className="text-white font-semibold">{COURSE_START_LABEL}</span>
        </p>

        <div className="mt-10">
          <span className="font-tajawal font-black text-2xl tracking-tight text-white">
            GO <span className="text-ac-gold">LLC</span>
          </span>
        </div>
      </div>
    </section>
  );
}
