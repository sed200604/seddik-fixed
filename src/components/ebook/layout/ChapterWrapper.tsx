'use client';

import { useRef, useState } from 'react';
import { useGlobalAnimation } from '@/hooks/useGlobalAnimations';

interface ChapterWrapperProps {
  id: string;
  chapterIndex: number;
  titleAr: string;
  children: React.ReactNode;
  className?: string;
  onVisible?: (chapterIndex: number) => void;
}

export default function ChapterWrapper({
  id,
  chapterIndex,
  titleAr,
  children,
  className = '',
  onVisible,
}: ChapterWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useGlobalAnimation(sectionRef, () => {
    setHasBeenVisible(true);
    onVisible?.(chapterIndex);
  });

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`ebook-section ${className}`}
      aria-label={titleAr}
      data-chapter={chapterIndex}
    >
      <div className="ebook-section-inner">
        {children}
      </div>
      {hasBeenVisible && <div className="ebook-chapter-divider" aria-hidden="true" />}
    </section>
  );
}
