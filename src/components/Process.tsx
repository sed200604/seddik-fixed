'use client';
import { FileText, Settings, CheckCircle, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Process() {
  const steps = [
    {
      icon: <FileText className="w-8 h-8 text-gold" />,
      num: '01',
      title: 'املأ النموذج',
      desc: 'معلومات أساسية فقط، يستغرق 5 دقائق',
      duration: '5 دقائق'
    },
    {
      icon: <Settings className="w-8 h-8 text-gold" />,
      num: '02',
      title: 'نبدأ التأسيس',
      desc: 'نختار الولاية المناسبة ونقدم الطلب فوراً',
      duration: '24 ساعة'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-gold" />,
      num: '03',
      title: 'استلام المستندات',
      desc: 'شهادة التأسيس، EIN، وكل المستندات الرسمية',
      duration: '5-7 أيام'
    },
    {
      icon: <Building2 className="w-8 h-8 text-gold" />,
      num: '04',
      title: 'فتح الحساب البنكي',
      desc: 'نوجهك خطوة بخطوة لفتح حسابك في Mercury أو Stripe',
      duration: 'مستمر'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-navy mb-4">كيف تعمل الخدمة؟</h2>
          <p className="text-lg text-medium-gray">4 خطوات بسيطة لشركتك الأمريكية</p>
        </motion.div>

        <div className="relative">
          {/* Desktop connecting line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gold/50 origin-left"
          ></motion.div>

          <div className="grid md:grid-cols-4 gap-10 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center text-center relative group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 bg-white rounded-full border-4 border-off-white shadow-lg flex items-center justify-center mb-6 relative z-10 group-hover:border-gold transition-colors"
                >
                  {step.icon}
                  <div className="absolute -top-4 -right-4 text-6xl font-black text-light-gray/30 z-[-1]">
                    {step.num}
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-medium-gray mb-4">{step.desc}</p>
                <span className="bg-navy text-white text-sm px-3 py-1 rounded-full">
                  {step.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-xl font-bold text-dark-gray mb-6">جاهز للبداية؟</p>
          <a href="#pricing" className="inline-block bg-gold text-navy font-bold px-10 py-4 rounded-lg shadow-lg hover:bg-[#FFD700] hover:-translate-y-1 transition-all text-lg">
            ابدأ الآن - فقط 5 دقائق
          </a>
        </motion.div>
      </div>
    </section>
  );
}
