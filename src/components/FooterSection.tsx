'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const WA_NUMBER  = '213XXXXXXXXX';
const WA_MESSAGE = encodeURIComponent('مرحبا، حاب نستفسر على باقة التأسيس.');
const WA_HREF    = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const IG_HREF    = 'https://instagram.com/gollc.dz';
const MAIL_HREF  = 'mailto:contact@gollc.dz';

/* ─────────────────────────────────────────────
   SHIELD LOGO SVG — 48px, gold 60%
   Consistent with header shield (98)
───────────────────────────────────────────── */
function ShieldLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      width={48}
      height={48}
      fill="none"
      stroke="rgba(212,168,67,0.60)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M24 4 L42 10 V24 C42 35 24 44 24 44 C24 44 6 35 6 24 V10 Z" />
      <polyline points="16,24 21.5,29.5 32,18" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG ICONS — inline, no library (99)
   20px glyph, monochrome white
───────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M21 11.5A9.5 9.5 0 0 1 4.5 18.5L2 22l3.5-1A9.5 9.5 0 1 1 21 11.5z" />
      <path d="M9.5 11.5c0 3 1.8 4.5 4.8 4.5l1.2-1.5-1.8-.8-.8.8c-1 0-2-1-2-2l.8-.8-.8-1.8-1.4 1.6z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <polyline points="2,7.5 12,14 22,7.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   ICON LINK — 44px tap target (99)
   white 35% → 80% on hover, no color/scale/border
───────────────────────────────────────────── */
function IconLink({ href, label, children }: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        /* 44px tap target (Apple HIG minimum) */
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        /* 20px glyph, monochrome */
        color: hov ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.35)',
        transition: 'color 200ms ease',
      }}
    >
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────────
   TRUST STRIP — text-only, no icons (101)
───────────────────────────────────────────── */
function TrustStrip() {
  const items = [
    'مسجلة في الولايات المتحدة',
    'دفع آمن عبر Stripe',
    'ضمان 90 يوم',
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '0',
      direction: 'rtl',
    }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span style={{
            fontFamily: 'var(--font-cairo,Cairo)',
            fontWeight: 400,
            fontSize: '10px',
            color: 'rgba(255,255,255,0.25)',
            whiteSpace: 'nowrap',
          }}>
            {item}
          </span>
          {i < items.length - 1 && (
            <span style={{
              margin: '0 8px',
              color: 'rgba(212,168,67,0.40)',
              fontSize: '10px',
              fontFamily: 'var(--font-cairo,Cairo)',
              lineHeight: 1,
              userSelect: 'none',
            }}>
              ·
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ═════════════════════════════════════════════
   MAIN FOOTER
═════════════════════════════════════════════ */
export default function FooterSection() {
  const footerRef     = useRef<HTMLElement>(null);
  const [vis,     setVis]     = useState(false);
  const [hairline, setHairline] = useState(false);
  const [content, setContent]  = useState(false);

  /* ── INTERSECTION — 20% visible triggers animation (103) ── */
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.20 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── ANIMATION SEQUENCE (103) ── */
  useEffect(() => {
    if (!vis) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setHairline(true);
      setContent(true);
      return;
    }

    // Hairline draws from center outward (103)
    const t0 = setTimeout(() => setHairline(true), 0);
    // All content fades in as ONE group, 500ms ease-in (103)
    const t1 = setTimeout(() => setContent(true), 200);

    return () => [t0, t1].forEach(clearTimeout);
  }, [vis]);

  return (
    <footer
      ref={footerRef}
      id="footer"
      dir="rtl"
      style={{
        /* 97: floor of page — 3% darker than CTA (#0A1628 → #060E1C) */
        background: '#060E1C',
        position: 'relative',
        overflow: 'hidden',
        /* 102: 80px bottom padding ensures floating button never overlaps (102) */
        paddingBottom: '80px',
        /* 97: min 200px */
        minHeight: '200px',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Divider: gradient line expands from center outward (97, 103) ──
           Uses clip-path: starts as 0-width at center, expands to full 60% */
        .ft-divider {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(212,168,67,0.15) 30%,
            rgba(212,168,67,0.15) 70%,
            transparent 100%
          );
          /* Clip from both sides toward center = 0-width point */
          clip-path: inset(0 50% 0 50%);
          transition: clip-path 600ms cubic-bezier(0.22,1,0.36,1);
        }
        .ft-divider.drawn {
          /* Fully visible = clip nothing */
          clip-path: inset(0 0% 0 0%);
        }

        @media (prefers-reduced-motion: reduce) {
          .ft-divider { transition: none; }
        }
      `}} />

      {/* Gradient divider — expands from center (97, 103) */}
      <div className={`ft-divider${hairline ? ' drawn' : ''}`} />

      {/* ── CONTENT — all ONE group, ease-in 500ms (103) ── */}
      <div
        style={{
          padding: '48px 24px 0',        /* 97: 48px top, 32px bottom + 80px safety = 112px */
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
          /* Single-group fade-in (103) */
          opacity: content ? 1 : 0,
          transition: 'opacity 500ms ease-in',
        }}
      >
        {/* ── SHIELD LOGO — 48px, gold 60% (98) ── */}
        <div style={{ marginBottom: '16px' }}>
          <ShieldLogo />
        </div>

        {/* ── BRAND NAME — 18px, gold 500 (98) ── */}
        <span style={{
          fontFamily: 'var(--font-tajawal,Tajawal)',
          fontWeight: 500,
          fontSize: '18px',
          color: '#D4A843',
          letterSpacing: '-0.01em',
          marginBottom: '8px',
        }}>
          Go LLC
        </span>

        {/* ── COPYRIGHT — 11px, white 25%, separate line (98) ── */}
        <span style={{
          fontFamily: 'var(--font-cairo,Cairo)',
          fontWeight: 400,
          fontSize: '11px',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.04em',
          marginBottom: '32px',
          fontFeatureSettings: '"tnum" 1',
        }}>
          © 2026
        </span>

        {/* ── SOCIAL ICONS ROW — 3 icons, 44px tap targets (99) ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',      /* 24px gap between icons (99) */
          marginBottom: '28px',
        }}>
          <IconLink href={WA_HREF} label="واتساب — Go LLC">
            <WhatsAppIcon />
          </IconLink>
          <IconLink href={IG_HREF} label="Instagram — Go LLC">
            <InstagramIcon />
          </IconLink>
          <IconLink href={MAIL_HREF} label="البريد الإلكتروني — Go LLC">
            <EmailIcon />
          </IconLink>
        </div>

        {/* ── TRUST STRIP — text-only, 3 facts (101) ── */}
        <div style={{ marginBottom: '20px' }}>
          <TrustStrip />
        </div>

        {/* ── BRAND WHISPER — gold 20%, reward for scrollers (100) ── */}
        <span style={{
          fontFamily: 'var(--font-cairo,Cairo)',
          fontWeight: 400,
          fontSize: '12px',
          color: 'rgba(212,168,67,0.20)',
          textAlign: 'center',
          lineHeight: 1.5,
          direction: 'rtl',
        }}>
          خدمة مصممة بعناية للجزائريين 🇩🇿
        </span>

      </div>
    </footer>
  );
}
