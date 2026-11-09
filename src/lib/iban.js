// IBAN für die Prüfseite /antrag/pruefen: nur deutsche IBAN (22 Zeichen),
// Prüfziffer nach ISO 13616 (mod 97). Reine Logik ohne Speicher, die IBAN
// bleibt nur im Zustand der Seite und geht einmal an die Antrags-API.

export const ibanBereinigt = (text) => String(text ?? '').replace(/[\s-]/g, '').toUpperCase();

// "DE89 3704 0044 0532 0130 00"
export const ibanInGruppen = (text) => ibanBereinigt(text).replace(/(.{4})/g, '$1 ').trim();

function mod97(ziffern) {
  let rest = 0;
  for (let stelle = 0; stelle < ziffern.length; stelle += 7) {
    rest = Number(`${rest}${ziffern.slice(stelle, stelle + 7)}`) % 97;
  }
  return rest;
}

export function istDeutscheIban(text) {
  const iban = ibanBereinigt(text);
  if (!/^DE\d{20}$/.test(iban)) return false;
  const umgestellt = `${iban.slice(4)}${iban.slice(0, 4)}`;
  const ziffern = umgestellt.replace(/[A-Z]/g, (buchstabe) => String(buchstabe.charCodeAt(0) - 55));
  return mod97(ziffern) === 1;
}

// Freundlicher Hinweis, was an der Eingabe nicht passt (null: alles gut).
export function ibanFehler(text) {
  const iban = ibanBereinigt(text);
  if (iban === '') return 'Bitte gib deine IBAN ein.';
  if (!iban.startsWith('DE')) return 'Bitte gib eine deutsche IBAN ein, sie beginnt mit DE.';
  if (iban.length !== 22) return `Eine deutsche IBAN hat 22 Zeichen, hier sind es ${iban.length}.`;
  if (!istDeutscheIban(iban)) return 'Da hat sich wohl ein Tippfehler eingeschlichen. Prüf die IBAN bitte noch einmal.';
  return null;
}

// "…4321"
export const ibanEnde = (text) => {
  const iban = ibanBereinigt(text);
  return iban.length >= 4 ? `…${iban.slice(-4)}` : '';
};
