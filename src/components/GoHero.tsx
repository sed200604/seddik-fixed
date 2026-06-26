'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { trackCTA } from '@/lib/pixel';

/* ── Easing ─────────────────────────────────────────────── */
type EaseTuple = [number, number, number, number];
const EASE: EaseTuple = [0.22, 1, 0.36, 1];

/* ── Reduced-motion hook ─────────────────────────────────── */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return reduced;
}

/* ── Count-up hook ───────────────────────────────────────── */
function useCountUp(target: number, durationMs: number, delayMs: number, skip: boolean) {
  const [val, setVal] = useState(skip ? target : 0);
  useEffect(() => {
    if (skip) { setVal(target); return; }
    const t = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / durationMs, 1);
        setVal(Math.round(p * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delayMs);
    return () => clearTimeout(t);
  }, [target, durationMs, delayMs, skip]);
  return val;
}

/* ── Word-reveal line ────────────────────────────────────── */
function WordLine({
  words,
  delayStart,
  goldLast = false,
  reduced,
}: {
  words: string[];
  delayStart: number;
  goldLast?: boolean;
  reduced: boolean;
}) {
  return (
    <span className="flex gap-x-3" dir="rtl">
      {words.map((word, i) => {
        const gold = goldLast && i === words.length - 1;
        return reduced ? (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
            style={gold ? { color: '#D4A843' } : {}}
          >
            {word}
          </motion.span>
        ) : (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: delayStart + i * 0.09, ease: EASE }}
            className="inline-block"
            style={gold ? { color: '#D4A843' } : {}}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

/* ── Shield mark (custom engraved) ──────────────────────── */
function ShieldMark() {
  return (
    <svg width="32" height="38" viewBox="0 0 40 48" fill="none" aria-label="GO LLC" role="img">
      <path
        d="M20 2L3 9.5V24C3 33.8 10.5 43 20 46C29.5 43 37 33.8 37 24V9.5L20 2Z"
        stroke="#D4A843"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="50%" y="58%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="#D4A843"
        letterSpacing="0.5"
      >
        G·L
      </text>
    </svg>
  );
}

/* ── GoHero ──────────────────────────────────────────────── */
export default function GoHero() {
  const reduced = usePrefersReducedMotion();
  const priceVal = useCountUp(100, 900, 2500, reduced);

  const up = (delay: number, y = 16) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: EASE } };

  return (
    <section
      dir="rtl"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ background: '#0A1628' }}
      aria-labelledby="go-hero-headline"
    >
      {/* ── Film grain ─────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <filter id="go-hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <motion.rect
          width="100%" height="100%"
          filter="url(#go-hero-grain)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.035 }}
          transition={{ duration: reduced ? 0.2 : 1.2 }}
        />
      </svg>

      {/* ── Radial vignette ────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 140% 110% at 50% 50%, transparent 38%, rgba(0,0,0,0.22) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Desktop: 1px gold hairline + serial ────────────── */}
      <div
        className="absolute hidden lg:flex flex-col items-center pointer-events-none"
        aria-hidden="true"
        style={{ left: '80px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={reduced ? { duration: 0.2 } : { duration: 0.8, delay: 0.2, ease: EASE }}
          style={{ width: '1px', height: '240px', background: '#D4A843', transformOrigin: 'top' }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: reduced ? 0 : 0.4 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.8 }}
          style={{
            marginTop: '12px',
            fontSize: '9px',
            letterSpacing: '0.18em',
            color: '#D4A843',
            fontFamily: 'Inter, sans-serif',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          GO LLC · EST. 2026 · ALGERIA → USA
        </motion.span>
      </div>

      {/* ── Desktop: oversized "01" watermark ──────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0 : 0.08 }}
        transition={{ duration: 1, delay: reduced ? 0 : 0.4 }}
        className="absolute hidden lg:block pointer-events-none select-none"
        aria-hidden="true"
        style={{
          left: '-2vw',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '28vw',
          lineHeight: 1,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          color: 'transparent',
          WebkitTextStroke: '1.5px #D4A843',
          zIndex: 1,
        }}
      >
        01
      </motion.div>

      {/* ── Mobile: shield logo ─────────────────────────────── */}
      <div
        className="lg:hidden absolute top-0 left-0 right-0 flex justify-center"
        aria-hidden="true"
        style={{
          paddingTop: 'calc(max(56px, env(safe-area-inset-top, 0px)) + 14px)',
          zIndex: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.24, delay: reduced ? 0 : 0.2 }}
        >
          <ShieldMark />
        </motion.div>
      </div>

      {/* ── Content column ───────────────────────────────────── */}
      <div
        className="
          relative w-full px-6 flex flex-col items-end text-right
          pt-36 pb-24
          lg:pt-0 lg:pb-0
          lg:max-w-[640px] lg:mr-[120px] lg:ml-auto
        "
        style={{ zIndex: 3 }}
      >
        {/* Eyebrow */}
        <motion.span
          {...(reduced
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
            : { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.7, ease: EASE } }
          )}
          className="block mb-5 font-cairo font-semibold"
          style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#D4A843', textTransform: 'uppercase' }}
        >
          الخدمة الوحيدة المخصصة للجزائريين
        </motion.span>

        {/* Headline — word-by-word stagger, «البقاء» in gold */}
        <h1
          id="go-hero-headline"
          className="font-tajawal font-black w-full mb-6 flex flex-col gap-y-1"
          style={{
            fontSize: 'clamp(40px, 5.5vw, 64px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: '#FFFFFF',
          }}
        >
          <WordLine words={['باعولك', 'ورقة...']} delayStart={0.85} reduced={reduced} />
          <WordLine words={['ما', 'باعولكش', 'البقاء']} delayStart={1.21} goldLast reduced={reduced} />
        </h1>

        {/* Sub-headline */}
        <motion.p
          {...up(2.1)}
          className="font-cairo w-full mb-10"
          style={{ fontSize: 'clamp(18px, 2.2vw, 22px)', fontWeight: 500, lineHeight: 1.5, color: '#E8D9B2' }}
        >
          مع Go LLC، كل شيء يختلف
        </motion.p>

        {/* Price badge — 96×96, gold border, count-up numeral */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 2.5, ease: EASE }}
          className="go-hero-price-badge mb-12 flex flex-col items-center justify-center"
          style={{ width: '96px', height: '96px', border: '1px solid #D4A843', flexShrink: 0 }}
        >
          <span
            className="font-bold tabular-nums"
            style={{
              fontSize: '36px',
              color: '#D4A843',
              lineHeight: 1,
              fontFamily: 'Inter, sans-serif',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            ${priceVal}
          </span>
          <span
            style={{
              fontSize: '10px',
              color: '#D4A843',
              letterSpacing: '0.08em',
              marginTop: '6px',
              fontFamily: 'Cairo, sans-serif',
              textAlign: 'center',
              textTransform: 'uppercase',
              lineHeight: 1.3,
            }}
          >
            باقة تأسيس كاملة
          </span>
        </motion.div>

        {/* Primary CTA — solid gold, inner-shadow "pressed leaf", single sheen */}
        <motion.div {...up(3.4, 12)} className="w-full mb-4">
          <a
            href="#book-consultation"
            onClick={() => trackCTA('hero_main')}
            className="go-hero-cta relative flex items-center justify-center w-full font-tajawal font-bold overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A843] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A1628]"
            style={{
              minHeight: '60px',
              height: 'auto',
              padding: '12px 16px',
              textAlign: 'center',
              lineHeight: 1.3,
              fontSize: '18px',
              background: '#D4A843',
              color: '#0A1628',
              textDecoration: 'none',
              boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.12)',
              cursor: 'pointer',
              whiteSpace: 'normal',
            }}
          >
            قم بعمل شركتك امريكية في وايومينغ الان
            {!reduced && <span className="go-hero-sheen" aria-hidden="true" />}
          </a>
        </motion.div>

        {/* Trust micro-line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 4.0 }}
          className="flex items-center gap-2 justify-end"
        >
          <span
            className="go-hero-trust-dot inline-block rounded-full"
            aria-hidden="true"
            style={{ width: '6px', height: '6px', background: '#1DB954', flexShrink: 0 }}
          />
          <span className="font-cairo" style={{ fontSize: '13px', color: '#FFFFFF' }}>
            92/100 حسابات نشطة
          </span>
        </motion.div>

        {/* Scroll cue */}
        {!reduced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 4.4 }}
            className="mt-16 flex justify-center w-full"
            aria-hidden="true"
          >
            <div className="go-hero-scroll-cue" />
          </motion.div>
        )}
      </div>

      {/* ── Scoped styles ─────────────────────────────────────── */}
      <style>{`
        /* CTA transitions */
        .go-hero-cta {
          transition: background 280ms, box-shadow 280ms, transform 280ms;
        }
        @media (hover: hover) {
          .go-hero-cta:hover {
            background: #C99A35 !important;
            box-shadow:
              0 0 0 1px #D4A843,
              0 8px 24px rgba(212,168,67,0.3),
              inset 0 -1px 0 rgba(0,0,0,0.12) !important;
            transform: translateY(-2px);
          }
        }
        .go-hero-cta:active {
          transform: scale(0.97) !important;
          transition: transform 120ms !important;
        }

        /* Gold sheen — single pass, never repeats */
        .go-hero-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 25%,
            rgba(255,255,255,0.14) 50%,
            transparent 75%
          );
          transform: translateX(-100%);
          animation: go-hero-sheen 1.4s cubic-bezier(0.22,1,0.36,1) 3.6s 1 forwards;
          pointer-events: none;
        }
        @keyframes go-hero-sheen {
          from { transform: translateX(-100%); }
          to   { transform: translateX(200%); }
        }

        /* Trust dot pulse — once */
        .go-hero-trust-dot {
          animation: go-hero-pulse 0.8s ease-out 4.1s 1 both;
        }
        @keyframes go-hero-pulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }

        /* Scroll cue line */
        .go-hero-scroll-cue {
          width: 1px;
          height: 24px;
          background: #D4A843;
          position: relative;
          overflow: hidden;
        }
        .go-hero-scroll-cue::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.75);
          animation: go-hero-tick 1.6s cubic-bezier(0.22,1,0.36,1) 4.4s infinite;
        }
        @keyframes go-hero-tick {
          0%   { top: -100%; opacity: 1; }
          100% { top: 200%; opacity: 0; }
        }

        /* Price badge coin-inspect on hover */
        @media (hover: hover) {
          .go-hero-price-badge {
            transition: transform 400ms ease;
            cursor: default;
          }
          .go-hero-price-badge:hover {
            transform: rotate(1.5deg);
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .go-hero-sheen,
          .go-hero-scroll-cue::after,
          .go-hero-trust-dot {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
