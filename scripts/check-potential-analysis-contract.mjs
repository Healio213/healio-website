import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoRoutes } from './seo-routes.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
const readJson = (relativePath) => JSON.parse(readText(relativePath));
const modelPath = path.join(rootDir, 'src/lib/potentialAnalysisModel.js');

assert(fs.existsSync(modelPath), 'Das Anliegen-Modell für die Potenzialanalyse fehlt.');
const {
  POTENTIAL_ANALYSIS_CONCERNS,
  buildPotentialAnalysisEmailMessage,
  createPotentialAnalysisDatabaseRecord,
  getPotentialAnalysisDetailVisibility,
  normalizePotentialInterest,
  summarizePotentialAnalysisDelivery,
} = await import(modelPath);

const page = readText('src/pages/PotenzialanalysePage.jsx');
const app = readText('src/App.jsx');
const de = readJson('src/i18n/locales/de/contact.json').potenzialanalyse;
const en = readJson('src/i18n/locales/en/contact.json').potenzialanalyse;

assert.deepEqual(
  POTENTIAL_ANALYSIS_CONCERNS,
  ['kassenboost', 'bav', 'bkv', 'gesamtsystem', 'unsicher'],
);
assert.equal(normalizePotentialInterest('kassenboost'), 'kassenboost');
assert.equal(normalizePotentialInterest('bav'), 'bav');
assert.equal(normalizePotentialInterest('bkv'), '');
assert.equal(normalizePotentialInterest('partner'), '');
assert.deepEqual(getPotentialAnalysisDetailVisibility('kassenboost'), { bav: false, bkv: false });
assert.deepEqual(getPotentialAnalysisDetailVisibility('bav'), { bav: true, bkv: false });
assert.deepEqual(getPotentialAnalysisDetailVisibility('bkv'), { bav: false, bkv: true });
assert.deepEqual(getPotentialAnalysisDetailVisibility('gesamtsystem'), { bav: true, bkv: true });
assert.deepEqual(getPotentialAnalysisDetailVisibility('unsicher'), { bav: false, bkv: false });

const baseForm = {
  name: 'Testperson',
  company: 'Muster GmbH',
  email: 'test@example.com',
  phone: '',
  mitarbeiteranzahl: '11-50',
  anliegen: 'bav',
  fokus_bav: 'Ja',
  fokus_bkv: '',
};
const expectedLegacyMappings = {
  kassenboost: {
    fokus_bav: 'Anliegen KassenBoost | bAV: Nicht angefragt',
    fokus_bkv: 'Anliegen KassenBoost | bKV: Nicht angefragt',
  },
  bav: {
    fokus_bav: 'Anliegen bAV | bAV: Ja',
    fokus_bkv: 'Anliegen bAV | bKV: Nicht angefragt',
  },
  bkv: {
    fokus_bav: 'Anliegen bKV | bAV: Nicht angefragt',
    fokus_bkv: 'Anliegen bKV | bKV: Eher Ja',
  },
  gesamtsystem: {
    fokus_bav: 'Anliegen Gesamtsystem | bAV: Ja',
    fokus_bkv: 'Anliegen Gesamtsystem | bKV: Eher Ja',
  },
  unsicher: {
    fokus_bav: 'Anliegen unsicher | bAV: Nicht angefragt',
    fokus_bkv: 'Anliegen unsicher | bKV: Nicht angefragt',
  },
};

for (const concern of POTENTIAL_ANALYSIS_CONCERNS) {
  const databaseRecord = createPotentialAnalysisDatabaseRecord({
    ...baseForm,
    anliegen: concern,
    fokus_bav: 'Ja',
    fokus_bkv: 'Eher Ja',
  });
  assert.deepEqual(databaseRecord, {
    name: 'Testperson',
    company: 'Muster GmbH',
    email: 'test@example.com',
    phone: '',
    mitarbeiteranzahl: '11-50',
    ...expectedLegacyMappings[concern],
  });
  assert(!Object.hasOwn(databaseRecord, 'anliegen'), 'Das bestehende Supabase-Schema darf keine neue Anliegen-Spalte erhalten.');
}
assert.equal(new Set(Object.values(expectedLegacyMappings).map((mapping) => JSON.stringify(mapping))).size, 5);

const databaseRecord = createPotentialAnalysisDatabaseRecord(baseForm);
assert.deepEqual(databaseRecord, {
  name: 'Testperson',
  company: 'Muster GmbH',
  email: 'test@example.com',
  phone: '',
  mitarbeiteranzahl: '11-50',
  ...expectedLegacyMappings.bav,
});
assert(!Object.hasOwn(databaseRecord, 'anliegen'), 'Das bestehende Supabase-Schema darf keine neue Anliegen-Spalte erhalten.');
assert.match(buildPotentialAnalysisEmailMessage(baseForm), /^Anliegen: bav$/m);
assert.match(buildPotentialAnalysisEmailMessage(baseForm), /^Fokus bAV: Ja$/m);
assert.match(buildPotentialAnalysisEmailMessage(baseForm), /^Fokus bKV: Nicht angefragt$/m);

