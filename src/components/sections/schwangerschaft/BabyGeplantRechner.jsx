import React, { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import {
  berechne, formatiereDatum, heuteAlsDatum, optionSchluessel, optionen, planungsText,
} from '@/lib/babyGeplantRechner';

/**
 * Stichtagsrechner auf /schwangerschaft/baby-geplant (Seitenplan Abschnitt 4).
 * Alle Texte kommen aus der Inhaltsdatei (texte).
 *
 * Datenschutz: Die Auswahl lebt nur im Zustand dieser Komponente. Es gibt keine
 * Speicherung, keine Anfrage und kein Ereignis mit Auswahl oder Ergebnis. Die
 * Abschlussknöpfe kommen von der Seite (Slots), ohne die Auswahl am Link.
 */

const Wahlkachel = ({ name, option, gewaehlt, onChange }) => (
  <label
    className={`relative flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-base font-semibold leading-6 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#25c990]/40 ${gewaehlt ? 'border-[#076046] bg-[#e7f8f0] text-[#064b3d]' : 'border-slate-300 bg-white text-[#07111f] hover:border-[#07111f]'}`}
  >
    <input type="radio" name={name} value={option.schluessel} checked={gewaehlt} onChange={() => onChange(option.schluessel)} className="sr-only" />
    <span aria-hidden="true" className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${gewaehlt ? 'border-[#076046] bg-[#076046] text-white' : 'border-slate-400 bg-white'}`}>
      {gewaehlt ? <Check className="h-4 w-4" /> : null}
    </span>
    <span className="min-w-0 flex-1">{option.text}</span>
  </label>
);

const Zeile = ({ label, wert, stark = false }) => (
  <div className="border-b border-white/15 py-3 last:border-b-0">
    <dt className={`text-base leading-6 ${stark ? 'font-bold text-white' : 'text-[#d5e2e7]'}`}>{label}</dt>
    <dd className={`mt-1 font-display font-extrabold ${stark ? 'text-2xl text-[#8ee7ca] sm:text-3xl' : 'text-xl text-white'}`}>{wert}</dd>
  </div>
);

const Ergebniskarte = ({ id, texte, zeilen, knopf }) => (
  <section data-baby-ergebnis={id} aria-labelledby={`baby-ergebnis-${id}`} className="flex h-full flex-col rounded-[1.75rem] bg-[#07182a] p-5 text-white shadow-[0_24px_60px_rgba(7,17,31,0.18)] sm:p-7">
    <div className="flex items-center gap-3">
      <FriendlyIcon kind="hospital" tone="mint" size="md" className="shrink-0" />
      <h3 id={`baby-ergebnis-${id}`} className="font-display text-xl font-extrabold leading-snug text-white">{texte.kopf}</h3>
    </div>
    <dl className="mt-4">
      {zeilen.map((zeile) => <Zeile key={zeile.label} {...zeile} />)}
    </dl>
    <p className="mt-4 text-base leading-6 text-[#d5e2e7]">{texte.familienzimmer}</p>
    <p className="mt-3 flex-1 text-base leading-6 text-[#bdced6]">{texte.beitrag}</p>
    <div className="mt-6 flex">{knopf}</div>
  </section>
);

const BabyGeplantRechner = ({
  texte, knopfBayerische = null, knopfSdk = null, abschluss = null, heute = null,
}) => {
  const [heuteDatum] = useState(() => heute || heuteAlsDatum());
  const wahl = useMemo(() => optionen(heuteDatum).map((datum) => ({ datum, schluessel: optionSchluessel(datum), text: formatiereDatum(datum) })), [heuteDatum]);
  // Vorwahl: erste Option. Aus dem Zustand dieser Komponente, nie aus Adresse oder Speicher.
  const [gewaehlt, setGewaehlt] = useState(() => optionSchluessel(optionen(heute || heuteAlsDatum())[0]));
  const aktuell = wahl.find((option) => option.schluessel === gewaehlt) || null;
  const ergebnis = aktuell ? berechne(aktuell.datum, heuteDatum) : null;

  const { ergebnis: textErgebnis, planung, pflichtsaetze } = texte;
  const bayerischeZeilen = ergebnis ? [
    { label: textErgebnis.bayerische.wartezeit, wert: formatiereDatum(ergebnis.bayerische.wartezeitBis) },
    { label: textErgebnis.bayerische.entbindung, wert: formatiereDatum(ergebnis.bayerische.entbindungAb), stark: true },
    { label: textErgebnis.bayerische.baby, wert: formatiereDatum(ergebnis.bayerische.babyAb) },
  ] : [];
  const sdkZeilen = ergebnis ? [
    { label: textErgebnis.sdk.wartezeit, wert: textErgebnis.sdk.wartezeitWert },
    { label: textErgebnis.sdk.entbindung, wert: formatiereDatum(ergebnis.sdk.entbindungAb), stark: true },
    { label: textErgebnis.sdk.baby, wert: formatiereDatum(ergebnis.sdk.babyAb) },
  ] : [];

  return (
    <div id="rechner-karte" className="mx-auto max-w-4xl">
      <div className="text-center">
        <FriendlyIcon kind="calendar" tone="mint" size="lg" className="mx-auto" />
        <h2 id="rechner-heading" className="mt-4 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{texte.ueberschrift}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{texte.intro}</p>
      </div>

      {/* Kein Formular: Es wird nichts abgeschickt, der Rechner rechnet live im Browser. */}
      <div role="group" aria-labelledby="rechner-heading" className="mx-auto mt-8 max-w-3xl rounded-[1.75rem] border border-emerald-100 bg-white p-5 shadow-sm sm:p-8">
        <fieldset>
          <legend className="text-base font-bold leading-6 text-[#07111f]">{texte.feld.label}</legend>
          <p id="baby-beginn-hilfe" className="mt-1 text-base leading-6 text-slate-600">{texte.feld.hilfe}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-describedby="baby-beginn-hilfe">
            {wahl.map((option) => (
              <Wahlkachel key={option.schluessel} name="baby-geplant-beginn" option={option} gewaehlt={gewaehlt === option.schluessel} onChange={setGewaehlt} />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Ergebnis erscheint live und wird für Vorleser angekündigt */}
      <div role="status" aria-live="polite" aria-atomic="true" className="mt-6">
        {ergebnis && (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <Ergebniskarte id="bayerische" texte={textErgebnis.bayerische} zeilen={bayerischeZeilen} knopf={knopfBayerische} />
              <Ergebniskarte id="sdk" texte={textErgebnis.sdk} zeilen={sdkZeilen} knopf={knopfSdk} />
            </div>
            <p className="mt-3 text-center text-base leading-6 text-slate-600">{textErgebnis.hinweisKnoepfe}</p>
            <section data-baby-planung aria-labelledby="baby-planung-heading" className="mt-6 rounded-2xl border border-emerald-100 bg-[#f4faf7] p-5 sm:p-6">
              <h3 id="baby-planung-heading" className="font-display text-lg font-extrabold text-slate-950">{planung.ueberschrift}</h3>
              <p className="mt-2 text-base leading-7 text-slate-700">{planungsText(planung.text, ergebnis)}</p>
            </section>
          </>
        )}
      </div>

      {/* Pflichtsätze: immer sichtbar, nie zugeklappt */}
      <ul data-baby-pflichtsaetze className="mt-5 space-y-2 text-base leading-6 text-slate-600">
        <li>{pflichtsaetze.p1}</li>
        <li>{pflichtsaetze.p2}</li>
        <li>{pflichtsaetze.p3}</li>
        <li>{pflichtsaetze.p4}</li>
      </ul>

      {abschluss}
    </div>
  );
};

export default BabyGeplantRechner;
