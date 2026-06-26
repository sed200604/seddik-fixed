'use client';

// Declare fbq globally
declare global {
  interface Window {
    fbq: any;
  }
}

const isBrowser = typeof window !== 'undefined';

// Deduplication stores
let trackedSections: Record<string, boolean> = {};
let completedSteps: Set<number> = new Set();
let sessionDurationInterval: NodeJS.Timeout | null = null;
let pageStartTime: number = Date.now();

// Capture and store UTMs on load
export const captureUTMs = () => {
  if (!isBrowser) return;
  const urlParams = new URLSearchParams(window.location.search);
  const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  
  utms.forEach(param => {
    const val = urlParams.get(param);
    if (val) {
      sessionStorage.setItem(param, val);
    }
  });
};

// Get all stored UTMs
export const getUTMs = () => {
  if (!isBrowser) return {};
  return {
    utm_source: sessionStorage.getItem('utm_source') || undefined,
    utm_medium: sessionStorage.getItem('utm_medium') || undefined,
    utm_campaign: sessionStorage.getItem('utm_campaign') || undefined,
    utm_content: sessionStorage.getItem('utm_content') || undefined,
    utm_term: sessionStorage.getItem('utm_term') || undefined,
  };
};

// Get base parameters for EVERY event
export const getBaseParams = () => {
  if (!isBrowser) return {};
  
  const device_type = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
  const session_duration = Math.floor((Date.now() - pageStartTime) / 1000);
  
  return {
    page_language: 'ar_dz',
    device_type,
    session_duration,
    ...getUTMs()
  };
};

// Fire standard event
export const trackEvent = (eventName: string, params = {}, options = {}) => {
  if (!isBrowser || typeof window.fbq === 'undefined') return;
  const fullParams = { ...getBaseParams(), ...params };
  window.fbq('track', eventName, fullParams, options);
};

// Fire custom event
export const trackCustom = (eventName: string, params = {}, options = {}) => {
  if (!isBrowser || typeof window.fbq === 'undefined') return;
  const fullParams = { ...getBaseParams(), ...params };
  window.fbq('trackCustom', eventName, fullParams, options);
};

// Section Tracking (ViewContent)
export const trackSectionView = (sectionName: string) => {
  if (!isBrowser) return;
  if (trackedSections[sectionName]) return;
  
  trackedSections[sectionName] = true;
  trackEvent('ViewContent', { content_name: sectionName, content_category: 'landing_page' });
};

// Scroll Depth Custom Event
const scrollDepthFired = new Set<number>();
export const trackScrollDepth = (percent: number) => {
  if (!isBrowser) return;
  if (scrollDepthFired.has(percent)) return;
  
  scrollDepthFired.add(percent);
  trackCustom('ScrollDepth', { percent });
};

// CTA Click / Initiate Checkout
export const trackCTA = (buttonLocation: string) => {
  if (!isBrowser) return;
  
  const isInitiated = sessionStorage.getItem('checkout_initiated');
  if (isInitiated) {
    trackCustom('CTAClickRepeat', { button_location: buttonLocation });
  } else {
    sessionStorage.setItem('checkout_initiated', 'true');
    trackEvent('InitiateCheckout', {
      content_name: 'free_consultation',
      content_category: 'booking',
      value: 100.00,
      currency: 'USD',
      content_ids: [buttonLocation]
    });
  }
};

// Booking Steps
export const trackBookingStep = (stepNumber: number, stepName: string, extraParams = {}) => {
  if (!isBrowser) return;
  if (completedSteps.has(stepNumber)) return;
  
  completedSteps.add(stepNumber);
  trackCustom('BookingStep', { step: stepNumber, step_name: stepName, ...extraParams });
};

// Page Performance Tracker
export const trackPagePerformance = () => {
  if (!isBrowser) return;
  
  setTimeout(() => {
    try {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntry = performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint');
      // @ts-ignore - effectiveType is experimental
      const connection = navigator.connection?.effectiveType || 'unknown';
      
      const load_time_ms = navEntry ? Math.round(navEntry.loadEventEnd - navEntry.startTime) : 0;
      const first_paint_ms = paintEntry ? Math.round(paintEntry.startTime) : 0;
      
      trackCustom('PagePerformance', { load_time_ms, first_paint_ms, connection_type: connection });
    } catch (e) {
      console.error('Performance tracking error', e);
    }
  }, 3000);
};

// Anti-Tracking Blocker Detection
export const detectAdBlocker = () => {
  if (!isBrowser) return;
  
  setTimeout(() => {
    if (typeof window.fbq === 'undefined') {
      console.warn('Meta pixel blocked.');
      // Ping our own server to log the blocker rate
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'pixel_blocked',
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {});
    }
  }, 1500);
};

export const initTracking = () => {
  captureUTMs();
  trackPagePerformance();
  detectAdBlocker();
};
