'use client';
import React from 'react';
import styles from './FloatingSidebar.module.css';

export default function FloatingSidebar() {
  return (
    <aside className={styles.floatingSidebar} dir="rtl">
      <div className={styles.card}>
        <div className={styles.icon}>📞</div>
        
        <h3 className={styles.title}>استشارة مجانية</h3>
        
        <p className={styles.description}>
          15 دقيقة مع خبرائنا تغير مستقبل عملك
        </p>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.check}>✓</span>
            <span>بدون أي التزام</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.check}>✓</span>
            <span>إجابات على كل أسئلتك</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.check}>✓</span>
            <span>خطة مخصصة لوضعك</span>
          </div>
        </div>
        
        <a href="#book-consultation" className={styles.cta}>
          احجز استشارتك الآن ←
        </a>
      </div>
    </aside>
  );
}
