import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Check, ChevronDown, Download, Info, Shield } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import AmbulantMiaPrompt from '@/components/sections/ambulant/AmbulantMiaPrompt';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';
import { useLanguage } from '@/hooks/useLanguage';
import useDesktopLayout from '@/hooks/useDesktopLayout';
import AppointmentBooking from '@/components/CalendlyEmbed';
import IkkKassenSiegel from '@/components/sections/shared/IkkKassenSiegel';
import { HealioSiegelBand } from '@/components/sections/shared/HealioAwardsRow';
import ExplainerVideoCard from '@/components/sections/shared/ExplainerVideoCard';
import SceneHero, {
  sceneAccentClass,
  sceneBelow,
  scenePrimaryButtonClass,
  sceneSecondaryButtonClass,
} from '@/components/desktop/SceneHero';

// Look wie /ambulant, /stationaer und /zahn (Frank 08.10.2026): Szene als
// Kopfbereich am Rechner, dunkler Einstieg mit Kartenreihe am Handy, Siegel als
// Laufband, danach helle Abschnitte im Wechsel Weiß und Eisgrün mit runden
// Karten. Texte inhaltlich unverändert aus hebammen.json.

// Erklärfilm Hebammen v1 (Nita + Motion, 104 Sekunden), seit 08.10.2026.
// Quelle: Healio/video-studio/website-erklaervideos-2026-10-06/24-web/
// Ohne Videoquelle wird der Abschnitt nicht gerendert und der zweite Knopf im
// Kopfbereich bleibt aus.
const HEBAMMEN_VIDEO = {
  src: '/videos/erklaerfilme/erklaervideo-hebammen-v1.mp4',
  poster: '/videos/erklaerfilme/erklaervideo-hebammen-v1-poster.jpg',
  captions: '/videos/erklaerfilme/erklaervideo-hebammen-v1-de.vtt',
};
const VIDEO_ID = 'hebammen-video';
const BOOKING_ID = 'calendly-hebammen';

// Zwei Tarifarten für Familien, Texte unter tarife.* in den Sprachdateien.
const TARIFF_CARDS = [
  { key: 'ambulant', kind: 'pregnancy', tone: 'coral' },
  { key: 'stationaer', kind: 'hospital', tone: 'sky' },
];
const DOWNLOAD_GROUPS = [
  { key: 'practice', kind: 'broker', documents: [
    { key: 'invoice', href: '/downloads/hebammen-rechnungsmuster.pdf' },
    { key: 'agreement', href: '/downloads/hebammen-leistungs-und-honorarvereinbarung.pdf' },
  ] },
  { key: 'family', kind: 'family', documents: [
    { key: 'checklist', href: '/downloads/hebammen-familien-checkliste.pdf' },
  ] },
];

// Rollen im Konzept (proof.items): je Karte eigene Figur und warmer Farbton,
// wie die Wischkarten im Einstieg von /stationaer.
const PROOF_STYLES = [
  { kind: 'pregnancy', tone: 'coral', card: 'from-[#fff6f2] to-[#ffe8de] ring-[#f3d3c6]' },
  { kind: 'family', tone: 'butter', card: 'from-[#fffcf2] to-[#fcf0cf] ring-[#efe0b2]' },
  { kind: 'support', tone: 'mint', card: 'from-[#f4fbf7] to-[#e2f4eb] ring-[#cde8dc]' },
];
const HIGHLIGHT_ICONS = [
  { kind: 'naturopathy', tone: 'mint' },
  { kind: 'prevention', tone: 'lavender' },
  { kind: 'ambulant', tone: 'sky' },
  { kind: 'medication', tone: 'butter' },
  { kind: 'family', tone: 'coral' },
];
const STEP_ICONS = [
  { kind: 'support', tone: 'lavender' },
  { kind: 'document', tone: 'sky' },
  { kind: 'family', tone: 'coral' },
];
const KLINIK_BLOCKS = [
  { key: 'chance', tone: 'bg-[#fff6f2] ring-[#f3d3c6]' },
  { key: 'chanceOben', tone: 'bg-home-ice ring-home-mint/20' },
  { key: 'deadline', tone: 'bg-[#fffaf0] ring-[#efe0b2]' },
  { key: 'ehrlich', tone: 'bg-slate-50 ring-slate-200' },
  { key: 'rooming', tone: 'bg-home-ice ring-[#cde8dc]' },
];

