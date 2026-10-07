
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';
import PartnerRoleProcess from '@/components/sections/partner/PartnerRoleProcess';
import PartnerFAQ from '@/components/sections/partner/PartnerFAQ';
import AmbulantMiaPrompt from '@/components/sections/ambulant/AmbulantMiaPrompt';
import B2BExplainerVideo from '@/components/sections/B2BExplainerVideo';
import HealioAwardsRow from '@/components/sections/shared/HealioAwardsRow';
import HighlightText from '@/components/ui/HighlightText';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import AppointmentBooking from '@/components/CalendlyEmbed';
import { requestNitaConsent } from '@/components/NitaConsentWidget';
import { useLanguage } from '@/hooks/useLanguage';

// Sprungmarke zur Google-Terminplanung (Google Meet). Alte Links mit
// #calendly-embed werden beim Laden auf diese Marke umgelenkt.
const GOOGLE_TERMIN_ANCHOR = 'google-termin';
const LEGACY_TERMIN_ANCHORS = ['calendly-embed'];

// Freigegebene Webfassung des Partner-Erklärvideos (V2.15, 1600x900, faststart).
// Master und QA: Healio/video-studio/output/website-explainers/FINAL-PRODUCTION/
const PARTNER_VIDEO_SRC = '/erklaervideo-partner-v2-15.mp4';
const PARTNER_VIDEO_POSTER = '/images/erklaervideo-partner-poster.jpg';

// Für Beschriftungen (aria-label) ohne die <highlight>-Auszeichnung der Überschriften.
const plain = (text) => String(text || '').replace(/<\/?highlight>/g, '');

