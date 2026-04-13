import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import FacebookPixel from '../components/FacebookPixel';

export const metadata: Metadata = {
  title: 'Go LLC - أسس شركتك الأمريكية بسهولة',
  description: 'أسس شركتك الأمريكية LLC في 7 أيام فقط. ادفع 39$ فقط الآن، وأكمل الباقي بعد تأسيس شركتك.',
  icons: {
    icon: '/favicon.png?v=3',
    shortcut: '/favicon.png?v=3',
    apple: '/favicon.png?v=3',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A3A52',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Favicons */}
        <link rel="icon" type="image/png" href="/favicon.png?v=3" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png?v=3" />
        <link rel="apple-touch-icon" href="/favicon.png?v=3" />

        {/* Preconnect to external origins - speeds up font + analytics loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Fonts with display=swap to prevent render blocking */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap&subset=arabic"
          rel="stylesheet"
        />

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
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
