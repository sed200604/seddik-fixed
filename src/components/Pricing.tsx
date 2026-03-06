'use client';
import { useState } from 'react';
import { CheckCircle2, Info, ArrowLeft, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type StateKey = 'new-mexico' | 'wyoming' | 'delaware';

const pricingData = {
  'new-mexico': {
    starter: 99,
    pro: 149,
    premium: 189,
    modifier: 0
  },
  'wyoming': {
    starter: 149,
    pro: 199,
    premium: 239,
    modifier: 50
  },
  'delaware': {
    starter: 199,
    pro: 249,
    premium: 289,
    modifier: 100
  }
};

export default function Pricing() {
  const [selectedState, setSelectedState] = useState<StateKey>('new-mexico');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleStateChange = (state: StateKey) => {
    if (state === selectedState) return;
    setIsUpdating(true);
    setSelectedState(state);
    setTimeout(() => setIsUpdating(false), 300);
  };

  const prices = pricingData[selectedState];

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-off-white to-[#E8F0FE] overflow-hidden" id="pricing">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-gold to-yellow-400 text-navy px-5 py-2 rounded-full text-sm font-bold mb-4 shadow-md">
            💎 الباقات والأسعار
          </div>
          <h2 className="text-4xl md:text-5xl font-tajawal font-extrabold text-navy mb-4">اختر الباقة المناسبة لك</h2>
          <p className="text-xl text-medium-gray mb-12">أسعار شفافة، بدون رسوم خفية، جودة عالية مضمونة</p>

          {/* State Selector */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-lg font-bold text-dark-gray">اختر الولاية:</span>
            <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] w-full md:w-auto">
              
              <button 
                onClick={() => handleStateChange('new-mexico')}
                className={`relative flex flex-col items-center gap-1 px-8 py-4 rounded-xl transition-all duration-300 border-2 ${
                  selectedState === 'new-mexico' 
                    ? 'bg-gradient-to-r from-gold to-yellow-400 border-gold shadow-[0_4px_12px_rgba(244,196,48,0.4)]' 
                    : 'border-transparent hover:bg-off-white'
                }`}
              >
                <span className={`text-lg font-bold ${selectedState === 'new-mexico' ? 'text-navy' : 'text-dark-gray'}`}>New Mexico</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${selectedState === 'new-mexico' ? 'bg-navy/10 text-navy' : 'bg-black/5 text-medium-gray'}`}>الأفضل قيمة</span>
              </button>

              <button 
                onClick={() => handleStateChange('wyoming')}
                className={`relative flex flex-col items-center gap-1 px-8 py-4 rounded-xl transition-all duration-300 border-2 ${
                  selectedState === 'wyoming' 
                    ? 'bg-gradient-to-r from-gold to-yellow-400 border-gold shadow-[0_4px_12px_rgba(244,196,48,0.4)]' 
                    : 'border-transparent hover:bg-off-white'
                }`}
              >
                <span className={`text-lg font-bold ${selectedState === 'wyoming' ? 'text-navy' : 'text-dark-gray'}`}>Wyoming</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${selectedState === 'wyoming' ? 'bg-navy/10 text-navy' : 'bg-black/5 text-medium-gray'}`}>+$50</span>
              </button>

              <button 
                onClick={() => handleStateChange('delaware')}
                className={`relative flex flex-col items-center gap-1 px-8 py-4 rounded-xl transition-all duration-300 border-2 ${
                  selectedState === 'delaware' 
                    ? 'bg-gradient-to-r from-gold to-yellow-400 border-gold shadow-[0_4px_12px_rgba(244,196,48,0.4)]' 
                    : 'border-transparent hover:bg-off-white'
                }`}
              >
                <span className={`text-lg font-bold ${selectedState === 'delaware' ? 'text-navy' : 'text-dark-gray'}`}>Delaware</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${selectedState === 'delaware' ? 'bg-navy/10 text-navy' : 'bg-black/5 text-medium-gray'}`}>+$100</span>
              </button>

            </div>
          </div>
        </motion.div>

        {/* Info Bar */}
        <AnimatePresence>
          {prices.modifier > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-3xl mx-auto mb-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-2 text-blue-800 font-medium">
                <Info className="w-5 h-5" />
                <span>الأسعار أعلى بـ ${prices.modifier} في هذه الولاية بسبب رسوم الولاية.</span>
              </div>
              <button 
                onClick={() => setShowModal(true)}
                className="text-sm bg-white border border-blue-200 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors font-bold whitespace-nowrap min-h-[44px]"
              >
                لماذا؟ (مقارنة الولايات)
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          
          {/* Starter */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-200 h-full flex flex-col"
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-extrabold text-navy mb-2 tracking-wide">STARTER</h3>
              <p className="text-medium-gray font-medium">البداية البسيطة</p>
            </div>
            
            <div className="text-center py-6 border-y border-gray-100 mb-8 relative">
              <div className="flex items-start justify-center gap-1 mb-2">
                <span className="text-3xl font-bold text-gold mt-2">$</span>
                <motion.span 
                  key={prices.starter}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-black text-navy leading-none"
                >
                  {prices.starter}
                </motion.span>
              </div>
              <span className="text-sm text-medium-gray font-medium">لمرة واحدة</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {['تأسيس LLC', 'رقم EIN', 'عنوان افتراضي'].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-dark-gray hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                  <span className="text-[15px]">{feat}</span>
                </li>
              ))}
            </ul>
            
            <a href="#booking" className="w-full group relative overflow-hidden border-2 border-navy text-navy font-bold py-4 rounded-xl hover:bg-navy hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_8px_20px_rgba(26,58,82,0.3)]">
              <span className="relative z-10">ابدأ الآن</span>
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 relative z-10" />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
            </a>
          </motion.div>

          {/* PRO (Popular) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-white to-[#FFFEF8] rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-4 border-gold relative transform lg:scale-105 z-10 hover:shadow-[0_16px_48px_rgba(244,196,48,0.25)] hover:-translate-y-2 transition-all duration-400 h-full flex flex-col"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-400 text-navy font-bold px-6 py-2 rounded-full text-sm shadow-[0_4px_12px_rgba(244,196,48,0.4)] whitespace-nowrap animate-pulse">
              ⭐ الأكثر طلباً
            </div>
            
            <div className="text-center mb-6 mt-2">
              <h3 className="text-3xl font-extrabold text-navy mb-2 tracking-wide">PRO</h3>
              <p className="text-medium-gray font-medium">الأفضل للمحترفين</p>
            </div>
            
            <div className="text-center py-6 border-y border-gray-100 mb-8 relative">
              <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-[0_2px_8px_rgba(16,185,129,0.4)] animate-bounce">
                وفر $50
              </div>
              <div className="flex items-start justify-center gap-1 mb-2">
                <span className="text-3xl font-bold text-gold mt-2">$</span>
                <motion.span 
                  key={prices.pro}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-black text-navy leading-none"
                >
                  {prices.pro}
                </motion.span>
              </div>
              <span className="text-sm text-medium-gray font-medium">لمرة واحدة</span>
            </div>
            
            <ul className="space-y-2 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-dark-gray p-2">
                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <span className="text-[15px] font-bold">كل ما في STARTER</span>
              </li>
              {[
                { text: 'مكتب افتراضي حقيقي (Real Office)', tip: 'أقوى للبنوك!' },
                { text: 'دعم تجهيز Stripe' },
                { text: 'دعم تجهيز Wise' },
                { text: 'متابعة بعد التأسيس' }
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-dark-gray bg-green-50/50 p-3 rounded-lg border border-green-100 hover:bg-green-50 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[15px] font-medium">{feat.text}</span>
                    {feat.tip && (
                      <span className="group relative cursor-help">
                        <Info className="w-4 h-4 text-navy/50 hover:text-navy" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {feat.tip}
                        </span>
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            
            <a href="#booking" className="w-full group relative overflow-hidden bg-gradient-to-r from-gold to-yellow-400 text-navy font-bold py-4 rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(244,196,48,0.4)] hover:shadow-[0_8px_24px_rgba(244,196,48,0.5)] hover:scale-[1.02]">
              <span className="relative z-10 text-lg">ابدأ الآن</span>
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 relative z-10" />
            </a>
          </motion.div>

          {/* Premium */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-400 h-full flex flex-col"
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-extrabold text-navy mb-2 tracking-wide">PREMIUM</h3>
              <p className="text-medium-gray font-medium">الباقة الكاملة</p>
            </div>
            
            <div className="text-center py-6 border-y border-gray-100 mb-8 relative">
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-[0_2px_8px_rgba(245,158,11,0.4)] animate-bounce">
                🎁 +$100 قيمة
              </div>
              <div className="flex items-start justify-center gap-1 mb-2">
                <span className="text-3xl font-bold text-gold mt-2">$</span>
                <motion.span 
                  key={prices.premium}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-black text-navy leading-none"
                >
                  {prices.premium}
                </motion.span>
              </div>
              <span className="text-sm text-medium-gray font-medium">لمرة واحدة</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-dark-gray p-2">
                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <span className="text-[15px] font-bold">كل ما في PRO</span>
              </li>
              <li className="flex items-start gap-4 bg-gradient-to-br from-yellow-50 to-[#FFFEF8] border-2 border-gold p-4 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gold to-yellow-400 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Star className="w-3 h-3 text-navy fill-navy" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-navy text-[16px]">موقع مجاني لشركتك</span>
                  <span className="text-xs text-medium-gray">موقع احترافي جاهز!</span>
                </div>
              </li>
            </ul>
            
            <a href="#booking" className="w-full group relative overflow-hidden border-2 border-navy text-navy font-bold py-4 rounded-xl hover:bg-navy hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_8px_20px_rgba(26,58,82,0.3)]">
              <span className="relative z-10">ابدأ الآن</span>
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 relative z-10" />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
            </a>
          </motion.div>

        </div>
      </div>

      {/* State Comparison Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-medium-gray hover:text-navy bg-gray-100 hover:bg-gray-200 w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                aria-label="إغلاق النافذة"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-navy mb-6 text-center mt-4">مقارنة الولايات</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                      <th className="p-4 font-bold text-navy">الولاية</th>
                      <th className="p-4 font-bold text-navy">السعر</th>
                      <th className="p-4 font-bold text-navy">المميزات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-bold text-dark-gray">New Mexico</td>
                      <td className="p-4 text-green-600 font-bold">السعر الأساسي</td>
                      <td className="p-4 text-sm text-medium-gray leading-relaxed">✓ أفضل قيمة<br/>✓ مناسب للمبتدئين</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-bold text-dark-gray">Wyoming</td>
                      <td className="p-4 text-orange-500 font-bold">+$50</td>
                      <td className="p-4 text-sm text-medium-gray leading-relaxed">✓ خصوصية أعلى<br/>✓ لا ضرائب ولاية</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-dark-gray">Delaware</td>
                      <td className="p-4 text-red-500 font-bold">+$100</td>
                      <td className="p-4 text-sm text-medium-gray leading-relaxed">✓ قانون شركات مرن<br/>✓ محاكم متخصصة</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
