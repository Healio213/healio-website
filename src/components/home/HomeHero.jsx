import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import HighlightText from '@/components/ui/HighlightText';

const entranceEase = [0.16, 1, 0.3, 1];

const HomeHero = () => {
  const { t, i18n } = useTranslation('home');
  const reducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 900], [0, 72]);
  const backgroundScale = useTransform(scrollY, [0, 900], [1.035, 1.08]);
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
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? window.innerHeight;
      root.classList.toggle('home-hero-passed', heroBottom <= 0);
    };

    root.classList.add('home-hero-active');
    updateHeroState();
    window.addEventListener('scroll', updateHeroState, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateHeroState);
      root.classList.remove('home-hero-active', 'home-hero-passed');
    };
  }, []);

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
      ref={heroRef}
      className="relative isolate flex min-h-[820px] w-full items-center overflow-hidden bg-home-midnight pt-28 text-white sm:min-h-[860px] lg:min-h-screen lg:pt-32"
      aria-labelledby="home-hero-heading"
    >
      <picture className="absolute inset-0 -z-30 overflow-hidden">
        <source srcSet="/hero-bg.webp" type="image/webp" />
        <motion.img
          src="/hero-bg.jpg"
          alt=""
          width="1536"
          height="1024"
          loading="eager"
          {...{ fetchpriority: 'high' }}
          decoding="async"
          draggable="false"
          className="absolute -top-12 left-0 h-[calc(100%+6rem)] w-full select-none object-cover object-[72%_center] md:object-center"
          initial={reducedMotion ? false : { opacity: 0.58 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 1.1, ease: entranceEase }}
          style={{
            y: reducedMotion ? 0 : backgroundY,
            scale: reducedMotion ? 1 : backgroundScale,
          }}
          aria-hidden="true"
        />
      </picture>

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(3,12,20,0.62)_0%,rgba(3,12,20,0.48)_30%,rgba(3,12,20,0.72)_76%,rgba(3,12,20,0.94)_100%)] md:bg-[linear-gradient(90deg,rgba(3,12,20,0.9)_0%,rgba(3,12,20,0.77)_43%,rgba(3,12,20,0.28)_73%,rgba(3,12,20,0.5)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_82%,rgba(31,72,121,0.22),transparent_44%)]" />

      <div className="healio-container flex min-h-[calc(100svh-7rem)] w-full items-center px-4 pb-16 sm:px-6 lg:min-h-[calc(100vh-8rem)] lg:px-8 lg:pb-12">
        <div className="relative z-20 w-full max-w-[940px]">
          <motion.p {...entrance(0.06)} className="home-eyebrow mb-5 sm:mb-6">
            {t('hero.eyebrow')}
          </motion.p>

          <motion.h1
            {...entrance(0.14)}
            id="home-hero-heading"
            lang={i18n.resolvedLanguage || i18n.language}
            className="max-w-[15ch] [hyphens:manual] font-display text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] sm:text-5xl lg:max-w-[18ch] lg:text-[4rem] xl:max-w-[21ch] xl:text-[4.5rem]"
          >
            <span className="block xl:whitespace-nowrap">{titleLead}</span>
            {titleTail && (
              <span className="block">
                <HighlightText text={`<highlight>${titleTail}</highlight>`} />
              </span>
            )}
          </motion.h1>

          <motion.p {...entrance(0.23)} className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:mt-7 sm:text-xl">
            {t('hero.description')}
          </motion.p>

          <motion.div {...entrance(0.31)} className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-3">
            <a href="#schutz" className="home-focus inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-home-mint px-6 py-4 font-display text-base font-extrabold text-home-midnight shadow-[0_14px_40px_rgba(37,201,144,0.24)] transition hover:-translate-y-0.5 hover:bg-home-mint-active focus-visible:ring-offset-home-midnight motion-reduce:transform-none xl:px-7">
              {t('hero.primaryCta')}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#so-funktioniert" className="home-focus inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-6 py-4 font-display text-base font-bold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[0.1] focus-visible:ring-offset-home-midnight xl:px-7">
              {t('hero.secondaryCta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div {...entrance(0.4)} className="mt-9 grid max-w-2xl grid-cols-3 gap-2 border-t border-white/20 pt-6 text-center text-xs font-semibold text-white/75 drop-shadow-[0_2px_8px_rgba(2,8,15,0.9)] sm:mt-11 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3 sm:text-left sm:text-sm">
            {t('hero.proof', { returnObjects: true }).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
