export interface Disaster {
  id: number;
  clientInitial: string;
  wilaya: string;
  platform: 'Stripe' | 'Wise' | 'Mercury' | 'PayPal';
  amountLost: number;
  month: string;
  year: number;
  description: string;
}

export const disasters: Disaster[] = [
  {
    id: 1,
    clientInitial: 'م.ب',
    wilaya: 'سطيف',
    platform: 'Stripe',
    amountLost: 14000,
    month: 'مارس',
    year: 2024,
    description:
      'تم حظر حساب Stripe نهائياً بسبب عنوان افتراضي غير متطابق مع سجلات الولاية. خسر كامل الرصيد المعلّق.',
  },
  {
    id: 2,
    clientInitial: 'ع.ك',
    wilaya: 'قسنطينة',
    platform: 'Wise',
    amountLost: 7500,
    month: 'أبريل',
    year: 2024,
    description:
      'تجميد حساب Wise بعد فشل التحقق من العنوان الأمريكي. الأموال محتجزة لأكثر من 6 أشهر بدون حل.',
  },
  {
    id: 3,
    clientInitial: 'ر.م',
    wilaya: 'وهران',
    platform: 'Mercury',
    amountLost: 23000,
    month: 'مارس',
    year: 2024,
    description:
      'إغلاق حساب Mercury بعد اكتشاف أن الوكيل المسجل لم يكن يحوّل مراسلات البنك. خسارة فادحة.',
  },
  {
    id: 4,
    clientInitial: 'ف.ز',
    wilaya: 'وهران',
    platform: 'PayPal',
    amountLost: 4200,
    month: 'فبراير',
    year: 2024,
    description:
      'تقييد حساب PayPal بسبب عدم تطابق معلومات الـ EIN مع عنوان الشركة المسجل.',
  },
  {
    id: 5,
    clientInitial: 'ن.ح',
    wilaya: 'الجزائر العاصمة',
    platform: 'Stripe',
    amountLost: 18500,
    month: 'يونيو',
    year: 2024,
    description:
      'حظر Stripe بعد 3 أشهر من التشغيل. السبب: العنوان المستخدم كان مشتركاً مع 47 شركة أخرى.',
  },
  {
    id: 6,
    clientInitial: 'أ.د',
    wilaya: 'البليدة',
    platform: 'Wise',
    amountLost: 5800,
    month: 'يناير',
    year: 2025,
    description:
      'تجميد الحساب فوراً بعد أول تحويل. الوكيل اختفى ولم يرد على أي رسالة.',
  },
  {
    id: 7,
    clientInitial: 'ي.ع',
    wilaya: 'عنابة',
    platform: 'Mercury',
    amountLost: 11200,
    month: 'مايو',
    year: 2024,
    description:
      'إغلاق الحساب بسبب عدم تقديم إثبات عنوان حقيقي خلال 30 يوماً من طلب التحقق.',
  },
  {
    id: 8,
    clientInitial: 'ل.ق',
    wilaya: 'باتنة',
    platform: 'Stripe',
    amountLost: 9300,
    month: 'أغسطس',
    year: 2024,
    description:
      'رفض Stripe طلب الاستئناف لأن الوكيل المسجل لم يكن يملك ترخيصاً سارياً.',
  },
  {
    id: 9,
    clientInitial: 'س.ت',
    wilaya: 'تلمسان',
    platform: 'PayPal',
    amountLost: 6700,
    month: 'نوفمبر',
    year: 2024,
    description:
      'تقييد دائم بعد اكتشاف أن رقم EIN مرتبط بشركة محلولة قانونياً منذ أشهر.',
  },
  {
    id: 10,
    clientInitial: 'ه.س',
    wilaya: 'بجاية',
    platform: 'Wise',
    amountLost: 15400,
    month: 'سبتمبر',
    year: 2024,
    description:
      'تجميد بعد تحقق Wise من أن العنوان إيجار شهر واحد منتهي. الوكيل لم يجدد العقد.',
  },
  {
    id: 11,
    clientInitial: 'ب.و',
    wilaya: 'الجلفة',
    platform: 'Mercury',
    amountLost: 3200,
    month: 'ديسمبر',
    year: 2024,
    description:
      'إغلاق فوري بعد أن أرسل البنك رسالة تحقق للعنوان ورجعت "غير قابل للتسليم".',
  },
  {
    id: 12,
    clientInitial: 'ج.ف',
    wilaya: 'تيزي وزو',
    platform: 'Stripe',
    amountLost: 19800,
    month: 'فبراير',
    year: 2025,
    description:
      'حظر نهائي بعد محاولة فتح حساب ثاني بنفس البيانات. الوكيل نصحه بذلك كـ "حل".',
  },
];
