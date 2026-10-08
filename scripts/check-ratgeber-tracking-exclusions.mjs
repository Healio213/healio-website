import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import {
  NEW_SENSITIVE_RATGEBER_PATHS,
  EXPECTED_GOOGLE_META_EXCLUDED_PATHS,
  EXPECTED_ANALYTICS_EXCLUDED_PATHS,
} from './lib/ratgeber-sensitive-paths.mjs';

// Echte Laufzeitmodule, einschließlich des serverseitigen CAPI-Handlers.
// Nur Browser, Zustimmung, Konfiguration und ausgehende Requests sind Attrappen.
// Kein Browserstart, kein HTTP-Server und kein Netzwerkzugriff.
const SRC = fileURLToPath(new URL('../src', import.meta.url));
const API = fileURLToPath(new URL('../api/meta-events.js', import.meta.url));
const ENTRY = `
export {
  initializeGoogleAds, syncGoogleAdsConsent, isGoogleAdsExcludedRoute,
  trackGoogleAdsLead, trackGoogleAdsAntrag,
} from '@/lib/google-ads';
export {
  initializeAnalytics, setAnalyticsRouteBlocked, isAnalyticsExcludedRoute,
  loadGoogleAnalytics, trackPageView, trackEvent, GA4_MEASUREMENT_ID,
} from '@/lib/analytics';
export {
  initializeMetaPixel, syncMetaConsent, isMetaExcludedRoute,
  trackMetaPageView, trackMetaViewContent, trackMetaRechnerStart, trackMetaLead,
} from '@/lib/meta-pixel';
export { default as metaApi } from ${JSON.stringify(API)};
`;
const compiled = await build({
  stdin: { contents: ENTRY, resolveDir: SRC, loader: 'js' },
  bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent',
  alias: { '@': SRC },
  define: {
    'import.meta.env': JSON.stringify({
      VITE_GOOGLE_ADS_ID: 'AW-123456789', VITE_GOOGLE_ADS_LEAD_LABEL: 'TestLead_01',
      VITE_GOOGLE_ADS_RECHNER_LABEL: 'TestAntrag_01', VITE_META_PIXEL_ID: '123456789012',
    }),
    'process.env.META_PIXEL_ID': JSON.stringify('123456789012'),
    'process.env.META_CAPI_ACCESS_TOKEN': JSON.stringify('lokale-test-attrappe'),
    'process.env.META_TEST_EVENT_CODE': JSON.stringify(''),
  },
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`;
let run = 0;
const load = () => import(`${moduleUrl}#run-${run += 1}`);
const realFetch = globalThis.fetch;
const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
const consent = JSON.stringify({
  version: 2, decided: true,
  preferences: { analytics: true, marketing: true, google_calendar: false, maps: false, openai: false },
  source: 'settings', updatedAt: '2026-10-08T19:00:00.000Z',
});
let requests = [];
let scripts = [];
let fbqCalls = [];
const uuid = '123e4567-e89b-42d3-a456-426614174000';

function browserAt(path) {
  requests = []; scripts = []; fbqCalls = [];
  globalThis.window = {
    location: new URL(path, 'https://healio.de'),
    localStorage: { getItem: () => consent, setItem() {} },
    crypto: { randomUUID: () => uuid },
    addEventListener() {}, removeEventListener() {}, dispatchEvent() {},
    fbq: (...args) => fbqCalls.push(args),
  };
  globalThis.document = {
    cookie: '', referrer: '',
    querySelector: () => null,
    createElement: () => {
      const listeners = new Map();
      return { dataset: {}, listeners, addEventListener: (name, cb) => listeners.set(name, cb), remove() {} };
    },
    head: { appendChild(script) { scripts.push(script); queueMicrotask(() => script.listeners.get('load')?.()); } },
  };
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true, value: { sendBeacon(...args) { requests.push(['beacon', ...args]); return true; } },
  });
  globalThis.fetch = (...args) => { requests.push(['fetch', ...args]); return Promise.resolve({ ok: true }); };
}
const commands = () => (window.dataLayer || []).map((command) => Array.from(command));
const events = () => commands().filter(([kind]) => kind === 'event');
const metaEvents = () => fbqCalls.filter(([method]) => method === 'track' || method === 'trackCustom');
const variants = (path) => [
  path,
  `${path}?gclid=TestKlick_1234567890&utm_campaign=Test&ref=Test#abschnitt`,
  `${path.toUpperCase()}/?gclid=TestKlick_1234567890`,
];
async function capiStatus(mod, path) {
  let status = null;
  await mod.metaApi({
    method: 'POST', headers: { origin: 'https://healio.de' },
    body: { event_name: 'PageView', event_id: uuid, event_source_url: new URL(path, 'https://healio.de').href },
  }, { status(value) { status = value; return this; }, end() {} });
  return status;
}

