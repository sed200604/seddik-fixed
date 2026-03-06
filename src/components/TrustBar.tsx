'use client';
import { motion } from 'motion/react';

export default function TrustBar() {
  const partners = [
    { name: 'Mercury', icon: '🏦' },
    { name: 'Stripe', icon: '💳' },
    { name: 'Wise', icon: '💱' },
    { name: 'PayPal', icon: '🅿️' },
    { name: 'Relay', icon: '🏛️' },
  ];

  // Duplicate array 3 times for seamless infinite scroll
  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <section className="py-12 bg-white border-b border-light-gray overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-8 relative z-20">
        <motion.p 
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          className="text-center text-medium-gray text-lg font-bold mb-8"
        >
          نساعدك في فتح حسابات في أفضل البنوك العالمية:
        </motion.p>
      </div>

      <div className="flex overflow-hidden group relative" dir="ltr">
        <motion.div 
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex gap-16 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-500 w-max items-center"
        >
          {marqueeItems.map((partner, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 text-3xl font-bold text-dark-gray hover:text-navy transition-all cursor-default grayscale hover:grayscale-0 px-8"
            >
              <span className="text-4xl">{partner.icon}</span>
              <span>{partner.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
