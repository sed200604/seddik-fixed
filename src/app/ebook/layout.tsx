import type { Metadata, Viewport } from 'next';
import './ebook.css';

export const metadata: Metadata = {
  title: 'الكتاب التفاعلي — Go LLC | نحن لا نبيع التأسيس. نحن نبيع البقاء.',
  description:
    'دليلك الشامل لتأسيس شركة أمريكية LLC حقيقية. 14 فصلاً تكشف فخاخ الوكلاء، تحمي حساباتك، وتضمن بقاءك. 100 شركة في 7 أشهر — 93% حسابات نشطة.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'الكتاب التفاعلي — Go LLC',
    description:
      'نحن لا نبيع التأسيس. نحن نبيع البقاء. دليل من 14 فصلاً لحماية شركتك الأمريكية.',
    type: 'website',
    locale: 'ar_DZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الكتاب التفاعلي — Go LLC',
    description: 'نحن لا نبيع التأسيس. نحن نبيع البقاء.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1e2e',
};

export default function EbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ebook-root">
      {children}
    </div>
  );
}
