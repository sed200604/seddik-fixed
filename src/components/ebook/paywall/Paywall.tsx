'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { useEbook } from '../providers/EbookContext';

const TRUST_BADGES = [
  '100 شركة في 7 أشهر',
  '93% حسابات نشطة',
  '73% عاد لخدمات إضافية',
  'شراكة Verto موثّقة',
  'Apostille من Secretary of State',
  'مكاتب فيزيائية: الجزائر + قسنطينة',
];

const WHATSAPP_NUMBER = '213791789125';

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function SealIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 0 20px oklch(0.78 0.14 75 / 0.3))' }}
    >
      {/* Outer ring */}
      <circle cx="40" cy="40" r="38" stroke="var(--color-ebook-gold)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="40" r="34" stroke="var(--color-ebook-gold)" strokeWidth="0.5" opacity="0.3" />
      {/* Star pattern */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 40 + 28 * Math.cos(angle);
        const y1 = 40 + 28 * Math.sin(angle);
        const x2 = 40 + 32 * Math.cos(angle);
        const y2 = 40 + 32 * Math.sin(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-ebook-gold)" strokeWidth="1" opacity="0.4" />
        );
      })}
      {/* Center text */}
      <text x="40" y="36" textAnchor="middle" fill="var(--color-ebook-gold)" fontSize="8" fontWeight="700" fontFamily="'Geist Mono', monospace">
        GO LLC
      </text>
      <text x="40" y="48" textAnchor="middle" fill="var(--color-ebook-gold)" fontSize="5.5" fontFamily="'IBM Plex Sans Arabic', sans-serif" opacity="0.8">
        محتوى محمي
      </text>
    </svg>
  );
}

export default function Paywall() {
  const { isUnlocked, setUnlocked } = useEbook();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [isLoading, setIsLoading] = useState(false);

  const handleStripeCheckout = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/ebook/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          successUrl: `${window.location.origin}/ebook?unlocked=true`,
          cancelUrl: `${window.location.origin}/ebook#paywall`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        /* Fallback: unlock directly for demo/development */
        console.warn('Stripe not configured, unlocking for demo');
        setUnlocked(true);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      /* Fallback for development */
      setUnlocked(true);
    } finally {
      setIsLoading(false);
    }
  }, [setUnlocked]);

  if (isUnlocked) return null;

  return (
    <section
      ref={ref}
      id="paywall"
      className="ebook-section"
      style={{
        position: 'relative',
        textAlign: 'center',
        paddingBlock: 'clamp(4rem, 10vw, 8rem)',
      }}
      aria-label="فتح المحتوى المحمي"
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, oklch(0.78 0.14 75 / 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className="ebook-section-inner">
        {/* Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBlockEnd: '2rem' }}
        >
          <SealIcon />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="ebook-heading-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginBlockEnd: '1rem',
            color: 'var(--color-ebook-gold)',
          }}
        >
          <LockIcon /> الفصول التالية محمية
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            color: 'var(--color-ebook-text-secondary)',
            fontSize: 'clamp(0.9375rem, 2.5vw, 1.125rem)',
            maxWidth: '50ch',
            marginInline: 'auto',
            marginBlockEnd: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 1.7,
          }}
        >
          قرأت الـ4 فصول الأولى مجاناً. شفت الأرقام، الفخاخ، والحقيقة. الـ10 فصول الباقية فيها
          الأدوات، الحلول، والعرض. افتحها بـ$80 — أو أرسلنا رسالة.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            marginBlockEnd: 'clamp(2.5rem, 6vw, 4rem)',
          }}
        >
          {/* Primary: Stripe */}
          <button
            onClick={handleStripeCheckout}
            disabled={isLoading}
            className="ebook-magnetic-btn ebook-magnetic-btn-gold"
            data-magnetic
            aria-label="ادفع $80 عبر Stripe"
            style={{
              fontSize: '1.125rem',
              padding: '1rem 2.5rem',
              minWidth: '16rem',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'wait' : 'pointer',
            }}
          >
            {isLoading ? '...جاري التحويل' : 'افتح الكتاب كاملاً — $80'}
          </button>

          {/* Secondary: WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('أريد الكتاب')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ebook-magnetic-btn ebook-magnetic-btn-green"
            data-magnetic
            aria-label="أرسل عبر واتساب"
            style={{
              fontSize: '1rem',
              padding: '0.875rem 2rem',
              minWidth: '16rem',
              textDecoration: 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            أرسل &quot;أريد الكتاب&quot; عبر واتساب
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.625rem',
            marginBlockEnd: '3rem',
          }}
        >
          {TRUST_BADGES.map((badge) => (
            <span key={badge} className="ebook-badge">
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Blurred preview of next chapters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            filter: 'blur(8px)',
            opacity: 0.3,
            pointerEvents: 'none',
            userSelect: 'none',
            maxWidth: '40rem',
            marginInline: 'auto',
          }}
          aria-hidden="true"
        >
          <div
            style={{
              background: 'var(--color-ebook-surface)',
              borderRadius: '0.75rem',
              padding: '2rem',
              border: '1px solid var(--color-ebook-border)',
            }}
          >
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBlockEnd: '0.75rem' }}>
              الفصل 5 — الـ7 أسئلة الحاسمة
            </div>
            <div style={{ color: 'var(--color-ebook-text-secondary)', lineHeight: 1.7 }}>
              اختبار تفاعلي. أدخل إجابات وكيلك على 7 أسئلة حاسمة.
              كل إجابة تكشف مستوى الخطر. في النهاية: حكم واضح — وظّفه أو اطرده.
            </div>
          </div>
          <div
            style={{
              background: 'var(--color-ebook-surface)',
              borderRadius: '0.75rem',
              padding: '2rem',
              marginBlockStart: '1rem',
              border: '1px solid var(--color-ebook-border)',
            }}
          >
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBlockEnd: '0.75rem' }}>
              الفصل 6 — جدار الكوارث
            </div>
            <div style={{ color: 'var(--color-ebook-text-secondary)', lineHeight: 1.7 }}>
              12 حالة حقيقية. أسماء محجوبة، أرقام وتواريخ وولايات حقيقية.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
