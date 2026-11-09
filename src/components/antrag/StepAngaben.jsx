import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ANREDEN,
  HINWEIS_MINDERJAEHRIG,
  POT_KEYS,
  POT_LABELS,
  SDK_TARIFE,
  formatEuro,
  formatEuroGanz,
  formatiereGeburtsdatum,
  geburtsdatumEingabeBereinigt,
  geburtsdatumFehler,
  istEmail,
  istName,
  istPlz,
  istStrasseMitNummer,
  istTelefon,
  tarifName,
} from '@/data/sdkAmbulantAntrag';
import { GKV_BESTAETIGUNG } from '@/data/sdkAmbulantAntragTexte';
import {
  Callout, FehlerText, Field, Gruppe, LINK, NeuerTab, OptionCard, buttonClass, cx, eingabeKlasse, fieldAria,
} from './ui';

// Schritt 1 „Deine Angaben“ der Prüfseite in drei ruhigen Bildschirmen:
// 1 Stufe und Beginn, 2 zu dir, 3 Adresse und Kontakt. Alles ist aus dem
// Gespräch mit Nita vorausgefüllt und lässt sich ändern. Die Beiträge der
// Stufen kommen vom Antragsdienst (alleStufen), ohne Zuschlag aus den
// Gesundheitsfragen.

export const KRANKENKASSE_MAX = 80;

