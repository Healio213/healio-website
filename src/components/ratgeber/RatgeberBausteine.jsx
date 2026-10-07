import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Plus } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

/**
 * Optionale Bausteine der Ratgeber-Vorlage (Zahn-Ratgeber, 06.10.2026).
 *
 * Alle Bausteine sind Opt-in: Ein Artikel ohne die neuen Felder
 * (author, quickAnswer, sources, toc, faqStyle) und ohne die neuen
 * Blocktypen (costCard, steps, honest, cards, path, calculator, Tabelle mit
 * mobile: 'cards') sieht genauso aus wie vorher.
 *
 * Gestaltung nach dem Bauplan Abschnitt 4 und der Mobil-Prüfung vom
 * 06.10.2026 (89 % der Anzeigenklicks vom Smartphone): ruhige Flächen in
 * den Healio-Farben, freundliche Figuren aus public/images/friendly-icons,
 * Fließtext ab 16 px, Tippflächen ab 44 px, keine Tabelle breiter als der
 * Bildschirm (unter sm werden Zeilen zu Karten), keine Banner, keine
 * Einblendungen.
 *
 * Wie die Vorlage selbst enthalten die Bausteine keinen Anredetext. Alle
 * sichtbaren Sätze kommen aus der Inhaltsdatei; fest stehen nur neutrale
 * Beschriftungen wie "Quellen und Stand" oder "Inhalt".
 */

const LINK_UNDERLINE = 'underline underline-offset-4 decoration-[#25c990] hover:text-[#07111f]';
const FOCUS_RING = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07111f] focus-visible:ring-offset-2';

const ListItemText = ({ item }) => {
  if (typeof item === 'string') return item;
  return (
    <>
      <strong className="font-display font-extrabold text-[#07111f]">{item.lead}</strong>
      {item.text ? ` ${item.text}` : null}
    </>
  );
};

/* -------------------------------------------------------------------------
 * Kopfzeile mit Autor und Stand
 * ---------------------------------------------------------------------- */

export const ArticleByline = ({ author, standIso, standLabel, readingTimeMinutes }) => (
  <div className="mt-5 flex items-center gap-3" data-ratgeber-byline={author.id}>
    <img
      src={author.image}
      alt=""
      width="44"
      height="44"
      decoding="async"
      className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white shadow-[0_6px_16px_rgba(7,17,31,0.12)]"
    />
    <p className="text-sm leading-6 text-slate-600">
      <Link to={author.profilePath} className={`font-semibold text-[#07111f] ${LINK_UNDERLINE} ${FOCUS_RING}`}>
        {author.name}
      </Link>
      <span className="block">
        Stand <time dateTime={standIso}>{standLabel}</time>
        {readingTimeMinutes ? ` · ${readingTimeMinutes} Min. Lesezeit` : null}
      </span>
    </p>
  </div>
);

/* -------------------------------------------------------------------------
 * Kurzantwort-Karte (höchstens drei Zahlen, Angebotsweg im ersten Bildschirm)
 * ---------------------------------------------------------------------- */

