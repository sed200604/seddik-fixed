'use client';
import { motion } from 'motion/react';
import { XCircle, Ban, TrendingDown, Scale, ArrowDown, CheckCircle2, DollarSign, Shield, Globe, TrendingUp, HeadphonesIcon } from 'lucide-react';

const fadeUpBlur = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
};

export default function ProblemSolution() {
  const problems = [
    { icon: <TrendingDown className="w-10 h-10 text-red-500" />, title: 'رسوم تحويل عالية', desc: 'تفقد 5-7% من كل تحويل مع الطرق التقليدية' },
    { icon: <Ban className="w-10 h-10 text-red-500" />, title: 'رفض من البنوك', desc: 'البنوك العالمية ترفض الحسابات الشخصية لغير المقيمين' },
    { icon: <XCircle className="w-10 h-10 text-red-500" />, title: 'مصداقية ضعيفة', desc: 'العملاء الأجانب يفضلون التعامل مع شركات أمريكية' },
    { icon: <Scale className="w-10 h-10 text-red-500" />, title: 'عدم الحماية القانونية', desc: 'أموالك الشخصية معرضة للخطر بدون LLC' },
  ];

  const solutions = [
    { icon: <DollarSign className="w-8 h-8 text-gold" />, title: 'استقبل المدفوعات', desc: 'افتح حسابات Stripe, PayPal, Wise بسهولة' },
    { icon: <TrendingDown className="w-8 h-8 text-gold" />, title: 'وفر الآلاف', desc: 'قلل رسوم التحويل من 7% إلى 1%' },
    { icon: <Shield className="w-8 h-8 text-gold" />, title: 'حماية أصولك', desc: 'افصل أموالك الشخصية عن أموال العمل' },
    { icon: <Globe className="w-8 h-8 text-gold" />, title: 'مصداقية عالمية', desc: 'تعامل كشركة أمريكية موثوقة' },
    { icon: <TrendingUp className="w-8 h-8 text-gold" />, title: 'نمو أسرع', desc: 'وسّع عملك عالمياً بثقة' },
    { icon: <HeadphonesIcon className="w-8 h-8 text-gold" />, title: 'دعم كامل', desc: 'نساعدك في كل خطوة' },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about">
      {/* Decorative background blur */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-50 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        
        {/* Problems */}
        <div className="mb-24">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpBlur}
            className="text-3xl md:text-5xl font-tajawal font-bold text-center text-dark-gray mb-16"
          >
            لماذا تحتاج شركة LLC أمريكية؟
          </motion.h2>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {problems.map((prob, idx) => (
              <motion.div 
                variants={fadeUpBlur}
                key={idx} 
                className="group bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(239,68,68,0.08)] transition-all duration-300 border border-light-gray/50 hover:border-red-100"
              >
                <div className="mb-6 w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">{prob.icon}</div>
                <h3 className="text-xl font-bold text-dark-gray mb-3">{prob.title}</h3>
                <p className="text-medium-gray leading-relaxed">{prob.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative flex items-center justify-center my-24"
        >
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-light-gray to-transparent"></div>
          <div className="relative bg-white px-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(244,196,48,0.2)]">
              <ArrowDown className="w-8 h-8 text-gold animate-bounce" />
            </div>
          </div>
        </motion.div>

        {/* Solutions */}
        <div>
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpBlur}
            className="text-3xl md:text-5xl font-tajawal font-bold text-center text-navy mb-16 flex items-center justify-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-gold" />
            </div>
            الحل: شركة LLC أمريكية
          </motion.h2>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {solutions.map((sol, idx) => (
              <motion.div 
                variants={fadeUpBlur}
                key={idx} 
                className="group bg-off-white p-8 rounded-2xl border border-light-gray/50 hover:bg-white hover:shadow-[0_20px_40px_rgba(244,196,48,0.08)] hover:border-gold/30 transition-all duration-300"
              >
                <div className="mb-6 w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">{sol.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3">{sol.title}</h3>
                <p className="text-medium-gray leading-relaxed">{sol.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <a href="#contact" className="inline-flex items-center justify-center bg-transparent border-2 border-navy text-navy font-bold px-10 py-4 rounded-xl hover:bg-navy hover:text-white transition-all duration-300 text-lg hover:shadow-[0_10px_20px_rgba(26,58,82,0.2)] hover:-translate-y-1">
              احجز استشارتك المجانية
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
