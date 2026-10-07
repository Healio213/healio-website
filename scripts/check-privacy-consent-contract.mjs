import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { runInNewContext } from 'node:vm';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
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
const metaPixel = read('src/lib/meta-pixel.js');
const metaCapi = read('api/meta-events.js');
const envExample = read('.env.example');
const vercelConfig = read('vercel.json');
const metaSourceFiles = collectSourceFiles(path.join(root, 'src'))
  .map((file) => [path.relative(root, file), fs.readFileSync(file, 'utf8')]);
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
expect(/setAnalyticsRouteBlocked\(isPrivateCheckRoute\)/.test(app), 'Analytics muss auf privaten Check-Routen global blockiert werden.');
expect(/isPrivateCheckRoute \|\| !hasConsent\('analytics', state\)/.test(app), 'Der SPA-Tracker muss private Check-Routen überspringen.');
expect(!/(?:gtag|trackEvent|trackZahnEvent|analytics|consent)/i.test(dentalCheck), 'Der Zahn-Check muss ohne Analytics und Consent-Logik bleiben.');
expect(!/AmbulantMiaPrompt/.test(dentalPage), 'Die Zahnseite darf keinen verzögerten Nita-Prompt enthalten.');
expect(!/HIDDEN_ROUTE_PREFIXES[\s\S]*?'\/zahn'/.test(nitaWidget), 'Nita muss auch auf der deutschen Zahn-Seite verfügbar sein.');
expect(!/HIDDEN_ROUTE_PREFIXES[\s\S]*?'\/en\/dental'/.test(nitaWidget), 'Nita muss auch auf der englischen Zahn-Seite verfügbar sein.');
expect(/!isDentalCheckRoute && <button[\s\S]*?openConsentSettings\('openai'\)/.test(nitaWidget), 'Der auf Zahn-Routen gesperrte allgemeine Einstellungsdialog darf dort nicht als wirkungsloser Nita-Button angeboten werden.');
expect(/https:\/\/voice-pilot\.healio\.de\/nita\/realtime\/session/.test(nitaWidget), 'Nita muss den fest gebundenen Healio-WebRTC-Broker verwenden.');
expect(!/VITE_NITA_WEBRTC_SESSION_ENDPOINT|\/api\/nita-session/.test(nitaWidget), 'Nita darf keinen frei konfigurierbaren oder Vercel-basierten Session-Endpunkt verwenden.');
expect(/RTCPeerConnection/.test(nitaWidget), 'Nita muss die direkte OpenAI-WebRTC-Strecke verwenden.');
expect(!/ElevenLabs|elevenlabs-convai|unpkg\.com/.test(nitaWidget), 'Nita darf keine ElevenLabs-Einbindung mehr laden.');
expect(/healio-nita-quiet-launcher/.test(nitaWidget), 'Nita muss beim Seitenaufruf als dezenter Kreis erscheinen.');
expect(/aria-controls="healio-nita-panel"[\s\S]*?aria-expanded=\{panelOpen\}/.test(nitaWidget), 'Der Nita-Kreis muss das Sprachpanel zugänglich öffnen und schließen können.');
expect(/event\.key === 'Escape'[\s\S]*?closePanel\(\)/.test(nitaWidget), 'Das Sprachpanel muss per Escape wieder schließen.');
expect(/const handleNitaRequest = \(\) => \{[\s\S]*?setPanelOpen\(true\)/.test(nitaWidget), 'Content-CTAs müssen das Sprachpanel öffnen, ohne Browseranweisungen an den Agenten zu senden.');
expect(!/shadowRoot/.test(nitaWidget), 'Nita darf nicht von einer Anbieter-internen DOM-Struktur abhängen.');
expect(/credentials:\s*'omit'[\s\S]*?referrerPolicy:\s*'no-referrer'[\s\S]*?body:\s*offer\.sdp/.test(nitaWidget), 'Nita darf ausschließlich SDP ohne Cookies oder Referrer an den Broker übergeben.');
expect(!/body:\s*JSON\.stringify\(\{\s*sdp:/.test(nitaWidget), 'Nita darf keine Zusatzdaten oder Browseranweisungen an den Broker senden.');
expect(!/elevenlabs-convai\s*\{\s*display:\s*none\s*!important/.test(companyHero), 'Die Unternehmensseite darf Nita nicht global ausblenden.');
expect(!/html\.legal-information-active elevenlabs-convai/.test(indexCss), 'Rechtsseiten dürfen das globale Nita-Widget nicht ausblenden.');
const traverse = traverseModule.default || traverseModule;
const consentBannerClasses = [];
traverse(parse(consentManager, { sourceType: 'module', plugins: ['jsx'] }), {
  JSXOpeningElement({ node }) {
    if (node.name.type === 'JSXIdentifier' && node.name.name === 'section') {
      const className = node.attributes.find((attr) => attr.type === 'JSXAttribute' && attr.name.name === 'className')?.value;
      const classes = new Set(className?.type === 'StringLiteral' ? className.value.split(/\s+/) : []);
      if (classes.has('healio-consent-surface')) consentBannerClasses.push(classes);
    }
  },
});
expect(consentBannerClasses.length === 1 && [
  'fixed', 'inset-x-3', 'bottom-[max(0.75rem,env(safe-area-inset-bottom))]', 'md:bottom-3', 'md:top-auto',
].every((token) => consentBannerClasses[0]?.has(token))
  && ![...(consentBannerClasses[0] || [])].some((token) => token.startsWith('top-')),
'Das Erstbesucher-Datenschutzfeld muss mobil kompakt unten mit Safe-Area-Abstand liegen; ab md bleibt die bisherige Position erhalten.');
expect(!/healio-consent-settings-trigger/.test(consentManager), 'Nach der Auswahl darf kein schwebender Datenschutz-Schalter stehen bleiben.');
expect(/openConsentSettings\(\)/.test(footer), 'Die Datenschutz-Auswahl muss dezent über den Footer erneut erreichbar bleiben.');
expect(/const language = pathname === '\/en' \|\| pathname\.startsWith\('\/en\/'\) \? 'en' : 'de'/.test(nitaWidget), 'Sprachpanel und Nita-Kontext müssen dieselbe strikte /en-Routengrenze verwenden.');
expect(/const language = pathname === '\/en' \|\| pathname\.startsWith\('\/en\/'\) \? 'en' : 'de'/.test(nitaWidget), 'Widget-Sprache und Nita-Kontext müssen dieselbe strikte /en-Routengrenze verwenden.');
expect(/AMBULANT_CTA_DELAY_MS\s*=\s*30_000/.test(header), 'Der mobile Ambulant-CTA muss 30 Sekunden verzögert werden.');
expect(/isAmbulant\s*&&\s*showSolidHeader\s*&&\s*ambulantCtaReady/.test(header), 'Der mobile Ambulant-CTA darf erst im dunklen Header nach Ablauf der Wartezeit erscheinen.');
expect(/ambulant-header-mobile/.test(header), 'Die Ambulant-Seite braucht mobil einen Tarif-CTA im Header.');
expect(/fixed bottom-6 right-6[\s\S]*hidden[\s\S]*md:block/.test(stickyCalculator), 'Der schwebende Tarif-CTA darf mobil nicht mehr in der Daumenzone liegen.');
expect(/showBanner && !settingsOpen && !isDentalCheckRoute/.test(consentManager), 'Das initiale Consent-Banner darf im Zahn-Check nicht erscheinen.');
// Werte die tatsächlichen Footer-Listen für beide Sprachen und Routen aus.
// Die Ausblendung darf weder von JSX-Schreibweise noch von Klassenreihenfolge abhängen.
const footerBindings = new Map();
const footerConsentCalls = [];
traverse(parse(footer, { sourceType: 'module', plugins: ['jsx'] }), {
  VariableDeclarator({ node }) {
    if (node.id.type === 'Identifier') footerBindings.set(node.id.name, node.init);
  },
  CallExpression({ node }) {
    if (node.callee.type === 'Identifier' && node.callee.name === 'openConsentSettings') footerConsentCalls.push(node);
  },
});
const footerDataNames = ['isDentalCheckRoute', 'groups', 'pflichtItems', 'mobileGroups'];
const footerDataReady = footerDataNames.every((name) => footerBindings.has(name));
expect(footerDataReady, 'Der Footer muss seine Desktop- und Mobil-Links aus denselben gefilterten Daten ableiten.');
if (footerDataReady) {
  const footerDataCode = footerDataNames.map((name) => {
    const node = footerBindings.get(name);
    return `const ${name} = (${footer.slice(node.start, node.end)});`;
  }).join('\n');
  for (const pathname of ['/zahn', '/en/dental', '/', '/en', '/ambulant', '/en/outpatient']) {
    const data = runInNewContext(`${footerDataCode}\n({
      desktop: mobileGroups.flatMap((group) => group.items),
      mobile: [...mobileGroups.flatMap((group) => group.mobileItems), ...pflichtItems],
    })`, {
      pathname, lang: pathname.startsWith('/en') ? 'en' : 'de',
      t: (key) => key, getPath: (key) => `/${key}`,
    }, { timeout: 1000 });
    for (const [layout, items] of Object.entries(data)) {
      const expectedCookies = pathname === '/zahn' || pathname === '/en/dental' ? 0 : 1;
      expect(items.filter((item) => item.type === 'cookie').length === expectedCookies,
        `${pathname} (${layout}): Cookie-Einstellungen müssen im Zahn-Check fehlen und auf anderen Routen erreichbar bleiben.`);
    }
  }
}
const cookieRenderer = footerBindings.get('renderItem')?.body;
expect(cookieRenderer?.type === 'ConditionalExpression'
  && runInNewContext(footer.slice(cookieRenderer.test.start, cookieRenderer.test.end), { item: { type: 'cookie' } }) === true
  && runInNewContext(footer.slice(cookieRenderer.test.start, cookieRenderer.test.end), { item: { type: 'link' } }) === false
  && footerConsentCalls.length === 1
  && footerConsentCalls[0].start >= cookieRenderer.consequent.start
  && footerConsentCalls[0].end <= cookieRenderer.consequent.end,
'Die Cookie-Einstellungen dürfen nur vom gefilterten Cookie-Dateneintrag aus aufrufbar sein.');
expect(/settingsOpen && !isDentalCheckRoute/.test(consentManager), 'Auch der Einstellungsdialog muss im Zahn-Check ausgeblendet bleiben.');
expect(/ANALYTICS_EXCLUDED_PATHS = new Set\(\['\/zahn', '\/en\/dental', '\/schwangerschaft'\]\)/.test(analytics), 'Zahn-Check- und Schwangerschafts-Routen müssen in der Analytics-Sperrliste stehen.');
expect(/ga-disable-\$\{GA4_MEASUREMENT_ID\}/.test(analytics), 'Die Zahn-Check-Sperre muss das GA4-Deaktivierungsflag setzen.');
// GA4 erhaelt von der Einstiegsadresse nur utm_* und vom Verweis nur die fremde Domain.
expect(
  /const CAMPAIGN_PARAM_KEYS = Object\.freeze\(\['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'\]\);/.test(analytics)
    && /SAFE_CAMPAIGN_VALUE\.test\(value\) && !SENSITIVE_PATH_VALUE\.test\(value\)/.test(analytics)
    && /return `\$\{referrer\.origin\}\/`;/.test(analytics)
    && /referrer\.origin === window\.location\.origin\) return '';/.test(analytics),
  'GA4 darf von der Einstiegsadresse nur utm_* im sicheren Format und vom Verweis nur die fremde Domain bekommen.',
);
expect(!/gclid|gbraid|wbraid|fbclid/.test(analytics.replace(/\/\/[^\n]*/g, '')), 'Klick-Kennungen dürfen nie an GA4 gehen.');
expect(/landing: !landingAttributionSent/.test(analytics) && /landingAttributionSent = true;/.test(analytics), 'Die Herkunft darf nur am ersten Seitenaufruf hängen.');
expect(/requestNitaConsent\('delayed_prompt'\)/.test(miaPrompt), 'Der bestehende Nita-Prompt muss seinen freigegebenen Einstieg an Nita weitergeben.');
expect(/healio-nita-teaser-active/.test(miaPrompt), 'Nita-Teaser und globaler Launcher müssen sich gegenseitig ausschließen.');
expect(/healio-mobile-menu-active/.test(header), 'Das mobile Menü muss externe Overlays während der Navigation ausblenden.');
expect(/html\.healio-mobile-menu-active \.healio-nita-surface/.test(nitaWidget), 'Das mobile Menü muss den globalen Nita-Punkt auch visuell und interaktiv ausblenden.');

for (const purpose of ['analytics', 'marketing', 'google_calendar', 'maps', 'openai']) {
  expect(consent.includes(`'${purpose}'`), `Consent-Zweck ${purpose} fehlt.`);
}

for (const [file, source] of sourceFiles) {
  expect(!/<iframe[\s\S]*?src=["']https:\/\/calendly\.com/i.test(source), `${file} lädt Calendly noch direkt.`);
  expect(!/<iframe[\s\S]*?src=["']https:\/\/www\.google\.com\/maps/i.test(source), `${file} lädt Google Maps noch direkt.`);
  expect(!/assets\.calendly\.com\/assets\/external\/widget\.js/i.test(source), `${file} lädt das Calendly-Script noch direkt.`);
}


// ---------------------------------------------------------------------------
// Meta-Funnel-Tracking: Pixel und Conversions API
// ---------------------------------------------------------------------------

// Der Zweck "marketing" muss ueberall vorhanden und standardmaessig aus sein.
expect(/marketing: false/.test(consent), 'Der Consent-Zweck marketing muss standardmaessig aus sein.');
expect(
  /marketing: \['Marketing \(Google Ads und Meta\)'[\s\S]{0,400}?Google Ads und ein Meta-Pixel[\s\S]{0,400}?Anfragen und geöffneten Anträgen[\s\S]{0,400}?Antworten aus Rechnern und Auswahlhilfen werden nie übertragen\./.test(consentManager),
  'Der deutsche Consent-Text muss Google Ads und Meta, beide Erfolge und den Antwort-Ausschluss benennen.',
);
expect(
  /marketing: \['Marketing \(Google Ads and Meta\)'[\s\S]{0,400}?Google Ads and a Meta pixel[\s\S]{0,400}?enquiries and opened applications[\s\S]{0,400}?never transmitted\./.test(consentManager),
  'Der englische Consent-Text muss Google Ads und Meta, beide Erfolge und den Antwort-Ausschluss benennen.',
);
expect(
  !/Marketing \(Meta\)/.test(consentManager)
    && !/Marketing \(Meta\)/.test(`${legalDe.datenschutz.metaText || ''} ${legalDe.datenschutz.googleAdsText || ''}`)
    && !/Marketing \(Meta\)/.test(`${legalEn.datenschutz.metaText || ''} ${legalEn.datenschutz.googleAdsText || ''}`),
  'Der alte Zweckname "Marketing (Meta)" darf weder im Banner noch in der Datenschutzerklaerung stehen.',
);
// Der Banner sagt, was Healio tut, nicht was Google tut.
expect(
  /Für Google Ads geben wir die Messung nicht für personalisierte Werbung frei\./.test(consentManager)
    && /For Google Ads, we do not release the measurement for personalised advertising\./.test(consentManager)
    && !/Google nutzt die Messung|Google does not use the measurement/.test(consentManager),
  'Der Banner darf keine Aussage ueber Googles Nutzung machen, sondern nur ueber Healios Freigabe.',
);
// Als Anfrage zaehlt der Klick auf den Google-Kalender-Link, keine Buchung.
expect(
  /Klick auf den Link, der unseren Terminkalender direkt bei Google Kalender öffnet; ob Sie dort einen Termin buchen, wird nicht gemessen\./.test(legalDe.datenschutz.googleAdsText || '')
    && /click on the link that opens our appointment calendar directly in Google Calendar; whether you then book an appointment there is not measured\./.test(legalEn.datenschutz.googleAdsText || '')
    && !/Calendly/i.test(`${legalDe.datenschutz.googleAdsText || ''} ${legalEn.datenschutz.googleAdsText || ''}`),
  'Die Datenschutzerklaerung muss den Kalenderlink-Klick als Anfrage beschreiben, nicht eine Buchung.',
);

// Kein Meta-Skript und kein fbq-Aufruf ausserhalb des consent-gesteuerten Moduls.
expect(!/connect\.facebook\.net|fbevents\.js|fbq\(/i.test(indexHtml), 'Das Meta-Pixel darf nicht statisch aus index.html geladen werden.');
for (const [file, source] of metaSourceFiles) {
  if (file === path.join('src', 'lib', 'meta-pixel.js')) continue;
  expect(!/connect\.facebook\.net|fbevents\.js/i.test(source), `${file} darf das Meta-Skript nicht selbst laden.`);
  expect(!/\bfbq\s*\(/.test(source), `${file} darf fbq nicht direkt aufrufen.`);
}

// Jeder Ladeweg im Modul haengt an Zustimmung UND Pixel-ID.
expect(
  /const loadMetaPixel = \(\) => \{\s*\n\s*if \(!isBrowser\(\) \|\| !isMetaConfigured\(\) \|\| !hasConsent\('marketing'\)\) return false;/.test(metaPixel),
  'Das Meta-Skript darf nur nach Zustimmung marketing und mit gesetzter Pixel-ID geladen werden.',
);
expect(
  /const emitMetaEvent = \(eventName, params = \{\}\) => \{\s*\n\s*if \(!isBrowser\(\) \|\| !isMetaConfigured\(\)\) return false;[\s\S]{0,200}?if \(!hasConsent\('marketing'\)\) return false;\s*\n\s*if \(isMetaExcludedRoute\(\)\) return false;/.test(metaPixel),
  'Kein Meta-Ereignis darf ohne Zustimmung marketing oder auf gesperrten Routen feuern.',
);
expect(
  /const sendMetaCapiEvent = \(payload\) => \{\s*\n\s*if \(!isBrowser\(\) \|\| !isMetaConfigured\(\) \|\| !hasConsent\('marketing'\)\) return false;/.test(metaPixel),
  'Die CAPI-Strecke darf nur nach Zustimmung marketing aufgerufen werden.',
);
expect(
  /const META_ENV = \(typeof import\.meta !== 'undefined' && import\.meta\.env\) \|\| \{\};/.test(metaPixel)
    && /const rawPixelId = typeof META_ENV\.VITE_META_PIXEL_ID === 'string'/.test(metaPixel)
    && /export const isMetaConfigured = \(\) => META_PIXEL_ID !== '';/.test(metaPixel),
  'Ohne VITE_META_PIXEL_ID muss der gesamte Meta-Pfad inaktiv bleiben.',
);
expect(
  /fbq\('consent', 'revoke'\)/.test(metaPixel)
    && /const META_COOKIE = \/\^_fb\[pc\]\$\//.test(metaPixel)
    && /const clearMetaCookies = \(\)/.test(metaPixel),
  'Ein Widerruf muss das Pixel abschalten und _fbp/_fbc loeschen.',
);
expect(
  /fbq\('set', 'autoConfig', false, META_PIXEL_ID\)/.test(metaPixel),
  'Automatische Button- und Formularerfassung von Meta muss abgeschaltet bleiben.',
);
expect(
  /crypto\?\.randomUUID/.test(metaPixel) && /eventID: eventId/.test(metaPixel) && /event_id: eventId/.test(metaPixel),
  'Pixel und CAPI muessen dieselbe event_id fuer die Deduplizierung verwenden.',
);

// /schwangerschaft und private Kampagnenquellen bleiben auch fuer Meta gesperrt.
expect(
  /const META_EXCLUDED_PATHS = new Set\(\[\s*'\/schwangerschaft',\s*'\/ratgeber\/schwanger-zusatzversicherung',\s*'\/ratgeber\/schwangerschaft-worauf-achten',\s*'\/ratgeber\/schwangerschaft-was-steht-mir-zu',\s*'\/ratgeber\/hebamme-kosten-krankenkasse',\s*'\/blog\/kassenbonus-schwangerschaft-vorsorge',\s*\]\)/.test(metaPixel),
  'Die Schwangerschafts-Route und die Schwangerschafts-Ratgeber muessen in der Meta-Sperrliste stehen.',
);
expect(
  /PRIVATE_FUNNEL_SOURCES\.has\(source\)/.test(metaPixel),
  'Private Kampagnenquellen muessen auch fuer Meta gesperrt bleiben.',
);
expect(
  /const BLOCKED_PATHS = new Set\(\[\s*'\/schwangerschaft',\s*'\/ratgeber\/schwanger-zusatzversicherung',\s*'\/ratgeber\/schwangerschaft-worauf-achten',\s*'\/ratgeber\/schwangerschaft-was-steht-mir-zu',\s*'\/blog\/kassenbonus-schwangerschaft-vorsorge',\s*\]\)/.test(metaCapi),
  'Auch die CAPI-Funktion muss die Schwangerschafts-Route und die Schwangerschafts-Ratgeber abweisen.',
);
expect(
  /if \(isMetaExcludedRoute\(\) \|\| !hasConsent\('marketing', state\)\)/.test(app),
  'Der SPA-Tracker muss Meta auf gesperrten Routen und ohne Zustimmung ueberspringen.',
);

// Nur die vier freigegebenen Ereignisse, nur ein wertbeschraenkter Parameter.
const metaEventList = metaPixel.match(/export const META_EVENTS = Object\.freeze\(\[([^\]]*)\]\)/)?.[1] ?? '';
const metaEventNames = [...metaEventList.matchAll(/'([^']+)'/g)].map((match) => match[1]);
expect(
  JSON.stringify(metaEventNames) === JSON.stringify(['PageView', 'ViewContent', 'RechnerStart', 'Lead']),
  'Die Meta-Ereignisliste muss genau PageView, ViewContent, RechnerStart und Lead enthalten.',
);
for (const eventName of metaEventNames) {
  expect(metaCapi.includes(`'${eventName}'`), `Die CAPI-Whitelist muss ${eventName} kennen.`);
}
expect(
  /const ALLOWED_EVENT_NAMES = new Set\(\['PageView', 'ViewContent', 'RechnerStart', 'Lead'\]\)/.test(metaCapi),
  'Die CAPI-Funktion darf nur die vier freigegebenen Ereignisnamen annehmen.',
);

const sensitiveParamKeySource = analytics.match(/const SENSITIVE_PARAM_KEY = \/(.+)\/i;/)?.[1];
expect(Boolean(sensitiveParamKeySource), 'Der SENSITIVE_PARAM_KEY-Filter muss in analytics.js auffindbar bleiben.');
if (sensitiveParamKeySource) {
  const sensitiveParamKey = new RegExp(sensitiveParamKeySource, 'i');
  const metaParamList = metaPixel.match(/export const META_ALLOWED_PARAM_KEYS = Object\.freeze\(new Set\(\[([^\]]*)\]\)\)/)?.[1] ?? '';
  const metaParamKeys = [...metaParamList.matchAll(/'([^']+)'/g)].map((match) => match[1]);
  expect(metaParamKeys.length > 0, 'Die Meta-Parameter-Whitelist muss auffindbar bleiben.');

  // Dokumentierte, enge Ausnahme: content_name ist ein festes Schlüsselwort
  // aus dem Meta-Schema und enthält selbst keine Nutzerdaten. Der Teilstring
  // "name" im GA4-Filter zielt auf Personennamen. Deshalb wird für diesen
  // einen Schlüssel der Schema-Präfix abgeschnitten, bevor geprüft wird -
  // und der Wertebereich ist zusätzlich auf fünf feste Seitenschlüssel
  // geschlossen (Prüfung direkt darunter).
  const META_SCHEMA_KEYS = new Set(['content_name']);
  for (const key of metaParamKeys) {
    const testedKey = META_SCHEMA_KEYS.has(key) ? key.replace(/^content_/, '') : key;
    const allowed = META_SCHEMA_KEYS.has(key)
      ? testedKey === 'name'
      : !sensitiveParamKey.test(key);
    expect(allowed, `Der Meta-Parameter ${key} faellt unter den SENSITIVE_PARAM_KEY-Filter.`);
  }
  expect(
    /if \(typeof value !== 'string' \|\| !META_PAGE_KEYS\.has\(value\)\)/.test(metaPixel)
      || /key === 'content_name' && typeof value === 'string' && META_PAGE_KEYS\.has\(value\)/.test(metaPixel),
    'content_name darf ausschliesslich einen der festen Seitenschluessel als Wert annehmen.',
  );

  const metaPageKeyList = metaPixel.match(/export const META_PAGE_KEYS = Object\.freeze\(new Set\(\[([^\]]*)\]\)\)/)?.[1] ?? '';
  const metaPageKeys = [...metaPageKeyList.matchAll(/'([^']+)'/g)].map((match) => match[1]);
  expect(
    JSON.stringify(metaPageKeys) === JSON.stringify(['zahn', 'ambulant', 'partner', 'ratgeber', 'praxis-leitfaden']),
    'ViewContent darf nur die fuenf neutralen Seitenschluessel senden.',
  );
  for (const key of metaPageKeys) {
    expect(!sensitiveParamKey.test(key), `Der Seitenschluessel ${key} faellt unter den SENSITIVE_PARAM_KEY-Filter.`);
  }
}

// Die an Meta gehende URL kennt nur utm_* und fbclid.
expect(
  /const META_QUERY_ALLOWLIST = \/\^\(\?:utm_\[a-z_\]\{1,30\}\|fbclid\)\$\/i;/.test(metaPixel)
    && /const QUERY_ALLOWLIST = \/\^\(\?:utm_\[a-z_\]\{1,30\}\|fbclid\)\$\/i;/.test(metaCapi),
  'event_source_url muss auf beiden Seiten auf utm_* und fbclid reduziert werden.',
);

// Der Zahn-Check selbst bleibt unberuehrt.
expect(!/meta|fbq|pixel/i.test(dentalCheck), 'Der Zahn-Check muss auch ohne Meta-Logik bleiben.');

// Secrets bleiben auf dem Server und werden nie geloggt.
expect(
  !/VITE_META_CAPI_ACCESS_TOKEN|VITE_META_TEST_EVENT_CODE/.test(completeSource + envExample),
  'CAPI-Token und Testcode duerfen niemals als VITE_-Variable im Client landen.',
);
expect(
  !/META_CAPI_ACCESS_TOKEN/.test(completeSource),
  'Das CAPI-Token darf im Client-Quelltext nicht vorkommen.',
);
expect(
  !/console\.(?:log|error|warn|info)/.test(metaCapi),
  'Die CAPI-Funktion darf nichts loggen, was das Token spiegeln koennte.',
);
expect(
  /if \(!PIXEL_ID_PATTERN\.test\(pixelId\) \|\| accessToken === ''\) \{\s*\n\s*res\.status\(204\)\.end\(\);/.test(metaCapi),
  'Ohne gesetzte Server-Variablen muss die CAPI-Funktion 204 antworten und nichts tun.',
);
expect(
  /VITE_META_PIXEL_ID=\s*$/m.test(envExample)
    && /META_CAPI_ACCESS_TOKEN/.test(envExample)
    && /META_TEST_EVENT_CODE/.test(envExample),
  '.env.example muss die Meta-Variablen ohne echte Werte dokumentieren.',
);

// CSP muss die Meta-Hosts kennen, sonst blockt der Report-Only-Bericht dauerhaft.
expect(/script-src[^"]*https:\/\/connect\.facebook\.net/.test(vercelConfig), 'Die CSP muss connect.facebook.net als Skriptquelle erlauben.');
expect(/connect-src[^"]*https:\/\/www\.facebook\.com https:\/\/connect\.facebook\.net/.test(vercelConfig), 'Die CSP muss die Meta-Endpunkte als Verbindungsziel erlauben.');
expect(/img-src[^"]*https:\/\/www\.facebook\.com/.test(vercelConfig), 'Die CSP muss www.facebook.com als Bildquelle erlauben.');


// ---------------------------------------------------------------------------
// Google-Ads-Conversion-Messung
// ---------------------------------------------------------------------------

const googleAds = read('src/lib/google-ads.js');

// Kein Google-Ads-Tag statisch im Dokument, kein zweiter Ladeweg in src/.
expect(!/AW-\d/.test(indexHtml), 'Das Google-Ads-Tag darf nicht statisch aus index.html geladen werden.');
for (const [file, source] of metaSourceFiles) {
  if (file === path.join('src', 'lib', 'google-ads.js')) continue;
  expect(
    !/gtag\/js\?id=AW-|googleadservices\.com|googleads\.g\.doubleclick\.net/i.test(source),
    `${file} darf das Google-Ads-Tag nicht selbst laden.`,
  );
}

// Ohne Konto-ID (Umgebungsvariable oder feste Konstante) bleibt der gesamte
// Pfad inaktiv. Beide Wege laufen durch dieselbe Formatpruefung.
const googleAdsConfig = read('src/lib/google-ads-config.js');
expect(
  /const GOOGLE_ADS_ENV = \(typeof import\.meta !== 'undefined' && import\.meta\.env\) \|\| \{\};/.test(googleAds)
    && /export const GOOGLE_ADS_ID = readConfig\('VITE_GOOGLE_ADS_ID', GOOGLE_ADS_ID_PATTERN, CONFIG_GOOGLE_ADS_ID\);/.test(googleAds)
    && /export const GOOGLE_ADS_LEAD_LABEL = readConfig\('VITE_GOOGLE_ADS_LEAD_LABEL', GOOGLE_ADS_LABEL_PATTERN, CONFIG_LEAD_LABEL\);/.test(googleAds)
    && /export const GOOGLE_ADS_ANTRAG_LABEL = readConfig\('VITE_GOOGLE_ADS_RECHNER_LABEL', GOOGLE_ADS_LABEL_PATTERN, CONFIG_ANTRAG_LABEL\);/.test(googleAds)
    && /if \(pattern\.test\(raw\)\) return raw;\s*\n\s*const fixed = typeof fallback === 'string' \? fallback\.trim\(\) : '';\s*\n\s*return pattern\.test\(fixed\) \? fixed : '';/.test(googleAds)
    && /export const isGoogleAdsConfigured = \(\) => GOOGLE_ADS_ID !== '';/.test(googleAds),
  'Konto-ID und Labels muessen aus Variable oder Konstante kommen und beide durch die Formatpruefung laufen.',
);
{
  const configValue = (name) => googleAdsConfig.match(new RegExp(`export const ${name} = '([^']*)';`))?.[1];
  const id = configValue('GOOGLE_ADS_ID');
  const lead = configValue('LEAD_LABEL');
  const antrag = configValue('ANTRAG_LABEL');
  expect(
    id !== undefined && lead !== undefined && antrag !== undefined,
    'src/lib/google-ads-config.js muss GOOGLE_ADS_ID, LEAD_LABEL und ANTRAG_LABEL als einfache Zeichenketten enthalten.',
  );
  expect(id === '' || /^AW-\d{6,20}$/.test(id || ''), 'GOOGLE_ADS_ID muss leer sein oder das Format AW-<Ziffern> haben.');
  expect(lead === '' || /^[A-Za-z0-9_-]{5,40}$/.test(lead || ''), 'LEAD_LABEL muss leer oder ein gueltiges Conversion-Label sein.');
  expect(antrag === '' || /^[A-Za-z0-9_-]{5,40}$/.test(antrag || ''), 'ANTRAG_LABEL muss leer oder ein gueltiges Conversion-Label sein.');
}

// Genau zwei Erfolge: Anfrage und Antrag geoeffnet. IKK, KassenBoost und
// interne Weiter-Knoepfe sind weder bei Google Ads noch bei Meta ein Erfolg.
const sdkUrl = read('src/lib/sdk-url.js');
const ikkFunction = sdkUrl.match(/export function trackIkkClick\([^)]*\) \{[\s\S]*?\n\}/)?.[0] ?? '';
expect(Boolean(ikkFunction), 'trackIkkClick muss in src/lib/sdk-url.js auffindbar bleiben.');
expect(
  !/trackMeta|trackGoogleAds|fbq|conversion/.test(ikkFunction) && /trackEvent\('ikk_bonus_click'/.test(ikkFunction),
  'trackIkkClick darf nur noch das GA4-Ereignis senden, keine Google- oder Meta-Conversion.',
);
expect(
  /export function trackSdkClick[\s\S]*?trackGoogleAdsAntrag\(\);/.test(sdkUrl),
  'Der Klick auf den SDK-Antrag muss als "Antrag geoeffnet" zaehlen.',
);
expect(
  /const GOOGLE_ADS_ANTRAG_PATHS = new Set\(\[[\s\S]*?'\/ambulant'[\s\S]*?'\/en\/outpatient'[\s\S]*?'\/stationaer'[\s\S]*?'\/en\/inpatient'[\s\S]*?'\/zahn'[\s\S]*?'\/en\/dental'[\s\S]*?\]\);/.test(googleAds),
  '"Antrag geoeffnet" muss auf /ambulant, /stationaer und /zahn samt englischer Fassung zaehlen.',
);
const ratgeberLayout = read('src/components/ratgeber/RatgeberArticleLayout.jsx');
expect(
  !/trackMeta|trackGoogleAds/.test(ratgeberLayout),
  'KassenBoost- und Weiter-Knoepfe im Ratgeber duerfen keinen Google- oder Meta-Erfolg ausloesen.',
);
expect(
  !/trackGoogleAds/.test(dentalPage),
  'Der reine Sprung zum Zahn-Check ist kein Google-Ads-Erfolg.',
);
{
  const adsCalls = dentalCheck.match(/trackGoogleAds\w*\([^)]*\)/g) || [];
  expect(
    adsCalls.length > 0 && adsCalls.every((call) => call === 'trackGoogleAdsAntrag()')
      && /import \{ trackGoogleAdsAntrag \} from '@\/lib\/google-ads';/.test(dentalCheck),
    'Im Zahn-Check darf nur der Antragslink zaehlen, als trackGoogleAdsAntrag() ohne jedes Argument.',
  );
}
const analyticsEventCalls = analytics.match(/queueGtagCommand\('event',[\s\S]*?\);/g) || [];
expect(
  analyticsEventCalls.length > 0 && analyticsEventCalls.every((call) => /send_to: GA4_MEASUREMENT_ID/.test(call)),
  'GA4-Ereignisse muessen per send_to bei GA4 bleiben und duerfen nicht an das Google-Ads-Konto gehen.',
);
expect(
  /const GOOGLE_ADS_ID_PATTERN = \/\^AW-\\d\{6,20\}\$\/;/.test(googleAds),
  'Die Google-Ads-Konto-ID muss auf das Format AW-<Ziffern> geprueft werden.',
);

// Jeder Ladeweg haengt an Zustimmung marketing UND Konto-ID UND Route.
expect(
  /const loadGoogleAdsTag = \(\) => \{\s*\n\s*if \(!isBrowser\(\) \|\| !isGoogleAdsConfigured\(\) \|\| !hasConsent\('marketing'\)\) return false;\s*\n\s*if \(isGoogleAdsExcludedRoute\(\)\) return false;/.test(googleAds),
  'Das Google-Ads-Tag darf nur nach Zustimmung marketing, mit Konto-ID und auf freigegebenen Routen geladen werden.',
);
expect(
  /const emitGoogleAdsConversion = \(label\) => \{[\s\S]{0,400}?if \(!hasConsent\('marketing'\)\) return false;\s*\n\s*if \(isGoogleAdsExcludedRoute\(\)\) return false;\s*\n\s*if \(!loadGoogleAdsTag\(\)\) return false;/.test(googleAds),
  'Keine Google-Ads-Conversion darf ohne Zustimmung marketing oder auf gesperrten Routen feuern.',
);

// Die Werbe-Achse des Consent Mode darf nur ueber diesen einen Ort auf
// granted gehen, und ad_personalization bleibt in beide Richtungen denied.
expect(
  /const AD_CONSENT_GRANTED = Object\.freeze\(\{\s*\n\s*ad_personalization: 'denied',\s*\n\s*ad_storage: 'granted',\s*\n\s*ad_user_data: 'granted',\s*\n\s*\}\);/.test(googleAds),
  'Zugestimmt wird nur der Messung: ad_storage und ad_user_data granted, ad_personalization bleibt denied.',
);
expect(
  /const AD_CONSENT_DENIED = Object\.freeze\(\{\s*\n\s*ad_personalization: 'denied',\s*\n\s*ad_storage: 'denied',\s*\n\s*ad_user_data: 'denied',\s*\n\s*\}\);/.test(googleAds),
  'Ein Widerruf muss ad_storage und ad_user_data wieder auf denied setzen.',
);
expect(
  (googleAds.match(/ad_storage: 'granted'/g) || []).length === 1
    && /queueGtagCommand\('consent', 'update', AD_CONSENT_GRANTED\);\s*\n\s*adConsentGranted = true;/.test(googleAds),
  'ad_storage darf nur an genau einer Stelle und nur im Zustimmungspfad auf granted gesetzt werden.',
);
expect(
  !/ad_storage: 'granted'|ad_user_data: 'granted'/.test(analytics),
  'Die Analyse-Achse darf die Werbe-Achse des Consent Mode nicht mitgranten.',
);
expect(
  /const CONSENT_DEFAULT_DENIED = Object\.freeze\(\{[\s\S]{0,200}?ad_storage: 'denied',[\s\S]{0,200}?analytics_storage: 'denied',/.test(analytics)
    && /queueGtagCommand\('consent', 'default', CONSENT_DEFAULT_DENIED\);/.test(analytics),
  'Der Consent-Mode-Ausgangszustand muss weiterhin alle Werbe- und Analysewerte auf denied setzen.',
);
expect(
  /const revokeGoogleAds = \(\) => \{[\s\S]{0,400}?AD_CONSENT_DENIED[\s\S]{0,200}?clearGoogleAdsCookies\(\);/.test(googleAds)
    && /const GOOGLE_ADS_COOKIE = \/\^_gcl_\/;/.test(googleAds),
  'Ein Widerruf muss die Werbe-Achse schliessen und die _gcl_-Cookies loeschen.',
);

// Es gehen nur send_to und die neutrale Adresse raus (Ursprung plus Pfad,
// höchstens die Klick-Kennung), nie Einstiegs- oder Kampagnencodes.
expect(
  /queueGtagCommand\('event', 'conversion', \{\s*\n\s*send_to: `\$\{GOOGLE_ADS_ID\}\/\$\{label\}`,\s*\n\s*\.\.\.neutralPageContext\(\),\s*\n\s*\}\);/.test(googleAds)
    && /const neutralPageContext = \(\) => \(\{\s*\n\s*page_location: getNeutralPageLocation\(\),\s*\n\s*page_referrer: getNeutralPageReferrer\(\),\s*\n\s*page_title: NEUTRAL_PAGE_TITLE,\s*\n\s*\}\);/.test(googleAds)
    && /export const NEUTRAL_PAGE_TITLE = 'Healio';/.test(googleAds)
    && /send_page_view: false,\s*\n\s*\.\.\.neutralPageContext\(\),/.test(googleAds)
    && /const CLICK_ID_PARAMS = Object\.freeze\(\['gclid', 'gbraid', 'wbraid'\]\);/.test(googleAds),
  'Eine Google-Ads-Conversion darf ausser send_to nur die neutrale Adresse und Herkunft enthalten, auch in der Tag-Konfiguration.',
);
expect(
  /const GOOGLE_ADS_LABEL_PATTERN = \/\^\[A-Za-z0-9_-\]\{5,40\}\$\/;/.test(googleAds)
    && /if \(!GOOGLE_ADS_LABEL_PATTERN\.test\(label \|\| ''\)\) return false;/.test(googleAds),
  'Ohne gueltiges Conversion-Label darf kein Ereignis gesendet werden.',
);
expect(
  /allow_ad_personalization_signals: false/.test(googleAds)
    && /send_page_view: false/.test(googleAds),
  'Das Google-Ads-Tag darf weder Werbepersonalisierung noch automatische Seitenaufrufe melden.',
);

// Dieselben Sperrrouten wie bei Meta.
expect(
  /const GOOGLE_ADS_EXCLUDED_PATHS = new Set\(\[\s*'\/schwangerschaft',\s*'\/ratgeber\/schwanger-zusatzversicherung',\s*'\/ratgeber\/schwangerschaft-worauf-achten',\s*'\/ratgeber\/schwangerschaft-was-steht-mir-zu',\s*'\/ratgeber\/hebamme-kosten-krankenkasse',\s*'\/blog\/kassenbonus-schwangerschaft-vorsorge',\s*\]\)/.test(googleAds),
  'Die Schwangerschafts-Route und die Schwangerschafts-Ratgeber muessen in der Google-Ads-Sperrliste stehen.',
);
// Einstiegscodes sperren Google Ads nicht mehr, gehen aber nie an Google
// (Frank 05.10.2026). Meta und GA4 bleiben auf diesen Codes gesperrt.
expect(
  !/PRIVATE_FUNNEL_SOURCES/.test(googleAds)
    && /export const isGoogleAdsExcludedRoute = \(location = isBrowser\(\) \? window\.location : null\) => \{\s*\n\s*if \(!location\) return true;\s*\n\s*return GOOGLE_ADS_EXCLUDED_PATHS\.has\(normalizePath\(location\.pathname\)\);\s*\n\};/.test(googleAds),
  'Google Ads darf Einstiegscodes nicht mehr als Sperre auswerten, sondern muss sie aus der gemeldeten Adresse entfernen.',
);

// Die Klick-Kennung haengt an Zustimmung und Format, sonst bleibt sie leer.
expect(
  /export const readGoogleClickId = [\s\S]{0,300}?if \(!hasConsent\('marketing'\) \|\| isGoogleAdsExcludedRoute\(location\)\) return '';/.test(googleAds)
    && /const GCLID_PATTERN = \/\^\[A-Za-z0-9_-\]\{10,200\}\$\/;/.test(googleAds),
  'Die Klick-Kennung gclid darf nur mit Zustimmung marketing und nur im erwarteten Format weitergegeben werden.',
);
expect(
  /const gclid = readGoogleClickId\(\);/.test(read('src/services/emailjsService.js')),
  'Das Kontaktformular muss die Klick-Kennung ueber den geprueften Leseweg beziehen.',
);

// .env.example dokumentiert die drei Variablen ohne echte Werte.
expect(
  /VITE_GOOGLE_ADS_ID=\s*$/m.test(envExample)
    && /VITE_GOOGLE_ADS_LEAD_LABEL=\s*$/m.test(envExample)
    && /VITE_GOOGLE_ADS_RECHNER_LABEL=\s*$/m.test(envExample),
  '.env.example muss die Google-Ads-Variablen ohne echte Werte dokumentieren.',
);

// Die Datenschutzerklaerung muss beide Messwege benennen, sonst laeuft die
// Zustimmung ins Leere.
const metaDisclosureDe = `${legalDe.datenschutz.metaTitle || ''} ${legalDe.datenschutz.metaText || ''}`;
const googleAdsDisclosureDe = `${legalDe.datenschutz.googleAdsTitle || ''} ${legalDe.datenschutz.googleAdsText || ''}`;
const metaDisclosureEn = `${legalEn.datenschutz.metaTitle || ''} ${legalEn.datenschutz.metaText || ''}`;
const googleAdsDisclosureEn = `${legalEn.datenschutz.googleAdsTitle || ''} ${legalEn.datenschutz.googleAdsText || ''}`;

expect(
  /Meta Platforms Ireland Limited/.test(metaDisclosureDe)
    && /Conversions API/.test(metaDisclosureDe)
    && /_fbp/.test(metaDisclosureDe)
    && /Art\. 6 Abs\. 1 lit\. a DSGVO/.test(metaDisclosureDe)
    && /§ 25 Abs\. 1 TDDDG/.test(metaDisclosureDe)
    && /widerrufen/.test(metaDisclosureDe)
    && /Data Privacy Framework/.test(metaDisclosureDe),
  'Der deutsche Meta-Absatz muss Anbieter, Daten, Rechtsgrundlage, Widerruf und Drittland benennen.',
);
expect(
  /Google Ireland Limited/.test(googleAdsDisclosureDe)
    && /Gordon House, Barrow Street, Dublin 4/.test(googleAdsDisclosureDe)
    && /GCLID/.test(googleAdsDisclosureDe)
    && /_gcl_au/.test(googleAdsDisclosureDe)
    && /_gcl_aw/.test(googleAdsDisclosureDe)
    && /Art\. 6 Abs\. 1 lit\. a DSGVO/.test(googleAdsDisclosureDe)
    && /§ 25 Abs\. 1 TDDDG/.test(googleAdsDisclosureDe)
    && /widerrufen/.test(googleAdsDisclosureDe)
    && /Data Privacy Framework/.test(googleAdsDisclosureDe)
    && /https:\/\/policies\.google\.com\/privacy/.test(googleAdsDisclosureDe)
    && /https:\/\/business\.safety\.google\/adscookies\//.test(googleAdsDisclosureDe),
  'Der deutsche Google-Ads-Absatz muss Anbieter, Daten, Rechtsgrundlage, Widerruf, Drittland und beide Links benennen.',
);
expect(
  /Meta Platforms Ireland Limited/.test(metaDisclosureEn) && /Conversions API/.test(metaDisclosureEn)
    && /Google Ireland Limited/.test(googleAdsDisclosureEn) && /GCLID/.test(googleAdsDisclosureEn),
  'Die englische Fassung muss beide Messwege ebenfalls benennen.',
);
expect(
  /datenschutz\.metaTitle/.test(privacyPage) && /datenschutz\.metaText/.test(privacyPage)
    && /datenschutz\.googleAdsTitle/.test(privacyPage) && /datenschutz\.googleAdsText/.test(privacyPage),
  'Die Datenschutzseite muss beide neuen Absaetze auch ausgeben.',
);

// CSP muss die Google-Ads-Hosts kennen, sonst blockt der Report-Only-Bericht.
expect(/script-src[^"]*https:\/\/www\.googleadservices\.com https:\/\/googleads\.g\.doubleclick\.net/.test(vercelConfig), 'Die CSP muss die Google-Ads-Hosts als Skriptquelle erlauben.');
expect(/connect-src[^"]*https:\/\/www\.googleadservices\.com https:\/\/googleads\.g\.doubleclick\.net/.test(vercelConfig), 'Die CSP muss die Google-Ads-Hosts als Verbindungsziel erlauben.');
expect(/img-src[^"]*https:\/\/www\.googleadservices\.com https:\/\/googleads\.g\.doubleclick\.net/.test(vercelConfig), 'Die CSP muss die Google-Ads-Hosts als Bildquelle erlauben.');

if (failures.length > 0) {
  console.error(`Privacy-Consent-Contract fehlgeschlagen (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Privacy-Consent-Contract erfüllt: Zahn-Check lokal, externe Dienste consent-gesteuert, Meta-Funnel und Google Ads nur nach Opt-in.');
