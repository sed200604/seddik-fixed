'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { OFFER_ENDS_AT } from './constants';
import { trackCTAClick, trackInitiateCheckout } from './tracking';

export type Plan = 'standard' | 'vip';

/** Scroll to the registration form and pre-select a plan (fired from pricing cards). */
export function selectPlanAndScroll(plan: Plan) {
  trackInitiateCheckout(plan);
  window.dispatchEvent(new CustomEvent('ac:selectPlan', { detail: plan }));
  const el = document.getElementById('register');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   Icons — Lucide outlines + Simple Icons WhatsApp (24×24 SVG)
   ============================================================ */

type IconProps = { className?: string };

export function WhatsAppIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Stroke({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function CalendarIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Stroke>
  );
}

export function ClockIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Stroke>
  );
}

export function MapPinIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Stroke>
  );
}

export function TicketIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2M13 17v2M13 11v2" />
    </Stroke>
  );
}

export function BanknoteIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </Stroke>
  );
}

export function ShieldCheckIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </Stroke>
  );
}

export function CheckIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M20 6 9 17l-5-5" />
    </Stroke>
  );
}

export function ArrowLeftIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M19 12H5m7 7-7-7 7-7" />
    </Stroke>
  );
}

export function TerminalIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="m4 17 6-6-6-6M12 19h8" />
    </Stroke>
  );
}

export function BriefcaseIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </Stroke>
  );
}

export function GridIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </Stroke>
  );
}

export function PlusIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <Stroke className={className}>
      <path d="M12 5v14M5 12h14" />
    </Stroke>
  );
}

/* ============================================================
   Barcode — decorative SVG for ticket / receipt motifs
   ============================================================ */

const BARS = [3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 2, 4, 1, 1, 3, 2, 1, 2, 1, 4, 2, 1, 3, 1, 2, 2, 1, 3];

export function Barcode({ className = 'w-28 h-10' }: IconProps) {
  let x = 0;
  return (
    <svg viewBox="0 0 76 24" className={className} aria-hidden="true">
      {BARS.map((w, i) => {
        const rect = <rect key={i} x={x} y="0" width={w * 0.7} height="24" fill="currentColor" />;
        x += w * 0.7 + 1.2;
        return rect;
      })}
    </svg>
  );
}

/* ============================================================
   Section frame — sticky outlined index + label, content aside
   ============================================================ */

