import React, { useMemo } from 'react';
import { Minus, Plus } from 'lucide-react';
import { berechneZulagen, formatEuroDE, formatCentDE, formatZahlDE, RECHNER_MAX_MONATSBEITRAG } from '@/lib/altersvorsorgeZulagen';
import { rechner as rechnerContent } from '@/content/altersvorsorgedepotContent';

const MIN_BEITRAG = 10;
const MAX_BEITRAG = RECHNER_MAX_MONATSBEITRAG;
const SCHRITT_BEITRAG = 5;
const MAX_KINDER = 6;

/** Ja/Nein-Schalter, thumb-tauglich (min. 44px hoch) mit aria-pressed. */
const SchalterZeile = ({ label, value, onChange }) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <span className="min-w-0 flex-1 basis-32 font-bold text-healio-dark">{label}</span>
    <div className="inline-flex shrink-0 rounded-full border border-gray-200 p-1" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={value === true}
        className={`min-h-11 rounded-full px-4 text-base font-bold transition-colors ${value === true ? 'bg-healio-primary text-white' : 'text-gray-500 hover:text-healio-primary'}`}
      >
        Ja
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={value === false}
        className={`min-h-11 rounded-full px-4 text-base font-bold transition-colors ${value === false ? 'bg-healio-primary text-white' : 'text-gray-500 hover:text-healio-primary'}`}
      >
        Nein
      </button>
    </div>
  </div>
);

/**
 * Zulagen-Rechner für /altersvorsorgedepot (Abschnitt 3 der Vorlage).
 *
 * Zustand lebt in der Seite (AltersvorsorgedepotPage), damit dieselben Werte
 * auch als Schnappschuss ans Webinar-Formular gehen. `value` und `onChange`
 * funktionieren wie ein kontrolliertes Formularfeld.
 *
 * Unter dem Ergebnis steht der persönliche Hauptknopf (führt zum Abschnitt
 * Zuschuss-Check, onCheck) und darunter der weichere Weg ins Webinar
 * (onWebinar).
 */
