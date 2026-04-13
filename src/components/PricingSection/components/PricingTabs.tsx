import React from 'react';
import styles from '../PricingSection.module.css';

interface PricingTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function PricingTabs({ activeTab, onTabChange }: PricingTabsProps) {
  return (
    <div className={styles.pricingTabs} role="tablist" aria-label="Pricing Packages">
      <button
        role="tab"
        aria-selected={activeTab === 'basic'}
        className={`${styles.pricingTab} ${activeTab === 'basic' ? styles.pricingTabActive : ''}`}
        onClick={() => onTabChange('basic')}
      >
        Basic
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'standard'}
        className={`${styles.pricingTab} ${styles.pricingTabRecommended} ${activeTab === 'standard' ? styles.pricingTabActive : ''}`}
        onClick={() => onTabChange('standard')}
      >
        Standard
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'premium'}
        className={`${styles.pricingTab} ${activeTab === 'premium' ? styles.pricingTabActive : ''}`}
        onClick={() => onTabChange('premium')}
      >
        Premium
      </button>
    </div>
  );
}
