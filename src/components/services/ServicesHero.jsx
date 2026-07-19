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
  const routes = t('hero.routes', { returnObjects: true });

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

      <div className="healio-container relative z-10 grid w-full gap-10 px-4 pb-14 sm:gap-16 sm:px-6 sm:pb-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14 lg:px-8 lg:pb-24">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#8EE7CA]">
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-6 max-w-[12ch] [hyphens:manual] font-display text-[2.65rem] font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[clamp(3.8rem,5.3vw,5rem)]">
            <span className="block">{t('hero.titleLine1')}</span>
            {' '}
            <span className="mt-2 block bg-gradient-to-r from-[#8EE7CA] via-[#25C990] to-[#77BDFB] bg-clip-text text-transparent">
              {t('hero.titleLine2')}
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            {t('hero.description')}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#schutz-kompass"
              className="home-focus inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#25C990] px-7 py-4 font-display text-sm font-extrabold text-[#07111F] shadow-[0_16px_44px_rgba(37,201,144,0.22)] transition hover:-translate-y-0.5 hover:bg-[#5EDCAF] focus-visible:ring-offset-[#07111F] motion-reduce:transform-none"
            >
              {t('hero.primaryCta')}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              to={getPath('terminvereinbarung')}
              className="home-focus inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.055] px-7 py-4 font-display text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/[0.1] focus-visible:ring-offset-[#07111F]"
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
          className="relative min-w-0 overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0B1B27]/85 p-5 shadow-[0_35px_110px_rgba(0,0,0,0.34)] backdrop-blur sm:p-7 lg:p-8"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#8EE7CA]">
                {t('hero.compassEyebrow')}
              </p>
              <p className="mt-2 font-display text-lg font-extrabold text-white sm:text-xl">
                {t('hero.compassTitle')}
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 font-display text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-400">
              01—03
            </span>
          </div>

          <div className="relative mt-2">
            <span className="absolute bottom-6 left-[1.22rem] top-6 w-px bg-gradient-to-b from-[#25C990] via-[#25C990]/35 to-white/10 sm:left-[1.47rem]" aria-hidden="true" />
            {routes.map((route, index) => (
              <motion.a
                key={route.key}
                href={`#${route.anchor}`}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.28 + index * 0.09 }}
                className="home-focus group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/10 py-6 last:border-b-0 sm:grid-cols-[3rem_1fr_auto] sm:gap-4 sm:py-7"
              >
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-[#25C990]/35 bg-[#07111F] font-display text-[0.68rem] font-extrabold tracking-[0.12em] text-[#8EE7CA] transition group-hover:border-[#25C990] group-hover:bg-[#25C990] group-hover:text-[#07111F] sm:h-12 sm:w-12">
                  {route.number}
                </span>
                <span>
                  <span className="block font-display text-2xl font-extrabold tracking-[-0.035em] text-white transition group-hover:text-[#8EE7CA] sm:text-3xl">
                    {route.label}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-400 sm:text-base">{route.description}</span>
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition group-hover:border-[#25C990] group-hover:bg-[#25C990] group-hover:text-[#07111F]">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-2 hidden rounded-2xl bg-white/[0.045] px-5 py-4 text-sm leading-6 text-slate-400 sm:block">
            <span className="font-bold text-white">{t('hero.compassNoteStrong')}</span>{' '}
            {t('hero.compassNote')}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
