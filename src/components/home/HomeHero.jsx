import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { trackEvent } from '@/lib/analytics';

const entranceEase = [0.16, 1, 0.3, 1];

const switchVisuals = {
  private: { kind: 'family', tone: 'mint' },
  employer: { kind: 'protection', tone: 'sky' },
  practice: { kind: 'ambulant', tone: 'butter' },
};

const HomeHero = () => {
  const { t, i18n } = useTranslation('home');
  const { getPath } = useLanguage();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 900], [0, 72]);
  const backgroundScale = useTransform(scrollY, [0, 900], [1.035, 1.08]);
  const titleLead = t('hero.titleLead');
  const titleAccent = t('hero.titleAccent');
  const switchItems = t('hero.switch', { returnObjects: true });
  const switchList = Array.isArray(switchItems) ? switchItems : [];

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

      <div className="healio-container flex min-h-[calc(100svh-7rem)] w-full items-center px-4 pb-14 sm:px-6 lg:min-h-[calc(100vh-8rem)] lg:px-8 lg:pb-12">
        <div className="relative z-20 w-full max-w-[1060px]">
          <motion.h1
            {...entrance(0.08)}
            id="home-hero-heading"
            lang={i18n.resolvedLanguage || i18n.language}
            className="max-w-[20ch] [hyphens:manual] font-display text-[2.35rem] font-extrabold leading-[1.035] tracking-[-0.045em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] sm:text-[3rem] lg:max-w-[22ch] lg:text-[3.5rem] xl:text-[3.9rem]"
          >
            <span className="block">{titleLead}</span>
            <span className="relative mt-2 inline-block w-fit max-w-full pb-[0.16em] text-[#F4FFF9] drop-shadow-[0_0_26px_rgba(37,201,144,0.32)]">
              <span className="absolute -inset-x-6 -inset-y-2 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,201,144,0.22),rgba(37,201,144,0.06)_48%,transparent_74%)] blur-xl" aria-hidden="true" />
              <span className="relative">{titleAccent}</span>
              <svg className="absolute -bottom-[0.02em] left-0 h-[0.22em] w-full overflow-visible" viewBox="0 0 520 26" preserveAspectRatio="none" aria-hidden="true">
                <path d="M8 17 C 118 7, 224 23, 336 13 S 455 8, 512 12" fill="none" stroke="rgba(37,201,144,0.24)" strokeWidth="14" strokeLinecap="round" className="blur-[5px]" />
                <path d="M8 17 C 118 7, 224 23, 336 13 S 455 8, 512 12" fill="none" stroke="#25C990" strokeWidth="5.5" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p {...entrance(0.17)} className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:mt-6 sm:text-lg sm:leading-8">
            {t('hero.description')}
          </motion.p>

          <motion.nav {...entrance(0.24)} className="mt-7 sm:mt-9" aria-label={t('hero.switchLabel')}>
            <p className="home-eyebrow mb-3 text-home-mint-active sm:mb-4">{t('hero.switchLabel')}</p>
            <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {switchList.map((item) => {
                const visual = switchVisuals[item.key] || switchVisuals.private;
                return (
                  <li key={item.key} className="flex">
                    <Link
                      to={getPath(item.routeKey)}
                      onClick={() => trackEvent('home_switch_click', { component: item.key })}
                      className="home-focus group flex w-full flex-col rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-home-mint/60 hover:bg-white/[0.14] focus-visible:ring-offset-home-midnight motion-reduce:transform-none sm:p-5"
                    >
                      <div className="flex items-center gap-3">
                        <FriendlyIcon kind={visual.kind} tone={visual.tone} size="sm" className="shrink-0" />
                        <span className="font-display text-lg font-extrabold leading-tight text-white">{item.title}</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/85">{item.description}</p>
                      {item.example && (
                        <p className="mt-1.5 text-xs leading-5 text-home-mint-active">{item.example}</p>
                      )}
                      <span className="mt-auto pt-5">
                        <span className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-home-mint px-5 py-2.5 font-display text-sm font-extrabold text-home-midnight shadow-[0_10px_26px_rgba(37,201,144,0.22)] transition group-hover:bg-home-mint-active">
                          {item.cta}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
