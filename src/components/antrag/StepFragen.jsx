import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  FRAGEN_ANZAHL,
  FRAGE_1A_ITEMS,
  FRAGE_1_TEXT,
  FRAGE_2_TEXT,
  FRAGE_INDEX_1A,
  FRAGE_INDEX_GROESSE,
  GEWICHT_MAX,
  GEWICHT_MIN,
  GROESSE_MAX,
  GROESSE_MIN,
  ZUSCHLAG_PRO_KREUZ_1A,
  gewichtAlsZahl,
  gewichtEingabeBereinigt,
  groesseAlsZahl,
  groesseEingabeBereinigt,
  jaNeinFrageAmIndex,
} from '@/data/sdkAmbulantAntrag';
import { FRAGE_1_AUFKLAPPEN } from '@/data/sdkAmbulantAntragTexte';
import {
  Aufklapper, FOKUS, FehlerText, Field, Gruppe, OptionCard, TRENNUNG, cx, eingabeKlasse, fieldAria,
} from './ui';

// Schritt 2, Fragen als einzelne Bildschirme (Handy zuerst):
// Index 1 = Frage 1 mit 1a, 2 bis 11 = 1b bis 1k, 12 = Frage 2.
// Bei 1a bis 1k stehen Ja und Nein in der Fragekarte. Nach „Nein“ (bei 1b bis
// 1k auch nach „Ja“) blättert die Seite selbst weiter. Bei 1a steht die Liste
// der 15 Erkrankungen wortgleich als Text in der Karte; „Ja“ klappt darunter
// die Ankreuzkarten auf, danach geht es mit „Weiter“ weiter (Franks Vorgabe
// 16.10.2026). Kein Preis und kein laufender Zuschlag.
// Damit Ja und Nein ohne Scrollen erreichbar sind: Der Text von Frage 1 steht
// vollständig, aber dezent über der Karte; die Seite holt beim Fragewechsel
// die ganze Karte über die Leiste, ohne die Überschrift mit dem Zähler aus dem
// Bild zu schieben (SdkAntragEntwurfPage). Bei wenig Höhe (bis 640 px) steht
// der Text von Frage 1 bei 1b bis 1k zum Aufklappen da, sonst bliebe für die
// Frage selbst kaum Platz; die Aufklappzeile beginnt wortgleich mit Frage 1,
// damit der Zeitraum ohne Tippen dasteht. Ist die Karte trotzdem höher als der
// Bildschirm (1e am kleinen Handy), kleben Zuschlagszeile und Ja/Nein unten
// über der Leiste (--leiste-hoehe), und ein Verlauf mit „Bitte weiterlesen“
// zeigt, dass die Frage darunter weitergeht. Bei 1a klebt nichts: Dort steht
// die Liste zum Lesen vor Ja und Nein.

export const FEHLER_GROESSE = `Bitte gib deine Größe in cm ein, zwischen ${GROESSE_MIN} und ${GROESSE_MAX}.`;
export const FEHLER_GEWICHT = `Bitte gib dein Gewicht in kg ein, zwischen ${GEWICHT_MIN} und ${GEWICHT_MAX}.`;

export const groesseGueltig = (text) => {
  const zahl = groesseAlsZahl(text);
  return zahl !== null && zahl >= GROESSE_MIN && zahl <= GROESSE_MAX;
};
export const gewichtGueltig = (text) => {
  const zahl = gewichtAlsZahl(text);
  return zahl !== null && zahl >= GEWICHT_MIN && zahl <= GEWICHT_MAX;
};

// Eine Zeile: „Frage 1b · 2 von 12“.
function Ueberschrift({ index, ueberschriftRef, children }) {
  return (
    <h2 ref={ueberschriftRef} tabIndex={-1} className="font-display text-xl font-extrabold leading-tight text-home-midnight outline-none">
      {children}
      <span className="sr-only">, </span>
      <span className="ml-2 whitespace-nowrap text-base font-bold text-emerald-900">
        <span aria-hidden="true">· </span>
        {index} von {FRAGEN_ANZAHL}
      </span>
    </h2>
  );
}

