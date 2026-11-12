// Beispielbeitrag für den Einstieg auf /zahn (Befund 3, 12.11.2026). Ein Wert, keine Tabelle.
// Es ist derselbe Tarif, den der Einstieg nennt (UKV ZahnPRIVAT 100), damit Leistung und Preis
// nicht verwechselt werden.
// Quelle: Healio/Antragsstrecken/originale/levelnine/beitraege-ukv-zahn.json (Rechenabfrage der
// Level-Nine-Strecke der UKV). Eintrittsalter 30 (Beginnjahr minus Geburtsjahr), Unisex, EUR je
// Monat ohne Risikozuschläge. Erhoben am 12.11.2026 für den angenommenen Versicherungsbeginn
// 01.12.2026 und 01.01.2027 (identischer Beitrag).
export const ZAHN_BEISPIELPREIS = Object.freeze({
  insurer: 'UKV',
  tariff: 'ZahnPRIVAT 100',
  age: 30,
  euroPerMonth: 30.05,
  source: 'levelnine/beitraege-ukv-zahn.json',
  collectedOn: '2026-11-12',
  assumedStart: Object.freeze(['2026-12-01', '2027-01-01']),
});

export const zahnBeispielpreisText = (lang) => {
  const { tariff, age, euroPerMonth } = ZAHN_BEISPIELPREIS;
  if (lang === 'en') return `${tariff} at age ${age}: EUR ${euroPerMonth.toFixed(2)} a month.`;
  return `${tariff} mit ${age} Jahren: ${euroPerMonth.toFixed(2).replace('.', ',')} EUR im Monat.`;
};
