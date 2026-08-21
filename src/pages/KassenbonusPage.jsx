import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CheckCircle2,
  Info,
  ShieldCheck,
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useLanguage } from '@/hooks/useLanguage';
import { createFAQSchema, createServiceSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';

const KASSENBOOST_URL = 'https://kassenboost.de/?utm_source=healio&utm_medium=website&utm_campaign=kassenbonus#vergleich';
const PATH_ICON_KIND = {
  contribution: 'money',
  bonus: 'bonus',
  services: 'ambulant',
};
const PROTECTION_ICON_KIND = {
  ambulant: 'ambulant',
  zahn: 'dental',
  stationaer: 'hospital',
};

const withoutContext = ({ '@context': _context, ...schema }) => schema;

const KassenbonusPage = () => {
  const { t } = useTranslation('kassenbonus');
  const { lang, getPath } = useLanguage();
  const [activePathKey, setActivePathKey] = useState('contribution');
  const pathItems = t('paths.items', { returnObjects: true });
  const bridgeCards = t('bridge.cards', { returnObjects: true });
  const faqItems = t('faq.items', { returnObjects: true });
  const mapItems = t('hero.mapItems', { returnObjects: true });
  const proofItems = t('hero.proof', { returnObjects: true });
  const everydayItems = t('everyday.items', { returnObjects: true });
  const processSteps = t('process.steps', { returnObjects: true });
  const transparencyItems = t('transparency.items', { returnObjects: true });
  const canonicalUrl = lang === 'en'
    ? 'https://healio.de/en/health-insurance-bonus'
    : 'https://healio.de/kassenbonus';

  const activePath = useMemo(() => (
    Array.isArray(pathItems)
      ? pathItems.find((item) => item.key === activePathKey) || pathItems[0]
      : null
  ), [activePathKey, pathItems]);

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      withoutContext(createWebPageSchema(t('seo.title'), t('seo.description'), canonicalUrl, lang === 'en' ? 'en-US' : 'de-DE')),
      withoutContext(createServiceSchema({
        serviceType: lang === 'en'
          ? 'German statutory health insurance comparison'
          : 'Vergleich gesetzlicher Krankenkassen',
        name: t('hero.title'),
        description: t('seo.description'),
        url: canonicalUrl,
        availableChannel: { serviceUrl: canonicalUrl },
        offers: {
          description: lang === 'en'
            ? 'Free comparison of contributions, realistic bonuses and relevant benefits'
            : 'Kostenloser Vergleich von Beitrag, realistischem Bonus und passenden Leistungen',
        },
      })),
      withoutContext(createFAQSchema((Array.isArray(faqItems) ? faqItems : []).map((faq) => ({
        question: faq.q,
        answer: faq.a,
      })))),
    ],
  };

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl={canonicalUrl}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        ogImage="https://healio.de/og-image.png"
        ogImageAlt={t('seo.ogImageAlt')}
        ogUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />

      <article className="w-full overflow-hidden bg-white text-slate-800">
        <section className="relative isolate overflow-hidden bg-home-midnight px-4 pb-20 pt-32 text-white sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-44">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_74%_28%,rgba(37,201,144,0.2),transparent_28%),radial-gradient(circle_at_12%_88%,rgba(67,125,180,0.16),transparent_30%)]" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.035),transparent_35%,rgba(255,255,255,0.02))]" aria-hidden="true" />

          <div className="healio-container grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.8fr)] lg:gap-16">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-home-mint">
                {t('hero.eyebrow')}
              </p>
              <h1 className="mt-5 max-w-[13ch] font-display text-[2.65rem] font-extrabold leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.2rem]">
                {t('hero.title')}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                {t('hero.description')}
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <a
                  href={KASSENBOOST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-home-mint px-6 font-display text-base font-extrabold text-home-midnight shadow-[0_16px_42px_rgba(37,201,144,0.24)] transition hover:-translate-y-0.5 hover:bg-home-mint-active focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4 focus-visible:ring-offset-home-midnight motion-reduce:transform-none sm:px-7"
                >
                  {t('hero.cta')}
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <span className="text-sm text-slate-400">{t('hero.ctaHint')}</span>
              </div>

              <div className="mt-9 grid gap-3 border-t border-white/15 pt-6 text-sm text-slate-300 sm:grid-cols-3">
                {(Array.isArray(proofItems) ? proofItems : []).map((item) => (
                  <span key={item} className="flex items-start gap-2 leading-5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-home-mint" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute -inset-8 rounded-[3rem] bg-home-mint/10 blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.07] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-7">
                <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                  <FriendlyIcon kind="comparison" tone="mint" size="sm" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-home-mint">{t('hero.mapEyebrow')}</p>
                    <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">{t('hero.mapTitle')}</h2>
                  </div>
                </div>

                <ol className="relative mt-6 space-y-3 before:absolute before:bottom-7 before:left-[1.4rem] before:top-7 before:w-px before:bg-gradient-to-b before:from-home-mint before:via-sky-300/60 before:to-white/20">
                  {(Array.isArray(mapItems) ? mapItems : []).map((item, index) => (
                    <li key={item.label} className="relative grid grid-cols-[2.8rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3.5">
                      <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-home-midnight font-display text-sm font-extrabold text-home-mint shadow-[0_0_0_5px_rgba(7,17,31,0.72)]">
                        {index + 1}
                      </span>
                      <span>
                        <strong className="block font-display text-base text-white">{item.label}</strong>
                        <span className="mt-0.5 block text-sm text-slate-300">{item.text}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                <p className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-home-mint px-4 py-3 text-center font-display text-sm font-extrabold text-home-midnight">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  {t('hero.mapNote')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="kassenbonus-paths-heading">
          <div className="healio-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-healio-primary-dark">{t('paths.eyebrow')}</p>
              <h2 id="kassenbonus-paths-heading" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl lg:text-5xl">
                {t('paths.title')}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{t('paths.description')}</p>
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
              <div className="grid gap-4 md:grid-cols-3" role="group" aria-label={t('paths.selectLabel')}>
                {(Array.isArray(pathItems) ? pathItems : []).map((item) => {
                  const selected = item.key === activePath?.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActivePathKey(item.key)}
                      aria-pressed={selected}
                      className={`group min-h-[174px] rounded-[1.75rem] border p-5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-4 ${selected
                        ? 'border-healio-primary bg-[#effbf6] shadow-[0_18px_48px_rgba(18,80,62,0.12)]'
                        : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-healio-primary/40 hover:shadow-lg motion-reduce:transform-none'}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <FriendlyIcon kind={PATH_ICON_KIND[item.key]} label={item.title} tone={item.tone} size="md" />
                        <span className={`grid h-7 w-7 place-items-center rounded-full border transition ${selected ? 'border-healio-primary bg-healio-primary text-white' : 'border-slate-200 text-transparent group-hover:border-healio-primary/50'}`}>
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                      <strong className="mt-5 block font-display text-xl font-extrabold text-home-midnight">{item.title}</strong>
                      <span className="mt-1 block text-sm leading-6 text-slate-500">{item.short}</span>
                    </button>
                  );
                })}
              </div>

              {activePath && (
                <div className="mt-6 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-[0_24px_60px_rgba(22,43,57,0.08)] lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.75fr)]" role="region" aria-live="polite">
                  <div className="p-6 sm:p-8 lg:p-10">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-healio-primary-dark">{activePath.title}</p>
                    <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-home-midnight sm:text-3xl">
                      {activePath.heading}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">{activePath.description}</p>
                    <ul className="mt-6 space-y-3">
                      {(Array.isArray(activePath.checks) ? activePath.checks : []).map((check) => (
                        <li key={check} className="flex gap-3 text-sm leading-6 text-slate-700 sm:text-base">
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-healio-primary/12 text-healio-primary-dark">
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between bg-home-midnight p-6 text-white sm:p-8 lg:p-10">
                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-home-mint">{t('paths.resultLabel')}</p>
                      <h4 className="mt-4 font-display text-2xl font-extrabold leading-tight">{activePath.resultTitle}</h4>
                      <p className="mt-4 leading-7 text-slate-300">{activePath.resultBody}</p>
                    </div>
                    <a
                      href={KASSENBOOST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-home-mint px-5 font-display text-sm font-extrabold text-home-midnight transition hover:bg-home-mint-active focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4 focus-visible:ring-offset-home-midnight"
                    >
                      {t('paths.cta')}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-home-ice px-4 py-20 sm:px-6 md:py-24 lg:px-8" aria-labelledby="kassenbonus-everyday-heading">
          <div className="healio-container grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div className="relative mx-auto grid w-full max-w-[440px] place-items-center rounded-[2.5rem] border border-healio-primary/20 bg-white p-8 shadow-[0_26px_70px_rgba(20,81,62,0.1)] sm:p-10">
              <div className="absolute inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(37,201,144,0.12),transparent_68%)]" aria-hidden="true" />
              <FriendlyIcon
                kind="prevention"
                label={t('everyday.title')}
                tone="mint"
                size="lg"
                className="relative h-32 w-32 rounded-[2.2rem] sm:h-40 sm:w-40"
              />
              <div className="relative mt-7 grid w-full grid-cols-2 gap-2 text-center text-xs font-semibold text-slate-600 sm:text-sm">
                {(Array.isArray(everydayItems) ? everydayItems : []).slice(0, 4).map((item) => (
                  <span key={item} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">{item}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-healio-primary-dark">{t('everyday.eyebrow')}</p>
              <h2 id="kassenbonus-everyday-heading" className="mt-4 max-w-[15ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl lg:text-5xl">
                {t('everyday.title')}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t('everyday.description')}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {(Array.isArray(everydayItems) ? everydayItems : []).map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-healio-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 rounded-2xl border border-sky-200 bg-sky-50 p-5">
                <p className="flex items-center gap-2 font-display text-sm font-extrabold text-home-midnight">
                  <Info className="h-4 w-4 text-sky-700" aria-hidden="true" />
                  {t('everyday.noteTitle')}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{t('everyday.note')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="kassenbonus-process-heading">
          <div className="healio-container">
            <div className="max-w-3xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-healio-primary-dark">{t('process.eyebrow')}</p>
              <h2 id="kassenbonus-process-heading" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl lg:text-5xl">
                {t('process.title')}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{t('process.description')}</p>
            </div>

            <ol className="relative mt-12 grid gap-5 lg:grid-cols-4 lg:gap-4 before:absolute before:left-[12.5%] before:right-[12.5%] before:top-8 before:hidden before:h-px before:bg-gradient-to-r before:from-healio-primary/25 before:via-healio-primary before:to-healio-primary/25 lg:before:block">
              {(Array.isArray(processSteps) ? processSteps : []).map((step, index) => (
                <li key={step.title} className="relative rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_42px_rgba(20,47,62,0.06)] sm:p-6">
                  <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full border-[6px] border-white bg-home-midnight font-display text-lg font-extrabold text-home-mint shadow-[0_0_0_1px_rgba(37,201,144,0.2)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-extrabold text-home-midnight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                </li>
              ))}
            </ol>

            <p className="mx-auto mt-8 max-w-4xl rounded-2xl border border-healio-primary/20 bg-[#effbf6] px-5 py-4 text-center text-sm leading-6 text-slate-700">
              {t('process.note')}
            </p>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-home-midnight px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="kassenbonus-bridge-heading">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(37,201,144,0.2),transparent_32%),radial-gradient(circle_at_84%_100%,rgba(76,143,197,0.14),transparent_30%)]" aria-hidden="true" />
          <div className="healio-container">
            <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.66fr)]">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-home-mint">{t('bridge.eyebrow')}</p>
                <h2 id="kassenbonus-bridge-heading" className="mt-4 max-w-[17ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                  {t('bridge.title')}
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{t('bridge.description')}</p>
              </div>
              <div className="rounded-[1.75rem] border border-home-mint/30 bg-home-mint/10 p-5 sm:p-6">
                <p className="font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">{t('bridge.budgetTitle')}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{t('bridge.budgetNote')}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {(Array.isArray(bridgeCards) ? bridgeCards : []).map((card) => (
                <Link
                  key={card.routeKey}
                  to={getPath(card.routeKey)}
                  className="group rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-6 transition hover:-translate-y-1 hover:border-home-mint/50 hover:bg-white/[0.1] focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4 focus-visible:ring-offset-home-midnight motion-reduce:transform-none"
                >
                  <FriendlyIcon kind={PROTECTION_ICON_KIND[card.routeKey]} label={card.title} tone={card.tone} size="md" />
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-white">{card.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-300">{card.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-extrabold text-home-mint">
                    {card.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-[#fbfcfc] px-4 py-20 sm:px-6 md:py-24 lg:px-8" aria-labelledby="kassenbonus-transparency-heading">
          <div className="healio-container grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-healio-primary-dark">{t('transparency.eyebrow')}</p>
              <h2 id="kassenbonus-transparency-heading" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl">
                {t('transparency.title')}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{t('transparency.description')}</p>
            </div>

            <div className="grid gap-4">
              {(Array.isArray(transparencyItems) ? transparencyItems : []).map((item, index) => (
                <div key={item.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-home-midnight font-display text-sm font-extrabold text-home-mint">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-home-midnight">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8" aria-labelledby="kassenbonus-faq-heading">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-healio-primary-dark">{t('faq.eyebrow')}</p>
              <h2 id="kassenbonus-faq-heading" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl">
                {t('faq.title')}
              </h2>
            </div>

            <div className="mt-10 space-y-3">
              {(Array.isArray(faqItems) ? faqItems : []).map((faq) => (
                <details key={faq.q} className="group rounded-2xl border border-slate-200 bg-white p-5 open:border-healio-primary/40 open:shadow-[0_14px_36px_rgba(20,70,53,0.08)] sm:p-6">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-extrabold text-home-midnight sm:text-lg [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition group-open:rotate-180 group-open:bg-healio-primary group-open:text-white">
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="pr-12 pt-3 text-sm leading-7 text-slate-600 sm:text-base">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 md:pb-28 lg:px-8">
          <div className="healio-container overflow-hidden rounded-[2.25rem] bg-[#eaf9f2] p-7 text-center shadow-[0_24px_64px_rgba(21,83,62,0.11)] sm:p-10 lg:p-14">
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-healio-primary-dark">{t('final.eyebrow')}</p>
            <h2 className="mx-auto mt-4 max-w-[19ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl lg:text-5xl">
              {t('final.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t('final.description')}</p>
            <a
              href={KASSENBOOST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-home-midnight px-7 font-display text-base font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-home-midnight focus-visible:ring-offset-4 focus-visible:ring-offset-[#eaf9f2] motion-reduce:transform-none"
            >
              {t('final.cta')}
              <ArrowUpRight className="h-5 w-5 text-home-mint" aria-hidden="true" />
            </a>
            <p className="mt-3 text-sm text-slate-500">{t('final.hint')}</p>
          </div>
        </section>
      </article>
    </>
  );
};

export default KassenbonusPage;
