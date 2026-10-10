import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Circle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import WhatsAppHelpHint, { useWhatsAppHelp } from '@/components/sections/shared/WhatsAppHelpHint';
import { useReferrer } from '@/hooks/useReferrer';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';
import StationaerDkvAlternative from './StationaerDkvAlternative';

// Frank 07.10.2026: Karten liebevoller gestalten. Jede Karte zeigt oben eine
// Cartoon-Szene, darunter ein weicher Pastellton statt Weiß (wie bei den
// Zahn-Karten).
const tariffOptions = [
  { key: 'sp2', scene: '/images/card-scenes/stationaer-sp2.webp', body: 'bg-[#f4fbf7]', accent: '#25c990', surface: '#eefaf5' },
  { key: 'sp1', scene: '/images/card-scenes/stationaer-sp1.webp', body: 'bg-[#f9f7ff]', accent: '#8176bf', surface: '#f4f1fb' },
  { key: 'spu', scene: '/images/card-scenes/stationaer-spu.webp', body: 'bg-[#fffcf2]', accent: '#c99422', surface: '#fff8e4' },
];

const StationaerTariffSelector = () => {
  const { t } = useTranslation('stationaer');
  const [selected, setSelected] = useState('');
  const referrer = useReferrer();
  const sdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Stationär' });
  const helpVisible = useWhatsAppHelp();
  const scrollToResult = useRef(false);

  // Mobil liegt der Rechner-Button unter allen drei Karten. Nach einer Auswahl
  // holen wir das Ergebnis in den Blick, sobald es gerendert ist.
  const resultRef = useCallback((node) => {
    if (!node || !scrollToResult.current) return;
    scrollToResult.current = false;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    window.requestAnimationFrame(() => {
      node.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }, []);

  const choose = (key) => {
    if (key !== selected) scrollToResult.current = true;
    setSelected(key);
  };

  const calculateLink = selected ? (
    <a
      href={sdkUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackSdkClick(`stationaer-selector-${selected}`, referrer)}
      className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#25c990] px-6 py-3 text-sm font-extrabold text-[#071726] transition hover:-translate-y-0.5 hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ee0b1] sm:w-auto"
    >
      {t('refresh.selector.calculate')}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  ) : null;

  return (
    <section id="tarife" className="scroll-mt-24 bg-[#f5faf8] py-12 md:py-24" aria-labelledby="stationaer-tariffs-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#087454] md:text-xs md:tracking-[0.22em]">
            {t('refresh.selector.eyebrow')}
          </p>
          <h2 id="stationaer-tariffs-heading" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#071726] [text-wrap:balance] sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            {t('refresh.selector.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 [text-wrap:pretty] sm:text-lg">
            {t('refresh.selector.subtitle')}
          </p>
        </div>

        <StationaerDkvAlternative />

        <h3 className="mt-8 font-display text-xl font-extrabold text-[#071726] md:mt-10 sm:text-2xl">
          {t('refresh.selector.sdkTitle')}
        </h3>

        {/* Mobil Wischreihe mit sichtbarer Nachbarkarte; ab md wie zuvor (bis lg
            untereinander, ab lg drei Spalten). */}
        <MobileSwipeRow
          label={t('refresh.selector.title')}
          className="mt-5 min-w-0 md:mt-6"
          desktopClassName="md:grid md:gap-5 lg:grid-cols-3"
        >
          {tariffOptions.map((option) => {
            const features = t(`refresh.selector.options.${option.key}.features`, { returnObjects: true });
            const isSelected = selected === option.key;

            return (
              <article
                key={option.key}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border-2 shadow-[0_2px_8px_rgba(7,17,31,0.08)] transition duration-300 md:shadow-[0_18px_44px_rgba(7,17,31,0.08)] ${option.body} ${
                  isSelected ? 'border-current md:-translate-y-1 md:shadow-[0_24px_55px_rgba(7,17,31,0.14)]' : 'border-[#07111f]/[0.06] md:hover:-translate-y-1 md:hover:border-[#07111f]/[0.12]'
                }`}
                style={{ color: isSelected ? option.accent : undefined }}
              >
                <div className="relative overflow-hidden bg-[#071726]">
                  <img
                    src={option.scene}
                    alt=""
                    aria-hidden="true"
                    width="720"
                    height="480"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/2] w-full object-cover transition duration-500 md:group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  {/* Frank 07.10.2026: keine Beschriftung auf dem Bild, Tarifcode steht hier unten. */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#07111f] ring-1 ring-[#07111f]/10">
                      {isSelected
                        ? <Check className="h-3.5 w-3.5" style={{ color: option.accent }} aria-hidden="true" />
                        : <Circle className="h-3.5 w-3.5" style={{ color: option.accent }} aria-hidden="true" />}
                      {t(`refresh.selector.options.${option.key}.code`)}
                    </span>
                    <p className="text-sm font-extrabold uppercase tracking-[0.12em] md:text-xs md:tracking-[0.16em]" style={{ color: option.accent }}>
                      {t(`refresh.selector.options.${option.key}.useCase`)}
                    </p>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#071726]">
                    {t(`refresh.selector.options.${option.key}.title`)}
                  </h3>
                  <p className="mt-2 text-base font-extrabold md:text-sm" style={{ color: option.accent }}>
                    {t(`refresh.selector.options.${option.key}.price`)}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 md:min-h-[3.25rem] md:text-sm md:leading-relaxed">
                    {t(`refresh.selector.options.${option.key}.description`)}
                  </p>

                  <ul className="mt-5 space-y-3 text-base text-slate-700 md:mt-6 md:text-sm">
                    {(Array.isArray(features) ? features : []).map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: option.accent }} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 md:pt-7">
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => choose(option.key)}
                      className="flex min-h-12 w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3"
                      style={{
                        borderColor: isSelected ? option.accent : '#dbe4e8',
                        backgroundColor: isSelected ? option.surface : '#ffffff',
                        color: isSelected ? option.accent : '#223044',
                        outlineColor: option.accent,
                      }}
                    >
                      {isSelected ? t('refresh.selector.selected') : t('refresh.selector.choose')}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </MobileSwipeRow>

        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected}
              ref={resultRef}
              id="stationaer-selector-result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-5 flex max-w-4xl scroll-mb-24 flex-col items-center justify-between gap-5 rounded-[1.6rem] bg-[#071726] px-6 py-6 text-white md:mt-8 shadow-[0_20px_55px_rgba(7,23,38,0.18)] sm:flex-row sm:px-8"
              aria-live="polite"
            >
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#5ee0b1] md:text-xs md:tracking-[0.18em]">
                  {t('refresh.selector.resultEyebrow')}
                </p>
                <p className="mt-1 font-display text-xl font-extrabold sm:text-2xl">
                  {t(`refresh.selector.options.${selected}.result`)}
                </p>
                <p className="mt-1 text-base leading-relaxed text-slate-300 md:text-sm md:leading-relaxed">
                  {t('refresh.selector.resultNote')}
                </p>
              </div>
              {helpVisible ? (
                <div className="flex w-full shrink-0 flex-col items-center gap-3 sm:w-auto sm:max-w-xs sm:items-stretch">
                  {calculateLink}
                  <WhatsAppHelpHint placement="stationaer-rechner" variant="line" tone="dark" text={t('refresh.help.result')} />
                </div>
              ) : calculateLink}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto mt-3 max-w-2xl text-center text-base font-semibold text-slate-500 md:mt-7 md:text-sm"
              aria-live="polite"
            >
              {t('refresh.selector.empty')}
            </motion.p>
          )}
        </AnimatePresence>

        <WhatsAppHelpHint placement="stationaer-tarifwahl" variant="line" text={t('refresh.help.selector')} className="mx-auto mt-5 max-w-2xl text-center md:mt-6" />

        <p className="mx-auto mt-5 max-w-4xl text-center text-sm leading-relaxed text-slate-500 md:mt-6 md:text-xs md:leading-relaxed">
          {t('refresh.selector.disclosure')}
        </p>
      </div>
    </section>
  );
};

export default StationaerTariffSelector;
