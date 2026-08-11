import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

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
const nitaWidget = read('src/components/NitaConsentWidget.jsx');
const consentManager = read('src/components/ConsentManager.jsx');
const header = read('src/components/Header.jsx');
const consent = read('src/lib/consent.js');
const analytics = read('src/lib/analytics.js');
const sourceFiles = fs.readdirSync(path.join(root, 'src/pages'))
  .filter((file) => file.endsWith('.jsx'))
  .map((file) => [`src/pages/${file}`, read(`src/pages/${file}`)]);
const completeSource = collectSourceFiles(path.join(root, 'src'))
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n');

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
expect(nitaWidget.includes("'/zahn'"), 'Das globale Nita-Widget muss auf der Zahnseite ausgeblendet sein.');
expect(/showBanner && !settingsOpen && !isDentalCheckRoute/.test(consentManager), 'Das initiale Consent-Banner darf im Zahn-Check nicht erscheinen.');
expect(/consent\.decided && !showBanner && !settingsOpen && !isDentalCheckRoute/.test(consentManager), 'Der persistente Consent-Schalter darf den Zahn-Check nicht überlagern.');
expect(/settingsOpen && !isDentalCheckRoute/.test(consentManager), 'Auch der Einstellungsdialog muss im Zahn-Check ausgeblendet bleiben.');
expect(/ANALYTICS_EXCLUDED_PATHS = new Set\(\['\/zahn', '\/en\/dental'\]\)/.test(analytics), 'Beide Zahn-Check-Routen müssen in der Analytics-Sperrliste stehen.');
expect(/ga-disable-\$\{GA4_MEASUREMENT_ID\}/.test(analytics), 'Die Zahn-Check-Sperre muss das GA4-Deaktivierungsflag setzen.');
expect(/requestNitaConsent\(\)/.test(miaPrompt), 'Der bestehende Nita-Prompt muss den Consent-Flow verwenden.');
expect(/healio-nita-teaser-active/.test(miaPrompt), 'Nita-Teaser und globaler Launcher müssen sich gegenseitig ausschließen.');
expect(/healio-mobile-menu-active/.test(header), 'Das mobile Menü muss externe Overlays während der Navigation ausblenden.');

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
