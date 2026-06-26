'use client';

import { useCallback, useEffect, useState } from 'react';
import { useEbook } from '../providers/EbookContext';

/**
 * Protection layer for gated ebook content.
 *
 * Implements (in order):
 * 1. Right-click block on gated content
 * 2. Keyboard shortcut interception (Ctrl+S, Ctrl+P, Ctrl+U, Ctrl+Shift+I)
 * 3. Tab visibility blur (visibilitychange)
 * 4. PrintScreen key detection + logging
 * 5. Screen Capture API detection (best-effort, Chromium only)
 *
 * None of these are bulletproof — see README for honest caveats.
 */
export default function ProtectionLayer() {
  const { isUnlocked, sessionId, userEmail } = useEbook();
  const [isTabHidden, setIsTabHidden] = useState(false);

  const logEvent = useCallback(
    (eventName: string) => {
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture(eventName, {
          sessionId,
          userEmail: userEmail ?? undefined,
          timestamp: new Date().toISOString(),
        });
      }
    },
    [sessionId, userEmail]
  );

  /* 1. Block context menu on gated content */
  useEffect(() => {
    if (!isUnlocked) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-gated]')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handler);
    return () => document.removeEventListener('contextmenu', handler);
  }, [isUnlocked]);

  /* 2. Block common keyboard shortcuts */
  useEffect(() => {
    if (!isUnlocked) return;

    const handler = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;

      /* Ctrl+S (save), Ctrl+P (print), Ctrl+U (view source) */
      if (ctrl && ['s', 'p', 'u'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        logEvent('ebook_screenshot_attempt');
      }

      /* Ctrl+Shift+I (dev tools) */
      if (ctrl && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        logEvent('ebook_screenshot_attempt');
      }

      /* F12 */
      if (e.key === 'F12') {
        e.preventDefault();
        logEvent('ebook_screenshot_attempt');
      }
    };

    document.addEventListener('keydown', handler, { capture: true });
    return () => document.removeEventListener('keydown', handler, { capture: true });
  }, [isUnlocked, logEvent]);

  /* 3. Tab visibility blur */
  useEffect(() => {
    if (!isUnlocked) return;

    const handler = () => {
      if (document.visibilityState === 'hidden') {
        setIsTabHidden(true);
        logEvent('ebook_screenshot_attempt');
      } else {
        /* Small delay before removing blur to catch fast tab-switches */
        setTimeout(() => setIsTabHidden(false), 300);
      }
    };

    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [isUnlocked, logEvent]);

  /* 4. PrintScreen detection */
  useEffect(() => {
    if (!isUnlocked) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        setIsTabHidden(true);
        logEvent('ebook_screenshot_attempt');
        setTimeout(() => setIsTabHidden(false), 2000);
      }
    };

    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }, [isUnlocked, logEvent]);

  /* 5. Screen Capture API detection (best-effort) */
  useEffect(() => {
    if (!isUnlocked) return;
    if (typeof navigator === 'undefined') return;
    if (!navigator.mediaDevices) return;

    /* Override getDisplayMedia to detect screen recording */
    const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia?.bind(
      navigator.mediaDevices
    );

    if (originalGetDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia = async function (
        constraints?: DisplayMediaStreamOptions
      ) {
        logEvent('ebook_screenshot_attempt');
        setIsTabHidden(true);
        return originalGetDisplayMedia(constraints);
      };
    }

    return () => {
      if (originalGetDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia = originalGetDisplayMedia;
      }
    };
  }, [isUnlocked, logEvent]);

  if (!isUnlocked) return null;

  return (
    <>
      {/* Tab-hidden blur overlay */}
      {isTabHidden && (
        <div className="ebook-protected-overlay">
          <span>محتوى محمي</span>
        </div>
      )}
    </>
  );
}
