// WhatsApp support group (community / questions)
export const WHATSAPP_LINK = 'https://chat.whatsapp.com/FU2ut6JNh9GGEfo5BBRt4F';
export const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/FU2ut6JNh9GGEfo5BBRt4F';

// TODO(placeholder): swap for the real registration / WhatsApp checkout link.
// Every "سجّل الآن" button that leaves the page opens this URL.
export const REGISTER_URL = 'https://wa.me/213000000000?text=%D9%86%D8%AD%D8%A8%20%D9%86%D8%B3%D8%AC%D9%84%20%D9%81%D9%8A%20%D8%AF%D9%88%D8%B1%D8%A9%20%D8%A8%D9%86%D8%A7%D8%A1%20%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%82%D8%B9';

// ── Editable course facts (used across sections + JSON-LD) ──────────────
// TODO(placeholder): confirm the real cohort start date & seat numbers.
export const COURSE_START_DATE = '2026-08-15'; // ISO — first cohort start
export const COURSE_START_LABEL = '15 أوت 2026'; // human-readable (Arabic)
export const SEATS_LEFT = 12; // TODO: real remaining seats
export const REGISTERED_COUNT = 47; // TODO: real "signed up so far" count
export const PROJECTS_BUILT = 30; // TODO: real "+XX موقع مبني" number

// Prices (DZD)
export const PRICE_STANDARD_OLD = 20000;
export const PRICE_STANDARD_NEW = 12000;
export const PRICE_VIP_OLD = 30000;
export const PRICE_VIP_NEW = 20000;

// TODO(placeholder): when the first-cohort price ends (ISO). Powers the live countdown.
export const OFFER_ENDS_AT = '2026-08-14T23:59:59+01:00';

// Showcase links — TODO(placeholder): swap "#" for real demo URLs.
export const SHOWCASE_LINKS = {
  agency: '#',
  restaurant: 'https://neon-creative-studio.vercel.app',
  store: 'https://luliyane-paris.vercel.app',
  portfolio: '#',
} as const;
