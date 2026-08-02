// Persönliche Abschluss-Links (Vermittler-Zuordnung über MAK-Nummer in der URL).
// UKV-URL wie von der UKV geliefert, nur tarifftypes bewusst auf "Zahn" gefiltert
// (verifiziert 15.07.2026: Strecke zeigt dann nur ZahnPRIVAT 75/90/100, Zuordnung
// über agentId2=226487 bleibt unverändert). URL-Parameter niemals manuell ändern.
export const BAYERISCHE_URL = 'https://www.diebayerische.de/diebayerische/online-berechnen/zahnzusatzversicherung-berechnen?m=002637&um=MAK226487';
export const UKV_URL = 'https://insurances-online.levelnine.biz/?mandant=vmk&tarifftypes=Zahn&agentId1=180188803&agentId2=226487&insurers=37&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJVS1YiLCJsYXN0TmFtZSI6IlVuaW9uIEtyYW5rZW52ZXJzaWNoZXJ1bmcgQUciLCJjb21wYW55IjoiIiwic3RyZWV0IjoiUGV0ZXItWmltbWVyLVN0ci4gMiIsInppcGNvZGUiOiI2NjEyMyIsImNpdHkiOiJTYWFyYnL8Y2tlbiIsIm1vYmlsZSI6IiIsImVtYWlsIjoia3JhbmtlbkBmb25kc2ZpbmFuei5kZSJ9&remarks=IiI=&defaultContact=false';

export const trackZahnEvent = (action, label) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, {
    event_category: 'Zahnzusatz',
    event_label: label,
    page_location: window.location.href,
  });
};
