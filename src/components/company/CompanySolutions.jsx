import React from 'react';
import { Activity, Check, HeartPulse, PiggyBank, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const icons = {
  pension: PiggyBank,
  health: HeartPulse,
  prevention: Activity,
  management: Settings2,
};

const CompanySolutions = () => {
  const { t } = useTranslation('unternehmen');
  const items = t('solutions.items', { returnObjects: true });

  return (
    <section
      id="unternehmen-leistungen"
      className="scroll-mt-24 bg-[#f7f9f8] py-20 lg:py-28"
      aria-labelledby="company-solutions-title"
    >
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{t('solutions.eyebrow')}</p>
            <h2
              id="company-solutions-title"
              className="mt-4 max-w-[14ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[#10202a] sm:text-5xl"
            >
              {t('solutions.title')}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">{t('solutions.description')}</p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-200 shadow-[0_22px_70px_rgba(15,34,42,0.06)] md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = icons[item.key];
            return (
              <article key={item.key} className="bg-white p-7 sm:p-9 lg:p-10">
                <div className="flex items-center justify-between gap-6">
                  <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-xs font-extrabold tracking-[0.18em] text-slate-400">0{index + 1}</span>
                </div>

                <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">{item.horizon}</p>
                <h3 className="mt-3 max-w-[20ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#10202a] sm:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-slate-600">{item.description}</p>

                <ul className="mt-7 space-y-3 border-t border-slate-100 pt-6">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                {item.note && <p className="mt-5 text-xs leading-5 text-slate-500">{item.note}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompanySolutions;
