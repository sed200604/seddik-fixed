import type { Metadata } from 'next';
import GoHero from '../../../components/GoHero';

export const metadata: Metadata = {
  title: 'Go LLC — باعولك ورقة... ما باعولكش البقاء',
  description: 'الخدمة الوحيدة المخصصة للجزائريين. مع Go LLC، شركتك تبقى حية — حساب بنكي نشط، Stripe شغّال، دعم حقيقي.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Go LLC — باعولك ورقة... ما باعولكش البقاء',
    description: 'الخدمة الوحيدة المخصصة للجزائريين. مع Go LLC، كل شيء يختلف.',
    locale: 'ar_AR',
    type: 'website',
  },
};

export default function GoLandingPage() {
  return (
    <main dir="rtl" style={{ background: '#0A1628', minHeight: '100vh' }}>
      <GoHero />
    </main>
  );
}
