const BLOG_CACHE_URL = '/data/blog-articles-cache.json';

let cachedArticlesPromise;

function isCompleteArticle(article) {
  return typeof article?.slug === 'string'
    && article.slug.trim().length > 0
    && typeof article.title === 'string'
    && article.title.trim().length >= 10
    && typeof article.meta_description === 'string'
    && article.meta_description.trim().length >= 40
    && typeof article.content_html === 'string'
    && article.content_html.trim().length >= 500;
}

export async function fetchCachedBlogArticles() {
  if (!cachedArticlesPromise) {
    cachedArticlesPromise = fetch(BLOG_CACHE_URL, { headers: { accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`Blog-Cache HTTP ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        if (!Array.isArray(payload)) throw new Error('Blog-Cache hat ein ungültiges Format.');
        const articles = payload.filter(isCompleteArticle);
        if (articles.length === 0) throw new Error('Blog-Cache enthält keine vollständigen Artikel.');
        return articles;
      })
      .catch((error) => {
        cachedArticlesPromise = undefined;
        throw error;
      });
  }

  return cachedArticlesPromise;
}

export async function fetchCachedBlogArticle(slug) {
  const articles = await fetchCachedBlogArticles();
  return articles.find((article) => article.slug === slug) || null;
}
