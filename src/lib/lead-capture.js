import { ARAG_OFFER_URL, isPersonalOfferUrl, isValidLeadEmail, sanitizeLeadSourcePage, validateApplicationUrl } from '../../shared/lead-capture.js';

export const LEAD_CAPTURE_SESSION_KEY = 'healio:lead-capture:v1';
let capturedInMemory = false;

export function hasCapturedLeadThisSession() {
  try {
    return capturedInMemory || window.sessionStorage.getItem(LEAD_CAPTURE_SESSION_KEY) === 'captured';
  } catch {
    return capturedInMemory;
  }
}

export function markLeadCapturedThisSession() {
  capturedInMemory = true;
  try { window.sessionStorage.setItem(LEAD_CAPTURE_SESSION_KEY, 'captured'); } catch { /* Private browsing keeps the in-memory flag. */ }
}

export function shouldCaptureApplicationLink(href, pathname) {
  return Boolean(sanitizeLeadSourcePage(pathname) && validateApplicationUrl(href));
}

export function reserveApplicationWindow() {
  try {
    const tab = window.open('about:blank', '_blank');
    if (tab) {
      tab.opener = null;
      const meta = tab.document.createElement('meta');
      meta.name = 'referrer';
      meta.content = 'no-referrer';
      tab.document.head.appendChild(meta);
    }
    return tab;
  } catch { return null; }
}

export function navigateApplicationWindow(tab, targetUrl) {
  const validated = validateApplicationUrl(targetUrl);
  if (!validated || !tab || tab.closed) return false;
  try { tab.location.replace(validated); return true; } catch { return false; }
}

export function openApplicationWindow(targetUrl) {
  if (!validateApplicationUrl(targetUrl)) return false;
  const tab = reserveApplicationWindow();
  const opened = navigateApplicationWindow(tab, targetUrl);
  if (!opened && tab && !tab.closed) tab.close();
  return opened;
}

export function createLeadRequestId() {
  return window.crypto.randomUUID();
}

export { ARAG_OFFER_URL, isPersonalOfferUrl, isValidLeadEmail, sanitizeLeadSourcePage, validateApplicationUrl };
