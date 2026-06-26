'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';

interface Chapter03Props {
  onVisible: (chapterIndex: number) => void;
}

interface LayerBullet {
  text: string;
}

interface LayerData {
  id: number;
  titleAr: string;
  borderColor: string;
  bgTint: string;
  iconLabel: string;
  bullets: LayerBullet[];
  isDanger: boolean;
}

const LAYERS: LayerData[] = [
  {
    id: 1,
    titleAr: 'سهلة — أي شخص يقدر يعملها',
    borderColor: 'var(--color-ebook-green)',
    bgTint: 'oklch(0.72 0.16 155 / 0.06)',
    iconLabel: '١',
    bullets: [
      { text: 'تسجيل LLC على موقع Bizee — مجاني تماماً' },
      { text: 'تحميل Operating Agreement جاهز — قالب مجاني' },
      { text: 'هذا كل ما يفعله الوكيل مقابل $180' },
    ],
    isDanger: false,
  },
  {
    id: 2,
    titleAr: 'فخاخ Bizee نفسها',
    borderColor: 'var(--color-ebook-gold)',
    bgTint: 'oklch(0.78 0.14 75 / 0.06)',
    iconLabel: '٢',
    bullets: [
      { text: 'رسوم السنة الثانية المخفية: $119–$149' },
      { text: 'عنوان افتراضي إجباري: $29/شهرياً' },
      { text: 'وكيل مسجل ميت لا يحوّل المراسلات' },
      { text: 'فخ تجديد العنوان — يتضاعف السعر' },
    ],
    isDanger: false,
  },
  {
    id: 3,
    titleAr: 'معقدة — تحتاج شريك أمريكي',
    borderColor: 'var(--color-ebook-red)',
    bgTint: 'oklch(0.62 0.22 27 / 0.06)',
    iconLabel: '٣',
    bullets: [
      { text: 'الحصول على EIN كغير مقيم — إجراء معقد' },
      { text: 'ضبط حساب Wise Business بشكل صحيح' },
      { text: 'بقاء حساب Stripe دون إغلاق مفاجئ' },
    ],
    isDanger: false,
  },
  {
    id: 4,
    titleAr: 'خطر الخصوصية',
    borderColor: 'oklch(0.30 0.01 250)',
    bgTint: 'oklch(0.16 0.01 250 / 0.8)',
    iconLabel: '⚠',
    bullets: [
      { text: 'وثائقك مسروقة — وكلاء يبيعون بياناتك على Telegram' },
      { text: 'الوكيل يختفي ومعه هويتك، جوازك، توقيعك' },
      { text: 'IRS يمكن أن يطرق بابك في أي لحظة' },
    ],
    isDanger: true,
  },
];

function LayerCard({ layer, index }: { layer: LayerData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const cardDelay = index * 0.2;

  return (
    <motion.div
      ref={cardRef}
      className="ebook-card"
      style={{
        borderInlineStart: `4px solid ${layer.borderColor}`,
        background: layer.bgTint,
        position: 'relative',
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: cardDelay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Danger Shake — applied as a separate animation after entry */}
      {layer.isDanger && isInView && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
          initial={{ x: 0 }}
          animate={{ x: [0, -4, 4, -3, 3, -1, 1, 0] }}
          transition={{ duration: 0.5, delay: cardDelay + 0.7 }}
          aria-hidden="true"
        />
      )}

      {/* Layer Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBlockEnd: '1rem',
        }}
      >
        <span
          className="ebook-mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: '0.5rem',
            background: layer.borderColor,
            color: 'var(--color-ebook-bg)',
            fontWeight: 700,
            fontSize: '1rem',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {layer.iconLabel}
        </span>
        <h3
          className="ebook-heading-3"
          style={{
            color: layer.isDanger ? 'var(--color-ebook-red)' : 'var(--color-ebook-text)',
            margin: 0,
          }}
        >
          {layer.titleAr}
        </h3>
      </div>

      {/* Bullets */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.625rem',
        }}
      >
        {layer.bullets.map((bullet, bulletIdx) => (
          <motion.li
            key={bullet.text}
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: cardDelay + 0.25 + bulletIdx * 0.1,
              ease: 'easeOut',
            }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.625rem',
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: 'clamp(0.875rem, 2.2vw, 1rem)',
              lineHeight: 1.7,
              color: layer.isDanger
                ? 'var(--color-ebook-red)'
                : 'var(--color-ebook-text-secondary)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                color: layer.borderColor,
                fontWeight: 700,
                flexShrink: 0,
                marginBlockStart: '0.125rem',
              }}
            >
              {layer.isDanger ? '✕' : '→'}
            </span>
            <span>{bullet.text}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Chapter03_Layers({ onVisible }: Chapter03Props) {
  return (
    <ChapterWrapper
      id="chapter-03"
      chapterIndex={3}
      titleAr="العملية الكاملة: ٤ طبقات"
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
        <h2 className="ebook-heading-1">
          العملية الكاملة
        </h2>
        <p
          className="ebook-heading-3"
          style={{
            color: 'var(--color-ebook-text-secondary)',
            marginBlockStart: '0.5rem',
            fontWeight: 400,
          }}
        >
          ٤ طبقات يجب أن تفهمها
        </p>
      </motion.header>

      {/* Layer Stack */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
          maxWidth: '48rem',
          marginInline: 'auto',
        }}
      >
        {LAYERS.map((layer, index) => (
          <LayerCard key={layer.id} layer={layer} index={index} />
        ))}
      </div>
    </ChapterWrapper>
  );
}
