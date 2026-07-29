'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring } from 'motion/react';
import { EASE, EASE_BACK } from './motion';
import { WhatsAppCTA, MaskedWords } from './ui';

/* ── Magnetic wrapper: primary CTA gently follows the cursor (desktop only) ── */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-8, Math.min(8, mx * 0.3)));
    y.set(Math.max(-8, Math.min(8, my * 0.3)));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* ── Build-timelapse: a website assembles itself inside a browser frame ── */
function BuildTimelapse() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 99 : 0);

  useEffect(() => {
    if (reduce) return;
    let s = 0;
    const advance = () => {
      s = s >= 6 ? 0 : s + 1;
      setStep(s);
    };
    const id = window.setInterval(advance, 900);
    return () => window.clearInterval(id);
  }, [reduce]);

  const on = (n: number) => step >= n;
  const done = step >= 5;

  const block = (visible: boolean, delay = 0) => ({
    initial: false,
    animate: {
      opacity: visible ? 1 : 0,
      y: visible ? 0 : 10,
      scale: visible ? 1 : 0.98,
    },
    transition: { duration: 0.45, ease: EASE, delay },
  });

  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      {/* soft platform glow */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.18),transparent_70%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        animate={done ? { scale: [1, 1.015, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_BACK }}
        className="relative rounded-2xl bg-[#0d1b30] ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
      >
        {/* browser chrome */}
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/10 bg-white/[0.03]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <div className="ms-3 flex-1 h-5 rounded-md bg-white/[0.06] flex items-center px-2">
            <span dir="ltr" className="font-inter-tight text-[9px] text-white/40 truncate">
              {done ? 'https://my-site.dz  ✓' : 'building…'}
            </span>
          </div>
        </div>

        {/* canvas */}
        <div className="relative p-3 space-y-2.5 h-[248px] bg-gradient-to-b from-[#0f2036] to-[#0b1626]">
          {/* generating shimmer sweep while assembling */}
          {!done && !reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ x: '-120%' }}
              animate={{ x: '120%' }}
              transition={{ duration: 1.1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(212,168,67,0.14) 50%, transparent 60%)',
              }}
            />
          )}

          {/* nav */}
          <motion.div {...block(on(1))} className="flex items-center justify-between">
            <div className="w-16 h-3.5 rounded bg-ac-gold/70" />
            <div className="flex gap-1.5">
              <div className="w-8 h-2.5 rounded bg-white/20" />
              <div className="w-8 h-2.5 rounded bg-white/20" />
              <div className="w-8 h-2.5 rounded bg-white/20" />
            </div>
          </motion.div>

          {/* hero block */}
          <motion.div {...block(on(2))} className="rounded-lg bg-white/[0.06] p-3 space-y-2">
            <div className="w-3/4 h-3 rounded bg-white/25" />
            <div className="w-1/2 h-3 rounded bg-white/15" />
            <div className="w-20 h-5 rounded-md bg-ac-gold/80 mt-1" />
          </motion.div>

          {/* cards row */}
          <div className="grid grid-cols-3 gap-2">
            {[3, 3, 4].map((needed, i) => (
              <motion.div
                key={i}
                {...block(on(needed), i * 0.08)}
                className="rounded-lg bg-white/[0.05] h-14 p-1.5 space-y-1"
              >
                <div className="w-full h-6 rounded bg-white/10" />
                <div className="w-2/3 h-1.5 rounded bg-white/15" />
              </motion.div>
            ))}
          </div>

          {/* footer */}
          <motion.div {...block(on(4))} className="rounded-lg bg-white/[0.06] h-8 flex items-center px-2 gap-2">
            <div className="w-10 h-2 rounded bg-white/20" />
            <div className="w-10 h-2 rounded bg-white/15" />
            <div className="ms-auto w-6 h-2 rounded bg-ac-gold/60" />
          </motion.div>

          {/* fake cursor */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="absolute z-30 w-4 h-4"
              animate={{
                top: ['18%', '42%', '70%', '88%', '50%'][Math.min(step, 4)],
                left: ['80%', '30%', '20%', '75%', '50%'][Math.min(step, 4)],
              }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                <path d="M4 2l16 8-6.5 1.8L10 20 4 2z" fill="#fff" stroke="#0b1626" strokeWidth="1" />
              </svg>
            </motion.div>
          )}

          {/* finished pop badge */}
          <motion.div
            aria-hidden
            initial={false}
            animate={done ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.4, ease: EASE_BACK }}
            className="absolute bottom-2.5 end-2.5 z-30 flex items-center gap-1 rounded-full bg-ac-success/90 px-2.5 py-1 text-[10px] font-bold text-white"
          >
            ✓ جاهز
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

const HERO_H1 = 'تعلّم تبني مواقع احترافية بالذكاء الاصطناعي وابدا تربح منها';

export default function HeroSection() {
  const reduce = useReducedMotion();
  const badges = ['🔴 لايف مباشر', '🛠️ تطبيقية 100%', '🤝 مرافقة بعد الدورة'];

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ac-navy flex items-center"
      style={{ background: 'linear-gradient(160deg, #1B3A5C 0%, #16324f 45%, #112440 100%)' }}
    >
      {/* ambient gold orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="ac-aurora absolute -top-[10%] end-[-8%] w-[45vw] h-[45vw] max-w-[560px] max-h-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.12),transparent_65%)] blur-3xl" />
        <div className="ac-aurora-slow absolute bottom-[-15%] start-[-10%] w-[50vw] h-[50vw] max-w-[640px] max-h-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,80,140,0.28),transparent_65%)] blur-3xl" />
      </div>

      {/* logo — appears only in Hero & Footer */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute top-5 start-5 md:top-7 md:start-8 z-20"
      >
        <span className="font-tajawal font-black text-2xl md:text-3xl tracking-tight text-white">
          GO <span className="text-ac-gold">LLC</span>
        </span>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pt-24 pb-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* copy */}
          <div className="text-center lg:text-start order-2 lg:order-1">
            <h1
              className="font-tajawal font-extrabold text-white leading-[1.18] text-balance"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.25rem)' }}
            >
              <MaskedWords text={HERO_H1} delay={0.35} stagger={0.075} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 1.15 }}
              className="mt-5 text-base md:text-xl text-ac-muted font-medium"
            >
              5 أيام لايف | تطبيقية 100% | مرافقة بعد التأسيس
            </motion.p>

            {/* badges */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2.5">
              {badges.map((b, i) => (
                <motion.span
                  key={b}
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_BACK, delay: 1.35 + i * 0.1 }}
                  className="inline-flex items-center rounded-full border border-ac-gold/25 bg-white/[0.04] px-3.5 py-1.5 text-sm font-semibold text-ac-white backdrop-blur-sm"
                >
                  {b}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_BACK, delay: 1.75 }}
              className="mt-8 flex justify-center lg:justify-start"
            >
              <Magnetic>
                <div className={reduce ? '' : 'ac-pulse-glow rounded-full'}>
                  <WhatsAppCTA source="hero" big>
                    سجّل الآن — أول فوج
                  </WhatsAppCTA>
                </div>
              </Magnetic>
            </motion.div>
          </div>

          {/* visual */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="order-1 lg:order-2"
          >
            <BuildTimelapse />
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1], y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 2.2, duration: 0.6 },
            y: { delay: 2.2, duration: 1.6, repeat: Infinity },
          }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-ac-gold/70"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </section>
  );
}
