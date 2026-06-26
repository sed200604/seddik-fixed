'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const PIXEL_WORKSHOP = '1644967066810883';

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  businessType: string;
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const WORKSHOP_DATE = new Date('2026-06-04T20:00:00');
const NAVY_DARK = '#0A1628';
const NAVY = '#1A3A52';
const GOLD = '#F4C430';
const GOLD_DARK = '#C49B1A';
const RED = '#E53935';

const PAIN_POINTS = [
  { emoji: '⚠️', title: 'تخاف من رفض حسابك؟', desc: 'قدّمت طلب Wise أو Mercury وجاءك رد "We\'re unable to verify your identity" — وما تعرف ليش ولا كيف تصلحها' },
  { emoji: '🔒', title: 'تخاف من تجميد حسابك فجأة؟', desc: 'سمعت قصص ناس تجمّد حسابهم بدون إنذار وتوقف مشروعهم الكامل — وما تعرف كيف تحمي نفسك' },
  { emoji: '💸', title: 'الرسوم البنكية تأكل أرباحك؟', desc: 'كل تحويل يأخذ منك 3%-5% رسوم — تعمل بجهد وترسل للبنك نصيبه قبلك' },
  { emoji: '🌍', title: 'مشاكل في استقبال تحويلات دولية؟', desc: 'عميل أجنبي جاهز يدفعلك لكن ما عندك طريقة احترافية — Wise, Mercury, Stripe — كل ما جربت وقعت في مشكلة' },
  { emoji: '⚡', title: 'لا تعرف كيف تبني Setup احترافياً؟', desc: 'بحثت ووجدت معلومات متناقضة في كل مكان — New Mexico ولا Wyoming؟ Wise ولا Mercury؟ ما أحد يعطيك جواب واضح' },
  { emoji: '💳', title: 'صعوبة في ربط بوابات الدفع؟', desc: 'Stripe يرفضك، PayPal يقفل — وما تعرف الطريقة الصحيحة التي لا تسبب مشاكل لاحقاً' },
];

const SESSIONS = [
  { num: '01', icon: '🏦', title: 'فتح الحساب البنكي الصحيح من أول مرة', value: '300$', desc: 'الفرق بين Wise Business وMercury وأيهما يناسب نشاطك + الأخطاء الـ7 التي تسبب الرفض الفوري' },
  { num: '02', icon: '🛡️', title: 'حماية حسابك من التجميد المفاجئ — للأبد', value: '400$', desc: 'الاستراتيجية الدائمة لـ100+ عميل — ولم يُغلق ولا حساب واحد حتى الآن' },
  { num: '03', icon: '🌍', title: 'إدارة التحويلات الدولية بأمان وبأقل رسوم', value: '250$', desc: 'كيف ترسل وتستقبل مبالغ كبيرة دون توقف ودون رسوم مرتفعة' },
  { num: '04', icon: '💳', title: 'ربط Stripe وPayPal بمشروعك خطوة بخطوة', value: '350$', desc: 'الطريقة الصحيحة التي تضمن قبول حسابك وعدم إغلاقه لاحقاً' },
  { num: '05', icon: '⚡', title: 'بناء Business Setup احترافي من اليوم الأول', value: '200$', desc: 'الأساس المالي والقانوني الصحيح من اختيار الولاية إلى EIN إلى الحساب البنكي' },
];

const AUDIENCE = [
  { emoji: '📦', title: 'الدروبشيبينغ', desc: 'تبيع منتجات وتحتاج حساباً لإدارة مدفوعاتك مع الموردين' },
  { emoji: '🛒', title: 'أصحاب المتاجر الإلكترونية', desc: 'Shopify / WooCommerce / Amazon + بوابة دفع موثوقة' },
  { emoji: '💻', title: 'الفريلانسرز', desc: 'تستقبل مدفوعات دولية وتريد طريقة آمنة واحترافية' },
  { emoji: '🌍', title: 'المستوردون والمصدرون', desc: 'تحويلات كبيرة بدون توقف ودون مشاكل' },
  { emoji: '🚀', title: 'أصحاب المشاريع الناشئة', desc: 'تبني مشروعك من الصفر وتريد أساساً بنكياً صحيحاً' },
  { emoji: '🖥️', title: 'مقدمو الخدمات أونلاين', desc: 'كورسات، استشارات، خدمات رقمية — نظام دفع عالمي' },
];

