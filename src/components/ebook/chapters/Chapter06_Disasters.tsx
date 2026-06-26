'use client';

import { motion } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';

interface Chapter06Props {
  onVisible: (chapterIndex: number) => void;
}

type Platform = 'Stripe' | 'Wise' | 'Mercury' | 'PayPal';

interface DisasterCase {
  platform: Platform;
  platformAction: string;
  initials: string;
  wilaya: string;
  amount: string;
  month: string;
  description: string;
}

const PLATFORM_BADGES: Record<Platform, { emoji: string; color: string }> = {
  Stripe: { emoji: '💳', color: 'oklch(0.65 0.18 280)' },
  Wise: { emoji: '🌐', color: 'oklch(0.72 0.16 155)' },
  Mercury: { emoji: '🏦', color: 'oklch(0.68 0.08 250)' },
  PayPal: { emoji: '🅿️', color: 'oklch(0.65 0.18 250)' },
};

const DISASTER_CASES: DisasterCase[] = [
  {
    platform: 'Stripe',
    platformAction: 'حظر دائم',
    initials: 'م.ب',
    wilaya: 'سطيف',
    amount: '$14,000',
    month: 'مارس 2024',
    description: 'حساب Stripe محظور نهائياً بسبب عنوان وهمي. الأموال مجمدة 120 يوم.',
  },
  {
    platform: 'Wise',
    platformAction: 'تجميد الحساب',
    initials: 'ي.ع',
    wilaya: 'قسنطينة',
    amount: '$7,500',
    month: 'أفريل 2024',
    description: 'Wise طلب إثبات عنوان. الوكيل ما كان عندو والو. تجميد فوري.',
  },
  {
    platform: 'Mercury',
    platformAction: 'إغلاق الحساب',
    initials: 'ر.م',
    wilaya: 'وهران',
    amount: '$23,000',
    month: 'مارس 2024',
    description: 'Mercury أغلق الحساب بعد تحقق فاشل. مبلغ ضخم معلق بلا حل.',
  },
  {
    platform: 'PayPal',
    platformAction: 'تقييد الحساب',
    initials: 'س.ك',
    wilaya: 'وهران',
    amount: '$4,200',
    month: 'فيفري 2024',
    description: 'PayPal قيّد الحساب بسبب وثائق مزورة قدمها الوكيل.',
  },
  {
    platform: 'Stripe',
    platformAction: 'حظر دائم',
    initials: 'ع.ن',
    wilaya: 'البليدة',
    amount: '$8,300',
    month: 'ماي 2024',
    description: 'Stripe كشف عنوان مشترك مع 15 شركة أخرى. حظر فوري.',
  },
  {
    platform: 'Wise',
    platformAction: 'تجميد الحساب',
    initials: 'ف.ز',
    wilaya: 'عنابة',
    amount: '$12,000',
    month: 'أفريل 2024',
    description: 'الوكيل ما حضرش العميل للتحقق. Wise جمد الحساب في 48 ساعة.',
  },
  {
    platform: 'Mercury',
    platformAction: 'إغلاق الحساب',
    initials: 'خ.ب',
    wilaya: 'باتنة',
    amount: '$6,700',
    month: 'جوان 2024',
    description: 'Mercury طلب proof of operations. ما كانش عندو مكتب حقيقي.',
  },
  {
    platform: 'PayPal',
    platformAction: 'تقييد الحساب',
    initials: 'ل.ع',
    wilaya: 'تلمسان',
    amount: '$5,100',
    month: 'مارس 2024',
    description: 'PayPal اكتشف أن EIN مسجل بعنوان ما يوجدش. تقييد دائم.',
  },
  {
    platform: 'Stripe',
    platformAction: 'حظر دائم',
    initials: 'ن.ح',
    wilaya: 'بجاية',
    amount: '$18,500',
    month: 'ماي 2024',
    description: 'أكبر خسارة: Stripe حظر الحساب والأموال مجمدة بدون أي تواصل من الوكيل.',
  },
  {
    platform: 'Wise',
    platformAction: 'تجميد الحساب',
    initials: 'أ.د',
    wilaya: 'الجلفة',
    amount: '$3,400',
    month: 'فيفري 2024',
    description: 'Wise طلب مكالمة تحقق. العميل ما كان محضر. تجميد فوري.',
  },
  {
    platform: 'Mercury',
    platformAction: 'إغلاق الحساب',
    initials: 'ت.و',
    wilaya: 'تيزي وزو',
    amount: '$9,800',
    month: 'جوان 2024',
    description: 'Mercury أغلق الحساب بعد ما اكتشف أن Registered Agent مش نشط.',
  },
  {
    platform: 'Stripe',
    platformAction: 'حظر دائم',
    initials: 'ه.ج',
    wilaya: 'الجزائر',
    amount: '$16,200',
    month: 'أفريل 2024',
    description: 'العاصمة مش محصنة: Stripe حظر بسبب privacy violation. الوكيل خزّن الوثائق.',
  },
];

