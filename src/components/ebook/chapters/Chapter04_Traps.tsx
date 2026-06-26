'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';
import FlipCard from '@/components/ebook/ui/FlipCard';
import { traps } from '@/data/ebook/traps';

interface Chapter04Props {
  onVisible: (chapterIndex: number) => void;
}

function TrapFront({ trapNumber, titleAr, bait }: { trapNumber: number; titleAr: string; bait: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '1rem',
      }}
    >
      {/* Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
        }}
      >
        <span
          className="ebook-mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            background: 'var(--color-ebook-gold)',
            color: 'var(--color-ebook-bg)',
            fontWeight: 700,
            fontSize: '0.875rem',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {trapNumber}
        </span>
        <span
          className="ebook-mono"
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-ebook-gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          TRAP #{trapNumber}
        </span>
      </div>

      {/* Title */}
      <h3
        className="ebook-heading-3"
        style={{ margin: 0, color: 'var(--color-ebook-text)' }}
      >
        {titleAr}
      </h3>

      {/* Bait Text */}
      <p
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          lineHeight: 1.7,
          color: 'var(--color-ebook-text-secondary)',
          margin: 0,
          flex: 1,
        }}
      >
        <span
          style={{ color: 'var(--color-ebook-gold)', fontWeight: 600 }}
          aria-hidden="true"
        >
          ◇{' '}
        </span>
        الطُعم: &ldquo;{bait}&rdquo;
      </p>

      {/* Flip Hint */}
      <p
        className="ebook-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-ebook-text-secondary)',
          textAlign: 'center',
          margin: 0,
          opacity: 0.6,
        }}
        aria-hidden="true"
      >
        ← اقلب لترى الحقيقة
      </p>
    </div>
  );
}

function TrapBack({
  reality,
  damageAmount,
  damageDescription,
  detection,
}: {
  reality: string;
  damageAmount: string;
  damageDescription: string;
  detection: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '0.875rem',
      }}
    >
      {/* Reality Label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '1.5rem',
            height: '1.5rem',
            borderRadius: '50%',
            background: 'var(--color-ebook-red)',
            color: 'var(--color-ebook-bg)',
            fontWeight: 700,
            fontSize: '0.75rem',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          !
        </span>
        <span
          className="ebook-mono"
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-ebook-red)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          الحقيقة
        </span>
      </div>

      {/* Reality Text */}
      <p
        style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: 'clamp(0.8125rem, 2vw, 0.9375rem)',
          lineHeight: 1.7,
          color: 'var(--color-ebook-text)',
          margin: 0,
        }}
      >
        {reality}
      </p>

      {/* Damage Amount */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          background: 'oklch(0.62 0.22 27 / 0.08)',
          border: '1px solid oklch(0.62 0.22 27 / 0.2)',
        }}
      >
        <span
          className="ebook-mono"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 700,
            color: 'var(--color-ebook-red)',
            direction: 'ltr',
            textAlign: 'center',
          }}
        >
          {damageAmount}
        </span>
        <span
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: '0.75rem',
            color: 'var(--color-ebook-text-secondary)',
            textAlign: 'center',
          }}
        >
          {damageDescription}
        </span>
      </div>

      {/* Detection Method */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem',
          marginBlockStart: 'auto',
        }}
      >
        <span
          style={{
            color: 'var(--color-ebook-green)',
            fontWeight: 700,
            flexShrink: 0,
            marginBlockStart: '0.125rem',
          }}
          aria-hidden="true"
        >
          🛡
        </span>
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            color: 'var(--color-ebook-green)',
            margin: 0,
          }}
        >
          {detection}
        </p>
      </div>
    </div>
  );
}

export default function Chapter04_Traps({ onVisible }: Chapter04Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.15 });
  const endRef = useRef<HTMLDivElement>(null);
  const isEndInView = useInView(endRef, { once: true, amount: 0.5 });

  return (
    <ChapterWrapper
      id="chapter-04"
      chapterIndex={4}
      titleAr="الـ٤ فخوخ المخفية"
      onVisible={onVisible}
    >
      {/* Chapter Title */}
      <motion.header
        className="text-center"
        style={{ marginBlockEnd: 'clamp(2rem, 6vw, 4rem)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="ebook-heading-1" style={{ color: 'var(--color-ebook-gold)' }}>
          الـ٤ فخوخ المخفية
        </h2>
        <p
          className="ebook-body-text"
          style={{
            color: 'var(--color-ebook-text-secondary)',
            marginBlockStart: '0.75rem',
            textAlign: 'center',
          }}
        >
          كل فخ يبدأ بطُعم مغري. اقلب الكارت لتكتشف الحقيقة.
        </p>
      </motion.header>

      {/* Flip Cards Grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
          maxWidth: '56rem',
          marginInline: 'auto',
        }}
      >
        {traps.map((trap, idx) => (
          <motion.div
            key={trap.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isGridInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: idx * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ minHeight: '22rem' }}
          >
            <FlipCard
              index={idx}
              className="ebook-card-danger"
              front={
                <TrapFront
                  trapNumber={trap.id}
                  titleAr={trap.titleAr}
                  bait={trap.bait}
                />
              }
              back={
                <TrapBack
                  reality={trap.reality}
                  damageAmount={trap.damageAmount}
                  damageDescription={trap.damageDescription}
                  detection={trap.detection}
                />
              }
            />
          </motion.div>
        ))}
      </div>

      {/* End of Free Preview */}
      <motion.div
        ref={endRef}
        style={{
          textAlign: 'center',
          marginBlockStart: 'clamp(3rem, 8vw, 5rem)',
          paddingBlock: 'clamp(1.5rem, 4vw, 2.5rem)',
          borderBlockStart: '1px solid var(--color-ebook-border)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={isEndInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="ebook-heading-3"
          style={{
            color: 'var(--color-ebook-gold)',
            marginBlockEnd: '0.75rem',
          }}
        >
          هنا ينتهي المعاينة المجانية
        </p>
        <p
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            color: 'var(--color-ebook-text-secondary)',
            lineHeight: 1.7,
            maxWidth: '40ch',
            marginInline: 'auto',
          }}
        >
          الفصول التالية محمية. أكمل القراءة مع النسخة الكاملة.
        </p>
        <div
          className="ebook-mono"
          style={{
            marginBlockStart: '1.25rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '9999px',
            border: '1px solid var(--color-ebook-border)',
            fontSize: '0.8125rem',
            color: 'var(--color-ebook-text-secondary)',
          }}
          aria-hidden="true"
        >
          <span style={{ opacity: 0.5 }}>🔒</span>
          <span>CHAPTERS 5–10 LOCKED</span>
        </div>
      </motion.div>
    </ChapterWrapper>
  );
}
