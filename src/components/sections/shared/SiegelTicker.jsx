import React from 'react';

/**
 * Siegel-Ticker für das Handy (Experiment 06.10.2026, Franks Wunsch).
 *
 * Statt einer hohen Siegelzeile läuft ein ruhiges, schmales Band mit den
 * Siegeln durch. Jedes Siegel trägt unter dem Logo eine kurze Beschriftung,
 * damit klar bleibt, welchem Versicherer bzw. Tarif es gehört. Die
 * Pflichthinweise stehen dauerhaft als ruhender Text darunter, nicht im Band.
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
 * items: [{ id, src, alt, caption, width, height }]
 * notes: Pflichthinweise (Text), mindestens 14 px.
 */
const SiegelTicker = ({ items = [], ariaLabel, notes = [], className = '' }) => {
  if (!items.length) return null;
  const running = items.length >= 3;
  // Eine volle Runde dauert je Siegel etwa neun Sekunden: ruhig, nicht hektisch.
  const duration = `${Math.max(24, items.length * 9)}s`;

  const renderList = (hidden, suffix) => (
    <ul
      className={`siegel-ticker__list flex shrink-0 items-start gap-x-9 pr-9 ${hidden ? 'siegel-ticker__dup' : ''}`}
      aria-hidden={hidden ? 'true' : undefined}
    >
      {items.map((item) => (
        <li key={`${item.id}${suffix}`} className="flex shrink-0 flex-col items-center gap-1.5 text-center">
          <img
            src={item.src}
            alt={hidden ? '' : item.alt}
            width={item.width}
            height={item.height}
            className="h-12 w-auto"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <span className="whitespace-nowrap text-[0.8125rem] font-semibold leading-4 text-slate-600">{item.caption}</span>
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
        <ul role="group" aria-label={ariaLabel} className="flex flex-wrap items-start justify-center gap-x-9 gap-y-3 py-1">
          {items.map((item) => (
            <li key={item.id} className="flex shrink-0 flex-col items-center gap-1.5 text-center">
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="h-12 w-auto"
                loading="lazy"
                decoding="async"
              />
              <span className="text-[0.8125rem] font-semibold leading-4 text-slate-600">{item.caption}</span>
            </li>
          ))}
        </ul>
      )}

      {notes.length > 0 && (
        <div className="mx-auto mt-3 max-w-xl space-y-2 text-center text-sm leading-5 text-slate-500">
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
