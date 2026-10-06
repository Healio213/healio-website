import React from 'react';

/**
 * Siegel-Ticker für das Handy (Experiment 06.10.2026, Vorgabe).
 *
 * Statt einer hohen Siegelzeile läuft ein ruhiges, schmales Band mit den
 * Siegelbildern durch. Vorgabe (06.10.2026): am Handy KEINE Überschrift,
 * KEINE Beschriftung unter den Siegeln und KEINE sichtbaren Hinweise, nur die
 * durchlaufenden Bilder. Die Bilder nennen Versicherer bzw. Tarif selbst; die
 * Alt-Texte bleiben vollständig, und die Pflichthinweise stehen als
 * Screenreader-Text (sr-only) weiter im Dokument, ohne sichtbar zu sein.
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
 * - Weniger als drei Siegel: kein Lauf, die Siegel stehen ruhig nebeneinander.
 *
 * items: [{ id, src, alt, width, height }]
 * notes: Pflichthinweise (Text), nur für Screenreader.
 * size: 'regular' (56 px hoch) oder 'large' (72 px hoch, z. B. /schwangerschaft).
 */
const IMAGE_CLASS = { regular: 'h-14 w-auto', large: 'h-[4.5rem] w-auto' };
const GAP_CLASS = { regular: 'gap-x-9 pr-9', large: 'gap-x-12 pr-12' };

const SiegelTicker = ({ items = [], ariaLabel, notes = [], size = 'regular', className = '' }) => {
  if (!items.length) return null;
  const imageClass = IMAGE_CLASS[size] || IMAGE_CLASS.regular;
  const gapClass = GAP_CLASS[size] || GAP_CLASS.regular;
  const running = items.length >= 3;
  // Eine volle Runde dauert je Siegel etwa neun Sekunden: ruhig, nicht hektisch.
  const duration = `${Math.max(24, items.length * 9)}s`;

  const renderList = (hidden, suffix) => (
    <ul
      className={`siegel-ticker__list flex shrink-0 items-center ${gapClass} ${hidden ? 'siegel-ticker__dup' : ''}`}
      aria-hidden={hidden ? 'true' : undefined}
    >
      {items.map((item) => (
        <li key={`${item.id}${suffix}`} className="flex shrink-0 items-center">
          <img
            src={item.src}
            alt={hidden ? '' : item.alt}
            width={item.width}
            height={item.height}
            className={imageClass}
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={className}>
      {running ? (
        <div role="group" aria-label={ariaLabel} className="siegel-ticker relative overflow-hidden py-1" style={{ '--siegel-ticker-duration': duration }}>
          <div className="siegel-ticker__track flex w-max">
            {renderList(false, '-a')}
            {renderList(true, '-b')}
          </div>
        </div>
      ) : (
        <ul role="group" aria-label={ariaLabel} className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 py-1">
          {items.map((item) => (
            <li key={item.id} className="flex shrink-0 items-center">
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className={imageClass}
                loading="lazy"
                decoding="async"
              />
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
          .siegel-ticker__dup { display: none; }
        }
      `}</style>
    </div>
  );
};

export default SiegelTicker;
