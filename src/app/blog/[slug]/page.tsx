import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock, Eye, ArrowRight, ChevronLeft } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles, articles, type ContentSection } from '@/data/articles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ReadingProgress from '@/components/ReadingProgress';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Go LLC`,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.date,
    },
  };
}

function renderInline(text: string) {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function Section({ section }: { section: ContentSection }) {
  switch (section.type) {
    case 'h2':
      return (
        <h2
          id={section.id}
          className="font-tajawal font-bold text-2xl mt-12 mb-5 pb-3 border-b-2 scroll-mt-24"
          style={{ color: '#1A3A52', borderColor: '#F4C430' }}
        >
          {section.title}
        </h2>
      );
    case 'h3':
      return (
        <h3
          id={section.id}
          className="font-tajawal font-bold text-xl mt-8 mb-4 scroll-mt-24"
          style={{ color: '#1A3A52' }}
        >
          {section.title}
        </h3>
      );
    case 'p':
      return (
        <p className="text-gray-700 leading-relaxed mb-4 text-base">
          {renderInline(section.content ?? '')}
        </p>
      );
    case 'ul':
      return (
        <ul className="mb-5 space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#F4C430' }} />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="mb-5 space-y-3">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ background: '#1A3A52', color: 'white' }}
              >
                {i + 1}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
    case 'tip':
      return (
        <div
          className="rounded-xl p-5 mb-5 border-r-4"
          style={{ background: '#FFFBEB', borderColor: '#F4C430' }}
        >
          <p className="font-bold text-sm mb-1" style={{ color: '#1A3A52' }}>
            💡 {section.title}
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">{renderInline(section.content ?? '')}</p>
        </div>
      );
    case 'warning':
      return (
        <div className="rounded-xl p-5 mb-5 border-r-4 bg-red-50 border-red-500">
          <p className="font-bold text-sm mb-1 text-red-700">⚠️ {section.title}</p>
          <p className="text-red-800 text-sm leading-relaxed">{renderInline(section.content ?? '')}</p>
        </div>
      );
    case 'info':
      return (
        <div
          className="rounded-xl p-5 mb-5 border-r-4"
          style={{ background: '#EFF6FF', borderColor: '#3B82F6' }}
        >
          <p className="font-bold text-sm mb-1 text-blue-700">📌 {section.title}</p>
          <p className="text-blue-800 text-sm leading-relaxed">{renderInline(section.content ?? '')}</p>
        </div>
      );
    case 'table':
      return (
        <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm text-right">
            <thead>
              <tr style={{ background: '#1A3A52' }}>
                {section.headers?.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-white font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows?.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-gray-700 border-t border-gray-100">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatViews(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n.toString();
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  return (
    <>
      <ReadingProgress />
      <Header />
      <main className="bg-off-white min-h-screen pt-20" dir="rtl">
        {/* ── Article Header ──────────────────────────────────── */}
        <div
          className="py-14 px-5"
          style={{ background: 'linear-gradient(135deg, #1A3A52 0%, #2C5F7F 100%)' }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
              <ChevronLeft className="w-3.5 h-3.5" />
              <Link href="/blog" className="hover:text-white transition-colors">المدونة</Link>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-white/40 truncate max-w-xs">{article.title}</span>
            </nav>
            {/* Category badge */}
            <span
              className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-5"
              style={{ background: '#F4C430', color: '#1A3A52' }}
            >
              {article.categoryLabel}
            </span>
            <h1 className="font-tajawal font-bold text-3xl md:text-4xl text-white leading-snug mb-5">
              {article.title}
            </h1>
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime} دقيقة قراءة
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {formatViews(article.views)} مشاهدة
              </span>
              <span>{formatDate(article.date)}</span>
            </div>
          </div>
        </div>

        {/* ── Content + Sidebar ───────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="flex gap-10 items-start">
            {/* ── Main Content ──────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Hook */}
              <div
                className="bg-white rounded-2xl p-7 mb-8 shadow-md border-r-4 whitespace-pre-line text-gray-700 leading-relaxed"
                style={{ borderColor: '#F4C430' }}
              >
                {article.hook}
              </div>

              {/* Article sections */}
              <div className="bg-white rounded-2xl p-7 md:p-10 shadow-md">
                {article.sections.map((section, i) => (
                  <Section key={i} section={section} />
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Box */}
              <div
                className="mt-8 bg-white rounded-2xl p-6 shadow-md flex items-center gap-5"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                  style={{ background: '#1A3A52' }}
                >
                  G
                </div>
                <div>
                  <p className="font-bold text-navy" style={{ color: '#1A3A52' }}>
                    فريق Go LLC
                  </p>
                  <p className="text-sm text-gray-500">
                    خبراء في تأسيس الشركات الأمريكية والخدمات المالية الدولية منذ 2018
                  </p>
                </div>
              </div>

              {/* CTA Box */}
              <div
                className="mt-8 rounded-2xl p-8 text-white text-center"
                style={{ background: 'linear-gradient(135deg, #1A3A52 0%, #2C5F7F 100%)' }}
              >
                <h3 className="font-tajawal font-bold text-2xl mb-3">
                  🚀 جاهز لتأسيس شركتك الأمريكية؟
                </h3>
                <p className="text-white/80 mb-6">
                  نحن في Go LLC نساعدك في كل خطوة — من التأسيس حتى فتح Wise Business
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: '#F4C430' }}>✓</span> تأسيس LLC أمريكية رسمية
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: '#F4C430' }}>✓</span> فتح Wise Business مضمون 100%
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: '#F4C430' }}>✓</span> دعم عربي كامل
                  </div>
                </div>
                <Link
                  href="/#pricing"
                  className="inline-block font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105"
                  style={{ background: '#F4C430', color: '#1A3A52' }}
                >
                  احجز استشارة مجانية →
                </Link>
                <p className="text-xs text-white/50 mt-3">معدل نجاح 100% | 30+ عميل راضٍ</p>
              </div>
            </div>

            {/* ── Sticky Sidebar (TOC) ──────────────────────── */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28">
                {/* TOC */}
                <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
                  <h4
                    className="font-bold text-sm mb-4 flex items-center gap-2"
                    style={{ color: '#1A3A52' }}
                  >
                    📋 محتويات المقال
                  </h4>
                  <nav className="space-y-2">
                    {article.tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-gray-600 hover:text-navy py-1.5 px-3 rounded-lg hover:bg-gold/10 transition-colors"
                        style={{ '--hover-color': '#1A3A52' } as React.CSSProperties}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Sidebar CTA */}
                <div
                  className="rounded-2xl p-6 text-white text-center"
                  style={{ background: '#1A3A52' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: '#F4C430' }}
                  >
                    <span className="font-bold text-lg" style={{ color: '#1A3A52' }}>G</span>
                  </div>
                  <p className="font-bold mb-2">أسس شركتك مع Go LLC</p>
                  <p className="text-xs text-white/70 mb-4">من $39 فقط — كل شيء شامل</p>
                  <Link
                    href="/#pricing"
                    className="block w-full py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{ background: '#F4C430', color: '#1A3A52' }}
                  >
                    ابدأ الآن →
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* ── Related Articles ─────────────────────────────── */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3
                className="font-tajawal font-bold text-2xl mb-8"
                style={{ color: '#1A3A52' }}
              >
                📚 مقالات ذات صلة
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link key={rel.id} href={`/blog/${rel.slug}`} className="group block">
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5 h-full flex flex-col">
                      <span
                        className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 w-fit"
                        style={{ background: '#F4C430', color: '#1A3A52' }}
                      >
                        {rel.categoryLabel}
                      </span>
                      <h4
                        className="font-tajawal font-bold text-base leading-snug mb-3 group-hover:text-gold transition-colors flex-1"
                        style={{ color: '#1A3A52' }}
                      >
                        {rel.title}
                      </h4>
                      <div className="flex items-center gap-1 text-gold text-sm font-medium">
                        اقرأ المقال
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold transition-colors"
              style={{ color: '#1A3A52' }}
            >
              <ArrowRight className="w-4 h-4" />
              العودة إلى جميع المقالات
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
