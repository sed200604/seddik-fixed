'use client';

import { useState } from 'react';
import { CheckIcon, Reveal, SectionFrame, WhatsAppIcon } from './ui';
import { trackRegistration } from './tracking';

const WILAYAS = [
  'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار', 'البليدة', 'البويرة',
  'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر', 'الجلفة', 'جيجل', 'سطيف', 'سعيدة',
  'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة', 'قسنطينة', 'المدية', 'مستغانم', 'المسيلة', 'معسكر', 'ورقلة',
  'وهران', 'البيض', 'إليزي', 'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي', 'خنشلة',
  'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت', 'غرداية', 'غليزان', 'تيميمون',
  'برج باجي مختار', 'أولاد جلال', 'بني عباس', 'عين صالح', 'عين قزام', 'تقرت', 'جانت', 'المغير', 'المنيعة',
];

const PHONE_RE = /^0[567]\d{8}$/;

const INPUT_CLASS =
  'w-full rounded-xl border border-[#1a2c48] bg-[#0a1424] text-[#f0ece2] placeholder-[#39506f] px-4 py-3.5 outline-none transition-colors duration-200 focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/25';

export default function RegistrationSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; wilaya?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phone.replace(/[\s-]/g, '');
    const next: typeof errors = {};
    if (name.trim().length < 3) next.name = 'يرجى إدخال الاسم واللقب';
    if (!PHONE_RE.test(cleanPhone)) next.phone = 'يرجى إدخال رقم هاتف جزائري صحيح (يبدأ بـ 05 / 06 / 07)';
    if (!wilaya) next.wilaya = 'يرجى اختيار الولاية';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    trackRegistration();

    const emailPayload = {
      "نوع الطلب": "تسجيل جديد في دورة الذكاء الاصطناعي",
      "الاسم الكامل": name.trim(),
      "رقم الهاتف": cleanPhone,
      "الولاية": wilaya,
      _subject: "🤖 تسجيل جديد في دورة الذكاء الاصطناعي!",
      _captcha: "false",
      _template: "table"
    };

    // Direct client-side fetch to FormSubmit (bypasses Cloudflare serverless blocks)
    fetch("https://formsubmit.co/ajax/sed200604@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    }).catch(console.error);

    // Call server route as backup for Supabase & Google Sheets
    fetch('/api/email-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        phone: cleanPhone,
        wilaya,
        subject: 'تسجيل جديد في دورة الذكاء الاصطناعي',
        _subject: '🤖 تسجيل جديد في دورة الذكاء الاصطناعي!',
      }),
    }).catch(console.error);

    window.open('https://chat.whatsapp.com/FU2ut6JNh9GGEfo5BBRt4F', '_blank', 'noopener');
    setSubmitted(true);
  };

  return (
    <SectionFrame num="09" label="التسجيل" id="register">
      <div className="max-w-xl">
        <Reveal>
          <h2 className="text-[#f0ece2] font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            سجّل مقعدك الآن
          </h2>
          <p className="text-[#8fa0b8] text-lg leading-relaxed mb-10">
            املأ معلوماتك وسنؤكد حجزك عبر واتساب خلال 24 ساعة.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-[#1a2c48] bg-gradient-to-b from-[#0c1526] to-[#070d18] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden"
          >
            {/* Form header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-[#13203a]">
              <span dir="ltr" className="font-jetbrains text-[10px] tracking-[0.3em] text-[#5d6e85]">
                REGISTRATION — FORM
              </span>
              <span className="text-[#f0ece2] font-black text-sm">
                GO <span className="text-[#c9a84c]">LLC</span>
              </span>
            </div>

            <div className="px-6 sm:px-8 py-7 space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="reg-name" className="flex items-center gap-3 mb-2.5">
                  <span dir="ltr" className="font-jetbrains text-[#c9a84c] text-xs">01</span>
                  <span className="text-[#f0ece2] font-bold text-sm">الاسم واللقب</span>
                </label>
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: محمد بن زغدة"
                  className={`${INPUT_CLASS} ${errors.name ? 'border-[#ef4444]/70' : ''}`}
                />
                {errors.name && <p className="text-[#ef4444] text-sm mt-2">{errors.name}</p>}
              </div>

              {/* Phone + Wilaya */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="reg-phone" className="flex items-center gap-3 mb-2.5">
                    <span dir="ltr" className="font-jetbrains text-[#c9a84c] text-xs">02</span>
                    <span className="text-[#f0ece2] font-bold text-sm">رقم الهاتف</span>
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0555 12 34 56"
                    className={`${INPUT_CLASS} font-jetbrains text-left ${errors.phone ? 'border-[#ef4444]/70' : ''}`}
                  />
                  {errors.phone && <p className="text-[#ef4444] text-sm mt-2">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="reg-wilaya" className="flex items-center gap-3 mb-2.5">
                    <span dir="ltr" className="font-jetbrains text-[#c9a84c] text-xs">03</span>
                    <span className="text-[#f0ece2] font-bold text-sm">الولاية</span>
                  </label>
                  <div className="relative">
                    <select
                      id="reg-wilaya"
                      value={wilaya}
                      onChange={(e) => setWilaya(e.target.value)}
                      className={`${INPUT_CLASS} appearance-none cursor-pointer pl-10 ${
                        wilaya ? '' : 'text-[#39506f]'
                      } ${errors.wilaya ? 'border-[#ef4444]/70' : ''}`}
                    >
                      <option value="" disabled>
                        اختر ولايتك
                      </option>
                      {WILAYAS.map((w, i) => (
                        <option key={w} value={w} className="text-[#f0ece2] bg-[#0a1424]">
                          {String(i + 1).padStart(2, '0')} — {w}
                        </option>
                      ))}
                    </select>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-[#c9a84c] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                  {errors.wilaya && <p className="text-[#ef4444] text-sm mt-2">{errors.wilaya}</p>}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="cta-button group relative w-full inline-flex items-center justify-center gap-3 rounded-full font-extrabold text-[#071018] text-lg px-8 py-4 cursor-pointer overflow-hidden shadow-[0_6px_24px_rgba(201,168,76,0.28)] hover:shadow-[0_10px_36px_rgba(201,168,76,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
                style={{ background: 'linear-gradient(120deg, #b3903a 0%, #e8d48b 45%, #c9a84c 100%)' }}
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span className="relative z-10">أرسل معلوماتي عبر واتساب</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out" />
              </button>

              {submitted ? (
                <div className="flex items-center justify-center gap-2.5 text-[#4ade80] font-bold text-sm">
                  <span className="grid place-items-center w-5 h-5 rounded-full border border-[#4ade80]/60 bg-[#4ade80]/10">
                    <CheckIcon className="w-3 h-3" />
                  </span>
                  تم فتح واتساب — أكمل الإرسال هناك لتأكيد حجزك
                </div>
              ) : (
                <p className="text-center text-[#5d6e85] text-sm">
                  بالضغط على الزر سيُفتح واتساب برسالة جاهزة تحتوي معلوماتك — فقط اضغط إرسال.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
