'use client';

import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import { EbookProvider, useEbook } from '@/components/ebook/providers/EbookContext';
import { LenisProvider } from '@/components/ebook/providers/LenisProvider';
import PostHogProvider from '@/components/ebook/providers/PostHogProvider';
import EbookHeader from '@/components/ebook/layout/EbookHeader';
import WhatsAppCTA from '@/components/ebook/layout/WhatsAppCTA';

/* Dynamic imports for heavy chapter components — code-split per chapter */
const Chapter00_Cover = dynamic(
  () => import('@/components/ebook/chapters/Chapter00_Cover'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter01_Map = dynamic(
  () => import('@/components/ebook/chapters/Chapter01_Map'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter02_CostReveal = dynamic(
  () => import('@/components/ebook/chapters/Chapter02_CostReveal'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter03_Layers = dynamic(
  () => import('@/components/ebook/chapters/Chapter03_Layers'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter04_Traps = dynamic(
  () => import('@/components/ebook/chapters/Chapter04_Traps'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Paywall = dynamic(
  () => import('@/components/ebook/paywall/Paywall'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter05_Questions = dynamic(
  () => import('@/components/ebook/chapters/Chapter05_Questions'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter06_Disasters = dynamic(
  () => import('@/components/ebook/chapters/Chapter06_Disasters'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter07_Diseases = dynamic(
  () => import('@/components/ebook/chapters/Chapter07_Diseases'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter08_AntiClosure = dynamic(
  () => import('@/components/ebook/chapters/Chapter08_AntiClosure'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter09_Testimonials = dynamic(
  () => import('@/components/ebook/chapters/Chapter09_Testimonials'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter10_Conditions = dynamic(
  () => import('@/components/ebook/chapters/Chapter10_Conditions'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Chapter11_Offer = dynamic(
  () => import('@/components/ebook/chapters/Chapter11_Offer'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const ChapterClosing = dynamic(
  () => import('@/components/ebook/chapters/ChapterClosing'),
  { ssr: false, loading: () => <ChapterSkeleton /> }
);

const Watermark = dynamic(
  () => import('@/components/ebook/protection/Watermark'),
  { ssr: false }
);

const ProtectionLayer = dynamic(
  () => import('@/components/ebook/protection/ProtectionLayer'),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import('@/components/ebook/ui/CustomCursor'),
  { ssr: false }
);

function ChapterSkeleton() {
  return (
    <div
      className="ebook-section"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const TOTAL_CHAPTERS = 13;

function EbookContent() {
  const { currentChapter, setCurrentChapter, scrollProgress, isUnlocked } = useEbook();

  const handleChapterVisible = useCallback(
    (index: number) => {
      setCurrentChapter(index);
    },
    [setCurrentChapter]
  );

  return (
    <>
      <EbookHeader
        totalChapters={TOTAL_CHAPTERS}
        currentChapter={currentChapter}
        scrollProgress={scrollProgress}
      />

      <CustomCursor />
      <WhatsAppCTA />
      <ProtectionLayer />
      <Watermark />

      <main>
        {/* === FREE CHAPTERS (0–4) === */}
        <Chapter00_Cover onVisible={handleChapterVisible} />
        <Chapter01_Map onVisible={handleChapterVisible} />
        <Chapter02_CostReveal onVisible={handleChapterVisible} />
        <Chapter03_Layers onVisible={handleChapterVisible} />
        <Chapter04_Traps onVisible={handleChapterVisible} />

        {/* === PAYWALL === */}
        <Paywall />

        {/* === GATED CHAPTERS (5–11 + Closing) === */}
        {isUnlocked && (
          <>
            <div data-gated>
              <Chapter05_Questions onVisible={handleChapterVisible} />
              <Chapter06_Disasters onVisible={handleChapterVisible} />
              <Chapter07_Diseases onVisible={handleChapterVisible} />
              <Chapter08_AntiClosure onVisible={handleChapterVisible} />
              <Chapter09_Testimonials onVisible={handleChapterVisible} />
              <Chapter10_Conditions onVisible={handleChapterVisible} />
              <Chapter11_Offer onVisible={handleChapterVisible} />
              <ChapterClosing onVisible={handleChapterVisible} />
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default function EbookPage() {
  return (
    <PostHogProvider>
      <EbookProvider>
        <LenisProvider>
          <EbookContent />
        </LenisProvider>
      </EbookProvider>
    </PostHogProvider>
  );
}
