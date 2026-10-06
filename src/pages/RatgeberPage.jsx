import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Clock } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import useIsDesktop from '@/components/ratgeber/useIsDesktop';
import { friendlyIconAssets } from '@/components/ui/healioSoftClayIcons';
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

// Figur je Ratgeberartikel aus dem freundlichen 3D-Satz. Ein neuer Artikel
// ohne eigenen Eintrag zeigt das Dokument mit Haken.
const ARTICLE_FIGURES = {
  'ikk-classic-bonusprogramm-2026': friendlyIconAssets.bonus,
  'zahnzusatzversicherung-fehlender-zahn': friendlyIconAssets.dental,
  'schwanger-zusatzversicherung': friendlyIconAssets.pregnancy,
  'schwangerschaft-worauf-achten': friendlyIconAssets.document,
  'hebamme-kosten-krankenkasse': friendlyIconAssets.family,
  'krankenkassen-bonus-zusatzversicherung': friendlyIconAssets.budget,
};
const figureFor = (slug) => ARTICLE_FIGURES[slug] || friendlyIconAssets.document;

// Themen-Sprungmarken im Hero. Jede Marke springt zur Karte ihres Artikels;
// fehlt der Artikel im Register, fällt die Marke weg.
const TOPICS = [
  { slug: 'ikk-classic-bonusprogramm-2026', label: 'Kassenbonus', kind: 'bonus', tone: 'butter' },
  { slug: 'zahnzusatzversicherung-fehlender-zahn', label: 'Zähne', kind: 'dental', tone: 'mint' },
  { slug: 'schwanger-zusatzversicherung', label: 'Schwangerschaft', kind: 'pregnancy', tone: 'coral' },
];

// Blogartikel nach Leserkreis. Unbekannte oder fehlende target_group landet
// bei den Patientinnen und Patienten.
const DEFAULT_BLOG_GROUP = 'blog-patienten';
const BLOG_GROUPS = [
  {
    id: 'blog-patienten',
    title: 'Für Patientinnen und Patienten',
    kind: 'family',
    tone: 'sky',
  },
  {
    id: 'blog-praxen',
    title: 'Für Praxen, Hebammen und Heilberufe',
    jumpLabel: 'Für Praxen und Heilberufe',
    kind: 'ambulant',
    tone: 'mint',
    targetGroups: ['heilpraktiker', 'hebammen', 'tcm', 'osteopathen', 'physiotherapeut', 'optiker', 'hoerakustiker'],
  },
  {
    id: 'blog-arbeitgeber',
    title: 'Für Arbeitgeber',
    jumpLabel: 'Für Arbeitgeber',
    kind: 'protection',
    tone: 'lavender',
    targetGroups: ['arbeitgeber'],
  },
];

const blogGroupIdFor = (targetGroup) => (
  BLOG_GROUPS.find((group) => group.targetGroups?.includes(targetGroup))?.id || DEFAULT_BLOG_GROUP
);

const EASE_OUT = 'ease-[cubic-bezier(0.16,1,0.3,1)]';

// Die ganze Karte ist über den Titel-Link klickbar. Der Tastaturfokus
// zeigt sich deshalb als Umriss um die Karte, ohne Verzögerung durch die
// Schattenblende beim Überfahren.
const CARD_FOCUS = 'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-home-mint';
const STRETCHED_LINK = 'after:absolute after:inset-0 after:rounded-[2rem] focus:outline-none';

