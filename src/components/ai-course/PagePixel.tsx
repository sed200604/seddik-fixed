'use client';

import { useEffect } from 'react';

const AI_COURSE_PIXEL_ID = '1602512821224637';

export default function PagePixel() {
  useEffect(() => {
    let attempts = 0;
    const initPixel = () => {
      if (typeof window === 'undefined') return;
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (typeof fbq === 'function') {
        fbq('init', AI_COURSE_PIXEL_ID);
        fbq('trackSingle', AI_COURSE_PIXEL_ID, 'PageView');
      } else if (attempts < 10) {
        attempts++;
        setTimeout(initPixel, 300);
      }
    };

    initPixel();
  }, []);

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${AI_COURSE_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}

