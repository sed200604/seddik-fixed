'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Clock, Eye, ArrowLeft, BookOpen, Mail, TrendingUp } from 'lucide-react';
import { articles, categoryLabels, type Category } from '@/data/articles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatViews(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

const CATEGORIES: Category[] = ['all', 'llc', 'banking', 'taxes', 'ecommerce', 'freelancing', 'algeria'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = useMemo(() => articles.find((a) => a.featured), []);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = activeCategory === 'all' || a.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const grid = filtered.filter((a) => !a.featured || activeCategory !== 'all' || searchQuery);

  return (
    <>
      <Header />
      <main className="bg-off-white min-h-screen pt-20" dir="rtl">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A3A52 0%, #2C5F7F 100%)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-gold blur-3xl" />
            <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-5 py-20 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 text-sm font-medium backdrop-blur-sm">
              <BookOpen className="w-4 h-4 text-gold" />
              مكتبة Go LLC المعرفية
            </div>
            <h1 className="font-tajawal font-bold text-4xl md:text-5xl mb-4 leading-tight">
              كل ما تحتاج معرفته عن{' '}
              <span style={{ color: '#F4C430' }}>LLC وWise Business</span>
            </h1>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              مقالات مكتوبة بعربية أصلية من خبراء متخصصين في تأسيس الشركات الأمريكية والخدمات المالية الدولية
            </p>
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍  ابحث عن موضوع..."
                className="w-full pr-12 pl-5 py-4 rounded-2xl text-gray-800 text-right shadow-xl focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>
        </section>

        {/* ── Stats Bar ─────────────────────────────────────────── */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-center gap-10 text-sm text-gray-600 flex-wrap">
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-gold" />{articles.length} مقال</span>
            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-gold" />30,000+ قراءة</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-gold" />6 تصنيفات</span>
          </div>
        </div>

        {/* ── Categories Filter (Sticky) ─────────────────────────── */}
        <div className="sticky top-16 z-40 bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-5 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
                    activeCategory === cat
                      ? 'bg-navy text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-navy/10 hover:text-navy'
                  }`}
                  style={activeCategory === cat ? { backgroundColor: '#1A3A52' } : {}}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-5 py-12">
          {/* ── Featured Article ──────────────────────────────────── */}
          {featured && activeCategory === 'all' && !searchQuery && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: '#F4C430', color: '#1A3A52' }}
                >
                  ⭐ مميز
                </span>
                <span className="text-sm text-gray-500">أكثر المقالات قراءة</span>
              </div>
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div
                  className="rounded-3xl overflow-hidden shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #1A3A52 0%, #2C5F7F 100%)' }}
                >
                  <div className="p-8 md:p-12 text-white">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ background: '#F4C430', color: '#1A3A52' }}
                      >
                        {featured.categoryLabel}
                      </span>
                      <span className="text-white/60 text-sm flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featured.readTime} دقيقة قراءة
                      </span>
                      <span className="text-white/60 text-sm flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {formatViews(featured.views)} مشاهدة
                      </span>
                    </div>
                    <h2 className="font-tajawal font-bold text-2xl md:text-3xl mb-4 leading-snug group-hover:text-gold transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-white/75 text-base leading-relaxed mb-6 max-w-3xl">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-2 font-semibold text-gold">
                      اقرأ المقال كاملاً
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* ── Search results heading ─────────────────────────── */}
          {(searchQuery || activeCategory !== 'all') && (
            <div className="mb-8 flex items-center justify-between">
              <p className="text-gray-600">
                {filtered.length === 0 ? 'لا توجد نتائج' : `${filtered.length} مقال`}
                {searchQuery && <span className="font-semibold"> لـ "{searchQuery}"</span>}
              </p>
              {(searchQuery || activeCategory !== 'all') && (
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="text-sm text-navy font-medium hover:text-gold transition-colors"
                >
                  مسح الفلاتر ×
                </button>
              )}
            </div>
          )}

          {/* ── Articles Grid ──────────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-medium">لم نجد مقالات مطابقة</p>
              <p className="text-sm mt-2">جرّب كلمات بحث مختلفة أو اختر تصنيفاً آخر</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {(searchQuery || activeCategory !== 'all' ? filtered : grid).map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group block">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl active:scale-95 transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                    {/* Color Banner */}
                    <div
                      className="h-2"
                      style={{
                        background:
                          article.category === 'llc'
                            ? 'linear-gradient(90deg, #1A3A52, #2C5F7F)'
                            : article.category === 'banking'
                            ? 'linear-gradient(90deg, #0D7377, #14A7A7)'
                            : article.category === 'taxes'
                            ? 'linear-gradient(90deg, #7C3AED, #A855F7)'
                            : article.category === 'ecommerce'
                            ? 'linear-gradient(90deg, #D97706, #F59E0B)'
                            : article.category === 'freelancing'
                            ? 'linear-gradient(90deg, #059669, #34D399)'
                            : 'linear-gradient(90deg, #1A3A52, #F4C430)',
                      }}
                    />
                    <div className="p-6 flex flex-col flex-1">
                      {/* Badge + read time */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: '#F4C430', color: '#1A3A52' }}
                        >
                          {article.categoryLabel}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime} د
                        </span>
                      </div>
                      {/* Title */}
                      <h3 className="font-tajawal font-bold text-base text-navy leading-snug mb-3 group-hover:text-gold transition-colors flex-1"
                          style={{ color: '#1A3A52' }}>
                        {article.title}
                      </h3>
                      {/* Excerpt */}
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                        <span>{formatDate(article.date)}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {formatViews(article.views)}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* ── Newsletter CTA ─────────────────────────────────── */}
          <div
            className="mt-20 rounded-3xl p-10 text-center text-white"
            style={{ background: 'linear-gradient(135deg, #1A3A52 0%, #2C5F7F 100%)' }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gold rounded-2xl mb-5">
              <Mail className="w-7 h-7 text-navy" style={{ color: '#1A3A52' }} />
            </div>
            <h3 className="font-tajawal font-bold text-2xl mb-3">
              اشترك في نشرتنا البريدية
            </h3>
            <p className="text-white/75 mb-7 max-w-md mx-auto">
              احصل على مقالات جديدة ونصائح حصرية مباشرة في بريدك كل أسبوع
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-5 py-3.5 rounded-xl text-gray-800 text-right focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-xl font-bold transition-all hover:scale-105"
                style={{ background: '#F4C430', color: '#1A3A52' }}
              >
                اشترك →
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
