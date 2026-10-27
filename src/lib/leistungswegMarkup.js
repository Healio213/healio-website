/**
 * Gestaltung des Leistungswegs (Zwischendurch-Hinweis, Abschluss-Block,
 * Textlink „Alle Bausteine ansehen“) als gemeinsame Klassen.
 *
 * Eine Quelle für zwei Ausgaben: die React-Bausteine in
 * src/components/leistungsweg/LeistungsHinweis.jsx und das statische HTML
 * der Blogartikel in scripts/generate-seo-pages.mjs (renderLeistungswegHtml).
 * So sehen vorgerenderte und geladene Seite gleich aus.
 *
 * Healio-Stil wie Kurzantwort-Karte, Weg-Karte und „Auf einen Blick“ auf
 * /ambulant: Nachtblau #07111f, Mint #25c990, Manrope (font-display), weiche
 * Schatten mit Versatz, große Rundungen, freundliche Figuren. Tippflächen ab
 * 44 px, auf dem Handy volle Breite ohne waagerechten Bildlauf.
 *
 * Keine Messung: kein Ereignis, kein Pixel. Für spätere Auswertungen tragen
 * die Bausteine nur data-leistungsweg (mitte, ende, alle) und
 * data-leistungsziel (ambulant, zahn, ...), nie personenbezogene Daten.
 */

import { friendlyIconAssets } from '../components/ui/healioSoftClayIcons.js';
import { LEISTUNGEN_PFAD } from '../content/leistungsweg.js';

const FOCUS = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07111f] focus-visible:ring-offset-2';

