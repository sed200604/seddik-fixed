'use client';

import Script from 'next/script';

const AI_COURSE_PIXEL_ID = '1602512821224637';

/**
 * Self-contained Meta Pixel install for the AI-course page.
 *
 * Uses the canonical Meta base snippet injected via next/script (afterInteractive)
 * rather than a useEffect — this guarantees the loader runs and `init` + `PageView`
 * fire on every environment, so Meta Pixel Helper reliably detects the pixel.
 * `trackSingle` scopes PageView to THIS pixel so it never double-counts the
 * site-wide pixel that the global TrackingProvider manages.
 */
export default function PagePixel() {
  return (
    <>
      <Script id="ac-course-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${AI_COURSE_PIXEL_ID}');
          fbq('trackSingle','${AI_COURSE_PIXEL_ID}','PageView');
        `}
      </Script>
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
    </>
  );
}
