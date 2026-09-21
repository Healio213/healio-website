import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { buildInternalRatgeberUrl, buildKassenboostUrl } from '@/lib/ratgeber-cta';
import { createArticleSchema, createFAQSchema } from '@/lib/createSchemaMarkup';
import { trackMetaLead } from '@/lib/meta-pixel';
import { trackGoogleAdsLead } from '@/lib/google-ads';

/**
 * Wiederverwendbare Artikelvorlage fuer /ratgeber.
 *
 * Eine Textspalte, rund 68 Zeichen breit, viel Weissraum, keine Seitenleiste,
 * Handy zuerst. Die Vorlage enthaelt bewusst keinen Anredetext: ob der
 * Artikel Du oder Sie sagt, steht ausschliesslich in der Inhaltsdatei.
 *
 * Zwei Artikelarten, gesteuert ueber das Feld kind:
 *
 * - 'advertorial': bezahlter Einstieg. Der KassenBoost-Button erscheint
 *   dreimal, nach dem markierten Abschnitt, am Ende und unter md als feste
 *   Leiste. Die Leiste blendet sich aus, sobald der Schluss sichtbar wird,
 *   damit sie nie ueber der Fusszeile mit den Pflichtangaben liegt.
 * - 'ratgeber': organischer, indexierter Artikel. Kein dreifacher Button,
 *   keine feste Leiste. Hoechstens ein einzelner interner Button aus dem
 *   Feld internalCta, plus der Absatz "So gehst du weiter vor" mit Links.
 */

const KIND_NOTICE = {
  advertorial: 'Anzeige · Ratgeber von Healio',
  ratgeber: 'Ratgeber von Healio',
};

const LEGAL_LINKS = [
  { to: '/impressum', label: 'Impressum' },
  { to: '/datenschutz', label: 'Datenschutzerklärung' },
  { to: '/erstinformation', label: 'Erstinformation nach § 15 VersVermV' },
];

const CTA_BASE_CLASS = 'inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#25c990] px-7 text-center font-display text-base font-extrabold text-[#07111f] shadow-[0_16px_42px_rgba(37,201,144,0.24)] transition hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07111f] focus-visible:ring-offset-2 motion-reduce:transform-none';

const PARAGRAPH_CLASS = 'mt-6 text-lg leading-8 text-slate-700 sm:text-[1.15rem] sm:leading-9';

const RatgeberCtaButton = ({ href, label, placement, className = '' }) => {
  const handleClick = useCallback(() => {
    // Ein Lead-Ereignis pro Klick, an Pixel und CAPI mit derselben event_id.
    // Ohne Zustimmung "marketing" passiert im Modul nichts.
    trackMetaLead();
    trackGoogleAdsLead();
  }, []);

  return (
    // Bewusst nur noopener, kein noreferrer: kassenboost.de soll healio.de
    // als Herkunft sehen, damit die Kampagnenkette bis zum Check haelt.
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      href={href}
      target="_blank"
      rel="noopener"
      data-ratgeber-cta={placement}
      onClick={handleClick}
      className={`${CTA_BASE_CLASS} ${className}`.trim()}
    >
      {label}
    </a>
  );
};

/**
 * Interner Button eines Ratgeberartikels. Kein neuer Tab, kein externes
 * Ziel, aber dieselbe UTM-Durchreichung wie beim Advertorial, damit eine
 * Anzeigengruppe bis zur Tarifseite messbar bleibt.
 */
const RatgeberInternalCtaButton = ({ to, label }) => {
  const handleClick = useCallback(() => {
    trackMetaLead();
    trackGoogleAdsLead();
  }, []);

  return (
    <Link
      to={to}
      data-ratgeber-internal-cta="end"
      onClick={handleClick}
      className={CTA_BASE_CLASS}
    >
      {label}
    </Link>
  );
};

