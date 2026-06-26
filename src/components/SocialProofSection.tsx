'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { trackCustom } from '@/lib/pixel';
import { useGlobalAnimation } from '@/hooks/useGlobalAnimations';

/* ─────────────────────────────────────────────
   EASE HELPERS
───────────────────────────────────────────── */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/* ─────────────────────────────────────────────
   WAVEFORM GENERATOR
   Deterministic per-seed; natural voice envelope
   (louder in middle, quieter at edges)
───────────────────────────────────────────── */
function generateWaveform(seed: number, count = 45): number[] {
  let s = (seed + 1) * 1664525;
  return Array.from({ length: count }, (_, i) => {
    s = ((s * 1103515245 + 12345) >>> 0);
    const raw = (s >>> 0) / 0xffffffff;
    const env = 0.35 + 0.65 * Math.sin((i / (count - 1)) * Math.PI);
    const h = 7 + Math.round((raw * 0.55 + env * 0.45) * 33);
    return Math.max(5, Math.min(40, h));
  });
}

/* ─────────────────────────────────────────────
   COMPARISON TABLE DATA — prompts 60-71
───────────────────────────────────────────── */
type CompRow = { feature: string; go: React.ReactNode; comp: string };

const COMP_ROWS: CompRow[] = [
  { feature: 'عقد الإيجار',       go: <>عقد إيجار <span style={{ color: '#D4A843' }}>حقيقي</span></>,                                                                               comp: 'عناوين افتراضية'   },
  { feature: 'بعد التأسيس',       go: <>شراكة مستمرة <span style={{ color: '#D4A843' }}>للأبد</span></>,                                                                             comp: 'يختفي بعد الدفع'   },
  { feature: 'نطاق الخدمة',       go: <>تأسيس + <span style={{ color: '#D4A843' }}>دعم كامل</span></>,                                                                               comp: 'تأسيس فقط'         },
  { feature: 'السعر',             go: <><span style={{ color: '#D4A843', fontFamily: 'var(--font-inter-tight)', fontFeatureSettings: '"tnum" 1' }}>$220</span> فقط</>,                comp: '$300 أو أكثر'       },
];

/* ─────────────────────────────────────────────
   TESTIMONIAL DATA — prompts 72-85
───────────────────────────────────────────── */
type TestimonialDatum = {
  initial: string;
  name: string;
  city: string;
  quote: string;       // Short pull-quote, max 2 lines
  fullText: string;    // Full transcription (fallback)
  audioSrc: string;
  audioDuration: string;
  waveformSeed: number;
};

const TESTIMONIALS: TestimonialDatum[] = [
  {
    initial: 'أ',
    name: 'أحمد بلعيد',
    city: 'وهران، الجزائر',
    quote: 'Stripe تاعي شغال، والحساب البنكي جاهز. ما صدقتش بصراحة.',
    fullText: 'جربت قبل Go LLC مع وكيل ثاني، دفعت أكثر وما شفتوش بعدها. مع Go LLC، كل شيء واضح، وفريقهم دايمًا متوفر. Stripe تاعي شغال، والحساب البنكي جاهز.',
    audioSrc: '/voice1.mp3.mp3',
    audioDuration: '0:47',
    waveformSeed: 7,
  },
  {
    initial: 'ر',
    name: 'رايان',
    city: 'الجزائر العاصمة، الجزائر',
    quote: 'فتحت شركتي وأنا في البيت. كل شيء تمشى بسرعة وبدون مشاكل.',
    fullText: 'فتحت شركتي في أمريكا وأنا في البيت. الفريق كان معايا في كل خطوة. Stripe جاهز، الحساب البنكي جاهز. ما توقعتش يصير بهاذ السهولة.',
    audioSrc: '/voice2.mp3.mp3',
    audioDuration: '0:38',
    waveformSeed: 13,
  },
  {
    initial: 'إ',
    name: 'إسلام',
    city: 'قسنطينة، الجزائر',
    quote: 'الـ $220 تبدو صغيرة مقارنة بما حصلت عليه. دعم حقيقي ومتابعة.',
    fullText: 'الـ $220 تبدو صغيرة مقارنة بما حصلت عليه. دعم حقيقي، متابعة حقيقية، وعقد إيجار حقيقي. مش كلام فارغ — هذا هو الفرق اللي حسيت بيه.',
    audioSrc: '/voice3.mp3.mp3',
    audioDuration: '0:52',
    waveformSeed: 19,
  },
];

