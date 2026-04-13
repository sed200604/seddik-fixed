'use client';
import { motion } from 'motion/react';
import { Mail, XCircle, CheckCircle2, Phone, AlertTriangle, BookOpen } from 'lucide-react';

/* ─────────────────────────────────────────────────────
   Brand palette (no teal / no mint / no orange / no blue)
   Navy  : #0A1628  #1A3A52
   Gold  : #F4C430  #C49B1A
   White : #FFFFFF  #F8F9FA
   Status: #28A745 (green) · #E53935 (red)
───────────────────────────────────────────────────── */

/* ── Animation tokens ─────────────────────────────── */
const fy = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const, margin: '-50px' },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay },
});
const staggerWrap = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true as const, margin: '-50px' },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  },
} as const;
const fadeUpChild = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ── Micro atoms ──────────────────────────────────── */
function WrongPill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 w-full"
      style={{ background: '#FEE2E2', border: '1px solid #FECACA' }}>
      <XCircle className="w-4 h-4 shrink-0" style={{ color: '#E53935' }} aria-hidden="true" />
      <span className="text-sm font-medium font-mono" style={{ color: '#B91C1C' }}>{text}</span>
    </div>
  );
}
function CorrectAnswerBox({ text }: { text: string }) {
  return (
    <div className="rounded-xl p-5"
      style={{ background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)', border: '2px solid #10B981' }}>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#065F46' }} aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#065F46' }}>الإجابة الصحيحة (مع Go LLC):</span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: '#047857', lineHeight: 1.7 }}>{text}</p>
    </div>
  );
}
function GoldBadge({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs font-black rounded px-2.5 py-1"
      style={{ background: '#F4C430', color: '#0A1628' }}>
      {label}
    </span>
  );
}
function SectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
      style={{ background: 'rgba(229,57,53,0.15)', color: '#fca5a5', border: '1px solid rgba(229,57,53,0.3)' }}>
      {text}
    </span>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — Dark gradient  ·  Cards 1 & 2
══════════════════════════════════════════════════════ */
function Section1() {
  return (
    <div className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A1628 0%, #1A3A52 100%)' }}>
      {/* Gold glow top-right */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #F4C430, transparent 70%)' }} />
      {/* Red glow bottom-left */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #E53935, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10">

        {/* Headline */}
        <motion.div {...fy(0)} className="text-center mb-14">
          <SectionLabel text="⚠️ الحقيقة التي لا يخبرك بها أحد" />
          <h2 className="text-3xl md:text-5xl font-tajawal font-black leading-tight mb-4"
            style={{ color: '#F4C430' }}>
            لماذا تُغلق حسابات 80% من الجزائريين؟
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.82)' }}>
            البنوك لا تُغلق حساباتك لأنها شريرة...<br />
            بل لأنك لا تعرف كيف تتكلم &ldquo;لغتها&rdquo;
          </p>
        </motion.div>

        {/* Two cards side-by-side */}
        <motion.div {...staggerWrap}
          className="grid md:grid-cols-2 gap-6">
          <motion.div variants={fadeUpChild} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
            <CardBankQuestions />
          </motion.div>
          <motion.div variants={fadeUpChild} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
            <CardNightmare />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

/* Card 1 — Bank Questions ─────────────────────────── */
function CardBankQuestions() {
  return (
    <article className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)', borderTop: '5px solid #E53935' }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <GoldBadge label="#1" />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#E53935' }}>المشكلة</span>
        </div>
        <h3 className="text-xl font-bold leading-snug" style={{ color: '#0A1628' }}>
          البنك يسألك 3 أسئلة بسيطة... وتُجيب خطأ
        </h3>
      </div>

      {/* Email mockup */}
      <div className="mx-6 mt-5 rounded-xl overflow-hidden border border-gray-200"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div className="px-4 py-2.5 flex items-center gap-3 border-b border-gray-200"
          style={{ background: '#F3F4F6' }}>
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#EF4444' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F59E0B' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#22C55E' }} />
          </div>
          <span className="font-mono text-xs font-semibold" style={{ color: '#1A3A52' }}>Account Verification — Mercury Bank</span>
        </div>
        <div className="px-4 py-4 font-mono text-xs leading-relaxed" style={{ background: '#FFFFFF', color: '#374151' }}>
          <p className="mb-2 font-semibold">Dear Customer,</p>
          <p className="mb-3 text-gray-500">Please answer within <span className="font-bold text-gray-800">48 hours</span>:</p>
          <ol className="list-decimal list-inside space-y-1.5">
            <li>What is the source of funds?</li>
            <li>What is your business activity?</li>
            <li>Why the recent large deposit?</li>
          </ol>
          <p className="mt-3 text-xs" style={{ color: '#E53935' }}>Failure to respond = Account closure.</p>
        </div>
      </div>

      {/* Wrong answers */}
      <div className="px-6 mt-5">
        <p className="text-xs font-bold mb-2.5 uppercase tracking-wider" style={{ color: '#6B7280' }}>إجاباتك الخاطئة ❌</p>
        <div className="space-y-2">
          <WrongPill text='"From my online business"' />
          <WrongPill text='"E-commerce"' />
          <WrongPill text='"From a big sale"' />
        </div>
      </div>

      {/* Closed alert */}
      <div className="mx-6 mt-4 rounded-xl px-4 py-3 flex items-center gap-3"
        style={{ background: 'linear-gradient(90deg, #DC2626, #B91C1C)' }}>
        <XCircle className="w-5 h-5 text-white shrink-0" aria-hidden="true" />
        <div>
          <p className="text-white font-bold text-sm">Account Permanently Closed</p>
          <p className="text-white/85 text-xs mt-0.5">Funds held: 90–180 days</p>
        </div>
      </div>

      {/* Right answer */}
      <div className="px-6 mt-4">
        <CorrectAnswerBox text='"Revenue from verified Shopify store selling consumer electronics. All transactions processed through Stripe with full documentation including receipts and supplier invoices."' />
      </div>

      {/* Stat strip */}
      <div className="mx-6 my-5 rounded-xl px-4 py-3 grid grid-cols-2 gap-2 border"
        style={{ borderColor: '#F4C430', background: '#FFFBEB' }}>
        <div className="text-center">
          <p className="text-3xl font-black" style={{ color: '#E53935' }}>67%</p>
          <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>يخسرون حساباتهم</p>
        </div>
        <div className="text-center border-r border-gray-200">
          <p className="text-3xl font-black" style={{ color: '#28A745' }}>0%</p>
          <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>خسائر مع Go LLC</p>
        </div>
      </div>
    </article>
  );
}

/* Card 2 — The Nightmare ──────────────────────────── */
function CardNightmare() {
  const bankCalls = [
    '"Please wait 90 days"',
    '"We cannot provide more information"',
    '"There\'s nothing we can do"',
    'Automated message… hangs up.',
  ];
  return (
    <article className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)', borderTop: '5px solid #E53935' }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <GoldBadge label="#2" />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#E53935' }}>الكابوس</span>
        </div>
        <h3 className="text-xl font-bold leading-snug" style={{ color: '#0A1628' }}>
          أُغلق حسابك... $10,000 محجوزة... ماذا الآن؟
        </h3>
      </div>

      {/* Alert banner */}
      <div className="mx-6 mt-5 rounded-xl px-4 py-3"
        style={{ background: 'linear-gradient(90deg, #DC2626, #B91C1C)' }}>
        <p className="text-white font-bold text-sm">&ldquo;Your account has been permanently closed.&rdquo;</p>
        <p className="text-white/85 text-xs mt-1">Funds will be held for 90–180 days pending review.</p>
      </div>

      {/* Consequences grid */}
      <div className="px-6 mt-4 grid grid-cols-2 gap-2">
        {['$10,000 عالقة', 'عملاء ينتظرون', 'فواتير متأخرة', 'مشروع يتوقف'].map(item => (
          <div key={item} className="rounded-lg px-3 py-2 text-xs font-semibold text-center"
            style={{ background: 'rgba(229,57,53,0.07)', color: '#c62828', border: '1px solid rgba(229,57,53,0.2)' }}>
            ❌ {item}
          </div>
        ))}
      </div>

      {/* Bank calls */}
      <div className="px-6 mt-5">
        <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: '#6B7280' }}>تتصل بالبنك...</p>
        <div className="space-y-3">
          {bankCalls.map((call, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white"
                style={{ background: '#9CA3AF' }}>{i + 1}</div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: '#9CA3AF' }} aria-hidden="true" />
                <span className="text-sm text-gray-600 font-mono">{call}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Go LLC timeline */}
      <div className="px-6 mt-5">
        <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: '#6B7280' }}>ما نفعله نحن — نفس اليوم:</p>
        <div className="space-y-2">
          {[
            { badge: 'Hour 1', text: 'نحدد السبب الحقيقي للإغلاق' },
            { badge: 'Hour 3', text: 'نُقدم طعناً رسمياً للبنك' },
            { badge: 'Day 2',  text: 'نتابع مع فريق الاستئناف' },
            { badge: 'Day 14', text: 'متوسط استرداد الحساب' },
          ].map(s => (
            <div key={s.badge} className="flex items-center gap-3">
              <span className="shrink-0 text-xs font-black rounded px-2.5 py-1"
                style={{ background: '#F4C430', color: '#0A1628' }}>{s.badge}</span>
              <p className="text-sm" style={{ color: '#374151' }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Real case */}
      <div className="mx-6 my-5 rounded-xl px-4 py-3 border-r-4"
        style={{ borderRightColor: '#F4C430', background: '#FFFBEB' }}>
        <p className="text-xs font-bold mb-1" style={{ color: '#C49B1A' }}>حالة حقيقية:</p>
        <p className="text-sm" style={{ color: '#374151' }}>Mercury أغلق حساب عميل + <strong>$15,000 محجوزة.</strong></p>
        <p className="text-sm mt-1 font-bold" style={{ color: '#28A745' }}>بدوننا: 180 يوم — معنا: 19 يوم ✅</p>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — Light  ·  Knowledge gap + Word swaps + PDF
══════════════════════════════════════════════════════ */
function Section2() {
  const swaps = [
    { wrong: '"online business"',   right: '"verified e-commerce operations"' },
    { wrong: '"from sales"',        right: '"documented revenue stream"' },
    { wrong: '"I sell products"',   right: '"fulfillment-based retail model"' },
  ];

  return (
    <div className="py-24" style={{ background: '#F8F9FA' }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10">

        {/* Headline */}
        <motion.div {...fy(0)} className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(244,196,48,0.15)', color: '#C49B1A', border: '1px solid rgba(244,196,48,0.4)' }}>
            💡 الحقيقة البسيطة
          </span>
          <h2 className="text-3xl md:text-4xl font-tajawal font-black mb-4" style={{ color: '#0A1628' }}>
            أنت لا تعرف... ولا عيب في هذا
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#4B5563', lineHeight: 1.7 }}>
            البنوك تتحدث لغة متخصصة يتعلمها Compliance Officers لسنوات — أنت رجل أعمال، لا يُتوقع منك معرفتها.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Knowledge gap columns */}
          <motion.div {...fy(0)}>
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white"
              style={{ boxShadow: '0 4px 20px rgba(26,58,82,0.08)' }}>
              <div className="grid grid-cols-2">
                <div className="px-5 py-4 border-b border-gray-100"
                  style={{ background: 'rgba(40,167,69,0.06)', borderBottom: '2px solid #28A745' }}>
                  <p className="font-black text-sm" style={{ color: '#28A745' }}>أنت تعرف ✅</p>
                </div>
                <div className="px-5 py-4 border-b border-gray-100 border-r"
                  style={{ background: 'rgba(229,57,53,0.06)', borderBottom: '2px solid #E53935' }}>
                  <p className="font-black text-sm" style={{ color: '#E53935' }}>لا تعرف ❌</p>
                </div>
              </div>
              {[
                ['كيف تبيع',          '"لغة البنوك"'],
                ['كيف تسوّق',         'compliance terms'],
                ['كيف تُدير business', 'risk language'],
              ].map(([know, dontKnow], i) => (
                <div key={i} className="grid grid-cols-2 border-b border-gray-100 last:border-0">
                  <div className="px-5 py-3.5 text-sm font-medium" style={{ color: '#1A3A52' }}>✅ {know}</div>
                  <div className="px-5 py-3.5 text-sm font-medium border-r border-gray-100" style={{ color: '#E53935' }}>❌ {dontKnow}</div>
                </div>
              ))}
            </div>
            <p className="text-center mt-4 text-sm font-semibold" style={{ color: '#6B7280' }}>
              هذه لغة متخصصة — لا عيب في عدم معرفتها!
            </p>
          </motion.div>

          {/* Word swaps + PDF */}
          <motion.div {...fy(0.1)} className="space-y-5">
            <div className="rounded-2xl bg-white p-6 border border-gray-200"
              style={{ boxShadow: '0 4px 20px rgba(26,58,82,0.08)' }}>
              <p className="text-sm font-black mb-4 uppercase tracking-wider" style={{ color: '#1A3A52' }}>
                الفرق في 3 كلمات:
              </p>
              <div className="space-y-3">
                {swaps.map((s, i) => (
                  <div key={i} className="space-y-1">
                    <div className="px-3 py-2.5 flex items-center gap-2 rounded-lg"
                      style={{ background: '#FEF2F2', borderInlineStart: '4px solid #E53935' }}>
                      <XCircle className="w-3.5 h-3.5 shrink-0" style={{ color: '#E53935' }} aria-hidden="true" />
                      <span className="text-xs font-mono" style={{ color: '#B91C1C' }}>{s.wrong}</span>
                    </div>
                    <div className="px-3 py-2.5 flex items-center gap-2 rounded-lg"
                      style={{ background: '#F0FDF4', borderInlineStart: '4px solid #28A745' }}>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: '#28A745' }} aria-hidden="true" />
                      <span className="text-xs font-mono" style={{ color: '#166534' }}>{s.right}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PDF offer */}
            <div className="rounded-2xl p-6"
              style={{ background: '#1A3A52', border: '1px solid rgba(244,196,48,0.35)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C49B1A, #F4C430)' }}>
                  <BookOpen className="w-6 h-6" style={{ color: '#0A1628' }} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-black text-base mb-1" style={{ color: '#F4C430' }}>&ldquo;Bank Language Playbook&rdquo;</p>
                  <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    50 كلمة خضراء · 50 كلمة حمراء · 20 قالب جاهز
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm line-through" style={{ color: 'rgba(255,255,255,0.45)' }}>$97</span>
                    <span className="font-black text-base" style={{ color: '#28A745' }}>مجاناً لعملاء Go LLC ✅</span>
                  </div>
                </div>
              </div>
              <motion.a href="#contact" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="mt-4 flex items-center justify-center w-full py-3 rounded-xl text-sm font-black"
                style={{ background: 'linear-gradient(135deg, #C49B1A, #F4C430)', color: '#0A1628' }}>
                احصل على الـ Playbook مجاناً ←
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — Light card  ·  Stripe Manual Review
══════════════════════════════════════════════════════ */
function Section3() {
  const questions = [
    'Describe your business model in detail',
    'Customer acquisition channels',
    'Chargeback prevention methods',
    'Fraud detection systems',
    'Customer verification process',
    'Refund policy details',
  ];

  return (
    <div className="py-24" style={{ background: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto px-5 md:px-10">

        <motion.article {...fy(0)} className="rounded-2xl overflow-hidden border-2"
          style={{ borderColor: '#1A3A52', boxShadow: '0 4px 20px rgba(26,58,82,0.12)' }}>

          {/* Card header */}
          <div className="px-7 pt-7 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <GoldBadge label="#3" />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#1A3A52' }}>Stripe</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-tajawal font-black" style={{ color: '#0A1628' }}>
              Stripe Manual Review: 95% يفشلون — هل أنت جاهز؟
            </h2>
          </div>

          {/* Gold warning banner */}
          <div className="px-7 py-4 flex items-start gap-3"
            style={{ background: '#F4C430' }}>
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#0A1628' }} aria-hidden="true" />
            <div>
              <p className="font-black text-sm" style={{ color: '#0A1628' }}>⚠️ Manual Review Required</p>
              <p className="text-xs mt-0.5" style={{ color: '#1A3A52' }}>Complete questionnaire within 72h — Failure to comply = Account closure.</p>
            </div>
          </div>

          <div className="px-7 py-6 grid md:grid-cols-2 gap-8">

            {/* Questions list */}
            <div>
              <p className="text-xs font-black mb-3 uppercase tracking-wider" style={{ color: '#6B7280' }}>
                الاستبيان — 12 سؤالاً صعباً:
              </p>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                {questions.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 last:border-0"
                    style={{ background: i % 2 === 0 ? '#F8F9FA' : '#FFFFFF' }}>
                    <span className="shrink-0 w-7 h-7 flex items-center justify-center text-xs font-black"
                      style={{ background: 'linear-gradient(135deg, #F4C430, #D4A017)', color: '#0A1628', borderRadius: 8 }}>{i + 1}</span>
                    <span className="text-xs text-gray-700 font-mono">{q}</span>
                  </div>
                ))}
                <div className="px-4 py-3 text-xs italic text-gray-400 font-mono"
                  style={{ background: '#F8F9FA' }}>+ 6 more complex questions...</div>
              </div>
            </div>

            {/* Stats + Example */}
            <div className="space-y-5">

              {/* Stats grid */}
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-5 text-center border-r border-gray-200"
                    style={{ background: 'rgba(229,57,53,0.05)' }}>
                    <p className="text-4xl font-black" style={{ color: '#E53935' }}>95%</p>
                    <p className="text-xs font-bold mt-1" style={{ color: '#E53935' }}>يفشلون بدون مساعدة</p>
                  </div>
                  <div className="px-4 py-5 text-center"
                    style={{ background: 'rgba(40,167,69,0.05)' }}>
                    <p className="text-4xl font-black" style={{ color: '#28A745' }}>95%</p>
                    <p className="text-xs font-bold mt-1" style={{ color: '#28A745' }}>ينجحون مع Go LLC</p>
                  </div>
                </div>
              </div>

              {/* Q&A example */}
              <div>
                <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#6B7280' }}>
                  مثال: &ldquo;Chargeback prevention methods?&rdquo;
                </p>
                <WrongPill text='"We have good customer service" — FAIL' />
                <div className="mt-2 rounded-xl px-3 py-2.5 text-xs leading-relaxed"
                  style={{ background: 'rgba(40,167,69,0.08)', color: '#1a5c2a', border: '1px solid rgba(40,167,69,0.25)' }}>
                  <CheckCircle2 className="w-3.5 h-3.5 inline ml-1" style={{ color: '#28A745' }} aria-hidden="true" />
                  <strong>مع Go LLC:</strong> AVS/CVV + Fraud.net + chargeback rate 0.3% — <strong>PASS ✅</strong>
                </div>
              </div>

              <div className="rounded-xl py-3 text-center font-black text-sm"
                style={{ background: 'rgba(40,167,69,0.08)', color: '#28A745', border: '1px solid rgba(40,167,69,0.2)' }}>
                نحن لا ندعك تفشل ✅
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — Dark navy  ·  The Math + CTA
══════════════════════════════════════════════════════ */
function Section4() {
  return (
    <div className="py-24" style={{ background: '#0A1628' }}>
      <div className="max-w-4xl mx-auto px-5 md:px-10">

        <motion.div {...fy(0)} className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(244,196,48,0.12)', color: '#F4C430', border: '1px solid rgba(244,196,48,0.3)' }}>
            الحساب البسيط
          </span>
          <h2 className="text-3xl md:text-4xl font-tajawal font-black mb-3" style={{ color: '#FFFFFF' }}>
            كم يكلفك{' '}
            <span style={{ color: '#E53935' }}>الجهل</span>
            {' '}مقارنةً بـ
            <span style={{ color: '#28A745' }}>الاحترافية</span>؟
          </h2>
        </motion.div>

        {/* Comparison card */}
        <motion.div {...fy(0.1)} className="rounded-3xl overflow-hidden mb-8"
          style={{ background: '#FFFBEB', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
          <div className="grid md:grid-cols-2">
            {/* Go LLC column */}
            <div className="p-7 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 mb-5"
                style={{ background: 'rgba(40,167,69,0.1)', border: '1px solid rgba(40,167,69,0.25)' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: '#28A745' }} aria-hidden="true" />
                <span className="font-black text-sm" style={{ color: '#28A745' }}>مع Go LLC</span>
              </div>
              <ul className="space-y-3">
                {[
                  '5% فقط معدل الإغلاق',
                  'متوسط الخسارة: $0',
                  'استرداد الحساب: 14–30 يوم',
                  'راحة بال لا تُقدر بثمن',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: '#374151' }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#28A745' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Without column */}
            <div className="p-7">
              <div className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 mb-5"
                style={{ background: 'rgba(229,57,53,0.08)', border: '1px solid rgba(229,57,53,0.25)' }}>
                <XCircle className="w-4 h-4" style={{ color: '#E53935' }} aria-hidden="true" />
                <span className="font-black text-sm" style={{ color: '#E53935' }}>بدون إجابات احترافية</span>
              </div>
              <ul className="space-y-3">
                {[
                  '80% معدل إغلاق الحسابات',
                  'متوسط الخسارة: $5,000–$15,000',
                  'وقت الاسترداد: 90–180 يوم',
                  'ضغط نفسي لا يُقاس',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: '#374151' }}>
                    <XCircle className="w-4 h-4 shrink-0" style={{ color: '#E53935' }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fy(0.15)} className="text-center">
          <motion.a
            href="#contact"
            animate={{ boxShadow: ['0 0 0 0 rgba(244,196,48,0.4)', '0 0 0 16px rgba(244,196,48,0)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center w-full max-w-lg mx-auto rounded-2xl text-lg font-black"
            style={{
              background: 'linear-gradient(90deg, #C49B1A, #F4C430)',
              color: '#0A1628',
              height: '56px',
            }}
          >
            احمِ حسابك — تعلّم اللغة الصحيحة الآن ←
          </motion.a>

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            {[
              '✅ قوالب جاهزة',
              '✅ نتصل بالبنك نيابةً عنك',
              '✅ معدل نجاح 95%',
              '✅ Playbook مجاناً',
            ].map(b => (
              <span key={b} className="text-xs font-semibold"
                style={{ color: 'rgba(255,255,255,0.88)' }}>{b}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════ */
export default function ProblemSolution() {
  return (
    <div id="about" dir="rtl" aria-label="لماذا تُغلق البنوك الحسابات">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}
