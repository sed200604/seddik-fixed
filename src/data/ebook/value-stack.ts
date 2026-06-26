export interface ValueItem {
  serviceAr: string;
  value: number;
}

export interface ValueStack {
  items: ValueItem[];
  totalValue: number;
  price: number;
  savings: number;
}

export const valueStack: ValueStack = {
  items: [
    {
      serviceAr: 'تأسيس LLC في Wyoming عبر جلسة Google Meet مباشرة (90 دقيقة)',
      value: 180,
    },
    {
      serviceAr: 'اختيار الوكيل المسجل الصحيح + تجنب 4 فخاخ قاتلة',
      value: 200,
    },
    {
      serviceAr: 'الحصول على EIN مجاناً عبر شريك أمريكي خلال 24 ساعة',
      value: 150,
    },
    {
      serviceAr: 'فتح حساب Wise Business بعنوان إيجار حقيقي',
      value: 300,
    },
    {
      serviceAr: 'فتح Stripe + تدريب على التحقق والقبول من أول مرة',
      value: 250,
    },
    {
      serviceAr: 'استشارة مخصصة لتجنب أسباب إغلاق الحسابات',
      value: 200,
    },
  ],
  totalValue: 1280,
  price: 80,
  savings: 1200,
};
