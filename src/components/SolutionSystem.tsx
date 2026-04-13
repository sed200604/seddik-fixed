'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronDown, Phone, FileText, CreditCard, BookOpen, DollarSign, Headphones } from 'lucide-react';

/* ─────────────────────────────────────────────────────
   Brand palette
   Navy  : #0A1628  #1A3A52
   Gold  : #F4C430  #C49B1A  #D4A017
   White : #FFFFFF  #F8F9FA
   Status: #28A745 (green) · #E53935 (red)
───────────────────────────────────────────────────── */

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
    visible: { transition: { staggerChildren: 0.1 } },
  },
} as const;

const fadeUpChild = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ── Solution cards data ─────────────────────────── */
type SolutionCard = {
  id: number;
  icon: React.ReactNode;
  badge?: string;
  title: string;
  subtitle: string;
  featured?: boolean;
  details: string[];
  result: string;
};

const solutions: SolutionCard[] = [
  {
    id: 1,
    icon: <FileText className="w-5 h-5" />,
    title: 'إعداد الإجابات الاحترافية',
    subtitle: 'نكتب لك ردوداً احترافية محكمة على كل سؤال يطرحه البنك',
    details: [
      'نصياغة إجابات دقيقة بالمصطلحات البنكية الصحيحة',
      'توثيق مصادر الدخل بأسلوب مقبول مصرفياً',
      'شرح طبيعة نشاطك التجاري بلغة واضحة ومقنعة',
      'تجنب الكلمات التي تُشغل خوارزميات الامتثال',
    ],
    result: '90% من العملاء يحتفظون بحساباتهم بعد تقديم الإجابات الصحيحة',
  },
  {
    id: 2,
    icon: <Phone className="w-5 h-5" />,
    badge: 'الأكثر طلباً',
    title: 'نتصل بالبنك نيابة عنك',
    subtitle: 'متحدثون أصليون باللغة الإنجليزية يتواصلون مع البنك مباشرة',
    featured: true,
    details: [
      'مكالمات مباشرة مع قسم المراجعة في البنك',
      'تقديم التوضيحات اللازمة بثقة ومهنية عالية',
      'التفاوض على استمرار الحساب أو استعادته',
      'متابعة القضية حتى الحل النهائي',
    ],
    result: 'معدل نجاح 95% في الحالات التي نتولى فيها التواصل المباشر',
  },
  {
    id: 3,
    icon: <CreditCard className="w-5 h-5" />,
    title: 'دعم مراجعة Stripe',
    subtitle: 'نساعدك على تجاوز المراجعة اليدوية في Stripe بنجاح',
    details: [
      'إعداد ملف كامل لنشاطك التجاري بالمستندات المطلوبة',
      'الإجابة على أسئلة Stripe بالطريقة المثلى',
      'توثيق معاملاتك وتدفقات الأموال بشكل صحيح',
      'تقليل مخاطر الإيقاف المستقبلي',
    ],
    result: '85% من عملائنا يعبرون المراجعة اليدوية في Stripe دون إغلاق',
  },
  {
    id: 4,
    icon: <BookOpen className="w-5 h-5" />,
    title: 'تعليم لغة البنك',
    subtitle: 'نعلّمك كيف تتحدث وتكتب بالأسلوب الذي يرضي البنوك الأمريكية',
    details: [
      'دليل شامل للمصطلحات البنكية الصحيحة',
      'الكلمات والعبارات التي يجب تجنبها تماماً',
      'كيفية وصف نشاطك التجاري بشكل آمن ومقبول',
      'نماذج جاهزة للرد على أي استفسار مصرفي',
    ],
    result: 'عملاؤنا المُدرَّبون يواجهون مشاكل بنكية أقل بنسبة 70%',
  },
  {
    id: 5,
    icon: <DollarSign className="w-5 h-5" />,
    title: 'خدمة استرداد الأموال',
    subtitle: 'نساعدك على استرداد أموالك المحتجزة بالطرق القانونية',
    details: [
      'تقييم وضعك وتحديد أفضل مسار للاسترداد',
      'إعداد الوثائق اللازمة للمطالبة القانونية',
      'التواصل مع قسم الامتثال في البنك للتفاوض',
      'متابعة عملية الاسترداد حتى الاكتمال',
    ],
    result: 'نجحنا في استرداد أموال أكثر من 60 عميل خلال آخر 12 شهراً',
  },
  {
    id: 6,
    icon: <Headphones className="w-5 h-5" />,
    title: 'دعم مدى الحياة',
    subtitle: 'فريق دعم متاح دائماً لأي مشكلة مستقبلية مع البنوك',
    details: [
      'واتساب مخصص للدعم السريع على مدار الساعة',
      'مراجعة دورية لوضع حسابك البنكي',
      'تحديثات فورية عند تغيير سياسات البنوك',
      'ضمان الاستمرارية — نحن معك على المدى البعيد',
    ],
    result: 'عملاؤنا يحتفظون بحساباتهم لفترة أطول بكثير من المتوسط',
  },
];

