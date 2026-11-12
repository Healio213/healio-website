// Beispielbeitrag für den Einstieg auf /zahn (Befund 3, 12.11.2026). Ein Wert, keine Tabelle.
// Quelle: Healio/Antragsstrecken/originale/bayerische-zahn/beitraege-bayerische-zahn.json
// (Rechenabfrage der Online-Strecke der Bayerischen, Vermittlernummer 032834).
// Tarif Smart, Eintrittsalter 30 (Beginnjahr minus Geburtsjahr), Stadt und Land gleich,
// monatliche Zahlweise, ohne Baustein ZAHN Sofort. Erhoben am 12.11.2026.
export const ZAHN_BEISPIELPREIS = Object.freeze({
  insurer: 'die Bayerische',
  tariff: 'Smart',
  age: 30,
  euroPerMonth: 10.9,
  source: 'bayerische-zahn/beitraege-bayerische-zahn.json',
  collectedOn: '2026-11-12',
});

export const zahnBeispielpreisText = (lang) => {
  const { tariff, age, euroPerMonth } = ZAHN_BEISPIELPREIS;
  if (lang === 'en') {
    return `Dental cover from EUR ${euroPerMonth.toFixed(2)} a month, ${tariff} plan from die Bayerische, at age ${age}.`;
  }
  return `Zahnschutz ab ${euroPerMonth.toFixed(2).replace('.', ',')} EUR im Monat, Tarif ${tariff} der Bayerischen, mit ${age} Jahren.`;
};
