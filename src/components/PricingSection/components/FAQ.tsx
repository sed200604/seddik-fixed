'use client';

import React, { useState } from 'react';
import styles from '../PricingSection.module.css';

const faqs = [
  {
    q: 'ما الفرق الرئيسي بين الباقات؟',
    a: 'الفرق الأساسي في مستوى الحماية والمرافقة:\n\nBasic ($99): فقط التأسيس القانوني\nStandard ($149): التأسيس + الحسابات + الحماية الأساسية\nPremium ($179): كل شيء + نظام الحماية الكامل\n\nمعظم عملائنا يختارون Standard لأنه يشمل كل ما يحتاجونه للبدء بأمان.'
  },
  {
    q: 'هل يمكن الترقية لاحقاً؟',
    a: 'نعم! يمكنك الترقية في أي وقت بدفع الفرق فقط.\n\nمثال: إذا بدأت بـ Basic ($99) وقررت الترقية لـ Standard،\nتدفع فقط $50 (الفرق بين $99 و $149).\n\nلكن نصيحتنا: ابدأ بالباقة المناسبة من البداية لتوفير الوقت.'
  },
  {
    q: 'كم تستغرق عملية التأسيس؟',
    a: 'Timeline حسب الباقة:\n\nBasic: 3-5 أيام عمل\n- تأسيس LLC: 1-2 يوم\n- استخراج EIN: 1-2 يوم\n- تسليم المستندات: فوري\n\nStandard: 7-10 أيام عمل\n- كل ما في Basic\n- فتح Mercury: 2-3 أيام\n- فتح Relay: 2-3 أيام\n- إعداد الإجابات: 1 يوم\n\nPremium: 7-14 يوم عمل\n- كل ما في Standard\n- Setup كامل: 3-5 أيام إضافية\n- التدريب والاستشارة'
  },
  {
    q: 'ما المشمول في فترة الدعم؟',
    a: 'الدعم يشمل:\n\nBasic (30 يوم):\n- مساعدة في إتمام التأسيس\n- الرد على الأسئلة العامة\n- التوجيه الأساسي\n\nStandard (60 يوم):\n- كل ما في Basic\n- مساعدة في فتح الحسابات\n- مراجعة إيميلات البنك\n- إرشاد عند الحاجة\n\nPremium (90 يوم):\n- كل ما في Standard\n- استشارات متقدمة\n- رد سريع (2-4 ساعات)\n- دعم استراتيجي'
  },
  {
    q: 'هل الدعم مجاني مدى الحياة؟',
    a: 'الدعم المشمول في كل باقة محدد بفترة معينة (30-90 يوم).\n\nبعد انتهاء الفترة:\n- يمكنك التواصل معنا في أي وقت\n- نساعدك حسب الحاجة\n- خدمات معينة قد تكون مدفوعة منفصلة\n\nلكن خلال فترة الباقة: دعم كامل مشمول ✓'
  },
  {
    q: 'أي باقة تنصحونني بها؟',
    a: 'نصيحتنا حسب حالتك:\n\nاختر Basic ($99) إذا:\n- عندك خبرة في فتح الحسابات\n- ميزانية محدودة جداً\n- تريد فقط التأسيس القانوني\n\nاختر Standard ($149) إذا: ⭐ (ننصح به)\n- أول مرة تؤسس LLC\n- تريد البدء بحسابات جاهزة\n- تريد حماية أساسية\n- هذا خيار 85% من عملائنا\n\nاختر Premium ($179) إذا:\n- تريد راحة البال الكاملة\n- لا تريد أي مخاطرة\n- تقدّر الوقت والخبرة\n- تريد الأفضل'
  },
  {
    q: 'هل الأسعار شاملة كل شيء؟',
    a: 'نعم! الأسعار شاملة:\n✓ رسوم الولاية (State fees)\n✓ رسوم الـ Registered Agent\n✓ كل خدماتنا\n✓ الدعم خلال الفترة المحددة\n\nالتكاليف الوحيدة الإضافية (اختيارية):\n- رسوم البنوك السنوية (يدفعها البنك مباشرة)\n- خدمات إضافية بعد انتهاء فترة الدعم\n\nلا مفاجآت، لا رسوم خفية ✓'
  }
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={styles.faqSection}>
      <h3 className={styles.faqHeadline}>أسئلة شائعة عن الباقات 💬</h3>
      <div role="list">
        {faqs.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div key={index} className={styles.faqItem} role="listitem">
              <button
                className={styles.faqQuestion}
                aria-expanded={isExpanded}
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.q}</span>
                <span className={styles.faqIcon} aria-hidden="true">▼</span>
              </button>
              <div
                className={styles.faqAnswer}
                aria-hidden={!isExpanded}
              >
                {faq.a}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
