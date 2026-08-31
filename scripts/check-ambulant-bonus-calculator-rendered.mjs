import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = await createServer({
  root: rootDir,
  logLevel: 'silent',
  plugins: [{
    name: 'test-vercel-insights-stub',
    resolveId(id) {
      return id === '/_vercel/insights/script.js' ? '\0test-vercel-insights-stub' : null;
    },
    load(id) {
      return id === '\0test-vercel-insights-stub' ? '' : null;
    },
    transformIndexHtml(html) {
      return html.replace('<script defer src="/_vercel/insights/script.js"></script>', '');
    },
    configureServer(viteServer) {
      viteServer.middlewares.use('/_vercel/insights/script.js', (_request, response) => {
        response.statusCode = 204;
        response.end();
      });
    },
  }],
  server: {
    host: '127.0.0.1',
    port: 0,
  },
});

let browser;

async function launchBrowser() {
  try {
    const puppeteer = (await import('puppeteer')).default;
    return await puppeteer.launch({
      headless: 'shell',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    });
  } catch (error) {
    console.warn(`[bonus-rendered] lokaler Chrome-Start fehlgeschlagen (${error.message.split('\n')[0]}), verwende Vercel-Fallback.`);
  }

  const chromium = (await import('@sparticuz/chromium')).default;
  const puppeteerCore = (await import('puppeteer-core')).default;
  return puppeteerCore.launch({
    args: [...chromium.args, '--no-sandbox', '--disable-dev-shm-usage'],
    executablePath: await chromium.executablePath(),
    headless: 'shell',
  });
}

try {
  await server.listen();
  const address = server.httpServer?.address();
  assert(address && typeof address !== 'string', 'Vite test server did not expose a local port.');

  browser = await launchBrowser();

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`http://127.0.0.1:${address.port}/ambulant`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button[aria-label="Schutzimpfung: Anzahl erhöhen"]');

  const exerciseCounter = async ({ incrementLabel, attempts }) => {
    const interactionFound = await page.evaluate(({ incrementLabel: label, attempts: clickCount }) => {
      const reset = [...document.querySelectorAll('button')]
        .find((button) => button.textContent.trim() === 'Auswahl zurücksetzen');
      const increment = document.querySelector(`button[aria-label="${label}"]`);

      if (!reset || !increment) return false;

      reset.click();
      for (let index = 0; index < clickCount; index += 1) increment.click();
      return true;
    }, { incrementLabel, attempts });

    assert(interactionFound, `Counter controls not found for ${incrementLabel}.`);
    await new Promise((resolve) => setTimeout(resolve, 100));

    return page.evaluate((label) => {
      const increment = document.querySelector(`button[aria-label="${label}"]`);
      const subsidyLabel = [...document.querySelectorAll('span')]
        .find((node) => node.textContent.trim() === 'Erreichtes Zuschusspotenzial:');

      return {
        count: Number(increment?.previousElementSibling?.textContent.trim()),
        disabled: Boolean(increment?.disabled),
        maxText: increment?.nextElementSibling?.textContent.trim() || '',
        subsidyPotential: subsidyLabel?.parentElement?.lastElementChild?.textContent.trim() || '',
      };
    }, incrementLabel);
  };

  const vaccinations = await exerciseCounter({
    incrementLabel: 'Schutzimpfung: Anzahl erhöhen',
    attempts: 20,
  });
  const maternityCheckups = await exerciseCounter({
    incrementLabel: 'Mutterschaftsvorsorge: Anzahl erhöhen',
    attempts: 20,
  });
  assert.deepEqual({ vaccinations, maternityCheckups }, {
    vaccinations: {
      count: 8,
      disabled: true,
      maxText: 'max. 8',
      subsidyPotential: '120 €',
    },
    maternityCheckups: {
      count: 12,
      disabled: true,
      maxText: 'max. 12',
      subsidyPotential: '360 €',
    },
  }, 'Countable bonus activities must stop at their documented UI and calculation caps.');

  const readDentalBonusCard = async ({ route, amount, cta }) => {
    await page.goto(`http://127.0.0.1:${address.port}${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction((expectedAmount) => (
      [...document.querySelectorAll('strong')]
        .some((node) => node.textContent.trim() === expectedAmount)
    ), {}, amount);

    return page.evaluate(({ expectedAmount, expectedCta }) => {
      const amountNode = [...document.querySelectorAll('strong')]
        .find((node) => node.textContent.trim() === expectedAmount);
      const ctaNode = [...document.querySelectorAll('a')]
        .find((node) => node.textContent.replace(/\s+/g, ' ').trim() === expectedCta);

      return {
        cardText: amountNode?.parentElement?.innerText.replace(/\s+/g, ' ').trim() || '',
        ctaHref: ctaNode?.getAttribute('href') || '',
      };
    }, { expectedAmount: amount, expectedCta: cta });
  };

  const germanDentalBonus = await readDentalBonusCard({
    route: '/zahn',
    amount: '1.155 EUR',
    cta: 'Zahn-Check starten',
  });
  assert.match(germanDentalBonus.cardText, /Aktiv \+ Schwangerschaft · passende Nachweise · anerkannte Eigenkosten/);
  assert.match(germanDentalBonus.cardText, /tatsächlich erreichbare.*hängt von den aktuellen Bonusbedingungen ab/i);
  assert.equal(germanDentalBonus.ctaHref, '#zahn-check', 'The German dental bonus CTA must keep opening the dental check.');

  const englishDentalBonus = await readDentalBonusCard({
    route: '/en/dental',
    amount: '€1,155',
    cta: 'Start the dental check',
  });
  assert.match(englishDentalBonus.cardText, /Active \+ pregnancy · suitable evidence · recognised out-of-pocket costs/);
  assert.match(englishDentalBonus.cardText, /actually available depends on the current bonus terms/i);
  assert.equal(englishDentalBonus.ctaHref, '#zahn-check', 'The English dental bonus CTA must keep opening the dental check.');

  console.log('Rendered bonus caps and dental assumptions passed.');
} finally {
  await browser?.close();
  await server.close();
}
