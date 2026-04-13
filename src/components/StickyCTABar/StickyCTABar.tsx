'use client';
import React, { useState, useEffect } from 'react';
import styles from './StickyCTABar.module.css';

export default function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const getContainerClass = () => {
    let classes = [styles.stickyCtaBar];
    if (isMinimized) {
      classes.push(styles.minimized);
    } else if (isVisible) {
      classes.push(styles.visible);
    }
    return classes.join(' ');
  };

  return (
    <div className={getContainerClass()} id="stickyCTA" dir="rtl">
      {/* Minimize Toggle */}
      <button 
        className={styles.minimize} 
        onClick={toggleMinimize}
        aria-label={isMinimized ? "استعادة الشريط" : "تصغير الشريط"}
      >
        <span className={isMinimized ? styles.minimizedIcon : ''}>▼</span>
      </button>

      <div className={styles.container}>
        {/* Content */}
        <div className={styles.content}>
          <div className={styles.icon}>📞</div>
          <div className={styles.text}>
            <div className={styles.title}>
              <span>استشارة مجانية</span>
              <span>—</span>
              <span>15 دقيقة تغير مستقبل عملك</span>
            </div>
            <div className={styles.subtitle}>
              <span><span className={styles.check}>✓</span> بدون التزام</span>
              <span><span className={styles.check}>✓</span> خبراء متخصصين</span>
              <span><span className={styles.check}>✓</span> إجابات فورية</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a href="#book-consultation" className={styles.button}>
          <span>احجز استشارتك الآن</span>
          <span className={styles.arrow}>←</span>
        </a>
      </div>
    </div>
  );
}
