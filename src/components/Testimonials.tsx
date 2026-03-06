'use client';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 1
    } 
  }
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring" as const,
      stiffness: 200,
      damping: 20
    } 
  }
};

export default function Testimonials() {
  const testimonials = [
    {
      quote: "أفضل قرار اتخذته! شركتي جاهزة في 5 أيام وحسابي في Mercury شغال. الدعم ممتاز!",
      name: "محمد العتيبي",
      role: "مطور تطبيقات",
      location: "الرياض، السعودية 🇸🇦",
      img: "https://picsum.photos/seed/user1/100/100"
    },
    {
      quote: "كنت خائفاً من التعقيدات، لكن Go LLC سهلت كل شيء. الآن أستقبل مدفوعات Stripe بدون مشاكل!",
      name: "أحمد بن علي",
      role: "صاحب متجر إلكتروني",
      location: "دبي، الإمارات 🇦🇪",
      img: "https://picsum.photos/seed/user2/100/100"
    },
    {
      quote: "الشفافية والمصداقية كانت واضحة من اليوم الأول. دفعت 39$ فقط وتأكدت من الجودة قبل إكمال الدفع.",
      name: "خالد المنصوري",
      role: "مستشار رقمي",
      location: "الكويت 🇰🇼",
      img: "https://picsum.photos/seed/user3/100/100"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-navy relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div 
        animate={{ 
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }}
      />
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-white text-sm font-medium tracking-wide">قصص نجاح حقيقية</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-tajawal font-bold text-white mb-6 leading-tight">
            ماذا يقول <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">عملاؤنا؟</span>
          </h2>
          <p className="text-xl text-light-gray max-w-2xl mx-auto">
            انضم إلى أكثر من 30 رائد أعمال عربي وثقوا بنا لتأسيس شركاتهم الأمريكية بنجاح.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(244, 196, 48, 0.1)"
              }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 relative group transition-all duration-300"
            >
              <div className="absolute -top-6 right-8 w-12 h-12 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                <Quote className="w-6 h-6 text-navy fill-navy" />
              </div>
              
              <div className="flex gap-1 mb-6 mt-2">
                {[...Array(5)].map((_, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                  >
                    <Star className="w-5 h-5 fill-gold text-gold drop-shadow-[0_0_8px_rgba(244,196,48,0.5)]" />
                  </motion.div>
                ))}
              </div>
              
              <p className="text-white/90 text-lg mb-8 leading-relaxed font-medium">"{t.quote}"</p>
              
              <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gold rounded-full blur-[8px] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full border-2 border-gold object-cover relative z-10" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{t.name}</h4>
                  <p className="text-sm text-gold font-medium">{t.role}</p>
                  <p className="text-xs text-light-gray mt-1 opacity-80">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Stats */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative"
        >
          {/* Decorative Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 hidden md:block"></div>
          
          {[
            { value: "30+", label: "شركة ناجحة" },
            { value: "100%", label: "معدل النجاح" },
            { value: "5-7", label: "أيام متوسط" },
            { value: "6", label: "سنوات خبرة" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={statVariants}
              className="relative bg-navy/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-white/5 transition-colors duration-300 group"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gold to-yellow-200 mb-2 drop-shadow-md group-hover:scale-110 transition-transform duration-300"
              >
                {stat.value}
              </motion.div>
              <div className="text-white/80 font-medium tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
