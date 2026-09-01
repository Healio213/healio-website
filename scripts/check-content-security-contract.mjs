import assert from 'node:assert/strict';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import {
  sanitizeRichHtml,
  serializeJsonLd,
} from '../src/lib/contentSecurity.js';
import { sanitizeStaticBlogHtml } from './lib/blogContentSecurity.mjs';

const xssPayload = `
  <article data-safe-wrapper>
    <p onclick="window.__xss_click = true">Erlaubter <strong>Ratgebertext</strong></p>
    <a data-unsafe-link href="javascript:window.__xss_link = true">Unsicherer Link</a>
    <img data-unsafe-image src="x" onerror="window.__xss_error = true">
    <script>window.__xss_script = true</script>
    <svg onload="window.__xss_svg = true"><circle /></svg>
  </article>
`;

const assertSanitizedRichHtml = (html, label) => {
  assert.match(html, /Ratgebertext/, `${label}: sicherer Text muss erhalten bleiben.`);
  assert.match(html, /<strong>Ratgebertext<\/strong>/, `${label}: sichere Formatierung muss erhalten bleiben.`);
  assert.doesNotMatch(html, /<script\b/i, `${label}: Script-Tags müssen entfernt werden.`);
  assert.doesNotMatch(html, /\son[a-z]+\s*=/i, `${label}: Eventhandler müssen entfernt werden.`);
  assert.doesNotMatch(html, /javascript\s*:/i, `${label}: javascript:-URLs müssen entfernt werden.`);
  assert.doesNotMatch(html, /<svg\b/i, `${label}: SVG-Payloads dürfen nicht im Artikel verbleiben.`);
};

const window = new JSDOM('').window;
const browserEquivalentPurifier = createDOMPurify(window);

assertSanitizedRichHtml(
  sanitizeRichHtml(xssPayload, browserEquivalentPurifier),
  'Gemeinsamer Sanitizer',
);
assertSanitizedRichHtml(
  sanitizeStaticBlogHtml(xssPayload),
  'Statischer Generator',
);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '</script><script>globalThis.__jsonLdXss = true</script>',
  description: `Zeilentrenner:\u2028 Absatztrenner:\u2029`,
};
const serializedSchema = serializeJsonLd(schema);

assert.doesNotMatch(serializedSchema, /</, 'JSON-LD darf kein literales < enthalten.');
assert.doesNotMatch(serializedSchema, /\u2028/u, 'JSON-LD darf U+2028 nicht literal enthalten.');
assert.doesNotMatch(serializedSchema, /\u2029/u, 'JSON-LD darf U+2029 nicht literal enthalten.');
assert.deepEqual(
  JSON.parse(serializedSchema),
  schema,
  'Die sichere JSON-LD-Serialisierung muss vollständig roundtripfähig bleiben.',
);

window.close();

console.log('Content security contract checks passed.');
