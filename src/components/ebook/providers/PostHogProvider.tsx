'use client';

import { useEffect, type ReactNode } from 'react';
import posthog from 'posthog-js';

interface PostHogProviderProps {
  children: ReactNode;
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!key) return;

    posthog.init(key, {
      api_host: host || 'https://app.posthog.com',
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
      persistence: 'localStorage+cookie',
      loaded: (ph) => {
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          window.posthog = ph as any;
        }
      },
    });

    /* Manual pageview for the ebook */
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      page: 'ebook',
    });
  }, []);

  return <>{children}</>;
}