const STATS = [
  { n: '100+', l: 'عميل ناجح', s: 'فتحنا لهم حسابات بنكية تعمل حتى اليوم' },
  { n: '0%', l: 'نسبة الإغلاقات', s: 'صفر حسابات أُغلقت لعملائنا منذ تأسيسنا' },
  { n: '+3', l: 'سنوات خبرة', s: 'ميدانية حقيقية مع أصحاب مشاريع من الجزائر ومنطقة MENA' },
  { n: '2', l: 'مكتب حقيقي', s: 'الجزائر العاصمة + قسنطينة — يمكنك زيارتنا والتحقق بنفسك' },
];

const DIFFERENTIATORS = [
  { icon: '🏆', text: 'خبرة عملية — كل ما نشاركه مبني على تجارب حقيقية مع مئات العملاء من منطقتنا' },
  { icon: '🤝', text: 'نفهم خصوصيتك — نفهم تحديات العمل من الجزائر ومنطقة MENA بشكل كامل' },
  { icon: '📋', text: 'منهج قابل للتطبيق فوراً — خطوات تطبقها مباشرة بعد الورشة، لا نظرية فارغة' },
  { icon: '🏢', text: 'مكاتب حقيقية — يمكنك زيارتنا والتحقق منّا قبل أي قرار' },
];

const TESTIMONIALS = [
  { name: 'أحمد المنصوري', role: 'صاحب متجر إلكتروني | الجزائر', text: 'فتحت حساب Mercury وWise Business في أقل من أسبوع. الفريق كان واضحاً ومفيداً جداً، أنصح الجميع بالتعامل معهم.' },
  { name: 'فاطمة بن علي', role: 'فريلانسر | قسنطينة', text: 'كنت خايف من رفض الحساب بعد ما صارلي قبل — مع GO LLC اشتغل كل شيء من أول مرة وما واجهت أي مشكلة.' },
];

const FAQ_ITEMS = [
  { q: 'هل الورشة مجانية تماماً؟', a: 'نعم، الورشة مجانية 100%. ما عليك سوى التسجيل المسبق لحجز مكانك.' },
  { q: 'هل الورشة مناسبة للمبتدئين؟', a: 'نعم، الورشة مصممة لتناسب الجميع بما فيهم المبتدئين. لا تحتاج أي خبرة مسبقة في البنوك الرقمية.' },
  { q: 'هل الحضور يكون أونلاين؟', a: 'نعم، الورشة بالكامل عبر Zoom. ستتلقى رابط الدخول بعد التسجيل مباشرة.' },
  { q: 'هل يمكنني الحضور من الهاتف؟', a: 'نعم، يمكنك الحضور من أي جهاز: موبايل، تابلت، أو كمبيوتر بدون أي مشاكل.' },
  { q: 'هل المقاعد محدودة؟', a: 'نعم، الأماكن محدودة لضمان جودة التفاعل والإجابة على الأسئلة. سجل مبكراً لضمان مكانك.' },
  { q: 'ماذا يحدث بعد التسجيل؟', a: 'بعد التسجيل ستتلقى رسالة تأكيد فورية، وقبل الورشة سنرسل لك رابط Zoom وكل التفاصيل عبر واتساب.' },
];