export function SectionFrame({
  num,
  label,
  id,
  children,
  className = '',
}: {
  num: string;
  label: string;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative w-full border-t border-[#13203a] py-16 md:py-28 px-4 md:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-28 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-5">
            <span dir="ltr" className="ac-stroke font-jetbrains text-5xl lg:text-7xl leading-none select-none">
              {num}
            </span>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c9a84c]/60" />
              <span className="text-[#c9a84c] text-sm font-bold tracking-wide">{label}</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

/* ============================================================
   Reveal — soft rise-in on scroll
   ============================================================ */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   MaskedWords — word-by-word rise from an overflow mask
   ============================================================ */

export function MaskedWords({
  text,
  delay = 0,
  stagger = 0.07,
  className = '',
  wordClassName = '',
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom py-[0.12em] -my-[0.12em]">
          <motion.span
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
            className={`inline-block ${wordClassName}`}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ============================================================
   Counter — eased count-up when scrolled into view
   ============================================================ */

export function Counter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} dir="ltr">
      {count.toLocaleString('en-US')}
    </span>
  );
}

/* ============================================================
   WhatsAppCTA — primary conversion button
   ============================================================ */

export function WhatsAppCTA({
  children,
  big = false,
  className = '',
  source,
}: {
  children: ReactNode;
  big?: boolean;
  className?: string;
  /** Section id used for Meta Pixel Lead segmentation (e.g. "hero", "offer", "final"). */
  source: string;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackCTAClick(source);
    const registerEl = document.getElementById('register');
    if (registerEl) {
      e.preventDefault();
      registerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.a
      href="#register"
      onClick={handleClick}
      data-cta-source={source}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      className={`cta-button group relative inline-flex items-center justify-center gap-3 rounded-full font-extrabold text-[#071018] cursor-pointer overflow-hidden shadow-[0_6px_24px_rgba(201,168,76,0.28)] hover:shadow-[0_10px_36px_rgba(201,168,76,0.45)] transition-shadow duration-300 ${
        big ? 'text-lg md:text-xl px-10 py-5' : 'text-base md:text-lg px-8 py-4'
      } ${className}`}
      style={{ background: 'linear-gradient(120deg, #b3903a 0%, #e8d48b 45%, #c9a84c 100%)' }}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out" />
    </motion.a>
  );
}

/* ============================================================
   SelectPlanButton — pricing-card CTA that pre-selects a plan
   and smooth-scrolls to the registration form (§ conversion core).
   ============================================================ */

export function SelectPlanButton({
  children,
  plan,
  big = false,
  emphasized = false,
  className = '',
}: {
  children: ReactNode;
  plan: Plan;
  big?: boolean;
  emphasized?: boolean;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => selectPlanAndScroll(plan)}
      data-cta-source={`pricing_${plan}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`cta-button group relative inline-flex w-full items-center justify-center gap-2.5 rounded-xl font-extrabold text-ac-navy-deep cursor-pointer overflow-hidden transition-shadow duration-300 ${
        emphasized
          ? 'shadow-[0_8px_30px_rgba(212,168,67,0.45)] hover:shadow-[0_12px_42px_rgba(212,168,67,0.6)]'
          : 'shadow-[0_6px_20px_rgba(212,168,67,0.28)] hover:shadow-[0_10px_32px_rgba(212,168,67,0.42)]'
      } ${big ? 'text-lg px-8 py-4' : 'text-base px-6 py-3.5'} ${className}`}
      style={{ background: 'linear-gradient(120deg, #D4A843 0%, #E8C36A 50%, #D4A843 100%)' }}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out" />
    </motion.button>
  );
}

/* ============================================================
   SectionHeading — eyebrow + masked title + optional subhead.
   `tone` adapts colors for navy (dark) vs white (light) sections.
   ============================================================ */

export function SectionHeading({
  eyebrow,
  title,
  subhead,
  tone = 'dark',
  align = 'center',
  className = '',
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  tone?: 'dark' | 'light';
  align?: 'center' | 'start';
  className?: string;
}) {
  const isDark = tone === 'dark';
  return (
    <div
      className={`${align === 'center' ? 'text-center mx-auto' : 'text-start'} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={`inline-flex items-center gap-2 mb-4 text-xs font-bold tracking-wide ${
              isDark ? 'text-ac-gold' : 'text-ac-gold'
            }`}
          >
            <span className="h-px w-6 bg-ac-gold/60" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <h2
        className={`font-tajawal font-extrabold leading-[1.15] text-balance ${
          isDark ? 'text-white' : 'text-ac-navy-deep'
        }`}
        style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.75rem)' }}
      >
        <MaskedWords text={title} />
      </h2>
      {subhead && (
        <Reveal delay={0.15}>
          <p
            className={`mt-4 text-base md:text-lg leading-[1.8] ${
              isDark ? 'text-ac-muted' : 'text-ac-ink'
            }`}
          >
            {subhead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ============================================================
   Countdown — live HH:MM:SS until OFFER_ENDS_AT. Ticks each second.
   ============================================================ */

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export function Countdown({ className = '' }: { className?: string }) {
  const target = useRef(new Date(OFFER_ENDS_AT).getTime());
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, target.current - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Avoid hydration mismatch: render nothing until mounted.
  if (remaining === null) return <span className={className} dir="ltr" />;

  const totalSec = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  const Cell = ({ value }: { value: string }) => (
    <span className="inline-flex min-w-[2ch] justify-center rounded-md bg-ac-navy-deep/80 px-2 py-1 font-inter-tight font-bold tabular-nums text-ac-gold-light ring-1 ring-ac-gold/25">
      {value}
    </span>
  );

  return (
    <span dir="ltr" className={`inline-flex items-center gap-1.5 ${className}`}>
      <Cell value={pad(hours)} />
      <span className="text-ac-gold/70">:</span>
      <Cell value={pad(mins)} />
      <span className="text-ac-gold/70">:</span>
      <Cell value={pad(secs)} />
    </span>
  );
}
