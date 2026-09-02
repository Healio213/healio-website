import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoRoutes } from './seo-routes.mjs';
import {
  BLOG_EDITORIAL_FIX_SLUGS,
  applyBlogEditorialFixes,
} from '../src/lib/blogEditorialFixes.js';
import {
  BLOG_ARTICLE_IMAGES,
  BLOG_RELATED_LINK_SLUGS,
  BLOG_SCHEMA_FALLBACK_IMAGE,
  createBlogArticleSchema,
  getBlogRelatedLinks,
} from '../src/lib/blogSeo.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cachePath = path.join(rootDir, 'public', 'data', 'blog-articles-cache.json');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
const rawArticles = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
const articles = rawArticles.map(applyBlogEditorialFixes);
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const articleBySlug = new Map(articles.map((article) => [article.slug, article]));
const routePaths = new Set(seoRoutes.map((route) => route.path));

assert.equal(articles.length, 15, 'Der geprüfte Blog-Cache muss 15 Artikel enthalten.');
assert.equal(BLOG_RELATED_LINK_SLUGS.length, articles.length, 'Für jeden Artikel muss eine Linkgruppe gepflegt sein.');
assert.doesNotMatch(
  JSON.stringify(rawArticles),
  /15\.000 Patienten|\b0-Euro|1\.100 ?(?:EUR|€)|IKK Classic Gesundheitskonto|Keine Wartezeiten bei allen Tarifen|Versicherungsschutz beginnt sofort|jederzeit geändert oder gestrichen|ohne Sie als Heilpraktiker zu belasten|Ein typisches Beispiel aus der Praxis|Migräne benötigt acht bis zehn|Beschwerden kehren zurück|Therapieerfolge bleiben aus|Praxis verliert Umsatz|Planbare Einnahmen|Weniger Terminausfälle|Unvollständige Heilungsprozesse|Reduzierte Praxiseinnahmen|\+49-(?:XXX|40-123456789)/i,
  'Der öffentlich erreichbare Rohcache enthält eine veraltete Aussage oder Platzhalter-Kontaktdaten.',
);
assert.doesNotMatch(
  JSON.stringify(rawArticles),
  /Nur Ärzte mit Kassenzulassung|Die GKV arbeitet nur mit Vertragsärzten|Wie viel Erstattung bietet Healio|Rechnungsdiskussionen überflüssig|Warum die GKV keine Heilpraktiker-Kosten übernimmt|Warum die GKV bei Heilpraktikern nicht zahlt|Warum zahlt die GKV keine Heilpraktiker-Kosten|(?:kann|können).{0,120}möglich sein|Patient erfüllt Bonuskriterien für gesundes Leben|SDK erstattet bis zu 3\.000 EUR Gesundheitsbudget/i,
  'Der öffentlich erreichbare Rohcache enthält eine fachlich falsche oder missverständliche SEO-Aussage.',
);

