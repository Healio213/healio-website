import assert from 'node:assert/strict';
import fs from 'node:fs';
import { altersvorsorgeArticles, altersvorsorgeClusters, ALTERSVORSORGE_HUB_PATH } from '../src/content/ratgeber/altersvorsorge/index.js';
import { RATGEBER_GROUPS, ratgeberArticles, validateRatgeberSources } from './lib/ratgeber-articles.mjs';
import { RATGEBER_ENTRIES } from '../src/content/ratgeber/registry.js';
import { RATGEBER_LOADERS } from '../src/content/ratgeber/registry.loaders.js';
import { getAltersvorsorgeRelatedTitle } from '../src/content/ratgeber/altersvorsorge/related.js';
import { seoRoutes } from './seo-routes.mjs';
import { buildInternalRatgeberUrl } from '../src/lib/ratgeber-cta.js';
import { getArtikelCheckVoreinstellung, createArtikelCheckState, readArtikelCheckState } from '../src/lib/altersvorsorgeArtikelCheck.js';
import { berechneZulagen } from '../src/lib/altersvorsorgeZulagen.js';

const expectedSlugs = [
  'altersvorsorgedepot-was-ist-das', 'altersvorsorgedepot-ab-wann', 'altersvorsorgedepot-foerderung', 'altersvorsorgedepot-wer-ist-berechtigt',
  'riester-altersvorsorgedepot-wechsel', 'riester-kuendigen-oder-behalten', 'riester-jahresmitteilung-checkliste', 'riester-alte-oder-neue-foerderung',
  'altersvorsorgedepot-kinderzulage', 'altersvorsorgedepot-kinderzulage-elternteil', 'altersvorsorgedepot-teilzeit-elternzeit', 'altersvorsorgedepot-kindergeld-ende',
  'altersvorsorgedepot-selbststaendige', 'altersvorsorgedepot-schwankendes-einkommen', 'altersvorsorgedepot-heilpraktiker', 'altersvorsorgedepot-oder-ruerup',
  'altersvorsorgedepot-kosten', 'altersvorsorgedepot-garantie', 'altersvorsorgedepot-etf-sparplan', 'altersvorsorgedepot-steuern',
  'altersvorsorgedepot-geld-entnehmen', 'altersvorsorgedepot-auszahlung', 'altersvorsorgedepot-anbieterwechsel', 'altersvorsorgedepot-passt-das-zu-mir',
];
assert.deepEqual(altersvorsorgeArticles.map((article) => article.slug).sort(), [...expectedSlugs].sort());
assert.deepEqual(await validateRatgeberSources(), [], 'Register und Inhaltsdateien passen nicht zusammen');
assert.deepEqual(RATGEBER_GROUPS.find((group) => group.id === 'altersvorsorge')?.slugs, expectedSlugs, 'Die neue Gruppe muss alle 24 Artikel enthalten');
assert.equal(ratgeberArticles.length, 178, '154 bestehende und 24 neue Artikel müssen im Register bleiben');
assert.equal(new Set(ratgeberArticles.map((article) => article.slug)).size, ratgeberArticles.length, 'Doppelte Artikelroute');
const routeMap = new Map(seoRoutes.map((route) => [route.path, route]));
const sitemap = fs.readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const readText = (article) => [article.headline, article.lead, ...article.sections.flatMap((section) => [section.heading, ...section.blocks.flatMap((block) => [block.text, block.caption, block.note, ...(block.head || []), ...(block.rows || []).flat(), ...(block.items || []).map((item) => typeof item === 'string' ? item : `${item.lead} ${item.text}`)])]), ...article.faqs.flatMap((faq) => [faq.question, faq.answer])].filter(Boolean).join(' ');
const sourceHosts = new Set(['www.bundesregierung.de', 'dserver.bundestag.de', 'www.bundesfinanzministerium.de', 'riester.deutsche-rentenversicherung.de', 'rvrecht.deutsche-rentenversicherung.de', 'www.gesetze-im-internet.de', 'familienportal.de']);
const details = [];

