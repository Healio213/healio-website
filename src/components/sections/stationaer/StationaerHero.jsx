import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import useDesktopLayout from '@/hooks/useDesktopLayout';

const choiceKeys = ['sp2', 'sp1', 'spu'];

// Jede Tarif-Karte bekommt ihre eigene Figur und einen warmen Farbton
// (Frank 07.10.2026: „liebevoller und sympathischer“ statt Farbpunkt).
const choiceStyles = {
  sp2: { icon: '/images/friendly-icons/hospital-room.webp', tone: 'mint', card: 'from-[#f4fbf7] to-[#e2f4eb] ring-[#cde8dc]' },
  sp1: { icon: '/images/friendly-icons/medical-stethoscope.webp', tone: 'lavender', card: 'from-[#f9f7ff] to-[#ece8fb] ring-[#dcd6f1]' },
  spu: { icon: '/images/friendly-icons/protection-shield.webp', tone: 'butter', card: 'from-[#fffcf2] to-[#fcf0cf] ring-[#efe0b2]' },
};

const StationaerHero = () => {
  const HeroHeading = useDesktopLayout() ? 'h2' : 'h1';
  const { t } = useTranslation('stationaer');

  return (
    <section
      className="relative isolate overflow-hidden bg-[#071726] text-white"
      aria-labelledby="stationaer-hero-heading"
    >
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#25c990]/16 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#789bd7]/14 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true" />

      {/* Inhalt bündig zum Logo im Header (max-w-7xl mit px-4/6/8, wie
          Startseite und /unternehmen); Oberkante pt-28/md:pt-32 unter dem
          festen Header. */}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-4 pb-10 pt-28 sm:px-6 sm:pb-20 md:gap-12 md:pt-32 lg:grid-cols-[minmax(0,1.14fr)_minmax(0,0.86fr)] lg:gap-12 lg:px-8 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="min-w-0 w-full max-w-3xl"
        >
          <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#5ee0b1] [overflow-wrap:anywhere] sm:tracking-[0.23em]">
            {t('refresh.hero.eyebrow')}
          </p>
          <HeroHeading
            id="stationaer-hero-heading"
            className="mt-4 max-w-[17ch] font-display text-[2.15rem] md:mt-5 md:text-[clamp(2.4rem,4.6vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em] [text-wrap:balance]"
          >
            {t('refresh.hero.title')}
          </HeroHeading>
          <p className="mt-4 max-w-2xl text-base font-medium md:mt-6 leading-relaxed text-slate-200 sm:text-lg lg:text-xl">
            {t('refresh.hero.subtitle')}
          </p>

          <a
            href="#tarife"
            className="mt-6 inline-flex min-h-12 md:mt-8 items-center justify-center gap-2 rounded-full bg-[#25c990] px-7 py-3.5 font-extrabold text-[#071726] shadow-[0_14px_36px_rgba(37,201,144,0.24)] transition hover:-translate-y-0.5 hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ee0b1]"
          >
            {t('refresh.hero.cta')}
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-base font-semibold text-slate-300 md:text-sm">
            {/* Mobil nur der Wartezeit-Hinweis (Eintrag 1): "Drei Tarifwege klar
                getrennt" (Eintrag 0) wiederholt die Auswahlkarte direkt darunter
                (Experiment Handy-Conversion 10/2026). Ab md bleiben beide. */}
            {t('refresh.hero.micro', { returnObjects: true }).map((item, index) => (
              <span key={item} className={`inline-flex items-center gap-2${index === 0 ? ' max-md:hidden' : ''}`}>
                <Check className="h-4 w-4 text-[#5ee0b1]" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative mx-auto min-w-0 w-full max-w-[35rem]"
          aria-label={t('refresh.hero.visualAria')}
        >
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-gradient-to-br from-[#eefaf5] via-white to-[#fff5d9] p-4 text-[#071726] shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-7">
            {/* Mobil: kleine Figur neben der Frage, darunter die drei Wege als
                Wischreihe; ab md (768 px) unverändert Figur links und
                gestapelte Karten rechts. */}
            <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 md:min-h-[29rem] md:grid-cols-[0.9fr_1.1fr] md:items-end md:gap-x-0">
              <div className="relative z-10 min-w-0 md:self-end">
                <img
                  src="/images/friendly-icons/decision-choice.webp"
                  alt=""
                  width="512"
                  height="512"
                  className="w-24 max-w-none md:-ml-7 md:w-[19rem]"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="contents md:relative md:z-20 md:flex md:min-w-0 md:flex-col md:gap-3 md:self-center md:py-5">
                <p className="font-display text-base font-extrabold leading-tight text-[#0b6048] md:mb-1 md:leading-6">
                  {t('refresh.hero.visualTitle')}
                </p>
                <MobileSwipeRow
                  label={t('refresh.hero.visualTitle')}
                  className="col-span-2 mt-2 min-w-0 md:col-span-1 md:mt-0"
                  desktopClassName="-mx-4 scroll-pl-4 px-4 sm:-mx-7 sm:scroll-pl-7 sm:px-7 md:mx-0 md:flex md:flex-col md:gap-3 md:px-0"
                  mobileItemWidth="w-[78%]"
                  bleed={false}
                >
                  {choiceKeys.map((key) => (
                    <a
                      key={key}
                      href="#tarife"
                      aria-label={t('refresh.hero.choiceAria', {
                        code: t(`refresh.hero.choices.${key}.code`),
                        label: t(`refresh.hero.choices.${key}.label`),
                      })}
                      className={`block h-full rounded-[1.4rem] bg-gradient-to-br p-4 ring-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b6048] motion-reduce:transform-none motion-reduce:transition-none md:hover:-translate-y-0.5 md:hover:shadow-[0_16px_36px_rgba(39,63,72,0.14)] ${choiceStyles[key].card}`}
                    >
                      <div className="flex items-center gap-3">
                        <FriendlyIcon src={choiceStyles[key].icon} tone={choiceStyles[key].tone} size="sm" />
                        <div className="min-w-0">
                          <span className="inline-flex rounded-full bg-white/85 px-2.5 py-0.5 text-sm font-extrabold uppercase tracking-[0.1em] text-[#0b6048] shadow-[0_1px_2px_rgba(39,63,72,0.08)] md:text-xs">
                            {t(`refresh.hero.choices.${key}.code`)}
                          </span>
                          <p className="mt-1 text-base font-extrabold leading-tight text-[#071726] md:leading-6">
                            {t(`refresh.hero.choices.${key}.label`)}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-base font-medium leading-snug text-slate-600 md:text-sm">
                        {t(`refresh.hero.choices.${key}.note`)}
                      </p>
                    </a>
                  ))}
                </MobileSwipeRow>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StationaerHero;