const ReadingTime = ({ minutes, className = '' }) => {
  if (!minutes) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 ${className}`}>
      <Clock className="h-4 w-4 shrink-0 text-[#087654]" aria-hidden="true" />
      {minutes} Min. Lesezeit
    </span>
  );
};

// Pflichtkennzeichnung für das Advertorial, gut sichtbar oben in der Karte.
const AdLabel = () => (
  <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 font-display text-sm font-extrabold uppercase tracking-[0.1em] text-slate-700 md:text-xs md:tracking-[0.14em]">
    Anzeige
  </span>
);

// Figur auf einem ruhigen Papierkreis. Beim Überfahren der Karte hebt sie
// sich leicht an; das ist die einzige Bewegung auf der Seite.
const ArticleFigure = ({ slug, className = '', imageClassName = '' }) => (
  <span
    className={`pointer-events-none grid shrink-0 place-items-center rounded-full bg-[#f7f5f0] ${className}`}
    aria-hidden="true"
  >
    <img
      src={figureFor(slug)}
      alt=""
      width="148"
      height="148"
      loading="lazy"
      decoding="async"
      className={`select-none object-contain drop-shadow-[0_10px_14px_rgba(7,17,31,0.12)] transition-transform duration-700 ${EASE_OUT} group-hover:-translate-y-1.5 group-hover:-rotate-3 motion-reduce:transform-none motion-reduce:transition-none ${imageClassName}`}
    />
  </span>
);

const LeadArticleCard = ({ entry }) => {
  const isAdvertorial = entry.kind === 'advertorial';
  return (
    <article
      id={`artikel-${entry.slug}`}
      className={`group relative grid scroll-mt-28 gap-4 rounded-[2rem] border border-slate-100 bg-white p-5 shadow-[0_24px_60px_rgba(7,17,31,0.10)] transition-shadow duration-500 hover:shadow-[0_30px_72px_rgba(7,17,31,0.14)] sm:gap-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12 lg:p-12 ${CARD_FOCUS}`}
    >
      <div className="min-w-0">
        {/* Das Advertorial bleibt als Anzeige erkennbar, auch als Leitartikel. */}
        {isAdvertorial && <div className="mb-5"><AdLabel /></div>}
        <h3 className="max-w-[28ch] font-display text-[1.5rem] font-extrabold md:text-[clamp(1.65rem,2.7vw,2.5rem)] leading-[1.08] tracking-[-0.035em] text-home-midnight [text-wrap:balance]">
          <Link to={getRatgeberPath(entry.slug)} className={STRETCHED_LINK}>
            {entry.listTitle}
          </Link>
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
          {entry.listTeaser}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-8 sm:gap-y-4">
          <span
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-home-midnight px-6 font-display text-base font-extrabold text-white shadow-[0_16px_40px_rgba(7,17,31,0.18)] transition-colors group-hover:bg-[#143528]"
            aria-hidden="true"
          >
            Artikel lesen
            <ArrowRight className={`h-5 w-5 transition-transform duration-500 ${EASE_OUT} group-hover:translate-x-1 motion-reduce:transform-none`} aria-hidden="true" />
          </span>
          {!isAdvertorial && <ReadingTime minutes={entry.readingTimeMinutes} />}
        </div>
      </div>
      <ArticleFigure
        slug={entry.slug}
        className="order-first h-20 w-20 sm:h-32 sm:w-32 md:order-none md:h-52 md:w-52"
        imageClassName="h-16 w-16 sm:h-24 sm:w-24 md:h-[9.25rem] md:w-[9.25rem]"
      />
    </article>
  );
};

const ArticleCard = ({ entry }) => {
  const isAdvertorial = entry.kind === 'advertorial';
  return (
    <article
      id={`artikel-${entry.slug}`}
      className={`group relative flex h-full scroll-mt-28 flex-col rounded-[2rem] border border-slate-100 bg-white p-5 shadow-[0_18px_44px_rgba(7,17,31,0.08)] transition-shadow duration-500 hover:shadow-[0_26px_60px_rgba(7,17,31,0.13)] sm:p-8 ${CARD_FOCUS}`}
    >
      <div className="flex items-start justify-between gap-4">
        <ArticleFigure slug={entry.slug} className="h-20 w-20 sm:h-28 sm:w-28" imageClassName="h-16 w-16 sm:h-24 sm:w-24" />
        {/* Advertorial als Anzeige, organische Artikel mit Lesezeit. */}
        {isAdvertorial ? <AdLabel /> : <ReadingTime minutes={entry.readingTimeMinutes} className="mt-1" />}
      </div>
      <h3 className="mt-4 font-display text-xl font-extrabold leading-[1.2] tracking-[-0.025em] text-home-midnight [text-wrap:balance] sm:mt-6 sm:text-2xl">
        <Link to={getRatgeberPath(entry.slug)} className={STRETCHED_LINK}>
          {entry.listTitle}
        </Link>
      </h3>
      <p className="mt-3 text-base leading-7 text-slate-600">
        {entry.listTeaser}
      </p>
      <span className="mt-auto inline-flex items-center gap-2 self-start pt-4 font-display text-sm font-extrabold text-home-midnight sm:pt-6" aria-hidden="true">
        Artikel lesen
        <ArrowRight className={`h-4 w-4 text-[#087654] transition-transform duration-500 ${EASE_OUT} group-hover:translate-x-1 motion-reduce:transform-none`} aria-hidden="true" />
      </span>
    </article>
  );
};

const blogExcerpt = (article) => article.excerpt || article.meta_description;

// Bisherige Listenzeile (Desktop und Gruppen mit höchstens zwei Artikeln).
const BlogListItem = ({ article }) => (
  <li
    className="group relative border-t border-slate-300/70 py-5 has-[:focus-visible]:rounded-md has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-home-mint"
  >
    <Link
      to={`/blog/${article.slug}`}
      className="font-display text-lg font-bold leading-snug text-home-midnight transition-colors after:absolute after:inset-0 group-hover:text-[#087654] focus:outline-none"
    >
      {article.title}
    </Link>
    {blogExcerpt(article) && (
      <p className="mt-1.5 line-clamp-2 text-base leading-7 text-slate-600">{blogExcerpt(article)}</p>
    )}
    <ReadingTime minutes={article.reading_time_minutes} className="mt-3" />
  </li>
);

// Handy: je zwei Artikel stehen übereinander auf einer weißen Karte; die
// Gruppe wird zur Wischreihe, damit die Blogliste nicht endlos lang wird.
const BlogPairItem = ({ article }) => (
  <li
    className="group relative py-4 has-[:focus-visible]:rounded-md has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-home-mint"
  >
    <Link
      to={`/blog/${article.slug}`}
      className="font-display text-lg font-bold leading-snug text-home-midnight transition-colors after:absolute after:inset-0 group-hover:text-[#087654] focus:outline-none"
    >
      {article.title}
    </Link>
    {blogExcerpt(article) && (
      <p className="mt-1.5 line-clamp-2 text-base leading-7 text-slate-600">{blogExcerpt(article)}</p>
    )}
    <ReadingTime minutes={article.reading_time_minutes} className="mt-2" />
  </li>
);

const chunkPairs = (items) => {
  const pairs = [];
  for (let index = 0; index < items.length; index += 2) pairs.push(items.slice(index, index + 2));
  return pairs;
};

const BlogGroup = ({ group }) => {
  const isDesktop = useIsDesktop();
  const swipe = !isDesktop && group.articles.length > 2;

  return (
    <section
      id={group.id}
      aria-labelledby={`${group.id}-heading`}
      className="min-w-0 scroll-mt-28 rounded-[2rem] bg-[#f7f5f0] p-5 sm:p-8 lg:p-10"
    >
      <div className="flex items-center gap-4">
        <FriendlyIcon kind={group.kind} tone={group.tone} size="sm" />
        <h3 id={`${group.id}-heading`} className="font-display text-xl font-extrabold leading-tight tracking-[-0.025em] text-home-midnight sm:text-2xl">
          {group.title}
        </h3>
      </div>
      {swipe ? (
        <MobileSwipeRow
          label={group.title}
          bleed={false}
          className="mt-5"
          desktopClassName="-mx-5 scroll-pl-5 px-5 sm:-mx-8 sm:scroll-pl-8 sm:px-8"
          mobileItemWidth="w-[76vw] max-w-[22rem]"
        >
          {chunkPairs(group.articles).map((pair) => (
            <ul
              key={pair[0].slug}
              className="h-full divide-y divide-slate-200 rounded-2xl bg-white px-4 ring-1 ring-slate-200/70"
            >
              {pair.map((article) => <BlogPairItem key={article.slug} article={article} />)}
            </ul>
          ))}
        </MobileSwipeRow>
      ) : (
        <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
          {group.articles.map((article) => <BlogListItem key={article.slug} article={article} />)}
        </ul>
      )}
    </section>
  );
};

/**
 * Übersicht /ratgeber. Heller Hero auf Papier mit Themen-Sprungmarken, die
 * kuratierten Ratgeber aus src/content/ratgeber/index.js als Karten (der
 * erste Eintrag als Leitartikel, Reihenfolge wie im Register), danach alle
 * Blogartikel nach Leserkreis und der Verweis auf den Blog.
 */
const RatgeberPage = () => {
  const blogArticles = useBlogArticles();
  const [leadArticle, ...moreArticles] = ratgeberArticles;
  const topics = TOPICS.filter((topic) => ratgeberArticles.some((entry) => entry.slug === topic.slug));
  const hasBlog = blogArticles.length > 0;

  const blogGroups = useMemo(() => BLOG_GROUPS.map((group) => ({
    ...group,
    articles: blogArticles.filter((article) => blogGroupIdFor(article.target_group) === group.id),
  })), [blogArticles]);

  // Solange der Blog lädt (oder ausfällt), zeigen die Marken auf den
  // Blogbereich selbst. Danach springen sie in ihre Gruppe; leere Gruppen
  // entfallen.
  const blogJumps = [
    ...blogGroups
      .filter((group) => group.jumpLabel && (!hasBlog || group.articles.length > 0))
      .map((group) => ({ label: group.jumpLabel, href: hasBlog ? `#${group.id}` : '#blog' })),
    { label: 'Alle Blogartikel', href: '#blog' },
  ];

  return (
  <>
    <SEOHead
      title="Ratgeber zu Krankenkasse, Bonus und Zusatzschutz | Healio"
      description="Verständliche Ratgeber von Healio zu Kassenbonus, ambulanter Zusatzversicherung und Zahnschutz. Erst prüfen, was die eigene Kasse zahlt, dann entscheiden."
      canonicalUrl="https://healio.de/ratgeber"
    />

    <div className="bg-[#f7f5f0] text-home-midnight">
      {/* Hero ruhig und hell wie auf /zahn: warmes Papier, weicher Mint-Schein,
          dunkle Überschrift mit grüner Akzentzeile, eine weiße Karte. */}
      <section className="relative isolate overflow-hidden" aria-labelledby="ratgeber-heading">
        <div className="absolute -left-24 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-home-mint/[0.12] blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-28 sm:px-6 md:pb-20 md:pt-32 lg:px-8">
          <div className="grid items-center gap-7 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,26rem)] lg:gap-14 xl:gap-20">
            <div>
              <h1
                id="ratgeber-heading"
                className="max-w-[17ch] font-display text-[clamp(1.75rem,9vw,2.15rem)] font-extrabold sm:text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[1.04] tracking-[-0.035em] text-home-midnight [text-wrap:balance]"
              >
                <span className="block">Ratgeber zu Krankenkasse,</span>{' '}
                <span className="block text-[#087654]">Bonus und Zusatzschutz</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-9">
                Hier sammeln wir Texte, die eine Sache in Ruhe erklären: was die gesetzliche
                Krankenkasse an Bonus zahlt, wo im Alltag Eigenanteile entstehen und wie sich
                beides sinnvoll verbinden lässt. Ohne Fachsprache, ohne Versprechen.
              </p>
            </div>

            <nav
              aria-labelledby="ratgeber-themen-heading"
              className="mx-auto w-full max-w-[28rem] rounded-[2rem] border border-slate-100 bg-white p-5 shadow-[0_24px_60px_rgba(7,17,31,0.10)] sm:p-8 lg:mx-0 lg:max-w-none"
            >
              <h2 id="ratgeber-themen-heading" className="font-display text-2xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-3xl">
                Worum geht es dir?
              </h2>
              {topics.length > 0 && (
                <ul className="mt-4 grid gap-2 sm:mt-6 sm:gap-3">
                  {topics.map((topic) => (
                    <li key={topic.slug}>
                      <a
                        href={`#artikel-${topic.slug}`}
                        className="group flex min-h-14 items-center gap-4 rounded-2xl border border-slate-200 py-2 pl-2 pr-4 font-display text-lg font-extrabold sm:min-h-16 transition hover:border-home-mint hover:bg-home-ice focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint"
                      >
                        <FriendlyIcon kind={topic.kind} tone={topic.tone} size="sm" />
                        <span className="flex-1">{topic.label}</span>
                        <ArrowDown className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-y-0.5 group-hover:text-home-midnight motion-reduce:transform-none" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <div className="my-5 border-t border-slate-100 sm:my-6" aria-hidden="true" />
              <p className="font-display text-base font-extrabold">Außerdem im Blog</p>
              <ul className="mt-2 flex flex-wrap gap-2 sm:mt-3">
                {blogJumps.map((jump) => (
                  <li key={jump.label}>
                    <a
                      href={jump.href}
                      className="inline-flex min-h-11 items-center rounded-full bg-slate-100 px-4 text-sm font-bold md:min-h-10 text-slate-700 transition hover:bg-home-ice hover:text-home-midnight focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint"
                    >
                      {jump.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {leadArticle && (
        <section id="ratgeber-artikel" aria-labelledby="ratgeber-artikel-heading" className="scroll-mt-24 overflow-x-clip pb-12 md:overflow-visible md:pb-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="ratgeber-artikel-heading" className="font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.04em] text-home-midnight sm:text-4xl">
              Unsere Ratgeber
            </h2>
            <div className="mt-5 sm:mt-8">
              <LeadArticleCard entry={leadArticle} />
            </div>
            {moreArticles.length > 0 && (
              <MobileSwipeRow
                label="Weitere Ratgeber"
                className="mt-4 sm:mt-6"
                desktopClassName="md:grid md:grid-cols-2 md:gap-6"
              >
                {moreArticles.map((entry) => (
                  <ArticleCard key={entry.slug} entry={entry} />
                ))}
              </MobileSwipeRow>
            )}
          </div>
        </section>
      )}
    </div>

    <section id="blog" aria-labelledby="blog-heading" className="scroll-mt-24 bg-white py-12 text-home-midnight md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="blog-heading" className="font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.04em] sm:text-4xl">
          Alle Artikel aus dem Blog
        </h2>
        {hasBlog ? (
          <div className="mt-5 grid gap-4 sm:mt-8 sm:gap-6" data-healio-ratgeber="blog-list">
            {blogGroups
              .filter((group) => group.articles.length > 0)
              .map((group) => <BlogGroup key={group.id} group={group} />)}
          </div>
        ) : null}
        <p className="mt-6 sm:mt-10">
          <Link
            to="/blog"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-300 px-6 font-display text-base font-extrabold text-home-midnight transition hover:border-home-mint hover:bg-home-ice focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-2"
          >
            Zum Blog mit Filter nach Thema
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  </>
  );
};

export default RatgeberPage;
