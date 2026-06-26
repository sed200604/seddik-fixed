'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useGlobalAnimation } from '@/hooks/useGlobalAnimations';

/* ─────────────────────────────────────────────
   DATA — 3 tiers
───────────────────────────────────────────── */
type Item = {
  title: string;
  desc: string;
  value: number | null;
  free?: boolean;
  priceless?: boolean;
};

const TIERS: { label: string; items: Item[] }[] = [
  {
    label: 'الأساسيات',
    items: [
      { title: 'فتح شركتك في ولاية وايومينغ عبر Google Meet', desc: 'نعملوها معاك خطوة بخطوة في دقائق', value: 200 },
      { title: 'رقم EIN مجاناً', desc: 'التسجيل الضريبي الفيدرالي بدون رسوم', value: 80, free: true },
      { title: 'عقد إيجار حقيقي لفتح Wise Business', desc: 'عقد قانوني صالح، مش عنوان افتراضي', value: 150 },
      { title: 'تجديد الوكيل المسجل بـ $25/سنة فقط', desc: 'أرخص بـ 70% من المنافسين', value: 100 },
    ],
  },
  {
    label: 'الحماية والدعم',
    items: [
      { title: 'حل مشاكل Stripe + Mercury + Wise', desc: 'دعم مباشر إذا تعطل أي حساب', value: 300 },
      { title: 'دعم مستمر بعد التأسيس — للأبد', desc: 'شراكة، مش معاملة وحيدة', value: null, priceless: true },
    ],
  },
  {
    label: 'هدايا إضافية',
    items: [
      { title: 'استشارة تسويق + هيكلة الأعمال مجاناً', desc: 'جلسة استراتيجية مع الفريق', value: 250, free: true },
      { title: 'كتاب مجاني: ليش تتقفل الحسابات البنكية', desc: 'دليل عملي لتجنب الإغلاق', value: 40, free: true },
    ],
  },
];

const TOTAL_VALUE = 1120;

/* ─────────────────────────────────────────────
   TIER ICONS — custom inline SVG, no library, 1.5px stroke
───────────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  building: (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="14" height="14" rx="1"/><path d="M7 18V8h6v10M10 4V2"/>
    </svg>
  ),
  hashtag: (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 3l-2 14M14 3l-2 14M4 8h13M3 13h13"/>
    </svg>
  ),
  house: (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10L10 3l7 7v7a1 1 0 01-1 1H4a1 1 0 01-1-1z"/><path d="M8 18v-5h4v5"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2L17 5v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V5z"/><path d="M7.5 10l1.5 2 3.5-3.5"/>
    </svg>
  ),
  card: (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="16" height="12" rx="2"/><path d="M2 9h16"/>
    </svg>
  ),
  headset: (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12V9a6 6 0 0112 0v3"/><rect x="2" y="12" width="3" height="5" rx="1.5"/><rect x="15" y="12" width="3" height="5" rx="1.5"/>
    </svg>
  ),
  bulb: (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2a6 6 0 014.3 10.2A3 3 0 0112 15H8a3 3 0 01-2.3-2.8A6 6 0 0110 2z"/><path d="M8 18h4"/>
    </svg>
  ),
  book: (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3h10a1 1 0 011 1v13H5a1 1 0 01-1-1z"/><path d="M4 17a1 1 0 001 1h10"/><path d="M8 7h5M8 10h5M8 13h3"/>
    </svg>
  ),
};

const ITEM_ICONS = ['building', 'hashtag', 'house', 'shield', 'card', 'headset', 'bulb', 'book'];

/* ─────────────────────────────────────────────
   ease-out-back for price pop
───────────────────────────────────────────── */
function easeOutBack(t: number): number {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

/* ─────────────────────────────────────────────
   COUNT-UP HOOK
───────────────────────────────────────────── */
function useCountUp(target: number, duration: number, easing: (t: number) => number = (t) => 1 - Math.pow(1 - t, 3)) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(easing(t) * target));
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, easing]);
  return display;
}

