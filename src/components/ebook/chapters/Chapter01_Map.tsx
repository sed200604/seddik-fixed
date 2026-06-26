'use client';

import { useRef, useState, useMemo, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import dynamic from 'next/dynamic';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';

/* Lazy-load the 3D scene to avoid shipping Three.js to non-viewers */
const AlgeriaMapScene = dynamic(() => import('./AlgeriaMapScene'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '400px',
        background: 'var(--color-ebook-surface)',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--color-ebook-border)',
      }}
    >
      <div
        style={{
          width: '2rem',
          height: '2rem',
          border: '2px solid var(--color-ebook-border)',
          borderTopColor: 'var(--color-ebook-gold)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
    </div>
  ),
});

interface Chapter01Props {
  onVisible: (chapterIndex: number) => void;
}

const STATS = [
  { value: 100, label: 'شركة تأسست', suffix: '' },
  { value: 93, label: 'حسابات نشطة', suffix: '%' },
  { value: 73, label: 'عاد لخدمات إضافية', suffix: '%' },
  { value: 4, label: 'ولايات', suffix: '' },
];

function StatCounter({
  value,
  label,
  suffix,
  delay,
}: {
  value: number;
  label: string;
  suffix: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  const started = useRef(false);
  if (isInView && !started.current) {
    started.current = true;
    const startTime = performance.now() + delay * 1000;

    function animate(now: number) {
      if (now < startTime) {
        requestAnimationFrame(animate);
        return;
      }
      const elapsed = now - startTime;
      const duration = 2000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div
        className="ebook-stat"
        style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          marginBlockEnd: '0.5rem',
        }}
      >
        {displayed}
        {suffix}
      </div>
      <div className="ebook-stat-label">{label}</div>
    </div>
  );
}

export default function Chapter01_Map({ onVisible }: Chapter01Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useState(() => {
    if (typeof window !== 'undefined') {
      setPrefersReduced(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }
  });

  return (
    <ChapterWrapper
      id="chapter-1"
      chapterIndex={1}
      titleAr="100 شركة في 7 أشهر"
      onVisible={onVisible}
    >
      <div ref={containerRef}>
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBlockEnd: '1.5rem',
          }}
        >
          <span
            className="ebook-mono"
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-ebook-gold)',
              letterSpacing: '0.1em',
            }}
          >
            الفصل 1
          </span>
          <span
            style={{
              flex: 1,
              height: '1px',
              background: 'var(--color-ebook-border)',
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="ebook-heading-1"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ marginBlockEnd: '1rem' }}
        >
          100 شركة في 7 أشهر
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="ebook-body-text"
          style={{
            color: 'var(--color-ebook-text-secondary)',
            marginBlockEnd: 'clamp(2rem, 5vw, 3rem)',
          }}
        >
          خريطة الجزائر. كل نقطة = شركة أسسناها. الأرقام حقيقية. العقود موجودة.
        </motion.p>

        {/* 3D Map or Static Fallback */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            marginBlockEnd: 'clamp(3rem, 6vw, 4rem)',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: '1px solid var(--color-ebook-border)',
            background: 'var(--color-ebook-surface)',
          }}
        >
          {prefersReduced ? <StaticAlgeriaMap /> : <AlgeriaMapScene />}
        </motion.div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBlockEnd: 'clamp(3rem, 6vw, 4rem)',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            >
              <StatCounter
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={0.5 + i * 0.15}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="ebook-card"
          style={{
            textAlign: 'center',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          <p
            style={{
              color: 'var(--color-ebook-text-secondary)',
              marginBlockEnd: '1.5rem',
              fontSize: '1rem',
            }}
          >
            تبي تتحقق؟ أرسلنا رسالة على واتساب، نرسلك قائمة العقود (بأسماء محجوبة).
          </p>
          <a
            href="https://wa.me/213791789125?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AA%D8%AD%D9%82%D9%82"
            target="_blank"
            rel="noopener noreferrer"
            className="ebook-magnetic-btn ebook-magnetic-btn-green"
            data-magnetic
            aria-label="تحقق عبر واتساب"
            style={{ textDecoration: 'none' }}
          >
            <WhatsAppIcon />
            تحقق عبر واتساب
          </a>
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}

/* Static fallback for reduced motion */
function StaticAlgeriaMap() {
  const WILAYAS = [
    { name: 'الجزائر', count: 53, x: 48, y: 35 },
    { name: 'قسنطينة', count: 21, x: 72, y: 30 },
    { name: 'وهران', count: 20, x: 18, y: 32 },
    { name: 'أخرى', count: 6, x: 50, y: 60 },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '350px',
        background: 'var(--color-ebook-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="img"
      aria-label="خريطة الجزائر — 100 شركة: الجزائر 53، قسنطينة 21، وهران 20، أخرى 6"
    >
      {/* Simplified Algeria outline */}
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '500px',
        }}
        aria-hidden="true"
      >
        {/* Simplified Algeria shape */}
        <path
          d="M15,20 L30,15 L50,12 L70,14 L85,18 L88,30 L85,50 L80,70 L65,85 L50,90 L35,88 L20,80 L12,60 L10,40 Z"
          fill="none"
          stroke="var(--color-ebook-border)"
          strokeWidth="0.5"
        />

        {/* Wilaya dots */}
        {WILAYAS.map((w, i) => (
          <g key={i}>
            <circle
              cx={w.x}
              cy={w.y}
              r="3"
              fill="var(--color-ebook-gold)"
              opacity="0.8"
            />
            <text
              x={w.x}
              y={w.y - 5}
              textAnchor="middle"
              fill="var(--color-ebook-gold)"
              fontSize="3.5"
              fontWeight="bold"
              fontFamily="'Geist Mono', monospace"
            >
              {w.count}
            </text>
            <text
              x={w.x}
              y={w.y + 7}
              textAnchor="middle"
              fill="var(--color-ebook-text-secondary)"
              fontSize="2.8"
              fontFamily="'IBM Plex Sans Arabic', sans-serif"
            >
              {w.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
