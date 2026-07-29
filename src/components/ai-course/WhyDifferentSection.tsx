'use client';

import { motion } from 'motion/react';
import { EASE, EASE_BACK, VIEWPORT, staggerContainer, fadeUp } from './motion';
import { SectionHeading } from './ui';

const PILLARS = [
  {
    icon: '🔴',
    title: 'لايف مباشر',
    body: 'ماشي فيديوهات مسجلة. تتعلم مباشرة مع المدرب وتسأل في اللحظة.',
  },
  {
    icon: '🛠️',
    title: 'Frontend + Backend',
    body: 'ماشي مجرد واجهة. تتعلم تبني موقع كامل يخدم فعلاً: فورم، دفع، Dashboard.',
  },
  {
    icon: '🤝',
    title: 'مرافقة حتى أول عميل',
    body: 'ما نخلوكش وحدك. نرافقوك حتى تبيع أول موقع وتبدا تربح.',
  },
];

export default function WhyDifferentSection() {
  return (
    <section id="why-different" className="relative w-full bg-ac-white py-[clamp(4rem,10vw,7rem)] px-5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="ليش نحن مختلفين؟" title="ثلاث فروقات تبدّل كل شي" tone="light" />

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PILLARS.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group rounded-2xl bg-ac-offwhite p-7 ring-1 ring-black/[0.05] shadow-[0_10px_40px_-18px_rgba(17,36,64,0.16)] transition-shadow duration-300 hover:shadow-[0_22px_54px_-20px_rgba(17,36,64,0.26)]"
            >
              <motion.span
                initial={{ scale: 0.3, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: EASE_BACK }}
                className="inline-flex text-4xl group-hover:animate-[wiggle_0.6s_ease-in-out]"
              >
                {p.icon}
              </motion.span>
              <h3 className="mt-4 font-tajawal font-extrabold text-xl text-ac-navy-deep inline-block relative">
                {p.title}
                <motion.span
                  className="absolute -bottom-1.5 start-0 h-[3px] rounded-full bg-ac-gold"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                />
              </h3>
              <p className="mt-4 text-ac-ink leading-[1.8]">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
