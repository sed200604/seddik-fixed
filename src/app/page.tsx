import { Metadata } from 'next';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ProblemSolution from '../components/ProblemSolution';
import WhyDifferent from '../components/WhyDifferent';
import PricingSection from '../components/PricingSection';
import Process from '../components/Process';
import SolutionSystem from '../components/SolutionSystem';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ReadingProgress from '../components/ReadingProgress';
import Header from '../components/Header';

// New Components replacing CTA flow
import StickyCTABar from '../components/StickyCTABar/StickyCTABar';
import FloatingSidebar from '../components/FloatingSidebar/FloatingSidebar';
import ConsultationSection from '../components/ConsultationSection/ConsultationSection';

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
      
      {/* Absolute fixed layer for extra UI pieces */}
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
        
        {/* We place ConsultationSection just below the Calendly interactive form, replacing FinalCTA */}
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}
