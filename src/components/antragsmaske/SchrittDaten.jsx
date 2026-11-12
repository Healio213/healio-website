import React, { useState } from 'react';
import { feldFehler } from '@/lib/antragsmaske/regeln';
import {
  FehlerText, Field, Gruppe, LINK, NeuerTab, OptionCard, eingabeKlasse, fieldAria,
} from '@/components/antrag/ui';
import { TERMIN_LINK, TeilKopf } from './teile';

// Schritt 4 „Deine Daten“ in zwei Bildschirmen: Person, dann Anschrift und
// Kontakt. Felder und Bestätigungen kommen aus der Definition.

export function fehlerPerson(definition, daten) {
  const fehler = [];
  const anreden = definition.person.anreden || [];
  if (anreden.length && !anreden.some((anrede) => anrede.id === daten.anrede)) fehler.push({ key: 'anrede', text: 'Bitte wähle deine Anrede.' });
  definition.person.felder.forEach((feld) => {
    const text = feldFehler(feld, daten.formular[feld.id]);
    if (text) fehler.push({ key: feld.id, text });
  });
  return fehler;
}

export function fehlerAnschrift(definition, daten) {
  const fehler = [];
  definition.person.anschrift.filter((feld) => !feld.gesperrt).forEach((feld) => {
    const text = feldFehler(feld, daten.formular[feld.id]);
    if (text) fehler.push({ key: feld.id, text });
  });
  (definition.person.bestaetigungen || []).forEach((eintrag) => {
    if (daten.bestaetigungen[eintrag.key] !== true) fehler.push({ key: eintrag.key, text: eintrag.fehler });
  });
  return fehler;
}

function Eingabe({
  feld, wert, setze, fehler, beruehrt, beruehre,
}) {
  if (feld.gesperrt) {
    return (
      <div className="min-w-0" data-gesperrt={feld.id}>
        <p className="font-display text-base font-extrabold text-home-midnight">{feld.label}</p>
        <p id={`feld-${feld.id}`} className="mt-1.5 flex min-h-12 items-center rounded-xl border-2 border-slate-300 bg-slate-50 px-4 py-3 text-base text-home-midnight">{wert}</p>
      </div>
    );
  }
  const text = fehler[feld.id] || (beruehrt[feld.id] && String(wert ?? '') !== '' ? feldFehler(feld, wert) : null);
  return (
    <Field id={`feld-${feld.id}`} label={feld.label} hint={feld.hinweis} error={text}>
      <input
        {...fieldAria(`feld-${feld.id}`, { hint: Boolean(feld.hinweis), error: text })}
        type={feld.type || 'text'}
        inputMode={feld.inputMode}
        autoComplete={feld.autoComplete}
        maxLength={feld.maxLength || 80}
        value={wert ?? ''}
        onChange={(event) => setze(feld.id, event.target.value)}
        onBlur={() => beruehre(feld.id)}
        className={eingabeKlasse}
      />
    </Field>
  );
}

export default function SchrittDaten({
  definition, teil, daten, set, fehler, ueberschriftRef, geburtsdatumText,
}) {
  const [beruehrt, setBeruehrt] = useState({});
  const beruehre = (key) => setBeruehrt((alt) => ({ ...alt, [key]: true }));
  const setze = (key, wert) => set((alt) => ({ formular: { ...alt.formular, [key]: wert } }));
  const props = {
    setze, fehler, beruehrt, beruehre,
  };

  if (teil === 'person') {
    const anreden = definition.person.anreden || [];
    return (
      <div className="space-y-5">
        <TeilKopf vorTitel="Teil 1 von 2" titel="Zu dir" ueberschriftRef={ueberschriftRef} />
        {anreden.length > 0 && (
          <Gruppe legend="Anrede" fehlerId="fehler-anrede" error={fehler.anrede}>
            <div className="grid grid-cols-1 gap-2 min-[340px]:grid-cols-3 min-[340px]:gap-1.5">
              {anreden.map((anrede, stelle) => (
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
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {definition.person.felder.map((feld) => <Eingabe key={feld.id} feld={feld} wert={daten.formular[feld.id]} {...props} />)}
        </div>
        <p className="text-base leading-6 text-home-slate">Geburtsdatum: <span className="font-bold text-home-midnight">{geburtsdatumText}</span></p>
      </div>
    );
  }

  const felder = definition.person.anschrift;
  const feld = (id) => felder.find((eintrag) => eintrag.id === id);
  const rest = felder.filter((eintrag) => !['strasse', 'hausnummer', 'plz', 'ort'].includes(eintrag.id));
  return (
    <div className="space-y-5">
      <TeilKopf vorTitel="Teil 2 von 2" titel="Anschrift und Kontakt" ueberschriftRef={ueberschriftRef} />
      <div className="grid grid-cols-1 gap-4 min-[300px]:grid-cols-[7.5rem_minmax(0,1fr)] min-[300px]:gap-3">
        {feld('plz') && <Eingabe feld={feld('plz')} wert={daten.formular.plz} {...props} />}
        {feld('ort') && <Eingabe feld={feld('ort')} wert={daten.formular.ort} {...props} />}
      </div>
      {feld('hausnummer')
        ? (
          <div className="grid grid-cols-1 gap-4 min-[300px]:grid-cols-[minmax(0,1fr)_7.5rem] min-[300px]:gap-3">
            <Eingabe feld={feld('strasse')} wert={daten.formular.strasse} {...props} />
            <Eingabe feld={feld('hausnummer')} wert={daten.formular.hausnummer} {...props} />
          </div>
        )
        : feld('strasse') && <Eingabe feld={feld('strasse')} wert={daten.formular.strasse} {...props} />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rest.map((eintrag) => <Eingabe key={eintrag.id} feld={eintrag} wert={daten.formular[eintrag.id]} {...props} />)}
      </div>
      {(definition.person.bestaetigungen || []).map((eintrag) => (
        <div key={eintrag.key} data-fehlerblock="">
          <OptionCard
            id={`feld-${eintrag.key}`}
            type="checkbox"
            name={eintrag.key}
            checked={daten.bestaetigungen[eintrag.key] === true}
            onChange={(event) => set((alt) => ({ bestaetigungen: { ...alt.bestaetigungen, [eintrag.key]: event.target.checked } }))}
            describedBy={fehler[eintrag.key] ? `fehler-${eintrag.key}` : undefined}
            invalid={Boolean(fehler[eintrag.key])}
          >
            {eintrag.label}
          </OptionCard>
          <FehlerText id={`fehler-${eintrag.key}`}>{fehler[eintrag.key]}</FehlerText>
          {eintrag.ausweg && daten.bestaetigungen[eintrag.key] !== true && (
            <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={`${LINK} mt-1`}>
              {eintrag.ausweg}<NeuerTab />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
