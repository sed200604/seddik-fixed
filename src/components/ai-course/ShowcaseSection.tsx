'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { EASE, VIEWPORT, staggerContainer, scaleIn } from './motion';
import { SectionHeading } from './ui';
import { SHOWCASE_LINKS } from './constants';

type Vibe = {
  frame: string; // canvas background
  bar: string; // accent bar color
  block: string; // block color
};

type Showcase = {
  id: number;
  type: string;
  price: string;
  built: string;
  href: string;
  vibe: Vibe;
};

const SHOWCASES: Showcase[] = [
  {
    id: 1,
    type: 'وكالة تسويق رقمي',
    price: 'يتباع بـ 50,000 - 100,000 دج',
    built: 'تبنى في 3 ساعات',
    href: SHOWCASE_LINKS.agency,
    vibe: { frame: 'linear-gradient(160deg,#0b1020,#141c3a)', bar: '#7c5cff', block: 'rgba(124,92,255,0.35)' },
  },
  {
    id: 2,
    type: 'مطعم / كافيه',
    price: 'يتباع بـ 30,000 - 60,000 دج',
    built: 'تبنى في ساعتين',
    href: SHOWCASE_LINKS.restaurant,
    vibe: { frame: 'linear-gradient(160deg,#2a1410,#3d1f16)', bar: '#e0894a', block: 'rgba(224,137,74,0.35)' },
  },
  {
    id: 3,
    type: 'متجر أونلاين (مع Backend)',
    price: 'يتباع بـ 80,000 - 150,000 دج',
    built: 'تبنى في 4 ساعات',
    href: SHOWCASE_LINKS.store,
    vibe: { frame: 'linear-gradient(160deg,#0d1f1a,#123028)', bar: '#22c58a', block: 'rgba(34,197,138,0.32)' },
  },
  {
    id: 4,
    type: 'Portfolio فريلانسر',
    price: 'يتباع بـ 20,000 - 40,000 دج',
    built: 'تبنى في ساعتين',
    href: SHOWCASE_LINKS.portfolio,
    vibe: { frame: 'linear-gradient(160deg,#1a1020,#2a1636)', bar: '#e0509a', block: 'rgba(224,80,154,0.34)' },
  },
];

/* A tiny fake site whose content slowly pans up to feel "live". */
function MiniSite({ vibe }: { vibe: Vibe }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-full overflow-hidden rounded-b-xl" style={{ background: vibe.frame }}>
      <motion.div
        className="p-2.5 space-y-2"
        animate={reduce ? undefined : { y: ['0%', '-42%', '0%'] }}
        transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
      >
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-12 rounded" style={{ background: vibe.bar }} />
          <div className="flex gap-1">
            <div className="h-1.5 w-6 rounded bg-white/25" />
            <div className="h-1.5 w-6 rounded bg-white/25" />
          </div>
        </div>
        <div className="h-14 rounded-lg" style={{ background: vibe.block }} />
        <div className="h-2 w-3/4 rounded bg-white/20" />
        <div className="h-2 w-1/2 rounded bg-white/15" />
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="h-12 rounded-lg bg-white/10" />
          <div className="h-12 rounded-lg bg-white/10" />
          <div className="h-12 rounded-lg bg-white/10" />
          <div className="h-12 rounded-lg bg-white/10" />
        </div>
        <div className="h-8 rounded-lg" style={{ background: vibe.block }} />
      </motion.div>
      {/* sheen sweep */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 opacity-0 [transition:opacity_.3s] group-hover:opacity-100">
          <div className="absolute -inset-y-2 -left-1/3 w-1/3 skew-x-12 bg-white/15 blur-md animate-[shimmerSweep_2.4s_ease-in-out_infinite]" />
        </div>
      )}
    </div>
  );
}

function ShowcaseCard({ item }: { item: Showcase }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return;
    const r = ref.current!.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleIn}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformPerspective: 900 }}
      className="group relative block rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_10px_40px_-12px_rgba(17,36,64,0.18)] transition-shadow duration-300 hover:shadow-[0_24px_60px_-16px_rgba(17,36,64,0.28)] overflow-hidden"
    >
      {/* device frame */}
      <div className="p-3 pb-0">
        <div className="rounded-xl overflow-hidden ring-1 ring-black/10">
          <div className="flex items-center gap-1 bg-[#0b1220] px-2.5 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </div>
          <div className="h-[168px]">
            <MiniSite vibe={item.vibe} />
          </div>
        </div>
      </div>

      {/* meta */}
      <div className="p-4 pt-3.5">
        <h3 className="font-tajawal font-extrabold text-ac-navy-deep text-lg leading-snug">
          {item.type}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-ac-gold/15 px-3 py-1 text-sm font-bold text-[#9a7b1f] ring-1 ring-ac-gold/30">
            {item.price}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-ac-offwhite px-3 py-1 text-xs font-semibold text-ac-ink">
            ⏱ {item.built}
          </span>
        </div>
      </div>

      {/* click affordance */}
      <span className="absolute top-4 end-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ac-navy-deep/80 text-white opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.a>
  );
}

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="relative w-full bg-ac-white py-[clamp(4rem,10vw,7rem)] px-5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="عرض المواقع"
          title="شوف واش يتبنى بالذكاء الاصطناعي"
          subhead="مواقع حقيقية، مبنية في ساعات، تتباع بآلاف الدنانير. هذا اللي راح تتعلم تديرو بيدك."
          tone="light"
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
        >
          {SHOWCASES.map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-8 text-center text-sm text-ac-ink/70"
        >
          {/* TODO(placeholder): اربط كل بطاقة بموقع ديمو حقيقي بدل # */}
          كل موقع من هذي بنيناه بالأدوات نفسها اللي راح تتعلمها في الدورة
        </motion.p>
      </div>
    </section>
  );
}
