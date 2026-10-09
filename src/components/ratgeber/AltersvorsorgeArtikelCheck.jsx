import React, { useEffect, useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { berechneZulagen, formatEuroDE, RECHNER_MAX_MONATSBEITRAG } from '@/lib/altersvorsorgeZulagen';
import { getArtikelCheckVoreinstellung, createArtikelCheckState } from '@/lib/altersvorsorgeArtikelCheck';
import { RATGEBER_INTERNAL_UTM_DEFAULTS, buildInternalRatgeberUrl } from '@/lib/ratgeber-cta';

const ZIELGRUPPEN = new Set(['eltern', 'riester', 'selbststaendige', 'einsteiger']);
const INPUT_CLASS = 'mt-2 min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2 text-base text-[#07111f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-2';
const LINK_FOCUS_CLASS = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07111f] focus-visible:ring-offset-2';

const AltersvorsorgeArtikelCheck = ({ article, search = '' }) => {
  const id = useId();
  const voreinstellung = useMemo(() => getArtikelCheckVoreinstellung(article), [article]);
  const [value, setValue] = useState(voreinstellung);

  useEffect(() => {
    setValue(voreinstellung);
  }, [voreinstellung]);

  const ergebnis = useMemo(() => berechneZulagen(value), [value]);
  const state = createArtikelCheckState(article.slug, value);
  const zielgruppe = ZIELGRUPPEN.has(article.audience) ? `?fuer=${article.audience}` : '';
  const defaults = {
    ...RATGEBER_INTERNAL_UTM_DEFAULTS,
    utm_campaign: 'altersvorsorge-ratgeber',
    utm_content: article.slug,
  };
  const checkUrl = buildInternalRatgeberUrl(`/altersvorsorgedepot${zielgruppe}#zuschuss-check`, search, defaults);
  const webinarUrl = buildInternalRatgeberUrl(`/altersvorsorgedepot${zielgruppe}#webinar`, search, defaults);
  const heading = article.cluster === 'riester'
    ? 'Deine Zulage und deinen Riester-Vertrag zusammen prüfen'
    : 'Was könnte der Staat zu deinem Beitrag dazulegen?';

  const updateValue = (field, nextValue) => {
    setValue((previous) => ({ ...previous, [field]: nextValue }));
  };

  return (
    <section
      id="artikel-zuschuss-check"
      data-altersvorsorge-artikel-check
      aria-labelledby={`${id}-heading`}
      className="mt-10 min-w-0 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <p className="text-base font-semibold text-[#087654]">Deine Rechnung, dein nächster Schritt</p>
      <h2
        id={`${id}-heading`}
        className="mt-2 break-words font-display text-2xl font-extrabold leading-tight text-[#07111f] sm:text-3xl"
      >
        {heading}
      </h2>
      <p className="mt-3 text-base leading-7 text-slate-700">
        Rechne ohne Anmeldung. Deine Eingaben gehen zur Anfrage für den Zuschuss-Check mit.
      </p>

      <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor={`${id}-beitrag`} className="flex flex-wrap justify-between gap-2 text-base font-semibold text-[#07111f]">
            <span>Dein Monatsbeitrag</span><span>{formatEuroDE(value.monatsbeitrag)}</span>
          </label>
          <input
            id={`${id}-beitrag`}
            type="range"
            min={10}
            max={RECHNER_MAX_MONATSBEITRAG}
            step={5}
            value={value.monatsbeitrag}
            onChange={(event) => updateValue('monatsbeitrag', Number(event.target.value))}
            aria-valuetext={formatEuroDE(value.monatsbeitrag)}
            className="mt-2 min-h-11 w-full cursor-pointer accent-[#087654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087654]"
          />
          <div className="flex justify-between text-base text-slate-600"><span>10 EUR</span><span>150 EUR</span></div>
        </div>
        <div className="min-w-0">
          <label htmlFor={`${id}-kinder`} className="text-base font-semibold text-[#07111f]">
            Dir zugeordnete Kinderzulage mit Kindergeldanspruch
          </label>
          <select
            id={`${id}-kinder`}
            value={value.kinder}
            onChange={(event) => updateValue('kinder', Number(event.target.value))}
            aria-describedby={`${id}-kinder-hinweis`}
            className={INPUT_CLASS}
          >
            {Array.from({ length: 7 }, (_, kinder) => (
              <option key={kinder} value={kinder}>{kinder === 1 ? '1 Kind' : `${kinder} Kinder`}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="mt-3 text-base leading-6 text-slate-600">Bei 150 EUR Monatsbeitrag ist die höchste Grundzulage von 540 EUR erreicht. Mehr Beitrag erhöht die Grundzulage nicht.</p>

      <label
        htmlFor={`${id}-unter25`}
        className="mt-4 flex min-h-12 cursor-pointer items-center gap-3 rounded-xl py-2 text-base leading-6 text-slate-700"
      >
        <input
          id={`${id}-unter25`}
          type="checkbox"
          checked={value.unter25}
          onChange={(event) => updateValue('unter25', event.target.checked)}
          className="h-5 w-5 shrink-0 accent-[#087654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]"
        />
        <span>Zu Beginn des Beitragsjahres unter 25</span>
      </label>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-4 min-w-0 rounded-xl bg-[#e9f8f1] p-4 text-[#07111f] sm:p-5"
      >
        <p className="text-base leading-6">Beispiel für unmittelbar Förderberechtigte, ein volles Beitragsjahr ab 2027</p>
        <p className="mt-2 break-words font-display text-3xl font-extrabold leading-tight">
          {formatEuroDE(ergebnis.zulageJahr)}
          <span className="mt-1 block text-base font-semibold">Grund- und Kinderzulage im Jahr</span>
        </p>
        <dl className="mt-4 space-y-2 text-base leading-6">
          <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
            <dt>Dein Eigenbeitrag im Jahr</dt>
            <dd className="font-semibold">{formatEuroDE(ergebnis.jahresbeitrag)}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
            <dt>Grundzulage</dt>
            <dd className="font-semibold">{formatEuroDE(ergebnis.grundzulage)}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
            <dt>Kinderzulage zusammen</dt>
            <dd className="font-semibold">{formatEuroDE(ergebnis.kinderzulage)}</dd>
          </div>
          {value.unter25 && (
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-[#b8dfcb] pt-2">
              <dt>Möglicher Startbonus, einmalig zusätzlich</dt>
              <dd className="font-semibold">{formatEuroDE(ergebnis.startbonus)}</dd>
            </div>
          )}
        </dl>
        {value.unter25 && (
          <p className="mt-3 text-base leading-6">
            Den Startbonus gibt es nur bei erfüllten Voraussetzungen, wenn du ihn noch nicht erhalten hast.
            Er ist nicht in der jährlichen Zulage oben enthalten.
          </p>
        )}
      </div>

      <details className="mt-4 text-base leading-7 text-slate-600">
        <summary className="min-h-11 cursor-pointer font-semibold text-[#087654]">Welche Voraussetzungen hat die Rechnung?</summary>
      <p id={`${id}-kinder-hinweis`} className="mt-2">
        Kindergeldanspruch und die Zuordnung der Kinderzulage müssen passen. Für 2027 und ab 2028 gelten
        unterschiedliche Zuordnungsregeln. Wir prüfen, welchem Elternteil die Zulage zusteht. Mittelbar
        berechtigte Partner haben eine eigene Rechnung.
      </p>
      <p className="mt-2 text-base leading-7 text-slate-600">
        Beispiel ohne Vertragskosten, Wertentwicklung und zusätzliche Steuerermäßigung. Die Zulage
        fließt in den Vorsorgevertrag; das Geld ist grundsätzlich bis zur Rente gebunden.
      </p>
      </details>

      <div className="mt-5 flex min-w-0 flex-col gap-3">
        <Link
          to={checkUrl}
          state={state}
          data-ratgeber-internal-cta="end"
          className={`inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#25c990] px-4 py-3 text-center text-base font-extrabold leading-6 text-[#07111f] transition hover:bg-[#5ee0b1] ${LINK_FOCUS_CLASS}`}
        >
          Mit meiner Rechnung zum Zuschuss-Check
        </Link>
        <Link
          to={webinarUrl}
          state={state}
          className={`inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-base font-semibold leading-6 text-[#07111f] transition hover:bg-slate-50 ${LINK_FOCUS_CLASS}`}
        >
          Erst den Zuschuss-Fahrplan ansehen
        </Link>
      </div>
      <p className="mt-3 text-base leading-7 text-slate-700">
        Zuschuss-Check: etwa 20 Minuten per Video oder Telefon, unverbindlich. Auf der nächsten Seite
        kannst du den Check oder einen Rückruf über unser Kontaktformular anfragen. Die Rechnung braucht keine E-Mail-Adresse.
      </p>
      <p className="mt-2 text-base leading-7 text-slate-600">
        Neue Produkte können ab 2027 angeboten werden. Ein konkreter Vertrag setzt ein tatsächlich
        verfügbares, geprüftes Angebot voraus. Healio vermittelt nur Versicherungsvarianten.
      </p>
      <Link
        to="/datenschutz"
        className={`mt-3 inline-flex min-h-11 items-center text-base text-slate-600 underline decoration-[#25c990] underline-offset-4 hover:text-[#07111f] ${LINK_FOCUS_CLASS}`}
      >
        Informationen zum Datenschutz
      </Link>
    </section>
  );
};

export default AltersvorsorgeArtikelCheck;
