'use client';

import React, { useState } from 'react';
import styles from './PricingSection.module.css';
import { packages } from './data/packages';
import PricingTabs from './components/PricingTabs';
import PricingCard from './components/PricingCard';
import ComparisonTable from './components/ComparisonTable';
import ValueHighlights from './components/ValueHighlights';
import GuaranteeBox from './components/GuaranteeBox';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState('standard');

  return (
    <section className={styles.section} aria-label="Pricing and Packages" id="pricing">
      <div className={styles.headingWrapper}>
        <h2 className={styles.mainHeadline}>مقارنة تفصيلية بين الباقات</h2>
        <p className={styles.subHeadline}>Detailed Package Comparison</p>
        <div className={styles.stateNotice}>هذه باقات ولاية نيوميكسيكو</div>
      </div>

      <PricingTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className={styles.pricingCardsMobile}>
        {packages.map((pkg) => (
          <PricingCard key={pkg.id} pkg={pkg} active={activeTab === pkg.id} />
        ))}
      </div>

      <ComparisonTable />
      
      <ValueHighlights />
      
      <GuaranteeBox />
      
      <FAQ />
      
      <FinalCTA />
      
    </section>
  );
}
