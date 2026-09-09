import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

// Exercise the real analytics module; only the browser/transport boundary is fake.
// A missing route exclusion would load GA and expose the health-related page path
// even when a visitor's analytics consent was already saved on an earlier visit.
const compiled = await build({
  entryPoints: [fileURLToPath(new URL('../src/lib/analytics.js', import.meta.url))],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  alias: { '@': fileURLToPath(new URL('../src', import.meta.url)) },
});
const analyticsModule = `data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`;

const savedConsent = JSON.stringify({
  version: 2,
  decided: true,
  preferences: { analytics: true, google_calendar: false, maps: false, openai: false },
  source: 'settings',
  updatedAt: '2026-09-08T08:00:00.000Z',
});

function browserAt(path) {
  const scripts = [];
  globalThis.window = {
    location: new URL(path, 'https://healio.de'),
    localStorage: { getItem: () => savedConsent },
    addEventListener() {},
    removeEventListener() {},
  };
  globalThis.document = {
    cookie: '',
    querySelector: () => null,
    createElement: () => ({
      dataset: {},
      addEventListener() {},
      remove() {},
    }),
    head: { appendChild: (script) => scripts.push(script) },
  };
  return scripts;
}

try {
  const cases = [
    ['/schwangerschaft', true],
    ['/schwangerschaft?src=reel-f05#fragen', true],
    ['/schwangerschaft/', true],
    ['/Schwangerschaft', true],
    ['/ambulant?src=reel-f05', true],
    ['/ambulant?src=bonus-check', true],
    ['/ambulant?src=unknown&src=reel-f05', true],
    ['/en/outpatient?src=reel-f05', true],
    ['/zahn', true],
    ['/en/dental', true],
    ['/ambulant', false],
    ['/ambulant?src=other', false],
    ['/unternehmen', false],
  ];
  for (const [index, [path, blocked]] of cases.entries()) {
    const scripts = browserAt(path);
    const analytics = await import(`${analyticsModule}#case-${index}`);
    const cleanup = analytics.initializeAnalytics();
    const pageTracked = analytics.trackPageView(window.location.href);
    const eventTracked = analytics.trackEvent('calculator_start', { component: 'example' });
    const commands = (window.dataLayer || []).map((command) => Array.from(command));

    assert.equal(window[`ga-disable-${analytics.GA4_MEASUREMENT_ID}`], blocked, `GA disable flag: ${path}`);
    assert.equal(pageTracked, !blocked, `page-view gate: ${path}`);
    assert.equal(eventTracked, !blocked, `event gate: ${path}`);
    if (blocked) {
      assert.equal(scripts.length, 0, `No GA script before initialization: ${path}`);
      assert(!commands.some(([kind]) => kind === 'config' || kind === 'event'), `No page context sent: ${path}`);
      assert.equal(await analytics.loadGoogleAnalytics(), false, `Direct script loader stays blocked: ${path}`);
    } else {
      assert.equal(scripts.length, 1, `Normal consented page can still initialize GA: ${path}`);
    }
    cleanup();
  }

  // An already initialized SPA must stop outbound events upon entering the
  // sensitive route, including before React's route effect has run.
  browserAt('/leistungen');
  const analytics = await import(`${analyticsModule}#case-spa`);
  const cleanup = analytics.initializeAnalytics();
  window.location = new URL('https://healio.de/schwangerschaft?src=reel-f05');
  assert.equal(analytics.trackPageView(window.location.href), false);
  assert.equal(analytics.trackEvent('calculator_start'), false);
  await analytics.setAnalyticsRouteBlocked(true);
  assert.equal(window[`ga-disable-${analytics.GA4_MEASUREMENT_ID}`], true);
  window.location = new URL('https://healio.de/ambulant?src=bonus-check');
  assert.equal(analytics.trackPageView(window.location.href), false);
  assert.equal(analytics.trackEvent('calculator_start'), false);
  cleanup();
  console.log(`Pregnancy integration: ${cases.length} consented-entry cases and SPA privacy transitions passed.`);
} finally {
  delete globalThis.window;
  delete globalThis.document;
}
