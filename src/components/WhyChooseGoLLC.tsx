'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './WhyChooseGoLLC.module.css';
import { 
  Building2, 
  Trophy, 
  Zap, 
  ShieldCheck, 
  Headset, 
  Package, 
  Gem, 
  Globe, 
  Award, 
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Frown,
  AlertCircle,
  Users,
  TrendingUp,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Lock
} from 'lucide-react';

const advantagesList = [
  {
    icon: <Building2 size={40} />,
    title: "عقد إيجار مكتب حقيقي",
    badgeLabel: "EXCLUSIVE",
    badgeClass: styles.advBadgeRed,
    desc: "نحن الوحيدون في كل الجزائر اللي عندنا مكاتب أمريكية حقيقية مع lease agreement أصلي. مش virtual address زي الباقين. هذا السر اللي يخليك تنجح مع Wise Business 100%.",
    proof: "✓ Verified by Wise",
    proofClass: styles.advProofGreen
  },
  {
    icon: <Trophy size={40} />,
    title: "معدل نجاح 100%",
    badgeLabel: "PROVEN",
    badgeClass: styles.advBadgeGreen,
    desc: "30+ عميل جزائري نجحوا معانا. كلهم الآن عندهم Wise Business شغال وحساباتهم نشطة. معدل نجاحنا: 100%. معدل رفض: 0%. السجل يتكلم عن نفسه.",
    isStats: true,
    statsHighlight: "100%",
    statsSub: "30+ عملاء"
  },
  {
    icon: <Zap size={40} />,
    title: "جاهز في 10 أيام فقط",
    badgeLabel: "FASTEST",
    badgeClass: styles.advBadgeOrange,
    desc: "من الصفر لشركة كاملة في 10 أيام. بينما الآخرون ياخذون 6-8 أسابيع (أو أكثر)، نحن نخلصك كل شي في أقل من أسبوعين. كل يوم تأخير = فرص ضايعة.",
    proof: "Others: 6-8 weeks ❌",
    proofClass: styles.advProofRedCross
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "ضمان 100% استرجاع المال",
    badgeLabel: "GUARANTEED",
    badgeClass: styles.advBadgeGreen,
    desc: "إذا ما نجحنا نفعّل Wise Business لك، نرجعلك فلوسك كاملة. $179 كامل، بدون أسئلة، خلال 48 ساعة. نحن واثقين من خدمتنا لدرجة نضمنها بالكامل.",
    proof: "Money-Back Guarantee",
    proofClass: `${styles.advProofGreen} ${styles.pulse}`
  },
  {
    icon: <Headset size={40} />,
    title: "دعم VIP جزائري 24/7",
    badgeLabel: "VIP",
    badgeClass: styles.advBadgePurpleGradient,
    desc: "فريق جزائري متفرغ لك على واتساب. رد خلال دقيقتين (معدلنا الفعلي). مش بالإنجليزي، مش بعد أيام، مش رسائل آلية. دعم حقيقي من ناس يفهموك ويساعدوك بالعربي.",
    proof: "🟢 Online Now",
    proofClass: styles.advProofGreen
  },
  {
    icon: <Package size={40} />,
    title: "كل شي في باقة واحدة",
    badgeLabel: "ALL-INCLUSIVE",
    badgeClass: styles.advBadgeBlue,
    desc: "LLC + عقد الإيجار + Wise Business + موقع احترافي + دعم VIP. كل شي تحتاجه في مكان واحد. سعر واحد. مزود خدمة واحد. 0 مفاجآت. 0 تكاليف إضافية.",
    proof: "✅ 7+ Premium Services",
    proofClass: styles.advProofGreen
  },
  {
    icon: <Gem size={40} />,
    title: "قيمة خيالية - $179 فقط",
    badgeLabel: "BEST VALUE",
    badgeClass: styles.advBadgeRed,
    desc: "لو تشتري كل خدمة لحالها تدفع $900+. معانا كل شي شامل بـ$179 فقط. توفر أكثر من $700 وتحصل على جودة أعلى. أفضل استثمار $179 في حياتك.",
    proof: "$179",
    proofClass: styles.advProofGold
  },
  {
    icon: <Globe size={40} />,
    title: "موقع احترافي + hosting سنة",
    badgeLabel: "FREE",
    badgeClass: styles.advBadgeGreen,
    desc: "موقع professional كامل مع hosting سنة مجاني (قيمة $200). تصميم حديث، responsive، SEO optimized. جاهز للاستخدام من اليوم الأول. وأنت تركز على البيزنس.",
    proof: "✓ Free $200 Value",
    proofClass: styles.advProofGreen
  },
  {
    icon: <Award size={40} />,
    title: "متخصصون في السوق الجزائري",
    badgeLabel: "EXPERT",
    badgeClass: styles.advBadgeNavy,
    desc: "2+ سنوات خبرة خاصة في تأسيس LLC للجزائريين. نعرف كل التحديات، كل الحلول، كل التفاصيل. مش خدمة عامة - متخصصون فقط في هذا المجال.",
    proof: "30+ Successful Algerian Clients",
    proofClass: styles.advProofGray
  },
  {
    icon: <ClipboardCheck size={40} />,
    title: "0 رسوم مخفية - شفافية 100%",
    badgeLabel: "TRANSPARENT",
    badgeClass: styles.advBadgeBlue,
    desc: "كل شي واضح من البداية. $179 شامل كل شي. ما في مفاجآت، ما في تكاليف إضافية، ما في رسوم خفية. الصراحة والوضوح أساس التعامل معانا.",
    proof: "✓ Honest Communication",
    proofClass: styles.advProofGreen
  }
];

