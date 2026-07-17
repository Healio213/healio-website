import React, { useEffect } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HealthPassHeroVisual from './HealthPassHeroVisual';

const HomeHero = () => {
  const { t, i18n } = useTranslation('home');
  const heroTitle = t('hero.title');
  const displayHeroTitle = (i18n.resolvedLanguage || i18n.language || '').startsWith('de')
    ? heroTitle.replace('Krankenzusatzversicherung', 'Krankenzusatz\u00adversicherung')
    : heroTitle;
  const titleSeparatorIndex = displayHeroTitle.indexOf(', ');
  const titleLead = titleSeparatorIndex >= 0
    ? displayHeroTitle.slice(0, titleSeparatorIndex + 1)
    : displayHeroTitle;
  const titleTail = titleSeparatorIndex >= 0
    ? displayHeroTitle.slice(titleSeparatorIndex + 2)
    : '';

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

      <div className="healio-container grid min-h-[720px] items-center gap-4 px-4 pb-16 sm:gap-7 sm:px-6 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[minmax(0,0.88fr)_minmax(540px,1.12fr)] lg:gap-4 lg:px-8 lg:pb-12">
        <div className="relative z-20 max-w-2xl">
          <p className="home-eyebrow mb-4 sm:mb-6">{t('hero.eyebrow')}</p>
          <h1 id="home-hero-heading" lang={i18n.resolvedLanguage || i18n.language} className="max-w-full [hyphens:manual] font-display text-[2.15rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-white sm:max-w-[14ch] sm:text-5xl lg:w-[min(30ch,calc(100vw-4rem))] lg:max-w-none lg:text-6xl lg:[hyphens:none] xl:w-[min(24ch,calc(100vw-4rem))] xl:text-7xl">
            <span className="lg:block lg:whitespace-nowrap">{titleLead}</span>
            {titleTail && <>{' '}<span className="lg:block">{titleTail}</span></>}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-7 text-slate-300 sm:mt-7 sm:text-xl sm:leading-8">
            {t('hero.description')}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <a href="#schutz" className="home-focus inline-flex items-center justify-center gap-2 rounded-full bg-home-mint px-7 py-4 font-display text-base font-extrabold text-home-midnight shadow-[0_14px_40px_rgba(37,201,144,0.24)] transition hover:-translate-y-0.5 hover:bg-home-mint-active focus-visible:ring-offset-home-midnight">
              {t('hero.primaryCta')}
              <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#so-funktioniert" className="home-focus inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 py-4 font-display text-base font-bold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.1] focus-visible:ring-offset-home-midnight">
              {t('hero.secondaryCta')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative z-10 -mx-4 -mt-10 min-h-[430px] sm:mx-0 sm:mt-0 lg:min-h-[560px] lg:self-start xl:min-h-[580px] 2xl:min-h-[650px]">
          <HealthPassHeroVisual />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
