import assert from 'node:assert/strict';
import fs from 'node:fs';

const de = fs.readFileSync(new URL('../dist/unternehmen/vorsorge-rechner/index.html', import.meta.url), 'utf8');
const en = fs.readFileSync(new URL('../dist/en/companies/pension-calculator/index.html', import.meta.url), 'utf8');

const collectWebPages = (value, results = []) => {
  if (Array.isArray(value)) {
    value.forEach((entry) => collectWebPages(entry, results));
    return results;
  }
  if (!value || typeof value !== 'object') return results;

  const types = Array.isArray(value['@type']) ? value['@type'] : [value['@type']];
  if (types.includes('WebPage')) results.push(value);
  Object.values(value).forEach((entry) => collectWebPages(entry, results));
  return results;
};

for (const [language, html, canonical] of [
  ['de', de, 'https://healio.de/unternehmen/vorsorge-rechner'],
  ['en', en, 'https://healio.de/en/companies/pension-calculator'],
]) {
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(html, /data-result-group="company"/);
  assert.match(html, /data-result-group="employee"/);
  assert.match(html, /data-result-group="capital"/);
  assert.match(html, /data-bav-split="true"/);
  assert.match(html, /data-standard-scenario="true"/);
  assert.match(html, /data-historical-scenario="true"/);
  assert.match(html, /id="market-return" type="range" min="0" max="12" step="0.1"/);
  assert.match(html, /id="average-gross" type="range" min="2001" max="6450"/);

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
  const webPages = schemas.flatMap((schema) => collectWebPages(schema));
  assert(
    webPages.some((schema) => schema.url === canonical && schema['@id'] === `${canonical}#webpage`),
    `${language}: route-specific WebPage schema is missing.`,
  );
  assert(
    !webPages.some((schema) => schema.url === 'https://healio.de/ambulant'),
    `${language}: inherited outpatient WebPage schema must not remain.`,
  );

  const costLabel = html.match(/<label for="effective-costs" class="([^"]+)">/);
  assert(costLabel, `${language}: effective-cost label is missing.`);
  assert.match(costLabel[1], /text-white/, `${language}: effective-cost label is unreadable on the dark surface.`);

  const costHint = html.match(/<p id="effective-costs-hint" class="([^"]+)">/);
  assert(costHint, `${language}: effective-cost hint is missing.`);
  assert.match(costHint[1], /text-slate-300/, `${language}: effective-cost hint is unreadable on the dark surface.`);
}

assert.match(de, /162\.240&nbsp;€/);
assert.match(de, /17\.156,88&nbsp;€/);
assert.match(de, /179\.396,88&nbsp;€/);
assert.match(de, /19,93 %/);
assert.match(de, /5,98 %/);
assert.match(de, /71,49&nbsp;€/);
assert.match(de, /Im gewählten Modell stehen 676&nbsp;€ Vorsorgebeitrag einer möglichen zusätzlichen SV-Belastung von 71,49&nbsp;€ gegenüber\./);
assert.match(de, /10 % − 2 % = 8 % Modellrendite/);
assert.match(de, /Historischer 15-Jahres-Wert/);
assert.match(de, /11,10 % p\. a\./);
assert.match(de, /9,10 % nach der gewählten Kostenannahme/);
assert.match(de, /äquivalente Monatsrendite/);
assert.match(de, /Die gewählte vereinfachte Renditeminderung ist berücksichtigt/);
assert.match(de, /durchschnittlicher Zusatzbeitrag von 2,9 %/);

assert.match(en, /€162,240/);
assert.match(en, /€17,156\.88/);
assert.match(en, /€179,396\.88/);
assert.match(en, /In the selected model, a €676 pension contribution is set against a potential additional social charge of €71\.49\./);
assert.match(en, /10% − 2% = 8% model return/);
assert.match(en, /Historical 15-year value/);
assert.match(en, /11\.10% p\.a\./);
assert.match(en, /9\.10% after the selected 2-percentage-point cost assumption/);
assert.match(en, /equivalent monthly return/);

console.log('Rendered bAV employer calculator contract passed.');