const emailFailedButDatabaseStored = summarizePotentialAnalysisDelivery({
  emailResult: { status: 'rejected', reason: new Error('EmailJS unavailable') },
  databaseResult: { status: 'fulfilled', value: undefined },
});
assert.deepEqual(emailFailedButDatabaseStored, {
  delivery: { emailjs: 'rejected', supabase: 'fulfilled' },
  successfulChannels: 1,
  hasSuccessfulDelivery: true,
  isPartialDelivery: true,
});
assert.equal(summarizePotentialAnalysisDelivery({
  emailResult: { status: 'rejected', reason: new Error('EmailJS unavailable') },
  databaseResult: { status: 'rejected', reason: new Error('Supabase unavailable') },
}).hasSuccessfulDelivery, false);

assert.match(page, /useSearchParams/);
assert.match(page, /normalizePotentialInterest\(searchParams\.get\('interest'\)\)/);
assert.match(page, /id="anliegen"/);
for (const concern of POTENTIAL_ANALYSIS_CONCERNS) {
  assert.match(page, new RegExp(`SelectItem value="${concern}"`));
}
assert.match(page, /detailVisibility\.bav/);
assert.match(page, /detailVisibility\.bkv/);
assert.match(page, /createPotentialAnalysisDatabaseRecord\(formData\)/);
assert.match(page, /buildPotentialAnalysisEmailMessage\(formData\)/);
assert.match(page, /summarizePotentialAnalysisDelivery/);
assert.doesNotMatch(page, /anliegen:\s*formData\.anliegen/);

assert.equal(de.concern, 'Worum geht es Ihnen? *');
assert.equal(de.concernOptions.kassenboost, 'KassenBoost als Mitarbeiterzugang');
assert.equal(de.concernOptions.bav, 'Betriebliche Altersvorsorge (bAV)');
assert.equal(de.concernOptions.bkv, 'Betriebliche Krankenversicherung (bKV)');
assert.equal(de.concernOptions.gesamtsystem, 'Gesamtsystem aus Gesundheit und Vorsorge');
assert.equal(de.concernOptions.unsicher, 'Noch unsicher – gemeinsam einordnen');
assert.equal(en.concernOptions.kassenboost, 'KassenBoost employee access');
assert.match(de.concernRequired, /Anliegen/);
assert.match(de.resultText, /KassenBoost/);
assert.match(de.resultText, /bAV/);
assert.match(de.resultText, /bKV/);
assert.match(de.resultText, /Gesamtsystem/);
assert.match(en.resultText, /KassenBoost/);
assert.match(en.resultText, /pension/);
assert.match(en.resultText, /health insurance/);
assert.match(en.resultText, /integrated system/);
assert.equal(de.schemaName, 'Kostenlose Potenzialanalyse für Unternehmen');
assert.match(de.schemaDescription, /KassenBoost/);
assert.match(de.schemaDescription, /bAV/);
assert.match(de.schemaDescription, /bKV/);
assert.match(de.schemaDescription, /Gesamtsystem/);
assert.equal(en.schemaName, 'Free potential analysis for companies');
assert.match(en.schemaDescription, /KassenBoost/);
assert.match(en.schemaDescription, /pension/);
assert.match(en.schemaDescription, /health insurance/);
assert.match(en.schemaDescription, /integrated benefits system/);
assert.match(page, /"name": t\('potenzialanalyse\.schemaName'\)/);
assert.match(page, /"description": t\('potenzialanalyse\.schemaDescription'\)/);
assert.match(page, /"inLanguage": lang === 'en' \? 'en-US' : 'de-DE'/);
assert.doesNotMatch(page, /"name": "Kostenlose Potenzialanalyse"/);

assert.match(app, /path="\/potenzialanalyse" element=\{<PotenzialanalysePage \/>\}/);
assert.match(app, /path="\/en\/potential-analysis" element=\{<PotenzialanalysePage \/>\}/);
const deSeo = seoRoutes.find((route) => route.path === '/potenzialanalyse');
const enSeo = seoRoutes.find((route) => route.path === '/en/potential-analysis');
assert.equal(deSeo?.canonical, 'https://healio.de/potenzialanalyse');
assert.equal(enSeo?.canonical, 'https://healio.de/en/potential-analysis');
assert.match(deSeo?.description || '', /KassenBoost/);
assert.match(deSeo?.description || '', /bAV/);
assert.match(deSeo?.description || '', /bKV/);
assert.match(enSeo?.description || '', /KassenBoost/);
assert.match(enSeo?.description || '', /pension/);
assert.match(enSeo?.description || '', /health insurance/);

console.log('Potential analysis contract passed.');
