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
const PROTECTION_CARD_STYLES = {
  ambulant: {
    card: 'border-[#bfe7d7] bg-[#edf9f3]',
    badge: 'bg-[#d7f3e6] text-[#116148]',
    note: 'border-[#cbe9dd] bg-white/65',
  },
  zahn: {
    card: 'border-[#edd9a5] bg-[#fff6dd]',
    badge: 'bg-[#f9e8b8] text-[#725313]',
    note: 'border-[#ead9ad] bg-white/65',
  },
  stationaer: {
    card: 'border-[#bed7ec] bg-[#eef6ff]',
    badge: 'bg-[#dbeafb] text-[#245b87]',
    note: 'border-[#cadeef] bg-white/65',
  },
};

const withoutContext = ({ '@context': _context, ...schema }) => schema;

const KassenbonusPage = () => {
  const { t } = useTranslation('kassenbonus');
  const { lang, getPath } = useLanguage();
  const [activePathKey, setActivePathKey] = useState('bonus');
  const pathItems = t('paths.items', { returnObjects: true });
  const bridgeCards = t('bridge.cards', { returnObjects: true });
  const faqItems = t('faq.items', { returnObjects: true });
  const mapItems = t('hero.mapItems', { returnObjects: true });
  const proofItems = t('hero.proof', { returnObjects: true });
  const everydayItems = t('everyday.items', { returnObjects: true });
  const finalProofItems = t('final.proof', { returnObjects: true });
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
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/20 bg-gradient-to-br from-[#fffaf0] via-[#f1fbf6] to-[#d8f0e5] px-5 pt-5 text-home-midnight sm:px-7 sm:pt-6">
                  <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-healio-primary/10" aria-hidden="true" />
                  <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-home-mint/15 blur-2xl" aria-hidden="true" />
                  <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-healio-primary-dark">{t('hero.mapEyebrow')}</p>
                    <h2 className="mt-2 max-w-[16ch] font-display text-2xl font-extrabold leading-tight sm:text-3xl">{t('hero.mapTitle')}</h2>
                  </div>
                  <img
                    src="/images/friendly-icons/decision-weighing.webp"
                    alt=""
                    aria-hidden="true"
                    width="512"
                    height="342"
                    fetchPriority="high"
                    decoding="async"
                    className="relative z-10 mx-auto mt-1 h-[180px] w-full select-none object-contain object-bottom drop-shadow-[0_16px_18px_rgba(22,48,40,0.16)] sm:h-[218px]"
                  />
                </div>

                <ol className="mt-4 grid grid-cols-3 gap-2">
                  {(Array.isArray(mapItems) ? mapItems : []).map((item, index) => (
                    <li key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/35 p-2.5 sm:p-3.5">
                      <span className="font-display text-xs font-extrabold text-home-mint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <strong className="mt-2 block font-display text-sm text-white sm:text-base">{item.label}</strong>
                      <span className="mt-0.5 hidden text-xs leading-5 text-slate-300 sm:block">{item.text}</span>
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
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(330px,0.62fr)] lg:gap-16">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-healio-primary-dark">{t('paths.eyebrow')}</p>
                <h2 id="kassenbonus-paths-heading" className="mt-4 max-w-[17ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl lg:text-5xl">
                  {t('paths.title')}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t('paths.description')}</p>
              </div>

              <a
                href={KASSENBOOST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mx-auto block w-full max-w-[390px] rounded-[1.8rem] border border-[#e4ca91] bg-gradient-to-br from-[#fffaf0] via-[#fff4d8] to-[#f8e2ad] p-5 text-home-midnight shadow-[0_24px_60px_rgba(74,58,24,0.16)] transition hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_30px_72px_rgba(74,58,24,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-4 motion-reduce:transform-none lg:-rotate-[1deg]"
              >
                <span className="absolute left-1/2 top-0 h-5 w-24 -translate-x-1/2 -translate-y-1/2 rotate-1 rounded-sm border border-white/80 bg-white/70 shadow-sm" aria-hidden="true" />
                <span className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-[#7a5a18]">{t('paths.triggerKicker')}</span>
                <span className="mt-3 grid grid-cols-[minmax(0,1fr)_104px] items-center gap-2">
                  <strong className="font-friendly text-[1.75rem] font-bold leading-[1.02] tracking-[-0.035em] text-[#0c3d31] sm:text-[2rem]">{t('paths.triggerQuestion')}</strong>
                  <img
                    src="/images/friendly-icons/bonus-you-mascot.webp"
                    alt=""
                    aria-hidden="true"
                    width="512"
                    height="512"
                    loading="lazy"
                    decoding="async"
                    className="h-[112px] w-[112px] -translate-x-1 select-none object-contain drop-shadow-[0_10px_12px_rgba(52,42,23,0.16)] transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transform-none"
                  />
                </span>
                <strong className="mt-1 block font-friendly text-5xl font-bold leading-none tracking-[-0.045em] text-[#087257] sm:text-[3.45rem]">{t('paths.triggerAmount')}</strong>
                <span className="mt-3 block font-display text-sm font-extrabold text-[#725313]">{t('paths.triggerScenario')}</span>
                <span className="mt-1 block text-xs leading-5 text-[#765f2e]">{t('paths.triggerTerms')}</span>
                <span className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-home-midnight px-5 font-display text-sm font-extrabold text-white transition group-hover:bg-[#13392f]">
                  {t('paths.triggerCta')}
                  <ArrowUpRight className="h-4 w-4 text-home-mint" aria-hidden="true" />
                </span>
                <span className="mt-4 block border-t border-[#d9bf87]/70 pt-3 text-[0.7rem] leading-[1.45] text-[#7a6539]">{t('paths.triggerNote')}</span>
              </a>
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

        <section className="relative isolate overflow-hidden bg-home-midnight px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="kassenbonus-bridge-heading">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(37,201,144,0.2),transparent_32%),radial-gradient(circle_at_84%_100%,rgba(76,143,197,0.14),transparent_30%)]" aria-hidden="true" />
          <div className="healio-container">
            <div className="max-w-4xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-home-mint">{t('bridge.eyebrow')}</p>
              <h2 id="kassenbonus-bridge-heading" className="mt-4 max-w-[17ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                {t('bridge.title')}
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{t('bridge.description')}</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {(Array.isArray(bridgeCards) ? bridgeCards : []).map((card) => {
                const styles = PROTECTION_CARD_STYLES[card.routeKey] || PROTECTION_CARD_STYLES.ambulant;
                return (
                  <Link
                    key={card.routeKey}
                    to={getPath(card.routeKey)}
                    className={`group flex min-h-full flex-col rounded-[1.9rem] border p-6 text-home-midnight shadow-[0_18px_46px_rgba(0,0,0,0.13)] transition hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(0,0,0,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4 focus-visible:ring-offset-home-midnight motion-reduce:transform-none ${styles.card}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <FriendlyIcon kind={PROTECTION_ICON_KIND[card.routeKey]} label={card.title} tone={card.tone} size="md" />
                      <span className={`rounded-full px-3 py-1.5 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.12em] ${styles.badge}`}>{card.badge}</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-extrabold">{card.title}</h3>
                    <p className="mt-3 font-display text-2xl font-extrabold leading-[1.14] tracking-[-0.025em]">{card.highlight}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-700">{card.text}</p>
                    <p className={`mt-5 rounded-xl border px-3 py-2.5 text-[0.7rem] leading-5 text-slate-600 ${styles.note}`}>{card.note}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-display text-sm font-extrabold text-home-midnight">
                      {card.cta}
                      <ArrowRight className="h-4 w-4 text-healio-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
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
          <div className="healio-container relative isolate grid items-center gap-8 overflow-hidden rounded-[2.25rem] bg-[#eaf9f2] p-7 shadow-[0_24px_64px_rgba(21,83,62,0.11)] sm:p-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:p-14">
            <div className="absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-home-mint/20 blur-3xl" aria-hidden="true" />
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-healio-primary-dark">{t('final.eyebrow')}</p>
              <h2 className="mt-4 max-w-[19ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl lg:text-5xl">
                {t('final.title')}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t('final.description')}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {(Array.isArray(finalProofItems) ? finalProofItems : []).map((item) => (
                  <li key={item} className="inline-flex items-center gap-2 rounded-full border border-healio-primary/20 bg-white/75 px-3.5 py-2 text-xs font-bold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-healio-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
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

            <div className="relative mx-auto w-full max-w-[320px] rounded-[1.8rem] border border-white/80 bg-white/65 px-4 pt-5 shadow-[0_20px_50px_rgba(18,74,56,0.12)]">
              <span className="mx-auto block w-fit rounded-full bg-[#fff1cf] px-4 py-2 text-center font-display text-xs font-extrabold text-[#705316]">{t('final.characterNote')}</span>
              <img
                src="/images/friendly-icons/decision-choice.webp"
                alt=""
                aria-hidden="true"
                width="512"
                height="512"
                loading="lazy"
                decoding="async"
                className="mx-auto mt-1 h-[240px] w-full select-none object-contain object-bottom drop-shadow-[0_14px_18px_rgba(24,70,56,0.15)]"
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default KassenbonusPage;
