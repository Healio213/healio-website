import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { sanitizeRichHtml } from '../../src/lib/contentSecurity.js';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
const purifier = createDOMPurify(dom.window);

export const sanitizeStaticBlogHtml = (html) => sanitizeRichHtml(html, purifier);
