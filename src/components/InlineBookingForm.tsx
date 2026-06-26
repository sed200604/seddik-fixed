'use client';

import React, { useState, useEffect } from 'react';
import { trackEvent, trackBookingStep, trackCustom } from '@/lib/pixel';
import { submitInlineBooking } from '@/lib/submitInlineBooking';
import { v4 as uuidv4 } from 'uuid';

// Icons
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TwoPeopleIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#D4A843" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
    <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
    <path d="M9 7h6" />
    <path d="M9 11h6" />
  </svg>
);

const SECTORS = [
  "تجارة إلكترونية",
  "خدمات رقمية",
  "استيراد وتصدير",
  "فريلانس",
  "مطاعم وأكل",
  "تعليم وتكوين",
  "عقارات",
  "أخرى"
];

const REASONS = [
  "استقبال مدفوعات عالمية (Stripe, PayPal, Wise)",
  "فتح حساب بنكي أمريكي (Mercury, Relay)",
  "حماية قانونية لأصولي",
  "مصداقية أمام العملاء",
  "أخرى"
];

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default function InlineBookingForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [llcName, setLlcName] = useState('');
  const [sector, setSector] = useState('');
  const [customSector, setCustomSector] = useState('');
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touched, setTouched] = useState({ firstName: false, lastName: false, phone: false, llcName: false, sector: false, reason: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [eventId, setEventId] = useState('');
  const [formStartTime] = useState(Date.now());

  useEffect(() => {
    setEventId(uuidv4());
    trackCustom('BookingFormViewed', { source_button: 'inline_form' });
  }, []);

  const firstNameValid = firstName.trim().length >= 2;
  const lastNameValid = lastName.trim().length >= 2;
  const phoneValid = phone.replace(/\s/g, '').length >= 9 && phone.replace(/\s/g, '').length <= 10;
  const llcNameValid = llcName.trim().length >= 2;
  const sectorValid = sector !== '' && (sector !== 'أخرى' || customSector.trim().length >= 2);
  const reasonValid = reason !== '' && (reason !== 'أخرى' || customReason.trim().length >= 2);

  const allValid = firstNameValid && lastNameValid && phoneValid && llcNameValid && sectorValid && reasonValid;

  useEffect(() => {
    const handleUnload = () => {
      if (!isSuccess && (firstNameValid || phone.length > 0)) {
        let step = 'none';
        if (firstNameValid) step = 'name';
        if (phoneValid) step = 'phone';

        navigator.sendBeacon('/api/track', JSON.stringify({
          event: 'BookingAbandoned',
          last_step_completed: step,
          time_spent_seconds: Math.floor((Date.now() - formStartTime) / 1000)
        }));
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [isSuccess, firstNameValid, phoneValid, formStartTime]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
    let res = '';
    for (let i = 0; i < val.length; i++) {
      if (i === 4 || i === 6 || i === 8) res += ' ';
      res += val[i];
    }
    setPhone(res.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, phone: true, llcName: true, sector: true, reason: true });

    if (!allValid) return;

    setIsSubmitting(true);
    setIsError(false);

    const finalSector = sector === 'أخرى' ? customSector.trim() : sector;
    const finalReason = reason === 'أخرى' ? customReason.trim() : reason;
    const sectorWithReason = `${finalSector} | السبب: ${finalReason}`;

    // 1. Fire Meta Pixel IMMEDIATELY — never gated by network calls
    trackEvent('Lead', {
      content_name: 'consultation_booking',
      content_category: 'llc_service',
      value: 100.00,
      currency: 'USD',
      sector: finalSector
    }, { eventID: eventId });

    // 2. Fire Server-Side CAPI event (fire-and-forget, parallel with Supabase)
    fetch('/api/capi/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id: eventId,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.replace(/\s/g, ''),
        sector: finalSector,
        value: 100.00,
        currency: 'USD'
      })
    }).catch(console.error);

    try {
      // 3. Submit lead details to Supabase (new table)
      await submitInlineBooking({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.replace(/\s/g, ''),
        sector: sectorWithReason,
        llcName: llcName.trim()
      });

      // 4. Send Email Notification (fire-and-forget)
      const emailPayload = {
        "الاسم": `${firstName.trim()} ${lastName.trim()}`,
        "رقم الهاتف": phone.replace(/\s/g, ''),
        "اسم الشركة": llcName.trim() || 'غير محدد',
        "قطاع النشاط": finalSector,
        "سبب التأسيس": finalReason,
        _subject: "🎉 تسجيل جديد في الاستشارة!"
      };

      await Promise.all([
        fetch('https://formsubmit.co/ajax/sed200604@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(emailPayload)
        }),
        fetch('https://formsubmit.co/ajax/abenameur231@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(emailPayload)
        })
      ]).catch(console.error);

      if (navigator.vibrate) navigator.vibrate(10);
      setIsSuccess(true);
      // Redirect to WhatsApp Group
      window.location.href = 'https://chat.whatsapp.com/IxdpeKoEAAkJjVZo5LZcNq';
    } catch (err) {
      console.error(err);
      // Still show success — the lead pixel already fired, 
      // and the user shouldn't see an error for a DB issue
      setIsSuccess(true);
      window.location.href = 'https://chat.whatsapp.com/IxdpeKoEAAkJjVZo5LZcNq';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto', background: '#0A1628', borderRadius: '16px', border: '1px solid rgba(212, 168, 67, 0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .isf-form {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          direction: rtl;
        }
        .isf-row {
          display: flex;
          gap: 16px;
        }
        .isf-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          position: relative;
        }
        .isf-label {
          font-family: var(--font-cairo, Cairo);
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          text-align: right;
        }
        .isf-input-wrapper {
          height: 52px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          transition: all 200ms ease;
          position: relative;
        }
        .isf-input-wrapper.focused {
          border-color: rgba(212, 168, 67, 0.5);
          box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.08);
        }
        .isf-input-wrapper.error {
          border-color: #E85D4A;
        }
        .isf-input-wrapper.valid {
          border-color: rgba(255, 255, 255, 0.15);
        }
        .isf-input {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 15px;
          font-family: var(--font-cairo, Cairo);
          text-align: right;
          padding-left: 32px;
        }
        .isf-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
        .isf-select {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 15px;
          font-family: var(--font-cairo, Cairo);
          text-align: right;
          cursor: pointer;
          appearance: none;
          padding-left: 32px;
        }
        .isf-select option {
          background: #0A1628;
          color: #fff;
          font-family: var(--font-cairo, Cairo);
        }
        .isf-icon {
          position: absolute;
          left: 16px;
          color: rgba(255, 255, 255, 0.35);
          display: flex;
          align-items: center;
          pointer-events: none;
          transition: color 200ms ease;
        }
        .isf-input-wrapper.focused .isf-icon {
          color: #D4A843;
        }
        .isf-btn {
          height: 54px;
          border-radius: 12px;
          background: linear-gradient(110deg, #C99A35, #E4BC5A, #D4A843, #C99A35);
          background-size: 300% 100%;
          border: none;
          color: #0A1628;
          font-size: 16px;
          font-weight: 700;
          font-family: var(--font-tajawal, Tajawal);
          cursor: pointer;
          transition: all 300ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(212, 168, 67, 0.2);
          margin-top: 8px;
        }
        .isf-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 168, 67, 0.3);
        }
        .isf-btn:disabled {
          background: rgba(212, 168, 67, 0.2);
          color: rgba(10, 22, 40, 0.3);
          box-shadow: none;
          cursor: not-allowed;
        }
        .isf-success {
          padding: 48px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          direction: rtl;
        }
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
      `}} />

      {isSuccess ? (
        <div className="isf-success">
          <svg viewBox="0 0 48 48" width={54} height={54} fill="none" stroke="#D4A843" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 100, strokeDashoffset: 100, animation: 'draw-check 600ms ease-out forwards 200ms' }}>
            <polyline points="40 12 18 34 8 24" />
          </svg>
          <h3 style={{ fontSize: '24px', color: '#D4A843', fontWeight: 'bold', fontFamily: 'var(--font-tajawal, Tajawal)', margin: '12px 0 4px' }}>تم بنجاح!</h3>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-cairo, Cairo)', margin: 0 }}>راح نتواصل معاك عبر WhatsApp خلال 24 ساعة</p>
          <div style={{ marginTop: '24px', width: '100%' }}>
            <a href="#" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(212,168,67,0.3)', borderRadius: '12px', padding: '14px 18px', background: 'rgba(212,168,67,0.05)', cursor: 'pointer' }}>
              <span style={{ fontSize: '14px', color: '#D4A843', fontWeight: 'bold', fontFamily: 'var(--font-cairo, Cairo)' }}>في الانتظار، حمّل الدليل المجاني</span>
              <DownloadIcon />
            </a>
          </div>
        </div>
      ) : (
        <form className="isf-form" onSubmit={handleSubmit} method="POST">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '22px', color: '#fff', fontWeight: '700', fontFamily: 'var(--font-tajawal, Tajawal)', margin: '0 0 6px' }}>خطوة واحدة وتبدأ</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-cairo, Cairo)', margin: 0 }}>نتواصل معاك خلال 24 ساعة</p>
          </div>

          {/* Row: First Name & Last Name */}
          <div className="isf-row">
            {/* First Name */}
            <div className="isf-group">
              <label className="isf-label">الاسم الأول</label>
              <div className={`isf-input-wrapper ${focusedField === 'firstName' ? 'focused' : touched.firstName && !firstNameValid ? 'error' : firstNameValid ? 'valid' : ''}`}>
                <input
                  name="first_name"
                  type="text"
                  className="isf-input"
                  placeholder="أحمد"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched(p => ({ ...p, firstName: true }));
                    if (firstName.trim().length >= 2 && lastName.trim().length >= 2) trackBookingStep(1, 'name_submitted');
                  }}
                  required
                  autoComplete="given-name"
                />
                <span className="isf-icon"><PersonIcon /></span>
              </div>
            </div>

            {/* Last Name */}
            <div className="isf-group">
              <label className="isf-label">اللقب</label>
              <div className={`isf-input-wrapper ${focusedField === 'lastName' ? 'focused' : touched.lastName && !lastNameValid ? 'error' : lastNameValid ? 'valid' : ''}`}>
                <input
                  name="last_name"
                  type="text"
                  className="isf-input"
                  placeholder="بلعيد"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched(p => ({ ...p, lastName: true }));
                    if (firstName.trim().length >= 2 && lastName.trim().length >= 2) trackBookingStep(1, 'name_submitted');
                  }}
                  required
                  autoComplete="family-name"
                />
                <span className="isf-icon"><TwoPeopleIcon /></span>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="isf-group">
            <label className="isf-label">رقم الهاتف (الواتساب)</label>
            <div className={`isf-input-wrapper ${focusedField === 'phone' ? 'focused' : touched.phone && !phoneValid ? 'error' : phoneValid ? 'valid' : ''}`}>
              <input
                name="phone"
                type="tel"
                className="isf-input"
                placeholder="0XX XX XX XX"
                value={phone}
                onChange={handlePhoneChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => {
                  setFocusedField(null);
                  setTouched(p => ({ ...p, phone: true }));
                  if (phoneValid) trackBookingStep(2, 'phone_submitted');
                }}
                style={{ direction: 'ltr', paddingLeft: '80px', paddingRight: '12px', textAlign: 'left' }}
                required
                autoComplete="tel"
              />
              <span className="isf-icon"><PhoneIcon /></span>
              <span style={{ position: 'absolute', left: '44px', color: '#D4A843', fontSize: '14px', fontFamily: 'var(--font-inter-tight, "Inter Tight")', direction: 'ltr', pointerEvents: 'none' }}>
                🇩🇿 +213
              </span>
            </div>
            {touched.phone && !phoneValid && (
              <span style={{ fontSize: '11px', color: '#E85D4A', textAlign: 'right', fontFamily: 'var(--font-cairo, Cairo)' }}>رقم الهاتف غير صحيح</span>
            )}
          </div>

          {/* LLC Name */}
          <div className="isf-group">
            <label className="isf-label">اسم شركتك الامريكية</label>
            <div className={`isf-input-wrapper ${focusedField === 'llcName' ? 'focused' : touched.llcName && !llcNameValid ? 'error' : llcNameValid ? 'valid' : ''}`}>
              <input
                name="llc_name"
                type="text"
                className="isf-input"
                placeholder="Ex: Go LLC"
                value={llcName}
                onChange={e => setLlcName(e.target.value)}
                onFocus={() => setFocusedField('llcName')}
                onBlur={() => {
                  setFocusedField(null);
                  setTouched(p => ({ ...p, llcName: true }));
                }}
                required
                autoComplete="organization"
              />
              <span className="isf-icon"><BuildingIcon /></span>
            </div>
            {touched.llcName && !llcNameValid && (
              <span style={{ fontSize: '11px', color: '#E85D4A', textAlign: 'right', fontFamily: 'var(--font-cairo, Cairo)' }}>الرجاء إدخال اسم شركتك</span>
            )}
          </div>

          {/* Activity Sector */}
          <div className="isf-group">
            <label className="isf-label">قطاع النشاط</label>
            <div className={`isf-input-wrapper ${focusedField === 'sector' ? 'focused' : touched.sector && !sectorValid ? 'error' : sectorValid ? 'valid' : ''}`}>
              <select
                name="sector"
                className="isf-select"
                value={sector}
                onChange={e => {
                  setSector(e.target.value);
                  if (e.target.value !== 'أخرى') setCustomSector('');
                }}
                onFocus={() => setFocusedField('sector')}
                onBlur={() => {
                  setFocusedField(null);
                  setTouched(p => ({ ...p, sector: true }));
                  if (sectorValid) trackBookingStep(3, 'sector_selected', { sector: sector });
                }}
                required
              >
                <option value="" disabled hidden>اختر قطاع النشاط</option>
                {SECTORS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <span className="isf-icon"><GridIcon /></span>
              <span style={{ position: 'absolute', left: '16px', color: 'rgba(255, 255, 255, 0.4)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          {/* Custom Sector Input if "Other" is chosen */}
          {sector === 'أخرى' && (
            <div className="isf-group" style={{ animation: 'chat-fade-in 300ms ease-out' }}>
              <label className="isf-label">اكتب قطاع نشاطك</label>
              <div className={`isf-input-wrapper ${focusedField === 'customSector' ? 'focused' : touched.sector && customSector.trim().length < 2 ? 'error' : customSector.trim().length >= 2 ? 'valid' : ''}`}>
                <input
                  name="custom_sector"
                  type="text"
                  className="isf-input"
                  placeholder="مثال: تصدير المنتجات الحرفية"
                  value={customSector}
                  onChange={e => setCustomSector(e.target.value)}
                  onFocus={() => setFocusedField('customSector')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <span className="isf-icon"><GridIcon /></span>
              </div>
            </div>
          )}

          {/* Reason for establishment */}
          <div className="isf-group">
            <label className="isf-label">لماذا تريد تأسيس شركة أمريكية؟</label>
            <div className={`isf-input-wrapper ${focusedField === 'reason' ? 'focused' : touched.reason && !reasonValid ? 'error' : reasonValid ? 'valid' : ''}`}>
              <select
                name="reason"
                className="isf-select"
                value={reason}
                onChange={e => {
                  setReason(e.target.value);
                  if (e.target.value !== 'أخرى') setCustomReason('');
                }}
                onFocus={() => setFocusedField('reason')}
                onBlur={() => {
                  setFocusedField(null);
                  setTouched(p => ({ ...p, reason: true }));
                }}
                required
              >
                <option value="" disabled hidden>اختر السبب الرئيسي</option>
                {REASONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <span className="isf-icon"><TargetIcon /></span>
              <span style={{ position: 'absolute', left: '16px', color: 'rgba(255, 255, 255, 0.4)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          {/* Custom Reason Input if "Other" is chosen */}
          {reason === 'أخرى' && (
            <div className="isf-group" style={{ animation: 'chat-fade-in 300ms ease-out' }}>
              <label className="isf-label">اكتب سببك الخاص</label>
              <div className={`isf-input-wrapper ${focusedField === 'customReason' ? 'focused' : touched.reason && customReason.trim().length < 2 ? 'error' : customReason.trim().length >= 2 ? 'valid' : ''}`}>
                <input
                  name="custom_reason"
                  type="text"
                  className="isf-input"
                  placeholder="مثال: لفتح حسابات على منصات العمل الحر"
                  value={customReason}
                  onChange={e => setCustomReason(e.target.value)}
                  onFocus={() => setFocusedField('customReason')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <span className="isf-icon"><TargetIcon /></span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="isf-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'جاري الإرسال...' : 'أرسل وخلّي الباقي علينا'}
          </button>

          {isError && (
            <div style={{ color: '#E85D4A', fontSize: '13px', textAlign: 'center', fontFamily: 'var(--font-cairo, Cairo)', marginTop: '4px' }}>
              حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو مراسلتنا عبر الواتساب.
            </div>
          )}
        </form>
      )}
    </div>
  );
}
