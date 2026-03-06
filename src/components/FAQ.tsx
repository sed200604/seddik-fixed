'use client';
import { useState } from 'react';
import { Plus, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface FAQCategory {
  category: string;
  questions: { q: string; a: string }[];
}

const defaultFaqData: FAQCategory[] = [
  {
    category: "أسئلة عامة",
    questions: [
      { q: "ما الفرق بين Wyoming و New Mexico و Delaware؟", a: "Wyoming ممتازة للخصوصية والرسوم المنخفضة. Delaware مفضلة للشركات التي تبحث عن استثمارات. New Mexico الأرخص من حيث الرسوم السنوية. ننصح بـ Wyoming لمعظم الأعمال الرقمية." },
      { q: "هل الخدمة قانونية 100%؟", a: "نعم، تماماً. نحن نعمل مع Registered Agents مرخصين ونتبع كل القوانين الأمريكية الفيدرالية وقوانين الولايات." },
      { q: "هل أحتاج إلى تجديد الشركة سنوياً؟", a: "نعم، تتطلب جميع الولايات تجديداً سنوياً (Annual Report) ودفع رسوم للولاية للحفاظ على نشاط الشركة. نحن نذكرك بذلك قبل الموعد." }
    ]
  },
  {
    category: "التأسيس والإجراءات",
    questions: [
      { q: "هل يجب أن أسافر إلى أمريكا؟", a: "لا، إطلاقاً! كل شيء يتم عن بُعد 100%. نحن نتكفل بكل الإجراءات نيابة عنك." },
      { q: "كم يستغرق تأسيس الشركة؟", a: "عادة 5-7 أيام عمل من تاريخ تقديم كل المعلومات. في بعض الحالات قد يستغرق 10 أيام حسب ضغط العمل في الولاية." },
      { q: "ما الذي أحتاجه للبدء؟", a: "فقط نسخة من جواز سفرك ساري المفعول، وعنوانك الحالي (في بلدك)، واسم مقترح للشركة. ذلك كل شيء!" }
    ]
  },
  {
    category: "الضرائب والبنوك",
    questions: [
      { q: "كيف أفتح حساب بنكي؟", a: "بعد التأسيس واستخراج رقم EIN، نوجهك خطوة بخطوة لفتح حساب في Mercury, Stripe, أو Wise. نوفر لك كل المستندات المطلوبة (Certificate of Formation, EIN Confirmation)." },
      { q: "ما هي الالتزامات الضريبية؟", a: "كشركة LLC مملوكة لأجنبي غير مقيم (Single-Member LLC)، لا تدفع ضرائب دخل في أمريكا إذا لم يكن لديك وجود فعلي (مكاتب، موظفين) هناك. لكن يجب تقديم إقرارات معلوماتية سنوية (Forms 1120 & 5472)." }
    ]
  },
  {
    category: "الدعم والضمان",
    questions: [
      { q: "ماذا لو لم يُقبل طلبي؟", a: "نسبة قبولنا 100% حتى الآن. لكن في الحالة النادرة جداً للرفض من قبل الولاية، نقوم باسترجاع المبلغ كاملاً لك بدون أي خصومات." },
      { q: "هل يمكنني ترقية باقتي لاحقاً؟", a: "نعم، يمكنك البدء بباقة Starter وترقيتها لاحقاً إلى PRO أو Premium إذا احتجت إلى خدمات إضافية مثل الاستشارة الضريبية أو الدعم المفتوح." }
    ]
  }
];

interface FAQProps {
  data?: FAQCategory[];
  title?: string;
  subtitle?: string;
}

export default function FAQ({ 
  data = defaultFaqData,
  title = "الأسئلة الشائعة",
  subtitle = "منصتنا مصممة لمساعدتك على العمل بذكاء، وليس بجهد أكبر. تتكيف مع احتياجاتك وتدعم أهدافك. حقق أقصى استفادة من كل ميزة."
}: FAQProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-gradient-to-br from-gold/5 via-white to-navy/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-32 h-32 bg-gold/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-[10%] w-48 h-48 bg-navy/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-[30%] w-4 h-4 bg-gold/30 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-40 right-[25%] w-6 h-6 bg-navy/20 rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-tajawal font-bold text-navy mb-6">{title}</h2>
          <p className="text-lg text-medium-gray max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Categories Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex flex-col gap-3"
          >
            {data.map((cat, idx) => {
              const isActive = activeCategory === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveCategory(idx);
                    setOpenIdx(0); // Open first question of new category
                  }}
                  className={`relative flex items-center justify-between p-5 rounded-2xl text-right transition-all duration-300 ${
                    isActive 
                      ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-navy font-bold z-10' 
                      : 'bg-transparent text-medium-gray hover:bg-white/50'
                  }`}
                >
                  <span className="text-lg">{cat.category}</span>
                  <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-gold' : 'text-light-gray'}`} />
                  {isActive && (
                    <motion.div 
                      layoutId="activeCategory" 
                      className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
                      style={{ boxShadow: 'inset 0 0 0 2px rgba(244,196,48,0.1)' }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Questions Accordion */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {data[activeCategory].questions.map((faq, idx) => {
                  const isOpen = openIdx === idx;
                  return (
                    <motion.div 
                      layout
                      key={idx} 
                      className={`rounded-2xl overflow-hidden transition-all duration-200 ${
                        isOpen 
                          ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]' 
                          : 'bg-transparent border border-light-gray/60 hover:bg-white/40'
                      }`}
                    >
                      <button 
                        className="w-full flex items-center justify-between p-6 text-right focus:outline-none group"
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                      >
                        <span className={`text-lg transition-colors ${isOpen ? 'font-bold text-navy' : 'font-medium text-dark-gray group-hover:text-navy'}`}>
                          {faq.q}
                        </span>
                        <motion.div 
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`shrink-0 mr-4 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                            isOpen ? 'bg-navy/5 text-navy' : 'bg-transparent text-medium-gray group-hover:bg-white'
                          }`}
                        >
                          <Plus className="w-5 h-5" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                          >
                            <div className="p-6 pt-0 text-medium-gray leading-relaxed text-lg">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
