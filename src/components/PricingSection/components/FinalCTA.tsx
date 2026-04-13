import React from 'react';
import styles from '../PricingSection.module.css';

export default function FinalCTA() {
  return (
    <div className={styles.finalCtaSection}>
      <h3 className={styles.finalCtaHeadline}>جاهز لبدء شركتك الأمريكية؟ 🚀</h3>
      <p className={styles.finalCtaSub}>انضم لـ 30+ رائد أعمال جزائري بدأوا معنا</p>
      
      <div className={styles.finalCtaButtons}>
        <button className={`${styles.ctaButton} ${styles.btnBasic}`} style={{ width: 'auto' }}>
          ابدأ بـ Basic - $99 →
        </button>
        <button className={`${styles.ctaButton} ${styles.btnStandard}`} style={{ width: 'auto' }}>
          ابدأ بـ Standard - $149 ⭐
        </button>
        <button className={`${styles.ctaButton} ${styles.btnPremium}`} style={{ width: 'auto' }}>
          ابدأ بـ Premium - $179 →
        </button>
      </div>

      <div className={styles.finalCtaFeatures}>
        <span>✓ ضمان استرجاع المال 100%</span>
        <span>✓ تأسيس مضمون خلال 5 أيام</span>
        <span>✓ دعم عربي كامل</span>
        <span>✓ بدون رسوم خفية</span>
      </div>

      <p className={styles.finalCtaSmall}>
        لديك أسئلة؟ تواصل معنا عبر واتساب: +213XXXXXXXXX
      </p>
    </div>
  );
}
