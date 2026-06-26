import type { Metadata } from 'next';
import WorkshopClient from './WorkshopClient';

export const metadata: Metadata = {
  title: 'ورشة مجانية: احترف البنوك الرقمية | Go LLC',
  description:
    'سجل مجاناً في ورشة "احترف البنوك الرقمية" — تعلم كيف تفتح حسابات الأعمال، تدير التحويلات الدولية، وتتجنب الرفض والإغلاق نهائياً. 4 يونيو 2026 أونلاين.',
  keywords: [
    'ورشة مجانية',
    'بنوك رقمية',
    'Wise Business',
    'Mercury',
    'Stripe',
    'LLC',
    'Business Setup',
    'Go LLC',
    'حسابات أعمال',
  ],
  openGraph: {
    title: 'ورشة مجانية: احترف البنوك الرقمية | Go LLC',
    description:
      'ورشة مجانية لأصحاب المشاريع — تعلم إدارة حسابات الأعمال والتحويلات الدولية وتجنب الرفض',
    locale: 'ar_AR',
    type: 'website',
  },
};

export default function WorkshopPage() {
  return <WorkshopClient />;
}
