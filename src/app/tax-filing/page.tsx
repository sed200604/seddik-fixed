'use client';
import React, { useEffect, useState } from 'react';
import '../../styles/TaxFiling.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import BookingForm from '../../components/BookingForm';
import FAQ from '../../components/FAQ';
import FinalCTA from '../../components/FinalCTA';

export default function TaxFiling() {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      let deadline = new Date(currentYear, 3, 15); // April 15th
      
      if (today > deadline) {
        deadline = new Date(currentYear + 1, 3, 15);
      }
      
      const diffTime = Math.abs(deadline.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      setDaysLeft(diffDays);
    };

    calculateDaysLeft();
  }, []);

  const scrollToForm = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-cairo bg-off-white">
      <Header />
      
      <main>
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-background">
            <div className="animated-shapes"></div>
          </div>
          
          <div className="hero-container w-full">
            <div className="max-w-7xl mx-auto px-5">
              <div className="alert-banner animate-slideDown">
                <span className="alert-icon">⚠️</span>
                <span className="alert-text">
                  <strong>تحذير عاجل:</strong> الموعد النهائي 15 أبريل - 
                  <span className="countdown-timer" id="daysLeft">{daysLeft}</span> يوماً متبقية!
                </span>
              </div>
            </div>
            
            <div className="hero-content">
              <div className="hero-copy">
                <div className="trust-badge animate-fadeIn delay-1">
                  <span className="badge-icon">🇺🇸</span>
                  <span>محاسب أمريكي معتمد CPA</span>
                </div>
                
                <h1 className="hero-headline animate-scaleUp delay-2">
                  تجنب غرامة <br />
                  <span className="highlight-text animate-pulse">50,000 دولار</span>
                  <br />من الـ IRS!
                </h1>
                
                <p className="hero-subheadline animate-slideUp delay-3">
                  قدّم إقرارك الضريبي الإلزامي<br/>
                  (Form 1120 & 5472) بشكل صحيح ومضمون
                </p>
                
                <ul className="pain-points">
                  <li className="pain-item animate-slideRight delay-4">
                    <span className="pain-icon">❌</span>
                    <span>عدم التقديم = غرامة تلقائية 25,000$ لكل نموذج</span>
                  </li>
                  <li className="pain-item animate-slideRight delay-5">
                    <span className="pain-icon">❌</span>
                    <span>الـ IRS لا يرسل تحذيرات - أول رسالة هي الغرامة</span>
                  </li>
                  <li className="pain-item animate-slideRight delay-6">
                    <span className="pain-icon">❌</span>
                    <span>التأخير يوم واحد = غرامات إضافية + فوائد</span>
                  </li>
                </ul>
                
                <div className="price-box animate-bounceIn delay-7">
                  <div className="price-content">
                    <div className="original-price">
                      <span className="crossed">$297</span>
                      <span className="discount-badge">خصم 80%</span>
                    </div>
                    <div className="current-price">
                      <span className="currency">$</span>
                      <span className="amount">59</span>
                      <span className="period">فقط</span>
                    </div>
                    <div className="price-features">
                      <span className="feature-mini">✓ محاسب أمريكي CPA</span>
                      <span className="feature-mini">✓ مراجعة شاملة</span>
                      <span className="feature-mini">✓ تقديم مباشر</span>
                    </div>
                  </div>
                </div>
                
                <div className="hero-cta animate-slideUp delay-8">
                  <button className="btn-primary pulse-animation" onClick={scrollToForm}>
                    <span className="btn-icon">📋</span>
                    <span className="btn-text">احجز استشارة مجانية الآن</span>
                    <span className="btn-arrow">→</span>
                  </button>
                  <p className="cta-subtext">
                    ⏱️ استشارة 15 دقيقة مجانية | 🔒 بدون التزام
                  </p>
                </div>
                
                <div className="social-proof-mini animate-fadeIn delay-9 mt-6">
                  <div className="avatars">
                    <img src="https://i.pravatar.cc/100?img=11" className="avatar" alt="Client" />
                    <img src="https://i.pravatar.cc/100?img=12" className="avatar" alt="Client" />
                    <img src="https://i.pravatar.cc/100?img=13" className="avatar" alt="Client" />
                    <span className="avatar-more">+50</span>
                  </div>
                  <p className="proof-text">
                    <strong>50+ عميل</strong> قدموا إقراراتهم معنا هذا الشهر
                  </p>
                </div>
              </div>
              
              <div className="hero-visual">
                <div className="visual-container animate-floatUp delay-4">
                  <div className="form-mockup">
                    <div className="form-header">
                      <span className="form-logo">IRS</span>
                      <span className="form-title">Form 1120 & 5472</span>
                    </div>
                    <div className="form-body">
                      <div className="form-line animate-fillRight delay-5"></div>
                      <div className="form-line animate-fillRight delay-6"></div>
                      <div className="form-line animate-fillRight delay-7"></div>
                      <div className="form-check animate-scaleIn delay-8">✓</div>
                    </div>
                  </div>
                  
                  <div className="penalty-warning floating">
                    <div className="warning-icon animate-shake">⚠️</div>
                    <div className="warning-amount">
                      <span className="amount-currency">$</span>
                      <span className="amount-number">50,000</span>
                    </div>
                    <p className="warning-text">غرامة محتملة</p>
                  </div>
                  
                  <div className="deadline-calendar absolute bottom-0 left-0 bg-white p-4 rounded-xl shadow-xl border-2 border-red-500 transform -rotate-6">
                    <div className="calendar-header text-center font-bold text-red-600 mb-2 border-b pb-2">أبريل 2026</div>
                    <div className="calendar-grid grid grid-cols-5 gap-2 text-center text-sm">
                      <div className="text-gray-400">1</div>
                      <div className="text-gray-400">2</div>
                      <div className="text-gray-400">3</div>
                      <div className="text-gray-400">4</div>
                      <div className="text-gray-400">5</div>
                      <div className="text-gray-400">...</div>
                      <div className="text-gray-400">10</div>
                      <div className="text-gray-400">11</div>
                      <div className="text-gray-400">12</div>
                      <div className="text-gray-400">13</div>
                      <div className="text-gray-400">14</div>
                      <div className="bg-red-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]">15</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="scroll-indicator animate-bounce">
            <span>اكتشف المزيد</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="problem-section">
          <div className="container mx-auto px-5">
            <div className="section-header animate-on-scroll">
              <span className="section-badge">⚠️ الحقيقة الصادمة</span>
              <h2>هل تعلم أن شركتك في خطر؟</h2>
              <p className="section-subtitle">
                حتى لو لم تحقق شركتك أرباحاً... التقديم إلزامي!
              </p>
            </div>
            
            <div className="problem-grid">
              <div className="problem-card animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                <div className="card-icon danger">
                  <span className="icon-emoji">💸</span>
                  <div className="icon-pulse"></div>
                </div>
                <h3>غرامة تلقائية</h3>
                <p className="card-description">
                  25,000 دولار لكل نموذج (Form 1120 & 5472)
                  = <strong className="highlight-danger">50,000 دولار إجمالي</strong>
                </p>
                <div className="card-detail">
                  <span className="detail-icon">!</span>
                  <span>حتى لو دخل الشركة = صفر!</span>
                </div>
              </div>
              
              <div className="problem-card animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                <div className="card-icon danger">
                  <span className="icon-emoji">📧</span>
                  <div className="icon-pulse"></div>
                </div>
                <h3>بدون تحذير مسبق</h3>
                <p className="card-description">
                  الـ IRS <strong>لا يرسل تذكيرات</strong>.
                  أول رسالة تصلك = إشعار الغرامة مباشرة!
                </p>
                <div className="card-detail">
                  <span className="detail-icon">!</span>
                  <span>لا توجد فرصة ثانية</span>
                </div>
              </div>
              
              <div className="problem-card animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                <div className="card-icon danger">
                  <span className="icon-emoji">📅</span>
                  <div className="icon-pulse"></div>
                </div>
                <h3>موعد نهائي صارم</h3>
                <p className="card-description">
                  15 أبريل - لا استثناءات، لا تمديد.
                  <strong>يوم واحد تأخير = غرامات إضافية</strong>
                </p>
                <div className="card-detail">
                  <span className="detail-icon">!</span>
                  <span>الوقت ينفد!</span>
                </div>
              </div>
              
              <div className="problem-card animate-on-scroll" style={{ animationDelay: '0.4s' }}>
                <div className="card-icon danger">
                  <span className="icon-emoji">🚫</span>
                  <div className="icon-pulse"></div>
                </div>
                <h3>خطر إغلاق الشركة</h3>
                <p className="card-description">
                  عدم الالتزام المتكرر قد يؤدي لـ
                  <strong>إلغاء تسجيل الشركة</strong> وإغلاقها إدارياً
                </p>
                <div className="card-detail">
                  <span className="detail-icon">!</span>
                  <span>خسارة استثمارك بالكامل</span>
                </div>
              </div>
            </div>
            
            <div className="real-story animate-on-scroll">
              <div className="story-content">
                <div className="story-icon">😰</div>
                <div className="story-text">
                  <h4>قصة حقيقية:</h4>
                  <p>
                    "أحمد من الرياض نسي تقديم الإقرار لأنه ظن أن شركته 'غير عاملة' 
                    لا تحتاج تقديم. بعد 6 أشهر وصلته رسالة من IRS بغرامة 
                    <strong className="danger-text"> 50,000 دولار</strong>! 
                    كان مضطراً لدفع المبلغ بالكامل + رسوم قانونية."
                  </p>
                  <span className="story-tag">لا تكن مثل أحمد!</span>
                </div>
              </div>
            </div>
            
            <div className="transition-box animate-on-scroll">
              <p className="transition-text">
                الخبر السار: <strong>يمكنك تجنب كل هذا!</strong> ⬇️
              </p>
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION */}
        <section className="solution-section">
          <div className="container mx-auto px-5">
            <div className="section-header animate-on-scroll">
              <span className="section-badge success">✅ الحل الآمن</span>
              <h2>نقدم إقرارك الضريبي بشكل صحيح ومضمون</h2>
              <p className="section-subtitle">
                محاسب أمريكي معتمد (CPA) يراجع ويقدم إقرارك مباشرة للـ IRS
              </p>
            </div>
            
            <div className="benefits-grid">
              <div className="benefit-card animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                <div className="benefit-number">01</div>
                <div className="benefit-icon">📋</div>
                <h3>إعداد كامل للنموذجين</h3>
                <p>
                  Form 1120 & Form 5472 معدّان بدقة متناهية
                  وفق معايير IRS الصارمة
                </p>
                <ul className="mini-features">
                  <li>✓ تحليل دقيق لوضع شركتك</li>
                  <li>✓ حساب صحيح للأرقام</li>
                  <li>✓ تعبئة كاملة بدون أخطاء</li>
                </ul>
              </div>
              
              <div className="benefit-card animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                <div className="benefit-number">02</div>
                <div className="benefit-icon">👨‍💼</div>
                <h3>مراجعة من CPA أمريكي</h3>
                <p>
                  محاسب قانوني معتمد (Certified Public Accountant)
                  يراجع كل تفصيلة
                </p>
                <div className="authority-badge">
                  <span className="text-2xl">🇺🇸</span>
                  <span className="font-bold text-navy">Licensed CPA</span>
                </div>
              </div>
              
              <div className="benefit-card animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                <div className="benefit-number">03</div>
                <div className="benefit-icon">📤</div>
                <h3>تقديم مباشر للـ IRS</h3>
                <p>
                  نقدم الإقرار إلكترونياً بشكل رسمي
                  وتحصل على إيصال معتمد
                </p>
                <ul className="mini-features">
                  <li>✓ تقديم إلكتروني آمن</li>
                  <li>✓ تأكيد استلام IRS</li>
                  <li>✓ إيصال رسمي</li>
                </ul>
              </div>
              
              <div className="benefit-card animate-on-scroll" style={{ animationDelay: '0.4s' }}>
                <div className="benefit-number">04</div>
                <div className="benefit-icon">🛡️</div>
                <h3>ضمان الحماية الكاملة</h3>
                <p>
                  حماية من الغرامات + متابعة حتى
                  القبول النهائي من IRS
                </p>
                <div className="guarantee-seal">
                  <span className="seal-icon">✓</span>
                  <span>ضمان 100%</span>
                </div>
              </div>
            </div>
            
            <div className="process-section animate-on-scroll">
              <h3 className="process-title">كيف نعمل؟ (بسيط وسريع)</h3>
              <div className="process-timeline">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>احجز استشارة مجانية</h4>
                    <p>املأ النموذج أسفل الصفحة (دقيقتان)</p>
                    <span className="step-duration">⏱️ دقيقتان</span>
                  </div>
                  <div className="step-arrow hidden md:block">←</div>
                </div>
                
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>نراجع وضعك</h4>
                    <p>نحلل وضع شركتك ونحدد المطلوب بالضبط</p>
                    <span className="step-duration">⏱️ يوم واحد</span>
                  </div>
                  <div className="step-arrow hidden md:block">←</div>
                </div>
                
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>نعد الإقرار</h4>
                    <p>CPA أمريكي يعد ويراجع النماذج</p>
                    <span className="step-duration">⏱️ 2-3 أيام</span>
                  </div>
                  <div className="step-arrow hidden md:block">←</div>
                </div>
                
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>نقدم للـ IRS</h4>
                    <p>تقديم رسمي + تحصل على إيصال معتمد</p>
                    <span className="step-duration">✅ فوري</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="authority-section animate-on-scroll">
              <div className="authority-content">
                <div className="authority-left">
                  <h3>لماذا تثق بنا؟</h3>
                  <div className="trust-points">
                    <div className="trust-point">
                      <div className="trust-icon">🏆</div>
                      <div className="trust-text">
                        <strong>6 سنوات خبرة</strong>
                        <span>في تأسيس الشركات والإقرارات الضريبية</span>
                      </div>
                    </div>
                    <div className="trust-point">
                      <div className="trust-icon">✅</div>
                      <div className="trust-text">
                        <strong>معدل نجاح 100%</strong>
                        <span>جميع الإقرارات قُبلت من IRS بدون مشاكل</span>
                      </div>
                    </div>
                    <div className="trust-point">
                      <div className="trust-icon">👥</div>
                      <div className="trust-text">
                        <strong>50+ عميل راضٍ</strong>
                        <span>قدموا إقراراتهم معنا هذا الموسم</span>
                      </div>
                    </div>
                    <div className="trust-point">
                      <div className="trust-icon">🇺🇸</div>
                      <div className="trust-text">
                        <strong>محاسب أمريكي CPA</strong>
                        <span>مرخص ومعتمد من الحكومة الأمريكية</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="authority-right">
                  <div className="testimonials-mini">
                    <div className="testimonial-mini">
                      <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
                      <p className="testimonial-text">
                        "خدمة ممتازة! قدموا إقراري في 3 أيام وحصلت على 
                        تأكيد IRS. أنصح الجميع!"
                      </p>
                      <div className="testimonial-author">
                        <img src="https://i.pravatar.cc/100?img=33" className="author-avatar" alt="Client" />
                        <div className="author-info">
                          <strong>خالد المنصوري</strong>
                          <span>صاحب LLC في Delaware</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="testimonial-mini">
                      <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
                      <p className="testimonial-text">
                        "كنت خائفاً من الموضوع لكنهم سهلوا كل شيء. 
                        السعر ممتاز مقارنة بالخدمات الأخرى."
                      </p>
                      <div className="testimonial-author">
                        <img src="https://i.pravatar.cc/100?img=11" className="author-avatar" alt="Client" />
                        <div className="author-info">
                          <strong>أحمد السالم</strong>
                          <span>فريلانسر - Wyoming LLC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION (Specific to Tax Filing) */}
        <section className="py-20 bg-gradient-to-b from-white to-off-white" id="tax-pricing">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <h2 className="text-4xl md:text-5xl font-tajawal font-bold text-navy mb-6">استثمار بسيط لحماية شركتك</h2>
            <p className="text-xl text-medium-gray mb-12">لا تخاطر بغرامة 50,000$ من أجل توفير مبلغ بسيط</p>
            
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gold relative max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-200">
              <div className="absolute top-0 left-0 w-full bg-red-500 text-white py-2 font-bold text-sm animate-pulse">
                عرض محدود - ينتهي قريباً!
              </div>
              
              <div className="p-10 pt-16">
                <h3 className="text-3xl font-bold text-navy mb-4">باقة الإقرار الضريبي الشاملة</h3>
                <div className="flex justify-center items-center gap-4 mb-8">
                  <span className="text-3xl text-gray-400 line-through font-bold">$297</span>
                  <div className="flex items-start">
                    <span className="text-4xl font-bold text-gold mt-2">$</span>
                    <span className="text-7xl font-black text-navy">59</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-10 text-right">
                  <li className="flex items-center gap-3 text-lg text-dark-gray">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 text-sm font-bold">✓</span>
                    إعداد Form 1120
                  </li>
                  <li className="flex items-center gap-3 text-lg text-dark-gray">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 text-sm font-bold">✓</span>
                    إعداد Form 5472
                  </li>
                  <li className="flex items-center gap-3 text-lg text-dark-gray">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 text-sm font-bold">✓</span>
                    مراجعة وتدقيق من CPA أمريكي
                  </li>
                  <li className="flex items-center gap-3 text-lg text-dark-gray">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 text-sm font-bold">✓</span>
                    تقديم مباشر وإلكتروني للـ IRS
                  </li>
                  <li className="flex items-center gap-3 text-lg text-dark-gray">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 text-sm font-bold">✓</span>
                    إيصال تأكيد الاستلام
                  </li>
                </ul>
                
                <button onClick={scrollToForm} className="w-full bg-gradient-to-r from-gold to-yellow-400 text-navy font-black text-xl py-5 rounded-xl shadow-[0_10px_30px_rgba(244,196,48,0.4)] hover:shadow-[0_15px_40px_rgba(244,196,48,0.6)] hover:-translate-y-1 transition-all">
                  احجز استشارتك المجانية الآن
                </button>
                <p className="text-sm text-medium-gray mt-4">🔒 دفع آمن ومضمون 100%</p>
              </div>
            </div>
          </div>
        </section>

        {/* FORM SECTION */}
        <BookingForm 
          title="احجز استشارتك الضريبية المجانية"
          subtitle="15 دقيقة لنناقش وضع شركتك الضريبي وكيف يمكننا مساعدتك في تقديم الإقرار"
          isTaxFiling={true}
        />

        {/* FAQ SECTION */}
        <FAQ 
          title="الأسئلة الشائعة حول الإقرار الضريبي"
          subtitle="كل ما تحتاج معرفته عن Form 1120 و Form 5472"
          data={[
            {
              category: "أسئلة عامة",
              questions: [
                { q: "شركتي لم تحقق أي أرباح، هل يجب أن أقدم إقراراً؟", a: "نعم! التقديم إلزامي لجميع شركات LLC المملوكة لأجانب (Single-Member LLC) حتى لو كان الدخل صفراً. عدم التقديم يعرضك لغرامة 25,000$ لكل نموذج." },
                { q: "ما هي النماذج المطلوبة؟", a: "تحتاج إلى تقديم Form 1120 (إقرار ضريبة دخل الشركات) و Form 5472 (تقرير المعلومات للشركات الأجنبية المملوكة بنسبة 25% أو أكثر)." },
                { q: "ما هو الموعد النهائي للتقديم؟", a: "الموعد النهائي هو 15 أبريل من كل عام. التأخير يعرضك لغرامات فورية." }
              ]
            },
            {
              category: "الغرامات والمخاطر",
              questions: [
                { q: "ما هي غرامة عدم التقديم؟", a: "الغرامة هي 25,000$ عن Form 5472، وقد تصل إلى غرامات إضافية عن Form 1120. الإجمالي قد يتجاوز 50,000$." },
                { q: "هل يرسل الـ IRS تحذيرات قبل فرض الغرامة؟", a: "لا، الـ IRS لا يرسل تذكيرات. أول رسالة ستصلك هي إشعار بالغرامة." },
                { q: "هل يمكنني إلغاء شركتي لتجنب الغرامة؟", a: "لا، إلغاء الشركة لا يعفيك من الالتزامات الضريبية عن السنوات السابقة. الـ IRS سيظل يطالبك بالغرامات." }
              ]
            },
            {
              category: "خدماتنا",
              questions: [
                { q: "من سيقوم بإعداد إقراري الضريبي؟", a: "سيقوم محاسب أمريكي معتمد (CPA) مرخص من الحكومة الأمريكية بإعداد ومراجعة إقرارك الضريبي لضمان خلوه من الأخطاء." },
                { q: "كم يستغرق إعداد الإقرار؟", a: "عادة ما يستغرق إعداد ومراجعة الإقرار من 2 إلى 3 أيام عمل بعد استلام جميع المعلومات المطلوبة." },
                { q: "هل سأحصل على إيصال استلام من الـ IRS؟", a: "نعم، بمجرد تقديم الإقرار إلكترونياً، سنرسل لك إيصالاً رسمياً يثبت استلام الـ IRS لإقرارك." }
              ]
            }
          ]}
        />

        {/* FINAL CTA */}
        <FinalCTA 
          title="جاهز لتقديم إقرارك الضريبي؟"
          subtitle="ادفع 59 دولار فقط الآن، واحمي شركتك من غرامة 50,000$"
          priceText="احجز استشارتك المجانية الآن"
          targetId="booking"
          isTaxFiling={true}
        />

      </main>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
