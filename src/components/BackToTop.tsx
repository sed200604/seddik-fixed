'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="العودة للأعلى"
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-navy text-white shadow-lg flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: '#1A3A52' }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
