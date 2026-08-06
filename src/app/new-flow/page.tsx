'use client';

import React, { useEffect, useState, useRef } from 'react';
import ProblemSection from '@/components/ProblemSection';
import FounderSection from '@/components/FounderSection';
import ValueStackSection from '@/components/ValueStackSection';
import GuaranteeSection from '@/components/GuaranteeSection';
import SocialProofSection from '@/components/SocialProofSection';
import FinalCTASection from '@/components/FinalCTASection';
import FooterSection from '@/components/FooterSection';
import StickyCTABar from '@/components/StickyCTABar';
import FloatingWhatsApp from '@/components/FloatingWhatsAppBtn';

/* ─────────────────────────────────────────────
   FLOATING GOLD EMBERS — ambient luxury particles
   Deterministic configs (no Math.random) to avoid
   SSR/hydration mismatch.
───────────────────────────────────────────── */
const EMBERS = [
  { left: 8,  size: 3, dur: 15, delay: 0,   drift: 14,  o: 0.35 },
  { left: 18, size: 2, dur: 19, delay: 3,   drift: -10, o: 0.25 },
  { left: 27, size: 4, dur: 13, delay: 6,   drift: 18,  o: 0.30 },
  { left: 36, size: 2, dur: 21, delay: 1.5, drift: -16, o: 0.22 },
  { left: 46, size: 3, dur: 17, delay: 8,   drift: 12,  o: 0.32 },
  { left: 55, size: 2, dur: 23, delay: 4,   drift: -8,  o: 0.20 },
  { left: 64, size: 4, dur: 14, delay: 9,   drift: 20,  o: 0.28 },
  { left: 73, size: 2, dur: 20, delay: 2,   drift: -14, o: 0.24 },
  { left: 82, size: 3, dur: 16, delay: 7,   drift: 10,  o: 0.30 },
  { left: 91, size: 2, dur: 22, delay: 5,   drift: -12, o: 0.22 },
  { left: 13, size: 2, dur: 18, delay: 10,  drift: 16,  o: 0.26 },
  { left: 60, size: 3, dur: 24, delay: 11,  drift: -18, o: 0.28 },
];

