'use client';

import type { ReactNode } from 'react';

interface TrustBadgeProps {
  text: string;
  icon?: ReactNode;
  variant?: 'gold' | 'green';
}

const VARIANT_STYLES: Record<NonNullable<TrustBadgeProps['variant']>, React.CSSProperties> = {
  gold: {},
  green: {
    backgroundColor: 'oklch(0.72 0.16 155 / 0.1)',
    color: 'var(--color-ebook-green)',
    borderColor: 'oklch(0.72 0.16 155 / 0.2)',
  },
};

export default function TrustBadge({
  text,
  icon,
  variant = 'gold',
}: TrustBadgeProps) {
  const style = variant === 'green' ? VARIANT_STYLES.green : undefined;

  return (
    <span className="ebook-badge" style={style}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {text}
    </span>
  );
}
