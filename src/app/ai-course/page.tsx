import type { Metadata } from 'next';
import PagePixel from '@/components/ai-course/PagePixel';
import Preloader from '@/components/ai-course/Preloader';
import ScrollProgressBar from '@/components/ai-course/ScrollProgressBar';
import HeroSection from '@/components/ai-course/HeroSection';
import ProblemSection from '@/components/ai-course/ProblemSection';
import SolutionSection from '@/components/ai-course/SolutionSection';
import CurriculumSection from '@/components/ai-course/CurriculumSection';
import TrainerSection from '@/components/ai-course/TrainerSection';
import OfferStackSection from '@/components/ai-course/OfferStackSection';
import GuaranteeSection from '@/components/ai-course/GuaranteeSection';
import LogisticsSection from '@/components/ai-course/LogisticsSection';
import FAQSection from '@/components/ai-course/FAQSection';
import RegistrationSection from '@/components/ai-course/RegistrationSection';
import FinalCTASection from '@/components/ai-course/FinalCTASection';
import Footer from '@/components/ai-course/Footer';
import StickyMobileCTA from '@/components/ai-course/StickyMobileCTA';

export const metadata: Metadata = {
  title: 'دورة الذكاء الاصطناعي | GO LLC',
  description:
    'تعلّم كيف تستخدم الذكاء الاصطناعي فعليًا في عملك ودراستك وحياتك اليومية — في جلسة تطبيقية واحدة مع بن زغدة محمد في باب الزوار مول، المحمدية، الجزائر العاصمة.',
  keywords: [
    'دورة الذكاء الاصطناعي',
    'ChatGPT',
    'Prompt Engineering',
    'GO LLC',
    'بن زغدة محمد',
    'الجزائر العاصمة',
    'باب الزوار',
    'المحمدية',
  ],
  openGraph: {
    title: 'دورة الذكاء الاصطناعي | GO LLC',
    description: 'الذكاء الاصطناعي... بالطريقة الصحيحة والقوية',
    locale: 'ar_AR',
    type: 'website',
  },
};

export default function AICoursePage() {
  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen text-[#f0ece2] selection:bg-[#c9a84c]/30 selection:text-[#f0ece2] relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(180deg, #04070c 0%, #071021 30%, #050a14 60%, #081326 100%)',
      }}
    >
      {/* Fixed ambient glows — stay in place while scrolling */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[15%] right-[-10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.07)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-12%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(28,70,120,0.14)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.04)_0%,transparent_65%)] blur-3xl" />
      </div>

      <PagePixel />
      <Preloader />
      <ScrollProgressBar />
      <StickyMobileCTA />

      <main className="w-full relative z-10">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <CurriculumSection />
        <TrainerSection />
        <OfferStackSection />
        <GuaranteeSection />
        <LogisticsSection />
        <FAQSection />
        <RegistrationSection />
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