const PartnerPage = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace(/^#/, '');
    if (!LEGACY_TERMIN_ANCHORS.includes(hash)) return;
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${GOOGLE_TERMIN_ANCHOR}`);
    document.getElementById(GOOGLE_TERMIN_ANCHOR)?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  const { t, i18n } = useTranslation('partner');
  const { t: tSeo } = useTranslation('seo');
  const { getPath } = useLanguage();
  const isEnglish = i18n.language?.startsWith('en');
  const canonicalUrl = isEnglish ? 'https://healio.de/en/partner' : 'https://healio.de/partner';

  const schemaMarkup = createWebPageSchema(
    tSeo('partner.title'),
    tSeo('partner.description'),
    canonicalUrl,
    isEnglish ? 'en-US' : 'de-DE'
  );

  const partnerTypes = [
    { kind: 'naturopathy', tone: 'mint', title: t('partners.heilpraktiker'), text: t('partners.heilpraktikerDesc') },
    { kind: 'naturopathy', tone: 'butter', title: t('partners.osteopath'), text: t('partners.osteopathDesc') },
    { kind: 'naturopathy', tone: 'coral', title: t('partners.tcm'), text: t('partners.tcmDesc') },
    { kind: 'naturopathy', tone: 'lavender', title: t('partners.chiropraktiker'), text: t('partners.chiropraktikerDesc') },
    { kind: 'glasses', tone: 'sky', title: t('partners.brillenladen'), text: t('partners.brillenladenDesc') },
    { kind: 'pregnancy', tone: 'coral', title: t('partners.hebamme'), text: t('partners.hebammeDesc') },
  ];

  return (
    <>
      <SEOHead
        title={tSeo('partner.title')}
        description={tSeo('partner.description')}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />

      {/* Mobil bestimmt order die Reihenfolge der Abschnitte (Einstieg, Siegel, Video, dann der Weg vom Verstehen bis zum Termin),
            ab md bleibt es der bisherige Blocksatz in Quellreihenfolge. */}
      <main className="bg-white overflow-hidden w-full flex flex-col md:block">

        {/* SECTION 1: HERO */}
        <section className="relative order-1 md:order-none bg-slate-900 pt-20 pb-10 md:pb-14 lg:min-h-[100svh] lg:flex lg:items-center lg:pb-0">
          {/* Therapeutin im Sessel mit Patientin (partner-hero-*.webp, Quelle partner-hero-neu.png).
              Unter lg steht ein Querausschnitt mit beiden Frauen über dem Text, ab lg füllt das Bild den Hero. */}
          <div className="relative z-0 lg:absolute lg:inset-0">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet="/images/partner-hero-1280.webp 1280w, /images/partner-hero-1920.webp 1920w, /images/partner-hero-2560.webp 2560w"
                sizes="100vw"
                width="2560"
                height="1440"
              />
              <img
                src="/images/partner-hero-mobil-800.webp"
                srcSet="/images/partner-hero-mobil-480.webp 480w, /images/partner-hero-mobil-800.webp 800w, /images/partner-hero-mobil-1200.webp 1200w"
                sizes="100vw"
                alt={t('hero.imageAlt')}
                width="1200"
                height="847"
                {...{ fetchpriority: 'high' }}
                className="block h-auto max-h-[62svh] w-full object-cover object-[center_25%] lg:h-full lg:max-h-none lg:object-center"
              />
            </picture>
            {/* Unter lg läuft das Bild unten ins Dunkle aus, der Text steht darunter.
                Ab lg wie bisher: leichte Abdunklung plus Verlauf von links für den Hero-Text. */}
            <div className="absolute inset-0 bg-black/10 lg:bg-black/25 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent lg:bg-gradient-to-r lg:from-slate-900/80 lg:via-slate-900/40 lg:to-transparent z-10" />
          </div>

          <div className="container mx-auto relative z-20 w-full px-4 sm:px-6 md:px-8 -mt-12 sm:-mt-20 lg:mt-0">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col lg:block"
              >
                <p className="inline-flex mb-5 self-center rounded-full border border-white/25 bg-slate-950/25 px-4 py-2 text-sm sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.18em] text-white/90 backdrop-blur-md">
                  {t('hero.badge')}
                </p>
                <h1 className="order-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-4 sm:mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] lg:order-none">
                  <HighlightText text={t('hero.title')} />
                </h1>
                <p className="order-3 mt-6 text-base sm:text-lg md:text-xl text-slate-100 mb-6 sm:mb-8 leading-relaxed font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] max-w-3xl mx-auto lg:order-none lg:mt-0">
                  <HighlightText text={t('hero.subtitle')} />
                </p>
                <div className="order-2 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:order-none">
                  <Button
                    size="lg"
                    className="bg-[#25c990] hover:bg-[#1fb37e] text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-xl shadow-lg"
                    onClick={() => document.getElementById(GOOGLE_TERMIN_ANCHOR)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t('hero.cta')}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/55 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-slate-900 sm:text-lg"
                    onClick={() => document.getElementById('partner-video')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t('hero.secondaryCta')}
                    <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
                <p className="order-4 mt-4 flex items-center justify-center gap-2 text-sm text-white/80 lg:order-none">
                  <Shield className="h-4 w-4 text-[#75e6bf]" aria-hidden="true" />
                  {t('hero.roleNote')}
                </p>
                <p className="order-5 mt-3 text-sm text-white/75 lg:order-none">
                  {t('leitfadenHint.lead')}{' '}
                  <Link
                    to="/partner/leitfaden"
                    className="py-3.5 font-semibold text-[#75e6bf] underline underline-offset-4 sm:py-0"
                  >
                    {t('leitfadenHint.cta')}
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* QUALITÄTSSIEGEL: SDK + IKK, groß direkt unter dem Hero */}
        <div className="order-2 md:contents">
          <HealioAwardsRow label={t('quality.label')} size="large" />
        </div>

        {/* Partner-Erklärvideo V2.15 mit Nita (nur Deutsch, Untertitel im Bild).
            Ohne Video (EN oder Ladefehler) bleiben die drei Kernpunkte stehen. */}
        <div className="order-3 md:contents">
        <B2BExplainerVideo
          sectionId="partner-video"
          title={t('explanationVideo.title')}
          subtitle={t('explanationVideo.subtitle')}
          points={t('explanationVideo.points', { returnObjects: true })}
          showStatusPanel={false}
          videoSrc={isEnglish ? undefined : PARTNER_VIDEO_SRC}
          posterSrc={isEnglish ? undefined : PARTNER_VIDEO_POSTER}
          bookingCtaLabel={t('explanationVideo.bookingCta')}
          onBookingCta={() => document.getElementById(GOOGLE_TERMIN_ANCHOR)?.scrollIntoView({ behavior: 'smooth' })}
          videoHint={t('explanationVideo.hint')}
          videoNote={t('explanationVideo.aiNote')}
          ctaLabel={t('explanationVideo.cta')}
          onCta={() => requestNitaConsent('delayed_prompt')}
          trackingLabel="partner"
          privacyText={t('explanationVideo.privacy')}
          videoFallbackText={t('explanationVideo.fallback')}
          captionsLanguage={isEnglish ? 'en' : 'de'}
          captionsLabel={isEnglish ? 'English' : 'Deutsch'}
        />
        </div>

        {/* SECTION 2: PROBLEM AWARENESS */}
        <section className="order-4 md:order-none py-10 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/40 via-emerald-50/20 to-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-8">
                <HighlightText text={t('problem.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                <HighlightText text={t('problem.text')} />
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: BUDGET OVERVIEW */}
        <section className="order-5 md:order-none py-10 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                <HighlightText text={t('budget.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                <HighlightText text={t('budget.subtitle')} />
              </p>
            </motion.div>

            {/* Mobil wischen die drei Beträge als Karten nebeneinander,
                ab md bleibt das Raster mit der breiten Gesamtkarte oben. */}
            <MobileSwipeRow
              label={plain(t('budget.title'))}
              className="mx-auto max-w-4xl"
              desktopClassName="md:grid md:grid-cols-2 md:gap-6"
              itemClassName="md:first:col-span-2"
              mobileItemWidth="w-[80vw] max-w-[20rem]"
            >
              {/* Total Budget - Featured */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-br from-[#25c990] to-emerald-600 rounded-2xl p-6 sm:p-8 text-white text-center shadow-md md:shadow-xl"
              >
                <FriendlyIcon kind="budget" label={t('budget.total')} tone="butter" className="mx-auto mb-4" />
                <p className="text-sm uppercase tracking-widest opacity-80 mb-2">{t('budget.total')}</p>
                <p className="text-4xl sm:text-5xl font-extrabold mb-2">{t('budget.totalAmount')}</p>
                <p className="text-base opacity-90">{t('budget.totalDesc')}</p>
              </motion.div>

              {/* Naturheilkunde */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="h-full bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100 md:hover:shadow-xl hover:border-[#25c990]/30 transition-all duration-300"
              >
                <FriendlyIcon kind="naturopathy" label={t('budget.naturheilkunde')} tone="mint" className="mb-4" />
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">{t('budget.naturheilkunde')}</p>
                <p className="text-3xl font-extrabold text-slate-800 mb-2">{t('budget.naturheilkundeAmount')}</p>
                <p className="text-base sm:text-sm text-slate-600">{t('budget.naturheilkundeDesc')}</p>
              </motion.div>

              {/* Sehhilfen */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="h-full bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100 md:hover:shadow-xl hover:border-[#25c990]/30 transition-all duration-300"
              >
                <FriendlyIcon kind="glasses" label={t('budget.sehhilfen')} tone="sky" className="mb-4" />
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">{t('budget.sehhilfen')}</p>
                <p className="text-3xl font-extrabold text-slate-800 mb-2">{t('budget.sehhilfenAmount')}</p>
                <p className="text-base sm:text-sm text-slate-600">{t('budget.sehhilfenDesc')}</p>
              </motion.div>
            </MobileSwipeRow>
            <p className="mx-auto mt-4 sm:mt-7 max-w-4xl text-center text-sm leading-relaxed text-slate-500 sm:leading-5">
              {t('budget.footnote')}
            </p>
          </div>
        </section>

        {/* SECTION 4: FÜR WEN? (Partner Types) */}
        <section className="order-6 md:order-none py-10 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/40 via-emerald-50/20 to-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                <HighlightText text={t('partners.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                <HighlightText text={t('partners.subtitle')} />
              </p>
            </motion.div>

            {/* Mobil eine Wischreihe mit allen sechs Berufsgruppen, ab md das bisherige Raster. */}
            <MobileSwipeRow
              label={plain(t('partners.title'))}
              className="mx-auto max-w-6xl"
              desktopClassName="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8"
              mobileItemWidth="w-[80vw] max-w-[20rem]"
            >
              {partnerTypes.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="h-full bg-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-100 md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300"
                  >
                    <FriendlyIcon kind={item.kind} label={item.title} tone={item.tone} className="mb-4 sm:mb-5" />
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed sm:leading-6">{item.text}</p>
                  </motion.div>
                );
              })}
            </MobileSwipeRow>
          </div>
        </section>

        {/* SECTION 5: SO EINFACH FUNKTIONIERT ES (Benefits + Steps) */}
        <section className="order-7 md:order-none py-10 sm:py-20 lg:py-24 pb-12 sm:pb-20 lg:pb-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
                <HighlightText text={t('solution.title')} />
              </h2>
            </motion.div>

            {/* Mobil wischen die drei Schritte und danach die drei Vorteile als Karten, ab md das bisherige Raster.
                Die Nummernmarke ragt über die Karte, deshalb hat die Reihe oben vier Einheiten Luft. */}
            <MobileSwipeRow
              as="ol"
              label={plain(t('solution.title'))}
              className="mx-auto max-w-5xl"
              desktopClassName="md:grid md:grid-cols-3 md:gap-8 lg:gap-12"
              itemClassName="pt-4 md:pt-0"
              mobileItemWidth="w-[80vw] max-w-[20rem]"
            >
              {[
                {
                  emoji: '🤝',
                  tone: 'mint',
                  title: t('steps.step1Title'),
                  text: t('steps.step1Desc'),
                  step: '1'
                },
                {
                  emoji: '📦',
                  tone: 'butter',
                  title: t('steps.step2Title'),
                  text: t('steps.step2Desc'),
                  step: '2'
                },
                {
                  emoji: '📈',
                  tone: 'sky',
                  title: t('steps.step3Title'),
                  text: t('steps.step3Desc'),
                  step: '3'
                }
              ].map((item, index) => {
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full bg-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-100 md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative"
                >
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-[#25c990] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {item.step}
                  </div>
                  <FriendlyIcon emoji={item.emoji} label={item.title} tone={item.tone} className="mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-4">{item.title}</h3>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">{item.text}</p>
                </motion.div>
              )})}
            </MobileSwipeRow>

            {/* Benefits below steps */}
            <MobileSwipeRow
              as="ul"
              label={plain(t('solution.title'))}
              className="mx-auto mt-4 max-w-5xl md:mt-12"
              desktopClassName="md:grid md:grid-cols-3 md:gap-8"
              mobileItemWidth="w-[80vw] max-w-[20rem]"
            >
              {[
                { emoji: '😊', tone: 'butter', title: t('solution.manageableEffort'), text: t('solution.manageableEffortDesc') },
                { emoji: '🌱', tone: 'mint', title: t('solution.financialRoom'), text: t('solution.financialRoomDesc') },
                { emoji: '🛡️', tone: 'lavender', title: t('solution.freeParticipation'), text: t('solution.freeParticipationDesc') },
              ].map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex h-full flex-col items-center rounded-xl border border-slate-100 bg-slate-50 p-6 text-center md:border-0 md:bg-transparent"
                  >
                    <FriendlyIcon emoji={item.emoji} label={item.title} tone={item.tone} size="sm" className="mb-3 sm:mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-2"><HighlightText text={item.title} /></h3>
                    <p className="text-base sm:text-sm text-slate-600 leading-relaxed sm:leading-relaxed">{item.text}</p>
                  </motion.div>
                );
              })}
            </MobileSwipeRow>
          </div>
        </section>

        {/* KLARE ROLLEN STATT UNBELEGTER TESTIMONIALS */}
        <div className="order-8 md:contents">
          <PartnerRoleProcess />
        </div>

        {/* FAQ: mobil nach dem Appell und direkt vor dem Termin */}
        <div className="order-10 md:contents">
          <PartnerFAQ />
        </div>



        {/* SECTION: BOOKING */}
        {/* MORAL */}
        <section className="order-9 md:order-none py-10 sm:py-20 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 sm:mb-8">
                {t('moral.title')}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-base sm:text-lg text-white/85 leading-relaxed sm:leading-relaxed mb-4 sm:mb-6">
                {t('moral.text1')}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-base sm:text-lg text-white/85 leading-relaxed sm:leading-relaxed mb-4 sm:mb-6">
                {t('moral.text2')}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-base sm:text-lg font-semibold text-emerald-300 leading-relaxed sm:leading-relaxed">
                {t('moral.text3')}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="order-11 md:order-none py-10 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-emerald-50/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-5 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 sm:mb-6">
                <HighlightText text={t('cta.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                <HighlightText text={t('cta.subtitle')} />
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-2 sm:p-4 md:p-6 rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col items-center w-full"
              >
                <div id={GOOGLE_TERMIN_ANCHOR} className="w-full scroll-mt-28">
                  <AppointmentBooking
                    placement="partner_page"
                    title={t('cta.title')}
                    className="h-[700px]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TEASER: Heilberufe-Vorsorge für HPs und Osteopathen als Direktkunden */}
        <section className="relative order-12 md:order-none py-10 sm:py-16 bg-gradient-to-br from-[#25c990] via-[#1fb37f] to-[#0b4d4a] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 sm:gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white/95 text-sm sm:text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                  <Shield className="w-3.5 h-3.5" />
                  {t('professionalCover.badge')}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {t('professionalCover.title')}
                </h2>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-2">
                  {t('professionalCover.text')}
                </p>
                <p className="text-sm text-white/75">
                  {t('professionalCover.note')}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  className="bg-white text-[#0b4d4a] hover:bg-white/90 text-base font-semibold px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to={getPath('heilberufeVorsorge')}>
                    {t('professionalCover.cta')}
                  </Link>
                </Button>
                <p className="text-sm sm:text-xs text-white/70 text-center">
                  {t('professionalCover.meta')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER BANNER */}
        <section className="order-last md:order-none py-10 sm:py-20 bg-gradient-to-br from-[#25c990] to-emerald-600">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                <HighlightText text={t('footer.title')} className="text-white underline decoration-white/70 decoration-4 underline-offset-4" />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
                {t('footer.subtitle')}
              </p>
              <Button
                size="lg"
                className="bg-white text-[#25c990] hover:bg-slate-100 font-semibold text-base sm:text-lg px-8 py-4 rounded-xl shadow-lg"
                onClick={() => document.getElementById(GOOGLE_TERMIN_ANCHOR)?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('footer.cta')}
              </Button>
            </motion.div>
          </div>
        </section>

      </main>
      <AmbulantMiaPrompt variant="partner" />
    </>
  );
};

export default PartnerPage;
