'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { EASE, MaskedWords, WhatsAppCTA, Barcode, ClockIcon, MapPinIcon, TicketIcon } from './ui';

const TICKER_ITEMS = [
  'ChatGPT',
  'Prompt Engineering',
  'Gemini',
  'DeepSeek',
  'تطبيق عملي مباشر',
  'الأداة المناسبة لكل مهمة',
  'الربح من الذكاء الاصطناعي',
  'جلسة حضورية — الجزائر العاصمة',
];

function TicketCard() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(-py * 10);
    ry.set(px * 12);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 1.1, delay: 1.5, ease: EASE }}
      className="w-full max-w-sm"
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="relative rounded-2xl border border-[#c9a84c]/35 bg-gradient-to-b from-[#0e1830] to-[#070d18] shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_50px_rgba(201,168,76,0.1)] overflow-hidden"
      >
        {/* Gold top edge */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <span className="text-[#f0ece2] font-black text-base">
            GO <span className="text-[#c9a84c]">LLC</span>
          </span>
          <span dir="ltr" className="font-jetbrains text-[9px] tracking-[0.35em] text-[#5d6e85]">
            ADMIT ONE
          </span>
        </div>

        {/* Big date */}
        <div className="px-6 pb-5">
          <span dir="ltr" className="block font-jetbrains text-[#e8d48b] text-5xl leading-none mb-1">
            AUG 08
          </span>
          <span className="block text-[#8fa0b8] text-sm font-bold">دورة الذكاء الاصطناعي — جلسة تطبيقية</span>
        </div>

        {/* Details */}
        <div className="px-6 pb-6 space-y-3">
          <div className="flex items-center gap-3">
            <ClockIcon className="w-4 h-4 text-[#c9a84c] shrink-0" />
            <span className="text-[#f0ece2] font-bold text-sm">10:00 صباحًا — 16:00</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPinIcon className="w-4 h-4 text-[#c9a84c] shrink-0" />
            <span className="text-[#f0ece2] font-bold text-sm">مول باب الزوار، المحمدية</span>
          </div>
          <div className="flex items-center gap-3">
            <TicketIcon className="w-4 h-4 text-[#c9a84c] shrink-0" />
            <span className="text-[#f0ece2] font-bold text-sm">20 مقعدًا فقط</span>
          </div>
        </div>

        {/* Perforation */}
        <div className="relative">
          <div className="border-t-2 border-dashed border-[#1a2c48] mx-4" />
          <span className="absolute top-1/2 -translate-y-1/2 -right-3.5 w-7 h-7 rounded-full bg-[#060c17] border border-[#1a2c48]" />
          <span className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-7 h-7 rounded-full bg-[#060c17] border border-[#1a2c48]" />
        </div>

        {/* Stub */}
        <div className="flex items-center justify-between px-6 py-5">
          <Barcode className="w-24 h-8 text-[#39506f]" />
          <div className="text-left">
            <span dir="ltr" className="block font-jetbrains text-[9px] tracking-[0.3em] text-[#5d6e85] mb-1">
              SEAT 01—20
            </span>
            <span dir="ltr" className="block font-jetbrains text-[#e8d48b] text-sm">8,000 DZD</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full flex flex-col overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1e3a5f 1px, transparent 1px), linear-gradient(to bottom, #1e3a5f 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 100%)',
        }}
      />

      {/* Aurora blobs with scroll parallax */}
      <motion.div style={{ y: glowY }} className="absolute inset-0 pointer-events-none">
        <div className="ac-aurora absolute top-[8%] right-[12%] w-[420px] h-[420px] md:w-[620px] md:h-[620px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.13)_0%,transparent_65%)] blur-3xl" />
        <div className="ac-aurora-slow absolute bottom-[5%] left-[5%] w-[380px] h-[380px] md:w-[540px] md:h-[540px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(30,72,120,0.22)_0%,transparent_65%)] blur-3xl" />
      </motion.div>

      {/* Oversized outlined watermark */}
      <div
        dir="ltr"
        aria-hidden="true"
        className="ac-stroke absolute -bottom-10 left-0 font-jetbrains font-bold text-[9rem] md:text-[16rem] leading-none opacity-[0.12] pointer-events-none select-none"
      >
        AI
      </div>

      {/* Grain — very subtle film texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-8 pt-6 flex items-center justify-between"
      >
        <span className="text-[#f0ece2] font-black text-xl tracking-tight">
          GO <span className="text-[#c9a84c]">LLC</span>
        </span>
        <span dir="ltr" className="hidden sm:block font-jetbrains text-[11px] text-[#5d6e85] tracking-[0.3em]">
          AI SESSION — ALGIERS &rsquo;26
        </span>
      </motion.header>

      {/* Main content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-20 flex-1 flex items-center px-4 md:px-8 py-12"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-right">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#c9a84c]/40 bg-[#0a1424]/70 backdrop-blur-md mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a84c] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a84c]" />
              </span>
              <span className="text-[#e8d48b] text-xs md:text-sm font-bold">دورة حضورية - 20 مقعدًا فقط</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-black text-[#f4f0e6] text-[2.6rem] leading-[1.16] sm:text-6xl lg:text-7xl tracking-tight mb-7">
              <MaskedWords text="الذكاء الاصطناعي…" delay={0.9} className="block" />
              <MaskedWords
                text="بالطريقة الصحيحة"
                delay={1.1}
                className="block mt-1"
                wordClassName="bg-gradient-to-l from-[#c9a84c] via-[#e8d48b] to-[#b3903a] bg-clip-text text-transparent"
              />
              <MaskedWords
                text="والقوية"
                delay={1.28}
                className="block mt-1"
                wordClassName="bg-gradient-to-l from-[#c9a84c] via-[#e8d48b] to-[#b3903a] bg-clip-text text-transparent"
              />
            </h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.45, ease: EASE }}
              className="text-[#8fa0b8] text-base md:text-xl leading-[1.8] max-w-xl mb-10"
            >
              تعلّم كيف تستخدم الذكاء الاصطناعي فعليًا في عملك ودراستك وحياتك اليومية — في جلسة تطبيقية واحدة مع{' '}
              <span className="text-[#f0ece2] font-bold border-b-2 border-[#c9a84c]/60 pb-0.5">بن زغدة محمد</span>
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <WhatsAppCTA big source="hero">راسلنا الآن على واتساب</WhatsAppCTA>
              <a
                href="#curriculum"
                className="inline-flex items-center gap-2 rounded-full border border-[#233852] text-[#c3cdd9] font-bold text-base px-8 py-4 hover:border-[#c9a84c]/60 hover:text-[#e8d48b] transition-colors duration-300 cursor-pointer"
              >
                اكتشف البرنامج
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 5v14m7-7-7 7-7-7" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Ticket column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <TicketCard />
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="relative z-20 flex justify-center pb-5">
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-transparent via-[#c9a84c] to-transparent"
        />
      </div>

      {/* Topic ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="ac-marquee relative z-20 border-y border-[#13203a] bg-[#070d18]/80 backdrop-blur-sm py-3.5"
      >
        <div className="ac-marquee-track">
          {[0, 1].map((dup) => (
            <span key={dup} className="inline-flex items-center" aria-hidden={dup === 1}>
              {TICKER_ITEMS.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-8 mx-4">
                  <span className="font-jetbrains text-xs tracking-[0.18em] text-[#5d6e85] uppercase whitespace-nowrap">
                    {item}
                  </span>
                  <span className="text-[#c9a84c]/50 text-[9px]">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
