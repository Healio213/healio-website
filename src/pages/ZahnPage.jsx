import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronDown,
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import DentalZahnCheck from '@/components/sections/dental/DentalZahnCheck';
import DentalVideoSection from '@/components/sections/dental/DentalVideoSection';
import { getDentalContent } from '@/components/sections/dental/dentalContent';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import CompactBonusFeature from '@/components/sections/shared/CompactBonusFeature';
import HealioAwardsRow from '@/components/sections/shared/HealioAwardsRow';
import ZielseitenKontakt from '@/components/sections/shared/ZielseitenKontakt';
import ZweiWegeFinanzierung from '@/components/sections/shared/ZweiWegeFinanzierung';
import AmbulantIKKWechsel from '@/components/sections/ambulant/AmbulantIKKWechsel';
import SalesAiAssist from '@/components/sections/shared/SalesAiAssist';
import { createServiceSchema } from '@/lib/createSchemaMarkup';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import { trackMetaRechnerStart } from '@/lib/meta-pixel';
import { ZAHN_WEITERLESEN } from '@/content/ratgeber/zahnWeiterlesen';

// Zwei Zahn-Wege seit Franks Entscheidung vom 05.10.2026: UKV ZahnPRIVAT für
// alle Situationen ohne angeratene Behandlung (auch 1 bis 3 fehlende Zähne),
// die Bayerische nur mit ZAHN Sofort für den Sofortschutz.
const pathVisuals = {
  ukv: { kind: 'dental', tone: 'mint' },
  sofort: { kind: 'calendar', tone: 'coral' },
};

const pathStyles = {
  mint: 'bg-[#effbf6] text-[#075f46]',
  sky: 'bg-[#eef8ff] text-[#245f83]',
  butter: 'bg-[#fff8df] text-[#70520b]',
  coral: 'bg-[#fff1ed] text-[#934638]',
};

// Rahmen- und Punktfarben der vier Zahn-Situationen im Hero (wie die Auswahl auf /stationaer).
const offerBorders = ['border-[#b9e6d6]', 'border-[#ead8a7]', 'border-[#d7d3ee]', 'border-[#c9dcef]'];
const offerDots = ['bg-[#25c990]', 'bg-[#e6b946]', 'bg-[#8a80c9]', 'bg-[#5b8fd1]'];

const trustVisuals = [
  { kind: 'broker', tone: 'mint' },
  { kind: 'privacy', tone: 'sky' },
  { kind: 'support', tone: 'lavender' },
];

