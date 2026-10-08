import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import RatgeberArticleLayout from '@/components/ratgeber/RatgeberArticleLayout';
import NotFoundPage from '@/pages/NotFoundPage';
import { RATGEBER_GROUP_OF, RATGEBER_LOADERS } from '@/content/ratgeber/registry.loaders';

/**
 * Artikelseite /ratgeber/:slug.
 *
 * Der Artikeltext liegt je Slug in einem eigenen Chunk (registry.loaders.js).
 * Die Seite lädt nur den Chunk ihres Artikels, egal wie viele Ratgeber es
 * gibt. Je Slug entsteht genau eine Lazy-Komponente, damit ein schon
 * geladener Artikel beim Zurückblättern sofort steht.
 */
const lazyArticles = new Map();

const lazyArticleFor = (slug) => {
  let LazyArticle = lazyArticles.get(slug);
  if (!LazyArticle) {
    const load = RATGEBER_LOADERS.get(slug);
    const groupId = RATGEBER_GROUP_OF.get(slug) || null;
    LazyArticle = React.lazy(() => load().then(
      ({ article }) => ({
        default: function LoadedRatgeberArticle() {
          return <RatgeberArticleLayout article={article} groupId={groupId} />;
        },
      }),
      (error) => {
        // Scheitert der Chunk (etwa Funkloch), lädt der nächste Besuch neu.
        lazyArticles.delete(slug);
        throw error;
      },
    ));
    lazyArticles.set(slug, LazyArticle);
  }
  return LazyArticle;
};

// Platzhalter, solange der Artikel-Chunk lädt: gleicher Kreisel wie beim
// Seitenwechsel, aber innerhalb des Layouts, damit Kopf und Fuß stehen bleiben.
const ArticleLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-white" aria-busy="true">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#25c990] border-t-transparent" />
  </div>
);

const RatgeberArtikelPage = () => {
  const { slug } = useParams();

  if (!RATGEBER_LOADERS.has(slug)) return <NotFoundPage />;

  const LazyArticle = lazyArticleFor(slug);
  return (
    <Suspense fallback={<ArticleLoader />}>
      <LazyArticle />
    </Suspense>
  );
};

export default RatgeberArtikelPage;
