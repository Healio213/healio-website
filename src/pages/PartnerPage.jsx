
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';
import PartnerRoleProcess from '@/components/sections/partner/PartnerRoleProcess';
import PartnerFAQ from '@/components/sections/partner/PartnerFAQ';
import AmbulantMiaPrompt from '@/components/sections/ambulant/AmbulantMiaPrompt';
import AudienceProofBar from '@/components/sections/AudienceProofBar';
import B2BExplainerVideo from '@/components/sections/B2BExplainerVideo';
import ProductTicker from '@/components/sections/ProductTicker';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import CalendlyEmbed from '@/components/CalendlyEmbed';
import { requestNitaConsent } from '@/components/NitaConsentWidget';

const PartnerPage = () => {
  const { t, i18n } = useTranslation('partner');
  const { t: tSeo } = useTranslation('seo');
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

  const proofIcons = [
    { kind: 'budget', tone: 'mint' },
    { kind: 'protection', tone: 'sky' },
    { kind: 'calendar', tone: 'butter' },
  ];
  const proofItems = t('proof.items', { returnObjects: true }).map((item, index) => ({
    ...item,
    ...(proofIcons[index] || proofIcons[0]),
  }));

  return (
    <>
      <SEOHead
        title={tSeo('partner.title')}
        description={tSeo('partner.description')}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />

      <main className="bg-white overflow-hidden w-full">

        {/* SECTION 1: HERO */}
        <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-20 lg:pb-0">
          <div className="absolute inset-0 z-0">
            {/* Mobile Image */}
            <img
              src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/4f016c2da039efb25e0e023c7adf970d.png"
              alt={t('hero.imageAltMobile')}
              className="w-full h-full object-cover object-center md:hidden"
            />
            {/* Desktop Image */}
            <img
              src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/66ea53b24c418ef3f92004d9368a889c.png"
              alt={t('hero.imageAltDesktop')}
              className="w-full h-full object-cover object-center hidden md:block"
            />
            {/* Lighter Overlay for desktop, stronger for mobile to ensure text readability */}
            <div className="absolute inset-0 bg-black/50 md:bg-black/25 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent md:bg-gradient-to-r md:from-slate-900/80 md:via-slate-900/40 md:to-transparent z-10" />
          </div>

          <div className="container mx-auto relative z-20 w-full px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="inline-flex mb-5 rounded-full border border-white/25 bg-slate-950/25 px-4 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                  {t('hero.badge')}
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-4 sm:mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  <HighlightText text={t('hero.title')} />
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-100 mb-8 leading-relaxed font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] max-w-3xl mx-auto">
                  <HighlightText text={t('hero.subtitle')} />
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-[#25c990] hover:bg-[#1fb37e] text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-xl shadow-lg"
                    onClick={() => document.getElementById('calendly-embed')?.scrollIntoView({ behavior: 'smooth' })}
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
                <p className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-white/80">
                  <Shield className="h-4 w-4 text-[#75e6bf]" aria-hidden="true" />
                  {t('hero.roleNote')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <AudienceProofBar items={proofItems} ariaLabel={t('proof.ariaLabel')} />
        <ProductTicker variant="partner" />

        <B2BExplainerVideo
          sectionId="partner-video"
          title={t('explanationVideo.title')}
          subtitle={t('explanationVideo.subtitle')}
          statusLabel={t('explanationVideo.status')}
          message={t('explanationVideo.message')}
          points={t('explanationVideo.points', { returnObjects: true })}
          ctaLabel={t('explanationVideo.cta')}
          onCta={() => requestNitaConsent('delayed_prompt')}
          trackingLabel="partner"
          privacyText={t('explanationVideo.privacy')}
          videoFallbackText={t('explanationVideo.fallback')}
          avatarAlt={t('explanationVideo.avatarAlt')}
          assistantName={t('explanationVideo.assistantName')}
          errorLabel={t('explanationVideo.error')}
          captionsLanguage={isEnglish ? 'en' : 'de'}
          captionsLabel={isEnglish ? 'English' : 'Deutsch'}
        />

        {/* QUALITÄTSSIEGEL: SDK + IKK */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs text-slate-400 mb-5 font-medium uppercase tracking-wider">{t('quality.label')}</p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-w-6xl mx-auto">
              <img src="/siegel/sdk/stiftung-warentest.png" alt="Stiftung Warentest SEHR GUT (0,9)" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/sdk/fairnesspreis.png" alt="Deutscher Fairnesspreis 2025" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/sdk/morgen-morgen.png" alt="Morgen und Morgen Ausgezeichnet" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/ikk/schwangere-test.webp" alt="Krankenkassentest für Schwangere und junge Eltern Note 1,7 Gut" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/ikk/familien-test.webp" alt="Krankenkassentest für Familien Note 1,6 Gut" className="h-16 md:h-20 w-auto" loading="lazy" />
            </div>
          </div>
        </section>

        {/* TEASER: Heilberufe-Vorsorge für HPs und Osteopathen als Direktkunden */}
        <section className="relative py-16 bg-gradient-to-br from-[#25c990] via-[#1fb37f] to-[#0b4d4a] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white/95 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
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
                  <a href="/heilberufe-vorsorge">
                    {t('professionalCover.cta')}
                  </a>
                </Button>
                <p className="text-xs text-white/70 text-center">
                  {t('professionalCover.meta')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROBLEM AWARENESS */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/40 via-emerald-50/20 to-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 sm:mb-8">
                <HighlightText text={t('problem.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                <HighlightText text={t('problem.text')} />
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: BUDGET OVERVIEW */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                <HighlightText text={t('budget.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                <HighlightText text={t('budget.subtitle')} />
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Total Budget - Featured */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 bg-gradient-to-br from-[#25c990] to-emerald-600 rounded-2xl p-8 text-white text-center shadow-xl"
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
                className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:shadow-xl hover:border-[#25c990]/30 transition-all duration-300"
              >
                <FriendlyIcon kind="naturopathy" label={t('budget.naturheilkunde')} tone="mint" className="mb-4" />
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">{t('budget.naturheilkunde')}</p>
                <p className="text-3xl font-extrabold text-slate-800 mb-2">{t('budget.naturheilkundeAmount')}</p>
                <p className="text-sm text-slate-600">{t('budget.naturheilkundeDesc')}</p>
              </motion.div>

              {/* Sehhilfen */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:shadow-xl hover:border-[#25c990]/30 transition-all duration-300"
              >
                <FriendlyIcon kind="glasses" label={t('budget.sehhilfen')} tone="sky" className="mb-4" />
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">{t('budget.sehhilfen')}</p>
                <p className="text-3xl font-extrabold text-slate-800 mb-2">{t('budget.sehhilfenAmount')}</p>
                <p className="text-sm text-slate-600">{t('budget.sehhilfenDesc')}</p>
              </motion.div>
            </div>
            <p className="mx-auto mt-7 max-w-4xl text-center text-xs leading-relaxed text-slate-500 sm:text-sm">
              {t('budget.footnote')}
            </p>
          </div>
        </section>

        {/* SECTION 4: FÜR WEN? (Partner Types) */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/40 via-emerald-50/20 to-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                <HighlightText text={t('partners.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                <HighlightText text={t('partners.subtitle')} />
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {partnerTypes.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="bg-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <FriendlyIcon kind={item.kind} label={item.title} tone={item.tone} className="mb-5" />
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: SO EINFACH FUNKTIONIERT ES (Benefits + Steps) */}
        <section className="py-16 sm:py-20 lg:py-24 pb-24 lg:pb-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
                <HighlightText text={t('solution.title')} />
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
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
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative"
                >
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-[#25c990] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {item.step}
                  </div>
                  <FriendlyIcon emoji={item.emoji} label={item.title} tone={item.tone} className="mb-6" />
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">{item.text}</p>
                </motion.div>
              )})}
            </div>

            {/* Benefits below steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mt-12">
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
                    className="flex flex-col items-center text-center p-6"
                  >
                    <FriendlyIcon emoji={item.emoji} label={item.title} tone={item.tone} size="sm" className="mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-2"><HighlightText text={item.title} /></h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* KLARE ROLLEN STATT UNBELEGTER TESTIMONIALS */}
        <PartnerRoleProcess />

        {/* FAQ */}
        <PartnerFAQ />

        {/* SECTION: BOOKING */}
        {/* MORAL */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
                {t('moral.title')}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/85 leading-relaxed mb-6">
                {t('moral.text1')}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-white/85 leading-relaxed mb-6">
                {t('moral.text2')}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-lg font-semibold text-emerald-300 leading-relaxed">
                {t('moral.text3')}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-emerald-50/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
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
                <div id="calendly-embed" className="w-full">
                  <CalendlyEmbed
                    url="https://calendly.com/healio-info/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=25c990"
                    placement="partner_page"
                    title={t('cta.title')}
                    className="h-[700px]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOOTER BANNER */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[#25c990] to-emerald-600">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                <HighlightText text={t('footer.title')} className="text-white underline decoration-white/70 decoration-4 underline-offset-4" />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8">
                {t('footer.subtitle')}
              </p>
              <Button
                size="lg"
                className="bg-white text-[#25c990] hover:bg-slate-100 font-semibold text-base sm:text-lg px-8 py-4 rounded-xl shadow-lg"
                onClick={() => document.getElementById('calendly-embed')?.scrollIntoView({ behavior: 'smooth' })}
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
