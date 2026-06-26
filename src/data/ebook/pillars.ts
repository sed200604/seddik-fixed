export interface Pillar {
  id: number;
  titleAr: string;
  titleEn: string;
  description: string;
  icon: string;
}

export const pillars: Pillar[] = [
  {
    id: 1,
    titleAr: 'الأساس القانوني',
    titleEn: 'Legal Foundation',
    description:
      'تأسيس LLC شرعي 100% عبر شراكة مع Verto، مع apostille حقيقي ومكاتب فعلية في Wyoming. كل وثيقة موثقة ومعترف بها دولياً. لا اختصارات، لا وثائق مزورة، لا وسطاء مشبوهين.',
    icon: '⚖️',
  },
  {
    id: 2,
    titleAr: 'عنوان تشغيلي حقيقي',
    titleEn: 'Real Operational Address',
    description:
      'عقود إيجار حقيقية وليست عناوين افتراضية. إثبات بالفيديو لكل عنوان، مع تحقق شهري من صلاحية العنوان. عندما تتحقق Wise أو Stripe أو Mercury، يجدون عنواناً حقيقياً مسجلاً باسم شركتك.',
    icon: '🏢',
  },
  {
    id: 3,
    titleAr: 'معالجة EIN احترافية',
    titleEn: 'Expert EIN Processing',
    description:
      'الحصول على رقم EIN خلال 24 ساعة عبر شريك CPA أمريكي معتمد. بدون انتظار أسابيع، بدون أخطاء في النماذج، بدون رفض من IRS. رقم ضريبي حقيقي يُقبل فوراً من كل البنوك والمنصات.',
    icon: '📋',
  },
  {
    id: 4,
    titleAr: 'هندسة الخصوصية',
    titleEn: 'Privacy Architecture',
    description:
      'جلسة Google Meet لمدة 90 دقيقة، العميل يضغط بنفسه على حاسوبه الخاص. لا نحتفظ بأي وثيقة، لا نخزن كلمات مرور، لا نملك صلاحية الدخول لحساباتك. أنت المالك الوحيد من اللحظة الأولى.',
    icon: '🔒',
  },
  {
    id: 5,
    titleAr: 'ذكاء بنكي + حل الأزمات',
    titleEn: 'Banking Intelligence + Crisis Resolution',
    description:
      'مراقبة يومية لحالة حساباتك مع تنبيهات فورية عند أي خطر. إذا واجهت مشكلة مع بنك أو منصة دفع، نتدخل مجاناً لحل الأزمة قبل أن تخسر أموالك. دعم مستمر وليس خدمة لمرة واحدة.',
    icon: '🛡️',
  },
];
