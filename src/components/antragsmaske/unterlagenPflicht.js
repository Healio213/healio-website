// Pflichtunterlagen im Schritt „Unterlagen“ (reine Regel, ohne Abhängigkeiten).
// Erwartet die Definition Unterlagen (erwartet nicht leer), geht es nur weiter,
// wenn der Dienst mindestens so viele Pflichtunterlagen geliefert hat UND jede
// davon heruntergeladen ist. Leere oder zu kurze Liste und ein fehlgeschlagener
// Abruf (liste = null) sperren „Weiter“.
export const UNTERLAGEN_HINWEIS = 'Die Unterlagen lassen sich gerade nicht laden. Versuch es gleich noch einmal oder mach den Antrag zusammen mit uns am Telefon.';

export const unterlagenSchluessel = (unterlage) => `dienst:${unterlage.id ?? unterlage.name}`;

export const unterlagenUnvollstaendig = (erwartet, liste) => !liste || liste.length < (erwartet?.length || 0);

export function fehlerUnterlagen({ erwartet = [], liste, geoeffnet = {}, text = '' }) {
  if (!liste) return [{ key: 'unterlagenDienst', text: '' }];
  if (unterlagenUnvollstaendig(erwartet, liste)) return [{ key: 'unterlagenDienst', text: '' }];
  return liste
    .filter((unterlage) => !geoeffnet?.[unterlagenSchluessel(unterlage)])
    .map((unterlage) => ({ key: `download-${unterlage.id ?? unterlage.name}`, text }));
}
