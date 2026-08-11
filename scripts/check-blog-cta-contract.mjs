import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { getBlogArticleCta } from '../src/lib/blogArticleCta.js';

const knownGermanArticles = [
  {
    slug: 'krankenhauszusatzversicherung-sportverein-best-ager',
    targetGroup: 'endkunden',
    expected: { href: '/stationaer', copyKey: 'inpatient' },
  },
  {
    slug: 'zahnzusatzversicherung-trotz-angeratener-behandlung',
    targetGroup: 'endkunden',
    expected: { href: '/zahn#zahn-check', copyKey: 'dental' },
  },
  {
    slug: 'heilpraktiker-zusatzversicherung-vergleich-2026',
    targetGroup: 'endkunden',
    expected: { href: '/ambulant#tarif-tabelle', copyKey: 'outpatientComparison' },
  },
  {
    slug: 'gesundheitsbudget-3000-euro',
    targetGroup: 'endkunden',
    expected: { href: '/ambulant#bonus-calculator', copyKey: 'healthBudget' },
  },
  {
    slug: 'naturheilkunde-krankenkasse-2026',
    targetGroup: 'endkunden',
    expected: { href: '/ambulant#ikk-wechsel', copyKey: 'healthFund' },
  },
  {
    slug: 'osteopathie-krankenkasse-2026',
    targetGroup: 'endkunden',
    expected: { href: '/ambulant#bonus-calculator', copyKey: 'healthBudget' },
  },
  {
    slug: 'ikk-classic-bonus-700-euro',
    targetGroup: 'endkunden',
    expected: { href: '/ambulant#bonus-calculator', copyKey: 'bonus' },
  },
  {
    slug: 'heilpraktiker-kosten-guide-2026',
    targetGroup: 'endkunden',
    expected: { href: '/ambulant#tarif-tabelle', copyKey: 'outpatientComparison' },
  },
  {
    slug: 'healio-konzept-fuer-heilpraktiker',
    targetGroup: 'heilpraktiker',
    expected: { href: '/partner', copyKey: 'partner' },
  },
  {
    slug: 'heilpraktiker-patienten-finanzierung-gesundheitsbudget',
    targetGroup: 'heilpraktiker',
    expected: { href: '/partner', copyKey: 'partner' },
  },
  {
    slug: 'digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung',
    targetGroup: 'heilpraktiker',
    expected: { href: '/partner', copyKey: 'partner' },
  },
  {
    slug: 'heilpraktiker-kosten-gkv-erstattung-healio',
    targetGroup: 'heilpraktiker',
    expected: { href: '/partner', copyKey: 'partner' },
  },
  {
    slug: 'healio-konzept-fuer-hebammen',
    targetGroup: 'hebammen',
    expected: { href: '/hebammen', copyKey: 'midwives' },
  },
  {
    slug: 'healio-konzept-fuer-tcm-praxen',
    targetGroup: 'tcm',
    expected: { href: '/partner', copyKey: 'partner' },
  },
  {
    slug: 'healio-konzept-fuer-osteopathen',
    targetGroup: 'osteopathen',
    expected: { href: '/partner', copyKey: 'partner' },
  },
];

const expectedEnglishRoutes = {
  inpatient: '/en/inpatient',
  dental: '/en/dental#zahn-check',
  outpatientComparison: '/en/outpatient#tarif-tabelle',
  healthBudget: '/en/outpatient#bonus-calculator',
  healthFund: '/en/outpatient#ikk-wechsel',
  bonus: '/en/outpatient#bonus-calculator',
  partner: '/en/partner',
  midwives: '/en/midwives',
};

assert.equal(knownGermanArticles.length, 15, 'Der Vertrag muss alle 15 bekannten Artikel abdecken.');

for (const article of knownGermanArticles) {
  const actual = getBlogArticleCta({
    slug: article.slug,
    targetGroup: article.targetGroup,
    lang: 'de',
  });

  assert.deepEqual(
    actual,
    article.expected,
    `Falsches CTA-Ziel für ${article.slug}`,
  );

  if (article.targetGroup === 'endkunden') {
    assert.notEqual(
      actual.href,
      '/potenzialanalyse',
      `Verbraucherartikel ${article.slug} darf nicht zur Potenzialanalyse führen.`,
    );
  }
}

