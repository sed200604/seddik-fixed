'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface EbookContextValue {
  isUnlocked: boolean;
  setUnlocked: (v: boolean) => void;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  sessionId: string;
  currentChapter: number;
  setCurrentChapter: (n: number) => void;
  scrollProgress: number;
  setScrollProgress: (n: number) => void;
  prefersReducedMotion: boolean;
}

const EbookCtx = createContext<EbookContextValue | null>(null);

function generateSessionId(): string {
  const arr = new Uint8Array(4);
  if (typeof crypto !== 'undefined') {
    crypto.getRandomValues(arr);
  } else {
    for (let i = 0; i < 4; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function EbookProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sessionIdRef = useRef<string>('');

  /* Generate session ID once on mount */
  useEffect(() => {
    sessionIdRef.current = generateSessionId();
  }, []);

  /* Check unlock state from localStorage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ebook_unlocked');
      if (stored === 'true') {
        setIsUnlocked(true);
      }
      const storedEmail = localStorage.getItem('ebook_user_email');
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    } catch {
      /* localStorage not available */
    }
  }, []);

  /* Check URL params for Stripe redirect */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('unlocked') === 'true') {
      setIsUnlocked(true);
      try {
        localStorage.setItem('ebook_unlocked', 'true');
      } catch {
        /* noop */
      }
      /* Clean URL */
      const url = new URL(window.location.href);
      url.searchParams.delete('unlocked');
      url.searchParams.delete('session_id');
      window.history.replaceState({}, '', url.pathname);
    }
  }, []);

  /* Persist unlock state */
  const handleSetUnlocked = useCallback((v: boolean) => {
    setIsUnlocked(v);
    try {
      localStorage.setItem('ebook_unlocked', String(v));
    } catch {
      /* noop */
    }
  }, []);

  /* Persist email */
  const handleSetEmail = useCallback((email: string | null) => {
    setUserEmail(email);
    try {
      if (email) {
        localStorage.setItem('ebook_user_email', email);
      } else {
        localStorage.removeItem('ebook_user_email');
      }
    } catch {
      /* noop */
    }
  }, []);

  /* Detect prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* Scroll progress tracker */
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(window.scrollY / docHeight, 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const value = useMemo<EbookContextValue>(
    () => ({
      isUnlocked,
      setUnlocked: handleSetUnlocked,
      userEmail,
      setUserEmail: handleSetEmail,
      sessionId: sessionIdRef.current || 'loading',
      currentChapter,
      setCurrentChapter,
      scrollProgress,
      setScrollProgress,
      prefersReducedMotion,
    }),
    [
      isUnlocked,
      handleSetUnlocked,
      userEmail,
      handleSetEmail,
      currentChapter,
      scrollProgress,
      prefersReducedMotion,
    ]
  );

  return <EbookCtx.Provider value={value}>{children}</EbookCtx.Provider>;
}

export function useEbook(): EbookContextValue {
  const ctx = useContext(EbookCtx);
  if (!ctx) {
    throw new Error('useEbook must be used within EbookProvider');
  }
  return ctx;
}
