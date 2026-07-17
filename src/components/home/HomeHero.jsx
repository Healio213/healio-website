import React, { Suspense, lazy, useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HomeProtectionScene = lazy(() => import('./HomeProtectionScene'));

const SceneFallback = ({ centerLabel, labels }) => (
  <div className="grid min-h-[420px] place-items-center" aria-hidden="true">
    <div className="relative h-[340px] w-full max-w-[520px]">
      <div className="absolute left-1/2 top-1/2 grid h-36 w-48 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-white/15 bg-white/[0.08] text-center shadow-2xl shadow-home-mint/10 backdrop-blur-xl">
        <span className="font-display text-lg font-bold text-white">{centerLabel}</span>
      </div>
      {labels.map((label, index) => {
        const positions = ['left-0 top-5', 'right-0 top-16', 'bottom-4 left-1/2 -translate-x-1/2'];
        return (
          <div key={label} className={`absolute ${positions[index]} rounded-2xl border border-white/15 bg-home-midnight/85 px-4 py-3 font-display text-sm font-bold text-white`}>
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-home-mint" />
            {label}
          </div>
        );
      })}
    </div>
  </div>
);

const HomeHero = () => {
  const { t } = useTranslation('home');
  const [reducedMotion, setReducedMotion] = useState(false);
  const sceneLabels = t('hero.sceneModules', { returnObjects: true });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const updateHeroState = () => {
      root.classList.toggle('home-hero-passed', window.scrollY > window.innerHeight * 0.65);
    };
    root.classList.add('home-hero-active');
    updateHeroState();
    window.addEventListener('scroll', updateHeroState, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateHeroState);
      root.classList.remove('home-hero-active', 'home-hero-passed');
    };
  }, []);

  return (
    <section className="relative isolate min-h-[880px] overflow-hidden bg-home-midnight pt-28 text-white lg:min-h-screen lg:pt-32" aria-labelledby="home-hero-heading">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_32%,rgba(37,201,144,0.15),transparent_34%),radial-gradient(circle_at_18%_82%,rgba(78,118,255,0.12),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute left-[8%] top-36 -z-10 h-72 w-72 rounded-full border border-white/[0.06]" />
      <div className="absolute left-[14%] top-48 -z-10 h-48 w-48 rounded-full border border-home-mint/10" />

      <div className="healio-container grid min-h-[720px] items-center gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] lg:gap-8 lg:px-8 lg:pb-16">
        <div className="relative z-20 max-w-2xl">
          <p className="home-eyebrow mb-6">{t('hero.eyebrow')}</p>
          <h1 id="home-hero-heading" className="max-w-[14ch] font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            {t('hero.description')}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#schutz" className="home-focus inline-flex items-center justify-center gap-2 rounded-full bg-home-mint px-7 py-4 font-display text-base font-extrabold text-home-midnight shadow-[0_14px_40px_rgba(37,201,144,0.24)] transition hover:-translate-y-0.5 hover:bg-home-mint-active focus-visible:ring-offset-home-midnight">
              {t('hero.primaryCta')}
              <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#so-funktioniert" className="home-focus inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 py-4 font-display text-base font-bold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.1] focus-visible:ring-offset-home-midnight">
              {t('hero.secondaryCta')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-slate-300">
            {sceneLabels.map((label) => (
              <span key={label} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-home-mint" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative -mx-4 min-h-[430px] sm:mx-0 lg:min-h-[620px]">
          <div className="absolute inset-x-[12%] bottom-[8%] h-20 rounded-[50%] bg-home-mint/15 blur-3xl" aria-hidden="true" />
          <Suspense fallback={<SceneFallback centerLabel={t('hero.sceneCenter')} labels={sceneLabels} />}>
            <HomeProtectionScene reducedMotion={reducedMotion} centerLabel={t('hero.sceneCenter')} labels={sceneLabels} />
          </Suspense>
          <p className="absolute inset-x-0 bottom-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {t('hero.sceneLabel')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
