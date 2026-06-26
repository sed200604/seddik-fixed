export type ScoreLevel = 'safe' | 'doubt' | 'warning' | 'disaster';

export interface QuizOption {
  textAr: string;
  score: ScoreLevel;
}

export interface QuizQuestion {
  id: number;
  questionAr: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionAr: 'كيفاش يوفرلك الوكيل العنوان الأمريكي؟',
    options: [
      {
        textAr: 'عنوان إيجار حقيقي سنوي باسم شركتي مع عقد إيجار',
        score: 'safe',
      },
      {
        textAr: 'عنوان إيجار لكن ما شفت عقد الإيجار',
        score: 'doubt',
      },
      {
        textAr: 'عنوان افتراضي (Virtual Address) باشتراك شهري',
        score: 'warning',
      },
      {
        textAr: 'ما نعرفش نوع العنوان، قالي ما تقلقش',
        score: 'disaster',
      },
    ],
  },
  {
    id: 2,
    questionAr: 'واش الوكيل يكون معاك في جلسة مباشرة وقت التأسيس؟',
    options: [
      {
        textAr: 'نعم، جلسة Google Meet وأنا نضغط على كلشي بنفسي على حاسوبي',
        score: 'safe',
      },
      {
        textAr: 'يرسلي فيديو تعليمي ونخدم وحدي',
        score: 'doubt',
      },
      {
        textAr: 'يخدم كلشي هو ويرسلي النتائج',
        score: 'warning',
      },
      {
        textAr: 'يطلب مني كلمات المرور باش يخدم على حساباتي',
        score: 'disaster',
      },
    ],
  },
  {
    id: 3,
    questionAr: 'شكون اللي يحتفظ بوثائق شركتك بعد التأسيس؟',
    options: [
      {
        textAr: 'أنا وحدي، الوكيل ما يخزن حتى وثيقة',
        score: 'safe',
      },
      {
        textAr: 'عندي نسخة وعند الوكيل نسخة',
        score: 'doubt',
      },
      {
        textAr: 'الوكيل يحتفظ بكلشي ويرسلي وقت ما نحتاج',
        score: 'warning',
      },
      {
        textAr: 'ما نعرفش وين الوثائق، ما طلبتهمش',
        score: 'disaster',
      },
    ],
  },
  {
    id: 4,
    questionAr: 'كيفاش يتعامل الوكيل مع التحقق من Wise؟',
    options: [
      {
        textAr: 'عنوان إيجار حقيقي سنوي يتحمل أي تحقق + متابعة يومية',
        score: 'safe',
      },
      {
        textAr: 'يقولي العنوان مضمون لكن بدون تفاصيل',
        score: 'doubt',
      },
      {
        textAr: 'يستعمل عنوان لشهر واحد ويقولي كافي',
        score: 'warning',
      },
      {
        textAr: 'ما عندوش خبرة مع Wise، يقولي دبر راسك',
        score: 'disaster',
      },
    ],
  },
  {
    id: 5,
    questionAr: 'واش يصرا إذا حسابك البنكي تعلّق أو انحظر؟',
    options: [
      {
        textAr: 'الوكيل يتدخل مجاناً ويساعدني في الاستئناف والحل',
        score: 'safe',
      },
      {
        textAr: 'يعطيني نصائح لكن ما يتدخلش مباشرة',
        score: 'doubt',
      },
      {
        textAr: 'يقولي ادفع مبلغ إضافي باش نحل المشكل',
        score: 'warning',
      },
      {
        textAr: 'يقولي مشكلتك مش مسؤوليتي، خدمتي خلصت',
        score: 'disaster',
      },
    ],
  },
  {
    id: 6,
    questionAr: 'واش عند الوكيل مكتب فعلي ولا يخدم من دارو؟',
    options: [
      {
        textAr: 'عندو مكاتب حقيقية مع عنوان معروف وإثبات بالفيديو',
        score: 'safe',
      },
      {
        textAr: 'يقول عندو مكتب لكن ما عندي إثبات',
        score: 'doubt',
      },
      {
        textAr: 'يخدم من دارو لكن يقولي عادي',
        score: 'warning',
      },
      {
        textAr: 'ما نعرفش وين يخدم وما يبغيش يقولي',
        score: 'disaster',
      },
    ],
  },
  {
    id: 7,
    questionAr: 'واش عند الوكيل سياسة استرجاع واضحة؟',
    options: [
      {
        textAr: 'نعم، سياسة مكتوبة وواضحة مع شروط محددة',
        score: 'safe',
      },
      {
        textAr: 'يقولي نتفاهموا إذا كاين مشكل',
        score: 'doubt',
      },
      {
        textAr: 'يقولي ما كانش استرجاع لأن الخدمة رقمية',
        score: 'warning',
      },
      {
        textAr: 'ما ذكرش موضوع الاسترجاع نهائياً',
        score: 'disaster',
      },
    ],
  },
];
