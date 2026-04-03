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

function generateHtml(route) {
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

  // Canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${e(route.canonical)}">`
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

  return html;
}

// Für jede Route eine eigene HTML-Datei erzeugen
let count = 0;

for (const route of seoRoutes) {
  const html = generateHtml(route);

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

console.log(`SEO: ${count} Seiten mit individuellen Meta-Tags generiert.`);
