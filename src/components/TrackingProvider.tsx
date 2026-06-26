'use client';

import { useEffect } from 'react';
import { initTracking } from '@/lib/pixel';
import { useGlobalScrollTracking } from '@/hooks/useScrollTracking';

export default function TrackingProvider() {
  useGlobalScrollTracking();
  
  useEffect(() => {
    initTracking();
  }, []);

  return null;
}
