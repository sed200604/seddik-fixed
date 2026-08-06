'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 150);
    const t2 = setTimeout(() => setGone(true), 450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#05080f] transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <span className="text-[#f0ece2] font-black text-4xl tracking-tight">
          GO <span className="text-[#c9a84c]">LLC</span>
        </span>
        <span className="block h-px w-24 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
        <span dir="ltr" className="font-jetbrains text-[10px] tracking-[0.4em] text-[#5d6e85]">
          BUILD WITH AI — ALGERIA
        </span>
      </div>
    </div>
  );
}
