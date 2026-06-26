export const EBOOK_EVENTS = {
  SCROLL_DEPTH: 'ebook_scroll_depth',
  CHAPTER_VIEW: 'ebook_chapter_view',
  PAYWALL_VIEW: 'ebook_paywall_view',
  PAYWALL_UNLOCK: 'ebook_paywall_unlock',
  WHATSAPP_CLICK: 'ebook_whatsapp_click',
  STRIPE_CHECKOUT_START: 'ebook_stripe_checkout_start',
  STRIPE_CHECKOUT_COMPLETE: 'ebook_stripe_checkout_complete',
  QUIZ_COMPLETE: 'ebook_quiz_complete',
  SEAT_CLICK: 'ebook_seat_click',
  TRAP_CARD_FLIP: 'ebook_trap_card_flip',
  SCREENSHOT_ATTEMPT: 'ebook_screenshot_attempt',
} as const;

export type EbookEventName = (typeof EBOOK_EVENTS)[keyof typeof EBOOK_EVENTS];

export interface EbookEventProperties {
  [EBOOK_EVENTS.SCROLL_DEPTH]: {
    percentage: number;
    chapterId: number;
    chapterSlug: string;
  };
  [EBOOK_EVENTS.CHAPTER_VIEW]: {
    chapterId: number;
    chapterSlug: string;
    gated: boolean;
  };
  [EBOOK_EVENTS.PAYWALL_VIEW]: {
    chapterId: number;
    chapterSlug: string;
    referrer: string;
  };
  [EBOOK_EVENTS.PAYWALL_UNLOCK]: {
    method: 'stripe' | 'coupon' | 'free';
    chapterId: number;
  };
  [EBOOK_EVENTS.WHATSAPP_CLICK]: {
    source: 'cta' | 'sidebar' | 'closing' | 'paywall';
    chapterId: number;
  };
  [EBOOK_EVENTS.STRIPE_CHECKOUT_START]: {
    priceId: string;
    chapterId: number;
  };
  [EBOOK_EVENTS.STRIPE_CHECKOUT_COMPLETE]: {
    sessionId: string;
    amount: number;
  };
  [EBOOK_EVENTS.QUIZ_COMPLETE]: {
    score: number;
    safeCount: number;
    doubtCount: number;
    warningCount: number;
    disasterCount: number;
  };
  [EBOOK_EVENTS.SEAT_CLICK]: {
    source: 'value-stack' | 'closing' | 'sidebar';
  };
  [EBOOK_EVENTS.TRAP_CARD_FLIP]: {
    trapId: number;
    trapTitle: string;
  };
  [EBOOK_EVENTS.SCREENSHOT_ATTEMPT]: {
    chapterId: number;
    gated: boolean;
  };
}
