'use client';

import { useEffect, useState } from 'react';
import { WHATSAPP_LINK } from './constants';
import { WhatsAppIcon } from './ui';
import { trackCTAClick } from './tracking';

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2200);

    const handleScroll = () => {
      if (window.innerWidth > 768) {
        setShow(false);
        return;
      }

      // Hide while an inline CTA inside main is on screen
      const ctaButtons = document.querySelectorAll('main .cta-button');
      let inlineVisible = false;
      ctaButtons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) inlineVisible = true;
      });

      setShow(!inlineVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#070d18]/95 backdrop-blur-md border-t border-[#1a2c48] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        show ? 'translate-y-0 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]' : 'translate-y-full'
      }`}
    >
      <a
        href="https://wa.me/213554218743?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AA%D8%B3%D8%AC%D9%8A%D9%84%20%D9%81%D9%8A%20%D8%AF%D9%88%D8%B1%D8%A9%20%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A%20%E2%9C%85"
        target="_blank"
        rel="noopener"
        onClick={() => trackCTAClick('sticky_mobile')}
        data-cta-source="sticky_mobile"
        className="sticky-cta-btn w-full h-12 flex items-center justify-center gap-2.5 rounded-full text-[#071018] font-extrabold text-base shadow-[0_4px_16px_rgba(201,168,76,0.35)] active:scale-95 transition-transform cursor-pointer"
        style={{ background: 'linear-gradient(120deg, #b3903a 0%, #e8d48b 45%, #c9a84c 100%)' }}
      >
        <WhatsAppIcon className="w-5 h-5" />
        <span>راسلنا الآن على واتساب</span>
      </a>
    </div>
  );
}
