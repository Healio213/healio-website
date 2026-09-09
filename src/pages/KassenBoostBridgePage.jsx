import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarCheck, Scale, ShieldCheck } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import AppointmentBooking from '@/components/CalendlyEmbed';
import { useLanguage } from '@/hooks/useLanguage';
import { createWebPageSchema, createFAQSchema } from '@/lib/createSchemaMarkup';

const KASSENBOOST_URL = 'https://kassenboost.de/?utm_source=healio&utm_medium=bridge&utm_campaign=kassenboost';

const KassenBoostBridgePage = () => {
  const { t } = useTranslation('kassenboost');
  const { lang, getPath } = useLanguage();
  const canonicalUrl = lang === 'en'
    ? 'https://healio.de/en/kassenboost'
    : 'https://healio.de/kassenboost';
  const privacyDetails = t('privacy.details', { returnObjects: true });
  const protectionAreas = t('protection.items', { returnObjects: true });
  const transparencyItems = t('termin.transparency', { returnObjects: true });
  const explainerItems = t('explainer.items', { returnObjects: true });

  const faqItems = t('faq.items', { returnObjects: true });
  const webPageSchema = createWebPageSchema(
    t('seo.title'),
    t('seo.description'),
    canonicalUrl,
    lang === 'en' ? 'en-US' : 'de-DE'
  );

  const schemaMarkup = [webPageSchema, createFAQSchema(faqItems)];

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl={canonicalUrl}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        ogImage="https://healio.de/images/kassenboost-bridge-og.png"
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
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#schutz"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25c990] px-6 py-3.5 text-sm font-bold text-[#07111f] transition-colors hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f] sm:text-base"
              >
                {t('hero.cta')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <span className="text-sm text-slate-400">{t('hero.ctaHint')}</span>
            </div>
            <div id="kassenboost-explainer" className="mt-12 max-w-4xl rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:p-8">
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#5ee0b1] sm:text-sm">{t('explainer.title')}</h2>
              <ol className="mt-5 grid gap-5 md:grid-cols-3 md:gap-6">
                {Array.isArray(explainerItems) && explainerItems.map((item, index) => (
                  <li key={item.label} className="relative">
                    <span className="font-display text-xs font-bold tracking-[0.18em] text-slate-400">0{index + 1}</span>
                    <h3 className="mt-2 font-display text-lg font-bold leading-tight text-white">{item.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="kassenboost-bonus-heading">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#0c7a5a] sm:text-sm">
                {t('bonus.eyebrow')}
              </p>
              <h2 id="kassenboost-bonus-heading" className="mt-5 max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('bonus.title')}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#55616e] sm:text-lg sm:leading-8">
                {t('bonus.description')}
              </p>
            </div>
            <div className="mt-10 rounded-[1.75rem] border border-[#cceadf] bg-[#f4faf7] p-6 sm:p-9">
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#0c7a5a]">
                {t('bonus.exampleLabel')}
              </p>
              <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-[#102333] sm:text-lg sm:leading-8">
                {t('bonus.example')}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[#5a6571]">
                {t('bonus.note')}
              </p>
              <a href="https://www.ikk-classic.de/pk/rv/produkte/bonusprogramm" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-[#0c6f53] underline underline-offset-4">{t('bonus.sourceLabel')}</a>
            </div>
          </div>
        </section>

        <section className="bg-[#f4faf7] px-4 py-14 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="kassenboost-paths-heading">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#0c7a5a] sm:text-sm">
                {t('paths.eyebrow')}
              </p>
              <h2 id="kassenboost-paths-heading" className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('paths.title')}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#55616e] sm:text-lg sm:leading-8">
                {t('paths.description')}
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="flex flex-col rounded-[1.75rem] border border-[#cceadf] bg-white p-6 sm:p-8">
                <Scale className="h-8 w-8 text-[#0c7a5a]" aria-hidden="true" />
                <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.035em] text-[#102333]">{t('paths.compare.title')}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5a6571] sm:text-base sm:leading-7">{t('paths.compare.description')}</p>
                <a
                  href={KASSENBOOST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-[#25c990] px-6 py-3 text-sm font-bold text-[#07111f] transition-colors hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4 sm:text-base"
                >
                  {t('paths.compare.cta')}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <p className="mt-4 text-xs leading-5 text-[#6b7680]">{t('paths.compare.note')}</p>
              </div>
              <div className="flex flex-col rounded-[1.75rem] border border-[#cceadf] bg-white p-6 sm:p-8">
                <CalendarCheck className="h-8 w-8 text-[#0c7a5a]" aria-hidden="true" />
                <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.035em] text-[#102333]">{t('paths.advice.title')}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5a6571] sm:text-base sm:leading-7">{t('paths.advice.description')}</p>
                <a
                  href="#termin"
                  className="mt-6 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-[#0c7a5a]/25 bg-[#f4faf7] px-6 py-3 text-sm font-bold text-[#0c6f53] transition-colors hover:border-[#0c7a5a]/45 hover:bg-[#e8f6f0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4 sm:text-base"
                >
                  {t('paths.advice.cta')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="schutz" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="kassenboost-protection-heading">
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
              {Array.isArray(protectionAreas) && protectionAreas.map((area) => (
                <Link key={area.routeKey} to={getPath(area.routeKey)} className="group flex flex-col rounded-[1.75rem] border border-[#cceadf] bg-[#f4faf7] p-6 transition-colors hover:border-[#0c7a5a] hover:bg-[#e8f6f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c7a5a] sm:p-7">
                  <img src={area.image} alt="" aria-hidden="true" width="192" height="192" loading="lazy" decoding="async" className="h-28 w-28 object-contain" />
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.035em] text-[#102333]">{area.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5a6571] sm:text-base sm:leading-7">{area.description}</p>
                  <span className="mt-auto flex items-center gap-2 pt-6 font-bold text-[#0c6f53]">{area.cta}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></span>
                </Link>
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

        <section className="bg-[#f4faf7] px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="kassenboost-privacy-heading">
          <div className="mx-auto w-full max-w-7xl">
            <h2 id="kassenboost-privacy-heading" className="font-display text-lg font-bold">{t('privacy.title')}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#46515e]">{t('privacy.confirmation')}</p>
            <details className="mt-3 max-w-3xl">
              <summary className="cursor-pointer rounded font-semibold text-[#0c6f53] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{t('privacy.summary')}</summary>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#46515e]" aria-label={t('privacy.listLabel')}>
                {privacyDetails.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </details>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8" aria-labelledby="kassenboost-faq-heading">
          <div className="mx-auto w-full max-w-7xl">
            <h2 id="kassenboost-faq-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{t('faq.title')}</h2>
            <div className="mt-8 max-w-3xl divide-y divide-slate-200">
              {faqItems.map((faq) => (
                <details key={faq.question} className="py-5">
                  <summary className="cursor-pointer rounded text-lg font-bold text-[#102333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{faq.question}</summary>
                  <p className="mt-4 text-base leading-7 text-[#55616e]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="termin" className="bg-[#f4faf7] px-4 py-20 scroll-mt-24 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="kassenboost-termin-heading">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#0c7a5a] sm:text-sm">
                {t('termin.eyebrow')}
              </p>
              <h2 id="kassenboost-termin-heading" className="mt-5 max-w-[16ch] font-display text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('termin.title')}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#55616e] sm:text-lg sm:leading-8">
                {t('termin.description')}
              </p>
            </div>
            <ul className="mt-8 grid gap-3 md:grid-cols-3">
              {Array.isArray(transparencyItems) && transparencyItems.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-[#cceadf] bg-white px-4 py-4 text-sm leading-6 text-[#46515e]">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0c7a5a]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-[#cceadf] bg-white">
              <AppointmentBooking placement="kassenboost_bridge" />
            </div>
          </div>
        </section>

        <section className="bg-[#07111f] px-4 py-12 text-white sm:px-6 lg:px-8" aria-labelledby="kassenboost-employer-heading">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#5ee0b1] sm:text-sm">
                {t('employer.eyebrow')}
              </p>
              <h2 id="kassenboost-employer-heading" className="mt-4 max-w-[25ch] font-display text-[clamp(1.6rem,3vw,2.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
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
