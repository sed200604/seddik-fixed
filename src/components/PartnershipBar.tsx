'use client';
import { useRef } from 'react';

const ITEMS = [
  '🎉 شراكة حصرية مع Verto',
  '💳 حلول العملة الصعبة لمنطقة MENA',
  '🏦 حسابات متعددة العملات — USD · EUR · GBP',
  '🤝 Official Verto Partner — GO LLC',
  '🚀 وصول حصري لعملاء GO LLC',
  '🎉 شراكة حصرية مع Verto',
  '💳 حلول العملة الصعبة لمنطقة MENA',
  '🏦 حسابات متعددة العملات — USD · EUR · GBP',
  '🤝 Official Verto Partner — GO LLC',
  '🚀 وصول حصري لعملاء GO LLC',
];

export default function PartnershipBar() {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #1A3A52 0%, #0D1F2D 40%, #1a1a2e 70%, #16213e 100%)',
        borderBottom: '1px solid rgba(244,196,48,0.25)',
        overflow: 'hidden',
        height: 48,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 10,
      }}
      onClick={() => {
        document.getElementById('verto-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      {/* NEW badge */}
      <div style={{
        flexShrink: 0,
        background: 'linear-gradient(135deg, #F4C430, #C49B1A)',
        color: '#0D1F2D',
        fontSize: 11,
        fontWeight: 900,
        padding: '4px 14px',
        letterSpacing: 1.5,
        fontFamily: 'Montserrat, sans-serif',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
      }}>
        NEW
      </div>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div className="marquee-track" style={{ display: 'flex', gap: 64, width: 'max-content' }}>
          {ITEMS.map((item, i) => (
            <span key={i} style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontFamily: 'Cairo, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              {item}
              <span style={{ color: 'rgba(244,196,48,0.4)', marginLeft: 24 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Learn more */}
      <a
        ref={ref}
        href="#verto-section"
        onClick={e => e.stopPropagation()}
        style={{
          flexShrink: 0,
          color: '#F4C430',
          fontSize: 12,
          fontWeight: 700,
          padding: '0 20px',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
          fontFamily: 'Montserrat, sans-serif',
          borderLeft: '1px solid rgba(244,196,48,0.2)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        اعرف أكثر →
      </a>

      <style>{`
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
