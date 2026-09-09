import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { buildSync } from 'esbuild';
import { JSDOM } from 'jsdom';

// Bundle real components once so React, Router and consent state share one instance.
// JSDOM does not load remote resources: this test never contacts a calendar.
const bundle = buildSync({
  stdin: {
    contents: `
      import React, { act } from 'react';
      import { createRoot } from 'react-dom/client';
      import { MemoryRouter } from 'react-router-dom';
      import AppointmentBooking from './src/components/CalendlyEmbed.jsx';
      import * as consent from './src/lib/consent.js';
      export { act, consent };
      export function mount(container, path) {
        const root = createRoot(container);
        root.render(<MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><AppointmentBooking
          url="https://calendly.com/healio-info/30min" placement="appointment_test" />
        </MemoryRouter>);
        return root;
      }
    `,
    resolveDir: process.cwd(),
    loader: 'jsx',
  },
  alias: { '@': `${process.cwd()}/src` },
  external: ['react', 'react-dom/*', 'react-router-dom'],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  write: false,
});
const module = { exports: {} };
new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
const { act, consent, mount } = module.exports;
const dom = new JSDOM('<div id="root"></div>', { url: 'https://healio.de/partner' });
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  CustomEvent: dom.window.CustomEvent,
  IS_REACT_ACT_ENVIRONMENT: true,
});

try {
  for (const [path, loadLabel] of [['/partner', 'Google Kalender laden'], ['/en/partner', 'Load Google Calendar']]) {
    consent.clearConsentDecision();
    window.localStorage.setItem('healio:consent:v2', JSON.stringify({
      version: 2, decided: true, preferences: { analytics: true, calendly: true },
      source: 'settings', updatedAt: '2026-09-05T12:00:00Z',
    }));
    let root;
    await act(() => { root = mount(document.getElementById('root'), path); });
    assert.equal(Boolean(document.querySelector('iframe')), false, 'Old Calendly approval must never load the new Google booking provider.');
    const loadButton = [...document.querySelectorAll('button')].find((button) => button.textContent === loadLabel);
    assert(loadButton, 'The new provider must be clearly named in a fresh approval button.');
    const external = document.querySelector('a');
    assert.equal(new URL(external.href).origin, 'https://calendar.google.com');
    assert.match(external.rel, /noopener/);
    assert.match(external.rel, /noreferrer/);
    external.addEventListener('click', (event) => event.preventDefault());
    await act(() => external.click());
    await act(() => loadButton.click());
    const frame = document.querySelector('iframe');
    assert(frame, 'Fresh Google approval must mount the real booking iframe.');
    assert.equal(new URL(frame.src).origin, 'https://calendar.google.com');
    assert.match(frame.title, /Kalender|calendar/i);
    assert.equal(frame.getAttribute('referrerpolicy'), 'no-referrer');
    const loadedLinks = [...document.querySelectorAll('a')];
    assert.equal(loadedLinks.length, 1, 'A loaded embed needs exactly one external fallback for blocked third-party content.');
    assert.equal(loadedLinks[0].href, external.href);
    assert.match(loadedLinks[0].rel, /noopener/);
    assert.match(loadedLinks[0].rel, /noreferrer/);
    window.dispatchEvent(new window.MessageEvent('message', {
      origin: 'https://calendly.com', data: { event: 'calendly.event_scheduled' },
    }));
    window.dispatchEvent(new window.Event('load'));
    assert.equal((window.dataLayer || []).some((args) => args[1] === 'appointment_booked'), false,
      'A booking-page click, iframe load or legacy Calendly message is not a confirmed appointment.');
    await act(() => consent.updateConsentPurpose('google_calendar', false));
    assert.equal(Boolean(document.querySelector('iframe')), false, 'Revoking Google consent must remove the iframe immediately.');
    assert.equal(document.querySelectorAll('a').length, 1, 'Revocation must restore one external fallback, not duplicate links.');
    await act(() => root.unmount());
  }
  console.log('Appointment render verified in DE/EN: old consent rejected, fresh approval, safe external link, revocation, no fake booking.');
} finally {
  dom.window.close();
}
