import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { getRatgeberPath, ratgeberArticles } from '@/content/ratgeber';
import { fetchCachedBlogArticles } from '@/lib/blogContentCache';
import { applyBlogEditorialFixes } from '@/lib/blogEditorialFixes';

const API_BASE = import.meta.env.VITE_APP_API_URL || '';

// Alle Blogartikel auf derselben Seite (Frank 29.09.2026: ein Menüpunkt
// Ratgeber, dort alle Artikel). Gleiche Quelle wie /blog: erst die API,
// sonst der geprüfte Cache. Scheitert beides, bleibt der Link zum Blog.
function useBlogArticles() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/content/articles`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data.articles) || data.articles.length === 0) throw new Error('leer');
        if (active) setArticles(data.articles.map(applyBlogEditorialFixes));
      } catch {
        try {
          const cached = await fetchCachedBlogArticles();
          if (active) setArticles(cached);
        } catch {
          if (active) setArticles([]);
        }
      }
    })();
    return () => { active = false; };
  }, []);
  return articles;
}

/**
 * Uebersicht /ratgeber. Schlichte Liste aus dem zentralen Inhaltsregister
 * src/content/ratgeber/index.js, dazu der Verweis auf den Blog.
 */
const RatgeberPage = () => {
  const blogArticles = useBlogArticles();
  return (
  <>
    <SEOHead
      title="Ratgeber zu Krankenkasse, Bonus und Zusatzschutz | Healio"
      description="Verständliche Ratgeber von Healio zu Kassenbonus, ambulanter Zusatzversicherung und Zahnschutz. Erst prüfen, was die eigene Kasse zahlt, dann entscheiden."
      canonicalUrl="https://healio.de/ratgeber"
    />

    <section className="bg-white pb-20 pt-24 text-slate-700 sm:pt-28">
      <div className="mx-auto w-full max-w-[68ch] px-5 sm:px-6">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          Ratgeber von Healio
        </p>

        <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.15] tracking-[-0.03em] text-[#07111f] sm:text-4xl">
          Ratgeber zu Krankenkasse, Bonus und Zusatzschutz
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          Hier sammeln wir Texte, die eine Sache in Ruhe erklären: was die gesetzliche
          Krankenkasse an Bonus zahlt, wo im Alltag Eigenanteile entstehen und wie sich
          beides sinnvoll verbinden lässt. Ohne Fachsprache, ohne Versprechen.
        </p>

        <ul className="mt-14 space-y-10">
          {ratgeberArticles.map((entry) => (
            <li key={entry.slug} className="border-t border-slate-200 pt-8">
              {/* Das Advertorial bleibt in der Liste, muss aber als Anzeige
                  erkennbar sein. Organische Artikel zeigen die Lesezeit. */}
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                {entry.kind === 'advertorial'
                  ? 'Anzeige'
                  : entry.readingTimeMinutes
                    ? `Ratgeber · Lesezeit etwa ${entry.readingTimeMinutes} Minuten`
                    : 'Ratgeber'}
              </p>
              <h2 className="mt-3 font-display text-xl font-extrabold leading-snug text-[#07111f] sm:text-2xl">
                <Link to={getRatgeberPath(entry.slug)} className="hover:text-[#25c990]">
                  {entry.listTitle}
                </Link>
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {entry.listTeaser}
              </p>
              <Link
                to={getRatgeberPath(entry.slug)}
                className="mt-4 inline-flex font-display text-sm font-bold text-[#07111f] underline underline-offset-4 hover:text-[#25c990]"
              >
                Artikel lesen
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 border-t border-slate-200 pt-10 font-display text-2xl font-extrabold text-[#07111f]">
          Alle Artikel aus dem Blog
        </h2>
        {blogArticles.length > 0 ? (
          <ul className="mt-6 divide-y divide-slate-200" data-healio-ratgeber="blog-list">
            {blogArticles.map((article) => (
              <li key={article.slug} className="py-5">
                <Link to={`/blog/${article.slug}`} className="font-display text-lg font-bold leading-snug text-[#07111f] hover:text-[#25c990]">
                  {article.title}
                </Link>
                {(article.excerpt || article.meta_description) && (
                  <p className="mt-1.5 line-clamp-2 text-base leading-7 text-slate-600">{article.excerpt || article.meta_description}</p>
                )}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-8 text-base leading-7 text-slate-600">
          <Link to="/blog" className="underline underline-offset-4 hover:text-[#07111f]">
            Zum Blog mit Filter nach Thema
          </Link>
        </p>
      </div>
    </section>
  </>
  );
};

export default RatgeberPage;
