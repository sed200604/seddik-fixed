'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Phone, Trophy, Zap, Star } from 'lucide-react';

/* ─────────────────────────────────────────────────────
   Brand Palette (strict — no exceptions)
   Navy  : #0A1628  #1A3A52
   Gold  : #F4C430  #C49B1A  #D4A017
   White : #FFFFFF  #F8F9FA
   Status: #28A745 (green) · #E53935 (red)
───────────────────────────────────────────────────── */

/* ── Animation tokens ─────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

/* ── Data ────────────────────────────────────────────── */
const categories = [
  {
    icon: '🏦', title: 'فتح الحسابات البنكية',
    us:   'نفتح معك خطوة بخطوة بنسبة قبول عالية جداً',
    them: 'يفتحون لك الحساب — ثم تختفي منهم تماماً',
    tag:  'الأهم',
  },
  {
    icon: '🤝', title: 'الدعم بعد الخدمة',
    us:   'دعم مستمر على واتساب — رد في ساعات لا أيام',
    them: 'لا يوجد أي دعم — أنت وحدك بعد الدفع',
    tag:  'الأهم',
  },
  {
    icon: '📞', title: 'حل مشاكل البنوك',
    us:   'نتصل بالبنك نيابة عنك بالإنجليزي ونحل المشكلة 🔥',
    them: '"اتصل بالبنك بنفسك" — بالإنجليزي وحدك!',
    tag:  'الأهم',
  },
  {
    icon: '📚', title: 'التعليم والإرشاد',
    us:   'كتاب مجاني قيمته $97 + Checklist يومية للأمان',
    them: 'لا يوجد أي تعليم — تتعلم من خسائرك فقط',
    tag:  'الأهم',
  },
  {
    icon: '🎯', title: 'الخبرة في المشاكل',
    us:   'سنوات من حل مشاكل حقيقية موثقة بالنتائج',
    them: 'خبرة محدودة — يتركونك تواجه المشاكل وحدك',
    tag:  null,
  },
  {
    icon: '🔒', title: 'العلاقة معك',
    us:   'شراكة طويلة الأمد — نبقى معك حتى تنجح',
    them: 'معاملة واحدة وانتهى — مجرد زبون رقم',
    tag:  null,
  },
];

