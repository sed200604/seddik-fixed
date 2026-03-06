'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { Trophy, CheckCircle2, ArrowLeft, ShieldCheck, Zap, Lock } from 'lucide-react';

const fadeUpBlur = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function Hero() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 500]);
  const foregroundY = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-navy text-white min-h-[90vh] flex items-center">
      {/* Animated Glowing Orbs Background with Parallax */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gold/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[150px]"
        />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-8"
          >
            <motion.div variants={fadeUpBlur}>
              <motion.div 
                animate={{ 
                  boxShadow: ['0 0 20px rgba(244,196,48,0.1)', '0 0 40px rgba(244,196,48,0.3)', '0 0 20px rgba(244,196,48,0.1)'],
                  y: [0, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md text-white px-6 py-3 rounded-full text-base md:text-lg font-bold border border-gold/30"
              >
                <motion.div
                  animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Trophy className="w-6 h-6 text-gold drop-shadow-[0_0_8px_rgba(244,196,48,0.8)]" />
                </motion.div>
                <span className="tracking-wide">موثوق من <span className="text-gold">30+</span> شركة عربية ناجحة</span>
              </motion.div>
            </motion.div>

            <motion.h1 
              variants={fadeUpBlur} 
              className="text-5xl md:text-6xl lg:text-7xl font-tajawal font-black leading-[1.2] tracking-tight"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block"
              >
                أسس شركتك الأمريكية
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.4 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold bg-[length:200%_auto] animate-gradient mt-2 mb-2 drop-shadow-[0_0_15px_rgba(244,196,48,0.3)]"
              >
                LLC
              </motion.span>
              <br />
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="block text-3xl md:text-4xl lg:text-5xl text-white/90 font-bold mt-2"
              >
                في <span className="text-gold relative inline-block">
                  7 أيام
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="absolute -bottom-2 right-0 h-1.5 bg-gold rounded-full"
                  />
                </span> فقط
              </motion.span>
            </motion.h1>

            <motion.p variants={fadeUpBlur} className="text-xl md:text-2xl text-light-gray max-w-lg leading-relaxed">
              ادفع 39$ فقط الآن، وأكمل الباقي بعد تأسيس شركتك
            </motion.p>

            <motion.div variants={fadeUpBlur} className="space-y-4">
              {[
                'استقبل مدفوعات عالمية (Stripe, PayPal, Wise)',
                'افتح حسابات بنكية أمريكية (Mercury, Relay)',
                'وفر آلاف الدولارات في الرسوم سنوياً'
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-lg text-white/90">{point}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUpBlur} className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#pricing" className="group relative overflow-hidden bg-gold text-navy font-bold px-8 py-4 rounded-xl text-center text-lg hover-lift hover-glow-gold border-beam flex items-center justify-center gap-2 focus-ring">
                <span className="relative z-10">ابدأ الآن - 39$ فقط</span>
              </a>
              <a href="#contact" className="bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold px-8 py-4 rounded-xl text-center text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 hover-lift focus-ring">
                استشارة مجانية <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </a>
            </motion.div>

            <motion.div variants={fadeUpBlur} className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
              {[
                { icon: Zap, text: "تأسيس خلال 5-7 أيام" },
                { icon: ShieldCheck, text: "معدل نجاح 100%" },
                { icon: Lock, text: "دفع آمن" }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-lg backdrop-blur-sm shadow-sm cursor-default transition-colors hover:bg-white/10 hover:border-gold/30"
                >
                  <feature.icon className="w-5 h-5 text-gold" /> 
                  <span className="text-base font-medium text-white/90">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual - Floating Glass Card with Parallax */}
          <motion.div 
            style={{ y: foregroundY }}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative hidden md:block perspective-1000"
          >
            <motion.div 
              animate={{ y: [-10, 10, -10], rotateX: [2, -2, 2], rotateY: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform-style-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 relative z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
                <div className="text-xs text-white/50 font-mono bg-black/20 px-2 py-1 rounded">dashboard.go-llc.com</div>
              </div>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/40 to-gold/10 border border-gold/30 flex items-center justify-center shadow-[0_0_20px_rgba(244,196,48,0.2)]">
                    <ShieldCheck className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">LLC Approved</div>
                    <div className="text-sm text-white/60 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Wyoming, USA
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gold to-yellow-200 shadow-[0_0_10px_rgba(244,196,48,0.5)]"
                  ></motion.div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5 hover:bg-black/30 transition-colors">
                    <div className="text-white/50 text-xs mb-1">EIN Number</div>
                    <div className="font-mono text-sm text-white/90">XX-XXXXXXX</div>
                  </div>
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5 hover:bg-black/30 transition-colors">
                    <div className="text-white/50 text-xs mb-1">Bank Status</div>
                    <div className="text-green-400 text-sm flex items-center gap-1 font-medium"><CheckCircle2 className="w-4 h-4"/> Active</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
