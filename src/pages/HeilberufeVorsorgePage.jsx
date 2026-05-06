import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Stethoscope,
  Calculator,
  Clock,
  TrendingDown,
  Lock,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Users,
  ChevronDown,
  FileCheck,
  Activity,
  Scale,
  Heart,
  PiggyBank,
  HeartPulse,
  HeartHandshake,
  BadgeCheck,
  KeyRound
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import HighlightText from '@/components/ui/HighlightText';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';

// Reusable Eyebrow-Pill für alle Sektionen
const SectionEyebrow = ({ children, variant = 'light' }) => {
  const styles = variant === 'dark'
    ? 'bg-white/10 border-white/20 text-white/95'
    : 'bg-teal-50 border-teal-100 text-teal-800';
  return (
    <div className={`inline-flex items-center gap-2 border text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5 ${styles}`}>
      <Sparkles className="w-3.5 h-3.5" />
      {children}
    </div>
  );
};

// Reusable Divider-Strich für H2
const SectionDivider = ({ variant = 'light' }) => {
  const color = variant === 'dark' ? 'from-white/50 to-[#25c990]' : 'from-teal-500 to-[#25c990]';
  return <div className={`w-20 h-1 bg-gradient-to-r ${color} rounded-full mx-auto mb-5`} />;
};

const pillarIcons = [
  [Shield, Clock, Lock, Scale],
  [Activity, PiggyBank, HeartPulse, Heart]
];

const mehrwertIcons = {
  TrendingDown,
  Shield,
  Calculator
};