const fallbackContracts = [
  {
    input: { slug: 'neuer-verbraucherartikel', targetGroup: 'endkunden', lang: 'de' },
    expected: { href: '/ambulant', copyKey: 'outpatient' },
  },
  {
    input: { slug: 'new-consumer-article', targetGroup: 'endkunden', lang: 'en' },
    expected: { href: '/en/outpatient', copyKey: 'outpatient' },
  },
  {
    input: { slug: 'neuer-arbeitgeberartikel', targetGroup: 'arbeitgeber', lang: 'de' },
    expected: { href: '/potenzialanalyse', copyKey: 'employer' },
  },
  {
    input: { slug: 'new-employer-article', targetGroup: 'arbeitgeber', lang: 'en' },
    expected: { href: '/en/potential-analysis', copyKey: 'employer' },
  },
  {
    input: { slug: 'neuer-hebammenartikel', targetGroup: 'hebammen', lang: 'de' },
    expected: { href: '/hebammen', copyKey: 'midwives' },
  },
  {
    input: { slug: 'new-midwives-article', targetGroup: 'hebammen', lang: 'en' },
    expected: { href: '/en/midwives', copyKey: 'midwives' },
  },
  {
    input: { slug: 'neuer-tcm-artikel', targetGroup: 'tcm', lang: 'de' },
    expected: { href: '/partner', copyKey: 'partner' },
  },
  {
    input: { slug: 'new-unknown-article', targetGroup: 'unbekannt', lang: 'en' },
    expected: { href: '/en/services', copyKey: 'services' },
  },
  {
    input: { slug: 'toString', targetGroup: 'unbekannt', lang: 'de' },
    expected: { href: '/leistungen', copyKey: 'services' },
  },
  {
    input: { slug: 'new-unknown-article', targetGroup: 'toString', lang: 'de' },
    expected: { href: '/leistungen', copyKey: 'services' },
  },
];

for (const contract of fallbackContracts) {
  let actual;
  assert.doesNotThrow(() => {
    actual = getBlogArticleCta(contract.input);
  }, `Fallback darf für ${contract.input.slug}/${contract.input.targetGroup} nicht abstürzen.`);
  assert.deepEqual(actual, contract.expected);
}

for (const article of knownGermanArticles) {
  const englishCta = getBlogArticleCta({
    slug: article.slug,
    targetGroup: article.targetGroup,
    lang: 'en',
  });

  assert.deepEqual(
    englishCta,
    {
      href: expectedEnglishRoutes[article.expected.copyKey],
      copyKey: article.expected.copyKey,
    },
    `Falsches englisches CTA-Ziel für ${article.slug}`,
  );
}

const requiredCopyKeys = new Set([
  ...knownGermanArticles.map((article) => article.expected.copyKey),
  ...fallbackContracts.map((contract) => contract.expected.copyKey),
]);

for (const locale of ['de', 'en']) {
  const localeUrl = new URL(`../src/i18n/locales/${locale}/blog.json`, import.meta.url);
  const messages = JSON.parse(readFileSync(localeUrl, 'utf8'));

  assert.ok(messages.articleCta, `${locale}/blog.json muss articleCta-Texte bereitstellen.`);

  for (const copyKey of requiredCopyKeys) {
    const copy = messages.articleCta[copyKey];
    assert.ok(copy, `${locale}/blog.json fehlt articleCta.${copyKey}.`);
    assert.ok(copy.title?.trim(), `${locale}/blog.json fehlt der Titel für ${copyKey}.`);
    assert.ok(copy.description?.trim(), `${locale}/blog.json fehlt die Beschreibung für ${copyKey}.`);
    assert.ok(copy.button?.trim(), `${locale}/blog.json fehlt der Buttontext für ${copyKey}.`);
  }
}

const scrollToTopSource = readFileSync(new URL('../src/components/ScrollToTop.jsx', import.meta.url), 'utf8');
assert.match(scrollToTopSource, /MutationObserver/, 'Lazy geladene CTA-Anker brauchen einen DOM-Retry.');
assert.match(scrollToTopSource, /scrollIntoView/, 'CTA-Anker müssen ihr Ziel sichtbar machen.');

const anchorContracts = [
  ['../src/components/sections/ambulant/AmbulantBonusCalculator.jsx', 'bonus-calculator'],
  ['../src/components/sections/ambulant/AmbulantTarifTabelle.jsx', 'tarif-tabelle'],
  ['../src/components/sections/ambulant/AmbulantIKKWechsel.jsx', 'ikk-wechsel'],
  ['../src/components/sections/dental/DentalZahnCheck.jsx', 'zahn-check'],
];

for (const [file, id] of anchorContracts) {
  const source = readFileSync(new URL(file, import.meta.url), 'utf8');
  assert.match(source, new RegExp(`id=["']${id}["']`), `CTA-Anker #${id} fehlt.`);
}

console.log('Blog-CTA-Contract erfüllt: 15 Slugs und alle Fallbacks sind zielgruppengerecht.');
