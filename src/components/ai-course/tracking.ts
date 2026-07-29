// Meta (Facebook) Pixel for the AI Website-Building course.
// The base fbq loader lives in app/layout.tsx; PagePixel.tsx runs `init` + PageView.
// We use `trackSingle` everywhere so events are scoped to THIS pixel even if other
// pages on the domain init their own pixels.
const AI_PIXEL = '1602512821224637';

type PixelEvent =
  | 'Lead'
  | 'Contact'
  | 'CompleteRegistration'
  | 'ViewContent'
  | 'InitiateCheckout';

type PixelParams = {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
  status?: string;
};

type Plan = 'standard' | 'vip';

/** DZD value used for FB ads optimization / ROAS. */
export function planValue(plan: Plan): number {
  return plan === 'vip' ? 20000 : 12000;
}

/** Browser-safe unique id used to de-duplicate the browser Pixel event against the CAPI event. */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `ac-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Fire a standard event on the course pixel.
 * `eventID` (when provided) lets Meta merge this browser event with the matching
 * server-side CAPI event so the Lead is counted once, not twice.
 */
export function trackPixel(event: PixelEvent, params?: PixelParams, eventID?: string) {
  if (typeof window === 'undefined') return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq !== 'function') return;
  if (eventID) fbq('trackSingle', AI_PIXEL, event, params, { eventID });
  else fbq('trackSingle', AI_PIXEL, event, params);
}

/** CTA clicked (soft intent). Used by every "سجّل الآن" button on the page. */
export function trackCTAClick(source: string) {
  trackPixel('Contact', { content_category: source });
}

/** Fired once when the pricing/offers block scrolls into view. */
export function trackViewContent() {
  trackPixel('ViewContent', {
    content_name: 'ai_course_offers',
    content_category: 'pricing',
  });
}

/** Fired when a visitor picks a plan and heads to the form. */
export function trackInitiateCheckout(plan: Plan) {
  trackPixel('InitiateCheckout', {
    content_name: `ai_course_${plan}`,
    content_category: 'course_registration',
    content_ids: [plan],
    value: planValue(plan),
    currency: 'DZD',
  });
}

/**
 * Fired when the registration form is submitted with valid data.
 * `Lead` is the primary FB-ads optimization event; `CompleteRegistration`
 * marks the full form-fill. Both carry the same eventID for CAPI dedup.
 */
export function trackRegistration(plan: Plan, eventID?: string) {
  const value = planValue(plan);
  trackPixel(
    'Lead',
    {
      content_name: 'ai_course_registration_form',
      content_category: 'course_registration',
      content_ids: [plan],
      value,
      currency: 'DZD',
    },
    eventID,
  );
  trackPixel('CompleteRegistration', {
    content_name: 'ai_course_registration_form',
    status: 'submitted',
    value,
    currency: 'DZD',
  });
}
