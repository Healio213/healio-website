// Persönlicher Abschluss-Link für die Krankenhauszusatzversicherung der
// Bayerischen. Die Vermittlerzuordnung entspricht dem bereits freigegebenen
// Zahn-Link. Verifiziert am 05.08.2026: Die Seite lädt den Bayculator `khzv`
// und damit ausschließlich die stationären Tarife Prestige, Komfort und Smart.
export const BAYERISCHE_STATIONAER_URL = 'https://www.diebayerische.de/online-berechnen/krankenhauszusatzversicherung-berechnen/?m=002637&um=MAK226487';

export const trackStationaerBayerischeClick = (label) => {
  return trackEvent('tariff_calculator_click', {
    component: 'stationary_insurer',
    destination: 'bayerische',
    placement: label,
  });
};
import { trackEvent } from '@/lib/analytics';
