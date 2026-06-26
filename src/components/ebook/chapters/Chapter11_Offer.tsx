'use client';

import { useCallback } from 'react';
import { motion } from 'motion/react';
import ChapterWrapper from '@/components/ebook/layout/ChapterWrapper';
import MagneticButton from '@/components/ebook/ui/MagneticButton';
import SeatBoard from '@/components/ebook/ui/SeatBoard';

interface Chapter11Props {
  onVisible: (chapterIndex: number) => void;
}

const WHATSAPP_URL = 'https://wa.me/213791789125?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D9%85%D9%82%D8%B9%D8%AF';

interface ValueItem {
  service: string;
  value: string;
}

const VALUE_STACK: ValueItem[] = [
  { service: 'تأسيس LLC في Wyoming', value: '$350' },
  { service: 'Registered Agent سنة كاملة', value: '$200' },
  { service: 'عنوان تشغيلي حقيقي', value: '$180' },
  { service: 'معالجة EIN خلال 24 ساعة', value: '$150' },
  { service: 'جلسة تحضير 90 دقيقة', value: '$200' },
  { service: 'دعم ما بعد التأسيس + حل الأزمات', value: '$200' },
];

export default function Chapter11_Offer({ onVisible }: Chapter11Props) {
  const handleStripeClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('ebook_stripe_checkout_click', {
        source: 'chapter_11_offer',
        amount: 80,
      });
    }
  }, []);

  return (
    <ChapterWrapper
      id="chapter-11-offer"
      chapterIndex={11}
      titleAr="العرض الخاص"
      onVisible={onVisible}
    >
      <div data-gated style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="ebook-heading-2" style={{ color: 'var(--color-ebook-gold)', marginBlockEnd: '0.75rem' }}>
            العرض الخاص
          </h2>
          <p className="ebook-body-text" style={{ color: 'var(--color-ebook-text-secondary)' }}>
            كل ما تحتاجه لتأسيس شركة أمريكية محمية. سعر واحد. بدون مفاجآت.
          </p>
        </div>

        {/* Value Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            width: '100%',
            maxWidth: '36rem',
            background: 'var(--color-ebook-surface)',
            borderRadius: '1rem',
            border: '1px solid var(--color-ebook-gold-dim)',
            overflow: 'hidden',
          }}
        >
          {/* Line items */}
          {VALUE_STACK.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBlockEnd: '1px solid var(--color-ebook-border)',
              }}
            >
              <span
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-ebook-text)',
                  lineHeight: 1.5,
                }}
              >
                {item.service}
              </span>
              <span
                className="ebook-mono"
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-ebook-text-secondary)',
                  textDecoration: 'line-through',
                  whiteSpace: 'nowrap',
                  paddingInlineStart: '1rem',
                }}
              >
                {item.value}
              </span>
            </motion.div>
          ))}

          {/* Priceless line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.5rem',
              borderBlockEnd: '1px solid var(--color-ebook-border)',
              background: 'oklch(0.78 0.14 75 / 0.04)',
            }}
          >
            <span
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-ebook-gold)',
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              خصوصية كاملة، الوثائق تبقى معك
            </span>
            <span
              className="ebook-mono"
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-ebook-gold)',
                fontWeight: 600,
                fontStyle: 'italic',
                whiteSpace: 'nowrap',
                paddingInlineStart: '1rem',
              }}
            >
              Priceless
            </span>
          </div>

          {/* Total */}
          <div
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span
                className="ebook-mono"
                style={{
                  fontSize: '1.5rem',
                  color: 'var(--color-ebook-text-secondary)',
                  textDecoration: 'line-through',
                }}
              >
                $1,280
              </span>
              <span
                className="ebook-mono"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                  fontWeight: 700,
                  color: 'var(--color-ebook-gold)',
                }}
              >
                $80
              </span>
            </div>
            <span
              className="ebook-mono"
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-ebook-green)',
                fontWeight: 600,
              }}
            >
              وفر: $1,200
            </span>
          </div>
        </motion.div>

        {/* Seat Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ width: '100%', maxWidth: '36rem' }}
        >
          <h3
            className="ebook-heading-3"
            style={{
              color: 'var(--color-ebook-text)',
              textAlign: 'center',
              marginBlockEnd: '1.5rem',
            }}
          >
            المقاعد المتاحة هذا الشهر
          </h3>
          <SeatBoard taken={6} yourSeat={7} />
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            width: '100%',
            maxWidth: '36rem',
            padding: '1.5rem 2rem',
            background: 'oklch(0.72 0.16 155 / 0.06)',
            borderRadius: '1rem',
            border: '1px solid oklch(0.72 0.16 155 / 0.2)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '1.5rem',
              marginBlockEnd: '0.75rem',
            }}
            aria-hidden="true"
          >
            🛡️
          </div>
          <p
            style={{
              margin: 0,
              fontSize: '0.9375rem',
              lineHeight: 1.9,
              color: 'var(--color-ebook-text)',
            }}
          >
            إذا ما قدرناش نفتحلك Wise + Stripe في 30 يوم بسبب منا — استرجاع كامل.
            بلا أسئلة، بلا تأخير. عقد مكتوب.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            maxWidth: '24rem',
          }}
        >
          <MagneticButton
            variant="gold"
            ariaLabel="ادفع 80 دولار عبر Stripe"
            onClick={handleStripeClick}
            className=""
          >
            ادفع $80 عبر Stripe
          </MagneticButton>

          <MagneticButton
            variant="green"
            href={WHATSAPP_URL}
            ariaLabel="أرسل أريد المقعد عبر واتساب"
            className=""
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
            أرسل &quot;أريد المقعد&quot; عبر واتساب
          </MagneticButton>
        </motion.div>
      </div>
    </ChapterWrapper>
  );
}
