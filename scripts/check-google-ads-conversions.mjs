import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

// Prüft die echten Module (sdk-url, google-ads, meta-pixel, analytics,
// dentalLinks, hospitalLinks) in einer nachgebauten Browserumgebung. Nur Fenster, Speicher,
// fbq und fetch sind Attrappen.
//
// Festgeschrieben wird:
// - Es gibt genau zwei Google-Ads-Erfolge: "Anfrage" und "Antrag geöffnet".
// - trackIkkClick löst weder bei Google Ads noch bei Meta einen Erfolg aus,
//   das GA4-Ereignis bleibt reine Statistik und geht nur an GA4.
// - "Antrag geöffnet" zählt auch auf /stationaer und /en/inpatient, dort
//   auch beim Bayerische-Klinik-Link (hospitalLinks).
// - Gesperrte Seiten (/schwangerschaft, private src-Codes) bleiben gesperrt.
// - Konto-ID und Labels wirken auch ohne Vercel-Variable über die Konstante.

const SRC = fileURLToPath(new URL('../src', import.meta.url));
const CONFIG_FILE = fileURLToPath(new URL('../src/lib/google-ads-config.js', import.meta.url));

const ADS_ID = 'AW-123456789';
const LEAD_LABEL = 'TestLead_01';
const ANTRAG_LABEL = 'TestAntrag_01';
const PIXEL_ID = '123456789012';

const ENTRY = `
export { trackIkkClick, trackSdkClick } from '@/lib/sdk-url';
export {
  GOOGLE_ADS_ID,
  GOOGLE_ADS_LEAD_LABEL,
  GOOGLE_ADS_ANTRAG_LABEL,
  isGoogleAdsConfigured,
  trackGoogleAdsAntrag,
  trackGoogleAdsLead,
} from '@/lib/google-ads';
export { GA4_MEASUREMENT_ID } from '@/lib/analytics';
export { trackZahnEvent } from '@/components/sections/dental/dentalLinks';
export { trackStationaerBayerischeClick } from '@/components/sections/hospital/hospitalLinks';
`;

// config === null: echte Datei src/lib/google-ads-config.js verwenden.
const bundle = async ({ env, config = null }) => {
  const plugins = config === null ? [] : [{
    name: 'google-ads-config-stub',
    setup(pluginBuild) {
      pluginBuild.onLoad({ filter: /google-ads-config\.js$/ }, (args) => {
        if (args.path !== CONFIG_FILE) return undefined;
        return {
          loader: 'js',
          contents: Object.entries(config)
            .map(([key, value]) => `export const ${key} = ${JSON.stringify(value)};`)
            .join('\n'),
        };
      });
    },
  }];

  const compiled = await build({
    stdin: { contents: ENTRY, resolveDir: SRC, loader: 'js' },
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
    alias: { '@': SRC },
    define: { 'import.meta.env': JSON.stringify(env) },
    plugins,
  });
  return `data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`;
};

const consentWith = (preferences) => JSON.stringify({
  version: 2,
  decided: true,
  preferences: { analytics: false, marketing: false, google_calendar: false, maps: false, openai: false, ...preferences },
  source: 'settings',
  updatedAt: '2026-10-05T10:00:00.000Z',
});

let fbqCalls = [];
let fetchCalls = [];
const realFetch = globalThis.fetch;

function browserAt(path, consent) {
  fbqCalls = [];
  fetchCalls = [];
  const fbq = (...args) => { fbqCalls.push(args); };
  globalThis.window = {
    location: new URL(path, 'https://healio.de'),
    localStorage: { getItem: () => consent, setItem() {} },
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {},
    fbq,
  };
  globalThis.document = {
    cookie: '',
    querySelector: () => null,
    createElement: () => ({ dataset: {}, addEventListener() {}, remove() {} }),
    head: { appendChild() {} },
  };
  globalThis.fetch = (...args) => {
    fetchCalls.push(args);
    return Promise.resolve({ ok: true });
  };
}

const gtagCommands = () => (globalThis.window.dataLayer || []).map((command) => Array.from(command));
const conversions = () => gtagCommands().filter(([kind, name]) => kind === 'event' && name === 'conversion');
const metaTracks = () => fbqCalls.filter(([method]) => method === 'track' || method === 'trackCustom');
const metaLeads = () => metaTracks().filter(([, eventName]) => eventName === 'Lead');

const ALL_ON = consentWith({ analytics: true, marketing: true });
const ENV = {
  VITE_GOOGLE_ADS_ID: ADS_ID,
  VITE_GOOGLE_ADS_LEAD_LABEL: LEAD_LABEL,
  VITE_GOOGLE_ADS_RECHNER_LABEL: ANTRAG_LABEL,
  VITE_META_PIXEL_ID: PIXEL_ID,
};

