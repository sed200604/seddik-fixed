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
   AVATAR CIRCLE — generic silhouette, stacked row
───────────────────────────────────────────── */
function AvatarCircle({ index }: { index: number }) {
  const shades = ['#0D1B2E', '#0F1E36', '#0B1625', '#111E31'];
  return (
    <div
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: shades[index % shades.length],
        border: '1.5px solid rgba(212,168,67,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginLeft: index > 0 ? '-9px' : 0,
        position: 'relative',
        zIndex: 5 - index,
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
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerAnimation = () => {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 300);
    };

    const handleLoad = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(triggerAnimation);
      } else {
        triggerAnimation();
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
  }, []);

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
          background: #0A1628;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-feature-settings: "tnum" 1;
        }

        /* ─── Grain (fixed, covers whole page) ─── */
        .h-grain {
          position: fixed;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0;
          mix-blend-mode: overlay;
        }

        /* ─── Vignette ─── */
        .h-vignette {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 5;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.10) 100%);
        }

        /* ─── Soft gold glow behind headline ─── */
        .h-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translateX(-50%);
          width: 480px;
          height: 320px;
          background: radial-gradient(ellipse at center, rgba(212,168,67,0.065) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          filter: blur(40px);
        }

        /* ─── Main content column ─── */
        .h-col {
          position: relative;
          z-index: 20;
          width: 100%;
          max-width: 560px;
          padding: 0 24px;
          padding-top: 48px;
          padding-bottom: 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* ─── Logo bar ─── */
        .h-logo-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(10px);
        }
        .h-logo-name {
          font-family: var(--font-inter-tight, 'Inter Tight');
          font-weight: 800;
          font-size: 20px;
          color: #D4A843;
          letter-spacing: -0.01em;
          line-height: 1;
        }
        .h-hairline {
          width: 1px;
          height: 32px;
          background: rgba(212,168,67,0.30);
          flex-shrink: 0;
        }
        .h-tagline-small {
          font-family: var(--font-cairo, Cairo);
          font-weight: 500;
          font-size: 11px;
          color: rgba(255,255,255,0.50);
          letter-spacing: 0.04em;
          text-align: right;
          line-height: 1.4;
        }

        /* ─── Pill badge ─── */
        .h-pill-badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          border: 1px solid rgba(212,168,67,0.45);
          border-radius: 2px;
          font-family: var(--font-cairo, Cairo);
          font-weight: 600;
          font-size: 11px;
          color: #D4A843;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(8px);
          position: relative;
          overflow: hidden;
        }
        /* Subtle shimmer on badge */
        .h-pill-badge::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(212,168,67,0.06);
          pointer-events: none;
        }

        /* ─── Headline ─── */
        .h-headline {
          font-family: var(--font-tajawal, Tajawal);
          font-weight: 800;
          font-size: clamp(30px, 8vw, 42px);
          color: #FFFFFF;
          letter-spacing: -0.02em;
          line-height: 1.4;
          text-align: center;
          margin: 0 0 24px 0;
          direction: rtl;
        }
        .h-headline .h-gold {
          color: #D4A843;
          /* Same weight as rest — just color-shifted. No weight change. */
        }
        .h-headline .h-line { display: block; }

        /* Animated words */
        .h-w1, .h-w2, .h-w3, .h-w4 {
          display: inline-block;
          opacity: 0;
          transform: translateY(20px);
        }

        /* ─── Sub-headline ─── */
        .h-sub {
          font-family: var(--font-cairo, Cairo);
          font-weight: 500;
          font-size: clamp(16px, 4vw, 20px);
          color: rgba(232,217,178,0.90);
          line-height: 1.6;
          text-align: center;
          margin: 0 0 48px 0;
          opacity: 0;
          transform: translateY(12px);
        }

        /* ─── Inline price card ─── */
        .h-price-card {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 16px 28px;
          border: 1px solid rgba(212,168,67,0.25);
          border-radius: 12px;
          background: rgba(15,30,54,0.60);
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(10px);
          direction: ltr; /* price numbers always LTR */
        }
        .h-price-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .h-price-original {
          font-family: var(--font-inter-tight, 'Inter Tight');
          font-weight: 700;
          font-size: 18px;
          color: rgba(201,210,222,0.50);
          text-decoration: line-through;
          text-decoration-color: rgba(200,55,45,0.70);
          text-decoration-thickness: 1.5px;
          font-feature-settings: "tnum" 1;
        }
        .h-price-offer {
          font-family: var(--font-inter-tight, 'Inter Tight');
          font-weight: 800;
          font-size: 36px;
          color: #D4A843;
          letter-spacing: -0.02em;
          line-height: 1;
          font-feature-settings: "tnum" 1;
        }
        .h-price-label {
          font-family: var(--font-cairo, Cairo);
          font-weight: 500;
          font-size: 12px;
          color: rgba(232,217,178,0.65);
          direction: rtl;
          text-align: center;
          letter-spacing: 0.04em;
        }

        /* ─── Primary CTA ─── */
        .h-cta {
          width: 85%;
          max-width: 400px;
          height: auto;
          min-height: 56px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1.3;
          border-radius: 28px;
          background: #D4A843;
          border: none;
          cursor: pointer;
          font-family: var(--font-tajawal, Tajawal);
          font-weight: 700;
          font-size: 18px;
          color: #0A1628;
          position: relative;
          overflow: hidden;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(10px);

          /* Foil-stamp compound shadow */
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            inset 0 -1px 0 rgba(0,0,0,0.12),
            0 0 0 1px rgba(212,168,67,0.30),
            0 4px 20px rgba(212,168,67,0.30),
            0 8px 32px rgba(212,168,67,0.14),
            0 2px 4px rgba(0,0,0,0.20);

          transition:
            transform 120ms cubic-bezier(0.34,1.4,0.64,1),
            background-color 200ms cubic-bezier(0.22,1,0.36,1),
            box-shadow 200ms cubic-bezier(0.22,1,0.36,1);
          white-space: normal;
        }
        .h-cta:active {
          transform: scale(0.97) !important;
          box-shadow:
            inset 0 2px 4px rgba(255,255,255,0.20),
            inset 0 -1px 0 rgba(0,0,0,0.12),
            0 0 0 1px rgba(212,168,67,0.25),
            0 2px 8px rgba(212,168,67,0.18);
        }
        @media (min-width: 768px) {
          .h-cta:hover {
            background-color: #C99A35;
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.18),
              inset 0 -1px 0 rgba(0,0,0,0.12),
              0 0 0 1px rgba(212,168,67,0.45),
              0 4px 24px rgba(212,168,67,0.40),
              0 12px 40px rgba(212,168,67,0.18),
              0 2px 4px rgba(0,0,0,0.20);
          }
        }
        .h-cta:focus-visible {
          outline: 2px solid #D4A843;
          outline-offset: 4px;
        }

        /* Gold sheen sweep (once, on entrance) */
        .h-cta-sheen {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(255,255,255,0.16) 50%,
            transparent 70%
          );
          background-size: 200% 100%;
          background-position: -200% 0;
          pointer-events: none;
        }
        @keyframes cta-sheen-once {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* ─── Social proof row ─── */
        .h-social-proof {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
        }
        .h-avatars {
          display: flex;
          flex-direction: row-reverse; /* RTL stacking */
          align-items: center;
        }
        .h-proof-text {
          font-family: var(--font-cairo, Cairo);
          font-weight: 500;
          font-size: 13px;
          color: rgba(255,255,255,0.70);
          direction: rtl;
        }
        .h-proof-live {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .h-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1DB954;
          flex-shrink: 0;
        }

        /* ─── Progress bar (92/100) ─── */
        .h-progress-track {
          width: 160px;
          height: 3px;
          background: rgba(212,168,67,0.15);
          border-radius: 0;
          overflow: hidden;
        }
        .h-progress-fill {
          height: 100%;
          width: 92%;
          background: #D4A843;
          border-radius: 0;
          transform-origin: right;
          transform: scaleX(0);
          transition: transform 1200ms cubic-bezier(0.22,1,0.36,1);
        }
        .h-progress-fill.filled {
          transform: scaleX(1);
        }

        /* ─── Scroll cue ─── */
        .h-scroll-cue {
          margin-top: 48px;
          display: flex;
          justify-content: center;
          opacity: 0;
        }
        .h-scroll-track {
          position: relative;
          width: 1px;
          height: 28px;
          background: rgba(212,168,67,0.25);
          overflow: hidden;
        }
        .h-scroll-segment {
          position: absolute;
          inset: 0;
          height: 14px;
          background: linear-gradient(to bottom, transparent, #FFFFFF, transparent);
          transform: translateY(-100%);
        }

        /* ─────────────────────────────────────────────
           ANIMATION CHOREOGRAPHY (prefers-reduced-motion: no-preference)
           T+0:   grain + vignette
           T+400: logo bar
           T+650: pill badge
           T+900: headline line 1
           T+1050: headline line 2 (words stagger)
           T+1700: subhead
           T+2100: price card
           T+2600: CTA
           T+3000: CTA sheen sweep
           T+3500: social proof + progress bar fills
           T+4000: scroll cue
        ───────────────────────────────────────────── */
        @media (prefers-reduced-motion: no-preference) {
          .is-visible .h-grain {
            animation: h-grain-fade 1000ms ease forwards;
          }

          /* Logo bar */
          .is-visible .h-logo-bar {
            animation: h-slide-up 600ms cubic-bezier(0.22,1,0.36,1) 400ms forwards;
          }

          /* Pill badge */
          .is-visible .h-pill-badge {
            animation: h-slide-up 550ms cubic-bezier(0.22,1,0.36,1) 650ms forwards;
          }

          /* Headline words */
          .is-visible .h-w1 { animation: h-word-up 650ms cubic-bezier(0.22,1,0.36,1) 900ms forwards; }
          .is-visible .h-w2 { animation: h-word-up 650ms cubic-bezier(0.22,1,0.36,1) 1000ms forwards; }
          .is-visible .h-w3 { animation: h-word-up 650ms cubic-bezier(0.22,1,0.36,1) 1120ms forwards; }
          .is-visible .h-w4 { animation: h-word-up 650ms cubic-bezier(0.22,1,0.36,1) 1240ms forwards; }

          /* Subhead */
          .is-visible .h-sub {
            animation: h-slide-up 600ms cubic-bezier(0.22,1,0.36,1) 1700ms forwards;
          }

          /* Price card */
          .is-visible .h-price-card {
            animation: h-slide-up 550ms cubic-bezier(0.22,1,0.36,1) 2100ms forwards;
          }

          /* CTA */
          .is-visible .h-cta {
            animation: h-slide-up 550ms cubic-bezier(0.22,1,0.36,1) 2600ms forwards;
          }

          /* CTA sheen — once */
          .is-visible .h-cta-sheen {
            animation: cta-sheen-once 1400ms cubic-bezier(0.22,1,0.36,1) 3000ms forwards;
          }

          /* Social proof */
          .is-visible .h-social-proof {
            animation: h-fade-only 500ms ease 3500ms forwards;
          }

          /* Scroll cue */
          .is-visible .h-scroll-cue {
            animation: h-fade-only 400ms ease 4000ms forwards;
          }
          .is-visible .h-scroll-segment {
            animation: h-scroll-travel 1800ms cubic-bezier(0.22,1,0.36,1) 4200ms infinite;
          }
        }

        /* ─── Reduced motion fallback ─── */
        @media (prefers-reduced-motion: reduce) {
          .is-visible .h-logo-bar,
          .is-visible .h-pill-badge,
          .is-visible .h-w1, .is-visible .h-w2,
          .is-visible .h-w3, .is-visible .h-w4,
          .is-visible .h-sub,
          .is-visible .h-price-card,
          .is-visible .h-cta,
          .is-visible .h-social-proof,
          .is-visible .h-scroll-cue {
            animation: h-fade-only 250ms ease forwards;
            transform: none;
          }
          .is-visible .h-grain { opacity: 0.03; }
        }

        /* ─── Keyframes ─── */
        @keyframes h-grain-fade  { to { opacity: 0.03; } }
        @keyframes h-fade-only   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes h-slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes h-word-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes h-scroll-travel {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(28px); }
        }
      `}} />

      {/* Grain */}
      <div className="h-grain" />
      {/* Vignette */}
      <div className="h-vignette" />
      {/* Soft gold glow behind content */}
      <div className="h-glow" />

      {/* ── CONTENT COLUMN ── */}
      <div className="h-col">

        {/* 1. LOGO BAR */}
        <div className="h-logo-bar" role="banner">
          {/* Custom shield SVG — 40×40, gold, no library */}
          <svg viewBox="0 0 40 40" width={40} height={40} fill="none"
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
        <div
          className="h-pill-badge"
          role="note"
          aria-label="الخدمة الوحيدة المخصصة للجزائريين"
        >
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

        {/* 4. SUB-HEADLINE */}
        <p className="h-sub" aria-label="مع Go LLC، كل شيء يختلف">
          مع Go LLC، كل شيء يختلف
        </p>

        {/* 5. INLINE PRICE CARD */}
        <div className="h-price-card" aria-label="السعر: 220 دولار بدلاً من 250 دولار">
          <div className="h-price-row">
            <span className="h-price-original">$250</span>
            <span className="h-price-offer">$220</span>
          </div>
          <span className="h-price-label">باقة التأسيس الكاملة · شراكة دائمة</span>
        </div>

        {/* 6. PRIMARY CTA */}
        <button
          className="h-cta"
          aria-label="قم بعمل شركتك امريكية في وايومينغ الان"
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(10);
            document.querySelector('#book-consultation')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="h-cta-sheen" aria-hidden="true" />
          قم بعمل شركتك امريكية في وايومينغ الان
        </button>

        {/* 7. SOCIAL PROOF */}
        <div className="h-social-proof" aria-label="92 عميل نشط">
          {/* Avatar stack */}
          <div className="h-avatars">
            {[0, 1, 2, 3].map(i => <AvatarCircle key={i} index={i} />)}
          </div>

          {/* Progress bar — 92/100 gold fill */}
          <SocialProgressBar visible={isVisible} />

          {/* Live indicator */}
          <div className="h-proof-live">
            <div className="h-live-dot" aria-hidden="true" />
            <span className="h-proof-text">92 عميل نشط من أصل 100 مقعد</span>
          </div>
        </div>

        {/* 8. SCROLL CUE */}
        <div className="h-scroll-cue" aria-hidden="true">
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
   PROGRESS BAR — animates fill when hero visible
───────────────────────────────────────────── */
function SocialProgressBar({ visible }: { visible: boolean }) {
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setFilled(true), 3600);
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
