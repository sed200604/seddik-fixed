'use client';

import { motion } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';

interface Chapter08Props {
  onVisible: (chapterIndex: number) => void;
}

interface Pillar {
  number: number;
  titleAr: string;
  subtitleEn: string;
  description: string;
  icon: string;
}

const PILLARS: Pillar[] = [
  {
    number: 1,
    titleAr: 'الأساس القانوني',
    subtitleEn: 'Legal Foundation',
    description:
      'تأسيس 100% شرعي مع شراكة Verto الرسمية. Apostille حقيقي من Secretary of State. مكاتب فيزيائية في Wyoming و New Mexico. لا وثائق مزورة، لا اختصارات.',
    icon: '⚖️',
  },
  {
    number: 2,
    titleAr: 'عنوان تشغيلي حقيقي',
    subtitleEn: 'Real Operational Address',
    description:
      'عقود إيجار حقيقية باسم الشركة. إثبات عنوان بالفيديو كل شهر. عنوان مخصص لعميل واحد فقط — مش مشترك مع 50 شركة.',
    icon: '📍',
  },
  {
    number: 3,
    titleAr: 'معالجة EIN احترافية',
    subtitleEn: 'Expert EIN Processing',
    description:
      'EIN خلال 24 ساعة عبر شريك CPA أمريكي معتمد. تقديم مباشر لل IRS بدون وسطاء. متابعة حتى الحصول على الرقم.',
    icon: '🔢',
  },
  {
    number: 4,
    titleAr: 'هندسة الخصوصية',
    subtitleEn: 'Privacy Architecture',
    description:
      'جلسة 90 دقيقة على Google Meet. العميل يعمل من لابتوبو الشخصي. لا نطلب صورة هوية، لا نخزن أي وثيقة. كل شي يبقى عندك.',
    icon: '🔒',
  },
  {
    number: 5,
    titleAr: 'ذكاء بنكي + حل الأزمات',
    subtitleEn: 'Banking Intelligence + Crisis Resolution',
    description:
      'مراقبة يومية لحالة الحسابات. تنبيهات فورية عند أي تغيير. تدخل مجاني في حالة تجميد أو إغلاق. نحضر الردود ونتابع مع البنك.',
    icon: '🛡️',
  },
];

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      style={{
        position: 'relative',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        background: 'var(--color-ebook-surface)',
        borderRadius: '1rem',
        border: '1px solid var(--color-ebook-gold-dim)',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      whileHover={{
        borderColor: 'var(--color-ebook-gold)',
        boxShadow: '0 0 30px oklch(0.78 0.14 75 / 0.12)',
      }}
    >
      {/* Apostille seal motif (background) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          insetBlockStart: '-2rem',
          insetInlineEnd: '-2rem',
          width: '10rem',
          height: '10rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(0.78 0.14 75 / 0.06) 30%, oklch(0.78 0.14 75 / 0.02) 60%, transparent 70%)',
          border: '2px dashed oklch(0.78 0.14 75 / 0.08)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          insetBlockStart: '-0.5rem',
          insetInlineEnd: '-0.5rem',
          width: '7rem',
          height: '7rem',
          borderRadius: '50%',
          border: '1px solid oklch(0.78 0.14 75 / 0.05)',
          pointerEvents: 'none',
        }}
      />

      {/* Number + icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBlockEnd: '1rem', position: 'relative' }}>
        <div
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            background: 'oklch(0.78 0.14 75 / 0.12)',
            border: '2px solid var(--color-ebook-gold-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            className="ebook-mono"
            style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--color-ebook-gold)',
            }}
          >
            {pillar.number}
          </span>
        </div>
        <span style={{ fontSize: '1.5rem' }} aria-hidden="true">
          {pillar.icon}
        </span>
      </div>

      {/* Title */}
      <h3
        className="ebook-heading-3"
        style={{
          color: 'var(--color-ebook-gold)',
          marginBlockEnd: '0.25rem',
          position: 'relative',
        }}
      >
        {pillar.titleAr}
      </h3>
      <span
        className="ebook-mono"
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-ebook-text-secondary)',
          display: 'block',
          marginBlockEnd: '1rem',
          position: 'relative',
        }}
      >
        {pillar.subtitleEn}
      </span>

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontSize: '0.9375rem',
          lineHeight: 1.8,
          color: 'var(--color-ebook-text)',
          position: 'relative',
        }}
      >
        {pillar.description}
      </p>
    </motion.div>
  );
}

export default function Chapter08_AntiClosure({ onVisible }: Chapter08Props) {
  return (
    <ChapterWrapper
      id="chapter-08-anti-closure"
      chapterIndex={8}
      titleAr="نظام Anti-Closure"
      onVisible={onVisible}
    >
      <div data-gated style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="ebook-heading-2" style={{ color: 'var(--color-ebook-gold)', marginBlockEnd: '0.75rem' }}>
            نظام Anti-Closure
          </h2>
          <p className="ebook-body-text" style={{ color: 'var(--color-ebook-text-secondary)' }}>
            ٥ ركائز تحمي شركتك من الإغلاق. هذا هو الفرق بيننا وبين البقية.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))',
            gap: '1.5rem',
            width: '100%',
          }}
        >
          {PILLARS.map((pillar, index) => (
            <PillarCard key={pillar.number} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            textAlign: 'center',
            paddingBlock: '2rem',
            maxWidth: '48rem',
          }}
        >
          <p
            className="ebook-quote"
            style={{
              color: 'var(--color-ebook-gold)',
              margin: 0,
            }}
          >
            الوكلاء العاديون يبيعون التأسيس.
            <br />
            نحن نبيع البقاء.
          </p>
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}