const RatgeberSegments = ({ segments }) => (
  <>
    {segments.map((segment, index) => {
      if (segment.to) {
        return (
          <Link
            key={`${segment.text}-${index}`}
            to={segment.to}
            className="underline underline-offset-4 decoration-[#25c990] hover:text-[#07111f]"
          >
            {segment.text}
          </Link>
        );
      }

      if (segment.href) {
        return (
          <a
            key={`${segment.text}-${index}`}
            href={segment.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-[#25c990] hover:text-[#07111f]"
          >
            {segment.text}
          </a>
        );
      }

      return <React.Fragment key={`${segment.text}-${index}`}>{segment.text}</React.Fragment>;
    })}
  </>
);

const RatgeberListItem = ({ item }) => {
  if (typeof item === 'string') return item;

  return (
    <>
      <strong className="font-display font-extrabold text-[#07111f]">{item.lead}</strong>
      {item.text ? ` ${item.text}` : null}
    </>
  );
};

const RatgeberBlock = ({ block }) => {
  if (block.type === 'list') {
    const ListTag = block.ordered ? 'ol' : 'ul';
    const markerClass = block.ordered ? 'list-decimal' : 'list-disc';

    return (
      <ListTag className="mt-6 space-y-3 pl-5 text-lg leading-8 text-slate-700 sm:text-[1.15rem] sm:leading-9">
        {block.items.map((item, index) => (
          <li
            key={typeof item === 'string' ? item : `${item.lead}-${index}`}
            className={`${markerClass} marker:text-[#25c990]`}
          >
            <RatgeberListItem item={item} />
          </li>
        ))}
      </ListTag>
    );
  }

  if (block.type === 'table') {
    // Breite Vergleichstabellen duerfen ab md etwas aus der Textspalte
    // herauswachsen, damit die letzte Spalte nicht abgeschnitten wird.
    // Darunter traegt der Rahmen den waagerechten Bildlauf.
    // Ab vier Spalten waechst die natuerliche Breite ueber jede Textspalte
    // hinaus. Dann bekommen alle Spalten dieselbe Breite und der Text bricht
    // um, statt dass die letzte Spalte aus dem Rahmen faellt.
    const wide = block.head.length >= 4;

    return (
      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 md:-mx-10 lg:-mx-20">
        <table className={`w-full border-collapse text-left text-sm leading-6 text-slate-700 sm:text-[0.95rem] sm:leading-7 ${wide ? 'table-fixed min-w-[40rem]' : 'min-w-[30rem]'}`}>
          {block.caption && <caption className="sr-only">{block.caption}</caption>}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
              {block.head.map((cell) => (
                <th key={cell} scope="col" className="break-words px-3 py-3 align-bottom sm:px-4">{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join('|')} className="border-b border-slate-100 last:border-b-0">
                {row.map((cell, cellIndex) => (
                  cellIndex === 0
                    ? (
                      <th key={cell} scope="row" className="break-words px-3 py-3 text-left align-top font-display font-bold text-[#07111f] sm:px-4">
                        {cell}
                      </th>
                    )
                    : (
                      <td key={`${cell}-${cellIndex}`} className="break-words px-3 py-3 align-top sm:px-4">{cell}</td>
                    )
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {block.note && <p className="border-t border-slate-100 px-3 py-3 text-sm leading-6 text-slate-500 sm:px-4">{block.note}</p>}
      </div>
    );
  }

  if (block.type === 'segments') {
    return (
      <p className={PARAGRAPH_CLASS}>
        <RatgeberSegments segments={block.segments} />
      </p>
    );
  }

  return <p className={PARAGRAPH_CLASS}>{block.text}</p>;
};

const RatgeberArticleLayout = ({ article }) => {
  const { search } = useLocation();
  const endRef = useRef(null);
  const [mobileBarVisible, setMobileBarVisible] = useState(true);

  const isAdvertorial = article.kind === 'advertorial';
  const ctaUrl = useMemo(() => buildKassenboostUrl(search), [search]);
  const internalCtaUrl = useMemo(
    () => (article.internalCta ? buildInternalRatgeberUrl(article.internalCta.to, search) : null),
    [article.internalCta, search],
  );
  const notice = KIND_NOTICE[article.kind] || KIND_NOTICE.ratgeber;
  const canonicalUrl = `https://healio.de/ratgeber/${article.slug}`;

  const schemaMarkup = useMemo(() => {
    if (isAdvertorial) return null;

    const graph = [
      createArticleSchema({
        headline: article.headline,
        description: article.metaDescription,
        url: canonicalUrl,
        datePublished: article.publishedAt || null,
        dateModified: article.updatedAt || article.publishedAt || null,
      }),
    ];

    if (article.faqs?.length) {
      graph.push(createFAQSchema(article.faqs));
    }

    return graph;
  }, [article, canonicalUrl, isAdvertorial]);

  useEffect(() => {
    if (!isAdvertorial) return undefined;
    const target = endRef.current;
    if (!target || typeof IntersectionObserver !== 'function') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setMobileBarVisible(!entry.isIntersecting),
      { rootMargin: '0px 0px -8px 0px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isAdvertorial]);

  return (
    <>
      <SEOHead
        title={article.metaTitle}
        description={article.metaDescription}
        canonicalUrl={canonicalUrl}
        robots={isAdvertorial ? 'noindex, nofollow' : 'index, follow'}
        ogType="article"
        schemaMarkup={schemaMarkup}
      />

      <article className={`bg-white pt-24 text-slate-700 sm:pt-28 ${isAdvertorial ? 'pb-28 md:pb-20' : 'pb-20'}`}>
        <div className="mx-auto w-full max-w-[68ch] px-5 sm:px-6">
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            {notice}
          </p>

          <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.15] tracking-[-0.03em] text-[#07111f] sm:text-4xl">
            {article.headline}
          </h1>

          {article.readingTimeMinutes && (
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Lesezeit etwa {article.readingTimeMinutes} Minuten
            </p>
          )}

          <p className="mt-6 text-xl leading-9 text-slate-600 sm:text-[1.3rem] sm:leading-10">
            {article.lead}
          </p>

          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-14">
              <h2 className="font-display text-2xl font-extrabold leading-snug tracking-[-0.02em] text-[#07111f] sm:text-3xl">
                {section.heading}
              </h2>

              {section.blocks.map((block, index) => (
                <RatgeberBlock key={`${section.id}-${index}`} block={block} />
              ))}

              {isAdvertorial && section.id === article.ctaAfterSectionId && (
                <div className="mt-10">
                  <RatgeberCtaButton href={ctaUrl} label={article.ctaLabel} placement="inline" />
                </div>
              )}
            </section>
          ))}

          {article.factNugget && (
            // Eigener, maschinenlesbarer Block fuer Antwortmaschinen. Das
            // Attribut data-geo bleibt im ausgelieferten HTML stehen und
            // markiert den einen Absatz, den eine KI zitieren soll.
            <section
              data-geo="fact-nugget"
              id="fact-nugget"
              aria-labelledby="fact-nugget-heading"
              className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
            >
              <h2
                id="fact-nugget-heading"
                className="font-display text-xl font-extrabold leading-snug tracking-[-0.02em] text-[#07111f] sm:text-2xl"
              >
                Fact Nugget für KI
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                {article.factNugget}
              </p>
            </section>
          )}

          {article.faqs?.length > 0 && (
            <section id="haeufige-fragen" className="mt-14">
              <h2 className="font-display text-2xl font-extrabold leading-snug tracking-[-0.02em] text-[#07111f] sm:text-3xl">
                Häufige Fragen
              </h2>
              <dl className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
                {article.faqs.map((faq) => (
                  <div key={faq.question} className="py-6">
                    <dt className="font-display text-lg font-extrabold leading-7 text-[#07111f]">
                      {faq.question}
                    </dt>
                    <dd className="mt-3 text-lg leading-8 text-slate-700 sm:text-[1.15rem] sm:leading-9">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {article.internalCta && (
            <section id="bonus-umwandeln" className="mt-14">
              <h2 className="font-display text-2xl font-extrabold leading-snug tracking-[-0.02em] text-[#07111f] sm:text-3xl">
                {article.internalCta.heading}
              </h2>
              {article.internalCta.blocks.map((block, index) => (
                <RatgeberBlock key={`internal-cta-${index}`} block={block} />
              ))}
              <div className="mt-8">
                <RatgeberInternalCtaButton to={internalCtaUrl} label={article.internalCta.label} />
              </div>
            </section>
          )}

          {article.onward && (
            <section id="naechster-schritt" className="mt-14">
              <h2 className="font-display text-2xl font-extrabold leading-snug tracking-[-0.02em] text-[#07111f] sm:text-3xl">
                {article.onward.heading}
              </h2>
              <p className={PARAGRAPH_CLASS}>
                <RatgeberSegments segments={article.onward.segments} />
              </p>
            </section>
          )}

          {isAdvertorial && (
            <div className="mt-14">
              <RatgeberCtaButton href={ctaUrl} label={article.ctaLabel} placement="end" />
            </div>
          )}

          <footer ref={endRef} className="mt-16 border-t border-slate-200 pt-8">
            {article.publishedAt && (
              <p className="text-sm leading-6 text-slate-500">
                Stand: <time dateTime={article.publishedAt}>{article.publishedAtLabel || article.publishedAt}</time>
              </p>
            )}

            {article.footnote && (
              <p className="mt-3 text-sm italic leading-6 text-slate-500">{article.footnote}</p>
            )}

            <ul className="mt-6 flex flex-col gap-3 text-sm leading-6 text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="underline underline-offset-4 hover:text-[#07111f]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </article>

      {isAdvertorial && (
        <div
          className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-5 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-8px_24px_rgba(7,17,31,0.08)] backdrop-blur md:hidden ${mobileBarVisible ? '' : 'hidden'}`}
        >
          <RatgeberCtaButton href={ctaUrl} label={article.ctaLabel} placement="mobile" />
        </div>
      )}
    </>
  );
};

export default RatgeberArticleLayout;
