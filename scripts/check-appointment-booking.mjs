import assert from 'node:assert/strict';
import test from 'node:test';
import { pathToFileURL } from 'node:url';
import {
  clearConsentDecision,
  getDefaultConsentState,
  hasConsent,
  parseConsentState,
  saveConsentPreferences,
  updateConsentPurpose,
} from '../src/lib/consent.js';

test('Google booking needs its own fresh approval; legacy Calendly approval is not transferred', () => {
  clearConsentDecision();
  const legacy = parseConsentState({
    version: 2,
    decided: true,
    preferences: { analytics: true, calendly: true, maps: false, openai: false },
    source: 'settings',
    updatedAt: '2026-09-05T12:00:00Z',
  });
  assert.equal(hasConsent('google_calendar', legacy), false);
  assert.equal(hasConsent('analytics', legacy), true);
  assert.equal(hasConsent('google_calendar', getDefaultConsentState()), false);
  saveConsentPreferences(legacy.preferences);
  assert.equal(hasConsent('google_calendar', updateConsentPurpose('google_calendar', true)), true);
  assert.equal(hasConsent('google_calendar', updateConsentPurpose('google_calendar', false)), false);
  clearConsentDecision();
});

test('Only the verified Healio Google schedule may become an embed, without arbitrary parameters', async () => {
  let config;
  await assert.doesNotReject(async () => {
    config = await import(pathToFileURL(`${process.cwd()}/src/lib/appointmentBooking.js`));
  }, 'The central verified booking configuration must be available to every booking entry.');
  const safe = config.getSafeAppointmentEmbedUrl(config.APPOINTMENT_BOOKING.embedUrl);
  assert.equal(new URL(safe).origin, 'https://calendar.google.com');
  assert.equal(new URL(safe).pathname, '/calendar/appointments/schedules/AcZssZ1Xomawz_P3MQ6F0mitt7Oj6eF1Px6h2TSBPuO2EvSH96yd2_ePTLHCUUwvCkKh8mNQDl0BvSdL');
  for (const candidate of [
    'https://calendar.google.com.evil.invalid/calendar/appointments/schedules/other',
    'https://calendar.google.com/calendar/appointments/schedules/other',
    config.APPOINTMENT_BOOKING.embedUrl.replace('https:', 'http:'),
    config.APPOINTMENT_BOOKING.embedUrl.replace('https://', 'https://attacker@'),
    `${config.APPOINTMENT_BOOKING.embedUrl}#untrusted`,
    `${config.APPOINTMENT_BOOKING.embedUrl}${config.APPOINTMENT_BOOKING.embedUrl.includes('?') ? '&' : '?'}email=untrusted`,
    'javascript:alert(1)',
  ]) assert.equal(config.getSafeAppointmentEmbedUrl(candidate), null);
});
