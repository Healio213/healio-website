import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const choiceKeys = ['sp2', 'sp1', 'spu'];

const StationaerHero = () => {
  const { t } = useTranslation('stationaer');

  return (
    <section
      className="relative isolate overflow-hidden bg-[#071726] px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-40"
      aria-labelledby="stationaer-hero-heading"
    >
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#25c990]/16 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#789bd7]/14 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true" />

      <div className="healio-container relative grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="min-w-0 w-full max-w-3xl"
        >
          <p className="font-display text-xs font-bold uppercase tracking-[0.23em] text-[#5ee0b1] sm:text-sm">
            {t('refresh.hero.eyebrow')}
          </p>
          <h1
            id="stationaer-hero-heading"
            className="mt-5 max-w-[13ch] font-display text-[clamp(2.65rem,6.5vw,5.65rem)] font-extrabold leading-[0.98] tracking-[-0.055em] [text-wrap:balance]"
          >
            {t('refresh.hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-200 sm:text-lg lg:text-xl">
            {t('refresh.hero.subtitle')}
          </p>

          <a
            href="#tarife"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25c990] px-7 py-3.5 font-extrabold text-[#071726] shadow-[0_14px_36px_rgba(37,201,144,0.24)] transition hover:-translate-y-0.5 hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ee0b1]"
          >
            {t('refresh.hero.cta')}
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-300 sm:text-sm">
            {t('refresh.hero.micro', { returnObjects: true }).map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
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
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-gradient-to-br from-[#eefaf5] via-white to-[#fff5d9] p-5 text-[#071726] shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-7">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full border border-[#25c990]/15" aria-hidden="true" />
            <div className="relative grid min-h-[25rem] grid-cols-[0.9fr_1.1fr] items-end sm:min-h-[29rem]">
              <div className="relative z-10 min-w-0 self-end">
                <img
                  src="/images/friendly-icons/decision-choice.webp"
                  alt=""
                  width="512"
                  height="512"
                  className="-ml-5 w-[15rem] max-w-none sm:-ml-7 sm:w-[19rem]"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="relative z-20 flex min-w-0 flex-col gap-3 self-center py-5">
                <p className="mb-1 font-display text-sm font-extrabold leading-tight text-[#0b6048] sm:text-base">
                  {t('refresh.hero.visualTitle')}
                </p>
                {choiceKeys.map((key, index) => (
                  <div
                    key={key}
                    className={`rounded-2xl border bg-white/95 p-3.5 shadow-[0_12px_30px_rgba(39,63,72,0.10)] sm:p-4 ${
                      index === 0 ? 'border-[#b9e6d6]' : index === 1 ? 'border-[#d7d3ee]' : 'border-[#ead8a7]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                        {t(`refresh.hero.choices.${key}.code`)}
                      </span>
                      <span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? 'bg-[#25c990]' : index === 1 ? 'bg-[#8a80c9]' : 'bg-[#e6b946]'}`} />
                    </div>
                    <p className="mt-1 text-sm font-extrabold leading-tight text-[#071726] sm:text-base">
                      {t(`refresh.hero.choices.${key}.label`)}
                    </p>
                    <p className="mt-1 text-[0.7rem] font-medium leading-snug text-slate-500 sm:text-xs">
                      {t(`refresh.hero.choices.${key}.note`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StationaerHero;
