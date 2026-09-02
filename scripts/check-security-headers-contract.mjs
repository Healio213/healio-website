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
const cspDirectives = new Map(csp
  .split(';')
  .map((directive) => directive.trim())
  .filter(Boolean)
  .map((directive) => {
    const [name, ...sources] = directive.split(/\s+/);
    return [name, new Set(sources)];
  }));
for (const directive of [
  "default-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://unpkg.com',
  'https://cdn.jsdelivr.net',
  'https://storage.googleapis.com',
  'https://calendly.com',
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://app.healio.de',
  'https://voice-pilot.healio.de',
  'https://*.supabase.co',
  'wss://*.supabase.co',
  'https://api.emailjs.com',
  'https://horizons-cdn.hostinger.com',
  'https://www.google.com',
  'https://*.vercel-insights.com',
]) {
  expect(csp.includes(directive), `CSP Report-Only muss ${directive} erlauben.`);
}

expect(
  cspDirectives.get('script-src')?.has('https://cdn.jsdelivr.net'),
  'Das Nita-AudioWorklet von cdn.jsdelivr.net muss ausschließlich als Script-Quelle freigegeben sein.',
);
expect(
  cspDirectives.get('img-src')?.has('https://storage.googleapis.com'),
  'Das Nita-Texturbild aus storage.googleapis.com muss als Bildquelle freigegeben sein.',
);
expect(
  !cspDirectives.get('connect-src')?.has('https://storage.googleapis.com')
    && !cspDirectives.get('media-src')?.has('https://storage.googleapis.com'),
  'storage.googleapis.com darf nicht ohne belegten Bedarf für Verbindungen oder Medien freigegeben sein.',
);
expect(
  !csp.includes('m1.openfpcdn.io'),
  'Unbelegtes Monitoring von m1.openfpcdn.io darf nicht vorsorglich freigeschaltet werden.',
);
expect(
  !csp.includes('elevenlabs.io'),
  'Nach dem OpenAI-Cutover darf ElevenLabs nicht mehr als Laufzeitquelle freigeschaltet sein.',
);

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
