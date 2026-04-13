import { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import WhyChooseGoLLC from '../../components/WhyChooseGoLLC';

export const metadata: Metadata = {
  title: 'لماذا Go LLC - أسس شركتك الأمريكية بسهولة',
  description: 'تعرف على 10 أسباب تجعل Go LLC خيارك الأمثل لإنشاء شركتك الأمريكية مع عقد إيجار حقيقي.',
};

export default function WhyChooseUsPage() {
  return (
    <div className="min-h-screen font-cairo bg-white">
      <Header />
      <main className="pt-20"> 
        {/* Added padding top so the header doesn't overlap */}
        <WhyChooseGoLLC />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