const stats = [
  { icon: <Trophy className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#F4C430' }} />, number: '100+', label: 'عميل ناجح' },
  { icon: <Zap    className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#F4C430' }} />, number: '48h',  label: 'متوسط حل المشاكل' },
  { icon: <Star   className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#F4C430' }} />, number: '5★',   label: 'تقييم Facebook' },
];

const features = [
  {
    badge: 'الميزة #1', emoji: '🤝', title: 'دعم مستمر — لا نتركك',
    featured: false,
    points: ['نبقى معك بعد فتح الحساب', 'واتساب مباشر لأي مشكلة', 'رد خلال ساعات لا أيام', 'نتابع معك حتى تنجح'],
    quote: '"Wise طلب مستندات بعد 3 أشهر. Go LLC ساعدوني نفس اليوم والحساب ما زال شغّال 🙌"',
    author: 'أحمد، الجزائر العاصمة',
  },
  {
    badge: '⭐ الميزة الأولى', emoji: '📞', title: 'نتصل بالبنك نيابة عنك',
    featured: true,
    points: ['فريقنا يتكلم إنجليزي بطلاقة', 'نفهم المشكلة ونحلها معك', 'نتابع مع البنك حتى الحل', 'نبلغك بالتحديثات بالعربي'],
    quote: '"Stripe قفل حسابي. Go LLC اتصلوا نيابة عني وشرحوا الموقف. رجع الحساب بعد 48 ساعة 🤲"',
    author: 'سارة، وهران',
  },
  {
    badge: 'قيمة مضافة', emoji: '📚', title: 'كتاب مجاني: تجنب الإغلاق',
    featured: false,
    points: ['10 أخطاء تسبب إغلاق الحسابات', 'كيف تتجنب كل خطأ بالتفصيل', 'ماذا تفعل لو حدثت مشكلة', 'Checklist يومية للأمان'],
    quote: '"الكتاب وحده يساوي أكثر من الخدمة — معلومات لا تجدها في أي مكان 📖"',
    author: 'يوسف، وهران',
  },
];

/* ── Component ───────────────────────────────────────── */
export default function WhyDifferent() {
  const [activeTab, setActiveTab] = useState<'us' | 'them'>('us');
  const [showBanner, setShowBanner] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowBanner(entry.isIntersecting),
      { threshold: 0.05, rootMargin: '-80px 0px -100px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        dir="rtl"
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: '#F8F9FA' }}
        aria-label="نحن vs الآخرون"
      >
        {/* Subtle gold glow — brand only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 right-1/3 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(244,196,48,0.07), transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(26,58,82,0.04), transparent 70%)' }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-10 relative z-10">

          {/* ── 1. Headline ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ ...stagger, hidden: {} }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full mb-6"
                style={{ background: 'rgba(244,196,48,0.12)', color: '#C49B1A', border: '1px solid rgba(244,196,48,0.35)' }}>
                ⚡ المقارنة الصادقة
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp}
              className="font-tajawal font-black text-4xl md:text-5xl mb-4 leading-tight"
              style={{ color: '#0A1628' }}>
              نحن{' '}
              <span style={{ color: '#E53935' }}>vs</span>{' '}
              <span style={{ color: '#F4C430' }}>الآخرون</span>
            </motion.h2>
            <motion.p variants={fadeUp}
              className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: '#4B5563' }}>
              الفرق ليس في الوثائق فقط —{' '}
              <span style={{ color: '#1A3A52' }} className="font-bold">نبقى معك بعد التأسيس 🤝</span>
            </motion.p>
          </motion.div>

          {/* ── 2. Stats ── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ ...stagger, hidden: {} }}
            className="grid grid-cols-3 gap-3 md:gap-5 mb-12"
          >
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(26,58,82,0.1), 0 0 0 3px rgba(244,196,48,0.35)' }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl p-6 text-center bg-white"
                style={{ border: '2px solid #F4C430', boxShadow: '0 4px 24px rgba(244,196,48,0.12)' }}>
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="font-tajawal font-black text-4xl mb-1"
                  style={{ color: '#1A3A52' }}>{s.number}</div>
                <div className="text-xs md:text-sm leading-snug" style={{ color: '#6B7280' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── 3. Sticky Tab Bar ── */}
          <div className="sticky top-[72px] z-30 mb-5">
            <motion.div
              initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl p-1.5 flex gap-2"
              style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(26,58,82,0.12)',
                boxShadow: '0 4px 24px rgba(26,58,82,0.1)',
              }}>
              {/* Us tab */}
              <motion.button
                onClick={() => setActiveTab('us')}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 min-h-[48px]"
                style={activeTab === 'us'
                  ? { background: 'linear-gradient(90deg, #C49B1A, #F4C430)', color: '#0A1628' }
                  : { background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                ✅ نحن (Go LLC)
              </motion.button>

              <div className="w-px self-stretch my-1" style={{ background: 'rgba(26,58,82,0.1)' }} />

              {/* Them tab */}
              <motion.button
                onClick={() => setActiveTab('them')}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 min-h-[48px]"
                style={activeTab === 'them'
                  ? { background: 'rgba(229,57,53,0.08)', color: '#E53935', border: '1px solid rgba(229,57,53,0.25)' }
                  : { background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>
                <X className="w-4 h-4 shrink-0" />
                ❌ الآخرون
              </motion.button>
            </motion.div>
          </div>

          {/* ── 4. Comparison Cards ── */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            variants={{ ...stagger, hidden: {} }}
            className="space-y-3 mb-16"
          >
            {categories.map((cat, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(26,58,82,0.12)' }}
                transition={{ duration: 0.2 }}
                className="relative bg-white"
                style={{ borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(26,58,82,0.07)' }}>

                {/* Floating tag */}
                {cat.tag && (
                  <span className="absolute font-black text-xs"
                    style={{
                      top: -10, insetInlineEnd: 16,
                      background: '#F4C430', color: '#0A1628',
                      padding: '4px 10px', borderRadius: 6,
                    }}>
                    ⭐ {cat.tag}
                  </span>
                )}

                {/* Row header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center text-xl shrink-0"
                    style={{ background: 'linear-gradient(135deg, #F4C430, #D4A017)', borderRadius: 10 }}>
                    {cat.icon}
                  </div>
                  <span className="font-bold text-base" style={{ color: '#1A3A52' }}>{cat.title}</span>
                </div>

                {/* Mobile: tab-driven */}
                <div className="md:hidden">
                  <AnimatePresence mode="wait">
                    {activeTab === 'us' ? (
                      <motion.div key={`us-${i}`}
                        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.22 }}
                        className="flex items-start gap-3 rounded-xl p-4"
                        style={{ background: '#F0FDF4', borderInlineStart: '4px solid #28A745' }}>
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#28A745' }} />
                        <p className="font-semibold text-sm leading-relaxed" style={{ color: '#1A3A52', lineHeight: 1.7 }}>{cat.us}</p>
                      </motion.div>
                    ) : (
                      <motion.div key={`them-${i}`}
                        initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}
                        className="flex items-start gap-3 rounded-xl p-4"
                        style={{ background: '#FEF2F2', borderInlineStart: '4px solid #E53935' }}>
                        <X className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#E53935' }} />
                        <p className="text-sm leading-relaxed" style={{ color: '#64748B', lineHeight: 1.7 }}>{cat.them}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop: side-by-side */}
                <div className="hidden md:grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 rounded-xl p-4"
                    style={{ background: '#F0FDF4', borderInlineStart: '4px solid #28A745' }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#28A745' }} />
                    <p className="font-semibold text-sm leading-relaxed" style={{ color: '#1A3A52', lineHeight: 1.7 }}>{cat.us}</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl p-4"
                    style={{ background: '#FEF2F2', borderInlineStart: '4px solid #E53935' }}>
                    <X className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#E53935' }} />
                    <p className="text-sm leading-relaxed" style={{ color: '#64748B', lineHeight: 1.7 }}>{cat.them}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── 5. Bottom Banner Badge ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <div className="inline-block font-bold text-sm md:text-base px-7 py-3.5 rounded-full"
              style={{
                background: '#1A3A52',
                color: '#F4C430',
                boxShadow: '0 4px 20px rgba(26,58,82,0.2)',
              }}>
              الفرق واضح: نحن لا نبيع خدمة — نبيع شراكة 💛
            </div>
          </motion.div>

          {/* ── 6. Feature Cards ── */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ ...stagger, hidden: {} }}
            className="grid md:grid-cols-3 gap-5 mb-20"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(26,58,82,0.14)' }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl overflow-hidden flex flex-col bg-white"
                style={f.featured
                  ? { border: '2px solid #F4C430', boxShadow: '0 4px 24px rgba(244,196,48,0.2)' }
                  : { border: '1px solid rgba(26,58,82,0.1)', boxShadow: '0 4px 24px rgba(26,58,82,0.06)' }}>

                {/* Featured top stripe */}
                {f.featured && (
                  <div className="px-5 py-2 text-center text-xs font-black"
                    style={{ background: 'linear-gradient(90deg, #C49B1A, #F4C430)', color: '#0A1628' }}>
                    ⭐ الميزة الأولى
                  </div>
                )}

                <div className="p-7 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{f.emoji}</span>
                    {!f.featured && (
                      <span className="text-[11px] font-black px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(26,58,82,0.08)', color: '#1A3A52' }}>
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-tajawal font-black text-lg md:text-xl mb-4"
                    style={{ color: '#0A1628' }}>{f.title}</h3>
                  <ul className="space-y-2.5">
                    {f.points.map((pt, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm"
                        style={{ color: '#4B5563' }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: '#28A745' }}>
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                <div className="px-5 py-4 border-t"
                  style={f.featured
                    ? { background: 'rgba(244,196,48,0.06)', borderColor: 'rgba(244,196,48,0.25)' }
                    : { background: '#F8F9FA', borderColor: 'rgba(26,58,82,0.08)' }}>
                  <p className="text-xs italic leading-relaxed mb-2"
                    style={{ color: '#6B7280' }}>&ldquo;{f.quote}&rdquo;</p>
                  <p className="text-xs font-bold" style={{ color: '#C49B1A' }}>— {f.author}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── 7. Story Timeline ── */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ ...stagger, hidden: {} }}
            className="mb-20"
          >
            <motion.div variants={fadeUp} className="text-center mb-10">
              <span className="inline-block font-bold text-sm px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(40,167,69,0.1)', color: '#28A745', border: '1px solid rgba(40,167,69,0.25)' }}>
                قصة نجاح حقيقية
              </span>
              <h3 className="font-tajawal font-black text-2xl md:text-3xl"
                style={{ color: '#0A1628' }}>
                &ldquo;كيف أنقذنا حساب محمد من الإغلاق&rdquo;
              </h3>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              {/* Avatar */}
              <motion.div variants={fadeUp}
                className="flex items-center gap-4 mb-8 justify-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0"
                  style={{ background: 'linear-gradient(135deg, #1A3A52, #0A1628)' }}>م</div>
                <div className="text-right">
                  <p className="font-bold text-base" style={{ color: '#0A1628' }}>محمد، قسنطينة</p>
                  <p className="text-sm" style={{ color: '#6B7280' }}>مستقل في التجارة الإلكترونية</p>
                </div>
              </motion.div>

              {/* Steps */}
              <div className="relative space-y-4">
                <div className="absolute right-5 top-5 bottom-5 w-px"
                  style={{ background: 'rgba(26,58,82,0.12)' }} />

                {[
                  {
                    bg: '#E53935', icon: '⚠️', label: 'المشكلة', labelColor: '#E53935',
                    cardBorder: 'rgba(229,57,53,0.2)', cardBg: 'rgba(229,57,53,0.03)',
                    content: (
                      <>
                        بعد 4 أشهر من فتح Wise Business، وصله:{' '}
                        <span className="font-bold px-1.5 rounded"
                          style={{ color: '#E53935', background: 'rgba(229,57,53,0.08)' }}>
                          &lsquo;Your account is under review&rsquo;
                        </span>
                        . في الحساب <strong style={{ color: '#0A1628' }}>$8,000</strong> من العملاء!
                      </>
                    ),
                  },
                  {
                    bg: '#F4C430', iconComp: <Phone className="w-4 h-4" style={{ color: '#0A1628' }} />,
                    label: 'ماذا فعلنا', labelColor: '#C49B1A',
                    cardBorder: 'rgba(244,196,48,0.3)', cardBg: 'rgba(244,196,48,0.04)',
                    content: (
                      <>
                        اتصل بنا الساعة 9 مساءً — رددنا خلال{' '}
                        <strong style={{ color: '#0A1628' }}>20 دقيقة</strong>.
                        اتصلنا بـ Wise فوراً، فهمنا المشكلة وجهّزنا المستندات.
                      </>
                    ),
                  },
                  {
                    bg: '#28A745', icon: '✅', label: 'النتيجة', labelColor: '#28A745',
                    cardBorder: 'rgba(40,167,69,0.3)', cardBg: 'rgba(40,167,69,0.04)',
                    content: (
                      <>
                        بعد <strong style={{ color: '#0A1628' }}>3 أيام</strong> رجع الحساب طبيعي!{' '}
                        <span className="font-black" style={{ color: '#28A745' }}>$8,000 آمنة 🙌</span>
                        <br />
                        <span className="text-xs" style={{ color: '#6B7280' }}>
                          الآخرون يعطون أوراق وداعاً. نحن نبقى معك حتى تنجح.
                        </span>
                      </>
                    ),
                  },
                ].map((step, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="relative flex gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base shrink-0 z-10 shadow-md"
                      style={{ background: step.bg }}>
                      {step.iconComp ?? step.icon}
                    </div>
                    <div className="flex-1 rounded-2xl p-4 md:p-5"
                      style={{
                        background: step.cardBg ?? '#FFFFFF',
                        border: `1px solid ${step.cardBorder ?? 'rgba(26,58,82,0.1)'}`,
                        boxShadow: '0 4px 16px rgba(26,58,82,0.06)',
                      }}>
                      <p className="text-xs font-black uppercase tracking-wider mb-2"
                        style={{ color: step.labelColor }}>{step.label}</p>
                      <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{step.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} className="text-center mt-8">
                <p className="text-sm mb-5" style={{ color: '#6B7280' }}>تريد نفس الدعم؟ فريق يبقى معك؟</p>
                <motion.a
                  href="#consultation"
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2 font-black text-base py-4 px-9 rounded-2xl"
                  style={{
                    background: 'linear-gradient(90deg, #C49B1A, #F4C430)',
                    color: '#0A1628',
                    boxShadow: '0 4px 16px rgba(244,196,48,0.3)',
                  }}>
                  نعم، أريد هذا الدعم ←
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* ── 8. Section CTA Block ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 md:p-14 text-center"
            style={{ background: '#1A3A52', border: '1px solid rgba(244,196,48,0.2)' }}
          >
            <h3 className="font-tajawal font-black text-2xl md:text-4xl text-white mb-4">
              الفرق واضح، أليس كذلك؟
            </h3>
            <div className="space-y-2 mb-8 text-base md:text-lg max-w-md mx-auto"
              style={{ color: 'rgba(255,255,255,0.82)' }}>
              <p>الآخرون يعطون خدمة —{' '}
                <span style={{ color: '#F4C430' }} className="font-semibold">نحن نعطي شراكة</span>
              </p>
              <p>الآخرون يتركونك —{' '}
                <span style={{ color: '#F4C430' }} className="font-semibold">نحن نبقى معك</span>
              </p>
              <p>الآخرون بلا خبرة —{' '}
                <span style={{ color: '#F4C430' }} className="font-semibold">نحن حللنا مئات المشاكل</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <motion.a href="#pricing"
                whileHover={{ y: -4, boxShadow: '0 12px 35px rgba(244,196,48,0.45)' }}
                whileTap={{ scale: 0.97 }} transition={{ duration: 0.25 }}
                className="flex flex-col items-center font-bold py-4 px-8 rounded-2xl min-h-[64px] justify-center"
                style={{ background: 'linear-gradient(90deg, #C49B1A, #F4C430)', color: '#0A1628' }}>
                <span className="text-2xl mb-0.5">🚀</span>
                <span className="text-base font-black">ابدأ مع الفريق الصحيح</span>
                <span className="text-xs opacity-70 mt-0.5">LLC + كتاب مجاني + دعم مدى الحياة</span>
              </motion.a>
              <motion.a href="#book"
                whileHover={{ y: -4, borderColor: 'rgba(244,196,48,0.5)' }}
                whileTap={{ scale: 0.97 }} transition={{ duration: 0.25 }}
                className="flex flex-col items-center text-white font-bold py-4 px-8 rounded-2xl min-h-[64px] justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(244,196,48,0.2)' }}>
                <span className="text-2xl mb-0.5">📚</span>
                <span className="text-base font-black">شاهد الكتاب المجاني</span>
                <span className="text-xs opacity-70 mt-0.5">تعرف على الأخطاء الشائعة</span>
              </motion.a>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              ✅ دعم مدى الحياة &nbsp;|&nbsp; ✅ نتصل بالبنك نيابة عنك &nbsp;|&nbsp; ✅ كتاب مجاني قيمته $97
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── Sticky Bottom Banner ── */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 inset-x-0 z-40 px-4 pb-4"
            dir="rtl"
          >
            <div className="max-w-2xl mx-auto rounded-2xl px-4 py-3.5 md:px-6 md:py-4 flex flex-col sm:flex-row items-center justify-between gap-3"
              style={{
                background: '#0A1628',
                border: '1px solid rgba(244,196,48,0.3)',
                boxShadow: '0 -4px 40px rgba(0,0,0,0.25)',
              }}>
              <p className="text-sm md:text-base font-semibold text-center sm:text-right leading-snug"
                style={{ color: 'rgba(255,255,255,0.88)' }}>
                الفرق واضح: نحن لا نبيع خدمة —{' '}
                <span style={{ color: '#F4C430' }} className="font-black">نبيع شراكة 💛</span>
              </p>
              <motion.a href="#consultation"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="shrink-0 font-black text-sm md:text-base py-3 px-6 rounded-xl whitespace-nowrap min-h-[48px] flex items-center"
                style={{ background: 'linear-gradient(90deg, #C49B1A, #F4C430)', color: '#0A1628' }}>
                احجز استشارة مجانية ←
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
