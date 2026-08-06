'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { EASE, VIEWPORT } from './motion';
import { CheckIcon, WhatsAppIcon, type Plan } from './ui';
import { trackRegistration, newEventId } from './tracking';
import {
  WHATSAPP_GROUP_LINK,
  PRICE_STANDARD_NEW,
  PRICE_VIP_NEW,
  COURSE_START_LABEL,
} from './constants';

type Status = 'idle' | 'loading' | 'success' | 'error';

/** Read a browser cookie by name (client-only). */
function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Meta click id (_fbc). Uses the cookie if present, otherwise rebuilds it from
 * the `fbclid` URL param per Meta's format `fb.1.<ts>.<fbclid>` so ad clicks
 * still match server-side.
 */
function resolveFbc(): string | undefined {
  const cookie = readCookie('_fbc');
  if (cookie) return cookie;
  if (typeof window === 'undefined') return undefined;
  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

const PLANS: { id: Plan; label: string; price: number; note: string }[] = [
  { id: 'standard', label: 'العرض العادي', price: PRICE_STANDARD_NEW, note: 'الدورة كاملة + التسجيلات + دعم جماعي' },
  { id: 'vip', label: 'العرض VIP ⭐', price: PRICE_VIP_NEW, note: 'كل شي + coaching فردي + مرافقة حتى أول عميل' },
];

export default function RegistrationSection() {
  const [plan, setPlan] = useState<Plan>('standard');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Pricing cards dispatch this to pre-select a plan before scrolling here.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Plan;
      if (detail === 'standard' || detail === 'vip') setPlan(detail);
    };
    window.addEventListener('ac:selectPlan', handler);
    return () => window.removeEventListener('ac:selectPlan', handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setErrorMsg('');

    // Client-side validation
    if (!name.trim()) return setErrorMsg('من فضلك دخّل اسمك الكامل');
    if (whatsapp.replace(/[^\d]/g, '').length < 9) return setErrorMsg('رقم واتساب غير صحيح');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErrorMsg('بريد إلكتروني غير صحيح');

    setStatus('loading');
    // ONE id shared by the browser Pixel (eventID) and the server CAPI (event_id)
    // so Meta counts a single, deduplicated Lead.
    const eventId = newEventId();

    try {
      const res = await fetch('/api/course-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          whatsapp,
          email,
          plan,
          event_id: eventId,
          // Browser signals that let the CAPI event match & dedupe reliably.
          fbp: readCookie('_fbp'),
          fbc: resolveFbc(),
          event_source_url: window.location.href,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'تعذّر إرسال التسجيل');
      }

      // Fire client-side email notification directly to sed200604@gmail.com
      const emailPayload = {
        "الاسم الكامل": name.trim(),
        "رقم الواتساب": whatsapp.trim(),
        "البريد الإلكتروني": email?.trim() || 'غير محدد',
        "نوع العرض": plan === 'vip' ? 'VIP (20,000 دج)' : 'العادي (12,000 دج)',
        "_subject": "🎉 تسجيل جديد في دورة الذكاء الاصطناعي!",
        "_captcha": "false",
        "_template": "table"
      };

      Promise.allSettled([
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

      // Fire Meta Pixel Lead + CompleteRegistration (deduped with server CAPI via eventId).
      trackRegistration(plan, eventId);
      setStatus('success');

      // Auto-redirect to WhatsApp Group
      setTimeout(() => {
        window.location.href = WHATSAPP_GROUP_LINK;
      }, 1200);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'خطأ غير متوقع، عاود المحاولة');
      setStatus('error');
    }
  };

  const inputBase =
    'w-full rounded-xl bg-white border border-black/10 px-4 py-3 text-ac-navy-deep placeholder:text-ac-ink/40 outline-none transition focus:border-ac-gold focus:ring-2 focus:ring-ac-gold/40';

  return (
    <section
      id="register"
      className="relative w-full overflow-hidden py-[clamp(4rem,10vw,7rem)] px-5"
      style={{ background: 'linear-gradient(180deg,#112440 0%,#14284a 100%)' }}
      aria-label="التسجيل في الدورة"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="ac-aurora absolute -top-[10%] end-[-8%] w-[40vw] h-[40vw] max-w-[480px] max-h-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.1),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-ac-gold text-sm font-bold">
            <span className="h-px w-6 bg-ac-gold/60" /> التسجيل
          </span>
          <h2
            className="mt-3 font-tajawal font-extrabold text-white leading-tight"
            style={{ fontSize: 'clamp(1.6rem,4.5vw,2.6rem)' }}
          >
            احجز مقعدك في أول فوج
          </h2>
          <p className="mt-3 text-ac-muted">
            دخّل معلوماتك ونتواصلو معاك على الواتساب باش نكملو التسجيل — انطلاق الفوج: {COURSE_START_LABEL}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-8 rounded-3xl bg-white p-6 md:p-8 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.6)] ring-1 ring-black/5"
        >
          {status === 'success' ? (
            <div className="text-center py-4">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ac-success/15">
                <CheckIcon className="h-8 w-8 text-ac-success" />
              </span>
              <h3 className="mt-5 font-tajawal font-extrabold text-2xl text-ac-navy-deep">
                تم تسجيلك بنجاح ✅
              </h3>
              <p className="mt-3 text-ac-ink leading-relaxed">
                مبروك! خذينا معلوماتك. آخر خطوة: ادخل لمجموعة الواتساب باش تتوصل بكل التفاصيل ووقت الانطلاق.
              </p>
              <a
                href={WHATSAPP_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-7 py-3.5 font-extrabold text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition hover:brightness-105"
              >
                <WhatsAppIcon className="h-5 w-5" />
                ادخل لمجموعة الواتساب
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* plan selector */}
              <fieldset>
                <legend className="mb-2.5 text-sm font-bold text-ac-navy-deep">اختر العرض</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PLANS.map((p) => {
                    const active = plan === p.id;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setPlan(p.id)}
                        aria-pressed={active}
                        className={`text-start rounded-xl border p-3.5 transition ${
                          active
                            ? 'border-ac-gold bg-ac-gold/10 ring-2 ring-ac-gold/40'
                            : 'border-black/10 bg-ac-offwhite hover:border-ac-gold/40'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span className="font-tajawal font-extrabold text-ac-navy-deep">{p.label}</span>
                          <span
                            className={`h-4 w-4 rounded-full border-2 ${
                              active ? 'border-ac-gold bg-ac-gold' : 'border-black/25'
                            }`}
                          />
                        </span>
                        <span dir="ltr" className="mt-1 block font-inter-tight font-bold text-ac-gold">
                          {p.price.toLocaleString('en-US')} دج
                        </span>
                        <span className="mt-1 block text-xs text-ac-ink/70 leading-snug">{p.note}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* fields */}
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="ac-name" className="mb-1.5 block text-sm font-bold text-ac-navy-deep">
                    الاسم الكامل <span className="text-ac-danger">*</span>
                  </label>
                  <input
                    id="ac-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: محمد بن أحمد"
                    className={inputBase}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="ac-wa" className="mb-1.5 block text-sm font-bold text-ac-navy-deep">
                    رقم الواتساب <span className="text-ac-danger">*</span>
                  </label>
                  <input
                    id="ac-wa"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0X XX XX XX XX"
                    className={`${inputBase} text-start`}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="ac-email" className="mb-1.5 block text-sm font-bold text-ac-navy-deep">
                    البريد الإلكتروني <span className="text-ac-ink/40 font-normal">(اختياري)</span>
                  </label>
                  <input
                    id="ac-email"
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`${inputBase} text-start`}
                  />
                </div>
              </div>

              {errorMsg && (
                <p role="alert" className="mt-4 rounded-lg bg-ac-danger/10 px-3.5 py-2.5 text-sm font-semibold text-ac-danger">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="cta-button group relative mt-6 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-8 py-4 text-lg font-extrabold text-ac-navy-deep shadow-[0_8px_28px_rgba(212,168,67,0.4)] transition hover:shadow-[0_12px_40px_rgba(212,168,67,0.55)] disabled:cursor-not-allowed disabled:opacity-70"
                style={{ background: 'linear-gradient(120deg,#D4A843 0%,#E8C36A 50%,#D4A843 100%)' }}
              >
                {status === 'loading' ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-ac-navy-deep/30 border-t-ac-navy-deep" />
                    جارٍ الإرسال…
                  </>
                ) : (
                  <>
                    أكّد تسجيلي
                    <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out" />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs text-ac-ink/60">
                🔒 معلوماتك آمنة، نستعملوها فقط باش نتواصلو معاك حول الدورة.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
