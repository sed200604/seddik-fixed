import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import FacebookPixel from '../components/FacebookPixel';

export const metadata: Metadata = {
  title: 'Go LLC - أسس شركتك الأمريكية بسهولة',
  description: 'أسس شركتك الأمريكية LLC في 7 أيام فقط. ادفع 39$ فقط الآن، وأكمل الباقي بعد تأسيس شركتك.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
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
