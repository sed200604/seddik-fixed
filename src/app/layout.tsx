import type { Metadata } from 'next';
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
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png?v=3" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png?v=3" />
        <link rel="apple-touch-icon" href="/favicon.png?v=3" />
        {/* Google tag 1 (gtag.js) - AW-17998077641 */}
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
          `}
        </Script>

        {/* Google tag 2 (gtag.js) - AW-17998153005 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17998153005"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-2" strategy="afterInteractive">
          {`
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