const ZulagenRechner = ({ value, onChange, onCheck, onWebinar, id = 'rechner' }) => {
  const { monatsbeitrag, kinder, unter25, selbststaendig, riester } = value;

  const ergebnis = useMemo(
    () => berechneZulagen({ monatsbeitrag, kinder, unter25 }),
    [monatsbeitrag, kinder, unter25],
  );

  const setzeFeld = (patch) => onChange({ ...value, ...patch });

  // Höchstens ein Tipp (Vorgabe Abschnitt 3). Reihenfolge: die engeren,
  // kinderbezogenen Fälle zuerst, danach die allgemeine 150-EUR-Grenze.
  // Bei genau 150 EUR ist die Grundzulage bereits maximal, deshalb kein Tipp.
  const tipp = (() => {
    if (!ergebnis.berechtigt) return null;
    if (kinder > 0 && monatsbeitrag < 25) return rechnerContent.tipps.unter25MitKindern;
    if (kinder === 0 && monatsbeitrag < 30) return rechnerContent.tipps.unter30KeineKinder;
    if (monatsbeitrag < 150) return rechnerContent.tipps.unter150;
    if (monatsbeitrag === MAX_BEITRAG) return rechnerContent.tipps.bei150;
    return null;
  })();

  const idBeitrag = `${id}-beitrag`;
  const idKinderLabel = `${id}-kinder-label`;

  return (
    <section id={id} className="scroll-mt-24 font-sans" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 id={`${id}-heading`} className="text-3xl font-extrabold text-healio-dark md:text-4xl">
            {rechnerContent.ueberschrift}
          </h2>
          <p className="mt-3 text-lg text-healio-text-light">{rechnerContent.unterzeile}</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          {/* Eingaben */}
          <div className="min-w-0 space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg lg:p-8">
            <div>
              <label htmlFor={idBeitrag} className="flex flex-wrap items-baseline justify-between gap-3 font-bold text-healio-dark">
                <span className="min-w-0 flex-1 basis-40">{rechnerContent.labels.monatsbeitrag}</span>
                <span className="shrink-0 whitespace-nowrap text-2xl font-extrabold text-healio-primary-dark">{formatEuroDE(monatsbeitrag)}</span>
              </label>
              <input
                id={idBeitrag}
                type="range"
                min={MIN_BEITRAG}
                max={MAX_BEITRAG}
                step={SCHRITT_BEITRAG}
                value={monatsbeitrag}
                onChange={(event) => setzeFeld({ monatsbeitrag: Number(event.target.value) })}
                aria-valuetext={formatEuroDE(monatsbeitrag)}
                className="mt-4 h-3 w-full cursor-pointer"
                style={{ accentColor: '#25c990' }}
              />
              <div className="mt-1 flex justify-between text-base text-healio-text-light">
                <span>{formatEuroDE(MIN_BEITRAG)}</span>
                <span>{formatEuroDE(MAX_BEITRAG)}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <span id={idKinderLabel} className="min-w-0 flex-1 basis-40 font-bold text-healio-dark">{rechnerContent.labels.kinder}</span>
              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setzeFeld({ kinder: Math.max(0, kinder - 1) })}
                  disabled={kinder <= 0}
                  aria-label="Kinderzahl verringern"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-healio-primary hover:bg-gray-100 hover:text-healio-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary disabled:opacity-30"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span
                  role="status"
                  aria-labelledby={idKinderLabel}
                  aria-live="polite"
                  className="w-6 text-center text-lg font-bold text-healio-dark"
                >
                  {kinder}
                </span>
                <button
                  type="button"
                  onClick={() => setzeFeld({ kinder: Math.min(MAX_KINDER, kinder + 1) })}
                  disabled={kinder >= MAX_KINDER}
                  aria-label="Kinderzahl erhöhen"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-healio-primary hover:bg-gray-100 hover:text-healio-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary disabled:opacity-30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <SchalterZeile label={rechnerContent.labels.unter25} value={unter25} onChange={(next) => setzeFeld({ unter25: next })} />
            <SchalterZeile label={rechnerContent.labels.selbststaendig} value={selbststaendig} onChange={(next) => setzeFeld({ selbststaendig: next })} />
            <SchalterZeile label={rechnerContent.labels.riester} value={riester} onChange={(next) => setzeFeld({ riester: next })} />
          </div>

          {/* Ergebnis */}
          <div className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#081f2b] via-[#064b3d] to-[#03362f] p-6 shadow-xl lg:p-8">
            <div aria-live="polite" aria-atomic="true">
              {!ergebnis.berechtigt ? (
                <p className="text-center text-lg font-semibold text-white">{rechnerContent.unterMindestbetragText}</p>
              ) : (
                <div>
                  <p className="text-base leading-relaxed text-white/90">
                    Beispiel: Grund- und Kinderzulage im Jahr{' '}
                    <span className="text-2xl font-extrabold text-white">{formatEuroDE(ergebnis.zulageJahr)}</span>{' '}
                    bei unmittelbarer Förderberechtigung.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-white/85">
                    Umgerechnet sind das {formatEuroDE(ergebnis.zulageMonat)} im Monat. Auf jeden Euro von dir kommen{' '}
                    {ergebnis.quote >= 1 ? formatEuroDE(ergebnis.quote) : formatCentDE(ergebnis.quote)} vom Staat.
                  </p>

                  <div className="mt-6 space-y-2 rounded-xl border border-white/20 bg-white/10 p-4 text-base text-white">
                    <div className="flex justify-between">
                      <span>{rechnerContent.ergebnisLabels.grundzulage}</span>
                      <span className="font-bold">{formatEuroDE(ergebnis.grundzulage)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{rechnerContent.ergebnisLabels.kinderzulage}</span>
                      <span className="font-bold">{formatEuroDE(ergebnis.kinderzulage)}</span>
                    </div>
                    {ergebnis.startbonus > 0 && (
                      <div className="flex justify-between">
                        <span>{rechnerContent.ergebnisLabels.startbonus}</span>
                        <span className="font-bold">{formatEuroDE(ergebnis.startbonus)}</span>
                      </div>
                    )}
                  </div>

                  {tipp && (
                    <p className="mt-4 rounded-lg bg-white/10 p-3 text-base leading-relaxed text-white/90">{tipp}</p>
                  )}

                  {selbststaendig && (
                    <p className="mt-3 text-base leading-relaxed text-white/85">{rechnerContent.hinweise.selbststaendig}</p>
                  )}
                  {riester && (
                    <p className="mt-3 text-base leading-relaxed text-white/85">{rechnerContent.hinweise.riester}</p>
                  )}
                  <p className="mt-3 text-base leading-relaxed text-white/85">{rechnerContent.hinweise.immer}</p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onCheck}
              className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-white px-6 py-4 text-center text-base font-extrabold text-healio-primary-dark shadow-md transition [text-wrap:balance] hover:shadow-lg"
            >
              {ergebnis.berechtigt
                ? rechnerContent.knopfMitBetrag.replace('{zulageJahr}', formatZahlDE(ergebnis.zulageJahr))
                : rechnerContent.knopfOhneAnspruch}
            </button>
            <a
              href="#webinar"
              onClick={(event) => { event.preventDefault(); onWebinar?.(); }}
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center px-3 text-center text-base font-semibold text-white underline underline-offset-4 transition hover:text-white/80"
            >
              {rechnerContent.webinarLink}
            </a>
          </div>
        </div>

        <p className="mt-6 text-base leading-relaxed text-healio-text-light">{rechnerContent.kleingedruckt}</p>
      </div>
    </section>
  );
};

export default ZulagenRechner;
