import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ANIMALS = [
  {
    value: 'dog',
    src: '/images/veterinary/animal-dog.webp',
    surface: 'from-[#dff7ed] via-[#cdeee3] to-[#bfe6d9]',
    imageClass: 'h-[92%] -bottom-[8%] sm:h-[95%]',
  },
  {
    value: 'cat',
    src: '/images/veterinary/animal-cat.webp',
    surface: 'from-[#eef1f8] via-[#e4e8f2] to-[#d9dce8]',
    imageClass: 'h-[91%] -bottom-[5%] sm:h-[94%]',
  },
  {
    value: 'horse',
    src: '/images/veterinary/animal-horse.webp',
    surface: 'from-[#fff1d8] via-[#f7dfbd] to-[#e9c894]',
    imageClass: 'h-[98%] -bottom-[8%] sm:h-[104%]',
  },
];

const AnimalPortrait = ({ animal, active, title, description, onClick }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`group relative isolate min-h-[174px] overflow-hidden rounded-[1.65rem] bg-gradient-to-br text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25c990]/35 sm:min-h-[270px] sm:rounded-[2rem] ${animal.surface} ${
      active
        ? '-translate-y-1 shadow-[0_24px_55px_rgba(7,24,39,0.2),0_0_0_3px_#25c990]'
        : 'shadow-[0_14px_30px_rgba(7,24,39,0.1)] hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(7,24,39,0.16)]'
    }`}
  >
    <span className="absolute inset-x-[12%] bottom-6 h-8 rounded-[50%] bg-[#102b30]/15 blur-lg sm:bottom-8 sm:h-12" aria-hidden="true" />
    <img
      src={animal.src}
      alt=""
      width="640"
      height="640"
      loading="lazy"
      decoding="async"
      className={`absolute left-1/2 w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_18px_20px_rgba(33,42,39,0.2)] transition-transform duration-500 group-hover:scale-[1.035] ${animal.imageClass}`}
    />
    <span className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#071827]/95 via-[#071827]/58 to-transparent" aria-hidden="true" />
    <span className="absolute inset-x-0 bottom-0 z-10 p-3.5 text-white sm:p-5">
      <span className="flex items-end justify-between gap-2">
        <span>
          <span className="block font-friendly text-xl font-bold leading-none sm:text-3xl">{title}</span>
          <span className="mt-1.5 hidden max-w-[18ch] text-xs leading-snug text-white/75 sm:block">{description}</span>
        </span>
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${active ? 'border-[#76e2bd] bg-[#25c990] text-[#062319]' : 'border-white/45 bg-black/10 text-transparent backdrop-blur-sm'}`}>
          <Check className="h-4 w-4" />
        </span>
      </span>
    </span>
  </button>
);

const ProtectionChoice = ({ active, code, title, description, onClick }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`group relative min-h-[220px] overflow-hidden rounded-[1.6rem] p-6 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25c990]/35 sm:min-h-[250px] sm:p-8 ${
      active
        ? 'bg-[#f8efdc] text-[#10272d] shadow-[0_18px_40px_rgba(0,0,0,0.2)]'
        : 'bg-white/[0.055] text-white hover:bg-white/[0.09]'
    }`}
  >
    <span className={`absolute -right-2 -top-7 font-display text-[6rem] font-black leading-none tracking-[-0.08em] transition sm:text-[8rem] ${active ? 'text-[#0b302a]/[0.06]' : 'text-white/[0.035]'}`} aria-hidden="true">
      {code}
    </span>
    <span className="relative flex h-full flex-col">
      <span className={`mb-7 inline-flex h-8 w-8 items-center justify-center self-end rounded-full border ${active ? 'border-[#25c990] bg-[#25c990] text-[#062319]' : 'border-white/30 text-transparent'}`}>
        <Check className="h-4 w-4" />
      </span>
      <span className="mt-auto block font-friendly text-3xl font-bold leading-none sm:text-4xl">{title}</span>
      <span className={`mt-3 block max-w-[30ch] text-sm leading-relaxed ${active ? 'text-slate-600' : 'text-slate-300'}`}>{description}</span>
    </span>
  </button>
);

const TariffSelection = ({ selection, onSelectionChange }) => {
  const { t } = useTranslation('veterinary');
  const ready = Boolean(selection.animalType && selection.coverage);

  const updateSelection = (key, value) => {
    onSelectionChange((current) => ({ ...current, [key]: value }));
  };

  const animalLabel = selection.animalType
    ? t(`finder.animals.${selection.animalType}.title`)
    : t('finder.profile.animalEmpty');
  const coverageLabel = selection.coverage
    ? t(`finder.coverage.${selection.coverage}.title`)
    : t('finder.profile.coverageEmpty');
  const coverageNamespace = selection.animalType === 'horse' ? 'coverageHorse' : 'coverage';

  return (
    <section
      id="tier-check"
      className="relative scroll-mt-20 overflow-hidden bg-[#f5f0e7] py-20 sm:py-24 lg:py-28"
      aria-labelledby="tier-check-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(37,201,144,0.12),transparent_28%),radial-gradient(circle_at_90%_72%,rgba(218,169,92,0.14),transparent_27%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0d4e40]/20 to-transparent" aria-hidden="true" />

      <div className="healio-container relative px-4 sm:px-6 md:px-8">
        <div className="mb-12 max-w-4xl sm:mb-16">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.24em] text-[#087451]">{t('finder.eyebrow')}</p>
          <h2 id="tier-check-title" className="mt-4 max-w-[18ch] font-display text-[clamp(2.45rem,5vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#10272d] [text-wrap:balance]">
            {t('finder.title')}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#53666a] sm:text-lg">{t('finder.subtitle')}</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div>
            <div className="flex items-baseline gap-4 border-b border-[#163d37]/15 pb-5">
              <span className="font-display text-4xl font-black tracking-[-0.07em] text-[#25c990]">01</span>
              <h3 className="font-friendly text-2xl font-bold text-[#10272d] sm:text-3xl">{t('finder.animalQuestion')}</h3>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-2.5 sm:gap-5">
              {ANIMALS.map((animal) => (
                <AnimalPortrait
                  key={animal.value}
                  animal={animal}
                  active={selection.animalType === animal.value}
                  title={t(`finder.animals.${animal.value}.title`)}
                  description={t(`finder.animals.${animal.value}.description`)}
                  onClick={() => updateSelection('animalType', animal.value)}
                />
              ))}
            </div>

            <div className="mt-14 flex items-baseline gap-4 border-b border-[#163d37]/15 pb-5">
              <span className="font-display text-4xl font-black tracking-[-0.07em] text-[#25c990]">02</span>
              <h3 className="font-friendly text-2xl font-bold text-[#10272d] sm:text-3xl">{t('finder.coverageQuestion')}</h3>
            </div>

            <div className="mt-7 overflow-hidden rounded-[2rem] bg-[#071827] p-2 shadow-[0_28px_65px_rgba(7,24,39,0.22)] sm:p-3">
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                {['full', 'surgery'].map((value) => (
                  <ProtectionChoice
                    key={value}
                    active={selection.coverage === value}
                    code={t(`finder.coverage.${value}.code`)}
                    title={t(`finder.coverage.${value}.title`)}
                    description={t(`finder.${coverageNamespace}.${value}.description`)}
                    onClick={() => updateSelection('coverage', value)}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-pressed={selection.coverage === 'unsure'}
                onClick={() => updateSelection('coverage', 'unsure')}
                className={`mt-2 flex w-full items-center justify-between gap-4 rounded-[1.35rem] px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25c990]/35 sm:mt-3 sm:px-7 ${
                  selection.coverage === 'unsure'
                    ? 'bg-[#25c990] text-[#062319]'
                    : 'bg-white/[0.055] text-white hover:bg-white/[0.09]'
                }`}
              >
                <span>
                  <span className="block font-display text-base font-extrabold">{t('finder.coverage.unsure.title')}</span>
                  <span className={`mt-0.5 block text-xs sm:text-sm ${selection.coverage === 'unsure' ? 'text-[#124b3a]' : 'text-slate-400'}`}>{t(`finder.${coverageNamespace}.unsure.description`)}</span>
                </span>
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${selection.coverage === 'unsure' ? 'border-[#062319]/25 bg-[#062319] text-[#7be4be]' : 'border-white/25 text-transparent'}`}>
                  <Check className="h-4 w-4" />
                </span>
              </button>
            </div>

            <div
              className={`mt-8 flex flex-col gap-5 rounded-2xl px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${
                ready
                  ? 'bg-[#0d332e] text-white shadow-[0_18px_42px_rgba(7,24,39,0.18)]'
                  : 'border border-[#173b36]/15 bg-white/55 text-[#10272d]'
              }`}
              aria-live="polite"
            >
              <div className="flex min-w-0 items-start gap-3.5">
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ready ? 'bg-[#25c990] text-[#062319]' : 'bg-[#173b36]/8 text-[#71817d]'}`}>
                  <Check className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className={`font-display text-[0.68rem] font-extrabold uppercase tracking-[0.16em] ${ready ? 'text-[#8ee7ca]' : 'text-[#71817d]'}`}>
                    {ready ? t('finder.review.readyLabel') : t('finder.review.openLabel')}
                  </p>
                  <p className="mt-1 font-friendly text-2xl font-bold leading-tight">
                    {ready ? `${animalLabel} · ${coverageLabel}` : t('finder.review.openTitle')}
                  </p>
                  <p className={`mt-1.5 max-w-2xl text-sm leading-relaxed ${ready ? 'text-slate-300' : 'text-[#5d6b6d]'}`}>
                    {ready ? t('finder.review.readyText') : t('finder.review.openText')}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                disabled={!ready}
                onClick={() => document.getElementById('vet-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="h-auto shrink-0 rounded-full bg-[#25c990] px-6 py-3.5 font-display font-extrabold text-[#062319] shadow-[0_12px_26px_rgba(37,201,144,0.2)] hover:bg-[#5ee0b1] disabled:cursor-not-allowed disabled:bg-[#d8d0bf] disabled:text-[#857f72]"
              >
                {ready ? t('finder.ctaReady') : t('finder.ctaIncomplete')}
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <p className="mt-3 text-center text-xs leading-relaxed text-[#6f7772]">{t('finder.disclaimer')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TariffSelection;
