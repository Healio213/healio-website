import React, { useEffect, useRef } from 'react';
import MobileScene from '@/components/desktop/MobileScene';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { KASSENBOOST_COMPARE_URL } from '@/config/kassenBoost';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import DesktopLead from '@/components/desktop/DesktopLead';
import useDesktopLayout from '@/hooks/useDesktopLayout';
import { trackEvent } from '@/lib/analytics';
import { getDesktopLeadContent } from '@/components/desktop/desktopLeadContent';
import { GUIDED_CALLBACK_ENABLED } from '@/lib/guided-callback';
import GuidedCallbackButton from '@/components/guided/GuidedCallbackButton';
import { getGuidedHomeContent } from './guidedHomeContent';

const entranceEase = [0.16, 1, 0.3, 1];

const switchVisuals = {
  private: { kind: 'family', tone: 'mint' },
  employer: { kind: 'protection', tone: 'sky' },
  practice: { kind: 'ambulant', tone: 'butter' },
};

const HomeHero = () => {
  const { t, i18n } = useTranslation('home');
  const { lang, getPath } = useLanguage();
  const reducedMotion = useReducedMotion();
  const HeroHeading = useDesktopLayout() ? motion.h2 : motion.h1;
  const heroRef = useRef(null);
  const guidedCopy = getGuidedHomeContent(lang);
  const titleLead = GUIDED_CALLBACK_ENABLED ? guidedCopy.titleLead : t('hero.titleLead');
  const titleAccent = GUIDED_CALLBACK_ENABLED ? guidedCopy.titleAccent : t('hero.titleAccent');
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

  // Mobil: kurze Texte, die große Szene und die ursprünglichen Wischkarten bleiben sichtbar.
  // Der begleitete Weg nutzt gebuchte Gesprächstermine mit dem Healio-Team.
  return (
    <div ref={heroRef}>
      <DesktopLead surface="home" language={lang} />
      <section
      className="relative isolate flex lg:hidden w-full items-center md:min-h-[860px] overflow-hidden bg-home-midnight pt-24 text-white md:pt-28 lg:min-h-screen lg:pt-32"
      aria-labelledby="home-hero-heading"
    >

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(3,12,20,0.62)_0%,rgba(3,12,20,0.48)_30%,rgba(3,12,20,0.72)_76%,rgba(3,12,20,0.94)_100%)] md:bg-[linear-gradient(90deg,rgba(3,12,20,0.9)_0%,rgba(3,12,20,0.77)_43%,rgba(3,12,20,0.28)_73%,rgba(3,12,20,0.5)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_82%,rgba(37,201,144,0.22),transparent_44%)]" />

      <div className="healio-container flex w-full items-center px-4 pb-8 sm:px-6 md:min-h-[calc(100svh-7rem)] md:pb-14 lg:min-h-[calc(100vh-8rem)] lg:px-8 lg:pb-12">
        <div className="relative z-20 flex w-full max-w-[1060px] flex-col">
          <MobileScene surface="home" className="mb-5 !mx-0 sm:mb-7" />
          <HeroHeading
            {...entrance(0.08)}
            id="home-hero-heading"
            lang={i18n.resolvedLanguage || i18n.language}
            className="max-w-[20ch] [hyphens:manual] font-display text-[2.35rem] font-extrabold leading-[1.08] tracking-[-0.025em] md:leading-[1.035] md:tracking-[-0.045em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] md:text-[3rem] lg:max-w-[22ch] lg:text-[3.5rem] xl:text-[3.9rem]"
          >
            <span className="block md:hidden">
              <span className="block">{GUIDED_CALLBACK_ENABLED ? guidedCopy.titleLead : t('mobile.hero.titleLead')}</span>
              <span className="block text-home-mint-active">{GUIDED_CALLBACK_ENABLED ? guidedCopy.titleAccent : t('mobile.hero.titleAccent')}</span>
            </span>
            <span className="hidden md:block">{titleLead}</span>{' '}
            <span className="relative mt-2 hidden w-fit md:inline-block max-w-full pb-[0.16em] text-[#F4FFF9] drop-shadow-[0_0_26px_rgba(37,201,144,0.32)]">
              <span className="absolute -inset-x-6 -inset-y-2 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,201,144,0.22),rgba(37,201,144,0.06)_48%,transparent_74%)] blur-xl" aria-hidden="true" />
              <span className="relative">{titleAccent}</span>
              <svg className="absolute -bottom-[0.02em] left-0 h-[0.22em] w-full overflow-visible" viewBox="0 0 520 26" preserveAspectRatio="none" aria-hidden="true">
                <path d="M8 17 C 118 7, 224 23, 336 13 S 455 8, 512 12" fill="none" stroke="rgba(37,201,144,0.24)" strokeWidth="14" strokeLinecap="round" className="blur-[5px]" />
                <path d="M8 17 C 118 7, 224 23, 336 13 S 455 8, 512 12" fill="none" stroke="#25C990" strokeWidth="5.5" strokeLinecap="round" />
              </svg>
            </span>
          </HeroHeading>

          <div className="order-1 mt-4 md:hidden">
            <p className="max-w-[32ch] text-base leading-6 text-white/90">{GUIDED_CALLBACK_ENABLED ? guidedCopy.description : t('mobile.hero.description')}</p>
            {!GUIDED_CALLBACK_ENABLED && <Link
              to={getPath('ambulant')}
              className="home-focus mt-3 inline-flex min-h-11 items-center gap-2 font-bold leading-6 text-home-mint-active underline underline-offset-4"
              onClick={() => trackEvent('home_budget_link', { placement: 'mobile-hero' })}
            >
              {t('mobile.hero.budgetLink')}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>}
          </div>

          <motion.p {...entrance(0.17)} className="order-1 mt-4 hidden max-w-2xl md:block text-base font-medium leading-6 text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:mt-6 sm:text-lg sm:leading-8">
            {GUIDED_CALLBACK_ENABLED ? guidedCopy.description : t('hero.description')}{' '}
            {!GUIDED_CALLBACK_ENABLED && <Link to={getPath('ambulant')} className="whitespace-nowrap font-bold text-home-mint-active underline underline-offset-4" onClick={() => trackEvent('home_budget_link', { placement: 'mobile-hero' })}>{getDesktopLeadContent('home', lang).budgetLink}</Link>}
          </motion.p>

          <motion.div {...entrance(0.21)} className="order-2 mt-6 flex flex-col items-start md:mt-5">
            {GUIDED_CALLBACK_ENABLED ? (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <GuidedCallbackButton product="any" className="home-focus inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-home-mint px-6 py-3 font-display text-base font-extrabold leading-6 text-home-midnight transition hover:bg-home-mint-active">
                  {guidedCopy.cta}<ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                </GuidedCallbackButton>
                <Link to={getPath('leistungen')} className="home-focus inline-flex min-h-11 items-center gap-2 font-semibold text-home-mint-active underline underline-offset-4">
                  {guidedCopy.discoverCta}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            ) : <a
              href={KASSENBOOST_COMPARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('home_kassenboost_link', { placement: 'mobile-hero' })}
              className="home-focus inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-home-mint px-6 py-3 font-display text-base font-extrabold leading-6 text-home-midnight transition hover:bg-home-mint-active"
            >
              <span className="md:hidden">{t('mobile.hero.primaryCta')}</span><span className="hidden md:inline">{t('hero.primaryCta')}</span><ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
            </a>}
            <p className={`mt-3 text-sm leading-6 text-white/80 ${GUIDED_CALLBACK_ENABLED ? 'max-w-[42ch]' : ''}`}>{GUIDED_CALLBACK_ENABLED ? guidedCopy.hint : <><span className="md:hidden">{t('mobile.hero.ctaHint')}</span><span className="hidden md:inline">{t('hero.ctaHint')}</span></>}</p>
          </motion.div>

          <motion.nav {...entrance(0.24)} className="order-3 mt-5 sm:mt-9" aria-label={t('hero.switchLabel')}>
            <p className="home-eyebrow mb-2 text-sm text-home-mint-active sm:mb-4 md:text-xs">{t('hero.switchLabel')}</p>
            {/* Mobil eine Wischreihe mit sichtbarer Nachbarkarte, ab md das bisherige Dreier-Raster. */}
            <MobileSwipeRow
              label={t('hero.switchLabel')}
              dotsTone="dark"
              desktopClassName="md:grid md:grid-cols-3 md:gap-4"
              itemClassName="flex"
            >
              {switchList.map((item) => {
                const visual = switchVisuals[item.key] || switchVisuals.private;
                return (
                  <Link
                    key={item.key}
                    to={getPath(item.routeKey)}
                    onClick={() => trackEvent('home_switch_click', { component: item.key })}
                    className="home-focus group flex w-full flex-col rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-home-mint/60 hover:bg-white/[0.14] focus-visible:ring-offset-home-midnight motion-reduce:transform-none sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <FriendlyIcon kind={visual.kind} tone={visual.tone} size="sm" className="shrink-0" />
                      <span className="font-display text-lg font-extrabold leading-tight text-white"><span className="md:hidden">{t(`mobile.hero.paths.${item.key}`)}</span><span className="hidden md:inline">{item.title}</span></span>
                    </div>
                    <p className="mt-2 text-base leading-6 text-white/85 sm:mt-3 md:text-sm md:leading-6"><span className="md:hidden">{t(`mobile.hero.switchDescriptions.${item.key}`)}</span><span className="hidden md:inline">{item.description}</span></p>
                    {item.example && (
                      <p className="mt-1.5 hidden text-sm leading-5 text-home-mint-active md:block md:text-xs md:leading-5">{item.example}</p>
                    )}
                    <span className="mt-auto pt-3 sm:pt-5">
                      <span className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-home-mint px-5 py-2.5 font-display text-sm font-extrabold text-home-midnight shadow-[0_10px_26px_rgba(37,201,144,0.22)] transition group-hover:bg-home-mint-active">
                        <span className="md:hidden">{t(`mobile.hero.switchCtas.${item.key}`)}</span><span className="hidden md:inline">{item.cta}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                );
              })}
            </MobileSwipeRow>
          </motion.nav>
        </div>
      </div>
      </section>
    </div>
  );
};

export default HomeHero;