export const LEISTUNGSWEG_KLASSEN = Object.freeze({
  // Zwischendurch-Hinweis: schmale, ganz klickbare Karte im Textverlauf.
  // Raster: Figur und Frage in einer Zeile, darunter Satz und Knopf. Auf dem
  // Handy nutzen Satz und Knopf die volle Breite, ab sm stehen sie neben der
  // Figur. Ein Knopf für alle Breiten, keine doppelte Beschriftung im HTML.
  mitteRahmen: 'mt-10 sm:mt-12',
  mitteKarte: `group relative isolate grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 overflow-clip rounded-[1.5rem] border border-[#07111f]/[0.08] bg-white p-4 shadow-[0_14px_36px_rgba(7,17,31,0.08)] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#25c990]/70 hover:shadow-[0_20px_44px_rgba(7,17,31,0.12)] motion-reduce:transform-none sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-5 sm:gap-y-1 sm:p-6 ${FOCUS}`,
  mitteSchein: 'pointer-events-none absolute -right-14 -top-16 -z-10 h-40 w-40 rounded-full bg-[#25c990]/[0.16] blur-2xl',
  mitteIcon: 'sm:row-span-3 sm:h-14 sm:w-14 sm:self-start',
  mitteFrage: 'min-w-0 break-words hyphens-manual font-display text-[1.0625rem] font-extrabold leading-6 tracking-[-0.01em] text-[#07111f] sm:text-lg sm:leading-7',
  mitteSatz: 'col-span-2 min-w-0 break-words hyphens-manual text-base leading-[1.6] text-slate-600 sm:col-span-1 sm:col-start-2 sm:leading-7',
  mitteKnopf: 'col-span-2 inline-flex min-h-11 items-center gap-2 justify-self-start whitespace-nowrap rounded-full bg-[#07111f] py-1 pl-4 pr-1.5 font-display text-[0.95rem] font-extrabold text-white transition-colors group-hover:bg-[#12233a] sm:col-span-1 sm:col-start-2 sm:mt-3 sm:pl-5',
  pfeilKreisKlein: 'grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#25c990] text-[#07111f] transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none',

  // Abschluss-Block: helle Mint-Karte mit Figur, Hauptknopf und Textlink.
  // overflow-clip statt overflow-hidden: Der Rahmen schneidet den Schein ab,
  // wird aber kein Bildlaufbereich, der beim Fokussieren verrutschen kann.
  endeRahmen: 'relative isolate mt-12 overflow-clip rounded-[1.75rem] border border-[#cfeee0] bg-[#f4faf7] p-5 shadow-[0_22px_52px_rgba(7,17,31,0.08)] sm:mt-14 sm:p-8',
  endeScheinOben: 'pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-[#25c990]/20 blur-3xl',
  endeScheinUnten: 'pointer-events-none absolute -bottom-28 -left-20 -z-10 h-56 w-56 rounded-full bg-white blur-2xl',
  endeKopf: 'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 sm:items-start sm:gap-x-8',
  endeTitel: 'col-start-1 row-start-1 min-w-0 break-words font-display text-[1.375rem] font-extrabold leading-tight tracking-[-0.02em] text-[#07111f] hyphens-manual [text-wrap:balance] sm:pt-1 sm:text-[1.75rem]',
  endeSatz: 'col-span-2 row-start-2 max-w-[54ch] text-base leading-7 text-slate-700 hyphens-manual sm:col-span-1 sm:col-start-1 sm:text-[1.05rem] sm:leading-8',
  endeIcon: 'col-start-2 row-start-1 sm:row-span-2 sm:h-20 sm:w-20 sm:rounded-[1.5rem]',
  endeAktionen: 'mt-5 flex flex-col gap-2 sm:mt-7 sm:items-start sm:gap-3',
  // Auf dem Handy darf ein langer Knopftext („Baustein Schwangerschaft
  // ansehen“) in zwei ausgewogene Zeilen umbrechen, statt aus dem Knopf zu
  // laufen; ab sm bleibt er einzeilig.
  endeKnopf: `group inline-flex min-h-[3.25rem] w-full shrink-0 items-center justify-center gap-3 whitespace-normal rounded-full bg-[#07111f] py-1.5 pl-6 pr-2 text-center font-display text-base font-extrabold leading-tight text-white [text-wrap:balance] sm:whitespace-nowrap shadow-[0_16px_36px_rgba(7,17,31,0.22)] transition hover:bg-[#12233a] hover:shadow-[0_20px_44px_rgba(7,17,31,0.26)] sm:w-auto ${FOCUS}`,
  pfeilKreis: 'grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25c990] text-[#07111f] transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none',

  // Textlink „Alle Bausteine ansehen“ mit den vier Baustein-Figuren.
  alleLink: {
    hell: `group inline-flex min-h-11 shrink-0 items-center gap-3 self-center whitespace-nowrap rounded-full py-1 pr-2 font-display text-base font-extrabold text-[#07111f] sm:self-auto ${FOCUS}`,
    dunkel: 'group inline-flex min-h-11 shrink-0 items-center gap-3 whitespace-nowrap rounded-full py-1 pr-2 font-display text-base font-extrabold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111f]',
    gruen: 'group inline-flex min-h-11 shrink-0 items-center gap-3 whitespace-nowrap rounded-full py-1 pr-2 font-display text-base font-extrabold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b8a63]',
  },
  alleText: {
    hell: 'underline decoration-[#25c990] decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-[#07111f]',
    dunkel: 'underline decoration-[#5ee0b1] decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-white',
    gruen: 'underline decoration-white/70 decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-white',
  },
  stapel: 'flex shrink-0 -space-x-2.5 group-hover:-space-x-1',
  stapelFigur: {
    hell: 'grid h-8 w-8 place-items-center overflow-hidden rounded-full transition-[margin] duration-300 ease-out motion-reduce:transition-none bg-gradient-to-br from-[#eefaf5] to-[#c9eddf] ring-2 ring-[#f4faf7]',
    dunkel: 'grid h-8 w-8 place-items-center overflow-hidden rounded-full transition-[margin] duration-300 ease-out motion-reduce:transition-none bg-gradient-to-br from-[#eefaf5] to-[#c9eddf] ring-2 ring-[#07111f]',
    gruen: 'grid h-8 w-8 place-items-center overflow-hidden rounded-full transition-[margin] duration-300 ease-out motion-reduce:transition-none bg-gradient-to-br from-[#eefaf5] to-[#c9eddf] ring-2 ring-[#139a6e]',
  },
  stapelBild: 'h-[88%] w-[88%] object-contain',
});

export const ALLE_BAUSTEINE_LABEL = 'Alle Bausteine ansehen';

// Die vier Bausteine der Übersicht /leistungen, in ihrer Reihenfolge.
export const BAUSTEIN_FIGUREN = Object.freeze(['ambulant', 'dental', 'hospital', 'pet'].map((kind) => ({
  kind,
  src: friendlyIconAssets[kind],
})));

