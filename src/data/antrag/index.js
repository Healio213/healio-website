// Verzeichnis der Produktdefinitionen und Zuordnung der heutigen
// Abschlusslinks zu Sparte, Versicherer und Tarifstufe (12.11.2026).
// Node-fähig (keine @/-Importe).

import ambulant from './ambulant.js';
import stationaer from './stationaer.js';
import zahn from './zahn.js';
import zahnUkv from './zahnUkv.js';

// Produkte (Schlüssel = Pfad unter /antrag/). Zahn hat zwei Versicherer.
export const DEFINITIONEN = {
  ambulant, zahn, stationaer, 'zahn-ukv': zahnUkv,
};

// Produktnamen des Antragsdienstes (SCHNITTSTELLE.md 12.1) auf die Pfade der Maske.
export const DIENST_PRODUKTE = {
  'sdk-ambulant': 'ambulant', 'sdk-stationaer': 'stationaer', 'bayerische-zahn': 'zahn', 'ukv-zahn': 'zahn-ukv',
};

export const definitionFuer = (produkt) => DEFINITIONEN[produkt] || DEFINITIONEN[DIENST_PRODUKTE[produkt]] || null;

// Produkt zu Sparte und Versicherer (z. B. zahn + ukv → zahn-ukv).
export const produktFuer = (sparte, versicherer) => Object.values(DEFINITIONEN).find((definition) => definition.sparte === sparte && definition.versicherer.id === versicherer) || null;

export const istBereit = (sparte) => Boolean(DEFINITIONEN[sparte]?.bereit);

// Welche Abschlusslinks die Wahl der zwei Wege bekommen. Alles andere (UKV
// Vorsorge, ARAG-Angebot, Bayerische Klinik, DKV UZ1, gemischte SDK-Links)
// behält das heutige Verhalten. Liefert { sparte, versicherer, tarif } oder null.
export function antragAusLink(href) {
  let url;
  try { url = new URL(String(href ?? '')); } catch { return null; }
  if (url.protocol !== 'https:') return null;
  if (url.hostname === 'insurances-online.levelnine.biz') {
    const mandant = url.searchParams.get('mandant');
    const typ = url.searchParams.get('tarifftypes');
    const tarifRoh = url.searchParams.get('tariffs') || '';
    if (mandant === 'sdk' && typ === 'Ambulant') {
      const treffer = /^SDK(AP[1579])@$/.exec(tarifRoh);
      return { sparte: 'ambulant', versicherer: 'sdk', tarif: treffer ? treffer[1] : null };
    }
    if (mandant === 'sdk' && typ === 'Stationär') {
      const treffer = /^SDK(SP[12U])@$/.exec(tarifRoh);
      return { sparte: 'stationaer', versicherer: 'sdk', tarif: treffer ? treffer[1] : null };
    }
    if (mandant === 'vmk' && typ === 'Zahn') return { sparte: 'zahn', versicherer: 'ukv', tarif: null };
    return null;
  }
  if (url.hostname === 'www.diebayerische.de' && url.pathname === '/diebayerische/online-berechnen/zahnzusatzversicherung-berechnen') {
    return { sparte: 'zahn', versicherer: 'bayerische', tarif: null };
  }
  return null;
}

// Fertige eigene Maske für genau diesen Versicherer? schalter: eingeschaltete
// Produktschalter (z. B. { ukvZahn: true }); Produkte mit eigenem Schalter
// gelten nur, wenn er an ist. Liefert die Definition oder null.
export function eigeneMaskeFuer(link, schalter = {}) {
  const definition = link ? produktFuer(link.sparte, link.versicherer) : null;
  if (!definition?.bereit) return null;
  if (definition.schalter && !schalter[definition.schalter]) return null;
  return definition;
}
