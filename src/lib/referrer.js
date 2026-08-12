const STORAGE_KEY = 'healio_ref';
const REFERRER_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

export function sanitizeReferrer(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return REFERRER_PATTERN.test(trimmed) ? trimmed : null;
}

export function readStoredReferrer() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const sanitized = sanitizeReferrer(stored);
    if (stored && !sanitized) sessionStorage.removeItem(STORAGE_KEY);
    return sanitized;
  } catch {
    return null;
  }
}

export function storeReferrer(value) {
  const sanitized = sanitizeReferrer(value);
  if (!sanitized) return null;

  try {
    sessionStorage.setItem(STORAGE_KEY, sanitized);
  } catch {
    // sessionStorage ist nicht in jedem Browser-Kontext verfügbar.
  }

  return sanitized;
}
