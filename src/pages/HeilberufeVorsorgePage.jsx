import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Stethoscope,
  CheckCircle2,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import AmbulantMiaPrompt from '@/components/sections/ambulant/AmbulantMiaPrompt';
import ProductTicker from '@/components/sections/ProductTicker';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';
import { useLanguage } from '@/hooks/useLanguage';

// Reusable Eyebrow-Pill für alle Sektionen
const SectionEyebrow = ({ children, variant = 'light' }) => {
  const styles = variant === 'dark'
    ? 'bg-white/10 border-white/20 text-white/95'
    : 'bg-healio-light border-home-mint/20 text-healio-primary-dark';
  return (
    <div className={`inline-flex items-center gap-2 border text-sm sm:text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 sm:mb-5 ${styles}`}>
      <Sparkles className="w-3.5 h-3.5" />
      {children}
    </div>
  );
};

// Reusable Divider-Strich für H2
const SectionDivider = ({ variant = 'light' }) => {
  const color = variant === 'dark' ? 'from-white/50 to-[#25c990]' : 'from-home-mint-active to-[#25c990]';
  return <div className={`w-20 h-1 bg-gradient-to-r ${color} rounded-full mx-auto mb-4 sm:mb-5`} />;
};

const pillarFriendlyIcons = [
  [
    { emoji: '🛡️', tone: 'mint' },
    { emoji: '⏱️', tone: 'butter' },
    { emoji: '🔒', tone: 'lavender' },
    { emoji: '⚖️', tone: 'sky' },
  ],
  [
    { emoji: '🏃', tone: 'sky' },
    { emoji: '🪙', tone: 'butter' },
    { emoji: '❤️‍🩹', tone: 'coral' },
    { emoji: '💚', tone: 'mint' },
  ],
];

const mehrwertFriendlyIcons = {
  TrendingDown: { emoji: '📉', tone: 'sky' },
  Shield: { emoji: '🛡️', tone: 'mint' },
  Calculator: { emoji: '🧮', tone: 'butter' },
};

const exclusivityFriendlyIcons = [
  { emoji: '🤝', tone: 'mint' },
  { emoji: '🏅', tone: 'sky' },
  { emoji: '🔑', tone: 'butter' },
];

const problemFriendlyIcons = [
  { emoji: '📉', tone: 'coral' },
  { emoji: '⏳', tone: 'butter' },
  { emoji: '🗂️', tone: 'lavender' },
];

const ctaFriendlyIcons = [
  { emoji: '🗓️', tone: 'mint' },
  { emoji: '🩺', tone: 'sky' },
];