/* ─────────────────────────────────────────────
   COMPARISON TABLE ROW — prompts 60-71
───────────────────────────────────────────── */
function TableRow({ row, isLast }: { row: CompRow; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [leftVis, setLeftVis] = useState(false);
  const [rightVis, setRightVis] = useState(false);
  const [hovered, setHovered] = useState(false);

  useGlobalAnimation(ref, () => setTriggered(true));

  useEffect(() => {
    if (!triggered) return;
    setLeftVis(true);
    const t = setTimeout(() => setRightVis(true), 200);
    return () => clearTimeout(t);
  }, [triggered]);

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', minHeight: '56px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)', background: '#0D1628', position: 'relative' }}>

      {/* RIGHT — Go LLC */}
      <div style={{ flex: '0 0 38%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '16px 16px 16px 8px', background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)', gap: '8px', opacity: hovered ? 1 : rightVis ? 1 : 0, transform: rightVis ? 'translateX(0)' : 'translateX(20px)', transition: rightVis ? 'opacity 300ms cubic-bezier(0.22,1,0.36,1), transform 300ms cubic-bezier(0.22,1,0.36,1), background 200ms ease' : 'background 200ms ease' }}>
        <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', background: '#D4A843' }}>
          <svg viewBox="0 0 12 12" width={10} height={10} fill="none">
            <polyline points="2,6.5 4.5,9 10,3.5" stroke="#0A1628" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 500, fontSize: '14px', color: hovered ? '#FFFFFF' : 'rgba(255,255,255,0.92)', textAlign: 'right', lineHeight: 1.45, transition: 'color 200ms ease' }}>
          {row.go}
        </span>
      </div>

      {/* CENTER — Feature label */}
      <div style={{ flex: '0 0 24%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 4px' }}>
        <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 500, fontSize: '11px', color: 'rgba(212,168,67,0.55)', textAlign: 'center', lineHeight: 1.4, letterSpacing: '0.04em' }}>
          {row.feature}
        </span>
      </div>

      {/* LEFT — الآخرون */}
      <div style={{ flex: '0 0 38%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '16px 8px 16px 16px', background: hovered ? 'rgba(0,0,0,0.22)' : 'rgba(0,0,0,0.14)', gap: '8px', opacity: hovered ? 0.40 : leftVis ? 0.85 : 0, transform: leftVis ? 'translateX(0)' : 'translateX(-20px)', transition: leftVis ? 'opacity 300ms cubic-bezier(0.22,1,0.36,1), transform 300ms cubic-bezier(0.22,1,0.36,1), background 200ms ease' : 'background 200ms ease' }}>
        <span style={{ flexShrink: 0, fontFamily: 'monospace', fontSize: '14px', color: 'rgba(232,93,74,0.60)', lineHeight: 1, fontWeight: 400 }}>—</span>
        <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.50)', textAlign: 'right', lineHeight: 1.45 }}>
          {row.comp}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AUDIO CARD — prompts 73-85
───────────────────────────────────────────── */
type PlayerState = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';

function AudioCard({
  data, isActive, onActivate, onDeactivate,
  pulseBtn, onFirstPlay, sectionVisible,
}: {
  data: TestimonialDatum;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  pulseBtn: boolean;
  onFirstPlay: () => void;
  sectionVisible: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rAFRef = useRef<number>(0);
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const playerStateRef = useRef<PlayerState>('idle');

  const [playerState, _setPlayerState] = useState<PlayerState>('idle');
  const setPlayerState = (s: PlayerState) => { playerStateRef.current = s; _setPlayerState(s); };

  const [progress, setProgress] = useState(0);      // 0–1
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00');
  const [pulseDelta, setPulseDelta] = useState(0);  // ±2px for playhead bar


  // Waveform bar heights — animated in on visibility
  const targetHeights = generateWaveform(data.waveformSeed, 45);
  const [barsAnimated, setBarsAnimated] = useState(false);

  const NUM_BARS = 45;

  // ── Pause if another card becomes active
  useEffect(() => {
    if (!isActive && playerStateRef.current === 'playing') {
      audioRef.current?.pause();
      setPlayerState('paused');
    }
  }, [isActive]);

  // ── Card becomes visible → animate waveform bars via CSS class
  useEffect(() => {
    if (!sectionVisible || barsAnimated) return;
    setBarsAnimated(true);
  }, [sectionVisible, barsAnimated]);

  // ── Audio event wiring
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => {
      if (playerStateRef.current !== 'loading') return;
      clearTimeout(loadTimerRef.current);
      audio.play()
        .then(() => setPlayerState('playing'))
        .catch(() => setPlayerState('error'));
    };

    const startRaf = () => {
      const loop = () => {
        if (!audio.duration) { rAFRef.current = requestAnimationFrame(loop); return; }
        const p = audio.currentTime / audio.duration;
        setProgress(p);
        setCurrentTimeStr(formatTime(audio.currentTime));
        setPulseDelta(Math.sin(performance.now() * (2 * Math.PI * 4) / 1000) * 2);
        rAFRef.current = requestAnimationFrame(loop);
      };
      rAFRef.current = requestAnimationFrame(loop);
    };

    const onPlay  = () => startRaf();
    const onPause = () => cancelAnimationFrame(rAFRef.current);
    const onEnded = () => {
      cancelAnimationFrame(rAFRef.current);
      setPlayerState('ended');
      setProgress(0);
      setCurrentTimeStr('0:00');
      trackCustom('TestimonialListened', { testimonial_name: data.name });
      onDeactivate();
    };
    const onError = () => {
      clearTimeout(loadTimerRef.current);
      setPlayerState('error');
    };

    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      cancelAnimationFrame(rAFRef.current);
    };
  }, [onDeactivate]);

  const handlePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    onFirstPlay();

    const cur = playerStateRef.current;

    if (cur === 'idle' || cur === 'ended') {
      trackCustom('TestimonialPlay', { testimonial_name: data.name });
      onActivate();
      setPlayerState('loading');
      setProgress(0);
      audio.src = data.audioSrc;
      audio.load();
      // 3-second timeout fallback (80)
      loadTimerRef.current = setTimeout(() => {
        if (playerStateRef.current === 'loading') setPlayerState('error');
      }, 3000);
    } else if (cur === 'playing') {
      audio.pause();
      setPlayerState('paused');
    } else if (cur === 'paused') {
      onActivate();
      audio.play()
        .then(() => setPlayerState('playing'))
        .catch(() => setPlayerState('error'));
    } else if (cur === 'error') {
      // Retry (80)
      setPlayerState('loading');
      audio.src = data.audioSrc;
      audio.load();
      loadTimerRef.current = setTimeout(() => {
        if (playerStateRef.current === 'loading') setPlayerState('error');
      }, 3000);
    }
  }, [data.audioSrc, onActivate, onFirstPlay]);

  // Seek on waveform tap (79)
  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration || playerState === 'idle' || playerState === 'loading') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio);
  };

  const playheadIdx = Math.round(progress * (NUM_BARS - 1));
  const cardElevated = isActive && playerState === 'playing';
  const isEnded = playerState === 'ended';

  return (
    <div style={{
      background: '#0F1E36',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      padding: '24px',
      direction: 'rtl',
      flexShrink: 0,
      transform: cardElevated ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: cardElevated
        ? '0 12px 40px rgba(0,0,0,0.42), 0 0 0 1px rgba(212,168,67,0.18)'
        : '0 2px 12px rgba(0,0,0,0.22)',
      transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), box-shadow 300ms ease',
    }}>
      <audio ref={audioRef} preload="none" />

      {/* ── IDENTITY STRIP (74) ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
        {/* Initial circle — gold bg, navy letter */}
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#D4A843', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-tajawal,Tajawal)', fontWeight: 700, fontSize: '22px', color: '#0A1628', lineHeight: 1, userSelect: 'none' }}>
            {data.initial}
          </span>
        </div>
        {/* Name + city + verified pill */}
        <div>
          <div style={{ fontFamily: 'var(--font-tajawal,Tajawal)', fontWeight: 700, fontSize: '16px', color: '#FFFFFF', marginBottom: '2px' }}>{data.name}</div>
          <div style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.50)', marginBottom: '7px' }}>{data.city}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', border: '1px solid rgba(212,168,67,0.35)', borderRadius: '3px' }}>
            <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 600, fontSize: '10px', color: '#D4A843', letterSpacing: '0.04em' }}>موثّق</span>
            <svg viewBox="0 0 10 10" width={9} height={9} fill="none">
              <polyline points="1.5,5.5 3.5,7.5 8.5,2.5" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── VOICE PLAYER (75, 76, 79, 80) ── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '64px' }}>

          {/* Play button — 48px gold circle */}
          <button
            onClick={handlePlay}
            className={pulseBtn ? 'sp-btn-pulse' : undefined}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: '#D4A843', border: 'none', cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(212,168,67,0.28)',
              transition: 'transform 150ms ease',
            }}
            aria-label={playerState === 'playing' ? 'إيقاف' : 'تشغيل'}
          >
            {playerState === 'loading' ? (
              /* Spinner arc */
              <svg viewBox="0 0 20 20" width={18} height={18} className="sp-spin" aria-hidden>
                <circle cx="10" cy="10" r="7" fill="none" stroke="#0A1628" strokeWidth="2.2" strokeDasharray="34" strokeDashoffset="10" strokeLinecap="round" />
              </svg>
            ) : playerState === 'playing' ? (
              /* Pause bars */
              <svg viewBox="0 0 16 16" width={14} height={14} fill="none" aria-hidden>
                <rect x="2" y="2" width="4" height="12" rx="1" fill="#0A1628" />
                <rect x="10" y="2" width="4" height="12" rx="1" fill="#0A1628" />
              </svg>
            ) : (
              /* Play triangle */
              <svg viewBox="0 0 16 16" width={14} height={14} fill="none" aria-hidden>
                <polygon points="4,2 14,8 4,14" fill="#0A1628" />
              </svg>
            )}
          </button>

          {/* Waveform + duration */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', minWidth: 0 }}>

            {/* Bars (75, 79) */}
            <div
              onClick={handleWaveformClick}
              style={{
                display: 'flex', alignItems: 'center', gap: '2px', height: '44px',
                cursor: (playerState !== 'idle' && playerState !== 'loading') ? 'pointer' : 'default',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {targetHeights.map((targetH, i) => {
                const isPlayed = i <= playheadIdx && progress > 0;
                const isAtPlayhead = i === playheadIdx && progress > 0 && playerState === 'playing';
                const pulse = isAtPlayhead ? pulseDelta : 0;

                const baseH = Math.max(4, targetH);
                // Pulse uses height, initial entry uses scaleY
                const finalH = baseH + pulse;

                return (
                  <div
                    key={i}
                    className={playerState === 'loading' ? 'sp-bar-breathe' : undefined}
                    style={{
                      width: '3px',
                      height: `${finalH}px`,
                      background: isPlayed ? '#D4A843' : 'rgba(255,255,255,0.20)',
                      borderRadius: '1.5px',
                      flexShrink: 0,
                      transformOrigin: 'bottom',
                      transform: barsAnimated ? 'scaleY(1)' : 'scaleY(0.2)',
                      transition: `transform 220ms cubic-bezier(0.22,1,0.36,1) ${i * 15}ms, background 60ms ease`,
                      animationDelay: playerState === 'loading' ? `${i * 50}ms` : undefined,
                    }}
                  />
                );
              })}

              {/* Playhead line (79) */}
              {progress > 0 && (
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${progress * 100}%`, width: '1px', background: '#D4A843', pointerEvents: 'none' }} />
              )}
            </div>

            {/* Duration / status */}
            <div style={{ fontFamily: '"Courier New", monospace', fontSize: '11px', color: 'rgba(255,255,255,0.40)', textAlign: 'left', direction: 'ltr', lineHeight: 1 }}>
              {playerState === 'error'
                ? <span style={{ fontFamily: 'var(--font-cairo,Cairo)', color: 'rgba(232,93,74,0.75)', direction: 'rtl', display: 'block', textAlign: 'right' }}>اضغط مرة أخرى</span>
                : isEnded
                  ? <span style={{ fontFamily: 'var(--font-cairo,Cairo)', color: 'rgba(212,168,67,0.65)', direction: 'rtl', display: 'block', textAlign: 'right', fontSize: '11px' }}>إعادة ▶</span>
                  : `${currentTimeStr} / ${data.audioDuration}`
              }
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIAL CAROUSEL (78, 83)
   Mobile: CSS scroll-snap, 85% cards, dot indicators
   Desktop: 3-column grid (all visible)
───────────────────────────────────────────── */
function TestiCarousel({
  activeId, setActiveId, anyPlayed, setAnyPlayed, sectionVisible,
}: {
  activeId: number | null;
  setActiveId: (id: number | null) => void;
  anyPlayed: boolean;
  setAnyPlayed: () => void;
  sectionVisible: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Detect scroll position to update dot
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;
      const approx = Math.round((scrollLeft / maxScroll) * (TESTIMONIALS.length - 1));
      setActiveDot(approx);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      {/* MOBILE TRACK */}
      <div className="testi-scroll-wrap">
        <div
          ref={trackRef}
          className="testi-scroll-track"
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testi-scroll-item">
              <AudioCard
                data={t}
                isActive={activeId === i}
                onActivate={() => setActiveId(i)}
                onDeactivate={() => setActiveId(null)}
                pulseBtn={!anyPlayed && i === 0}
                onFirstPlay={setAnyPlayed}
                sectionVisible={sectionVisible}
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          {TESTIMONIALS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeDot ? '20px' : '7px',
                height: '7px',
                borderRadius: '4px',
                background: i === activeDot ? '#D4A843' : 'rgba(255,255,255,0.20)',
                transition: 'width 200ms cubic-bezier(0.22,1,0.36,1), background 200ms ease',
                transform: i === activeDot ? 'scale(1.1)' : 'scale(0.85)',
              }}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP GRID */}
      <div className="testi-grid-wrap">
        {TESTIMONIALS.map((t, i) => (
          <AudioCard
            key={i}
            data={t}
            isActive={activeId === i}
            onActivate={() => setActiveId(i)}
            onDeactivate={() => setActiveId(null)}
            pulseBtn={!anyPlayed && i === 0}
            onFirstPlay={setAnyPlayed}
            sectionVisible={sectionVisible}
          />
        ))}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════
   MAIN COMPONENT
═════════════════════════════════════════════ */
export default function SocialProofSection() {

  /* ── COUNTER STATE ── */
  const counterRef = useRef<HTMLDivElement>(null);
  const [counterTriggered, setCounterTriggered] = useState(false);
  const [trackVisible, setTrackVisible] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [counterVal, setCounterVal] = useState(0);
  const [denomVis, setDenomVis] = useState(false);
  const [denomFull, setDenomFull] = useState(false);
  const [body1Vis, setBody1Vis] = useState(false);
  const [body2Vis, setBody2Vis] = useState(false);
  const [scarcityVis, setScarcityVis] = useState(false);
  const [dotPulse, setDotPulse] = useState(false);
  const [glowVis, setGlowVis] = useState(false);

  /* ── COMPARISON STATE ── */
  const compSectionRef = useRef<HTMLDivElement>(null);
  const [compTriggered, setCompTriggered] = useState(false);
  const [labelVis, setLabelVis] = useState(false);
  const [headlineVis, setHeadlineVis] = useState(false);
  const [cardVis, setCardVis] = useState(false);
  const [dividerH, setDividerH] = useState(0);
  const [badgeVis, setBadgeVis] = useState(false);

  /* ── TESTIMONIALS STATE ── */
  const testiSectionRef = useRef<HTMLDivElement>(null);
  const [testiVisible, setTestiVisible] = useState(false);
  const [testiHeadline, setTestiHeadline] = useState(false);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [anyPlayed, setAnyPlayed] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── COUNTER INTERSECTION ── */
  useGlobalAnimation(counterRef, () => setCounterTriggered(true));

  /* ── COUNTER ANIMATION ── */
  useEffect(() => {
    if (!counterTriggered) return;
    if (prefersReducedMotion) {
      setTrackVisible(true); setBarWidth(92); setCounterVal(92);
      setDenomVis(true); setDenomFull(true); setGlowVis(true);
      setBody1Vis(true); setBody2Vis(true); setScarcityVis(true); setDotPulse(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let rAF: number;
    setTrackVisible(true); setDenomVis(true); setGlowVis(true);
    timers.push(setTimeout(() => {
      const DURATION = 1200;
      const start = performance.now();
      const animate = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        const ease = easeOutCubic(t);
        setBarWidth(Math.round(ease * 92));
        setCounterVal(Math.round(ease * 92));
        if (t < 1) rAF = requestAnimationFrame(animate);
        else setDenomFull(true);
      };
      rAF = requestAnimationFrame(animate);
    }, 200));
    timers.push(setTimeout(() => setBody1Vis(true), 1600));
    timers.push(setTimeout(() => setBody2Vis(true), 1750));
    timers.push(setTimeout(() => setScarcityVis(true), 2350));
    timers.push(setTimeout(() => setDotPulse(true), 2400));
    return () => { timers.forEach(clearTimeout); cancelAnimationFrame(rAF); };
  }, [counterTriggered, prefersReducedMotion]);

  /* ── COMPARISON INTERSECTION ── */
  useGlobalAnimation(compSectionRef, () => setCompTriggered(true));

  /* ── COMPARISON ANIMATION ── */
  useEffect(() => {
    if (!compTriggered) return;
    if (prefersReducedMotion) {
      setLabelVis(true); setHeadlineVis(true); setCardVis(true); setDividerH(100); setBadgeVis(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let rAF: number;
    timers.push(setTimeout(() => setLabelVis(true), 100));
    timers.push(setTimeout(() => setHeadlineVis(true), 400));
    timers.push(setTimeout(() => setCardVis(true), 700));
    timers.push(setTimeout(() => {
      const DURATION = 800;
      const start = performance.now();
      const animDiv = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        setDividerH(easeOutCubic(t) * 100);
        if (t < 1) rAF = requestAnimationFrame(animDiv);
      };
      rAF = requestAnimationFrame(animDiv);
    }, 750));
    timers.push(setTimeout(() => setBadgeVis(true), 3200));
    return () => { timers.forEach(clearTimeout); cancelAnimationFrame(rAF); };
  }, [compTriggered, prefersReducedMotion]);

  /* ── TESTIMONIALS INTERSECTION ── */
  useGlobalAnimation(testiSectionRef, () => {
    setTestiVisible(true);
    setTimeout(() => setTestiHeadline(true), 150);
  });

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  return (
    <section dir="rtl" style={{ background: '#060E1C', fontFamily: 'var(--font-cairo,Cairo)' }}>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Pulsing scarcity dot */
        @keyframes sp-dot-pulse {
          0%, 100% { opacity: 0.40; transform: scale(1); }
          50%       { opacity: 1.00; transform: scale(1.2); }
        }
        .sp-dot-pulse { animation: sp-dot-pulse 2s ease-in-out infinite; }

        /* Badge pop-in with overshoot */
        @keyframes sp-badge-pop {
          0%   { opacity: 0; transform: scale(0.88); }
          70%  { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1.00); }
        }
        .sp-badge-pop { animation: sp-badge-pop 320ms cubic-bezier(0.34,1.4,0.64,1) forwards; }

        /* Play button pulse — 3 cycles then stop (83) */
        @keyframes sp-btn-pulse {
          0%, 100% { transform: scale(1.00); box-shadow: 0 2px 8px rgba(212,168,67,0.28); }
          50%       { transform: scale(1.08); box-shadow: 0 4px 16px rgba(212,168,67,0.40); }
        }
        .sp-btn-pulse { animation: sp-btn-pulse 2s ease-in-out 3; }

        /* Spinner */
        @keyframes sp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .sp-spin { animation: sp-spin 0.75s linear infinite; transform-origin: center; }

        /* Loading bar breathe — traveling wave (80) */
        @keyframes sp-bar-breathe {
          0%, 100% { opacity: 0.28; }
          50%       { opacity: 0.90; }
        }
        .sp-bar-breathe {
          animation: sp-bar-breathe 2.25s ease-in-out infinite;
        }

        /* Mobile: horizontal scroll-snap carousel (78) */
        .testi-scroll-wrap  { display: block; }
        .testi-grid-wrap    { display: none;  }

        .testi-scroll-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          gap: 16px;
          padding: 0 7.5%;
        }
        .testi-scroll-track::-webkit-scrollbar { display: none; }

        .testi-scroll-item {
          scroll-snap-align: center;
          flex: 0 0 85%;
          max-width: 400px;
        }

        /* Desktop: 3-column grid */
        @media (min-width: 768px) {
          .testi-scroll-wrap { display: none; }
          .testi-grid-wrap   {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sp-dot-pulse, .sp-btn-pulse, .sp-bar-breathe { animation: none !important; }
          .sp-spin { animation: sp-spin 0.75s linear infinite !important; }
        }

        @media (max-width: 374px) { .sp-big-num { font-size: 64px !important; } }
      `}} />

      {/* ══════════════════════════════════════
          SUB-MODULE A — COUNTER
      ══════════════════════════════════════ */}
      <div ref={counterRef} style={{ position: 'relative', padding: '80px 0', overflow: 'hidden', background: '#0A1628' }}>
        {/* Grid bg */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        {/* Hairlines */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: '1px', background: 'rgba(212,168,67,0.08)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: '1px', background: 'rgba(212,168,67,0.08)', pointerEvents: 'none', zIndex: 1 }} />
        {/* Vignette */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>

          {/* Number */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', lineHeight: 1 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '300px', height: '300px', background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.028) 0%, transparent 65%)', filter: 'blur(24px)', pointerEvents: 'none', opacity: glowVis ? 1 : 0, transition: 'opacity 800ms ease' }} />
            <div style={{ position: 'relative' }}>
              <span className="sp-big-num" style={{ fontFamily: 'var(--font-inter-tight,"Inter Tight")', fontWeight: 800, fontSize: 'clamp(80px,16vw,96px)', color: '#FFFFFF', letterSpacing: '-0.04em', fontFeatureSettings: '"tnum" 1', userSelect: 'none', display: 'block', minWidth: '2ch', textAlign: 'center' }}>
                {counterVal}
              </span>
              <div style={{ position: 'absolute', top: '4px', left: '-70px', display: 'flex', alignItems: 'baseline', gap: '3px', opacity: denomVis ? (denomFull ? 0.60 : 0.30) : 0, transition: 'opacity 300ms ease' }}>
                <span style={{ fontFamily: 'var(--font-inter-tight,"Inter Tight")', fontWeight: 400, fontSize: 'clamp(32px,6vw,40px)', color: '#D4A843', letterSpacing: '-0.02em', fontFeatureSettings: '"tnum" 1', userSelect: 'none', lineHeight: 1 }}>100</span>
                <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 400, fontSize: '13px', color: 'rgba(212,168,67,0.40)', alignSelf: 'flex-end', paddingBottom: '4px' }}>من</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ width: '70%', maxWidth: '420px', minWidth: '200px', marginTop: '32px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-20px', left: `${100 - 8}%`, transform: 'translateX(-50%)', fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 600, fontSize: '10px', color: '#D4A843', whiteSpace: 'nowrap', opacity: barWidth >= 90 ? 1 : 0, transition: 'opacity 400ms ease' }}>8 مقاعد متبقية</div>
            <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden', opacity: trackVisible ? 1 : 0, transition: 'opacity 300ms ease' }}>
              <div style={{ height: '100%', borderRadius: '3px', width: `${barWidth}%`, background: 'linear-gradient(to left, #B8862E 0%, #E4BC5A 100%)', boxShadow: '2px 0 10px rgba(228,188,90,0.55), 4px 0 20px rgba(212,168,67,0.30)' }} />
            </div>
          </div>

          {/* Body text */}
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 700, fontSize: '18px', color: '#FFFFFF', textAlign: 'center', opacity: body1Vis ? 1 : 0, transition: 'opacity 300ms ease' }}>92 حساب نشط</div>
            <div style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 400, fontSize: '15px', color: 'rgba(255,255,255,0.70)', textAlign: 'center', opacity: body2Vis ? 1 : 0, transition: 'opacity 300ms ease' }}>
              8 فقط احتاجوا تدخّل — <strong style={{ fontWeight: 700, color: '#D4A843' }}>وكلهم تم حلهم.</strong>
            </div>
          </div>

          {/* Scarcity pill */}
          <div style={{ marginTop: '28px', opacity: scarcityVis ? 1 : 0, transform: scarcityVis ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 300ms cubic-bezier(0.22,1,0.36,1), transform 300ms cubic-bezier(0.22,1,0.36,1)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '7px 22px', border: '1px solid rgba(212,168,67,0.20)', borderRadius: '20px' }}>
              <div className={dotPulse ? 'sp-dot-pulse' : undefined} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4A843', flexShrink: 0, opacity: dotPulse ? undefined : 0.40 }} />
              <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 500, fontSize: '13px', color: '#D4A843', lineHeight: 1.5 }}>
                آخر 8 مقاعد — بعدها نقفل التسجيل
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SUB-MODULE B — COMPARISON TABLE
      ══════════════════════════════════════ */}
      <div ref={compSectionRef} style={{ background: '#070E1D', padding: '120px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>

          {/* Ruled label (60) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '32px', opacity: labelVis ? 1 : 0, transition: 'opacity 300ms ease' }}>
            <div style={{ width: '56px', height: '1px', background: 'rgba(212,168,67,0.22)' }} />
            <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 600, fontSize: '12px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.14em' }}>المقارنة</span>
            <div style={{ width: '56px', height: '1px', background: 'rgba(212,168,67,0.22)' }} />
          </div>

          {/* Headline (61) */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-tajawal,Tajawal)', fontSize: 'clamp(30px,5vw,46px)', lineHeight: 1.15, margin: 0, letterSpacing: '-0.02em', opacity: headlineVis ? 1 : 0, transform: headlineVis ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)' }}>
              <span style={{ fontWeight: 400, color: '#FFFFFF' }}>نحن </span>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>لسنا </span>
              <span style={{ fontWeight: 700, color: '#D4A843', fontSize: '1.08em', position: 'relative', display: 'inline-block' }}>
                مثلهم
                <span style={{ position: 'absolute', left: 0, right: 0, top: '52%', height: '1.5px', background: 'rgba(232,93,74,0.55)', pointerEvents: 'none' }} />
              </span>
            </h2>
          </div>

          {/* Table card (69) */}
          <div style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', background: '#0D1628', boxShadow: '0 8px 32px rgba(0,0,0,0.30)', overflow: 'hidden', position: 'relative', opacity: cardVis ? 1 : 0, transform: cardVis ? 'scale(1.0)' : 'scale(0.97)', transition: 'opacity 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1)' }}>

            {/* Growing vertical divider */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: `${dividerH}%`, background: 'rgba(212,168,67,0.20)', pointerEvents: 'none', zIndex: 5 }} />

            {/* Column headers */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#0B1524' }}>
              <div style={{ flex: '0 0 38%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '14px 16px', gap: '6px', borderTop: '3px solid #D4A843' }}>
                <svg viewBox="0 0 16 18" width={14} height={16} fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 1 L15 3.5 V8 C15 13 8 17 8 17 C8 17 1 13 1 8 V3.5 Z" />
                </svg>
                <span style={{ fontFamily: 'var(--font-tajawal,Tajawal)', fontWeight: 700, fontSize: '14px', color: '#D4A843' }}>Go LLC</span>
              </div>
              <div style={{ flex: '0 0 24%', borderTop: '3px solid transparent' }} />
              <div style={{ flex: '0 0 38%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '14px 16px', borderTop: '3px solid transparent' }}>
                <span style={{ fontFamily: 'var(--font-tajawal,Tajawal)', fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>الآخرون</span>
              </div>
            </div>

            {/* Data rows */}
            {COMP_ROWS.map((row, i) => (
              <TableRow key={i} row={row} isLast={i === COMP_ROWS.length - 1} />
            ))}

            {/* "الخيار الأفضل" badge row */}
            <div style={{ display: 'flex', flexDirection: 'row', borderTop: '1px solid rgba(255,255,255,0.04)', background: '#0D1628' }}>
              <div style={{ flex: '0 0 38%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 16px', background: 'rgba(255,255,255,0.03)' }}>
                <div className={badgeVis ? 'sp-badge-pop' : undefined} style={{ display: 'inline-flex', padding: '3px 10px', border: '1px solid rgba(212,168,67,0.40)', borderRadius: '3px', fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 600, fontSize: '10px', color: '#D4A843', letterSpacing: '0.08em', opacity: badgeVis ? undefined : 0 }}>
                  الخيار الأفضل
                </div>
              </div>
              <div style={{ flex: '0 0 24%' }} />
              <div style={{ flex: '0 0 38%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SUB-MODULE C — TESTIMONIALS
          Prompts 72–85
      ══════════════════════════════════════ */}
      <div ref={testiSectionRef} style={{ background: '#0A1628', padding: '100px 0 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

          {/* Ruled label (72) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '24px', opacity: testiVisible ? 1 : 0, transition: 'opacity 300ms ease' }}>
            <div style={{ width: '48px', height: '1px', background: 'rgba(212,168,67,0.22)' }} />
            <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 600, fontSize: '12px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.14em' }}>من عملائنا</span>
            <div style={{ width: '48px', height: '1px', background: 'rgba(212,168,67,0.22)' }} />
          </div>

          {/* Headline "اسمعهم بصوتهم" (72) */}
          <div style={{ textAlign: 'center', marginBottom: '8px', opacity: testiHeadline ? 1 : 0, transform: testiHeadline ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1)' }}>
            <h2 style={{ fontFamily: 'var(--font-tajawal,Tajawal)', fontWeight: 700, fontSize: 'clamp(24px,4vw,32px)', color: '#FFFFFF', margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              اسمعهم{' '}
              <span style={{ color: '#D4A843' }}>بصوتهم</span>
            </h2>
          </div>

          {/* Subline (72) */}
          <div style={{ textAlign: 'center', marginBottom: '48px', opacity: testiHeadline ? 1 : 0, transition: 'opacity 400ms ease 200ms' }}>
            <span style={{ fontFamily: 'var(--font-cairo,Cairo)', fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.60)' }}>
              عملاء حقيقيين، تجارب حقيقية
            </span>
          </div>

        </div>

        {/* Carousel — full width for mobile scroll */}
        <TestiCarousel
          activeId={activeCardId}
          setActiveId={setActiveCardId}
          anyPlayed={anyPlayed}
          setAnyPlayed={() => setAnyPlayed(true)}
          sectionVisible={testiVisible}
        />
      </div>

    </section>
  );
}
