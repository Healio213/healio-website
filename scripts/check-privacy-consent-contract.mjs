import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { buildNitaContext, buildNitaFirstMessage, sanitizeNitaEntryPoint } from '../src/lib/nitaContext.js';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const failures = [];

const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const collectSourceFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const entryPath = path.join(directory, entry.name);
  if (entry.isDirectory()) return collectSourceFiles(entryPath);
  return /\.(?:js|jsx)$/.test(entry.name) ? [entryPath] : [];
});

const indexHtml = read('index.html');
const app = read('src/App.jsx');
const dentalCheck = read('src/components/sections/dental/DentalZahnCheck.jsx');
const dentalPage = read('src/pages/ZahnPage.jsx');
const miaPrompt = read('src/components/sections/ambulant/AmbulantMiaPrompt.jsx');
const stickyCalculator = read('src/components/sections/ambulant/StickyCalculatorButton.jsx');
const nitaWidget = read('src/components/NitaConsentWidget.jsx');
const consentManager = read('src/components/ConsentManager.jsx');
const companyHero = read('src/components/company/CompanyHero.jsx');
const indexCss = read('src/index.css');
const footer = read('src/components/sections/Footer.jsx');
const header = read('src/components/Header.jsx');
const consent = read('src/lib/consent.js');
const analytics = read('src/lib/analytics.js');
const privacyPage = read('src/pages/DatenschutzPage.jsx');
const veterinaryForm = read('src/components/sections/VeterinaryContactForm.jsx');
const legalDe = JSON.parse(read('src/i18n/locales/de/legal.json'));
const legalEn = JSON.parse(read('src/i18n/locales/en/legal.json'));
const sourceFiles = fs.readdirSync(path.join(root, 'src/pages'))
  .filter((file) => file.endsWith('.jsx'))
  .map((file) => [`src/pages/${file}`, read(`src/pages/${file}`)]);
const completeSource = collectSourceFiles(path.join(root, 'src'))
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n');

const outpatientContext = buildNitaContext('/ambulant', 'global_launcher');
const outpatientEnglishContext = buildNitaContext('/en/outpatient', 'global_launcher');
const dentalContext = buildNitaContext('/zahn?score=9#ergebnis', 'delayed_prompt');
const unknownContext = buildNitaContext('/unbekannt', 'untrusted-entry');
const dentalContextJson = JSON.stringify(dentalContext);
const englishPartnerMessage = buildNitaFirstMessage(buildNitaContext('/en/partner', 'delayed_prompt'));

expect(outpatientContext.healio_language === 'de' && outpatientContext.healio_product === 'outpatient' && outpatientContext.healio_page === 'outpatient', 'Nita muss den deutschen Ambulant-Kontext erkennen.');
expect(outpatientEnglishContext.healio_language === 'en' && outpatientEnglishContext.healio_product === 'outpatient' && outpatientEnglishContext.healio_page === 'outpatient', 'Nita muss den englischen Ambulant-Kontext erkennen.');
expect(buildNitaContext('/enterprise').healio_language === 'de', 'Nur /en und /en/... dürfen als englische Nita-Seiten gelten.');
expect(JSON.stringify(Object.keys(dentalContext).sort()) === JSON.stringify(['healio_entry_point', 'healio_language', 'healio_page', 'healio_product']), 'Der Zahn-Kontext darf nur die vier freigegebenen Felder enthalten.');
expect(dentalContext.healio_language === 'de' && dentalContext.healio_product === 'dental' && dentalContext.healio_page === 'dental', 'Der Zahn-Kontext muss ausschließlich die statische Zahn-Seite beschreiben.');
expect(!/(score|ergebnis|result|zahn\?)/i.test(dentalContextJson), 'Zahn-Check-Antworten, Ergebnisse und Rohpfade dürfen Nita nie erreichen.');
expect(buildNitaContext('/blog/geheime-details').healio_page === 'blog' && !JSON.stringify(buildNitaContext('/blog/geheime-details')).includes('geheime-details'), 'Blogartikel dürfen nur als stabile Blog-Seite ohne Slug übergeben werden.');
expect(unknownContext.healio_page === 'other' && unknownContext.healio_product === 'general', 'Unbekannte Routen müssen auf einen neutralen Kontext zurückfallen.');
expect(sanitizeNitaEntryPoint('untrusted-entry') === 'global_launcher', 'Unbekannte Nita-Einstiege müssen auf den globalen Launcher zurückfallen.');
expect(/partnership/i.test(englishPartnerMessage), 'Der englische Partner-Einstieg muss die Partnerschaft statt einer generischen Erklärung aufgreifen.');

