'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';
import MagneticButton from '@/components/ebook/ui/MagneticButton';

interface ChapterClosingProps {
  onVisible: (chapterIndex: number) => void;
}

const WHATSAPP_URL = 'https://wa.me/213791789125?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D9%85%D9%82%D8%B9%D8%AF';

const NAMES = [
  'كريم لم يقرأ هذا الكتاب.',
  'ياسين لم يقرأ هذا الكتاب.',
  'سارة لم تقرأ هذا الكتاب.',
];

const MIDDLE_LINE = 'كلهم خسروا أولاً، ثم وجدونا.';
const CLOSING_LINE = 'أنت قرأت. أنت محظوظ. الآن، اختر.';

function TypewriterLine({
  text,
  onComplete,
  startDelay,
}: {
  text: string;
  onComplete: () => void;
  startDelay: number;
}) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    indexRef.current = 0;
    setDisplayed('');

    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current <= text.length) {
        setDisplayed(text.slice(0, indexRef.current));
      } else {
        clearInterval(interval);
        onCompleteRef.current();
      }
    }, 60);

    return () => clearInterval(interval);
  }, [started, text]);

  if (!started) return null;

  return (
    <span
      className="ebook-mono"
      style={{
        fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
        color: 'var(--color-ebook-text)',
        display: 'block',
        minHeight: '2em',
      }}
    >
      {displayed}
      {displayed.length < text.length && (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1.2em',
            background: 'var(--color-ebook-gold)',
            marginInlineStart: '2px',
            verticalAlign: 'text-bottom',
            animation: 'blink-caret 0.8s step-end infinite',
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

function ReducedMotionView() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        textAlign: 'center',
      }}
    >
      {NAMES.map((name, i) => (
        <span
          key={i}
          className="ebook-mono"
          style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'var(--color-ebook-text)',
            display: 'block',
          }}
        >
          {name}
        </span>
      ))}

      <div style={{ height: '2rem' }} aria-hidden="true" />

      <p
        className="ebook-heading-2"
        style={{
          color: 'var(--color-ebook-gold)',
          margin: 0,
        }}
      >
        {MIDDLE_LINE}
      </p>

      <div style={{ height: '1rem' }} aria-hidden="true" />

      <p
        className="ebook-heading-1"
        style={{
          color: 'var(--color-ebook-gold)',
          margin: 0,
        }}
      >
        {CLOSING_LINE}
      </p>

      <div style={{ marginBlockStart: '2rem' }}>
        <MagneticButton
          variant="gold"
          href={WHATSAPP_URL}
          ariaLabel="تواصل معنا الآن عبر واتساب"
        >
          ابدأ الآن
        </MagneticButton>
      </div>
    </div>
  );
}

function AnimatedView() {
  const [phase, setPhase] = useState(0);
  /* phase 0: typing line 1
     phase 1: typing line 2
     phase 2: typing line 3
     phase 3: fade out names, pause
     phase 4: show middle line
     phase 5: show closing line + CTA */

  const handleLineComplete = useCallback((lineIndex: number) => {
    if (lineIndex < 2) {
      /* Brief pause then start next line */
      setTimeout(() => setPhase(lineIndex + 1), 800);
    } else {
      /* All 3 lines done, fade out after a beat */
      setTimeout(() => setPhase(3), 1200);
    }
  }, []);

  useEffect(() => {
    if (phase === 3) {
      const timeout = setTimeout(() => setPhase(4), 1500);
      return () => clearTimeout(timeout);
    }
    if (phase === 4) {
      const timeout = setTimeout(() => setPhase(5), 2000);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center',
        minHeight: '50vh',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Names phase */}
      <motion.div
        animate={{
          opacity: phase >= 3 ? 0 : 1,
          y: phase >= 3 ? -20 : 0,
        }}
        transition={{ duration: 0.8 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          position: phase >= 4 ? 'absolute' : 'relative',
          pointerEvents: phase >= 3 ? 'none' : 'auto',
        }}
      >
        {phase >= 0 && (
          <TypewriterLine
            text={NAMES[0]}
            onComplete={() => handleLineComplete(0)}
            startDelay={500}
          />
        )}
        {phase >= 1 && (
          <TypewriterLine
            text={NAMES[1]}
            onComplete={() => handleLineComplete(1)}
            startDelay={0}
          />
        )}
        {phase >= 2 && (
          <TypewriterLine
            text={NAMES[2]}
            onComplete={() => handleLineComplete(2)}
            startDelay={0}
          />
        )}
      </motion.div>

      {/* Middle line */}
      {phase >= 4 && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="ebook-heading-2"
          style={{
            color: 'var(--color-ebook-gold)',
            margin: 0,
            marginBlockEnd: '1rem',
          }}
        >
          {MIDDLE_LINE}
        </motion.p>
      )}

      {/* Closing line */}
      {phase >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <p
            className="ebook-heading-1"
            style={{
              color: 'var(--color-ebook-gold)',
              margin: 0,
            }}
          >
            {CLOSING_LINE}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <MagneticButton
              variant="gold"
              href={WHATSAPP_URL}
              ariaLabel="تواصل معنا الآن عبر واتساب"
            >
              ابدأ الآن
            </MagneticButton>
          </motion.div>
        </motion.div>
      )}

      {/* Caret blink keyframe */}
      <style>{`
        @keyframes blink-caret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function ChapterClosing({ onVisible }: ChapterClosingProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ChapterWrapper
      id="chapter-closing"
      chapterIndex={12}
      titleAr="الخاتمة"
      onVisible={onVisible}
    >
      <div data-gated>
        {prefersReducedMotion ? <ReducedMotionView /> : <AnimatedView />}
      </div>
    </ChapterWrapper>
  );
}
