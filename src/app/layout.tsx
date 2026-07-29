import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import TrackingProvider from '@/components/TrackingProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://gollc.dz'),
  title: 'Go LLC — شركتك تعيش معنا · $100',
  description: 'الخدمة الوحيدة المخصصة للجزائريين لتأسيس شركة في أمريكا تعيش، مش تتعطل في 90 يوم.',
  openGraph: {
    title: 'Go LLC — شركتك تعيش معنا · $100',
    description: 'الخدمة الوحيدة المخصصة للجزائريين لتأسيس شركة في أمريكا تعيش، مش تتعطل في 90 يوم.',
    type: 'website',
    locale: 'ar_DZ',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Go LLC — 92/100 حسابات نشطة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Go LLC — شركتك تعيش معنا · $100',
    description: 'الخدمة الوحيدة المخصصة للجزائريين لتأسيس شركة في أمريكا تعيش، مش تتعطل في 90 يوم.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.png?v=3',
    apple: '/favicon.png?v=3',
  },
  robots: { index: true, follow: true },
  other: {
    'facebook-domain-verification': 'toxgw4qmgkuuhg59ndl86egnzg2uj3',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A1628',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Meta Pixel base code — no pixel is init'd here.
             Each page that needs a pixel inits its own via a client component. */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
        `}} />

        {/* Favicons */}
        <link rel="icon" type="image/png" href="/favicon.png?v=3" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png?v=3" />
        <link rel="apple-touch-icon" href="/favicon.png?v=3" />

        {/* Preconnect to external origins - speeds up font + analytics loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Fonts with display=swap to prevent render blocking */}
        <link rel="preload" href="/fonts/Tajawal-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Tajawal-ExtraBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Cairo-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Cairo-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/InterTight-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800&family=Inter+Tight:wght@700;800&family=Inter:wght@500&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
        />

        {/* Emergency fix for CTA Buttons and Lag */}
        <Script id="emergency-cta-fix" strategy="afterInteractive">
          {`(function() {
  'use strict';
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    console.log('🔧 Applying CTA fix...');
    
    const clickHandler = function(e) {
      const target = e.target.closest('a, button, [onclick]');
      if (!target) return;

      // Never intercept form submit buttons
      if (target.tagName === 'BUTTON' && (target.type === 'submit' || target.closest('form'))) return;

      const href = target.getAttribute('href') || '';

      // Never intercept external links (WhatsApp CTAs, etc.)
      if (href.startsWith('http')) return;

      const text = target.textContent || '';
      const isConsultation =
        href.includes('#consultation') ||
        text.includes('احجز') ||
        text.includes('استشار');
        
      if (isConsultation) {
        // Skip interception on workshop pages — they use #registration, not #book-consultation
        if (window.location.pathname.includes('/workshop')) return;

        e.preventDefault();
        // NOTE: do NOT call stopPropagation — it blocks Meta Pixel Event Setup Tool

        const section = document.querySelector('#book-consultation');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    
    document.addEventListener('click', clickHandler, true);
    
    // Global Lag fix - reduce motion on slow devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.body.classList.add('reduce-motion');
      
      const style = document.createElement('style');
      style.innerHTML = '* { animation-duration: 0.1s !important; transition-duration: 0.1s !important; scroll-behavior: auto !important; }';
      document.head.appendChild(style);
    }
  }
})();`}
        </Script>

        {/* Google Ads - afterInteractive to not block first paint */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17998077641"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-1" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17998077641');
            gtag('config', 'AW-17998153005');
          `}
        </Script>
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `document.body.classList.add('js-ready');` }} />
        <noscript>
          <style>{`.animate-on-scroll { opacity: 1 !important; transform: none !important; }`}</style>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4083068931984643&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <TrackingProvider />
        {children}
      </body>
    </html>
  );
}
