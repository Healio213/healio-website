import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

const baseUrl = process.env.HEALIO_TEST_BASE_URL || 'http://127.0.0.1:4173';
const baseOrigin = new URL(baseUrl).origin;

const consentState = JSON.stringify({
  version: 2,
  decided: true,
  necessary: true,
  preferences: {
    analytics: false,
    calendly: false,
    maps: false,
    openai: false,
  },
  source: 'settings',
  updatedAt: '2026-08-27T10:00:00.000Z',
});

const browser = await puppeteer.launch({
  headless: true,
  executablePath: await puppeteer.executablePath(),
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
  ],
});

try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const requestUrl = new URL(request.url());
    if (requestUrl.origin === baseOrigin || requestUrl.protocol === 'data:' || requestUrl.protocol === 'blob:') {
      request.continue();
      return;
    }
    request.abort();
  });

  await page.evaluateOnNewDocument((storedConsent) => {
    window.localStorage.setItem('healio:consent:v2', storedConsent);
  }, consentState);
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/partner`, { waitUntil: 'networkidle0', timeout: 30_000 });

  const desktopContact = await page.$('[data-healio-whatsapp="floating"]');
  assert(desktopContact, 'Der globale WhatsApp-Kontakt fehlt auf der Partnerseite.');

  const desktopState = await desktopContact.evaluate((link) => {
    const rect = link.getBoundingClientRect();
    const style = window.getComputedStyle(link);
    return {
      href: link.href,
      target: link.target,
      rel: link.rel,
      ariaLabel: link.getAttribute('aria-label'),
      rect: {
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      },
      visible: style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0',
    };
  });

  assert.equal(desktopState.href, 'https://wa.me/494089755500', 'Der WhatsApp-Link muss die dedizierte Healio-WhatsApp-Nummer verwenden.');
  assert.equal(desktopState.target, '_blank', 'WhatsApp muss in einem neuen Tab oder in der App öffnen.');
  assert.match(desktopState.rel, /noopener/, 'Dem externen Link fehlt noopener.');
  assert.match(desktopState.rel, /noreferrer/, 'Dem externen Link fehlt noreferrer.');
  assert.match(desktopState.ariaLabel, /WhatsApp/i, 'Der WhatsApp-Kontakt braucht einen verständlichen zugänglichen Namen.');
  assert.match(desktopState.ariaLabel, /neuer Tab/i, 'Der zugängliche Name muss den neuen Tab ankündigen.');
  assert(desktopState.visible, 'Der WhatsApp-Kontakt ist auf Desktop nicht sichtbar.');
  assert(desktopState.rect.width >= 48 && desktopState.rect.height >= 48, 'Die WhatsApp-Klickfläche muss mindestens 48 × 48 Pixel groß sein.');
  assert(Math.abs(desktopState.rect.width - desktopState.rect.height) <= 2, 'Der WhatsApp-Kontakt muss als Kreis dargestellt werden.');
  assert(1440 - desktopState.rect.right >= 16 && 1440 - desktopState.rect.right <= 40, 'Der WhatsApp-Kontakt sitzt nicht am vorgesehenen rechten Seitenrand.');
  assert(900 - desktopState.rect.bottom >= 16 && 900 - desktopState.rect.bottom <= 40, 'Der WhatsApp-Kontakt sitzt nicht am vorgesehenen unteren Seitenrand.');

  const desktopLaunchers = await page.evaluate(() => {
    const selectors = [
      '[data-healio-nita="launcher"]',
      '[data-healio-whatsapp="floating"]',
    ];
    return selectors.map((selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return {
        text: element.innerText.trim(),
        visible: style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0',
        width: rect.width,
        height: rect.height,
      };
    });
  });
  assert.equal(desktopLaunchers.filter(Boolean).length, 2, 'Auf Desktop müssen genau Nita und WhatsApp als globale Launcher vorhanden sein.');
  assert(desktopLaunchers.every((launcher) => launcher?.visible), 'Beide Desktop-Launcher müssen sichtbar sein.');
  assert(desktopLaunchers.every((launcher) => launcher?.text === ''), 'Die beiden Launcher dürfen keinen sichtbaren Textbalken enthalten.');
  assert(desktopLaunchers.every((launcher) => Math.abs(launcher.width - launcher.height) <= 2), 'Beide Desktop-Launcher müssen kreisförmig sein.');

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0', timeout: 30_000 });
  const homepageHeroLaunchers = await page.evaluate(() => [
    document.querySelector('[data-healio-nita="launcher"]'),
    document.querySelector('[data-healio-whatsapp="floating"]'),
  ].map((element) => {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }));
  assert.deepEqual(homepageHeroLaunchers, [false, false], 'Der obere Startseiten-Hero muss ohne schwebende Kontaktkreise ruhig bleiben.');

  await page.evaluate(() => window.scrollTo(0, window.innerHeight + 120));
  await new Promise((resolve) => setTimeout(resolve, 250));
  const homepageContentLaunchers = await page.evaluate(() => [
    document.querySelector('[data-healio-nita="launcher"]'),
    document.querySelector('[data-healio-whatsapp="floating"]'),
  ].map((element) => {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }));
  assert.deepEqual(homepageContentLaunchers, [true, true], 'Nach dem Startseiten-Hero müssen beide Kontaktkreise wieder erreichbar sein.');

  const footerContact = await page.$('[data-healio-whatsapp="footer"]');
  assert(footerContact, 'Der dauerhaft erreichbare WhatsApp-Link im Footer fehlt.');
  const footerText = await footerContact.evaluate((link) => link.textContent.trim());
  assert.match(footerText, /externer Dienst/i, 'Der Footer muss WhatsApp als externen Dienst kennzeichnen.');

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/ambulant`, { waitUntil: 'networkidle0', timeout: 30_000 });
  await page.evaluate(() => window.scrollTo(0, 480));
  await new Promise((resolve) => setTimeout(resolve, 350));

  const mobileLayout = await page.evaluate(() => {
    const whatsapp = document.querySelector('[data-healio-whatsapp="floating"]');
    const whatsappRect = whatsapp?.getBoundingClientRect();
    const nita = document.querySelector('[data-healio-nita="launcher"]');
    const nitaRect = nita?.getBoundingClientRect();
    const quoteAnchor = [...document.querySelectorAll('a[href*="insurances-online.levelnine.biz"]')]
      .find((anchor) => {
        let current = anchor;
        while (current && current !== document.body) {
          if (window.getComputedStyle(current).position === 'fixed') return true;
          current = current.parentElement;
        }
        return false;
      });
    let quoteContainer = quoteAnchor;
    while (quoteContainer && quoteContainer !== document.body && window.getComputedStyle(quoteContainer).position !== 'fixed') {
      quoteContainer = quoteContainer.parentElement;
    }
    const quoteRect = quoteContainer?.getBoundingClientRect();
    const style = whatsapp ? window.getComputedStyle(whatsapp) : null;

    return {
      whatsapp: whatsappRect && {
        left: whatsappRect.left,
        top: whatsappRect.top,
        right: whatsappRect.right,
        bottom: whatsappRect.bottom,
        width: whatsappRect.width,
        height: whatsappRect.height,
      },
      nita: nitaRect && {
        left: nitaRect.left,
        top: nitaRect.top,
        right: nitaRect.right,
        bottom: nitaRect.bottom,
        width: nitaRect.width,
        height: nitaRect.height,
      },
      quote: quoteRect && {
        left: quoteRect.left,
        top: quoteRect.top,
        right: quoteRect.right,
        bottom: quoteRect.bottom,
      },
      visible: style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0',
    };
  });

  assert(mobileLayout.whatsapp, 'Der WhatsApp-Kontakt fehlt in der mobilen Ambulant-Ansicht.');
  assert(mobileLayout.nita, 'Der Nita-Kreis fehlt in der mobilen Ambulant-Ansicht.');
  assert(mobileLayout.visible, 'Der WhatsApp-Kontakt ist in der mobilen Ambulant-Ansicht nicht sichtbar.');
  assert(mobileLayout.whatsapp.width >= 48 && mobileLayout.whatsapp.height >= 48, 'Die mobile WhatsApp-Klickfläche muss mindestens 48 × 48 Pixel groß sein.');
  assert(844 - mobileLayout.whatsapp.bottom >= 76, 'Der WhatsApp-Kontakt muss oberhalb des mobilen Tarifknopfs sitzen.');
  assert(390 - mobileLayout.nita.right >= 8, 'Der mobile Nita-Kreis braucht Abstand zum rechten Rand, damit sein Schatten nicht abgeschnitten wird.');
  assert(Math.abs(mobileLayout.nita.width - mobileLayout.nita.height) <= 2, 'Der mobile Nita-Launcher muss kreisförmig sein.');
  assert(mobileLayout.nita.bottom <= mobileLayout.whatsapp.top, 'Nita und WhatsApp dürfen sich mobil nicht überlagern.');

  if (mobileLayout.quote) {
    const overlaps = !(
      mobileLayout.whatsapp.right <= mobileLayout.quote.left
      || mobileLayout.whatsapp.left >= mobileLayout.quote.right
      || mobileLayout.whatsapp.bottom <= mobileLayout.quote.top
      || mobileLayout.whatsapp.top >= mobileLayout.quote.bottom
    );
    assert.equal(overlaps, false, 'WhatsApp-Kontakt und mobiler Tarifknopf überlagern sich.');
  }

  await page.goto(`${baseUrl}/kontakt`, { waitUntil: 'networkidle0', timeout: 30_000 });
  const contactPageLink = await page.$('[data-healio-whatsapp="contact-page"]');
  assert(contactPageLink, 'Die Kontaktseite bietet WhatsApp nicht als sichtbaren Kontaktweg an.');
  const privacyNote = await page.$eval('[data-healio-whatsapp-privacy-note]', (note) => note.textContent.trim());
  assert.match(privacyNote, /keine Gesundheitsdaten/i, 'Die Kontaktseite muss vor sensiblen Angaben über WhatsApp warnen.');
  assert.match(privacyNote, /digitale Assistenz/i, 'Die Kontaktseite muss die automatische digitale Assistenz transparent kennzeichnen.');

  const menuButton = await page.$('button[aria-controls="mobile-navigation"]');
  assert(menuButton, 'Der mobile Menüknopf fehlt in der Testansicht.');
  await menuButton.click();
  await new Promise((resolve) => setTimeout(resolve, 250));
  const hiddenByMenu = await page.$eval('[data-healio-whatsapp="floating"]', (link) => {
    const style = window.getComputedStyle(link);
    return style.visibility === 'hidden' && style.pointerEvents === 'none';
  });
  assert(hiddenByMenu, 'Der WhatsApp-Kontakt muss bei geöffnetem Mobilmenü ausgeblendet werden.');

  await page.emulateMediaType('print');
  const hiddenForPrint = await page.$eval('[data-healio-whatsapp="floating"]', (link) => window.getComputedStyle(link).display === 'none');
  assert(hiddenForPrint, 'Der schwebende WhatsApp-Kontakt muss in der Druckansicht verborgen sein.');

  await page.emulateMediaType('screen');
  await page.goto(`${baseUrl}/datenschutz`, { waitUntil: 'networkidle0', timeout: 30_000 });
  const privacySection = await page.$('#whatsapp-kontakt');
  assert(privacySection, 'Die Datenschutzerklärung enthält keinen WhatsApp-Abschnitt.');
  const whatsappPolicyLink = await page.$('a[href="https://www.whatsapp.com/legal/privacy-policy-eea"]');
  assert(whatsappPolicyLink, 'Die Datenschutzerklärung verlinkt die WhatsApp-Datenschutzerklärung nicht.');
  const whatsappPrivacyText = await privacySection.evaluate((section) => section.parentElement?.textContent ?? section.textContent ?? '');
  assert.match(whatsappPrivacyText, /Twilio Ireland Limited/i, 'Die Datenschutzerklärung muss Twilio als Übermittlungsdienst nennen.');
  assert.match(whatsappPrivacyText, /OpenAI Ireland Limited/i, 'Die Datenschutzerklärung muss OpenAI als KI-Dienst nennen.');
  assert.match(whatsappPrivacyText, /bis zu 30 Tage/i, 'Die Datenschutzerklärung muss die mögliche OpenAI-Aufbewahrung transparent nennen.');

  console.log('WhatsApp contact rendered checks passed.');
} finally {
  await browser.close();
}
