import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import SEOHead from '@/components/SEOHead';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import { getBlogArticleCta } from '@/lib/blogArticleCta';
import { getPrerenderedBlogArticleHtml } from '@/lib/prerenderedBlogContent';

// Leer = same-origin. Der Abruf laeuft ueber healio.de und wird von
// Vercel an app.healio.de weitergereicht (Rewrite in vercel.json,
// im Dev-Server der Proxy in vite.config.js). Direkt gegen
// app.healio.de zu laden scheiterte an der fehlenden CORS-Freigabe
// und ersetzte den vorgerenderten Artikel durch "nicht gefunden".
const API_BASE = import.meta.env.VITE_APP_API_URL || '';

const TARGET_GROUP_KEYS = {
  heilpraktiker: 'categories.heilpraktiker',
  hebammen: 'categories.hebammen',
  osteopathen: 'categories.osteopathen',
  tcm: 'categories.tcm',
  endkunden: 'categories.versicherte',
  optiker: 'categories.optiker',
  hoerakustiker: 'categories.hoerakustiker',
  physiotherapeut: 'categories.physiotherapie',
  arbeitgeber: 'categories.arbeitgeber',
};

const stripLeadingArticleHeading = (html) => {
  if (!html) return '';
  return html.replace(/^\s*<article>\s*<h1[^>]*>[\s\S]*?<\/h1>/i, '<article>');
};

const BlogArticlePage = () => {
  const { t } = useTranslation('blog');
  const { getPath, lang } = useLanguage();
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prerenderedArticleHtml = getPrerenderedBlogArticleHtml();

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    setLoading(true);
    setError(null);
    setArticle(null);

    try {
      const res = await fetch(`${API_BASE}/api/v1/content/articles?slug=${slug}`);
      if (!res.ok) {
        if (res.status === 404 && !prerenderedArticleHtml) return;
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setArticle(data.article || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ein unbekannter Slug wird von der SPA zwangslaeufig mit Status 200
  // und der index.html beantwortet und erbt damit deren Angaben:
  // "index, follow" plus Startseiten-Canonical. Fuer Google sieht das
  // aus wie eine indexierbare Dublette der Startseite (Soft-404).
  // react-helmet setzt in dieser App nachweislich keine Tags, deshalb
  // wird hier direkt im DOM korrigiert und beim Verlassen der Seite
  // wieder zurueckgesetzt.
  useEffect(() => {
    if (loading || error || article) return undefined;

    const robotsTag = document.querySelector('meta[name="robots"]');
    const canonicalTag = document.querySelector('link[rel="canonical"]');
    const previousRobots = robotsTag?.getAttribute('content');
    const previousCanonical = canonicalTag?.getAttribute('href');

    robotsTag?.setAttribute('content', 'noindex, follow');
    canonicalTag?.setAttribute('href', `${window.location.origin}${window.location.pathname}`);

    return () => {
      if (previousRobots) robotsTag?.setAttribute('content', previousRobots);
      if (previousCanonical) canonicalTag?.setAttribute('href', previousCanonical);
    };
  }, [loading, error, article]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (prerenderedArticleHtml && (loading || error)) {
    return (
      <div
        className="contents"
        dangerouslySetInnerHTML={{ __html: prerenderedArticleHtml }}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[#25c990] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-20 text-center" role="status">
        <h1 className="text-2xl font-bold text-[#464f5d] mb-4">{t('articleLoadErrorTitle')}</h1>
        <p className="text-gray-600 mb-4">{t('loadErrorBody')}</p>
        <Link to={getPath('blog')} className="text-[#25c990] hover:underline">
          {t('backToGuide')}
        </Link>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-[#464f5d] mb-4">{t('notFound')}</h1>
        <Link to={getPath('blog')} className="text-[#25c990] hover:underline">
          {t('backToGuide')}
        </Link>
      </div>
    );
  }

  const articleSchema = article.structured_data?.article || {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description,
    datePublished: article.published_at,
    author: { '@type': 'Organization', name: 'Healio GmbH' },
    publisher: { '@type': 'Organization', name: 'Healio GmbH', url: 'https://healio.de' },
  };

  const faqSchema = article.structured_data?.faq || null;

  const combinedSchema = faqSchema
    ? [articleSchema, faqSchema]
    : articleSchema;
  const articleBodyHtml = stripLeadingArticleHeading(article.content_html);
  const canonicalUrl = lang === 'en'
    ? `https://healio.de/en/blog/${article.slug}`
    : `https://healio.de/blog/${article.slug}`;
  const articleCta = getBlogArticleCta({
    slug: article.slug,
    targetGroup: article.target_group,
    lang,
  });
  const articleCtaCopyKey = `articleCta.${articleCta.copyKey}`;

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.meta_description}
        canonicalUrl={canonicalUrl}
        ogTitle={article.title}
        ogDescription={article.meta_description}
        ogUrl={canonicalUrl}
        ogType="article"
        schemaMarkup={combinedSchema}
      />

      <article data-prerendered-blog-article className="pt-32 pb-20">
        {/* Header */}
        <header className="max-w-3xl mx-auto px-4 mb-12">
          <Link
            to={getPath('blog')}
            className="inline-flex items-center text-sm text-gray-500 hover:text-[#25c990] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t('backToGuide')}
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              <Tag className="inline w-3 h-3 mr-1" />
              {TARGET_GROUP_KEYS[article.target_group] ? t(TARGET_GROUP_KEYS[article.target_group]) : article.target_group}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#464f5d] mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author || 'Healio Redaktion'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.published_at)}
            </span>
            {article.reading_time_minutes && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.reading_time_minutes} {t('readTime')}
              </span>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-[#464f5d] prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-strong:text-[#464f5d]
              prose-a:text-[#25c990] prose-a:no-underline hover:prose-a:underline
              prose-ul:text-gray-700 prose-li:mb-1
              prose-blockquote:border-l-[#25c990] prose-blockquote:bg-[#e8f8f0] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: articleBodyHtml }}
          />

          {/* GEO-Nugget Section */}
          {article.geo_section && (
            <aside className="mt-12 p-6 bg-[#e8f8f0] rounded-2xl border border-[#25c990]/20">
              <h3 className="text-lg font-bold text-[#076046] mb-3">{t('atAGlance')}</h3>
              <p className="text-[#464f5d] leading-relaxed">{article.geo_section}</p>
            </aside>
          )}

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-[#25c990] to-[#076046] rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-3">
              {t(`${articleCtaCopyKey}.title`)}
            </h3>
            <p className="text-white/90 mb-6 max-w-lg mx-auto">
              {t(`${articleCtaCopyKey}.description`)}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to={articleCta.href}
                className="px-6 py-3 bg-white text-[#076046] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                {t(`${articleCtaCopyKey}.button`)}
              </Link>
              <Link
                to={getPath('terminvereinbarung')}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                {t('bookConsultation')}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogArticlePage;
