import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (relativePath) => JSON.parse(
  fs.readFileSync(path.join(root, relativePath), 'utf8')
);

const locales = {
  de: readJson('src/i18n/locales/de/hebammen.json'),
  en: readJson('src/i18n/locales/en/hebammen.json'),
};

const get = (object, keyPath) => keyPath
  .split('.')
  .reduce((value, key) => value?.[key], object);

const requiredStringKeys = [
  'proof.ariaLabel',
  'hero.secondaryCta',
  'hero.note',
  'explanationVideo.title',
  'explanationVideo.subtitle',
  'explanationVideo.status',
  'explanationVideo.message',
  'explanationVideo.cta',
  'explanationVideo.privacy',
  'explanationVideo.fallback',
  'explanationVideo.avatarAlt',
  'explanationVideo.assistantName',
  'explanationVideo.error',
  'leistungen.detailsLabel',
  'klinik.detailsLabel',
];

for (const [locale, translations] of Object.entries(locales)) {
  for (const key of requiredStringKeys) {
    const value = get(translations, key);
    assert.equal(
      typeof value,
      'string',
      `${locale}: ${key} must resolve to a string`
    );
    assert.ok(value.trim(), `${locale}: ${key} must not be empty`);
  }

  const proofItems = get(translations, 'proof.items');
  assert.ok(Array.isArray(proofItems), `${locale}: proof.items must be an array`);
  assert.equal(proofItems.length, 3, `${locale}: proof.items must contain three role cards`);
  proofItems.forEach((item, index) => {
    assert.ok(item && typeof item === 'object', `${locale}: proof.items[${index}] must be an object`);
    assert.ok(item.title?.trim(), `${locale}: proof.items[${index}].title must not be empty`);
    assert.ok(item.text?.trim(), `${locale}: proof.items[${index}].text must not be empty`);
  });

  const explanationPoints = get(translations, 'explanationVideo.points');
  assert.ok(Array.isArray(explanationPoints), `${locale}: explanationVideo.points must be an array`);
  assert.equal(explanationPoints.length, 3, `${locale}: explanationVideo.points must contain three points`);
  explanationPoints.forEach((point, index) => {
    assert.equal(typeof point, 'string', `${locale}: explanationVideo.points[${index}] must be a string`);
    assert.ok(point.trim(), `${locale}: explanationVideo.points[${index}] must not be empty`);
  });
}

console.log('Hebammen translation contract checks passed for DE and EN.');
