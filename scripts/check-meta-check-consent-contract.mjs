/**
 * Vertragstest fuer die Einwilligungen der Meta-Kurzchecks (/check/*).
 *
 * Geprueft wird, was still kaputtgehen kann: die ausdrueckliche Einwilligung
 * nach Art. 9 DSGVO im Schwangerschafts-Check, neutrale Fassungskennungen,
 * der Merker nur mit Einwilligung und die Datenschutz-Absaetze.
 *
 * Ausfuehren: npm run test:meta-check-consent
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { META_CHECKS } from '../src/content/meta-checks.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const kurzCheck = read('src/components/campaign/KurzCheck.jsx');
const kurzcheckShared = read('shared/kurzcheck.js');
const privacyPage = read('src/pages/DatenschutzPage.jsx');
const legalDe = JSON.parse(read('src/i18n/locales/de/legal.json')).datenschutz;
const legalEn = JSON.parse(read('src/i18n/locales/en/legal.json')).datenschutz;

const checks = [];
const check = (label, passed) => checks.push([label, Boolean(passed)]);

const { naturheilkunde, schwangerschaft } = META_CHECKS;
const DASH = /[–—]/;

check('Beide Checks haben eine Einwilligung mit Fassung', naturheilkunde.consent?.version && schwangerschaft.consent?.version);
check('Fassungen unterscheiden sich', naturheilkunde.consent.version !== schwangerschaft.consent.version);
check('Fassungskennungen verraten keine Schwangerschaft', ![naturheilkunde, schwangerschaft].some(({ consent }) => /schwanger|famil|baby|geburt/i.test(consent.version)));
check('Schwangerschafts-Check verlangt die ausdrückliche Einwilligung zur Gesundheitsangabe', schwangerschaft.consent.healthData === true
  && /ausdrücklich/.test(schwangerschaft.consent.text)
  && /Gesundheitsangabe/.test(schwangerschaft.consent.text)
  && /Schwangerschaft/.test(schwangerschaft.consent.text));
check('Naturheilkunde-Check bleibt bei der normalen Rückruf-Einwilligung', naturheilkunde.consent.healthData === false
  && !/Gesundheitsangabe/.test(naturheilkunde.consent.text));
check('Beide Texte nennen Healio, Rückruf und Widerruf', [naturheilkunde, schwangerschaft].every(({ consent }) => /Healio GmbH/.test(consent.text)
  && /anruft oder anschreibt/.test(consent.text)
  && /jederzeit widerrufen/.test(consent.text)
  && /info@healio\.de/.test(consent.text)));
check('Einwilligungstexte ohne Gedankenstriche', ![naturheilkunde, schwangerschaft].some(({ consent }) => DASH.test(consent.text)));
check('Formular zeigt den Text aus der Konfiguration', /<span>\{config\.consent\.text\}<\/span>/.test(kurzCheck));
check('Mail dokumentiert die Fassung', /`Einwilligung Rückruf: ja \(\$\{config\.consent\.version\}\)`/.test(kurzCheck));
check('Gesundheitsangaben gehen nie per Mail, nur über den EU-Weg', schwangerschaft.endpoint === '/api/kurzcheck-lead'
  && naturheilkunde.endpoint === undefined
  && /if \(config\.consent\.healthData\) throw new Error\('health_data_requires_eu_route'\);/.test(kurzCheck)
  && /buildKurzcheckRequest\(\{ config, answers, contact, search: location\.search \}\)/.test(kurzCheck)
  && /consent_text_version: config\.consent\.version/.test(kurzcheckShared));
check('Merker nur bei messender Strecke und mit Einwilligung', /if \(config\.metaContentName && \(hasConsent\('marketing'\) \|\| hasConsent\('analytics'\)\)\) \{\s*markCheckLeadPending\(config\.key\);/.test(kurzCheck));
check('Datenschutz-Link springt zum Kurzcheck-Absatz', /href="\/datenschutz#kurzcheck"/.test(kurzCheck));

const kurzCheckKeys = ['kurzCheckTitle', 'kurzCheckText', 'kurzCheckLegalBasis', 'kurzCheckTracking', 'kurzCheckRecipients', 'kurzCheckStorage', 'kurzCheckRevocation'];
const metaLeadKeys = ['metaLeadFormsTitle', 'metaLeadFormsText', 'metaLeadFormsLegalBasis', 'metaLeadFormsStorage', 'metaLeadFormsPlatform'];
check('Kurzcheck- und Meta-Formular-Absätze liegen in beiden Sprachen vor', [...kurzCheckKeys, ...metaLeadKeys].every((key) => legalDe[key] && legalEn[key]));
check('Datenschutzseite gibt alle neuen Absätze aus', [...kurzCheckKeys, ...metaLeadKeys].every((key) => privacyPage.includes(`datenschutz.${key}`)));
check('Datenschutzseite hat die Sprungmarken', /id="kurzcheck"/.test(privacyPage) && /id="meta-formulare"/.test(privacyPage));
check('Kurzcheck-Absatz nennt Art. 9, EmailJS, Supabase Frankfurt, Speicherdauer und Widerruf', /Art\. 9 Abs\. 2 lit\. a DSGVO/.test(legalDe.kurzCheckLegalBasis)
  && /EmailJS/.test(legalDe.kurzCheckRecipients)
  && /Supabase Inc\.[^.]*EU-Region Frankfurt/.test(legalDe.kurzCheckRecipients)
  && /USA/.test(legalDe.kurzCheckRecipients)
  && /90 Tage/.test(legalDe.kurzCheckStorage)
  && /§ 7a UWG/.test(legalDe.kurzCheckStorage)
  && /widerrufen/.test(legalDe.kurzCheckRevocation));
check('Kurzcheck-Absatz bestätigt die Messsperre der Schwangeren-Strecke', /weder Meta Pixel noch Google Ads noch Google Analytics/.test(legalDe.kurzCheckTracking));
check('Meta-Formular-Absatz nennt Meta, Rechtsgrundlage, Löschfrist und Datenschutzrichtlinie', /Meta Platforms Ireland Limited/.test(legalDe.metaLeadFormsText)
  && /Art\. 6 Abs\. 1 lit\. a DSGVO/.test(legalDe.metaLeadFormsLegalBasis)
  && /90 Tage/.test(legalDe.metaLeadFormsStorage)
  && /facebook\.com\/privacy\/policy/.test(legalDe.metaLeadFormsPlatform));
check('Neue Absätze in Sie-Form', ![...kurzCheckKeys, ...metaLeadKeys, 'leitfadenText'].some((key) => /\b(du|dein|deine|dich|dir)\b/i.test(legalDe[key])));

const failed = checks.filter(([, passed]) => !passed);
for (const [label, passed] of checks) {
  console.log(`${passed ? '✓' : '✗'} ${label}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} Kurzcheck-Einwilligungstest(s) fehlgeschlagen.`);
  process.exit(1);
}

console.log(`\n${checks.length} Kurzcheck-Einwilligungstests bestanden.`);
