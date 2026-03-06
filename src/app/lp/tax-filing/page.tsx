'use client';
import { trackEvent } from '../../../components/FacebookPixel';

export default function TaxFilingLandingPage() {
  const handleCTA = () => {
    trackEvent('InitiateCheckout');
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white font-cairo">
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          لا تدع غرامات الـ IRS تدمر أرباحك!
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
          قدم إقرارك الضريبي لشركتك الأمريكية (LLC) اليوم وتجنب غرامة الـ 50,000 دولار. خدمة مخصصة لغير المقيمين.
        </p>
        <button 
          onClick={handleCTA}
          className="bg-gold text-navy font-bold text-xl py-4 px-12 rounded-full hover:scale-105 transition-transform shadow-lg"
        >
          احجز استشارتك المجانية الآن
        </button>
      </section>

      {/* Pain Points & Benefits */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-navy">لماذا تختار Go LLC؟</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <h3 className="text-xl font-bold text-red-700 mb-4">❌ المشاكل التي تواجهك</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• قوانين الضرائب الأمريكية معقدة جداً</li>
              <li>• غرامة التأخير تصل إلى 50,000$</li>
              <li>• المحاسبون الأجانب أسعارهم مبالغ فيها</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-xl font-bold text-green-700 mb-4">✅ الحل معنا</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• فريق خبراء عربي يفهم احتياجاتك</li>
              <li>• تقديم النماذج الصحيحة (1120 & 5472)</li>
              <li>• أسعار شفافة وبدون رسوم خفية</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-50 py-16 px-4 text-center" id="booking">
        <h2 className="text-2xl font-bold mb-6 text-navy">الوقت ينفد! الموعد النهائي يقترب</h2>
        <button 
          onClick={handleCTA}
          className="bg-navy text-white font-bold text-lg py-4 px-10 rounded-full hover:bg-opacity-90 transition-colors"
        >
          ابدأ إجراءات الإقرار الضريبي
        </button>
      </section>
    </main>
  );
}