try {
  assert.equal(NEW_SENSITIVE_RATGEBER_PATHS.length, 61, 'Alle 61 neuen sensiblen Pfade gehören zur Freigabe.');
  assert.equal(new Set(NEW_SENSITIVE_RATGEBER_PATHS).size, 61, 'Keine doppelten Soll-Pfade.');

  // Direkteinstieg und direkte Tracker-Aufrufe trotz vollständiger Zustimmung.
  for (const path of EXPECTED_GOOGLE_META_EXCLUDED_PATHS) {
    for (const url of variants(path)) {
      browserAt(url);
      const mod = await load();
      assert.equal(mod.isGoogleAdsExcludedRoute(), true, `Google-Ads-Routensperre: ${url}`);
      assert.equal(mod.isMetaExcludedRoute(), true, `Meta-Routensperre: ${url}`);
      const stopAds = mod.initializeGoogleAds();
      const stopMeta = mod.initializeMetaPixel();
      assert.equal(mod.syncGoogleAdsConsent(), false, `Google-Ads-Consent bleibt geschlossen: ${url}`);
      assert.equal(mod.syncMetaConsent(), false, `Meta-Consent bleibt geschlossen: ${url}`);
      for (const call of [
        mod.trackGoogleAdsLead, mod.trackGoogleAdsAntrag, mod.trackMetaPageView,
        mod.trackMetaViewContent, mod.trackMetaRechnerStart, mod.trackMetaLead,
      ]) assert.equal(call(), false, `Direkter Tracker bleibt still: ${url}`);
      assert.equal(events().length, 0, `Kein Google-Ereignis: ${url}`);
      assert.equal(commands().filter(([kind]) => kind === 'config').length, 0, `Kein Google-Konto konfiguriert: ${url}`);
      assert.equal(metaEvents().length, 0, `Kein Pixel-Ereignis: ${url}`);
      assert.equal(fbqCalls.filter(([kind, value]) => kind === 'init' || (kind === 'consent' && value === 'grant')).length, 0, `Kein Pixel-Start/Freigeben: ${url}`);
      assert.equal(scripts.length, 0, `Kein Tracking-Skript geladen: ${url}`);
      assert.equal(requests.length, 0, `Kein Client-Request: ${url}`);
      assert.equal(await capiStatus(mod, url), 400, `Server muss manipuliertes CAPI-Ereignis ablehnen: ${url}`);
      assert.equal(requests.length, 0, `CAPI darf nichts an Meta weiterleiten: ${url}`);
      stopAds(); stopMeta();
    }
  }

  // GA4 separat: bisherige Analytics-Sperren plus alle neuen medizinischen Seiten.
  for (const path of EXPECTED_ANALYTICS_EXCLUDED_PATHS) {
    for (const url of variants(path)) {
      browserAt(url);
      const mod = await load();
      assert.equal(mod.isAnalyticsExcludedRoute(), true, `GA4-Routensperre: ${url}`);
      const stop = mod.initializeAnalytics();
      assert.equal(await mod.loadGoogleAnalytics(), false, `GA4 darf nicht laden: ${url}`);
      assert.equal(mod.trackPageView(window.location.pathname), false, `Kein GA4-Seitenaufruf: ${url}`);
      assert.equal(mod.trackEvent('ratgeber_click', { action: 'lesen' }), false, `Kein GA4-Klick: ${url}`);
      assert.equal(window[`ga-disable-${mod.GA4_MEASUREMENT_ID}`], true, `GA4 deaktiviert: ${url}`);
      assert.equal(events().length, 0, `Keine GA4-Ereignisse: ${url}`);
      assert.equal(commands().filter(([kind]) => kind === 'config').length, 0, `Keine GA4-Konfiguration: ${url}`);
      assert.equal(scripts.length, 0, `Kein GA4-Skript: ${url}`);
      assert.equal(requests.length, 0, `Kein GA4-Request: ${url}`);
      stop();
    }
  }

  // SPA: bereits geladene Tracker sperren, anschließend auf einer erlaubten Route freigeben.
  browserAt('/ambulant');
  {
    const mod = await load();
    const stopAds = mod.initializeGoogleAds();
    const stopMeta = mod.initializeMetaPixel();
    const stopAnalytics = mod.initializeAnalytics();
    assert.equal(mod.trackMetaPageView(), true, 'Erlaubte Route muss den Kontroll-Pixelaufruf erlauben.');
    assert.equal(mod.trackPageView('/ambulant'), true, 'Erlaubte Route muss den Kontroll-GA4-Aufruf erlauben.');
    await mod.loadGoogleAnalytics();
    const beforeEvents = events().length;
    const beforeMetaEvents = metaEvents().length;
    const beforeRequests = requests.length;
    const beforeScripts = scripts.length;
    window.location = new URL(NEW_SENSITIVE_RATGEBER_PATHS[0], 'https://healio.de');
    assert.equal(mod.syncGoogleAdsConsent(), false);
    assert.equal(mod.syncMetaConsent(), false);
    assert.equal(await mod.setAnalyticsRouteBlocked(true), false);
    assert(fbqCalls.some(([kind, value]) => kind === 'consent' && value === 'revoke'), 'SPA-Sperre muss Pixel-Consent widerrufen.');
    assert.equal(mod.trackGoogleAdsLead(), false);
    assert.equal(mod.trackMetaPageView(), false);
    assert.equal(mod.trackMetaLead(), false);
    assert.equal(mod.trackPageView(window.location.pathname), false);
    assert.equal(mod.trackEvent('ratgeber_click'), false);
    assert.equal(events().length, beforeEvents);
    assert.equal(metaEvents().length, beforeMetaEvents);
    assert.equal(requests.length, beforeRequests);
    assert.equal(scripts.length, beforeScripts);
    window.location = new URL('/ambulant', 'https://healio.de');
    assert.equal(mod.syncGoogleAdsConsent(), true);
    assert.equal(mod.syncMetaConsent(), true);
    assert.deepEqual(fbqCalls.at(-1), ['consent', 'grant'], 'Rückkehr darf das schon geladene Pixel mit Zustimmung wieder freigeben.');
    assert.equal(await mod.setAnalyticsRouteBlocked(false), true);
    assert.equal(mod.trackGoogleAdsAntrag(), true, 'Antrag-Konversion auf erlaubter Produktseite bleibt möglich.');
    assert.equal(mod.trackMetaPageView(), true, 'Meta funktioniert nach Rückkehr auf erlaubte Seite.');
    assert.equal(mod.trackPageView('/ambulant'), true, 'GA4 funktioniert nach Rückkehr auf erlaubte Seite.');
    stopAds(); stopMeta(); stopAnalytics();
  }

  // Server-Positivkontrolle: derselbe Handler muss eine erlaubte neutrale Route weiterleiten.
  browserAt('/kontakt');
  {
    const mod = await load();
    assert.equal(await capiStatus(mod, '/kontakt?ref=Test#abschnitt'), 202);
    assert.equal(requests.length, 1);
    assert(requests[0][1].startsWith('https://graph.facebook.com/'));
    const payload = JSON.parse(requests[0][2].body);
    assert.equal(payload.data[0].event_source_url, 'https://healio.de/kontakt');
  }
  console.log(`Ratgeber-Tracking-Sperren erfüllt: ${NEW_SENSITIVE_RATGEBER_PATHS.length} neue sensible Pfade; ${EXPECTED_GOOGLE_META_EXCLUDED_PATHS.length * 3} Google-/Meta-/CAPI- und ${EXPECTED_ANALYTICS_EXCLUDED_PATHS.length * 3} GA4-Pfadvarianten; SPA-Sperre und Positivkontrollen.`);
} finally {
  delete globalThis.window; delete globalThis.document;
  globalThis.fetch = realFetch;
  if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
  else delete globalThis.navigator;
}
