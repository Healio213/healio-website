import React, { useId, useMemo, useState } from 'react';
import {
  RECHNER_TEXTE,
  ZAHN_BEHANDLUNGEN,
  ZAHN_BONUSHEFT,
  ZAHN_TARIFE,
  ZAHN_VERTRAGSJAHR,
  ZAHN_ZEITPUNKT,
  berechneZahnkosten,
  formatEuro,
  parseEigenerBetrag,
} from '@/lib/zahnkostenRechner';

/**
 * Zahnkosten-Beispielrechner für die Ratgeber.
 *
 * Datenschutz (Franks Vorgabe 06.10.2026): Die Auswahl lebt nur im lokalen
 * Zustand dieser Komponente. Kein Formular, kein Speicher, kein fetch, kein
 * dataLayer, kein Aufruf von Google Ads, Meta oder Analytics. Bewusst ohne
 * <form>, damit auch automatische Formular-Messungen nichts sehen.
 * Geprüft wird das per Netzwerkmitschnitt (siehe Abschlussbericht).
 */

const OptionGroup = ({ label, options, value, onChange }) => {
  const groupId = useId();
  return (
    <div role="radiogroup" aria-labelledby={groupId} className="min-w-0">
      <p id={groupId} className="font-display text-base font-extrabold leading-6 text-[#07111f]">{label}</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))]">
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.id)}
              className={`flex min-h-12 w-full items-center gap-3 rounded-2xl border px-4 py-2.5 text-left text-base leading-6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07111f] focus-visible:ring-offset-2 ${selected ? 'border-[#25c990] bg-white font-semibold text-[#07111f] shadow-[0_6px_18px_rgba(37,201,144,0.18)]' : 'border-slate-200 bg-white/70 text-slate-700 hover:border-[#25c990]/60'}`}
            >
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${selected ? 'border-[#25c990]' : 'border-slate-300'}`} aria-hidden="true">
                {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#25c990]" />}
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ResultTile = ({ label, children, accent = false }) => (
  <div className={`rounded-2xl p-4 ${accent ? 'bg-[#07111f] text-white' : 'bg-white text-[#07111f]'}`}>
    <p className={`text-sm font-semibold leading-5 ${accent ? 'text-white/70' : 'text-slate-500'}`}>{label}</p>
    <div className="mt-1">{children}</div>
  </div>
);

const Amount = ({ value, light = false }) => (
  value > 0
    ? <span className="font-display text-2xl font-extrabold tracking-[-0.02em]">{formatEuro(value)}</span>
    : <span className={`block text-base font-semibold leading-6 ${light ? 'text-white' : 'text-[#087654]'}`}>{RECHNER_TEXTE.keinRest}</span>
);

const ZahnkostenRechner = ({ preset }) => {
  const initialBehandlung = ZAHN_BEHANDLUNGEN.some((entry) => entry.id === preset) ? preset : ZAHN_BEHANDLUNGEN[0].id;
  const [behandlung, setBehandlung] = useState(initialBehandlung);
  const [bonusheft, setBonusheft] = useState(ZAHN_BONUSHEFT[0].id);
  const [zeitpunkt, setZeitpunkt] = useState(ZAHN_ZEITPUNKT[0].id);
  const [vertragsjahr, setVertragsjahr] = useState(ZAHN_VERTRAGSJAHR[0].id);
  const [betragEingabe, setBetragEingabe] = useState('');
  const betragId = useId();
  const eigenerBetrag = parseEigenerBetrag(betragEingabe);

  const ergebnis = useMemo(
    () => berechneZahnkosten({ behandlung, bonusheft, zeitpunkt, vertragsjahr, eigenerBetrag }),
    [behandlung, bonusheft, zeitpunkt, vertragsjahr, eigenerBetrag],
  );

  return (
    <div className="mt-5" data-zahnkosten-rechner="">
      <div className="grid gap-5">
        <OptionGroup label={RECHNER_TEXTE.frageBehandlung} options={ZAHN_BEHANDLUNGEN} value={behandlung} onChange={setBehandlung} />
        <OptionGroup label={RECHNER_TEXTE.frageBonusheft} options={ZAHN_BONUSHEFT} value={bonusheft} onChange={setBonusheft} />
        <OptionGroup label={RECHNER_TEXTE.frageZeitpunkt} options={ZAHN_ZEITPUNKT} value={zeitpunkt} onChange={setZeitpunkt} />
        <OptionGroup label={RECHNER_TEXTE.frageVertragsjahr} options={ZAHN_VERTRAGSJAHR} value={vertragsjahr} onChange={setVertragsjahr} />
        <div>
          <label htmlFor={betragId} className="font-display text-base font-extrabold leading-6 text-[#07111f]">
            {RECHNER_TEXTE.frageEigenerBetrag}
          </label>
          <input
            id={betragId}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={betragEingabe}
            onChange={(event) => setBetragEingabe(event.target.value.slice(0, 12))}
            aria-describedby={`${betragId}-hinweis`}
            className="mt-2 block min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-[#07111f] placeholder:text-slate-400 focus:border-[#25c990] focus:outline-none focus:ring-2 focus:ring-[#25c990]/30"
            placeholder="zum Beispiel 1.200"
          />
          <p id={`${betragId}-hinweis`} className="mt-1 text-sm leading-5 text-slate-500">{RECHNER_TEXTE.hinweisEigenerBetrag}</p>
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-[#e3f6ee] p-3 sm:p-4" aria-live="polite">
        <p className="px-1 text-base leading-7 text-slate-700">
          {RECHNER_TEXTE.ergebnisVorspann(ergebnis)}
        </p>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          <ResultTile label={RECHNER_TEXTE.kasseZahlt}>
            <Amount value={ergebnis.kasse} />
            <p className="mt-1 text-sm leading-5 text-slate-500">{RECHNER_TEXTE.kasseDetail(ergebnis)}</p>
          </ResultTile>
          <ResultTile label={RECHNER_TEXTE.ohneTarif}>
            <Amount value={ergebnis.ohneTarif} />
          </ResultTile>
          <ResultTile label={RECHNER_TEXTE.mitTarif} accent>
            <ul className="space-y-2">
              {ZAHN_TARIFE.map((tarif) => {
                const zeile = ergebnis.tarife[tarif.id];
                return (
                  <li key={tarif.id}>
                    <span className="block text-sm leading-5 text-white/70">{tarif.label}</span>
                    <Amount value={zeile.rest} light />
                    <span className="block text-sm leading-5 text-white/70">{RECHNER_TEXTE.tarifDetail(zeile)}</span>
                  </li>
                );
              })}
            </ul>
          </ResultTile>
        </div>
      </div>

      <details className="group mt-5 rounded-2xl bg-white">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-display text-base font-extrabold text-[#07111f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07111f] [&::-webkit-details-marker]:hidden">
          {RECHNER_TEXTE.annahmenTitel}
          <span className="text-xl leading-none text-[#087654] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
        </summary>
        <ul className="space-y-2 px-4 pb-4 text-[0.95rem] leading-7 text-slate-700">
          {RECHNER_TEXTE.annahmen(ergebnis).map((satz) => (
            <li key={satz} className="flex gap-2">
              <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#25c990]" aria-hidden="true" />
              <span>{satz}</span>
            </li>
          ))}
        </ul>
      </details>

      <p className="mt-4 px-1 text-sm leading-6 text-slate-600">{RECHNER_TEXTE.datenschutz}</p>
    </div>
  );
};

export default ZahnkostenRechner;
