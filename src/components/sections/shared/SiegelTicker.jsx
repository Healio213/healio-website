import React from 'react';

/**
 * Siegel-Ticker für das Handy (Experiment 06.10.2026, Vorgabe).
 *
 * Statt einer hohen Textzeile läuft ein ruhiges Band mit den Originalbildern.
 * Franks Präzisierung 14.10.: live durchlaufen lassen, wenig Begleittext.
 * Optional nennt caption knapp den bewerteten Anbieter oder Tarif.
 * Alt-Texte bleiben vollständig. Ausführliche Details verwaltet der Aufrufer.
 *
 * Nur für unter md (768 px) gedacht: Der Aufrufer rendert den Ticker in einem
 * Wrapper mit "md:hidden"; ab md bleibt die bisherige Siegelzeile.
 *
 * Aufbau und Verhalten:
 * - Zwei gleiche Listen hintereinander, die zweite aria-hidden, das Band
 *   läuft per CSS um genau eine Listenbreite (translateX(-50%)) und beginnt
 *   dann nahtlos von vorn.
 * - Pause bei Berührung, Hover und Tastaturfokus.
 * - prefers-reduced-motion: kein Lauf, die erste Liste steht als wischbare
 *   Reihe, die Doppelung fällt weg.
 * - forceScroll lässt auch zwei vorhandene Siegel laufen. Ein Siegel steht.
 *   Zusätzliche Wiederholungen sind dekorativ und für Screenreader verborgen.
 *
 * items: [{ id, src, alt, width, height }]
 * notes: Pflichthinweise (Text), nur für Screenreader.
 * size: 'regular' (56 px), 'large' (72 px) oder 'prominent' (96 px).
 */
const IMAGE_CLASS = { regular: 'h-14 w-auto', large: 'h-[4.5rem] w-auto', prominent: 'h-24 w-auto object-contain' };
const GAP_CLASS = { regular: 'gap-x-9 pr-9', large: 'gap-x-12 pr-12' };

const SiegelTicker = ({ items = [], ariaLabel, notes = [], size = 'regular', className = '', forceScroll = false }) => {
  if (!items.length) return null;
  const imageClass = IMAGE_CLASS[size] || IMAGE_CLASS.regular;
  const gapClass = GAP_CLASS[size] || GAP_CLASS.regular;
  const running = items.length >= 3 || (forceScroll && items.length > 1);
  // Sechs Originalflächen reichen auch am oberen mobilen Rand bis 767 px.
  const repetitions = running ? Math.ceil(6 / items.length) : 1;
  const tickerItems = Array.from({ length: repetitions }, (_, repeat) => items.map((item) => ({ ...item, repeat }))).flat();
  // Eine volle Runde dauert je Siegel etwa neun Sekunden: ruhig, nicht hektisch.
  const duration = `${Math.max(24, items.length * 9)}s`;

  const renderList = (hidden, suffix) => (
    <ul
      className={`siegel-ticker__list flex shrink-0 items-center ${gapClass} ${hidden ? 'siegel-ticker__dup' : ''}`}
      aria-hidden={hidden ? 'true' : undefined}
    >
      {tickerItems.map((item) => (
        <li key={`${item.id}${suffix}-${item.repeat}`} aria-hidden={item.repeat > 0 ? 'true' : undefined} className={`flex shrink-0 flex-col items-center ${item.repeat > 0 ? 'siegel-ticker__repeat' : ''}`}>
          <img
            src={item.src}
            alt={hidden || item.repeat > 0 ? '' : item.alt}
            width={item.width}
            height={item.height}
            className={imageClass}
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          {item.caption && <span className="mt-2 max-w-[13rem] text-center text-xs font-semibold leading-5 text-slate-600">{item.caption}</span>}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={className}>
      {running ? (
        <div role="group" tabIndex={0} aria-label={ariaLabel} className="siegel-ticker relative overflow-hidden py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700" style={{ '--siegel-ticker-duration': duration }}>
          <div className="siegel-ticker__track flex w-max">
            {renderList(false, '-a')}
            {renderList(true, '-b')}
          </div>
        </div>
      ) : (
        <ul role="group" aria-label={ariaLabel} className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 py-1">
          {items.map((item) => (
            <li key={item.id} className="flex shrink-0 flex-col items-center">
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className={imageClass}
                loading="lazy"
                decoding="async"
              />
              {item.caption && <span className="mt-2 max-w-[13rem] text-center text-xs font-semibold leading-5 text-slate-600">{item.caption}</span>}
            </li>
          ))}
        </ul>
      )}

      {notes.length > 0 && (
        <div className="sr-only">
          {notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      )}

      <style>{`
        .siegel-ticker {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
        }
        .siegel-ticker__track {
          animation: siegel-ticker var(--siegel-ticker-duration, 36s) linear infinite;
          will-change: transform;
        }
        .siegel-ticker:hover .siegel-ticker__track,
        .siegel-ticker:active .siegel-ticker__track,
        .siegel-ticker:focus-within .siegel-ticker__track {
          animation-play-state: paused;
        }
        @keyframes siegel-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .siegel-ticker {
            overflow-x: auto;
            overscroll-behavior-x: contain;
            scroll-snap-type: x proximity;
            scrollbar-width: none;
            -webkit-mask-image: none;
            mask-image: none;
          }
          .siegel-ticker::-webkit-scrollbar { display: none; }
          .siegel-ticker__track { animation: none; will-change: auto; }
          .siegel-ticker__list { padding-left: 1rem; }
          .siegel-ticker__list > li { scroll-snap-align: start; }
          .siegel-ticker__dup, .siegel-ticker__repeat { display: none; }
        }
      `}</style>
    </div>
  );
};

export default SiegelTicker;