const emailJsDisclosureDe = `${legalDe.datenschutz.emailJsTitle || ''} ${legalDe.datenschutz.emailJsText || ''}`;
const emailJsDisclosureEn = `${legalEn.datenschutz.emailJsTitle || ''} ${legalEn.datenschutz.emailJsText || ''}`;

expect(
  /emailjsService\.sendEmail\([\s\S]*?from_name:\s*formData\.name[\s\S]*?from_email:\s*formData\.email[\s\S]*?Tierart:[\s\S]*?Gewünschter Schutz:[\s\S]*?Alter:[\s\S]*?Rasse:[\s\S]*?Nutzung:/.test(veterinaryForm),
  'Der Datenschutzvertrag muss an den tatsächlich per EmailJS versandten Kontakt- und Tierprofildaten ausgerichtet bleiben.',
);
expect(
  /reviewOrderAccepted:\s*false/.test(veterinaryForm)
    && /name="reviewOrderAccepted"[\s\S]*?required[\s\S]*?checked=\{formData\.reviewOrderAccepted\}/.test(veterinaryForm)
    && /privacyAccepted:\s*false/.test(veterinaryForm)
    && /name="privacyAccepted"[\s\S]*?required[\s\S]*?checked=\{formData\.privacyAccepted\}/.test(veterinaryForm),
  'Prüfauftrag und Datenschutzbestätigung müssen getrennt, erforderlich und standardmäßig abgewählt bleiben.',
);
expect(
  /Prüf- und Beratungsauftrag: erteilt/.test(veterinaryForm)
    && /Auftragstext:/.test(veterinaryForm)
    && /Auftragsfassung:/.test(veterinaryForm)
    && /Auftrag erteilt am:/.test(veterinaryForm)
    && /Datenschutzhinweis bestätigt: ja/.test(veterinaryForm),
  'Die Tierformular-Nachricht muss Auftragstext, Fassung, Zeitpunkt und Datenschutzbestätigung dokumentieren.',
);
expect(
  /datenschutz\.emailJsTitle/.test(privacyPage)
    && /datenschutz\.emailJsText/.test(privacyPage)
    && /https:\/\/www\.emailjs\.com\/legal\/privacy-policy\//.test(privacyPage)
    && /https:\/\/www\.emailjs\.com\/legal\/data-protection-agreement\//.test(privacyPage),
  'Die Datenschutzerklärung muss den EmailJS-Transport samt offizieller Anbieterinformation sichtbar ausgeben.',
);
expect(
  /\{t\('datenschutz\.contactFormText'\)\}/.test(privacyPage)
    && !/Diese Daten geben wir nicht ohne Ihre Einwilligung weiter\./.test(privacyPage),
  'Die allgemeine Kontaktformular-Erklärung darf dem transparent beschriebenen EmailJS-Transport nicht widersprechen.',
);
expect(
  /EmailJS Pte\. Ltd\./.test(emailJsDisclosureDe)
    && /Name/.test(emailJsDisclosureDe)
    && /E-Mail-Adresse/.test(emailJsDisclosureDe)
    && /Tierart/.test(emailJsDisclosureDe)
    && /Schutzwunsch/.test(emailJsDisclosureDe)
    && /Alter/.test(emailJsDisclosureDe)
    && /Rasse/.test(emailJsDisclosureDe)
    && /Nutzung/.test(emailJsDisclosureDe)
    && /Beauftragung/.test(emailJsDisclosureDe)
    && /Fassung/.test(emailJsDisclosureDe)
    && /Zeitpunkt/.test(emailJsDisclosureDe)
    && /USA|Vereinigten Staaten/.test(emailJsDisclosureDe)
    && /Standardvertragsklauseln/.test(emailJsDisclosureDe),
  'Die deutsche EmailJS-Offenlegung muss Anbieter, Datenkategorien und Drittlandtransfer transparent benennen.',
);
expect(
  /EmailJS Pte\. Ltd\./.test(emailJsDisclosureEn)
    && /name/i.test(emailJsDisclosureEn)
    && /email address/i.test(emailJsDisclosureEn)
    && /animal type/i.test(emailJsDisclosureEn)
    && /cover requested/i.test(emailJsDisclosureEn)
    && /age/i.test(emailJsDisclosureEn)
    && /breed/i.test(emailJsDisclosureEn)
    && /use/i.test(emailJsDisclosureEn)
    && /commission/i.test(emailJsDisclosureEn)
    && /version/i.test(emailJsDisclosureEn)
    && /time/i.test(emailJsDisclosureEn)
    && /United States|US processing/i.test(emailJsDisclosureEn)
    && /Standard Contractual Clauses/i.test(emailJsDisclosureEn),
  'Die englische EmailJS-Offenlegung muss dieselben Anbieter-, Daten- und Transferinformationen enthalten.',
);

expect(!/googletagmanager\.com\/gtag\/js/i.test(indexHtml), 'GA4 darf nicht statisch aus index.html geladen werden.');
expect(!/elevenlabs\.io\/convai-widget/i.test(indexHtml), 'ElevenLabs darf nicht statisch aus index.html geladen werden.');
expect(!/window\.gtag/.test(completeSource), 'Alte direkte gtag-Aufrufe müssen den consent-gesteuerten Tracker verwenden.');
expect(/<ConsentManager\s*\/>/.test(app), 'ConsentManager muss global gemountet sein.');
expect(/<NitaConsentWidget\s*\/>/.test(app), 'NitaConsentWidget muss global gemountet sein.');
expect(/trackPageView\(location\.pathname\)/.test(app), 'SPA-Seitenwechsel müssen über den consent-gesteuerten Tracker laufen.');
expect(/setAnalyticsRouteBlocked\(isDentalCheckRoute\)/.test(app), 'Analytics muss auf beiden Zahn-Check-Routen global blockiert werden.');
expect(/isDentalCheckRoute \|\| !hasConsent\('analytics', state\)/.test(app), 'Der SPA-Tracker muss Zahn-Check-Routen überspringen.');
expect(!/(?:gtag|trackEvent|trackZahnEvent|analytics|consent)/i.test(dentalCheck), 'Der Zahn-Check muss ohne Analytics und Consent-Logik bleiben.');
expect(!/AmbulantMiaPrompt/.test(dentalPage), 'Die Zahnseite darf keinen verzögerten Nita-Prompt enthalten.');
expect(!/HIDDEN_ROUTE_PREFIXES[\s\S]*?'\/zahn'/.test(nitaWidget), 'Nita muss auch auf der deutschen Zahn-Seite verfügbar sein.');
expect(!/HIDDEN_ROUTE_PREFIXES[\s\S]*?'\/en\/dental'/.test(nitaWidget), 'Nita muss auch auf der englischen Zahn-Seite verfügbar sein.');
expect(/!isDentalCheckRoute\s*&&\s*\([\s\S]*?onClick=\{handleOpenSettings\}/.test(nitaWidget), 'Der auf Zahn-Routen gesperrte allgemeine Einstellungsdialog darf dort nicht als wirkungsloser Nita-Button angeboten werden.');
expect(/@elevenlabs\/convai-widget-embed@0\.15\.1\/dist\/index\.js/.test(nitaWidget), 'Nita muss die aktuelle fest versionierte ElevenLabs-Einbindung verwenden.');
expect(/dismissible="true"/.test(nitaWidget), 'Das Nita-Widget muss sich wieder schließen lassen.');
expect(/text-input="true"/.test(nitaWidget), 'Das Nita-Widget muss neben Sprache auch Chat anbieten.');
expect(/show-resize-button="true"/.test(nitaWidget), 'Das Nita-Widget muss sich wieder einklappen lassen.');
expect(/variant="tiny"/.test(nitaWidget), 'Nita muss beim Seitenaufruf als kleiner Punkt starten.');
expect(/healio-nita-quiet-launcher/.test(nitaWidget), 'Auch vor der ElevenLabs-Freigabe muss Nita als dezenter Punkt erscheinen.');
expect(/const \[widgetActivated, setWidgetActivated\] = useState\(false\)/.test(nitaWidget), 'Das externe Nita-Widget darf beim Seitenaufruf nicht automatisch aktiviert sein.');
expect(/providerAllowed && loadStatus === 'ready' && widgetActivated/.test(nitaWidget), 'Das externe Nita-Widget darf erst nach einem bewussten Klick sichtbar werden.');
expect(/widgetActivated && providerAllowed && loadStatus === 'loading'[\s\S]*?className="sr-only"/.test(nitaWidget), 'Der Nita-Ladevorgang darf erst nach Aktivierung angekündigt und nicht sichtbar eingeblendet werden.');
expect(/widgetActivated && providerAllowed && loadStatus === 'error'/.test(nitaWidget), 'Ein automatischer Ladefehler darf erst nach einem bewussten Nita-Klick sichtbar werden.');
expect(/default-expanded="false"/.test(nitaWidget) && /always-expanded="false"/.test(nitaWidget), 'ElevenLabs darf Nita nicht durch eine spätere Dashboard-Änderung automatisch öffnen.');
expect(/const handleNitaRequest = \(event\) => \{[\s\S]*?setWidgetActivationPending\(true\)/.test(nitaWidget), 'Content-CTAs müssen den kleinen Nita-Punkt bewusst mit dem aktuellen Kontext aktivieren.');
expect(!/shadowRoot/.test(nitaWidget), 'Nita darf nicht von der internen ElevenLabs-DOM-Struktur abhängen.');
expect(/const handleOpenSettings = \(\) => \{[\s\S]*?setPromptOpen\(false\);[\s\S]*?openConsentSettings\('elevenlabs'\)/.test(nitaWidget), 'Beim Wechsel in die Datenschutz-Einstellungen muss der Nita-Hinweis vorher schließen.');
expect(/\.healio-nita-widget elevenlabs-convai \{[\s\S]*?bottom: calc\(var\(--healio-nita-safe-bottom/.test(nitaWidget), 'Die echte ElevenLabs-Fläche muss mobil oberhalb der Daumenzone positioniert werden.');
expect(!/elevenlabs-convai\s*\{\s*display:\s*none\s*!important/.test(companyHero), 'Die Unternehmensseite darf Nita nicht global ausblenden.');
expect(!/html\.legal-information-active elevenlabs-convai/.test(indexCss), 'Rechtsseiten dürfen das globale Nita-Widget nicht ausblenden.');
expect(/top-\[5\.25rem\][\s\S]*md:bottom-3[\s\S]*md:top-auto/.test(consentManager), 'Das Erstbesucher-Datenschutzfeld muss mobil kompakt unter dem Header statt in der Daumenzone liegen.');
expect(!/healio-consent-settings-trigger/.test(consentManager), 'Nach der Auswahl darf kein schwebender Datenschutz-Schalter stehen bleiben.');
expect(/openConsentSettings\(\)/.test(footer), 'Die Datenschutz-Auswahl muss dezent über den Footer erneut erreichbar bleiben.');
expect(/text-contents=\{language === 'en'/.test(nitaWidget), 'Nitas Widget-Bedienung muss auf englischen Seiten englisch beschriftet sein.');
expect(/const language = pathname === '\/en' \|\| pathname\.startsWith\('\/en\/'\) \? 'en' : 'de'/.test(nitaWidget), 'Widget-Sprache und Nita-Kontext müssen dieselbe strikte /en-Routengrenze verwenden.');
expect(/dynamic-variables=\{JSON\.stringify\(activeNitaContext\)\}/.test(nitaWidget), 'Nita muss den freigegebenen Seitenkontext als Dynamic Variables erhalten.');
expect(/override-first-message=\{buildNitaFirstMessage\(activeNitaContext\)\}/.test(nitaWidget), 'Nita muss nach dem bestehenden Hilfetext mit einer passenden, fest vorgegebenen Begrüßung fortfahren.');
expect(/const pendingContextRef = useRef\(activeNitaContext\)[\s\S]*?const activateWidgetWithContext = \(context\) => \{[\s\S]*?setActiveNitaContext\(context\)/.test(nitaWidget), 'Der ausgewählte Nita-Kontext muss vor dem Widget-Start stabil aktiviert werden.');
expect(/const handleAllow = \(\) => \{[\s\S]*?activateWidgetWithContext\(pendingContextRef\.current\)/.test(nitaWidget), 'Nach der ElevenLabs-Freigabe muss Nita mit dem zuvor gewählten Seitenkontext starten.');
expect(/useLayoutEffect\(\(\) => \{[\s\S]*?if \(!widgetActivationPending\) return;[\s\S]*?setWidgetActivated\(true\)/.test(nitaWidget), 'Nita darf erst nach dem Rendern des aktuellen Kontextes aktiviert werden.');
expect(/const lastContextPathRef = useRef\(pathname\)[\s\S]*?lastContextPathRef\.current = pathname;[\s\S]*?const nextContext = buildNitaContext\(pathname, 'global_launcher'\);[\s\S]*?setActiveNitaContext\(nextContext\)/.test(nitaWidget), 'Bei einem SPA-Seitenwechsel muss Nita vor dem nächsten Gespräch den neuen Seitenkontext erhalten.');
expect(/AMBULANT_CTA_DELAY_MS\s*=\s*30_000/.test(header), 'Der mobile Ambulant-CTA muss 30 Sekunden verzögert werden.');
expect(/isAmbulant\s*&&\s*showSolidHeader\s*&&\s*ambulantCtaReady/.test(header), 'Der mobile Ambulant-CTA darf erst im dunklen Header nach Ablauf der Wartezeit erscheinen.');
expect(/ambulant-header-mobile/.test(header), 'Die Ambulant-Seite braucht mobil einen Tarif-CTA im Header.');
expect(/fixed bottom-6 right-6[\s\S]*hidden[\s\S]*md:block/.test(stickyCalculator), 'Der schwebende Tarif-CTA darf mobil nicht mehr in der Daumenzone liegen.');
expect(/showBanner && !settingsOpen && !isDentalCheckRoute/.test(consentManager), 'Das initiale Consent-Banner darf im Zahn-Check nicht erscheinen.');
expect(/!isDentalCheckRoute && \(/.test(footer), 'Auch der Footer-Link zu Cookie-Einstellungen muss im Zahn-Check ausgeblendet bleiben.');
expect(/settingsOpen && !isDentalCheckRoute/.test(consentManager), 'Auch der Einstellungsdialog muss im Zahn-Check ausgeblendet bleiben.');
expect(/ANALYTICS_EXCLUDED_PATHS = new Set\(\['\/zahn', '\/en\/dental'\]\)/.test(analytics), 'Beide Zahn-Check-Routen müssen in der Analytics-Sperrliste stehen.');
expect(/ga-disable-\$\{GA4_MEASUREMENT_ID\}/.test(analytics), 'Die Zahn-Check-Sperre muss das GA4-Deaktivierungsflag setzen.');
expect(/requestNitaConsent\('delayed_prompt'\)/.test(miaPrompt), 'Der bestehende Nita-Prompt muss seinen freigegebenen Einstieg an Nita weitergeben.');
expect(/healio-nita-teaser-active/.test(miaPrompt), 'Nita-Teaser und globaler Launcher müssen sich gegenseitig ausschließen.');
expect(/healio-mobile-menu-active/.test(header), 'Das mobile Menü muss externe Overlays während der Navigation ausblenden.');
expect(/html\.healio-mobile-menu-active \.healio-nita-surface/.test(nitaWidget), 'Das mobile Menü muss den globalen Nita-Punkt auch visuell und interaktiv ausblenden.');

for (const purpose of ['analytics', 'calendly', 'maps', 'elevenlabs']) {
  expect(consent.includes(`'${purpose}'`), `Consent-Zweck ${purpose} fehlt.`);
}

for (const [file, source] of sourceFiles) {
  expect(!/<iframe[\s\S]*?src=["']https:\/\/calendly\.com/i.test(source), `${file} lädt Calendly noch direkt.`);
  expect(!/<iframe[\s\S]*?src=["']https:\/\/www\.google\.com\/maps/i.test(source), `${file} lädt Google Maps noch direkt.`);
  expect(!/assets\.calendly\.com\/assets\/external\/widget\.js/i.test(source), `${file} lädt das Calendly-Script noch direkt.`);
}

if (failures.length > 0) {
  console.error(`Privacy-Consent-Contract fehlgeschlagen (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Privacy-Consent-Contract erfüllt: Zahn-Check lokal, externe Dienste consent-gesteuert.');
