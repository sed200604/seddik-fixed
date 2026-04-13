import React from 'react';
import styles from '../PricingSection.module.css';

export default function ValueHighlights() {
  return (
    <div className={styles.valueSection}>
      <h3 className={styles.valueHeadline}>لماذا تختار كل باقة؟</h3>

      <div className={styles.valueGrid}>
        {/* Card 1: Basic */}
        <div className={styles.valueCard} style={{ borderTop: '4px solid #6c757d' }}>
          <span className={styles.valueIcon} role="img" aria-label="🎯">🎯</span>
          <h4>اختر Basic إذا:</h4>
          <ul className={styles.valuePoints}>
            <li>تريد فقط التأسيس القانوني</li>
            <li>عن عندك خبرة في التعامل مع البنوك</li>
            <li>ميزانية محدودة</li>
            <li>ستفتح الحسابات بنفسك</li>
          </ul>
          <div className={styles.valuePerfectFor}>
            رواد الأعمال ذوي الخبرة
          </div>
        </div>

        {/* Card 2: Standard */}
        <div className={styles.valueCard} style={{ borderTop: '4px solid #F4C430', boxShadow: '0 8px 24px rgba(244,196,48,0.15)' }}>
          <span className={styles.valueIcon} role="img" aria-label="💼">💼</span>
          <h4>اختر Standard إذا:</h4>
          <ul className={styles.valuePoints}>
            <li>تريد البدء فوراً بحسابات جاهزة</li>
            <li>تحتاج حماية أساسية من الأخطاء</li>
            <li>تريد الكتاب المجاني ($97 value)</li>
            <li>تريد أفضل قيمة مقابل السعر</li>
          </ul>
          <div className={styles.valuePerfectFor} style={{ background: '#FFFEF8', color: '#1A3A52', border: '1px solid #F4C430' }}>
            85% من عملائنا (الخيار الأذكى)
          </div>
          <div className={styles.valueBanner}>
            "يشمل كل ما تحتاجه للبدء بأمان: LLC + حسابات جاهزة + حماية أساسية + تعليم. كل هذا بـ $149 فقط!"
          </div>
        </div>

        {/* Card 3: Premium */}
        <div className={styles.valueCard} style={{ borderTop: '4px solid #1A3A52' }}>
          <span className={styles.valueIcon} role="img" aria-label="🛡️">🛡️</span>
          <h4>اختر Premium إذا:</h4>
          <ul className={styles.valuePoints}>
            <li>تريد راحة البال الكاملة</li>
            <li>لا تريد أي مخاطرة بإغلاق الحساب</li>
            <li>تقدّر الوقت (نوفر عليك 20+ ساعة)</li>
            <li>تريد الحماية القصوى منذ اليوم الأول</li>
          </ul>
          <div className={styles.valuePerfectFor}>
            من يريد النجاح المضمون
          </div>
          <div className={styles.valueBanner} style={{ backgroundColor: '#1A3A52', color: '#ffffff' }}>
            "نظام حماية كامل قيمته $500+ تحصل عليه مقابل $30 إضافية فقط = توفير 64% + ضمان راحة البال"
          </div>
        </div>
      </div>
    </div>
  );
}
