import React, { useId } from 'react';
import AltersvorsorgeIllustration from './AltersvorsorgeIllustration';
import { friendlyIconAssets } from '@/components/ui/healioSoftClayIcons';
import { KACHEL_MOTIVE, KARTEN_FIGUR, MOTIV_SITZ, motivSitzStil } from '@/lib/altersvorsorgeBildmotive';

// Raster nach Zahl der Kacheln. Bis zum Tablet stehen die Kacheln untereinander (Bühne links,
// Zahl rechts), danach nebeneinander. Vier Kacheln stehen auf dem Tablet als zwei mal zwei.
const RASTER = {
  1: '',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
  viele: 'md:[grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))]',
};

// Größter sichtbarer Bildinhalt und Fußpunkt (rem) auf der Kachelbühne und für die Figur.
// Auf dem Handy rücken Bühne und Figur über eine Verkleinerung gemeinsam zusammen.
const KACHEL_BUEHNE = { breite: 6.5, hoehe: 5.4, fuss: 1.6 };
const FIGUR = { breite: 6.75, hoehe: 7.5, fuss: -1 };

// Kleines Schaufenster je Kachel im Stil des Zuschuss-Checks: dunkle Bühne,
// Lichthof, Podest und darauf das plastische Motiv.
const KachelBuehne = ({ kachel }) => {
  const motiv = KACHEL_MOTIVE[kachel.key];
  const bild = motiv ? friendlyIconAssets[motiv] : null;
  const sitz = motiv ? MOTIV_SITZ[motiv] : null;
  // Unbekannte Kachel: bisheriges Bildchen, damit nichts leer bleibt.
  if (!bild || !sitz) {
    return <AltersvorsorgeIllustration kind={kachel.motiv || kachel.key} className="h-12 w-12 shrink-0 md:mb-2 md:h-14 md:w-14" />;
  }

  return (
    <div
      data-kachel-motiv={motiv}
      aria-hidden="true"
      className="relative isolate h-[4.75rem] w-[4.75rem] shrink-0 overflow-hidden rounded-[1.15rem] bg-[linear-gradient(180deg,#061a26_0%,#06303a_62%,#0a4a42_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] md:h-[7.5rem] md:w-full"
    >
      <span className="pointer-events-none absolute left-1/2 top-[46%] -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,255,245,0.72)_0%,rgba(94,224,177,0.34)_36%,rgba(37,201,144,0)_70%)] md:h-48 md:w-48" />
      <div className="absolute inset-0 origin-bottom scale-[0.56] md:scale-100">
        <span className="pointer-events-none absolute bottom-[0.5rem] left-1/2 h-[2.15rem] w-[7.25rem] -translate-x-1/2 rounded-[50%_/_0.78rem] bg-[linear-gradient(90deg,#0a5a48_0%,#18a880_34%,#12906f_60%,#073f33_100%)] shadow-[0_12px_20px_rgba(1,14,18,0.55)] md:w-[8.25rem]" />
        <span className="pointer-events-none absolute bottom-[1.1rem] left-1/2 h-[1.55rem] w-[7.25rem] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_36%,#f4fffa_0%,#bdf6e1_42%,#67ddb3_100%)] shadow-[inset_0_1px_0_1px_rgba(255,255,255,0.55),inset_0_-4px_6px_rgba(8,96,76,0.3)] md:w-[8.25rem]" />
        <span className="pointer-events-none absolute bottom-[1.4rem] left-1/2 h-[0.8rem] w-[4.5rem] -translate-x-1/2 rounded-[50%] bg-[#07493c]/50 blur-[4px]" />
        <img
          src={bild}
          alt=""
          loading="lazy"
          decoding="async"
          width={sitz.b}
          height={sitz.h}
          style={motivSitzStil(sitz, KACHEL_BUEHNE)}
          className="absolute left-1/2 max-w-none select-none drop-shadow-[0_6px_8px_rgba(2,22,20,0.32)]"
        />
      </div>
    </div>
  );
};

// Die Figur schaut hinter den Kacheln hervor und zeigt auf die Überschrift.
const KartenFigur = () => {
  const bild = friendlyIconAssets[KARTEN_FIGUR];
  const sitz = MOTIV_SITZ[KARTEN_FIGUR];
  if (!bild || !sitz) return <AltersvorsorgeIllustration kind="depot" className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" />;

  return (
    <div data-karten-figur={KARTEN_FIGUR} aria-hidden="true" className="relative w-[5.25rem] shrink-0 self-stretch sm:w-[7rem]">
      <div className="absolute inset-0 origin-bottom scale-[0.78] sm:scale-100">
        <img
          src={bild}
          alt=""
          loading="lazy"
          decoding="async"
          width={sitz.b}
          height={sitz.h}
          style={motivSitzStil(sitz, FIGUR)}
          className="absolute left-1/2 max-w-none select-none drop-shadow-[0_8px_10px_rgba(25,44,55,0.16)]"
        />
      </div>
    </div>
  );
};

/**
 * Angebotskarte im Hero von /altersvorsorgedepot, nach dem Muster der Karte in
 * StationaerHero (helle Karte, Figur, Angebotskacheln), in Healio-Farben und mit
 * den plastischen Motiven aus dem Bildsatz der Website.
 *
 * Text und Reihenfolge kommen komplett von außen (Content-Datei). Auf dem Handy
 * steht jede Kachel einzeln (Bühne links, Zahl rechts), ab dem Tablet stehen die
 * Kacheln nebeneinander (Bühne oben, Zahl darunter).
 */
const AltersvorsorgeAngebotsKarte = ({ titel, kacheln, hinweis }) => {
  const titelId = useId();

  return (
    <div
      role="group"
      aria-labelledby={titelId}
      className="relative overflow-hidden rounded-[2.2rem] border border-emerald-100 bg-gradient-to-br from-[#eefaf5] via-white to-[#fff5d9] p-5 text-[#071726] shadow-[0_28px_70px_rgba(7,17,31,0.10)] sm:p-7"
    >
      <div className="flex min-h-[5.25rem] items-center gap-3 sm:min-h-[6.5rem] sm:gap-5">
        <KartenFigur />
        <p id={titelId} className="py-2 font-display text-lg font-extrabold leading-tight text-[#0b6048] sm:text-2xl">
          {titel}
        </p>
      </div>

      <ul className={`relative z-10 grid gap-3 ${RASTER[kacheln.length] || RASTER.viele}`}>
        {kacheln.map((kachel) => (
          <li
            key={kachel.key}
            className="flex items-center gap-3 rounded-[1.5rem] bg-white p-2.5 shadow-[0_14px_34px_rgba(39,63,72,0.11)] ring-1 ring-[#cfe5dc] md:block md:p-3"
          >
            <KachelBuehne kachel={kachel} />
            <div className="min-w-0 md:px-1.5 md:pb-1.5 md:pt-3.5">
              <p className="whitespace-nowrap font-display text-[1.375rem] font-extrabold leading-tight tracking-tight text-[#071726] md:text-2xl xl:text-[1.75rem]">
                {kachel.wert}
              </p>
              <p className="mt-1 text-base font-medium leading-snug text-slate-600">{kachel.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-base leading-6 text-slate-600">{hinweis}</p>
    </div>
  );
};

export default AltersvorsorgeAngebotsKarte;
