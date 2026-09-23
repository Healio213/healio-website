/**
 * Vertragstest fuer den Praxis-Leitfaden-Funnel.
 *
 * Geprueft werden die Punkte, die still kaputtgehen koennen, ohne dass ein
 * Build rot wird: Route, Formularfelder, Honeypot, Einwilligungstext,
 * noindex der Dankeseite, SEO-Eintrag und der Download-Link.
 *
 * Ausfuehren: npm run test:leitfaden
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const app = read('src/App.jsx');
const optin = read('src/pages/PraxisLeitfadenPage.jsx');
const danke = read('src/pages/PraxisLeitfadenDankePage.jsx');
const form = read('src/components/sections/partner/PraxisLeitfadenForm.jsx');
const api = read('api/partner-lead.js');
const partnerPage = read('src/pages/PartnerPage.jsx');
const partnerDe = JSON.parse(read('src/i18n/locales/de/partner.json'));
const partnerEn = JSON.parse(read('src/i18n/locales/en/partner.json'));
const legalDe = JSON.parse(read('src/i18n/locales/de/legal.json'));
const legalEn = JSON.parse(read('src/i18n/locales/en/legal.json'));
const privacyPage = read('src/pages/DatenschutzPage.jsx');
const seoRoutesSource = read('scripts/seo-routes.mjs');
const seoContract = read('scripts/check-site-seo.mjs');
const sitemap = read('public/sitemap.xml');
const metaPixel = read('src/lib/meta-pixel.js');
const metaCapi = read('api/meta-events.js');
const vercelConfig = JSON.parse(read('vercel.json'));

const DOWNLOAD_PATH = '/downloads/healio-leitfaden-therapieabbruch-stopper-2026.pdf';
const CONSENT_VERSION = 'leitfaden-v1-2026-09-23';
const PRACTICE_TYPES = ['naturheilkunde', 'osteopathie', 'chiropraktik', 'physiotherapie', 'zahnarzt', 'sonstiges'];

const checks = [];
const check = (label, passed) => checks.push([label, Boolean(passed)]);

// --- Routen -----------------------------------------------------------------
check('Optin-Seite wird lazy geladen', app.includes("import('@/pages/PraxisLeitfadenPage')"));
check('Dankeseite wird lazy geladen', app.includes("import('@/pages/PraxisLeitfadenDankePage')"));
check('Route /partner/leitfaden existiert', app.includes('path="partner/leitfaden" element={<PraxisLeitfadenPage />}'));
check('Route /partner/leitfaden/danke existiert', app.includes('path="partner/leitfaden/danke" element={<PraxisLeitfadenDankePage />}'));

// --- Formularfelder ---------------------------------------------------------
check('Vorname ist vorhanden', /name="firstName"/.test(form) && /maxLength=\{80\}/.test(form));
check('E-Mail ist vorhanden', /name="email"[\s\S]{0,200}?type="email"/.test(form) && /maxLength=\{254\}/.test(form));
check('Telefon ist freiwillig und als solches ausgewiesen', /name="phone"/.test(form) && /\(freiwillig\)/.test(form) && /Für einen kurzen Rückruf, wenn du magst\./.test(form));
check('Praxisart ist eine Auswahl mit den festgelegten Werten', PRACTICE_TYPES.every((value) => form.includes(`value: '${value}'`)));
check('Pflichtprüfung läuft ohne Browser-Validierung', /noValidate/.test(form) && /EMAIL_PATTERN\.test\(email\)/.test(form));
check('Ladezustand und Fehlermeldung sind vorhanden', /isSubmitting/.test(form) && /errorMessage/.test(form));
check('Fehlermeldung nennt keine technischen Details', !/status|HTTP|\bAPI\b|Supabase/i.test(form.match(/setErrorMessage\('[^']*'\)/g)?.join(' ') || ''));

// --- Honeypot ---------------------------------------------------------------
check('Honeypot ist genau einmal eingebaut', (form.match(/<FormHoneypot \/>/g) || []).length === 1);
check('Honeypot wird direkt nach preventDefault geprüft', form.indexOf('isHoneypotFilled(') > form.indexOf('.preventDefault()') && form.indexOf('.preventDefault()') !== -1);
check('Serverfunktion verwirft gefüllte Honeypots ohne Speicherung', /payload\.healio_website/.test(api) && /discard: true/.test(api));

// --- Einwilligung -----------------------------------------------------------
const consentSentence = 'Ich möchte den Leitfaden erhalten und bin einverstanden, dass die Healio GmbH mich dazu per';
check('Einwilligungstext steht wörtlich im Formular', form.includes(consentSentence));
check('Einwilligung nennt Widerruf und info@healio.de', /jederzeit\s*\n?\s*widerrufen/.test(form) && form.includes('info@healio.de'));
check('Einwilligung verlinkt die Datenschutzseite', /to="\/datenschutz"/.test(form));
check('Einwilligung ist eine Pflicht-Checkbox', /name="consent"/.test(form) && /type="checkbox"/.test(form) && /!formData\.consent/.test(form));
check('Einwilligungsfassung ist fest verdrahtet', form.includes(`'${CONSENT_VERSION}'`) && api.includes(`'${CONSENT_VERSION}'`));

// --- Serverfunktion ---------------------------------------------------------
check('Serverfunktion prüft die Herkunft', /ALLOWED_ORIGINS/.test(api) && /isAllowedOrigin\(req\.headers\.origin\)/.test(api));
check('Serverfunktion nimmt nur POST an', /req\.method !== 'POST'/.test(api));
check('Serverfunktion begrenzt die Anzahl je IP', /RATE_LIMIT_MAX/.test(api) && /429/.test(api));
check('Serverfunktion speichert die IP nur als Prüfwert', /createHash\('sha256'\)/.test(api) && /LEAD_IP_SALT/.test(api) && !/ip:\s*clientIp/.test(api));
check('Serverfunktion nutzt Prefer: return=minimal', /'return=minimal'/.test(api));
check('Serverfunktion schreibt in die vereinbarte Tabelle', api.includes('/rest/v1/praxis_leitfaden_leads'));
check('Serverfunktion loggt nichts', !/console\.(?:log|error|warn|info)/.test(api));
check('Keine Zugangsdaten im Quelltext', !/sb_publishable_|service_role|eyJhbGciOi/.test(api + form + optin + danke));

// --- Dankeseite -------------------------------------------------------------
check('Dankeseite ist noindex, nofollow', danke.includes('robots="noindex, nofollow"'));
check('Dankeseite bestätigt den Leitfaden', danke.includes('Dein Leitfaden ist da'));
check('Download-Link zeigt auf das vereinbarte PDF', danke.includes(DOWNLOAD_PATH) && /download="Healio-Leitfaden-Therapieabbruch-Stopper-2026\.pdf"/.test(danke));
check('Download-Link trägt keine Personen- oder Praxismerkmale', !/[?&](?:ref|utm_|practice|praxis|email)/i.test(danke.match(/const LEITFADEN_DOWNLOAD_PATH[^;]+/)?.[0] || ''));
check('Praxis-Check ist mit drei Punkten beschrieben', danke.includes('Was dich im Praxis-Check erwartet') && (danke.match(/\btitle: '/g) || []).length === 3);
check('Terminknopf führt auf dieselbe Buchung wie /partner', danke.includes('utm_source=leitfaden&utm_medium=danke&utm_campaign=therapieabbruch-stopper') && danke.includes('APPOINTMENT_BOOKING.url'));
check('Platz für das spätere Video ist als Kommentar markiert, nicht als leeres Element', /Platz für ein kurzes Video/.test(danke));

// --- Optin-Seite ------------------------------------------------------------
check('Überschrift nennt das Ergebnis', optin.includes('Der Therapieabbruch-Stopper: So machen deine Selbstzahler die Behandlungsserie zu Ende'));
check('Unterzeile nennt 3.000 EUR in zwei Jahren', /Bis zu 3\.000 EUR Gesundheitsbudget in zwei Jahren/.test(optin));
check('Genau drei Nutzenpunkte', (optin.match(/\btitle: '/g) || []).length === 3);
check('Aussortier-Satz ist vorhanden', optin.includes('Nicht gedacht für Praxen, die vor allem Kassenpatienten'));
check('Formular ist eingebunden', optin.includes('<PraxisLeitfadenForm />'));
check('Optin-Seite hat genau eine H1', (optin.match(/<h1\b/g) || []).length === 1);
check('Optin-Seite führt nicht zu anderen Angeboten', !/to="\/(?:zahn|ambulant|stationaer|unternehmen|leistungen)"/.test(optin));
check('Keine Gedankenstriche in den Seitentexten', !/—/.test(optin + danke + form));

// --- SEO --------------------------------------------------------------------
check('SEO-Eintrag der Optin-Seite ist indexierbar', /path: '\/partner\/leitfaden',[\s\S]{0,900}?canonical: 'https:\/\/healio\.de\/partner\/leitfaden'/.test(seoRoutesSource));
check('SEO-Titel der Optin-Seite ist gesetzt', seoRoutesSource.includes("title: 'Der Therapieabbruch-Stopper: Leitfaden für Naturheilpraxen | Healio'"));
check('SEO-Beschreibung nennt 3.000 EUR in zwei Jahren', /description: '[^']*3\.000 EUR Gesundheitsbudget in zwei Jahren[^']*',\n\s*canonical: 'https:\/\/healio\.de\/partner\/leitfaden'/.test(seoRoutesSource));
check('SEO-Eintrag der Dankeseite ist noindex', /path: '\/partner\/leitfaden\/danke',[\s\S]{0,600}?robots: 'noindex, nofollow'/.test(seoRoutesSource));
check('SEO-Vertrag kennt beide Routen', seoContract.includes("'/partner/leitfaden'") && seoContract.includes("'/partner/leitfaden/danke'"));
check('Optin-Seite steht in der Sitemap', sitemap.includes('<loc>https://healio.de/partner/leitfaden</loc>'));
check('Dankeseite steht nicht in der Sitemap', !sitemap.includes('<loc>https://healio.de/partner/leitfaden/danke</loc>'));
check('PDF-Verzeichnis ist per Header auf noindex gesetzt', (vercelConfig.headers || []).some((rule) => rule.source === '/downloads/(.*)'
  && (rule.headers || []).some(({ key, value }) => key.toLowerCase() === 'x-robots-tag' && /noindex/.test(value))));

// --- Meta -------------------------------------------------------------------
check('Lead-Ereignis kennt den Leitfaden-Schlüssel', /export const META_LEITFADEN_KEY = 'praxis-leitfaden';/.test(metaPixel));
check('CAPI-Allowlist kennt den Leitfaden-Schlüssel', metaCapi.includes("'praxis-leitfaden'"));
check('Formular löst das Lead-Ereignis aus', /trackMetaLead\(\{ content_name: META_LEITFADEN_KEY \}\)/.test(form));
check('Formular enthält keine eigene Meta-Logik', !/\bfbq\s*\(/.test(form));

// --- Partnerseite und Datenschutz -------------------------------------------
check('Partnerseite verweist auf die Optin-Seite', partnerPage.includes('to="/partner/leitfaden"'));
check('Partnerseite behält den Termin-Knopf', partnerPage.includes("t('hero.cta')"));
check('Hinweistext liegt in beiden Sprachen vor', Boolean(partnerDe.leitfadenHint?.cta) && Boolean(partnerEn.leitfadenHint?.cta));
check('Datenschutz-Absatz liegt in beiden Sprachen vor', Boolean(legalDe.datenschutz?.leitfadenText) && Boolean(legalEn.datenschutz?.leitfadenText));
check('Datenschutz-Absatz nennt Zweck, Daten, Speicherort und Rechtsgrundlage', /Vorname/.test(legalDe.datenschutz.leitfadenText)
  && /Telefonnummer \(freiwillig\)/.test(legalDe.datenschutz.leitfadenText)
  && /Praxisart/.test(legalDe.datenschutz.leitfadenText)
  && /Supabase/.test(legalDe.datenschutz.leitfadenText)
  && /Frankfurt/.test(legalDe.datenschutz.leitfadenText)
  && /Art\. 6 Abs\. 1 lit\. a DSGVO/.test(legalDe.datenschutz.leitfadenText)
  && /widerrufen/.test(legalDe.datenschutz.leitfadenText)
  && /löschen/.test(legalDe.datenschutz.leitfadenText));
check('Datenschutzseite gibt den Absatz aus', privacyPage.includes("datenschutz.leitfadenTitle") && privacyPage.includes("datenschutz.leitfadenText"));

const failed = checks.filter(([, passed]) => !passed);
for (const [label, passed] of checks) {
  console.log(`${passed ? '✓' : '✗'} ${label}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} Praxis-Leitfaden-Vertragstest(s) fehlgeschlagen.`);
  process.exit(1);
}

console.log(`\n${checks.length} Praxis-Leitfaden-Vertragstests bestanden.`);
