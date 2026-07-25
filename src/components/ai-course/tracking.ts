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
  value?: number;
  currency?: string;
  status?: string;
};

export function trackPixel(event: PixelEvent, params?: PixelParams) {
  if (typeof window === 'undefined') return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq !== 'function') return;
  fbq('trackSingle', AI_PIXEL, event, params);
}

/**
 * Fired on every WhatsApp CTA click.
 * Uses both `Lead` (Meta's standard conversion) and `Contact` (channel opened)
 * so the ad platform can optimize on either. `source` lets you segment reports.
 */
export function trackCTAClick(source: string) {
  trackPixel('Lead', {
    content_name: 'ai_course_whatsapp_cta',
    content_category: source,
    value: 8000,
    currency: 'DZD',
  });
  trackPixel('Contact', { content_category: source });
}

/**
 * Fired when the registration form is submitted with valid data.
 * `CompleteRegistration` is stronger intent than `Lead` and is what Meta
 * recommends for form-fills with full contact info.
 */
export function trackRegistration() {
  trackPixel('Lead', {
    content_name: 'ai_course_registration_form',
    value: 8000,
    currency: 'DZD',
  });
  trackPixel('CompleteRegistration', {
    content_name: 'ai_course_registration_form',
    status: 'submitted',
  });
}