export const QuickAnswerCard = ({ quick }) => {
  const facts = (quick.facts || []).slice(0, 3);
  return (
    <section
      aria-labelledby="kurzantwort-heading"
      data-ratgeber-quick=""
      className="mt-6 rounded-[1.75rem] border border-[#cfeee0] bg-[#f4faf7] p-4 shadow-[0_18px_44px_rgba(7,17,31,0.06)] sm:mt-7 sm:p-7"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id="kurzantwort-heading" className="font-display text-lg font-extrabold leading-snug tracking-[-0.01em] text-[#07111f] sm:text-xl">
          {quick.title}
        </h2>
        {quick.icon && <FriendlyIcon kind={quick.icon} tone={quick.tone || 'mint'} size="sm" />}
      </div>

      {/* Mobil zuerst: Zahl über der Beschriftung, kurze Beschriftungen, der
          Weg direkt darunter, damit er auf dem Handy im ersten Bildschirm liegt
          (Mobil-Prüfung 06.10.2026). Der erklärende Satz folgt danach. */}
      <dl className="mt-3 grid gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-3">
        {facts.map((fact) => (
          <div
            key={`${fact.value}-${fact.label}`}
            className="flex min-w-0 flex-col rounded-2xl bg-white px-4 py-2.5 shadow-[0_6px_18px_rgba(7,17,31,0.05)] sm:gap-1 sm:p-4"
          >
            <dd className="order-1 break-words font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-[#087654] sm:text-2xl">
              {fact.value}
            </dd>
            <dt className="order-2 break-words text-[0.95rem] leading-6 text-slate-700">
              {fact.label}
            </dt>
          </div>
        ))}
      </dl>

      {quick.path && (
        <Link
          to={quick.path.to}
          data-ratgeber-path="kurzantwort"
          className={`group mt-4 flex min-h-[3.25rem] items-center gap-3 rounded-2xl border border-[#25c990]/50 bg-white px-4 py-3 transition hover:border-[#25c990] hover:bg-[#effdf4] sm:mt-5 ${FOCUS_RING}`}
        >
          <span className="flex-1">
            {quick.path.text && <span className="block text-sm leading-5 text-slate-600">{quick.path.text}</span>}
            <span className="block font-display text-base font-extrabold leading-6 text-[#07111f]">{quick.path.label}</span>
          </span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#25c990] text-[#07111f] transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      )}

      {quick.text && (
        <p className="mt-4 text-base leading-7 text-slate-700">{quick.text}</p>
      )}
    </section>
  );
};

/* -------------------------------------------------------------------------
 * Inhaltsverzeichnis (ab rund 1.500 Wörtern, siehe articleText.js)
 * ---------------------------------------------------------------------- */

export const TableOfContents = ({ sections, extraItems = [] }) => {
  const items = [
    ...sections.map((section) => ({ id: section.id, label: section.tocLabel || section.heading })),
    ...extraItems,
  ];
  return (
    <nav aria-label="Inhalt" className="mt-10 rounded-2xl border border-slate-200 bg-white" data-ratgeber-toc="">
      <details className="group">
        <summary className={`flex min-h-12 cursor-pointer list-none items-center gap-3 px-5 py-3 [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}>
          <span className="font-display text-base font-extrabold text-[#07111f]">Inhalt</span>
          <span className="text-sm text-slate-500">{items.length} Abschnitte</span>
          <ChevronDown className="ml-auto h-5 w-5 text-slate-400 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
        </summary>
        <ol className="border-t border-slate-100 px-5 pb-3 pt-1">
          {items.map((item, index) => (
            <li key={item.id} className="border-b border-slate-100 last:border-b-0">
              <a
                href={`#${item.id}`}
                className={`flex min-h-11 items-baseline gap-3 py-2.5 text-base leading-6 text-slate-700 hover:text-[#07111f] ${FOCUS_RING}`}
              >
                <span className="w-6 shrink-0 font-display text-sm font-bold text-[#087654]">{index + 1}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
};

/* -------------------------------------------------------------------------
 * Tabelle, die unter sm zu Karten wird (mobile: 'cards' oder costCard)
 * ---------------------------------------------------------------------- */

// Eine Tabelle, ein DOM: Unter sm werden Kopfzeile ausgeblendet und jede
// Zeile als Karte gezeigt, die Spaltennamen stehen per data-label vor dem
// Wert. So wird die Seite auch bei 320 px nie breiter als der Bildschirm.
export const ResponsiveTable = ({ block, highlightLast = false, dataAttr }) => {
  const lastIndex = block.head.length - 1;
  return (
    <div
      className={`mt-8 sm:overflow-x-auto sm:rounded-2xl sm:border sm:border-slate-200 ${highlightLast ? '' : 'md:-mx-10 lg:-mx-20'}`}
      {...(dataAttr ? { [dataAttr]: '' } : {})}
    >
      <table className="w-full border-collapse text-left text-base leading-7 text-slate-700 sm:table-fixed sm:text-[0.95rem] sm:leading-7">
        {block.caption && <caption className="sr-only">{block.caption}</caption>}
        <thead className="sr-only sm:not-sr-only">
          <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
            {block.head.map((cell, cellIndex) => (
              <th
                key={cell || `leer-${cellIndex}`}
                scope="col"
                className={`break-words hyphens-auto px-3 py-3 align-bottom sm:px-4 ${highlightLast && cellIndex === lastIndex ? 'bg-[#e3f6ee] text-[#087654]' : ''}`}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block space-y-3 sm:table-row-group sm:space-y-0">
          {block.rows.map((row) => (
            <tr
              key={row.join('|')}
              className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_6px_18px_rgba(7,17,31,0.04)] sm:table-row sm:rounded-none sm:border-0 sm:border-b sm:border-slate-100 sm:p-0 sm:shadow-none sm:last:border-b-0"
            >
              {row.map((cell, cellIndex) => (
                cellIndex === 0
                  ? (
                    <th
                      key={`${cell}-${cellIndex}`}
                      scope="row"
                      className="block break-words hyphens-auto pb-2 text-left font-display text-base font-extrabold leading-6 text-[#07111f] sm:table-cell sm:px-4 sm:py-3 sm:align-top sm:text-[0.95rem] sm:font-bold"
                    >
                      {cell}
                    </th>
                  )
                  : (
                    <td
                      key={`${cell}-${cellIndex}`}
                      data-label={block.head[cellIndex]}
                      className={`flex items-baseline justify-between gap-4 border-t border-slate-100 py-2 text-right before:shrink before:text-left before:text-[0.95rem] before:font-semibold before:text-slate-500 before:content-[attr(data-label)] sm:table-cell sm:border-0 sm:px-4 sm:py-3 sm:text-left sm:align-top sm:before:content-none ${highlightLast && cellIndex === lastIndex ? 'font-semibold text-[#087654] sm:bg-[#f1fbf6]' : ''}`}
                    >
                      <span className="break-words hyphens-auto">{cell}</span>
                    </td>
                  )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {block.note && <p className="mt-3 px-1 text-sm leading-6 text-slate-500 sm:mt-0 sm:border-t sm:border-slate-100 sm:px-4 sm:py-3">{block.note}</p>}
    </div>
  );
};

/* -------------------------------------------------------------------------
 * Kostenkarte: Kasse zahlt, du ohne Tarif, du mit Tarif
 * ---------------------------------------------------------------------- */

export const CostCard = ({ block }) => (
  <figure className="mt-8 rounded-[1.75rem] border border-slate-200 bg-[#f7f5f0] p-4 sm:p-6" data-ratgeber-costcard="">
    {block.title && (
      <figcaption className="flex items-center gap-3 px-1">
        <FriendlyIcon kind={block.icon || 'calculator'} tone="mint" size="sm" />
        <span className="font-display text-lg font-extrabold leading-snug text-[#07111f] sm:text-xl">{block.title}</span>
      </figcaption>
    )}
    {block.tariffLabel && <p className="mt-3 px-1 text-base leading-7 text-slate-600">{block.tariffLabel}</p>}
    <div className="sm:rounded-2xl sm:bg-white">
      <ResponsiveTable block={{ ...block, note: null }} highlightLast />
    </div>
    {block.note && <p className="mt-4 px-1 text-sm leading-6 text-slate-500">{block.note}</p>}
    {block.bonusNote && (
      <p className="mt-4 flex items-start gap-3 rounded-2xl bg-white p-4 text-base leading-7 text-slate-700">
        <FriendlyIcon kind="bonus" tone="butter" size="sm" />
        <span>{block.bonusNote}</span>
      </p>
    )}
  </figure>
);

/* -------------------------------------------------------------------------
 * Schritt-Leiste (Heil- und Kostenplan, Kasse genehmigt, Tarif erstattet)
 * ---------------------------------------------------------------------- */

export const StepTrack = ({ block }) => (
  <div className="mt-8" data-ratgeber-steps="">
    {block.heading && <p className="font-display text-lg font-extrabold text-[#07111f]">{block.heading}</p>}
    <ol className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4">
      {block.items.map((step, index) => (
        <li key={step.title} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-col sm:gap-3 sm:p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25c990]/15 font-display text-base font-extrabold text-[#087654]" aria-hidden="true">
            {index + 1}
          </span>
          <span>
            <span className="block font-display text-base font-extrabold leading-6 text-[#07111f] sm:text-lg">{step.title}</span>
            {step.text && <span className="mt-1 block text-base leading-7 text-slate-600">{step.text}</span>}
          </span>
          {index < block.items.length - 1 && (
            <ArrowRight className="absolute -right-3.5 top-1/2 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-white text-[#25c990] sm:block" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  </div>
);

/* -------------------------------------------------------------------------
 * Kasten "Ehrlich gesagt": Grenzen klar und freundlich
 * ---------------------------------------------------------------------- */

export const HonestBox = ({ block }) => (
  <aside className="mt-8 rounded-[1.75rem] border border-[#efe0b9] bg-[#fffaf0] p-5 sm:p-7" data-ratgeber-honest="">
    <p className="flex items-center gap-3 font-display text-lg font-extrabold leading-snug text-[#07111f] sm:text-xl">
      <FriendlyIcon kind="thinking" tone="butter" size="sm" />
      {block.heading}
    </p>
    {block.text && <p className="mt-4 text-base leading-7 text-slate-700 sm:text-[1.05rem] sm:leading-8">{block.text}</p>}
    {block.items?.length > 0 && (
      <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700 sm:text-[1.05rem] sm:leading-8">
        {block.items.map((item, index) => (
          <li key={typeof item === 'string' ? item : `${item.lead}-${index}`} className="flex gap-3">
            <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#d9a93b]" aria-hidden="true" />
            <span><ListItemText item={item} /></span>
          </li>
        ))}
      </ul>
    )}
  </aside>
);

/* -------------------------------------------------------------------------
 * Wischkarten je Thema (mobil waagerecht, ab sm im Raster)
 * ---------------------------------------------------------------------- */

const SwipeCardBody = ({ card }) => (
  <>
    <span className="flex items-center gap-3">
      {card.icon && <FriendlyIcon kind={card.icon} tone={card.tone || 'mint'} size="sm" />}
      {card.eyebrow && <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{card.eyebrow}</span>}
    </span>
    <span className="mt-4 block break-words font-display text-lg font-extrabold leading-snug text-[#07111f] hyphens-auto">{card.title}</span>
    {card.text && <span className="mt-2 block text-base leading-7 text-slate-600">{card.text}</span>}
    {card.linkLabel && (
      <span className="mt-auto flex items-center gap-2 pt-4 font-display text-base font-extrabold text-[#07111f]">
        {card.linkLabel}
        <ArrowRight className="h-4 w-4 text-[#087654] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
      </span>
    )}
  </>
);

export const SwipeCards = ({ block }) => (
  <div className="mt-8" data-ratgeber-cards="">
    {block.heading && <p className="font-display text-lg font-extrabold text-[#07111f]">{block.heading}</p>}
    {block.hint && <p className="mt-1 text-sm leading-6 text-slate-500 sm:hidden">{block.hint}</p>}
    <ul className="-mx-5 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
      {block.items.map((card) => {
        const cardClass = `group flex h-full min-h-[11rem] flex-col rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(7,17,31,0.06)] transition hover:border-[#25c990]/60 hover:shadow-[0_16px_36px_rgba(7,17,31,0.10)] ${FOCUS_RING}`;
        return (
          <li key={card.title} className="w-[82%] shrink-0 snap-start sm:w-auto">
            {card.to ? (
              <Link to={card.to} className={cardClass}>
                <SwipeCardBody card={card} />
              </Link>
            ) : (
              <div className={cardClass}>
                <SwipeCardBody card={card} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

/* -------------------------------------------------------------------------
 * Weg-Karte: der passende Zahn-Weg, passend zum Abschnitt
 * ---------------------------------------------------------------------- */

export const PathLink = ({ block }) => (
  <Link
    to={block.to}
    data-ratgeber-path={block.placement || 'abschnitt'}
    className={`group mt-8 flex min-h-[3.25rem] items-center gap-4 rounded-[1.5rem] border border-[#25c990]/40 bg-[#f4faf7] p-4 transition hover:border-[#25c990] hover:bg-[#effdf4] sm:p-5 ${FOCUS_RING}`}
  >
    <FriendlyIcon kind={block.icon || 'dental'} tone="mint" size="sm" />
    <span className="flex-1">
      {block.text && <span className="block text-base leading-6 text-slate-700">{block.text}</span>}
      <span className="mt-0.5 block font-display text-base font-extrabold leading-6 text-[#07111f]">{block.label}</span>
    </span>
    <ArrowRight className="h-5 w-5 shrink-0 text-[#087654] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
  </Link>
);

/* -------------------------------------------------------------------------
 * Häufige Fragen zum Aufklappen (faqStyle: 'accordion')
 * ---------------------------------------------------------------------- */

export const FaqAccordion = ({ faqs }) => (
  <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200" data-ratgeber-faq="accordion">
    {faqs.map((faq) => (
      <details key={faq.question} className="group">
        <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-extrabold leading-7 text-[#07111f] [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}>
          <span>{faq.question}</span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f4faf7] text-[#087654] transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true">
            <Plus className="h-5 w-5" />
          </span>
        </summary>
        <p className="pb-6 pr-2 text-lg leading-8 text-slate-700 sm:text-[1.1rem] sm:leading-9">{faq.answer}</p>
      </details>
    ))}
  </div>
);

/* -------------------------------------------------------------------------
 * Quellen und Stand
 * ---------------------------------------------------------------------- */

export const SourcesBlock = ({ sources }) => (
  <section id="quellen" aria-labelledby="quellen-heading" className="mt-14 scroll-mt-28 rounded-[1.75rem] bg-[#f7f5f0] p-5 sm:p-7" data-ratgeber-sources="">
    <h2 id="quellen-heading" className="font-display text-xl font-extrabold leading-snug tracking-[-0.02em] text-[#07111f] sm:text-2xl">
      Quellen und Stand
    </h2>
    <p className="mt-3 text-base leading-7 text-slate-700">
      Inhalt geprüft am <time dateTime={sources.checkedAt}>{sources.checkedAtLabel}</time>.
      {sources.intro ? ` ${sources.intro}` : null}
    </p>
    <ol className="mt-5 list-decimal space-y-3 pl-5 text-[0.95rem] leading-7 text-slate-700 marker:font-bold marker:text-[#087654]">
      {sources.items.map((source) => (
        <li key={`${source.label}-${source.href || ''}`} className="break-words pl-1">
          {source.href ? (
            <a href={source.href} target="_blank" rel="noopener noreferrer" className={`font-semibold text-[#07111f] ${LINK_UNDERLINE}`}>
              {source.label}
            </a>
          ) : (
            <span className="font-semibold text-[#07111f]">{source.label}</span>
          )}
          {source.publisher ? `, ${source.publisher}` : null}
          {source.stand ? `, Stand ${source.stand}` : null}
          {source.accessedAt ? `, abgerufen am ${source.accessedAt}` : null}
          {source.note ? `. ${source.note}` : null}
        </li>
      ))}
    </ol>
  </section>
);

/* -------------------------------------------------------------------------
 * Autorenkasten
 * ---------------------------------------------------------------------- */

export const AuthorBox = ({ author }) => (
  <section aria-labelledby="autor-heading" className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_44px_rgba(7,17,31,0.06)] sm:p-7" data-ratgeber-author={author.id}>
    <div className="flex items-center gap-4 sm:gap-5">
      <img
        src={author.image}
        alt={author.imageAlt}
        width="96"
        height="96"
        loading="lazy"
        decoding="async"
        className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-full object-cover ring-4 ring-[#f4faf7] sm:h-24 sm:w-24"
      />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Geschrieben von</p>
        <h2 id="autor-heading" className="mt-1 font-display text-xl font-extrabold leading-snug text-[#07111f] sm:text-2xl">
          {author.name}
        </h2>
        <p className="text-base leading-6 text-slate-600">{author.role}</p>
      </div>
    </div>
    <p className="mt-5 text-base leading-7 text-slate-700 sm:text-[1.05rem] sm:leading-8">{author.bio}</p>
    <p className="mt-4 text-sm leading-6 text-slate-500">
      {author.permission}{' '}
      <a href={author.registerUrl} target="_blank" rel="noopener noreferrer" className={LINK_UNDERLINE}>
        Eintrag im Vermittlerregister prüfen
      </a>
    </p>
    <Link
      to={author.profilePath}
      className={`mt-5 inline-flex min-h-11 items-center gap-2 font-display text-base font-extrabold text-[#07111f] ${LINK_UNDERLINE} ${FOCUS_RING}`}
    >
      Mehr über Frank und Healio
      <ArrowRight className="h-4 w-4 text-[#087654]" aria-hidden="true" />
    </Link>
  </section>
);
