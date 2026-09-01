import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import DentalZahnCheck from '@/components/sections/dental/DentalZahnCheck';
import DentalVideoSection from '@/components/sections/dental/DentalVideoSection';
import { getDentalContent, LKH_GUIDELINE_URL } from '@/components/sections/dental/dentalContent';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import CompactBonusFeature from '@/components/sections/shared/CompactBonusFeature';
import SalesAiAssist from '@/components/sections/shared/SalesAiAssist';
import { createServiceSchema } from '@/lib/createSchemaMarkup';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';

const pathVisuals = {
  bayerische: { kind: 'dental', tone: 'mint' },
  ukv: { kind: 'family', tone: 'sky' },
  lkh: { kind: 'weighing', tone: 'butter' },
  sofort: { kind: 'calendar', tone: 'coral' },
};

const pathStyles = {
  mint: 'bg-[#effbf6] text-[#075f46]',
  sky: 'bg-[#eef8ff] text-[#245f83]',
  butter: 'bg-[#fff8df] text-[#70520b]',
  coral: 'bg-[#fff1ed] text-[#934638]',
};

const trustVisuals = [
  { kind: 'broker', tone: 'mint' },
  { kind: 'privacy', tone: 'sky' },
  { kind: 'support', tone: 'lavender' },
];

const scrollToCheck = (event, reduceMotion) => {
  event?.preventDefault();
  document.getElementById('zahn-check')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
};

