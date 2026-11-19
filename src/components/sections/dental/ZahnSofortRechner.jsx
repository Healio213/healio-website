import React, { useEffect, useId, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { BEGINNJAHR_ANTEILIG, berechneZahnSofort, formatEuro, vorwahlBeginnMonat } from '@/lib/zahnSofortRechner';

/**
 * Rechner „Heil- und Kostenplan nachrechnen“ auf /zahn/behandlung-steht-an
 * (Seitenplan Abschnitt 4). Alle Texte kommen aus der Inhaltsdatei (texte).
 *
 * Datenschutz: Die Eingaben leben nur im Zustand dieser Komponente. Es gibt
 * keine Speicherung, keine Anfrage und kein Ereignis mit Eingaben oder
 * Ergebnissen. Die Abschlussknöpfe kommen von der Seite (Slot „abschluss“).
 */

const eingabeKlasse = 'block min-h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 pr-16 text-lg font-semibold text-[#07111f] placeholder:text-slate-400 transition focus:border-[#25c990] focus:outline-none focus:ring-4 focus:ring-[#25c990]/25 aria-[invalid=true]:border-[#c2412d]';

const ersetze = (text, werte) => Object.entries(werte).reduce((rest, [schluessel, wert]) => rest.replaceAll(`{${schluessel}}`, wert), text);

const BetragFeld = ({ id, label, hilfe, wert, onChange, fehler, hinweisId }) => (
  <div>
    <label htmlFor={id} className="block text-base font-bold leading-6 text-[#07111f]">{label}</label>
    <p id={`${id}-hilfe`} className="mt-1 text-base leading-6 text-slate-600">{hilfe}</p>
    <div className="relative mt-2">
      <input
        id={id}
        type="text"
        inputMode="decimal"
        enterKeyHint="done"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        value={wert}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={fehler ? 'true' : undefined}
        aria-describedby={[`${id}-hilfe`, fehler ? `${id}-fehler` : null, hinweisId].filter(Boolean).join(' ')}
        className={eingabeKlasse}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-base font-bold text-slate-500">EUR</span>
    </div>
    {fehler ? <p id={`${id}-fehler`} role="alert" className="mt-2 text-base font-semibold leading-6 text-[#b3361f]">{fehler}</p> : null}
  </div>
);

const Wahlkachel = ({ name, option, gewaehlt, onChange, kompakt = false }) => (
  <label
    className={`relative flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-base font-semibold leading-6 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#25c990]/40 ${gewaehlt ? 'border-[#076046] bg-[#e7f8f0] text-[#064b3d]' : 'border-slate-300 bg-white text-[#07111f] hover:border-[#07111f]'} ${kompakt ? '' : 'justify-center text-center'}`}
  >
    <input type="radio" name={name} value={option.value} checked={gewaehlt} onChange={() => onChange(option.value)} className="sr-only" />
    <span aria-hidden="true" className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${gewaehlt ? 'border-[#076046] bg-[#076046] text-white' : 'border-slate-400 bg-white'}`}>
      {gewaehlt ? <Check className="h-4 w-4" /> : null}
    </span>
    <span className="min-w-0 flex-1">{option.label}</span>
  </label>
);

const Zeile = ({ label, wert, stark = false, eingerueckt = false }) => (
  <div className={`flex items-baseline justify-between gap-4 border-b border-white/15 py-3 last:border-b-0 ${eingerueckt ? 'pl-4' : ''}`}>
    <dt className={`min-w-0 text-base leading-6 ${stark ? 'font-bold text-white' : 'text-[#d5e2e7]'}`}>{label}</dt>
    <dd className={`shrink-0 whitespace-nowrap text-right font-display font-extrabold ${stark ? 'text-2xl text-[#8ee7ca] sm:text-3xl' : 'text-xl text-white'}`}>{wert}</dd>
  </div>
);

const ZahnSofortRechner = ({ texte, abschluss = null }) => {
  const basisId = useId();
  const [gesamt, setGesamt] = useState('');
  const [kasse, setKasse] = useState('');
  const [tarif, setTarif] = useState('komfort');
  const [art, setArt] = useState('unbekannt');
  const [vorsorge, setVorsorge] = useState(false);
  // Der Vorschlag hängt vom heutigen Monat ab und wird deshalb erst im Browser gesetzt.
  const [beginnMonat, setBeginnMonat] = useState(1);
  useEffect(() => { setBeginnMonat(vorwahlBeginnMonat()); }, []);

  const ergebnis = useMemo(
    () => berechneZahnSofort({ gesamt, kasse, tarif, art, vorsorge, beginnMonat }),
    [gesamt, kasse, tarif, art, vorsorge, beginnMonat],
  );

  const { felder, hinweise, ergebnis: textErgebnis, pflichtsaetze } = texte;
  const zeigeArt = tarif === 'komfort';
  const zeigeVorsorge = zeigeArt && (art === 'hoeher' || art === 'unbekannt');
  const anteilig = BEGINNJAHR_ANTEILIG;

  let gesamtFehler = null;
  let kasseFehler = null;
  let hinweis = null;
  if (!ergebnis.ok) {
    if (ergebnis.gesamt === 'ungueltig') gesamtFehler = hinweise.betragPruefen;
    else if (ergebnis.gesamt === 'leer') hinweis = hinweise.gesamtLeer;
    else if (ergebnis.kasse === 'ungueltig') kasseFehler = hinweise.betragPruefen;
    else if (ergebnis.kasse === 'zuHoch') kasseFehler = hinweise.kasseZuHoch;
    else if (ergebnis.kasse === 'leer') hinweis = hinweise.kasseLeer;
  }

  const tarifName = ergebnis.tarifName;
  const beitraege = textErgebnis.beitraege[ergebnis.tarif || tarif];
  const notiz = ergebnis.ok
    ? (ergebnis.kasseZahltAlles ? hinweise.kasseZahltAlles : (ergebnis.tarifDeckt ? ersetze(hinweise.tarifDeckt, { Tarifname: tarifName }) : null))
    : null;

  return (
    <div id="rechner-karte" className="mx-auto max-w-3xl">
      <div className="text-center">
        <FriendlyIcon kind="calculator" tone="mint" size="lg" className="mx-auto" />
        <h2 id="rechner-heading" className="mt-4 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{texte.ueberschrift}</h2>
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{texte.intro}</p>
      </div>

      {/* Kein Formular: Es wird nichts abgeschickt, der Rechner rechnet live im Browser. */}
      <div
        role="group"
        aria-labelledby="rechner-heading"
        className="mt-8 space-y-6 rounded-[1.75rem] border border-emerald-100 bg-white p-5 shadow-sm sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <BetragFeld
            id={`${basisId}-gesamt`}
            label={felder.gesamt.label}
            hilfe={felder.gesamt.hilfe}
            wert={gesamt}
            onChange={setGesamt}
            fehler={gesamtFehler}
          />
          <BetragFeld
            id={`${basisId}-kasse`}
            label={felder.kasse.label}
            hilfe={felder.kasse.hilfe}
            wert={kasse}
            onChange={setKasse}
            fehler={kasseFehler}
          />
        </div>

        <fieldset>
          <legend className="text-base font-bold leading-6 text-[#07111f]">{felder.tarif.label}</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {felder.tarif.optionen.map((option) => (
              <Wahlkachel key={option.value} name={`${basisId}-tarif`} option={option} gewaehlt={tarif === option.value} onChange={setTarif} />
            ))}
          </div>
        </fieldset>

        {zeigeArt && (
          <fieldset>
            <legend className="text-base font-bold leading-6 text-[#07111f]">{felder.art.label}</legend>
            <div className="mt-3 grid gap-3">
              {felder.art.optionen.map((option) => (
                <Wahlkachel key={option.value} name={`${basisId}-art`} option={option} gewaehlt={art === option.value} onChange={setArt} kompakt />
              ))}
            </div>
          </fieldset>
        )}

        {zeigeVorsorge && (
          <div>
            <label className="flex min-h-14 cursor-pointer items-start gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-semibold leading-6 text-[#07111f] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#25c990]/40">
              <input
                type="checkbox"
                checked={vorsorge}
                onChange={(event) => setVorsorge(event.target.checked)}
                aria-describedby={`${basisId}-vorsorge-hilfe`}
                className="mt-0.5 h-6 w-6 shrink-0 accent-[#076046]"
              />
              <span>{felder.vorsorge.label}</span>
            </label>
            <p id={`${basisId}-vorsorge-hilfe`} className="mt-2 text-base leading-6 text-slate-600">{felder.vorsorge.hilfe}</p>
          </div>
        )}

        {anteilig && (
          <div>
            <label htmlFor={`${basisId}-monat`} className="block text-base font-bold leading-6 text-[#07111f]">{felder.beginnMonat.label}</label>
            <p id={`${basisId}-monat-hilfe`} className="mt-1 text-base leading-6 text-slate-600">{felder.beginnMonat.hilfe}</p>
            <select
              id={`${basisId}-monat`}
              value={beginnMonat}
              onChange={(event) => setBeginnMonat(Number(event.target.value))}
              aria-describedby={`${basisId}-monat-hilfe`}
              className="mt-2 block min-h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-lg font-semibold text-[#07111f] focus:border-[#25c990] focus:outline-none focus:ring-4 focus:ring-[#25c990]/25 sm:max-w-xs"
            >
              {felder.beginnMonat.monate.map((name, index) => <option key={name} value={index + 1}>{name}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Ergebnis erscheint live und wird für Vorleser angekündigt */}
      <div role="status" aria-live="polite" aria-atomic="true" className="mt-6">
        {hinweis && <p className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base leading-7 text-slate-700">{hinweis}</p>}
        {ergebnis.ok && (
          <section data-zahn-ergebnis aria-label={ersetze(textErgebnis.kopf, { Tarifname: tarifName })} className="rounded-[1.75rem] bg-[#07182a] p-5 text-white shadow-[0_24px_60px_rgba(7,17,31,0.18)] sm:p-8">
            <h3 className="font-display text-xl font-extrabold leading-snug text-white sm:text-2xl">{ersetze(textErgebnis.kopf, { Tarifname: tarifName })}</h3>
            <dl className="mt-4">
              <Zeile label={textErgebnis.kasse} wert={formatEuro(ergebnis.kasse)} />
              {ergebnis.zweiJahre ? (
                <>
                  <Zeile label={textErgebnis.sofortEinJahr} wert={formatEuro(ergebnis.sofort1)} />
                  <Zeile label={textErgebnis.sofortZweiJahre} wert={formatEuro(ergebnis.sofort2)} />
                </>
              ) : (
                <Zeile label={textErgebnis.sofortEinzeln} wert={formatEuro(ergebnis.sofort1)} />
              )}
              <Zeile label={textErgebnis.bleibt} wert={formatEuro(ergebnis.bleibt1)} stark />
              {ergebnis.zweiJahre && <Zeile label={textErgebnis.bleibtZweiJahre} wert={formatEuro(ergebnis.bleibt2)} stark eingerueckt />}
            </dl>
            {notiz && <p className="mt-4 rounded-xl bg-white/10 px-4 py-3 text-base font-semibold leading-6 text-white">{notiz}</p>}
            <p className="mt-5 text-base leading-6 text-[#d5e2e7]">{textErgebnis.kosten}</p>
            <p className="mt-3 text-base leading-6 text-[#bdced6]">
              {ersetze(textErgebnis.vergleich, { Tarifname: tarifName, Stadt: beitraege.stadt, Land: beitraege.land })}
            </p>
          </section>
        )}
      </div>

      {/* Pflichtsätze: immer sichtbar, nie zugeklappt */}
      <ul data-zahn-pflichtsaetze className="mt-5 space-y-2 text-base leading-6 text-slate-600">
        <li>{pflichtsaetze.p1}</li>
        <li>{pflichtsaetze.p2}</li>
        <li>{pflichtsaetze.p3}</li>
        <li>{pflichtsaetze.p4}</li>
        {anteilig && <li>{pflichtsaetze.p5}</li>}
      </ul>

      {abschluss}
    </div>
  );
};

export default ZahnSofortRechner;
