import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { berechneZulagen, RECHNER_MAX_MONATSBEITRAG } from '../src/lib/altersvorsorgeZulagen.js';
import {
  getArtikelCheckVoreinstellung, readArtikelCheckState, createArtikelCheckState,
  createAltersvorsorgeKontaktState, buildAltersvorsorgeKontaktMessage,
} from '../src/lib/altersvorsorgeArtikelCheck.js';
import { faq, WEBINAR_TERMINE, WEBINAR_LINK, CHECK_BUCHUNG_BEREIT, CHECK_KONTAKT_URL } from '../src/content/altersvorsorgedepotContent.js';

test('150 EUR Monatsbeitrag erreicht die maximale Grundzulage, mehr erhöht sie nicht', () => {
  assert.equal(RECHNER_MAX_MONATSBEITRAG, 150);
  assert.equal(berechneZulagen({ monatsbeitrag: 150 }).grundzulage, 540);
  assert.equal(berechneZulagen({ monatsbeitrag: 200 }).grundzulage, 540);
  for (const audience of ['standard', 'riester', 'eltern', 'selbststaendige', 'einsteiger']) {
    assert.ok(getArtikelCheckVoreinstellung({ audience }).monatsbeitrag <= 150);
  }
});

test('Familienbeispiel enthält den einmaligen Startbonus nicht in der Jahreszulage', () => {
  const result = berechneZulagen({ monatsbeitrag: 25, kinder: 2, unter25: true });
  assert.equal(result.grundzulage, 150);
  assert.equal(result.kinderzulage, 600);
  assert.equal(result.zulageJahr, 750);
  assert.equal(result.startbonus, 200);
  assert.equal(berechneZulagen({ monatsbeitrag: 10 }).zulageJahr, 60);
});

test('Navigationswerte über dem UI-Limit oder mit ungültigen Kindern werden verworfen', () => {
  const slug = 'altersvorsorgedepot-kosten';
  const value = { monatsbeitrag: 150, kinder: 2, unter25: false };
  assert.deepEqual(readArtikelCheckState(createArtikelCheckState(slug, value)), { slug, value });
  for (const patch of [{ monatsbeitrag: 151 }, { monatsbeitrag: NaN }, { monatsbeitrag: '150' }, { kinder: 7 }, { kinder: -1 }, { kinder: 1.5 }, { unter25: 'ja' }]) {
    assert.equal(readArtikelCheckState({ altersvorsorgeArtikelCheck: { slug, value: { ...value, ...patch } } }), null);
  }
});

test('Kontaktanfrage übernimmt nur geprüfte Recheneingaben und bekannten Zweck', () => {
  const value = { monatsbeitrag: 25, kinder: 2, unter25: false };
  const message = buildAltersvorsorgeKontaktMessage(createAltersvorsorgeKontaktState(value, 'check'));
  assert.match(message, /25 EUR Monatsbeitrag/);
  assert.match(message, /2 zugeordnete/);
  assert.match(message, /Termin.*ab/);
  assert.match(buildAltersvorsorgeKontaktMessage(createAltersvorsorgeKontaktState(value, 'rueckruf')), /Ich wünsche einen Rückruf/);
  assert.equal(buildAltersvorsorgeKontaktMessage({ altersvorsorgeKontakt: { purpose: 'fremde-werbung', message: 'Injected' } }), '');
  const malformed = buildAltersvorsorgeKontaktMessage(createAltersvorsorgeKontaktState({ ...value, monatsbeitrag: 9000 }, 'check'));
  assert.doesNotMatch(malformed, /9000/);
});

test('Ohne bestätigtes Webinar oder Kalender gibt es keinen fingierten Buchungsstand', () => {
  assert.deepEqual(WEBINAR_TERMINE, []);
  assert.equal(WEBINAR_LINK, '');
  assert.equal(CHECK_BUCHUNG_BEREIT, false);
  assert.equal(CHECK_KONTAKT_URL, '/kontakt#kontaktformular');
});

test('Garantieumfang und beschränkte Vermittlung stehen in den öffentlichen FAQs', () => {
  const garantie = faq.find((entry) => entry.question.includes('Garantien'));
  assert.match(garantie.answer, /Beginn der Auszahlungsphase/);
  assert.match(garantie.answer, /Beiträge einschließlich Zulagen/);
  assert.match(garantie.answer, /weder Rendite noch Kaufkraft/);
  const vermittlung = faq.find((entry) => entry.question.includes('vermittelt Healio'));
  assert.match(vermittlung.answer, /nur Versicherungsvarianten/);
});

test('Fahrplan-Fallback postet keine unbereite Webinar-Anmeldung', async () => {
  const source = await readFile(new URL('../src/components/sections/altersvorsorge/AltersvorsorgeWebinarForm.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /fetch\s*\(|<form\b|trackMetaLead|trackGoogleAdsLead/);
  assert.match(source, /healio-zuschuss-fahrplan-2027\.pdf/);
  assert.match(source, /createAltersvorsorgeKontaktState/);
});

test('Direkte Dankeseite kann keine Webinar-Zusage oder ICS-Datei erzeugen', async () => {
  const source = await readFile(new URL('../src/pages/AltersvorsorgedepotDankePage.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /buildWebinarIcs|\.ics|Platz.*reserviert|WEBINAR_LINK/);
  assert.match(source, /CHECK_KONTAKT_URL/);
});
