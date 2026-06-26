'use client';

import React, { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/pixel';

const WA_NUMBER = '213XXXXXXXXX';
const WA_MESSAGE = encodeURIComponent('مرحبا، حاب نستفسر على باقة التأسيس.');
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

/* 
  Badge appears when user scrolls far enough (past ~60% of page).
  We approximate "FAQ or beyond" by checking if the user has scrolled
  past 60% of total document height.
*/

export default function FloatingWhatsApp() {
  const [appeared,  setAppeared]  = useState(false);
  const [badge,     setBadge]     = useState(false);
  const [pressing,  setPressing]  = useState(false);
  /* prompt 102: hide when footer is visible */
  const [footerVis, setFooterVis] = useState(false);

  /* T+5000ms after mount — fade in */
  useEffect(() => {
    const t = setTimeout(() => setAppeared(true), 5000);
    return () => clearTimeout(t);
  }, []);

  /* Badge: appears when user reaches ~60% of page */
  useEffect(() => {
    const check = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled > total * 0.6) setBadge(true);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  /* prompt 102: observe footer — hide button when footer visible */
  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([e]) => setFooterVis(e.isIntersecting),
      { threshold: 0.10 }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  const handleTap = () => {
    setPressing(true);
    trackEvent('Contact', { content_name: 'WhatsApp', content_category: 'Direct Message' });
    if (navigator.vibrate) navigator.vibrate(10);
    setTimeout(() => {
      setPressing(false);
      window.open(WA_HREF, '_blank', 'noopener,noreferrer');
    }, 120);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Breathing loop: 4s sine, scale 1.0 ↔ 1.04 ── */
        @keyframes wa-breathe {
          0%, 100% { transform: scale(1.0); }
          50%       { transform: scale(1.04); }
        }

        /* ── Badge pulse (gentle) ── */
        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.3); opacity: 0.7; }
        }

        .wa-btn {
          position: fixed;
          right: 24px;   /* 102: clear of content */
          bottom: 24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          /* Navy background + 2px gold ring */
          background: #0A1628;
          border: 2px solid rgba(212,168,67,0.70);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 8500;
          box-shadow:
            0 8px 24px rgba(0,0,0,0.20),
            0 0 0 1px rgba(212,168,67,0.15);

          /* Fade in/out — also fades on footer visible (102) */
          opacity: 0;
          transition: opacity 300ms cubic-bezier(0.22,1,0.36,1);

          /* Breathing loop — starts after appeared */
          animation: none;
        }
        .wa-btn.appeared {
          opacity: 1;
          animation: wa-breathe 4s ease-in-out infinite;
        }
        .wa-btn.pressing {
          transform: scale(0.92) !important;
          animation: none;
          transition: transform 120ms cubic-bezier(0.34,1.4,0.64,1);
        }

        /* ── Badge ── */
        .wa-badge {
          position: absolute;
          top: 0;
          right: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #1DB954;
          border: 2px solid #0A1628;
          opacity: 0;
          transform: scale(0);
          transition: opacity 400ms ease, transform 400ms cubic-bezier(0.34,1.4,0.64,1);
        }
        .wa-badge.visible {
          opacity: 1;
          transform: scale(1);
          animation: badge-pulse 2.4s ease-in-out infinite 800ms;
        }

        .wa-btn:hover {
          border-color: #D4A843;
          box-shadow:
            0 8px 24px rgba(0,0,0,0.25),
            0 0 0 1px rgba(212,168,67,0.30);
        }

        /* ── ARIA focus ring ── */
        .wa-btn:focus-visible {
          outline: 2px solid #D4A843;
          outline-offset: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .wa-btn.appeared {
            animation: none;
          }
          .wa-badge.visible {
            animation: none;
          }
        }
      `}} />

      <button
        className={`wa-btn${appeared && !footerVis ? ' appeared' : ''}${pressing ? ' pressing' : ''}`}
        onClick={handleTap}
        onTouchStart={() => setPressing(true)}
        onTouchEnd={handleTap}
        aria-label="تواصل معنا عبر واتساب"
      >
        {/* Custom white WhatsApp icon — NOT brand green, NOT icon library */}
        <svg
          viewBox="0 0 24 24"
          width={22}
          height={22}
          fill="none"
          stroke="#D4A843"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-3.06-6.74L21 4l-1.26 3.06A9 9 0 0 1 21 12z" />
          <path d="M9 11c0 3 2 5 5 5l1.5-1.5-2-1-1 1c-1 0-2-1-2-2l1-1-1-2-1.5 1.5" />
        </svg>

        {/* Badge dot */}
        <span className={`wa-badge${badge ? ' visible' : ''}`} />
      </button>
    </>
  );
}
