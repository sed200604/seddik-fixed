'use client';

import { useEffect, useState } from 'react';

interface EbookHeaderProps {
  totalChapters: number;
  currentChapter: number;
  scrollProgress: number;
}

const CHAPTER_TITLES: Record<number, string> = {
  0: 'لماذا كتبنا هذا',
  1: '100 شركة في 7 أشهر',
  2: 'الحقيقة الأولى',
  3: 'العملية الكاملة',
  4: 'الـ4 فخوخ المخفية',
  5: 'الـ7 أسئلة الحاسمة',
  6: 'جدار الكوارث',
  7: 'الـ5 أمراض',
  8: 'نظام Anti-Closure',
  9: 'آراء عملائنا',
  10: 'الـ4 شروط للقبول',
  11: 'العرض الخاص',
  12: 'الخاتمة',
};

export default function EbookHeader({
  totalChapters,
  currentChapter,
  scrollProgress,
}: EbookHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="ebook-progress-bar"
        style={{ width: `${scrollProgress * 100}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="تقدم القراءة"
      />

      {/* Sticky header */}
      <header
        style={{
          position: 'fixed',
          insetBlockStart: '3px',
          insetInlineStart: 0,
          insetInlineEnd: 0,
          zIndex: 150,
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: isScrolled
            ? 'oklch(0.14 0.01 250 / 0.85)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBlockEnd: isScrolled
            ? '1px solid var(--color-ebook-border)'
            : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* Logo / brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            opacity: isScrolled ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'var(--color-ebook-gold)',
              letterSpacing: '-0.02em',
            }}
          >
            GO LLC
          </span>
          <span
            style={{
              width: '1px',
              height: '1rem',
              background: 'var(--color-ebook-border)',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontSize: '0.8125rem',
              color: 'var(--color-ebook-text-secondary)',
              fontWeight: 500,
            }}
          >
            {CHAPTER_TITLES[currentChapter] ?? ''}
          </span>
        </div>

        {/* Chapter counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: isScrolled ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: '0.75rem',
              color: 'var(--color-ebook-text-secondary)',
            }}
          >
            {currentChapter + 1}/{totalChapters}
          </span>

          {/* Mini chapter dots */}
          <div
            style={{
              display: 'flex',
              gap: '3px',
              alignItems: 'center',
            }}
            aria-hidden="true"
          >
            {Array.from({ length: totalChapters }, (_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentChapter ? '12px' : '4px',
                  height: '4px',
                  borderRadius: '2px',
                  background:
                    i === currentChapter
                      ? 'var(--color-ebook-gold)'
                      : i < currentChapter
                        ? 'var(--color-ebook-gold-dim)'
                        : 'var(--color-ebook-border)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
