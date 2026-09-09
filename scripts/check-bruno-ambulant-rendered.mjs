import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

// Catches the campaign visitor being sent through the old, prefilled bonus
// calculator again, or a campaign flag changing the ordinary outpatient page.
// No product-partner page, booking, application or external request is opened.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = await createServer({
  root,
  logLevel: 'silent',
  server: { host: '127.0.0.1', port: 0 },
});
let browser;

try {
  await server.listen();
  const address = server.httpServer.address();
  const origin = `http://127.0.0.1:${address.port}`;
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) request.continue();
    else request.abort();
  });
  await page.evaluateOnNewDocument(() => {
    window.localStorage.setItem('healio:consent:v2', JSON.stringify({
      version: 2, decided: true, necessary: true,
      preferences: { analytics: false, calendly: false, maps: false, openai: false },
      source: 'settings', updatedAt: '2026-09-08T10:00:00.000Z',
    }));
  });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  const open = async (route) => {
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#tarifwahl');
  };
  const readFlow = () => page.evaluate(() => {
    const tariffSection = document.querySelector('#tarifwahl');
    const hero = document.querySelector('section[aria-labelledby="hero-heading"]');
    const heroMarkup = hero.cloneNode(true);
    // Motion's transient inline styles do not change the standard hero contract.
    heroMarkup.querySelectorAll('[style]').forEach((node) => node.removeAttribute('style'));
    const sections = [...tariffSection.parentElement.children].filter((node) => node.tagName === 'SECTION');
    const content = sections.map((section) => section.textContent).join(' ');
    const faq = document.querySelector('section[itemtype="https://schema.org/FAQPage"]');
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .flatMap((script) => {
        const parsed = JSON.parse(script.textContent);
        return Array.isArray(parsed) ? parsed : parsed['@graph'] || [parsed];
      });
    return {
      hasContinuation: Boolean(document.querySelector('#bonus-topic-continuation-heading')),
      calculatorControls: document.querySelectorAll('button[aria-label="Mutterschaftsvorsorge: Anzahl erhöhen"]').length,
      content,
      heroTitle: hero.querySelector('h1').textContent,
      heroText: hero.textContent,
      heroMarkup: heroMarkup.outerHTML,
      heroTargets: [...hero.querySelectorAll('a')].map((link) => link.getAttribute('href')),
      heroNote: hero.querySelector('[role="note"]')?.textContent || '',
      bonusLinks: sections.flatMap((section) => [...section.querySelectorAll('a')])
        .filter((link) => new URL(link.href).pathname.endsWith('/kassenboost')).length,
      quoteUrl: tariffSection.querySelector('a[target="_blank"]')?.getAttribute('href'),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      questions: [...faq.querySelectorAll('[itemprop="name"]')].map((node) => node.textContent),
      answers: [...faq.querySelectorAll('[itemprop="text"]')].map((node) => node.textContent),
      schemaQuestions: schemas.filter((schema) => schema['@type'] === 'FAQPage')
        .flatMap((schema) => schema.mainEntity.map((question) => question.name)),
      schemaAnswers: schemas.filter((schema) => schema['@type'] === 'FAQPage')
        .flatMap((schema) => schema.mainEntity.map((question) => question.acceptedAnswer.text)),
    };
  });

  await page.setViewport({ width: 1440, height: 960 });
  await open('/ambulant');
  const ordinary = await readFlow();
  assert.equal(ordinary.hasContinuation, false);
  assert.equal(ordinary.calculatorControls, 1, 'Der normale Bonusrechner muss erhalten bleiben.');
  assert(ordinary.bonusLinks > 0, 'Der normale KassenBoost-Anschluss muss erhalten bleiben.');
  assert.equal(ordinary.heroTitle, 'Dein 3.000 EUR Gesundheitsbudget. Effektiv ab 0 EUR.', 'Der allgemeine Hero darf durch den Herkunftszweig nicht neu getextet werden.');
  assert.match(ordinary.heroText, /Warum weiter selbst zahlen\? Sichere dir bis zu 3\.000 EUR für Heilpraktiker, Brille und Vorsorge – ohne Wartezeit und in wenigen Minuten berechnet\./);
  assert.deepEqual(ordinary.heroTargets, ['#budget-kompass']);
  assert.equal(ordinary.heroNote, '');

  await open('/ambulant?src=reel-f05#tarifwahl');
  const campaign = await readFlow();
  assert.equal(campaign.hasContinuation, true, 'Der direkte Themen-Anschluss an der Tarifwahl fehlt.');
  assert.doesNotMatch(campaign.heroText, /effektiv ab\s*0|(?:ohne|keine).*Wartezeit|100\s*%/i, 'Der Themen-Anschluss darf im Hero weder einen Nullbeitrag noch sofortige pauschale Deckung versprechen.');
  assert.match(campaign.heroTitle, /Leistungen.*Beitrag/i);
  assert.match(campaign.heroNote, /bereits angeratene oder begonnene.*nicht automatisch abgedeckt/i, 'Die Grenze für bereits veranlasste Leistungen muss direkt im Hero sichtbar stehen.');
  assert.match(campaign.heroNote, /Versicherungsbeginn.*Gesundheitsangaben.*Tarifbedingungen/);
  assert.deepEqual(campaign.heroTargets, ['#tarifwahl'], 'Der neutrale Hero muss direkt zur eigenen Tarifwahl führen, nicht zurück in den Bonuscheck.');
  assert.equal(campaign.calculatorControls, 0, 'Die Kampagne darf den vorbelegten Bonusrechner nicht erneut zeigen.');
  assert.equal(campaign.bonusLinks, 0, 'Der direkte Weg darf nicht erneut zu KassenBoost führen.');
  assert.doesNotMatch(campaign.content, /Danach kommt KassenBoost|Kassenbonus optimieren|KassenBoost prüft danach/);
  assert.match(campaign.content, /kein.*Termin|keinen Termin|ohne.*Termin/i);
  assert.match(campaign.content, /nicht bestätigt|keine Bonusbestätigung|nicht.*bestätigt/i);
  assert.equal(campaign.quoteUrl, ordinary.quoteUrl, 'Herkunft darf weder SDK-URL noch Bonusdaten an den Versicherer verändern.');
  assert.equal(campaign.canonical, 'https://healio.de/ambulant');
  assert.deepEqual(campaign.schemaQuestions, campaign.questions, 'FAQ-Schema und sichtbare Fragen müssen übereinstimmen.');
  assert.deepEqual(campaign.schemaAnswers, campaign.answers, 'FAQ-Schema und sichtbare Antworten müssen übereinstimmen.');

  await open('/ambulant?src=bonus-check#tarifwahl');
  const neutralTopic = await readFlow();
  assert.equal(neutralTopic.hasContinuation, true, 'Auch der neutrale Themen-Anschluss darf nicht in die Bonus-Rückschleife führen.');
  assert.equal(neutralTopic.calculatorControls, 0);
  assert.equal(neutralTopic.heroMarkup, campaign.heroMarkup, 'Beide erlaubten Herkunftscodes müssen denselben neutralen Hero erhalten.');
  assert.equal(neutralTopic.content, campaign.content, 'Die Herkunft darf keine unterschiedlichen Bonus-Ergebnisse unterstellen.');

  await page.evaluate(() => {
    const button = [...document.querySelectorAll('#tarifwahl button')].find((node) => /AP5/.test(node.textContent));
    button.click();
  });
  await page.waitForFunction(() => /1\.400/.test(document.querySelector('#tarifwahl').textContent));
  const selectedTier = await page.$eval('#tarifwahl button[aria-pressed="true"]', (button) => button.textContent);
  assert.match(selectedTier, /AP5/, 'Die Tarifwahl muss ohne Bonus- oder Terminpflicht bedienbar bleiben.');

  for (const route of ['/ambulant?src=reel-f05&bonus=630#tarifwahl', '/ambulant?src=reel-f05&bonus=0#tarifwahl']) {
    await open(route);
    const untrustedResult = await readFlow();
    assert.equal(untrustedResult.content, campaign.content, 'URL-Zahlen dürfen keine bestätigten Bonuswerte erzeugen.');
    assert.equal(untrustedResult.quoteUrl, ordinary.quoteUrl);
  }

  for (const route of ['/ambulant?src=reel-other', '/ambulant?q=reel-f05', '/ambulant?src=reel-f05-extra', '/ambulant?src=bonus-check-extra']) {
    await open(route);
    const nonCampaign = await readFlow();
    assert.equal(nonCampaign.hasContinuation, false, 'Nur der exakt gebundene Herkunftscode darf den Anschluss ändern.');
    assert.equal(nonCampaign.calculatorControls, 1);
    assert.equal(nonCampaign.heroMarkup, ordinary.heroMarkup, 'Ohne exakt erlaubten Ursprung muss der gesamte allgemeine Hero unverändert bleiben.');
  }

  await open('/en/outpatient');
  const ordinaryEnglish = await page.$eval('section[aria-labelledby="hero-heading"]', (hero) => hero.textContent);
  await open('/en/outpatient?src=reel-f05');
  assert.equal(await page.$eval('section[aria-labelledby="hero-heading"]', (hero) => hero.textContent), ordinaryEnglish, 'Der deutsche Herkunftszweig darf die englische Route nicht verändern.');

  await page.setViewport({ width: 390, height: 844 });
  await open('/ambulant?src=reel-f05#tarifwahl');
  const mobile = await page.evaluate(() => {
    const continuation = document.querySelector('#bonus-topic-continuation-heading').parentElement;
    const rect = continuation.getBoundingClientRect();
    return { left: rect.left, right: rect.right, width: window.innerWidth, overflow: document.documentElement.scrollWidth > window.innerWidth };
  });
  assert(mobile.left >= 0 && mobile.right <= mobile.width, 'Der Anschluss darf mobil nicht abgeschnitten sein.');
  assert.equal(mobile.overflow, false, 'Der direkte Anschluss darf keinen horizontalen Überlauf erzeugen.');
  const mobileNote = await page.$eval('section[aria-labelledby="hero-heading"] [role="note"]', (note) => {
    const rect = note.getBoundingClientRect();
    const style = getComputedStyle(note);
    return { left: rect.left, right: rect.right, width: innerWidth, height: rect.height, visible: style.display !== 'none' && style.visibility !== 'hidden' };
  });
  assert(mobileNote.visible && mobileNote.height > 0 && mobileNote.left >= 0 && mobileNote.right <= mobileNote.width, 'Der Leistungshinweis muss auch mobil vollständig zugänglich bleiben.');
  assert.deepEqual(pageErrors, [], 'Der gerenderte Anschluss darf keine Laufzeitfehler erzeugen.');
  console.log('Bruno → Ambulant: direkte Tarifwahl, keine Bonus-Rückschleife, keine Ergebnisübernahme, FAQ/Canonical, Bestand und Mobilansicht bestanden.');
} finally {
  await browser?.close();
  await server.close();
}