/* ─────────────────────────────────────────────
   ITEM CARD
   Rule 4: slides in from right (translateX 40→0), 500ms, stagger 80ms
   Rule 7: never re-triggers (IntersectionObserver disconnects on first fire)
   Rule 9: hover → lift (-2px) + shadow increase, icon pulse
───────────────────────────────────────────── */
function ItemCard({ item, iconKey, delay }: { item: Item; iconKey: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);

  // Rule 7 — once only
  useGlobalAnimation(ref, () => setVis(true));

  const isFree = item.free;
  const isPriceless = item.priceless;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        padding: '16px',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.025)',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
        direction: 'rtl',
        // Rule 10: only transform + opacity
        opacity: vis ? 1 : 0,
        transform: vis
          ? `translateX(0) translateY(${hov ? '-2px' : '0'})`
          : 'translateX(30px)',
        transition: vis
          ? `transform 500ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 500ms ease ${delay}ms, box-shadow 200ms ease`
          : 'none',
        boxShadow: hov
          ? '0 6px 20px rgba(0,0,0,0.20), 0 2px 8px rgba(0,0,0,0.12)'
          : '0 2px 8px rgba(0,0,0,0.08)',
        willChange: 'transform, opacity',
        cursor: 'default',
      }}
    >
      {/* FREE badge — top-left (LTR: top-left in absolute) */}
      {(isFree || isPriceless) && (
        <span style={{
          position: 'absolute',
          top: '-8px',
          left: '12px',
          background: '#D4A843',
          color: '#0A1628',
          fontFamily: 'var(--font-cairo, Cairo)',
          fontWeight: 700,
          fontSize: '9px',
          letterSpacing: '0.08em',
          padding: '2px 7px',
          borderRadius: '3px',
          lineHeight: '14px',
          pointerEvents: 'none',
        }}>
          {isPriceless ? 'لا تُقدّر' : 'مجاناً'}
        </span>
      )}

      {/* ICON — right side (RTL: first child) */}
      <div style={{
        flexShrink: 0,
        width: '36px',
        height: '36px',
        borderRadius: '6px',
        background: 'rgba(212,168,67,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Rule 9: icon pulse on hover
        transform: hov ? 'scale(1.10)' : 'scale(1)',
        transition: 'transform 300ms cubic-bezier(0.34,1.4,0.64,1)',
      }}>
        {ICONS[iconKey]}
      </div>

      {/* TITLE + DESC — center */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-tajawal, Tajawal)',
          fontWeight: 600,
          fontSize: '15px',
          color: '#FFFFFF',
          lineHeight: 1.3,
          marginBottom: '3px',
          textAlign: 'right',
        }}>
          {item.title}
        </div>
        <div style={{
          fontFamily: 'var(--font-cairo, Cairo)',
          fontWeight: 400,
          fontSize: '12px',
          color: 'rgba(201,210,222,0.80)',
          lineHeight: 1.5,
          textAlign: 'right',
        }}>
          {item.desc}
        </div>
      </div>

      {/* PRICE — left side (LTR: last, RTL: leftmost) */}
      <div style={{ flexShrink: 0, textAlign: 'center', minWidth: '42px' }}>
        {isPriceless ? (
          <span style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            color: 'rgba(212,168,67,0.80)',
            fontStyle: 'italic',
          }}>∞</span>
        ) : (
          <span style={{
            fontFamily: 'var(--font-inter-tight, Inter Tight)',
            fontWeight: 700,
            fontSize: '14px',
            color: 'rgba(212,168,67,0.60)',
            textDecoration: 'line-through',
            textDecorationColor: 'rgba(212,168,67,0.40)',
            textDecorationThickness: '1px',
            fontFeatureSettings: '"tnum" 1',
            letterSpacing: '-0.01em',
          }}>
            ${item.value}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TIER GROUP
───────────────────────────────────────────── */
function TierGroup({ tier, tierIndex, baseDelay }: {
  tier: typeof TIERS[0];
  tierIndex: number;
  baseDelay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useGlobalAnimation(ref, () => setVis(true));

  // Global item index offset (for icon selection)
  const itemOffset = TIERS.slice(0, tierIndex).reduce((a, t) => a + t.items.length, 0);

  return (
    <div ref={ref} style={{ marginBottom: tierIndex < TIERS.length - 1 ? '32px' : 0 }}>
      {/* Tier label */}
      <div style={{
        fontFamily: 'var(--font-cairo, Cairo)',
        fontWeight: 600,
        fontSize: '11px',
        color: 'rgba(212,168,67,0.70)',
        letterSpacing: '0.12em',
        textAlign: 'right',
        marginBottom: '12px',
        opacity: vis ? 1 : 0,
        transition: 'opacity 400ms ease 100ms',
      }}>
        {tier.label}
      </div>

      {/* Cards — stagger 80ms between each (Rule 4), 200ms pause between tiers */}
      {tier.items.map((item, i) => (
        <ItemCard
          key={i}
          item={item}
          iconKey={ITEM_ICONS[itemOffset + i]}
          delay={i * 80 + (tierIndex > 0 ? 200 : 0)}
        />
      ))}

      {/* Thin separator between tiers */}
      {tierIndex < TIERS.length - 1 && (
        <div style={{
          width: '100%',
          height: '1px',
          background: 'rgba(255,255,255,0.07)',
          marginTop: '20px',
          opacity: vis ? 1 : 0,
          transition: 'opacity 600ms ease 500ms',
        }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOTAL VALUE CARD
   Rule 8: animate $0 → $1120 over 1500ms ease-out
───────────────────────────────────────────── */
function TotalCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useGlobalAnimation(ref, () => setVis(true));

  const displayTotal = useCountUp(vis ? TOTAL_VALUE : 0, 1500);

  return (
    <div ref={ref} style={{
      marginTop: '40px',
      padding: '20px 20px',
      borderRadius: '8px',
      background: 'rgba(255,255,255,0.04)',
      position: 'relative',
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(14px)',
      transition: 'opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1)',
      // Shimmer border via gradient
      border: '1px solid transparent',
      backgroundClip: 'padding-box',
    }}>
      {/* Gradient shimmer border overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '8px',
        padding: '1px',
        background: 'linear-gradient(110deg, rgba(212,168,67,0.60), rgba(235,200,120,0.90), rgba(212,168,67,0.60))',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', direction: 'rtl' }}>
        <span style={{
          fontFamily: 'var(--font-cairo, Cairo)',
          fontWeight: 500,
          fontSize: '13px',
          color: 'rgba(255,255,255,0.80)',
        }}>
          القيمة الإجمالية للباقة:
        </span>
        <span style={{
          fontFamily: 'var(--font-inter-tight, Inter Tight)',
          fontWeight: 800,
          fontSize: '28px',
          color: '#D4A843',
          fontFeatureSettings: '"tnum" 1',
          letterSpacing: '-0.02em',
          textDecoration: 'line-through',
          textDecorationColor: 'rgba(212,168,67,0.50)',
          textDecorationThickness: '1.5px',
        }}>
          ${displayTotal}
        </span>
      </div>
      <p style={{
        fontFamily: 'var(--font-cairo, Cairo)',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.35)',
        textAlign: 'right',
        marginTop: '4px',
        marginBottom: 0,
      }}>
        لو اشتريتها كل خدمة على حدة
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRICE REVEAL
   Rule 5: Beat 1 (was $1120, fade 300ms) →
            400ms pause →
            Beat 2 ($220, scale overshoot 400ms ease-out-back)
   Rule 6: CTA enters last, 300ms after price
───────────────────────────────────────────── */
function PriceReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [beat1, setBeat1] = useState(false);
  const [beat2, setBeat2] = useState(false);
  const [ctaVis, setCtaVis] = useState(false);
  const [sheenRan, setSheenRan] = useState(false);

  // Rule 7: once only
  useGlobalAnimation(ref, () => {
    // Beat 1 — "was" price fades in
    setBeat1(true);
    // 400ms pause then Beat 2 — "$220" pops in
    setTimeout(() => setBeat2(true), 700);
    // CTA 300ms after Beat 2
    setTimeout(() => {
      setCtaVis(true);
      setTimeout(() => setSheenRan(true), 300);
    }, 1200);
  });

  return (
    <div ref={ref} style={{ paddingTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Beat 1 — was price (fade in place, no movement) */}
      <div style={{
        opacity: beat1 ? 1 : 0,
        transition: 'opacity 300ms ease',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontFamily: 'var(--font-inter-tight, Inter Tight)',
          fontWeight: 700,
          fontSize: '22px',
          color: 'rgba(255,255,255,0.35)',
          textDecoration: 'line-through',
          textDecorationColor: 'rgba(255,255,255,0.25)',
          fontFeatureSettings: '"tnum" 1',
        }}>$1120</span>
        <span style={{
          fontFamily: 'var(--font-cairo, Cairo)',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.35)',
        }}>لو اشتريتها مفرقة</span>
      </div>

      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-cairo, Cairo)',
        fontWeight: 600,
        fontSize: '13px',
        color: '#D4A843',
        letterSpacing: '0.10em',
        marginBottom: '12px',
        opacity: beat1 ? 1 : 0,
        transition: 'opacity 300ms ease 100ms',
      }}>
        السعر اليوم:
      </div>

      {/* Beat 2 — $220 pops in with overshoot */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        {/* Radial gold glow behind number */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '200px',
          background: 'radial-gradient(ellipse at center, rgba(212,168,67,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(20px)',
        }} />

        <span style={{
          fontFamily: 'var(--font-inter-tight, Inter Tight)',
          fontWeight: 800,
          fontSize: 'clamp(56px, 12vw, 72px)',
          color: '#D4A843',
          lineHeight: 1,
          fontFeatureSettings: '"tnum" 1',
          letterSpacing: '-0.03em',
          position: 'relative',
          zIndex: 1,
          // Rule 5: scale overshoot via keyframe
          opacity: beat2 ? 1 : 0,
          animation: beat2 ? 'price-pop-in 400ms cubic-bezier(0.34,1.4,0.64,1) forwards' : 'none',
        }}>
          $220
        </span>

        <span style={{
          fontFamily: 'var(--font-tajawal, Tajawal)',
          fontWeight: 600,
          fontSize: '22px',
          color: 'rgba(255,255,255,0.90)',
          position: 'relative',
          zIndex: 1,
          opacity: beat2 ? 1 : 0,
          transition: 'opacity 300ms ease 300ms',
        }}>
          فقط
        </span>
      </div>

      {/* CTA — Rule 6: enters LAST, slides up, most tactile element */}
      <div style={{ marginTop: '48px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          style={{
            width: '90%',
            maxWidth: '480px',
            height: 'auto',
            minHeight: '56px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1.3,
            borderRadius: '28px',
            background: 'linear-gradient(110deg, #C99A35 0%, #E4BC5A 50%, #C99A35 100%)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-tajawal, Tajawal)',
            fontWeight: 700,
            fontSize: '18px',
            color: '#0A1628',
            position: 'relative',
            overflow: 'hidden',
            // Rule 10: only transform + opacity animated
            opacity: ctaVis ? 1 : 0,
            transform: ctaVis ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1)',
            // Inner shadow "pressed metal"
            boxShadow: `
              inset 0 2px 0 rgba(255,255,255,0.22),
              inset 0 -2px 0 rgba(0,0,0,0.14),
              0 0 0 1px rgba(212,168,67,0.35),
              0 4px 20px rgba(212,168,67,0.28),
              0 8px 32px rgba(212,168,67,0.14),
              0 2px 4px rgba(0,0,0,0.20)
            `,
            whiteSpace: 'normal',
          }}
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(10);
            document.querySelector('#book-consultation')?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="قم بعمل شركتك امريكية في وايومينغ الان"
        >
          {/* One-time sheen */}
          <span style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '28px',
            background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: sheenRan ? 'vs-sheen 1400ms cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
            pointerEvents: 'none',
          }} />
          قم بعمل شركتك امريكية في وايومينغ الان
        </button>

        {/* Micro-reassurance — Rule 6: fades 200ms after button */}
        <p style={{
          fontFamily: 'var(--font-cairo, Cairo)',
          fontWeight: 400,
          fontSize: '12px',
          color: 'rgba(255,255,255,0.45)',
          marginTop: '10px',
          textAlign: 'center',
          opacity: ctaVis ? 1 : 0,
          transition: 'opacity 300ms ease 200ms',
        }}>
          بدون التزام — استشارة مجانية 100%
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function ValueStackSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVis, setHeaderVis] = useState(false);

  useGlobalAnimation(headerRef, () => setHeaderVis(true));

  return (
    <section dir="rtl" style={{ position: 'relative', margin: 0, padding: 0, overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Price pop — Rule 5: scale overshoot */
        @keyframes price-pop-in {
          0%   { transform: scale(0.85); opacity: 0; }
          70%  { transform: scale(1.03); }
          100% { transform: scale(1.00); opacity: 1; }
        }

        /* CTA gradient-border shimmer */
        @keyframes vs-sheen {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Rule 10: will-change cleanup is handled by animation completion */
        @media (prefers-reduced-motion: reduce) {
          /* Kill all transforms — opacity only */
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 250ms !important;
            transform: none !important;
          }
        }
      `}} />

      {/* ── CREAM → NAVY gradient bridge (31) ── */}
      <div style={{
        width: '100%',
        height: '120px',
        background: 'linear-gradient(to bottom, #F5EFE3 0%, #0A1628 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── NAVY BODY ── */}
      <div style={{
        background: '#0A1628',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grain */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.03,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0 24px 120px',
          paddingTop: '48px',
        }}>

          {/* ── HEADER (32, 33) ── */}
          <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '48px' }}>

            {/* Pill badge — centered, consistent system (32) */}
            <div style={{
              display: 'inline-flex',
              padding: '5px 16px',
              border: '1px solid rgba(212,168,67,0.45)',
              borderRadius: '2px',
              fontFamily: 'var(--font-cairo, Cairo)',
              fontWeight: 600,
              fontSize: '11px',
              color: '#D4A843',
              letterSpacing: '0.10em',
              marginBottom: '20px',
              opacity: headerVis ? 1 : 0,
              transform: headerVis ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)',
            }}>
              العرض الكامل
            </div>

            {/* Headline line 1: package name only — no price here (33) */}
            <h2 style={{
              fontFamily: 'var(--font-tajawal, Tajawal)',
              fontWeight: 800,
              fontSize: 'clamp(26px, 6vw, 32px)',
              color: '#FFFFFF',
              lineHeight: 1.35,
              margin: '0 0 14px 0',
              letterSpacing: '-0.02em',
              opacity: headerVis ? 1 : 0,
              transform: headerVis ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 600ms cubic-bezier(0.22,1,0.36,1) 100ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 100ms',
            }}>
              باقة التأسيس الكاملة
            </h2>

            {/* Subline with emotional contrast: تعيش=gold, تموت=coral (33) */}
            <p style={{
              fontFamily: 'var(--font-cairo, Cairo)',
              fontWeight: 400,
              fontSize: '15px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              maxWidth: '85%',
              margin: '0 auto',
              opacity: headerVis ? 1 : 0,
              transition: 'opacity 600ms ease 250ms',
            }}>
              كل ما تحتاجه لشركة{' '}
              <strong style={{ color: '#D4A843', fontWeight: 700 }}>تعيش</strong>
              {' '}مش{' '}
              <strong style={{ color: 'rgba(232,93,74,0.85)', fontWeight: 700 }}>تموت</strong>
              {' '}في 90 يوم
            </p>
          </div>

          {/* ── TIERED ITEM LIST (34, 35, 36) ── */}
          {TIERS.map((tier, ti) => (
            <TierGroup key={ti} tier={tier} tierIndex={ti} baseDelay={ti * 200} />
          ))}

          {/* ── TOTAL VALUE CARD (37) ── */}
          <TotalCard />

          {/* ── PRICE REVEAL + CTA (38, 39, 40 Rule 5+6) ── */}
          <PriceReveal />

        </div>
      </div>
    </section>
  );
}
