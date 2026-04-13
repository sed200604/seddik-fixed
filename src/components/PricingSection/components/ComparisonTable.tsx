import React from 'react';
import { packages, featureCategories } from '../data/packages';
import styles from '../PricingSection.module.css';

export default function ComparisonTable() {
  return (
    <div className={styles.comparisonTableContainer}>
      <table className={styles.comparisonTable}>
        <caption>Detailed Package Comparison</caption>
        <thead>
          <tr>
            <th scope="col">الميزة</th>
            {packages.map((pkg) => (
              <th 
                key={pkg.id} 
                scope="col" 
                className={pkg.id === 'standard' ? styles.colStandard : ''}
              >
                <div className={styles.tableHeaderPackage}>
                  <div className={styles.tablePackageName}>{pkg.nameAr}</div>
                  <div className={styles.tablePackagePrice}>
                    <span className={styles.tableCurrency}>$</span>{pkg.price}
                  </div>
                  {pkg.savings > 0 && (
                     <>
                       <span className={styles.tablePackageOriginal}>${pkg.originalPrice}</span>
                       <span className={styles.tablePackageSavings}>وفّر ${pkg.savings}</span>
                     </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureCategories.map((category, catIdx) => (
            <React.Fragment key={catIdx}>
              <tr className={styles.categoryRow}>
                <td colSpan={4}>{category.title}</td>
              </tr>
              {category.features.map((featureName, featIdx) => (
                <tr key={featIdx}>
                  <th scope="row">{featureName}</th>
                  {packages.map((pkg) => {
                    const feature = pkg.features[featureName];
                    const isStandard = pkg.id === 'standard';
                    const colClass = isStandard ? styles.colStandard : '';
                    
                    if (!feature || !feature.included) {
                       return (
                         <td key={pkg.id} className={colClass}>
                           <span className={styles.checkNo} />
                         </td>
                       );
                    }

                    if (feature.value) {
                       return (
                         <td key={pkg.id} className={colClass}>
                           <span className={styles.cellValue}>{feature.value}</span>
                         </td>
                       );
                    }

                    return (
                      <td key={pkg.id} className={colClass}>
                        <span className={styles.checkYes} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </React.Fragment>
          ))}
          
          <tr className={styles.ctaRow}>
            <td></td>
            {packages.map((pkg) => (
              <td key={pkg.id} className={pkg.id === 'standard' ? styles.colStandard : ''}>
                <button className={pkg.id === 'standard' ? styles.ctaStandard : styles.ctaBasic}>
                  {pkg.cta}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
