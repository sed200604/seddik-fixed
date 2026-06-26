'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';
import MagneticButton from '@/components/ebook/ui/MagneticButton';

interface Chapter10Props {
  onVisible: (chapterIndex: number) => void;
}

const WHATSAPP_URL = 'https://wa.me/213791789125';

interface Condition {
  text: string;
  detail: string;
}

const CONDITIONS: Condition[] = [
  {
    text: 'عندك بزنس حقيقي أو خطة جدية',
    detail: 'مش فضول',
  },
  {
    text: 'مستعد تستثمر $80 في حماية مستقبلك',
    detail: 'مش "الأرخص بس"',
  },
  {
    text: 'عندك 90 دقيقة لجلسة مباشرة',
    detail: 'مش "ادفع وانسى"',
  },
  {
    text: 'تقدر الشفافية على الاختصارات',
    detail: 'تنتظر 14–21 يوم، ما تقبلش وثائق مزورة',
  },
];

function getScoreResult(score: number): {
  text: string;
  color: string;
  type: 'qualified' | 'discuss' | 'rejected';
} {
  if (score === 4) {
    return {
      text: 'أنت مؤهل. تابع للعرض.',
      color: 'var(--color-ebook-green)',
      type: 'qualified',
    };
  }
  if (score === 3) {
    return {
      text: 'تواصل معنا لنناقش.',
      color: 'oklch(0.80 0.16 90)',
      type: 'discuss',
    };
  }
  return {
    text: 'نحن مش الخيار المناسب لك. لا تتقدم، راح نرفض.',
    color: 'var(--color-ebook-red)',
    type: 'rejected',
  };
}

export default function Chapter10_Conditions({ onVisible }: Chapter10Props) {
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);

  const toggleCondition = useCallback((index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const score = checked.filter(Boolean).length;
  const result = getScoreResult(score);
  const hasAnyChecked = score > 0;

  return (
    <ChapterWrapper
      id="chapter-10-conditions"
      chapterIndex={10}
      titleAr="الـ٤ شروط للقبول"
      onVisible={onVisible}
    >
      <div data-gated style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="ebook-heading-2" style={{ color: 'var(--color-ebook-gold)', marginBlockEnd: '0.75rem' }}>
            الـ٤ شروط للقبول
          </h2>
          <p className="ebook-body-text" style={{ color: 'var(--color-ebook-text-secondary)' }}>
            ما نقبلوش الجميع. هل أنت من اللي نقدرو نحميهم؟
          </p>
        </div>

        {/* Conditions list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            maxWidth: '36rem',
          }}
        >
          {CONDITIONS.map((condition, index) => {
            const isChecked = checked[index];

            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => toggleCondition(index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                aria-pressed={isChecked}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.25rem',
                  background: isChecked
                    ? 'oklch(0.72 0.16 155 / 0.06)'
                    : 'var(--color-ebook-surface)',
                  border: `2px solid ${isChecked ? 'var(--color-ebook-green)' : 'var(--color-ebook-border)'}`,
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  textAlign: 'start',
                  color: 'var(--color-ebook-text)',
                  fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                  width: '100%',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
              >
                {/* Checkbox */}
                <div
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '0.375rem',
                    border: `2px solid ${isChecked ? 'var(--color-ebook-green)' : 'var(--color-ebook-border)'}`,
                    background: isChecked ? 'var(--color-ebook-green)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    marginBlockStart: '0.125rem',
                  }}
                  aria-hidden="true"
                >
                  {isChecked && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 7L6 10L11 4"
                        stroke="var(--color-ebook-bg)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      color: isChecked ? 'var(--color-ebook-green)' : 'var(--color-ebook-text)',
                    }}
                  >
                    {condition.text}
                  </span>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-ebook-text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    ({condition.detail})
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Score display */}
        {hasAnyChecked && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '2rem',
              background: 'var(--color-ebook-surface)',
              borderRadius: '1rem',
              border: `2px solid ${result.color}`,
              width: '100%',
              maxWidth: '36rem',
              textAlign: 'center',
            }}
          >
            {/* Score counter */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span
                className="ebook-mono"
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: result.color,
                }}
              >
                {score}
              </span>
              <span
                className="ebook-mono"
                style={{
                  fontSize: '1.25rem',
                  color: 'var(--color-ebook-text-secondary)',
                }}
              >
                / 4
              </span>
            </div>

            <p
              style={{
                margin: 0,
                fontSize: '1.125rem',
                fontWeight: 600,
                color: result.color,
                lineHeight: 1.6,
              }}
            >
              {result.text}
            </p>

            {/* CTA based on result */}
            {result.type === 'qualified' && (
              <MagneticButton
                variant="gold"
                href="#chapter-11-offer"
                ariaLabel="تابع للعرض الخاص"
              >
                تابع للعرض ↓
              </MagneticButton>
            )}
            {result.type === 'discuss' && (
              <MagneticButton
                variant="green"
                href={WHATSAPP_URL}
                ariaLabel="تواصل معنا عبر واتساب"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                تواصل معنا
              </MagneticButton>
            )}
          </motion.div>
        )}
      </div>
    </ChapterWrapper>
  );
}