const BUSINESS_TYPES = ['دروبشيبينغ', 'متجر إلكتروني', 'فريلانسر', 'استيراد وتصدير', 'مشروع ناشئ', 'خدمات أونلاين', 'أخرى'];

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */
function useCountdown(target: Date): Countdown {
  const [cd, setCd] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const calc = (): Countdown => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      return {
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
        expired: false,
      };
    };
    setCd(calc());
    setReady(true);
    const t = setInterval(() => setCd(calc()), 1000);
    return () => clearInterval(t);
  }, [target]);
  return { ...cd, expired: ready && cd.expired };
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay },
});

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function WorkshopClient() {
  const cd = useCountdown(WORKSHOP_DATE);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', whatsapp: '', businessType: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const submittedRef = useRef(false);
  const pixelFiredRef = useRef(false);

  /* Fire workshop pixel PageView once after hydration */
  useEffect(() => {
    if (pixelFiredRef.current) return;
    pixelFiredRef.current = true;
    const fire = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('init', PIXEL_WORKSHOP);
        window.fbq('trackSingle', PIXEL_WORKSHOP, 'PageView');
      }
    };
    // Small delay to ensure fbevents.js has fully loaded
    if (document.readyState === 'complete') {
      fire();
    } else {
      window.addEventListener('load', fire, { once: true });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'الاسم مطلوب';
    if (!form.email.trim()) e.email = 'البريد الإلكتروني مطلوب';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'بريد إلكتروني غير صحيح';
    if (!form.whatsapp.trim()) e.whatsapp = 'رقم الواتساب مطلوب';
    if (!form.businessType) e.businessType = 'يرجى اختيار نوع نشاطك';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof FormState]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    fetch('https://script.google.com/macros/s/AKfycbyCx9EQZGN0Qunvi_63ABL_Yub0HosJ9RcR1L94gjeL_Wa18lZOKEor506r2ofVrouH8g/exec', {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        businessType: form.businessType,
        source: 'workshop-landing-page',
      }),
    }).catch(() => {});
    window.location.href = '/workshop/redirect';
  };

  const goldBtn: React.CSSProperties = {
    background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`,
    color: NAVY_DARK,
    fontWeight: 900,
    cursor: 'pointer',
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${hasError ? RED : 'rgba(244,196,48,0.3)'}`,
    borderRadius: '10px',
    padding: '14px 16px',
    color: '#fff',
    fontFamily: 'Cairo, sans-serif',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  return (
    <div dir="rtl" style={{ background: NAVY_DARK, overflowX: 'hidden', fontFamily: 'Cairo, sans-serif' }}>
      {/* noscript fallback for workshop pixel */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1" width="1" style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_WORKSHOP}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* ══════════════════════════════════════════
          TOP NAV
      ══════════════════════════════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(10,22,40,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid rgba(244,196,48,0.18)`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: GOLD, fontWeight: 900, fontSize: 20 }}>Go LLC</span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }} className="hidden sm:inline">| ورشة البنوك الرقمية</span>
        </div>
        <a
          href="#registration"
          style={{ ...goldBtn, padding: '8px 20px', borderRadius: 12, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}
        >
          سجل الآن ←
        </a>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(145deg, ${NAVY_DARK} 0%, ${NAVY} 65%, #0F2A3E 100%)`,
        padding: '72px 20px 88px',
        textAlign: 'center',
      }}>
        {/* Stars bg */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.06) 1.5px, transparent 0)',
          backgroundSize: '36px 36px',
        }} />
        {/* Gold glow */}
        <div aria-hidden style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(244,196,48,0.15) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <motion.div {...fadeUp(0)} style={{ marginBottom: 24 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', borderRadius: 999,
              background: 'rgba(244,196,48,0.13)', border: `1px solid rgba(244,196,48,0.4)`,
              color: GOLD, fontWeight: 700, fontSize: 14,
            }}>
              🎓 ورشة مجانية — 4 يونيو 2026 &nbsp;|&nbsp; ⚠️ تبقّى 11 مقعد فقط
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...fadeUp(0.05)} style={{
            fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 900, color: '#fff',
            lineHeight: 1.35, marginBottom: 16,
          }}>
            افتح حسابك البنكي الأمريكي بشكل صحيح من أول مرة
            <span style={{ display: 'block', marginTop: 6, color: GOLD }}>
              — بدون رفض، بدون تجميد، بدون أخطاء مكلّفة
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p {...fadeUp(0.09)} style={{
            fontSize: 'clamp(14px, 2.5vw, 17px)', color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.85, maxWidth: 600, margin: '0 auto 28px',
          }}>
            ورشة مجانية لـ 3 ساعات — نكشف فيها النظام الدقيق الذي فتحنا به
            100+ حساب بنكي ناجح لأصحاب المشاريع، بدون أن يُرفض ولا واحد حتى اليوم
          </motion.p>

          {/* Info chips */}
          <motion.div {...fadeUp(0.13)} style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 36,
          }}>
            {[
              { icon: '📅', text: '4 يونيو 2026' },
              { icon: '💻', text: 'Zoom أونلاين' },
              { icon: '⏱️', text: '3 ساعات' },
              { icon: '🆓', text: 'مجاناً 100%' },
            ].map((c, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.08)', borderRadius: 8,
                padding: '8px 14px', fontSize: 13, fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
              }}>
                {c.icon} {c.text}
              </span>
            ))}
          </motion.div>

          {/* Countdown */}
          <motion.div {...fadeUp(0.17)} style={{ marginBottom: 40 }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginBottom: 12 }}>
              {cd.expired ? 'انتهت الورشة — تابعنا للورشة القادمة' : 'تبدأ الورشة بعد:'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              {[
                { v: cd.days, l: 'يوم' },
                { v: cd.hours, l: 'ساعة' },
                { v: cd.minutes, l: 'دقيقة' },
                { v: cd.seconds, l: 'ثانية' },
              ].map(({ v, l }, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  background: NAVY, border: `1px solid rgba(244,196,48,0.45)`,
                  borderRadius: 12, padding: '12px 8px', minWidth: 64,
                }}>
                  <span style={{
                    fontSize: 'clamp(28px, 8vw, 52px)', fontWeight: 900,
                    color: GOLD, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
                  }}>
                    {String(v).padStart(2, '0')}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 6 }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.21)} style={{
            display: 'flex', flexDirection: 'column', gap: 12,
            alignItems: 'center', marginBottom: 28,
          }}>
            <a
              href="#registration"
              style={{
                ...goldBtn, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 18, padding: '16px 40px', borderRadius: 16,
                boxShadow: '0 8px 32px rgba(244,196,48,0.4)',
                width: '100%', maxWidth: 360, justifyContent: 'center',
              }}
            >
              🎓 سجل الآن — احجز مكانك مجاناً ←
            </a>
            <a
              href="https://wa.me/213791789125?text=أريد حجز مكاني في ورشة البنوك الرقمية المجانية"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', border: '2px solid #25D366',
                color: '#25D366', fontWeight: 700, fontSize: 15,
                padding: '13px 32px', borderRadius: 16, textDecoration: 'none',
                width: '100%', maxWidth: 360, justifyContent: 'center',
              }}
            >
              📲 احجز عبر واتساب
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div {...fadeUp(0.25)} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            {['✅ بدون رسوم', '🔒 تسجيل آمن', '📅 رابط Zoom فوري', '⚠️ 11 مقعد متبقي'].map((t, i) => (
              <span key={i} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>{t}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PAIN POINTS
      ══════════════════════════════════════════ */}
      <section style={{ background: NAVY_DARK, padding: '72px 20px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              display: 'inline-block', padding: '6px 18px', borderRadius: 999,
              background: `rgba(229,57,53,0.12)`, border: `1px solid rgba(229,57,53,0.3)`,
              color: '#EF5350', fontWeight: 700, fontSize: 13, marginBottom: 16,
            }}>هل هذا وضعك؟</span>
            <h2 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
              المشاكل الحقيقية التي تواجه أصحاب الأعمال الأونلاين
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, maxWidth: 520, margin: '0 auto' }}>
              إذا واجهت أياً من هذه المشاكل — هذه الورشة صُممت خصيصاً لك
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {PAIN_POINTS.map((p, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.05)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid rgba(229,57,53,0.25)`,
                  borderRight: `3px solid ${RED}`,
                  borderRadius: 16,
                  padding: 24,
                  transition: 'transform 0.2s, border-color 0.2s',
                  cursor: 'default',
                }}
                whileHover={{ y: -4, borderColor: RED }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.emoji}</div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.32)} style={{ textAlign: 'center', marginTop: 40 }}>
            <a
              href="#registration"
              style={{
                ...goldBtn, display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 36px', borderRadius: 16, fontSize: 15, textDecoration: 'none',
                boxShadow: '0 6px 24px rgba(244,196,48,0.3)',
              }}
            >
              حل هذه المشاكل نهائياً — سجل مجاناً ←
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALUE STACK / SESSIONS
      ══════════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(180deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, padding: '72px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{
              display: 'inline-block', padding: '6px 18px', borderRadius: 999,
              background: 'rgba(244,196,48,0.12)', border: `1px solid rgba(244,196,48,0.28)`,
              color: GOLD, fontWeight: 700, fontSize: 13, marginBottom: 16,
            }}>محتوى الورشة</span>
            <h2 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
              ماذا ستتعلم خلال 3 ساعات؟
            </h2>
          </motion.div>

          {/* Anchor box */}
          <motion.div {...fadeUp(0.05)} style={{
            background: 'rgba(244,196,48,0.08)', border: `1px solid ${GOLD}`,
            borderRadius: 12, padding: '14px 20px', marginBottom: 32, textAlign: 'center',
          }}>
            <p style={{ color: GOLD, fontWeight: 700, fontSize: 14 }}>
              💡 هذه المعلومات تكلف +1,500$ مع مستشار أمريكي متخصص — نقدمها لك اليوم مجاناً بالكامل
            </p>
          </motion.div>

          {/* Sessions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {SESSIONS.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 20,
                  padding: '24px 0',
                  borderBottom: i < SESSIONS.length - 1 ? `1px solid rgba(244,196,48,0.18)` : 'none',
                }}
              >
                <span style={{
                  fontSize: 44, fontWeight: 900,
                  color: 'rgba(244,196,48,0.22)', lineHeight: 1,
                  minWidth: 52, flexShrink: 0,
                }}>
                  {s.num}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{s.title}</h3>
                    <span style={{
                      background: 'rgba(40,167,69,0.15)', border: '1px solid #28A745',
                      color: '#4ADE80', fontSize: 11, fontWeight: 700,
                      padding: '2px 10px', borderRadius: 999, whiteSpace: 'nowrap',
                    }}>قيمة: {s.value}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Value summary */}
          <motion.div {...fadeUp(0.35)} style={{
            background: 'rgba(244,196,48,0.06)', border: `2px solid ${GOLD}`,
            borderRadius: 16, padding: 24, marginTop: 32, textAlign: 'center',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, marginBottom: 6 }}>
              <span style={{ textDecoration: 'line-through' }}>القيمة الإجمالية: +1,500$</span>
            </p>
            <p style={{ color: GOLD, fontWeight: 900, fontSize: 22, marginBottom: 8 }}>
              سعر الورشة اليوم: مجاناً 100% 🎉
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
              نقدم هذه القيمة مجاناً — لأننا نريدك أن ترى بنفسك ماذا يمكننا فعله لمشروعك
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHO IS IT FOR
      ══════════════════════════════════════════ */}
      <section style={{ background: NAVY_DARK, padding: '72px 20px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              display: 'inline-block', padding: '6px 18px', borderRadius: 999,
              background: 'rgba(244,196,48,0.1)', border: `1px solid rgba(244,196,48,0.25)`,
              color: GOLD, fontWeight: 700, fontSize: 13, marginBottom: 16,
            }}>لمن هذه الورشة؟</span>
            <h2 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, color: '#fff' }}>
              هذه الورشة صُممت لك إذا كنت...
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {AUDIENCE.map((a, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.05)}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(244,196,48,0.15)`,
                  borderRadius: 16, padding: '24px 20px', textAlign: 'center', cursor: 'default',
                  transition: 'background 0.25s, border-color 0.25s',
                }}
                whileHover={{ background: 'rgba(244,196,48,0.08)', borderColor: 'rgba(244,196,48,0.45)' }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{a.emoji}</div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{a.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.6 }}>{a.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.32)} style={{
            marginTop: 32, background: 'rgba(255,255,255,0.04)',
            border: `2px dashed rgba(244,196,48,0.35)`, borderRadius: 14,
            padding: 20, textAlign: 'center',
          }}>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
              ✅ الشرط الوحيد: أن تعمل أونلاين وتتعامل مع أموال دولية — هذه الورشة لك تماماً
            </p>
            <a
              href="#registration"
              style={{ ...goldBtn, display: 'inline-flex', padding: '12px 32px', borderRadius: 14, fontSize: 14, textDecoration: 'none' }}
            >
              🎓 سجل الآن — مجاناً ←
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST / WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_DARK} 100%)`, padding: '72px 20px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              display: 'inline-block', padding: '6px 18px', borderRadius: 999,
              background: 'rgba(244,196,48,0.1)', border: `1px solid rgba(244,196,48,0.25)`,
              color: GOLD, fontWeight: 700, fontSize: 13, marginBottom: 16,
            }}>لماذا تثق بنا؟</span>
            <h2 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
              Go LLC — خبرة حقيقية. نتائج موثّقة. مكاتب يمكنك زيارتها.
            </h2>
          </motion.div>

          {/* Anchor box */}
          <motion.div {...fadeUp(0.05)} style={{
            background: 'rgba(244,196,48,0.08)', border: `1px solid ${GOLD}`,
            borderRadius: 12, padding: '14px 20px', marginBottom: 40, textAlign: 'center',
          }}>
            <p style={{ color: GOLD, fontWeight: 700, fontSize: 14 }}>
              ⚠️ ما تحصل عليه في هذه الورشة يكلف +1,500$ مع مستشار أمريكي — نقدمه مجاناً لأن نتائجنا تتكلم عنّا
            </p>
          </motion.div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(244,196,48,0.18)`,
                  borderRadius: 16, padding: '24px 16px', textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 'clamp(40px,10vw,64px)', fontWeight: 900, color: GOLD, lineHeight: 1, marginBottom: 8 }}>
                  {s.n}
                </div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.l}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6 }}>{s.s}</div>
              </motion.div>
            ))}
          </div>

          {/* Differentiators */}
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            {DIFFERENTIATORS.map((d, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '16px 0',
                  borderBottom: i < DIFFERENTIATORS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{d.icon}</span>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.6 }}>{d.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section style={{ background: NAVY_DARK, padding: '72px 20px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(20px,4vw,32px)', fontWeight: 900, color: '#fff' }}>
              ماذا يقول عملاؤنا — أكثر من 100 شخص جربوا النظام ونجحوا
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(244,196,48,0.15)`,
                  borderRight: `3px solid ${GOLD}`, borderRadius: 16, padding: 24,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: -10, right: 16,
                  fontSize: 80, color: 'rgba(244,196,48,0.08)', fontFamily: 'serif', lineHeight: 1,
                  pointerEvents: 'none',
                }}>&ldquo;</div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} style={{ color: GOLD, fontSize: 14 }}>⭐</span>
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{t.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WORKSHOP INFO
      ══════════════════════════════════════════ */}
      <section style={{ background: NAVY, padding: '72px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{
              display: 'inline-block', padding: '6px 18px', borderRadius: 999,
              background: 'rgba(244,196,48,0.1)', border: `1px solid rgba(244,196,48,0.25)`,
              color: GOLD, fontWeight: 700, fontSize: 13, marginBottom: 16,
            }}>معلومات الورشة</span>
            <h2 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, color: '#fff' }}>
              كل ما تحتاج معرفته قبل التسجيل
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { icon: '💻', label: 'النوع', value: 'ورشة أونلاين عبر Zoom' },
              { icon: '📅', label: 'التاريخ', value: '4 يونيو 2026' },
              { icon: '⏱️', label: 'المدة', value: '3 ساعات' },
              { icon: '🆓', label: 'السعر', value: 'مجاناً 100%' },
            ].map((d, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(244,196,48,0.18)`,
                  borderRadius: 14, padding: 20, textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>{d.icon}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{d.label}</div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{d.value}</div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.28)} style={{
            background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(244,196,48,0.15)`,
            borderRadius: 14, padding: 24,
          }}>
            {[
              'ستحصل على رابط Zoom فور تأكيد تسجيلك',
              'لا تحتاج أي معرفة سابقة — مناسب للمبتدئين والمتقدمين',
              'يمكنك طرح أسئلتك مباشرة خلال الجلسة',
            ].map((item, i) => (
              <p key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, paddingBottom: 12, marginBottom: 12, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                ✅ {item}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section style={{ background: NAVY_DARK, padding: '72px 20px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{
              display: 'inline-block', padding: '6px 18px', borderRadius: 999,
              background: 'rgba(244,196,48,0.1)', border: `1px solid rgba(244,196,48,0.25)`,
              color: GOLD, fontWeight: 700, fontSize: 13, marginBottom: 16,
            }}>أسئلة شائعة</span>
            <h2 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, color: '#fff' }}>
              كل أسئلتك لها إجابة هنا
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.04)}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(244,196,48,0.15)`,
                  borderRadius: 14, overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 12, padding: 20, textAlign: 'right', fontFamily: 'Cairo, sans-serif',
                    fontWeight: 700, fontSize: 14, color: '#fff', background: 'transparent',
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  <span>{item.q}</span>
                  <span style={{ color: GOLD, flexShrink: 0, transform: openFAQ === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                    <ChevronDown style={{ width: 18, height: 18 }} />
                  </span>
                </button>
                <AnimatePresence>
                  {openFAQ === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div style={{
                        padding: '4px 20px 20px',
                        color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.75,
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                      }}>
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          REGISTRATION FORM
      ══════════════════════════════════════════ */}
      <section
        id="registration"
        style={{ background: `linear-gradient(180deg, ${NAVY_DARK}, ${NAVY})`, padding: '72px 20px' }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 32 }}>
            <span style={{
              display: 'inline-block', padding: '6px 18px', borderRadius: 999,
              background: 'rgba(244,196,48,0.12)', border: `1px solid rgba(244,196,48,0.3)`,
              color: GOLD, fontWeight: 700, fontSize: 13, marginBottom: 16,
            }}>🎓 التسجيل المجاني — الأماكن محدودة</span>
            <h2 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, color: '#fff', marginBottom: 8 }}>
              سجل الآن — واحجز مكانك قبل أن تمتلئ الأماكن
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>
              أكمل التسجيل في أقل من دقيقة — بدون أي تكلفة، بدون بيانات بنكية
            </p>
          </motion.div>

          {/* Urgency bar */}
          <motion.div {...fadeUp(0.05)} style={{
            background: 'rgba(229,57,53,0.12)', border: `1px solid ${RED}`,
            borderRadius: 10, padding: 14, marginBottom: 24, textAlign: 'center',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            <p style={{ color: '#EF5350', fontWeight: 700, fontSize: 13 }}>
              ⚠️ تبقّى فقط 11 مقعداً من أصل 50 — الأماكن تُملأ بسرعة
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            {...fadeUp(0.1)}
            style={{
              background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(244,196,48,0.2)`,
              borderRadius: 20, padding: '32px 24px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Name */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
                    الاسم الكامل <span style={{ color: RED }}>*</span>
                  </label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك كما في هويتك"
                    style={inputStyle(!!errors.name)}
                    onFocus={e => { e.target.style.borderColor = GOLD; e.target.style.boxShadow = `0 0 0 3px rgba(244,196,48,0.15)`; }}
                    onBlur={e => { e.target.style.borderColor = errors.name ? RED : 'rgba(244,196,48,0.3)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.name && <p style={{ color: RED, fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
                    البريد الإلكتروني <span style={{ color: RED }}>*</span>
                  </label>
                  <input
                    type="email" name="email" value={form.email} dir="ltr"
                    onChange={handleChange}
                    placeholder="your@email.com — ستصلك تفاصيل الورشة هنا"
                    style={{ ...inputStyle(!!errors.email), textAlign: 'right' }}
                    onFocus={e => { e.target.style.borderColor = GOLD; e.target.style.boxShadow = `0 0 0 3px rgba(244,196,48,0.15)`; }}
                    onBlur={e => { e.target.style.borderColor = errors.email ? RED : 'rgba(244,196,48,0.3)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.email && <p style={{ color: RED, fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
                    رقم الواتساب <span style={{ color: RED }}>*</span>
                  </label>
                  <input
                    type="tel" name="whatsapp" value={form.whatsapp} dir="ltr"
                    onChange={handleChange}
                    placeholder="+213 XXX XXX XXX — سنرسل رابط Zoom عبر واتساب"
                    style={{ ...inputStyle(!!errors.whatsapp), textAlign: 'right' }}
                    onFocus={e => { e.target.style.borderColor = GOLD; e.target.style.boxShadow = `0 0 0 3px rgba(244,196,48,0.15)`; }}
                    onBlur={e => { e.target.style.borderColor = errors.whatsapp ? RED : 'rgba(244,196,48,0.3)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.whatsapp && <p style={{ color: RED, fontSize: 12, marginTop: 4 }}>{errors.whatsapp}</p>}
                </div>

                {/* Business Type */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
                    نوع نشاطك <span style={{ color: RED }}>*</span>
                  </label>
                  <select
                    name="businessType" value={form.businessType}
                    onChange={handleChange}
                    style={{ ...inputStyle(!!errors.businessType), color: form.businessType ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', appearance: 'none' }}
                    onFocus={e => { e.target.style.borderColor = GOLD; e.target.style.boxShadow = `0 0 0 3px rgba(244,196,48,0.15)`; }}
                    onBlur={e => { e.target.style.borderColor = errors.businessType ? RED : 'rgba(244,196,48,0.3)'; e.target.style.boxShadow = 'none'; }}
                  >
                    <option value="" disabled style={{ background: NAVY_DARK }}>اختر نوع نشاطك — لنخصص المحتوى لك</option>
                    {BUSINESS_TYPES.map(t => (
                      <option key={t} value={t} style={{ background: NAVY_DARK }}>{t}</option>
                    ))}
                  </select>
                  {errors.businessType && <p style={{ color: RED, fontSize: 12, marginTop: 4 }}>{errors.businessType}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    ...goldBtn,
                    width: '100%', height: 56, borderRadius: 14, fontSize: 17,
                    border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: submitting ? 'none' : '0 8px 32px rgba(244,196,48,0.4)',
                    background: submitting ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`,
                    color: submitting ? 'rgba(255,255,255,0.4)' : NAVY_DARK,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                >
                  {submitting ? '⏳ جاري التسجيل...' : '🎓 سجل الآن — احجز مكانك المجاني ←'}
                </button>

                {/* Trust micro-text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['🔒 معلوماتك محمية ولن تُشارك مع أي جهة', '📅 رابط Zoom يصلك فور التسجيل عبر واتساب', '⚡ رد فوري خلال دقائق'].map((t, i) => (
                    <p key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, textAlign: 'center' }}>{t}</p>
                  ))}
                </div>
              </div>
            </form>
          </motion.div>

          {/* Guarantee */}
          <motion.div {...fadeUp(0.22)} style={{
            marginTop: 20, background: 'rgba(40,167,69,0.08)', border: '1px solid rgba(40,167,69,0.4)',
            borderRadius: 12, padding: 20, textAlign: 'center',
          }}>
            <p style={{ color: '#4ADE80', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🛡️ ضماننا الشخصي</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.7 }}>
              إذا انتهت الورشة ولم تستفد منها — أخبرنا وسنعطيك متابعة شخصية مجانية حتى تحصل على ما جئت تبحث عنه
            </p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 6 }}>Go LLC — نؤمن بما نقدمه</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{
        background: NAVY_DARK, borderTop: `1px solid rgba(244,196,48,0.12)`,
        padding: '28px 20px', textAlign: 'center',
      }}>
        <p style={{ color: GOLD, fontWeight: 900, fontSize: 15, marginBottom: 6 }}>Go LLC</p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
          © 2026 · جميع الحقوق محفوظة · ورشة البنوك الرقمية المجانية
        </p>
        <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: 11, marginTop: 4 }}>
          متخصصون في Business Setup والحلول المصرفية للمشاريع العربية
        </p>
      </footer>

      {/* ══════════════════════════════════════════
          FLOATING WHATSAPP
      ══════════════════════════════════════════ */}
      <a
        href="https://wa.me/213791789125?text=أريد حجز مكاني في ورشة البنوك الرقمية المجانية"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        style={{
          position: 'fixed', bottom: 20, left: 20, zIndex: 50,
          width: 56, height: 56, borderRadius: '50%',
          background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          transition: 'transform 0.2s',
          textDecoration: 'none',
        }}
        onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)'; }}
        onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; }}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ══════════════════════════════════════════
          STICKY MOBILE CTA
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
              background: 'rgba(10,22,40,0.97)',
              backdropFilter: 'blur(12px)',
              borderTop: `2px solid ${GOLD}`,
              padding: '12px 16px',
            }}
            className="md:hidden"
          >
            <a
              href="#registration"
              style={{
                ...goldBtn, display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', padding: '14px 0', borderRadius: 14, fontSize: 15,
                textDecoration: 'none', boxShadow: '0 4px 16px rgba(244,196,48,0.35)',
              }}
            >
              🎓 سجل الآن — مجاناً ←
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.78; }
        }
        select option { background: #0A1628; color: #fff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .hidden { display: none; }
        @media (min-width: 768px) { .md\\:hidden { display: none !important; } }
        @media (min-width: 640px) { .sm\\:inline { display: inline !important; } }
      `}</style>
    </div>
  );
}
