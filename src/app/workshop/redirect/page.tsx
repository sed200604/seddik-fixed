'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/pixel';

const WA_GROUP = 'https://chat.whatsapp.com/Ex4acdbA5v4DDPBdyUsAT8';
const TARGET_DATE = new Date('2026-06-04T20:00:00');
const PIXEL_ID = '1550403373422548';

/* ── countdown ── */
function useCountdown() {
  const [cd, setCd] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });
  useEffect(() => {
    const calc = () => {
      const diff = TARGET_DATE.getTime() - Date.now();
      if (diff <= 0) return setCd({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
      setCd({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
        expired: false,
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);
  return cd;
}

export default function WorkshopRedirect() {
  const firedRef = useRef(false);
  const clickedRef = useRef(false);
  const [counter, setCounter] = useState(43);
  const [flipKey, setFlipKey] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const exitShownRef = useRef(false);
  const cd = useCountdown();

  /* Fire Lead pixel once */
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('init', PIXEL_ID);
      window.fbq('trackSingle', PIXEL_ID, 'Lead', {
        content_name: 'Workshop Registration',
        content_category: 'Workshop',
      });
    }
    trackEvent('Lead', {
      content_name: 'Workshop Registration',
      content_category: 'Workshop',
    });
  }, []);


  /* Confetti */
  useEffect(() => {
    const colors = ['#F4C430', '#C49B1A', '#ffffff', '#28A745', '#FFE17B'];
    const container = document.body;
    const pieces: HTMLElement[] = [];
    for (let i = 0; i < 80; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position:fixed;top:-10px;
        left:${Math.random() * 100}vw;
        width:8px;height:4px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        border-radius:2px;
        pointer-events:none;
        z-index:99999;
        animation: confettiFall ${2.5 + Math.random() * 1.5}s ease-in ${Math.random() * 0.8}s forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;
      container.appendChild(el);
      pieces.push(el);
    }
    const t = setTimeout(() => pieces.forEach(p => p.remove()), 5000);
    return () => { clearTimeout(t); pieces.forEach(p => p.remove()); };
  }, []);

  /* Social proof counter */
  useEffect(() => {
    const schedule = () => {
      const delay = 45_000 + Math.random() * 45_000;
      return setTimeout(() => {
        setCounter(c => {
          if (c >= 127) return c;
          setFlipKey(k => k + 1);
          return c + 1;
        });
        timerRef.current = schedule();
      }, delay);
    };
    const timerRef = { current: schedule() };
    return () => clearTimeout(timerRef.current);
  }, []);

  /* Sticky bar after 8s */
  useEffect(() => {
    const t = setTimeout(() => {
      if (!clickedRef.current) setShowSticky(true);
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  /* Exit intent: fast scroll-up on mobile */
  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = Date.now();
    const onScroll = () => {
      const now = Date.now();
      const y = window.scrollY;
      const velocity = (y - lastY) / (now - lastTime);
      if (velocity < -1.5 && !exitShownRef.current && !clickedRef.current) {
        const seen = localStorage.getItem('_wo_exit_seen');
        if (!seen) {
          exitShownRef.current = true;
          localStorage.setItem('_wo_exit_seen', '1');
          setShowExitModal(true);
        }
      }
      lastY = y;
      lastTime = now;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleWaClick = () => {
    clickedRef.current = true;
    setShowSticky(false);
  };

  const S = {
    page: {
      minHeight: '100vh',
      background: '#0A1628',
      fontFamily: 'Cairo, sans-serif',
      direction: 'rtl' as const,
      padding: '0 0 80px',
      overflowX: 'hidden' as const,
    } as React.CSSProperties,
    inner: {
      maxWidth: 520,
      margin: '0 auto',
      padding: '48px 20px 24px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: 24,
    } as React.CSSProperties,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes confettiFall{
          to{transform:translateY(110vh) rotate(720deg);opacity:0;}
        }
        @keyframes bounceIn{
          0%{transform:scale(0);opacity:0;}
          60%{transform:scale(1.15);}
          80%{transform:scale(0.95);}
          100%{transform:scale(1);opacity:1;}
        }
        @keyframes fadeUp{
          from{opacity:0;transform:translateY(20px);}
          to{opacity:1;transform:translateY(0);}
        }
        @keyframes slideRight{
          from{opacity:0;transform:translateX(30px);}
          to{opacity:1;transform:translateX(0);}
        }
        @keyframes glow{
          0%,100%{box-shadow:0 8px 32px rgba(37,211,102,0.45);}
          50%{box-shadow:0 8px 48px rgba(37,211,102,0.8),0 0 0 8px rgba(37,211,102,0.12);}
        }
        @keyframes borderPulse{
          0%,100%{border-color:rgba(229,57,53,0.35);}
          50%{border-color:rgba(229,57,53,0.85);}
        }
        @keyframes flipNum{
          0%{transform:translateY(-100%);opacity:0;}
          100%{transform:translateY(0);opacity:1;}
        }
        @keyframes slideUp{
          from{transform:translateY(100%);}
          to{transform:translateY(0);}
        }
        @keyframes fadeIn{
          from{opacity:0;}to{opacity:1;}
        }
        .wa-btn:hover{transform:scale(1.03) !important;}
        .trust-item:hover{border-color:rgba(244,196,48,0.4) !important;}
      `}</style>

      <div style={S.page}>
        <div style={S.inner}>

          {/* ── ELEMENT 1: SUCCESS ── */}
          <div style={{ textAlign: 'center', animation: 'fadeUp 0.5s 0.3s both' }}>
            {/* Success icon */}
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              background: 'rgba(40,167,69,0.15)',
              border: '3px solid #28A745',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              animation: 'bounceIn 0.6s ease both',
            }}>
              <span style={{ fontSize: 48, color: '#28A745', lineHeight: 1 }}>✓</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(26px,6vw,38px)', fontWeight: 900, color: '#fff',
              marginBottom: 10,
              animation: 'fadeUp 0.5s 0.3s both',
            }}>
              تم تسجيلك بنجاح! 🎉
            </h1>
            <p style={{
              fontSize: 'clamp(14px,3vw,17px)', color: '#B0BEC5', lineHeight: 1.7,
              animation: 'fadeUp 0.5s 0.5s both',
            }}>
              أنت الآن ضمن قائمة المسجلين في ورشة البنوك الرقمية
            </p>
          </div>

          {/* ── ELEMENT 2: URGENCY BOX ── */}
          <div style={{
            width: '100%',
            background: 'rgba(229,57,53,0.12)',
            border: '1.5px solid rgba(229,57,53,0.6)',
            borderRadius: 16,
            padding: '20px 24px',
            animation: 'slideRight 0.5s 0.7s both, borderPulse 2s 1.2s ease-in-out infinite',
          }}>
            <p style={{ color: '#EF5350', fontWeight: 800, fontSize: 15, marginBottom: 12 }}>
              ⚠️ خطوة مهمة جداً — لا تتجاهل هذا
            </p>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1.7, marginBottom: 10 }}>
              رابط Zoom سيُرسل في مجموعة الواتساب <strong>فقط</strong>
              <br />
              <span style={{ color: '#B0BEC5', fontWeight: 400, fontSize: 14 }}>
                لن يُرسل بالبريد الإلكتروني ولا بأي طريقة أخرى
              </span>
            </p>
            <p style={{ color: '#EF5350', fontWeight: 600, fontSize: 13 }}>
              إذا لم تنضم للمجموعة الآن — ستفوتك الورشة حتى لو سجّلت
            </p>
          </div>

          {/* ── ELEMENT 3: WHATSAPP CTA ── */}
          <div style={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
            animation: 'fadeUp 0.5s 1.0s both',
          }}>
            {/* Social proof */}
            <div style={{ color: '#4ADE80', fontSize: 13, fontWeight: 600, textAlign: 'center' }}>
              👥 انضم بالفعل{' '}
              <span
                key={flipKey}
                style={{
                  display: 'inline-block',
                  animation: flipKey > 0 ? 'flipNum 0.3s ease both' : 'none',
                  color: '#28A745', fontWeight: 900,
                }}
              >
                {counter}
              </span>
              {' '}شخصاً للمجموعة
            </div>

            {/* Big WA button */}
            <a
              href={WA_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWaClick}
              className="wa-btn"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                width: '100%', maxWidth: 420, height: 64,
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#fff', fontWeight: 900, fontSize: 'clamp(16px,4vw,19px)',
                borderRadius: 16, textDecoration: 'none',
                animation: 'glow 2s 1.5s ease-in-out infinite',
                transition: 'transform 0.2s',
              }}
            >
              <svg viewBox="0 0 24 24" width="26" height="26" fill="white" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              📲 ادخل مجموعة الواتساب الآن ←
            </a>

            <p style={{ color: '#B0BEC5', fontSize: 12, textAlign: 'center' }}>
              🔒 مجموعة خاصة للمسجلين فقط — لا يمكن الدخول لاحقاً
            </p>

            {/* Mini countdown */}
            {!cd.expired && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginBottom: 10 }}>
                  ⏰ الورشة تبدأ بعد:
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                  {[
                    { v: cd.days, l: 'يوم' },
                    { v: cd.hours, l: 'ساعة' },
                    { v: cd.minutes, l: 'دقيقة' },
                    { v: cd.seconds, l: 'ثانية' },
                  ].map(({ v, l }, i) => (
                    <div key={i} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      background: 'rgba(244,196,48,0.1)',
                      border: '1px solid rgba(244,196,48,0.3)',
                      borderRadius: 10, padding: '8px 6px', minWidth: 56,
                    }}>
                      <span style={{
                        fontSize: 'clamp(22px,7vw,32px)', fontWeight: 900,
                        color: '#F4C430', lineHeight: 1, fontVariantNumeric: 'tabular-nums',
                      }}>
                        {String(v).padStart(2, '0')}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, marginTop: 4 }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {cd.expired && (
              <p style={{ color: '#EF5350', fontWeight: 700, fontSize: 14 }}>انتهت الورشة</p>
            )}
          </div>

          {/* ── ELEMENT 4: WHAT HAPPENS NEXT ── */}
          <div style={{
            width: '100%',
            animation: 'fadeUp 0.5s 1.6s both',
          }}>
            <h2 style={{
              color: '#fff', fontWeight: 900, fontSize: 17, textAlign: 'center', marginBottom: 24,
            }}>
              ماذا سيحدث بعد دخولك للمجموعة؟
            </h2>

            <div style={{ position: 'relative', paddingRight: 20 }}>
              {/* vertical line */}
              <div style={{
                position: 'absolute', top: 18, right: 17,
                width: 2, height: 'calc(100% - 36px)',
                borderRight: '2px dashed rgba(244,196,48,0.4)',
              }} />

              {[
                { n: '1', title: 'ستحصل على تأكيد فوري', desc: 'رسالة ترحيب شخصية تؤكد حجزك وتفاصيل الورشة كاملة' },
                { n: '2', title: 'قبل الورشة بـ 30 دقيقة', desc: 'سنرسل لك رابط Zoom مباشرة في المجموعة — ادخل وانتظر' },
                { n: '3', title: 'بعد الورشة', desc: 'ستحصل على ملخص كامل وإجابات لكل أسئلتك مباشرة من الفريق' },
              ].map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 16,
                    marginBottom: i < 2 ? 20 : 0,
                    animation: `fadeUp 0.4s ${1.6 + i * 0.15}s both`,
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#F4C430', color: '#0A1628',
                    fontWeight: 900, fontSize: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, zIndex: 1,
                  }}>
                    {step.n}
                  </div>
                  <div style={{
                    flex: 1, background: 'rgba(255,255,255,0.03)',
                    borderRadius: 12, padding: '12px 16px',
                  }}>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{step.title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, lineHeight: 1.65 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── ELEMENT 5: TRUST ── */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10,
            width: '100%',
            animation: 'fadeUp 0.5s 2.0s both',
          }}>
            {[
              { icon: '🔒', title: 'مجموعة خاصة', desc: 'للمسجلين فقط' },
              { icon: '✅', title: '100% مجاني', desc: 'بدون أي رسوم' },
              { icon: '📅', title: 'رابط Zoom فوري', desc: 'يُرسل في المجموعة فقط' },
              { icon: '🛡️', title: 'خصوصية تامة', desc: 'لن تُشارك بياناتك' },
            ].map((t, i) => (
              <div
                key={i}
                className="trust-item"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(244,196,48,0.15)',
                  borderRadius: 12, padding: '16px 12px', textAlign: 'center',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{t.title}</p>
                <p style={{ color: '#B0BEC5', fontSize: 11 }}>{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Go LLC footer */}
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, textAlign: 'center', marginTop: 8 }}>
            <span style={{ color: '#F4C430', fontWeight: 900 }}>Go LLC</span> · ورشة البنوك الرقمية المجانية
          </p>

        </div>
      </div>

      {/* ── ELEMENT 6: STICKY BAR ── */}
      {showSticky && !stickyDismissed && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: 'rgba(10,22,40,0.97)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(37,211,102,0.4)',
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          animation: 'slideUp 0.3s ease both',
          direction: 'rtl',
          fontFamily: 'Cairo, sans-serif',
        }}>
          <p style={{ color: '#B0BEC5', fontSize: 12, flex: 1, lineHeight: 1.5 }}>
            ⚠️ لا تفوتك الورشة — رابط Zoom في المجموعة فقط
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <a
              href={WA_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { handleWaClick(); setStickyDismissed(true); }}
              style={{
                background: '#25D366', color: '#fff', fontWeight: 700, fontSize: 13,
                padding: '10px 16px', borderRadius: 10, textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              📲 ادخل المجموعة ←
            </a>
            <button
              onClick={() => setStickyDismissed(true)}
              style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                fontSize: 18, cursor: 'pointer', padding: '4px 8px', lineHeight: 1,
              }}
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── EXIT INTENT MODAL ── */}
      {showExitModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '0 0 env(safe-area-inset-bottom)',
            animation: 'fadeIn 0.2s ease both',
            fontFamily: 'Cairo, sans-serif',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowExitModal(false); }}
        >
          <div style={{
            background: '#1A3A52',
            border: '1px solid rgba(244,196,48,0.25)',
            borderRadius: '20px 20px 0 0',
            padding: '28px 24px 32px',
            width: '100%', maxWidth: 520,
            direction: 'rtl',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>😟</div>
            <h3 style={{ color: '#fff', fontWeight: 900, fontSize: 20, marginBottom: 10 }}>
              هل متأكد؟ ستفوتك الورشة!
            </h3>
            <p style={{ color: '#B0BEC5', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              لم تنضم للمجموعة بعد — رابط Zoom سيُرسل هناك فقط
            </p>
            <a
              href={WA_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { handleWaClick(); setShowExitModal(false); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                width: '100%', height: 56, borderRadius: 14,
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#fff', fontWeight: 900, fontSize: 16,
                textDecoration: 'none', marginBottom: 14,
              }}
            >
              ادخل المجموعة الآن ←
            </a>
            <button
              onClick={() => setShowExitModal(false)}
              style={{
                background: 'none', border: 'none',
                color: 'rgba(255,255,255,0.35)', fontSize: 13,
                cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
                textDecoration: 'underline',
              }}
            >
              لا، سأفوّتها
            </button>
          </div>
        </div>
      )}
    </>
  );
}
