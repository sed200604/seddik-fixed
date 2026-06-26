'use client';

import { useRef, useCallback, useEffect, useState, type ReactNode, type MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  variant: 'gold' | 'green' | 'outline';
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel: string;
}

const VARIANT_CLASS_MAP: Record<MagneticButtonProps['variant'], string> = {
  gold: 'ebook-magnetic-btn ebook-magnetic-btn-gold',
  green: 'ebook-magnetic-btn ebook-magnetic-btn-green',
  outline: 'ebook-magnetic-btn ebook-magnetic-btn-outline',
};

const MAGNETIC_RADIUS = 100;
const MAGNETIC_STRENGTH = 0.3;

export default function MagneticButton({
  children,
  variant,
  href,
  onClick,
  className = '',
  ariaLabel,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isCoarse, setIsCoarse] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(pointer: coarse)');
    setIsCoarse(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (isCoarse) return;
      const el = btnRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < MAGNETIC_RADIUS) {
        const translateX = distX * MAGNETIC_STRENGTH;
        const translateY = distY * MAGNETIC_STRENGTH;
        el.style.transform = `translate(${translateX}px, ${translateY}px)`;
      }
    },
    [isCoarse]
  );

  const handleMouseLeave = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  }, []);

  const variantClass = VARIANT_CLASS_MAP[variant];
  const combinedClass = `${variantClass} ${className}`;

  const sharedProps = {
    className: combinedClass,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    'aria-label': ariaLabel,
    'data-magnetic': true,
  } as const;

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        {...sharedProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      {...sharedProps}
    >
      {children}
    </button>
  );
}