let run = 0;
const load = async (moduleUrl) => import(`${moduleUrl}#run-${run += 1}`);

try {
  const configured = await bundle({ env: ENV });

  // 1. "IKK-Bonus sichern" ist kein Erfolg, weder bei Google Ads noch bei Meta.
  for (const path of ['/ambulant', '/stationaer', '/zahn', '/en/outpatient', '/']) {
    browserAt(path, ALL_ON);
    const mod = await load(configured);
    mod.trackIkkClick('bonusrechner');
    assert.equal(conversions().length, 0, `trackIkkClick darf keine Google-Ads-Conversion senden (${path}).`);
    assert.equal(metaLeads().length, 0, `trackIkkClick darf kein Meta-Lead senden (${path}).`);
    assert.equal(metaTracks().length, 0, `trackIkkClick darf kein Meta-Ereignis senden (${path}).`);
    assert.equal(fetchCalls.length, 0, `trackIkkClick darf nichts an die Meta-CAPI senden (${path}).`);

    const ga4Events = gtagCommands().filter(([kind, name]) => kind === 'event' && name === 'ikk_bonus_click');
    if (path !== '/zahn') {
      assert.equal(ga4Events.length, 1, `Das GA4-Ereignis ikk_bonus_click muss als Statistik bleiben (${path}).`);
      assert.equal(ga4Events[0][2].send_to, mod.GA4_MEASUREMENT_ID, `ikk_bonus_click darf nur an GA4 gehen (${path}).`);
    }
  }

  // 2. "Antrag geöffnet": SDK-Klick zählt auf allen beworbenen Produktseiten.
  for (const path of ['/ambulant', '/en/outpatient', '/stationaer', '/en/inpatient', '/zahn', '/en/dental']) {
    browserAt(path, ALL_ON);
    const mod = await load(configured);
    mod.trackSdkClick('test');
    const sent = conversions();
    assert.equal(sent.length, 1, `trackSdkClick muss auf ${path} genau eine Conversion senden.`);
    assert.deepEqual(sent[0][2], { send_to: `${ADS_ID}/${ANTRAG_LABEL}` }, `Die Antrag-Conversion darf nur send_to enthalten (${path}).`);
  }

  // 3. Versicherer-Klick aus dentalLinks (UKV, Bayerische) zählt ebenso.
  browserAt('/zahn', ALL_ON);
  {
    const mod = await load(configured);
    mod.trackZahnEvent('zahnzusatz_versicherer_click', 'ukv_zahnprivat');
    assert.deepEqual(conversions().map(([, , params]) => params), [{ send_to: `${ADS_ID}/${ANTRAG_LABEL}` }]);
    mod.trackZahnEvent('zahn_kassenboost_click', 'tarif-weiche');
    assert.equal(conversions().length, 1, 'Der KassenBoost-Klick auf /zahn darf keine Conversion senden.');
  }

  // 3b. Bayerische-Klinik-Link auf /stationaer zählt ebenso, ohne Versicherer
  //     und ohne Platzierung. Das GA4-Ereignis bleibt Statistik und geht nur
  //     an GA4. Gesperrte Seiten und fehlende Zustimmung bleiben still.
  for (const path of ['/stationaer', '/en/inpatient']) {
    browserAt(path, ALL_ON);
    const mod = await load(configured);
    mod.trackStationaerBayerischeClick('stationaer-alternative');
    assert.deepEqual(
      conversions().map(([, , params]) => params),
      [{ send_to: `${ADS_ID}/${ANTRAG_LABEL}` }],
      `Der Bayerische-Klinik-Link muss auf ${path} genau einmal "Antrag geöffnet" senden, nur mit send_to.`,
    );
    const ga4Events = gtagCommands().filter(([kind, name]) => kind === 'event' && name === 'tariff_calculator_click');
    assert.equal(ga4Events.length, 1, `Das GA4-Ereignis zum Bayerische-Klick muss bleiben (${path}).`);
    assert.equal(ga4Events[0][2].send_to, mod.GA4_MEASUREMENT_ID, `Das GA4-Ereignis zum Bayerische-Klick darf nur an GA4 gehen (${path}).`);
  }
  for (const path of ['/schwangerschaft', '/stationaer?src=reel-f05', '/leistungen']) {
    browserAt(path, ALL_ON);
    const mod = await load(configured);
    mod.trackStationaerBayerischeClick('stationaer-alternative');
    assert.equal(conversions().length, 0, `Der Bayerische-Klinik-Link darf auf ${path} keine Conversion senden.`);
  }
  browserAt('/stationaer', consentWith({ analytics: true }));
  {
    const mod = await load(configured);
    mod.trackStationaerBayerischeClick('stationaer-alternative');
    assert.equal(conversions().length, 0, 'Ohne Zustimmung marketing zählt der Bayerische-Klinik-Link nicht.');
  }

  // 4. "Anfrage" bleibt wie bisher und nutzt das Lead-Label.
  browserAt('/kontakt', ALL_ON);
  {
    const mod = await load(configured);
    assert.equal(mod.trackGoogleAdsLead(), true);
    assert.deepEqual(conversions().map(([, , params]) => params), [{ send_to: `${ADS_ID}/${LEAD_LABEL}` }]);
  }

  // 5. Außerhalb der Produktseiten ist ein SDK-Klick kein Antrag-Erfolg.
  browserAt('/leistungen', ALL_ON);
  {
    const mod = await load(configured);
    mod.trackSdkClick('test');
    assert.equal(conversions().length, 0, 'Antrag-Conversion nur auf den beworbenen Produktseiten.');
  }

  // 6. Gesperrte Seiten bleiben gesperrt, auch mit voller Zustimmung.
  for (const path of ['/schwangerschaft', '/ambulant?src=bonus-check', '/stationaer?src=reel-f05', '/zahn?src=bonus-check']) {
    browserAt(path, ALL_ON);
    const mod = await load(configured);
    mod.trackSdkClick('test');
    mod.trackGoogleAdsLead();
    mod.trackGoogleAdsAntrag();
    assert.equal(conversions().length, 0, `Auf ${path} darf Google Ads nichts messen.`);
  }

  // 7. Ohne Zustimmung "marketing" passiert nichts.
  browserAt('/stationaer', consentWith({ analytics: true }));
  {
    const mod = await load(configured);
    mod.trackSdkClick('test');
    mod.trackGoogleAdsLead();
    assert.equal(conversions().length, 0, 'Ohne Zustimmung marketing darf keine Conversion gesendet werden.');
    assert.equal(fbqCalls.length, 0, 'Ohne Zustimmung marketing darf Meta nichts erfahren.');
  }

  // 8. Ohne Vercel-Variable greift die feste Konstante, mit derselben Prüfung.
  const fromConstants = await bundle({
    env: {},
    config: { GOOGLE_ADS_ID: ADS_ID, LEAD_LABEL, ANTRAG_LABEL },
  });
  browserAt('/stationaer', ALL_ON);
  {
    const mod = await load(fromConstants);
    assert.equal(mod.GOOGLE_ADS_ID, ADS_ID);
    mod.trackSdkClick('test');
    assert.deepEqual(conversions().map(([, , params]) => params), [{ send_to: `${ADS_ID}/${ANTRAG_LABEL}` }]);
  }

  // 9. Ungültige Konstanten bleiben wirkungslos.
  const invalidConstants = await bundle({
    env: {},
    config: { GOOGLE_ADS_ID: '442-477-8921', LEAD_LABEL: 'x', ANTRAG_LABEL: 'a b c d e' },
  });
  browserAt('/stationaer', ALL_ON);
  {
    const mod = await load(invalidConstants);
    assert.equal(mod.isGoogleAdsConfigured(), false, 'Eine Kundennummer ist keine Konto-ID im Format AW-<Ziffern>.');
    assert.equal(mod.GOOGLE_ADS_LEAD_LABEL, '');
    assert.equal(mod.GOOGLE_ADS_ANTRAG_LABEL, '');
    mod.trackSdkClick('test');
    assert.equal(conversions().length, 0);
  }

  // 10. Mit der echten Konfigurationsdatei und ohne Variable: still, solange leer.
  const realConfig = await bundle({ env: {} });
  browserAt('/stationaer', ALL_ON);
  {
    const mod = await load(realConfig);
    mod.trackSdkClick('test');
    mod.trackGoogleAdsLead();
    if (!mod.isGoogleAdsConfigured()) {
      assert.equal(conversions().length, 0, 'Leere Konstanten müssen die Messung still halten.');
    } else {
      assert.equal(conversions().length, 2, 'Eingetragene Konstanten müssen beide Erfolge senden können.');
    }
  }

  console.log('Google-Ads-Erfolge geprüft: nur Anfrage und Antrag geöffnet, IKK-Klick ohne Google- und Meta-Conversion, Sperrseiten gesperrt.');
} finally {
  delete globalThis.window;
  delete globalThis.document;
  globalThis.fetch = realFetch;
}
