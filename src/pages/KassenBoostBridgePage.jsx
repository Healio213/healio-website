import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/hooks/useLanguage';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';

const KASSENBOOST_URL = 'https://kassenboost.de/?utm_source=healio&utm_medium=bridge&utm_campaign=kassenboost';

const KassenBoostBridgePage = () => {
  const { t } = useTranslation('kassenboost');
  const { lang, getPath } = useLanguage();
  const canonicalUrl = lang === 'en'
    ? 'https://healio.de/en/kassenboost'
    : 'https://healio.de/kassenboost';
  const privacyDetails = t('privacy.details', { returnObjects: true });
  const protectionAreas = t('protection.items', { returnObjects: true });

  const schemaMarkup = createWebPageSchema(
    t('seo.title'),
    t('seo.description'),
    canonicalUrl,
    lang === 'en' ? 'en-US' : 'de-DE'
  );

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl={canonicalUrl}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        ogUrl={canonicalUrl}
        ogImageAlt={t('seo.ogImageAlt')}
        schemaMarkup={schemaMarkup}
      />

      <article className="w-full overflow-hidden bg-white text-[#07111f] selection:bg-[#25c990] selection:text-[#07111f]">
        <section className="relative overflow-hidden bg-[#07111f] px-4 pb-20 pt-32 text-white sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-40" aria-labelledby="kassenboost-heading">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-48 top-10 h-[30rem] w-[30rem] rounded-full border border-[#25c990]/15" />
            <div className="absolute -right-24 top-28 h-[20rem] w-[20rem] rounded-full border border-white/[0.06]" />
          </div>
          <div className="relative mx-auto w-full max-w-7xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#5ee0b1] sm:text-sm">
              {t('hero.eyebrow')}
            </p>
            <h1 id="kassenboost-heading" className="mt-6 max-w-[13ch] font-display text-[clamp(2.6rem,7vw,6.2rem)] font-extrabold leading-[0.96] tracking-[-0.055em] [text-wrap:balance]">
              {t('hero.title')}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:text-xl">
              {t('hero.description')}
            </p>
            <a
              href={KASSENBOOST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25c990] px-6 py-3.5 text-sm font-bold text-[#07111f] transition-colors hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f] sm:text-base"
            >
              {t('hero.cta')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              {t('hero.externalNote')}
            </p>
          </div>
        </section>

        <section className="bg-[#f4faf7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="kassenboost-privacy-heading">
          <div className="mx-auto grid w-full max-w-7xl gap-10 rounded-[2rem] border border-[#cceadf] bg-white p-6 shadow-[0_18px_55px_rgba(7,17,31,0.06)] sm:p-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-12">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#0c7a5a] sm:text-sm">
                {t('privacy.eyebrow')}
              </p>
              <h2 id="kassenboost-privacy-heading" className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,4vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-0.045em] [text-wrap:balance]">
                {t('privacy.title')}
              </h2>
              <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-[#102333] sm:text-lg sm:leading-8">
                {t('privacy.confirmation')}
              </p>
            </div>
            <ul className="grid gap-3" aria-label={t('privacy.listLabel')}>
              {Array.isArray(privacyDetails) && privacyDetails.map((detail) => (
                <li key={detail} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#fbfdfc] px-4 py-4 text-sm leading-6 text-[#46515e] sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dff7ee] text-[#0c7a5a]">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28" aria-labelledby="kassenboost-protection-heading">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#0c7a5a] sm:text-sm">
                {t('protection.eyebrow')}
              </p>
              <h2 id="kassenboost-protection-heading" className="mt-5 max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('protection.title')}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#55616e] sm:text-lg sm:leading-8">
                {t('protection.description')}
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {Array.isArray(protectionAreas) && protectionAreas.map((area, index) => (
                <section key={area.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 sm:p-7">
                  <p className="font-display text-xs font-bold tracking-[0.18em] text-[#0c7a5a]">0{index + 1}</p>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.035em] text-[#102333]">{area.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5a6571] sm:text-base sm:leading-7">{area.description}</p>
                </section>
              ))}
            </div>
            <Link
              to={getPath('leistungen')}
              className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0c7a5a]/25 bg-[#f4faf7] px-6 py-3 text-sm font-bold text-[#0c6f53] transition-colors hover:border-[#0c7a5a]/45 hover:bg-[#e8f6f0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4 sm:text-base"
            >
              {t('protection.cta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="bg-[#07111f] px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8" aria-labelledby="kassenboost-employer-heading">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#5ee0b1] sm:text-sm">
                {t('employer.eyebrow')}
              </p>
              <h2 id="kassenboost-employer-heading" className="mt-5 max-w-[17ch] font-display text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('employer.title')}
              </h2>
            </div>
            <div>
              <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                {t('employer.description')}
              </p>
              <Link
                to={t('employer.ctaHref')}
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#07111f] transition-colors hover:bg-[#e8f6f0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f] sm:text-base"
              >
                {t('employer.cta')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default KassenBoostBridgePage;
