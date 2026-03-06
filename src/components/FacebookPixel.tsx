'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: any;
  }
}

// Both Meta Pixel IDs
export const FB_PIXEL_IDS = ['1455366932871333', '1672882490793111'];

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    FB_PIXEL_IDS.forEach(id => window.fbq('trackSingle', id, 'PageView'));
  }
};

export const trackEvent = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    FB_PIXEL_IDS.forEach(id => window.fbq('trackSingle', id, name, options));
  }
};

export default function FacebookPixel() {
  const pathname = usePathname();

  // Fire PageView on every route change
  useEffect(() => {
    pageview();
  }, [pathname]);

  return (
    <>
      {/* Meta Pixel — loaded after interactive to not block page speed */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1455366932871333');
            fbq('init', '1672882490793111');
            fbq('track', 'PageView');
          `,
        }}
      />
      {/* Noscript fallbacks for both pixels */}
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1455366932871333&ev=PageView&noscript=1" alt="" />
      </noscript>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1672882490793111&ev=PageView&noscript=1" alt="" />
      </noscript>
    </>
  );
}