// Vertrag Abschnitt 10.5: Namen und Ort nur Buchstaben mit Leerzeichen,
// Punkt, Apostroph und Bindestrich; Krankenkasse zusätzlich Ziffern, &, +, ( ).
const NAME_MUSTER = /^\p{L}[\p{L}\p{M}' .-]{1,79}$/u;
const KASSE_MUSTER = /^[\p{L}\p{M}\d' .&+()-]*$/u;
const istNameStreng = (wert) => istName(wert) && NAME_MUSTER.test(String(wert ?? '').trim());
const nameFehler = (wert, leer) => {
  if (!istName(wert)) return leer;
  return istNameStreng(wert) ? null : 'Bitte nur Buchstaben, Leerzeichen, Punkt, Apostroph oder Bindestrich.';
};

export const FELDER = [
  { key: 'vorname', label: 'Vorname', autoComplete: 'given-name', pruefe: (wert) => nameFehler(wert, 'Bitte gib deinen Vornamen ein.') },
  { key: 'nachname', label: 'Nachname', autoComplete: 'family-name', pruefe: (wert) => nameFehler(wert, 'Bitte gib deinen Nachnamen ein.') },
  { key: 'strasse', label: 'Straße und Hausnummer', autoComplete: 'address-line1', pruefe: (wert) => (istStrasseMitNummer(wert) ? null : 'Bitte gib Straße und Hausnummer ein.') },
  { key: 'plz', label: 'PLZ', autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 5, pruefe: (wert) => (istPlz(wert) ? null : 'Bitte gib eine fünfstellige PLZ ein.') },
  { key: 'ort', label: 'Ort', autoComplete: 'address-level2', pruefe: (wert) => nameFehler(wert, 'Bitte gib deinen Wohnort ein.') },
  { key: 'telefon', label: 'Telefon', type: 'tel', autoComplete: 'tel', inputMode: 'tel', pruefe: (wert) => (istTelefon(wert) ? null : 'Bitte gib eine Telefonnummer ein, unter der wir dich erreichen.') },
  { key: 'email', label: 'E-Mail', type: 'email', autoComplete: 'email', inputMode: 'email', pruefe: (wert) => (istEmail(wert) ? null : 'Bitte gib eine gültige E-Mail-Adresse ein.') },
];
const feldDef = (key) => FELDER.find((feld) => feld.key === key);

const DATUM_MAX_ZEICHEN = 12;
function geburtsdatumBeimTippen(feld) {
  const amEnde = feld.selectionStart === null || feld.selectionStart === feld.value.length;
  return amEnde ? formatiereGeburtsdatum(feld.value) : feld.value.replace(/[^0-9./-]/g, '');
}

function TeilKopf({ teil, titel, ueberschriftRef, text }) {
  return (
    <div>
      <h2 ref={ueberschriftRef} tabIndex={-1} className="scroll-mt-4 font-display text-xl font-extrabold leading-tight text-home-midnight outline-none">
        <span className="block text-base font-extrabold text-emerald-900">Teil {teil} von 3</span>
        {titel}
      </h2>
      {text && <p className="mt-1 text-base leading-7 text-home-slate">{text}</p>}
    </div>
  );
}

// Fehlerliste je Teil in der Reihenfolge auf dem Bildschirm: [{ key, text }].
// serverFelder: Felder, die der Antragsdienst mit 422 zurückgewiesen hat.
export function fehlerAngaben(teil, daten, { heute, beginn, minderjaehrig, serverFelder = [] }) {
  const fehler = [];
  const server = (pfad, key, text) => {
    if (serverFelder.includes(pfad) && !fehler.some((eintrag) => eintrag.key === key)) fehler.push({ key, text });
  };
  if (teil === 1) {
    if (!daten.tarifCode) fehler.push({ key: 'tarif', text: 'Bitte wähle eine Stufe.' });
    if (!beginn) fehler.push({ key: 'beginnDatum', text: 'Bitte wähle, ab wann dein Schutz beginnen soll.' });
    server('tarifCode', 'tarif', 'Bitte wähle die Stufe noch einmal.');
    server('beginnIso', 'beginn', 'Bitte wähle den Beginn noch einmal.');
  }
  if (teil === 2) {
    if (!ANREDEN.some((anrede) => anrede.id === daten.anrede)) fehler.push({ key: 'anrede', text: 'Bitte wähle deine Anrede.' });
    ['vorname', 'nachname'].forEach((key) => {
      const text = feldDef(key).pruefe(daten.formular[key]);
      if (text) fehler.push({ key, text });
    });
    const datumFehler = geburtsdatumFehler(daten.geburtsdatum, heute);
    if (datumFehler) fehler.push({ key: 'geburtsdatum', text: datumFehler });
    else if (minderjaehrig) fehler.push({ key: 'geburtsdatum', text: HINWEIS_MINDERJAEHRIG });
    server('anrede', 'anrede', 'Bitte wähle deine Anrede noch einmal.');
    ['vorname', 'nachname'].forEach((key) => server(`formular.${key}`, key, 'Bitte prüf diese Angabe noch einmal.'));
    server('geburtsdatum', 'geburtsdatum', 'Bitte prüf dein Geburtsdatum noch einmal.');
  }
  if (teil === 3) {
    ['strasse', 'plz', 'ort', 'telefon'].forEach((key) => {
      const text = feldDef(key).pruefe(daten.formular[key]);
      if (text) fehler.push({ key, text });
    });
    const kasse = String(daten.krankenkasse || '').trim();
    if (kasse.length > KRANKENKASSE_MAX) fehler.push({ key: 'krankenkasse', text: `Bitte kürz den Namen auf höchstens ${KRANKENKASSE_MAX} Zeichen.` });
    else if (!KASSE_MUSTER.test(kasse)) fehler.push({ key: 'krankenkasse', text: 'Bitte nur Buchstaben, Ziffern, Leerzeichen und . - & + ( ) verwenden.' });
    if (!daten.gkv) fehler.push({ key: 'gkv', text: 'Bitte bestätige, dass du gesetzlich versichert bist und in Deutschland wohnst.' });
    ['strasse', 'plz', 'ort', 'telefon', 'email'].forEach((key) => server(`formular.${key}`, key, 'Bitte prüf diese Angabe noch einmal.'));
    server('krankenkasse', 'krankenkasse', 'Bitte prüf den Namen deiner Krankenkasse.');
    server('gkv', 'gkv', 'Bitte bestätige diese Angabe noch einmal.');
  }
  return fehler;
}

function Eingabe({
  feldKey, daten, setzeFeld, fehler, beruehrt, beruehre,
}) {
  const feld = feldDef(feldKey);
  const wert = daten.formular[feldKey];
  const fehlerText = fehler[feldKey] || (beruehrt[feldKey] && wert !== '' ? feld.pruefe(wert) : null);
  return (
    <Field id={`feld-${feldKey}`} label={feld.label} error={fehlerText}>
      <input
        {...fieldAria(`feld-${feldKey}`, { error: fehlerText })}
        type={feld.type || 'text'}
        inputMode={feld.inputMode}
        autoComplete={feld.autoComplete}
        maxLength={feld.maxLength}
        value={wert}
        onChange={(event) => setzeFeld(feldKey, event.target.value)}
        onBlur={() => beruehre(feldKey)}
        className={eingabeKlasse}
      />
    </Field>
  );
}

export default function StepAngaben({
  teil, daten, set, abgeleitet, fehler, ueberschriftRef, stufen,
}) {
  const {
    heute, beginnWahl, minderjaehrig,
  } = abgeleitet;
  const [beruehrt, setBeruehrt] = useState({});
  const beruehre = (key) => setBeruehrt((alt) => ({ ...alt, [key]: true }));
  const setzeFeld = (key, wert) => set((alt) => ({ formular: { ...alt.formular, [key]: wert } }));
  const eingabeProps = {
    daten, setzeFeld, fehler, beruehrt, beruehre,
  };

  if (teil === 1) {
    const anderer = daten.beginnArt === 'anderer';
    return (
      <div className="space-y-6">
        <TeilKopf teil={1} titel="Stufe und Beginn" ueberschriftRef={ueberschriftRef} text="So hast du es mit Nita besprochen. Du kannst alles ändern." />

        <Gruppe
          id="stufenwahl"
          legend="Deine Stufe"
          hint="Beitrag im Monat, noch ohne Zuschlag aus den Gesundheitsfragen."
          fehlerId="fehler-tarif"
          error={fehler.tarif}
        >
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
            {SDK_TARIFE.map((tarif, index) => {
              const gewaehlt = daten.tarifCode === tarif.code;
              const betrag = stufen?.alleStufen?.[tarif.code];
              return (
                <OptionCard
                  key={tarif.code}
                  id={index === 0 ? 'feld-tarif' : undefined}
                  name="tarif"
                  value={tarif.code}
                  checked={gewaehlt}
                  onChange={() => set({ tarifCode: tarif.code })}
                  describedBy={fehler.tarif ? 'fehler-tarif' : undefined}
                  invalid={Boolean(fehler.tarif)}
                >
                  <span className="block font-display text-lg font-extrabold leading-snug">{tarifName(tarif)}</span>
                  <span className="block whitespace-nowrap font-display text-lg font-extrabold leading-snug" data-stufe-beitrag={tarif.code}>
                    {Number.isFinite(betrag) ? formatEuro(betrag) : <span className="font-sans text-base font-normal text-home-slate">Beitrag wird geladen</span>}
                    <span className="sr-only"> im Monat</span>
                  </span>
                  <span className="mt-1 block"><strong className="whitespace-nowrap">{formatEuroGanz(tarif.budget)}</strong> Budget in <span className="whitespace-nowrap">2 Kalenderjahren</span></span>
                  {gewaehlt && (
                    <span className="-ml-9 mt-2 block border-t border-slate-300 pt-2 text-home-slate [hyphens:manual]">
                      {POT_KEYS.map((key) => (
                        <span key={key} className="flex justify-between gap-3">
                          <span className="min-w-0">{POT_LABELS[key]}</span>
                          <span className="shrink-0 whitespace-nowrap">{formatEuroGanz(tarif.pots[key])}</span>
                        </span>
                      ))}
                    </span>
                  )}
                </OptionCard>
              );
            })}
          </div>
          <p className="mt-3 text-base leading-7 text-home-slate">
            Du möchtest dich bei der Stufe beraten lassen?{' '}
            <a href="/terminvereinbarung" target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={LINK}>Termin vereinbaren<NeuerTab /></a>
          </p>
        </Gruppe>

        <Gruppe legend="Ab wann soll dein Schutz beginnen?" fehlerId="fehler-beginn" error={fehler.beginn}>
          <div className="grid max-w-md grid-cols-1 gap-2">
            <OptionCard
              id="feld-beginn"
              kompakt
              name="beginnArt"
              value="naechstmoeglich"
              checked={daten.beginnArt === 'naechstmoeglich'}
              onChange={() => set({ beginnArt: 'naechstmoeglich' })}
            >
              Nächstmöglich: <span className="whitespace-nowrap font-bold">{beginnWahl.naechstmoeglich.label}</span>
            </OptionCard>
            {beginnWahl.weitere.length > 0 && (
              <OptionCard
                kompakt
                name="beginnArt"
                value="anderer"
                checked={anderer}
                onChange={() => set({
                  beginnArt: 'anderer',
                  beginnIso: beginnWahl.weitere.some((option) => option.iso === daten.beginnIso) ? daten.beginnIso : beginnWahl.weitere[0].iso,
                })}
              >
                Später beginnen
              </OptionCard>
            )}
            {anderer && (
              <div>
                <label htmlFor="feld-beginnDatum" className="sr-only">Beginn am</label>
                <div className="relative">
                  <select
                    {...fieldAria('feld-beginnDatum', { error: fehler.beginnDatum })}
                    value={daten.beginnIso || ''}
                    onChange={(event) => set({ beginnIso: event.target.value || null })}
                    className={cx(eingabeKlasse, 'cursor-pointer appearance-none pr-12 font-bold')}
                  >
                    {beginnWahl.weitere.map((option) => (
                      <option key={option.iso} value={option.iso}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-home-midnight" aria-hidden="true" />
                </div>
                <FehlerText id="feld-beginnDatum-fehler">{fehler.beginnDatum}</FehlerText>
              </div>
            )}
          </div>
        </Gruppe>
      </div>
    );
  }

  if (teil === 2) {
    const fehlerGeburtsdatum = fehler.geburtsdatum
      || (beruehrt.geburtsdatum && daten.geburtsdatum !== '' ? geburtsdatumFehler(daten.geburtsdatum, heute) : null);
    return (
      <div className="space-y-5">
        <TeilKopf teil={2} titel="Zu dir" ueberschriftRef={ueberschriftRef} />
        <Gruppe legend="Anrede" fehlerId="fehler-anrede" error={fehler.anrede}>
          <div className="grid grid-cols-1 gap-2 min-[340px]:grid-cols-3 min-[340px]:gap-1.5">
            {ANREDEN.map((anrede, stelle) => (
              <OptionCard
                key={anrede.id}
                id={stelle === 0 ? 'feld-anrede' : undefined}
                kompakt
                eng
                name="anrede"
                value={anrede.id}
                checked={daten.anrede === anrede.id}
                onChange={() => set({ anrede: anrede.id })}
                describedBy={fehler.anrede ? 'fehler-anrede' : undefined}
                invalid={Boolean(fehler.anrede)}
              >
                {anrede.label}
              </OptionCard>
            ))}
          </div>
        </Gruppe>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Eingabe feldKey="vorname" {...eingabeProps} />
          <Eingabe feldKey="nachname" {...eingabeProps} />
        </div>
        <Field id="feld-geburtsdatum" label="Geburtsdatum" error={minderjaehrig ? null : fehlerGeburtsdatum}>
          <input
            {...fieldAria('feld-geburtsdatum', { error: minderjaehrig ? null : fehlerGeburtsdatum })}
            type="text"
            inputMode="numeric"
            autoComplete="bday"
            maxLength={DATUM_MAX_ZEICHEN}
            value={daten.geburtsdatum}
            onChange={(event) => set({ geburtsdatum: geburtsdatumBeimTippen(event.target) })}
            onBlur={(event) => {
              beruehre('geburtsdatum');
              const bereinigt = geburtsdatumEingabeBereinigt(event.target.value, heute);
              if (bereinigt !== daten.geburtsdatum) set({ geburtsdatum: bereinigt });
            }}
            placeholder="z. B. 05.03.1985"
            className={`${eingabeKlasse} max-w-[13rem] font-display text-xl font-extrabold placeholder:font-sans placeholder:text-base placeholder:font-normal`}
          />
          <div aria-live="polite">
            {minderjaehrig && (
              <Callout tone="hinweis" className="mt-3">
                <p className="font-bold">{HINWEIS_MINDERJAEHRIG}</p>
                <a href="/terminvereinbarung" target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={cx(buttonClass('secondary'), 'mt-2')}>
                  Termin vereinbaren<NeuerTab />
                </a>
              </Callout>
            )}
          </div>
        </Field>
      </div>
    );
  }

  // Teil 3: Adresse und Kontakt
  return (
    <div className="space-y-5">
      <TeilKopf teil={3} titel="Adresse und Kontakt" ueberschriftRef={ueberschriftRef} />
      <Eingabe feldKey="strasse" {...eingabeProps} />
      <div className="grid grid-cols-1 gap-4 min-[300px]:grid-cols-[7.5rem_minmax(0,1fr)] min-[300px]:gap-3">
        <Eingabe feldKey="plz" {...eingabeProps} />
        <Eingabe feldKey="ort" {...eingabeProps} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Eingabe feldKey="telefon" {...eingabeProps} />
        {/* Vertrag Abschnitt 10.2: Die Mail-Adresse ist hier nicht änderbar. */}
        <div className="min-w-0" data-email-anzeige="">
          <p className="font-display text-base font-extrabold text-home-midnight">E-Mail</p>
          <p className="mt-1.5 flex min-h-12 items-center break-all rounded-xl border-2 border-slate-300 bg-slate-50 px-4 py-3 text-base text-home-midnight">{daten.formular.email}</p>
          <p className="mt-1 text-base leading-6 text-home-slate">Andere Adresse? Antworte kurz auf unsere Mail.</p>
        </div>
      </div>
      <Field id="feld-krankenkasse" label="Deine Krankenkasse" hint="Freiwillig, zum Beispiel Techniker Krankenkasse." error={fehler.krankenkasse}>
        <input
          {...fieldAria('feld-krankenkasse', { hint: true, error: fehler.krankenkasse })}
          type="text"
          autoComplete="off"
          maxLength={KRANKENKASSE_MAX}
          value={daten.krankenkasse}
          onChange={(event) => set({ krankenkasse: event.target.value })}
          className={eingabeKlasse}
        />
      </Field>
      <div data-fehlerblock="">
        <OptionCard
          id="feld-gkv"
          type="checkbox"
          name="gkv"
          checked={daten.gkv}
          onChange={(event) => set({ gkv: event.target.checked })}
          describedBy={fehler.gkv ? 'fehler-gkv' : undefined}
          invalid={Boolean(fehler.gkv)}
        >
          {GKV_BESTAETIGUNG}
        </OptionCard>
        <FehlerText id="fehler-gkv">{fehler.gkv}</FehlerText>
        {!daten.gkv && (
          <a href="/terminvereinbarung" target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={`${LINK} mt-1`}>
            Nicht gesetzlich versichert? Lass uns kurz sprechen.<NeuerTab />
          </a>
        )}
      </div>
    </div>
  );
}
