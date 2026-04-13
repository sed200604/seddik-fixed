import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Above-fold — load immediately
import Hero from '../components/Hero';
import Header from '../components/Header';

// Below-fold — lazy loaded to reduce initial bundle
const TrustBar         = dynamic(() => import('../components/TrustBar'));
const ProblemSolution  = dynamic(() => import('../components/ProblemSolution'));
const WhyDifferent     = dynamic(() => import('../components/WhyDifferent'));
const PricingSection   = dynamic(() => import('../components/PricingSection'));
const Process          = dynamic(() => import('../components/Process'));
const SolutionSystem   = dynamic(() => import('../components/SolutionSystem'));
const ConsultationSection = dynamic(() => import('../components/ConsultationSection/ConsultationSection'));
const Footer           = dynamic(() => import('../components/Footer'));

// Fixed UI — lazy loaded (ssr handled per component via useEffect)
const FloatingWhatsApp = dynamic(() => import('../components/FloatingWhatsApp'));
const ReadingProgress  = dynamic(() => import('../components/ReadingProgress'));
const StickyCTABar     = dynamic(() => import('../components/StickyCTABar/StickyCTABar'));
const FloatingSidebar  = dynamic(() => import('../components/FloatingSidebar/FloatingSidebar'));

export const metadata: Metadata = {
  title: 'Go LLC - أسس شركتك الأمريكية بسهولة',
  description: 'أسس شركتك الأمريكية LLC في 7 أيام فقط. ادفع 39$ فقط الآن، وأكمل الباقي بعد تأسيس شركتك. احصل على حساب بنكي أمريكي وابدأ تجارتك العالمية.',
  keywords: ['تأسيس شركة أمريكية', 'LLC', 'حساب بنكي أمريكي', 'سترايب', 'تجارة إلكترونية'],
  openGraph: {
    title: 'Go LLC - أسس شركتك الأمريكية بسهولة',
    description: 'أسس شركتك الأمريكية LLC في 7 أيام فقط. ادفع 39$ فقط الآن.',
    url: 'https://www.go-llc.com',
    siteName: 'Go LLC',
    locale: 'ar_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Go LLC - أسس شركتك الأمريكية بسهولة',
    description: 'أسس شركتك الأمريكية LLC في 7 أيام فقط.',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen font-cairo overflow-x-hidden relative">
      <ReadingProgress />
      <Header />

      {/* Fixed overlay UI */}
      <StickyCTABar />
      <FloatingSidebar />
      <FloatingWhatsApp />

      <main>
        <Hero />
        <WhyDifferent />
        <TrustBar />
        <ProblemSolution />
        <SolutionSystem />
        <PricingSection />
        <Process />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}
