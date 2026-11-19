// Zugriff der Prüfseite /antrag/pruefen auf den Antragsdienst (Vertrag:
// Healio/openai-telefonagenten/…/deploy/healio-antrag-20261109/SCHNITTSTELLE.md,
// Abschnitt 4.2). Der Zugang steht nur im Kopf Authorization, nie in der
// Adresse. Kein Cookie, kein Speicher im Browser, kein anderer Dienst.

export const ANTRAG_API_BASIS = String(import.meta.env.VITE_ANTRAG_API || 'https://voice-pilot.healio.de/antrag/api').replace(/\/+$/, '');

export const TEXTFASSUNG = '2026-11-09';

export class AntragFehler extends Error {
  constructor(code, status = 0, daten = null) {
    super(code);
    this.name = 'AntragFehler';
    this.code = code;
    this.status = status;
    this.daten = daten;
  }
}

// Token aus der Sprungmarke (#<token>). Der Hash bleibt in der Adresse
// stehen, damit Neuladen geht. Nur base64url-Zeichen, sonst kein Token.
export function tokenAusHash(hash) {
  const roh = String(hash ?? '').replace(/^#/, '').trim();
  if (!roh) return null;
  let wert = roh;
  try { wert = decodeURIComponent(roh); } catch { return null; }
  return /^[A-Za-z0-9_-]{6,128}$/.test(wert) ? wert : null;
}

async function anfrage(pfad, token, { methode = 'GET', body, signal } = {}) {
  const kopf = { Accept: 'application/json', Authorization: `Bearer ${token}` };
  if (body !== undefined) kopf['Content-Type'] = 'application/json';
  let antwort;
  try {
    antwort = await fetch(`${ANTRAG_API_BASIS}${pfad}`, {
      method: methode,
      headers: kopf,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      signal,
    });
  } catch (fehler) {
    if (fehler?.name === 'AbortError') throw fehler;
    throw new AntragFehler('netz', 0);
  }
  let daten = null;
  try { daten = await antwort.json(); } catch { daten = null; }
  if (!antwort.ok || !daten || daten.ok === false) {
    throw new AntragFehler(daten?.fehler || (antwort.ok ? 'antwort_ungueltig' : `status_${antwort.status}`), antwort.status, daten);
  }
  return daten;
}

export const ladeEntwurf = (token, optionen) => anfrage('/entwurf', token, optionen);

export const berechneBeitrag = (token, body, optionen) => anfrage('/beitrag', token, { ...optionen, methode: 'POST', body });

export const bestaetigeAntrag = (token, body) => anfrage('/bestaetigen', token, { methode: 'POST', body });

// Selbstantrag aus der eigenen Antragsmaske /antrag/<sparte> (12.11.2026,
// Kanal web-selbst). Den Endpunkt gibt es noch nicht, Vertragsentwurf:
// Healio/Antragsstrecken/VERTRAG-SELBSTANTRAG-ENTWURF.md. Ohne Token und
// ohne Cookie; Gesundheitsangaben und IBAN gehen nur hier, einmal, im Body.
export const sendeSelbstantrag = (body, optionen) => selbstAnfrage('/selbstantrag', body, optionen);

// Beitrag für Sparten, deren Preis nur der Versicherer kennt (Zahn: Preisregion
// aus der Postleitzahl). Nur Tarifangaben, Geburtsdatum, Beginn und PLZ, nie
// Gesundheitsangaben oder IBAN.
export const berechneSelbstBeitrag = (body, optionen) => selbstAnfrage('/selbstantrag/beitrag', body, optionen);

// Vertragsunterlagen je Produkt und Tarif (Dienst, SCHNITTSTELLE.md 12.6):
// Liste über GET /unterlagen, das PDF über GET /unterlagen/datei. SDK-PDFs
// haben keine öffentliche Adresse, der Dienst holt sie beim Versicherer. In
// der Adresse stehen nur Produkt, Tarif und Bausteine, keine Angaben zur Person.
const unterlagenSuche = ({ produkt, tarifCode, bausteine = [] }) => `produkt=${encodeURIComponent(produkt)}&tarif=${encodeURIComponent(tarifCode)}${bausteine.length ? `&bausteine=${encodeURIComponent(bausteine.join(','))}` : ''}`;

export const ladeSelbstUnterlagen = (angaben, optionen) => selbstAnfrage(`/unterlagen?${unterlagenSuche(angaben)}`, undefined, optionen);

export async function ladeUnterlagenDatei({ produkt, tarifCode, id }) {
  let antwort;
  try {
    antwort = await fetch(`${ANTRAG_API_BASIS}/unterlagen/datei?${unterlagenSuche({ produkt, tarifCode })}&id=${encodeURIComponent(id)}`, {
      method: 'GET', headers: { Accept: 'application/pdf' }, cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer',
    });
  } catch {
    throw new AntragFehler('netz', 0);
  }
  if (!antwort.ok) throw new AntragFehler(`status_${antwort.status}`, antwort.status);
  return antwort.blob();
}

async function selbstAnfrage(pfad, body, { signal } = {}) {
  let antwort;
  try {
    antwort = await fetch(`${ANTRAG_API_BASIS}${pfad}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: body === undefined ? { Accept: 'application/json' } : { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      signal,
    });
  } catch (fehler) {
    if (fehler?.name === 'AbortError') throw fehler;
    throw new AntragFehler('netz', 0);
  }
  let daten = null;
  try { daten = await antwort.json(); } catch { daten = null; }
  if (!antwort.ok || !daten || daten.ok === false) {
    throw new AntragFehler(daten?.fehler || (antwort.ok ? 'antwort_ungueltig' : `status_${antwort.status}`), antwort.status, daten);
  }
  return daten;
}

// Feste Fehlercodes in freundliche Sätze (Du-Form, ohne Fachwörter).
export function fehlerText(fehler) {
  const code = fehler?.code || fehler;
  switch (code) {
    case 'netz':
      return 'Die Verbindung hat gerade nicht geklappt. Prüf kurz dein Internet und versuch es noch einmal.';
    case 'antrag_link_ungueltig':
      return 'Dieser Link gilt nicht mehr.';
    case 'antrag_grenze':
      return 'Gerade kommen sehr viele Anfragen an. Warte bitte eine Minute und versuch es dann noch einmal.';
    case 'antrag_minderjaehrig':
      return 'Für Kinder und Jugendliche nehmen wir den Antrag gemeinsam auf. Vereinbare dafür bitte einen Termin.';
    case 'antrag_angaben_ungueltig':
      return 'Ein paar Angaben passen noch nicht. Wir haben sie markiert.';
    case 'antrag_schon_bestaetigt':
      return 'Du hast diesen Antrag schon bestätigt.';
    case 'antrag_beitrag_geaendert':
      return 'Dein Beitrag hat sich gerade geändert.';
    case 'antrag_selbst_aus':
    case 'antrag_sparte_nicht_bereit':
      return 'Der Antrag lässt sich hier gerade nicht abschicken. Ruf uns gern an, dann machen wir ihn zusammen.';
    default:
      return 'Da ist etwas schiefgelaufen. Versuch es bitte gleich noch einmal.';
  }
}
