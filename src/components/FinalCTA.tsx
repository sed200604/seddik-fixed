'use client';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle, ShieldCheck, Lock, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface FinalCTAProps {
  title?: string;
  subtitle?: string;
  priceText?: string;
  targetId?: string;
  isTaxFiling?: boolean;
}

const Counter = ({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return <span>{count}{suffix}</span>;
};

export default function FinalCTA({
  title = "جاهز لتأسيس شركتك الأمريكية؟",
  subtitle = "ادفع 39 دولار فقط الآن، وابدأ خلال 24 ساعة",
  priceText = "ابدأ الآن - 39$ فقط",
  targetId = "pricing",
  isTaxFiling = false
}: FinalCTAProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isTaxFiling) {
    return (
      <section className="py-24 bg-gradient-to-br from-[#0F1F2E] to-[#1A3A52] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 text-center relative z-10">
          
          {/* Urgency Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-red-500 text-white px-8 py-3 rounded-full mb-10 font-bold shadow-[0_4px_20px_rgba(239,68,68,0.5)] animate-pulse"
          >
            <span className="text-xl">⏰</span>
            <span>الموعد النهائي يقترب! لا تخاطر بـ 50,000 دولار غرامة</span>
          </motion.div>
          
          {/* Main CTA Content */}
          <div className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white mb-6"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-200 mb-10"
            >
              {subtitle}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-6 md:gap-8 flex-wrap mb-12"
            >
              <div className="flex items-center gap-2 text-white font-semibold text-lg">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span>محاسب CPA أمريكي</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold text-lg">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span>تقديم مضمون</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold text-lg">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span>59 دولار فقط</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold text-lg">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span>استشارة مجانية</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <button onClick={handleScroll} className="bg-gold text-navy font-black px-12 py-6 rounded-xl text-2xl shadow-[0_12px_40px_rgba(244,196,48,0.6)] hover:shadow-[0_15px_50px_rgba(244,196,48,0.8)] hover:bg-[#FFD700] hover:-translate-y-1 transition-all flex items-center gap-4 w-full sm:w-auto justify-center">
                <span className="text-3xl">🚀</span>
                <span>{priceText}</span>
                <ArrowLeft className="w-8 h-8" />
              </button>
              <p className="text-gray-300 mt-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold" /> ضمان استرجاع المال 100% | <Lock className="w-5 h-5 text-gold" /> بدون التزام
              </p>
            </motion.div>
          </div>
          
          {/* Final Trust Elements */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t-2 border-white/20"
          >
            <div className="text-center">
              <strong className="block text-5xl font-black text-gold mb-2"><Counter from={0} to={50} suffix="+" /></strong>
              <span className="text-gray-300">عميل راضٍ</span>
            </div>
            <div className="text-center">
              <strong className="block text-5xl font-black text-gold mb-2"><Counter from={0} to={100} suffix="%" /></strong>
              <span className="text-gray-300">معدل نجاح</span>
            </div>
            <div className="text-center">
              <strong className="block text-5xl font-black text-gold mb-2">2-3</strong>
              <span className="text-gray-300">أيام إنجاز</span>
            </div>
            <div className="text-center">
              <strong className="block text-5xl font-black text-gold mb-2">$<Counter from={0} to={59} /></strong>
              <span className="text-gray-300">سعر شامل</span>
            </div>
          </motion.div>
          
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-navy to-navy-dark relative overflow-hidden">
      <motion.div 
        animate={{ 
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute inset-0 opacity-10" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
      ></motion.div>
      
      <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-tajawal font-bold text-white mb-6"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-light-gray mb-12"
        >
          {subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <a href={`#${targetId}`} onClick={handleScroll} className="bg-gold text-navy font-bold px-10 py-5 rounded-xl text-xl shadow-[0_0_30px_rgba(244,196,48,0.3)] hover:shadow-[0_0_40px_rgba(244,196,48,0.5)] hover:bg-[#FFD700] hover:-translate-y-1 transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
            {priceText} <ArrowLeft className="w-6 h-6" />
          </a>
          
          <a href="https://wa.me/213791789125" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
            تحدث معنا على WhatsApp <MessageCircle className="w-6 h-6 text-green-400" />
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <span className="inline-block bg-gold/20 text-gold text-sm font-bold px-4 py-2 rounded-full animate-pulse">
            ⏰ متبقي 7 أماكن فقط هذا الأسبوع
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-white/10"
        >
          <div className="flex items-center gap-2 text-white/80">
            <Lock className="w-5 h-5 text-gold" /> دفع آمن
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <ShieldCheck className="w-5 h-5 text-gold" /> ضمان استرجاع
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Zap className="w-5 h-5 text-gold" /> بدء فوري
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-white/50 text-sm mt-8"
        >
          ضمان استرجاع المال 100% إذا لم تكن راضياً
        </motion.p>
      </div>
    </section>
  );
}
