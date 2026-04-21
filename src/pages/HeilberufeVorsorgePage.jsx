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
import { createWebPageSchema } from '@/lib/createSchemaMarkup';

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
        canonicalUrl="https://www.healio.de/heilberufe-vorsorge"
        schemaMarkup={schemaMarkup}
      />

      <main className="bg-white overflow-hidden w-full">

        {/* HERO */}
        <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-20 lg:pb-0">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-[#0b4d4a]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: "url('/images/hero-heilberufe-vorsorge.webp')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent z-10" />
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-4 max-w-2xl">
                {t('hero.subtitle')}
              </p>
              <p className="text-base text-white/75 mb-10 max-w-2xl">
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
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
                {trustPoints.map((point, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="hidden sm:inline text-white/40">·</span>}
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
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white/95 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                {t('exklusivitaet.eyebrow')}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {t('exklusivitaet.title')}
              </h2>
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
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('problem.title')}
              </h2>
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
                    className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-rose-600" />
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
          className="py-20 bg-white"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('solution.title')}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('solution.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {pillars.map((pillar, pIdx) => (
                <div
                  key={pIdx}
                  className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-slate-50 to-teal-50/30 border border-slate-100"
                >
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-3">
                      <Sparkles className="w-4 h-4" />
                      {pIdx === 0 ? 'Säule 1' : 'Säule 2'}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pillar.blocks.map((block, bIdx) => {
                      const Icon = pillarIcons[pIdx][bIdx];
                      return (
                        <div
                          key={bIdx}
                          className="bg-white rounded-xl p-5 border border-slate-100"
                        >
                          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                            <Icon className="w-5 h-5 text-teal-700" />
                          </div>
                          <h4 className="text-base font-semibold text-slate-900 mb-2">
                            {block.title}
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {block.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* MEHRWERT */}
        <motion.section
          className="py-20 bg-slate-900 text-white"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('mehrwert.title')}
              </h2>
              <p className="text-lg text-white/75 leading-relaxed">
                {t('mehrwert.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {mehrwertColumns.map((col, i) => {
                const Icon = mehrwertIcons[col.icon] || CheckCircle2;
                return (
                  <motion.div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#25c990]/20 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-[#25c990]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-5">
                      {col.title}
                    </h3>
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
          className="py-20 bg-white"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('ablauf.title')}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('ablauf.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {ablaufSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-7 border border-slate-100"
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="text-4xl font-bold text-[#25c990]/30 mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SOCIAL PROOF */}
        <motion.section
          className="py-20 bg-slate-50"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('socialProof.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Users className="w-8 h-8 text-[#25c990] mb-4" />
                  <blockquote className="text-slate-700 leading-relaxed mb-5 italic">
                    „{testimonial.quote}"
                  </blockquote>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-slate-500">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          className="py-20 bg-white"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('faq.title')}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100"
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-slate-100 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-slate-900">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FINAL CTA */}
        <section
          id="final-cta"
          className="py-20 bg-gradient-to-br from-[#0b4d4a] via-slate-900 to-slate-900 text-white"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('cta.title')}
              </h2>
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
