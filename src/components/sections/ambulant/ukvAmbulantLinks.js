import { trackGoogleAdsAntrag } from '@/lib/google-ads';
import { UKV_AMBULANT_URL } from '@/components/sections/dental/dentalLinks';

// Online-Abschlusslink der UKV für den Vorsorge-Baustein (VorsorgePRIVAT) auf
// /ambulant und /en/outpatient. Er entsteht in dentalLinks.js aus derselben
// Rohadresse wie der Zahn-Link, nur mit tarifftypes=Ambulant, und läuft durch
// dieselbe requireSafeProviderUrl-Prüfung. Keine Seitenparameter,
// Referrer-Codes oder Eingaben anhängen.
export { UKV_AMBULANT_URL };

// Nur ein vollständiger https-Link ohne Zugangsdaten, Port oder Anker zählt.
// Alles andere gilt als „kein Link“, dann bleibt der Knopf beim Kontaktweg.
export const sanitizeUkvAmbulantUrl = (rawUrl) => {
  if (typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed.length > 8_000) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'https:') return null;
    if (url.username || url.password || url.port || url.hash) return null;
    return url.toString();
  } catch {
    return null;
  }
};

export const getUkvAmbulantUrl = () => sanitizeUkvAmbulantUrl(UKV_AMBULANT_URL);

// Google Ads: Erfolg „Antrag geöffnet“, ohne Argumente und ohne Daten.
// Der Aufruf filtert selbst auf die beworbenen Produktseiten und die
// gesperrten Routen. Antworten oder Eingaben werden nie gemessen.
export const trackUkvAmbulantAntrag = () => trackGoogleAdsAntrag();
