import React, { useMemo, useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import {
  GRENZEN, OSTEOPATHIE_KASSEN, BEHANDLER_VORWAHL, beitragsZeile, berechneOsteopathie, formatiereEuro,
  fuelleText, heuteAlsDatum, kassenHinweis, kassenlisteSichtbar,
} from '@/lib/osteopathieRechner';
import { SDK_AMBULANT_BEITRAEGE, parseGeburtsjahr } from '@/data/sdkAmbulantBeitraege';

/**
 * Rechner „Kasse plus Tarif“ auf /ambulant/osteopathie (Seitenplan Abschnitt 4).
 * Alle Texte kommen aus der Inhaltsdatei (texte).
 *
 * Datenschutz: Alle Eingaben leben nur im Zustand dieser Komponente. Es gibt
 * keine Speicherung, keine Anfrage und kein Ereignis mit Eingaben oder Ergebnis.
 * Die Stufe gehört der Seite (React-Zustand, nicht gespeichert). Der
 * Abschlussknopf und die Links kommen von der Seite (Slots).
 */

const FELD = 'block min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-[#07111f] placeholder:text-slate-400 transition focus:border-[#076046] focus:outline-none focus:ring-4 focus:ring-[#25c990]/30 aria-[invalid=true]:border-[#c2412d] aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#c2412d]/30 md:min-h-14';

/** Auswahlkachel (Radio) für Behandler und Stufe; auch von der Stufenwahl der Seite genutzt. */
export const Wahlkachel = ({ name, option, gewaehlt, onChange }) => (
  <label
    className={`relative flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-base font-semibold leading-6 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#25c990]/40 ${gewaehlt ? 'border-[#076046] bg-[#e7f8f0] text-[#064b3d]' : 'border-slate-300 bg-white text-[#07111f] hover:border-[#07111f]'}`}
  >
    <input type="radio" name={name} value={option.wert} checked={gewaehlt} onChange={() => onChange(option.wert)} className="sr-only" />
    <span aria-hidden="true" className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${gewaehlt ? 'border-[#076046] bg-[#076046] text-white' : 'border-slate-400 bg-white'}`}>
      {gewaehlt ? <Check className="h-4 w-4" /> : null}
    </span>
    <span className="min-w-0 flex-1">{option.text}</span>
  </label>
);

const Fehler = ({ id, text }) => (text ? <p id={id} role="alert" className="mt-2 text-sm font-semibold text-[#c2412d]">{text}</p> : null);

const Zahlenfeld = ({
  id, label, hilfe, wert, onChange, grenze, fehler, fehlerText, autoComplete = 'off',
}) => (
  <div>
    <label htmlFor={id} className="text-base font-bold leading-6 text-[#07111f]">{label}</label>
    {hilfe ? <p id={`${id}-hilfe`} className="mt-1 text-base leading-6 text-slate-600">{hilfe}</p> : null}
    <input
      id={id}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete={autoComplete}
      value={wert}
      onChange={(event) => onChange(event.target.value)}
      aria-invalid={fehler ? 'true' : undefined}
      aria-describedby={[hilfe ? `${id}-hilfe` : null, fehler ? `${id}-fehler` : null].filter(Boolean).join(' ') || undefined}
      min={grenze?.min}
      max={grenze?.max}
      className={`mt-2 ${FELD}`}
    />
    <Fehler id={`${id}-fehler`} text={fehler ? fehlerText : null} />
  </div>
);

const parseZahl = (text) => (/^\d{1,4}$/.test(String(text).trim()) ? Number(String(text).trim()) : null);
const imBereich = (zahl, grenze) => zahl !== null && zahl >= grenze.min && zahl <= grenze.max;

const Ergebniszeile = ({
  motiv, titel, betrag, children, hervorgehoben = false, daten,
}) => (
  <section data-osteo-zeile={daten} className={`flex gap-4 rounded-[1.5rem] p-5 sm:p-6 ${hervorgehoben ? 'bg-[#07182a] text-white shadow-[0_24px_60px_rgba(7,17,31,0.18)]' : 'border border-emerald-100 bg-white shadow-sm'}`}>
    <FriendlyIcon kind={motiv} tone="mint" size="md" className="shrink-0" />
    <div className="min-w-0 flex-1">
      <h3 className={`font-display text-base font-bold leading-snug ${hervorgehoben ? 'text-white' : 'text-slate-950'}`}>{titel}</h3>
      <p className={`mt-1 break-words font-display text-2xl font-extrabold leading-tight sm:text-3xl ${hervorgehoben ? 'text-[#8ee7ca]' : 'text-[#076046]'}`}>{betrag}</p>
      <div className={`mt-2 text-base leading-6 ${hervorgehoben ? 'text-[#d5e2e7]' : 'text-slate-600'}`}>{children}</div>
    </div>
  </section>
);

const OsteopathieRechner = ({
  texte, stufe, onStufe, knopf = null, abschluss = null, heute = null,
}) => {
  const [heuteDatum] = useState(() => heute || heuteAlsDatum());
  const listeSichtbar = kassenlisteSichtbar(heuteDatum);

  const [kasse, setKasse] = useState('');
  const [eigenZuschuss, setEigenZuschuss] = useState(String(GRENZEN.eigenZuschuss.vorwahl));
  const [eigenSitzungen, setEigenSitzungen] = useState(String(GRENZEN.eigenSitzungen.vorwahl));
  const [behandler, setBehandler] = useState(BEHANDLER_VORWAHL);
  const [preis, setPreis] = useState(String(GRENZEN.preis.vorwahl));
  const [sitzungen, setSitzungen] = useState(String(GRENZEN.sitzungen.vorwahl));
  const [geburtsjahr, setGeburtsjahr] = useState('');

  const f = texte.felder;
  const kasseWahl = listeSichtbar ? kasse : 'eigen';
  const eigen = kasseWahl === 'eigen';

  const werte = {
    preis: parseZahl(preis),
    sitzungen: parseZahl(sitzungen),
    eigenZuschuss: eigen ? parseZahl(eigenZuschuss) : 0,
    eigenSitzungen: eigen ? parseZahl(eigenSitzungen) : 0,
  };
  const fehler = {
    preis: !imBereich(werte.preis, GRENZEN.preis),
    sitzungen: !imBereich(werte.sitzungen, GRENZEN.sitzungen),
    eigenZuschuss: eigen && !imBereich(werte.eigenZuschuss, GRENZEN.eigenZuschuss),
    eigenSitzungen: eigen && !imBereich(werte.eigenSitzungen, GRENZEN.eigenSitzungen),
  };
  const jahr = parseGeburtsjahr(geburtsjahr, heuteDatum.jahr);
  const geburtsjahrFehler = geburtsjahr.trim() !== '' && jahr === null;
  const geburtsjahrGrenze = { min: heuteDatum.jahr - 110, max: heuteDatum.jahr };

  const ergebnis = useMemo(() => berechneOsteopathie({
    kasse: eigen ? 'eigen' : (kasseWahl || null),
    eigenZuschuss: werte.eigenZuschuss,
    eigenSitzungen: werte.eigenSitzungen,
    behandler,
    preis: werte.preis,
    sitzungen: werte.sitzungen,
    stufe,
    geburtsjahr: jahr,
  }, { heute: heuteDatum }), [eigen, kasseWahl, werte.eigenZuschuss, werte.eigenSitzungen, werte.preis, werte.sitzungen, behandler, stufe, jahr, heuteDatum]);

  const aendereSitzungen = (delta) => {
    const aktuell = werte.sitzungen ?? GRENZEN.sitzungen.vorwahl;
    const neu = Math.min(GRENZEN.sitzungen.max, Math.max(GRENZEN.sitzungen.min, aktuell + delta));
    setSitzungen(String(neu));
  };

  const t = texte.ergebnis;
  const platz = (vorlage, extra = {}) => fuelleText(vorlage, { s: stufe, ...extra });

  let kasseText = null;
  if (ergebnis) {
    if (ergebnis.kasseZustand === 'keineKasse') kasseText = <p>{t.kasse.keineKasse}</p>;
    else if (ergebnis.kasseZustand === 'eigen') kasseText = <p>{t.kasse.eigen}</p>;
    else if (ergebnis.kasseZustand === 'kasse') {
      kasseText = (
        <>
          <p>{fuelleText(t.kasse.satzung, { Kasse: ergebnis.kasse.name, fundstelle: ergebnis.kasse.fundstelle, stand: ergebnis.kasse.stand })}</p>
          <p className="mt-2 text-base leading-6 text-slate-500">{ergebnis.kasse.bedingung}</p>
        </>
      );
    } else kasseText = <p>{kassenHinweis(ergebnis.kasse, ergebnis.kasseZustand, behandler)}</p>;
  }

  let tarifText = null;
  if (ergebnis) {
    if (ergebnis.tarifZustand === 'tarif') {
      tarifText = <p>{fuelleText(t.tarif.heilpraktiker, { prozent: ergebnis.tarifProzent, topf: formatiereEuro(ergebnis.topfCent) })}</p>;
    } else tarifText = <p>{behandler === 'arzt' ? t.tarif.arzt : t.tarif.physio}</p>;
  }

  const zweitesJahr = ergebnis && ergebnis.tarifZustand === 'tarif' ? fuelleText(
    ergebnis.tarifJahr2Cent === ergebnis.tarifJahr1Cent ? t.zweitesJahr.gleich : t.zweitesJahr.weniger,
    {
      T2: formatiereEuro(ergebnis.tarifJahr2Cent), E2: formatiereEuro(ergebnis.eigenJahr2Cent), topfRest: formatiereEuro(ergebnis.topfRestCent),
    },
  ) : null;

  const fehlerText = (grenze) => fuelleText(texte.fehler, { min: grenze.min, max: grenze.max });

  return (
    <div id="rechner-karte" className="mx-auto max-w-4xl">
      <div className="text-center">
        <FriendlyIcon kind="calculator" tone="mint" size="lg" className="mx-auto" />
        <h2 id="rechner-heading" className="mt-4 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{texte.ueberschrift}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{texte.intro}</p>
      </div>

      {/* Kein Formular: Es wird nichts abgeschickt, der Rechner rechnet live im Browser. */}
      <div role="group" aria-labelledby="rechner-heading" className="mx-auto mt-8 max-w-3xl space-y-6 rounded-[1.75rem] border border-emerald-100 bg-white p-5 shadow-sm sm:p-8">
        {listeSichtbar ? (
          <div>
            <label htmlFor="osteo-kasse" className="text-base font-bold leading-6 text-[#07111f]">{f.kasse.label}</label>
            <p id="osteo-kasse-hilfe" className="mt-1 text-base leading-6 text-slate-600">{f.kasse.hilfe}</p>
            <select
              id="osteo-kasse"
              value={kasse}
              onChange={(event) => setKasse(event.target.value)}
              aria-describedby="osteo-kasse-hilfe osteo-kasse-kinder"
              className={`mt-2 ${FELD}`}
            >
              <option value="">{f.kasse.platzhalter}</option>
              {OSTEOPATHIE_KASSEN.map((eintrag) => <option key={eintrag.id} value={eintrag.id}>{eintrag.name}</option>)}
              <option value="eigen">{f.kasse.eigen}</option>
            </select>
            <p id="osteo-kasse-kinder" className="mt-2 text-base leading-6 text-slate-600">{texte.hinweisErwachsene}</p>
          </div>
        ) : (
          <p data-osteo-kassenliste="ausgeblendet" className="rounded-2xl bg-[#f4faf7] p-4 text-base leading-6 text-slate-700">{texte.kassenlisteAusgeblendet}</p>
        )}

        {eigen ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Zahlenfeld
              id="osteo-eigen-zuschuss"
              label={f.eigenZuschuss.label}
              hilfe={f.eigenZuschuss.hilfe}
              wert={eigenZuschuss}
              onChange={setEigenZuschuss}
              grenze={GRENZEN.eigenZuschuss}
              fehler={fehler.eigenZuschuss}
              fehlerText={fehlerText(GRENZEN.eigenZuschuss)}
            />
            <Zahlenfeld
              id="osteo-eigen-sitzungen"
              label={f.eigenSitzungen.label}
              wert={eigenSitzungen}
              onChange={setEigenSitzungen}
              grenze={GRENZEN.eigenSitzungen}
              fehler={fehler.eigenSitzungen}
              fehlerText={fehlerText(GRENZEN.eigenSitzungen)}
            />
          </div>
        ) : null}

        <fieldset>
          <legend className="text-base font-bold leading-6 text-[#07111f]">{f.behandler.label}</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {f.behandler.optionen.map((option) => (
              <Wahlkachel key={option.wert} name="osteo-behandler" option={option} gewaehlt={behandler === option.wert} onChange={setBehandler} />
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <Zahlenfeld
            id="osteo-preis"
            label={f.preis.label}
            hilfe={f.preis.hilfe}
            wert={preis}
            onChange={setPreis}
            grenze={GRENZEN.preis}
            fehler={fehler.preis}
            fehlerText={fehlerText(GRENZEN.preis)}
          />
          <div>
            <label htmlFor="osteo-sitzungen" className="text-base font-bold leading-6 text-[#07111f]">{f.sitzungen.label}</label>
            <div className="mt-2 flex items-stretch gap-2">
              <button
                type="button"
                onClick={() => aendereSitzungen(-1)}
                aria-label={f.sitzungen.weniger}
                className="inline-flex min-h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-300 bg-white text-[#07111f] transition hover:border-[#07111f] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25c990]/40 md:min-h-14 md:w-14"
              >
                <Minus className="h-5 w-5" aria-hidden="true" />
              </button>
              <input
                id="osteo-sitzungen"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                value={sitzungen}
                onChange={(event) => setSitzungen(event.target.value)}
                aria-invalid={fehler.sitzungen ? 'true' : undefined}
                aria-describedby={fehler.sitzungen ? 'osteo-sitzungen-fehler' : undefined}
                className={`${FELD} text-center`}
              />
              <button
                type="button"
                onClick={() => aendereSitzungen(1)}
                aria-label={f.sitzungen.mehr}
                className="inline-flex min-h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-300 bg-white text-[#07111f] transition hover:border-[#07111f] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25c990]/40 md:min-h-14 md:w-14"
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <Fehler id="osteo-sitzungen-fehler" text={fehler.sitzungen ? fehlerText(GRENZEN.sitzungen) : null} />
          </div>
        </div>

        <fieldset>
          <legend className="text-base font-bold leading-6 text-[#07111f]">{f.stufe.label}</legend>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {f.stufe.optionen.map((option) => (
              <Wahlkachel key={option.wert} name="osteo-stufe" option={option} gewaehlt={stufe === option.wert} onChange={onStufe} />
            ))}
          </div>
        </fieldset>

        <Zahlenfeld
          id="osteo-geburtsjahr"
          label={f.geburtsjahr.label}
          hilfe={f.geburtsjahr.hilfe}
          wert={geburtsjahr}
          onChange={setGeburtsjahr}
          grenze={geburtsjahrGrenze}
          fehler={geburtsjahrFehler}
          fehlerText={fehlerText(geburtsjahrGrenze)}
          autoComplete="bday-year"
        />
      </div>

      {/* Ergebnis erscheint live und wird für Vorleser angekündigt */}
      <div role="status" aria-live="polite" aria-atomic="true" className="mt-6" data-osteo-ergebnis>
        {ergebnis ? (
          <div className="space-y-4">
            <p className="font-display text-lg font-extrabold leading-snug text-slate-950 sm:text-xl">
              {fuelleText(t.kopf, {
                n: werte.sitzungen, P: formatiereEuro(werte.preis * 100), R: formatiereEuro(ergebnis.rechnungCent),
              })}
            </p>
            <Ergebniszeile daten="kasse" motiv="document" titel={t.kasse.titel} betrag={fuelleText(t.kasse.betrag, { Kc: formatiereEuro(ergebnis.kasseCent) })}>
              {kasseText}
            </Ergebniszeile>
            <Ergebniszeile daten="tarif" motiv="naturopathy" titel={platz(t.tarif.titel)} betrag={fuelleText(t.tarif.betrag, { T1: formatiereEuro(ergebnis.tarifJahr1Cent) })}>
              {tarifText}
            </Ergebniszeile>
            <Ergebniszeile daten="eigen" motiv="budget" titel={t.eigenanteil.titel} betrag={formatiereEuro(ergebnis.eigenJahr1Cent)} hervorgehoben />
            {zweitesJahr ? (
              <section data-osteo-zweites-jahr aria-label={t.zweitesJahr.titel} className="rounded-2xl border border-emerald-100 bg-[#f4faf7] p-5 sm:p-6">
                <h3 className="font-display text-lg font-extrabold text-slate-950">{t.zweitesJahr.titel}</h3>
                <p className="mt-2 text-base leading-7 text-slate-700">{zweitesJahr}</p>
              </section>
            ) : null}
            <p data-osteo-beitrag className="text-base leading-7 text-slate-700">
              {beitragsZeile(t.beitrag, ergebnis, stufe, SDK_AMBULANT_BEITRAEGE.stand)}
            </p>
          </div>
        ) : null}
      </div>

      {ergebnis && knopf ? <div className="mt-6 flex justify-center">{knopf(platz(t.knopf))}</div> : null}
      {abschluss}

      {/* Pflichtsätze: immer sichtbar, nie zugeklappt */}
      <ul data-osteo-pflichtsaetze className="mt-6 space-y-2 text-base leading-6 text-slate-600">
        <li>{texte.pflichtsaetze.p1}</li>
        <li>{texte.pflichtsaetze.p2}</li>
        <li>{texte.pflichtsaetze.p3}</li>
        <li>{texte.pflichtsaetze.p4}</li>
        <li>{texte.pflichtsaetze.p5}</li>
      </ul>
    </div>
  );
};

export default OsteopathieRechner;
