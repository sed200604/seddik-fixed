import type { Metadata } from 'next';
import PagePixel from '@/components/ai-course/PagePixel';
import Preloader from '@/components/ai-course/Preloader';
import SmoothScroll from '@/components/ai-course/SmoothScroll';
import ScrollProgressBar from '@/components/ai-course/ScrollProgressBar';
import StickyMobileCTA from '@/components/ai-course/StickyMobileCTA';
import HeroSection from '@/components/ai-course/HeroSection';
import ShowcaseSection from '@/components/ai-course/ShowcaseSection';
import ProblemSolutionSection from '@/components/ai-course/ProblemSolutionSection';
import AudienceSection from '@/components/ai-course/AudienceSection';
import CurriculumSection from '@/components/ai-course/CurriculumSection';
import WhyDifferentSection from '@/components/ai-course/WhyDifferentSection';
import InstructorSection from '@/components/ai-course/InstructorSection';
import SocialProofSection from '@/components/ai-course/SocialProofSection';
import PricingSection from '@/components/ai-course/PricingSection';
import RegistrationSection from '@/components/ai-course/RegistrationSection';
import FAQSection from '@/components/ai-course/FAQSection';
import FinalCTASection from '@/components/ai-course/FinalCTASection';
import Footer from '@/components/ai-course/Footer';
import {
  COURSE_START_DATE,
  PRICE_STANDARD_NEW,
} from '@/components/ai-course/constants';

export const metadata: Metadata = {
  title: 'دورة بناء مواقع بالذكاء الاصطناعي | Go LLC',
  description:
    '5 أيام لايف. Frontend + Backend. تعلّم تبني مواقع احترافية بالـ AI وابدا تربح. أول فوج بـ 12,000 دج.',
  keywords: [
    'بناء مواقع بالذكاء الاصطناعي',
    'دورة مواقع',
    'AI website',
    'Go LLC',
    'CodyX',
    'ربح من الأنترنت',
    'فريلانس',
    'الجزائر',
  ],
  openGraph: {
    title: 'دورة بناء مواقع بالذكاء الاصطناعي | Go LLC',
    description: '5 أيام لايف — تعلّم تبني مواقع احترافية بالـ AI وابدا تربح منها.',
    locale: 'ar_DZ',
    type: 'website',
    // TODO(placeholder): design a dedicated share image for this course.
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'دورة بناء مواقع بالذكاء الاصطناعي — Go LLC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'دورة بناء مواقع بالذكاء الاصطناعي | Go LLC',
    description: '5 أيام لايف — Frontend + Backend — أول فوج بـ 12,000 دج.',
    images: ['/og-image.png'],
  },
};

// Course / Event structured data (Google rich results).
const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'دورة بناء مواقع بالذكاء الاصطناعي',
  description:
    '5 أيام لايف تطبيقية لتعلّم بناء مواقع احترافية (Frontend + Backend) بالذكاء الاصطناعي والربح منها.',
  provider: {
    '@type': 'Organization',
    name: 'Go LLC',
    sameAs: 'https://gollc.dz',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    // TODO(placeholder): confirm real start date.
    startDate: COURSE_START_DATE,
    offers: {
      '@type': 'Offer',
      price: PRICE_STANDARD_NEW,
      priceCurrency: 'DZD',
      availability: 'https://schema.org/InStock',
    },
  },
};

export default function AICourseLandingPage() {
  return (
    <div dir="rtl" lang="ar" className="relative w-full overflow-x-hidden bg-ac-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      <PagePixel />
      <Preloader />
      <SmoothScroll />
      <ScrollProgressBar />
      <StickyMobileCTA />

      <main className="w-full">
        <HeroSection />
        <ShowcaseSection />
        <ProblemSolutionSection />
        <AudienceSection />
        <CurriculumSection />
        <WhyDifferentSection />
        <InstructorSection />
        <SocialProofSection />
        <PricingSection />
        <RegistrationSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