for (const article of altersvorsorgeArticles) {
  const example = getArtikelCheckVoreinstellung(article);
  const state = createArtikelCheckState(article.slug, { ...example, email: 'darf-nicht-weitergehen', vertragsnummer: 'fremdes-zusatzfeld' });
  assert.deepEqual(readArtikelCheckState(state), { slug: article.slug, value: example }, `${article.slug}: Navigation verändert die Beispielrechnung oder übernimmt Zusatzfelder`);
  const text = readText(article);
  const words = (text.match(/[\p{L}\p{N}]+(?:[-.,][\p{L}\p{N}]+)*/gu) || []).length;
  assert.ok(words >= 550, `${article.slug}: Inhalt zu knapp (${words} Wörter)`);
  assert.ok(article.sections.length >= 4 && article.faqs.length >= 3, `${article.slug}: Erklärung oder Fragen fehlen`);
  assert.equal(new Set(article.sections.map((section) => section.id)).size, article.sections.length, `${article.slug}: Doppelte Sprungmarke`);
  assert.ok(article.sections.some((section) => section.blocks.some((block) => block.type === 'table')), `${article.slug}: Praktische Tabelle fehlt`);
  assert.ok(!/\b(kostenlos|gratis|umsonst|ohne Kosten)\b|EUR sichern|sicher abholen|Platz sichern|Versorgungswerk|[\u2013\u2014]/i.test(text), `${article.slug}: Textregel verletzt`);
  assert.equal(article.publishedAt, '2026-10-09', `${article.slug}: Veröffentlichung mit der Freigabe vom 9. Oktober`);
  assert.equal(article.updatedAt, '2026-10-09');
  assert.equal(article.contentStatus, 'published');
  assert.ok(altersvorsorgeClusters.some((cluster) => cluster.id === article.cluster));
  assert.equal(article.sources.checkedAt, '2026-10-08', `${article.slug}: Quellenstand darf nicht mit Veröffentlichung verwechselt werden`);
  assert.equal(article.sources.checkedAtLabel, '8. Oktober 2026');
  assert.ok(article.sources.items.length >= 1, `${article.slug}: Amtliche Quelle fehlt`);
  for (const source of article.sources.items) {
    assert.ok(source.label?.trim(), `${article.slug}: Quellenbeschriftung fehlt`);
    assert.ok(sourceHosts.has(new URL(source.href).hostname), `${article.slug}: Quelle außerhalb der amtlichen Grundlage`);
  }
  const entry = RATGEBER_ENTRIES.find((candidate) => candidate.slug === article.slug);
  assert.ok(entry && entry.group === 'altersvorsorge' && entry.cluster === article.cluster, `${article.slug}: Schlanke Hub-Metadaten fehlen`);
  assert.equal((await RATGEBER_LOADERS.get(article.slug)()).article, article, `${article.slug}: Einzelimport lädt den falschen Artikel`);
  assert.equal(getAltersvorsorgeRelatedTitle(article.slug), article.listTitle, `${article.slug}: Querverweis-Titel weicht vom Inhalt ab`);
  const sourceFile = fs.readFileSync(new URL(`../src/content/ratgeber/${article.slug}.js`, import.meta.url), 'utf8');
  assert.ok(/^export const article = makeAltersvorsorgeArticle\(/m.test(sourceFile), `${article.slug}: Eigene Inhaltsdatei fehlt`);
  assert.ok(!/from ['"]\.\/altersvorsorge\/(?:index|grundlagen-riester|familien-selbststaendige|entscheidung)/.test(sourceFile), `${article.slug}: Artikelseite darf keine Sammeldatei laden`);
  assert.ok(article.relatedSlugs.length >= 2);
  for (const related of article.relatedSlugs) {
    assert.ok(expectedSlugs.includes(related) && related !== article.slug, `${article.slug}: Toter oder eigener Querverweis ${related}`);
  }
  const url = new URL(buildInternalRatgeberUrl(article.internalCta.to, '?email=privat&fuer=fremd&monatsbeitrag=150&kinder=2&unter25=true', { utm_source: 'healio', utm_medium: 'ratgeber', utm_campaign: article.internalCta.utmCampaign }), 'https://healio.de');
  assert.equal(url.pathname, '/altersvorsorgedepot');
  assert.ok(['#webinar', '#zuschuss-check', '#rechner'].includes(url.hash));
  assert.equal(url.searchParams.get('fuer'), article.audience === 'standard' ? null : article.audience);
  assert.equal(url.searchParams.get('email'), null, 'Keine persönlichen Werte in Artikel-CTA übernehmen');
  for (const key of ['monatsbeitrag', 'kinder', 'unter25']) assert.equal(url.searchParams.get(key), null, 'Beispielwerte gehören nicht in die Zieladresse');
  assert.equal(url.searchParams.get('utm_campaign'), 'altersvorsorge-ratgeber');
  const route = routeMap.get(`/ratgeber/${article.slug}`);
  assert.ok(route && !/noindex/.test(route.robots || ''), `${article.slug}: SEO-Route fehlt oder gesperrt`);
  assert.equal(route.title, article.metaTitle);
  assert.equal(route.description, article.metaDescription);
  assert.ok(sitemap.includes(`<loc>https://healio.de/ratgeber/${article.slug}</loc>`));
  assert.ok(JSON.stringify(route.schemaMarkup).includes('"datePublished":"2026-10-09"'), `${article.slug}: Freigegebenes Veröffentlichungsdatum fehlt im Schema`);
  assert.ok(JSON.stringify(route.schemaMarkup).includes('"dateModified":"2026-10-09"'), `${article.slug}: Änderungsdatum fehlt im Schema`);
  details.push({ slug: article.slug, words });

  if (process.argv.includes('--built')) {
    const html = fs.readFileSync(new URL(`../dist/ratgeber/${article.slug}/index.html`, import.meta.url), 'utf8');
    assert.ok(html.includes('data-ratgeber-internal-cta="end"'), `${article.slug}: CTA nicht im ausgelieferten HTML`);
    assert.equal((html.match(/data-ratgeber-internal-cta=/g) || []).length, 1);
    assert.ok(html.includes('data-ratgeber-sources'));
    assert.ok(html.includes('8. Oktober 2026'), `${article.slug}: Quellenstand fehlt`);
    assert.ok(html.includes('data-altersvorsorge-artikel-check'), `${article.slug}: Interaktiver Check fehlt`);
    assert.ok(html.includes('Mit meiner Rechnung zum Zuschuss-Check'));
    assert.ok(html.includes('Passende Ratgeber zum Weiterlesen'));
    assert.ok(html.includes('"@type":"Article"'));
    assert.ok(!/<meta[^>]+name="robots"[^>]*noindex/.test(html));
    assert.ok(html.includes(`href="https://healio.de/ratgeber/${article.slug}"`));
  }
}
const exampleState = createArtikelCheckState('altersvorsorgedepot-kinderzulage', { monatsbeitrag: 25, kinder: 2, unter25: true });
const exampleResult = berechneZulagen(readArtikelCheckState(exampleState).value);
assert.equal(exampleResult.zulageJahr, 750);
assert.equal(exampleResult.startbonus, 200);
for (const patch of [{ monatsbeitrag: NaN }, { monatsbeitrag: Infinity }, { monatsbeitrag: '25' }, { monatsbeitrag: 0 }, { monatsbeitrag: 151 }, { kinder: 7 }, { kinder: 1.5 }, { unter25: 'true' }]) {
  assert.equal(readArtikelCheckState({ altersvorsorgeArtikelCheck: { slug: exampleState.altersvorsorgeArtikelCheck.slug, value: { ...exampleState.altersvorsorgeArtikelCheck.value, ...patch } } }), null, 'Ungültige Browserwerte dürfen nicht als Rechnung übernommen werden');
}
assert.equal(readArtikelCheckState(null), null);
assert.equal(readArtikelCheckState({ altersvorsorgeArtikelCheck: { ...exampleState.altersvorsorgeArtikelCheck, slug: 'https://fremdes-ziel.example' } }), null);
assert.ok(routeMap.has(ALTERSVORSORGE_HUB_PATH));
assert.ok(sitemap.includes(`<loc>https://healio.de${ALTERSVORSORGE_HUB_PATH}</loc>`));
const childAssignment = readText(altersvorsorgeArticles.find((article) => article.slug === 'altersvorsorgedepot-kinderzulage-elternteil'));
assert.ok(/2027/.test(childAssignment) && /2028/.test(childAssignment), 'Kinderzuordnung braucht getrennte Anwendungsjahre');
const selfEmployed = readText(altersvorsorgeArticles.find((article) => article.slug === 'altersvorsorgedepot-selbststaendige'));
assert.ok(/67/.test(selfEmployed) && /Steuererklärung/.test(selfEmployed), 'Selbstständigenberechtigung darf nicht allein aus der Berufsbezeichnung folgen');
if (process.argv.includes('--built')) {
  const html = fs.readFileSync(new URL(`../dist${ALTERSVORSORGE_HUB_PATH}/index.html`, import.meta.url), 'utf8');
  for (const slug of expectedSlugs) assert.ok(html.includes(`/ratgeber/${slug}`), `Artikel im ausgelieferten Hub nicht erreichbar: ${slug}`);
}
const total = details.reduce((sum, entry) => sum + entry.words, 0);
console.log(`24 Altersvorsorge-Ratgeber geprüft: ${total} Wörter, ${Math.min(...details.map((entry) => entry.words))}–${Math.max(...details.map((entry) => entry.words))} je Artikel; Quellen, Linkgraph, CTA, Textregeln, SEO und Publikationsstatus erfüllt${process.argv.includes('--built') ? ', auch im ausgelieferten HTML' : ''}.`);