const ZahnPage = () => {
  const { lang, getPath } = useLanguage();
  const { t: tSeo } = useTranslation('seo');
  const { t: tZahn } = useTranslation('zahn');
  const content = useMemo(() => getDentalContent(lang), [lang]);
  const reduceMotion = useReducedMotion();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/dental' : 'https://healio.de/zahn';

  return (
    <>
      <SEOHead
        title={tSeo('zahn.title')}
        description={tSeo('zahn.description')}
        canonicalUrl={canonicalUrl}
        ogTitle={tSeo('zahn.title')}
        ogDescription={tSeo('zahn.description')}
        ogImage="https://healio.de/og-image.png"
        ogUrl={canonicalUrl}
        schemaMarkup={createServiceSchema()}
      />

      <article className="overflow-hidden bg-white text-[#07111f]">
        <section
          className="relative isolate overflow-hidden bg-[#f4faf7] px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-44"
          aria-labelledby="zahn-hero-heading"
        >
          <div className="absolute inset-x-0 top-0 z-0 h-28 bg-gradient-to-b from-[#07111f] via-[#13283a] to-transparent sm:h-32" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-20 opacity-70"
            style={{
              backgroundImage:
                'radial-gradient(circle at 12% 18%, rgba(37,201,144,0.18), transparent 28%), radial-gradient(circle at 90% 16%, rgba(255,216,120,0.25), transparent 25%), linear-gradient(rgba(7,17,31,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(7,17,31,0.035) 1px, transparent 1px)',
              backgroundSize: 'auto, auto, 48px 48px, 48px 48px',
            }}
            aria-hidden="true"
          />
          <div className="absolute -left-20 top-40 -z-10 h-72 w-72 rounded-full bg-[#25c990]/15 blur-3xl" aria-hidden="true" />

          <div className="healio-container grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)] lg:gap-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55 }}
            >
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#087654]">
                {content.hero.eyebrow}
              </p>
              <h1
                id="zahn-hero-heading"
                className="mt-5 max-w-[15ch] text-[clamp(2.65rem,6.4vw,5.7rem)] font-extrabold leading-[0.94] tracking-[-0.06em] text-[#07111f] [text-wrap:balance]"
              >
                <span className="block font-display">{content.hero.titleLead}</span>
                <span className="relative isolate mt-3 block w-fit max-w-full font-friendly text-[#087654]">
                  <span className="relative z-10">{content.hero.titleAccent}</span>
                  <span className="absolute -bottom-1 left-0 z-0 h-3 w-[88%] -rotate-1 rounded-full bg-[#ffd978]/75 blur-[0.5px]" aria-hidden="true" />
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                {content.hero.text}
              </p>

              <a
                href="#zahn-check"
                onClick={(event) => scrollToCheck(event, reduceMotion)}
                className="mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#07111f] px-7 font-display text-base font-extrabold text-white shadow-[0_18px_44px_rgba(7,17,31,0.2)] transition hover:-translate-y-0.5 hover:bg-[#143528] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4 motion-reduce:transform-none sm:w-auto"
              >
                {content.hero.cta}<ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500">
                {content.hero.micro.map((item) => (
                  <li key={item} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#0b8b63]" aria-hidden="true" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, rotate: 2, y: 26 }}
              animate={{ opacity: 1, rotate: -1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.1 }}
              className="relative mx-auto w-full max-w-[31rem]"
            >
              <FriendlyIcon
                kind="dental"
                tone="mint"
                size="xl"
                decorative={false}
                label={content.hero.iconAlt}
                className="absolute -left-4 -top-7 z-20 h-28 w-28 -rotate-6 ring-[6px] ring-[#f4faf7] shadow-[0_22px_55px_rgba(27,83,64,0.2)] sm:-left-8 sm:h-32 sm:w-32"
              />

              <div className="relative overflow-hidden rounded-[2.5rem] border border-[#dbcda5] bg-[#fff9e8] p-7 pt-20 shadow-[0_30px_80px_rgba(74,58,20,0.18)] sm:p-10 sm:pt-24">
                <span className="absolute -left-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-[#f4faf7]" aria-hidden="true" />
                <span className="absolute -right-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-[#f4faf7]" aria-hidden="true" />

                <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#7a5911]">
                  {content.hero.ticketEyebrow}
                </p>
                <h2 className="mt-4 max-w-[14ch] font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-4xl">
                  {content.hero.ticketTitle}
                </h2>

                <div className="mt-7 grid gap-3">
                  <div className="rounded-2xl border border-[#ffc3b7] bg-[#fff0ec] p-4 font-display font-extrabold text-[#8e4134]">
                    {content.hero.ticketYes}
                  </div>
                  <div className="rounded-2xl border border-[#a9e7d1] bg-[#edf9f4] p-4 font-display font-extrabold text-[#075f46]">
                    {content.hero.ticketNo}
                  </div>
                </div>

                <div className="my-7 border-t-2 border-dashed border-[#d9cda9]" aria-hidden="true" />
                <p className="font-friendly text-xl font-bold text-[#4f3c0b]">{content.hero.ticketFooter}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {content.hero.routes.map((route) => (
                    <span key={route} className="rounded-full border border-[#e3d6b3] bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-600">
                      {route}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="healio-container mt-14 grid gap-4 border-t border-[#dbe8e1] pt-7 sm:grid-cols-3">
            {content.hero.trust.map((item, index) => (
              <div key={item} className="flex items-center justify-center gap-3 text-center text-sm font-bold text-slate-600 sm:justify-start sm:text-left">
                <FriendlyIcon kind={trustVisuals[index].kind} tone={trustVisuals[index].tone} size="sm" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {lang === 'de' && <DentalVideoSection />}

        <DentalZahnCheck />

        <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="zahn-paths-heading">
          <div className="healio-container">
            <div className="max-w-5xl">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#087654]">{content.paths.eyebrow}</p>
              <h2 id="zahn-paths-heading" className="mt-4 max-w-[28ch] font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                {content.paths.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{content.paths.text}</p>
            </div>

            <div className="mt-12 overflow-hidden rounded-[2.75rem] border border-[#dfe8e3] bg-white shadow-[0_24px_70px_rgba(20,46,37,0.08)]">
              <div className="grid md:grid-cols-2">
              {content.paths.cards.map((card, index) => {
                const visual = pathVisuals[card.key] || pathVisuals.bayerische;
                return (
                  <article
                    key={card.key}
                    className={`relative min-h-full p-7 sm:p-9 ${pathStyles[card.tone]} ${index < 3 ? 'border-b border-[#dfe8e3]' : ''} ${index === 2 ? 'md:border-b-0' : ''} ${index % 2 === 0 ? 'md:border-r md:border-[#dfe8e3]' : ''}`}
                  >
                    <span className="absolute -right-14 -top-16 h-40 w-40 rounded-full border border-current/10" aria-hidden="true" />
                    <div className="flex items-start justify-between gap-5">
                      <FriendlyIcon kind={visual.kind} tone={visual.tone} size="md" className="-rotate-2" />
                      <span className="rounded-full border border-current/20 bg-white/50 px-3 py-1.5 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.12em]">
                        {card.label}
                      </span>
                    </div>
                    <p className="mt-8 font-display text-xs font-extrabold uppercase tracking-[0.16em] opacity-75">{card.product}</p>
                    <h3 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.035em]">{card.title}</h3>
                    <p className="mt-4 max-w-xl leading-7 text-slate-600">{card.text}</p>
                    {card.sourceLabel && (
                      <a href={LKH_GUIDELINE_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-extrabold underline underline-offset-4">
                        {card.sourceLabel}<ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </article>
                );
              })}
              </div>
            </div>
            <p className="mt-6 text-sm leading-6 text-slate-500">{content.paths.footer}</p>
          </div>
        </section>

        <section id="kassenbonus" className="bg-[#f8faf9] px-4 py-20 sm:px-6 md:py-24 lg:px-8" aria-labelledby="zahn-bonus-heading">
          <div className="healio-container relative isolate grid items-center gap-10 overflow-hidden rounded-[2.75rem] bg-[#07111f] p-7 text-white shadow-[0_30px_80px_rgba(7,17,31,0.18)] sm:p-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:p-14">
            <div className="absolute -right-16 -top-20 -z-10 h-80 w-80 rounded-full border border-[#25c990]/15" aria-hidden="true" />
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#5ee0b1]">{content.bonus.eyebrow}</p>
              <h2 id="zahn-bonus-heading" className="mt-5 max-w-[16ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                {content.bonus.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">{content.bonus.text}</p>
              <p className="mt-3 max-w-2xl font-display text-base font-extrabold text-[#5ee0b1]">{content.bonus.detail}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#zahn-check"
                  onClick={(event) => scrollToCheck(event, reduceMotion)}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25c990] px-6 font-display text-base font-extrabold text-[#07111f] transition hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f]"
                >
                  {content.bonus.cta}<ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href={getPath('kassenboost')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 font-display text-sm font-extrabold text-white underline decoration-[#25c990] decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990]">
                  {content.bonus.link}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative mx-auto min-h-[25rem] w-full max-w-[26rem] rotate-1 overflow-hidden rounded-[2.25rem] border border-[#efda9b] bg-gradient-to-br from-[#fffaf0] to-[#ffe9b7] p-6 text-[#07111f] shadow-2xl sm:p-7">
              <span className="absolute left-1/2 top-0 h-4 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e7d4a0] bg-white/80" aria-hidden="true" />
              <p className="relative z-10 max-w-[14rem] font-display text-[0.68rem] font-extrabold uppercase tracking-[0.13em] text-[#77570c]">
                {content.bonus.stamp}
              </p>
              <h3 className="relative z-10 mt-4 max-w-[10ch] font-friendly text-3xl font-bold leading-[0.98] tracking-[-0.035em] text-[#103c30] sm:text-4xl">
                {content.bonus.question}
              </h3>
              <img
                src="/images/friendly-icons/bonus-you-mascot.webp"
                alt=""
                aria-hidden="true"
                width="512"
                height="512"
                className="absolute -right-8 top-4 w-[58%] max-w-[15.5rem] object-contain drop-shadow-[0_18px_22px_rgba(66,48,15,0.18)]"
              />

              <strong className="relative z-10 mt-16 block font-display text-[3.35rem] font-extrabold leading-none tracking-[-0.065em] text-[#087654] sm:mt-20 sm:text-[4.1rem]">
                {content.bonus.amount}
              </strong>
              <span className="relative z-10 mt-3 block max-w-[19rem] font-display text-sm font-extrabold leading-5 text-[#5c4510]">
                {content.bonus.stampLabel}
              </span>
              <p className="relative z-10 mt-5 border-t border-[#d9c07f] pt-4 text-[0.68rem] font-semibold leading-5 text-[#6e6250]">
                {content.bonus.condition}
              </p>
            </div>
          </div>
        </section>

        <CompactBonusFeature
          className="bg-[#f8faf9]"
          calculatorProps={{
            tarifTypes: 'Zahn',
            defaultMonatsbeitrag: 10,
            tariffInfoText: tZahn('bonusRechner.tariffInfo'),
            effectiveLabel: tZahn('bonusRechner.effectiveLabel'),
            effectiveValue: tZahn('bonusRechner.effectiveValue'),
            effectiveNote: tZahn('bonusRechner.effectiveNote'),
            bonusPayoutText: lang === 'en'
              ? 'Your statutory-insurer bonus may offset part or up to 100% of the eligible dental-plan premium. The applicable bonus and tariff terms determine the result.'
              : 'Dein Kassenbonus kann den anrechenbaren Beitrag deines Zahnschutzes teilweise oder bis zu 100 % ausgleichen. Maßgeblich sind die aktuellen Bonus- und Tarifbedingungen.',
            ctaOverride: {
              href: '#zahn-check',
              label: lang === 'en' ? 'Open dental check' : 'Zahnweg prüfen',
            },
          }}
        />

        <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="zahn-process-heading">
          <div className="healio-container grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.75fr)] lg:gap-20">
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#087654]">{content.process.eyebrow}</p>
              <h2 id="zahn-process-heading" className="mt-4 max-w-[15ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                {content.process.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{content.process.text}</p>

              <ol className="relative mt-10 grid gap-8 before:absolute before:bottom-5 before:left-[1.35rem] before:top-5 before:w-px before:bg-[#b7dfd1]">
                {content.process.steps.map((step, index) => (
                  <li key={step.title} className="relative grid grid-cols-[3.25rem_1fr] gap-4">
                    <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border-4 border-white bg-[#07111f] font-display text-xs font-extrabold text-[#5ee0b1] shadow-[0_8px_20px_rgba(7,17,31,0.14)]">0{index + 1}</span>
                    <div className="pt-1">
                      <h3 className="font-display text-lg font-extrabold tracking-[-0.02em]">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="self-start rounded-[2rem] border border-[#b6e8d5] bg-[#effbf6] p-7 sm:p-9">
              <FriendlyIcon kind="advisor" tone="lavender" size="lg" className="-rotate-2" />
              <h3 className="mt-7 font-display text-2xl font-extrabold leading-tight tracking-[-0.03em]">{content.process.trustTitle}</h3>
              <p className="mt-4 leading-7 text-slate-600">{content.process.trustText}</p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="grid min-h-28 place-items-center rounded-2xl bg-white p-3">
                  <img src="/siegel/bayerische/warentest-zahn-prestige-2025.jpg" alt="Stiftung Warentest Auszeichnung für ZAHN Prestige, 2025" className="max-h-20 w-auto object-contain" />
                </div>
                <div className="grid min-h-28 place-items-center rounded-2xl bg-white p-3">
                  <img src="/siegel/ukv/franke-bornberg-zahnprivat100-2025.svg" alt="Franke und Bornberg Auszeichnung für UKV ZahnPRIVAT 100, 2025" className="max-h-20 w-auto object-contain" />
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">{content.process.sealNote}</p>
            </aside>
          </div>
        </section>

        <SalesAiAssist className="bg-white" />

        <section className="bg-[#f4faf7] px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="zahn-faq-heading">
          <div className="healio-container">
            <div className="flex max-w-4xl items-start gap-5 sm:items-center">
              <FriendlyIcon kind="thinking" tone="mint" size="md" className="hidden -rotate-3 sm:inline-grid" />
              <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#087654]">{content.faq.eyebrow}</p>
              <h2 id="zahn-faq-heading" className="mt-4 max-w-[19ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                {content.faq.title}
              </h2>
              </div>
            </div>

            <div className="mt-12 grid border-b border-slate-200 lg:grid-cols-2 lg:gap-x-12">
              {content.faq.items.map((item) => (
                <details key={item.q} className="group border-t border-slate-200 py-1">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-display text-base font-extrabold text-[#07111f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] sm:text-lg [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown className="h-5 w-5 flex-none text-[#087654] transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-slate-600 sm:text-base">
                    <p>{item.a}</p>
                    {item.sourceLabel && (
                      <a href={LKH_GUIDELINE_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-1 font-bold text-[#087654] underline underline-offset-4">
                        {item.sourceLabel}<ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="healio-container mt-16">
            <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#07111f] p-7 text-white sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:p-14">
              <div className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-[#25c990]/10" aria-hidden="true" />
              <div>
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#5ee0b1]">{content.faq.finalEyebrow}</p>
                <h2 className="mt-4 max-w-[19ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">{content.faq.finalTitle}</h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-300">{content.faq.finalText}</p>
              </div>
              <a
                href="#zahn-check"
                onClick={(event) => scrollToCheck(event, reduceMotion)}
                className="mt-8 inline-flex min-h-14 w-full flex-none items-center justify-center gap-2 rounded-full bg-[#25c990] px-7 font-display text-base font-extrabold text-[#07111f] transition hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f] lg:mt-0 lg:w-auto"
              >
                {content.faq.finalCta}<ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default ZahnPage;
