import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const targetUrl = process.env.DESKTOP_PREVIEW_URL || 'http://127.0.0.1:3198';
const baselineUrl = process.env.MOBILE_BASELINE_URL || 'http://127.0.0.1:3197';
const outputDir = path.resolve('docs/desktop-2026-10-07/pruefung');
const routes = [
  { path: '/', key: 'home', destination: 'external' },
  { path: '/ambulant', key: 'ambulant', destination: 'budget-kompass' },
  { path: '/zahn', key: 'zahn', destination: 'zahn-check' },
  { path: '/stationaer', key: 'stationaer', destination: 'tarife' },
];

await fs.mkdir(outputDir, { recursive: true });
const browser = await puppeteer.launch({ headless: true });
const report = { desktop: [], mobile: [], breakpoints: [], navigation: [] };
const mobileHeadlines = {
  '/': 'Dein Kassenbonus ist zu wertvoll, um ihn ungenutzt zu lassen.',
  '/ambulant': 'Warum bezahlst du Privatleistungen selbst, während dein Kassenbonus ungenutzt bleibt?',
  '/zahn': 'Dein Lächeln ist dein stärkstes Statussignal. Warum überlässt du es dem Kassenstandard?',
  '/stationaer': 'Wenn es um deine Gesundheit geht, sind Arztwahl und Privatsphäre keine Nebensache.',
  '/partner': 'Wie viele hochwertige Behandlungspläne verlierst du an die Angst vor dem Eigenanteil?',
};
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.setRequestInterception(true);
page.on('request', (request) => {
  const url = request.url();
  if (url.startsWith('http://127.0.0.1:') || url.startsWith('data:') || url.startsWith('blob:')) {
    request.continue();
  } else {
    request.abort();
  }
});

async function open(url, viewport) {
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h1');
  await page.evaluate(() => document.fonts.ready);
  await new Promise((resolve) => setTimeout(resolve, 1100));
}

async function chooseNecessaryOnlyForBooking() {
  const banner = await page.$('section.healio-consent-surface');
  if (!banner) return;
  const necessaryOnly = await banner.$('button');
  assert(necessaryOnly, 'Consent banner has its necessary-only action');
  assert.equal(await necessaryOnly.evaluate((node) => node.innerText.trim()), 'Nur notwendige', 'Booking check grants only necessary consent');
  await necessaryOnly.click();
  await page.waitForSelector('section.healio-consent-surface', { hidden: true });
}

const snapshot = () => page.evaluate(() => {
  const visible = (node) => Boolean(node.getClientRects().length);
  const headings = [...document.querySelectorAll('h1')].filter(visible);
  const hero = document.querySelector('section[data-desktop-lead]');
  const primary = hero?.querySelector('[data-desktop-primary]');
  const box = (node) => {
    const rect = node?.getBoundingClientRect();
    return rect && { x: rect.x, y: rect.y, width: rect.width, height: rect.height, bottom: rect.bottom };
  };
  const horizontalRows = [...document.querySelectorAll('.snap-x')];
  const mobileHero = headings[0]?.closest('section');
  return {
    width: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    text: document.body.innerText.replace(/\s+/g, ' ').trim(),
    headings: headings.map((node) => node.innerText.replace(/\s+/g, ' ').trim()),
    totalH1: document.querySelectorAll('h1').length,
    headingBox: box(headings[0]),
    heroVisible: Boolean(hero && visible(hero)),
    heroBox: hero && visible(hero) ? box(hero) : null,
    primaryBox: primary && visible(primary) ? box(primary) : null,
    primaryHref: primary?.getAttribute('href'),
    primaryUncovered: primary && visible(primary) ? (() => {
      const rect = primary.getBoundingClientRect();
      return [
        [rect.left + 32, rect.top + rect.height / 2],
        [rect.right - 32, rect.top + rect.height / 2],
      ].every(([x, y]) => primary.contains(document.elementFromPoint(x, y)));
    })() : false,
    swipeRows: horizontalRows.filter(visible).length,
    swipeCards: horizontalRows.filter(visible).map((node) => ({
      label: node.getAttribute('aria-label'),
      text: node.innerText.replace(/\s+/g, ' ').trim(),
      width: node.clientWidth,
      children: node.children.length,
    })),
    outsideHeroText: document.body.innerText.replace(mobileHero?.innerText || '', '').replace(/\s+/g, ' ').trim(),
    sections: [...document.querySelectorAll('section')].filter(visible).map((node) => ({
      id: node.id,
      top: Math.round(node.getBoundingClientRect().top),
      height: Math.round(node.getBoundingClientRect().height),
    })),
  };
});