// Bei 1a steht der Stamm von Frage 1 voll da. Bei 1b bis 1k nur noch als
// Aufklappzeile mit dem wortgleichen Anfang (Frank-Blick 16.10.2026: schlank).
function FrageEinsText({ aufklappbarBeiWenigHoehe = false, nurAufklappbar = false }) {
  if (nurAufklappbar) {
    return (
      <Aufklapper titel={<span className="[hyphens:manual]">{FRAGE_1_AUFKLAPPEN}</span>}>
        <p className="text-home-slate">„{FRAGE_1_TEXT}“</p>
      </Aufklapper>
    );
  }
  const voll = (
    <p className={cx('border-l-4 border-slate-300 pl-3 text-base leading-6 text-home-slate', aufklappbarBeiWenigHoehe && '[@media(max-height:640px)]:hidden')}>
      <span className="font-bold text-home-midnight">Frage 1: </span>
      „{FRAGE_1_TEXT}“
    </p>
  );
  if (!aufklappbarBeiWenigHoehe) return voll;
  return (
    <>
      {voll}
      {/* Ohne Silbentrennung, damit der zitierte Anfang lesbar bleibt. */}
      <Aufklapper titel={<span className="[hyphens:manual]">{FRAGE_1_AUFKLAPPEN}</span>} className="hidden [@media(max-height:640px)]:block">
        <p className="text-home-slate">„{FRAGE_1_TEXT}“</p>
      </Aufklapper>
    </>
  );
}

// Antwort aus dem Gespräch mit Nita, nur zur Erinnerung. Ausgewählt ist
// nichts: Verbindlich ist, was der Kunde hier selbst antippt.
export function telefonText(antwort) {
  if (antwort === 'ja') return 'Am Telefon hast du Ja gesagt.';
  if (antwort === 'nein') return 'Am Telefon hast du Nein gesagt.';
  return null;
}

function TelefonHinweis({ antwort }) {
  const text = telefonText(antwort);
  if (!text) return null;
  return <p data-telefon="" className="mb-1 text-base leading-6 text-emerald-900">{text}</p>;
}

const EINBLENDEN = 'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200';
const KARTE = 'rounded-[1.4rem] border-2 border-slate-400 bg-white px-3 pt-3 sm:px-4 sm:pt-4';

