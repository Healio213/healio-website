import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { buildSync } from 'esbuild';
import { JSDOM } from 'jsdom';
import test from 'node:test';

// Echte Komponenten, Radix-Dialog und Router; nur Netzwerk/neue Tabs sind Stubs.
// JSDOM lädt keine externen Ressourcen. Es gibt keinen echten Lead oder Antrag.
const targetUrl = 'https://www.diebayerische.de/diebayerische/online-berechnen/zahnzusatzversicherung-berechnen?m=002637&um=MAK226487';
const rootDirectory = fileURLToPath(new URL('..', import.meta.url));
const bundle = buildSync({
  stdin: {
    contents: `
      import React, { act, useState } from 'react';
      import { createRoot } from 'react-dom/client';
      import { MemoryRouter } from 'react-router-dom';
      import { createInstance } from 'i18next';
      import { I18nextProvider, initReactI18next } from 'react-i18next';
      import Header from './src/components/Header.jsx';
      import LeadCaptureModal from './src/components/LeadCaptureModal.tsx';
      import LeadCaptureProvider from './src/components/LeadCaptureProvider.jsx';
      import LeadCaptureLink from './src/components/LeadCaptureLink.jsx';
      import * as capture from './src/lib/lead-capture.js';
      import * as consent from './src/lib/consent.js';
      export { act, capture, consent };
      function ModalHarness({ url, callbacks }) {
        const [open, setOpen] = useState(true);
        return <LeadCaptureModal isOpen={open} targetUrl={url} trackingCategory={url.includes('angebot=arag-v100') ? 'arag-v100' : url.includes('beitragsrechner.dkv.com') ? 'dkv-stationaer' : 'bayerische'}
          onClose={() => { callbacks.closed += 1; setOpen(false); }}
          onExternalOpen={() => { callbacks.opened += 1; }} />;
      }
      export function mountModal(container, url, callbacks) {
        const root = createRoot(container);
        root.render(<ModalHarness url={url} callbacks={callbacks} />);
        return root;
      }
      export function updateModal(root, url, callbacks) {
        root.render(<ModalHarness url={url} callbacks={callbacks} />);
      }
      export function mountProvider(container, url, path, callbacks) {
        const root = createRoot(container);
        root.render(<MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <LeadCaptureProvider>
            <LeadCaptureLink id="first-link" href={url} target="_blank" rel="noopener noreferrer"
              trackingCategory={url.includes('angebot=arag-v100') ? 'arag-v100' : url.includes('beitragsrechner.dkv.com') ? 'dkv-stationaer' : 'bayerische'} onClick={() => { callbacks.opened += 1; }}>Erster Rechner</LeadCaptureLink>
            <LeadCaptureLink id="next-link" href={url} target="_blank" rel="noopener noreferrer"
              trackingCategory={url.includes('angebot=arag-v100') ? 'arag-v100' : url.includes('beitragsrechner.dkv.com') ? 'dkv-stationaer' : 'bayerische'} onClick={() => { callbacks.opened += 1; }}>Zweiter Rechner</LeadCaptureLink>
            <LeadCaptureLink id="non-application-link" href="https://kassenboost.de/" target="_blank" rel="noopener noreferrer">Kassenvergleich</LeadCaptureLink>
          </LeadCaptureProvider>
        </MemoryRouter>);
        return root;
      }
      export function mountHeader(container, path) {
        const i18n = createInstance();
        i18n.use(initReactI18next).init({
          lng: path.startsWith('/en') ? 'en' : 'de', initImmediate: false,
          resources: { de: { common: {} }, en: { common: {} } },
          defaultNS: 'common', interpolation: { escapeValue: false },
        });
        const root = createRoot(container);
        root.render(<I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <LeadCaptureProvider><Header /></LeadCaptureProvider>
          </MemoryRouter>
        </I18nextProvider>);
        return root;
      }
    `,
    resolveDir: rootDirectory,
    loader: 'jsx',
  },
  alias: { '@': `${rootDirectory}/src` },
  define: { 'import.meta': '{"env":{}}' },
  external: ['react', 'react-dom/*', 'react-router-dom'],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  write: false,
});

