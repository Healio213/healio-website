import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { buildSync } from 'esbuild';
import { JSDOM } from 'jsdom';
const page = fs.readFileSync(new URL('../src/pages/KassenBoostBridgePage.jsx', import.meta.url), 'utf8');
assert.match(page, /href="#schutz"/);
assert.match(page, /id="schutz"/);
assert.match(page, /to=\{getPath\(area.routeKey\)\}/);
assert.match(page, /createFAQSchema\(faqItems\)/);
assert.match(page, /faqItems.map/);
assert.match(page, /<details/);
assert.match(page, /<AppointmentBooking placement="kassenboost_bridge"/);
assert.doesNotMatch(page, /calendly\.com/);
assert.match(page, /id="kassenboost-explainer"/);
assert.match(page, /explainer\.items/);
assert.match(page, /paths\.compare\.cta/);
assert.match(page, /paths\.advice\.cta/);
assert.match(page, /href="#termin"/);
assert.ok(page.indexOf('id="kassenboost-explainer"') < page.indexOf('aria-labelledby="kassenboost-bonus-heading"'), 'Die Drei-Sätze-Erklärung steht vor dem Kostenbeispiel.');
assert.ok(page.indexOf('aria-labelledby="kassenboost-bonus-heading"') < page.indexOf('aria-labelledby="kassenboost-paths-heading"'), 'Das Kostenbeispiel steht vor der Weg-Auswahl.');
assert.ok(page.indexOf('aria-labelledby="kassenboost-paths-heading"') < page.indexOf('id="schutz"'), 'Die Weg-Auswahl steht vor den Schutzbereichen.');
for (const language of ['de', 'en']) {
  const copy = JSON.parse(fs.readFileSync(new URL(`../src/i18n/locales/${language}/kassenboost.json`, import.meta.url), 'utf8'));
  assert.deepEqual(copy.protection.items.map(item => item.routeKey), ['ambulant', 'zahn', 'stationaer']);
  assert.equal(copy.faq.items.length, 4);
  assert.match(copy.termin.description, /45/);
  assert.match(copy.termin.description, /Google Meet/);
  assert.match(copy.bonus.example, /100 EUR/);
  assert.match(copy.bonus.example, /300 EUR/);
  assert.match(copy.bonus.example, /25 EUR/);
  assert.doesNotMatch(copy.hero.title, /Check ist gemacht|check is done/);
  assert.equal(copy.explainer.items.length, 3);
  assert.ok(copy.explainer.items.every(item => item.label && item.text));
  assert.ok(copy.paths.compare.cta && copy.paths.advice.cta && copy.paths.compare.note);
  assert.match(copy.paths.advice.description, /45/);
  assert.doesNotMatch(JSON.stringify(copy.hero) + JSON.stringify(copy.explainer) + JSON.stringify(copy.paths), /[\u2013\u2014]/);
  assert.doesNotMatch(copy.bonus.description, /dreifach|triple/);
  assert.doesNotMatch(copy.protection.description, /3[.,]000/);
  for (const item of copy.protection.items) {
    assert.ok(item.cta && item.image);
    assert.ok(fs.existsSync(new URL(`../public${item.image}`, import.meta.url)));
    if (item.routeKey !== 'ambulant') assert.doesNotMatch(item.description, /3[.,]000/);
  }
}
console.log('Bridge conversion contract passed.');

const dom = new JSDOM('<div id="root"></div>', { url: 'https://healio.de/kassenboost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, CustomEvent: dom.window.CustomEvent, IS_REACT_ACT_ENVIRONMENT: true });
const bundle = buildSync({
  stdin: { contents: `
    import React, { act } from 'react';
    import { createRoot } from 'react-dom/client';
    import { MemoryRouter } from 'react-router-dom';
    import { I18nextProvider } from 'react-i18next';
    import i18next from 'i18next';
    import Page from './src/pages/KassenBoostBridgePage.jsx';
    import de from './src/i18n/locales/de/kassenboost.json';
    import en from './src/i18n/locales/en/kassenboost.json';
    export { act };
    export async function mount(container, lang) {
      const i18n = i18next.createInstance();
      await i18n.init({ lng: lang, fallbackLng: 'de', resources: { de: { kassenboost: de }, en: { kassenboost: en } }, interpolation: { escapeValue: false } });
      const root = createRoot(container);
      root.render(<I18nextProvider i18n={i18n}><MemoryRouter initialEntries={[lang === 'de' ? '/kassenboost' : '/en/kassenboost']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Page /></MemoryRouter></I18nextProvider>);
      return root;
    }
  `, resolveDir: process.cwd(), loader: 'jsx' },
  alias: { '@': `${process.cwd()}/src` }, external: ['react', 'react-dom/*', 'react-router-dom'],
  bundle: true, format: 'cjs', platform: 'node', write: false,
});
const module = { exports: {} };
new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
const { act, mount } = module.exports;
try {
  for (const lang of ['de', 'en']) {
    let root;
    await act(async () => { root = await mount(document.getElementById('root'), lang); });
    const paths = lang === 'de' ? ['/ambulant', '/zahn', '/stationaer'] : ['/en/outpatient', '/en/dental', '/en/inpatient'];
    assert.equal(document.querySelector('article a').getAttribute('href'), '#schutz');
    const cards = [...document.querySelectorAll('#schutz a')].filter(a => a.querySelector('h3'));
    assert.deepEqual(cards.map(a => a.getAttribute('href')), paths);
    const questions = [...document.querySelectorAll('[aria-labelledby="kassenboost-faq-heading"] details')];
    assert.equal(questions.length, 4);
    // Helmet defers head updates by one animation frame.
    await act(() => new Promise(resolve => setTimeout(resolve, 30)));
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => JSON.parse(el.textContent));
    const faq = schemas.find(schema => schema['@type'] === 'FAQPage');
    assert.ok(faq, 'Rendered FAQ schema must exist.');
    assert.deepEqual(faq.mainEntity.map(q => [q.name, q.acceptedAnswer.text]), questions.map(el => [el.querySelector('summary').textContent, el.querySelector('p').textContent]));
    assert.equal(document.querySelector('iframe'), null, 'Optional booking must stay behind consent.');
    assert.equal(document.querySelectorAll('#kassenboost-explainer li').length, 3);
    assert.equal([...document.querySelectorAll('article a')].filter(a => a.getAttribute('href') === '#termin').length, 1);
    assert.match(document.querySelector('#termin').textContent, /45.*Google Meet/);
    await act(() => root.unmount());
  }
  console.log('Bridge DE/EN render verified: localized destinations, visible FAQ/schema parity, optional consent-gated Google booking.');
} finally { dom.window.close(); }
