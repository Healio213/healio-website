import { trackEvent } from '@/lib/analytics';
import { trackGoogleAdsAntrag } from '@/lib/google-ads';

// Persönlicher Abschluss-Link für die Krankenhauszusatzversicherung der
// Bayerischen. Die Vermittlerzuordnung entspricht dem bereits freigegebenen
// Zahn-Link. Verifiziert am 05.08.2026: Die Seite lädt den Bayculator `khzv`
// und damit ausschließlich die stationären Tarife Prestige, Komfort und Smart.
export const BAYERISCHE_STATIONAER_URL = 'https://www.diebayerische.de/online-berechnen/krankenhauszusatzversicherung-berechnen/?m=002637&um=MAK226487';

export const trackStationaerBayerischeClick = (label) => {
  // Google Ads: Erfolg „Antrag geöffnet“, ohne Argumente. Versicherer und
  // Platzierung erfährt Google nie; der Aufruf filtert selbst auf die
  // beworbenen Produktseiten und die gesperrten Routen.
  trackGoogleAdsAntrag();

  return trackEvent('tariff_calculator_click', {
    component: 'stationary_insurer',
    destination: 'bayerische',
    placement: label,
  });
};
