
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useReferrer } from '@/hooks/useReferrer';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle, Euro } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';

const AmbulantHero = () => {
  const { t } = useTranslation('ambulant');
  const referrer = useReferrer();
  const sdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Ambulant' });

  return (
    <section className="relative min-h-[90svh] flex items-center overflow-hidden" aria-labelledby="hero-heading">
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
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#04101b]/85 via-[#06131d]/70 to-[#071722]/45" />
        <div className="absolute inset-0 z-10 bg-black/10" />
      </div>

      <div className="container mx-auto px-4 relative z-20 pb-10 pt-16 md:pb-16 md:pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            id="hero-heading"
            className="mb-4 text-4xl font-extrabold leading-tight text-white drop-shadow-lg md:mb-6 md:text-5xl lg:text-7xl"
          >
            <HighlightText text={t('hero.title')} className="text-[#5ee0b1]" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-4 max-w-2xl text-lg font-medium leading-relaxed text-gray-100 drop-shadow-md md:mb-6 md:text-xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 flex flex-wrap items-center justify-center gap-2 md:mb-10 md:gap-4"
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
            className="flex flex-col items-center justify-center gap-3"
          >
            <a
              href={sdkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSdkClick('ambulant-hero', referrer)}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-home-mint px-7 font-display text-base font-extrabold text-home-midnight shadow-[0_16px_42px_rgba(37,201,144,0.3)] transition hover:-translate-y-0.5 hover:bg-home-mint-active hover:shadow-[0_20px_50px_rgba(37,201,144,0.36)] focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4 focus-visible:ring-offset-home-midnight motion-reduce:transform-none"
            >
              <Calculator className="w-5 h-5 mr-2" />
              {t('hero.ctaCalculate')}
            </a>
            <p className="max-w-xl text-center text-sm leading-6 text-slate-200">
              {t('hero.ctaHint')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AmbulantHero;
