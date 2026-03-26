import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { Clock, ArrowRight, User, Tag } from 'lucide-react';

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

const TARGET_GROUP_COLORS = {
  heilpraktiker: 'bg-emerald-100 text-emerald-800',
  hebammen: 'bg-pink-100 text-pink-800',
  endkunden: 'bg-blue-100 text-blue-800',
  optiker: 'bg-purple-100 text-purple-800',
  hoerakustiker: 'bg-amber-100 text-amber-800',
  physiotherapeut: 'bg-cyan-100 text-cyan-800',
  arbeitgeber: 'bg-slate-100 text-slate-800',
};

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('alle');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/content/articles`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error('Failed to load articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === 'alle'
    ? articles
    : articles.filter((a) => a.target_group === filter);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Healio Ratgeber',
    description: 'Expertenwissen zu Gesundheitsbudgets, Zusatzversicherungen und steuerfreien Benefits für Arbeitnehmer, Praxen und Partner.',
    url: 'https://www.healio.de/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Healio GmbH',
      url: 'https://www.healio.de',
    },
  };

  return (
    <>
      <SEOHead
        title="Healio Ratgeber – Gesundheitsbudget, Zusatzversicherung & Benefits"
        description="Expertenwissen für Kassenpatienten, Heilpraktiker, Hebammen und Arbeitgeber. Erfahren Sie, wie Sie mit dem Healio Gesundheitsbudget bis zu 2.500 EUR sparen."
        canonicalUrl="https://www.healio.de/blog"
        ogTitle="Healio Ratgeber – Ihr Weg zum Gesundheitsbudget"
        ogDescription="Fachartikel zu steuerfreien Gesundheitsleistungen, Naturheilverfahren und smarter Vorsorge."
        ogUrl="https://www.healio.de/blog"
        ogType="blog"
        schemaMarkup={schemaMarkup}
      />

      <section className="pt-32 pb-16 bg-gradient-to-b from-[#e8f8f0] to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#464f5d] mb-4">
            Healio <span className="text-[#25c990]">Ratgeber</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Expertenwissen zu Gesundheitsbudgets, Zusatzversicherungen und steuerfreien
            Benefits – verständlich erklärt und immer aktuell.
          </p>

          {/* Filter-Tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setFilter('alle')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'alle'
                  ? 'bg-[#25c990] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Alle Beiträge
            </button>
            {Object.entries(TARGET_GROUP_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-[#25c990] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#25c990] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">Noch keine Beiträge in dieser Kategorie.</p>
              <p className="mt-2">Unsere Redaktion arbeitet bereits an neuen Inhalten.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${TARGET_GROUP_COLORS[article.target_group] || 'bg-gray-100 text-gray-700'}`}>
                        <Tag className="inline w-3 h-3 mr-1" />
                        {TARGET_GROUP_LABELS[article.target_group] || article.target_group}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-[#464f5d] mb-3 group-hover:text-[#25c990] transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt || article.meta_description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {article.author || 'Healio Redaktion'}
                        </span>
                        {article.reading_time_minutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.reading_time_minutes} Min.
                          </span>
                        )}
                      </div>
                      <span>{formatDate(article.published_at)}</span>
                    </div>

                    <div className="mt-4 flex items-center text-[#25c990] font-medium text-sm group-hover:gap-2 transition-all">
                      Weiterlesen <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