/* ── Before/After data ───────────────────────────── */
const comparisons = [
  {
    aspect: 'عند طلب توضيح من البنك',
    before: 'ذعر وردود عشوائية تزيد الشك',
    after: 'رد احترافي محضَّر مسبقاً يُزيل الشك',
  },
  {
    aspect: 'عند الإيقاف المفاجئ',
    before: 'فقدان الأموال والوقت بلا خطة',
    after: 'تدخل فوري وخطة استرداد واضحة',
  },
  {
    aspect: 'مراجعة Stripe اليدوية',
    before: 'إغلاق الحساب وخسارة الأموال',
    after: 'تجاوز المراجعة بملف احترافي كامل',
  },
  {
    aspect: 'التواصل مع البنك',
    before: 'حاجز لغوي وثقافي يُضاعف المشكلة',
    after: 'متحدثون أصليون يتفاوضون بدلاً عنك',
  },
];

/* ── Stats data ──────────────────────────────────── */
const stats = [
  { value: '95%', label: 'معدل نجاح الحالات' },
  { value: '14', label: 'يوم متوسط الحل' },
  { value: '+100', label: 'عميل تمت مساعدته' },
  { value: '5★', label: 'تقييم العملاء' },
];

/* ══════════════════════════════════════════════════ */
export default function SolutionSystem() {
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggle = (id: number) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <section
      dir="rtl"
      className="py-20 md:py-28"
      style={{ background: '#F8F9FA' }}
      aria-label="حلول Go LLC"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* ── Transition bridge ───────────────────── */}
        <motion.div {...fy(0)} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-6 text-sm font-bold"
            style={{ background: 'rgba(40,167,69,0.1)', color: '#1a7a32', border: '1px solid rgba(40,167,69,0.25)' }}
          >
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            الحل موجود — وهو أبسط مما تتخيل
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5 font-cairo"
            style={{ color: '#0A1628' }}
          >
            نظام متكامل{' '}
            <span style={{ color: '#28A745' }}>لحماية حسابك</span>{' '}
            وضمان استمراريته
          </h2>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#4B5563', lineHeight: 1.8 }}
          >
            بعد كل ما رأيته من مشاكل، إليك النظام الذي طوّرناه خصيصاً لحمايتك.
            كل خدمة مصمَّمة لتعالج مشكلة حقيقية يواجهها أصحاب الأعمال العرب.
          </p>
        </motion.div>

        {/* ── Solution cards grid ──────────────────── */}
        <motion.div
          {...staggerWrap}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {solutions.map(card => {
            const isOpen = expanded.includes(card.id);
            return (
              <motion.div
                key={card.id}
                variants={fadeUpChild}
                className="relative flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: '#FFFFFF',
                  border: card.featured ? '3px solid #F4C430' : '1px solid rgba(26,58,82,0.09)',
                  boxShadow: card.featured
                    ? '0 8px 32px rgba(244,196,48,0.18)'
                    : '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                {/* Featured pulse ring */}
                {card.featured && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(244,196,48,0.35)',
                        '0 0 0 10px rgba(244,196,48,0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}

                {/* Badge */}
                {card.badge && (
                  <div
                    className="absolute top-0 inset-inline-start-0 rounded-br-xl px-3 py-1.5 text-xs font-black"
                    style={{
                      background: 'linear-gradient(90deg, #C49B1A, #F4C430)',
                      color: '#0A1628',
                      insetInlineStart: 0,
                    }}
                  >
                    ⭐ {card.badge}
                  </div>
                )}

                {/* Card header (always visible) */}
                <button
                  onClick={() => toggle(card.id)}
                  className="w-full text-right p-6 flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ paddingTop: card.badge ? '2.5rem' : '1.5rem' }}
                  aria-expanded={isOpen}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 flex items-center justify-center shrink-0 text-white rounded-xl mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #1A3A52, #0A1628)' }}
                  >
                    {card.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-bold text-base leading-snug mb-1 font-cairo"
                      style={{ color: '#0A1628' }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 mt-1"
                    style={{ color: '#9CA3AF' }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* Expandable details */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div
                          className="h-px mb-4"
                          style={{ background: 'rgba(26,58,82,0.08)' }}
                        />
                        <ul className="space-y-2.5 mb-4">
                          {card.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#374151' }}>
                              <CheckCircle2
                                className="w-4 h-4 shrink-0 mt-0.5"
                                style={{ color: '#28A745' }}
                                aria-hidden="true"
                              />
                              {d}
                            </li>
                          ))}
                        </ul>
                        {/* Result badge */}
                        <div
                          className="rounded-xl p-3.5 text-sm font-medium leading-relaxed"
                          style={{
                            background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
                            border: '1.5px solid #10B981',
                            color: '#047857',
                          }}
                        >
                          ✅ {card.result}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Before / After comparison ────────────── */}
        <motion.div {...fy(0)} className="mb-20">
          <h3
            className="text-2xl md:text-3xl font-black text-center mb-10 font-cairo"
            style={{ color: '#0A1628' }}
          >
            قبل وبعد{' '}
            <span style={{ color: '#28A745' }}>Go LLC</span>
          </h3>

          {/* Header row */}
          <div className="grid grid-cols-3 gap-3 mb-3 text-center text-sm font-bold">
            <div className="rounded-xl py-3 px-4" style={{ background: 'rgba(26,58,82,0.07)', color: '#1A3A52' }}>
              الجانب
            </div>
            <div className="rounded-xl py-3 px-4" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
              ❌ بدون Go LLC
            </div>
            <div className="rounded-xl py-3 px-4" style={{ background: '#D1FAE5', color: '#065F46' }}>
              ✅ مع Go LLC
            </div>
          </div>

          {/* Comparison rows */}
          <motion.div {...staggerWrap} className="space-y-3">
            {comparisons.map((row, i) => (
              <motion.div
                key={i}
                variants={fadeUpChild}
                className="grid grid-cols-3 gap-3 items-stretch"
              >
                <div
                  className="rounded-xl p-4 text-sm font-semibold flex items-center"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(26,58,82,0.09)', color: '#1A3A52', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  {row.aspect}
                </div>
                <div
                  className="rounded-xl p-4 text-sm leading-relaxed flex items-center"
                  style={{ background: '#FEF2F2', borderInlineStart: '4px solid #E53935', color: '#991B1B' }}
                >
                  {row.before}
                </div>
                <div
                  className="rounded-xl p-4 text-sm leading-relaxed flex items-center"
                  style={{ background: '#F0FDF4', borderInlineStart: '4px solid #28A745', color: '#065F46' }}
                >
                  {row.after}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Stats grid ───────────────────────────── */}
        <motion.div {...staggerWrap} className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUpChild}
              whileHover={{
                y: -4,
                boxShadow: '0 8px 24px rgba(26,58,82,0.1), 0 0 0 3px rgba(244,196,48,0.35)',
              }}
              className="rounded-2xl p-6 text-center"
              style={{
                background: '#FFFFFF',
                border: '2px solid #F4C430',
                boxShadow: '0 4px 24px rgba(244,196,48,0.12)',
              }}
            >
              <div
                className="text-4xl font-black mb-2 font-cairo"
                style={{ color: '#1A3A52' }}
              >
                {s.value}
              </div>
              <div className="text-sm" style={{ color: '#6B7280' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Final CTA ────────────────────────────── */}
        <motion.div {...fy(0)} className="text-center">
          <div
            className="inline-block rounded-3xl px-8 py-10 md:px-16"
            style={{
              background: 'linear-gradient(180deg, #0A1628 0%, #1A3A52 100%)',
              border: '1px solid rgba(244,196,48,0.2)',
            }}
          >
            <h3
              className="text-2xl md:text-3xl font-black mb-3 font-cairo"
              style={{ color: '#FFFFFF' }}
            >
              جاهز لحماية حسابك؟
            </h3>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
              انضم إلى أكثر من 100 عميل نجحنا في مساعدتهم على حماية أعمالهم
            </p>

            <motion.a
              href="#booking"
              className="inline-flex items-center justify-center gap-3 rounded-2xl font-black text-lg px-10"
              style={{
                background: 'linear-gradient(90deg, #C49B1A, #F4C430)',
                color: '#0A1628',
                height: '56px',
                minWidth: '260px',
              }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(244,196,48,0.4)',
                  '0 0 0 16px rgba(244,196,48,0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              ابدأ الآن — احجز استشارتك المجانية
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            </motion.a>

            {/* Trust badges */}
            <div
              className="flex flex-wrap justify-center gap-6 mt-8 text-sm"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <span>✓ ضمان استرداد كامل</span>
              <span>✓ متاح 24/7 عبر واتساب</span>
              <span>✓ نتائج خلال 14 يوماً</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
