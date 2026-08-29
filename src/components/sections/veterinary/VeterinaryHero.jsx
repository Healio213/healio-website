import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const VeterinaryHero = () => {
  const { t } = useTranslation('veterinary');

  return (
    <section className="relative flex min-h-[92svh] w-full items-center overflow-hidden bg-[#071827]" aria-labelledby="vet-hero-heading">
      <div className="absolute inset-0">
        <img
          src="/images/veterinary/hero-family-1536.webp"
          srcSet="/images/veterinary/hero-family-768.webp 768w, /images/veterinary/hero-family-1280.webp 1280w, /images/veterinary/hero-family-1536.webp 1536w"
          sizes="100vw"
          alt={t('hero.heroImageAlt')}
          width="1536"
          height="1024"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,19,29,0.98)_0%,rgba(4,19,29,0.91)_38%,rgba(4,19,29,0.48)_65%,rgba(4,19,29,0.12)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#04131d]/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#071827]/85 to-transparent" />
        <div className="absolute -left-20 top-[24%] h-80 w-80 rounded-full bg-[#25c990]/10 blur-[100px]" aria-hidden="true" />
      </div>

      <div className="healio-container relative z-10 w-full px-4 pb-28 pt-36 sm:px-6 sm:pb-32 sm:pt-44 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-[820px]"
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-[#76e2bd] sm:w-16" aria-hidden="true" />
            <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.25em] text-[#8ee7ca] sm:text-xs">
              {t('hero.eyebrow')}
            </p>
          </div>

          <h1
            id="vet-hero-heading"
            className="max-w-[13.5ch] font-display text-[clamp(2.75rem,6.3vw,5.65rem)] font-extrabold leading-[0.94] tracking-[-0.065em] text-[#fffdf8] [text-wrap:balance]"
          >
            {t('hero.title')}
            <span className="mt-2 block font-friendly font-bold tracking-[-0.04em] text-[#76e2bd] sm:mt-3">
              {t('hero.titleHighlight')}
            </span>
          </h1>

          <p className="mt-7 max-w-[660px] text-base font-medium leading-relaxed text-slate-200 sm:text-lg md:text-xl">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:mt-9 sm:flex-row sm:items-center sm:gap-6">
            <Button
              className="h-auto w-full rounded-full border-0 bg-[#25c990] px-7 py-4 font-display text-base font-extrabold text-[#062319] shadow-[0_18px_45px_rgba(37,201,144,0.3)] transition hover:-translate-y-0.5 hover:bg-[#69e1b8] sm:w-auto sm:px-9 sm:py-[1.1rem]"
              onClick={() => document.getElementById('tier-check')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="max-w-[330px] border-l border-white/20 pl-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
              {t('hero.microcopy')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VeterinaryHero;
