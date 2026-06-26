export interface Testimonial {
  id: number;
  nameAr: string;
  initial: string;
  city: string;
  role: string;
  quoteAr: string;
  monthsActive: number;
  platform: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    nameAr: 'كريم ب.',
    initial: 'ك',
    city: 'الجزائر العاصمة',
    role: 'مستورد قطع غيار سيارات',
    quoteAr:
      'قبل Go LLC، خسرت حسابين في 6 أشهر. الآن عندي LLC شرعية، حساب Wise شغال من 11 شهر بدون أي مشكلة، وأستقبل تحويلات من 4 دول. الفرق بين وكيل يفهم والوكلاء اللي يبيعوك حلم هو فرق بين النجاح والإفلاس.',
    monthsActive: 11,
    platform: 'Wise',
  },
  {
    id: 2,
    nameAr: 'ياسين م.',
    initial: 'ي',
    city: 'قسنطينة',
    role: 'دروبشيبينغ',
    quoteAr:
      'Stripe وافقوا من أول طلب. ما صدقت. كل الناس اللي نعرفهم انرفضوا مرتين وثلاث مرات. السر كان في العنوان الحقيقي واللي Go LLC وفروهولي. ما كانش عنوان افتراضي، كان عنوان إيجار حقيقي باسم شركتي.',
    monthsActive: 8,
    platform: 'Stripe',
  },
  {
    id: 3,
    nameAr: 'سارة أ.',
    initial: 'س',
    city: 'وهران',
    role: 'بيع دورات تدريبية أونلاين',
    quoteAr:
      'EIN وصلني في 22 ساعة. ما كنت نتخيل أنو يكون بهاذ السرعة. الجلسة على Google Meet كانت واضحة، أنا ضغطت على كلشي بنفسي على حاسوبي. ما عطيت حتى كلمة مرور لحد. أول مرة نحس بالأمان مع وكيل.',
    monthsActive: 6,
    platform: 'Stripe',
  },
];
