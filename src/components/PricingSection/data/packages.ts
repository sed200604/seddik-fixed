export type PackageFeature = {
  text: string;
  included: boolean;
  value?: string; // For text values like "متقدم" or "1 ساعة"
};

export type FeatureCategory = {
  title: string;
  features: string[]; // List of feature names in this category
};

export const featureCategories: FeatureCategory[] = [
  {
    title: 'التأسيس الأساسي',
    features: [
      'تأسيس LLC',
      'رقم ضريبي EIN',
      'Operating Agreement',
      'المستندات الرسمية',
    ]
  },
  {
    title: 'الحسابات البنكية',
    features: [
      'فتح Mercury',
      'فتح Relay',
      'مرافقة خطوة بخطوة',
    ]
  },
  {
    title: 'الحماية والتعليم',
    features: [
      'إعداد إجابات مسبقة',
      'كتاب Bank Language',
      'Answer Templates',
      'نظام الحماية الكامل',
      'Video Tutorials',
      'Stripe Prep Session',
      'استشارة استراتيجية'
    ]
  },
  {
    title: 'الدعم',
    features: [
      'فترة الدعم',
      'قنوات الدعم',
      'وقت الرد',
      'مراجعة إيميلات البنك',
      'WhatsApp مباشر'
    ]
  }
];

export type PackageData = {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice: number;
  savings: number;
  popular: boolean;
  badge: string | null;
  features: Record<string, PackageFeature>; // map of feature name to its value/inclusion
  cta: string;
};

export const packages: PackageData[] = [
  {
    id: 'basic',
    name: 'Basic',
    nameAr: 'أساسي',
    price: 99,
    originalPrice: 99,
    savings: 0,
    popular: false,
    badge: null,
    features: {
      'تأسيس LLC': { text: 'تأسيس LLC', included: true },
      'رقم ضريبي EIN': { text: 'رقم ضريبي EIN', included: true },
      'Operating Agreement': { text: 'Operating Agreement', included: true },
      'المستندات الرسمية': { text: 'المستندات الرسمية', included: true },
      'فتح Mercury': { text: 'فتح Mercury', included: false },
      'فتح Relay': { text: 'فتح Relay', included: false },
      'مرافقة خطوة بخطوة': { text: 'مرافقة خطوة بخطوة', included: false },
      'إعداد إجابات مسبقة': { text: 'إعداد إجابات مسبقة', included: false },
      'كتاب Bank Language': { text: 'كتاب Bank Language', included: false },
      'Answer Templates': { text: 'Answer Templates', included: false },
      'نظام الحماية الكامل': { text: 'نظام الحماية الكامل', included: false },
      'Video Tutorials': { text: 'Video Tutorials', included: false },
      'Stripe Prep Session': { text: 'Stripe Prep Session', included: false },
      'استشارة استراتيجية': { text: 'استشارة استراتيجية', included: false },
      'فترة الدعم': { text: 'فترة الدعم', included: true, value: '30 يوم' },
      'قنوات الدعم': { text: 'قنوات الدعم', included: true, value: 'Email\nWhatsApp' },
      'وقت الرد': { text: 'وقت الرد', included: true, value: '24 ساعة' },
      'مراجعة إيميلات البنك': { text: 'مراجعة إيميلات البنك', included: false },
      'WhatsApp مباشر': { text: 'WhatsApp مباشر', included: false },
    },
    cta: 'ابدأ',
  },
  {
    id: 'standard',
    name: 'Standard',
    nameAr: 'قياسي',
    price: 149,
    originalPrice: 250,
    savings: 101,
    popular: true,
    badge: '⭐ الأكثر شعبية',
    features: {
      'تأسيس LLC': { text: 'تأسيس LLC', included: true },
      'رقم ضريبي EIN': { text: 'رقم ضريبي EIN', included: true },
      'Operating Agreement': { text: 'Operating Agreement', included: true },
      'المستندات الرسمية': { text: 'المستندات الرسمية', included: true },
      'فتح Mercury': { text: 'فتح Mercury', included: true },
      'فتح Relay': { text: 'فتح Relay', included: true },
      'مرافقة خطوة بخطوة': { text: 'مرافقة خطوة بخطوة', included: true },
      'إعداد إجابات مسبقة': { text: 'إعداد إجابات مسبقة', included: true, value: 'أساسي' },
      'كتاب Bank Language': { text: 'كتاب Bank Language', included: true },
      'Answer Templates': { text: 'Answer Templates', included: true, value: 'أساسي' },
      'نظام الحماية الكامل': { text: 'نظام الحماية الكامل', included: false },
      'Video Tutorials': { text: 'Video Tutorials', included: false },
      'Stripe Prep Session': { text: 'Stripe Prep Session', included: false },
      'استشارة استراتيجية': { text: 'استشارة استراتيجية', included: false },
      'فترة الدعم': { text: 'فترة الدعم', included: true, value: '60 يوم' },
      'قنوات الدعم': { text: 'قنوات الدعم', included: true, value: 'Email\nWhatsApp' },
      'وقت الرد': { text: 'وقت الرد', included: true, value: '12 ساعة' },
      'مراجعة إيميلات البنك': { text: 'مراجعة إيميلات البنك', included: true },
      'WhatsApp مباشر': { text: 'WhatsApp مباشر', included: false },
    },
    cta: 'ابدأ الآن ⭐',
  },
  {
    id: 'premium',
    name: 'Premium',
    nameAr: 'مميز',
    price: 179,
    originalPrice: 500,
    savings: 321,
    popular: false,
    badge: '👑 VIP',
    features: {
      'تأسيس LLC': { text: 'تأسيس LLC', included: true },
      'رقم ضريبي EIN': { text: 'رقم ضريبي EIN', included: true },
      'Operating Agreement': { text: 'Operating Agreement', included: true },
      'المستندات الرسمية': { text: 'المستندات الرسمية', included: true },
      'فتح Mercury': { text: 'فتح Mercury', included: true },
      'فتح Relay': { text: 'فتح Relay', included: true },
      'مرافقة خطوة بخطوة': { text: 'مرافقة خطوة بخطوة', included: true },
      'إعداد إجابات مسبقة': { text: 'إعداد إجابات مسبقة', included: true, value: 'متقدم' },
      'كتاب Bank Language': { text: 'كتاب Bank Language', included: true },
      'Answer Templates': { text: 'Answer Templates', included: true, value: 'متقدم' },
      'نظام الحماية الكامل': { text: 'نظام الحماية الكامل', included: true },
      'Video Tutorials': { text: 'Video Tutorials', included: true },
      'Stripe Prep Session': { text: 'Stripe Prep Session', included: true },
      'استشارة استراتيجية': { text: 'استشارة استراتيجية', included: true, value: '1 ساعة' },
      'فترة الدعم': { text: 'فترة الدعم', included: true, value: '90 يوم' },
      'قنوات الدعم': { text: 'قنوات الدعم', included: true, value: 'Email\nWhatsApp' },
      'وقت الرد': { text: 'وقت الرد', included: true, value: '2-4 ساعات' },
      'مراجعة إيميلات البنك': { text: 'مراجعة إيميلات البنك', included: true },
      'WhatsApp مباشر': { text: 'WhatsApp مباشر', included: true },
    },
    cta: 'ابدأ 🚀',
  }
];
