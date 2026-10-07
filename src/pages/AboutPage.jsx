import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle2,
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/hooks/useLanguage';
import useDesktopLayout from '@/hooks/useDesktopLayout';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import ProductTicker from '@/components/sections/ProductTicker';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import SceneHero, {
  sceneBelow,
  scenePrimaryButtonClass,
  sceneSecondaryButtonClass,
} from '@/components/desktop/SceneHero';

const FOUNDER_IMAGE = '/images/frank-steinfurt-gruender-healio.webp';

const audienceIcons = {
  private: { emoji: '🙋', tone: 'butter' },
  practices: { emoji: '🩺', tone: 'mint' },
  companies: { emoji: '🏢', tone: 'sky' },
};

const principleIcons = {
  needs: { emoji: '🧭', tone: 'sky' },
  independent: { emoji: '🛡️', tone: 'mint' },
  clear: { emoji: '💬', tone: 'lavender' },
  personal: { emoji: '🎧', tone: 'butter' },
};

const impactIcons = [
  { emoji: '🩺', tone: 'mint' },
  { emoji: '🦷', tone: 'sky' },
  { emoji: '🏥', tone: 'lavender' },
];

const AboutPage = () => {
  const { t } = useTranslation('about');
  const { t: tSeo } = useTranslation('seo');
  const { lang, getPath } = useLanguage();
  const reduceMotion = useReducedMotion();
  // Ab lg trägt die Szene die h1, der bisherige Kopfbereich (nur Handy/Tablet) nutzt dort h2.
  const Heading = useDesktopLayout() ? 'h2' : 'h1';

  const audiences = t('hero.audiences', { returnObjects: true });
  const storyParagraphs = t('story.paragraphs', { returnObjects: true });
  const principles = t('principles.items', { returnObjects: true });
  const impactItems = t('impact.items', { returnObjects: true });
  const routes = t('routes.items', { returnObjects: true });
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/about' : 'https://healio.de/about';

  const reveal = (delay = 0) => reduceMotion ? {} : {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  };

  // Karten in einer mobilen Wischreihe: die angeschnittene Nachbarkarte zeigt
  // nur einen kleinen Teil, deshalb löst sie schon bei 5 Prozent Sichtbarkeit aus.
  const revealRow = (delay = 0) => (reduceMotion ? {} : { ...reveal(delay), viewport: { once: true, amount: 0.05 } });

  const schemaMarkup = [
    createWebPageSchema(
      tSeo('about.title'),
      tSeo('about.description'),
      canonicalUrl,
      lang === 'en' ? 'en-US' : 'de-DE'
    ),
    createOrganizationSchema(),
  ];

  return (
    <>
      <SEOHead
        title={tSeo('about.title')}
        description={tSeo('about.description')}
        canonicalUrl={canonicalUrl}
        ogUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />

      <main className="w-full overflow-hidden bg-white text-[#07111f] selection:bg-[#25c990] selection:text-[#07111f]">
        {/* Frank 07.10.2026: ab lg Vollbild-Szene, darunter Beschreibung, Healio-Prinzip
            und Hinweise. Der bisherige Kopfbereich bleibt für Handy und Tablet. */}
        <SceneHero
          surface="about"
          headingId="desktop-about-heading"
          heading={t('hero.title')}
          actions={(
            <>
              <a href="#arbeitsweise" className={scenePrimaryButtonClass}>
                {t('hero.primaryCta')}
                <ArrowDown className="h-5 w-5" aria-hidden="true" />
              </a>
              <Link to={getPath('kontakt')} className={sceneSecondaryButtonClass}>
                {t('hero.secondaryCta')}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </>
          )}
        >
          <div className={sceneBelow.grid}>
            <div className="min-w-0">
              <p className={sceneBelow.lead}>{t('hero.description')}</p>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#5ee0b1]">{t('hero.networkEyebrow')}</p>
              <h2 className={`mt-1 ${sceneBelow.listTitle}`}>{t('hero.networkTitle')}</h2>
              <p className={sceneBelow.listIntro}>{t('hero.networkDescription')}</p>
              <ul className={sceneBelow.list}>
                {Array.isArray(audiences) && audiences.map((audience) => {
                  const icon = audienceIcons[audience.key] || { emoji: '✨', tone: 'mint' };
                  return (
                    <li key={audience.key} className="grid grid-cols-[2.5rem_1fr] items-start gap-4 py-4">
                      <FriendlyIcon emoji={icon.emoji} label={audience.label} tone={icon.tone} size="sm" className="!h-10 !w-10" />
                      <div>
                        <h3 className="font-display text-lg font-bold leading-6 text-white">{audience.label}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#c9d8de]">{audience.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <ul className={sceneBelow.trust}>
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
              {t('hero.brokerProof')}
            </li>
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
              {t('hero.locationProof')}
            </li>
          </ul>
        </SceneHero>

        <div className="lg:hidden">
          <section
            className="relative flex min-h-[70svh] w-full items-center overflow-hidden bg-[#07111f] px-4 pb-12 pt-28 text-white sm:px-6 sm:pb-24 sm:pt-36 md:min-h-[92svh] lg:px-8 lg:pb-28 lg:pt-40"
            aria-labelledby="about-hero-heading"
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -right-[16rem] top-[5%] h-[42rem] w-[42rem] rounded-full border border-white/[0.045]" />
              <div className="absolute -right-[8rem] top-[15%] h-[30rem] w-[30rem] rounded-full border border-[#25c990]/10" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute bottom-[7%] left-[3%] font-display text-[clamp(5rem,18vw,18rem)] font-extrabold leading-none tracking-[-0.08em] text-white/[0.018]">
                HEALIO
              </div>
            </div>

            <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                <p className="font-display text-sm font-bold uppercase tracking-[0.24em] text-[#5ee0b1]">
                  {t('hero.eyebrow')}
                </p>
                <Heading
                  id="about-hero-heading"
                  className="mt-4 max-w-[12ch] font-display text-[clamp(2.1rem,7vw,6.4rem)] font-extrabold leading-[0.96] tracking-[-0.055em] [text-wrap:balance] sm:mt-6 sm:text-[clamp(2.8rem,7vw,6.4rem)]"
                >
                  {t('hero.title')}
                </Heading>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:mt-7 sm:text-lg sm:leading-8 lg:text-xl">
                  {t('hero.description')}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row">
                  <a
                    href="#arbeitsweise"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25c990] px-6 py-3.5 text-sm font-bold text-[#07111f] transition-colors hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f] sm:text-base"
                  >
                    {t('hero.primaryCta')}
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <Link
                    to={getPath('kontakt')}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:border-white/40 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f] sm:text-base"
                  >
                    {t('hero.secondaryCta')}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="mt-6 grid max-w-2xl gap-3 border-t border-white/10 pt-4 text-sm text-slate-300 sm:mt-9 sm:grid-cols-2 sm:pt-6">
                  <p className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
                    <span>{t('hero.brokerProof')}</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
                    <span>{t('hero.locationProof')}</span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: 26 }}
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full max-w-xl"
              >
                <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-7">
                  <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-4 sm:pb-6">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#5ee0b1] md:text-[0.68rem] md:leading-[inherit]">
                        {t('hero.networkEyebrow')}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
                        {t('hero.networkTitle')}
                      </h2>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#25c990]/35 bg-[#25c990]/10">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#5ee0b1] shadow-[0_0_20px_rgba(94,224,177,0.75)]" />
                    </div>
                  </div>

                  <p className="mt-4 max-w-md text-base leading-6 text-slate-400 sm:mt-5">
                    {t('hero.networkDescription')}
                  </p>

                  <div className="relative mt-5 sm:mt-6">
                    <div className="absolute bottom-7 left-[1.35rem] top-7 hidden w-px md:block bg-gradient-to-b from-[#5ee0b1]/70 via-white/20 to-[#5ee0b1]/70 sm:left-[1.6rem]" aria-hidden="true" />
                    {/* Experiment 06.10.2026: die drei Zielgruppen wischen mobil als Karten
                        nebeneinander, ab md stehen sie wie bisher untereinander. */}
                    <MobileSwipeRow
                      label={t('hero.networkTitle')}
                      desktopClassName="-mx-5 scroll-pl-5 px-5 sm:-mx-7 sm:scroll-pl-7 sm:px-7 md:mx-0 md:px-0 md:scroll-pl-0 md:block md:space-y-3"
                      mobileItemWidth="w-[78vw] max-w-[19rem]"
                      dotsTone="dark"
                      bleed={false}
                    >
                      {Array.isArray(audiences) && audiences.map((audience) => {
                        const icon = audienceIcons[audience.key] || { emoji: '✨', tone: 'mint' };
                        return (
                          <div
                            key={audience.key}
                            className="relative grid h-full grid-cols-[2.75rem_1fr] gap-4 rounded-2xl border border-white/[0.08] bg-[#0b1928]/90 p-4 sm:grid-cols-[3.25rem_1fr] sm:p-5 md:h-auto"
                          >
                            <FriendlyIcon emoji={icon.emoji} label={audience.label} tone={icon.tone} size="sm" className="relative z-10" />
                            <span>
                              <span className="block font-display text-base font-bold text-white">{audience.label}</span>
                              <span className="mt-1 block text-sm leading-5 text-slate-400 sm:leading-6">{audience.text}</span>
                            </span>
                          </div>
                        );
                      })}
                    </MobileSwipeRow>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        <ProductTicker variant="about" />

        <section className="w-full bg-[#f4faf7] px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32" aria-labelledby="about-story-heading">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:gap-24">
            <motion.figure {...reveal()} className="order-2 mx-auto w-full max-w-[32rem] lg:order-1 lg:mx-0">
              <div className="relative">
                <div className="absolute -bottom-4 -left-4 h-[78%] w-[78%] rounded-[2rem] border border-[#25c990]/25" aria-hidden="true" />
                <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-slate-200 shadow-[0_24px_70px_rgba(7,17,31,0.14)] md:aspect-[4/5]">
                  <img
                    src={FOUNDER_IMAGE}
                    alt={t('story.founderImageAlt')}
                    className="h-full w-full object-cover object-top md:object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              {/* Frank 07.10.2026: nichts auf dem Bild, Name und Rolle stehen darunter. */}
              <figcaption className="mt-8 pl-1">
                <span className="block font-display text-xl font-bold text-home-midnight">{t('story.founder')}</span>
                <span className="mt-1 block text-base text-slate-600">{t('story.founderRole')}</span>
                <span className="mt-2 block text-sm font-semibold uppercase tracking-[0.16em] text-[#0b6048] md:text-xs">{t('story.founderLocation')}</span>
              </figcaption>
            </motion.figure>

            <motion.div {...reveal(0.08)} className="order-1 lg:order-2">
              <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[#0c7a5a]">{t('story.eyebrow')}</p>
              <h2 id="about-story-heading" className="mt-4 max-w-[16ch] sm:mt-5 font-display text-[clamp(2.25rem,5vw,4.7rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('story.title')}
              </h2>
              <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-[#46515e] sm:mt-8 sm:space-y-5 sm:text-lg sm:leading-8">
                {Array.isArray(storyParagraphs) && storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 max-w-2xl border-l-2 border-[#25c990] pl-5 font-display text-xl font-bold leading-8 text-[#102333] sm:mt-9 sm:text-2xl sm:leading-9">
                {t('story.conclusion')}
              </p>
            </motion.div>
          </div>
        </section>

        <section id="arbeitsweise" className="w-full scroll-mt-24 bg-white px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32" aria-labelledby="about-principles-heading">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div {...reveal()} className="grid grid-cols-1 gap-5 border-b border-slate-200 pb-8 sm:gap-8 sm:pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[#0c7a5a]">{t('principles.eyebrow')}</p>
                <h2 id="about-principles-heading" className="mt-4 max-w-[15ch] sm:mt-5 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                  {t('principles.title')}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-[#5a6673] sm:text-lg sm:leading-8 lg:justify-self-end">
                {t('principles.description')}
              </p>
            </motion.div>

            {/* Experiment 06.10.2026: die vier Grundsätze wischen mobil als Karten
                nebeneinander, ab md bleibt das Zwei-Spalten-Raster mit Trennlinien. */}
            <MobileSwipeRow
              label={t('principles.title')}
              className="mt-6 md:mt-0"
              desktopClassName="md:grid md:grid-cols-2 md:gap-0"
              mobileItemWidth="w-[80vw] max-w-[21rem]"
            >
              {Array.isArray(principles) && principles.map((principle, index) => {
                const icon = principleIcons[principle.key] || { emoji: '✅', tone: 'mint' };
                return (
                  <motion.article
                    key={principle.key}
                    {...revealRow(index * 0.05)}
                    className={`h-full rounded-2xl border border-slate-200 bg-[#f4faf7] p-5 md:rounded-none md:border-0 md:bg-transparent md:px-8 md:py-12 ${index % 2 === 0 ? 'md:border-r' : ''} ${index < 2 ? 'md:border-b' : ''} ${index % 2 === 0 ? 'md:pl-0' : 'md:pr-0'}`}
                  >
                    <div className="flex gap-5 sm:gap-6">
                      <FriendlyIcon emoji={icon.emoji} label={principle.title} tone={icon.tone} size="sm" />
                      <div>
                        <h3 className="font-display text-xl font-bold tracking-[-0.025em] text-[#102333] sm:text-2xl">{principle.title}</h3>
                        <p className="mt-3 max-w-xl text-base leading-6 text-[#5a6673] sm:leading-7">{principle.text}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </MobileSwipeRow>
          </div>
        </section>

        <section className="relative w-full overflow-hidden bg-[#0b1928] px-4 py-12 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-32" aria-labelledby="about-impact-heading">
          <div className="pointer-events-none absolute -right-40 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full border border-white/[0.04]" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl">
            <motion.div {...reveal()} className="max-w-4xl">
              <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[#5ee0b1]">{t('impact.eyebrow')}</p>
              <h2 id="about-impact-heading" className="mt-4 max-w-[16ch] sm:mt-5 font-display text-[clamp(2.25rem,5vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('impact.title')}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">{t('impact.description')}</p>
            </motion.div>

            {/* Experiment 06.10.2026: die drei Kennzahlen wischen mobil als Karten
                nebeneinander, ab md bleibt die Leiste mit Trennlinien. Jede Karte
                hat ihre eigene Definitionsliste. */}
            <MobileSwipeRow
              label={t('impact.title')}
              className="mt-8 md:mt-14"
              desktopClassName="md:block md:gap-0 md:border-y md:border-white/10 lg:grid lg:grid-cols-3"
              mobileItemWidth="w-[78vw] max-w-[20rem]"
              dotsTone="dark"
            >
              {Array.isArray(impactItems) && impactItems.map((item, index) => {
                const icon = impactIcons[index];
                return (
                  <motion.div
                    key={item.category}
                    {...revealRow(index * 0.07)}
                    className={`flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:py-10 lg:px-8 lg:py-12 ${index < impactItems.length - 1 ? 'md:border-b md:border-white/10 lg:border-b-0 lg:border-r' : ''} ${index === 0 ? 'lg:pl-0' : ''}`}
                  >
                    <div className="mb-5 flex items-center gap-3 sm:mb-7">
                      <FriendlyIcon emoji={icon.emoji} tone={icon.tone} size="sm" />
                      <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-slate-300 md:text-xs">{item.category}</span>
                    </div>
                    <dl className="flex flex-col">
                      <dt className="order-2 mt-4 max-w-xs font-display text-base font-bold leading-6 text-white sm:text-lg">{item.label}</dt>
                      <dd className="order-1 max-w-full font-display text-[clamp(2.15rem,4.2vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#5ee0b1] [text-wrap:balance]">{item.value}</dd>
                      <dd className="order-3 mt-2 max-w-xs text-sm leading-6 text-slate-400">{item.detail}</dd>
                    </dl>
                  </motion.div>
                );
              })}
            </MobileSwipeRow>

            <p className="mt-5 max-w-5xl text-sm leading-5 text-slate-400 sm:mt-7 sm:leading-6">
              {t('impact.disclaimer')}
            </p>
          </div>
        </section>

        <section className="w-full bg-[#f4faf7] px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32" aria-labelledby="about-routes-heading">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
              <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[#0c7a5a]">{t('routes.eyebrow')}</p>
              <h2 id="about-routes-heading" className="mt-4 sm:mt-5 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('routes.title')}
              </h2>
              <p className="mt-4 text-base leading-7 text-[#5a6673] sm:mt-6 sm:text-lg sm:leading-8">{t('routes.description')}</p>
            </motion.div>

            {/* Experiment 06.10.2026: die drei Wege wischen mobil als Karten
                nebeneinander, ab md bleibt das bisherige Raster. */}
            <MobileSwipeRow
              label={t('routes.title')}
              className="mt-8 md:mt-12"
              desktopClassName="md:grid md:gap-5 lg:grid-cols-3"
              mobileItemWidth="w-[82vw] max-w-[22rem]"
            >
              {Array.isArray(routes) && routes.map((route, index) => {
                const icon = audienceIcons[route.key] || { emoji: '✨', tone: 'mint' };
                return (
                  <motion.article key={route.key} {...revealRow(index * 0.06)} className="group flex h-full min-h-full flex-col rounded-[1.6rem] border border-[#dbe8e2] bg-white p-5 sm:p-8 md:shadow-[0_14px_45px_rgba(7,17,31,0.06)]">
                    <div className="flex items-center justify-between gap-4">
                      <FriendlyIcon emoji={icon.emoji} label={route.title} tone={icon.tone} size="sm" />
                      <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#0c7a5a] md:text-[0.68rem] md:leading-[inherit]">{route.label}</span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.035em] text-[#102333] sm:mt-8">{route.title}</h3>
                    <p className="mt-3 flex-1 text-base leading-6 text-[#5a6673] sm:leading-7">{route.text}</p>
                    <Link
                      to={getPath(route.routeKey)}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 self-start font-display text-sm font-bold text-[#076046] transition-colors hover:text-[#0c7a5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4 sm:mt-8 md:min-h-0"
                    >
                      {route.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </motion.article>
                );
              })}
            </MobileSwipeRow>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