const scrollToCheck = (event, reduceMotion) => {
  event?.preventDefault();
  // Meta: nur der Klick auf den primären Rechner-CTA. Die Antworten im
  // Zahn-Check bleiben frei von Messung und verlassen das Gerät nie. Für
  // Google Ads ist der reine Sprung zum Check kein Erfolg; gezählt wird nur
  // der Klick auf einen Versicherer-Link im Ergebnis des Checks, ohne Inhalt
  // (keine Antworten, kein Versicherer, siehe DentalZahnCheck.jsx).
  trackMetaRechnerStart();
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
        {/* Hero wie auf /stationaer (Frank 30.09.2026: Foto am Tresen "geht gar
            nicht", lieber gleich zeigen, was man bekommt). Links der Text, rechts
            vier typische Zahn-Situationen mit je einer geprüften Aussage aus den
            Ergebnissen des Zahn-Checks; sie führen zu den zwei Wegen UKV
            ZahnPRIVAT und Bayerische mit ZAHN Sofort. Jede Zeile führt in den Check. */}
        <section
          className="relative isolate overflow-hidden bg-[#071726] text-white"
          aria-labelledby="zahn-hero-heading"
        >
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#25c990]/16 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#789bd7]/14 blur-3xl" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true" />

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-6 md:pb-16 md:pt-32 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.5 }}
                className="min-w-0 max-w-2xl"
              >
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#5ee0b1] sm:text-sm">
                  {content.hero.eyebrow}
                </p>
                <h1
                  id="zahn-hero-heading"
                  className="mt-5 max-w-[17ch] font-display text-[clamp(2.4rem,4.6vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white [text-wrap:balance]"
                >
                  <span className="block">{content.hero.titleLead}</span>
                  <span className="block text-[#5ee0b1]">{content.hero.titleAccent}</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
                  {content.hero.text}
                </p>

                <a
                  href="#zahn-check"
                  onClick={(event) => scrollToCheck(event, reduceMotion)}
                  className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-home-mint px-7 font-display text-base font-extrabold text-home-midnight shadow-[0_16px_42px_rgba(37,201,144,0.3)] transition hover:-translate-y-0.5 hover:bg-home-mint-active focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4 focus-visible:ring-offset-[#071726] motion-reduce:transform-none sm:w-auto"
                >
                  {content.hero.cta}<ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>

                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-base font-semibold text-white/85">
                  {content.hero.micro.map((item) => (
                    <li key={item} className="inline-flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#5ee0b1]" aria-hidden="true" />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.1 }}
                className="relative mx-auto min-w-0 w-full max-w-[35rem] lg:mx-0"
                aria-label={content.hero.offersAria}
              >
                <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-gradient-to-br from-[#eefaf5] via-white to-[#fff5d9] p-5 text-[#071726] shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-7">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/friendly-icons/dental-shield.webp"
                      alt=""
                      width="311"
                      height="315"
                      loading="eager"
                      decoding="async"
                      className="w-20 shrink-0 drop-shadow-[0_12px_18px_rgba(7,23,38,0.12)] sm:w-24"
                    />
                    <p className="font-display text-xl font-extrabold leading-tight text-[#0b6048] sm:text-2xl">
                      {content.hero.ticketFooter}
                    </p>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {content.hero.offers.map((offer, index) => (
                      <a
                        key={offer.code}
                        href="#zahn-check"
                        onClick={(event) => scrollToCheck(event, reduceMotion)}
                        className={`group block rounded-2xl border bg-white/95 p-4 shadow-[0_12px_30px_rgba(39,63,72,0.10)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_36px_rgba(39,63,72,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint motion-reduce:transform-none ${offerBorders[index % offerBorders.length]}`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">{offer.code}</span>
                          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${offerDots[index % offerDots.length]}`} aria-hidden="true" />
                        </span>
                        <span className="mt-1.5 block font-display text-lg font-extrabold leading-tight text-[#071726]">{offer.label}</span>
                        <span className="mt-1.5 block text-base leading-snug text-slate-600">{offer.note}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-12 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-3">
              {content.hero.trust.map((item, index) => (
                <div key={item} className="flex items-center gap-3 text-left text-base font-bold text-white/85">
                  <FriendlyIcon kind={trustVisuals[index].kind} tone={trustVisuals[index].tone} size="sm" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Produktpassende Siegel direkt unter dem Hero, wie auf /ambulant. */}
        <HealioAwardsRow size="large" productSet="zahn" />

        {lang === 'de' && <DentalVideoSection />}

        <DentalZahnCheck />

        <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="zahn-paths-heading">
          <div className="healio-container">
            <div className="max-w-5xl">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#087654]">{content.paths.eyebrow}</p>
              <h2 id="zahn-paths-heading" className="mt-4 max-w-[28ch] font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] [text-wrap:balance] sm:text-4xl lg:text-5xl">
                {content.paths.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{content.paths.text}</p>
            </div>

            <div className="mt-12 overflow-hidden rounded-[2.75rem] border border-[#dfe8e3] bg-white shadow-[0_24px_70px_rgba(20,46,37,0.08)]">
              <div className="grid md:grid-cols-2">
              {content.paths.cards.map((card, index, cards) => {
                const visual = pathVisuals[card.key] || pathVisuals.ukv;
                // Trennlinien nur zwischen Karten: mobil untereinander, ab md zweispaltig.
                const lastRowStart = cards.length - (cards.length % 2 === 0 ? 2 : 1);
                const mobileDivider = index < cards.length - 1 ? 'border-b border-[#dfe8e3]' : '';
                const desktopDivider = index >= lastRowStart ? 'md:border-b-0' : '';
                return (
                  <article
                    key={card.key}
                    className={`relative min-h-full p-7 sm:p-9 ${pathStyles[card.tone]} ${mobileDivider} ${desktopDivider} ${index % 2 === 0 && index < cards.length - 1 ? 'md:border-r md:border-[#dfe8e3]' : ''}`}
                  >
                    <span className="absolute -right-14 -top-16 h-40 w-40 rounded-full border border-current/10" aria-hidden="true" />
                    <div className="flex items-start justify-between gap-5">
                      <FriendlyIcon kind={visual.kind} tone={visual.tone} size="md" className="-rotate-2" />
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-extrabold tracking-[-0.035em]">{card.label}</h3>
                    <p className="mt-2 font-display text-sm font-extrabold uppercase tracking-[0.14em] opacity-80">{card.title} · {card.product}</p>
                    <p className="mt-4 max-w-xl leading-7 text-slate-600">{card.text}</p>
                  </article>
                );
              })}
              </div>
            </div>
            <p className="mt-6 text-base leading-7 text-slate-600">{content.paths.footer}</p>
            {lang === 'de' && (
              /* Vertiefung zum Thema Zahnluecke. Bewusst nur ein Satz mit
                 einem Link, kein zweiter Button neben der Tarifweiche. */
              <p className="mt-3 text-base leading-7 text-slate-600">
                Eine nicht ersetzte Zahnlücke schließt nicht jeden Weg: Welcher Versicherer bis zu drei fehlende Zähne annimmt und warum angeratener Ersatz eine andere Frage ist, steht im Ratgeber{' '}
                <Link to="/ratgeber/zahnzusatzversicherung-fehlender-zahn" className="font-bold underline underline-offset-4 hover:text-[#07111f]">
                  Zahnzusatzversicherung bei fehlendem Zahn
                </Link>.
              </p>
            )}
          </div>
        </section>

        {/* Zwei-Wege-Botschaft direkt vor dem Kassenbonus, im selben hellen
            Band wie Bonusbrücke und Bonusrechner. */}
        <ZweiWegeFinanzierung produkt="zahn" className="bg-[#f8faf9]" />

        <section id="kassenbonus" className="scroll-mt-28 bg-[#f8faf9] px-4 pb-20 pt-2 sm:px-6 md:pb-24 md:pt-4 lg:px-8" aria-labelledby="zahn-bonus-heading">
          <div className="healio-container relative isolate grid items-center gap-10 overflow-hidden rounded-[2.75rem] bg-[#07111f] p-7 text-white shadow-[0_30px_80px_rgba(7,17,31,0.18)] sm:p-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:p-14">
            <div className="absolute -right-16 -top-20 -z-10 h-80 w-80 rounded-full border border-[#25c990]/15" aria-hidden="true" />
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#5ee0b1]">{content.bonus.eyebrow}</p>
              <h2 id="zahn-bonus-heading" className="mt-5 max-w-[16ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] [text-wrap:balance] sm:text-4xl lg:text-5xl">
                {content.bonus.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">{content.bonus.text}</p>
              <p className="mt-3 max-w-2xl font-display text-base font-extrabold text-[#5ee0b1]">{content.bonus.detail}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#zahn-check"
                  onClick={(event) => scrollToCheck(event, reduceMotion)}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25c990] px-6 text-center font-display text-base font-extrabold sm:whitespace-nowrap text-[#07111f] transition hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f]"
                >
                  {content.bonus.cta}<ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href={getPath('kassenboost')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 font-display text-base font-extrabold text-white underline decoration-[#25c990] decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990]">
                  {content.bonus.link}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative mx-auto min-h-[25rem] w-full max-w-[26rem] overflow-hidden rounded-[2.25rem] border border-[#efda9b] bg-gradient-to-br from-[#fffaf0] to-[#ffe9b7] p-6 text-[#07111f] shadow-2xl sm:p-7">
              <span className="absolute left-1/2 top-0 h-4 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e7d4a0] bg-white/80" aria-hidden="true" />
              <p className="relative z-10 max-w-[14rem] font-display text-xs font-extrabold uppercase tracking-[0.13em] text-[#77570c]">
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
              <span className="relative z-10 mt-3 block max-w-[19rem] font-display text-base font-extrabold leading-6 text-[#5c4510]">
                {content.bonus.stampLabel}
              </span>
              <p className="relative z-10 mt-5 border-t border-[#d9c07f] pt-4 text-sm font-semibold leading-6 text-[#5f543f] hyphens-auto [hyphenate-limit-chars:10_4_4]">
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
              ? 'Your statutory-insurer bonus may offset all or part of the eligible dental-plan premium. The applicable bonus and tariff terms determine the result.'
              : 'Dein Kassenbonus kann den anrechenbaren Beitrag deines Zahnschutzes ganz oder teilweise ausgleichen. Maßgeblich sind die aktuellen Bonus- und Tarifbedingungen.',
            ctaOverride: {
              href: '#zahn-check',
              label: lang === 'en' ? 'Open dental check' : 'Zahnweg prüfen',
            },
          }}
        />

        {/* Brücken-Strecke zur IKK classic nach dem Bonusrechner, wie auf
            /ambulant (Frank 29.09.2026: auf allen drei Produktseiten zurück). */}
        <AmbulantIKKWechsel variant="zahn" />

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
                      <p className="mt-1 text-base leading-7 text-slate-600">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="self-start rounded-[2rem] border border-[#b6e8d5] bg-[#effbf6] p-7 sm:p-9">
              <FriendlyIcon kind="advisor" tone="lavender" size="lg" className="-rotate-2" />
              <h3 className="mt-7 font-display text-2xl font-extrabold leading-tight tracking-[-0.03em]">{content.process.trustTitle}</h3>
              <p className="mt-4 leading-7 text-slate-600">{content.process.trustText}</p>

              {/* Nur das Siegel des Leistungswegs UKV ZahnPRIVAT 100 (Franke & Bornberg,
                  Rating 08|2026, Stand 05.10.2026; Quelle und Hinweise im Kopf von
                  HealioAwardsRow). Das Warentest-Siegel der Bayerischen steht in der
                  Siegelzeile unter dem Hero, mit Gruppenbeschriftung. */}
              <div className="mt-8 grid min-h-28 place-items-center rounded-2xl bg-white p-3">
                <img src="/siegel/ukv/franke-bornberg-zahnprivat100-2026.svg" alt={tZahn('siegel.awards.frankeBornberg')} className="max-h-20 w-auto object-contain" />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{content.process.sealNote}</p>
            </aside>
          </div>
        </section>

        <SalesAiAssist className="bg-white" />
        {/* Gleicher Kontaktblock wie auf /ambulant und /stationaer (Marktanalyse W6). */}
        <ZielseitenKontakt placement="zahn" className="bg-white" />

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
                  <div className="max-w-3xl pb-6 pr-8 text-base leading-7 text-slate-600 sm:text-[1.0625rem]">
                    <p>{item.a}</p>
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

        {/* Weiterlesen im Zahn-Ratgeber (Welle 1, 06.10.2026): eine ruhige
            Linkliste, nur auf Deutsch, die Ratgeber gibt es nur dort. */}
        {lang !== 'en' && (
          <section className="bg-white px-4 py-14 sm:px-6 md:py-16 lg:px-8" aria-labelledby="zahn-weiterlesen-heading" data-zahn-weiterlesen="">
            <div className="healio-container">
              <div className="flex items-center gap-4">
                <FriendlyIcon kind="document" tone="mint" size="sm" />
                <h2 id="zahn-weiterlesen-heading" className="font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-[#07111f] sm:text-3xl">
                  Weiterlesen im Zahn-Ratgeber
                </h2>
              </div>
              <ul className="mt-6 grid gap-x-8 md:grid-cols-2">
                {ZAHN_WEITERLESEN.map((entry) => (
                  <li key={entry.slug} className="border-t border-slate-200">
                    <Link
                      to={`/ratgeber/${entry.slug}`}
                      className="group flex min-h-12 items-center justify-between gap-4 py-3 font-display text-base font-bold leading-6 text-[#07111f] transition-colors hover:text-[#087654] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990]"
                    >
                      {entry.title}
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#087654] transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>
    </>
  );
};

export default ZahnPage;