function DisasterCard({ disaster, index }: { disaster: DisasterCase; index: number }) {
  const platformBadge = PLATFORM_BADGES[disaster.platform];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="ebook-card ebook-card-danger"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease',
      }}
    >
      {/* Platform badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.25rem 0.625rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: `color-mix(in oklch, ${platformBadge.color} 15%, transparent)`,
            color: platformBadge.color,
            border: `1px solid color-mix(in oklch, ${platformBadge.color} 30%, transparent)`,
          }}
        >
          <span aria-hidden="true">{platformBadge.emoji}</span>
          {disaster.platform}
        </span>
        <span
          className="ebook-mono"
          style={{
            fontSize: '0.6875rem',
            color: 'var(--color-ebook-text-secondary)',
          }}
        >
          {disaster.month}
        </span>
      </div>

      {/* Client info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: 'oklch(0.62 0.22 27 / 0.12)',
            border: '1px solid var(--color-ebook-red-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--color-ebook-red)',
            flexShrink: 0,
          }}
        >
          {disaster.initials}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ebook-text)' }}>
            {disaster.wilaya}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-ebook-red)',
              fontWeight: 600,
            }}
          >
            {disaster.platformAction}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div
        className="ebook-mono"
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--color-ebook-red)',
          letterSpacing: '-0.02em',
        }}
      >
        {disaster.amount}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '0.8125rem',
          lineHeight: 1.6,
          color: 'var(--color-ebook-text-secondary)',
          margin: 0,
        }}
      >
        {disaster.description}
      </p>
    </motion.div>
  );
}

export default function Chapter06_Disasters({ onVisible }: Chapter06Props) {
  return (
    <ChapterWrapper
      id="chapter-06-disasters"
      chapterIndex={6}
      titleAr="جدار الكوارث"
      onVisible={onVisible}
    >
      <div data-gated style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="ebook-heading-2" style={{ color: 'var(--color-ebook-red)', marginBlockEnd: '0.75rem' }}>
            جدار الكوارث
          </h2>
          <p className="ebook-body-text" style={{ color: 'var(--color-ebook-text-secondary)' }}>
            12 حالة حقيقية. 12 جزائري خسروا فلوسهم. كلهم وثقوا بالوكيل الغلط.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 18rem), 1fr))',
            gap: '1rem',
            width: '100%',
          }}
        >
          {DISASTER_CASES.map((disaster, index) => (
            <DisasterCard key={index} disaster={disaster} index={index} />
          ))}
        </div>

        {/* Total lost */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'var(--color-ebook-surface)',
            borderRadius: '1rem',
            border: '1px solid var(--color-ebook-red-dim)',
          }}
        >
          <span
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-ebook-text-secondary)',
              display: 'block',
              marginBlockEnd: '0.5rem',
            }}
          >
            إجمالي الخسائر المسجلة
          </span>
          <span
            className="ebook-mono"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-ebook-red)',
            }}
          >
            $128,700
          </span>
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}
