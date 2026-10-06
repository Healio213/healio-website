import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const ServicesHero = () => {
  const { t } = useTranslation('leistungen');
  const { getPath } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const orientationFacts = t('hero.orientationFacts', { returnObjects: true });

  return (
    <section className="relative isolate flex min-h-[820px] w-full items-center overflow-hidden bg-[#07111F] pt-28 text-white sm:min-h-[860px] lg:min-h-screen lg:pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
        }}
      />
      <div className="pointer-events-none absolute -left-48 top-28 h-[36rem] w-[36rem] rounded-full bg-[#25C990]/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[#5E8BFF]/10 blur-[130px]" aria-hidden="true" />

      <div className="healio-container relative z-10 grid w-full gap-8 px-4 pb-8 sm:gap-16 sm:px-6 sm:pb-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14 lg:px-8 lg:pb-24">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[#8EE7CA] md:text-xs">
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-4 sm:mt-6 max-w-[12ch] [hyphens:manual] font-display text-[clamp(2.25rem,12.3vw,2.65rem)] font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[clamp(3.25rem,5.5vw,4.4rem)]">
            <span className="block">{t('hero.titleLine1')}</span>
            {' '}
            <span className="mt-2 block bg-gradient-to-r from-[#8EE7CA] via-[#25C990] to-[#77BDFB] bg-clip-text text-transparent">
              {t('hero.titleLine2')}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:mt-7 sm:text-xl sm:leading-7">
            {t('hero.description')}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <a
              href="#schutz-kompass"
              className="home-focus inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#25C990] px-7 py-4 font-display text-base font-extrabold text-[#07111F] shadow-[0_16px_44px_rgba(37,201,144,0.22)] transition hover:-translate-y-0.5 hover:bg-[#5EDCAF] focus-visible:ring-offset-[#07111F] motion-reduce:transform-none"
            >
              {t('hero.primaryCta')}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              to={getPath('terminvereinbarung')}
              className="home-focus inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.055] px-7 py-4 font-display text-base font-bold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/[0.1] focus-visible:ring-offset-[#07111F]"
            >
              {t('hero.secondaryCta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 hidden flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 sm:flex">
            {t('hero.proof', { returnObjects: true }).map((item) => (
              <span key={item} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25C990]" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-w-0 flex-col overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0B1B27]/85 p-5 shadow-[0_35px_110px_rgba(0,0,0,0.34)] backdrop-blur sm:min-h-[500px] sm:p-9 lg:p-10"
        >
          <div className="relative z-10 max-w-[25rem]">
            <h2 className="font-friendly text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl">{t('hero.compassTitle')}</h2>
            <p className="mt-5 text-base font-bold leading-7 text-white sm:text-lg">{t('hero.compassNoteStrong')}</p>
          </div>

          {/* Figur und Bereiche liegen in einer eigenen Zeile unter dem Text, damit sich nichts überlagert. */}
          <div className="relative mt-auto flex items-end justify-between gap-3 pt-6 sm:pt-8">
            <div className="relative z-10 flex min-w-0 flex-1 flex-wrap gap-2">
              {(Array.isArray(orientationFacts) ? orientationFacts : []).map((fact) => (
                <span key={fact} className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-sm font-bold text-slate-200 backdrop-blur-sm md:text-xs">{fact}</span>
              ))}
            </div>

            <div className="relative -mb-[3.25rem] -mr-12 w-[176px] shrink-0 sm:-mb-[4.25rem] sm:-mr-11 sm:w-[270px] lg:-mb-[4.5rem] lg:-mr-12" aria-hidden="true">
              <span className="absolute inset-12 rounded-full bg-[#25C990]/15 blur-3xl" />
              <img
                src="/images/friendly-icons/decision-thinking.webp"
                alt=""
                width="512"
                height="512"
                loading="eager"
                decoding="async"
                className="relative h-auto w-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