const nativeSetTimeout = globalThis.setTimeout;
const nativeClearTimeout = globalThis.clearTimeout;
const nativeFetch = globalThis.fetch;
const require = createRequire(import.meta.url);

const harness = async (mode = 'modal', { popupBlocked = false, ignoreAbort = false, path = '/zahn', url = targetUrl } = {}) => {
  const dom = new JSDOM('<button id="return-focus">Vorheriger Fokus</button><div id="root"></div>', { url: `https://healio.de${path}`, pretendToBeVisual: true });
  Object.assign(globalThis, {
    window: dom.window, document: dom.window.document,
    CustomEvent: dom.window.CustomEvent, Event: dom.window.Event, MouseEvent: dom.window.MouseEvent,
    KeyboardEvent: dom.window.KeyboardEvent, Element: dom.window.Element, HTMLElement: dom.window.HTMLElement,
    HTMLInputElement: dom.window.HTMLInputElement, Node: dom.window.Node,
    SVGElement: dom.window.SVGElement,
    requestAnimationFrame: dom.window.requestAnimationFrame.bind(dom.window),
    cancelAnimationFrame: dom.window.cancelAnimationFrame.bind(dom.window),
    NodeFilter: dom.window.NodeFilter, MutationObserver: dom.window.MutationObserver,
    getComputedStyle: dom.window.getComputedStyle.bind(dom.window),
    IS_REACT_ACT_ENVIRONMENT: true,
  });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(require, module, module.exports);
  const { act, capture, consent, mountModal, updateModal, mountProvider, mountHeader } = module.exports;
  const order = [];
  const requests = [];
  const tabs = [];
  const callbacks = { closed: 0, opened: 0 };
  const timers = new Map();
  let timerId = -1;
  let popupsBlocked = popupBlocked;
  globalThis.setTimeout = (callback, delay, ...args) => {
    if (delay === 1000 || delay === 12000 || delay === 30000) {
      const id = timerId--;
      timers.set(id, { delay, callback: () => callback(...args) });
      return id;
    }
    return nativeSetTimeout(callback, delay, ...args);
  };
  globalThis.clearTimeout = (id) => { if (!timers.delete(id)) nativeClearTimeout(id); };
  dom.window.open = (url, target) => {
    order.push(['open', url, target]);
    if (popupsBlocked) return null;
    const tab = {
      closed: false, opener: dom.window,
      document: dom.window.document.implementation.createHTMLDocument(''),
      location: { replace: (destination) => { order.push(['navigate', destination]); tab.destination = destination; } },
      close: () => { tab.closed = true; order.push(['close']); },
    };
    tabs.push(tab);
    return tab;
  };
  globalThis.fetch = (url, options) => {
    order.push(['fetch', url]);
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    if (!ignoreAbort) options.signal?.addEventListener('abort', () => reject(new Error('synthetic aborted request')), { once: true });
    const entry = { url, options, resolve, reject };
    requests.push(entry);
    return promise;
  };
  document.getElementById('return-focus').focus();
  let root;
  await act(() => {
    root = mode === 'header'
      ? mountHeader(document.getElementById('root'), path)
      : mode === 'provider'
        ? mountProvider(document.getElementById('root'), url, path, callbacks)
        : mountModal(document.getElementById('root'), url, callbacks);
  });

  const setInput = async (name, value) => {
    await act(() => {
      const input = document.querySelector(`input[name="${name}"]`);
      assert(input, `Feld ${name} muss existieren`);
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, value);
      input.dispatchEvent(new window.Event('input', { bubbles: true }));
    });
  };
  const fill = async (firstName = 'Test', email = 'test@example.test') => {
    await setInput('firstName', firstName); await setInput('email', email);
  };
  const submit = async () => act(() => document.querySelector('form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })));
  const respond = async (index, ok = true, body = { ok: true }) => act(async () => requests[index].resolve({ ok, json: async () => body }));
  const reject = async (index) => act(async () => requests[index].reject(new Error('synthetic network failure')));
  const fireTimer = async (delay) => {
    const found = [...timers].find(([, timer]) => timer.delay === delay);
    assert(found, `Timer ${delay} muss bestehen`);
    timers.delete(found[0]);
    await act(async () => found[1].callback());
  };
  const click = async (selector) => act(async () => {
    const element = document.querySelector(selector);
    assert(element, selector);
    element.focus(); element.click();
  });
  const cleanup = async () => {
    await act(() => root.unmount());
    dom.window.close();
    globalThis.setTimeout = nativeSetTimeout;
    globalThis.clearTimeout = nativeClearTimeout;
    globalThis.fetch = nativeFetch;
  };
  const changeTarget = async (newUrl) => act(() => updateModal(root, newUrl, callbacks));
  return { act, capture, consent, callbacks, requests, tabs, order, timers, fill, setInput, submit, respond, reject, fireTimer, click, cleanup, changeTarget, setPopupBlocked: (value) => { popupsBlocked = value; } };
};

test('echte Desktop- und Mobil-Header-CTAs öffnen auf DE/EN zuerst das Modal und messen erst das bestätigte SDK-Öffnen', async () => {
  for (const [path, placement] of [['/ambulant', 'desktop'], ['/ambulant', 'mobile'], ['/en/outpatient', 'desktop'], ['/en/outpatient', 'mobile']]) {
    const h = await harness('header', { path });
    try {
      // Die echte Statistikfunktion wird lokal ausgeführt; jsdom lädt keine Tags.
      h.consent.saveConsentPreferences({ analytics: true });
      Object.defineProperty(window, 'scrollY', { configurable: true, value: 120 });
      await h.act(() => window.dispatchEvent(new window.Event('scroll')));
      await h.fireTimer(30000);
      const selector = `[data-ambulant-header-cta="${placement}"]`;
      const expectedUrl = document.querySelector(selector).href;
      assert.match(expectedUrl, /^https:\/\/insurances-online\.levelnine\.biz\//);
      const tariffEvents = () => (window.dataLayer || []).filter((entry) => entry[0] === 'event' && entry[1] === 'tariff_calculator_click');
      await h.click(selector);
      assert(document.querySelector('[role="dialog"]'));
      assert.equal(h.requests.length, 0); assert.equal(h.tabs.length, 0);
      assert.equal(tariffEvents().length, 0);
      await h.fill(); await h.submit();
      assert.equal(h.requests.length, 1);
      assert.equal(JSON.parse(h.requests[0].options.body).trackingCategory, 'sdk-ambulant');
      assert.equal(h.tabs[0].destination, undefined); assert.equal(tariffEvents().length, 0);
      await h.respond(0);
      assert.equal(h.tabs[0].destination, expectedUrl);
      assert.equal(tariffEvents().length, 1);
      assert.equal(tariffEvents()[0][2].placement, `ambulant-header-${placement}`);
      assert.equal(document.querySelector('[role="dialog"]'), null);
    } finally { await h.cleanup(); }
  }
});

test('DKV auf DE/EN-Stationär öffnet zuerst Erfassung, navigiert erst nach CMS-Ack zum exakten persönlichen Rechner', async () => {
  const url = 'https://www.beitragsrechner.dkv.com/tarifrechner/600085/UZ1?leitmerk=MAK226487';
  for (const path of ['/stationaer', '/en/inpatient']) {
    const h = await harness('provider', { path, url });
    try {
      await h.click('#first-link');
      assert(document.querySelector('[role="dialog"]'));
      assert.equal(h.requests.length, 0); assert.equal(h.tabs.length, 0);
      await h.fill(); await h.submit();
      assert.equal(h.tabs[0].destination, undefined);
      const sent = JSON.parse(h.requests[0].options.body);
      assert.equal(sent.sourcePage, path); assert.equal(sent.trackingCategory, 'dkv-stationaer');
      assert.equal(sent.targetUrl, url);
      await h.respond(0);
      assert.equal(h.tabs[0].destination, url);
      assert.equal(h.callbacks.opened, 1);
    } finally { await h.cleanup(); }
  }
});

test('ARAG-Angebot bleibt eine eigene Anfrage auch nach früherem Guide; kein externer Tab und Erfolg erst nach Ack', async () => {
  const url = 'https://healio.de/ambulant?angebot=arag-v100';
  for (const path of ['/ambulant', '/en/outpatient']) {
    const h = await harness('provider', { path, url });
    try {
      h.capture.markLeadCapturedThisSession();
      await h.click('#first-link');
      assert(document.querySelector('form'));
      assert.match(document.querySelector('[role="dialog"]').textContent, /V100-Angebot/);
      assert.equal(h.requests.length, 0); assert.equal(h.tabs.length, 0);
      await h.fill(); await h.submit();
      assert.equal(h.tabs.length, 0); assert.equal(h.callbacks.opened, 0);
      const sent = JSON.parse(h.requests[0].options.body);
      assert.equal(sent.trackingCategory, 'arag-v100'); assert.equal(sent.sourcePage, path);
      assert.equal(sent.targetUrl, url);
      assert(document.querySelector('form'));
      await h.respond(0, false, { error: 'delivery_failed' });
      assert(document.querySelector('form')); assert(document.querySelector('[role="alert"]'));
      await h.submit(); await h.respond(1);
      assert.equal(document.querySelector('form'), null);
      assert.match(document.querySelector('[role="status"]').textContent, /V100-Angebotsanfrage ist gespeichert/);
      assert.equal(document.querySelector('[role="dialog"] a[target="_blank"]'), null);
      assert.equal(h.tabs.length, 0); assert.equal(h.callbacks.opened, 0);
    } finally { await h.cleanup(); }
  }
});

test('gültiger Submit reserviert synchron einen leeren Tab und navigiert erst nach bestätigtem POST', async () => {
  const h = await harness();
  try {
    await h.fill(' Test ', ' test@example.test ');
    await h.submit();
    assert.deepEqual(h.order.map(([type]) => type), ['open', 'fetch']);
    assert.deepEqual(h.order[0], ['open', 'about:blank', '_blank']);
    assert.equal(h.tabs[0].destination, undefined);
    assert.equal(h.tabs[0].opener, null);
    assert.equal(h.tabs[0].document.querySelector('meta[name="referrer"]').content, 'no-referrer');
    assert.equal(h.requests[0].url, '/api/lead-capture');
    const sent = JSON.parse(h.requests[0].options.body);
    assert.equal(sent.firstName, 'Test'); assert.equal(sent.email, 'test@example.test');
    assert.equal(sent.sourcePage, '/zahn'); assert.equal(sent.targetUrl, targetUrl);
    assert.equal(sent.trackingCategory, 'bayerische');
    assert.deepEqual(Object.keys(sent).sort(), ['email', 'firstName', 'sourcePage', 'targetUrl', 'timestamp', 'trackingCategory']);
    assert.equal(h.capture.hasCapturedLeadThisSession(), false);
    await h.respond(0);
    assert.equal(h.tabs[0].destination, targetUrl);
    assert.equal(h.tabs[0].closed, false);
    assert.equal(h.callbacks.opened, 1); assert.equal(h.callbacks.closed, 1);
    assert.equal(document.querySelector('[role="dialog"]'), null);
    assert.equal(window.sessionStorage.getItem(h.capture.LEAD_CAPTURE_SESSION_KEY), 'captured');
    assert.deepEqual(Object.entries(window.sessionStorage), [[h.capture.LEAD_CAPTURE_SESSION_KEY, 'captured']]);
    assert.equal(window.localStorage.length, 0);
  } finally { await h.cleanup(); }
});

test('CMS-Anfrage zählt nach Bestätigung einmal mit Zustimmung, unabhängig vom blockierten Rechnerfenster', async () => {
  const h = await harness('modal', { popupBlocked: true, path: '/zahn?utm_campaign=privat&gclid=abcdefghijklmnop' });
  try {
    h.consent.saveConsentPreferences({ marketing: true });
    const conversions = () => (window.dataLayer || []).filter((entry) => entry[0] === 'event' && entry[1] === 'conversion');
    await h.fill(); await h.submit();
    assert.equal(conversions().length, 0, 'Absenden ohne CMS-Bestätigung ist kein Erfolg');
    await h.respond(0, false, { ok: false });
    assert.equal(conversions().length, 0, 'Fehler zählt nicht');
    await h.submit(); await h.respond(1);
    assert.equal(conversions().length, 1, 'Bestätigte Anfrage zählt auch bei blockiertem Rechnerfenster');
    assert.equal(h.callbacks.opened, 0);
    const params = conversions()[0][2];
    assert.match(params.send_to, /\/27UQCIu4iZIdEK_jvuVE$/);
    assert.deepEqual(Object.keys(params).sort(), ['page_location', 'page_referrer', 'page_title', 'send_to']);
    assert.equal(params.page_title, 'Healio');
    assert(!JSON.stringify(params).includes('test@example.test'));
    assert(!JSON.stringify(params).includes('utm_campaign'));
    h.setPopupBlocked(false);
    await h.click('a[target="_blank"]');
    assert.equal(h.callbacks.opened, 1);
    assert.equal(conversions().length, 1, 'Manuelles Nachöffnen erzeugt keine weitere Anfrage');
  } finally { await h.cleanup(); }
});

test('bestätigte CMS-Anfrage ohne Marketingzustimmung sendet keine Google-Conversion', async () => {
  const h = await harness();
  try {
    await h.fill(); await h.submit(); await h.respond(0);
    assert.equal(h.capture.hasCapturedLeadThisSession(), true);
    assert.equal((window.dataLayer || []).filter((entry) => entry[0] === 'event' && entry[1] === 'conversion').length, 0);
  } finally { await h.cleanup(); }
});

test('ungültige E-Mail und reiner Leerzeichenname öffnen keinen Tab und senden nichts', async () => {
  const h = await harness();
  try {
    await h.fill('   ', 'test@example.test'); await h.submit();
    assert.equal(document.activeElement.name, 'firstName');
    assert.match(document.querySelector('[role="alert"]').textContent, /Vornamen/);
    await h.fill('Test', 'test@example..test'); await h.submit();
    assert.equal(document.activeElement.name, 'email');
    assert.match(document.querySelector('[role="alert"]').textContent, /E-Mail-Adresse/);
    assert.equal(h.requests.length, 0); assert.equal(h.tabs.length, 0);
  } finally { await h.cleanup(); }
});

test('Fehler erhält Felder, schließt den reservierten Tab und Retry behält UUID und Zeitstempel', async () => {
  const h = await harness();
  try {
    await h.fill(); await h.submit();
    const first = h.requests[0];
    await h.respond(0, false, { error: 'delivery_failed' });
    assert.equal(h.tabs[0].closed, true);
    assert.equal(h.tabs[0].destination, undefined);
    assert.equal(document.querySelector('input[name="firstName"]').value, 'Test');
    assert.equal(document.querySelector('input[name="email"]').value, 'test@example.test');
    assert.equal(h.capture.hasCapturedLeadThisSession(), false); assert.equal(window.sessionStorage.length, 0);
    await h.act(() => new Promise((resolve) => nativeSetTimeout(resolve, 5)));
    await h.submit();
    assert.equal(h.requests.length, 2);
    assert.equal(h.requests[1].options.headers['X-Idempotency-Key'], first.options.headers['X-Idempotency-Key']);
    assert.equal(h.requests[1].options.body, first.options.body);
    await h.respond(1);
    assert.equal(h.tabs[1].destination, targetUrl);
  } finally { await h.cleanup(); }
});

test('geänderte Eingaben nach Fehler beginnen eine neue Idempotency-Anfrage', async () => {
  const h = await harness();
  try {
    await h.fill(); await h.submit(); await h.reject(0);
    const id = h.requests[0].options.headers['X-Idempotency-Key'];
    await h.setInput('firstName', 'Test geändert'); await h.submit();
    assert.notEqual(h.requests[1].options.headers['X-Idempotency-Key'], id);
    assert.equal(JSON.parse(h.requests[1].options.body).firstName, 'Test geändert');
    await h.respond(1, false, null);
  } finally { await h.cleanup(); }
});

test('HTTP-Erfolg ohne bestätigendes JSON und Netzwerkfehler setzen kein Sitzungsflag', async () => {
  for (const failure of ['unconfirmed', 'network']) {
    const h = await harness();
    try {
      await h.fill(); await h.submit();
      if (failure === 'unconfirmed') await h.respond(0, true, { ok: false }); else await h.reject(0);
      assert.equal(h.tabs[0].closed, true); assert.equal(h.capture.hasCapturedLeadThisSession(), false);
      assert.equal(window.sessionStorage.length, 0); assert.equal(h.callbacks.opened, 0);
      assert(document.querySelector('[role="alert"]'));
    } finally { await h.cleanup(); }
  }
});

test('Ladetext endet nach einer Sekunde, laufende Anfrage bleibt gesperrt und Timeout verliert keine Eingaben', async () => {
  const h = await harness();
  try {
    await h.fill(); await h.submit();
    assert.equal(document.querySelector('button[type="submit"]').textContent, 'Einen Moment...');
    await h.fireTimer(1000);
    assert.equal(document.querySelector('button[type="submit"]').textContent, 'Weiter zum Rechner & Unterlagen sichern ➔');
    assert.equal(document.querySelector('button[type="submit"]').disabled, true);
    assert.match(document.querySelector('[role="status"]').textContent, /noch übermittelt/);
    await h.fireTimer(12000);
    assert.equal(h.requests[0].options.signal.aborted, true);
    assert.equal(h.tabs[0].closed, true); assert.equal(h.tabs[0].destination, undefined);
    assert.equal(document.querySelector('input[name="email"]').value, 'test@example.test');
    assert.equal(document.querySelector('button[type="submit"]').disabled, false);
    assert.equal(h.capture.hasCapturedLeadThisSession(), false);
  } finally { await h.cleanup(); }
});

test('zwei Submit-Ereignisse in derselben Runde erzeugen nur einen POST', async () => {
  const h = await harness();
  try {
    await h.fill();
    await h.act(() => {
      const form = document.querySelector('form');
      form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    });
    assert.equal(h.requests.length, 1); assert.equal(h.tabs.length, 1);
    await h.respond(0);
  } finally { await h.cleanup(); }
});

test('Popupblockade zeigt nach erfolgreicher Erfassung einen sicheren manuellen Link', async () => {
  const h = await harness('modal', { popupBlocked: true });
  try {
    await h.fill(); await h.submit(); await h.respond(0);
    assert.equal(h.tabs.length, 0); assert.equal(h.callbacks.closed, 0);
    assert.equal(document.querySelector('form'), null);
    const manual = document.querySelector('[role="dialog"] a[target="_blank"]');
    assert.equal(manual.href, targetUrl); assert.match(manual.rel, /noopener/); assert.match(manual.rel, /noreferrer/);
    await h.act(() => manual.click());
    assert.equal(h.callbacks.opened, 0); assert.equal(h.callbacks.closed, 0);
    assert.match(document.querySelector('[role="alert"]').textContent, /erlaube neue Fenster/);
    h.setPopupBlocked(false);
    await h.act(() => manual.click());
    assert.equal(h.callbacks.opened, 1); assert.equal(h.callbacks.closed, 1);
    assert.equal(h.tabs[0].destination, targetUrl);
    assert.equal(window.sessionStorage.getItem(h.capture.LEAD_CAPTURE_SESSION_KEY), 'captured');
  } finally { await h.cleanup(); }
});

test('Provider fängt erste Links ab und öffnet nach Erfassung weitere ohne Formular oder POST', async () => {
  const h = await harness('provider');
  try {
    assert.equal(document.querySelector('[role="dialog"]'), null);
    await h.click('#first-link');
    assert(document.querySelector('[role="dialog"]')); assert.equal(h.order.length, 0);
    await h.fill(); await h.submit(); await h.respond(0);
    assert.equal(document.querySelector('[role="dialog"]'), null);
    await h.click('#next-link');
    assert.equal(h.requests.length, 1); assert.equal(h.tabs.length, 2);
    assert.equal(h.tabs[1].destination, targetUrl);
    assert.equal(document.querySelector('[role="dialog"]'), null);
    assert.equal(h.callbacks.opened, 2);
  } finally { await h.cleanup(); }
});

test('gesperrtes sessionStorage behält nur einen neutralen Sitzungsstatus im Arbeitsspeicher', async () => {
  const h = await harness('provider');
  try {
    Object.defineProperty(window, 'sessionStorage', { configurable: true, get() { throw new Error('synthetic blocked storage'); } });
    await h.click('#first-link'); await h.fill(); await h.submit(); await h.respond(0);
    assert.equal(h.capture.hasCapturedLeadThisSession(), true);
    await h.click('#next-link');
    assert.equal(h.requests.length, 1); assert.equal(h.tabs.length, 2);
    assert.equal(document.querySelector('[role="dialog"]'), null);
    assert.equal(window.localStorage.length, 0);
  } finally { await h.cleanup(); }
});

test('erneute Popupblockade nach Erfassung verlangt keine zweite Eingabe oder Lieferung', async () => {
  const h = await harness('provider', { popupBlocked: true });
  try {
    await h.click('#first-link'); await h.fill(); await h.submit(); await h.respond(0);
    let manual = document.querySelector('[role="dialog"] a[target="_blank"]');
    h.setPopupBlocked(false);
    await h.act(() => manual.click());
    h.setPopupBlocked(true);
    await h.click('#next-link');
    assert.equal(document.querySelector('form'), null);
    manual = document.querySelector('[role="dialog"] a[target="_blank"]');
    assert.equal(manual.href, targetUrl);
    assert.equal(h.requests.length, 1);
  } finally { await h.cleanup(); }
});

test('ständig gemountetes Modal ignoriert eine alte Erfolgsantwort nach targetUrl-Wechsel', async () => {
  const h = await harness('modal', { ignoreAbort: true });
  const nextUrl = 'https://www.diebayerische.de/diebayerische/online-berechnen/zahnzusatzversicherung-berechnen?um=MAK226487&m=002637';
  try {
    await h.fill(); await h.submit();
    await h.changeTarget(nextUrl);
    assert.equal(h.requests[0].options.signal.aborted, true);
    assert.equal(h.tabs[0].closed, true);
    await h.fill('Neue Anfrage', 'neue-anfrage@example.test'); await h.submit();
    assert.equal(h.requests.length, 2);
    assert.notEqual(h.requests[0].options.headers['X-Idempotency-Key'], h.requests[1].options.headers['X-Idempotency-Key']);
    await h.respond(0);
    assert.equal(h.capture.hasCapturedLeadThisSession(), false); assert.equal(window.sessionStorage.length, 0);
    assert.equal(document.querySelector('input[name="firstName"]').value, 'Neue Anfrage');
    assert.equal(document.querySelector('button[type="submit"]').disabled, true);
    assert.equal(h.tabs[1].closed, false); assert.equal(h.tabs[1].destination, undefined);
    assert.equal(h.callbacks.opened, 0); assert.equal(h.callbacks.closed, 0);
    await h.fireTimer(1000);
    assert.equal(document.querySelector('button[type="submit"]').disabled, true);
    await h.respond(1);
    assert.equal(h.tabs[1].destination, nextUrl);
    assert.equal(h.callbacks.opened, 1); assert.equal(h.callbacks.closed, 1);
  } finally { await h.cleanup(); }
});

test('Erfolgsantwort nach abgelaufenem Abort darf keine Sitzung oder Weiterleitung freigeben', async () => {
  const h = await harness('modal', { ignoreAbort: true });
  try {
    await h.fill(); await h.submit(); await h.fireTimer(12000);
    assert.equal(h.requests[0].options.signal.aborted, true);
    await h.respond(0);
    assert.equal(h.capture.hasCapturedLeadThisSession(), false); assert.equal(window.sessionStorage.length, 0);
    assert.equal(h.tabs[0].closed, true); assert.equal(h.tabs[0].destination, undefined);
    assert.equal(document.querySelector('input[name="email"]').value, 'test@example.test');
    assert.equal(h.callbacks.opened, 0); assert.equal(h.callbacks.closed, 0);
    assert(document.querySelector('[role="alert"]'));
  } finally { await h.cleanup(); }
});

test('unzulässiges Ziel oder nicht freigegebener Quellpfad lässt sich auch direkt im Modal nicht absenden', async () => {
  for (const options of [{ url: 'https://evil.example.test/' }, { path: '/unternehmen' }]) {
    const h = await harness('modal', options);
    try {
      await h.fill(); await h.submit();
      assert.equal(h.requests.length, 0); assert.equal(h.tabs.length, 0);
      assert.match(document.querySelector('[role="alert"]').textContent, /nicht verfügbar/);
    } finally { await h.cleanup(); }
  }
});

test('Provider sperrt weder KassenBoost-Vergleiche noch nicht beauftragte Routen', async () => {
  for (const path of ['/zahn', '/unternehmen']) {
    const h = await harness('provider', { path });
    try {
      const link = document.querySelector(path === '/zahn' ? '#non-application-link' : '#first-link');
      let preventedByComponent;
      link.addEventListener('click', (event) => { preventedByComponent = event.defaultPrevented; event.preventDefault(); });
      await h.act(() => link.click());
      assert.equal(preventedByComponent, false);
      assert.equal(document.querySelector('[role="dialog"]'), null); assert.equal(h.requests.length, 0);
    } finally { await h.cleanup(); }
  }
});

test('Radix setzt Anfangsfokus, Fokusfalle und Scrollsperre; X stellt Ausgangsfokus wieder her', async () => {
  const h = await harness('provider');
  try {
    await h.click('#first-link');
    assert.equal(document.activeElement.name, 'firstName');
    assert.equal(document.body.getAttribute('data-scroll-locked'), '1');
    const privacy = document.querySelector('[role="dialog"] a[href="/datenschutz"]');
    await h.act(() => {
      privacy.focus();
      privacy.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    });
    assert.equal(document.activeElement.getAttribute('aria-label'), 'Fenster schließen');
    await h.click('[aria-label="Fenster schließen"]');
    // Radix stellt den Fokus nach dem Abbau des FocusScope per Timer wieder her.
    await h.act(() => new Promise((resolve) => nativeSetTimeout(resolve, 1)));
    assert.equal(document.querySelector('[role="dialog"]'), null);
    assert.equal(document.body.getAttribute('data-scroll-locked'), null);
    assert.equal(document.activeElement.id, 'first-link');
    assert.equal(h.requests.length, 0);
  } finally { await h.cleanup(); }
});

test('Escape und Overlay schließen das Formular ohne Datentransfer', async () => {
  for (const dismissal of ['escape', 'overlay']) {
    const h = await harness('provider');
    try {
      await h.click('#first-link');
      await h.act(() => new Promise((resolve) => nativeSetTimeout(resolve, 1)));
      await h.act(() => {
        if (dismissal === 'escape') {
          document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
        } else {
          const overlay = document.querySelector('[data-state="open"]:not([role="dialog"])');
          const event = new window.MouseEvent('pointerdown', { bubbles: true, cancelable: true });
          Object.defineProperty(event, 'pointerType', { value: 'mouse' });
          overlay.dispatchEvent(event);
        }
      });
      assert.equal(document.querySelector('[role="dialog"]'), null, dismissal);
      assert.equal(document.body.getAttribute('data-scroll-locked'), null);
      assert.equal(h.requests.length, 0); assert.equal(h.tabs.length, 0);
    } finally { await h.cleanup(); }
  }
});

test('Schließen während POST bricht ab und schließt den leeren reservierten Tab', async () => {
  const h = await harness();
  try {
    await h.fill(); await h.submit(); await h.click('[aria-label="Fenster schließen"]');
    assert.equal(h.requests[0].options.signal.aborted, true);
    assert.equal(h.tabs[0].closed, true); assert.equal(h.tabs[0].destination, undefined);
    assert.equal(h.capture.hasCapturedLeadThisSession(), false); assert.equal(window.sessionStorage.length, 0);
  } finally { await h.cleanup(); }
});