for (const article of articles) {
  const canonicalUrl = `https://healio.de/blog/${article.slug}`;
  const schema = createBlogArticleSchema(article, canonicalUrl);
  const sourceSchema = article.structured_data?.article || {};
  const sourceMainEntity = typeof sourceSchema.mainEntityOfPage === 'string'
    ? sourceSchema.mainEntityOfPage
    : sourceSchema.mainEntityOfPage?.['@id'];
  const published = Date.parse(schema.datePublished);
  const modified = Date.parse(schema.dateModified);

  assert.ok(Number.isFinite(published), `${article.slug}: datePublished fehlt oder ist ungültig.`);
  assert.ok(Number.isFinite(modified), `${article.slug}: dateModified fehlt oder ist ungültig.`);
  assert.ok(modified >= published, `${article.slug}: dateModified liegt vor datePublished.`);
  assert.equal(schema.mainEntityOfPage['@id'], `${canonicalUrl}#webpage`);
  if (sourceSchema.datePublished) {
    assert.equal(
      String(sourceSchema.datePublished).slice(0, 10),
      String(article.published_at).slice(0, 10),
      `${article.slug}: Rohdaten enthalten ein widersprüchliches Veröffentlichungsdatum.`,
    );
  }
  if (sourceMainEntity) {
    assert.ok(
      sourceMainEntity.includes(`/blog/${article.slug}`),
      `${article.slug}: Rohdaten verweisen auf eine andere Artikel-URL.`,
    );
  }
  assert.match(schema.image, /^https:\/\//, `${article.slug}: Article.image muss absolut und crawlbar sein.`);
  assert.equal(
    schema.image,
    BLOG_ARTICLE_IMAGES[article.slug],
    `${article.slug}: Article.image muss thematisch zum bestehenden Artikel gepflegt sein.`,
  );
  assert.notEqual(schema.image, BLOG_SCHEMA_FALLBACK_IMAGE, `${article.slug}: generisches Fallback-Bild ist nicht ausreichend.`);
  const imagePath = new URL(schema.image).pathname.replace(/^\//, '');
  assert.ok(
    fs.existsSync(path.join(rootDir, 'public', imagePath)),
    `${article.slug}: lokale Bilddatei fehlt: ${imagePath}`,
  );

  const links = getBlogRelatedLinks(article.slug);
  assert.equal(links.length, 3, `${article.slug}: Es werden genau drei kontextuelle Links erwartet.`);
  assert.equal(new Set(links.map((link) => link.href)).size, 3, `${article.slug}: Doppelte verwandte Links.`);
  for (const link of links) {
    assert.ok(routePaths.has(link.href), `${article.slug}: Zielroute fehlt: ${link.href}`);
    assert.notEqual(link.href, `/blog/${article.slug}`, `${article.slug}: Ein Artikel darf nicht auf sich selbst verlinken.`);
    assert.ok(link.label.length >= 18, `${article.slug}: Linktext ist nicht beschreibend genug.`);
  }
}

assert.ok(fs.existsSync(path.join(rootDir, 'public', 'og-image.png')), 'Das Schema-Fallback-Bild fehlt lokal.');
assert.equal(BLOG_SCHEMA_FALLBACK_IMAGE, 'https://healio.de/og-image.png');

function sitemapEntry(url) {
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = sitemap.match(new RegExp(`<url>\\s*<loc>${escapedUrl}<\\/loc>([\\s\\S]*?)<\\/url>`));
  assert.ok(match, `Sitemap-Eintrag fehlt: ${url}`);
  return match[1];
}

assert.match(sitemapEntry('https://healio.de/unternehmen'), /<lastmod>2026-09-01<\/lastmod>/);
assert.match(sitemapEntry('https://healio.de/blog'), /<lastmod>2026-09-02<\/lastmod>/);
assert.match(sitemapEntry('https://healio.de/blog'), /<changefreq>weekly<\/changefreq>/);
for (const article of articles) {
  assert.match(
    sitemapEntry(`https://healio.de/blog/${article.slug}`),
    /<lastmod>2026-09-02<\/lastmod>/,
    `${article.slug}: tatsächliche SEO-Änderung fehlt im statischen lastmod.`,
  );
}
assert.match(sitemapEntry('https://healio.de/'), /<lastmod>2026-08-30<\/lastmod>/);
assert.match(sitemapEntry('https://healio.de/en/blog'), /<lastmod>2026-08-30<\/lastmod>/);

for (const slug of BLOG_EDITORIAL_FIX_SLUGS) {
  const article = articleBySlug.get(slug);
  assert.ok(article, `Redaktionell korrigierter Artikel fehlt: ${slug}`);
  const corpus = [
    article.title,
    article.meta_description,
    article.excerpt,
    article.geo_section,
    article.content_html,
    JSON.stringify(article.structured_data),
  ].join('\n');
  const plainCorpus = corpus.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

  assert.match(corpus, /3\.000 EUR.{0,40}(?:in|über) 2 Jahren/s, `${slug}: 3.000-EUR-Kernaussage fehlt.`);
  assert.match(corpus, /bis zu 100 % reduzieren/, `${slug}: aktuelle Kassenbonus-Aussage fehlt.`);
  assert.doesNotMatch(plainCorpus, /15\.000 Patienten/i, `${slug}: unbelegte Patientenzahl ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /\b0(?:-| )Euro|\b0€|1\.100 ?€|1\.100 EUR/i, `${slug}: veraltete Geldbotschaft ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /Bonus.{0,80}(?:finanziert|deckt).{0,80}(?:vollständig|komplett)/is, `${slug}: pauschales Bonusversprechen ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /(?:Über |durchschnittlich )?40\s*%|durchschnittlich 30\s*%|15\s*[-–]\s*20 (?:Anrufe|pro Tag)/i, `${slug}: unbelegte Praxisstatistik ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /90\s*%.{0,60}(?:komplette|vollständige) Behandlungsserie/is, `${slug}: unbelegte Abschlussquote ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /staatlich geförderte Gesundheitsbudgets/i, `${slug}: unzutreffende Förderaussage ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /(?:alle|über 400).{0,80}(?:Naturheil)?verfahren.{0,80}(?:versichert|abgedeckt)|gesamte Behandlungspalette ist versichert/is, `${slug}: pauschales Leistungsversprechen ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /(?:Bonus|Zuschuss).{0,40}steuerfrei|steuerfrei.{0,40}(?:Bonus|Zuschuss)/is, `${slug}: pauschale Steueraussage ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /50 EUR (?:Provision|pro Vermittlung)|500 EUR zusätzliches Einkommen|Passives Einkommen durch Patientenempfehlungen/i, `${slug}: widersprüchliche Provisionsaussage ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /Studien zeigen|Laut einer Studie der Deutschen Heilpraktikerverbände/i, `${slug}: unbelegte Studienreferenz ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /(?:60-120|40-80|400-800|100-300|200-500|30-50) EUR/i, `${slug}: unbelegte oder veraltete Kostenbandbreite ist noch enthalten.`);
  assert.doesNotMatch(plainCorpus, /komplette Behandlung durchziehen/i, `${slug}: pauschales Behandlungsergebnis ist noch enthalten.`);
  assert.doesNotMatch(
    plainCorpus,
    /IKK Classic Gesundheitskonto|Ohne Aufwand|Keine Haftung oder Verantwortung|brechen Therapien nicht mehr|eliminiert Rückfragen|Zufriedenere Patienten|Positive Mundpropaganda|Höhere Behandlungsfrequenz|alle administrativen Prozesse/i,
    `${slug}: weitere pauschale oder falsche Altsaussage ist noch enthalten.`,
  );
  assert.doesNotMatch(
    plainCorpus,
    /jederzeit geändert oder gestrichen|ohne Sie als Heilpraktiker zu belasten|Ein typisches Beispiel aus der Praxis|Migräne benötigt acht bis zehn|Beschwerden kehren zurück|Therapieerfolge bleiben aus|Praxis verliert Umsatz|Planbare Einnahmen|Weniger Terminausfälle|Unvollständige Heilungsprozesse|Reduzierte Praxiseinnahmen|ändern sich die Gespräche in Ihrer Praxis grundlegend|Mehr Zeit für Heilung, weniger Verwaltungsaufwand|Warum Patienten Heilpraktiker-Behandlungen abbrechen|Warum Patienten Behandlungen vorzeitig beenden|\(empfohlen\)|IKK Classic zahlt über 700 Euro/i,
    `${slug}: pauschale Änderungs- oder Entlastungsaussage ist noch enthalten.`,
  );
  assert.doesNotMatch(
    plainCorpus,
    /Keine Wartezeiten bei allen Tarifen|Versicherungsschutz beginnt sofort|sofort nach Vertragsabschluss versichert|ab dem ersten Tag versichert|Sofort nach Vertragsabschluss\. Es gibt keine Wartezeit|Sofortiger Versicherungsschutz ohne Wartezeiten/i,
    `${slug}: pauschales Sofortschutzversprechen ist noch enthalten.`,
  );
  assert.doesNotMatch(
    plainCorpus,
    /GKV übernimmt Heilpraktiker-Kosten grundsätzlich nicht.{0,80}egal ob|Einzige Ausnahme.{0,100}Psychotherapie durch Heilpraktiker/i,
    `${slug}: pauschale GKV- oder Tarifaussage ist noch enthalten.`,
  );
  assert.doesNotMatch(
    plainCorpus,
    /Nur Ärzte mit Kassenzulassung|Die GKV arbeitet nur mit Vertragsärzten|Wie viel Erstattung bietet Healio|Rechnungsdiskussionen überflüssig|Warum die GKV keine Heilpraktiker-Kosten übernimmt|Warum die GKV bei Heilpraktikern nicht zahlt|Warum zahlt die GKV keine Heilpraktiker-Kosten|(?:kann|können).{0,120}möglich sein|Patient erfüllt Bonuskriterien für gesundes Leben|SDK erstattet bis zu 3\.000 EUR Gesundheitsbudget/i,
    `${slug}: fachlich falsche oder missverständliche SEO-Aussage ist noch enthalten.`,
  );
}

console.log('check-blog-seo-contract: OK');
