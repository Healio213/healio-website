// Persönlicher Abschluss-Link für die Krankenhauszusatzversicherung der
// Bayerischen. Die Vermittlerzuordnung entspricht dem bereits freigegebenen
// Zahn-Link. Verifiziert am 05.08.2026: Die Seite lädt den Bayculator `khzv`
// und damit ausschließlich die stationären Tarife Prestige, Komfort und Smart.
export const BAYERISCHE_STATIONAER_URL = 'https://www.diebayerische.de/online-berechnen/krankenhauszusatzversicherung-berechnen/?m=002637&um=MAK226487';

export const trackStationaerBayerischeClick = (label) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'tarif_berechnen_click', {
    event_category: 'Krankenhauszusatz',
    event_label: label,
    insurer: 'die Bayerische',
    page_location: window.location.href,
  });
};
