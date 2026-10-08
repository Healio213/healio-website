import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import AmbulantMiaPrompt from '@/components/sections/ambulant/AmbulantMiaPrompt';
import ProductTicker from '@/components/sections/ProductTicker';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';
import AppointmentBooking from '@/components/CalendlyEmbed';
import ExplainerVideoCard from '@/components/sections/shared/ExplainerVideoCard';
import { useLanguage } from '@/hooks/useLanguage';

const FOUNDER_IMAGE = '/images/frank-steinfurt-gruender-healio.webp';

// Für Beschriftungen (aria-label) ohne die <highlight>-Auszeichnung der Überschriften.
const plain = (text) => String(text || '').replace(/<\/?highlight>/g, '');

const ZahnaerztePage = () => {
  const { t } = useTranslation('zahnaerzte');
  const { t: tSeo } = useTranslation('seo');
  const { lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const scrollToCalendly = () => {
    document.getElementById('calendly-zahnaerzte')?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const scrollToBoundaries = () => {
    document.getElementById('klare-rollen')?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const proofItems = t('proof.items', { returnObjects: true }) || [];
  const insurerHighlights = t('insurerHighlights.highlights', { returnObjects: true }) || [];
  const bonusSteps = t('bonus.steps', { returnObjects: true }) || [];
  const legalItems = t('legal.items', { returnObjects: true }) || [];
  const packageItems = t('package.items', { returnObjects: true }) || [];
  const faqItems = t('faq.items', { returnObjects: true }) || [];

  const proofIcons = [
    { kind: 'protection', tone: 'mint' },
    { kind: 'document', tone: 'sky' },
    { kind: 'privacy', tone: 'lavender' },
  ];
  const insurerIcons = ['⚡', '🪥', '💶', '🧩'];
  const insurerTones = ['butter', 'sky', 'mint', 'lavender'];
  const bonusFriendlyIcons = ['🪙', '🛡️', '✅'];
  const bonusTones = ['butter', 'mint', 'lavender'];
  const legalFriendlyIcons = [
    { emoji: '⚖️', tone: 'sky' },
    { emoji: '📋', tone: 'mint' },
    { emoji: '💬', tone: 'lavender' },
    { emoji: '🔒', tone: 'butter' },
  ];
  const packageFriendlyIcons = [
    { emoji: '📄', tone: 'sky' },
    { emoji: '🗒️', tone: 'butter' },
    { emoji: '📲', tone: 'mint' },
  ];

  const revealProps = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: shouldReduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });

  // Eine Highlight-Karte; die Karte mit Kennzahl (lang, mit der 2-Jahres-Regel) steht mobil unter der Wischreihe.
  const renderHighlight = (item, standalone = false) => {
    const position = insurerHighlights.indexOf(item);
    return (
    <motion.article
      key={item.title}
      {...revealProps(0.08 + (position - 1) * 0.05)}
      className={`relative h-full border border-[#d8e5e1] p-5 sm:p-8 md:border-0 ${standalone ? 'mt-3 md:mt-0' : ''} ${item.metric ? 'bg-[#e8f7f1]' : 'bg-[#f9fbfa]'}`}
    >
      {item.metric && <div className="absolute inset-x-0 top-0 h-1.5 bg-[#25c990]" aria-hidden="true" />}
      <FriendlyIcon
        emoji={insurerIcons[position]}
        label={item.title}
        tone={insurerTones[position]}
        size="sm"
      />
      <p className="mt-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-[#087654] sm:mt-6 sm:text-[0.7rem] sm:leading-[1.6] sm:tracking-[0.16em]">
        {item.kicker}
      </p>
      {item.metric && (
        <p className="mt-3 font-display text-4xl font-extrabold tracking-[-0.04em] text-[#087654]">
          {item.metric}
        </p>
      )}
      <h3 className="mt-3 font-display text-xl font-extrabold leading-7 tracking-[-0.02em] text-[#07111f]">
        {item.title}
      </h3>
      <p className="mt-3 text-base leading-7 text-[#586c73] sm:mt-4">{item.text}</p>
    </motion.article>
    );
  };

  const schemaMarkup = createWebPageSchema(
    tSeo('zahnaerzte.title'),
    tSeo('zahnaerzte.description')
  );

  return (
    <>
      <SEOHead
        title={tSeo('zahnaerzte.title')}
        description={tSeo('zahnaerzte.description')}
        canonicalUrl="https://healio.de/zahnaerzte"
        schemaMarkup={schemaMarkup}
      />

      {/* Mobil bestimmt order die Reihenfolge (Einstieg, Vertrauensleiste, Situation, Nutzen, Bonus, Rollen, Praxis-Set,
          Gründer, Fragen, Termin), ab md bleibt es der bisherige Blocksatz in Quellreihenfolge. */}
      <main className="flex w-full flex-col overflow-hidden bg-[#f7faf9] text-[#17252d] md:block">
        <section className="relative order-1 md:order-none flex w-full items-center overflow-hidden bg-[#07111f] pb-16 pt-28 text-white sm:min-h-[92svh] sm:pb-24 sm:pt-36 lg:min-h-[760px] lg:pb-28 lg:pt-40">
          <img
            src="/images/zahnaerzte-hero-beratung-v2.webp"
            alt="Zahnarzt bespricht einen Behandlungsplan mit einer Patientin"
            className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center"
            width="1672"
            height="941"
            fetchPriority="high"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.97)_0%,rgba(7,17,31,0.88)_34%,rgba(7,17,31,0.50)_58%,rgba(7,17,31,0.10)_100%)] sm:bg-[linear-gradient(90deg,rgba(7,17,31,0.96)_0%,rgba(7,17,31,0.82)_38%,rgba(7,17,31,0.28)_67%,rgba(7,17,31,0.06)_100%)]"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(7,17,31,0.72)_0%,transparent_42%)]" aria-hidden="true" />

          <div className="container relative z-10 mx-auto w-full px-4 sm:px-6 md:px-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[48rem]"
            >
              <p className="mb-4 inline-flex rounded-full border border-white/20 bg-[#07111f]/30 px-4 py-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-[#75e6bf] backdrop-blur-sm sm:mb-6 sm:text-xs sm:tracking-[0.2em]">
                {t('hero.eyebrow')}
              </p>
              <h1 className="max-w-[46rem] font-display text-4xl font-extrabold leading-[1.03] tracking-[-0.045em] text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-[4.55rem]">
                <HighlightText text={t('hero.title')} className="text-[#75e6bf]" />
              </h1>
              <p className="mt-5 max-w-[42rem] text-lg leading-7 text-white/88 sm:mt-7 sm:text-xl">
                {t('hero.subtitle')}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row">
                <Button
                  onClick={scrollToCalendly}
                  className="h-auto min-h-14 rounded-xl bg-[#62d3aa] px-7 py-4 text-base font-bold text-[#07111f] shadow-[0_16px_44px_rgba(37,201,144,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#75e6bf] focus-visible:ring-[#75e6bf]"
                >
                  {t('hero.primaryCta')}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={scrollToBoundaries}
                  className="h-auto min-h-14 rounded-xl border-white/30 bg-[#07111f]/25 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm hover:border-white/50 hover:bg-[#07111f]/40 hover:text-white focus-visible:ring-[#75e6bf]"
                >
                  {t('hero.secondaryCta')}
                  <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              <p className="mt-4 max-w-[40rem] text-sm leading-6 text-white/68 sm:mt-6">
                {t('hero.note')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative z-20 order-2 -mt-8 px-4 sm:px-6 md:order-none md:px-8" aria-label={t('proof.label')}>
          <div className="container mx-auto px-0 md:px-8 grid max-w-6xl border border-[#dbe6e3] bg-white shadow-[0_18px_55px_rgba(7,17,31,0.08)] md:grid-cols-3">
            {proofItems.map((item, index) => {
              const icon = proofIcons[index] || proofIcons[0];
              return (
                <div key={item.title} className="flex gap-4 border-b border-[#e2ebe8] px-5 py-4 last:border-b-0 sm:px-6 sm:py-6 md:border-b-0 md:border-r md:last:border-r-0">
                  <FriendlyIcon kind={icon.kind} tone={icon.tone} size="sm" className="mt-0.5" />
                  <div>
                    <p className="font-display text-base font-extrabold text-[#07111f] sm:text-sm">{item.title}</p>
                    <p className="mt-1 text-base leading-6 text-[#60747c] sm:text-sm sm:leading-6">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Erklärfilm für Praxen (08.10.2026, nur Deutsch): direkt nach Einstieg,
            Vertrauensleiste und Laufband, vor der Situation. Er steht in derselben
            Hülle wie das Laufband, damit die mobile Reihenfolge gleich bleibt. */}
        <div className="order-3 md:contents">
          <ProductTicker variant="zahnaerzte" />
          {lang === 'de' && (
            <ExplainerVideoCard
              id="zahnaerzte-erklaervideo"
              videoSrc="/videos/erklaerfilme/erklaervideo-zahnaerzte-v1.mp4"
              poster="/videos/erklaerfilme/erklaervideo-zahnaerzte-v1-poster.jpg"
              captionsSrc="/videos/erklaerfilme/erklaervideo-zahnaerzte-v1-de.vtt"
              eyebrow={t('explanationVideo.eyebrow')}
              title={t('explanationVideo.title')}
              ariaLabel={t('explanationVideo.aria')}
              className="bg-[#f7faf9]"
            />
          )}
        </div>

        <section className="order-4 px-4 py-10 sm:px-6 sm:py-24 md:order-none md:px-8 lg:py-32">
          <div className="container mx-auto px-0 md:px-8 grid max-w-6xl gap-6 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
            <motion.div {...revealProps()}>
              <p className="font-mono text-sm font-bold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.18em] text-[#087654]">{t('challenge.eyebrow')}</p>
              <h2 className="mt-3 max-w-xl sm:mt-5 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#07111f] sm:text-4xl lg:text-5xl">
                {t('challenge.title')}
              </h2>
            </motion.div>
            <motion.div {...revealProps(0.08)} className="border-l border-[#9bbab2] pl-6 sm:pl-9">
              <p className="text-lg leading-8 text-[#435961] sm:text-xl">{t('challenge.text')}</p>
              <p className="mt-4 font-display text-lg font-bold leading-7 text-[#087654] sm:mt-6">{t('challenge.closing')}</p>
            </motion.div>
          </div>
        </section>

        <section className="order-5 md:order-none border-t border-[#e0ebe8] bg-white px-4 pb-10 pt-10 sm:px-6 sm:pb-24 sm:pt-28 md:px-8 lg:pb-32 lg:pt-36">
          <div className="container mx-auto px-0 md:px-8 max-w-6xl">
            <motion.div {...revealProps()} className="grid gap-4 sm:gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.18em] text-[#087654]">
                  {t('insurerHighlights.eyebrow')}
                </p>
                <h2 className="mt-3 font-display sm:mt-5 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#07111f] sm:text-4xl lg:text-5xl">
                  {t('insurerHighlights.title')}
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-[#52666d] lg:justify-self-end">
                {t('insurerHighlights.intro')}
              </p>
            </motion.div>

            {insurerHighlights[0] && (
              <motion.article {...revealProps(0.06)} className="relative mt-6 overflow-hidden border border-[#c5e0d8] bg-[#eaf8f3] p-5 max-md:hidden sm:mt-14 sm:p-10 lg:grid lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14 lg:p-12">
                <div className="absolute inset-y-0 left-0 w-1.5 bg-[#25c990]" aria-hidden="true" />
                <div>
                  <FriendlyIcon emoji={insurerIcons[0]} label={insurerHighlights[0].title} tone={insurerTones[0]} size="lg" className="!h-14 !w-14 sm:!h-20 sm:!w-20" />
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#d2eee4] px-3 py-1.5 text-sm font-bold uppercase tracking-[0.06em] text-[#087654] sm:mt-6 sm:text-xs sm:tracking-[0.1em]">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    {insurerHighlights[0].kicker}
                  </span>
                  <p className="mt-4 font-display text-4xl font-extrabold tracking-[-0.045em] text-[#087654] sm:mt-7 sm:text-5xl">
                    1.500 EUR
                  </p>
                </div>
                <div className="mt-5 sm:mt-8 lg:mt-0">
                  <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#07111f] sm:text-3xl">
                    {insurerHighlights[0].title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#435961] sm:mt-5 sm:text-lg sm:leading-8">
                    {insurerHighlights[0].text}
                  </p>
                </div>
              </motion.article>
            )}

            {/* Mobil wischen der Sofortschutz und die beiden kurzen Highlights als Karten, die lange Karte zu den Zahnlücken
                steht darunter über die volle Breite. Ab md bleibt es der Sofortschutz als breite Karte oben und das
                bisherige verbundene Dreier-Raster (die Wischreihe löst sich per contents in dessen Zellen auf). */}
            <div className="mt-4 sm:mt-6 md:grid md:grid-cols-3 md:items-stretch md:gap-px md:border md:border-[#d8e5e1] md:bg-[#d8e5e1]">
              <MobileSwipeRow
                label={t('insurerHighlights.title')}
                className="md:contents"
                desktopClassName="md:contents"
                itemClassName="md:first:hidden"
                mobileItemWidth="w-[82vw] max-w-[22rem]"
              >
                {insurerHighlights[0] && (
                  <motion.article key="sofortschutz" {...revealProps(0.06)} className="relative h-full overflow-hidden border border-[#c5e0d8] bg-[#eaf8f3] p-5 pl-6 sm:p-8 md:hidden">
                    <div className="absolute inset-y-0 left-0 w-1.5 bg-[#25c990]" aria-hidden="true" />
                    <FriendlyIcon emoji={insurerIcons[0]} label={insurerHighlights[0].title} tone={insurerTones[0]} size="sm" />
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#d2eee4] px-3 py-1.5 text-sm font-bold uppercase tracking-[0.06em] text-[#087654]">
                      <ShieldCheck className="h-4 w-4 flex-none" aria-hidden="true" />
                      {insurerHighlights[0].kicker}
                    </span>
                    <p className="mt-3 font-display text-4xl font-extrabold tracking-[-0.045em] text-[#087654]">
                      1.500 EUR
                    </p>
                    <h3 className="mt-3 font-display text-xl font-extrabold leading-7 tracking-[-0.02em] text-[#07111f]">
                      {insurerHighlights[0].title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[#435961]">{insurerHighlights[0].text}</p>
                  </motion.article>
                )}
                {insurerHighlights.slice(1).filter((item) => !item.metric).map((item) => renderHighlight(item))}
              </MobileSwipeRow>
              {insurerHighlights.slice(1).filter((item) => item.metric).map((item) => renderHighlight(item, true))}
            </div>

            <motion.div {...revealProps(0.16)} className="mt-5 border border-[#d9e6e2] bg-[#f8fbfa] p-5 sm:mt-7 sm:p-8">
              <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-5">
                <FriendlyIcon kind="support" tone="lavender" size="sm" />
                <div>
                  <p className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-[#087654]">
                    {t('insurerHighlights.teamTitle')}
                  </p>
                  <blockquote className="mt-3 font-display text-xl font-extrabold leading-8 tracking-[-0.02em] text-[#07111f]">
                    “{t('insurerHighlights.teamQuote')}”
                  </blockquote>
                  <p className="mt-4 text-base leading-6 text-[#52666d] sm:mt-5 sm:text-sm sm:leading-6">{t('insurerHighlights.practiceNote')}</p>
                  <p className="mt-3 text-sm leading-5 text-[#7b8c91] sm:text-xs sm:leading-5">{t('insurerHighlights.sourceNote')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="order-6 md:order-none border-y border-[#dce9e5] bg-[#edf7f4] px-4 py-10 sm:px-6 sm:py-24 md:px-8 lg:py-28">
          <div className="container mx-auto px-0 md:px-8 max-w-6xl">
            <motion.div {...revealProps()} className="max-w-3xl">
              <p className="font-mono text-sm font-bold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.18em] text-[#087654]">{t('bonus.eyebrow')}</p>
              <h2 className="mt-3 font-display sm:mt-5 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#07111f] sm:text-4xl lg:text-5xl">
                {t('bonus.title')}
              </h2>
              <p className="mt-4 text-lg leading-7 text-[#435961] sm:mt-6 sm:leading-8">{t('bonus.intro')}</p>
            </motion.div>

            {/* Mobil wischen die drei Schritte als Karten, ab md das bisherige verbundene Raster (ab lg dreispaltig). */}
            <MobileSwipeRow
              as="ol"
              label={t('bonus.title')}
              className="mt-6 sm:mt-14"
              desktopClassName="md:grid md:gap-px md:border md:border-[#cbdeda] md:bg-[#cbdeda] lg:grid-cols-3"
              mobileItemWidth="w-[82vw] max-w-[22rem]"
            >
              {bonusSteps.map((item, index) => {
                return (
                  <motion.article key={item.title} {...revealProps(index * 0.07)} className="relative h-full border border-[#cbdeda] bg-white p-5 sm:p-8 md:border-0">
                    <div className="flex items-center justify-between">
                      <FriendlyIcon
                        emoji={bonusFriendlyIcons[index]}
                        label={item.title}
                        tone={bonusTones[index]}
                        size="sm"
                      />
                      <span className="font-mono text-sm font-bold tracking-[0.16em] text-[#91a49f] sm:text-xs">0{index + 1}</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-extrabold tracking-[-0.02em] text-[#07111f] sm:mt-8">{item.title}</h3>
                    <p className="mt-3 leading-7 text-[#5a6d74]">{item.text}</p>
                  </motion.article>
                );
              })}
            </MobileSwipeRow>

            <motion.div {...revealProps(0.12)} className="mt-5 flex items-start gap-4 border border-[#bcd5ce] bg-transparent p-5 sm:mt-8 sm:p-6">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-[#087654]" aria-hidden="true" />
              <p className="text-sm leading-6 text-[#51676e]">{t('bonus.disclaimer')}</p>
            </motion.div>
          </div>
        </section>

        <section className="order-9 md:order-none bg-[#07111f] px-4 py-10 text-white sm:px-6 sm:py-24 md:px-8 lg:py-28">
          <div className="container mx-auto px-0 md:px-8 grid max-w-6xl overflow-hidden border border-white/10 bg-white/[0.035] lg:grid-cols-[0.72fr_1.28fr]">
            <motion.div {...revealProps()} className="relative min-h-[17rem] overflow-hidden sm:min-h-[25rem] lg:min-h-[36rem]">
              <img
                src={FOUNDER_IMAGE}
                alt={t('founder.imageAlt')}
                width="1122"
                height="1402"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[center_24%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent lg:bg-gradient-to-r" aria-hidden="true" />
            </motion.div>
            <motion.div {...revealProps(0.08)} className="flex flex-col justify-center p-5 sm:p-10 lg:p-14">
              <p className="font-mono text-sm font-bold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.18em] text-[#75e6bf]">{t('founder.eyebrow')}</p>
              <blockquote className="mt-4 font-display text-2xl font-extrabold leading-snug tracking-[-0.025em] text-white sm:mt-7 sm:text-3xl lg:text-[2.15rem]">
                “{t('founder.quote')}”
              </blockquote>
              <p className="mt-4 text-base leading-7 text-white/68 sm:mt-7 sm:text-lg">{t('founder.text')}</p>
              <div className="mt-6 border-t border-white/12 pt-4 sm:mt-9 sm:pt-6">
                <p className="font-display font-extrabold text-white">{t('founder.name')}</p>
                <p className="mt-1 text-sm text-white/52">{t('founder.role')}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="klare-rollen" className="order-7 md:order-none scroll-mt-24 bg-white px-4 py-10 sm:px-6 sm:py-24 md:px-8 lg:py-32">
          <div className="container mx-auto px-0 md:px-8 max-w-6xl">
            <motion.div {...revealProps()} className="grid gap-4 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.18em] text-[#087654]">{t('legal.eyebrow')}</p>
                <h2 className="mt-3 font-display sm:mt-5 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#07111f] sm:text-4xl lg:text-5xl">
                  {t('legal.title')}
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-[#52666d] lg:justify-self-end">{t('legal.intro')}</p>
            </motion.div>

            {/* Mobil wischen die vier Rollenkarten, ab md das bisherige verbundene Zwei-Spalten-Raster. */}
            <MobileSwipeRow
              label={plain(t('legal.title'))}
              className="mt-6 sm:mt-14"
              desktopClassName="md:grid md:grid-cols-2 md:gap-px md:border md:border-[#dbe5e2] md:bg-[#dbe5e2]"
              mobileItemWidth="w-[82vw] max-w-[22rem]"
            >
              {legalItems.map((item, index) => {
                const icon = legalFriendlyIcons[index] || { emoji: '🛡️', tone: 'mint' };
                return (
                  <motion.article key={item.title} {...revealProps(index * 0.05)} className="h-full border border-[#dbe5e2] bg-[#f8fbfa] p-5 sm:p-8 md:border-0">
                    <FriendlyIcon emoji={icon.emoji} label={item.title} tone={icon.tone} size="sm" />
                    <h3 className="mt-4 font-display text-xl font-extrabold tracking-[-0.02em] text-[#07111f] sm:mt-6">{item.title}</h3>
                    <p className="mt-3 leading-7 text-[#5b6e75]">{item.text}</p>
                  </motion.article>
                );
              })}
            </MobileSwipeRow>

            <motion.div {...revealProps(0.12)} className="mt-5 grid gap-3 border-l-4 border-[#25c990] bg-[#edf7f4] p-5 sm:mt-7 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-4 sm:p-7">
              <FriendlyIcon kind="support" tone="mint" size="sm" />
              <div>
                <p className="font-display font-extrabold text-[#07111f]">{t('legal.closingTitle')}</p>
                <p className="mt-2 text-base leading-6 text-[#52676e] sm:text-sm sm:leading-6">{t('legal.closingText')}</p>
              </div>
            </motion.div>
            <p className="mt-4 text-sm leading-5 text-[#839198] sm:mt-6 sm:text-xs sm:leading-5">{t('legal.disclaimer')}</p>
          </div>
        </section>

        <section className="order-8 md:order-none border-y border-[#dce7e4] bg-[#f2f7f5] px-4 py-10 sm:px-6 sm:py-24 md:px-8 lg:py-28">
          <div className="container mx-auto px-0 md:px-8 max-w-6xl">
            <motion.div {...revealProps()} className="max-w-3xl">
              <p className="font-mono text-sm font-bold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.18em] text-[#087654]">{t('package.eyebrow')}</p>
              <h2 className="mt-3 font-display sm:mt-5 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#07111f] sm:text-4xl lg:text-5xl">
                {t('package.title')}
              </h2>
              <p className="mt-4 text-lg leading-7 text-[#52666d] sm:mt-6 sm:leading-8">{t('package.intro')}</p>
            </motion.div>

            {/* Mobil wischen die drei Bausteine als Karten, ab md das bisherige Raster (ab lg dreispaltig). */}
            <MobileSwipeRow
              label={t('package.title')}
              className="mt-6 sm:mt-14"
              desktopClassName="md:grid md:gap-6 lg:grid-cols-3"
              mobileItemWidth="w-[82vw] max-w-[22rem]"
            >
              {packageItems.map((item, index) => {
                const icon = packageFriendlyIcons[index] || { emoji: '📄', tone: 'sky' };
                return (
                  <motion.article key={item.title} {...revealProps(index * 0.07)} className="h-full border-t-4 border-[#25c990] bg-white p-5 shadow-[0_2px_6px_rgba(7,17,31,0.1)] sm:p-8 sm:shadow-[0_14px_44px_rgba(7,17,31,0.06)]">
                    <FriendlyIcon emoji={icon.emoji} label={item.title} tone={icon.tone} size="sm" />
                    <h3 className="mt-5 font-display text-xl font-extrabold tracking-[-0.02em] text-[#07111f] sm:mt-8">{item.title}</h3>
                    <p className="mt-3 leading-7 text-[#5c6f76]">{item.text}</p>
                  </motion.article>
                );
              })}
            </MobileSwipeRow>

            <motion.p {...revealProps(0.12)} className="mt-5 max-w-4xl text-sm leading-6 text-[#667980] sm:mt-9">
              {t('package.note')}
            </motion.p>
          </div>
        </section>

        <section className="order-10 md:order-none bg-white px-4 py-10 sm:px-6 sm:py-24 md:px-8 lg:py-28">
          <div className="container mx-auto px-0 md:px-8 grid max-w-6xl gap-5 sm:gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <motion.div {...revealProps()}>
              <p className="font-mono text-sm font-bold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.18em] text-[#087654]">{t('faq.eyebrow')}</p>
              <h2 className="mt-3 font-display sm:mt-5 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#07111f] sm:text-4xl">
                {t('faq.title')}
              </h2>
              <p className="mt-3 leading-7 text-[#5a6e75] sm:mt-5">{t('faq.intro')}</p>
            </motion.div>
            <motion.div {...revealProps(0.08)} className="divide-y divide-[#dce5e2] border-y border-[#dce5e2]">
              {faqItems.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display sm:gap-6 sm:py-6 text-lg font-extrabold text-[#07111f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="grid h-8 w-8 flex-none place-items-center border border-[#b9ccc7] text-[#087654] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-5 leading-7 text-[#5b6e75] sm:pb-7 sm:pr-10">{item.a}</p>
                </details>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="order-11 md:order-none bg-[#25c990] px-4 py-10 sm:px-6 sm:py-20 md:px-8 lg:py-24">
          <div className="container mx-auto px-0 md:px-8 max-w-5xl text-center">
            <motion.div {...revealProps()}>
              <p className="font-mono text-sm font-bold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.18em] text-[#064c38]">{t('cta.eyebrow')}</p>
              <h2 className="mx-auto mt-3 max-w-3xl sm:mt-5 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#07111f] sm:text-4xl lg:text-5xl">
                {t('cta.title')}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-lg leading-7 text-[#0b4f3d] sm:mt-5 sm:leading-8">{t('cta.subtitle')}</p>
            </motion.div>

            <motion.div {...revealProps(0.08)} className="mt-6 bg-white p-3 shadow-[0_28px_80px_rgba(7,17,31,0.18)] sm:mt-10 sm:p-5">
              <div id="calendly-zahnaerzte" className="scroll-mt-24 overflow-hidden">
                <AppointmentBooking
                  placement="dentists_page"
                  title={t('cta.calendarTitle')}
                  className="h-[700px]"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <AmbulantMiaPrompt variant="zahnaerzte" />
    </>
  );
};

export default ZahnaerztePage;
