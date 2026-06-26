'use client';

import React, { useEffect, useState, useRef } from 'react';
import { trackCustom } from '@/lib/pixel';
import { useGlobalAnimation } from '@/hooks/useGlobalAnimations';

/* ─────────────────────────────────────────────
   TYPEWRITER HOOK
   The ONE place a typewriter effect is used —
   mimics a stamp machine printing a serial number
───────────────────────────────────────────── */
function useTypewriter(text: string, active: boolean, speed = 55) {
  const [displayed, setDisplayed] = useState('');
  const [cursorOn, setCursorOn] = useState(true);
  const iRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) return;
    iRef.current = 0;
    setDisplayed('');

    const tick = () => {
      iRef.current += 1;
      setDisplayed(text.slice(0, iRef.current));
      if (iRef.current < text.length) {
        timerRef.current = setTimeout(tick, speed);
      } else {
        // Stop cursor blink after 2s
        setTimeout(() => {
          if (blinkRef.current) clearInterval(blinkRef.current);
          setCursorOn(false);
        }, 2000);
      }
    };

    // Small initial delay so card is fully visible before stamp starts
    timerRef.current = setTimeout(tick, 300);

    // Cursor blink
    blinkRef.current = setInterval(() => setCursorOn(v => !v), 530);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (blinkRef.current) clearInterval(blinkRef.current);
    };
  }, [active, text, speed]);

  return { displayed, cursorOn };
}