try {
  for (const route of routes) {
    for (const viewport of [{ width: 1280, height: 800 }, { width: 1440, height: 900 }]) {
      await open(`${targetUrl}${route.path}`, viewport);
      const current = await snapshot();
      assert.equal(current.headings.length, 1, `${route.path}: exactly one visible page title`);
      assert.equal(current.totalH1, 1, `${route.path}: exactly one H1 in the whole document`);
      assert(current.heroVisible, `${route.path}: desktop hero is visible`);
      assert.equal(current.documentWidth, viewport.width, `${route.path}: full width without horizontal overflow`);
      assert.equal(current.heroBox.x, 0, `${route.path}: hero starts at the browser edge`);
      assert.equal(current.heroBox.width, viewport.width, `${route.path}: hero fills browser width`);
      assert(current.headingBox.y >= 80, `${route.path}: title stays below the fixed header`);
      assert(current.primaryBox?.bottom < viewport.height, `${route.path}: primary action is above the fold`);
      assert(current.primaryBox.height >= 44, `${route.path}: primary action has a usable hit area`);
      assert(current.primaryUncovered, `${route.path}: consent and fixed UI do not cover the primary action`);
      if (route.destination === 'external') {
        assert.equal(new URL(current.primaryHref).hostname, 'kassenboost.de');
      } else {
        assert.equal(current.primaryHref, `#${route.destination}`);
        assert(await page.$(`#${route.destination}`), `${route.path}: CTA has a real destination`);
        await page.click('[data-desktop-primary]');
        await page.waitForFunction(() => window.scrollY > 80);
      }
      report.desktop.push({ route: route.path, viewport, ...current, text: undefined });
      if (viewport.width === 1440) {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: path.join(outputDir, `${route.key}-desktop.png`), fullPage: true });
      }
    }
    const viewport = { width: 390, height: 844 };
    await open(`${baselineUrl}${route.path}`, viewport);
    const baseline = await snapshot();
    await open(`${targetUrl}${route.path}`, viewport);
    const current = await snapshot();
    assert(!current.heroVisible, `${route.path}: desktop hero stays hidden on mobile`);
    assert.equal(current.totalH1, 1, `${route.path}: mobile retains exactly one H1`);
    assert.equal(current.documentWidth, baseline.documentWidth, `${route.path}: mobile width is unchanged`);
    assert.deepEqual(current.headings, [mobileHeadlines[route.path]], `${route.path}: approved mobile headline is visible`);
    assert.equal(current.outsideHeroText, baseline.outsideHeroText, `${route.path}: content outside the revised hero is unchanged`);
    assert.deepEqual(current.sections.map((section) => section.id), baseline.sections.map((section) => section.id), `${route.path}: mobile section order is unchanged`);
    assert.deepEqual(current.swipeCards, baseline.swipeCards, `${route.path}: mobile cards, widths and navigation structure are unchanged`);
    assert.equal(current.swipeRows, baseline.swipeRows, `${route.path}: swipe rows remain available`);
    assert(current.swipeRows > 0, `${route.path}: horizontal mobile cards are present`);
    await page.screenshot({ path: path.join(outputDir, `${route.key}-mobile.png`), fullPage: true });
    const swipe = await page.evaluate(() => {
      const row = [...document.querySelectorAll('.snap-x')].find((node) => node.getClientRects().length
        && node.scrollWidth > node.clientWidth
        && node.parentElement.querySelector('button[aria-label^="Karte 2 von"]'));
      const dot = row?.parentElement.querySelector('button[aria-label^="Karte 2 von"]');
      if (!row || !dot) return null;
      dot.click();
      return { width: row.clientWidth, scrollWidth: row.scrollWidth };
    });
    assert(swipe, `${route.path}: mobile navigation has a second card`);
    await page.waitForFunction(() => [...document.querySelectorAll('.snap-x')].some((node) => node.getClientRects().length && node.scrollLeft > 30));
    report.mobile.push({ route: route.path, viewport, copyUpdated: true, structurePreserved: true, height: current.height, swipeRows: current.swipeRows, secondCardOpened: true });
  }
  for (const [hash, target] of [['so-funktioniert', 'desktop-home-process'], ['schutz', 'desktop-home-products']]) {
    await open(`${targetUrl}/#${hash}`, { width: 1440, height: 900 });
    const top = await page.$eval(`#${target}`, (node) => node.getBoundingClientRect().top);
    assert(top >= 70 && top <= 130, `Existing #${hash} fragment opens its visible desktop section below the header`);
    report.navigation.push({ path: `/#${hash}`, target, top });
  }
  for (const route of ['/en', '/en/outpatient', '/en/dental', '/en/inpatient', '/ambulant?src=bonus-check']) {
    await open(`${targetUrl}${route}`, { width: 1280, height: 800 });
    const current = await snapshot();
    assert.equal(current.totalH1, 1, `${route}: exactly one H1`);
    assert(current.heroVisible && current.primaryBox.bottom < 800, `${route}: desktop action is visible above the fold`);
    assert.equal(current.documentWidth, 1280, `${route}: no overflow`);
    if (route.includes('bonus-check')) assert.equal(current.primaryHref, '#tarifwahl');
    report.navigation.push({ path: route, heading: current.headings[0], primaryHref: current.primaryHref });
  }
  for (const width of [767, 768, 1023, 1024]) {
    await open(targetUrl, { width, height: 900 });
    const current = await snapshot();
    assert.equal(current.headings.length, 1, `At ${width}px there is exactly one visible title`);
    assert.equal(current.heroVisible, width >= 1024, `At ${width}px the matching hero is shown`);
    assert.equal(current.documentWidth, width, `At ${width}px there is no horizontal page overflow`);
    report.breakpoints.push({ width, desktop: current.heroVisible });
  }
  for (const viewport of [{ width: 320, height: 740 }, { width: 360, height: 740 }, { width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    await open(`${baselineUrl}/partner`, viewport);
    // The booking interaction follows the regular privacy choice on both
    // origins. First-visit desktop coverage checks above stay unchanged.
    await chooseNecessaryOnlyForBooking();
    const baseline = await snapshot();
    await open(`${targetUrl}/partner`, viewport);
    await chooseNecessaryOnlyForBooking();
    const current = await snapshot();
    assert.equal(current.totalH1, 1, 'Partner retains exactly one H1');
    assert.deepEqual(current.headings, [mobileHeadlines['/partner']], 'Partner displays the selected headline');
    assert.equal(current.documentWidth, viewport.width, 'Partner fills the width without page overflow');
    assert.equal(current.outsideHeroText, baseline.outsideHeroText, 'Partner content outside the hero is unchanged');
    assert.deepEqual(current.swipeCards, baseline.swipeCards, 'Partner swipe cards are preserved');
    const primary = await page.$('main section button');
    assert(primary, 'Partner hero retains its booking button');
    await primary.click();
    await page.waitForFunction(() => window.scrollY > 80);
    report.navigation.push({ path: '/partner', viewport, heading: current.headings[0], bookingConsent: 'necessary-only', bookingScroll: true });
    if (viewport.width === 390 || viewport.width === 1440) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(outputDir, `partner-${viewport.width === 390 ? 'mobile' : 'desktop'}.png`), fullPage: true });
    }
  }
  await fs.writeFile(path.join(outputDir, 'ergebnis.json'), JSON.stringify(report, null, 2));
  console.log(`Conversion checks passed: ${report.desktop.length} desktop views, ${report.mobile.length} mobile pages with preserved cards, ${report.breakpoints.length} breakpoints, ${report.navigation.length} navigation checks.`);
} finally {
  await browser.close();
}
