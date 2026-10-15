import React, { useId, useMemo, useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

/**
 * Tarifvergleich ambulanter Zusatzversicherungen mit kleiner Auswahlhilfe
 * (Auftrag Frank 15.10.2026, Ratgeber heilpraktiker-zusatzversicherung-
 * vergleich-2026).
 *
 * Alle Tarife stehen immer vollständig im HTML (auch im Prerender). Die
 * Auswahlhilfe ändert nur Reihenfolge und Hervorhebung: Jeder Tarif trägt je
 * Schwerpunkt eine Einstufung (2 = passt besonders, 1 = passt, 0 = eher
 * nicht) und einen Satz, warum. Die Einstufung ist eine sachliche Lesart der
 * Bedingungen, keine Note und kein Testurteil.
 *
 * Datenschutz wie beim Zahnkostenrechner: nur lokaler Zustand, kein Formular,
 * kein Speicher, kein fetch, kein dataLayer, keine Messung.
 *
 * Mobil (390 px): Karten untereinander, keine Tabelle, nichts breiter als der
 * Bildschirm. Ab lg zwei Karten nebeneinander.
 */

const ROWS = [
  ['heilpraktiker', 'Heilpraktiker'],
  ['budget', 'Höchstbetrag'],
  ['wartezeit', 'Wartezeit'],
  ['brille', 'Brille'],
  ['beitrag', 'Beitrag 30 / 45 Jahre'],
  ['osteopathie', 'Osteopathie'],
  ['vorsorge', 'Vorsorge'],
  ['annahme', 'Gesundheitsfragen'],
];

// Sichtbar bleiben die ersten Zeilen, der Rest steht aufklappbar (aber im
// HTML) darunter, damit acht Karten auf dem Handy nicht endlos werden.
const VISIBLE_ROWS = 5;

const RowList = ({ tarif, rows }) => (
  <dl className="divide-y divide-slate-100 text-[0.95rem] leading-6">
    {rows.map(([key, label]) => (
      tarif[key] ? (
        <div key={key} className="grid grid-cols-1 gap-0.5 py-2 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-3">
          <dt className="font-semibold text-slate-500">{label}</dt>
          <dd className="min-w-0 break-words text-slate-800 hyphens-auto">{tarif[key]}</dd>
        </div>
      ) : null
    ))}
  </dl>
);

const HEALIO_BADGE = {
  online: { text: 'Bei Healio online abschließbar', className: 'bg-[#e3f6ee] text-[#087654]' },
  zusatz: { text: 'Bei Healio als Zusatzbaustein', className: 'bg-[#e3f6ee] text-[#087654]' },
  anfrage: { text: 'Bei Healio auf Anfrage', className: 'bg-[#fffaf0] text-[#8a6412]' },
  nein: { text: 'Nicht im Healio-Onlineangebot', className: 'bg-slate-100 text-slate-600' },
};

const FitLabel = ({ score }) => {
  if (score === 2) return <span className="rounded-full bg-[#25c990] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[#07111f]">Passt besonders</span>;
  if (score === 1) return <span className="rounded-full bg-[#f4faf7] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#087654] ring-1 ring-[#cfeee0]">Passt</span>;
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Eher nicht</span>;
};

const TarifKarte = ({ tarif, criterion, criterionLabel, rows, visibleRows }) => {
  const score = criterion ? tarif.passt?.[criterion]?.[0] ?? 0 : null;
  const reason = criterion ? tarif.passt?.[criterion]?.[1] : null;
  const badge = HEALIO_BADGE[tarif.healio] || HEALIO_BADGE.nein;
  const highlighted = score === 2;

  return (
    <li
      className={`flex min-w-0 flex-col rounded-[1.5rem] border bg-white p-4 transition sm:p-5 ${highlighted ? 'border-[#25c990] shadow-[0_10px_28px_rgba(37,201,144,0.18)]' : 'border-slate-200 shadow-[0_6px_18px_rgba(7,17,31,0.04)]'} ${score === 0 ? 'opacity-80' : ''}`}
      data-tarif={tarif.id}
      data-passt={score ?? ''}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${badge.className}`}>{badge.text}</span>
        {criterion && <FitLabel score={score} />}
      </div>
      <h4 className="mt-3 break-words font-display text-lg font-extrabold leading-snug text-[#07111f] hyphens-auto sm:text-xl">
        {tarif.name}
      </h4>
      <p className="text-sm font-semibold leading-6 text-slate-500">{tarif.versicherer}</p>
      {criterion && reason && (
        <p className={`mt-3 rounded-2xl px-3 py-2 text-[0.95rem] leading-6 ${highlighted ? 'bg-[#f1fbf6] text-[#07111f]' : 'bg-slate-50 text-slate-600'}`}>
          <span className="font-semibold">{criterionLabel}: </span>{reason}
        </p>
      )}
      <div className="mt-3"><RowList tarif={tarif} rows={rows.slice(0, visibleRows)} /></div>
      {tarif.grenze && (
        <p className="mt-2 text-[0.95rem] leading-6 text-slate-700">
          <span className="font-semibold text-[#07111f]">Achte auf: </span>{tarif.grenze}
        </p>
      )}
      <details className="group mt-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-3 open:bg-white">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-display text-[0.95rem] font-extrabold text-[#07111f] [&::-webkit-details-marker]:hidden">
          Weitere Angaben und Quelle
          <ChevronDown className="h-4 w-4 shrink-0 text-[#087654] transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <RowList tarif={tarif} rows={rows.slice(visibleRows)} />
        {tarif.quelle && (
          <p className="border-t border-slate-100 py-3 text-sm leading-6 text-slate-500">
            Quelle:{' '}
            <a
              href={tarif.quelle.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 break-words font-semibold text-[#087654] underline decoration-[#25c990]/50 underline-offset-4 hover:decoration-[#087654]"
            >
              {tarif.quelle.label}
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
            {tarif.quelle.stand && <span>, {tarif.quelle.stand}</span>}
          </p>
        )}
      </details>
    </li>
  );
};

const AmbulantTarifvergleich = ({ block }) => {
  const groupId = useId();
  const [criterion, setCriterion] = useState('');
  const criteria = block.criteria || [];
  const active = criteria.find((entry) => entry.id === criterion) || null;

  const sorted = useMemo(() => {
    const list = (block.tarife || []).map((tarif, index) => ({ tarif, index }));
    if (!criterion) return list.map(({ tarif }) => tarif);
    return list
      .sort((a, b) => ((b.tarif.passt?.[criterion]?.[0] ?? 0) - (a.tarif.passt?.[criterion]?.[0] ?? 0)) || a.index - b.index)
      .map(({ tarif }) => tarif);
  }, [block.tarife, criterion]);

  const options = [{ id: '', label: 'Alle zeigen' }, ...criteria];

  return (
    <section
      id={block.id || 'tarifvergleich'}
      aria-labelledby={`${block.id || 'tarifvergleich'}-heading`}
      className="mt-10 scroll-mt-28 rounded-[1.75rem] border border-[#cfeee0] bg-[#f4faf7] p-4 sm:p-7 md:-mx-10 lg:-mx-20"
      data-ratgeber-tarifvergleich=""
    >
      <h3 id={`${block.id || 'tarifvergleich'}-heading`} className="font-display text-xl font-extrabold leading-snug tracking-[-0.02em] text-[#07111f] sm:text-2xl">
        {block.heading}
      </h3>
      {block.intro && <p className="mt-2 text-base leading-7 text-slate-700">{block.intro}</p>}

      <div role="radiogroup" aria-labelledby={groupId} className="mt-5">
        <p id={groupId} className="font-display text-base font-extrabold leading-6 text-[#07111f]">
          {block.question || 'Was ist dir am wichtigsten?'}
        </p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => {
            const selected = option.id === criterion;
            return (
              <button
                key={option.id || 'alle'}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setCriterion(option.id)}
                className={`flex min-h-12 w-full min-w-0 items-center gap-3 rounded-2xl border px-4 py-2.5 text-left text-base leading-6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07111f] focus-visible:ring-offset-2 ${selected ? 'border-[#25c990] bg-white font-semibold text-[#07111f] shadow-[0_6px_18px_rgba(37,201,144,0.18)]' : 'border-slate-200 bg-white/70 text-slate-700 hover:border-[#25c990]/60'}`}
              >
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${selected ? 'border-[#25c990]' : 'border-slate-300'}`} aria-hidden="true">
                  {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#25c990]" />}
                </span>
                <span className="min-w-0 break-words hyphens-auto">{option.label}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 min-h-[3rem] text-[0.95rem] leading-6 text-slate-600" aria-live="polite">
          {active ? active.hint : block.allHint}
        </p>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {sorted.map((tarif) => (
          <TarifKarte key={tarif.id} tarif={tarif} criterion={criterion} criterionLabel={active?.label} rows={block.rows || ROWS} visibleRows={block.visibleRows || VISIBLE_ROWS} />
        ))}
      </ul>

      {block.note && <p className="mt-4 text-sm leading-6 text-slate-500">{block.note}</p>}
    </section>
  );
};

export default AmbulantTarifvergleich;
