'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import {
  DollarSign, Globe, Users, Zap, Headphones,
  CheckCircle2, ArrowRight, Building2,
} from 'lucide-react';

const NAVY   = '#1A3A52';
const DARK   = '#0D1F2D';
const GOLD   = '#F4C430';
const WHITE  = '#FFFFFF';
const PURPLE = '#6c5ce7';

const BENEFITS = [
  { icon: <DollarSign size={18} />, text: 'تحصيل العملة الصعبة — USD · EUR · GBP' },
  { icon: <Globe size={18} />,       text: 'حسابات أعمال متعددة العملات' },
  { icon: <Users size={18} />,       text: 'مصمم لرواد أعمال منطقة MENA' },
  { icon: <Zap size={18} />,         text: 'تكامل سلس مع شركتك الأمريكية LLC' },
  { icon: <Headphones size={18} />,  text: 'أولوية الإعداد والدعم المخصص' },
];

/* Animated dashboard mock on the left side */
function VertoDashboard() {
  const currencies = [
    { flag: '🇺🇸', code: 'USD', bal: '12,450.00', change: '+$1,200' },
    { flag: '🇪🇺', code: 'EUR', bal: '9,830.50',  change: '+€450' },
    { flag: '🇬🇧', code: 'GBP', bal: '7,215.00',  change: '+£300' },
  ];

  const transactions = [
    { icon: '📦', desc: 'Client Payment', amount: '+$2,500', green: true },
    { icon: '🏦', desc: 'Mercury Transfer', amount: '-$800',  green: false },
    { icon: '🛒', desc: 'Shopify Payout',  amount: '+$1,120', green: true },
  ];

  return (
    <div style={{
      background: 'linear-gradient(145deg, #0f2744 0%, #1a3a52 100%)',
      borderRadius: 20,
      padding: 24,
      border: '1px solid rgba(244,196,48,0.2)',
      boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
      fontFamily: 'Montserrat, Cairo, sans-serif',
      width: '100%',
      maxWidth: 420,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Verto Platform</div>
          <div style={{ color: WHITE, fontWeight: 800, fontSize: 16 }}>GO LLC Dashboard</div>
        </div>
        <div style={{ background: 'rgba(108,92,231,0.2)', border: '1px solid rgba(108,92,231,0.4)', borderRadius: 99, padding: '4px 12px', color: PURPLE, fontSize: 12, fontWeight: 700 }}>
          ● Live
        </div>
      </div>

      {/* Currency balances */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {currencies.map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 16px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{c.flag}</span>
              <div>
                <div style={{ color: WHITE, fontWeight: 700, fontSize: 14 }}>{c.code}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Balance</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: WHITE, fontWeight: 800, fontSize: 15 }}>{c.bal}</div>
              <div style={{ color: '#00b894', fontSize: 12, fontWeight: 600 }}>{c.change}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transactions */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>Recent Transactions</div>
        {transactions.map((t, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.1 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>{t.icon}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{t.desc}</span>
            </div>
            <span style={{ color: t.green ? '#00b894' : '#e17055', fontWeight: 700, fontSize: 13 }}>{t.amount}</span>
          </motion.div>
        ))}
      </div>

      {/* Verto badge */}
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: 0.6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: PURPLE }} />
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: 1 }}>Powered by Verto</span>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: PURPLE }} />
      </div>
    </div>
  );
}

