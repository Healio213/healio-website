import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  PRERENDER_BROWSER_RESTART_INTERVAL,
  shouldAbortPrerenderRequest,
} from './lib/prerenderResilience.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prerenderSource = fs.readFileSync(path.join(__dirname, 'prerender.mjs'), 'utf8');
const indexSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const allowedHosts = new Set(['app.healio.de']);

for (const resourceType of ['image', 'media', 'font']) {
  assert.equal(
    shouldAbortPrerenderRequest({
      hostname: '127.0.0.1',
      resourceType,
      allowedExternalHosts: allowedHosts,
    }),
    true,
    `${resourceType} muss im Prerender blockiert werden, damit der CI-Browser nicht an schweren Assets erschöpft.`,
  );
}

for (const resourceType of ['document', 'script', 'stylesheet', 'fetch', 'xhr']) {
  assert.equal(
    shouldAbortPrerenderRequest({
      hostname: '127.0.0.1',
      resourceType,
      allowedExternalHosts: allowedHosts,
    }),
    false,
    `${resourceType} muss für die React-Ausführung erreichbar bleiben.`,
  );
}

assert.equal(
  shouldAbortPrerenderRequest({
    hostname: 'tracker.example',
    resourceType: 'script',
    allowedExternalHosts: allowedHosts,
  }),
  true,
  'Unbekannte externe Hosts müssen blockiert bleiben.',
);

assert.equal(
  shouldAbortPrerenderRequest({
    hostname: '127.0.0.1',
    pathname: '/_vercel/insights/script.js',
    resourceType: 'script',
    allowedExternalHosts: allowedHosts,
  }),
  true,
  'Vercel-Laufzeitskripte gehören nicht in den statischen Build-Browser.',
);

assert.ok(
  PRERENDER_BROWSER_RESTART_INTERVAL > 0 && PRERENDER_BROWSER_RESTART_INTERVAL <= 8,
  'Der CI-Browser muss spätestens nach acht gerenderten Routen frisch gestartet werden.',
);

assert.match(
  prerenderSource,
  /await restartBrowser\(\)/,
  'Ein fehlgeschlagener Routenversuch muss vor dem Retry einen frischen Browser erhalten.',
);
assert.match(
  prerenderSource,
  /try\s*\{\s*page = await createPage\(getBrowser\(\)\)/,
  'Auch ein Fehler beim Öffnen der Page muss vom Retry mit frischem Browser abgefangen werden.',
);
assert.match(
  prerenderSource,
  /await page\?\.close\(\)\.catch/,
  'Der Retry muss eine möglicherweise noch nicht erzeugte Page sicher behandeln.',
);
assert.match(
  prerenderSource,
  /attempts = 3/,
  'Indexierbare Routen brauchen drei voneinander isolierte Render-Versuche.',
);
assert.match(
  prerenderSource,
  /static asset missing/i,
  'Fehlende statische Assets dürfen nicht unbemerkt als HTML-App-Shell ausgeliefert werden.',
);

assert.doesNotMatch(
  indexSource,
  /\/_vercel\/insights\/script\.js/,
  'Vercel Insights darf nicht hartcodiert vor der Analytics-Einwilligung geladen werden.',
);

assert.equal(
  packageJson.devDependencies.puppeteer,
  '25.1.0',
  'Puppeteer muss exakt zur verwendeten Chromium-Hauptversion passen.',
);
assert.equal(
  packageJson.devDependencies['puppeteer-core'],
  '25.1.0',
  'Puppeteer Core muss exakt zur verwendeten Chromium-Hauptversion passen.',
);
assert.equal(
  packageJson.devDependencies['@sparticuz/chromium'],
  '149.0.0',
  'Sparticuz Chromium muss exakt gepinnt sein.',
);

console.log('Prerender resilience contract passed.');
