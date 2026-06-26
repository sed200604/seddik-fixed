'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useGlobalAnimation } from '@/hooks/useGlobalAnimations';

interface MonospaceCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  color?: 'gold' | 'red' | 'green' | 'default';
}

const COLOR_CLASS_MAP: Record<NonNullable<MonospaceCounterProps['color']>, string> = {
  gold: 'ebook-stat',
  red: 'ebook-stat ebook-stat-red',
  green: 'ebook-stat',
  default: 'ebook-stat',
};

const COLOR_STYLE_MAP: Record<NonNullable<MonospaceCounterProps['color']>, string | undefined> = {
  gold: undefined,
  red: undefined,
  green: 'var(--color-ebook-green)',
  default: 'var(--color-ebook-text)',
};

export default function MonospaceCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
  color = 'gold',
}: MonospaceCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const formatNumber = useCallback(
    (num: number): string => {
      const rounded = Number.isInteger(value) ? Math.round(num) : parseFloat(num.toFixed(1));
      const formatted = rounded.toLocaleString('en-US');
      return `${prefix}${formatted}${suffix}`;
    },
    [prefix, suffix, value]
  );

  const [trigger, setTrigger] = useState(false);

  useGlobalAnimation(spanRef, () => setTrigger(true));

  useEffect(() => {
    if (!trigger) return;

    const el = spanRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.textContent = formatNumber(value);
      return;
    }

    const DURATION = duration * 1000;
    const start = performance.now();
    let rAF: number;

    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };

    const animate = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const ease = easeOutCubic(t);
      const currentNumber = Math.round(ease * value);
      
      if (spanRef.current) {
        spanRef.current.textContent = formatNumber(currentNumber);
      }

      if (t < 1) {
        rAF = requestAnimationFrame(animate);
      } else {
        if (spanRef.current) {
          spanRef.current.textContent = formatNumber(value);
        }
      }
    };

    rAF = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rAF);
    };
  }, [trigger, value, duration, formatNumber, prefersReducedMotion]);

  const colorClass = COLOR_CLASS_MAP[color];
  const inlineColor = COLOR_STYLE_MAP[color];

  return (
    <span
      ref={spanRef}
      className={`ebook-mono ${colorClass} ${className}`}
      style={inlineColor ? { color: inlineColor, fontVariantNumeric: 'tabular-nums' } : { fontVariantNumeric: 'tabular-nums' }}
      aria-label={formatNumber(value)}
    >
      {prefersReducedMotion ? formatNumber(value) : `${prefix}0${suffix}`}
    </span>
  );
}
