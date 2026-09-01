
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, CheckCircle, Euro } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';

const AmbulantHero = () => {
  const { t } = useTranslation('ambulant');

  return (
    <section className="relative flex min-h-[82svh] items-center overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/hero-ambulant.webp?v=2" type="image/webp" />
          <img
            src="/images/hero-ambulant.png?v=2"
            alt={t('hero.heroImageAlt')}
            className="w-full h-full object-cover object-top absolute inset-0"
            {...{ fetchpriority: 'high' }}
          />
        </picture>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#04101b]/95 via-[#06131d]/78 to-[#071722]/38" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_45%,rgba(37,201,144,0.12),transparent_38%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-20 pb-10 pt-16 md:pb-16 md:pt-20">
        <div className="max-w-4xl text-left">
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 font-display text-xs font-extrabold uppercase tracking-[0.24em] text-home-mint-active md:text-sm"
          >
            {t('hero.eyebrow')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            id="hero-heading"
            className="mb-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white drop-shadow-lg sm:text-5xl md:mb-7 lg:text-7xl"
          >
            <HighlightText text={t('hero.title')} className="text-[#5ee0b1]" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-100 drop-shadow-md md:mb-8 md:text-xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 flex max-w-3xl flex-wrap items-center justify-start gap-2 md:mb-10 md:gap-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-home-midnight/75 px-4 py-2 backdrop-blur-md">
              <Euro className="w-4 h-4 text-healio-primary" />
              <span className="text-sm text-white font-medium">{t('hero.badgeEffective')}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-home-midnight/75 px-4 py-2 backdrop-blur-md">
              <CheckCircle className="w-4 h-4 text-healio-primary" />
              <span className="text-sm text-white font-medium">{t('hero.badgeNoWait')}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-home-midnight/75 px-4 py-2 backdrop-blur-md">
              <CheckCircle className="w-4 h-4 text-healio-primary" />
              <span className="text-sm text-white font-medium">{t('hero.badgeTestResult')}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-start justify-center gap-3"
          >
            <a
              href="#budget-kompass"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-home-mint px-7 font-display text-base font-extrabold text-home-midnight shadow-[0_16px_42px_rgba(37,201,144,0.3)] transition hover:-translate-y-0.5 hover:bg-home-mint-active hover:shadow-[0_20px_50px_rgba(37,201,144,0.36)] focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4 focus-visible:ring-offset-home-midnight motion-reduce:transform-none"
            >
              <ArrowDown className="mr-2 h-5 w-5" />
              {t('hero.ctaCalculate')}
            </a>
            <p className="max-w-xl text-left text-sm leading-6 text-slate-200">
              {t('hero.ctaHint')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AmbulantHero;
