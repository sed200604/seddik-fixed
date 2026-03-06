import { Metadata } from 'next';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ProblemSolution from '../components/ProblemSolution';
import Pricing from '../components/Pricing';
import Process from '../components/Process';
import BookingForm from '../components/BookingForm';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ReadingProgress from '../components/ReadingProgress';
import Header from '../components/Header';

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
    <div className="min-h-screen font-cairo">
      <ReadingProgress />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <Pricing />
        <Process />
        <BookingForm />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