const HeilberufeVorsorgePage = () => {
  const { t } = useTranslation('heilberufe');
  const { t: tSeo } = useTranslation('seo');
  const { lang, getPath } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);
  const canonicalUrl = lang === 'en'
    ? 'https://healio.de/en/healthcare-professionals-protection'
    : 'https://healio.de/heilberufe-vorsorge';
  const alternateUrls = {
    de: 'https://healio.de/heilberufe-vorsorge',
    en: 'https://healio.de/en/healthcare-professionals-protection',
  };

  const schemaMarkup = createWebPageSchema(
    tSeo('heilberufe.title'),
    tSeo('heilberufe.description'),
    canonicalUrl,
    lang === 'en' ? 'en-US' : 'de-DE'
  );

  const pillars = t('solution.pillars', { returnObjects: true });
  const problemCards = t('problem.cards', { returnObjects: true });
  const mehrwertColumns = t('mehrwert.columns', { returnObjects: true });
  const ablaufSteps = t('ablauf.steps', { returnObjects: true });
  const faqItems = t('faq.items', { returnObjects: true });
  const trustPoints = t('hero.trust', { returnObjects: true });

  return (
    <>
      <SEOHead
        title={tSeo('heilberufe.title')}
        description={tSeo('heilberufe.description')}
        canonicalUrl={canonicalUrl}
        alternateUrls={alternateUrls}
        schemaMarkup={schemaMarkup}
      />

      {/* Mobil (unter md) ordnet "order-N" die Abschnitte in der Reihenfolge, in der
          Besucher denken: Lücken verstehen, Paket, warum nur über Healio, Ersparnis,
          Ablauf, Fragen, Kontakt. Ab md gilt "md:block" und die Reihenfolge im Code. */}
      <main className="flex flex-col bg-white overflow-hidden w-full md:block">

        {/* HERO */}
        <section className="relative order-1 flex items-center pt-28 pb-12 md:order-none md:min-h-[100svh] md:pb-16 lg:pt-20 lg:pb-0">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/hero-heilberufe-vorsorge.webp')" }}
            />
            {/* Sehr zarter Gradient links, nur so viel wie nötig für Lesbarkeit */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,23,38,0.94)_0%,rgba(7,23,38,0.88)_48%,rgba(7,23,38,0.24)_100%)] z-10" />
            {/* Mobil dunkelt ein zarter Schleier das Foto ab, damit der weiße Text über der ganzen Breite lesbar bleibt */}
            <div className="absolute inset-0 bg-[#071726]/55 z-10 md:hidden" />
          </div>

          <div className="container mx-auto relative z-20 w-full px-4 sm:px-6 md:px-8">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 border border-white/25 bg-[#071726]/40 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                  <Stethoscope className="w-4 h-4" />
                  {t('hero.badge')}
                </span>
                <span className="inline-flex items-center gap-2 bg-[#071726]/40 text-[#75e6bf] text-sm font-medium px-4 py-1.5 rounded-full ring-1 ring-[#25c990]/30">
                  <Sparkles className="w-4 h-4" />
                  {t('hero.exclusiveLabel')}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                {t('hero.title')}
              </h1>
              <p className="text-lg sm:text-xl text-white leading-relaxed mb-4 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {t('hero.subtitle')}
              </p>
              <p className="text-base text-white/90 mb-6 sm:mb-10 max-w-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                {t('hero.description')}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  className="h-auto min-h-12 bg-[#25c990] hover:bg-[#1fb37f] text-[#071726] text-base sm:text-lg px-6 sm:px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to={getPath('terminvereinbarung')}>{t('hero.ctaPrimary')}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto min-h-12 bg-white/10 border-white/40 text-white hover:bg-white/20 hover:text-white text-base sm:text-lg px-6 sm:px-8 py-4 rounded-xl"
                >
                  <Link to={getPath('partner')}>{t('hero.ctaSecondary')}</Link>
                </Button>
              </div>
              <div className="mt-6 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                {trustPoints.map((point, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="hidden sm:inline text-white/60">·</span>}
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#25c990]" />
                      {point}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="order-2 md:order-none md:contents">
          <ProductTicker variant="heilberufe" />
        </div>

        {/* EXKLUSIVITÄT – Rahmenverträge */}
        <motion.section
          className="relative order-5 md:order-none py-12 sm:py-20 bg-gradient-to-br from-[#25c990] via-[#1fb37f] to-[#0b4d4a] text-white overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-14">
              <SectionEyebrow variant="dark">{t('exklusivitaet.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {t('exklusivitaet.title')}
              </h2>
              <SectionDivider variant="dark" />
              <p className="text-lg text-white/90 leading-relaxed">
                {t('exklusivitaet.subtitle')}
              </p>
            </div>

            {/* Mobil wischen die drei Karten nebeneinander; ab md das bisherige Dreier-Raster. */}
            <MobileSwipeRow
              label={t('exklusivitaet.title')}
              className="max-w-6xl mx-auto"
              desktopClassName="md:grid md:grid-cols-3 md:gap-5"
              mobileItemWidth="w-[84vw] max-w-[22rem]"
              dotsTone="dark"
            >
              {t('exklusivitaet.cards', { returnObjects: true }).map((card, i) => {
                const friendlyIcon = exclusivityFriendlyIcons[i];
                return (
                  <motion.div
                    key={i}
                    className="h-full bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-7 border border-white/20 hover:bg-white/15 transition-colors"
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <FriendlyIcon
                      emoji={friendlyIcon.emoji}
                      tone={friendlyIcon.tone}
                      size="sm"
                      className="mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-3">
                      {card.title}
                    </h3>
                    <p className="text-white/85 leading-relaxed text-base md:text-sm md:leading-relaxed">
                      {card.text}
                    </p>
                  </motion.div>
                );
              })}
            </MobileSwipeRow>

            <p className="text-center text-sm sm:text-xs text-white/70 mt-3 sm:mt-10 max-w-2xl mx-auto leading-relaxed sm:leading-relaxed">
              {t('exklusivitaet.footnote')}
            </p>
          </div>
        </motion.section>

        {/* PROBLEM */}
        <motion.section
          className="order-3 md:order-none py-12 sm:py-20 bg-slate-50"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16">
              <SectionEyebrow>{t('problem.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {t('problem.title')}
              </h2>
              <SectionDivider />
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('problem.subtitle')}
              </p>
            </div>
            {/* Mobil wischen die drei Lücken als Karten; ab md das bisherige Dreier-Raster. */}
            <MobileSwipeRow
              label={t('problem.title')}
              className="max-w-6xl mx-auto"
              desktopClassName="md:grid md:grid-cols-3 md:gap-6"
              mobileItemWidth="w-[84vw] max-w-[22rem]"
            >
              {problemCards.map((card, i) => {
                const friendlyIcon = problemFriendlyIcons[i];
                return (
                  <motion.div
                    key={i}
                    className="group h-full bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 hover:border-rose-200 transition-all"
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <FriendlyIcon
                      emoji={friendlyIcon.emoji}
                      tone={friendlyIcon.tone}
                      size="md"
                      className="mb-4 sm:mb-5 !h-12 !w-12 sm:!h-16 sm:!w-16 transition-transform group-hover:-translate-y-1 group-hover:scale-105"
                    />
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {card.text}
                    </p>
                  </motion.div>
                );
              })}
            </MobileSwipeRow>
          </div>
        </motion.section>

        {/* LÖSUNG */}
        <motion.section
          className="relative order-4 md:order-none py-12 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Deko-Akzente */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-home-mint/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#25c990]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16">
              <SectionEyebrow>Die Lösung</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {t('solution.title')}
              </h2>
              <SectionDivider />
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('solution.subtitle')}
              </p>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* Plus-Symbol zwischen den Säulen (nur auf Desktop) */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white shadow-xl border-2 border-slate-100 items-center justify-center">
                <span className="text-2xl font-light text-slate-400">+</span>
              </div>

              {pillars.map((pillar, pIdx) => {
                const isFirst = pIdx === 0;
                const colorScheme = isFirst
                  ? {
                      headerBg: 'bg-gradient-to-br from-home-midnight via-[#06131c] to-healio-primary-dark',
                      eyebrow: 'text-home-mint-active',
                      number: 'text-home-mint/30',
                      iconBg: 'bg-home-mint/15 ring-1 ring-home-mint/30',
                      iconColor: 'text-home-mint-active',
                      cardIconBg: 'bg-healio-light',
                      cardIconColor: 'text-healio-primary-dark',
                      cardHover: 'hover:border-home-mint/25 hover:shadow-home-mint/10'
                    }
                  : {
                      headerBg: 'bg-gradient-to-br from-[#0b4d4a] via-[#1fb37f] to-[#25c990]',
                      eyebrow: 'text-white/85',
                      number: 'text-white/25',
                      iconBg: 'bg-white/15 ring-1 ring-white/30',
                      iconColor: 'text-white',
                      cardIconBg: 'bg-[#25c990]/10',
                      cardIconColor: 'text-[#1fb37f]',
                      cardHover: 'hover:border-[#25c990]/30 hover:shadow-emerald-100'
                    };

                return (
                  <motion.div
                    key={pIdx}
                    className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-white flex flex-col"
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: pIdx * 0.15 }}
                  >
                    {/* Header mit Farbverlauf */}
                    <div className={`relative ${colorScheme.headerBg} p-5 sm:p-8 md:p-10 text-white overflow-hidden`}>
                      <div className={`absolute -top-4 -right-2 text-[120px] font-black leading-none select-none ${colorScheme.number}`}>
                        0{pIdx + 1}
                      </div>
                      <div className="relative z-10">
                        <div className={`inline-flex items-center gap-2 text-sm md:text-xs font-semibold uppercase tracking-wider ${colorScheme.eyebrow} mb-3`}>
                          <Sparkles className="w-3.5 h-3.5" />
                          {isFirst ? 'Säule 1 · Praxis' : 'Säule 2 · Du'}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {pillar.title}
                        </h3>
                        <p className="text-white/85 text-base">
                          {pillar.description}
                        </p>
                      </div>
                    </div>

                    {/* Bausteine */}
                    <MobileSwipeRow
                      label={pillar.title}
                      className="flex-1 bg-slate-50/40 p-4 sm:p-6 md:flex md:flex-col md:p-7"
                      desktopClassName="md:flex-1 md:grid md:grid-cols-2 md:gap-3"
                      mobileItemWidth="w-[80vw] max-w-[20rem]"
                    >
                      {pillar.blocks.map((block, bIdx) => {
                        const friendlyIcon = pillarFriendlyIcons[pIdx][bIdx];
                        return (
                          <div
                            key={bIdx}
                            className={`group h-full bg-white rounded-xl p-5 border border-slate-200 transition-all ${colorScheme.cardHover} hover:shadow-md hover:-translate-y-0.5`}
                          >
                            <FriendlyIcon
                              emoji={friendlyIcon.emoji}
                              label={block.title}
                              tone={friendlyIcon.tone}
                              size="sm"
                              className="mb-3 transition-transform group-hover:-translate-y-1 group-hover:rotate-2"
                            />
                            <h4 className="text-base font-semibold text-slate-900 mb-2">
                              {block.title}
                            </h4>
                            <p className="text-base md:text-sm text-slate-600 leading-relaxed md:leading-relaxed">
                              <HighlightText text={block.text} className="font-semibold text-[#1fb37f]" />
                            </p>
                          </div>
                        );
                      })}
                    </MobileSwipeRow>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* MEHRWERT */}
        <motion.section
          className="relative order-6 md:order-none py-12 sm:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0b4d4a] text-white overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 right-10 w-96 h-96 bg-[#25c990] rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-home-mint rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16">
              <SectionEyebrow variant="dark">{t('mehrwert.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {t('mehrwert.title')}
              </h2>
              <SectionDivider variant="dark" />
              <p className="text-lg text-white/80 leading-relaxed">
                {t('mehrwert.subtitle')}
              </p>
            </div>
            {/* Mobil wischen die drei Spalten als Karten; ab md das bisherige Dreier-Raster. */}
            <MobileSwipeRow
              label={t('mehrwert.title')}
              className="max-w-6xl mx-auto"
              desktopClassName="md:grid md:grid-cols-3 md:gap-6"
              mobileItemWidth="w-[86vw] max-w-[22rem]"
              dotsTone="dark"
            >
              {mehrwertColumns.map((col, i) => {
                const friendlyIcon = mehrwertFriendlyIcons[col.icon] || { emoji: '✅', tone: 'mint' };
                return (
                  <motion.div
                    key={i}
                    className="relative h-full bg-white/[0.07] backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-white/15 hover:border-[#25c990]/40 hover:bg-white/[0.1] transition-all overflow-hidden"
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-4 sm:mb-6">
                      <FriendlyIcon emoji={friendlyIcon.emoji} label={col.title} tone={friendlyIcon.tone} className="!h-12 !w-12 sm:!h-16 sm:!w-16" />
                      <div>
                        <p className="text-sm sm:text-xs font-semibold uppercase tracking-wider text-white/60">
                          {col.title}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 pb-4 sm:mb-6 sm:pb-6 border-b border-white/10">
                      <div className="text-4xl md:text-5xl font-bold leading-none mb-2"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, #5eeab8 0%, #25c990 45%, #0f6646 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          color: 'transparent'
                        }}>
                        {col.bigNumber}
                      </div>
                      <p className="text-base md:text-sm text-white/75 leading-snug md:leading-snug">
                        {col.bigNumberLabel}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {col.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex gap-3 text-base md:text-sm text-white/85 leading-relaxed md:leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-[#25c990] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </MobileSwipeRow>
          </div>
        </motion.section>

        {/* ABLAUF */}
        <motion.section
          className="order-7 md:order-none py-12 sm:py-24 bg-white"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16">
              <SectionEyebrow>{t('ablauf.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {t('ablauf.title')}
              </h2>
              <SectionDivider />
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('ablauf.subtitle')}
              </p>
            </div>
            <div className="relative max-w-6xl mx-auto">
              {/* Verbindungslinie zwischen Schritten (nur Desktop) */}
              <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-home-mint/20 via-[#25c990]/40 to-home-mint/20 z-0" />

              {/* Mobil wischen die vier Schritte als Karten; ab md das bisherige Raster. */}
              <MobileSwipeRow
                as="ol"
                label={t('ablauf.title')}
                desktopClassName="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6"
                mobileItemWidth="w-[78vw] max-w-[19rem]"
              >
              {ablaufSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="relative h-full bg-white rounded-2xl p-5 sm:p-7 border-2 border-slate-100 hover:border-[#25c990]/30 hover:shadow-lg transition-all z-10"
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25c990] to-[#1fb37f] flex items-center justify-center mb-4 sm:mb-5 shadow-lg shadow-[#25c990]/20 mx-auto lg:mx-0">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 text-center lg:text-left">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-sm text-slate-600 leading-relaxed md:leading-relaxed text-center lg:text-left">
                    {step.text}
                  </p>
                </motion.div>
              ))}
              </MobileSwipeRow>
            </div>
          </div>
        </motion.section>

        {/* Erfundene Praxisstimmen am 05.10.2026 entfernt (Abmahnrisiko).
            Stimmen nur mit echter, schriftlich freigegebener Quelle wieder einbauen. */}

        {/* FAQ: folgt direkt auf das weiße ABLAUF, daher wenig Abstand oben */}
        <motion.section
          className="order-8 md:order-none pt-6 pb-12 sm:pt-8 sm:pb-24 bg-white"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-14">
              <SectionEyebrow>{t('faq.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {t('faq.title')}
              </h2>
              <SectionDivider />
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqItems.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`rounded-xl overflow-hidden border-2 transition-all ${
                      isOpen
                        ? 'bg-white border-[#25c990]/40 shadow-md'
                        : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      id={`heilberufe-faq-question-${i}`}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#087454]"
                      aria-controls={`heilberufe-faq-answer-${i}`}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-slate-900">{item.q}</span>
                      <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all ${
                        isOpen ? 'bg-[#25c990] text-white rotate-180' : 'bg-white text-slate-500'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    <div
                      id={`heilberufe-faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`heilberufe-faq-question-${i}`}
                      hidden={!isOpen}
                      className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                    >
                      {item.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* FINAL CTA */}
        <section
          id="final-cta"
          className="relative order-last md:order-none py-12 sm:py-24 bg-gradient-to-br from-[#0b4d4a] via-slate-900 to-slate-950 text-white overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#25c990] rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-14">
              <SectionEyebrow variant="dark">{t('cta.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {t('cta.title')}
              </h2>
              <SectionDivider variant="dark" />
              <p className="text-lg text-white/80">
                {t('cta.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-white/10">
                <FriendlyIcon
                  emoji={ctaFriendlyIcons[0].emoji}
                  tone={ctaFriendlyIcons[0].tone}
                  size="sm"
                  className="mb-4 sm:mb-5"
                />
                <h3 className="text-xl font-semibold mb-3">
                  {t('cta.primary.title')}
                </h3>
                <p className="text-white/75 mb-6 leading-relaxed">
                  {t('cta.primary.description')}
                </p>
                <Button asChild className="h-auto min-h-12 w-full bg-[#25c990] hover:bg-[#1fb37f] text-[#071726] py-4 rounded-xl">
                  <Link to={getPath('terminvereinbarung')}>{t('cta.primary.cta')}</Link>
                </Button>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-white/10">
                <FriendlyIcon
                  emoji={ctaFriendlyIcons[1].emoji}
                  tone={ctaFriendlyIcons[1].tone}
                  size="sm"
                  className="mb-4 sm:mb-5"
                />
                <h3 className="text-xl font-semibold mb-3">
                  {t('cta.secondary.title')}
                </h3>
                <p className="text-white/75 mb-6 leading-relaxed">
                  {t('cta.secondary.description')}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto min-h-12 w-full bg-white/10 border-white/40 text-white hover:bg-white/20 hover:text-white py-4 rounded-xl"
                >
                  <Link to={getPath('kontakt')}>{t('cta.secondary.cta')}</Link>
                </Button>
              </div>
            </div>
            <p className="text-sm sm:text-xs text-white/50 text-center mt-6 sm:mt-12 max-w-2xl mx-auto leading-relaxed sm:leading-relaxed">
              {t('cta.disclaimer')}
            </p>
          </div>
        </section>

      </main>
      <AmbulantMiaPrompt variant="heilberufe" />
    </>
  );
};

export default HeilberufeVorsorgePage;
