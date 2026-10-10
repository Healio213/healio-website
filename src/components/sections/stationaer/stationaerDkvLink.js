import { trackEvent } from '@/lib/analytics';
import { trackGoogleAdsRechnerStart } from '@/lib/google-ads';

// Persönlicher Fonds-Finanz-Rechner für DKV UZ1, am 10.10.2026 geprüft.
// Keine Eingaben, Gesundheitsantworten oder Herkunftskennungen ergänzen:
// der Rechner unterstützt hier nur die bestätigte Vermittlerzuordnung.
export const DKV_UZ1_URL = 'https://www.beitragsrechner.dkv.com/tarifrechner/600085/UZ1?leitmerk=MAK226487';

export const trackStationaerDkvClick = () => {
  // Reiner Rechnerklick, kein Antragseingang und kein Vertragsabschluss.
  // Google erhält über die bestehende Funktion keine Produktauswahl.
  trackGoogleAdsRechnerStart();
  return trackEvent('tariff_calculator_click', {
    component: 'stationary_insurer',
    destination: 'dkv',
    placement: 'stationaer-room-only',
  });
};
