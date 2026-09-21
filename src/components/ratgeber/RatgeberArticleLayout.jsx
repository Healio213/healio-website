import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { buildKassenboostUrl } from '@/lib/ratgeber-cta';
import { trackMetaLead } from '@/lib/meta-pixel';
import { trackGoogleAdsLead } from '@/lib/google-ads';

/**
 * Wiederverwendbare Artikelvorlage fuer /ratgeber.
 *
 * Eine Textspalte, rund 68 Zeichen breit, viel Weissraum, keine Seitenleiste,
 * Handy zuerst. Die Vorlage enthaelt bewusst keinen Anredetext: ob der
 * Artikel Du oder Sie sagt, steht ausschliesslich in der Inhaltsdatei.
 *
 * Der Button erscheint dreimal: nach dem im Inhalt markierten Abschnitt, am
 * Ende des Textes und unter md zusaetzlich als feste Leiste am unteren Rand.
 * Die Leiste blendet sich aus, sobald der Schluss der Seite sichtbar wird,
 * damit sie nie ueber der Fusszeile mit den Pflichtangaben liegt.
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

const RatgeberBlock = ({ block }) => {
  if (block.type === 'list') {
    return (
      <ul className="mt-6 space-y-3 pl-5 text-lg leading-8 text-slate-700 sm:text-[1.15rem] sm:leading-9">
        {block.items.map((item) => (
          <li key={item} className="list-disc marker:text-[#25c990]">{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="mt-6 text-lg leading-8 text-slate-700 sm:text-[1.15rem] sm:leading-9">
      {block.text}
    </p>
  );
};

const RatgeberArticleLayout = ({ article }) => {
  const { search } = useLocation();
  const endRef = useRef(null);
  const [mobileBarVisible, setMobileBarVisible] = useState(true);

  const ctaUrl = useMemo(() => buildKassenboostUrl(search), [search]);
  const notice = KIND_NOTICE[article.kind] || KIND_NOTICE.ratgeber;
  const canonicalUrl = `https://healio.de/ratgeber/${article.slug}`;

  useEffect(() => {
    const target = endRef.current;
    if (!target || typeof IntersectionObserver !== 'function') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setMobileBarVisible(!entry.isIntersecting),
      { rootMargin: '0px 0px -8px 0px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEOHead
        title={article.metaTitle}
        description={article.metaDescription}
        canonicalUrl={canonicalUrl}
        robots={article.kind === 'advertorial' ? 'noindex, nofollow' : 'index, follow'}
        ogType="article"
      />

      <article className="bg-white pb-28 pt-24 text-slate-700 sm:pt-28 md:pb-20">
        <div className="mx-auto w-full max-w-[68ch] px-5 sm:px-6">
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            {notice}
          </p>

          <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.15] tracking-[-0.03em] text-[#07111f] sm:text-4xl">
            {article.headline}
          </h1>

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

              {section.id === article.ctaAfterSectionId && (
                <div className="mt-10">
                  <RatgeberCtaButton href={ctaUrl} label={article.ctaLabel} placement="inline" />
                </div>
              )}
            </section>
          ))}

          <div className="mt-14">
            <RatgeberCtaButton href={ctaUrl} label={article.ctaLabel} placement="end" />
          </div>

          <footer ref={endRef} className="mt-16 border-t border-slate-200 pt-8">
            {article.footnote && (
              <p className="text-sm italic leading-6 text-slate-500">{article.footnote}</p>
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

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-5 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-8px_24px_rgba(7,17,31,0.08)] backdrop-blur md:hidden ${mobileBarVisible ? '' : 'hidden'}`}
      >
        <RatgeberCtaButton href={ctaUrl} label={article.ctaLabel} placement="mobile" />
      </div>
    </>
  );
};

export default RatgeberArticleLayout;
