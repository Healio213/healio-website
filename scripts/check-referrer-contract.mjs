// Vertrag für Empfehlungs- und Partnercodes (?ref=), Stand 08.11.2026.
// Der Code lebt nur im Arbeitsspeicher der Seite und wandert beim Klick an
// Links zu healio.de und kassenboost.de mit (Gate 3, Option ii).
import fs from 'node:fs';
import process from 'node:process';
import {
  attachReferrerToLink,
  readReferrerFromSearch,
  readStoredReferrer,
  sanitizeReferrer,
  storeReferrer,
  withReferrer,
} from '../src/lib/referrer.js';

let failures = 0;
const expect = (condition, message) => {
  if (!condition) {
    failures += 1;
    console.error(`Referrer-Contract verletzt: ${message}`);
  }
};

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const code = (source) => source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

// 1. Nichts auf dem Gerät: kein Lesen oder Schreiben im Browserspeicher.
const referrerSource = code(read('src/lib/referrer.js'));
const hookSource = code(read('src/hooks/useReferrer.js'));
expect(!/sessionStorage\.(getItem|setItem)|localStorage|document\.cookie/.test(referrerSource + hookSource),
  'Der Code darf weder in sessionStorage/localStorage noch im Cookie landen.');
expect(/sessionStorage\?\.removeItem/.test(referrerSource), 'Alte sessionStorage-Reste sollen nur entfernt werden.');

// 2. Gültige Codes, Grenzen wie bisher.
expect(sanitizeReferrer('elterngeld-navigator') === 'elterngeld-navigator', 'Partnercode muss gültig sein.');
expect(sanitizeReferrer('HP-praxis_123') === 'HP-praxis_123', 'Praxiscode muss gültig bleiben.');
expect(sanitizeReferrer('a b') === null && sanitizeReferrer('x'.repeat(65)) === null, 'Ungültige Codes verwerfen.');
expect(readReferrerFromSearch('?utm_source=x&ref=elterngeld-navigator') === 'elterngeld-navigator', 'ref aus der Adresse lesen.');
expect(readReferrerFromSearch('?ref=HP%0Aevil') === null, 'Steuerzeichen in ref verwerfen.');

// 3. Ohne Code bleibt jeder Link unverändert.
expect(readStoredReferrer() === null, 'Vor dem ersten Aufruf ist kein Code gemerkt.');
const base = 'https://healio.de/schwangerschaft?ref=elterngeld-navigator';
expect(withReferrer('https://kassenboost.de/', base) === null, 'Ohne gemerkten Code nichts anhängen.');

storeReferrer('elterngeld-navigator');
expect(readStoredReferrer() === 'elterngeld-navigator', 'storeReferrer muss den Code merken.');

// 4. kassenboost.de bekommt den Code, Anker bleibt hinter der Query.
expect(
  withReferrer('https://kassenboost.de/?utm_source=healio&utm_medium=website&utm_campaign=homepage#vergleich', base)
    === 'https://kassenboost.de/?utm_source=healio&utm_medium=website&utm_campaign=homepage&ref=elterngeld-navigator#vergleich',
  'kassenboost.de-Link muss ref vor dem Anker tragen.',
);
expect(withReferrer('https://www.kassenboost.de/ratgeber', base)?.endsWith('?ref=elterngeld-navigator'), 'www.kassenboost.de ebenso.');
expect(withReferrer('http://kassenboost.de/', base) === null, 'Nur https-Links auf kassenboost.de.');

// 5. Andere healio.de-Seiten bekommen den Code, dieselbe Seite und Dateien nicht.
expect(withReferrer('/ambulant', base) === 'https://healio.de/ambulant?ref=elterngeld-navigator', 'Interne Seite bekommt ref.');
expect(withReferrer('/stationaer#familie', base) === 'https://healio.de/stationaer?ref=elterngeld-navigator#familie', 'Anker bleibt erhalten.');
expect(withReferrer('#kosten', base) === null, 'Sprungmarke auf derselben Seite bleibt unverändert.');
expect(withReferrer('/downloads/healio-zuschuss-fahrplan-2027.pdf', base) === null, 'Dateien bleiben unverändert.');
expect(withReferrer('/api/zaehler', base) === null, 'Schnittstellen bleiben unverändert.');
expect(withReferrer('/ambulant?ref=HP-anders', base) === null, 'Vorhandener ref wird nie überschrieben.');

// 6. Fremde Domains, Versicherer und Kontaktlinks nie.
for (const href of [
  'https://insurances-online.levelnine.biz/?mandant=sdk',
  'https://www.diebayerische.de/rechner',
  'https://www.ikk-classic.de/formulare/mitglied-werden-vp?dsid=koop_reg&pid=V37000250016',
  'https://elterngeldguide.dein-navi.de',
  'mailto:info@healio.de',
  'tel:+494089755705',
]) expect(withReferrer(href, base) === null, `Kein ref an ${href}.`);

// 7. Anker-Helfer: setzt href, lässt download-Links in Ruhe.
const fakeAnchor = (href, attrs = {}) => {
  const store = { href, ...attrs };
  return {
    getAttribute: (name) => store[name] ?? null,
    hasAttribute: (name) => name in store,
    setAttribute: (name, value) => { store[name] = value; },
    store,
  };
};
const kb = fakeAnchor('https://kassenboost.de/?utm_source=healio&utm_medium=bridge&utm_campaign=kassenboost');
expect(attachReferrerToLink(kb, base) && kb.store.href.includes('ref=elterngeld-navigator'), 'Anker zu kassenboost.de bekommt ref.');
const pdf = fakeAnchor('/ambulant', { download: '' });
expect(!attachReferrerToLink(pdf, base), 'download-Links bleiben unverändert.');

// 8. App bindet beide Hooks ein, Datenschutz nennt den Code.
const app = read('src/App.jsx');
expect(/useReferrer\(\);\s*\n\s*useReferrerLinks\(\);/.test(app), 'App.jsx muss useReferrer und useReferrerLinks aufrufen.');
const de = JSON.parse(read('src/i18n/locales/de/legal.json')).datenschutz;
const en = JSON.parse(read('src/i18n/locales/en/legal.json')).datenschutz;
for (const key of ['partnerCodeTitle', 'partnerCodeText', 'partnerCodeLinks', 'partnerCodeLegalBasis']) {
  expect(typeof de[key] === 'string' && de[key].length > 10, `Datenschutz (de) braucht ${key}.`);
  expect(typeof en[key] === 'string' && en[key].length > 10, `Datenschutz (en) braucht ${key}.`);
}
expect(/kassenboost\.de/.test(de.partnerCodeLinks) && /Level Nine/.test(de.partnerCodeLinks), 'Datenschutz muss KassenBoost und Level Nine nennen.');
expect(!/[–—]/.test(Object.values(de).filter((v) => typeof v === 'string' && v.includes('Partner')).join(' ')), 'Keine Gedankenstriche im Partnercode-Text.');
expect(/id="partnercode"/.test(read('src/pages/DatenschutzPage.jsx')), 'Datenschutzseite braucht den Abschnitt #partnercode.');

if (failures) {
  console.error(`${failures} Verstoß/Verstöße.`);
  process.exit(1);
}
console.log('Referrer-Contract erfüllt.');
