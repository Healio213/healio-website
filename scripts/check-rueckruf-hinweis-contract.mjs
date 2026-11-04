import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {
  RUECKRUF_CONSENT_VERSION,
  RUECKRUF_ROUTE_TOPICS,
  buildRueckrufMessage,
  getRueckrufTopic,
  isValidRueckrufFirstName,
  normalizeRueckrufPhone,
} from '../src/lib/rueckruf.js';

// Vertrag für den Rückruf-Hinweis „Sprich mit einem Experten“ (04.11.2026).
// Verhalten und Lage prüft scripts/check-rueckruf-hinweis-rendered.mjs.
const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const component = read('src/components/RueckrufHinweis.jsx');
const copyBlock = component.slice(component.indexOf('const COPY = {'), component.indexOf('const SEND_TIMEOUT_MS'));

test('läuft nur auf den Endkundenseiten aus der Liste', () => {
  assert.deepEqual(Object.keys(RUECKRUF_ROUTE_TOPICS).sort(), [
    '/', '/ambulant', '/en', '/en/dental', '/en/health-insurance-bonus', '/en/inpatient',
    '/en/outpatient', '/en/services', '/kassenbonus', '/leistungen', '/stationaer', '/zahn',
  ]);
  assert.equal(getRueckrufTopic('/ambulant/'), 'ambulant');
  assert.equal(getRueckrufTopic('/zahn'), 'zahn');
  assert.equal(getRueckrufTopic('/en/inpatient'), 'stationaer');
  for (const path of [
    '/ratgeber', '/ratgeber/krankenkasse-2027', '/blog', '/blog/heilpraktiker', '/datenschutz', '/impressum',
    '/erstinformation', '/agb', '/kontakt', '/terminvereinbarung', '/schwangerschaft', '/partner', '/hebammen',
    '/zahnaerzte', '/unternehmen', '/kassenboost', '/check/naturheilkunde', '/check/schwangerschaft',
    '/tierkrankenversicherung', '/altersvorsorgedepot', '/en/privacy', '/en/appointment', '/tiktok',
  ]) {
    assert.equal(getRueckrufTopic(path), null, `${path} darf keinen Rückruf-Hinweis zeigen.`);
  }
});

test('Telefonnummern werden wie auf kassenboost.de geprüft und vereinheitlicht', () => {
  assert.equal(normalizeRueckrufPhone('+49 (0) 171 000-0000'), '+491710000000');
  assert.equal(normalizeRueckrufPhone('0171 0000000'), '01710000000');
  assert.equal(normalizeRueckrufPhone('0049 171 1234567'), '+491711234567');
  assert.equal(normalizeRueckrufPhone('(040) 12 34 56'), '040123456');
  assert.equal(normalizeRueckrufPhone('040/123456'), '040123456');
  assert.equal(normalizeRueckrufPhone('12 34'), null);
  assert.equal(normalizeRueckrufPhone('+0171 1234567'), null);
  assert.equal(normalizeRueckrufPhone('0171 12a4567'), null);
  assert.equal(normalizeRueckrufPhone('+49 171 +1234567'), null);
  assert.equal(normalizeRueckrufPhone('1'.repeat(41)), null);
  assert.equal(isValidRueckrufFirstName(' Anna '), true);
  assert.equal(isValidRueckrufFirstName('   '), false);
  assert.equal(isValidRueckrufFirstName('<b>Anna</b>'), false);
  assert.equal(isValidRueckrufFirstName('A'.repeat(81)), false);
});

test('die Mail nennt Seite, Thema, Sprache und Einwilligung, aber nichts aus dem Formular', () => {
  const message = buildRueckrufMessage({ pathname: '/ambulant', topic: 'ambulant', lang: 'de' });
  assert.match(message, /^Rückrufwunsch über den Hinweis „Sprich mit einem Experten“/);
  assert.match(message, /Seite: healio\.de\/ambulant\n/);
  assert.match(message, /Thema: Ambulant\n/);
  assert.match(message, /Sprache: Deutsch\n/);
  assert.match(message, new RegExp(`Einwilligung zum Anruf: ja, Fassung ${RUECKRUF_CONSENT_VERSION}`));
  assert.match(message, /healio\.de\/terminvereinbarung/);
  assert.match(buildRueckrufMessage({ pathname: '/', topic: 'start', lang: 'en' }), /Seite: healio\.de\nThema: Allgemein \(Startseite oder Leistungen\)\nSprache: Englisch/);
});

test('Texte: Du-Form, echte Umlaute, keine Gedankenstriche, Terminlink für Endkunden', () => {
  assert.doesNotMatch(copyBlock, /[–—]/, 'Keine Gedankenstriche in sichtbaren Texten.');
  assert.doesNotMatch(copyBlock, /\b(Sie|Ihre?|Ihnen)\b/, 'Der Hinweis spricht Endkunden mit du an.');
  assert.doesNotMatch(copyBlock, /\b(fuer|ueber|waehl|bestaetig|schliess|persoen|naechst)/i, 'Echte Umlaute statt ae, oe, ue.');
  for (const text of ['Sprich mit einem Experten', '100\\u00a0% unverbindlich und kostenlos.', 'Beratung anfragen', 'Termin jetzt wählen']) {
    assert(copyBlock.includes(text), `Text fehlt: ${text}`);
  }
  assert.match(copyBlock, /terminPath: '\/terminvereinbarung'/);
  assert.doesNotMatch(component, /['"]\/termin['"?]/, 'Endkunden gehen auf /terminvereinbarung, nicht auf /termin.');
  assert.match(copyBlock, /privacyPath: '\/datenschutz#rueckruf'/);
});

test('Versand über den Formularweg von healio.de mit Honigtopf und Fallback-Action', () => {
  assert.match(component, /emailjsService\.sendEmail\(/);
  assert.match(component, /<FormHoneypot id="healio-rueckruf-website" \/>/);
  assert.match(component, /<form method="post" action="\/kontakt" onSubmit=\{submit\}/);
  assert.match(component, /maxLength=\{RUECKRUF_FIRST_NAME_MAX\}/);
  assert.match(component, /maxLength=\{RUECKRUF_PHONE_INPUT_MAX\}/);
  // Nitas Bausteine bleiben unberührt; der Hinweis weicht nur über deren Markierungen aus.
  assert.doesNotMatch(component, /from '@\/components\/NitaConsentWidget'/);
  assert.match(component, /'data-healio-nita-avoid'/);
});

test('Datenschutz erklärt den Rückrufwunsch unter #rueckruf', () => {
  assert.match(read('src/pages/DatenschutzPage.jsx'), /<h3 id="rueckruf" className="scroll-mt-28/);
  for (const lang of ['de', 'en']) {
    const legal = JSON.parse(read(`src/i18n/locales/${lang}/legal.json`)).datenschutz;
    for (const key of ['rueckrufTitle', 'rueckrufText', 'rueckrufLegalBasis', 'rueckrufStorage']) {
      assert(typeof legal[key] === 'string' && legal[key].length > 20, `${lang}: ${key} fehlt.`);
      if (lang === 'de') assert.doesNotMatch(legal[key], /[–—]/, `${key}: keine Gedankenstriche.`);
    }
  }
});

test('App bindet den Hinweis genau einmal ein', () => {
  const app = read('src/App.jsx');
  assert.equal(app.match(/<RueckrufHinweis \/>/g)?.length, 1);
});