const testimonialsList = [
  {
    quote: "كنت مستسلم بعد 3 رفضات من Wise. جيت لـGo LLC ونجح من أول مرة! الآن أسحب $8,000 شهرياً من Shopify. أفضل قرار سويته في حياتي.",
    name: "محمد، 26 سنة",
    location: "الجزائر العاصمة 📍",
    business: "Shopify Store Owner",
    date: "منذ 6 أشهر",
    initial: "م"
  },
  {
    quote: "سنتين كاملة كنت أحاول وكل مرة: رفض. مع Go LLC الموضوع انحل في 10 أيام. عقد الإيجار الحقيقي فرق معايا 100%. شكراً من القلب! 🙏",
    name: "سارة، 24 سنة",
    location: "وهران 📍",
    business: "Etsy Seller",
    date: "منذ 4 أشهر",
    initial: "س"
  },
  {
    quote: "الوحيدين اللي فهموا الموضوع صح. Virtual address = فشل مضمون. عقد إيجار حقيقي = نجاح مضمون. بسيطة! Professional service من ناس يفهمون شغلهم.",
    name: "ياسين، 31 سنة",
    location: "قسنطينة 📍",
    business: "Digital Marketer",
    date: "منذ 8 أشهر",
    initial: "ي"
  },
  {
    quote: "كنت أظن مستحيل من الجزائر. Go LLC أثبتوا العكس. الدعم VIP على واتساب كان رائع - رد سريع وبالعربي. الموقع المجاني كمان حاجة ممتازة! 👏",
    name: "أمينة، 29 سنة",
    location: "عنابة 📍",
    business: "Graphic Designer",
    date: "منذ 5 أشهر",
    initial: "أ"
  },
  {
    quote: "الباقة الشاملة وفرت علي وقت ومال كثير. كل شي في مكان واحد - LLC، Wise، الموقع، الدعم. ما احتجت أتعامل مع 5-6 جهات مختلفة. Highly recommended! 🎯",
    name: "رشيد، 35 سنة",
    location: "سطيف 📍",
    business: "E-commerce Seller",
    date: "منذ سنة",
    initial: "ر"
  },
  {
    quote: "بعد 3 محاولات فاشلة وأكثر من $600 ضايعة، أخيراً نجحت مع Go LLC. ضمان استرجاع المال خلاني مرتاح. الآن عندي Wise Business شغال 100%. ما صدقت! 🤩",
    name: "نبيل، 27 سنة",
    location: "تلمسان 📍",
    business: "Software Developer",
    date: "منذ 3 أشهر",
    initial: "ن"
  }
];

