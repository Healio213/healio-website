// Verzeichnis der Produktdefinitionen und Zuordnung der heutigen
// Abschlusslinks zu Sparte, Versicherer und Tarifstufe (12.11.2026).
// Node-fähig (keine @/-Importe).

import ambulant from './ambulant.js';
import stationaer from './stationaer.js';
import zahn from './zahn.js';

export const DEFINITIONEN = { ambulant, zahn, stationaer };

export const definitionFuer = (sparte) => DEFINITIONEN[sparte] || null;

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

// Hat die Sparte eine fertige eigene Maske für genau diesen Versicherer?
export function eigeneMaskeFuer(link) {
  const definition = link ? definitionFuer(link.sparte) : null;
  return Boolean(definition?.bereit && definition.versicherer.id === link.versicherer);
}
