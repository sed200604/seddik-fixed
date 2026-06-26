'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import InlineBookingForm from './InlineBookingForm';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const WA_NUMBER   = '213XXXXXXXXX';
const WA_MESSAGE  = encodeURIComponent('مرحبا، حاب نستفسر على باقة التأسيس.');
const WA_HREF     = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const SPOTS       = 4; // real number — matches 92/100 section

// Toast messages — rotate up to 3 times then stop on last (94)
const TOASTS = [
  { name: 'سلمى',      city: 'الجزائر العاصمة', when: 'قبل ساعة'     },
  { name: 'أحمد',      city: 'وهران',            when: 'قبل 3 ساعات'  },
  { name: 'كريم',      city: 'قسنطينة',          when: 'قبل 27 دقيقة' },
];

/* ─────────────────────────────────────────────
   HELPER: ease-out cubic
───────────────────────────────────────────── */
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

/* ─────────────────────────────────────────────
   SVG ICONS — inline, 1.5px stroke, no library
───────────────────────────────────────────── */
function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" width={20} height={20} fill="none"
      stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <polyline points="10,5 10,10 13.5,12.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none"
      stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="14" height="12" rx="2" />
      <line x1="1" y1="7" x2="15" y2="7" />
      <line x1="5" y1="1" x2="5" y2="5" />
      <line x1="11" y1="1" x2="11" y2="5" />
    </svg>
  );
}

function MeetIcon() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none"
      stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="10" height="8" rx="1.5" />
      <polyline points="11,7 15,4.5 15,11.5 11,9" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none"
      stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="7" />
      <polyline points="5,8.5 7,10.5 11,6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none"
      stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="5" r="3" />
      <path d="M2 15 C2 11 5 9 8 9 C11 9 14 11 14 15" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   NOTIFICATION TOAST (89, 94)
   Appears 3s after section visible.
   Rotates every 12s, max 3 cycles, dimming to 60% at 8s.
───────────────────────────────────────────── */
function LiveToast({ visible }: { visible: boolean }) {
  const [idx, setIdx]          = useState(0);
  const [phase, setPhase]      = useState<'hidden' | 'in' | 'shown' | 'dimmed' | 'out'>('hidden');
  const [cycles, setCycles]    = useState(0);
  const timersRef              = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => timersRef.current.forEach(clearTimeout);

  const startCycle = useCallback((cycleIdx: number) => {
    clear();
    timersRef.current = [];

    // slide in
    setPhase('in');
    const t1 = setTimeout(() => setPhase('shown'), 400);

    // dim after 8s (94)
    const t2 = setTimeout(() => setPhase('dimmed'), 8000);

    // after 12s: rotate or stop
    const t3 = setTimeout(() => {
      const nextCycles = cycleIdx + 1;
      if (nextCycles >= TOASTS.length) {
        // done rotating — stay dimmed
        return;
      }
      // fade out, swap, fade in
      setPhase('out');
      const t4 = setTimeout(() => {
        setIdx(nextCycles);
        setCycles(nextCycles);
        startCycle(nextCycles);
      }, 300);
      timersRef.current.push(t4);
    }, 12000);

    timersRef.current.push(t1, t2, t3);
  }, []);

  useEffect(() => {
    if (!visible) return;
    startCycle(0);
    return clear;
  }, [visible, startCycle]);

  const y       = phase === 'in'  ? 20 : 0;
  const opacity = phase === 'hidden' || phase === 'out' ? 0
                : phase === 'dimmed'                    ? 0.60
                : 1;

  const toast = TOASTS[idx];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      background: '#162239',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '8px',
      direction: 'rtl',
      opacity,
      transform: `translateY(${y}px)`,
      transition: `opacity 400ms cubic-bezier(0.34,1.2,0.64,1), transform 400ms cubic-bezier(0.34,1.2,0.64,1)`,
      pointerEvents: 'none',
    }}>
      <UserIcon />
      <span style={{
        fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 400,
        fontSize: '13px', color: 'rgba(255,255,255,0.70)',
        whiteSpace: 'nowrap',
      }}>
        <strong style={{ fontWeight: 600, color: 'rgba(255,255,255,0.90)' }}>{toast.name}</strong>
        {` من ${toast.city} حجز${toast.name === 'سلمى' ? 'ت' : ''} ${toast.when}`}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCARCITY BAR — small progress fill (89)