// Zuschlagszeile und Ja/Nein am Ende der Fragekarte. Klebt die Zeile (Text
// läuft darunter weiter), deckt ein weißer Streifen (shadow) den Spalt zur
// Leiste ab, damit dort kein Text durchscheint. Ohne Kleben bliebe er unter
// der Karte sichtbar. Bei 1a klebt sie nicht (kleben false): Die Liste der
// Erkrankungen soll ganz zu lesen sein, Ja und Nein folgen direkt darunter.
function JaNeinZeile({
  zeileRef, ueberdeckt, frageId, wert, zuschlag, beantworte, gesperrt, fehler, kleben = true, telefon,
}) {
  const fehlerId = `fehler-frage${frageId}`;
  return (
    <div
      ref={kleben ? zeileRef : undefined}
      data-janein=""
      className={cx(
        '-mx-3 bg-white px-3 pb-3 pt-2 sm:-mx-4 sm:px-4 sm:pb-4',
        kleben && 'sticky bottom-[calc(var(--leiste-hoehe,0px)_+_0.5rem)] z-10',
        ueberdeckt ? 'shadow-[0_0.5rem_0_0_#fff]' : 'rounded-b-[1.3rem]',
      )}
    >
      {ueberdeckt && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-full flex h-16 items-end justify-center bg-gradient-to-t from-white via-white/95 to-white/0">
          <span className="inline-flex items-center gap-1 text-base font-semibold text-emerald-900">
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
            Bitte weiterlesen
          </span>
        </div>
      )}
      <FehlerText id={fehlerId}>{fehler}</FehlerText>
      <TelefonHinweis antwort={telefon} />
      <p className="text-base leading-6 text-home-slate">{zuschlag}</p>
      <div role="group" aria-labelledby={`frage-${frageId}-text`} className="mt-2 grid grid-cols-2 gap-3">
        {['ja', 'nein'].map((antwort) => {
          const aktiv = wert === antwort;
          return (
            <button
              key={antwort}
              id={antwort === 'ja' ? `feld-frage${frageId}` : undefined}
              type="button"
              aria-pressed={aktiv}
              aria-disabled={gesperrt || undefined}
              aria-describedby={fehler ? fehlerId : undefined}
              onClick={() => beantworte(frageId, antwort)}
              className={cx(
                FOKUS,
                'inline-flex min-h-14 min-w-0 items-center justify-center gap-2 rounded-full border-2 px-4 font-display text-lg font-extrabold transition',
                aktiv ? 'border-emerald-700 bg-home-mint text-home-midnight' : 'border-slate-500 bg-white text-home-midnight [@media(hover:hover)]:hover:border-home-midnight',
                gesperrt && 'pointer-events-none',
              )}
            >
              {aktiv && <Check className="h-5 w-5" strokeWidth={3} aria-hidden="true" />}
              {antwort === 'ja' ? 'Ja' : 'Nein'}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function StepFragen({
  daten, set, index, fehler, ueberschriftRef, karteRef, beantworte, gesperrt, weiter, telefon = null,
}) {
  const [beruehrt, setBeruehrt] = useState({});
  const [ueberdeckt, setUeberdeckt] = useState(false);
  const frageTextRef = useRef(null);
  const jaNeinZeileRef = useRef(null);

  // Läuft der Fragetext unter der klebenden Ja/Nein-Zeile weiter? Dann zeigt
  // ein Verlauf über der Zeile, dass es weitergeht.
  useEffect(() => {
    const text = frageTextRef.current;
    const zeile = jaNeinZeileRef.current;
    if (!text || !zeile) {
      setUeberdeckt(false);
      return undefined;
    }
    let rahmen = 0;
    const messen = () => {
      rahmen = 0;
      setUeberdeckt(text.getBoundingClientRect().bottom > zeile.getBoundingClientRect().top + 1);
    };
    const planen = () => { if (!rahmen) rahmen = window.requestAnimationFrame(messen); };
    messen();
    window.addEventListener('scroll', planen, { passive: true });
    window.addEventListener('resize', planen);
    return () => {
      window.cancelAnimationFrame(rahmen);
      window.removeEventListener('scroll', planen);
      window.removeEventListener('resize', planen);
    };
  }, [index]);

  const zeile = {
    zeileRef: jaNeinZeileRef, ueberdeckt, beantworte, gesperrt,
  };

  if (index === FRAGE_INDEX_1A) {
    // Kreuze nur bei „ja“. Die Liste steht als Text in der Karte, die
    // Ankreuzkarten erst nach „Ja“ darunter.
    const setzeKreuz = (id, an) => set((alt) => {
      const ohne = alt.kreuze1a.filter((eintrag) => eintrag !== id);
      return { kreuze1a: an ? [...ohne, id] : ohne };
    });
    const beschrieben = fehler.kreuze1a ? 'fehler-kreuze1a' : undefined;

    return (
      <div className="space-y-3">
        <Ueberschrift index={1} ueberschriftRef={ueberschriftRef}>Frage 1a</Ueberschrift>
        <FrageEinsText />
        <div key="1a" ref={karteRef} data-fehlerblock="" className={cx(KARTE, EINBLENDEN)}>
          <ul id="frage-1a-text" className="mb-1 space-y-1 text-base font-semibold leading-6 text-home-midnight sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0">
            {FRAGE_1A_ITEMS.map((item) => (
              <li key={item.id} className="flex gap-2">
                <span aria-hidden="true" className="mt-[0.5625rem] h-1.5 w-1.5 shrink-0 rounded-full bg-home-midnight" />
                <span className={cx('min-w-0 break-words', TRENNUNG)}>{item.label}</span>
              </li>
            ))}
          </ul>
          <JaNeinZeile
            {...zeile}
            kleben={false}
            frageId="1a"
            telefon={telefon?.antwort1a}
            wert={daten.antwort1a}
            zuschlag={`Bei „ja“: je zutreffender Erkrankung ${ZUSCHLAG_PRO_KREUZ_1A} % Beitragszuschlag.`}
            fehler={fehler.frage1a}
          />
        </div>
        {daten.antwort1a === 'ja' && (
          <Gruppe
            legend="Bitte ankreuzen, was zutrifft."
            fehlerId="fehler-kreuze1a"
            error={fehler.kreuze1a}
            className={cx('scroll-mt-4 pt-2', EINBLENDEN)}
          >
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {FRAGE_1A_ITEMS.map((item, stelle) => (
                <OptionCard
                  key={item.id}
                  id={stelle === 0 ? 'feld-kreuze1a' : undefined}
                  kompakt
                  type="checkbox"
                  name={`frage-1a-${item.id}`}
                  checked={daten.kreuze1a.includes(item.id)}
                  onChange={(event) => setzeKreuz(item.id, event.target.checked)}
                  describedBy={beschrieben}
                  invalid={Boolean(fehler.kreuze1a)}
                >
                  {item.label}
                </OptionCard>
              ))}
            </div>
          </Gruppe>
        )}
      </div>
    );
  }

  const frage = jaNeinFrageAmIndex(index);
  if (frage) {
    return (
      <div className="space-y-3">
        <Ueberschrift index={index} ueberschriftRef={ueberschriftRef}>Frage {frage.id}</Ueberschrift>
        <FrageEinsText nurAufklappbar />
        <div key={frage.id} ref={karteRef} className={cx(KARTE, EINBLENDEN)}>
          <p ref={frageTextRef} id={`frage-${frage.id}-text`} className={cx('break-words text-lg font-semibold leading-7 text-home-midnight', TRENNUNG)}>
            {frage.id.slice(1)}) {frage.text}
          </p>
          <JaNeinZeile
            {...zeile}
            frageId={frage.id}
            telefon={telefon?.antworten?.[frage.id]}
            wert={daten.antworten[frage.id]}
            zuschlag={`Bei „ja“: ${frage.prozent} % Beitragszuschlag.`}
          />
        </div>
      </div>
    );
  }

  if (index !== FRAGE_INDEX_GROESSE) return null;

  const beruehre = (feld) => setBeruehrt((alt) => ({ ...alt, [feld]: true }));
  const groesseFehler = fehler.groesse
    || (beruehrt.groesse && daten.groesse !== '' && !groesseGueltig(daten.groesse) ? FEHLER_GROESSE : null);
  const gewichtFehler = fehler.gewicht
    || (beruehrt.gewicht && daten.gewicht !== '' && !gewichtGueltig(daten.gewicht) ? FEHLER_GEWICHT : null);

  return (
    <div className="space-y-4">
      <Ueberschrift index={FRAGEN_ANZAHL} ueberschriftRef={ueberschriftRef}>Frage 2: {FRAGE_2_TEXT}</Ueberschrift>
      {telefon?.groesse && telefon?.gewicht && (
        <p data-telefon="" className="text-base leading-6 text-emerald-900">
          Am Telefon hast du {telefon.groesse} cm und {telefon.gewicht} kg genannt.
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Field id="feld-groesse" label="Größe in cm" error={groesseFehler}>
          <input
            {...fieldAria('feld-groesse', { error: groesseFehler })}
            type="text"
            inputMode="decimal"
            enterKeyHint="next"
            autoComplete="off"
            maxLength={5}
            placeholder="z. B. 172"
            value={daten.groesse}
            onBlur={() => { beruehre('groesse'); set({ groesse: groesseEingabeBereinigt(daten.groesse) }); }}
            onChange={(event) => set({ groesse: event.target.value.replace(/[^0-9.,]/g, '').slice(0, 5) })}
            onKeyDown={(event) => {
              if (event.key !== 'Enter') return;
              event.preventDefault();
              document.getElementById('feld-gewicht')?.focus();
            }}
            className={eingabeKlasse}
          />
        </Field>
        <Field id="feld-gewicht" label="Gewicht in kg" error={gewichtFehler}>
          <input
            {...fieldAria('feld-gewicht', { error: gewichtFehler })}
            type="text"
            inputMode="decimal"
            enterKeyHint="done"
            autoComplete="off"
            maxLength={5}
            placeholder="z. B. 68"
            value={daten.gewicht}
            onBlur={() => { beruehre('gewicht'); set({ gewicht: gewichtEingabeBereinigt(daten.gewicht) }); }}
            onChange={(event) => set({ gewicht: event.target.value.replace(/[^0-9.,]/g, '').slice(0, 5) })}
            onKeyDown={(event) => {
              if (event.key !== 'Enter') return;
              event.preventDefault();
              event.currentTarget.blur();
              weiter();
            }}
            className={eingabeKlasse}
          />
        </Field>
      </div>
    </div>
  );
}
