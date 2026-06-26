'use client';

import React, { useState, useRef } from 'react';
import { useGlobalAnimation } from '@/hooks/useGlobalAnimations';

export default function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useGlobalAnimation(containerRef, () => setIsVisible(true));


  return (
    <section 
      ref={containerRef} 
      className={`problem-section relative w-full bg-[#0A1628] overflow-hidden pt-[120px] pb-[160px] ${isVisible ? 'is-visible' : ''}`}
      dir="rtl"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* SVG Noise - Problem Section */
        .problem-section .grain-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          mix-blend-mode: overlay;
        }

        /* Top Vignette */
        .problem-section .top-vignette {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 320px;
          pointer-events: none;
          z-index: 5;
          background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%);
        }

        /* Card Setup */
        .problem-card {
          width: 100%;
          max-width: 327px;
          background: #0F1E36;
          border: 1px solid #1C2D4A;
          border-radius: 12px;
          padding: 32px;
          position: relative;
          opacity: 0;
          transition: box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (min-width: 1024px) {
          .problem-card {
            max-width: 360px;
            position: absolute;
            transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          
          /* Asymmetric layout */
          .card-1 { top: 0; right: 0; }
          .card-2 { top: 64px; right: calc(50% - 180px); }
          .card-3 { top: 96px; left: 0; }
          
          .problem-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 24px 48px rgba(0,0,0,0.40);
            z-index: 20;
          }
          
          /* Hover Corner Sliver extension */
          .problem-card:hover .corner-sliver {
            height: 56px;
          }
          
          /* Hover icon flicker */
          .problem-card:hover .icon-red-stroke {
            animation: flicker-stroke 300ms ease;
          }
        }

        .corner-sliver {
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 32px;
          background: #C8372D;
          border-top-left-radius: 11px; /* inner radius to match 12px outer */
          transition: height 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .red-line {
          width: 80px;
          height: 1px;
          background: #C8372D;
          clip-path: inset(0 100% 0 0); /* starts hidden */
        }

        /* ANIMATIONS */
        @media (prefers-reduced-motion: no-preference) {
          .is-visible .anim-eyebrow-prob { animation: slide-up-prob 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards; }
          .is-visible .anim-clause-1 { animation: slide-up-prob 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms forwards; }
          .is-visible .anim-clause-2 { animation: slide-up-prob 500ms cubic-bezier(0.22, 1, 0.36, 1) 600ms forwards; }
          
          /* Cards */
          .is-visible .card-1 { animation: slide-up-prob 600ms cubic-bezier(0.22, 1, 0.36, 1) 1000ms forwards, jitter-1 600ms ease 1800ms forwards; }
          .is-visible .card-2 { animation: slide-up-prob 600ms cubic-bezier(0.22, 1, 0.36, 1) 1100ms forwards, jitter-2 400ms ease 1900ms forwards; }
          .is-visible .card-3 { animation: slide-up-prob 600ms cubic-bezier(0.22, 1, 0.36, 1) 1200ms forwards, jitter-3 400ms ease 2000ms forwards; }
          
          /* Red lines */
          .is-visible .card-1 .red-line { animation: draw-rtl 500ms cubic-bezier(0.22, 1, 0.36, 1) 2200ms forwards; }
          .is-visible .card-2 .red-line { animation: draw-rtl 500ms cubic-bezier(0.22, 1, 0.36, 1) 2300ms forwards; }
          .is-visible .card-3 .red-line { animation: draw-rtl 500ms cubic-bezier(0.22, 1, 0.36, 1) 2400ms forwards; }
          
          /* Card 3 icon ghost tell */
          .is-visible .card-3-icon .icon-wrap { animation: flicker-ghost 400ms ease 2000ms; }
          
          /* Closer line */
          .is-visible .anim-closer { animation: slide-up-prob 500ms cubic-bezier(0.22, 1, 0.36, 1) 3000ms forwards; }
        }

        @media (prefers-reduced-motion: reduce) {
          .is-visible .anim-eyebrow-prob, .is-visible .anim-clause-1, .is-visible .anim-clause-2, .is-visible .anim-closer,
          .is-visible .card-1, .is-visible .card-2, .is-visible .card-3 {
            animation: fade-in-prob 250ms ease forwards;
          }
          .is-visible .red-line { clip-path: inset(0 0 0 0); }
        }

        @keyframes slide-up-prob {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-prob {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes draw-rtl {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        @keyframes jitter-1 {
          0% { transform: translateX(0); }
          13% { transform: translateX(-1.5px); }
          33% { transform: translateX(1.5px); }
          63% { transform: translateX(-0.5px); }
          100% { transform: translateX(0); }
        }
        @keyframes jitter-2 {
          0% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-1.5px) rotate(-1deg); }
          55% { transform: translateX(1.5px) rotate(0.5deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        @keyframes jitter-3 {
          0% { transform: translateX(0); }
          25% { transform: translateX(-0.5px); }
          55% { transform: translateX(0.5px); }
          100% { transform: translateX(0); }
        }
        @keyframes flicker-ghost {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        @keyframes flicker-stroke {
          0% { opacity: 1; }
          20% { opacity: 0; }
          40% { opacity: 1; }
          60% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}} />

      <div className="top-vignette"></div>
      <div className="grain-overlay"></div>

      <div className="relative z-10 mx-auto w-full max-w-[1080px] px-[24px] lg:px-0 flex flex-col items-end">
        
        {/* Eyebrow */}
        <div className="anim-eyebrow-prob opacity-0 transform translate-y-[16px] text-[#D4A843] font-[var(--font-cairo)] font-semibold text-[12px] tracking-[0.10em] mb-4 text-right">
          الواقع المُر
        </div>

        {/* Headline */}
        <h2 className="font-[var(--font-tajawal)] font-extrabold text-[32px] lg:text-[48px] text-white leading-[1.15] max-w-[720px] text-right mb-[128px]">
          <span className="anim-clause-1 opacity-0 transform translate-y-[24px] inline-block mb-2 lg:mb-0 lg:ml-2">ليش أغلب الشركات اللي يفتحوها الجزائريين</span>
          <span className="anim-clause-2 opacity-0 transform translate-y-[24px] inline-block">تتعطل خلال 90 يوم؟</span>
        </h2>

        {/* Cards Container */}
        <div className="relative w-full flex flex-col items-center gap-[64px] lg:block lg:h-[420px] mb-[96px]">
          
          {/* Card 1 */}
          <div className="problem-card card-1">
            <div className="corner-sliver"></div>
            {/* SVG 1 */}
            <div className="w-[32px] h-[32px] mb-[24px]">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <rect x="6" y="4" width="20" height="24" stroke="#D4A843" strokeWidth="1.5"/>
                <line x1="9" y1="11" x2="20" y2="11" stroke="#D4A843" strokeWidth="1.5"/>
                <line x1="9" y1="16" x2="17" y2="16" stroke="#D4A843" strokeWidth="1.5"/>
                <line x1="9" y1="21" x2="19" y2="21" stroke="#D4A843" strokeWidth="1.5"/>
                <line x1="22" y1="6" x2="8" y2="28" stroke="#C8372D" strokeWidth="1.5" strokeLinecap="round" className="icon-red-stroke"/>
              </svg>
            </div>
            <h3 className="text-white font-[var(--font-tajawal)] font-bold text-[22px] lg:text-[24px] text-right mb-[16px]">
              إغلاق الحساب البنكي
            </h3>
            <div className="w-full flex justify-end mb-[16px]">
              <div className="red-line"></div>
            </div>
            <p className="text-[#C9D2DE] font-[var(--font-cairo)] font-normal text-[16px] leading-[1.7] text-right">
              يتم تجميد حسابك البنكي فجأة بسبب استخدام عناوين بريدية وهمية أو وثائق غير مكتملة، مما يوقف أعمالك وأموالك تماماً.
            </p>
          </div>

          {/* Card 2 */}
          <div className="problem-card card-2">
            <div className="corner-sliver"></div>
            {/* SVG 2 */}
            <div className="w-[32px] h-[32px] mb-[24px]">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M16 4 C10.5 4 6 8.5 6 14 C6 21 16 28 16 28 C16 28 26 21 26 14 C26 8.5 21.5 4 16 4 Z" stroke="#D4A843" strokeWidth="1.5"/>
                <circle cx="16" cy="13" r="3" stroke="#D4A843" strokeWidth="1.5"/>
                <line x1="16" y1="28" x2="22" y2="22" stroke="#C8372D" strokeWidth="1.5" strokeLinecap="round" className="icon-red-stroke"/>
              </svg>
            </div>
            <h3 className="text-white font-[var(--font-tajawal)] font-bold text-[22px] lg:text-[24px] text-right mb-[16px]">
              عنوان وهمي ومرفوض
            </h3>
            <div className="w-full flex justify-end mb-[16px]">
              <div className="red-line"></div>
            </div>
            <p className="text-[#C9D2DE] font-[var(--font-cairo)] font-normal text-[16px] leading-[1.7] text-right">
              معظم الوكالات الرخيصة توفر لك عناوين بريدية مشتركة ترفضها البنوك الأمريكية وبوابات الدفع مثل Stripe فوراً.
            </p>
          </div>

          {/* Card 3 */}
          <div className="problem-card card-3 card-3-icon">
            <div className="corner-sliver"></div>
            {/* SVG 3 */}
            <div className="icon-wrap w-[32px] h-[32px] mb-[24px]">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <rect x="8" y="4" width="16" height="24" stroke="#D4A843" strokeWidth="1.5"/>
                <path d="M12 16 H14" stroke="#D4A843" strokeWidth="1.5"/>
                <line x1="20" y1="6" x2="24" y2="10" stroke="#C8372D" strokeWidth="1.5" strokeLinecap="round" className="icon-red-stroke"/>
                <line x1="24" y1="6" x2="20" y2="10" stroke="#C8372D" strokeWidth="1.5" strokeLinecap="round" className="icon-red-stroke"/>
              </svg>
            </div>
            <h3 className="text-white font-[var(--font-tajawal)] font-bold text-[22px] lg:text-[24px] text-right mb-[16px]">
              انعدام الدعم بعد التأسيس
            </h3>
            <div className="w-full flex justify-end mb-[16px]">
              <div className="red-line"></div>
            </div>
            <p className="text-[#C9D2DE] font-[var(--font-cairo)] font-normal text-[16px] leading-[1.7] text-right">
              بمجرد استلامك لأوراق التأسيس، يختفي الوكيل وتُترك وحدك لمواجهة الضرائب والقوانين المعقدة دون أي توجيه.
            </p>
          </div>

        </div>

        {/* Closer line */}
        <div className="anim-closer opacity-0 transform translate-y-[16px] w-full text-right">
          <p className="text-[#E8D9B2] font-[var(--font-cairo)] italic font-medium text-[18px]">
            هذا ما عشاه 8 من كل 10 ممن جربوا الخدمات الأخرى.
          </p>
        </div>

      </div>
    </section>
  );
}