/* ─────────────────────────────────────────────
   COUNT-UP HOOK (serial → 0→90 for the "90" promise)
───────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1000) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out-cubic: slows as it reaches target
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return val;
}

const SERIAL = 'GLG · 90D · 2026 / 0001';

export default function GuaranteeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Card entry — opacity + scale (no slide, no bounce — document placed on table)
  const [cardVis, setCardVis] = useState(false);

  // Internal stagger states — fire after card appears
  const [serialActive, setSerialActive] = useState(false);
  const [headlineVis, setHeadlineVis] = useState(false);
  const [numberActive, setNumberActive] = useState(false);
  const [bodyVis, setBodyVis] = useState(false);
  const [sigVis, setSigVis] = useState(false);
  const [shimmerRun, setShimmerRun] = useState(false);
  const [envVis, setEnvVis] = useState(false);

  const { displayed: serialText, cursorOn } = useTypewriter(SERIAL, serialActive);
  const displayNum = useCountUp(90, numberActive, 1000);

  const [isTriggered, setIsTriggered] = useState(false);

  useGlobalAnimation(sectionRef, () => setIsTriggered(true));

  useEffect(() => {
    if (!isTriggered) return;
    setEnvVis(true);

    // Card fades + scales in
    setTimeout(() => setCardVis(true), 100);

    // Serial typewriter
    setTimeout(() => setSerialActive(true), 500);

    // Headline label + number count
    setTimeout(() => {
      setHeadlineVis(true);
      setTimeout(() => setNumberActive(true), 80);
    }, 1100);

    // Body text
    setTimeout(() => setBodyVis(true), 1800);

    // Signature
    setTimeout(() => setSigVis(true), 2000);

    // Shimmer seal
    setTimeout(() => setShimmerRun(true), 2400);
  }, [isTriggered]);

  // ── Guarantee 3s Time Tracking ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let timer: NodeJS.Timeout;
    let hasFired = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (hasFired) return;
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            trackCustom('GuaranteeViewed');
            hasFired = true;
          }, 3000);
        } else {
          clearTimeout(timer);
        }
      },
      { threshold: 0.5 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      style={{
        position: 'relative',
        width: '100%',
        background: '#0A1628',
        padding: '120px 0 160px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Environmental: radial gold glow behind card (Option A) ── */
        .g-env-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 480px;
          height: 360px;
          background: radial-gradient(ellipse at center, rgba(212,168,67,0.055) 0%, transparent 65%);
          pointer-events: none;
          filter: blur(32px);
          z-index: 0;
          opacity: 0;
          transition: opacity 1200ms ease;
        }
        .g-env-glow.vis { opacity: 1; }

        /* ── Grain ── */
        .g-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.03;
          mix-blend-mode: overlay;
          z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── Upward spotlight ── */
        .g-spotlight {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse at bottom center, rgba(212,168,67,0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        /* ─────────────────────────────────────────────
           CERTIFICATE CARD
           Entry: opacity + scale only — no slide (spec: "document placed on table")
           Hover: NONE — spec: "immovable, solid, permanent"
        ───────────────────────────────────────────── */
        .g-card {
          position: relative;
          z-index: 20;
          width: calc(100% - 48px);
          max-width: 640px;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.028) 0%, transparent 100%), #0A1628;
          padding: 40px 32px;

          /* Entry state */
          opacity: 0;
          transform: scale(0.96);
          transition: opacity 600ms cubic-bezier(0.22,1,0.36,1),
                      transform 600ms cubic-bezier(0.22,1,0.36,1);
        }
        .g-card.vis {
          opacity: 1;
          transform: scale(1.0);
        }

        /* Double-border: outer 2px gold 30%, 4px gap, inner 1px gold 80% */
        .g-border-outer {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(212,168,67,0.30);
          pointer-events: none;
          z-index: 0;
          /* Sharp corners — no border-radius. Certificates don't round. */
        }
        .g-border-inner {
          position: absolute;
          inset: 6px;
          border: 1px solid rgba(212,168,67,0.80);
          pointer-events: none;
          z-index: 0;
        }

        /* Guilloché watermark — Go LLC shield at 3% opacity, center */
        .g-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          aspect-ratio: 1;
          opacity: 0.03;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Holographic shimmer seal (once, RTL: right→left) ── */
        @keyframes g-shimmer {
          0%   { background-position: 200% 0; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { background-position: -200% 0; opacity: 0; }
        }
        .g-shimmer-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 30;
          border-radius: 0;
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(212,168,67,0.07) 50%,
            transparent 70%
          );
          background-size: 200% 100%;
          background-position: 200% 0;
          opacity: 0;
        }
        .g-shimmer-layer.run {
          animation: g-shimmer 800ms cubic-bezier(0.22,1,0.36,1) 1 forwards;
        }
        .g-shimmer-layer.shimmer-done {
          display: none;
        }

        /* ── Serial number: top-right (RTL context) ── */
        .g-serial {
          font-family: 'Courier New', Courier, monospace;
          font-size: 10px;
          color: rgba(212,168,67,0.60);
          letter-spacing: 2px;
          direction: ltr;
          text-align: right;
          line-height: 1;
          min-height: 14px;
        }
        .g-serial-cursor {
          display: inline-block;
          width: 1px;
          height: 10px;
          background: rgba(212,168,67,0.60);
          margin-left: 1px;
          vertical-align: middle;
        }
        .g-serial-line {
          width: 40%;
          height: 1px;
          background: rgba(212,168,67,0.15);
          margin-top: 8px;
          margin-right: 0;
          margin-left: auto;
        }

        /* ── Headline: label → 90 → descriptor ── */
        .g-hl-label {
          font-family: var(--font-cairo, Cairo);
          font-weight: 600;
          font-size: 12px;
          color: #D4A843;
          letter-spacing: 0.16em;
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 4px;
          opacity: 0;
          transition: opacity 300ms ease;
        }
        .g-hl-label.vis { opacity: 1; }

        .g-hl-number {
          font-family: var(--font-inter-tight, 'Inter Tight');
          font-weight: 800;
          font-size: clamp(48px, 10vw, 60px);
          color: #D4A843;
          line-height: 1;
          text-align: center;
          font-feature-settings: "tnum" 1;
          letter-spacing: -0.03em;
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .g-hl-number.vis { opacity: 1; }

        .g-hl-descriptor {
          font-family: var(--font-tajawal, Tajawal);
          font-weight: 700;
          font-size: clamp(18px, 4vw, 22px);
          color: #FFFFFF;
          text-align: center;
          margin-top: 4px;
          opacity: 0;
          transition: opacity 400ms ease 200ms;
        }
        .g-hl-descriptor.vis { opacity: 1; }

        /* ── Body text ── */
        .g-body-wrap {
          margin-top: 24px;
          text-align: right;
          max-width: 90%;
          margin-right: auto;
          margin-left: auto;
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .g-body-wrap.vis { opacity: 1; }

        .g-body-condition {
          font-family: var(--font-cairo, Cairo);
          font-weight: 400;
          font-size: 14px;
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          margin-bottom: 10px;
        }
        .g-body-promise {
          font-family: var(--font-cairo, Cairo);
          font-weight: 700;
          font-size: 15px;
          color: #FFFFFF;
          line-height: 1.6;
          margin-bottom: 10px;
        }
        .g-body-reassure {
          font-family: var(--font-cairo, Cairo);
          font-weight: 500;
          font-size: 13px;
          font-style: italic;
          color: #D4A843;
          line-height: 1.6;
        }

        /* ── Signature block: bottom-right ── */
        .g-sig {
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-right: 0;
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .g-sig.vis { opacity: 1; }

        .g-sig-line {
          width: 56px;
          height: 1px;
          background: rgba(212,168,67,0.50);
          margin-bottom: 8px;
        }

        /* Signature squiggle — repurposed with meaning here */
        .g-sig-squiggle path {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          transition: stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1) 100ms;
        }
        .g-sig.vis .g-sig-squiggle path {
          stroke-dashoffset: 0;
        }

        .g-sig-text {
          font-family: 'Courier New', Courier, monospace;
          font-weight: 400;
          font-size: 10px;
          color: rgba(212,168,67,0.65);
          letter-spacing: 1.5px;
          direction: ltr;
          text-align: right;
          line-height: 1.8;
          margin-top: 6px;
        }

        /* ── 4s ambient glow pulse on card (distinct from other sections) ── */
        @keyframes cert-glow-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(212,168,67,0.05); }
          50%       { box-shadow: 0 0 60px rgba(212,168,67,0.12); }
        }
        .g-card.vis {
          animation: cert-glow-pulse 4s ease-in-out infinite 2s;
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .g-card {
            transition: opacity 250ms ease !important;
            transform: none !important;
            animation: none !important;
          }
          .g-hl-label, .g-hl-number, .g-hl-descriptor,
          .g-body-wrap, .g-sig {
            transition: opacity 250ms ease !important;
          }
          .g-shimmer-layer.run { animation: none !important; }
        }
      `}} />

      {/* Environmental glow */}
      <div className={`g-env-glow${envVis ? ' vis' : ''}`} />
      {/* Grain */}
      <div className="g-grain" />
      {/* Upward spotlight */}
      <div className="g-spotlight" />

      {/* ════════════════════════════════════════
          CERTIFICATE CARD
      ════════════════════════════════════════ */}
      <div className={`g-card${cardVis ? ' vis' : ''}`}>

        {/* Double borders — sharp 90° corners */}
        <div className="g-border-outer" />
        <div className="g-border-inner" />
        <div 
          className={`g-shimmer-layer ${shimmerRun ? 'run' : ''}`} 
          onAnimationEnd={(e) => {
            if (e.animationName === 'g-shimmer') {
              e.currentTarget.classList.add('shimmer-done');
            }
          }}
        />

        {/* Go LLC shield watermark — 3% opacity, 60% width */}
        <div className="g-watermark">
          <svg viewBox="0 0 80 90" fill="none" stroke="#D4A843" strokeWidth="1"
            strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
            <path d="M40 8 L72 18 V42 C72 66 40 82 40 82 C40 82 8 66 8 42 V18 Z" />
            <path d="M28 42 L36 50 L54 32" />
          </svg>
        </div>

        {/* Holographic shimmer — fires once after all text appears */}
        <div className={`g-shimmer-layer${shimmerRun ? ' run' : ''}`} />

        {/* ── Content — relative z-index above watermark ── */}
        <div style={{ position: 'relative', zIndex: 10 }}>

          {/* Serial number — TOP RIGHT (RTL = right-aligned) */}
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <div className="g-serial" dir="ltr">
              {serialText}
              {serialActive && !shimmerRun && (
                <span className="g-serial-cursor"
                  style={{ opacity: cursorOn ? 1 : 0, transition: 'opacity 80ms ease' }} />
              )}
            </div>
            {/* Horizontal rule below serial */}
            <div className="g-serial-line" />
          </div>

          {/* ── HEADLINE: label → 90 → descriptor ── */}
          <div style={{ textAlign: 'center', marginBottom: '0' }}>
            <div className={`g-hl-label${headlineVis ? ' vis' : ''}`}>
              ضمان
            </div>
            <div className={`g-hl-number${headlineVis ? ' vis' : ''}`}>
              {displayNum}
            </div>
            <div className={`g-hl-descriptor${headlineVis ? ' vis' : ''}`}>
              يوم ضد الإغلاق
            </div>
          </div>

          {/* ── BODY TEXT — three lines (45) ── */}
          <div className={`g-body-wrap${bodyVis ? ' vis' : ''}`}>
            <p className="g-body-condition">
              إذا أُغلق حسابك البنكي خلال 90 يوم —
            </p>
            <p className="g-body-promise">
              نحل المشكلة معاك أو نعيد لك كامل المبلغ.
            </p>
            <p className="g-body-reassure">
              بدون أسئلة، بدون شروط مخفية.
            </p>
          </div>

          {/* ── SIGNATURE BLOCK — bottom-right, signed document feel (46) ── */}
          <div className={`g-sig${sigVis ? ' vis' : ''}`}>
            {/* Thin gold horizontal line */}
            <div className="g-sig-line" />

            {/* Signature squiggle — drawn via stroke-dashoffset */}
            <svg className="g-sig-squiggle" viewBox="0 0 100 28" width={90} height={24}
              fill="none" overflow="visible">
              <path
                d="M8 18 C 22 8, 38 26, 54 16 S 76 4, 90 14"
                stroke="rgba(212,168,67,0.70)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Attestation text */}
            <div className="g-sig-text">
              <div>موثّق بالكتابة</div>
              <div>GO LLC · 2026</div>
            </div>
          </div>

        </div>
      </div>

      {/* 80px of breathing space below — gravitas, not annotation (47) */}
      <div style={{ height: '80px' }} />

    </section>
  );
}
