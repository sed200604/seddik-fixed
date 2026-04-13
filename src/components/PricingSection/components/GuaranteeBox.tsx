import React from 'react';
import styles from '../PricingSection.module.css';

export default function GuaranteeBox() {
  return (
    <div className={styles.guaranteeBox}>
      <div className={styles.guaranteeIcon} role="img" aria-label="🛡️">🛡️</div>
      <h3 className={styles.guaranteeHeadline}>ضماننا لك: رضاك 100% أو استرجاع أموالك</h3>
      
      <p className={styles.guaranteeText}>
        نحن واثقون من جودة خدماتنا. إذا لم تكن راضياً 100% 
        عن خدمة التأسيس خلال أول 7 أيام، نرجع لك أموالك كاملة.<br/><br/>
        <strong>لا أسئلة، لا تعقيدات، لا مشاكل.</strong>
      </p>

      <ul className={styles.guaranteeList}>
        <li>LLC سيتم تأسيسه بنجاح (مضمون)</li>
        <li>EIN ستحصل عليه (مضمون)</li>
        <li>الحسابات سنفتحها معك (Standard & Premium)</li>
        <li>كل الوثائق ستكون صحيحة (مضمون)</li>
      </ul>

      <p className={styles.guaranteePromise}>
        "نعمل حتى تنجح - هذا التزامنا معك"
      </p>

      <div className={styles.guaranteeSmall}>
        * الضمان يشمل جودة خدمة التأسيس والإعداد<br/>
        * خلال 7 أيام من بدء العمل<br/>
        * استرجاع كامل بدون أسئلة
      </div>
    </div>
  );
}