/* ─────────────────────────────────────────────
   AVATAR CIRCLE — generic silhouette, stacked row
───────────────────────────────────────────── */
function AvatarCircle({ index }: { index: number }) {
  const shades = ['#0D1B2E', '#0F1E36', '#0B1625', '#111E31'];
  return (
    <div
      className="h-avatar"
      style={{
        background: shades[index % shades.length],
        marginLeft: index > 0 ? '-9px' : 0,
        zIndex: 5 - index,
        animationDelay: `${index * 0.4}s`,
      }}
    >
      <svg viewBox="0 0 24 24" width={14} height={14} fill="none">
        <circle cx="12" cy="8.5" r="3.5" fill="rgba(212,168,67,0.55)" />
        <path
          d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"
          stroke="rgba(212,168,67,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────────── */
export default function GoLLCHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [ctaReady, setCtaReady] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  /* Entrance trigger (after fonts settle) */
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;

    const trigger = () => {
      t1 = setTimeout(() => setIsVisible(true), 250);
      // Enable magnetic CTA only after entrance choreography finishes
      t2 = setTimeout(() => setCtaReady(true), 3400);
    };

    const handleLoad = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(trigger);
      } else {
        trigger();
      }
    };

    if (document.readyState === 'complete') handleLoad();
    else window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* Magnetic CTA (desktop / hover-capable pointers only) */
  const handleCtaMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ctaReady) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = ctaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleCtaLeave = () => {
    const el = ctaRef.current;
    if (el) el.style.transform = '';
  };

  const scrollToBooking = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    document.querySelector('#book-consultation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <main
      ref={containerRef}
      className={`hero-root ${isVisible ? 'is-visible' : ''}`}
      dir="rtl"
      id="hero"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* ─── Base ─── */
        .hero-root {
          position: relative;
          min-height: 100svh;
          width: 100%;
          background:
            radial-gradient(120% 90% at 50% -10%, #10243F 0%, transparent 55%),
            radial-gradient(140% 100% at 50% 120%, #0B1626 0%, transparent 60%),
            linear-gradient(180deg, #0A1628 0%, #081120 100%);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-feature-settings: "tnum" 1;
        }

        /* ─── Rotating aurora glow behind the headline ─── */
        .h-aurora {
          position: absolute;
          top: 26%;
          left: 50%;
          width: 720px;
          height: 720px;
          margin-left: -360px;
          margin-top: -360px;
          pointer-events: none;
          z-index: 0;
          background: conic-gradient(
            from 0deg,
            rgba(212,168,67,0.00) 0deg,
            rgba(212,168,67,0.10) 70deg,
            rgba(212,168,67,0.00) 150deg,
            rgba(212,168,67,0.07) 250deg,
            rgba(212,168,67,0.00) 360deg
          );
          filter: blur(70px);
          opacity: 0;
          border-radius: 50%;
        }

        /* ─── Soft gold core glow ─── */
        .h-glow {
          position: absolute;
          top: 28%;
          left: 50%;
          transform: translateX(-50%);
          width: 480px;
          height: 340px;
          background: radial-gradient(ellipse at center, rgba(212,168,67,0.10) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          filter: blur(46px);
          opacity: 0;
        }

        /* ─── Fine luxury grid (barely-there) ─── */
        .h-grid {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(212,168,67,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,168,67,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 75%);
                  mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 75%);
          opacity: 0;
        }

        /* ─── Floating embers ─── */
        .h-embers { position: absolute; inset: 0; z-index: 2; pointer-events: none; overflow: hidden; }
        .h-ember {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, #E8C979 0%, #D4A843 45%, transparent 70%);
          box-shadow: 0 0 8px rgba(212,168,67,0.55);
        }

        /* ─── Grain (fixed) ─── */
        .h-grain {
          position: fixed; inset: 0; z-index: 10; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0; mix-blend-mode: overlay;
        }

        /* ─── Vignette ─── */
        .h-vignette {
          position: fixed; inset: 0; pointer-events: none; z-index: 5;
          background: radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.16) 100%);
        }

        /* ─── Main content column ─── */
        .h-col {
          position: relative; z-index: 20;
          width: 100%; max-width: 560px;
          padding: 48px 24px 72px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
        }

        /* ─── Logo bar ─── */
        .h-logo-bar {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 40px; opacity: 0; transform: translateY(10px);
        }
        .h-logo-shield { filter: drop-shadow(0 2px 8px rgba(212,168,67,0.28)); }
        .h-logo-name {
          font-family: var(--font-inter-tight, 'Inter Tight');
          font-weight: 800; font-size: 20px; color: #D4A843;
          letter-spacing: -0.01em; line-height: 1;
        }
        .h-hairline {
          width: 1px; height: 32px; flex-shrink: 0;
          background: linear-gradient(180deg, transparent, rgba(212,168,67,0.45), transparent);
          transform: scaleY(0); transform-origin: center;
        }
        .h-tagline-small {
          font-family: var(--font-cairo, Cairo);
          font-weight: 500; font-size: 11px; color: rgba(255,255,255,0.50);
          letter-spacing: 0.04em; text-align: right; line-height: 1.4;
        }

        /* ─── Pill badge with rotating shimmer border ─── */
        .h-pill-badge {
          position: relative; display: inline-flex; align-items: center; gap: 7px;
          padding: 7px 16px; border-radius: 999px;
          font-family: var(--font-cairo, Cairo); font-weight: 600; font-size: 11px;
          color: #EED9A0; letter-spacing: 0.08em;
          margin-bottom: 20px; opacity: 0; transform: translateY(8px);
          background: rgba(15,30,54,0.70);
          isolation: isolate; overflow: hidden;
        }
        /* animated conic ring */
        .h-pill-badge::before {
          content: ''; position: absolute; inset: 0; padding: 1px; border-radius: inherit;
          background: conic-gradient(from 0deg, rgba(212,168,67,0.15), rgba(212,168,67,0.75), rgba(212,168,67,0.15) 60%, rgba(212,168,67,0.15));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          z-index: -1;
        }
        .h-badge-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #D4A843; flex-shrink: 0;
          box-shadow: 0 0 8px rgba(212,168,67,0.9);
        }

        /* ─── Headline ─── */
        .h-headline {
          font-family: var(--font-tajawal, Tajawal);
          font-weight: 800; font-size: clamp(31px, 8.4vw, 46px);
          color: #FFFFFF; letter-spacing: -0.02em; line-height: 1.42;
          text-align: center; margin: 0 0 20px 0; direction: rtl;
        }
        .h-headline .h-line { display: block; }
        .h-gold {
          position: relative; color: #D4A843;
          text-shadow: 0 0 26px rgba(212,168,67,0.35);
        }
        /* gold underline sweep under the highlighted word */
        .h-gold::after {
          content: ''; position: absolute; right: 0; bottom: -6px; height: 2px; width: 100%;
          background: linear-gradient(90deg, transparent, #D4A843, transparent);
          transform: scaleX(0); transform-origin: right; border-radius: 2px;
        }
        .h-w1, .h-w2, .h-w3, .h-w4 {
          display: inline-block; opacity: 0;
          transform: translateY(22px); filter: blur(6px);
        }

        /* ─── Ornamental divider ─── */
        .h-ornament {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          width: 200px; margin: 0 0 22px; opacity: 0;
        }
        .h-orn-line { height: 1px; flex: 1; background: linear-gradient(90deg, transparent, rgba(212,168,67,0.5)); }
        .h-orn-line.rev { background: linear-gradient(270deg, transparent, rgba(212,168,67,0.5)); }
        .h-orn-diamond {
          width: 7px; height: 7px; background: #D4A843; transform: rotate(45deg);
          box-shadow: 0 0 10px rgba(212,168,67,0.7); flex-shrink: 0;
        }

        /* ─── Sub-headline ─── */
        .h-sub {
          font-family: var(--font-cairo, Cairo);
          font-weight: 500; font-size: clamp(16px, 4vw, 20px);
          color: rgba(232,217,178,0.92); line-height: 1.6;
          text-align: center; margin: 0 0 40px 0;
          opacity: 0; transform: translateY(12px); filter: blur(4px);
        }

        /* ─── Price card (glass + glow ring) ─── */
        .h-price-card {
          position: relative; display: inline-flex; flex-direction: column;
          align-items: center; gap: 6px; padding: 18px 32px;
          border-radius: 16px; margin-bottom: 34px;
          background: linear-gradient(180deg, rgba(18,34,60,0.72), rgba(11,22,37,0.72));
          border: 1px solid rgba(212,168,67,0.22);
          box-shadow: 0 20px 50px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05);
          -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
          opacity: 0; transform: translateY(10px); direction: ltr;
          isolation: isolate;
        }
        /* rotating glow ring */
        .h-price-card::before {
          content: ''; position: absolute; inset: -1px; border-radius: 16px; padding: 1px;
          background: conic-gradient(from 0deg, transparent, rgba(212,168,67,0.55), transparent 40%, transparent 60%, rgba(212,168,67,0.35), transparent);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          z-index: -1; opacity: 0.9;
        }
        .h-save-tag {
          position: absolute; top: -12px; right: -8px; direction: rtl;
          font-family: var(--font-cairo, Cairo); font-weight: 700; font-size: 11px;
          color: #0A1628; background: #D4A843; padding: 3px 10px; border-radius: 999px;
          box-shadow: 0 4px 14px rgba(212,168,67,0.45);
          letter-spacing: 0.02em;
        }
        .h-price-row { display: flex; align-items: center; gap: 12px; }
        .h-price-original {
          font-family: var(--font-inter-tight, 'Inter Tight'); font-weight: 700; font-size: 18px;
          color: rgba(201,210,222,0.50); text-decoration: line-through;
          text-decoration-color: rgba(200,55,45,0.70); text-decoration-thickness: 1.5px;
          font-feature-settings: "tnum" 1;
        }
        .h-price-offer {
          font-family: var(--font-inter-tight, 'Inter Tight'); font-weight: 800; font-size: 38px;
          color: #D4A843; letter-spacing: -0.02em; line-height: 1; font-feature-settings: "tnum" 1;
          text-shadow: 0 0 24px rgba(212,168,67,0.3);
        }
        .h-price-label {
          font-family: var(--font-cairo, Cairo); font-weight: 500; font-size: 12px;
          color: rgba(232,217,178,0.68); direction: rtl; text-align: center; letter-spacing: 0.04em;
        }

        /* ─── Primary CTA ─── */
        .h-cta {
          width: 88%; max-width: 420px; min-height: 58px;
          padding: 13px 20px; display: flex; align-items: center; justify-content: center; gap: 10px;
          line-height: 1.3; border-radius: 30px; background: #D4A843; border: none; cursor: pointer;
          font-family: var(--font-tajawal, Tajawal); font-weight: 700; font-size: 18px; color: #0A1628;
          position: relative; overflow: hidden; margin-bottom: 26px;
          opacity: 0; transform: translateY(10px); white-space: normal;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.20),
            inset 0 -1px 0 rgba(0,0,0,0.12),
            0 0 0 1px rgba(212,168,67,0.30),
            0 6px 22px rgba(212,168,67,0.32),
            0 10px 34px rgba(212,168,67,0.14),
            0 2px 4px rgba(0,0,0,0.22);
          transition:
            transform 220ms cubic-bezier(0.22,1,0.36,1),
            background-color 200ms cubic-bezier(0.22,1,0.36,1),
            box-shadow 200ms cubic-bezier(0.22,1,0.36,1);
        }
        .h-cta-label { position: relative; z-index: 2; }
        .h-cta-arrow { position: relative; z-index: 2; display: inline-flex; }
        .h-cta:active { transform: scale(0.97) !important;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.12), 0 0 0 1px rgba(212,168,67,0.25), 0 2px 8px rgba(212,168,67,0.18);
        }
        @media (min-width: 768px) {
          .h-cta:hover { background-color: #C99A35;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.12), 0 0 0 1px rgba(212,168,67,0.5), 0 8px 30px rgba(212,168,67,0.45), 0 16px 46px rgba(212,168,67,0.20), 0 2px 4px rgba(0,0,0,0.22);
          }
        }
        .h-cta:focus-visible { outline: 2px solid #D4A843; outline-offset: 4px; }

        /* looping sheen */
        .h-cta-sheen {
          position: absolute; inset: 0; border-radius: 30px; z-index: 1;
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%);
          background-size: 220% 100%; background-position: -220% 0; pointer-events: none;
        }

        /* ─── Reassurance micro-row under CTA ─── */
        .h-reassure {
          display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;
          margin-bottom: 34px; opacity: 0;
        }
        .h-reassure span {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-cairo, Cairo); font-weight: 500; font-size: 12px;
          color: rgba(255,255,255,0.62);
        }
        .h-reassure svg { color: #D4A843; }

        /* ─── Social proof ─── */
        .h-social-proof { display: flex; flex-direction: column; align-items: center; gap: 12px; opacity: 0; }
        .h-avatars { display: flex; flex-direction: row-reverse; align-items: center; }
        .h-avatar {
          width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; position: relative;
          border: 1.5px solid rgba(212,168,67,0.35);
          display: flex; align-items: center; justify-content: center;
        }
        .is-visible .h-avatar { animation: h-avatar-float 4s ease-in-out infinite; }
        .h-proof-text { font-family: var(--font-cairo, Cairo); font-weight: 500; font-size: 13px; color: rgba(255,255,255,0.72); direction: rtl; }
        .h-proof-live { display: flex; align-items: center; gap: 7px; }
        .h-proof-num { color: #D4A843; font-weight: 700; font-feature-settings: "tnum" 1; }
        .h-live-dot { position: relative; width: 7px; height: 7px; border-radius: 50%; background: #1DB954; flex-shrink: 0; }
        .h-live-dot::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%; background: #1DB954;
          animation: h-ripple 2s ease-out infinite;
        }

        /* ─── Progress bar (92/100) ─── */
        .h-progress-track { width: 180px; height: 4px; background: rgba(212,168,67,0.14); border-radius: 999px; overflow: hidden; }
        .h-progress-fill {
          height: 100%; width: 92%;
          background: linear-gradient(90deg, #C99A35, #E8C979, #D4A843);
          background-size: 200% 100%; border-radius: 999px;
          transform-origin: right; transform: scaleX(0);
          transition: transform 1400ms cubic-bezier(0.22,1,0.36,1);
        }
        .h-progress-fill.filled { transform: scaleX(1); animation: h-shimmer-bg 2.5s linear infinite; }

        /* ─── Scroll cue ─── */
        .h-scroll-cue { margin-top: 46px; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0; }
        .h-scroll-label { font-family: var(--font-cairo, Cairo); font-size: 10px; letter-spacing: 0.2em; color: rgba(232,217,178,0.4); }
        .h-scroll-track { position: relative; width: 1px; height: 30px; background: rgba(212,168,67,0.22); overflow: hidden; }
        .h-scroll-segment { position: absolute; inset: 0; height: 15px; background: linear-gradient(to bottom, transparent, #FFFFFF, transparent); transform: translateY(-100%); }

        /* ─────────────────────────────────────────────
           AMBIENT (always-on, subtle) — respects reduced motion
        ───────────────────────────────────────────── */
        @media (prefers-reduced-motion: no-preference) {
          .h-aurora  { animation: h-aurora-in 1400ms ease 200ms forwards, h-spin 44s linear 1600ms infinite; }
          .h-glow    { animation: h-fade-to 1200ms ease 200ms forwards, h-breathe 7s ease-in-out 1400ms infinite; }
          .h-grid    { animation: h-fade-grid 1400ms ease 300ms forwards; }
          .h-ember   { animation: h-ember-rise var(--dur,18s) linear var(--delay,0s) infinite; }
          .h-pill-badge::before { animation: h-spin 6s linear infinite; }
          .h-price-card::before { animation: h-spin 8s linear infinite; }
        }

        /* ─────────────────────────────────────────────
           ENTRANCE CHOREOGRAPHY
        ───────────────────────────────────────────── */
        @media (prefers-reduced-motion: no-preference) {
          .is-visible .h-grain { animation: h-grain-fade 1000ms ease forwards; }
          .is-visible .h-logo-bar { animation: h-slide-up 700ms cubic-bezier(0.22,1,0.36,1) 300ms forwards; }
          .is-visible .h-hairline { animation: h-draw-y 600ms cubic-bezier(0.22,1,0.36,1) 500ms forwards; }
          .is-visible .h-pill-badge { animation: h-slide-up 650ms cubic-bezier(0.22,1,0.36,1) 650ms forwards; }

          .is-visible .h-w1 { animation: h-word-in 750ms cubic-bezier(0.22,1,0.36,1) 900ms forwards; }
          .is-visible .h-w2 { animation: h-word-in 750ms cubic-bezier(0.22,1,0.36,1) 1030ms forwards; }
          .is-visible .h-w3 { animation: h-word-in 750ms cubic-bezier(0.22,1,0.36,1) 1180ms forwards; }
          .is-visible .h-w4 { animation: h-word-in 750ms cubic-bezier(0.22,1,0.36,1) 1330ms forwards; }
          .is-visible .h-gold::after { animation: h-underline 700ms cubic-bezier(0.22,1,0.36,1) 2050ms forwards; }

          .is-visible .h-ornament { animation: h-fade-only 700ms ease 1650ms forwards; }
          .is-visible .h-sub { animation: h-blur-up 700ms cubic-bezier(0.22,1,0.36,1) 1850ms forwards; }
          .is-visible .h-price-card { animation: h-slide-up 650ms cubic-bezier(0.22,1,0.36,1) 2200ms forwards; }
          .is-visible .h-cta { animation: h-slide-up 650ms cubic-bezier(0.22,1,0.36,1) 2650ms forwards; }
          .is-visible .h-cta-sheen { animation: h-sheen 3600ms cubic-bezier(0.4,0,0.2,1) 3200ms infinite; }
          .is-visible .h-reassure { animation: h-fade-only 600ms ease 3000ms forwards; }
          .is-visible .h-social-proof { animation: h-fade-only 600ms ease 3300ms forwards; }
          .is-visible .h-scroll-cue { animation: h-fade-only 500ms ease 3800ms forwards; }
          .is-visible .h-scroll-segment { animation: h-scroll-travel 1900ms cubic-bezier(0.22,1,0.36,1) 4000ms infinite; }
        }

        /* ─── Reduced motion fallback ─── */
        @media (prefers-reduced-motion: reduce) {
          .h-aurora, .h-glow, .h-grid { opacity: 1; }
          .h-hairline, .h-progress-fill { transform: none; }
          .is-visible .h-logo-bar, .is-visible .h-pill-badge,
          .is-visible .h-w1, .is-visible .h-w2, .is-visible .h-w3, .is-visible .h-w4,
          .is-visible .h-ornament, .is-visible .h-sub, .is-visible .h-price-card,
          .is-visible .h-cta, .is-visible .h-reassure, .is-visible .h-social-proof,
          .is-visible .h-scroll-cue {
            animation: h-fade-only 250ms ease forwards; transform: none; filter: none; opacity: 1;
          }
          .h-w1, .h-w2, .h-w3, .h-w4 { filter: none; }
          .is-visible .h-grain { opacity: 0.03; }
        }

        /* ─── Keyframes ─── */
        @keyframes h-grain-fade { to { opacity: 0.035; } }
        @keyframes h-fade-only  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes h-fade-to    { to { opacity: 1; } }
        @keyframes h-fade-grid  { to { opacity: 1; } }
        @keyframes h-aurora-in  { to { opacity: 1; } }
        @keyframes h-slide-up   { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes h-word-in    { from { opacity: 0; transform: translateY(22px); filter: blur(6px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes h-blur-up    { from { opacity: 0; transform: translateY(12px); filter: blur(4px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes h-draw-y     { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes h-underline  { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes h-spin       { to { transform: rotate(360deg); } }
        @keyframes h-breathe    { 0%,100% { opacity: 0.75; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.08); } }
        @keyframes h-sheen      { 0% { background-position: -220% 0; } 24%,100% { background-position: 220% 0; } }
        @keyframes h-shimmer-bg { to { background-position: 200% 0; } }
        @keyframes h-avatar-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes h-ripple     { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(3.2); opacity: 0; } }
        @keyframes h-scroll-travel { 0% { transform: translateY(-100%); } 100% { transform: translateY(30px); } }
        @keyframes h-ember-rise {
          0%   { transform: translate(0, 0); opacity: 0; }
          10%  { opacity: var(--o, 0.3); }
          90%  { opacity: var(--o, 0.3); }
          100% { transform: translate(var(--drift, 12px), -108svh); opacity: 0; }
        }
      `}} />

      {/* Background layers */}
      <div className="h-aurora" aria-hidden="true" />
      <div className="h-glow" aria-hidden="true" />
      <div className="h-grid" aria-hidden="true" />
      <div className="h-embers" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="h-ember"
            style={{
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              // @ts-expect-error CSS custom props
              '--dur': `${e.dur}s`,
              '--delay': `${e.delay}s`,
              '--drift': `${e.drift}px`,
              '--o': e.o,
            }}
          />
        ))}
      </div>
      <div className="h-grain" aria-hidden="true" />
      <div className="h-vignette" aria-hidden="true" />

      {/* ── CONTENT COLUMN ── */}
      <div className="h-col">

        {/* 1. LOGO BAR */}
        <div className="h-logo-bar" role="banner">
          <svg className="h-logo-shield" viewBox="0 0 40 40" width={40} height={40} fill="none"
            stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            aria-label="Go LLC shield logo"
          >
            <path d="M20 4 L34 9 V20 C34 29.5 20 36 20 36 C20 36 6 29.5 6 20 V9 Z" />
            <path d="M14 20 L18 24 L26 15" />
          </svg>
          <div className="h-hairline" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
            <span className="h-logo-name">Go LLC</span>
            <span className="h-tagline-small">شركتك تعيش معنا</span>
          </div>
        </div>

        {/* 2. PILL BADGE */}
        <div className="h-pill-badge" role="note" aria-label="الخدمة الوحيدة المخصصة للجزائريين">
          <span className="h-badge-dot" aria-hidden="true" />
          الخدمة الوحيدة المخصصة للجزائريين
        </div>

        {/* 3. HEADLINE */}
        <h1 className="h-headline">
          <span className="h-line">
            <span className="h-w1">باعولك&nbsp;</span>
            <span className="h-w2">ورقة...</span>
          </span>
          <span className="h-line">
            <span className="h-w3">ما باعولكش&nbsp;</span>
            <span className="h-w4 h-gold">البقاء</span>
          </span>
        </h1>

        {/* 4. ORNAMENT */}
        <div className="h-ornament" aria-hidden="true">
          <span className="h-orn-line" />
          <span className="h-orn-diamond" />
          <span className="h-orn-line rev" />
        </div>

        {/* 5. SUB-HEADLINE */}
        <p className="h-sub" aria-label="مع Go LLC، كل شيء يختلف">
          مع Go LLC، كل شيء يختلف
        </p>

        {/* 6. PRICE CARD */}
        <div className="h-price-card" aria-label="السعر: 220 دولار بدلاً من 250 دولار">
          <span className="h-save-tag" aria-hidden="true">وفّر $30</span>
          <div className="h-price-row">
            <span className="h-price-original">$250</span>
            <span className="h-price-offer">$220</span>
          </div>
          <span className="h-price-label">باقة التأسيس الكاملة · شراكة دائمة</span>
        </div>

        {/* 7. PRIMARY CTA */}
        <button
          ref={ctaRef}
          className="h-cta"
          aria-label="قم بعمل شركتك امريكية في وايومينغ الان"
          onClick={scrollToBooking}
          onMouseMove={handleCtaMove}
          onMouseLeave={handleCtaLeave}
        >
          <span className="h-cta-sheen" aria-hidden="true" />
          <span className="h-cta-label">قم بعمل شركتك امريكية في وايومينغ الان</span>
          <span className="h-cta-arrow" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </span>
        </button>

        {/* 8. REASSURANCE ROW */}
        <div className="h-reassure" aria-hidden="true">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            بدون سفر
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            دعم دائم
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            ضمان الرضا
          </span>
        </div>

        {/* 9. SOCIAL PROOF */}
        <div className="h-social-proof" aria-label="92 عميل نشط">
          <div className="h-avatars">
            {[0, 1, 2, 3].map(i => <AvatarCircle key={i} index={i} />)}
          </div>
          <SocialProgressBar visible={isVisible} />
          <div className="h-proof-live">
            <div className="h-live-dot" aria-hidden="true" />
            <span className="h-proof-text">
              <ClientCounter visible={isVisible} target={92} /> عميل نشط من أصل 100 مقعد
            </span>
          </div>
        </div>

        {/* 10. SCROLL CUE */}
        <div className="h-scroll-cue" aria-hidden="true">
          <span className="h-scroll-label">اكتشف المزيد</span>
          <div className="h-scroll-track">
            <div className="h-scroll-segment" />
          </div>
        </div>

      </div>
    </main>

    {/* ── BELOW-FOLD SECTIONS ── */}
    <ProblemSection />
    <FounderSection />
    <ValueStackSection />
    <GuaranteeSection />
    <SocialProofSection />
    <FinalCTASection />
    <FooterSection />

    {/* ── GLOBAL STICKY ELEMENTS ── */}
    <StickyCTABar />
    <FloatingWhatsApp />
    </>
  );
}

/* ─────────────────────────────────────────────
   COUNT-UP — animates 0 → target when hero visible
───────────────────────────────────────────── */
function ClientCounter({ visible, target }: { visible: boolean; target: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    let start = 0;
    const delay = setTimeout(() => {
      const dur = 1400;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, 3400);
    return () => { clearTimeout(delay); cancelAnimationFrame(raf); };
  }, [visible, target]);
  return <span className="h-proof-num">{n}</span>;
}

/* ─────────────────────────────────────────────
   PROGRESS BAR — animates fill when hero visible
───────────────────────────────────────────── */
function SocialProgressBar({ visible }: { visible: boolean }) {
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setFilled(true), 3500);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div
      className="h-progress-track"
      role="progressbar"
      aria-valuenow={92}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="92 من أصل 100 مقعد ممتلئة"
    >
      <div className={`h-progress-fill${filled ? ' filled' : ''}`} />
    </div>
  );
}
