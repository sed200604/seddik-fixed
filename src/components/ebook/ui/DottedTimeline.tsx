'use client';

interface TimelineBeat {
  label: string;
  value: string;
  color: 'red' | 'gold';
}

interface DottedTimelineProps {
  beats: TimelineBeat[];
  className?: string;
}

export default function DottedTimeline({
  beats,
  className = '',
}: DottedTimelineProps) {
  const lastBeatColor = beats.length > 0 ? beats[beats.length - 1].color : 'red';
  const threadClass = lastBeatColor === 'gold'
    ? 'ebook-timeline-thread ebook-timeline-thread-gold'
    : 'ebook-timeline-thread';

  return (
    <div
      className={`${className}`}
      style={{ position: 'relative', paddingBlock: '2rem' }}
      role="list"
      aria-label="الجدول الزمني"
    >
      <div className={threadClass} aria-hidden="true" />

      {beats.map((beat, i) => {
        const dotClass = beat.color === 'gold'
          ? 'ebook-timeline-dot ebook-timeline-dot-gold'
          : 'ebook-timeline-dot';

        return (
          <div
            key={`${beat.label}-${i}`}
            role="listitem"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              position: 'relative',
              zIndex: 3,
              paddingBlock: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div className={dotClass} aria-hidden="true" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span
                className="ebook-body-text"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  lineHeight: 1.4,
                  color: 'var(--color-ebook-text-secondary)',
                  maxWidth: 'none',
                }}
              >
                {beat.label}
              </span>
              <span
                className="ebook-mono"
                style={{
                  fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                  fontWeight: 700,
                  color: beat.color === 'gold'
                    ? 'var(--color-ebook-gold)'
                    : 'var(--color-ebook-red)',
                }}
              >
                {beat.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
