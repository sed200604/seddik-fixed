export interface ChapterMeta {
  id: number;
  slug: string;
  titleAr: string;
  subtitleAr?: string;
  gated: boolean;
  emotion: string;
}

export const chapters: ChapterMeta[] = [
  {
    id: 0,
    slug: 'intro',
    titleAr: 'المقدمة',
    subtitleAr: 'لماذا هذا الكتاب موجود',
    gated: false,
    emotion: 'curiosity — hook them with the scale of the problem',
  },
  {
    id: 1,
    slug: 'the-dream',
    titleAr: 'الحلم الأمريكي الجزائري',
    subtitleAr: 'كيف بدأ كل شيء',
    gated: false,
    emotion: 'aspiration — paint the dream before showing the nightmare',
  },
  {
    id: 2,
    slug: 'the-disaster',
    titleAr: 'الكارثة',
    subtitleAr: '12 قصة حقيقية لجزائريين خسروا كل شيء',
    gated: false,
    emotion: 'fear — real stories create urgency',
  },
  {
    id: 3,
    slug: 'the-traps',
    titleAr: 'الفخاخ الأربعة',
    subtitleAr: 'كيف يسرقك الوكيل بابتسامة',
    gated: false,
    emotion: 'anger — expose the villains',
  },
  {
    id: 4,
    slug: 'quiz',
    titleAr: 'اختبر وكيلك',
    subtitleAr: '7 أسئلة تكشف الحقيقة',
    gated: false,
    emotion: 'empowerment — give them a weapon',
  },
  {
    id: 5,
    slug: 'anti-closure-system',
    titleAr: 'نظام مضاد للإغلاق',
    subtitleAr: 'الركائز الخمس التي تحمي حسابك',
    gated: false,
    emotion: 'relief — the solution exists',
  },
  {
    id: 6,
    slug: 'llc-formation',
    titleAr: 'تأسيس LLC خطوة بخطوة',
    subtitleAr: 'كل التفاصيل، بدون أسرار',
    gated: true,
    emotion: 'trust — prove transparency with detail',
  },
  {
    id: 7,
    slug: 'ein-secret',
    titleAr: 'سر الـ EIN في 24 ساعة',
    subtitleAr: 'الطريقة التي لن يخبرك بها أحد',
    gated: true,
    emotion: 'exclusivity — insider knowledge',
  },
  {
    id: 8,
    slug: 'wise-setup',
    titleAr: 'فتح Wise Business',
    subtitleAr: 'بعنوان حقيقي يتحمل أي تحقق',
    gated: true,
    emotion: 'confidence — practical steps they can follow',
  },
  {
    id: 9,
    slug: 'stripe-approval',
    titleAr: 'Stripe من أول مرة',
    subtitleAr: 'لماذا يُرفض الآخرون وكيف تُقبل أنت',
    gated: true,
    emotion: 'desire — the outcome they want most',
  },
  {
    id: 10,
    slug: 'testimonials',
    titleAr: 'قصص النجاح',
    subtitleAr: 'جزائريون نجحوا بالطريقة الصحيحة',
    gated: false,
    emotion: 'social proof — they see themselves in these stories',
  },
  {
    id: 11,
    slug: 'value-stack',
    titleAr: 'ماذا تحصل عليه',
    subtitleAr: 'قيمة $1,280 مقابل $80 فقط',
    gated: false,
    emotion: 'greed — the deal is too good to ignore',
  },
  {
    id: 12,
    slug: 'guarantee',
    titleAr: 'الضمان',
    subtitleAr: 'وعد Go LLC',
    gated: false,
    emotion: 'safety — remove the last objection',
  },
  {
    id: 13,
    slug: 'closing',
    titleAr: 'الخطوة التالية',
    subtitleAr: 'ابدأ الآن أو ابقَ حيث أنت',
    gated: false,
    emotion: 'urgency — now or never',
  },
];
