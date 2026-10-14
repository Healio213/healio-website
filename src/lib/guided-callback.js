import { PHONE_APPOINTMENT_BOOKING } from './appointmentBooking.js';

// Frank selected the existing website calendar for the guided consultation.
// The preview remains isolated from real appointment booking.
export const GUIDED_CALLBACK_PREVIEW = import.meta.env?.VITE_GUIDED_CALLBACK_PREVIEW === 'true';
export const GUIDED_CALLBACK_ENABLED = GUIDED_CALLBACK_PREVIEW || Boolean(PHONE_APPOINTMENT_BOOKING);
export const GUIDED_CALLBACK_EVENT = 'healio-guided-callback';

export const GUIDED_PRODUCTS = {
  any: { de: 'Noch offen', en: 'Not sure yet' },
  ambulant: { de: 'Ambulant', en: 'Outpatient' },
  zahn: { de: 'Zahn', en: 'Dental' },
  stationaer: { de: 'Klinik', en: 'Hospital' },
};

const selections = new Map();
export const isGuidedCallbackRoute = (pathname = '') => /^\/(?:ambulant|heilpraktiker-zusatzversicherung|zahn|stationaer|en(?:\/outpatient|\/dental|\/inpatient)?)?\/?$/.test(pathname);
export const getGuidedProduct = (pathname = '') => {
  if (/^\/(ambulant|heilpraktiker-zusatzversicherung|en\/outpatient)\/?$/.test(pathname)) return 'ambulant';
  if (/^\/(zahn|en\/dental)\/?$/.test(pathname)) return 'zahn';
  if (/^\/(stationaer|en\/inpatient)\/?$/.test(pathname)) return 'stationaer';
  return 'any';
};

export function setGuidedSelection(product, tariff) {
  if (GUIDED_CALLBACK_ENABLED && GUIDED_PRODUCTS[product]) {
    selections.set(product, typeof tariff === 'string' ? tariff.slice(0, 140) : '');
  }
}

export function openGuidedCallback({ product = 'any', tariff } = {}) {
  if (!GUIDED_CALLBACK_ENABLED || typeof window === 'undefined') return;
  const topic = GUIDED_PRODUCTS[product] ? product : 'any';
  window.dispatchEvent(new CustomEvent(GUIDED_CALLBACK_EVENT, {
    detail: { product: topic, tariff: tariff ?? selections.get(topic) ?? '' },
  }));
}

export function validateCallbackRequest(values, lang = 'de') {
  const de = lang === 'de';
  if (typeof values.firstName !== 'string' || !values.firstName.trim() || values.firstName.length > 80 || /[\r\n\u0000]/.test(values.firstName)) return { field: 'firstName', message: de ? 'Bitte gib deinen Vornamen ein.' : 'Please enter your first name.' };
  if (typeof values.lastName !== 'string' || !values.lastName.trim() || values.lastName.length > 100 || /[\r\n\u0000]/.test(values.lastName)) return { field: 'lastName', message: de ? 'Bitte gib deinen Nachnamen ein.' : 'Please enter your last name.' };
  if (typeof values.phone !== 'string') return { field: 'phone', message: de ? 'Bitte gib deine Telefonnummer ein.' : 'Please enter your phone number.' };
  const digits = values.phone.replace(/\D/g, '');
  if (values.phone.length > 35 || /[\r\n\u0000]/.test(values.phone) || !/^[+\d\s()./-]+$/.test(values.phone.trim()) || digits.length < 7 || digits.length > 15) {
    return { field: 'phone', message: de ? 'Bitte prüfe deine Telefonnummer, einschließlich Vorwahl.' : 'Please check your phone number, including the area code.' };
  }
  if (typeof values.email !== 'string' || values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return { field: 'email', message: de ? 'Bitte gib eine vollständige E-Mail-Adresse ein.' : 'Please enter a complete email address.' };
  if (values.consent !== true) return { field: 'consent', message: de ? 'Bitte bestätige, dass du den Rückruf wünschst.' : 'Please confirm that you would like a callback.' };
  return null;
}
