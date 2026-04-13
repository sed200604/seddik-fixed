'use client';
import { motion } from 'motion/react';
import {
  Building2, Banknote, Shield, MessageCircle, CheckCircle2, Star, Play,
  Landmark, ShieldCheck, Users, Calculator, FileCheck, Globe,
} from 'lucide-react';
import Image from 'next/image';

/* ── Animation helpers ──────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
});

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

/* ── Shared inline styles ───────────────────────────── */
// Glass card on dark background — spec-compliant
const glassCard = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(244,196,48,0.2)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
} as const;

// Highlighted glass card (gold border)
const glassCardHighlight = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(244,196,48,0.55)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
} as const;

/* ── Data ────────────────────────────────────────────── */
const valueItems = [
  { icon: <Landmark className="w-8 h-8" style={{ color: '#F4C430' }} />, text: 'فتح بنوك أمريكية بنسبة قبول عالية' },
  { icon: <ShieldCheck className="w-8 h-8" style={{ color: '#F4C430' }} />, text: 'تقليل نسبة الإغلاق العشوائي للبنوك' },
  { icon: <Users className="w-8 h-8" style={{ color: '#F4C430' }} />, text: 'مرافقة كاملة بعد التأسيس' },
  { icon: <Calculator className="w-8 h-8" style={{ color: '#F4C430' }} />, text: 'استشارات ضريبية متخصصة' },
  { icon: <FileCheck className="w-8 h-8" style={{ color: '#F4C430' }} />, text: 'مساعدتك في تقديم الإقرار الضريبي' },
  { icon: <Globe className="w-8 h-8" style={{ color: '#F4C430' }} />, text: 'Community خاصة بالتجارة في أوروبا وأمريكا' },
];

const proofCards = [
  {
    icon: <Building2 className="w-8 h-8" style={{ color: '#F4C430' }} />,
    title: 'مكاتب حقيقية',
    desc: 'الجزائر العاصمة + قسنطينة',
    strong: 'تعال قابلنا شخصياً',
    link: '#offices',
    linkText: 'شاهد موقع المكاتب ←',
    highlight: true,
  },
  {
    icon: <Banknote className="w-8 h-8" style={{ color: '#F4C430' }} />,
    title: 'عملاء حقيقيون',
    desc: 'صور من داخل حسابات',
    strong: 'Wise Business شغّالة',
    link: 'https://www.facebook.com/permalink.php?story_fbid=pfbid0VRBdn6xG7Z4RKX2oFm3zf3F6qBtfaiBoh4ko7AUk1g9sDnvBFyMMRQCDNrRgbcjGl&id=61585622459776',
    linkText: 'شاهد النتائج ←',
    highlight: false,
  },
  {
    icon: <Star className="w-8 h-8" style={{ color: '#F4C430' }} />,
    title: 'تقييمات حقيقية',
    desc: 'تقييمات على Facebook',
    strong: 'من عملاء حقيقيين',
    link: 'https://www.facebook.com/permalink.php?story_fbid=pfbid0VRBdn6xG7Z4RKX2oFm3zf3F6qBtfaiBoh4ko7AUk1g9sDnvBFyMMRQCDNrRgbcjGl&id=61585622459776',
    linkText: 'اقرأ التقييمات ←',
    highlight: false,
  },
];

const trustBarItems = [
  { icon: <Building2 className="w-8 h-8" style={{ color: '#F4C430' }} />, strong: 'مكاتب حقيقية', small: 'الجزائر + قسنطينة' },
  { icon: <CheckCircle2 className="w-8 h-8" style={{ color: '#F4C430' }} />, strong: '30+ عميل ناجح', small: 'نتائج حقيقية' },
  { icon: <Shield className="w-8 h-8" style={{ color: '#F4C430' }} />, strong: 'ضمان قانوني', small: 'استرجاع 100%' },
  { icon: <MessageCircle className="w-8 h-8" style={{ color: '#F4C430' }} />, strong: 'دعم دائم', small: 'معك حتى تنجح' },
];

