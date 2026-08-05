import React from 'react';
import { CheckCircle2, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

// Schutz auswählen, Möglichkeiten verstehen, digital abschließen, begleitet bleiben
const stepIcons = ['🛡️', '🧮', '✍️', '📱'];
const stepTones = ['sky', 'butter', 'mint', 'lavender'];

const HowHealioWorks = () => {
  const { t } = useTranslation('home');
  const steps = t('process.steps', { returnObjects: true });
  const appFeatures = t('process.appFeatures', { returnObjects: true });

  return (
    <section id="so-funktioniert" className="home-section scroll-mt-20 bg-white" aria-labelledby="how-healio-title">
      <div className="healio-container">
        <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center xl:gap-20">
          <div>
            <p className="home-eyebrow text-emerald-700">{t('process.eyebrow')}</p>
            <h2 id="how-healio-title" className="mt-4 max-w-[14ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-5xl">
              {t('process.title')}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t('process.description')}</p>

            <ol className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {steps.map((step, index) => (
                <li key={step.number} className="min-h-[230px] bg-white p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-5">
                    <FriendlyIcon emoji={stepIcons[index]} label={step.title} tone={stepTones[index]} size="sm" />
                    <span className="font-display text-xs font-extrabold tracking-[0.18em] text-emerald-700">{step.number}</span>
                  </div>
                  <h3 className="mt-7 font-display text-xl font-extrabold text-home-midnight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative overflow-hidden rounded-[2.25rem] bg-home-midnight p-7 text-white shadow-[0_28px_90px_rgba(7,17,31,0.2)] sm:p-9">
            <div className="absolute right-0 top-0 h-56 w-56 translate-x-1/3 -translate-y-1/3 rounded-full border border-home-mint/20" aria-hidden="true" />
            <div className="absolute right-10 top-10 h-36 w-36 rounded-full border border-white/[0.06]" aria-hidden="true" />
            <div className="relative grid gap-8 sm:grid-cols-[1fr_190px] sm:items-center lg:grid-cols-1 xl:grid-cols-[1fr_200px]">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-home-mint">
                  <Smartphone className="h-4 w-4" aria-hidden="true" />
                  {t('process.appEyebrow')}
                </p>
                <h3 className="mt-5 max-w-[12ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] sm:text-4xl">
                  {t('process.appTitle')}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{t('process.appDescription')}</p>
                <ul className="mt-6 space-y-3">
                  {appFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-home-mint" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mx-auto w-[180px] rotate-2 rounded-[2rem] border border-white/15 bg-slate-950 p-2 shadow-2xl shadow-home-mint/10">
                <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-slate-900">
                  <img
                    src="/images/healio-app-dashboard-card.webp"
                    alt={t('process.appScreenshotAlt')}
                    className="block h-auto w-full"
                    width="720"
                    height="1565"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowHealioWorks;
