'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

/* ─────────────────────────────────────────────
   INTERSECTION REVEAL HOOK
───────────────────────────────────────────── */
function useReveal(rootMargin = '0px 0px -20% 0px') {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return { ref, visible };
}

/* ─────────────────────────────────────────────
   CREDENTIAL MICRO-BADGE
───────────────────────────────────────────── */
function Credential({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      direction: 'rtl',
    }}>
      <span style={{ flexShrink: 0 }}>{icon}</span>
      <span style={{
        fontFamily: 'var(--font-cairo, Cairo)',
        fontWeight: 400,
        fontSize: '12px',
        color: 'rgba(212,168,67,0.75)',
        lineHeight: 1.4,
      }}>{text}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function FounderSection() {
  const { ref: sectionRef, visible: sectionVis } = useReveal('0px 0px -5% 0px');
  const { ref: beat1Ref, visible: beat1Vis } = useReveal('0px 0px -15% 0px');
  const { ref: beat2Ref, visible: beat2Vis } = useReveal('0px 0px -15% 0px');
  const { ref: quoteRef, visible: quoteVis } = useReveal('-30% 0px -30% 0px');

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      dir="rtl"
      style={{ position: 'relative', margin: 0, padding: 0, overflow: 'hidden' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* ─── Gradient bridge: navy → cream ─── */
        .founder-bridge {
          width: 100%;
          height: 100px;
          background: linear-gradient(to bottom, #0A1628 0%, #F5EFE3 100%);
          pointer-events: none;
        }

        /* ─── Cream body ─── */
        .founder-body {
          background: #F5EFE3;
          position: relative;
          overflow: hidden;
          padding-bottom: 120px;
        }

        /* ─── Faint navy geometric pattern on cream for continuity ─── */
        .founder-body::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%230A1628' fill-opacity='0.04'/%3E%3C/svg%3E");
          background-size: 40px 40px;
        }

        .founder-inner {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ════════════════════════════════════════
           BEAT 1: Photo + Identity
        ════════════════════════════════════════ */

        /* ─── Photo treatment ─── */
        .founder-photo-wrap {
          position: relative;
          width: 100%;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 700ms cubic-bezier(0.22,1,0.36,1),
                      transform 700ms cubic-bezier(0.22,1,0.36,1);
        }
        .founder-photo-wrap.vis { opacity: 1; transform: translateY(0); }

        /* Offset gold rectangle behind photo */
        .founder-photo-offset {
          position: absolute;
          /* 16px down and 16px to the left (LTR-shifted since container is RTL) */
          top: 16px;
          left: 16px;
          right: -16px;
          bottom: -16px;
          border: 1.5px solid rgba(212,168,67,0.35);
          border-radius: 14px;
          pointer-events: none;
          z-index: 0;
        }

        /* Actual photo container */
        .founder-photo-frame {
          position: relative;
          z-index: 1;
          width: 100%;
          /* 4:5 portrait ratio */
          aspect-ratio: 4/5;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          background: #1a2535;
        }

        /* Placeholder silhouette */
        .founder-photo-inner {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #1a2535;
          filter: grayscale(1);
          position: relative;
        }

        /* Gold duotone overlay at 10% */
        .founder-photo-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(212,168,67,0.10);
          pointer-events: none;
          mix-blend-mode: color;
        }

        /* ─── Name caption under photo ─── */
        .founder-name-caption {
          font-family: var(--font-cairo, Cairo);
          font-weight: 400;
          font-size: 13px;
          color: rgba(10,22,40,0.50);
          text-align: right;
          margin-bottom: 10px;
          opacity: 0;
          transition: opacity 500ms ease 300ms;
        }
        .founder-name-caption.vis { opacity: 1; }

        /* ─── Credentials row ─── */
        .founder-creds {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 500ms ease 500ms, transform 500ms cubic-bezier(0.22,1,0.36,1) 500ms;
        }
        .founder-creds.vis { opacity: 1; transform: translateY(0); }

        /* ─── Pill badge above headline ─── */
        .founder-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0;
          padding: 5px 12px;
          border: 1px solid rgba(212,168,67,0.50);
          border-radius: 2px;
          font-family: var(--font-cairo, Cairo);
          font-weight: 600;
          font-size: 11px;
          color: #D4A843;
          letter-spacing: 0.10em;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 500ms cubic-bezier(0.22,1,0.36,1) 100ms,
                      transform 500ms cubic-bezier(0.22,1,0.36,1) 100ms;
        }
        .founder-eyebrow.vis { opacity: 1; transform: translateY(0); }

        /* ─── Main headline ─── */
        .founder-headline {
          font-family: var(--font-tajawal, Tajawal);
          font-weight: 800;
          font-size: clamp(28px, 6vw, 34px);
          color: #0A1628;
          letter-spacing: -0.02em;
          line-height: 1.4;
          text-align: right;
          margin: 0 0 40px 0;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 600ms cubic-bezier(0.22,1,0.36,1) 200ms,
                      transform 600ms cubic-bezier(0.22,1,0.36,1) 200ms;
        }
        .founder-headline.vis { opacity: 1; transform: translateY(0); }
        .founder-headline .hl-gold { color: #D4A843; }

        /* ════════════════════════════════════════
           BEAT 2: Story text (generous spacing)
        ════════════════════════════════════════ */

        .founder-para {
          font-family: var(--font-cairo, Cairo);
          font-weight: 400;
          font-size: 16px;
          color: #0A1628;
          line-height: 1.85;
          text-align: right;
          max-width: 85%;
          margin-right: 0;
          margin-left: auto;
          /* Each para revealed individually by JS */
        }
        .founder-para strong {
          font-weight: 700;
          color: #0A1628;
        }

        .founder-para-wrap {
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 600ms cubic-bezier(0.22,1,0.36,1),
                      transform 600ms cubic-bezier(0.22,1,0.36,1);
        }
        .founder-para-wrap.vis { opacity: 1; transform: translateY(0); }
        .founder-para-wrap.d1 { transition-delay: 0ms; }
        .founder-para-wrap.d2 { transition-delay: 120ms; }
        .founder-para-wrap.d3 { transition-delay: 240ms; }

        /* ─── Quote callout card ─── */
        .founder-quote-card {
          width: calc(100% + 48px);
          margin-right: -24px;
          margin-left: -24px;
          padding: 40px 24px;
          background: #0A1628;
          border-radius: 0;
          margin-top: 48px;
          margin-bottom: 48px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 700ms cubic-bezier(0.22,1,0.36,1),
                      transform 700ms cubic-bezier(0.22,1,0.36,1);
        }
        .founder-quote-card.vis { opacity: 1; transform: translateY(0); }

        /* Giant «» decorative mark behind text */
        .founder-quote-bg-mark {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          font-size: 200px;
          font-family: Georgia, serif;
          color: rgba(212,168,67,0.10);
          line-height: 1;
          user-select: none;
          letter-spacing: -0.05em;
        }

        .founder-quote-text {
          font-family: var(--font-tajawal, Tajawal);
          font-weight: 700;
          font-size: clamp(20px, 5vw, 26px);
          color: #FFFFFF;
          line-height: 1.5;
          position: relative;
          z-index: 1;
          margin-bottom: 20px;
          max-width: 480px;
        }

        .founder-quote-dash {
          width: 28px;
          height: 1px;
          background: #D4A843;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }

        .founder-quote-author {
          font-family: var(--font-cairo, Cairo);
          font-weight: 400;
          font-size: 13px;
          color: #D4A843;
          position: relative;
          z-index: 1;
        }

        /* ─── Gold thin divider under text ─── */
        .founder-divider {
          width: 40%;
          height: 1px;
          background: rgba(212,168,67,0.30);
          margin: 40px auto 0;
          opacity: 0;
          clip-path: inset(0 50% 0 50%);
          transition: clip-path 800ms cubic-bezier(0.22,1,0.36,1),
                      opacity 400ms ease;
        }
        .founder-divider.vis {
          opacity: 1;
          clip-path: inset(0 0% 0 0%);
        }

        /* ─── Reduced motion ─── */
        @media (prefers-reduced-motion: reduce) {
          .founder-photo-wrap,
          .founder-name-caption,
          .founder-creds,
          .founder-eyebrow,
          .founder-headline,
          .founder-para-wrap,
          .founder-quote-card,
          .founder-divider {
            transition: opacity 250ms ease !important;
            transform: none !important;
          }
          .founder-bridge {
            height: 60px;
          }
        }
      `}} />

      {/* ── GRADIENT BRIDGE: navy → cream ── */}
      <div className="founder-bridge" />

      {/* ── CREAM BODY ── */}
      <div className="founder-body">
        <div className="founder-inner">

          {/* ══════════════════════════════════════
              BEAT 1: Photo + Identity
          ══════════════════════════════════════ */}
          <div ref={beat1Ref as React.RefObject<HTMLDivElement>} style={{ paddingTop: '16px' }}>

            {/* Photo wrapper with offset gold outline */}
            <div className={`founder-photo-wrap${beat1Vis ? ' vis' : ''}`}>
              {/* Offset gold rectangle — depth cue */}
              <div className="founder-photo-offset" aria-hidden="true" />

              {/* Photo frame — 4:5 portrait, 16px radius, no border */}
              <div className="founder-photo-frame">
                <div className="founder-photo-inner">
                  <Image 
                    src="/images/founder.jpg" 
                    alt="Founder of Go LLC" 
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 600px) 100vw, 600px"
                    priority
                  />
                  {/* Film grain texture lines & scanlines over the photo */}
                  <svg viewBox="0 0 240 300" width="100%" height="100%"
                    style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <rect width="240" height="300" fill="url(#fg)" opacity="0.06" />
                    <defs>
                      <filter id="fg">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                        <feColorMatrix type="saturate" values="0" />
                      </filter>
                    </defs>
                    {Array.from({ length: 30 }, (_, i) => (
                      <line key={i} x1="0" y1={i * 10} x2="240" y2={i * 10}
                        stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            {/* Name caption — muted, right-aligned, no duplication */}
            <p className={`founder-name-caption${beat1Vis ? ' vis' : ''}`}>
              إسلام بن بوزيد · مؤسس Go LLC
            </p>

            {/* Micro-credentials — quiet proof points */}
            <div className={`founder-creds${beat1Vis ? ' vis' : ''}`}>
              <Credential
                icon={
                  <svg viewBox="0 0 14 14" width={13} height={13} fill="none"
                    stroke="rgba(212,168,67,0.75)" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="1" y="1" width="12" height="12" rx="1" />
                    <path d="M4 7h6M4 4.5h3M4 9.5h4" />
                  </svg>
                }
                text="مسجل رسميًا في الولايات المتحدة"
              />
              <Credential
                icon={
                  <svg viewBox="0 0 14 14" width={13} height={13} fill="none"
                    stroke="rgba(212,168,67,0.75)" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="7" cy="7" r="6" />
                    <path d="M7 4v3.5l2 2" />
                  </svg>
                }
                text="أكثر من 92 عميل نشط مُدار"
              />
              <Credential
                icon={
                  <svg viewBox="0 0 14 14" width={13} height={13} fill="none"
                    stroke="rgba(212,168,67,0.75)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M7 1 L12 3.5 V7 C12 10.5 7 13 7 13 C7 13 2 10.5 2 7 V3.5 Z" />
                    <path d="M4.5 7 L6.5 9 L9.5 5" />
                  </svg>
                }
                text="ضمان 90 يوم ضد الإغلاق"
              />
            </div>

            {/* Pill eyebrow — single instance, above headline */}
            <div className={`founder-eyebrow${beat1Vis ? ' vis' : ''}`} role="note">
              من بنى Go LLC ولماذا
            </div>

            {/* Main headline — 30-34px, navy, "Go LLC" in gold */}
            <h2 className={`founder-headline${beat1Vis ? ' vis' : ''}`}>
              لهذا بنينا <span className="hl-gold">Go LLC</span>
            </h2>

          </div>

          {/* Spacing between beats */}
          <div style={{ height: '48px' }} />

          {/* ══════════════════════════════════════
              BEAT 2: Story text + Quote (generous breathing)
          ══════════════════════════════════════ */}
          <div ref={beat2Ref as React.RefObject<HTMLDivElement>}>

            {/* Para 1 */}
            <div className={`founder-para-wrap d1${beat2Vis ? ' vis' : ''}`}>
              <p className="founder-para">
                أنا إسلام بن بوزيد. جزائري. <strong>عاش نفس المشكلة</strong> — فتحت شركة في أمريكا وعشت معاها <strong>الأخطاء الغالية</strong>.
              </p>
            </div>

            {/* Para 2 */}
            <div className={`founder-para-wrap d2${beat2Vis ? ' vis' : ''}`}>
              <p className="founder-para">
                شفت أصدقائي يخسروا حساباتهم، يدفعوا $180 لوكلاء يختفوا. فهمت: <strong>المشكلة مش في التأسيس</strong> — المشكلة في غياب الدعم بعده.
              </p>
            </div>

            {/* Para 3 */}
            <div className={`founder-para-wrap d3${beat2Vis ? ' vis' : ''}`}>
              <p className="founder-para">
                بنينا Go LLC لتكون الخدمة الوحيدة المصممة للجزائري. عقد إيجار حقيقي. دعم مستمر. شراكة، مش فاتورة.
              </p>
            </div>

            {/* ─── QUOTE CALLOUT CARD — Billboard moment ─── */}
            <div
              ref={quoteRef as React.RefObject<HTMLDivElement>}
              className={`founder-quote-card${quoteVis ? ' vis' : ''}`}
              role="blockquote"
              aria-label="اقتباس المؤسس"
            >
              {/* Large decorative «» at 15% opacity behind text */}
              <div className="founder-quote-bg-mark" aria-hidden="true">«»</div>

              <p className="founder-quote-text">
                المشكلة مش في التأسيس.<br />المشكلة في اللي بعده.
              </p>

              {/* Gold dash above author name */}
              <div className="founder-quote-dash" />
              <span className="founder-quote-author">— مؤسس Go LLC</span>
            </div>

            {/* Thin gold divider closing the section */}
            <div className={`founder-divider${beat2Vis ? ' vis' : ''}`} />

          </div>
        </div>
      </div>
    </section>
  );
}