export default function VertoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="verto-section"
      ref={sectionRef}
      style={{
        background: `linear-gradient(135deg, rgba(102,126,234,0.08) 0%, rgba(118,75,162,0.12) 50%, rgba(26,58,82,0.05) 100%)`,
        borderTop: '1px solid rgba(244,196,48,0.1)',
        borderBottom: '1px solid rgba(244,196,48,0.1)',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,196,48,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="verto-grid">

          {/* LEFT — Dashboard mock with parallax */}
          <motion.div style={{ y }} className="verto-visual"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* Glow behind dashboard */}
              <div style={{
                position: 'absolute', inset: -40,
                background: 'radial-gradient(ellipse, rgba(108,92,231,0.25) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <VertoDashboard />
            </div>

            {/* Trust badge below dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 12, background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(10px)', borderRadius: 99,
                padding: '12px 24px', border: '1px solid rgba(244,196,48,0.2)',
              }}>
              <Building2 size={18} color={GOLD} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'Cairo, sans-serif' }}>
                متاح حصرياً لعملاء <strong style={{ color: GOLD }}>GO LLC</strong>
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Content */}
          <div className="verto-content" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Partner badge */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ display: 'inline-flex', alignSelf: 'flex-start' }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: WHITE, borderRadius: 99,
                padding: '10px 20px',
                boxShadow: `0 0 0 2px ${PURPLE}, 0 8px 30px rgba(108,92,231,0.3)`,
              }}
                className="verto-badge-pulse"
              >
                <span style={{ fontSize: 20 }}>🤝</span>
                <span style={{ fontWeight: 800, fontSize: 14, color: DARK, fontFamily: 'Montserrat, sans-serif', letterSpacing: 0.5 }}>
                  Official Verto Partner
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900,
                color: DARK, lineHeight: 1.15, margin: '0 0 12px',
                fontFamily: 'Montserrat, sans-serif',
              }}>
                Unlock Global Payments
                <span style={{ display: 'block', color: PURPLE }}>with Verto</span>
              </h2>
              <h3 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: GOLD, margin: 0, fontFamily: 'Cairo, sans-serif' }}>
                افتح بوابة المدفوعات الدولية
              </h3>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              style={{ fontSize: 17, color: '#4a5568', lineHeight: 1.7, margin: 0, fontFamily: 'Cairo, sans-serif' }}
            >
              شراكتنا الحصرية مع Verto تمنح عملاء GO LLC وصولاً مميزاً لحلول مصرفية B2B متعددة العملات — لم تكن متاحة للأفراد من قبل.
            </motion.p>

            {/* Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: 'rgba(108,92,231,0.06)', borderRadius: 12,
                    padding: '12px 16px', border: '1px solid rgba(108,92,231,0.15)',
                  }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(108,92,231,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: PURPLE,
                  }}>
                    {b.icon}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 15, color: '#2d3748', fontWeight: 600, fontFamily: 'Cairo, sans-serif' }}>
                      {b.text}
                    </span>
                    <CheckCircle2 size={18} color="#00b894" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}
            >
              <a
                href="#book-consultation"
                className="verto-cta-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `linear-gradient(135deg, ${PURPLE}, #a29bfe)`,
                  color: WHITE, textDecoration: 'none',
                  padding: '14px 28px', borderRadius: 12,
                  fontWeight: 800, fontSize: 16,
                  fontFamily: 'Cairo, sans-serif',
                  boxShadow: '0 8px 25px rgba(108,92,231,0.4)',
                  transition: 'all 0.3s',
                }}
              >
                احصل على وصول Verto
                <ArrowRight size={18} />
              </a>
              <a
                href="#verto-section"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent',
                  color: PURPLE, textDecoration: 'none',
                  padding: '14px 28px', borderRadius: 12,
                  fontWeight: 700, fontSize: 16,
                  border: `2px solid ${PURPLE}`,
                  fontFamily: 'Cairo, sans-serif',
                  transition: 'all 0.3s',
                }}
              >
                اعرف أكثر عن الشراكة
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .verto-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .verto-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 35px rgba(108,92,231,0.55) !important;
        }
        @keyframes vertoBadgePulse {
          0%, 100% { box-shadow: 0 0 0 2px #6c5ce7, 0 8px 30px rgba(108,92,231,0.3); }
          50%       { box-shadow: 0 0 0 4px #6c5ce7, 0 8px 40px rgba(108,92,231,0.5); }
        }
        .verto-badge-pulse {
          animation: vertoBadgePulse 3s ease-in-out infinite;
        }
        @media (max-width: 900px) {
          .verto-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .verto-content {
            order: -1;
          }
          .verto-content > div:first-child {
            align-self: center !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .verto-badge-pulse { animation: none; }
        }
      `}</style>
    </section>
  );
}
