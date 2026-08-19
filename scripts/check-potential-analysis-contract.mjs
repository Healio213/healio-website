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
const databaseRecord = createPotentialAnalysisDatabaseRecord(baseForm);
assert.deepEqual(databaseRecord, {
  name: 'Testperson',
  company: 'Muster GmbH',
  email: 'test@example.com',
  phone: '',
  mitarbeiteranzahl: '11-50',
  fokus_bav: 'Ja',
  fokus_bkv: 'Nicht angefragt',
});
assert(!Object.hasOwn(databaseRecord, 'anliegen'), 'Das bestehende Supabase-Schema darf keine neue Anliegen-Spalte erhalten.');
assert.match(buildPotentialAnalysisEmailMessage(baseForm), /^Anliegen: bav$/m);
assert.match(buildPotentialAnalysisEmailMessage(baseForm), /^Fokus bAV: Ja$/m);
assert.match(buildPotentialAnalysisEmailMessage(baseForm), /^Fokus bKV: Nicht angefragt$/m);

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
assert.doesNotMatch(page, /anliegen:\s*formData\.anliegen/);

assert.equal(de.concern, 'Worum geht es Ihnen? *');
assert.equal(de.concernOptions.kassenboost, 'KassenBoost als Mitarbeiterzugang');
assert.equal(de.concernOptions.bav, 'Betriebliche Altersvorsorge (bAV)');
assert.equal(de.concernOptions.bkv, 'Betriebliche Krankenversicherung (bKV)');
assert.equal(de.concernOptions.gesamtsystem, 'Gesamtsystem aus Gesundheit und Vorsorge');
assert.equal(de.concernOptions.unsicher, 'Noch unsicher – gemeinsam einordnen');
assert.equal(en.concernOptions.kassenboost, 'KassenBoost employee access');
assert.match(de.concernRequired, /Anliegen/);

assert.match(app, /path="\/potenzialanalyse" element=\{<PotenzialanalysePage \/>\}/);
assert.match(app, /path="\/en\/potential-analysis" element=\{<PotenzialanalysePage \/>\}/);
const deSeo = seoRoutes.find((route) => route.path === '/potenzialanalyse');
const enSeo = seoRoutes.find((route) => route.path === '/en/potential-analysis');
assert.equal(deSeo?.canonical, 'https://healio.de/potenzialanalyse');
assert.equal(enSeo?.canonical, 'https://healio.de/en/potential-analysis');

console.log('Potential analysis contract passed.');
