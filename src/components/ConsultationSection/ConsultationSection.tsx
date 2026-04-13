'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ConsultationSection.module.css';

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwHcrAbRrSHMVzHDE7QrAe2rDgsh1auVGKR8keMKYzyzRS8xkyAbAxqUa8JtdUFi5SU/exec';

export default function ConsultationSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: '',
    preferredTime: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // no-cors mode means we can't read the response, but if no error thrown it worked
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', businessType: '', preferredTime: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="book-consultation" className={styles.consultationSection} dir="rtl">
      <div className={styles.consultationContainer}>
        {/* SECTION HEADER */}
        <div className={styles.consultationHeader}>
          <div className={styles.headerBadge}>
            <span className={styles.badgeIcon}>🎯</span>
            <span className={styles.badgeText}>احجز استشارتك المجانية</span>
          </div>
          
          <h2 className={styles.headerTitle}>
            <span className={styles.highlight}>15 دقيقة</span> تغير مستقبل عملك
          </h2>
          
          <div className={styles.headerFeatures}>
            <span className={styles.feature}>
              <span className={styles.check}>✓</span> مع خبرائنا
            </span>
            <span className={styles.feature}>
              <span className={styles.check}>✓</span> بدون التزام
            </span>
            <span className={styles.feature}>
              <span className={styles.check}>✓</span> إجابات فورية
            </span>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className={styles.consultationGrid}>
          {/* FORM CARD (Left Side) */}
          <div className={styles.formCard}>
            <form className={styles.consultationForm} onSubmit={handleSubmit} id="consultationForm">
              
              {/* Name Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <span className={styles.labelIcon}>👤</span>
                  <span className={styles.labelText}>الاسم الكامل</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    placeholder="أدخل اسمك الكامل"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              
              {/* Phone Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <span className={styles.labelIcon}>📱</span>
                  <span className={styles.labelText}>رقم الهاتف (WhatsApp)</span>
                </label>
                <div className={`${styles.inputWrapper} ${styles.phoneInput}`}>
                  <span className={styles.countryCode}>+213</span>
                  <input 
                    type="tel" 
                    className={styles.formInput} 
                    placeholder="XX XXX XXXX"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    dir="ltr"
                  />
                </div>
              </div>
              
              {/* Business Type */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <span className={styles.labelIcon}>💼</span>
                  <span className={styles.labelText}>نوع عملك</span>
                </label>
                <div className={`${styles.inputWrapper} ${styles.selectWrapper}`}>
                  <select 
                    className={styles.formSelect} 
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                  >
                    <option value="" disabled>اختر نوع عملك</option>
                    <option value="ecommerce">🛒 متجر إلكتروني</option>
                    <option value="services">💻 خدمات رقمية</option>
                    <option value="freelance">👨‍💻 Freelance</option>
                    <option value="saas">☁️ SaaS</option>
                    <option value="agency">🏢 وكالة / Agency</option>
                    <option value="other">📦 أخرى</option>
                  </select>
                  <span className={styles.selectArrow}>▼</span>
                </div>
              </div>
              
              {/* Preferred Time */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <span className={styles.labelIcon}>🕐</span>
                  <span className={styles.labelText}>الوقت المفضل للاتصال</span>
                </label>
                <div className={`${styles.inputWrapper} ${styles.selectWrapper}`}>
                  <select 
                    className={styles.formSelect} 
                    required
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                  >
                    <option value="" disabled>اختر الوقت المناسب</option>
                    <option value="morning">🌅 صباحاً (9:00 - 12:00)</option>
                    <option value="afternoon">☀️ ظهراً (12:00 - 15:00)</option>
                    <option value="evening">🌆 مساءً (15:00 - 18:00)</option>
                    <option value="anytime">🕐 أي وقت متاح</option>
                  </select>
                  <span className={styles.selectArrow}>▼</span>
                </div>
              </div>
              
              {/* Submit Button */}
              <button type="submit" className={styles.formSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className={styles.submitIcon}>⏳</span>
                    <span className={styles.submitText}>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <span className={styles.submitIcon}>⭐</span>
                    <span className={styles.submitText}>احجز استشارتك الآن</span>
                    <span className={styles.submitArrow}>←</span>
                  </>
                )}
              </button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  <span>✅</span>
                  <span>تم إرسال طلبك بنجاح! سنتواصل معك قريباً.</span>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  <span>❌</span>
                  <span>حدث خطأ أثناء الإرسال. يرجى المحاولة مجدداً أو التواصل عبر WhatsApp.</span>
                </div>
              )}

              {/* Urgency Note */}
              <div className={styles.urgencyNote}>
                <span className={styles.urgencyIcon}>⚡</span>
                <span className={styles.urgencyText}>الأماكن محدودة — احجز الآن قبل الامتلاء</span>
              </div>
              
            </form>
            
            {/* Divider */}
            <div className={styles.formDivider}>
              <span className={styles.dividerLine}></span>
              <span className={styles.dividerText}>أو تواصل مباشرة</span>
              <span className={styles.dividerLine}></span>
            </div>
            
            {/* Alternative Contact */}
            <div className={styles.alternativeContact}>
              <a href="https://wa.me/213791789125?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%85%D8%AC%D8%A7%D9%86%D9%8A%D8%A9%20%D9%85%D8%B9%20Go%20LLC%20%F0%9F%8F%9B%EF%B8%8F" target="_blank" rel="noopener noreferrer" className={`${styles.altBtn} ${styles.whatsapp}`}>
                <span className={styles.btnIcon}>📱</span>
                <span className={styles.btnText}>WhatsApp</span>
              </a>
              <a href="mailto:contact@go-llc.com" className={`${styles.altBtn} ${styles.email}`}>
                <span className={styles.btnIcon}>📧</span>
                <span className={styles.btnText}>Email</span>
              </a>
            </div>
            
            {/* Privacy Note */}
            <div className={styles.privacyNote}>
              <span className={styles.privacyIcon}>🔒</span>
              <span className={styles.privacyText}>معلوماتك آمنة ولن نشاركها مع أي طرف</span>
            </div>
            
          </div>

          {/* TRUST CARD (Right Side) */}
          <div className={styles.trustCard}>
            
            {/* Office Image */}
            <div className={styles.officeImageContainer}>
              <Image 
                src="/images/office-algiers.jpg" 
                alt="مكتب Go LLC في الجزائر" 
                fill
                className={styles.officeImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80';
                }}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.liveBadge}>
                  <span className={styles.pulseDot}></span>
                  <span>مكتب حقيقي</span>
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div className={styles.officeLocation}>
              <span className={styles.locationIcon}>📍</span>
              <span className={styles.locationText}>الجزائر العاصمة + قسنطينة</span>
            </div>
            
            {/* Trust Features */}
            <div className={styles.trustFeatures}>
              <div className={styles.trustFeature}>
                <div className={styles.featureIconBox}>
                  <span>🏢</span>
                </div>
                <div className={styles.featureContent}>
                  <span className={styles.featureTitle}>مكاتب حقيقية</span>
                  <span className={styles.featureDesc}>يمكنك زيارتنا شخصياً</span>
                </div>
                <span className={styles.featureCheck}>✅</span>
              </div>
              
              <div className={styles.trustFeature}>
                <div className={styles.featureIconBox}>
                  <span>👥</span>
                </div>
                <div className={styles.featureContent}>
                  <span className={styles.featureTitle}>فريق متخصص</span>
                  <span className={styles.featureDesc}>خبراء في LLC والبنوك</span>
                </div>
                <span className={styles.featureCheck}>✅</span>
              </div>
              
              <div className={styles.trustFeature}>
                <div className={styles.featureIconBox}>
                  <span>🏆</span>
                </div>
                <div className={styles.featureContent}>
                  <span className={styles.featureTitle}>+100 عميل ناجح</span>
                  <span className={styles.featureDesc}>ثقة مثبتة</span>
                </div>
                <span className={styles.featureCheck}>✅</span>
              </div>
              
              <div className={styles.trustFeature}>
                <div className={styles.featureIconBox}>
                  <span>📈</span>
                </div>
                <div className={styles.featureContent}>
                  <span className={styles.featureTitle}>معدل نجاح 95%</span>
                  <span className={styles.featureDesc}>نتائج حقيقية</span>
                </div>
                <span className={styles.featureCheck}>✅</span>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className={styles.miniTestimonial}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.testimonialText}>
                ساعدوني في استرداد حسابي خلال 19 يوم بدل 180 يوم! فريق محترف جداً.
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop')" }} />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>محمد أحمد</span>
                  <span className={styles.authorLocation}>قسنطينة 🇩🇿</span>
                </div>
                <div className={styles.rating}>⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
