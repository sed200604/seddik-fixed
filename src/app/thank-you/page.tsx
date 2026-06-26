'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/pixel';

const WA_NUMBER = '213791789125';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';
  const [seconds, setSeconds] = useState(1);
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackEvent('Lead');
  }, []);

  const waText = encodeURIComponent(
    name
      ? `مرحباً، أنا ${name}. لقد سجلت طلب استشارة مجانية مع Go LLC وأريد تأكيد الموعد.`
      : `مرحباً، لقد سجلت طلب استشارة مجانية مع Go LLC وأريد تأكيد الموعد.`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(interval);
          window.location.href = waLink;
          return 0;
        }
        return s - 1;

      });
    }, 1000);
    return () => clearInterval(interval);
  }, [waLink]);

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #0A1628 0%, #1A3A52 65%, #0F2A3E 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        fontFamily: 'Cairo, Tajawal, sans-serif',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,211,102,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 10,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(37,211,102,0.25)',
        borderRadius: '28px',
        padding: '48px 40px',
        maxWidth: '440px', width: '100%',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
      }}>

        {/* Check icon with spinner */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px' }}>
            {/* Spinning ring */}
            <svg width="80" height="80" viewBox="0 0 80 80"
              style={{ position: 'absolute', top: 0, left: 0, animation: 'spin 1.4s linear infinite' }}>
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(37,211,102,0.15)" strokeWidth="5" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="#25D366" strokeWidth="5"
                strokeLinecap="round" strokeDasharray="60 154" strokeDashoffset="0" />
            </svg>
            {/* Center icon */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '42px', height: '42px',
              background: '#25D366', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
            }}>✓</div>
          </div>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: 'clamp(20px, 5vw, 26px)', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>
          {name ? `شكراً ${name}! 🎉` : 'تم الإرسال بنجاح! 🎉'}
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', lineHeight: '1.7', marginBottom: '28px' }}>
          تم استلام طلب استشارتك المجانية
          <br />
          <span style={{ color: '#25D366', fontWeight: 700 }}>سيتم تحويلك للتأكيد عبر WhatsApp</span>
        </p>

        {/* Countdown bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #1a9e4a, #25D366)',
              borderRadius: '99px',
              width: `${((1 - seconds) / 1) * 100}%`,
              transition: 'width 1s linear',
            }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '10px' }}>
            جاري التحويل خلال {seconds} ثانية...
          </p>
        </div>

        {/* Manual button */}
        <a
          href={waLink}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#25D366', color: 'white', fontWeight: 700,
            fontSize: '15px', padding: '12px 28px', borderRadius: '14px',
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}
          onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'; }}
          onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          تأكيد عبر WhatsApp الآن
        </a>

        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', marginTop: '16px' }}>
          إذا لم يتم التحويل تلقائياً، اضغط على الزر أعلاه
        </p>
      </div>

      {/* Logo */}
      <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', marginTop: '32px', position: 'relative', zIndex: 10 }}>
        <span style={{ color: '#F4C430', fontWeight: 800 }}>Go LLC</span> · استشارة مجانية
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
