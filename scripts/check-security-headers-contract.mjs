import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const failures = [];

const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const globalRule = config.headers?.find((rule) => rule.source === '/(.*)');
const globalHeaders = new Map(
  (globalRule?.headers || []).map(({ key, value }) => [key.toLowerCase(), value]),
);

const requiredHeaders = new Map([
  ['x-frame-options', 'DENY'],
  ['x-content-type-options', 'nosniff'],
  ['strict-transport-security', 'max-age=63072000; includeSubDomains'],
  ['referrer-policy', 'strict-origin-when-cross-origin'],
  ['permissions-policy', 'camera=(), microphone=(self), geolocation=()'],
]);

for (const [key, expectedValue] of requiredHeaders) {
  expect(
    globalHeaders.get(key) === expectedValue,
    `${key} muss global exakt als "${expectedValue}" ausgeliefert werden.`,
  );
}

const csp = globalHeaders.get('content-security-policy-report-only') || '';
for (const directive of [
  "default-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://unpkg.com',
  'https://calendly.com',
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://app.healio.de',
  'https://*.supabase.co',
  'wss://*.supabase.co',
  'https://api.emailjs.com',
  'https://horizons-cdn.hostinger.com',
  'https://www.google.com',
  'https://*.elevenlabs.io',
  'wss://*.elevenlabs.io',
  'https://*.vercel-insights.com',
]) {
  expect(csp.includes(directive), `CSP Report-Only muss ${directive} erlauben.`);
}

for (const source of ['/hero-bg(-mobile)?\\.(webp|jpg)', '/assets/(.*)']) {
  const cacheRule = config.headers?.find((rule) => rule.source === source);
  const cacheHeader = cacheRule?.headers?.find(({ key }) => key.toLowerCase() === 'cache-control');
  expect(
    cacheHeader?.value === 'public, max-age=31536000, immutable',
    `Der bestehende Immutable-Cacheheader für ${source} muss erhalten bleiben.`,
  );
}

if (failures.length > 0) {
  console.error(`Security-Header-Contract fehlgeschlagen (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Security-Header-Contract erfüllt: globale Schutzheader und externe Laufzeitquellen sind deklariert.');