const HeilberufeVorsorgePage = () => {
  const { t } = useTranslation('heilberufe');
  const { t: tSeo } = useTranslation('seo');
  const [openFaq, setOpenFaq] = useState(null);

  const scrollToCTA = () => {
    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  const schemaMarkup = createWebPageSchema(
    tSeo('heilberufe.title'),
    tSeo('heilberufe.description')
  );

  const pillars = t('solution.pillars', { returnObjects: true });
  const problemCards = t('problem.cards', { returnObjects: true });
  const mehrwertColumns = t('mehrwert.columns', { returnObjects: true });
  const ablaufSteps = t('ablauf.steps', { returnObjects: true });
  const testimonials = t('socialProof.testimonials', { returnObjects: true });
  const faqItems = t('faq.items', { returnObjects: true });
  const trustPoints = t('hero.trust', { returnObjects: true });

  return (
    <>
      <SEOHead
        title={tSeo('heilberufe.title')}
        description={tSeo('heilberufe.description')}
        canonicalUrl="https://healio.de/heilberufe-vorsorge"
        schemaMarkup={schemaMarkup}
      />

      <main className="bg-white overflow-hidden w-full">

        {/* HERO */}
        <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-20 lg:pb-0">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/hero-heilberufe-vorsorge.webp')" }}
            />
            {/* Sehr zarter Gradient links, nur so viel wie nötig für Lesbarkeit */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/55 via-slate-900/5 to-transparent z-10" />
          </div>

          <div className="container mx-auto relative z-20 w-full px-4 sm:px-6 md:px-8">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 text-sm font-medium px-4 py-1.5 rounded-full">
                  <Stethoscope className="w-4 h-4" />
                  {t('hero.badge')}
                </span>
                <span className="inline-flex items-center gap-2 bg-[#25c990]/15 text-[#25c990] text-sm font-medium px-4 py-1.5 rounded-full ring-1 ring-[#25c990]/30">
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
              <p className="text-base text-white/90 mb-10 max-w-2xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={scrollToCTA}
                  className="bg-[#25c990] hover:bg-[#1fb37f] text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {t('hero.ctaPrimary')}
                </Button>
                <Link to="/partner">
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/40 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-xl"
                  >
                    {t('hero.ctaSecondary')}
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
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

        {/* EXKLUSIVITÄT – Rahmenverträge */}
        <motion.section
          className="relative py-20 bg-gradient-to-br from-[#25c990] via-[#1fb37f] to-[#0b4d4a] text-white overflow-hidden"
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
            <div className="max-w-3xl mx-auto text-center mb-14">
              <SectionEyebrow variant="dark">{t('exklusivitaet.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {t('exklusivitaet.title')}
              </h2>
              <SectionDivider variant="dark" />
              <p className="text-lg text-white/90 leading-relaxed">
                {t('exklusivitaet.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {t('exklusivitaet.cards', { returnObjects: true }).map((card, i) => {
                const Icon = [HeartHandshake, BadgeCheck, KeyRound][i];
                return (
                  <motion.div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20 hover:bg-white/15 transition-colors"
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {card.title}
                    </h3>
                    <p className="text-white/85 leading-relaxed text-sm">
                      {card.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-center text-xs text-white/70 mt-10 max-w-2xl mx-auto leading-relaxed">
              {t('exklusivitaet.footnote')}
            </p>
          </div>
        </motion.section>

        {/* PROBLEM */}
        <motion.section
          className="py-20 bg-slate-50"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <SectionEyebrow>{t('problem.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {t('problem.title')}
              </h2>
              <SectionDivider />
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('problem.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {problemCards.map((card, i) => {
                const Icon = [TrendingDown, Clock, Briefcase][i];
                return (
                  <motion.div
                    key={i}
                    className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 hover:border-rose-200 transition-all"
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-rose-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {card.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* LÖSUNG */}
        <motion.section
          className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Deko-Akzente */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#25c990]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
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
                      headerBg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900',
                      eyebrow: 'text-teal-300',
                      number: 'text-teal-400/30',
                      iconBg: 'bg-teal-500/15 ring-1 ring-teal-400/30',
                      iconColor: 'text-teal-300',
                      cardIconBg: 'bg-teal-50',
                      cardIconColor: 'text-teal-700',
                      cardHover: 'hover:border-teal-200 hover:shadow-teal-100'
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
                    <div className={`relative ${colorScheme.headerBg} p-8 md:p-10 text-white overflow-hidden`}>
                      <div className={`absolute -top-4 -right-2 text-[120px] font-black leading-none select-none ${colorScheme.number}`}>
                        0{pIdx + 1}
                      </div>
                      <div className="relative z-10">
                        <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${colorScheme.eyebrow} mb-3`}>
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
                    <div className="p-6 md:p-7 grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 bg-slate-50/40">
                      {pillar.blocks.map((block, bIdx) => {
                        const Icon = pillarIcons[pIdx][bIdx];
                        return (
                          <div
                            key={bIdx}
                            className={`group bg-white rounded-xl p-5 border border-slate-200 transition-all ${colorScheme.cardHover} hover:shadow-md hover:-translate-y-0.5`}
                          >
                            <div className={`w-10 h-10 rounded-lg ${colorScheme.cardIconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                              <Icon className={`w-5 h-5 ${colorScheme.cardIconColor}`} />
                            </div>
                            <h4 className="text-base font-semibold text-slate-900 mb-2">
                              {block.title}
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              <HighlightText text={block.text} className="font-semibold text-[#1fb37f]" />
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* MEHRWERT */}
        <motion.section
          className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0b4d4a] text-white overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 right-10 w-96 h-96 bg-[#25c990] rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <SectionEyebrow variant="dark">{t('mehrwert.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {t('mehrwert.title')}
              </h2>
              <SectionDivider variant="dark" />
              <p className="text-lg text-white/80 leading-relaxed">
                {t('mehrwert.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {mehrwertColumns.map((col, i) => {
                const Icon = mehrwertIcons[col.icon] || CheckCircle2;
                return (
                  <motion.div
                    key={i}
                    className="relative bg-white/[0.07] backdrop-blur-sm rounded-2xl p-8 border border-white/15 hover:border-[#25c990]/40 hover:bg-white/[0.1] transition-all overflow-hidden"
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#25c990]/30 to-[#25c990]/10 ring-1 ring-[#25c990]/40 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-[#25c990]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                          {col.title}
                        </p>
                      </div>
                    </div>
                    <div className="mb-6 pb-6 border-b border-white/10">
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
                      <p className="text-sm text-white/75 leading-snug">
                        {col.bigNumberLabel}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {col.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex gap-3 text-sm text-white/85 leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-[#25c990] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ABLAUF */}
        <motion.section
          className="py-24 bg-white"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <SectionEyebrow>{t('ablauf.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {t('ablauf.title')}
              </h2>
              <SectionDivider />
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('ablauf.subtitle')}
              </p>
            </div>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Verbindungslinie zwischen Schritten (nur Desktop) */}
              <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-teal-200 via-[#25c990]/40 to-teal-200 z-0" />

              {ablaufSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="relative bg-white rounded-2xl p-7 border-2 border-slate-100 hover:border-[#25c990]/30 hover:shadow-lg transition-all z-10"
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25c990] to-[#1fb37f] flex items-center justify-center mb-5 shadow-lg shadow-[#25c990]/20 mx-auto lg:mx-0">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 text-center lg:text-left">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed text-center lg:text-left">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SOCIAL PROOF */}
        <motion.section
          className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <SectionEyebrow>{t('socialProof.eyebrow')}</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {t('socialProof.title')}
              </h2>
              <SectionDivider />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-[#25c990] to-[#1fb37f] flex items-center justify-center shadow-lg shadow-[#25c990]/30">
                    <span className="text-white text-2xl leading-none font-serif">„</span>
                  </div>
                  <blockquote className="text-slate-700 leading-relaxed mb-5 italic mt-4">
                    {testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-[#25c990]/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#1fb37f]" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{testimonial.name}</div>
                      <div className="text-slate-500 text-xs">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          className="py-24 bg-white"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
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
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors"
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
                    {isOpen && (
                      <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* FINAL CTA */}
        <section
          id="final-cta"
          className="relative py-24 bg-gradient-to-br from-[#0b4d4a] via-slate-900 to-slate-950 text-white overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#25c990] rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
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
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#25c990] flex items-center justify-center mb-5">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {t('cta.primary.title')}
                </h3>
                <p className="text-white/75 mb-6 leading-relaxed">
                  {t('cta.primary.description')}
                </p>
                <Link to="/terminvereinbarung">
                  <Button className="w-full bg-[#25c990] hover:bg-[#1fb37f] text-white py-6 rounded-xl">
                    {t('cta.primary.cta')}
                  </Button>
                </Link>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {t('cta.secondary.title')}
                </h3>
                <p className="text-white/75 mb-6 leading-relaxed">
                  {t('cta.secondary.description')}
                </p>
                <Link to="/kontakt">
                  <Button
                    variant="outline"
                    className="w-full bg-white/10 border-white/40 text-white hover:bg-white/20 py-6 rounded-xl"
                  >
                    {t('cta.secondary.cta')}
                  </Button>
                </Link>
              </div>
            </div>
            <p className="text-xs text-white/50 text-center mt-12 max-w-2xl mx-auto leading-relaxed">
              {t('cta.disclaimer')}
            </p>
          </div>
        </section>

      </main>
    </>
  );
};

export default HeilberufeVorsorgePage;
