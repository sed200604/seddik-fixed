'use client';

import React, { useEffect, useRef, useState } from 'react';

const WA_NUMBER = '213XXXXXXXXX';
const WA_MESSAGE = encodeURIComponent('مرحبا، حاب نستفسر على باقة التأسيس.');
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function StickyCTABar() {
  const [shown, setShown] = useState(false);
  const [sheenRan, setSheenRan] = useState(false);
  const heroRef = useRef<Element | null>(null);
  const sheenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Grab hero element (first <main>)
    heroRef.current = document.querySelector('main');

    let lastScrollY = 0;
    let ticking = false;

    const evaluate = () => {
      const scrollY = window.scrollY;

      // Show after scrolling 800px
      if (scrollY > 800) {
        // Check if hero is ≥30% visible — if so, hide bar
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          const heroVisible = rect.bottom > 0 && rect.top < window.innerHeight * 0.7;
          if (heroVisible && scrollY < 800) {
            setShown(false);
            return;
          }
        }
        setShown(true);
      } else {
        setShown(false);
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluate);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Run sheen once when bar first appears
  useEffect(() => {
    if (shown && !sheenRan) {
      setSheenRan(false); // reset for animation trigger
      // Small delay so element is painted before animation fires
      sheenTimer.current = setTimeout(() => setSheenRan(true), 60);
    }
    return () => {
      if (sheenTimer.current) clearTimeout(sheenTimer.current);
    };
  }, [shown]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCTA = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    document.querySelector('#book-consultation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Sticky bar container ── */
        .sticky-cta-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          /* Safe area for iPhone notch/home indicator */
          padding-bottom: env(safe-area-inset-bottom, 0px);
          height: calc(60px + env(safe-area-inset-bottom, 0px));
          background: rgba(10, 22, 40, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(212,168,67,0.40);
          z-index: 9000;
          display: flex;
          align-items: center;
          padding-left: 16px;
          padding-right: 16px;
          direction: rtl;
          gap: 12px;

          /* Slide-up entrance */
          transform: translateY(100%);
          transition: transform 500ms cubic-bezier(0.22,1,0.36,1);

          /* Only visible on mobile (< 768px) */
        }
        .sticky-cta-bar.shown {
          transform: translateY(0);
        }

        /* Hide on desktop */
        @media (min-width: 768px) {
          .sticky-cta-bar {
            display: none;
          }
        }

        /* ── Pill CTA inside bar ── */
        .sticky-pill-cta {
          flex-shrink: 0;
          height: 44px;
          padding: 0 24px;
          border-radius: 22px;
          background: #D4A843;
          border: none;
          cursor: pointer;
          font-family: var(--font-tajawal, Tajawal);
          font-weight: 700;
          font-size: 16px;
          color: #0A1628;
          position: relative;
          overflow: hidden;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            inset 0 -1px 0 rgba(0,0,0,0.12),
            0 0 0 1px rgba(212,168,67,0.30),
            0 8px 24px rgba(212,168,67,0.22),
            0 2px 4px rgba(0,0,0,0.25);
          transition: transform 120ms cubic-bezier(0.34,1.4,0.64,1),
                      background-color 200ms ease;
          white-space: nowrap;
        }
        .sticky-pill-cta:active {
          transform: scale(0.95);
        }

        /* One-time gold sheen sweep on pill CTA */
        @keyframes sticky-sheen-once {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .sticky-pill-sheen {
          position: absolute;
          inset: 0;
          border-radius: 22px;
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(255,255,255,0.18) 50%,
            transparent 70%
          );
          background-size: 200% 100%;
          background-position: -200% 0;
          pointer-events: none;
        }
        .sticky-pill-sheen.run {
          animation: sticky-sheen-once 1400ms cubic-bezier(0.22,1,0.36,1) 200ms forwards;
        }

        /* ── Left text ── */
        .sticky-label {
          flex: 1;
          font-family: var(--font-cairo, Cairo);
          font-weight: 500;
          font-size: 14px;
          color: #FFFFFF;
          text-align: right;
          line-height: 1.4;
        }

        @media (prefers-reduced-motion: reduce) {
          .sticky-cta-bar { transition: none; }
          .sticky-pill-sheen.run { animation: none; }
        }
      `}} />

      <div
        className={`sticky-cta-bar${shown ? ' shown' : ''}`}
        role="complementary"
        aria-label="استشارة مجانية — احجز الآن"
      >
        {/* RIGHT: Pill CTA */}
        <button
          className="sticky-pill-cta"
          onClick={handleCTA}
          aria-label="احجز الآن مجاناً"
        >
          <span className={`sticky-pill-sheen${sheenRan ? ' run' : ''}`} />
          احجز الآن
        </button>

        {/* LEFT: Info text */}
        <span className="sticky-label">
          استشارة مجانية&nbsp;·&nbsp;15 دقيقة
        </span>
      </div>
    </>
  );
}
