'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check, X, ChevronDown, ChevronLeft, ChevronRight,
  Building2, CreditCard, Handshake, Zap, ShoppingCart, DollarSign,
  Calendar, FileText, CheckCircle2, Headphones,
  Star, Phone, Mail, MapPin, Clock, Users, Menu, Rocket,
  ArrowDown, Shield, TrendingUp, Globe, Instagram, Facebook, Linkedin,
  MessageCircle,
} from 'lucide-react';

/* ── Colors ─────────────────────────────────────────── */
const NAVY = '#1A3A52';
const DARK_NAVY = '#0D1F2D';
const GOLD = '#F4C430';
const WHITE = '#FFFFFF';
const GRAY = '#6B7280';
const LIGHT_GRAY = '#F5F5F5';
const GREEN = '#27AE60';
const RED = '#E74C3C';

const WA = 'https://wa.me/213791789125';

/* ── Countdown hook ──────────────────────────────────── */
function useCountdown(hours = 47) {
  const [time, setTime] = useState({ h: hours, m: 59, s: 59 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(p => {
        if (p.s > 0) return { ...p, s: p.s - 1 };
        if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
        if (p.h > 0) return { h: p.h - 1, m: 59, s: 59 };
        clearInterval(t);
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

const pad = (n: number) => String(n).padStart(2, '0');

/* ── Fake social proof ───────────────────────────────── */
const PROOFS = [
  'محمد من المغرب حجز للتو',
  'فاطمة من الجزائر حجز للتو',
  'أحمد من مصر حجز للتو',
  'يوسف من تونس حجز للتو',
  'سارة من السعودية حجز للتو',
];

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function ProClient() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerClosed, setBannerClosed] = useState(false);
  const [proofIndex, setProofIndex] = useState(0);
  const [showProof, setShowProof] = useState(false);
  const time = useCountdown(47);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (!bannerClosed) setShowBanner(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [bannerClosed]);

  useEffect(() => {
    const t = setInterval(() => {
      setProofIndex(i => (i + 1) % PROOFS.length);
      setShowProof(true);
      setTimeout(() => setShowProof(false), 4000);
    }, 12000);
    return () => clearInterval(t);
  }, []);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', 'Montserrat', sans-serif", overflowX: 'hidden', background: WHITE }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ── NAV ───────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 70,
        background: scrolled ? `rgba(26,58,82,0.97)` : `rgba(26,58,82,0.85)`,
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.2)' : 'none',
        transition: 'all 0.3s',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: GOLD, fontFamily: 'Montserrat' }}>GO</span>
            <span style={{ fontSize: 26, fontWeight: 900, color: WHITE, fontFamily: 'Montserrat' }}>LLC</span>
          </a>
          <div className="nav-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {[['الميزات', '#features'], ['الأسعار', '#pricing'], ['الأسئلة', '#faq']].map(([label, href]) => (
              <a key={href} href={href} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 15, fontWeight: 600, transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = GOLD)}
                onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
              >{label}</a>
            ))}
            <button onClick={scrollToForm} style={{
              background: `linear-gradient(135deg, #C49B1A, ${GOLD})`, color: DARK_NAVY,
              border: 'none', borderRadius: 25, padding: '10px 22px', fontWeight: 800,
              fontSize: 14, cursor: 'pointer', boxShadow: `0 4px 15px rgba(244,196,48,0.4)`,
              transition: 'all 0.3s', fontFamily: 'Cairo, sans-serif',
            }}>احجز استشارة مجانية</button>
          </div>
          <button onClick={() => setNavOpen(!navOpen)} className="hamburger" style={{ display: 'none', background: 'none', border: 'none', color: GOLD, cursor: 'pointer' }}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {navOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: DARK_NAVY, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
            {[['الميزات', '#features'], ['الأسعار', '#pricing'], ['الأسئلة', '#faq']].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setNavOpen(false)}
                style={{ color: WHITE, fontSize: 28, fontWeight: 700, textDecoration: 'none' }}>{label}</a>
            ))}
            <button onClick={() => { setNavOpen(false); scrollToForm(); }} style={{
              background: `linear-gradient(135deg, #C49B1A, ${GOLD})`, color: DARK_NAVY,
              border: 'none', borderRadius: 30, padding: '14px 36px', fontWeight: 800, fontSize: 18, cursor: 'pointer',
            }}>احجز استشارة مجانية</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', paddingTop: 70,
        background: `linear-gradient(135deg, ${DARK_NAVY} 0%, ${NAVY} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Gold network pattern overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(${GOLD} 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, width: '100%' }}>
          {/* Urgency badge */}
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: RED, color: WHITE, borderRadius: 99, padding: '8px 20px', fontSize: 14, fontWeight: 700, marginBottom: 28 }}
            className="pulse-badge">
            ⏰ عرض محدود - 48 ساعة فقط
          </motion.div>

          <motion.h1 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 'clamp(40px,7vw,72px)', fontWeight: 900, color: WHITE, margin: '0 0 12px', letterSpacing: -1, fontFamily: 'Montserrat, Cairo, sans-serif', lineHeight: 1.1 }}>
            Start Your Global Business
          </motion.h1>

          <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, color: GOLD, margin: '0 0 16px' }}>
            ابدأ عملك العالمي اليوم
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ fontSize: 'clamp(16px,2vw,22px)', color: 'rgba(255,255,255,0.88)', marginBottom: 40 }}>
            US LLC كامل + 3 بنوك رقمية + بوابات دفع
          </motion.p>

          {/* Price Card */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
            style={{
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
              border: `1px solid rgba(244,196,48,0.35)`, borderRadius: 24,
              padding: '40px 48px', marginBottom: 40, position: 'relative', display: 'inline-block', minWidth: 320,
            }}>
            {/* Save badge */}
            <div style={{
              position: 'absolute', top: -14, right: 24,
              background: GREEN, color: WHITE, borderRadius: 99, padding: '6px 16px', fontSize: 13, fontWeight: 800,
            }}>وفّر $30</div>

            <div style={{ fontSize: 32, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through', marginBottom: 4 }}>$179</div>
            <div style={{ fontSize: 16, color: GOLD, marginBottom: 8 }}>▼ السعر الجديد</div>
            <div className="price-glow" style={{ fontSize: 'clamp(72px,14vw,120px)', fontWeight: 900, color: GOLD, lineHeight: 1, fontFamily: 'Montserrat, sans-serif' }}>$149</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: WHITE, marginTop: 8 }}>فقط ١٤٩ دولار — وفّر ٣٠ دولار!</div>
          </motion.div>

          {/* Trust stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { icon: <CheckCircle2 size={18} />, text: '70+ شركة مؤسسة' },
              { icon: <Star size={18} />, text: 'نجاح 100%' },
              { icon: <Clock size={18} />, text: 'دعم 24/7' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: WHITE, fontSize: 14, fontWeight: 600, background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 99 }}>
                <span style={{ color: GOLD }}>{s.icon}</span>{s.text}
              </div>
            ))}
          </motion.div>

          {/* Dual Offices Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <div className="offices-badge" style={{
              display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center',
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
              padding: '25px 50px', borderRadius: 50, border: `1px solid rgba(244,196,48,0.4)`,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)', cursor: 'default', transition: 'all 0.3s ease',
            }}>
              {/* Building icons */}
              <div style={{ display: 'flex', gap: 5 }}>
                <Building2 size={32} color={GOLD} />
                <Building2 size={32} color={GOLD} />
              </div>
              {/* Text */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: WHITE, letterSpacing: 0.5, fontFamily: 'Montserrat, sans-serif' }}>2 Physical Offices</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: GOLD, marginTop: 5, fontFamily: 'Cairo, sans-serif' }}>مكتبين فعليين</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginTop: 8, fontFamily: 'Montserrat, sans-serif' }}>📍 Algiers • Constantine</div>
              </div>
              {/* Badge */}
              <div className="pulse-badge" style={{ background: GREEN, color: WHITE, padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', whiteSpace: 'nowrap' }}>
                ESTABLISHED
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <button onClick={scrollToForm} className="cta-primary"
              style={{
                background: `linear-gradient(135deg, #C49B1A, ${GOLD})`, color: DARK_NAVY,
                border: 'none', borderRadius: 35, padding: '20px 48px', fontSize: 20, fontWeight: 800,
                cursor: 'pointer', boxShadow: `0 10px 30px rgba(244,196,48,0.4)`, transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
              <Rocket size={22} /> احجز استشارة مجانية 🚀
            </button>
            <a href="#features" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 16, fontWeight: 600, border: `2px solid rgba(255,255,255,0.3)`, borderRadius: 30, padding: '12px 32px', transition: 'all 0.3s' }}>
              اعرف أكثر ↓
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2 }}
            style={{ marginTop: 60, color: WHITE, fontSize: 13 }} className="bounce-arrow">
            <ArrowDown size={28} style={{ margin: '0 auto' }} />
            <div>scroll to explore</div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────── */}
      <section id="features" style={{ background: WHITE, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ color: GOLD, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>THE COMPLETE PACKAGE</div>
            <h2 style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, color: DARK_NAVY, margin: '0 0 8px', fontFamily: 'Montserrat, sans-serif' }}>Everything You Need to Start</h2>
            <h3 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 900, color: GOLD, margin: '0 0 16px' }}>كل ما تحتاجه للبداية</h3>
            <p style={{ fontSize: 18, color: GRAY }}>سعر واحد. بدون تعقيدات. إعداد كامل.</p>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>

          {/* Value Summary Banner */}
          <div style={{ background: `linear-gradient(135deg, #C49B1A, ${GOLD})`, borderRadius: 20, padding: '50px 40px', textAlign: 'center', marginTop: 60 }}>
            <div style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 900, color: DARK_NAVY, fontFamily: 'Montserrat, sans-serif' }}>القيمة الإجمالية: $479+ | سعرك: $149</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: DARK_NAVY, marginTop: 8 }}>توفر $330 (خصم 69%!)</div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────── */}
      <section id="pricing" style={{ background: LIGHT_GRAY, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: DARK_NAVY, fontFamily: 'Montserrat, sans-serif', marginBottom: 8 }}>See The Value</h2>
            <h3 style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 900, color: GOLD, marginBottom: 16 }}>شاهد القيمة الحقيقية</h3>
            <p style={{ fontSize: 18, color: GRAY }}>قارن ما تحصل عليه مقارنة بالمنافسين</p>
          </div>
          <ComparisonTable />
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button onClick={scrollToForm} style={{
              background: `linear-gradient(135deg, #C49B1A, ${GOLD})`, color: DARK_NAVY,
              border: 'none', borderRadius: 16, padding: '22px 48px', fontSize: 20, fontWeight: 800,
              cursor: 'pointer', boxShadow: `0 10px 30px rgba(244,196,48,0.4)`,
            }}>
              احصل على الباقة PRO — $149
            </button>
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ──────────────────────────── */}
      <section style={{ background: WHITE, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: DARK_NAVY, fontFamily: 'Montserrat, sans-serif', marginBottom: 8 }}>How It Works</h2>
            <h3 style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 900, color: GOLD, marginBottom: 16 }}>كيف تبدأ معنا</h3>
            <p style={{ fontSize: 18, color: GRAY }}>4 خطوات بسيطة لإطلاق شركتك</p>
          </div>
          <Timeline />
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <button onClick={scrollToForm} style={{
              background: `linear-gradient(135deg, #C49B1A, ${GOLD})`, color: DARK_NAVY,
              border: 'none', borderRadius: 35, padding: '18px 44px', fontSize: 18, fontWeight: 800,
              cursor: 'pointer', boxShadow: `0 8px 25px rgba(244,196,48,0.35)`,
            }}>
              جاهز للبدء؟ احجز مكالمتك المجانية
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${DARK_NAVY})`, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 900, color: WHITE, fontFamily: 'Montserrat, sans-serif', marginBottom: 8 }}>Trusted by 70+ Entrepreneurs</h2>
            <h3 style={{ fontSize: 'clamp(20px,3vw,40px)', fontWeight: 900, color: GOLD, marginBottom: 16 }}>يثق بنا 70+ رائد أعمال</h3>
          </div>
          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 60 }}>
            {[['70+', 'شركة مؤسسة', <Building2 key="b" size={36} />], ['100%', 'معدل نجاح', <Shield key="s" size={36} />], ['4.9/5', 'تقييم العملاء', <Star key="st" size={36} />]].map(([n, l, icon]) => (
              <div key={String(l)} style={{
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
                border: `1px solid rgba(244,196,48,0.25)`, borderRadius: 16, padding: '28px 36px',
                textAlign: 'center', minWidth: 180,
              }}>
                <div style={{ color: GOLD, marginBottom: 8 }}>{icon as React.ReactNode}</div>
                <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, fontFamily: 'Montserrat, sans-serif' }}>{n}</div>
                <div style={{ fontSize: 16, color: WHITE, fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ── OFFICES ───────────────────────────────────── */}
      <section style={{ background: WHITE, padding: '120px 20px', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ color: GOLD, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 15, fontFamily: 'Montserrat, sans-serif' }}>PHYSICAL PRESENCE</div>
            <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, color: DARK_NAVY, margin: '0 0 10px', fontFamily: 'Montserrat, sans-serif' }}>Visit Our Offices</h2>
            <h3 style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 900, color: GOLD, margin: '0 0 15px' }}>قم بزيارة مكاتبنا</h3>
            <p style={{ fontSize: 22, color: GRAY, margin: 0 }}>Meet us in person at either location</p>
          </div>
          <OfficesGrid />
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section id="faq" style={{ background: WHITE, padding: '100px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: DARK_NAVY, fontFamily: 'Montserrat, sans-serif', marginBottom: 8 }}>Common Questions</h2>
            <h3 style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 900, color: GOLD, marginBottom: 16 }}>الأسئلة الشائعة</h3>
            <p style={{ fontSize: 18, color: GRAY }}>كل ما تحتاج معرفته</p>
          </div>
          <FAQ />
          <div style={{ background: `linear-gradient(135deg, #C49B1A, ${GOLD})`, borderRadius: 20, padding: '48px', textAlign: 'center', marginTop: 48 }}>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: DARK_NAVY, marginBottom: 12 }}>هل لديك أسئلة أخرى؟</h3>
            <p style={{ color: DARK_NAVY, marginBottom: 24, fontSize: 16 }}>احجز استشارة مجانية لمناقشة حالتك الخاصة</p>
            <button onClick={scrollToForm} style={{
              background: DARK_NAVY, color: WHITE, border: 'none',
              borderRadius: 12, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            }}>احجز مكالمة مجانية</button>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ──────────────────────────────── */}
      <section ref={formRef} id="booking" style={{ background: LIGHT_GRAY, padding: '120px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <BookingForm />
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer style={{ background: DARK_NAVY, padding: '60px 24px 30px', color: WHITE }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>
                <span style={{ color: GOLD }}>GO</span><span style={{ color: WHITE }}>LLC</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7, marginBottom: 24, maxWidth: 280 }}>
                Gateway to Global Commerce — نساعدك على تأسيس شركتك الأمريكية وفتح بنوك رقمية عالمية.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {[<Instagram key="i" size={20} />, <Facebook key="f" size={20} />, <MessageCircle key="w" size={20} />].map((icon, i) => (
                  <a key={i} href={WA} target="_blank" rel="noopener noreferrer"
                    style={{ width: 40, height: 40, borderRadius: '50%', border: `2px solid rgba(244,196,48,0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, textDecoration: 'none', transition: 'all 0.2s' }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            {/* Links */}
            <div>
              <h4 style={{ color: GOLD, fontWeight: 700, fontSize: 18, marginBottom: 20 }}>روابط سريعة</h4>
              {[['الميزات', '#features'], ['الأسعار', '#pricing'], ['كيف يعمل', '#process'], ['الأسئلة', '#faq'], ['احجز استشارة', '#booking']].map(([l, h]) => (
                <a key={h} href={h} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 15, marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseOver={e => (e.currentTarget.style.color = GOLD)}
                  onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>{l}</a>
              ))}
            </div>
            {/* Contact */}
            <div>
              <h4 style={{ color: GOLD, fontWeight: 700, fontSize: 18, marginBottom: 20 }}>تواصل معنا</h4>
              {[
                { icon: <Mail size={16} />, text: 'contact@go-llc.com' },
                { icon: <MessageCircle size={16} />, text: '+213 791 789 125' },
                { icon: <MapPin size={16} />, text: 'الجزائر' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 14 }}>
                  <span style={{ color: GOLD }}>{c.icon}</span>{c.text}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 40, paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>© 2025 GO LLC. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 20 }}>
              {['سياسة الخصوصية', 'شروط الخدمة', 'سياسة الاسترداد'].map(l => (
                <span key={l} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer' }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── URGENCY BANNER ────────────────────────────── */}
      <AnimatePresence>
        {showBanner && !bannerClosed && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 98,
              background: `linear-gradient(90deg, ${RED}, #c0392b)`,
              borderTop: `2px solid ${GOLD}`,
              boxShadow: '0 -5px 20px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 24px', height: 80,
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <Clock size={26} color={WHITE} />
              <div>
                <div style={{ color: WHITE, fontWeight: 700, fontSize: 16 }}>العرض ينتهي قريباً!</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>8 أماكن فقط بـ $149</div>
              </div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 900, color: GOLD, fontFamily: 'Montserrat, sans-serif' }}>
                {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>الوقت المتبقي</div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
              <button onClick={scrollToForm} style={{
                background: GOLD, color: DARK_NAVY, border: 'none',
                borderRadius: 10, padding: '12px 20px', fontSize: 13, fontWeight: 800, cursor: 'pointer',
              }}>احجز الآن</button>
              <button onClick={() => setBannerClosed(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 20 }}>×</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SOCIAL PROOF POPUP ────────────────────────── */}
      <AnimatePresence>
        {showProof && (
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
            style={{
              position: 'fixed', bottom: showBanner && !bannerClosed ? 100 : 24, left: 20, zIndex: 97,
              background: WHITE, borderRadius: 12, padding: '12px 16px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: 10,
              border: `1px solid rgba(244,196,48,0.3)`, maxWidth: 260,
            }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, ${GOLD})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={16} color={WHITE} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: DARK_NAVY }}>{PROOFS[proofIndex]}</div>
              <div style={{ fontSize: 11, color: GRAY }}>منذ قليل</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px; }
          .timeline-item { flex-direction: column !important; text-align: center !important; }
          .comparison-table { font-size: 13px !important; }
        }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        @keyframes priceGlow { 0%,100% { text-shadow: 0 0 20px rgba(244,196,48,0.4); } 50% { text-shadow: 0 0 40px rgba(244,196,48,0.7); } }
        .pulse-badge { animation: pulse 2s infinite; }
        .bounce-arrow { animation: bounce 2s infinite; }
        .price-glow { animation: priceGlow 2s infinite; }
        .cta-primary:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(244,196,48,0.5) !important; }
        .offices-badge:hover { transform: translateY(-3px); box-shadow: 0 14px 35px rgba(0,0,0,0.25) !important; border-color: rgba(244,196,48,0.7) !important; }
        .office-card:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.18) !important; }
        .offices-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 768px) {
          .offices-badge { padding: 20px 30px !important; }
          .offices-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   OFFICES GRID
═══════════════════════════════════════════════════════ */
interface OfficeProps {
  badge: string;
  badgeBg: string;
  cityEn: string;
  cityAr: string;
  address: string[];
  phone: string;
  email: string;
  hours: string[];
  mapsUrl: string;
}

function OfficeCard({ badge, badgeBg, cityEn, cityAr, address, phone, email, hours, mapsUrl }: OfficeProps) {
  const detailRow = (icon: React.ReactNode, children: React.ReactNode) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 15 }}>
      <span style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}>{icon}</span>
      <span style={{ fontSize: 15, color: '#2C3E50', lineHeight: 1.6 }}>{children}</span>
    </div>
  );
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="office-card"
      style={{ background: LIGHT_GRAY, borderRadius: 25, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', transition: 'all 0.4s ease' }}>

      {/* Image/Map area */}
      <div style={{ height: 300, background: `linear-gradient(135deg, ${NAVY} 0%, ${DARK_NAVY} 100%)`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Decorative map pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: `radial-gradient(${GOLD} 1.5px, transparent 1.5px)`, backgroundSize: '30px 30px' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'rgba(255,255,255,0.15)' }}>
          <Building2 size={100} />
        </div>
        {/* Badge top-left */}
        <div style={{ position: 'absolute', top: 0, left: 0, background: badgeBg, color: WHITE, padding: '10px 20px', borderRadius: '0 0 15px 0', fontSize: 14, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>
          {badge}
        </div>
        {/* City badge bottom-right */}
        <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(255,255,255,0.9)', color: DARK_NAVY, padding: '12px 24px', borderRadius: '15px 0 0 0', fontSize: 16, fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}>
          {cityAr}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 40 }}>
        <h3 style={{ fontSize: 32, fontWeight: 900, color: DARK_NAVY, margin: '0 0 5px', fontFamily: 'Montserrat, sans-serif' }}>{cityEn}</h3>
        <div style={{ fontSize: 26, fontWeight: 700, color: GOLD, marginBottom: 20, fontFamily: 'Cairo, sans-serif' }}>مكتب {cityAr}</div>
        <div style={{ width: 60, height: 3, background: GOLD, borderRadius: 99, marginBottom: 28 }} />

        {detailRow(<MapPin size={20} />, <div>{address.map((l, i) => <div key={i}>{l}</div>)}</div>)}
        {detailRow(<Phone size={20} />, <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ color: '#2C3E50', textDecoration: 'none' }}>{phone}</a>)}
        {detailRow(<Mail size={20} />, <a href={`mailto:${email}`} style={{ color: '#2C3E50', textDecoration: 'none' }}>{email}</a>)}
        {detailRow(<Clock size={20} />, <div>{hours.map((h, i) => <div key={i}>{h}</div>)}</div>)}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
            style={{ flex: 6, height: 55, background: `linear-gradient(135deg, #C49B1A, ${GOLD})`, color: DARK_NAVY, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', boxShadow: `0 6px 20px rgba(244,196,48,0.35)`, transition: 'all 0.3s' }}>
            Get Directions 📍
          </a>
          <a href={`tel:${phone.replace(/\s/g, '')}`}
            style={{ flex: 4, height: 55, background: DARK_NAVY, color: WHITE, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', transition: 'all 0.3s' }}>
            Call Now 📞
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function OfficesGrid() {
  return (
    <div className="offices-grid">
      <OfficeCard
        badge="MAIN OFFICE"
        badgeBg={GOLD}
        cityEn="Algiers Office"
        cityAr="الجزائر العاصمة"
        address={['شارع ديدوش مراد', 'سيدي يحيى، الجزائر العاصمة', 'الجزائر 🇩🇿']}
        phone="+213 791 789 125"
        email="contact@go-llc.com"
        hours={['الاثنين — الجمعة: 9:00 ص — 6:00 م', 'السبت: 10:00 ص — 2:00 م', 'الأحد: مغلق']}
        mapsUrl="https://maps.google.com/?q=Alger+Centre,+Algiers,+Algeria"
      />
      <OfficeCard
        badge="BRANCH OFFICE"
        badgeBg={NAVY}
        cityEn="Constantine Office"
        cityAr="قسنطينة"
        address={['شارع زيغود يوسف', 'حي الإخوة عباس، قسنطينة', 'الجزائر 🇩🇿']}
        phone="+213 791 789 125"
        email="contact@go-llc.com"
        hours={['الاثنين — الجمعة: 9:00 ص — 6:00 م', 'السبت: 10:00 ص — 2:00 م', 'الأحد: مغلق']}
        mapsUrl="https://maps.google.com/?q=Constantine,+Algeria"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FEATURE CARD
═══════════════════════════════════════════════════════ */
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  arabic: string;
  desc: string;
  items: string[];
  badge?: string;
}

function FeatureCard({ icon, title, arabic, desc, items, badge }: FeatureProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(26,58,82,0.15)' }}
      style={{
        background: LIGHT_GRAY, borderRadius: 20, padding: 36,
        border: '1px solid transparent', transition: 'all 0.3s', position: 'relative',
      }}>
      {badge && (
        <div style={{ position: 'absolute', top: 16, left: 16, background: RED, color: WHITE, borderRadius: 99, padding: '4px 12px', fontSize: 12, fontWeight: 800 }}>{badge}</div>
      )}
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', marginBottom: 20, color: GOLD }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: DARK_NAVY, margin: '0 0 6px', fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>
      <h4 style={{ fontSize: 18, fontWeight: 700, color: GOLD, margin: '0 0 12px' }}>{arabic}</h4>
      <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#2C3E50', marginBottom: 8 }}>
            <Check size={15} color={GREEN} strokeWidth={3} /> {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

const FEATURES: FeatureProps[] = [
  {
    icon: <Building2 size={32} />, title: 'US LLC Formation', arabic: 'تأسيس شركة أمريكية',
    desc: 'تأسيس شركة LLC كاملة في New Mexico أو Wyoming مع جميع المستندات الرسمية.',
    items: ['New Mexico أو Wyoming', 'رقم EIN من IRS', 'عقد التشغيل', 'Registered Agent (سنة)', 'شهادة التأسيس', 'معالجة سريعة'],
  },
  {
    icon: <CreditCard size={32} />, title: 'Wise Business Account', arabic: 'حساب وايز للأعمال',
    desc: 'دعم كامل في فتح حساب Wise Business بنسبة نجاح 100%.',
    items: ['دعم كامل في التقديم', 'نجاح 100%', 'حساب متعدد العملات', 'رسوم تحويل منخفضة', 'مدفوعات عالمية', 'جاهز في 7-10 أيام'],
  },
  {
    icon: <Handshake size={32} />, title: 'Verto Banking (Exclusive!)', arabic: 'بنك فيرتو - شراكة حصرية',
    desc: 'شراكة حصرية مع Verto للحلول المصرفية B2B متعددة العملات.',
    items: ['حلول دفع B2B', 'حسابات متعددة العملات', 'تحويلات دولية', 'أسعار تنافسية', 'دعم MENA متخصص', 'وصول حصري'],
    badge: 'جديد!',
  },
  {
    icon: <Zap size={32} />, title: 'Mercury Business Account', arabic: 'حساب ميركوري',
    desc: 'حساب بنكي أمريكي عبر الإنترنت بدون رسوم شهرية.',
    items: ['بنك أمريكي كامل', 'بدون رسوم شهرية', 'مؤمن FDIC', 'تحويلات ACH سريعة', 'بطاقة خصم مشمولة', 'إرشاد كامل'],
  },
  {
    icon: <ShoppingCart size={32} />, title: 'Stripe Payment Gateway', arabic: 'بوابة الدفع سترايب',
    desc: 'قبول بطاقات الائتمان ومعالجة المدفوعات العالمية بكل سهولة.',
    items: ['قبول بطاقات الائتمان', 'معالجة عالمية', '2.9% + $0.30 للمعاملة', 'إعداد تكامل كامل', 'حماية من الاحتيال', 'واجهة مطور'],
  },
  {
    icon: <DollarSign size={32} />, title: 'PayPal Business', arabic: 'باي بال للأعمال',
    desc: 'إعداد حساب PayPal للأعمال مع نظام فواتير كامل.',
    items: ['إعداد حساب الأعمال', 'أزرار الدفع', 'نظام الفواتير', 'قبول عالمي', 'حماية المشتري', 'مدفوعات موبايل'],
  },
];

/* ═══════════════════════════════════════════════════════
   COMPARISON TABLE
═══════════════════════════════════════════════════════ */
function ComparisonTable() {
  const rows = [
    ['تأسيس LLC', '$179-299 ✓', '✓', '✓'],
    ['حساب Wise', '✗ أو $150', '✓', '✓'],
    ['بنك Verto', '✗', '✗', '✓ حصري!'],
    ['حساب Mercury', '✗', '✗', '✓'],
    ['Stripe', '✗ أو $100', '✗', '✓ إعداد كامل'],
    ['PayPal', '✗', '✗', '✓'],
    ['مدة الدعم', '30 يوم', '30 يوم', '60 يوم'],
    ['استشارة خاصة', '✗ أو $100+', '15 دقيقة', '60 دقيقة'],
    ['دعم أولوية', '✗', '✗', '✓'],
    ['القيمة الإجمالية', '$500+', '$179', '$149 🔥'],
  ];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', background: WHITE, borderRadius: 20, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr>
            <th style={{ padding: '20px 16px', textAlign: 'right', background: LIGHT_GRAY, color: GRAY, fontSize: 15 }}>الخدمة</th>
            <th style={{ padding: '20px 16px', textAlign: 'center', background: LIGHT_GRAY, color: DARK_NAVY, fontSize: 18 }}>المنافسون</th>
            <th style={{ padding: '20px 16px', textAlign: 'center', background: WHITE, color: DARK_NAVY, fontSize: 18 }}>الباقة الأساسية<br /><span style={{ fontSize: 14, color: GRAY }}>$179</span></th>
            <th style={{ padding: '20px 16px', textAlign: 'center', background: `linear-gradient(135deg, ${NAVY}, ${DARK_NAVY})`, position: 'relative' }}>
              <div style={{ color: GOLD, fontSize: 11, fontWeight: 800, marginBottom: 4 }}>BEST VALUE</div>
              <div style={{ color: WHITE, fontSize: 22, fontWeight: 900, fontFamily: 'Montserrat, sans-serif' }}>PRO PACKAGE</div>
              <div style={{ color: GOLD, fontSize: 40, fontWeight: 900, fontFamily: 'Montserrat, sans-serif' }}>$149</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([feature, c1, c2, c3], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? WHITE : '#FAFAFA' }}>
              <td style={{ padding: '16px', fontWeight: 600, color: DARK_NAVY, fontSize: 15, borderBottom: '1px solid #f0f0f0' }}>{feature}</td>
              <td style={{ padding: '16px', textAlign: 'center', color: c1.includes('✗') ? '#ccc' : GRAY, fontSize: 14, borderBottom: '1px solid #f0f0f0' }}>{c1}</td>
              <td style={{ padding: '16px', textAlign: 'center', color: c2.includes('✗') ? '#ccc' : GREEN, fontSize: 16, fontWeight: 700, borderBottom: '1px solid #f0f0f0' }}>{c2}</td>
              <td style={{ padding: '16px', textAlign: 'center', color: c3.includes('✗') ? '#aaa' : GOLD, fontSize: 15, fontWeight: 800, background: 'rgba(26,58,82,0.03)', borderBottom: '1px solid #f0f0f0' }}>{c3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TIMELINE
═══════════════════════════════════════════════════════ */
const STEPS = [
  { icon: <Calendar size={36} />, title: 'Book Consultation', arabic: 'احجز استشارة مجانية', desc: 'حدد موعداً لمكالمة 30 دقيقة مع خبيرنا. سنفهم احتياجاتك ونجيب على أسئلتك ونضع خطة مخصصة.', duration: '30 دقيقة' },
  { icon: <FileText size={36} />, title: 'We Handle Everything', arabic: 'نتولى كل شيء', desc: 'استرخِ وفريقنا يتولى تأسيس LLC وطلب EIN وفتح جميع الحسابات وتكامل بوابات الدفع. ستتلقى تحديثات في كل خطوة.', duration: '7-14 يوم' },
  { icon: <CheckCircle2 size={36} />, title: 'Accounts Go Live', arabic: 'تفعيل الحسابات', desc: 'استلم وثائق LLC وبيانات الدخول لجميع الحسابات ولوحات تحكم بوابات الدفع. كل شيء جاهز للاستخدام فوراً.', duration: '1-2 يوم' },
  { icon: <Headphones size={36} />, title: '60-Day Premium Support', arabic: 'دعم ممتد 60 يوم', desc: 'لن نختفي! احصل على دعم أولوية لمدة 60 يوماً. أسئلة حول التحويلات أو الامتثال أو التكاملات — نحن هنا.', duration: '60 يوم' },
];

function Timeline() {
  return (
    <div style={{ position: 'relative' }}>
      {STEPS.map((step, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="timeline-item"
          style={{ display: 'flex', gap: 32, marginBottom: 48, alignItems: 'flex-start', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
          {/* Number */}
          <div style={{ flexShrink: 0, width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, #C49B1A, ${GOLD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900, color: DARK_NAVY, fontFamily: 'Montserrat', boxShadow: `0 8px 20px rgba(244,196,48,0.35)` }}>
            {i + 1}
          </div>
          {/* Card */}
          <div style={{ flex: 1, background: LIGHT_GRAY, borderRadius: 20, padding: 32 }}>
            <div style={{ color: GOLD, marginBottom: 12 }}>{step.icon}</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: DARK_NAVY, margin: '0 0 4px', fontFamily: 'Montserrat, sans-serif' }}>{step.title}</h3>
            <h4 style={{ fontSize: 20, fontWeight: 700, color: GOLD, margin: '0 0 12px' }}>{step.arabic}</h4>
            <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.7, margin: '0 0 16px' }}>{step.desc}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: WHITE, border: `1px solid ${GOLD}`, borderRadius: 99, padding: '6px 14px', fontSize: 13, color: DARK_NAVY, fontWeight: 600 }}>
              <Clock size={14} color={GOLD} /> ⏱ {step.duration}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { name: 'Mohammed A.', loc: 'E-commerce, المغرب', text: 'جربت 3 مرات مع آخرين لفتح Wise — دائماً رُفضت. Go LLC حصل على الموافقة في المحاولة الأولى في 10 أيام فقط. محترف وسريع الاستجابة!' },
  { name: 'Fatima K.', loc: 'مستوردة، الجزائر', text: 'الباقة PRO قيمة استثنائية. حصلت على LLC + Wise + Mercury + Stripe كلها مُعدة بشكل مثالي. دعم الـ 60 يوم كان رائعاً عند تحويلاتي الأولى.' },
  { name: 'Ahmed R.', loc: 'دروبشيبر، مصر', text: 'أفضل استثمار لعملي. ليس فقط الإعداد بل التعليم والتوجيه. علموني كيف أستخدم كل شيء بشكل صحيح. يستحق كل دولار!' },
  { name: 'Sarah M.', loc: 'فريلانسر، تونس', text: 'سريع، محترف، ويهتمون فعلاً. كان لدي مشكلة مع Stripe وبقوا معي في المكالمة حتى حُلّت. هذا ما يسمى الخدمة الحقيقية!' },
  { name: 'Youssef B.', loc: 'مُصدِّر، المغرب', text: 'شراكة Verto غيّرت قواعد اللعبة! كمُصدِّر، الحصول على مدفوعات B2B متعددة العملات وفّر لي الآلاف في الرسوم. Go LLC وصلني إليه مباشرة.' },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const check = () => setVisible(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const total = TESTIMONIALS.length;
  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: 24, overflow: 'hidden' }}>
        {Array.from({ length: visible }, (_, i) => {
          const t = TESTIMONIALS[(active + i) % total];
          return (
            <motion.div key={active + i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              style={{ flex: 1, background: WHITE, borderRadius: 20, padding: 36, boxShadow: '0 10px 30px rgba(0,0,0,0.15)', minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill={GOLD} color={GOLD} />)}
              </div>
              <p style={{ fontSize: 15, color: DARK_NAVY, lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
              <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 0 16px', width: 60 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY}, ${GOLD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WHITE, fontWeight: 800, fontSize: 16 }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: DARK_NAVY, fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {t.name} <span style={{ color: GREEN, fontSize: 12 }}><CheckCircle2 size={13} /> موثّق</span>
                  </div>
                  <div style={{ fontSize: 13, color: GRAY }}>{t.loc}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 32 }}>
        <button onClick={prev} style={{ width: 48, height: 48, borderRadius: '50%', background: GOLD, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: DARK_NAVY }}>
          <ChevronRight size={22} />
        </button>
        {TESTIMONIALS.map((_, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 99, background: i === active ? GOLD : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.3s' }} />
        ))}
        <button onClick={next} style={{ width: 48, height: 48, borderRadius: '50%', background: GOLD, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: DARK_NAVY }}>
          <ChevronLeft size={22} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════ */
const FAQS = [
  { q: 'How long does the complete setup take?', a: 'كامل العملية عادة 7-14 يوم عمل. تأسيس LLC 3-5 أيام، Wise 3-7 أيام، والخدمات الأخرى تسير بالتوازي. سنحدّثك عند كل مرحلة.' },
  { q: 'Do I need to be in the US?', a: 'لا! الخدمة مصممة خصيصاً لرواد الأعمال الدوليين. يمكنك أن تكون في أي مكان في العالم. جميع العمليات تتم عن بُعد.' },
  { q: 'What if Wise rejects my application?', a: 'معدل نجاحنا مع Wise هو 100% لأننا نُعدّ كل شيء بشكل صحيح. إذا حدث رفض بسبب خطأ منّا (لم يحدث قط)، تحصل على استرداد كامل.' },
  { q: 'Can I choose which state for my LLC?', a: 'نعم! نقدم New Mexico وWyoming. خلال الاستشارة، نوصي بالأفضل بناءً على نوع عملك. كلا الولايتين صديقتان للأعمال بتكاليف منخفضة.' },
  { q: "What's included in the 60-day support?", a: 'أسئلة غير محدودة عبر Email/WhatsApp حول LLC والبنوك والمدفوعات والتحويلات والامتثال. رد بأولوية خلال 24 ساعة.' },
  { q: 'Is this legal and compliant?', a: '100% قانوني. LLCs الأمريكية يمكن أن يمتلكها غير المقيمين. نتولى جميع متطلبات الامتثال بما فيها EIN من IRS وتسجيلات الولاية.' },
  { q: 'What payment methods do you accept?', a: 'نقبل PayPal وWise وتحويل بنكي وعملات مشفرة. الدفع مقسم: 50% للبدء، 50% عند اعتماد LLC وجاهزية طلبات البنوك.' },
  { q: "What makes your Verto partnership special?", a: 'Verto عادةً لا يعمل مع أفراد، فقط مع شركات راسخة. شراكتنا تمنحك وصولاً مباشراً لحلول مصرفية B2B — مثالية للمستوردين والمصدّرين.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {FAQS.map((f, i) => (
        <div key={i} style={{ background: LIGHT_GRAY, borderRadius: 15, overflow: 'hidden', boxShadow: open === i ? '0 4px 20px rgba(0,0,0,0.08)' : 'none', transition: 'box-shadow 0.3s' }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: '100%', padding: '24px 28px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'right', gap: 12 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: DARK_NAVY, fontFamily: 'Montserrat, Cairo, sans-serif' }}>{f.q}</span>
            <span style={{ color: GOLD, flexShrink: 0, transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none' }}>
              <ChevronDown size={22} />
            </span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                <p style={{ padding: '0 28px 24px', fontSize: 15, color: GRAY, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BOOKING FORM (single page)
═══════════════════════════════════════════════════════ */
type FormData = {
  name: string; email: string; phone: string;
  businessType: string; interestedIn: string;
  callTime: string; callMethod: string;
  notes: string; consent: boolean;
};

function BookingForm() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '',
    businessType: '', interestedIn: '',
    callTime: '', callMethod: '',
    notes: '', consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof FormData, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = 'الاسم مطلوب';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'بريد إلكتروني غير صحيح';
    if (!form.phone.trim()) e.phone = 'رقم الهاتف مطلوب';
    if (!form.businessType) e.businessType = 'نوع العمل مطلوب';
    if (!form.interestedIn) e.interestedIn = 'هذا الحقل مطلوب';
    if (!form.consent) e.consent = 'يجب الموافقة على سياسة الخصوصية';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const waText = encodeURIComponent(
      `مرحباً! أريد حجز استشارة مجانية لباقة PRO.\n\nالاسم: ${form.name}\nالإيميل: ${form.email}\nالهاتف: +213${form.phone}\nنوع العمل: ${form.businessType}\nالاهتمام: ${form.interestedIn}\nالوقت المفضل: ${form.callTime || 'غير محدد'}\nطريقة الاتصال: ${form.callMethod || 'غير محدد'}\nملاحظات: ${form.notes || 'لا يوجد'}`
    );

    fetch('https://script.google.com/macros/s/AKfycbxAUjYygnlh3uXk3n0ZXQdL1p7tn7EzaQTCv07009IT4TOQHwEWUJ5RUcoM_eir0css/exec', {
      method: 'POST', mode: 'no-cors', keepalive: true,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ ...form, source: 'pro-landing-page', timestamp: new Date().toISOString() }),
    }).catch(() => {});

    if (typeof window !== 'undefined' && window.fbq) {
      const eventID = `Lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      window.fbq('trackSingle', '971404735379392', 'Lead', {}, { eventID });
    }

    setSubmitted(true);
    window.location.href = `https://wa.me/213791789125?text=${waText}`;
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: 10,
    border: '2px solid #e5e7eb', fontSize: 15, outline: 'none',
    fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', background: WHITE,
    transition: 'border-color 0.2s',
  };
  const lbl: React.CSSProperties = { fontSize: 14, fontWeight: 700, color: DARK_NAVY, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 };
  const err = (k: keyof FormData) => errors[k] ? <p style={{ color: RED, fontSize: 12, margin: '4px 0 0' }}>{errors[k]}</p> : null;

  if (submitted) {
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ background: WHITE, borderRadius: 24, padding: '80px 48px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <Check size={52} color={WHITE} strokeWidth={3} />
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 900, color: DARK_NAVY, margin: '0 0 8px', fontFamily: 'Montserrat, sans-serif' }}>Booking Confirmed! 🎉</h2>
        <h3 style={{ fontSize: 28, fontWeight: 900, color: GOLD, marginBottom: 16 }}>تم تأكيد الحجز!</h3>
        <p style={{ fontSize: 16, color: GRAY }}>جاري تحويلك إلى WhatsApp...</p>
      </motion.div>
    );
  }

  return (
    <div style={{ background: WHITE, borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: `1px solid rgba(244,196,48,0.2)` }}>

      {/* Card header */}
      <div style={{ background: `linear-gradient(135deg, ${DARK_NAVY}, ${NAVY})`, padding: '32px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, color: WHITE, fontFamily: 'Montserrat, sans-serif', margin: '0 0 6px' }}>BOOK FREE CONSULTATION</h2>
        <h3 style={{ fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 900, color: GOLD, margin: 0 }}>احجز استشارتك المجانية</h3>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Full Name */}
        <div>
          <label style={lbl}><span>👤</span> الاسم الكامل *</label>
          <input type="text" placeholder="أدخل اسمك الكامل" value={form.name}
            onChange={e => set('name', e.target.value)}
            style={{ ...inp, borderColor: errors.name ? RED : '#e5e7eb' }} />
          {err('name')}
        </div>

        {/* Email */}
        <div>
          <label style={lbl}><span>✉️</span> البريد الإلكتروني *</label>
          <input type="email" placeholder="email@example.com" value={form.email} dir="ltr"
            onChange={e => set('email', e.target.value)}
            style={{ ...inp, borderColor: errors.email ? RED : '#e5e7eb' }} />
          {err('email')}
        </div>

        {/* WhatsApp */}
        <div>
          <label style={lbl}><span>📱</span> رقم واتساب *</label>
          <div style={{ display: 'flex', gap: 0 }}>
            <span style={{ padding: '13px 14px', background: LIGHT_GRAY, border: '2px solid #e5e7eb', borderLeft: 'none', borderRadius: '0 10px 10px 0', fontSize: 15, fontWeight: 700, color: DARK_NAVY, whiteSpace: 'nowrap' }}>+213</span>
            <input type="tel" placeholder="XX XXX XXXX" value={form.phone} dir="ltr"
              onChange={e => set('phone', e.target.value)}
              style={{ ...inp, borderColor: errors.phone ? RED : '#e5e7eb', borderRadius: '10px 0 0 10px', flex: 1 }} />
          </div>
          {err('phone')}
        </div>

        {/* Business Type */}
        <div>
          <label style={lbl}><span>💼</span> نوع العمل *</label>
          <select value={form.businessType} onChange={e => set('businessType', e.target.value)}
            style={{ ...inp, borderColor: errors.businessType ? RED : '#e5e7eb' }}>
            <option value="">اختر نوع عملك</option>
            {['🛒 متجر إلكتروني', '📦 دروبشيبينج', '🌍 استيراد / تصدير', '💻 فريلانس / خدمات', '🏢 وكالة / استشارات', '🎬 منشئ محتوى', '📦 أخرى'].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {err('businessType')}
        </div>

        {/* Interested In */}
        <div>
          <label style={lbl}><span>⭐</span> مهتم بـ *</label>
          <select value={form.interestedIn} onChange={e => set('interestedIn', e.target.value)}
            style={{ ...inp, borderColor: errors.interestedIn ? RED : '#e5e7eb' }}>
            <option value="">اختر الخدمة</option>
            {['🏢 تأسيس LLC فقط', '💳 تأسيس LLC + حساب Wise', '🚀 الباقة PRO الكاملة ($149)', '🏦 فتح بنك Verto فقط', '💰 Stripe / PayPal فقط', '❓ لست متأكداً (استشارة)'].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {err('interestedIn')}
        </div>

        {/* Best Time */}
        <div>
          <label style={lbl}><span>⏰</span> الوقت المفضل للاتصال</label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[['صباحاً', '🌅'], ['ظهراً', '☀️'], ['مساءً', '🌆']].map(([t, icon]) => (
              <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontSize: 15, color: DARK_NAVY, flex: 1, minWidth: 100, background: form.callTime === t ? 'rgba(244,196,48,0.12)' : LIGHT_GRAY, padding: '11px 14px', borderRadius: 10, border: `2px solid ${form.callTime === t ? GOLD : 'transparent'}`, transition: 'all 0.2s' }}>
                <input type="radio" name="callTime" value={t} checked={form.callTime === t} onChange={() => set('callTime', t)} style={{ accentColor: GOLD }} />
                {icon} {t}
              </label>
            ))}
          </div>
        </div>

        {/* Meeting Method */}
        <div>
          <label style={lbl}><span>📞</span> طريقة الاجتماع *</label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[['واتساب', '📱'], ['هاتف', '☎️'], ['فيديو', '🎥']].map(([t, icon]) => (
              <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontSize: 15, color: DARK_NAVY, flex: 1, minWidth: 100, background: form.callMethod === t ? 'rgba(244,196,48,0.12)' : LIGHT_GRAY, padding: '11px 14px', borderRadius: 10, border: `2px solid ${form.callMethod === t ? GOLD : 'transparent'}`, transition: 'all 0.2s' }}>
                <input type="radio" name="callMethod" value={t} checked={form.callMethod === t} onChange={() => set('callMethod', t)} style={{ accentColor: GOLD }} />
                {icon} {t}
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label style={lbl}><span>📝</span> ملاحظات إضافية (اختياري)</label>
          <textarea rows={3} placeholder="اكتب أسئلتك أو وضعك الخاص..." value={form.notes}
            onChange={e => set('notes', e.target.value)}
            style={{ ...inp, resize: 'vertical', minHeight: 80 }} />
        </div>

        {/* Consent */}
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 14, color: DARK_NAVY }}>
          <input type="checkbox" checked={form.consent} onChange={e => set('consent', e.target.checked)} style={{ accentColor: GOLD, marginTop: 2 }} />
          <span>أوافق على <span style={{ color: GOLD, fontWeight: 700 }}>سياسة الخصوصية</span></span>
        </label>
        {err('consent')}

        {/* Submit */}
        <button type="submit" style={{
          width: '100%', padding: '18px', background: `linear-gradient(135deg, #C49B1A, ${GOLD})`,
          color: DARK_NAVY, border: 'none', borderRadius: 12, fontSize: 18, fontWeight: 900,
          cursor: 'pointer', boxShadow: `0 8px 25px rgba(244,196,48,0.4)`, display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'Cairo, sans-serif',
        }}>
          <Rocket size={20} /> احجز استشارتي المجانية 🚀
        </button>

        {/* Trust notes */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: GRAY, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Shield size={14} color={GREEN} /> معلوماتك آمنة
          </span>
          <span style={{ fontSize: 13, color: GRAY, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Check size={14} color={GREEN} strokeWidth={3} /> سنتواصل خلال 24 ساعة
          </span>
        </div>
      </form>

      {/* OR divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 40px' }}>
        <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: GRAY }}>أو</span>
        <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
      </div>

      {/* In-Person */}
      <div style={{ padding: '28px 40px 36px', textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: DARK_NAVY, marginBottom: 8 }}>🏢 تفضل بزيارتنا شخصياً</div>
        <div style={{ fontSize: 14, color: GRAY, marginBottom: 6 }}>الجزائر العاصمة + قسنطينة</div>
        <div style={{ fontSize: 13, color: GRAY, marginBottom: 16 }}>الاثنين — الجمعة: 9ص — 6م | السبت: 10ص — 2م</div>
        <a href={`https://wa.me/213791789125?text=${encodeURIComponent('مرحباً، أريد معرفة عنوان مكتبكم.')}`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: LIGHT_GRAY, color: DARK_NAVY, textDecoration: 'none', padding: '10px 20px', borderRadius: 99, fontSize: 14, fontWeight: 700, border: `1px solid #e5e7eb` }}>
          <MapPin size={16} color={GOLD} /> احصل على الاتجاهات 📍
        </a>
      </div>
    </div>
  );
}
