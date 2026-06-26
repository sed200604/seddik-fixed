import type { Metadata } from 'next';
import Script from 'next/script';
import ProClient from './ProClient';

export const metadata: Metadata = {
  title: 'Go LLC Pro Package - $149 | US LLC + 3 Banks + Payment Gateways',
  description: 'Complete US LLC formation + Wise + Mercury + Verto + Stripe + PayPal. All in one Pro Package for $149. 70+ LLCs formed. 100% success rate.',
  robots: { index: true, follow: true },
};

const PRO_PIXEL = '971404735379392';

export default function ProPage() {
  return (
    <>
      <Script id="fb-pixel-pro" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PRO_PIXEL}');
        fbq('track', 'PageView');
      `}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PRO_PIXEL}&ev=PageView&noscript=1`}
          alt="" />
      </noscript>
      <ProClient />
    </>
  );
}
