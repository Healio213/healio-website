import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowDown, ArrowRight, ChevronDown, Info, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import AmbulantMiaPrompt from '@/components/sections/ambulant/AmbulantMiaPrompt';
import ProductTicker from '@/components/sections/ProductTicker';
import AudienceProofBar from '@/components/sections/AudienceProofBar';
import B2BExplainerVideo from '@/components/sections/B2BExplainerVideo';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';
import { useLanguage } from '@/hooks/useLanguage';
import AppointmentBooking from '@/components/CalendlyEmbed';
import IkkKassenSiegel from '@/components/sections/shared/IkkKassenSiegel';
import SiegelTicker from '@/components/sections/shared/SiegelTicker';
import { requestNitaConsent } from '@/components/NitaConsentWidget';

// Zwei Tarifarten für Familien, Texte unter tarife.* in den Sprachdateien.
const TARIFF_CARDS = [
  { key: 'ambulant', kind: 'pregnancy', tone: 'coral' },
  { key: 'stationaer', kind: 'hospital', tone: 'sky' },
];

const HebammenPage = () => {
  const { t } = useTranslation('hebammen');
  const { t: tSeo } = useTranslation('seo');
  const { t: tCommon } = useTranslation('common');
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/midwives' : 'https://healio.de/hebammen';

  const scrollToCalendly = () => {
    document.getElementById('calendly-hebammen')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const scrollToVideo = () => {
    document.getElementById('hebammen-video')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const proofIcons = [
    { kind: 'support', tone: 'mint' },
    { kind: 'protection', tone: 'sky' },
    { kind: 'calendar', tone: 'butter' },
  ];
  const proofItems = t('proof.items', { returnObjects: true }).map((item, index) => ({
    ...item,
    ...(proofIcons[index] || proofIcons[0]),
  }));

  // Handy-Band unter dem Hero: dieselben drei Siegel wie die Zeile ab md, jedes
  // mit kurzer Beschriftung des Versicherers bzw. der Krankenkasse.
  const sealCaptions = lang === 'en'
    ? { sdk: 'SDK Fairness Award 2025', ikk: 'IKK classic, health fund' }
    : { sdk: 'SDK Fairness-Preis 2025', ikk: 'IKK classic, Krankenkasse' };
  const sealItems = [
    { id: 'sdk', src: '/siegel/sdk/fairnesspreis.png', alt: tCommon('awards.items.fairness'), caption: sealCaptions.sdk, width: 240, height: 240 },
    { id: 'ikk-parents', src: '/siegel/ikk/krankenkasseninfo-schwangere-2026-09.webp', alt: tCommon('awards.items.ikkParents'), caption: sealCaptions.ikk, width: 500, height: 403 },
    { id: 'ikk-family', src: '/siegel/ikk/krankenkasseninfo-familien-2026-09.webp', alt: tCommon('awards.items.ikkFamily'), caption: sealCaptions.ikk, width: 500, height: 403 },
  ];

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

      {/* Mobil (unter md) ordnet "order-N" die Abschnitte in der Reihenfolge, in der
          Besucher denken: Einstieg, Siegel, Erklärvideo, Rollen, dann der Rest wie am
          Desktop. Ab md gilt "md:block" und die bisherige Reihenfolge im Code. */}
      <main className="flex flex-col bg-white overflow-hidden w-full md:block">

        {/* HERO */}
        <section className="relative order-1 flex items-center pt-28 pb-14 md:order-none md:min-h-[100svh] md:pb-16 lg:pt-20 lg:pb-0">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-hebammen.webp"
              alt="Hebamme im Gespräch mit schwangerer Patientin"
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-black/50 md:bg-black/25 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent md:bg-gradient-to-r md:from-slate-900/80 md:via-slate-900/40 md:to-transparent z-10" />
          </div>

          <div className="container mx-auto relative z-20 w-full px-4 sm:px-6 md:px-8">
            <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block bg-rose-100 text-rose-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                {t('hero.badge')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                <HighlightText text={t('hero.title')} className="bg-[linear-gradient(135deg,#8ee7ca_0%,#25c990_48%,#1aa875_100%)] bg-clip-text text-transparent" />
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col items-start gap-3 sm:flex-row">
                <Button
                  onClick={scrollToCalendly}
                  className="h-auto min-h-14 bg-[#25c990] hover:bg-[#1fb37f] text-white text-lg px-5 py-3 md:h-10 md:min-h-0 md:px-8 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {t('hero.cta')}
                </Button>
                <Button
                  onClick={scrollToVideo}
                  variant="outline"
                  className="h-auto min-h-14 border-white/55 bg-white/10 px-5 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-slate-900 md:h-10 md:min-h-0 md:px-8 md:py-6"
                >
                  {t('hero.secondaryCta')}
                  <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-white/80">
                <Shield className="h-4 w-4 text-[#75e6bf]" aria-hidden="true" />
                {t('hero.note')}
              </p>
            </motion.div>
          </div>
        </section>

        <AudienceProofBar items={proofItems} ariaLabel={t('proof.ariaLabel')} className="order-5 md:order-none" />
        <div className="order-4 md:order-none md:contents">
          <ProductTicker variant="hebammen" />
        </div>

        <div className="order-3 md:order-none md:contents">
        <B2BExplainerVideo
          sectionId="hebammen-video"
          title={t('explanationVideo.title')}
          subtitle={t('explanationVideo.subtitle')}
          points={t('explanationVideo.points', { returnObjects: true })}
          showStatusPanel={false}
          ctaLabel={t('explanationVideo.cta')}
          onCta={() => requestNitaConsent('delayed_prompt')}
          trackingLabel="midwives"
          privacyText={t('explanationVideo.privacy')}
          videoFallbackText={t('explanationVideo.fallback')}
          captionsLanguage={lang === 'en' ? 'en' : 'de'}
          captionsLabel={lang === 'en' ? 'English' : 'Deutsch'}
        />
        </div>

        {/* Qualitätssiegel: SDK + IKK classic. Stand 03.10.2026: Die Siegel der
            SDK-Vollversicherung (Warentest 0,9, Morgen & Morgen) sind entfernt,
            die IKK-Siegel durch die Fassung 09/2026 ersetzt (IKK-Mail 01.10.2026).
            Beide Partner stehen als eigene Gruppe, damit klar bleibt, dass die
            IKK-Siegel die Krankenkasse bewerten und nicht die Zusatzversicherung. */}
        <motion.section className="order-2 md:order-none py-5 md:py-12 bg-white border-b border-gray-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="container mx-auto px-4">
            <p className="text-center text-sm md:text-xs text-slate-400 mb-3 md:mb-6 font-medium uppercase tracking-wider">{lang === 'en' ? 'Our partners: SDK Süddeutsche Krankenversicherung & IKK classic' : 'Unsere Partner: SDK Süddeutsche Krankenversicherung & IKK classic'}</p>
            {/* Mobil ein ruhiges Laufband mit den drei Siegeln (je mit Beschriftung),
                der Pflichthinweis zur Krankenkasse steht darunter. */}
            <SiegelTicker
              className="md:hidden"
              items={sealItems}
              ariaLabel={tCommon('awards.label')}
              notes={[tCommon('awards.groups.ikkNote')]}
            />
            <div className="mx-auto hidden max-w-6xl md:flex md:flex-row md:flex-wrap md:items-start md:justify-center md:gap-8 md:gap-x-14">
              <div className="flex flex-col items-center">
                <p className="text-center text-sm font-semibold text-slate-600">{tCommon('awards.groups.sdk')}</p>
                <img src="/siegel/sdk/fairnesspreis.png" alt={tCommon('awards.items.fairness')} width="240" height="240" className="mt-3 h-20 sm:h-24 md:h-28 w-auto" loading="lazy" decoding="async" />
              </div>
              <IkkKassenSiegel order="parents" size="large" />
            </div>
          </div>
        </motion.section>

        {/* PROBLEM & LÖSUNG */}
        <section className="order-6 md:order-none py-10 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
                {/* Problem */}
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-5">
                    {t('problem.title')}
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    {t('problem.text')}
                  </p>
                </motion.div>

                {/* Lösung */}
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 sm:p-8 h-full">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                      {t('solution.title')}
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold text-[#25c990] mb-3">{t('solution.amount')}</p>
                    <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mb-3 sm:mb-4">{t('solution.amountLabel')}</p>
                    <p className="text-slate-600 leading-relaxed">
                      {t('solution.text')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* MORAL */}
        <section className="order-7 md:order-none py-10 sm:py-20 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
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

        {/* LEISTUNGEN FÜR SCHWANGERE */}
        <section className="order-8 md:order-none py-10 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6 sm:mb-12">
                <FriendlyIcon kind="pregnancy" tone="coral" className="mx-auto mb-3 sm:mb-6 !h-12 !w-12 sm:!h-16 sm:!w-16" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  {t('leistungen.title')}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {t('leistungen.subtitle')}
                </p>
              </motion.div>

              {/* Highlight Bullets: mobil als Wischreihe, ab md das bisherige Raster */}
              <MobileSwipeRow
                label={t('leistungen.title')}
                className="mb-3 sm:mb-12"
                desktopClassName="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5"
                mobileItemWidth="w-[84vw] max-w-[22rem]"
              >
                {t('leistungen.highlights', { returnObjects: true }).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="h-full bg-rose-50 border border-rose-200 rounded-xl p-5"
                  >
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-base text-slate-600 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </MobileSwipeRow>

              <details className="group mb-5 sm:mb-8 rounded-2xl border border-slate-200 bg-slate-50/70">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-bold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-inset [&::-webkit-details-marker]:hidden">
                  <span>{t('leistungen.detailsLabel')}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-emerald-700 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="grid grid-cols-1 gap-8 border-t border-slate-200 p-5 md:grid-cols-2 sm:p-7">
                {/* IKK classic */}
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 sm:p-8"
                >
                  <h3 className="text-xl font-bold text-blue-900 mb-6">{t('leistungen.ikkTitle')}</h3>
                  <div className="space-y-4">
                    {t('leistungen.ikkItems', { returnObjects: true }).map((item, i) => (
                      <div key={i} className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1 md:flex-nowrap">
                        <div className="flex items-start gap-3 flex-1">
                          <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900 text-base">{item.name}</p>
                            <p className="text-sm text-slate-500">{item.detail}</p>
                          </div>
                        </div>
                        <span className="pl-8 text-base font-bold text-blue-700 whitespace-nowrap md:pl-0">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* SDK Zusatzversicherung */}
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 sm:p-8"
                >
                  <h3 className="text-xl font-bold text-emerald-900 mb-6">{t('leistungen.sdkTitle')}</h3>
                  <div className="space-y-4">
                    {t('leistungen.sdkItems', { returnObjects: true }).map((item, i) => (
                      <div key={i} className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1 md:flex-nowrap">
                        <div className="flex items-start gap-3 flex-1">
                          <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900 text-base">{item.name}</p>
                            <p className="text-sm text-slate-500">{item.detail}</p>
                          </div>
                        </div>
                        <span className="pl-8 text-base font-bold text-emerald-700 whitespace-nowrap md:pl-0">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                </div>
              </details>

              {/* Total */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="bg-gradient-to-r from-rose-50 to-amber-50 border-2 border-rose-200 rounded-2xl p-5 sm:p-8 text-center"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-600 mb-2">{t('leistungen.totalLabel')}</p>
                <p className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">{t('leistungen.totalAmount')}</p>
                <p className="text-slate-600 leading-relaxed max-w-lg mx-auto">{t('leistungen.totalNote')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* KRANKENHAUS / STATIONÄR */}
        <section className="order-9 md:order-none py-10 sm:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6 sm:mb-12">
                <FriendlyIcon kind="hospital" tone="sky" className="mx-auto mb-3 sm:mb-6 !h-12 !w-12 sm:!h-16 sm:!w-16" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  {t('klinik.title')}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {t('klinik.subtitle')}
                </p>
              </motion.div>

              {/* Kernbotschaft, hervorgehoben */}
              <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-5 sm:p-10 mb-5 sm:mb-8 text-white shadow-lg"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 leading-snug">{t('klinik.kernTitle')}</h3>
                {t('klinik.kernText').split('\n\n').map((abs, i) => (
                  <p key={i} className="text-base sm:text-lg text-emerald-50 leading-relaxed sm:leading-relaxed mb-3 sm:mb-4 last:mb-0">{abs}</p>
                ))}
              </motion.div>

              <details className="group rounded-2xl border border-slate-200 bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-bold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-inset [&::-webkit-details-marker]:hidden">
                  <span>{t('klinik.detailsLabel')}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-emerald-700 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="border-t border-slate-200 p-5 sm:p-7">
              <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-12">
                {[
                  { key: 'chance', bg: 'bg-rose-50', border: 'border-rose-500' },
                  { key: 'chanceOben', bg: 'bg-sky-50', border: 'border-sky-500' },
                  { key: 'deadline', bg: 'bg-amber-50', border: 'border-amber-500' },
                  { key: 'ehrlich', bg: 'bg-slate-100', border: 'border-slate-400' },
                  { key: 'rooming', bg: 'bg-emerald-50', border: 'border-emerald-500' },
                ].map((block, i) => (
                  <motion.div
                    key={block.key}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className={`${block.bg} border-l-4 ${block.border} rounded-r-xl p-5 sm:p-7`}
                  >
                    <h4 className="font-bold text-slate-900 mb-3 text-lg sm:text-xl">{t(`klinik.${block.key}Title`)}</h4>
                    {t(`klinik.${block.key}Text`).split('\n\n').map((abs, j) => (
                      <p key={j} className="text-base sm:text-lg text-slate-700 leading-relaxed sm:leading-relaxed mb-3 sm:mb-4 last:mb-0">{abs}</p>
                    ))}
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{t('klinik.compareTitle')}</h3>
                <p className="text-slate-600 max-w-2xl mx-auto">{t('klinik.compareSubtitle')}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-5 sm:mb-8">
                {/* Die Bayerische */}
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="bg-white border-2 border-sky-200 rounded-2xl p-5 sm:p-8 flex flex-col"
                >
                  <h3 className="text-xl font-bold text-sky-900">{t('klinik.bayerischeName')}</h3>
                  <p className="text-base font-semibold text-sky-600 mb-6">{t('klinik.bayerischeTag')}</p>
                  <div className="space-y-3 flex-1">
                    {t('klinik.bayerischeItems', { returnObjects: true }).map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                        <p className="text-base text-slate-700 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mt-6 pt-6 border-t border-slate-200">{t('klinik.bayerischeCaveat')}</p>
                </motion.div>

                {/* SDK */}
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="bg-white border-2 border-emerald-200 rounded-2xl p-5 sm:p-8 flex flex-col"
                >
                  <h3 className="text-xl font-bold text-emerald-900">{t('klinik.sdkName')}</h3>
                  <p className="text-base font-semibold text-emerald-600 mb-6">{t('klinik.sdkTag')}</p>
                  <div className="space-y-3 flex-1">
                    {t('klinik.sdkItems', { returnObjects: true }).map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-base text-slate-700 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mt-6 pt-6 border-t border-slate-200">{t('klinik.sdkCaveat')}</p>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-blue-50 border border-blue-200 rounded-2xl p-5 sm:p-8"
              >
                <p className="text-slate-700 leading-relaxed mb-4">{t('klinik.bonusNote')}</p>
                <p className="text-slate-700 leading-relaxed mb-6">{t('klinik.closingNote')}</p>
                <Link to="/stationaer" className="inline-flex items-center gap-2 text-base font-semibold text-blue-700 hover:text-blue-900 transition-colors">
                  {t('klinik.ctaLink')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
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
          className="order-10 md:order-none scroll-mt-24 bg-white py-10 sm:py-20"
          aria-labelledby="hebammen-tarife-heading"
          data-healio-midwife="tarife"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="mx-auto max-w-5xl">
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
                <p className="font-display text-sm sm:text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                  {t('tarife.eyebrow')}
                </p>
                <h2 id="hebammen-tarife-heading" className="mt-3 sm:mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-home-midnight [text-wrap:balance] sm:text-4xl">
                  {t('tarife.title')}
                </h2>
                <p className="mt-3 sm:mt-4 text-lg leading-relaxed text-slate-600 [text-wrap:pretty]">
                  {t('tarife.lead')}
                </p>
              </motion.div>

              {/* Mobil wischen die zwei Tarifarten und der Hinweis "beides möglich" als
                  Karten nebeneinander; ab md liegen die zwei Karten im Raster und der
                  Hinweis darunter über die ganze Breite, wie bisher. */}
              <MobileSwipeRow
                label={t('tarife.title')}
                className="mt-6 sm:mt-10"
                desktopClassName="md:grid md:grid-cols-2 md:gap-8 md:[&>li:nth-child(3)]:col-span-2"
                mobileItemWidth="w-[86vw] max-w-[24rem]"
              >
                {TARIFF_CARDS.map((card, i) => (
                  <motion.article
                    key={card.key}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex h-full flex-col rounded-[2rem] border border-slate-100 bg-white p-5 shadow-[0_24px_60px_rgba(7,17,31,0.10)] sm:p-8"
                    data-healio-midwife-card={card.key}
                  >
                    <FriendlyIcon kind={card.kind} tone={card.tone} size="md" className="!h-12 !w-12 sm:!h-16 sm:!w-16" />
                    <p className="mt-4 sm:mt-6 font-display text-sm sm:text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                      {t(`tarife.${card.key}.label`)}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-home-midnight [text-wrap:balance]">
                      {t(`tarife.${card.key}.title`)}
                    </h3>
                    <p className="mt-3 sm:mt-4 text-base leading-relaxed text-slate-700 sm:text-[1.0625rem]">
                      {t(`tarife.${card.key}.text`)}
                    </p>
                    <div className="mt-auto pt-4 sm:pt-6">
                      <p className="flex gap-2.5 border-t border-slate-100 pt-4 sm:pt-5 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                        <span>{t(`tarife.${card.key}.condition`)}</span>
                      </p>
                    </div>
                  </motion.article>
                ))}

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-emerald-100 bg-[#F4FAF7] p-5 sm:flex-row sm:items-center sm:justify-start sm:p-6"
                >
                  <FriendlyIcon kind="family" tone="mint" size="sm" />
                  <p className="text-base leading-relaxed text-slate-700 sm:text-[1.0625rem]">
                    {t('tarife.both')}
                  </p>
                </motion.div>
              </MobileSwipeRow>

              <motion.article
                initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="mt-4 grid gap-4 rounded-[2rem] border border-emerald-200 bg-[#F4FAF7] p-5 shadow-[0_24px_60px_rgba(7,17,31,0.10)] sm:mt-10 sm:gap-6 sm:p-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8 lg:p-10"
                aria-labelledby="hebammen-bayerische-heading"
                data-healio-midwife-card="bayerische"
              >
                <FriendlyIcon kind="calendar" tone="sky" size="lg" className="!h-14 !w-14 sm:!h-20 sm:!w-20" />
                <div className="min-w-0">
                  <p className="font-display text-sm sm:text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                    {t('tarife.bayerische.label')}
                  </p>
                  <h3 id="hebammen-bayerische-heading" className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-home-midnight [text-wrap:balance] sm:text-3xl">
                    {t('tarife.bayerische.title')}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-[1.0625rem]">
                    {t('tarife.bayerische.text')}
                  </p>
                  <p className="mt-4 sm:mt-5 flex max-w-3xl gap-2.5 rounded-2xl border border-emerald-100 bg-white p-4 text-sm leading-relaxed text-slate-700 sm:text-[0.9375rem]">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                    <span>{t('tarife.bayerische.condition')}</span>
                  </p>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* RECHTLICHE SICHERHEIT */}
        <section className="order-11 md:order-none py-10 sm:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6 sm:mb-10">
                <FriendlyIcon kind="protection" tone="mint" className="mx-auto mb-3 sm:mb-6 !h-12 !w-12 sm:!h-16 sm:!w-16" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                  {t('legal.title')}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t('legal.subtitle')}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-5 sm:p-8 border border-gray-100 mb-4 sm:mb-6"
              >
                <p className="text-slate-700 leading-relaxed text-base sm:text-lg sm:leading-relaxed">
                  {t('legal.text')}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 sm:p-6 text-center"
              >
                <p className="text-slate-700 leading-relaxed font-medium">
                  {t('legal.summary')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABLAUF — 3 SCHRITTE */}
        <section className="order-12 md:order-none py-10 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-center mb-6 sm:mb-12"
              >
                {t('steps.title')}
              </motion.h2>

              {/* Mobil wischen die drei Schritte als Karten; ab md untereinander wie bisher. */}
              <MobileSwipeRow
                as="ol"
                label={t('steps.title')}
                desktopClassName="md:block md:space-y-8"
                mobileItemWidth="w-[84vw] max-w-[22rem]"
              >
                {[
                  { emoji: '💬', tone: 'lavender', num: '1', titleKey: 'steps.step1Title', descKey: 'steps.step1Desc' },
                  { emoji: '📄', tone: 'sky', num: '2', titleKey: 'steps.step2Title', descKey: 'steps.step2Desc' },
                  { emoji: '📱', tone: 'coral', num: '3', titleKey: 'steps.step3Title', descKey: 'steps.step3Desc' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="h-full bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col items-start gap-3 sm:flex-row sm:gap-5"
                  >
                    <FriendlyIcon emoji={item.emoji} label={t(item.titleKey)} tone={item.tone} size="sm" />
                    <div>
                      <p className="mb-1 text-sm sm:text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">0{item.num}</p>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{t(item.titleKey)}</h3>
                      <p className="text-slate-600 leading-relaxed">{t(item.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </MobileSwipeRow>

              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="mt-3 sm:mt-10 bg-emerald-50 border border-emerald-200 rounded-xl p-5 sm:p-6 flex items-start gap-4"
              >
                <FriendlyIcon kind="support" tone="mint" size="sm" className="mt-0.5" />
                <p className="text-slate-700 leading-relaxed font-medium">
                  {t('steps.easeNote')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA + CALENDLY */}
        <section className="order-last md:order-none py-10 sm:py-20 bg-gradient-to-br from-[#25c990] to-emerald-600">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                  {t('cta.title')}
                </h2>
                <p className="text-lg text-white/90 mb-6 sm:mb-10">
                  {t('cta.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-4 sm:p-6"
              >
                <div id="calendly-hebammen">
                  <AppointmentBooking
                    placement="midwives_page"
                    title={lang === 'en' ? 'Book an appointment' : 'Termin buchen'}
                    className="h-[600px] md:h-[700px]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <AmbulantMiaPrompt variant="hebammen" />
    </>
  );
};

export default HebammenPage;
