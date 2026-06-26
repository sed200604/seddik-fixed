'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';

interface Chapter00Props {
  onVisible: (chapterIndex: number) => void;
}

const TIMELINE_BEATS = [
  {
    day: 'اليوم 1',
    label: 'كريم دفع لوكيل',
    value: '$180',
    detail: 'كريم، 32 سنة، من البليدة. Shopify dropshipper. دفع $180 لوكيل يأسس له شركة أمريكية.',
  },
  {
    day: 'اليوم 20',
    label: 'Wise أغلق حسابه',
    value: '$11,000',
    detail: 'Wise أغلق حسابه. $11,000 مجمّدة. السبب: العنوان المسجّل غير حقيقي.',
  },
  {
    day: 'اليوم 30',
    label: 'Stripe حظره نهائياً',
    value: '$0',
    detail: 'Stripe حظره نهائياً. 60 يوم من العمل. كل الأرباح ضاعت. لا رجوع.',
  },
];

function AnimatedCounter({ target, prefix = '' }: { target: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const start = performance.now();

    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [isInView, target]);

  return (
    <span ref={ref} className="ebook-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{displayed.toLocaleString()}
    </span>
  );
}

export default function Chapter00_Cover({ onVisible }: Chapter00Props) {
  const [activeBeat, setActiveBeat] = useState(-1);
  const [showQuote, setShowQuote] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  useEffect(() => {
    if (!isInView) return;

    const timers: NodeJS.Timeout[] = [];

    TIMELINE_BEATS.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveBeat(i), 800 + i * 1200));
    });

    timers.push(
      setTimeout(() => setShowQuote(true), 800 + TIMELINE_BEATS.length * 1200 + 600)
    );

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <ChapterWrapper
      id="chapter-0"
      chapterIndex={0}
      titleAr="لماذا كتبنا هذا"
      onVisible={onVisible}
    >
      {/* Hero section */}
      <div
        ref={sectionRef}
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          paddingBlock: 'clamp(3rem, 8vw, 6rem)',
        }}
      >
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBlockEnd: '2rem',
          }}
        >
          <span
            className="ebook-mono"
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-ebook-text-secondary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            الفصل 0
          </span>
          <span
            style={{
              width: '2rem',
              height: '1px',
              background: 'var(--color-ebook-border)',
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="ebook-heading-1"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            marginBlockEnd: '1rem',
            maxWidth: '20ch',
          }}
        >
          لماذا كتبنا هذا
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            color: 'var(--color-ebook-text-secondary)',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            marginBlockEnd: 'clamp(3rem, 6vw, 5rem)',
            maxWidth: '45ch',
          }}
        >
          قصة كريم. 32 سنة. من البليدة. هذا اللي صرالو.
        </motion.p>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '36rem',
            paddingInlineStart: '2rem',
          }}
        >
          {/* Vertical dotted line */}
          <div
            style={{
              position: 'absolute',
              insetInlineStart: '0.5rem',
              top: 0,
              bottom: 0,
              width: '2px',
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                var(--color-ebook-red) 0px,
                var(--color-ebook-red) 4px,
                transparent 4px,
                transparent 12px
              )`,
            }}
            aria-hidden="true"
          />

          {TIMELINE_BEATS.map((beat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={activeBeat >= i ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                paddingBlockEnd: i < TIMELINE_BEATS.length - 1 ? '3rem' : '0',
                paddingInlineStart: '2rem',
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  insetInlineStart: '-1.5rem',
                  top: '0.25rem',
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '50%',
                  background: activeBeat >= i ? 'var(--color-ebook-red)' : 'var(--color-ebook-border)',
                  border: '2px solid var(--color-ebook-bg)',
                  boxShadow: activeBeat >= i ? '0 0 12px oklch(0.62 0.22 27 / 0.4)' : 'none',
                  transition: 'all 0.3s ease',
                }}
                aria-hidden="true"
              />

              {/* Day label */}
              <div
                className="ebook-mono"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-ebook-red)',
                  marginBlockEnd: '0.375rem',
                  letterSpacing: '0.05em',
                }}
              >
                {beat.day}
              </div>

              {/* Value */}
              <div
                style={{
                  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                  fontWeight: 700,
                  color: i === TIMELINE_BEATS.length - 1 ? 'var(--color-ebook-red)' : 'var(--color-ebook-text)',
                  marginBlockEnd: '0.5rem',
                  lineHeight: 1.1,
                }}
              >
                {activeBeat >= i ? (
                  <AnimatedCounter
                    target={parseInt(beat.value.replace(/[$,]/g, ''))}
                    prefix="$"
                  />
                ) : (
                  <span className="ebook-mono" style={{ opacity: 0.3 }}>---</span>
                )}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  fontWeight: 600,
                  color: 'var(--color-ebook-text)',
                  marginBlockEnd: '0.375rem',
                }}
              >
                {beat.label}
              </div>

              {/* Detail */}
              <div
                className="ebook-body-text"
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-ebook-text-secondary)',
                  lineHeight: 1.7,
                  maxWidth: '40ch',
                  textAlign: 'start',
                }}
              >
                {beat.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final quote */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          animate={showQuote ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="ebook-quote"
          style={{
            marginBlockStart: 'clamp(3rem, 8vw, 5rem)',
            color: 'var(--color-ebook-red)',
            maxWidth: '30ch',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              insetInlineEnd: '-1.5rem',
              top: '-1rem',
              fontSize: '4rem',
              color: 'var(--color-ebook-red)',
              opacity: 0.15,
              lineHeight: 1,
            }}
          >
            &ldquo;
          </span>
          لو قرأت كتاباً يشرح لي اللعبة، ما كنت لأخسر كل شيء.
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showQuote ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginBlockStart: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              background: 'var(--color-ebook-surface)',
              border: '1px solid var(--color-ebook-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--color-ebook-red)',
            }}
          >
            ك
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              كريم
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-ebook-text-secondary)',
              }}
            >
              32 سنة — البليدة
            </div>
          </div>
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}
