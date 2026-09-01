/**
 * SEO Page Generator
 *
 * Läuft nach `vite build` und erzeugt für jede Route eine eigene
 * index.html mit korrekten Meta-Tags (Title, Description, Canonical,
 * OG-Tags, hreflang). Damit sieht Google für jede Seite einzigartige,
 * keyword-optimierte Meta-Daten.
 *
 * Usage: node scripts/generate-seo-pages.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoRoutes } from './seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const articleApiBase = process.env.VITE_APP_API_URL || 'https://app.healio.de';

// Basis-Template laden (die von Vite gebaute index.html)
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html nicht gefunden. Bitte erst `vite build` ausführen.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const ORGANIZATION_ID = 'https://healio.de/#organization';
const WEBSITE_ID = 'https://healio.de/#website';

function schemaTypes(schema) {
  if (!schema || typeof schema !== 'object') return [];
  return Array.isArray(schema['@type']) ? schema['@type'] : [schema['@type']].filter(Boolean);
}

function isWebPageSchema(schema) {
  return schemaTypes(schema).includes('WebPage');
}

function isIndexableRoute(route) {
  return !/^noindex\b/i.test(route.robots || 'index, follow');
}

function createRouteWebPageSchema(route) {
  return {
    '@type': 'WebPage',
    '@id': `${route.canonical}#webpage`,
    url: route.canonical,
    name: route.title,
    description: route.description,
    inLanguage: route.lang === 'en' ? 'en-US' : 'de-DE',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  };
}

function replaceNestedWebPageDefinitions(value, webPageId) {
  if (Array.isArray(value)) {
    return value.map((entry) => replaceNestedWebPageDefinitions(entry, webPageId));
  }
  if (!value || typeof value !== 'object') return value;
  if (isWebPageSchema(value)) return { '@id': webPageId };

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      replaceNestedWebPageDefinitions(entry, webPageId),
    ]),
  );
}

function getRootSchemaEntries(schemaMarkup) {
  if (!schemaMarkup) return [];
  if (Array.isArray(schemaMarkup)) {
    return schemaMarkup.flatMap((entry) => getRootSchemaEntries(entry));
  }
  if (typeof schemaMarkup !== 'object') return [];
  if (Array.isArray(schemaMarkup['@graph'])) {
    return schemaMarkup['@graph'].flatMap((entry) => getRootSchemaEntries(entry));
  }
  return [schemaMarkup];
}

function getAdditionalSchemaEntries(schemaMarkup, webPageId) {
  const roots = getRootSchemaEntries(schemaMarkup);

  return roots
    .filter((entry) => entry && typeof entry === 'object' && !isWebPageSchema(entry))
    .map((entry) => {
      const { '@context': _context, ...schema } = entry;
      return replaceNestedWebPageDefinitions(schema, webPageId);
    });
}

function uniqueSchemaEntries(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    const key = entry?.['@id'] || JSON.stringify(entry);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeRouteSchemas(html, route, schemaMarkup) {
  const rootSchemas = getRootSchemaEntries(schemaMarkup);
  const needsWebPage = isIndexableRoute(route) || rootSchemas.some(isWebPageSchema);
  const webPageSchema = needsWebPage ? createRouteWebPageSchema(route) : null;
  const webPageId = `${route.canonical}#webpage`;
  const additionalSchemas = getAdditionalSchemaEntries(schemaMarkup, webPageId);
  let merged = false;

  const nextHtml = html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (script, json) => {
      if (merged) return script;

      try {
        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed['@graph'])) return script;
        if (!parsed['@graph'].some((entry) => entry?.['@id'] === WEBSITE_ID)) return script;

        const baseSchemas = parsed['@graph'].filter((entry) => !isWebPageSchema(entry));
        parsed['@graph'] = uniqueSchemaEntries([
          ...baseSchemas,
          ...(webPageSchema ? [webPageSchema] : []),
          ...additionalSchemas,
        ]);
        merged = true;
        return `<script type="application/ld+json">${JSON.stringify(parsed)}</script>`;
      } catch {
        return script;
      }
    },
  );

  if (!merged) {
    throw new Error(`SEO: Basis-JSON-LD-Graph fehlt für ${route.path}`);
  }

  return nextHtml;
}

function getBlogSlug(routePath) {
  const match = routePath.match(/^\/blog\/([^/]+)$/);
  return match ? match[1] : null;
}

function stripScripts(html = '') {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

function stripLeadingArticleHeading(html = '') {
  return html
    .replace(/^(\s*<article\b[^>]*>\s*)<h1[^>]*>[\s\S]*?<\/h1>/i, '$1')
    .replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/i, '');
}

function stripHtml(html = '') {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&euro;/g, '€')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr));
}

function createStaticBlogArticleHtml(article) {
  const safeContent = stripScripts(stripLeadingArticleHeading(article.content_html || ''));
  const published = formatDate(article.published_at);
  const meta = [
    article.author || 'Healio Redaktion',
    published,
    article.reading_time_minutes ? `${article.reading_time_minutes} Min. Lesezeit` : '',
  ].filter(Boolean).join(' · ');

  return `
    <article class="pt-32 pb-20" data-static-blog-article>
      <header class="max-w-3xl mx-auto px-4 mb-12">
        <p class="text-sm font-medium text-[#25c990] mb-4">Healio Ratgeber</p>
        <h1 class="text-3xl md:text-4xl font-bold text-[#464f5d] mb-4 leading-tight">${escapeHtml(article.title || 'Healio Ratgeber')}</h1>
        <p class="text-sm text-gray-500">${escapeHtml(meta)}</p>
      </header>
      <div class="max-w-3xl mx-auto px-4">
        <div class="prose prose-lg max-w-none">${safeContent}</div>
      </div>
    </article>
  `;
}

function extractFaqSchema(article) {
  const html = article.content_html || '';
  const faqStart = html.search(/<h2[^>]*>\s*Häufige Fragen/i);
  if (faqStart === -1) return null;

  const afterFaqHeading = html.slice(faqStart);
  const headingEnd = afterFaqHeading.search(/<\/h2>/i);
  if (headingEnd === -1) return null;

  const faqBody = afterFaqHeading.slice(headingEnd + 5);
  const nextHeadingIndex = faqBody.search(/<h2[^>]*>/i);
  const faqSection = nextHeadingIndex === -1 ? faqBody : faqBody.slice(0, nextHeadingIndex);
  const questions = [];
  const questionRegex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;

  while ((match = questionRegex.exec(faqSection)) !== null) {
    const name = stripHtml(match[1]);
    const text = stripHtml(match[2]);
    if (name && text) {
      questions.push({
        '@type': 'Question',
        name,
        acceptedAnswer: {
          '@type': 'Answer',
          text,
        },
      });
    }
  }

  if (!questions.length) return null;

  return {
    '@type': 'FAQPage',
    mainEntity: questions,
  };
}

function createBlogArticleSchema(article, route) {
  const graph = [
    {
      '@type': 'Article',
      mainEntityOfPage: {
        '@id': `${route.canonical}#webpage`,
      },
      headline: article.title || route.title,
      description: article.meta_description || route.description,
      datePublished: article.published_at,
      dateModified: article.updated_at || article.published_at,
      author: {
        '@type': 'Organization',
        name: 'Healio GmbH',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Healio GmbH',
        url: 'https://healio.de',
        logo: {
          '@type': 'ImageObject',
          url: 'https://healio.de/favicon.png',
        },
      },
    },
  ];

  const faqSchema = extractFaqSchema(article);
  if (faqSchema) graph.push(faqSchema);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

async function fetchArticle(slug) {
  try {
    const response = await fetch(`${articleApiBase}/api/v1/content/articles?slug=${encodeURIComponent(slug)}`, {
      headers: { accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.article || null;
  } catch (error) {
    console.warn(`SEO: Blogartikel "${slug}" konnte nicht vorgeladen werden: ${error.message}`);
    return null;
  }
}

async function loadBlogArticles() {
  const slugs = [...new Set(seoRoutes.map((route) => getBlogSlug(route.path)).filter(Boolean))];
  const entries = await Promise.all(slugs.map(async (slug) => [slug, await fetchArticle(slug)]));
  return new Map(entries.filter(([, article]) => article));
}

function generateHtml(route, article = null) {
  let html = template;
  const e = escapeHtml;

  // Title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${e(route.title)}</title>`
  );

  // Meta Description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${e(route.description)}">`
  );

  // Robots
  const robotsTag = `<meta name="robots" content="${e(route.robots || 'index, follow')}">`;
  if (/<meta name="robots" content="[^"]*">/.test(html)) {
    html = html.replace(/<meta name="robots" content="[^"]*">/, robotsTag);
  } else {
    html = html.replace(
      /(<meta name="description" content="[^"]*">)/,
      `$1\n    ${robotsTag}`
    );
  }

  // Keywords: Google ignoriert dieses Tag, aber wenn es vorhanden ist,
  // darf es keine seitenfremden Root-Keywords auf Unterseiten vererben.
  const keywordsRegex = /<meta name="keywords" content="[^"]*">\n?/;
  if (route.keywords) {
    const keywordsTag = `<meta name="keywords" content="${e(route.keywords)}">`;
    if (keywordsRegex.test(html)) {
      html = html.replace(keywordsRegex, `${keywordsTag}\n`);
    } else {
      html = html.replace(
        /(<meta name="robots" content="[^"]*">)/,
        `$1\n    ${keywordsTag}`
      );
    }
  } else {
    html = html.replace(keywordsRegex, '');
  }

  // Canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*"(?: data-react-helmet="true")?>/,
    `<link rel="canonical" href="${e(route.canonical)}" data-react-helmet="true">`
  );

  // Open Graph Tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${e(route.title)}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${e(route.description)}">`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${e(route.canonical)}">`
  );
  html = html.replace(
    /<meta property="og:locale" content="[^"]*">/,
    `<meta property="og:locale" content="${route.lang === 'de' ? 'de_DE' : 'en_US'}">`
  );
  if (route.ogImage) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*">/,
      `<meta property="og:image" content="${e(route.ogImage)}">`
    );
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*">/,
      `<meta name="twitter:image" content="${e(route.ogImage)}">`
    );
  }
  if (route.ogImageWidth) {
    html = html.replace(
      /<meta property="og:image:width" content="[^"]*">/,
      `<meta property="og:image:width" content="${e(String(route.ogImageWidth))}">`
    );
  }
  if (route.ogImageHeight) {
    html = html.replace(
      /<meta property="og:image:height" content="[^"]*">/,
      `<meta property="og:image:height" content="${e(String(route.ogImageHeight))}">`
    );
  }
  if (route.ogImageAlt) {
    const ogImageAltTag = `<meta property="og:image:alt" content="${e(route.ogImageAlt)}">`;
    if (/<meta property="og:image:alt" content="[^"]*">/.test(html)) {
      html = html.replace(/<meta property="og:image:alt" content="[^"]*">/, ogImageAltTag);
    } else {
      html = html.replace(/(<meta property="og:image" content="[^"]*">)/, `$1\n    ${ogImageAltTag}`);
    }

    const twitterImageAltTag = `<meta name="twitter:image:alt" content="${e(route.ogImageAlt)}">`;
    if (/<meta name="twitter:image:alt" content="[^"]*">/.test(html)) {
      html = html.replace(/<meta name="twitter:image:alt" content="[^"]*">/, twitterImageAltTag);
    } else {
      html = html.replace(/(<meta name="twitter:image" content="[^"]*">)/, `$1\n    ${twitterImageAltTag}`);
    }
  }

  // Twitter Tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${e(route.title)}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${e(route.description)}">`
  );

  // HTML lang Attribut
  html = html.replace(
    /<html lang="[^"]*">/,
    `<html lang="${route.lang}">`
  );

  // hreflang Tags einfügen (vor </head>)
  if (route.hreflang) {
    const hreflangTags = Object.entries(route.hreflang)
      .map(([lang, url]) => `    <link rel="alternate" hreflang="${lang}" href="${e(url)}" />`)
      .join('\n');
    const xDefault = `    <link rel="alternate" hreflang="x-default" href="${e(route.hreflang.de || route.canonical)}" />`;

    html = html.replace(
      '</head>',
      `${hreflangTags}\n${xDefault}\n  </head>`
    );
  }

  if (article) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${createStaticBlogArticleHtml(article)}</div>`
    );
  }

  // Ein kanonischer WebPage-Knoten pro indexierbarer Route. Weitere
  // Route-Schemas (z. B. FAQ, Service oder Article) werden in denselben
  // Basis-Graph übernommen, ohne zusätzliche WebPage-Definitionen zu erben.
  const schemaMarkup = route.schemaMarkup || (article ? createBlogArticleSchema(article, route) : null);
  html = mergeRouteSchemas(html, route, schemaMarkup);

  return html;
}

// Für jede Route eine eigene HTML-Datei erzeugen
let count = 0;
const blogArticles = await loadBlogArticles();

for (const route of seoRoutes) {
  const slug = getBlogSlug(route.path);
  const html = generateHtml(route, slug ? blogArticles.get(slug) : null);

  if (route.path === '/') {
    // Root-Route: dist/index.html überschreiben
    fs.writeFileSync(templatePath, html);
  } else {
    // Unterseiten: dist/[route]/index.html erstellen
    const routeDir = path.join(distDir, route.path);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  }

  count++;
}

// 404-Fallback erzeugen.
//
// Unbekannte URLs liefen bisher ueber den Vercel-Catch-all auf die
// Startseiten-HTML. Damit sah Googlebot fuer jede Tippfehler- oder Alt-URL
// 200 OK + <link rel="canonical" href="https://healio.de"> und meldete sie
// als "Alternative Seite mit richtigem kanonischen Tag".
//
// Diese Seite bekommt deshalb bewusst KEIN Canonical (sonst zeigt sie wieder
// auf die Startseite) und ein hartes noindex. Die SPA laedt normal weiter und
// rendert die NotFoundPage, damit alte Links aus Flyern und QR-Codes weiter
// auf einer bedienbaren Seite mit Navigation landen.
{
  let notFound = template;
  notFound = notFound.replace(
    /<title>[^<]*<\/title>/,
    '<title>Seite nicht gefunden | Healio</title>'
  );
  notFound = notFound.replace(
    /<meta name="description" content="[^"]*">/,
    '<meta name="description" content="Diese Seite existiert nicht oder wurde verschoben.">'
  );
  const robotsTag = '<meta name="robots" content="noindex, follow">';
  if (/<meta name="robots" content="[^"]*">/.test(notFound)) {
    notFound = notFound.replace(/<meta name="robots" content="[^"]*">/, robotsTag);
  } else {
    notFound = notFound.replace(
      /(<meta name="description" content="[^"]*">)/,
      `$1\n    ${robotsTag}`
    );
  }
  // Canonical und hreflang entfernen: eine 404-Seite darf auf nichts zeigen.
  notFound = notFound.replace(/\s*<link rel="canonical" href="[^"]*"(?: data-react-helmet="true")?>/g, '');
  notFound = notFound.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/g, '');
  notFound = notFound.replace(/<meta name="keywords" content="[^"]*">\n?/, '');
  fs.writeFileSync(path.join(distDir, '404.html'), notFound);
}

console.log(`SEO: ${count} Seiten mit individuellen Meta-Tags generiert. ${blogArticles.size} Blogartikel statisch vorgeladen. 404-Fallback erzeugt.`);
