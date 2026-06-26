'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';
import MonospaceCounter from '@/components/ebook/ui/MonospaceCounter';

interface Chapter02Props {
  onVisible: (chapterIndex: number) => void;
}

interface BarDataItem {
  label: string;
  value: number;
  displayValue: string;
  isZero: boolean;
  isDanger: boolean;
}

const BAR_DATA: BarDataItem[] = [
  {
    label: 'Bizee LLC formation',
    value: 0,
    displayValue: '$0',
    isZero: true,
    isDanger: false,
  },
  {
    label: 'Registered agent (Year 1)',
    value: 0,
    displayValue: '$0',
    isZero: true,
    isDanger: false,
  },
  {
    label: 'EIN from IRS',
    value: 0,
    displayValue: '$0',
    isZero: true,
    isDanger: false,
  },
  {
    label: 'Operating Agreement',
    value: 0,
    displayValue: '$0',
    isZero: true,
    isDanger: false,
  },
  {
    label: 'State filing fee',
    value: 100,
    displayValue: '~$100',
    isZero: false,
    isDanger: false,
  },
  {
    label: 'ربح الوكيل',
    value: 180,
    displayValue: '$180',
    isZero: false,
    isDanger: true,
  },
];

const MAX_VALUE = 200;

function getBarWidthPercent(item: BarDataItem): number {
  if (item.isZero) return 8;
  return Math.max(12, (item.value / MAX_VALUE) * 100);
}

function CostBar({ item, index, isInView }: { item: BarDataItem; index: number; isInView: boolean }) {
  const widthPercent = getBarWidthPercent(item);
  const staggerDelay = index * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: staggerDelay, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}
    >
      {/* Bar Label Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: 'clamp(0.8125rem, 2vw, 0.9375rem)',
            color: item.isDanger
              ? 'var(--color-ebook-red)'
              : 'var(--color-ebook-text-secondary)',
            fontWeight: item.isDanger ? 700 : 400,
          }}
        >
          {item.label}
        </span>
        <span
          className="ebook-mono"
          style={{
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            color: item.isDanger
              ? 'var(--color-ebook-red)'
              : item.isZero
                ? 'var(--color-ebook-green)'
                : 'var(--color-ebook-text)',
            fontWeight: 700,
          }}
        >
          {item.displayValue}
        </span>
      </div>

      {/* Bar Visual */}
      <div
        className={`ebook-bar ${item.isDanger ? 'ebook-bar-danger' : ''}`}
        style={{ width: '100%' }}
      >
        <motion.div
          className="ebook-bar-fill"
          style={{
            background: item.isDanger
              ? 'linear-gradient(to left, var(--color-ebook-red), oklch(0.52 0.18 27))'
              : item.isZero
                ? 'linear-gradient(to left, var(--color-ebook-green), oklch(0.58 0.12 155))'
                : 'linear-gradient(to left, var(--color-ebook-gold), oklch(0.65 0.1 75))',
          }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${widthPercent}%` } : {}}
          transition={{ duration: 1.2, delay: staggerDelay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function Chapter02_CostReveal({ onVisible }: Chapter02Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const punchlineRef = useRef<HTMLDivElement>(null);
  const isChartInView = useInView(chartRef, { once: true, amount: 0.3 });
  const isPunchlineInView = useInView(punchlineRef, { once: true, amount: 0.5 });

  return (
    <ChapterWrapper
      id="chapter-02"
      chapterIndex={2}
      titleAr="الحقيقة الأولى"
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
        <h2 className="ebook-heading-1" style={{ color: 'var(--color-ebook-red)' }}>
          الحقيقة الأولى
        </h2>
        <p
          className="ebook-mono"
          style={{
            color: 'var(--color-ebook-text-secondary)',
            marginBlockStart: '0.75rem',
            fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
          }}
        >
          Agents Do Nothing Magic
        </p>
      </motion.header>

      {/* Intro Text */}
      <motion.p
        className="ebook-body-text"
        style={{
          textAlign: 'center',
          marginBlockEnd: 'clamp(2rem, 5vw, 3rem)',
          color: 'var(--color-ebook-text-secondary)',
        }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        كل وكيل جزائري يفتح LLC يستخدم نفس الخطوات الأربع على موقع Bizee.com.
        <br />
        شوف التكاليف الحقيقية:
      </motion.p>

      {/* Bar Chart */}
      <div
        ref={chartRef}
        className="ebook-card"
        style={{
          marginBlockEnd: 'clamp(2rem, 5vw, 3rem)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        }}
        role="img"
        aria-label="مخطط تكلفة فتح LLC — كل الخدمات مجانية، ربح الوكيل $180"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {BAR_DATA.map((item, index) => (
            <CostBar
              key={item.label}
              item={item}
              index={index}
              isInView={isChartInView}
            />
          ))}
        </div>
      </div>

      {/* Punchline Section */}
      <div
        ref={punchlineRef}
        style={{ textAlign: 'center', marginBlockStart: 'clamp(1.5rem, 4vw, 2.5rem)' }}
      >
        {/* Hourly Rate Counter */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isPunchlineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            marginBlockEnd: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          <div
            className="ebook-mono"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.375rem',
              direction: 'ltr',
            }}
          >
            <span
              style={{
                color: 'var(--color-ebook-text-secondary)',
                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              }}
            >
              =
            </span>
            <MonospaceCounter
              value={600}
              prefix="$"
              suffix=""
              duration={2.5}
              color="red"
            />
          </div>
          <span className="ebook-stat-label">/ساعة</span>
        </motion.div>

        {/* Closing Quote */}
        <motion.blockquote
          className="ebook-quote"
          style={{
            color: 'var(--color-ebook-red)',
            maxWidth: '50ch',
            marginInline: 'auto',
            padding: 0,
            border: 'none',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isPunchlineInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          &ldquo;هذا ليس ربح. هذا سرقة موصوفة.&rdquo;
        </motion.blockquote>
      </div>
    </ChapterWrapper>
  );
}
