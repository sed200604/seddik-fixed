'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, Lock, AlertCircle, MessageCircle, Clock } from 'lucide-react';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import confetti from 'canvas-confetti';
import { submitLLCForm } from '@/lib/submitLLCForm';
import { submitTaxForm } from '@/lib/submitTaxForm';

type FormData = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  terms: boolean;
  goal: string;
  hasLlc: string;
  industry: string[];
  questions: string;
  timeline: string;
  budget: string;
};

const initialData: FormData = {
  name: '',
  email: '',
  countryCode: '+213',
  phone: '',
  terms: false,
  goal: '',
  hasLlc: '',
  industry: [],
  questions: '',
  timeline: '',
  budget: '',
};

const arabCountries = [
  { code: '+213', label: '🇩🇿 +213' },
  { code: '+20', label: '🇪🇬 +20' },
];

interface BookingFormProps {
  title?: string;
  subtitle?: string;
  isTaxFiling?: boolean;
}

export default function BookingForm({
  title = "احجز استشارتك المجانية",
  subtitle = "15 دقيقة لنناقش كيف نساعدك في تأسيس شركتك الأمريكية",
  isTaxFiling = false
}: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [spotsRemaining, setSpotsRemaining] = useState(7);

  useEffect(() => {
    // Spots remaining logic
    let spots = localStorage.getItem('spotsRemaining');
    if (!spots) {
      spots = String(Math.floor(Math.random() * 8) + 3); // Random 3-10
      localStorage.setItem('spotsRemaining', spots);
    }
    setSpotsRemaining(parseInt(spots));

    const decreaseInterval = (Math.random() * 600000) + 300000; // 5-15 min
    const timer = setInterval(() => {
      setSpotsRemaining(prev => {
        if (prev > 1) {
          const newSpots = prev - 1;
          localStorage.setItem('spotsRemaining', String(newSpots));
          return newSpots;
        }
        return prev;
      });
    }, decreaseInterval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step === 4) {
      // Google Ads - Purchase conversion event
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-17998077641/4fQOCNKq74McEMm9k4ZD',
          value: 1.0,
          currency: 'USD',
          transaction_id: '',
        });
      }
    }
  }, [step]);

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      setStep(4);
      triggerConfetti();
      window.scrollTo({ top: document.getElementById('booking')?.offsetTop! - 100, behavior: 'smooth' });
    }
  });

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const updateData = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
    const newErrors = { ...errors };
    Object.keys(fields).forEach(key => {
      delete newErrors[key as keyof FormData];
    });
    setErrors(newErrors);
  };

  const validateStep1 = () => {
    const newErrors: any = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = 'الرجاء إدخال الاسم الكامل';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'الرجاء إدخال بريد إلكتروني صحيح';
    if (!formData.phone || formData.phone.length < 9) newErrors.phone = 'الرجاء إدخال رقم هاتف صحيح';
    if (!formData.terms) newErrors.terms = 'الرجاء الموافقة على الشروط';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: any = {};
    if (!formData.goal) newErrors.goal = 'الرجاء اختيار الهدف';
    if (!formData.hasLlc) newErrors.hasLlc = 'الرجاء الإجابة على هذا السؤال';
    if (!isTaxFiling && formData.industry.length === 0) newErrors.industry = 'الرجاء اختيار مجال عملك';
    if (!formData.timeline) newErrors.timeline = 'الرجاء تحديد متى تخطط للبدء';
    if (!isTaxFiling && !formData.budget) newErrors.budget = 'الرجاء تحديد ميزانيتك المتوقعة';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2) {
      if (!validateStep2()) return;
      setIsLoading(true);

      try {
        if (isTaxFiling) {
          await submitTaxForm({
            name: formData.name,
            email: formData.email,
            countryCode: formData.countryCode,
            phone: formData.phone,
            goal: formData.goal,
            hasLlc: formData.hasLlc,
            timeline: formData.timeline,
          });
        } else {
          await submitLLCForm({
            name: formData.name,
            email: formData.email,
            countryCode: formData.countryCode,
            phone: formData.phone,
            goal: formData.goal,
            hasLlc: formData.hasLlc,
            industry: formData.industry,
            timeline: formData.timeline,
            budget: formData.budget,
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsLoading(false);
      }
    }

    setStep(prev => prev + 1);
    if (step === 3) {
      triggerConfetti();
    }
    window.scrollTo({ top: document.getElementById('booking')?.offsetTop! - 100, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: document.getElementById('booking')?.offsetTop! - 100, behavior: 'smooth' });
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        {[1, 2, 3, 4].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-gold text-navy shadow-[0_0_10px_rgba(244,196,48,0.5)]' : 'bg-light-gray text-medium-gray'
              }`}>
              {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
            {i < 3 && (
              <div className={`w-12 h-1 transition-colors ${step > s ? 'bg-gold' : 'bg-light-gray'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="w-full bg-light-gray rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-gold h-full"
          initial={{ width: 0 }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-center mt-2 text-sm text-medium-gray font-bold">
        {Math.round((step / 4) * 100)}% مكتمل
      </div>
    </div>
  );

  return (
    <section id="booking" className="py-24 relative overflow-hidden bg-gradient-to-b from-off-white to-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gold/5 blur-[100px]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-navy/5 blur-[100px]"
        />
      </div>

      <div className="max-w-[680px] mx-auto px-5 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-red-100 text-red-600 font-bold text-sm mb-4 border border-red-200 animate-pulse">
            <Clock className="w-4 h-4" />
            متبقي {spotsRemaining} أماكن فقط هذا الأسبوع
          </span>
          <h2 className="text-3xl md:text-5xl font-tajawal font-bold text-navy mb-4">{title}</h2>
          <p className="text-lg text-medium-gray">{subtitle}</p>
        </motion.div>

        {renderStepIndicator()}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 md:p-10 min-h-[500px] border border-white/50 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">👋</span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy">معلوماتك الأساسية</h3>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">الاسم الكامل *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => updateData({ name: e.target.value })}
                    className={`w-full p-4 border-2 rounded-lg outline-none transition-all ${errors.name ? 'border-red-500' : 'border-light-gray focus:border-gold'}`}
                    placeholder="أحمد محمد"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => updateData({ email: e.target.value })}
                    className={`w-full p-4 border-2 rounded-lg outline-none transition-all ${errors.email ? 'border-red-500' : 'border-light-gray focus:border-gold'}`}
                    placeholder="example@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">رقم الواتساب *</label>
                  <div className="flex gap-2" dir="ltr">
                    <select
                      value={formData.countryCode}
                      onChange={e => updateData({ countryCode: e.target.value })}
                      className="w-[120px] p-4 border-2 border-light-gray rounded-lg bg-off-white text-dark-gray outline-none focus:border-gold transition-colors cursor-pointer"
                      dir="ltr"
                    >
                      {arabCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => updateData({ phone: e.target.value })}
                      className={`flex-1 p-4 border-2 rounded-lg outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-light-gray focus:border-gold'}`}
                      placeholder="50 123 4567"
                      dir="ltr"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1 justify-end"><AlertCircle className="w-4 h-4" />{errors.phone}</p>}
                </div>

                <div className="pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative flex items-center justify-center mt-1">
                      <input
                        type="checkbox"
                        checked={formData.terms}
                        onChange={e => updateData({ terms: e.target.checked })}
                        className="peer appearance-none w-5 h-5 border-2 border-light-gray rounded checked:bg-gold checked:border-gold transition-colors"
                      />
                      <CheckCircle2 className="w-4 h-4 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100" />
                    </div>
                    <span className="text-sm text-medium-gray">
                      أوافق على <a href="#" className="text-navy underline hover:text-gold">سياسة الخصوصية</a> و <a href="#" className="text-navy underline hover:text-gold">شروط الخدمة</a>
                    </span>
                  </label>
                  {errors.terms && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.terms}</p>}
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-gold text-navy font-bold py-4 rounded-lg mt-6 hover:bg-[#FFD700] hover:-translate-y-0.5 transition-all shadow-md"
                >
                  التالي - الأسئلة التأهيلية →
                </button>

                <p className="text-center text-sm text-medium-gray flex items-center justify-center gap-1 mt-4">
                  <Lock className="w-4 h-4" /> معلوماتك آمنة ومحمية بالكامل
                </p>
              </motion.div>
            )}

            {/* STEP 2: Qualification */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <button onClick={handleBack} className="text-navy font-bold flex items-center gap-1 hover:text-gold transition-colors mb-4">
                  <ChevronRight className="w-5 h-5" /> رجوع
                </button>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-navy mb-2">لنجهز استشارتك بشكل أفضل 📊</h3>
                  <p className="text-medium-gray">أجب على بعض الأسئلة لنستطيع مساعدتك بشكل أفضل</p>
                </div>

                {/* Q1 */}
                <div>
                  <label className="block font-bold text-navy mb-3">
                    {isTaxFiling ? "ما هو هدفك الرئيسي من هذه الاستشارة؟ *" : "ما هو هدفك الرئيسي من تأسيس شركة LLC؟ *"}
                  </label>
                  <div className="space-y-2">
                    {(isTaxFiling ?
                      ['تقديم الإقرار الضريبي السنوي', 'استشارة حول الضرائب', 'لدي مشكلة مع الـ IRS', 'أخرى'] :
                      ['استقبال مدفوعات عالمية (Stripe, PayPal, Wise)', 'فتح حساب بنكي أمريكي (Mercury, Relay)', 'حماية قانونية لأصولي', 'مصداقية أمام العملاء']
                    ).map(option => (
                      <label key={option} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.goal === option ? 'border-gold bg-gold/5' : 'border-light-gray hover:border-gold/50'}`}>
                        <input type="radio" name="goal" value={option} checked={formData.goal === option} onChange={e => updateData({ goal: e.target.value })} className="hidden" />
                        <div className={`w-5 h-5 rounded-full border-2 ml-3 flex items-center justify-center ${formData.goal === option ? 'border-gold' : 'border-light-gray'}`}>
                          {formData.goal === option && <div className="w-2.5 h-2.5 bg-gold rounded-full" />}
                        </div>
                        <span className="text-dark-gray">{option}</span>
                      </label>
                    ))}
                  </div>
                  {errors.goal && <p className="text-red-500 text-sm mt-1">{errors.goal}</p>}
                </div>

                {/* Q2 */}
                <div>
                  <label className="block font-bold text-navy mb-3">هل لديك LLC أمريكية حالياً؟ *</label>
                  <div className="space-y-2">
                    {['نعم، لدي LLC', 'لا، أريد تأسيس واحدة', 'لست متأكداً'].map(option => (
                      <label key={option} className="flex items-center cursor-pointer">
                        <input type="radio" name="hasLlc" value={option} checked={formData.hasLlc === option} onChange={e => updateData({ hasLlc: e.target.value })} className="ml-2 accent-gold w-4 h-4" />
                        <span className="text-dark-gray">{option}</span>
                      </label>
                    ))}
                  </div>
                  {errors.hasLlc && <p className="text-red-500 text-sm mt-1">{errors.hasLlc}</p>}
                </div>

                {/* Q3 */}
                {!isTaxFiling && (
                  <div>
                    <label className="block font-bold text-navy mb-3">ما هو مجال عملك/مشروعك؟ *</label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {['تطوير برمجيات / تطبيقات', 'تصميم جرافيك / موشن', 'تجارة إلكترونية / دروبشيبينج', 'استشارات / خدمات مهنية', 'محتوى رقمي / يوتيوب', 'تسويق رقمي'].map(option => (
                        <label key={option} className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${formData.industry.includes(option) ? 'border-gold bg-gold/5' : 'border-light-gray hover:border-gold/50'}`}>
                          <input
                            type="checkbox"
                            checked={formData.industry.includes(option)}
                            onChange={e => {
                              const newInd = e.target.checked
                                ? [...formData.industry, option]
                                : formData.industry.filter(i => i !== option);
                              updateData({ industry: newInd });
                            }}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded border-2 ml-2 flex items-center justify-center ${formData.industry.includes(option) ? 'border-gold bg-gold' : 'border-light-gray'}`}>
                            {formData.industry.includes(option) && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          <span className="text-sm text-dark-gray">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                  </div>
                )}

                {/* Q4 */}
                <div className={`grid ${isTaxFiling ? 'grid-cols-1' : 'sm:grid-cols-2'} gap-6`}>
                  <div>
                    <label className="block font-bold text-navy mb-3">متى تخطط للبدء؟ *</label>
                    <select value={formData.timeline} onChange={e => updateData({ timeline: e.target.value })} className="w-full p-3 border-2 border-light-gray rounded-lg outline-none focus:border-gold">
                      <option value="">اختر...</option>
                      <option value="في أقرب وقت">في أقرب وقت</option>
                      <option value="خلال شهر">خلال شهر</option>
                      <option value="خلال 3 أشهر">خلال 3 أشهر</option>
                      <option value="مازلت أفكر">مازلت أفكر</option>
                    </select>
                    {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
                  </div>
                  {!isTaxFiling && (
                    <div>
                      <label className="block font-bold text-navy mb-3">ميزانيتك المتوقعة؟ *</label>
                      <select value={formData.budget} onChange={e => updateData({ budget: e.target.value })} className="w-full p-3 border-2 border-light-gray rounded-lg outline-none focus:border-gold">
                        <option value="">اختر...</option>
                        <option value="أقل من $500">أقل من $500</option>
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $2,000">$1,000 - $2,000</option>
                        <option value="أكثر من $2,000">أكثر من $2,000</option>
                      </select>
                      {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="w-full bg-gold text-navy font-bold py-4 rounded-lg mt-8 hover:bg-[#FFD700] hover:-translate-y-0.5 transition-all shadow-md flex justify-center items-center gap-2"
                >
                  {isLoading ? 'جاري التحميل... ⏳' : 'التالي - اختر الوقت 📅 →'}
                </button>
              </motion.div>
            )}

            {/* STEP 3: Calendly Embed */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <button onClick={handleBack} className="text-navy font-bold flex items-center gap-1 hover:text-gold transition-colors mb-4">
                  <ChevronRight className="w-5 h-5" /> رجوع
                </button>

                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-navy mb-2">اختر الوقت المناسب لك 📅</h3>
                  <p className="text-medium-gray">اختر التاريخ والوقت من التقويم أدناه</p>
                </div>

                <div className="rounded-xl overflow-hidden border border-light-gray">
                  <InlineWidget
                    url="https://calendly.com/sed200604/30min"
                    styles={{ height: '650px', width: '100%' }}
                    prefill={{
                      name: formData.name,
                      email: formData.email,
                      customAnswers: {
                        a1: `${formData.countryCode} ${formData.phone}`,
                        a2: formData.goal,
                        a3: formData.industry.join(', ')
                      }
                    }}
                  />
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-medium-gray mb-4">بعد اختيار الوقت وتأكيده في التقويم، سيتم نقلك تلقائياً للخطوة التالية.</p>
                  <button
                    onClick={handleNext}
                    className="text-navy font-bold underline hover:text-gold transition-colors"
                  >
                    تخطي هذه الخطوة (للتجربة)
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Thank You */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </motion.div>

                <div>
                  <h3 className="text-3xl font-bold text-navy mb-2">تم حجز استشارتك بنجاح! 🎉</h3>
                  <p className="text-medium-gray">سنرسل لك رسالة تأكيد على واتساب وبريدك الإلكتروني</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto">
                  <h4 className="font-bold text-navy mb-2 flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-500" /> تأكيد عبر واتساب
                  </h4>
                  <p className="text-sm text-medium-gray mb-4">احصل على تأكيد فوري وتذكير قبل الموعد بيوم واحد</p>
                  <a
                    href={`https://wa.me/213791789125?text=${encodeURIComponent(`مرحباً! أود تأكيد حجز استشارتي. الاسم: ${formData.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold py-3 rounded-lg hover:bg-[#1DA851] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" /> إرسال تأكيد واتساب
                  </a>
                </div>

                <div className="pt-4">
                  <a href="/" className="text-navy font-bold hover:text-gold transition-colors underline">
                    العودة للصفحة الرئيسية
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
