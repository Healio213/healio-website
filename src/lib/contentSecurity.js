export const BLOG_HTML_SANITIZER_CONFIG = Object.freeze({
  USE_PROFILES: { html: true },
  FORBID_TAGS: [
    'script',
    'style',
    'iframe',
    'object',
    'embed',
    'form',
    'input',
    'button',
    'textarea',
    'select',
    'option',
    'template',
  ],
});

export const sanitizeRichHtml = (html, purifier) => {
  if (!html) return '';
  if (!purifier || typeof purifier.sanitize !== 'function') {
    throw new TypeError('Ein DOMPurify-kompatibler Sanitizer ist erforderlich.');
  }

  return purifier.sanitize(String(html), BLOG_HTML_SANITIZER_CONFIG);
};

export const serializeJsonLd = (value) => {
  const serialized = JSON.stringify(value);
  if (typeof serialized !== 'string') {
    throw new TypeError('JSON-LD muss als JSON serialisierbar sein.');
  }

  return serialized
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
};
