import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import { HEALIO_VOICE_CONTACT_ENABLED } from '../src/config/contactChannels.js';

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

  // Kontaktwege nach dem Umbau vom 04.11.2026 (Commits b5377f3, e4c59d9, Franks Vorgaben vom selben Tag):
  // - Wo Nita zu sehen ist, sitzt WhatsApp in Nitas Kontaktleiste in der Mitte des rechten Randes. Sie startet
  //   eingeklappt als Kugel und fährt am Desktop nach vier Sekunden von selbst aus, am Handy erst auf Tippen.
  // - Wo Nita ausgeblendet ist (Ratgeber), bleibt der einzelne schwebende WhatsApp-Kreis unten rechts.
  // - Auf den Seiten der geführten Beratung (Startseite, /ambulant, /zahn, /stationaer) gibt es seit 14.10.2026
  //   (Commit 61ad397) keinen schwebenden WhatsApp-Knopf und keine Nita-Leiste unten.
  // - Die Nita-Leiste unten mit WhatsApp läuft am Handy noch auf /schwangerschaft.
  const messen = (selector) => page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    let sichtbar = rect.width > 0 && rect.height > 0;
    for (let node = element; sichtbar && node && node !== document.documentElement; node = node.parentElement) {
      const style = window.getComputedStyle(node);
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) sichtbar = false;
    }
    return {
      href: element.href ?? null,
      target: element.target ?? null,
      rel: element.rel ?? null,
      ariaLabel: element.getAttribute('aria-label'),
      tabIndex: element.getAttribute('tabindex'),
      ariaHidden: element.getAttribute('aria-hidden'),
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
      sichtbar,
    };
  }, selector);
  const pruefeWhatsAppLink = (zustand, ort) => {
    assert.equal(zustand.href, 'https://wa.me/494089755500', `${ort}: Der WhatsApp-Link muss die dedizierte Healio-WhatsApp-Nummer verwenden.`);
    assert.equal(zustand.target, '_blank', `${ort}: WhatsApp muss in einem neuen Tab oder in der App öffnen.`);
    assert.match(zustand.rel, /noopener/, `${ort}: Dem externen Link fehlt noopener.`);
    assert.match(zustand.rel, /noreferrer/, `${ort}: Dem externen Link fehlt noreferrer.`);
    assert.match(zustand.ariaLabel ?? '', /WhatsApp/i, `${ort}: Der WhatsApp-Kontakt braucht einen verständlichen zugänglichen Namen.`);
    assert.match(zustand.ariaLabel ?? '', /neuer Tab/i, `${ort}: Der zugängliche Name muss den neuen Tab ankündigen.`);
  };
  const ueberlappen = (a, b) => !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);

  if (HEALIO_VOICE_CONTACT_ENABLED) {
    // Frisch geladen: nur Nitas Kugel am rechten Rand, WhatsApp noch eingeklappt und weder sichtbar noch per Tab erreichbar.
    await page.goto(`${baseUrl}/partner`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.waitForSelector('[data-healio-nita="dock"]', { timeout: 10_000 });
    const startetEingeklappt = await page.$eval('[data-healio-nita="dock"]', (dock) => !dock.classList.contains('is-open'));
    assert(startetEingeklappt, 'Nitas Kontaktleiste muss beim Seitenaufruf eingeklappt starten.');
    const kugel = await messen('[data-healio-nita="launcher"]');
    assert(kugel?.sichtbar, 'Nitas Kugel muss am Desktop sofort sichtbar sein.');
    assert(kugel.width >= 40 && Math.abs(kugel.width - kugel.height) <= 2, 'Eingeklappt ist Nitas Knopf eine runde Kugel von mindestens 40 px.');
    const whatsappEingeklappt = await messen('[data-healio-whatsapp="floating"]');
    assert(whatsappEingeklappt, 'Der WhatsApp-Kontakt fehlt in Nitas Kontaktleiste auf der Partnerseite.');
    assert.equal(whatsappEingeklappt.sichtbar, false, 'Eingeklappt darf WhatsApp in der Kontaktleiste noch nicht sichtbar sein.');
    assert.equal(whatsappEingeklappt.tabIndex, '-1', 'Eingeklappt darf WhatsApp nicht per Tab erreichbar sein.');
    assert.equal(whatsappEingeklappt.ariaHidden, 'true', 'Eingeklappt muss WhatsApp vor Screenreadern verborgen sein.');

    // Am Desktop fährt die Leiste nach vier Sekunden von selbst aus (NITA_DOCK_AUTO_OPEN_MS).
    await page.waitForSelector('[data-healio-nita="dock"].is-open', { timeout: 10_000 });
    await page.waitForFunction(() => window.getComputedStyle(document.querySelector('[data-healio-whatsapp="floating"]')).opacity === '1', { timeout: 5_000 });
    const desktopState = await messen('[data-healio-whatsapp="floating"]');
    pruefeWhatsAppLink(desktopState, 'Kontaktleiste Desktop');
    assert(desktopState.sichtbar, 'Der WhatsApp-Kontakt ist in der ausgefahrenen Kontaktleiste nicht sichtbar.');
    assert.equal(desktopState.tabIndex, '0', 'Ausgefahren muss WhatsApp per Tab erreichbar sein.');
    assert(desktopState.width >= 40 && desktopState.height >= 40, 'Die WhatsApp-Klickfläche in der Kontaktleiste muss mindestens 40 × 40 Pixel groß sein.');
    assert(Math.abs(desktopState.width - desktopState.height) <= 2, 'Der WhatsApp-Kontakt muss als Kreis dargestellt werden.');
    assert(Math.abs((desktopState.top + desktopState.bottom) / 2 - 450) <= 40, 'Die Kontaktleiste muss in der Mitte des rechten Randes sitzen.');
    assert(desktopState.right <= 1440 && 1440 - desktopState.right <= 80, 'WhatsApp muss in der Kontaktleiste am rechten Rand sitzen.');
    const nitaOffen = await messen('[data-healio-nita="launcher"]');
    const nitaText = await page.$eval('.healio-nita-dock-cta', (cta) => ({ text: cta.textContent, opacity: window.getComputedStyle(cta).opacity }));
    assert(nitaOffen?.sichtbar && nitaText.opacity === '1' && /Nita anrufen/.test(nitaText.text), 'Ausgefahren muss Nitas Knopf „Nita anrufen“ zeigen.');
    assert.equal(ueberlappen(nitaOffen, desktopState), false, 'Nita und WhatsApp dürfen sich in der Kontaktleiste nicht überlagern.');
    const einklappen = await messen('.healio-nita-dock-zu');
    assert(einklappen?.sichtbar && /einklappen/i.test(einklappen.ariaLabel ?? ''), 'Die Kontaktleiste muss sich sichtbar und benannt einklappen lassen.');
  }

  // Ohne Nita (Ratgeber, oder überall, wenn die Sprachfreigabe aus ist) bleibt der einzelne schwebende Kreis unten rechts.
  await page.goto(`${baseUrl}${HEALIO_VOICE_CONTACT_ENABLED ? '/ratgeber' : '/partner'}`, { waitUntil: 'networkidle0', timeout: 30_000 });
  if (HEALIO_VOICE_CONTACT_ENABLED) assert.equal(await page.$('[data-healio-nita="dock"]'), null, 'Auf den Ratgeberseiten darf Nitas Kontaktleiste nicht erscheinen.');
  const kreis = await messen('[data-healio-whatsapp="floating"]');
  assert(kreis, 'Der einzelne schwebende WhatsApp-Kreis fehlt dort, wo Nita nicht erscheint.');
  pruefeWhatsAppLink(kreis, 'Schwebender Kreis Desktop');
  assert(kreis.sichtbar, 'Der schwebende WhatsApp-Kreis ist auf Desktop nicht sichtbar.');
  assert(kreis.width >= 48 && kreis.height >= 48, 'Die WhatsApp-Klickfläche muss mindestens 48 × 48 Pixel groß sein.');
  assert(Math.abs(kreis.width - kreis.height) <= 2, 'Der WhatsApp-Kontakt muss als Kreis dargestellt werden.');
  assert(1440 - kreis.right >= 16 && 1440 - kreis.right <= 40, 'Der WhatsApp-Kontakt sitzt nicht am vorgesehenen rechten Seitenrand.');
  assert(900 - kreis.bottom >= 16 && 900 - kreis.bottom <= 40, 'Der WhatsApp-Kontakt sitzt nicht am vorgesehenen unteren Seitenrand.');

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

  await page.evaluate(() => {
    const hero = document.querySelector('[data-desktop-lead="home"]');
    window.scrollTo({ top: window.scrollY + hero.parentElement.getBoundingClientRect().bottom + 120, behavior: 'instant' });
  });
  await page.waitForFunction(() => document.documentElement.classList.contains('home-hero-passed'));
  const homepageContentLaunchers = await page.evaluate(() => [
    document.querySelector('[data-healio-nita="launcher"]'),
    document.querySelector('[data-healio-whatsapp="floating"]'),
  ].map((element) => {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }));
  // Die Startseite gehört zur geführten Beratung: dort kein schwebender WhatsApp-Knopf, WhatsApp bleibt im Fußbereich.
  assert.deepEqual(homepageContentLaunchers, [HEALIO_VOICE_CONTACT_ENABLED, false], 'Nach dem Startseiten-Hero muss Nita erreichbar sein, ein schwebender WhatsApp-Knopf gehört nicht auf die Seite der geführten Beratung.');

  const footerContact = await page.$('[data-healio-whatsapp="footer"]');
  assert(footerContact, 'Der dauerhaft erreichbare WhatsApp-Link im Footer fehlt.');
  const footerText = await footerContact.evaluate((link) => link.textContent.trim());
  assert.match(footerText, /externer Dienst/i, 'Der Footer muss WhatsApp als externen Dienst kennzeichnen.');

  // Am Handy: Den einmaligen Hinweis neben Nitas Kugel (nach fünf Sekunden) gilt als gesehen, damit er die Messungen nicht überdeckt.
  await page.evaluateOnNewDocument(() => {
    try { if (window.location.protocol === 'http:') window.sessionStorage.setItem('healio-nita-hinweis', 'gesehen'); } catch { /* ohne Speicher */ }
  });
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });

  // /ambulant gehört zur geführten Beratung: am Handy weder schwebender Kreis noch Leiste noch Nita-Kontaktleiste.
  await page.goto(`${baseUrl}/ambulant`, { waitUntil: 'networkidle0', timeout: 30_000 });
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
  await new Promise((resolve) => setTimeout(resolve, 350));
  const ambulantMobil = await page.evaluate(() => {
    const flaeche = (element) => { const rect = element?.getBoundingClientRect(); return Boolean(rect?.width && rect?.height); };
    return {
      floating: flaeche(document.querySelector('[data-healio-whatsapp="floating"]')),
      pill: flaeche(document.querySelector('.healio-nita-pill')),
      dock: flaeche(document.querySelector('[data-healio-nita="dock"]')),
    };
  });
  assert.deepEqual(ambulantMobil, { floating: false, pill: false, dock: false }, 'Auf /ambulant (geführte Beratung) darf am Handy kein schwebender Kontaktknopf erscheinen.');

  // Die Nita-Leiste unten mit WhatsApp: am Handy auf /schwangerschaft, dort ohne schwebenden Kreis und ohne Nita.
  await page.goto(`${baseUrl}/schwangerschaft`, { waitUntil: 'networkidle0', timeout: 30_000 });
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
  await new Promise((resolve) => setTimeout(resolve, 350));

  const mobileLayout = await page.evaluate(() => {
    const floating = document.querySelector('[data-healio-whatsapp="floating"]');
    const floatingRect = floating?.getBoundingClientRect();
    const pill = document.querySelector('.healio-nita-pill');
    const whatsapp = pill?.querySelector('a[href="https://wa.me/494089755500"]');
    const whatsappRect = whatsapp?.getBoundingClientRect();
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
      floatingVisible: Boolean(floatingRect?.width && floatingRect?.height),
      dock: Boolean(document.querySelector('[data-healio-nita="dock"]')),
      pillShown: pill?.getAttribute('data-shown') === 'true',
      href: whatsapp?.href,
      whatsapp: whatsappRect && {
        left: whatsappRect.left,
        top: whatsappRect.top,
        right: whatsappRect.right,
        bottom: whatsappRect.bottom,
        width: whatsappRect.width,
        height: whatsappRect.height,
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

  assert.equal(mobileLayout.floatingVisible, false, 'Auf /schwangerschaft darf kein schwebender WhatsApp-Kreis erscheinen.');
  assert.equal(mobileLayout.dock, false, 'Auf /schwangerschaft darf Nitas Kontaktleiste nicht erscheinen.');
  assert(mobileLayout.whatsapp, 'Der WhatsApp-Kontakt fehlt in der mobilen Leiste auf /schwangerschaft.');
  assert(mobileLayout.pillShown, 'Die mobile Leiste muss außerhalb der geschützten Formularbereiche sichtbar sein.');
  assert.equal(mobileLayout.href, 'https://wa.me/494089755500', 'Auch die mobile Leiste muss die freigegebene WhatsApp-Nummer verwenden.');
  assert(mobileLayout.visible, 'Der WhatsApp-Kontakt ist in der mobilen Leiste nicht sichtbar.');
  assert(mobileLayout.whatsapp.width >= 48 && mobileLayout.whatsapp.height >= 48, 'Die mobile WhatsApp-Klickfläche muss mindestens 48 × 48 Pixel groß sein.');
  assert(844 - mobileLayout.whatsapp.bottom >= 11.5, 'Die mobile Leiste braucht Abstand zum unteren Bildschirmrand (0,75 rem).');

  if (mobileLayout.quote) {
    assert.equal(ueberlappen(mobileLayout.whatsapp, mobileLayout.quote), false, 'WhatsApp-Kontakt und mobiler Tarifknopf überlagern sich.');
  }

  const pregnancyMenuButton = await page.$('button[aria-controls="mobile-navigation"]');
  assert(pregnancyMenuButton, 'Der mobile Menüknopf fehlt auf /schwangerschaft.');
  await pregnancyMenuButton.click();
  await new Promise((resolve) => setTimeout(resolve, 250));
  const pillHiddenByMenu = await page.$eval('.healio-nita-pill', (pill) => {
    const style = window.getComputedStyle(pill);
    return style.visibility === 'hidden' && style.pointerEvents === 'none';
  });
  assert(pillHiddenByMenu, 'Die mobile Leiste muss bei geöffnetem Mobilmenü ausgeblendet werden.');
  await pregnancyMenuButton.click();
  await page.emulateMediaType('print');
  assert(await page.$eval('.healio-nita-pill', (pill) => window.getComputedStyle(pill).display === 'none'), 'Die mobile Leiste muss in der Druckansicht verborgen sein.');
  await page.emulateMediaType('screen');

  // Ohne Nita (Ratgeber) bleibt der schwebende Kreis auch am Handy mindestens 48 px groß.
  await page.goto(`${baseUrl}/ratgeber`, { waitUntil: 'networkidle0', timeout: 30_000 });
  const kreisMobil = await messen('[data-healio-whatsapp="floating"]');
  assert(kreisMobil?.sichtbar, 'Der schwebende WhatsApp-Kreis fehlt am Handy auf den Ratgeberseiten.');
  assert(kreisMobil.width >= 48 && kreisMobil.height >= 48, 'Die mobile WhatsApp-Klickfläche des schwebenden Kreises muss mindestens 48 × 48 Pixel groß sein.');
  assert(kreisMobil.right <= 390 && 844 - kreisMobil.bottom >= 8, 'Der schwebende Kreis muss am Handy ganz im Bild und mit Abstand zum unteren Rand sitzen.');

  await page.goto(`${baseUrl}/kontakt`, { waitUntil: 'networkidle0', timeout: 30_000 });
  const contactPageLink = await page.$('[data-healio-whatsapp="contact-page"]');
  assert(contactPageLink, 'Die Kontaktseite bietet WhatsApp nicht als sichtbaren Kontaktweg an.');
  const privacyNote = await page.$eval('[data-healio-whatsapp-privacy-note]', (note) => note.textContent.trim());
  assert.match(privacyNote, /keine Gesundheitsdaten/i, 'Die Kontaktseite muss vor sensiblen Angaben über WhatsApp warnen.');
  assert.match(privacyNote, /digitale Assistenz/i, 'Die Kontaktseite muss die automatische digitale Assistenz transparent kennzeichnen.');

  if (HEALIO_VOICE_CONTACT_ENABLED) {
    // Am Handy fährt die Kontaktleiste nicht von selbst aus (Frank 04.11.2026); ein Tippen auf die Kugel fährt sie aus.
    const kugelMobil = await messen('[data-healio-nita="launcher"]');
    assert(kugelMobil?.sichtbar, 'Nitas Kugel muss am Handy auf der Kontaktseite sichtbar sein.');
    assert(Math.abs(kugelMobil.width - kugelMobil.height) <= 3 && kugelMobil.right <= 390, 'Nitas Kugel muss am Handy rund und ganz im Bild sein.');
    assert.equal((await messen('[data-healio-whatsapp="floating"]'))?.sichtbar, false, 'Am Handy darf WhatsApp erst nach dem Ausfahren der Kontaktleiste sichtbar sein.');
    await page.click('[data-healio-nita="launcher"]');
    await page.waitForSelector('[data-healio-nita="dock"].is-open', { timeout: 5_000 });
    await page.waitForFunction(() => window.getComputedStyle(document.querySelector('[data-healio-whatsapp="floating"]')).opacity === '1', { timeout: 5_000 });
    const whatsappMobil = await messen('[data-healio-whatsapp="floating"]');
    pruefeWhatsAppLink(whatsappMobil, 'Kontaktleiste Handy');
    assert(whatsappMobil.sichtbar, 'Nach dem Ausfahren muss WhatsApp am Handy sichtbar sein.');
    assert(whatsappMobil.width >= 36 && whatsappMobil.height >= 36, 'Die WhatsApp-Klickfläche in der Kontaktleiste muss am Handy mindestens 36 × 36 Pixel groß sein.');
    assert(whatsappMobil.left >= 0 && whatsappMobil.right <= 390, 'WhatsApp muss am Handy ganz im Bild sein.');
    assert.equal(ueberlappen(await messen('[data-healio-nita="launcher"]'), whatsappMobil), false, 'Nita und WhatsApp dürfen sich am Handy nicht überlagern.');
  }

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
  // In der Kontaktleiste blendet die Druckregel die ganze Leiste aus, sonst den Kreis selbst.
  const hiddenForPrint = await page.$eval('[data-healio-whatsapp="floating"]', (link) => window.getComputedStyle(link.closest('.healio-nita-surface, .healio-whatsapp-floating') ?? link).display === 'none');
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