/* ── Component ───────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      dir="rtl"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden text-white"
      style={{ background: 'linear-gradient(145deg, #0A1628 0%, #1A3A52 60%, #0F2A3E 100%)' }}
    >
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25], x: [0, 60, 0], y: [0, -60, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[10%] -left-[5%] w-[540px] h-[540px] rounded-full blur-[130px]"
          style={{ background: 'rgba(244,196,48,0.18)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.3, 0.15], x: [0, -50, 0], y: [0, 60, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: 'rgba(59,130,246,0.15)' }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10 flex flex-col gap-16">

        {/* ── Top Section: 2 Column Layout (Text + Image) ── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
          
          {/* TEXT CONTENT (Right Side in RTL) */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-right gap-6">
            {/* 1. Office Badge */}
            <motion.div {...fadeUp(0)}>
              <motion.div
                animate={{
                  boxShadow: [
                    '0 4px 20px rgba(244,196,48,0.35)',
                    '0 4px 35px rgba(244,196,48,0.65)',
                    '0 4px 20px rgba(244,196,48,0.35)',
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full font-bold shadow-lg cursor-default"
                style={{ background: 'linear-gradient(135deg, #C49B1A, #F4C430)', color: '#1A3A52' }}
              >
                <Building2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                <div className="flex flex-col items-start leading-tight">
                  <strong className="text-[14px]">مكاتب حقيقية في الجزائر</strong>
                  <span className="text-[12px] font-medium" style={{ color: 'rgba(26,58,82,0.8)' }}>
                    الجزائر العاصمة | قسنطينة
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* 2. Main Headline */}
            <h1 className="font-tajawal font-black leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 52px)', textShadow: '0 0 40px rgba(244,196,48,0.15)' }}>
              ابني Business أمريكي صحيح 100%
              <span
                className="block mt-3"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #F4C430 0%, #FFE17B 50%, #F4C430 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 18px rgba(244,196,48,0.45))',
                }}
              >
                بدون غلق حساباتك البنكية
               <br />لأننا نقدم عنواناً حقيقياً!
              </span>
            </h1>

            {/* 3. Pre-headline / Subtext */}
            <motion.p {...fadeUp(0.1)} className="text-[18px] font-semibold leading-[1.6] text-white opacity-90 max-w-xl">
              نحن لا نعطيك أوراق LLC فقط. نقدم لك نظام متكامل تبدأ شركتك وتجارتك براحة بال وضمان قانوني شامل.
            </motion.p>

            {/* 4. CTA Buttons */}
            <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              {/* Primary CTA */}
              <a
                href="#consultation"
                className="flex flex-col items-center justify-center font-bold rounded-xl py-4 flex-1 shadow-xl transition-transform hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, #C49B1A, #F4C430)', color: '#1A3A52' }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl">احجز استشارة مجانية</span>
                  <span className="text-2xl" aria-hidden="true">📅</span>
                </div>
                <span className="text-sm opacity-80 mt-1">15 دقيقة — بدون التزام</span>
              </a>

              {/* Secondary CTA */}
              <a
                href="#how-it-works"
                className="flex flex-col items-center justify-center text-white font-bold rounded-xl py-4 px-6 flex-1 transition-all hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.2)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl">كيف يعمل النظام؟</span>
                  <span className="text-2xl" aria-hidden="true">📖</span>
                </div>
              </a>
            </motion.div>
          </div>

          {/* IMAGE CONTENT (Left Side in RTL) */}
          <motion.div {...fadeUp(0.3)} className="flex-1 w-full max-w-[500px] flex justify-center relative">
             <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl" style={{ border: '4px solid rgba(244,196,48,0.2)' }}>
                {/* User's Uploaded Photo */}
                <Image 
                  src="/hero-founder.jpg" 
                  alt="مؤسس الشركة" 
                  fill
                  className="object-cover rounded-3xl"
                />
                
                {/* Floating Assurance Badge overlay */}
                <div className="absolute bottom-4 right-4 left-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg flex items-center gap-3">
                   <div className="rounded-full bg-green-500/20 p-2 border border-green-500/30">
                      <ShieldCheck className="w-6 h-6 text-[#4caf50]" />
                   </div>
                   <div>
                      <p className="font-bold text-white text-sm">التزام بالمصداقية</p>
                      <p className="text-xs text-white/80">نحن معك بخبرة وتواجد حقيقي.</p>
                   </div>
                </div>
             </div>
             
             {/* Glowing backdrop for image */}
             <div className="absolute inset-0 -z-10 bg-[#F4C430] blur-[100px] opacity-20 rounded-full" />
          </motion.div>
        </div>


        {/* ── Bottom Section: Value Grid & Trust Proof ── */}
        <div className="flex flex-col items-center gap-12 w-full mt-8">
          
          {/* Trust Bar */}
          <motion.div
            {...fadeUp(0.4)}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-4xl flex flex-wrap justify-center gap-5 md:gap-10 rounded-2xl px-6 py-6" style={glassCard}>
              {trustBarItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 min-w-[140px]">
                  <span aria-hidden="true" className="shrink-0">{item.icon}</span>
                  <div className="flex flex-col text-right">
                    <strong className="text-white font-bold leading-tight" style={{ fontSize: '15px' }}>
                      {item.strong}
                    </strong>
                    <small className="text-white" style={{ fontSize: '12px', opacity: 0.82 }}>
                      {item.small}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Value Highlights */}
          <motion.div {...fadeUp(0.5)} className="w-full text-center">
            <h3 className="font-bold text-white mb-8" style={{ fontSize: 'clamp(20px, 4vw, 28px)', textShadow: '0 0 30px rgba(244,196,48,0.2)' }}>
              ✅ دليل أننا شركة حقيقية (ومكاتبنا بالجزائر):
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {proofCards.map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, boxShadow: '0 16px 45px rgba(0,0,0,0.4)' }}
                  transition={{ duration: 0.28 }}
                  className="rounded-2xl p-7 flex flex-col items-center gap-4 text-center"
                  style={card.highlight ? glassCardHighlight : glassCard}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(244,196,48,0.12)', border: '1px solid rgba(244,196,48,0.3)' }}>
                    {card.icon}
                  </div>
                  <h4 className="font-bold text-[#F4C430] text-lg">{card.title}</h4>
                  <p className="leading-relaxed text-white text-sm">
                    {card.desc}<br />
                    <strong className="font-bold">{card.strong}</strong>
                  </p>
                  <a 
                    href={card.link} 
                    className="font-semibold hover:underline transition-all text-[#F4C430] text-sm"
                    target={card.link.startsWith('http') ? "_blank" : undefined}
                    rel={card.link.startsWith('http') ? "noopener noreferrer" : undefined}
                  >
                    {card.linkText}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
