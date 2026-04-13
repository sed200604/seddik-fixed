import React, { useState } from 'react';
import { PackageData, featureCategories } from '../data/packages';
import styles from '../PricingSection.module.css';

interface PricingCardProps {
  pkg: PackageData;
  active: boolean;
}

export default function PricingCard({ pkg, active }: PricingCardProps) {
  const [includesWyoming, setIncludesWyoming] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  let cardClass = styles.cardBasic;
  let btnClass = styles.ctaBasic;

  if (pkg.id === 'standard') {
    cardClass = styles.cardStandard;
    btnClass = styles.ctaStandard;
  } else if (pkg.id === 'premium') {
    cardClass = styles.cardPremium;
    btnClass = styles.ctaPremium;
  }

  const basePrice = parseInt(pkg.price);
  const totalPrice = includesWyoming ? basePrice + 60 : basePrice;

  return (
    <div className={`${styles.pricingCardWrapper} ${active ? styles.pricingCardWrapperActive : ''}`}>
      <article
        className={`${styles.pricingCard} ${cardClass} ${includesWyoming ? styles.hasWyoming : ''}`}
        role="tabpanel"
        aria-label={`${pkg.name} Package`}
        data-package={pkg.id}
        data-base-price={basePrice}
      >
        <h3 className={styles.packageName}>{pkg.name.toUpperCase()}</h3>
        
        <div className={styles.priceBlock}>
          {pkg.savings > 0 && (
            <span className={styles.priceOriginal}>${pkg.originalPrice}</span>
          )}
          <div className={styles.priceAmount}>
             <span className={styles.priceCurrency}>$</span>
             <span className={styles.amount}>{totalPrice}</span>
          </div>
          {pkg.savings > 0 && (
            <span className={styles.priceSavings}>وفّر ${pkg.savings}</span>
          )}
        </div>

        <div className={styles.featuresList}>
          {featureCategories.map((category, idx) => (
            <div key={idx} className={styles.featureCategory}>
              <h4 className={styles.categoryTitle}>{category.title}</h4>
              
              {category.features.map((featureName, fIdx) => {
                const feature = pkg.features[featureName];
                if (!feature) return null;
                
                return (
                  <div key={fIdx} className={styles.featureRow}>
                    <div className={feature.included ? styles.featureIconYes : styles.featureIconNo} />
                    <div className={styles.featureTextWrapper}>
                       <span className={`${styles.featureText} ${!feature.included ? styles.featureTextDisabled : ''}`}>
                         {featureName}
                       </span>
                       {feature.value && feature.included && (
                         <span className={styles.featureValue}>{feature.value}</span>
                       )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* ======================= */}
        {/* WYOMING ADD-ON BOX        */}
        {/* ======================= */}
        <div className={`${styles.addonBox} ${includesWyoming ? styles.addonBoxSelected : ''}`} id={`wyoming-addon-${pkg.id}`}>
          <div className={styles.addonHeader}>
            <span className={styles.addonIcon}>🏛️</span>
            <span className={styles.addonTitle}>إضافة ولاية Wyoming</span>
            <span className={styles.addonBadge}>اختياري</span>
          </div>
          
          <div className={styles.addonBenefits}>
            <div className={styles.benefit}>
              <span className={styles.benefitCheck}>✓</span>
              <span className={styles.benefitText}>صفر ضرائب على الشركات</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitCheck}>✓</span>
              <span className={styles.benefitText}>خصوصية عالية للمالك</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitCheck}>✓</span>
              <span className={styles.benefitText}>حماية قانونية قوية</span>
            </div>
          </div>
          
          <div className={styles.addonToggleWrapper}>
            <label className={styles.addonToggle}>
              <input 
                type="checkbox" 
                className={styles.addonCheckbox} 
                checked={includesWyoming}
                onChange={(e) => setIncludesWyoming(e.target.checked)}
              />
              <span className={styles.toggleSlider}></span>
              <span className={styles.togglePrice}>+$60</span>
            </label>
          </div>
          
          <button 
            className={`${styles.addonLearnMore} ${isInfoOpen ? styles.open : ''}`} 
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            type="button"
          >
            <span>لماذا Wyoming؟</span>
            <span className={styles.arrow}>▼</span>
          </button>

          {isInfoOpen && (
            <div className={styles.wyomingInfoPanel}>
              <div className={styles.wyomingInfoContent}>
                <p><strong>لماذا Wyoming؟</strong></p>
                <p>🏛️ ولاية Wyoming من أفضل الولايات لتأسيس LLC:</p>
                <ul>
                  <li><strong>صفر ضرائب:</strong> لا ضريبة دخل على الشركات ولا ضريبة امتياز.</li>
                  <li><strong>خصوصية عالية:</strong> لا يُطلب الكشف عن هوية المالك.</li>
                  <li><strong>حماية قانونية:</strong> قوانين حماية الأصول الأقوى في أمريكا.</li>
                  <li><strong>سهولة الإدارة:</strong> تقارير سنوية بسيطة ورسوم منخفضة.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.priceDivider}></div>
        
        <div className={styles.packageTotal}>
          <span className={styles.totalLabel}>المجموع:</span>
          <span className={`${styles.totalAmount} ${includesWyoming ? styles.updating : ''}`}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>{totalPrice}</span>
          </span>
        </div>

        <button className={btnClass} aria-label={`Start with ${pkg.name}`}>
          {includesWyoming ? (
            <>
              <span>ابدأ الآن</span>
              <span className={styles.addonIndicator}>+ Wyoming</span>
              <span className={styles.arrowBtn}>←</span>
            </>
          ) : (
            <>
              <span>{pkg.cta}</span>
              <span className={styles.arrowBtn}>←</span>
            </>
          )}
        </button>
      </article>
    </div>
  );
}
