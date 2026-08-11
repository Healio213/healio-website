import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HighlightText from '@/components/ui/HighlightText';
import { useLanguage } from '@/hooks/useLanguage';

const entranceEase = [0.16, 1, 0.3, 1];

const CompanyHero = () => {
  const { t } = useTranslation('unternehmen');
  const { getPath } = useLanguage();
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const desktopImageY = useTransform(scrollY, [0, 1000], [0, -28]);
  const desktopImageScale = useTransform(scrollY, [0, 1000], [1.018, 1.045]);
  const mobileImageY = useTransform(scrollY, [0, 950], [0, -12]);
  const proof = t('hero.proof', { returnObjects: true });

  const entrance = (delay) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reducedMotion ? 0 : 0.78,
      delay: reducedMotion ? 0 : delay,
      ease: entranceEase,
    },
  });

  return (
    <section
      className="relative isolate min-h-[780px] w-full overflow-hidden bg-[#06131c] text-white md:min-h-[100svh]"
      aria-labelledby="company-hero-title"
    >
      <motion.img
        src="/images/healio-hero-markenrelief-v1.webp"
        alt=""
        width="1586"
        height="992"
        loading="eager"
        {...{ fetchpriority: 'high' }}
        decoding="async"
        draggable="false"
        className="absolute inset-0 -z-30 hidden h-full w-full select-none object-cover object-[62%_center] md:block"
        initial={reducedMotion ? false : { opacity: 0.72 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 1.1, ease: entranceEase }}
        style={{
          y: reducedMotion ? 0 : desktopImageY,
          scale: reducedMotion ? 1 : desktopImageScale,
        }}
        aria-hidden="true"
      />

      <motion.img
        src="/images/healio-hero-markenrelief-v1.webp"
        alt=""
        width="1586"
        height="992"
        loading="eager"
        decoding="async"
        draggable="false"
        className="absolute right-[-1rem] top-[4.75rem] -z-30 h-auto w-[470px] max-w-none select-none md:hidden"
        initial={reducedMotion ? false : { opacity: 0.72 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 1.1, ease: entranceEase }}
        style={{ y: reducedMotion ? 0 : mobileImageY }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,rgba(3,12,21,0.97)_0%,rgba(3,12,21,0.88)_38%,rgba(3,12,21,0.48)_58%,rgba(3,12,21,0.08)_78%)] md:block" />
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(180deg,rgba(3,12,21,0.46)_0%,transparent_28%,transparent_68%,#06131c_100%)] md:block" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,19,28,0.06)_0%,rgba(6,19,28,0.22)_34%,rgba(6,19,28,0.88)_49%,#06131c_64%)] md:hidden" />

      <div className="mx-auto flex min-h-[780px] w-full max-w-[1280px] items-end px-5 pb-10 pt-[21.5rem] sm:px-8 md:min-h-[100svh] md:items-center md:px-8 md:pb-24 md:pt-36 lg:px-8">
        <div className="relative z-10 w-full max-w-[620px] text-left">
          <motion.p
            {...entrance(0.06)}
            className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8ee7ca] sm:text-sm"
          >
            {t('hero.eyebrow')}
          </motion.p>

          <motion.h1
            {...entrance(0.14)}
            id="company-hero-title"
            className="mt-4 max-w-[14ch] font-display text-[2.25rem] font-extrabold leading-[1.02] tracking-[-0.052em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.34)] sm:text-5xl md:mt-5 md:text-[clamp(3.25rem,5vw,4.5rem)] md:leading-[0.98]"
          >
            <span className="block">{t('hero.titleLead')}</span>
            <span className="mt-2 block md:mt-3">
              <HighlightText
                text={`<highlight>${t('hero.titleHighlight')}</highlight>`}
                className="bg-[linear-gradient(135deg,#8ee7ca_0%,#25c990_48%,#1aa875_100%)] bg-clip-text text-transparent"
              />
            </span>
          </motion.h1>

          <motion.p
            {...entrance(0.23)}
            className="mt-5 max-w-[590px] text-base leading-7 text-slate-200 drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)] sm:mt-6 sm:text-lg sm:leading-8"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div {...entrance(0.31)} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link
              to={getPath('potenzialanalyse')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25c990] px-7 py-4 font-display text-sm font-extrabold text-[#07141d] shadow-[0_14px_40px_rgba(37,201,144,0.22)] transition hover:-translate-y-0.5 hover:bg-[#5edcaf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07141d] motion-reduce:transform-none sm:text-base"
            >
              {t('hero.analysisCta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="#unternehmen-rechner"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 py-4 font-display text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07141d] sm:text-base"
            >
              {t('hero.solutionsCta')}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            {...entrance(0.4)}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-xs font-semibold text-white/[0.68] sm:mt-9 sm:text-sm"
          >
            {proof.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHero;