/* -------------------------------------------------------------------------
 * Statisches HTML (Blogartikel vor dem Laden und ohne JavaScript)
 * ---------------------------------------------------------------------- */

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const PFEIL_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

// Wie FriendlyIcon (src/components/ui/FriendlyIcon.jsx), Ton mint.
const figurHtml = (kind, groesse, extra = '') => {
  const src = friendlyIconAssets[kind] || friendlyIconAssets.protection;
  const masse = groesse === 'md' ? 'h-16 w-16 rounded-[1.25rem]' : 'h-12 w-12 rounded-[1rem]';
  return `<span class="relative isolate inline-grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br shadow-[0_12px_28px_rgba(38,61,73,0.11)] ring-1 from-[#eefaf5] via-[#dff5eb] to-[#c9eddf] ring-[#bddfd2] ${masse} ${extra}" aria-hidden="true"><span class="absolute inset-x-2 top-1.5 h-1/3 rounded-full bg-white/55 blur-[1px]"></span><img src="${escapeHtml(src)}" alt="" width="192" height="192" loading="lazy" decoding="async" class="relative h-[94%] w-[94%] select-none object-contain drop-shadow-[0_5px_7px_rgba(25,44,55,0.14)]"></span>`;
};

const stapelHtml = (ton) => `<span class="${LEISTUNGSWEG_KLASSEN.stapel}" aria-hidden="true">${BAUSTEIN_FIGUREN.map(({ src }) => `<span class="${LEISTUNGSWEG_KLASSEN.stapelFigur[ton]}"><img src="${escapeHtml(src)}" alt="" width="64" height="64" loading="lazy" decoding="async" class="${LEISTUNGSWEG_KLASSEN.stapelBild}"></span>`).join('')}</span>`;

export const alleBausteineHtml = (ton = 'hell') => `<a href="${LEISTUNGEN_PFAD}" data-leistungsweg="alle" class="${LEISTUNGSWEG_KLASSEN.alleLink[ton]}">${stapelHtml(ton)}<span class="${LEISTUNGSWEG_KLASSEN.alleText[ton]}">${ALLE_BAUSTEINE_LABEL}</span></a>`;

/**
 * Zwischendurch-Hinweis als HTML. ziel kommt aus getLeistungsziel().
 */
export const leistungsHinweisMitteHtml = (ziel) => {
  const k = LEISTUNGSWEG_KLASSEN;
  const { frage, text, label } = ziel.mitte;
  return `<aside aria-label="Passender Baustein" data-leistungsweg="mitte" data-leistungsziel="${escapeHtml(ziel.id)}" class="${k.mitteRahmen}"><a href="${escapeHtml(ziel.link || ziel.to)}" class="${k.mitteKarte}"><span class="${k.mitteSchein}" aria-hidden="true"></span>${figurHtml(ziel.icon, 'sm', k.mitteIcon)}<span class="${k.mitteFrage}">${escapeHtml(frage)}</span><span class="${k.mitteSatz}">${escapeHtml(text)}</span><span class="${k.mitteKnopf}">${escapeHtml(label)}<span class="${k.pfeilKreisKlein}">${PFEIL_SVG}</span></span></a></aside>`;
};

/**
 * Abschluss-Block als HTML.
 */
export const leistungsHinweisEndeHtml = (ziel, { alleBausteine = ziel.alleBausteine } = {}) => {
  const k = LEISTUNGSWEG_KLASSEN;
  const { titel, text, label } = ziel.ende;
  return `<section aria-labelledby="leistungsweg-heading" data-leistungsweg="ende" data-leistungsziel="${escapeHtml(ziel.id)}" class="${k.endeRahmen}"><span class="${k.endeScheinOben}" aria-hidden="true"></span><span class="${k.endeScheinUnten}" aria-hidden="true"></span><div class="${k.endeKopf}"><h2 id="leistungsweg-heading" class="${k.endeTitel}">${escapeHtml(titel)}</h2>${figurHtml(ziel.icon, 'md', k.endeIcon)}<p class="${k.endeSatz}">${escapeHtml(text)}</p></div><div class="${k.endeAktionen}"><a href="${escapeHtml(ziel.link || ziel.to)}" class="${k.endeKnopf}">${escapeHtml(label)}<span class="${k.pfeilKreis}">${PFEIL_SVG}</span></a>${alleBausteine ? alleBausteineHtml('hell') : ''}</div></section>`;
};