export default function WhyChooseGoLLC() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          
          // If this is the stats section, animate counters
          if (entry.target.classList.contains(styles.statsHeroGrid)) {
            const counters = entry.target.querySelectorAll('[data-counter]');
            counters.forEach(counter => {
              const target = parseInt(counter.getAttribute('data-counter') || '0');
              animateCounter(counter as HTMLElement, target, 2000);
            });
          }
          
          // If this is the new comparison section card score
          if (entry.target.classList.contains(styles.cardScore) || entry.target.classList.contains(styles.bottomSummary)) {
            // Find scores inside bottom summary if that's what we're animating
            if (entry.target.classList.contains(styles.bottomSummary)) {
              const scores = entry.target.querySelectorAll(`.${styles.scoreItem} .${styles.scoreVal}`);
              scores.forEach((scoreEl) => {
                const target = parseInt(scoreEl.getAttribute('data-score') || '0');
                animateCardScore(scoreEl.parentElement as HTMLElement, target);
              });
            } else {
              const target = parseInt(entry.target.getAttribute('data-score') || '0');
              animateCardScore(entry.target as HTMLElement, target);
            }
          }

          // Unobserve to only animate once
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('[data-observe]');

    elementsToObserve.forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const animateCardScore = (scoreElement: HTMLElement, target: number) => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    // Determine the number element
    const numberEl = scoreElement.querySelector(`.${styles.scoreNumber}`) || scoreElement.querySelector(`.${styles.scoreVal}`);
    
    if (!numberEl) return;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        numberEl.textContent = `${target}/7`;
        clearInterval(timer);
        animateScoreIcons(scoreElement);
      } else {
        numberEl.textContent = `${Math.floor(current)}/7`;
      }
    }, 16);
  };

  const animateScoreIcons = (scoreElement: HTMLElement) => {
    const container = scoreElement.querySelector(`.${styles.scoreIcons}`) || scoreElement.querySelector(`.${styles.scoreIconsRow}`);
    if (!container) return;
    
    const icons = container.getAttribute('data-icons') || container.textContent || '';
    // Store original icons to keep it intact, then clear textContent
    if (!container.getAttribute('data-icons')) {
        container.setAttribute('data-icons', icons);
    }
    
    const iconArray = Array.from(icons); // Better support for emojis than regex
    container.textContent = '';
    
    iconArray.forEach((icon, index) => {
      setTimeout(() => {
        const span = document.createElement('span');
        span.textContent = icon;
        span.style.animation = `${styles.iconPop} 0.3s ease-out forwards`;
        container.appendChild(span);
      }, index * 150);
    });
  };

  const animateCounter = (element: HTMLElement, target: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.innerHTML = Math.floor(progress * target).toString() + (element.getAttribute('data-suffix') || '');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.innerHTML = target.toString() + (element.getAttribute('data-suffix') || '');
      }
    };
    window.requestAnimationFrame(step);
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonialsList.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  return (
    <section ref={sectionRef} className={styles.whyChooseSection} dir="rtl">
      {/* 1. Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.container}>
          <div className={`${styles.fadeInUp} ${styles.visible}`} data-observe>
            <h2 className={styles.mainHeadline}>ليش تختار Go LLC؟ 🚀</h2>
            <p className={styles.englishSubtitle}>Why Choose Go LLC?</p>
            <p className={styles.subheadline}>الوحيدون في الجزائر مع عقد إيجار حقيقي - نجاح مضمون 100%</p>
            <div className={styles.decorativeLine} data-observe></div>
          </div>
        </div>
      </div>

      {/* 2. Advantages Grid */}
      <div className={styles.advantagesSection}>
        <div className={`${styles.container} ${styles.staggerChildren}`} data-observe>
          <div className={styles.advantagesGrid}>
            {advantagesList.map((adv, idx) => (
              <div key={idx} className={`${styles.advCard} ${styles.hoverLift} ${styles.glowOnHover}`} data-observe>
                <div className={styles.advCardHeader}>
                  <div className={`${styles.advIcon} ${styles.iconBounce} ${styles.iconRotate}`}>
                    {adv.icon}
                  </div>
                  <span className={`${styles.advBadge} ${adv.badgeClass}`}>
                    {adv.badgeLabel}
                  </span>
                </div>
                <h3 className={styles.advTitle}>{adv.title}</h3>
                <p className={styles.advDesc}>{adv.desc}</p>
                {adv.isStats ? (
                  <div className={styles.advProof}>
                    <div>
                      <span className={styles.advProofGold}>{adv.statsHighlight}</span>
                      <span className={styles.advProofGray} style={{display:'block', fontSize: '12px'}}>{adv.statsSub}</span>
                    </div>
                    <div style={{flex:1, marginLeft: '10px'}}>
                         <div className={styles.advProgressBar}>
                            <div className={`${styles.advProgressFill} ${styles.visible}`}></div>
                         </div>
                    </div>
                  </div>
                ) : (
                  <div className={`${styles.advProof} ${adv.proofClass}`}>
                     {adv.proof}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Comparison Table (REDESIGNED) */}
      <div className={styles.comparisonSection}>
        <div className={styles.container}>
          
          {/* Header */}
          <div className={styles.comparisonHeader}>
            <h2 className={`${styles.mainTitle} ${styles.fadeInUp}`} data-observe>
              المقارنة واضحة - شوف الفرق بنفسك 👀
            </h2>
            <p className={`${styles.subtitle} ${styles.fadeIn}`} data-observe>
              ليش تضيع وقتك وفلوسك؟ الاختيار واضح ✓
            </p>
            <div className={styles.titleUnderline} data-observe></div>
          </div>

          <div className={`${styles.cardsContainer}`} data-observe>
            {/* Card 1: Others */}
            <div className={`${styles.redesignCard} ${styles.cardOthers}`} data-observe>
              <div className={`${styles.cardBadge} ${styles.badgeWarning}`} data-observe>
                غير موصى به ⚠️
              </div>
              
              <div className={`${styles.cardBigIcon} ${styles.shakeOnce}`} data-observe>😔</div>
              
              <h3 className={styles.cardTitle}>الخدمات الأخرى</h3>
              <div className={styles.titleLine}></div>
              
              <div className={`${styles.featuresList} ${styles.staggerChildren}`}>
                <div className={`${styles.featureItem} ${styles.bad}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>العنوان</strong>
                    <span>Virtual Address</span>
                    <small>Wise يرفضه 100%</small>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.bad}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>عقد الإيجار</strong>
                    <span>ما عندهم</span>
                    <small>أو ورقة مزورة</small>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.bad}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>معدل النجاح</strong>
                    <span className={styles.bigNumber}>0%</span>
                    <small>كلهم فشلوا</small>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.bad}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>الدعم</strong>
                    <span>رد بعد أيام</span>
                    <small>بالإنجليزي فقط</small>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.bad}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>الضمان</strong>
                    <span>بدون ضمان</span>
                    <small>فلوسك راحت</small>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.bad}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>الموقع</strong>
                    <span>ما يعطوه</span>
                    <small>تدفع extra $200+</small>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.bad}`}>
                  <span className={styles.itemIcon}>💸</span>
                  <div className={styles.itemContent}>
                    <strong>السعر النهائي</strong>
                    <span className={styles.bigNumber}>$500-800</span>
                    <small>فيه مصاريف خفية</small>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.cardScore}`} data-score="0" data-observe>
                <span className={styles.scoreNumber}>0/7</span>
                <div className={styles.scoreIcons}>❌❌❌❌❌❌❌</div>
              </div>
            </div>
            
            {/* VS Badge 1 */}
            <div className={styles.vsBadge} data-observe>VS</div>
            
            {/* Card 2: Go LLC (WINNER) */}
            <div className={`${styles.redesignCard} ${styles.cardWinner}`} data-observe>
              <div className={`${styles.cardBadge} ${styles.badgeWinner}`} data-observe>
                الخيار الأفضل 🏆
              </div>
              
              <div className={styles.shineOverlay}></div>
              
              <div className={`${styles.floatIcon} ${styles.floatIcon1}`}>⭐</div>
              <div className={`${styles.floatIcon} ${styles.floatIcon2}`}>🔥</div>
              <div className={`${styles.floatIcon} ${styles.floatIcon3}`}>✨</div>
              
              <div className={`${styles.cardBigIcon} ${styles.rotateIn}`} data-observe>🎯</div>
              
              <h3 className={styles.cardTitle}>Go LLC 🚀</h3>
              <p className={styles.cardSubtitle}>نحن الوحيدين في الجزائر 🇩🇿</p>
              <div className={styles.titleLineDouble}></div>
              
              <div className={`${styles.featuresList} ${styles.staggerChildren}`}>
                <div className={`${styles.featureItem} ${styles.good}`}>
                  <span className={styles.itemIcon}>✅</span>
                  <div className={styles.itemContent}>
                    <strong>
                      عقد إيجار مكتب حقيقي
                      <span className={`${styles.badgeInline} ${styles.exclusive}`}>EXCLUSIVE</span>
                    </strong>
                    <span>مكتب أمريكي فعلي - معتمد من Wise</span>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.good}`}>
                  <span className={styles.itemIcon}>✅</span>
                  <div className={styles.itemContent}>
                    <strong>
                      Lease Agreement أصلي
                      <span className={`${styles.badgeInline} ${styles.verified}`}>VERIFIED ✓</span>
                    </strong>
                    <span>الوحيدين في الجزائر اللي عندهم!</span>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.good} ${styles.highlight}`}>
                  <span className={styles.itemIcon}>✅</span>
                  <div className={styles.itemContent}>
                    <strong>معدل النجاح</strong>
                    <span className={`${styles.bigNumber} ${styles.successText}`}>100%</span>
                    <small>30+ عميل - 0 رفض</small>
                    <div className={styles.progressBarWrapper}>
                      <div className={styles.progressFillAnim}></div>
                    </div>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.good}`}>
                  <span className={styles.itemIcon}>✅</span>
                  <div className={styles.itemContent}>
                    <strong>
                      واتساب مباشر VIP
                      <span className={`${styles.badgeInline} ${styles.support}`}>24/7</span>
                    </strong>
                    <span>🟢 فريق جزائري - رد خلال دقيقتين</span>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.good}`}>
                  <span className={styles.itemIcon}>✅</span>
                  <div className={styles.itemContent}>
                    <strong>
                      ضمان استرجاع المال 100%
                      <span className={`${styles.badgeInline} ${styles.guaranteed}`}>GUARANTEED</span>
                    </strong>
                    <span>لو ما نجح = فلوسك ترجع كاملة</span>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.good}`}>
                  <span className={styles.itemIcon}>✅</span>
                  <div className={styles.itemContent}>
                    <strong>
                      موقع مجاني شامل
                      <span className={`${styles.badgeInline} ${styles.free}`}>FREE $200</span>
                    </strong>
                    <span>Professional + hosting سنة</span>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.good} ${styles.highlight}`}>
                  <span className={styles.itemIcon}>💎</span>
                  <div className={styles.itemContent}>
                    <strong>
                      السعر النهائي
                      <span className={`${styles.badgeInline} ${styles.bestValue}`}>BEST VALUE</span>
                    </strong>
                    <span className={`${styles.bigNumber} ${styles.priceText}`}>$179</span>
                    <small>كل شي شامل - 0 مفاجآت</small>
                    <small className={styles.savingsText}>وفّر $600+</small>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.cardScore} ${styles.scorePerfect}`} data-score="7" data-observe>
                <span className={styles.scoreNumber}>7/7</span>
                <div className={styles.scoreIcons}>✅✅✅✅✅✅✅</div>
                <small>نجاح مضمون 100%</small>
              </div>
            </div>
            
            {/* VS Badge 2 */}
            <div className={styles.vsBadge} data-observe>VS</div>
            
            {/* Card 3: DIY */}
            <div className={`${styles.redesignCard} ${styles.cardDiy}`} data-observe>
              <div className={`${styles.cardBadge} ${styles.badgeStress}`} data-observe>
                صعب ومتعب 😰
              </div>
              
              <div className={`${styles.cardBigIcon} ${styles.vibrateIcon}`} data-observe>🤯</div>
              
              <h3 className={styles.cardTitle}>DIY بنفسك</h3>
              <div className={styles.titleLine}></div>
              
              <div className={`${styles.featuresList} ${styles.staggerChildren}`}>
                <div className={`${styles.featureItem} ${styles.warning}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>الوقت</strong>
                    <span>6-8 أسابيع</span>
                    <small>وقت طويل جداً</small>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.warning}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>المجهود</strong>
                    <span>معقد جداً</span>
                    <small>إجراءات حكومية شاقة</small>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.warning}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>النتيجة</strong>
                    <span>احتمال فشل عالي</span>
                    <small>خطأ بسيط يكلفك الرفض</small>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.warning}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>الحالة</strong>
                    <span>Stress وعصبية</span>
                    <small>انتظار وقلق مستمر</small>
                  </div>
                </div>
                
                <div className={`${styles.featureItem} ${styles.warning}`}>
                  <span className={styles.itemIcon}>❌</span>
                  <div className={styles.itemContent}>
                    <strong>التكلفة النهائية</strong>
                    <span className={styles.bigNumber}>غير محددة</span>
                    <small>قد تخسر أموالك في المحاولة</small>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.cardScore}`} data-score="0" data-observe>
                <span className={styles.scoreNumber}>0/7</span>
                <div className={styles.scoreIcons}>❌❌❌❌❌❌❌</div>
                <small>مو موصى به</small>
              </div>
            </div>
          </div>
          
          {/* Bottom Summary Sequence */}
          <div className={styles.bottomSummary} data-observe>
            <div className={styles.finalScores}>
              <div className={styles.scoreItem}>
                <span className={styles.scoreLabel}>الآخرون</span>
                <span className={`${styles.scoreVal} ${styles.bad}`} data-score="0">0/7</span>
                <div className={styles.scoreIconsRow}>❌❌❌❌❌❌❌</div>
              </div>
              
              <div className={`${styles.scoreItem} ${styles.winnerScore}`}>
                <div className={styles.crownIcon}>👑</div>
                <span className={styles.scoreLabel}>Go LLC</span>
                <span className={`${styles.scoreVal} ${styles.perfect}`} data-score="7">7/7</span>
                <div className={styles.scoreIconsRow}>✅✅✅✅✅✅✅</div>
              </div>
              
              <div className={styles.scoreItem}>
                <span className={styles.scoreLabel}>DIY</span>
                <span className={`${styles.scoreVal} ${styles.bad}`} data-score="0">0/7</span>
                <div className={styles.scoreIconsRow}>❌❌❌❌❌❌❌</div>
              </div>
            </div>
            
            <div className={styles.finalCtaSection}>
              <p className={styles.finalCtaText}>الاختيار واضح - ابدأ الآن! 🚀</p>
              <button className={styles.finalCtaButton}>
                احجز الآن - $179 →
              </button>
              <p className={styles.trustSummaryText}>
                ✓ بدون التزام  •  ✓ استشارة مجانية  •  ✓ رد خلال دقيقتين
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* 4. Stats Hero Section (REDESIGNED) */}
      <div className={styles.statsHeroSection}>
        <div className={styles.statsHeroPattern}></div>
        <div className={styles.container}>
          <div className={`${styles.statsHeroGrid} ${styles.staggerStats}`} data-observe>
            {/* Stat 1: Response Time */}
            <div className={`${styles.statCardHero} ${styles.visible}`}>
              <div className={`${styles.statHeroIconContainer} ${styles.statHeroIcon1}`}>
                <MessageCircle size={80} />
              </div>
              <div className={styles.statHeroNumberWrap}>
                <span className={styles.statHeroNumber} data-counter="2" data-suffix="&gt;">0</span>
              </div>
              <div className={styles.statHeroLabel}>دقيقة معدل الرد</div>
              <div className={styles.statHeroSubtext}>دعم VIP سريع</div>
              <div className={styles.statHeroBadge}>FASTEST</div>
            </div>

            {/* Stat 2: Completion Time */}
            <div className={`${styles.statCardHero} ${styles.visible}`}>
              <div className={`${styles.statHeroIconContainer} ${styles.statHeroIcon2}`}>
                <Zap size={80} />
              </div>
              <div className={styles.statHeroNumberWrap}>
                <span className={styles.statHeroNumber} data-counter="10">0</span>
              </div>
              <div className={styles.statHeroLabel}>أيام فقط</div>
              <div className={styles.statHeroSubtext}>من البداية للنهاية</div>
              <div className={styles.statHeroComparison}>الآخرون: 6-8 أسابيع</div>
            </div>

            {/* Stat 3: Success Rate */}
            <div className={`${styles.statCardHero} ${styles.visible}`}>
              <div className={`${styles.statHeroIconContainer} ${styles.statHeroIcon3}`}>
                <Trophy size={100} />
              </div>
              <div className={styles.statHeroNumberWrap}>
                <span className={`${styles.statHeroNumber} ${styles.statHeroNumber3}`} data-counter="100" data-suffix="%">0</span>
              </div>
              <div className={`${styles.statHeroLabel} ${styles.statHeroLabel3}`}>معدل النجاح</div>
              <div className={styles.statHeroSubtext3}>0 رفض • 0 فشل</div>
              <div className={styles.statHeroProgressWrap}>
                <div className={styles.statHeroProgressFill}></div>
              </div>
              <div className={styles.statHeroBadge}>GUARANTEED</div>
            </div>

            {/* Stat 4: Happy Clients */}
            <div className={`${styles.statCardHero} ${styles.visible}`}>
              <div className={`${styles.statHeroIconContainer} ${styles.statHeroIcon4}`}>
                <Users size={80} />
              </div>
              <div className={styles.statHeroNumberWrap}>
                <span className={styles.statHeroPrefix}>+</span>
                <span className={styles.statHeroNumber} data-counter="30">0</span>
              </div>
              <div className={styles.statHeroLabel}>عميل جزائري ناجح</div>
              <div className={styles.statHeroSubtext}>كلهم شغالين الآن 🇩🇿</div>
              <div className={styles.statHeroComparison} style={{textDecoration:'none', color:'rgba(255,255,255,0.7)'}}>من كل الولايات</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Testimonials Showcase (REDESIGNED) */}
      <div className={styles.testiShowcaseSection}>
        <div className={styles.container}>
          
          <div className={styles.testiHeaderNew} data-observe>
            <h2 className={styles.testiTitleNew}>عملاؤنا يتكلمون 🗣️</h2>
            <p className={styles.testiSubtitleNew}>+30 جزائري نجحوا معانا - شوف قصصهم الملهمة</p>
            <div className={styles.testiUnderline}></div>
          </div>

          <div className={styles.testiCarouselWrap}>
            <div className={styles.testiGrid} data-observe>
              <div 
                className={styles.testiTrack}
                style={{ transform: `translateX(${activeTestimonial * 100}%)` }} 
                {...{dir:'ltr'}}
              >
                {testimonialsList.map((testi, idx) => (
                  <div key={idx} className={`${styles.testiCardNew} ${styles.visible}`} dir="rtl">
                    <div className={styles.testiQuoteIcon}>"</div>
                    <div className={styles.testiStars}>
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    
                    <p className={styles.testiTextNew}>
                      {testi.quote.split(/(نجح من أول مرة|\$8,000 شهرياً|10 أيام بس|100%|Professional service|\$600 ضايعة|Wise Business شغال 100%)/g).map((part, i) => {
                        if (part === '$8,000 شهرياً' || part === '100%') return <span key={i} className={styles.goldText}>{part}</span>;
                        if (part === '$600 ضايعة') return <span key={i} className={styles.redText}>{part}</span>;
                        if (part === 'Wise Business شغال 100%') return <span key={i} className={styles.greenText}>{part}</span>;
                        if (['نجح من أول مرة', '10 أيام بس', 'Professional service'].includes(part)) return <strong key={i}>{part}</strong>;
                        return part;
                      })}
                    </p>
                    
                    <div className={styles.testiDivider}></div>
                    
                    <div className={styles.testiProfile}>
                      <div className={styles.testiAvatar}>{testi.initial}</div>
                      <div className={styles.testiInfo}>
                        <div className={styles.testiName}>{testi.name}</div>
                        <div className={styles.testiLocation}>
                          {testi.location}
                        </div>
                        <div className={styles.verifiedBadgeNew}>
                          ✓ Verified Customer
                        </div>
                        <div className={styles.testiBusiness}>{testi.business} • {testi.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <button className={`${styles.carouselArrow} ${styles.arrowPrev}`} onClick={prevTestimonial} aria-label="Previous">
              <ChevronRight />
            </button>
            <button className={`${styles.carouselArrow} ${styles.arrowNext}`} onClick={nextTestimonial} aria-label="Next">
              <ChevronLeft />
            </button>
            
            <div className={styles.carouselDots}>
              {testimonialsList.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`${styles.dot} ${idx === activeTestimonial ? styles.active : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className={styles.trustBanner} data-observe>
            <div className={styles.trustBannerText}>🏆 تقييم 4.9/5 من 30+ عميل حقيقي</div>
            <div className={styles.trustBadgesRow}>
              <div className={styles.trustSubBadge}>⭐ Google Reviews</div>
              <div className={styles.trustSubBadge}>👍 Facebook</div>
              <div className={styles.trustSubBadge}>✓ Verified</div>
            </div>
          </div>

          <div className={styles.testiCtaSection} data-observe>
            <h3 className={styles.testiCtaTitle}>جاهز تكون التالي؟ 🚀</h3>
            <p className={styles.testiCtaSub}>انضم لـ30+ جزائري ناجح</p>
            <button className={styles.testiCtaBtn}>
              احجز استشارة مجانية
            </button>
          </div>
          
        </div>
      </div>

      {/* 6. Guarantee Badges */}
      <div className={styles.badgesSection}>
        <div className={styles.container}>
          <div className={`${styles.badgesGrid} ${styles.staggerChildren}`} data-observe>
            <div className={`${styles.badgeContainer} ${styles.float1}`}>
               <CheckCircle2 size={40} className={styles.badgeIcon} />
               <div className={styles.badgeText}>معدل نجاح</div>
               <div className={styles.badgeNumber}>100%</div>
               <div className={styles.ringAnimation}></div>
            </div>
            <div className={`${styles.badgeContainer} ${styles.float2}`}>
               <Shield size={40} className={`${styles.badgeIcon} ${styles.badgeIconGold}`} />
               <div className={styles.badgeText}>ضمان استرجاع</div>
               <div className={`${styles.badgeNumber} ${styles.badgeNumberGold}`}>100%</div>
               <div className={styles.badgeSubtext}>فلوسك ترجع</div>
            </div>
            <div className={`${styles.badgeContainer} ${styles.float3}`}>
               <Zap size={40} className={`${styles.badgeIcon} ${styles.badgeIconGold}`} />
               <div className={styles.badgeText}>سرعة</div>
               <div className={`${styles.badgeNumber} ${styles.badgeNumberNavy}`}>10</div>
               <div className={styles.badgeSubtext}>أيام فقط</div>
            </div>
            <div className={`${styles.badgeContainer} ${styles.float4}`}>
               <Headset size={40} className={`${styles.badgeIcon} ${styles.badgeIconGold}`} />
               <div className={styles.badgeText}>دعم VIP</div>
               <div className={`${styles.badgeNumber} ${styles.badgeNumberNavy}`}>24/7</div>
               <div className={styles.badgeSubtext}>جزائري</div>
            </div>
            <div className={`${styles.badgeContainer} ${styles.float5}`}>
               <Gem size={40} className={`${styles.badgeIcon} ${styles.badgeIconGold}`} />
               <div className={styles.badgeText}>أفضل سعر</div>
               <div className={`${styles.badgeNumber} ${styles.badgeNumberGold}`}>$179</div>
               <div className={styles.badgeSubtext}>كل شي شامل</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Final CTA */}
      <div className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={`${styles.ctaTitle} ${styles.scaleIn}`} data-observe>جاهز تبدأ؟ 🚀</h2>
          <p className={`${styles.ctaSubtitle} ${styles.fadeInUp}`} data-observe>انضم لـ30+ جزائري ناجح - ابدأ رحلتك الآن</p>
          <button className={styles.ctaBtn}>
            احجز استشارة مجانية الآن <ChevronLeft />
          </button>
          <div className={styles.ctaSubtext}>
             <span>✓ بدون التزام</span> • <span>✓ استشارة مجانية</span> • <span>✓ رد خلال دقيقتين</span>
          </div>
          <div className={styles.trustIndicators}>
             <span>🔒 آمن</span> | <span>⚡ سريع</span> | <span>✅ مضمون</span>
          </div>
        </div>
      </div>
    </section>
  );
}
