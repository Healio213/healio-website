import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';

const API_BASE = import.meta.env.VITE_APP_API_URL || 'https://app.healio.de';

const TARGET_GROUP_LABELS = {
  heilpraktiker: 'Heilpraktiker',
  hebammen: 'Hebammen',
  endkunden: 'Für Versicherte',
  optiker: 'Optiker',
  hoerakustiker: 'Hörakustiker',
  physiotherapeut: 'Physiotherapie',
  arbeitgeber: 'Arbeitgeber',
};

const BlogArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/content/articles?slug=${slug}`);
      if (!res.ok) throw new Error('Article not found');
      const data = await res.json();
      setArticle(data.article);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[#25c990] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-[#464f5d] mb-4">Artikel nicht gefunden</h1>
        <Link to="/blog" className="text-[#25c990] hover:underline">
          Zurück zum Ratgeber
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
    publisher: { '@type': 'Organization', name: 'Healio GmbH', url: 'https://www.healio.de' },
  };

  const faqSchema = article.structured_data?.faq || null;

  const combinedSchema = faqSchema
    ? [articleSchema, faqSchema]
    : articleSchema;

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.meta_description}
        canonicalUrl={`https://www.healio.de/blog/${article.slug}`}
        ogTitle={article.title}
        ogDescription={article.meta_description}
        ogUrl={`https://www.healio.de/blog/${article.slug}`}
        ogType="article"
        schemaMarkup={combinedSchema}
      />

      <article className="pt-32 pb-20">
        {/* Header */}
        <header className="max-w-3xl mx-auto px-4 mb-12">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-gray-500 hover:text-[#25c990] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Zurück zum Ratgeber
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              <Tag className="inline w-3 h-3 mr-1" />
              {TARGET_GROUP_LABELS[article.target_group] || article.target_group}
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
                {article.reading_time_minutes} Min. Lesezeit
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
            dangerouslySetInnerHTML={{ __html: article.content_html }}
          />

          {/* GEO-Nugget Section */}
          {article.geo_section && (
            <aside className="mt-12 p-6 bg-[#e8f8f0] rounded-2xl border border-[#25c990]/20">
              <h3 className="text-lg font-bold text-[#076046] mb-3">Auf einen Blick</h3>
              <p className="text-[#464f5d] leading-relaxed">{article.geo_section}</p>
            </aside>
          )}

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-[#25c990] to-[#076046] rounded-2xl text-white text-center">
            <h3 className="text-2xl font-bold mb-3">
              Ihr persönliches Gesundheitsbudget berechnen
            </h3>
            <p className="text-white/90 mb-6 max-w-lg mx-auto">
              Erfahren Sie in 2 Minuten, wie viel Budget Ihnen zusteht – kostenlos und unverbindlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/potenzialanalyse"
                className="px-6 py-3 bg-white text-[#076046] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Jetzt berechnen
              </Link>
              <Link
                to="/terminvereinbarung"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Beratungstermin buchen
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogArticlePage;