───────────────────────────────────────────── */
function ScarcityBar({ triggered }: { triggered: boolean }) {
  const rAFRef   = useRef<number>(0);
  const [w, setW] = useState(0);
  const TARGET   = Math.round((SPOTS / 10) * 100); // 40%

  useEffect(() => {
    if (!triggered) return;
    const DURATION = 600;
    const start    = performance.now();
    const animate  = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setW(Math.round(easeOutCubic(t) * TARGET));
      if (t < 1) rAFRef.current = requestAnimationFrame(animate);
    };
    rAFRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rAFRef.current);
  }, [triggered]);

  return (
    <div style={{ width: '120px', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: '2px',
        width: `${w}%`,
        background: 'linear-gradient(to right, #B8862E, #E4BC5A)',
        boxShadow: '2px 0 8px rgba(212,168,67,0.40)',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   3-STEP BOOKING FLOW PREVIEW (92)
───────────────────────────────────────────── */
function BookingSteps() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', direction: 'rtl', flexWrap: 'wrap' }}>

      {/* Step 1 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '70px' }}>
        <CalendarIcon />
        <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontSize: '11px', color: 'rgba(255,255,255,0.40)', textAlign: 'center', lineHeight: 1.4 }}>
          تختار الوقت
        </span>
      </div>

      {/* Dotted connector */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', marginTop: '-14px' }}>
        <svg width="28" height="4" viewBox="0 0 28 4" fill="none">
          <line x1="0" y1="2" x2="28" y2="2" stroke="rgba(212,168,67,0.18)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Step 2 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '70px' }}>
        <MeetIcon />
        <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontSize: '11px', color: 'rgba(255,255,255,0.40)', textAlign: 'center', lineHeight: 1.4 }}>
          نتواصل عبر Meet
        </span>
      </div>

      {/* Dotted connector */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', marginTop: '-14px' }}>
        <svg width="28" height="4" viewBox="0 0 28 4" fill="none">
          <line x1="0" y1="2" x2="28" y2="2" stroke="rgba(212,168,67,0.18)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Step 3 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '70px' }}>
        <CheckCircleIcon />
        <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontSize: '11px', color: 'rgba(255,255,255,0.40)', textAlign: 'center', lineHeight: 1.4 }}>
          تبدأ مشروعك
        </span>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════
   MAIN COMPONENT
═════════════════════════════════════════════ */
import Image from 'next/image';
import { useGlobalAnimation } from '@/hooks/useGlobalAnimations';

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Stepped visibility flags — crescendo pacing (94)
  const [visible,       setVisible]       = useState(false);
  const [showStepper,   setShowStepper]   = useState(false);
  const [showHeadline,  setShowHeadline]  = useState(false);
  const [showSubhead,   setShowSubhead]   = useState(false);
  const [showStrip,     setShowStrip]     = useState(false);
  const [showToast,     setShowToast]     = useState(false);
  const [showScarcity,  setShowScarcity]  = useState(false);
  const [showButton,    setShowButton]    = useState(false);
  const [showSub,       setShowSub]       = useState(false);
  const [btnHovered,    setBtnHovered]    = useState(false);

  /* ── INTERSECTION ── */
  useGlobalAnimation(sectionRef, () => setVisible(true));

  /* ── CHOREOGRAPHY — slowest on page (94) ── */
  useEffect(() => {
    if (!visible) return;
    const pref = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (pref) {
      setShowStepper(true); setShowHeadline(true); setShowSubhead(true);
      setShowStrip(true); setShowToast(true); setShowScarcity(true);
      setShowButton(true); setShowSub(true);
      return;
    }

    const T: ReturnType<typeof setTimeout>[] = [];
    // T+0    stepper + headline — instant
    T.push(setTimeout(() => { setShowStepper(true); setShowHeadline(true); }, 0));
    // T+150  subhead
    T.push(setTimeout(() => setShowSubhead(true),   150));
    // T+300  time-strip card
    T.push(setTimeout(() => setShowStrip(true),     300));
    // T+500  FORM — the conversion element, show fast
    T.push(setTimeout(() => { setShowButton(true); setShowSub(true); }, 500));
    // T+1500 toast (secondary social proof, after form is visible)
    T.push(setTimeout(() => setShowToast(true),    1500));
    // T+1800 scarcity
    T.push(setTimeout(() => setShowScarcity(true), 1800));

    return () => T.forEach(clearTimeout);
  }, [visible]);

  const handleCTATap = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
  };

  return (
    <section
      id="book-consultation"
      ref={sectionRef}
      dir="rtl"
      style={{
        position: 'relative',
        background: '#0A1628',
        padding: '120px 24px 140px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* Radial spotlight behind button (93) */
        .fcta-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 500px 400px at 50% 60%,
            rgba(212,168,67,0.032) 0%,
            transparent 70%
          );
        }

        /* Scarcity dot pulse (89) */
        @keyframes fcta-dot-pulse {
          0%, 100% { opacity: 0.40; transform: scale(1);   }
          50%       { opacity: 1.00; transform: scale(1.2); }
        }
        .fcta-scarcity-dot { animation: fcta-dot-pulse 2s ease-in-out infinite; }

        /* Button shimmer gradient shift (90) */
        @keyframes fcta-shimmer {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .fcta-btn {
          background: linear-gradient(110deg, #C99A35, #E4BC5A, #D4A843, #C99A35);
          background-size: 300% 100%;
          animation: fcta-shimmer 3s ease infinite;
          border: none;
          cursor: pointer;
          transition: transform 200ms ease-out, box-shadow 200ms ease-out;
          box-shadow: 0 6px 24px rgba(212,168,67,0.30);
        }
        .fcta-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 32px rgba(212,168,67,0.40);
        }
        .fcta-btn:active {
          transform: scale(0.98);
        }

        @media (prefers-reduced-motion: reduce) {
          .fcta-btn { animation: none; background: #D4A843; }
          .fcta-scarcity-dot { animation: none; }
        }
      `}} />

      {/* Spotlight (93) */}
      <div className="fcta-spotlight" />

      {/* ── CONTENT COLUMN ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: '560px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        direction: 'rtl',
      }}>

        {/* ── 3-DOT JOURNEY STEPPER (86) ── */}
        <div style={{
          marginBottom: '32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          opacity: showStepper ? 1 : 0,
          transition: 'opacity 300ms ease-in',
        }}>
          {/* Dots: ● ● ◉ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Passed step 1 */}
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(212,168,67,0.30)' }} />
            {/* Passed step 2 */}
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(212,168,67,0.30)' }} />
            {/* Current / destination (10px, solid, glow) */}
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: '#D4A843',
              boxShadow: '0 0 10px rgba(212,168,67,0.60), 0 0 20px rgba(212,168,67,0.25)',
            }} />
          </div>
          {/* Label */}
          <span style={{
            fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 600,
            fontSize: '12px', color: '#D4A843', letterSpacing: '0.12em',
          }}>
            الخطوة الأخيرة
          </span>
        </div>

        {/* ── HEADLINE (87) ── */}
        <h2 style={{
          fontFamily: 'var(--font-tajawal,Tajawal)',
          fontWeight: 700,
          fontSize: 'clamp(26px,5.5vw,34px)',
          color: '#FFFFFF',
          textAlign: 'center',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          margin: '0 0 16px',
          maxWidth: '80%',
          opacity: showHeadline ? 1 : 0,
          transform: showHeadline ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 400ms ease-out, transform 400ms ease-out',
        }}>
          جاهز تبدأ صح؟
        </h2>

        {/* ── SUBHEAD (87) ── */}
        <p style={{
          fontFamily: 'var(--font-cairo,Cairo)',
          fontWeight: 400,
          fontSize: '16px',
          color: 'rgba(255,255,255,0.70)',
          textAlign: 'center',
          lineHeight: 1.65,
          margin: '0 0 32px',
          maxWidth: '80%',
          opacity: showSubhead ? 1 : 0,
          transition: 'opacity 300ms ease-out',
        }}>
          احجز استشارتك <span style={{ color: '#D4A843', fontWeight: 600 }}>المجانية</span> — 15 دقيقة تغيّرلك كلش
        </p>

        {/* ── 15-MINUTE VALUE STRIP (88) ── */}
        <div style={{
          width: '100%',
          marginBottom: '40px',
          background: '#0F1E36',
          borderRadius: '12px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          direction: 'rtl',
          opacity: showStrip ? 1 : 0,
          transform: showStrip ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1)',
        }}>
          <ClockIcon />
          <span style={{ fontFamily: 'var(--font-tajawal,Tajawal)', fontWeight: 700, fontSize: '18px', color: '#D4A843', fontFeatureSettings: '"tnum" 1', flexShrink: 0 }}>
            15 دقيقة
          </span>
          {/* Divider */}
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.10)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}>
            تطرح أسئلتك وتقرر بدون ضغط
          </span>
        </div>

        {/* ── TOAST + SCARCITY STACK (89, 94) ── */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>

          {/* Toast — delayed 3s after visible (94) */}
          <div style={{ opacity: showToast ? 1 : 0, transition: 'opacity 300ms ease' }}>
            <LiveToast visible={showToast} />
          </div>

          {/* Scarcity — 500ms after toast (94) */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
            opacity: showScarcity ? 1 : 0,
            transition: 'opacity 300ms ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', direction: 'rtl' }}>
              <div className="fcta-scarcity-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4A843', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontSize: '15px', color: '#FFFFFF', textAlign: 'center' }}>
                بقيات{' '}
                <strong style={{ fontWeight: 700, color: '#D4A843', fontFeatureSettings: '"tnum" 1' }}>{SPOTS} أماكن</strong>
                {' '}هذا الأسبوع
              </span>
            </div>
            {/* Progress bar (89) */}
            <ScarcityBar triggered={showScarcity} />
          </div>
        </div>

        {/* ── PRIMARY CTA BUTTON (90) ── */}
        <div style={{
          width: '90%',
          opacity: showButton ? 1 : 0,
          transform: showButton ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 300ms ease-out, transform 300ms ease-out',
          marginBottom: '16px',
        }}>
          <InlineBookingForm />
        </div>

        {/* ── BELOW-BUTTON COPY (91) + STEPS (92) ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          width: '100%',
          opacity: showSub ? 1 : 0,
          transition: 'opacity 300ms ease-in',
        }}>
          {/* Line 1 — kills booking fear (91) */}
          <p style={{
            fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 400,
            fontSize: '13px', color: 'rgba(255,255,255,0.50)',
            textAlign: 'center', margin: 0,
          }}>
            بدون التزام — بدون بطاقة بنكية
          </p>

          {/* Line 2 — identity (91) */}
          <p style={{
            fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 500,
            fontSize: '13px', color: 'rgba(212,168,67,0.60)',
            textAlign: 'center', margin: 0,
          }}>
            الخدمة الوحيدة المخصصة للجزائريين 🇩🇿
          </p>

          {/* 3-Step Booking Preview (92) */}
          <div style={{ marginTop: '20px', width: '70%', minWidth: '240px' }}>
            <BookingSteps />
          </div>
        </div>
      </div>
    </section>
  );
}
