import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import { getBlogAuthor, getBlogFaqSchema, createBlogArticleSchema } from '../src/lib/blogSeo.js';
import { getEditorialTransparency, createEditorialTransparencyHtml } from '../src/content/editorialTransparency.js';
import { ratgeberArticles } from './lib/ratgeber-articles.mjs';
import { getAuthor } from '../src/content/ratgeber/authors.js';

// Ein widersprüchlicher CMS-Schemaknoten darf einem Redaktionstext keine
// persönliche Autorenschaft oder Qualifikation zuschreiben.
const mismatch = { author: 'Healio Redaktion', structured_data: { article: { author: { '@type': 'Person', name: 'Frank Steinfurt' } } } };
assert.equal(getBlogAuthor(mismatch)['@type'], 'Organization');
assert.equal(getBlogAuthor(mismatch).name, 'Healio Redaktion');
assert.equal(getBlogAuthor({ author: 'Frank Steinfurt' })['@id'], 'https://healio.de/#frank_steinfurt');
assert.deepEqual(getBlogAuthor({ author: 'Gastautor' }), { '@type': 'Person', name: 'Gastautor' });
assert.equal(getBlogAuthor({}).name, 'Healio Redaktion');
assert(!createEditorialTransparencyHtml('<img src=x onerror=alert(1)>').includes('<img'));

const faqArticle = {
  content_html: '<h2>Häufige Fragen</h2><h3>Wird alles erstattet?</h3><p>Nur laut Tarif &amp; Bedingungen.</p><h2>Weiterlesen</h2><h3>Kein FAQ</h3><p>Nicht auszeichnen.</p>',
  structured_data: { faq: { mainEntity: [{ name: 'Veraltete Behauptung' }] } },
};
const faq = getBlogFaqSchema(faqArticle);
assert.equal(faq['@context'], 'https://schema.org', 'Das eigenständige Runtime-FAQ braucht seinen eigenen Kontext.');
assert.equal(faq.mainEntity.length, 1);
assert.equal(faq.mainEntity[0].acceptedAnswer.text, 'Nur laut Tarif & Bedingungen.');
assert.equal(getBlogFaqSchema({ content_html: '<p>Ohne sichtbare FAQ.</p>', structured_data: faqArticle.structured_data }), null);

const articles = JSON.parse(fs.readFileSync('public/data/blog-articles-cache.json', 'utf8'));
for (const article of articles) {
  assert.equal(createBlogArticleSchema(article, `https://healio.de/blog/${article.slug}`).author.name, getBlogAuthor(article).name);
}

if (!process.argv.includes('--source-only')) {
  let checked = 0;
  // Englische Blog-URLs leiten in vercel.json auf die deutschen Originale.
  // Die englischen Texte werden separat geprüft, ohne neue Doppelrouten zu erzeugen.
  assert(createEditorialTransparencyHtml('Healio Redaktion', 'en').includes('/en/initial-information'));
  for (const lang of ['de']) {
    const copy = getEditorialTransparency(lang);
    for (const article of articles) {
      const file = `dist/${lang === 'en' ? 'en/' : ''}blog/${article.slug}/index.html`;
      const dom = new JSDOM(fs.readFileSync(file, 'utf8'));
      const { document } = dom.window;
      const box = document.querySelector('[data-editorial-transparency]');
      assert(box, `${file}: Transparenz fehlt im HTML ohne JavaScript.`);
      for (const text of copy.paragraphs) assert(box.textContent.includes(text), `${file}: fachliche Grenze oder Vergütung fehlt.`);
      for (const link of copy.links) assert(box.querySelector(`a[href="${link.href}"]`), `${file}: Beleglink ${link.href} fehlt.`);
      assert(box.textContent.includes(getBlogAuthor(article).name));
      const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => JSON.parse(node.textContent));
      const graph = schemas.flatMap((schema) => schema['@graph'] || [schema]);
      const schemaArticle = graph.find((schema) => schema['@type'] === 'Article');
      assert.equal(schemaArticle?.author?.name, getBlogAuthor(article).name, `${file}: Schema und sichtbarer Autor weichen ab.`);
      assert.equal(schemaArticle.publisher['@id'], 'https://healio.de/#organization');
      const org = graph.find((schema) => schema['@id'] === 'https://healio.de/#organization');
      assert.equal(org.identifier.value, 'D-C1LE-OVLQH-98');
      assert.equal(org.publishingPrinciples, 'https://healio.de/about#redaktion');
      checked += 1;
      dom.window.close();
    }
  }
  console.log(`Autoren, Verantwortung und Registerlinks: ${checked} statische Blogrouten geprüft.`);
  for (const article of ratgeberArticles) {
    const html = fs.readFileSync(`dist/ratgeber/${article.slug}/index.html`, 'utf8');
    if (getAuthor(article.author)) {
      assert(html.includes('data-ratgeber-author="' + article.author + '"'), `${article.slug}: Autorenkasten fehlt.`);
      assert(html.includes('Redaktion und fachliche Grenzen'), `${article.slug}: Redaktionslink fehlt.`);
    } else {
      assert(html.includes('data-editorial-transparency'), `${article.slug}: Verantwortung bei fehlender Personenautorenschaft fehlt.`);
      assert(html.includes('Autor: ') && html.includes('Healio GmbH'), `${article.slug}: Organisationsautor fehlt.`);
    }
  }
  console.log(`Autorenschaft oder Organisationsverantwortung: ${ratgeberArticles.length} Ratgeber geprüft.`);
}
console.log('Autorenzuordnung, Escaping und FAQ aus sichtbarem Inhalt: OK.');
