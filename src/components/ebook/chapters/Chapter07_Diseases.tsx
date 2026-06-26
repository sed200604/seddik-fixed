'use client';

import { motion } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';

interface Chapter07Props {
  onVisible: (chapterIndex: number) => void;
}

interface Disease {
  name: string;
  icon: string;
  symptom: string;
  cause: string;
  lethality: number;
  treatment: string;
}

const DISEASES: Disease[] = [
  {
    name: 'مرض العنوان الوهمي',
    icon: '🏚️',
    symptom: 'البنك يطلب إثبات عنوان والوكيل ما عندو والو يقدم',
    cause: 'استخدام عنوان افتراضي رخيص مشترك مع عشرات الشركات',
    lethality: 5,
    treatment: 'عقد إيجار حقيقي + عنوان تشغيلي مع إثبات شهري بالفيديو',
  },
  {
    name: 'مرض الوكيل الميت',
    icon: '💀',
    symptom: 'الوكيل ما يردش على الرسائل، ما يجددش الأوراق، يختفي تماماً',
    cause: 'وكيل يبيع التأسيس ويختفي — بدون دعم مستمر ولا متابعة',
    lethality: 4,
    treatment: 'وكيل مع عقد خدمة سنوي + قنوات تواصل مفتوحة 24/7',
  },
  {
    name: 'مرض الخصوصية المنتهكة',
    icon: '🔓',
    symptom: 'الوكيل عندو نسخة من كل وثائقك: هوية، جواز سفر، عنوان',
    cause: 'عملية التأسيس تتم عن بعد بالكامل — العميل يرسل كل الوثائق',
    lethality: 4,
    treatment: 'جلسة مباشرة على Google Meet — العميل يعمل من لابتوبو، ما يرسل والو',
  },
  {
    name: 'مرض التجديد الصامت',
    icon: '🔄',
    symptom: 'تكتشف أن الرسوم ارتفعت أو أن التجديد لم يتم إلا بعد فوات الأوان',
    cause: 'لا شفافية في التسعير، لا تذكير قبل التجديد، رسوم مخفية',
    lethality: 3,
    treatment: 'تسعير واضح من اليوم الأول + تذكير 30 يوم قبل كل تجديد',
  },
  {
    name: 'مرض التحقق الفاشل',
    icon: '❌',
    symptom: 'Stripe أو Wise يرفضو التحقق — حسابك يتقفل قبل ما تبدا',
    cause: 'ما كانش تحضير للتحقق: العميل ما يعرفش واش يقول ولا واش يحضر',
    lethality: 5,
    treatment: 'simulation كاملة قبل التأسيس — نحضرك لكل سؤال ممكن يطرحو',
  },
];

function LethalityIndicator({ level }: { level: number }) {
  return (
    <div
      style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}
      aria-label={`درجة الخطورة: ${level} من 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          style={{
            width: '0.75rem',
            height: '0.75rem',
            borderRadius: '50%',
            background: i < level
              ? 'var(--color-ebook-red)'
              : 'var(--color-ebook-border)',
            boxShadow: i < level
              ? '0 0 6px oklch(0.62 0.22 27 / 0.4)'
              : 'none',
            transition: 'background 0.3s ease',
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function DiseaseCard({ disease, index }: { disease: Disease; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
      className="ebook-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        borderColor: 'var(--color-ebook-red-dim)',
        position: 'relative',
      }}
    >
      {/* Medical chart header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }} aria-hidden="true">
            {disease.icon}
          </span>
          <h3
            className="ebook-heading-3"
            style={{ color: 'var(--color-ebook-red)', margin: 0 }}
          >
            {disease.name}
          </h3>
        </div>
        <span
          className="ebook-mono"
          style={{
            fontSize: '0.6875rem',
            color: 'var(--color-ebook-text-secondary)',
            whiteSpace: 'nowrap',
            paddingBlockStart: '0.25rem',
          }}
        >
          CASE #{index + 1}
        </span>
      </div>

      {/* Medical fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <span
            className="ebook-mono"
            style={{
              fontSize: '0.6875rem',
              color: 'var(--color-ebook-red)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBlockEnd: '0.375rem',
            }}
          >
            العَرَض
          </span>
          <p
            style={{
              margin: 0,
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: 'var(--color-ebook-text)',
            }}
          >
            {disease.symptom}
          </p>
        </div>

        <div>
          <span
            className="ebook-mono"
            style={{
              fontSize: '0.6875rem',
              color: 'var(--color-ebook-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBlockEnd: '0.375rem',
            }}
          >
            السَبَب
          </span>
          <p
            style={{
              margin: 0,
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: 'var(--color-ebook-text-secondary)',
            }}
          >
            {disease.cause}
          </p>
        </div>

        {/* Lethality */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            background: 'oklch(0.62 0.22 27 / 0.06)',
            borderRadius: '0.5rem',
            border: '1px solid oklch(0.62 0.22 27 / 0.12)',
          }}
        >
          <span
            className="ebook-mono"
            style={{
              fontSize: '0.6875rem',
              color: 'var(--color-ebook-red)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            LETHALITY
          </span>
          <LethalityIndicator level={disease.lethality} />
        </div>

        {/* Treatment */}
        <div
          style={{
            padding: '0.75rem 1rem',
            background: 'oklch(0.72 0.16 155 / 0.06)',
            borderRadius: '0.5rem',
            border: '1px solid oklch(0.72 0.16 155 / 0.12)',
          }}
        >
          <span
            className="ebook-mono"
            style={{
              fontSize: '0.6875rem',
              color: 'var(--color-ebook-green)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'block',
              marginBlockEnd: '0.375rem',
            }}
          >
            العِلاج
          </span>
          <p
            style={{
              margin: 0,
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: 'var(--color-ebook-green)',
            }}
          >
            {disease.treatment}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Chapter07_Diseases({ onVisible }: Chapter07Props) {
  return (
    <ChapterWrapper
      id="chapter-07-diseases"
      chapterIndex={7}
      titleAr="الـ٥ أمراض"
      onVisible={onVisible}
    >
      <div data-gated style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="ebook-heading-2" style={{ color: 'var(--color-ebook-red)', marginBlockEnd: '0.75rem' }}>
            الـ٥ أمراض
          </h2>
          <p className="ebook-body-text" style={{ color: 'var(--color-ebook-text-secondary)' }}>
            كل مرض يقتل شركتك ببطء. تعرف عليهم قبل ما يصيبوك.
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
          {DISEASES.map((disease, index) => (
            <DiseaseCard key={index} disease={disease} index={index} />
          ))}
        </div>
      </div>
    </ChapterWrapper>
  );
}