// Gemeinsame Stile der Produktseiten (StationaerTrustFaq, StationaerFamily).
const wrap = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';
const sectionPad = 'py-12 md:py-24';
const eyebrowClass = 'font-display text-sm font-bold uppercase tracking-[0.14em] text-[#087454] md:text-xs md:tracking-[0.22em]';
const h2Class = 'font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#071726] [text-wrap:balance] sm:text-4xl lg:text-5xl lg:leading-[1.08]';
const cardClass = 'h-full rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-[0_2px_8px_rgba(31,57,66,0.07)] sm:p-7 md:border-white md:shadow-[0_14px_35px_rgba(31,57,66,0.06)]';
const accordionClass = 'group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm';
const summaryClass = 'flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left font-extrabold text-[#071726] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#25c990] sm:px-6 [&::-webkit-details-marker]:hidden';
const chevronClass = 'h-5 w-5 shrink-0 text-[#087454] transition-transform group-open:rotate-180 motion-reduce:transition-none';

const SectionHead = ({ eyebrow, title, subtitle, id, className = '' }) => (
  <div className={`mx-auto max-w-3xl text-center ${className}`}>
    {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
    <h2 id={id} className={`${eyebrow ? 'mt-4' : ''} ${h2Class}`}>{title}</h2>
    {subtitle && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 [text-wrap:pretty] sm:text-lg">{subtitle}</p>}
  </div>
);

const HebammenPage = () => {
  const { t } = useTranslation('hebammen');
  const { t: tSeo } = useTranslation('seo');
  const { t: tCommon } = useTranslation('common');
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  // Ab lg trägt SceneHero die h1; der Handy-Einstieg nutzt dort h2.
  const HeroHeading = useDesktopLayout() ? 'h2' : 'h1';
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/midwives' : 'https://healio.de/hebammen';
  const showVideo = lang === 'de' && Boolean(HEBAMMEN_VIDEO.src);
  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  const scrollTo = (id) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const proofItems = t('proof.items', { returnObjects: true }).map((item, index) => ({
    ...item,
    ...(PROOF_STYLES[index] || PROOF_STYLES[0]),
  }));

  const schemaMarkup = createWebPageSchema(
    tSeo('hebammen.title'),
    tSeo('hebammen.description')
  );

  return (
    <>
      <SEOHead
        title={tSeo('hebammen.title')}
        description={tSeo('hebammen.description')}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />

      {/* Eine Reihenfolge für Handy und Rechner: Einstieg, Siegel, Erklärvideo,
          dann Fälle, Bausteine, Kind, Tarife, Rollen, Ablauf und Termin. */}
      <article className="w-full overflow-hidden bg-white text-[#071726]">

        {/* EINSTIEG AM RECHNER (ab lg): Szene mit Überschrift und Knopf, darunter
            Erklärung und die drei Rollen ohne Kasten. */}
        <SceneHero
          surface="hebammen"
          headingId="desktop-hebammen-heading"
          dataAttributes={{ 'data-desktop-lead': 'hebammen' }}
          heading={<HighlightText text={t('hero.title')} className={sceneAccentClass} />}
          actions={(
            <>
              <button type="button" data-desktop-primary className={scenePrimaryButtonClass} onClick={scrollTo(BOOKING_ID)}>
                {t('hero.cta')}
                <ArrowDown className="h-5 w-5" aria-hidden="true" />
              </button>
              {showVideo && (
                <button type="button" className={sceneSecondaryButtonClass} onClick={scrollTo(VIDEO_ID)}>
                  {t('hero.secondaryCta')}
                  <ArrowDown className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </>
          )}
        >
          <div className={sceneBelow.grid}>
            <div className="min-w-0">
              <p className="mb-4 text-sm font-semibold leading-6 text-[#bfced6]">{t('hero.badge')}</p>
              <p className={sceneBelow.lead}>{t('hero.subtitle')}</p>
              <p className={`flex items-start gap-2 ${sceneBelow.note}`}>
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
                {t('hero.note')}
              </p>
            </div>
            <div className="min-w-0">
              <h2 className={sceneBelow.listTitle}>{t('proof.ariaLabel')}</h2>
              <dl className={sceneBelow.list}>
                {proofItems.map((item) => (
                  <div key={item.title} className="py-3.5">
                    <dt className="font-display text-base font-bold leading-6 text-white">{item.title}</dt>
                    <dd className="mt-1.5 text-sm leading-6 text-[#c9d8de]">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </SceneHero>

        {/* EINSTIEG AM HANDY UND TABLET (unter lg): dunkler Grund wie /stationaer,
            darunter die drei Rollen als Wischkarten in der hellen Karte. */}
        <section className="relative isolate overflow-hidden bg-[#071726] text-white lg:hidden" aria-labelledby="hebammen-hero-heading">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#25c990]/16 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#f2b8a6]/14 blur-3xl" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true" />

          <div className={`relative grid items-center gap-8 pb-10 pt-28 sm:pb-16 md:gap-12 md:pt-32 ${wrap}`}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="min-w-0 w-full max-w-3xl"
            >
              <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#5ee0b1] sm:tracking-[0.23em]">
                {t('hero.badge')}
              </p>
              <HeroHeading
                id="hebammen-hero-heading"
                className="mt-4 max-w-[18ch] font-display text-[2.15rem] font-extrabold leading-[1.04] tracking-[-0.035em] [text-wrap:balance] md:mt-5 md:text-[clamp(2.4rem,4.6vw,4.25rem)]"
              >
                <HighlightText text={t('hero.title')} className="text-[#5ee0b1]" />
              </HeroHeading>
              <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-200 sm:text-lg md:mt-6">
                {t('hero.subtitle')}
              </p>
              <button
                type="button"
                onClick={scrollTo(BOOKING_ID)}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25c990] px-7 py-3.5 font-display font-extrabold text-[#071726] shadow-[0_14px_36px_rgba(37,201,144,0.24)] transition hover:-translate-y-0.5 hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ee0b1] motion-reduce:transform-none md:mt-8"
              >
                {t('hero.cta')}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="mt-5 flex items-start gap-2 text-base font-semibold text-slate-300 md:text-sm">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
                {t('hero.note')}
              </p>
            </motion.div>

            <div className="relative mx-auto min-w-0 w-full max-w-[35rem] md:max-w-none">
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-gradient-to-br from-[#eefaf5] via-white to-[#fff5d9] p-4 text-[#071726] shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-7">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3">
                  <img
                    src="/images/friendly-icons/pregnancy.webp"
                    alt=""
                    width="512"
                    height="512"
                    className="w-20 max-w-none sm:w-24"
                    loading="eager"
                    decoding="async"
                  />
                  <p className="font-display text-base font-extrabold leading-tight text-[#0b6048]">{t('proof.ariaLabel')}</p>
                </div>
                <MobileSwipeRow
                  label={t('proof.ariaLabel')}
                  className="mt-3 min-w-0"
                  desktopClassName="-mx-4 scroll-pl-4 px-4 sm:-mx-7 sm:scroll-pl-7 sm:px-7 md:mx-0 md:grid md:grid-cols-3 md:gap-3 md:px-0"
                  mobileItemWidth="w-[78%]"
                  bleed={false}
                >
                  {proofItems.map((item) => (
                    <div key={item.title} className={`h-full rounded-[1.4rem] bg-gradient-to-br p-4 ring-1 ${item.card}`}>
                      <div className="flex items-center gap-3">
                        <FriendlyIcon kind={item.kind} tone={item.tone} size="sm" />
                        <p className="min-w-0 font-display text-base font-extrabold leading-tight text-[#071726]">{item.title}</p>
                      </div>
                      <p className="mt-3 text-base font-medium leading-snug text-slate-600 md:text-sm">{item.text}</p>
                    </div>
                  ))}
                </MobileSwipeRow>
              </div>
            </div>
          </div>
        </section>

        {/* SIEGEL: SDK + IKK classic. Stand 03.10.2026: Die Siegel der
            SDK-Vollversicherung (Warentest 0,9, Morgen & Morgen) sind entfernt,
            die IKK-Siegel durch die Fassung 09/2026 ersetzt (IKK-Mail 01.10.2026).
            Beide Partner stehen als eigene Gruppe, damit klar bleibt, dass die
            IKK-Siegel die Krankenkasse bewerten und nicht die Zusatzversicherung.
            Handy: nur das laufende Band ohne Überschrift (Hinweise als sr-only). */}
        <section className="border-b border-gray-100 bg-white py-3 md:py-12" aria-label={tCommon('awards.label')}>
          <div className="container mx-auto px-4">
            <HealioSiegelBand className="mx-auto max-w-6xl md:hidden" withIkk ikkOrder="parents" size="large" />
            <div className="hidden md:block">
              <p className="text-center text-sm font-medium uppercase tracking-wider text-slate-500">
                {lang === 'en' ? 'Our partners: SDK Süddeutsche Krankenversicherung & IKK classic' : 'Unsere Partner: SDK Süddeutsche Krankenversicherung & IKK classic'}
              </p>
              <div className="mx-auto mt-5 flex max-w-6xl flex-row flex-wrap items-start justify-center gap-8 gap-x-14">
                <div className="flex flex-col items-center">
                  <p className="text-center text-sm font-semibold text-slate-600">{tCommon('awards.groups.sdk')}</p>
                  <img src="/siegel/sdk/fairnesspreis.png" alt={tCommon('awards.items.fairness')} width="240" height="240" className="mt-3 h-24 w-auto lg:h-28" loading="lazy" decoding="async" />
                </div>
                <IkkKassenSiegel order="parents" size="large" />
              </div>
            </div>
          </div>
        </section>

        {/* ERKLÄRVIDEO: nur Deutsch, erscheint nur mit Videoquelle (siehe oben). */}
        {showVideo && (
          <ExplainerVideoCard
            id={VIDEO_ID}
            videoSrc={HEBAMMEN_VIDEO.src}
            poster={HEBAMMEN_VIDEO.poster || undefined}
            captionsSrc={HEBAMMEN_VIDEO.captions || undefined}
            eyebrow={t('explanationVideo.eyebrow')}
            title={t('explanationVideo.title')}
            ariaLabel={t('explanationVideo.aria')}
            className="bg-[#f4f8f6]"
          />
        )}

        {/* PROBLEM & LÖSUNG */}
        <section className={`bg-white ${sectionPad}`} aria-labelledby="hebammen-problem-heading">
          <div className={wrap}>
            <div className="mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-12">
              <motion.div {...reveal} className="min-w-0">
                <h2 id="hebammen-problem-heading" className={h2Class}>{t('problem.title')}</h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{t('problem.text')}</p>
              </motion.div>
              <motion.div {...reveal} className="min-w-0 rounded-[2rem] border border-emerald-900/10 bg-home-ice p-6 shadow-[0_24px_60px_rgba(7,17,31,0.08)] sm:p-8">
                <FriendlyIcon kind="budget" tone="mint" size="md" className="!h-12 !w-12 sm:!h-16 sm:!w-16" />
                <h3 className="mt-4 font-display text-xl font-extrabold leading-tight text-[#071726] sm:mt-5 sm:text-2xl">{t('solution.title')}</h3>
                <p className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] text-[#087454]">{t('solution.amount')}</p>
                <p className={`mt-2 ${eyebrowClass}`}>{t('solution.amountLabel')}</p>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{t('solution.text')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ZWEI FÄLLE + ARBEITSHILFEN. Konkrete Kostenfälle und Vorlagen. */}
        <section id="hebammen-beispiele" className={`scroll-mt-24 bg-[#f5faf8] ${sectionPad}`} aria-labelledby="hebammen-beispiele-heading">
          <div className={wrap}>
            <SectionHead id="hebammen-beispiele-heading" eyebrow={t('examples.eyebrow')} title={t('examples.title')} subtitle={t('examples.lead')} />

            <MobileSwipeRow label={t('examples.title')} className="mx-auto mt-8 max-w-5xl md:mt-12" desktopClassName="md:grid md:grid-cols-2 md:gap-6" mobileItemWidth="w-[84vw] max-w-[22rem]">
              <article className={cardClass} data-hebammen-case="rufbereitschaft">
                <FriendlyIcon kind="calendar" tone="mint" size="sm" />
                <p className={`mt-4 ${eyebrowClass}`}>{t('examples.onCall.eyebrow')}</p>
                <h3 className="mt-2 font-display text-xl font-extrabold leading-tight text-[#071726] sm:text-2xl">{t('examples.onCall.title')}</h3>
                <dl className="mt-5 grid grid-cols-3 gap-2">
                  {t('examples.onCall.amounts', { returnObjects: true }).map((item, index, all) => (
                    <div key={item.label} className={`min-w-0 rounded-2xl px-2.5 py-3 ${index === all.length - 1 ? 'bg-[#071726] text-white' : 'bg-home-ice'}`}>
                      <dt className={`text-sm leading-5 ${index === all.length - 1 ? 'text-[#c9d8de]' : 'text-slate-600'}`}>{item.label}</dt>
                      <dd className={`mt-1 font-display text-base font-extrabold sm:text-lg ${index === all.length - 1 ? 'text-[#5ee0b1]' : 'text-[#071726]'}`}>{item.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-base leading-relaxed text-slate-700">{t('examples.onCall.text')}</p>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-500">{t('examples.onCall.note')}</p>
              </article>
              <article className={cardClass} data-hebammen-case="hausbesuch">
                <FriendlyIcon kind="support" tone="sky" size="sm" />
                <p className="mt-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-home-midnight md:text-xs md:tracking-[0.22em]">{t('examples.homeVisit.eyebrow')}</p>
                <h3 className="mt-2 font-display text-xl font-extrabold leading-tight text-[#071726] sm:text-2xl">{t('examples.homeVisit.title')}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{t('examples.homeVisit.text')}</p>
                <ol className="mt-4 space-y-3">
                  {t('examples.homeVisit.steps', { returnObjects: true }).map((item, index) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed text-slate-700">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-healio-light font-display text-sm font-extrabold text-home-midnight">{index + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-500">{t('examples.homeVisit.note')}</p>
              </article>
            </MobileSwipeRow>

            <aside className="mx-auto mt-6 max-w-5xl rounded-[1.5rem] border border-[#efe0b2] bg-[#fffaf0] p-5 sm:p-6" aria-labelledby="hebammen-fruehzeitig-heading">
              <h3 id="hebammen-fruehzeitig-heading" className="flex items-start gap-3 font-display text-lg font-extrabold text-[#071726]">
                <Info className="mt-1 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
                {t('downloads.waitTitle')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">{t('downloads.waitText')}</p>
            </aside>

            <div id="hebammen-materialien" className="mx-auto mt-12 max-w-5xl scroll-mt-24 md:mt-16" aria-labelledby="hebammen-materialien-heading">
              <h3 id="hebammen-materialien-heading" className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#071726] sm:text-3xl">{t('downloads.title')}</h3>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">{t('downloads.lead')}</p>
              <MobileSwipeRow label={t('downloads.title')} className="mt-6" desktopClassName="md:grid md:grid-cols-2 md:gap-6" mobileItemWidth="w-[84vw] max-w-[22rem]">
                {DOWNLOAD_GROUPS.map((group) => (
                  <article key={group.key} className={cardClass}>
                    <FriendlyIcon kind={group.kind} tone="mint" size="sm" />
                    <h4 className="mt-4 font-display text-xl font-extrabold leading-tight text-[#071726]">{t(`downloads.${group.key}.title`)}</h4>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">{t(`downloads.${group.key}.text`)}</p>
                    <div className="mt-5 space-y-3">
                      {group.documents.map((document) => (
                        <a
                          key={document.key}
                          href={document.href}
                          download
                          className="flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-base font-bold text-[#071726] transition hover:border-[#25c990] hover:bg-home-ice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25c990]"
                          data-hebammen-download={document.key}
                        >
                          <span>{t(`downloads.documents.${document.key}`)}</span>
                          <Download className="h-5 w-5 shrink-0 text-[#087454]" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </MobileSwipeRow>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">{t('downloads.note')}</p>
            </div>
          </div>
        </section>

        {/* BAUSTEINE: Kassenleistungen, Bonus und Zusatzschutz */}
        <section className={`bg-white ${sectionPad}`} aria-labelledby="hebammen-leistungen-heading">
          <div className={wrap}>
            <SectionHead id="hebammen-leistungen-heading" eyebrow={t('leistungen.eyebrow')} title={t('leistungen.title')} subtitle={t('leistungen.subtitle')} />

            {/* Mobil Wischreihe, ab md das Raster. */}
            <MobileSwipeRow
              label={t('leistungen.title')}
              className="mx-auto mt-8 max-w-6xl md:mt-12"
              desktopClassName="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5"
              mobileItemWidth="w-[84vw] max-w-[22rem]"
            >
              {t('leistungen.highlights', { returnObjects: true }).map((item, index) => {
                const icon = HIGHLIGHT_ICONS[index] || HIGHLIGHT_ICONS[0];
                return (
                  <motion.div key={item.title} {...reveal} transition={{ delay: index * 0.06 }} className={cardClass}>
                    <FriendlyIcon kind={icon.kind} tone={icon.tone} size="sm" />
                    <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-[#071726]">{item.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-600">{item.desc}</p>
                  </motion.div>
                );
              })}
            </MobileSwipeRow>

            <div className="mx-auto mt-6 max-w-6xl space-y-4 md:mt-10">
              <details className={accordionClass}>
                <summary className={summaryClass}>
                  <span>{t('leistungen.detailsLabel')}</span>
                  <ChevronDown className={chevronClass} aria-hidden="true" />
                </summary>
                <div className="grid grid-cols-1 gap-5 border-t border-slate-100 p-5 sm:p-7 md:grid-cols-2 md:gap-6">
                  {/* IKK classic */}
                  <div className="rounded-[1.5rem] bg-home-ice p-5 ring-1 ring-home-mint/20 sm:p-7">
                    <h3 className="font-display text-xl font-extrabold text-home-midnight">{t('leistungen.ikkTitle')}</h3>
                    <div className="mt-5 space-y-4">
                      {t('leistungen.ikkItems', { returnObjects: true }).map((item) => (
                        <div key={item.name} className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1 md:flex-nowrap">
                          <div className="flex flex-1 items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-healio-primary-dark" aria-hidden="true" />
                            <div>
                              <p className="text-base font-semibold text-[#071726]">{item.name}</p>
                              <p className="text-sm text-slate-500">{item.detail}</p>
                            </div>
                          </div>
                          <span className="whitespace-nowrap pl-8 font-display text-base font-extrabold text-home-midnight md:pl-0">{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SDK Zusatzversicherung */}
                  <div className="rounded-[1.5rem] bg-home-ice p-5 ring-1 ring-[#cde8dc] sm:p-7">
                    <h3 className="font-display text-xl font-extrabold text-[#087454]">{t('leistungen.sdkTitle')}</h3>
                    <div className="mt-5 space-y-4">
                      {t('leistungen.sdkItems', { returnObjects: true }).map((item) => (
                        <div key={item.name} className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1 md:flex-nowrap">
                          <div className="flex flex-1 items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#25c990]" aria-hidden="true" />
                            <div>
                              <p className="text-base font-semibold text-[#071726]">{item.name}</p>
                              <p className="text-sm text-slate-500">{item.detail}</p>
                            </div>
                          </div>
                          <span className="whitespace-nowrap pl-8 font-display text-base font-extrabold text-[#087454] md:pl-0">{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </details>

              {/* Gesamtbudget als ruhige Leiste, die Bedingungen stehen daneben. */}
              <motion.div {...reveal} className="grid gap-3 rounded-[2rem] bg-[#071726] p-6 text-white shadow-[0_24px_60px_rgba(7,17,31,0.16)] sm:p-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-10">
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#5ee0b1] md:text-xs md:tracking-[0.22em]">{t('leistungen.totalLabel')}</p>
                  <p className="mt-2 font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">{t('leistungen.totalAmount')}</p>
                </div>
                <p className="text-base leading-relaxed text-slate-200">{t('leistungen.totalNote')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* NEUGEBORENES / KLINIK */}
        <section className={`bg-[#f5faf8] ${sectionPad}`} aria-labelledby="hebammen-klinik-heading">
          <div className={wrap}>
            <SectionHead id="hebammen-klinik-heading" eyebrow={t('klinik.eyebrow')} title={t('klinik.title')} subtitle={t('klinik.subtitle')} />

            <div className="mx-auto mt-8 max-w-5xl space-y-4 md:mt-12">
              {/* Kernbotschaft, hervorgehoben */}
              <motion.div {...reveal} className="rounded-[2rem] bg-gradient-to-br from-[#0a6c50] to-[#063e35] p-6 text-white shadow-[0_24px_60px_rgba(6,62,53,0.18)] sm:p-10">
                <FriendlyIcon kind="hospital" tone="mint" size="sm" />
                <h3 className="mt-4 font-display text-xl font-extrabold leading-snug [text-wrap:balance] sm:text-2xl">{t('klinik.kernTitle')}</h3>
                {t('klinik.kernText').split('\n\n').map((abs) => (
                  <p key={abs.slice(0, 32)} className="mt-3 text-base leading-relaxed text-emerald-50/90 sm:mt-4 sm:text-lg">{abs}</p>
                ))}
              </motion.div>

              <details className={accordionClass}>
                <summary className={summaryClass}>
                  <span>{t('klinik.detailsLabel')}</span>
                  <ChevronDown className={chevronClass} aria-hidden="true" />
                </summary>
                <div className="border-t border-slate-100 p-5 sm:p-7">
                  <div className="space-y-4">
                    {KLINIK_BLOCKS.map((block) => (
                      <div key={block.key} className={`rounded-[1.25rem] p-5 ring-1 sm:p-6 ${block.tone}`}>
                        <h4 className="font-display text-lg font-extrabold text-[#071726] sm:text-xl">{t(`klinik.${block.key}Title`)}</h4>
                        {t(`klinik.${block.key}Text`).split('\n\n').map((abs) => (
                          <p key={abs.slice(0, 32)} className="mt-3 text-base leading-relaxed text-slate-700">{abs}</p>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 text-center">
                    <h3 className="font-display text-2xl font-extrabold text-[#071726]">{t('klinik.compareTitle')}</h3>
                    <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{t('klinik.compareSubtitle')}</p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {[
                      { key: 'bayerische', accent: 'text-home-midnight', check: 'text-healio-primary-dark' },
                      { key: 'sdk', accent: 'text-[#087454]', check: 'text-[#25c990]' },
                    ].map((insurer) => (
                      <div key={insurer.key} className="flex flex-col rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-[0_14px_35px_rgba(31,57,66,0.06)] sm:p-7">
                        <h3 className="font-display text-xl font-extrabold text-[#071726]">{t(`klinik.${insurer.key}Name`)}</h3>
                        <p className={`mt-1 text-base font-semibold ${insurer.accent}`}>{t(`klinik.${insurer.key}Tag`)}</p>
                        <div className="mt-5 flex-1 space-y-3">
                          {t(`klinik.${insurer.key}Items`, { returnObjects: true }).map((item) => (
                            <div key={item} className="flex items-start gap-3">
                              <Check className={`mt-0.5 h-5 w-5 shrink-0 ${insurer.check}`} aria-hidden="true" />
                              <p className="text-base leading-relaxed text-slate-700">{item}</p>
                            </div>
                          ))}
                        </div>
                        <p className="mt-6 border-t border-slate-100 pt-5 text-sm leading-relaxed text-slate-500">{t(`klinik.${insurer.key}Caveat`)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.5rem] bg-home-ice p-5 ring-1 ring-[#cde8dc] sm:p-7">
                    <p className="text-base leading-relaxed text-slate-700">{t('klinik.bonusNote')}</p>
                    <p className="mt-4 text-base leading-relaxed text-slate-700">{t('klinik.closingNote')}</p>
                    <Link to="/stationaer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm font-bold text-[#087454] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25c990]">
                      {t('klinik.ctaLink')}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* WAS DU FAMILIEN SAGEN KANNST (Frank 30.09.2026): ersetzt vorerst den
            Prämien-Abschnitt. Versicherungsaussagen nur aus geprüften Quellen,
            /schwangerschaft (BenefitFunnelPage) und /stationaer (StationaerFamily,
            StationaerBayerischeAlternative). Die Bayerische-Karte nennt seit
            05.10.2026 die korrigierten Familienpunkte (Familienzimmer über den
            Vertrag der Mutter, acht Monate Entbindung, Kindernachversicherung).
            Hebammen-Aussage der Bayerischen laut Produktunterlagen (Highlightblatt
            B 275008, Produktsteckbrief B 275010), Freigabe Frank 29.09.2026,
            bestätigt 06.10.2026; nicht in den Tarifbedingungen, schriftliche
            Bestätigung beim Versicherer angefragt. Hebammenkosten der Bayerischen
            stehen immer zusammen mit Wartezeiten und dem Ausschluss einer beim
            Antrag schon bestehenden Schwangerschaft. */}
        <section
          id="hebammen-tarife"
          className={`scroll-mt-24 bg-white ${sectionPad}`}
          aria-labelledby="hebammen-tarife-heading"
          data-healio-midwife="tarife"
        >
          <div className={wrap}>
            <SectionHead id="hebammen-tarife-heading" eyebrow={t('tarife.eyebrow')} title={t('tarife.title')} subtitle={t('tarife.lead')} />

            {/* Mobil wischen die zwei Tarifarten und der Hinweis "beides möglich" als
                Karten nebeneinander; ab md liegen die zwei Karten im Raster und der
                Hinweis darunter über die ganze Breite. */}
            <MobileSwipeRow
              label={t('tarife.title')}
              className="mx-auto mt-8 max-w-5xl md:mt-12"
              desktopClassName="md:grid md:grid-cols-2 md:gap-6 md:[&>li:nth-child(3)]:col-span-2"
              mobileItemWidth="w-[86vw] max-w-[24rem]"
            >
              {TARIFF_CARDS.map((card, index) => (
                <motion.article
                  key={card.key}
                  {...reveal}
                  transition={{ delay: index * 0.08 }}
                  className="flex h-full flex-col rounded-[2rem] border border-slate-100 bg-white p-5 shadow-[0_24px_60px_rgba(7,17,31,0.10)] sm:p-8"
                  data-healio-midwife-card={card.key}
                >
                  <FriendlyIcon kind={card.kind} tone={card.tone} size="md" className="!h-12 !w-12 sm:!h-16 sm:!w-16" />
                  <p className={`mt-4 sm:mt-6 ${eyebrowClass}`}>{t(`tarife.${card.key}.label`)}</p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#071726] [text-wrap:balance]">
                    {t(`tarife.${card.key}.title`)}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-700 sm:mt-4 sm:text-[1.0625rem]">{t(`tarife.${card.key}.text`)}</p>
                  <div className="mt-auto pt-4 sm:pt-6">
                    <p className="flex gap-2.5 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600 sm:pt-5 sm:text-[0.9375rem]">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                      <span>{t(`tarife.${card.key}.condition`)}</span>
                    </p>
                  </div>
                </motion.article>
              ))}

              <motion.div
                {...reveal}
                className="flex h-full flex-col items-start justify-center gap-4 rounded-[1.5rem] border border-emerald-100 bg-home-ice p-5 sm:flex-row sm:items-center sm:justify-start sm:p-6"
              >
                <FriendlyIcon kind="family" tone="mint" size="sm" />
                <p className="text-base leading-relaxed text-slate-700 sm:text-[1.0625rem]">{t('tarife.both')}</p>
              </motion.div>
            </MobileSwipeRow>

            <motion.article
              {...reveal}
              className="mx-auto mt-4 grid max-w-5xl gap-4 rounded-[2rem] border border-emerald-200 bg-home-ice p-5 shadow-[0_24px_60px_rgba(7,17,31,0.10)] sm:mt-8 sm:gap-6 sm:p-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8 lg:p-10"
              aria-labelledby="hebammen-bayerische-heading"
              data-healio-midwife-card="bayerische"
            >
              <FriendlyIcon kind="calendar" tone="sky" size="lg" className="!h-14 !w-14 sm:!h-20 sm:!w-20" />
              <div className="min-w-0">
                <p className={eyebrowClass}>{t('tarife.bayerische.label')}</p>
                <h3 id="hebammen-bayerische-heading" className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#071726] [text-wrap:balance] sm:text-3xl">
                  {t('tarife.bayerische.title')}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-[1.0625rem]">{t('tarife.bayerische.text')}</p>
                <p className="mt-4 flex max-w-3xl gap-2.5 rounded-2xl border border-emerald-100 bg-white p-4 text-sm leading-relaxed text-slate-700 sm:mt-5 sm:text-[0.9375rem]">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#087454]" aria-hidden="true" />
                  <span>{t('tarife.bayerische.condition')}</span>
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* ROLLEN + FRAGEN. Klare Zuständigkeiten; keine pauschale Rechts- oder
            Leistungszusage. Fragen im Stil von /stationaer, Antworten bleiben im
            HTML (details), damit sie auch ohne Skript lesbar sind. */}
        <section className={`bg-[#f5faf8] ${sectionPad}`} aria-labelledby="hebammen-rollen-heading">
          <div className={wrap}>
            <SectionHead id="hebammen-rollen-heading" eyebrow={t('legal.eyebrow')} title={t('legal.title')} subtitle={t('legal.subtitle')} />

            <MobileSwipeRow label={t('legal.title')} className="mx-auto mt-8 max-w-5xl md:mt-10" desktopClassName="md:grid md:grid-cols-3 md:gap-4" mobileItemWidth="w-[84vw] max-w-[22rem]">
              {t('roles', { returnObjects: true }).map((role, index) => (
                <article key={role.title} className={cardClass}>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25c990] font-display text-sm font-extrabold text-[#071726]">{index + 1}</span>
                  <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-[#071726]">{role.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{role.text}</p>
                </article>
              ))}
            </MobileSwipeRow>
            <p className="mx-auto mt-5 max-w-5xl text-sm leading-relaxed text-slate-500">{t('legal.summary')}</p>

            <div className="mx-auto mt-12 max-w-4xl md:mt-16" aria-labelledby="hebammen-faq-heading">
              <div className="text-center">
                <p className={eyebrowClass}>{t('faq.eyebrow')}</p>
                <h2 id="hebammen-faq-heading" className="mt-3 font-display text-3xl font-extrabold tracking-[-0.035em] text-[#071726] [text-wrap:balance] sm:text-4xl">{t('faq.title')}</h2>
              </div>
              <div className="mt-6 space-y-3 md:mt-8">
                {t('faq.items', { returnObjects: true }).map((item) => (
                  <details key={item.question} className={accordionClass}>
                    <summary className={summaryClass}>
                      <span>{item.question}</span>
                      <ChevronDown className={chevronClass} aria-hidden="true" />
                    </summary>
                    <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-base leading-relaxed text-slate-600 sm:px-6">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ABLAUF IN DREI SCHRITTEN */}
        <section className={`bg-white ${sectionPad}`} aria-labelledby="hebammen-ablauf-heading">
          <div className={wrap}>
            <SectionHead id="hebammen-ablauf-heading" eyebrow={t('steps.eyebrow')} title={t('steps.title')} />

            {/* Mobil wischen die drei Schritte als Karten; ab md drei Spalten. */}
            <MobileSwipeRow
              as="ol"
              label={t('steps.title')}
              className="mx-auto mt-8 max-w-5xl md:mt-12"
              desktopClassName="md:grid md:grid-cols-3 md:gap-6"
              mobileItemWidth="w-[84vw] max-w-[22rem]"
            >
              {[1, 2, 3].map((num, index) => {
                const icon = STEP_ICONS[index];
                return (
                  <motion.div key={num} {...reveal} transition={{ delay: index * 0.08 }} className={cardClass}>
                    <div className="flex items-center gap-3">
                      <FriendlyIcon kind={icon.kind} tone={icon.tone} size="sm" />
                      <span className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-[#087454]">0{num}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-extrabold leading-snug text-[#071726]">{t(`steps.step${num}Title`)}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-600">{t(`steps.step${num}Desc`)}</p>
                  </motion.div>
                );
              })}
            </MobileSwipeRow>

            <motion.div {...reveal} className="mx-auto mt-4 flex max-w-5xl items-start gap-4 rounded-[1.5rem] border border-emerald-100 bg-home-ice p-5 sm:p-6 md:mt-8">
              <FriendlyIcon kind="support" tone="mint" size="sm" />
              <p className="self-center text-base font-medium leading-relaxed text-slate-700">{t('steps.easeNote')}</p>
            </motion.div>
          </div>
        </section>

        {/* TERMIN: 45-Minuten-Kennenlernen */}
        <section className={`bg-home-ice ${sectionPad}`} aria-labelledby="hebammen-termin-heading">
          <div className={wrap}>
            <SectionHead id="hebammen-termin-heading" title={t('cta.title')} subtitle={t('cta.subtitle')} />
            <motion.div {...reveal} className="mx-auto mt-8 max-w-4xl rounded-[2rem] border border-emerald-900/10 bg-white p-3 shadow-[0_24px_60px_rgba(7,17,31,0.10)] sm:p-6 md:mt-10">
              <div id={BOOKING_ID} className="scroll-mt-28">
                <AppointmentBooking
                  placement="midwives_page"
                  title={lang === 'en' ? 'Book an appointment' : 'Termin buchen'}
                  className="h-[600px] md:h-[700px]"
                />
              </div>
            </motion.div>
          </div>
        </section>

      </article>
      <AmbulantMiaPrompt variant="hebammen" />
    </>
  );
};

export default HebammenPage;
