import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const icons = {
  pension: { kind: 'money', tone: 'butter' },
  health: { kind: 'budget', tone: 'mint' },
  prevention: { kind: 'ambulant', tone: 'sky' },
  management: { kind: 'calculator', tone: 'lavender' },
};

const CompanySolutions = () => {
  const { t } = useTranslation('unternehmen');
  const items = t('solutions.items', { returnObjects: true });

  return (
    <section
      id="unternehmen-leistungen"
      className="scroll-mt-24 bg-[#f7f9f8] py-14 lg:py-20"
      aria-labelledby="company-solutions-title"
    >
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{t('solutions.eyebrow')}</p>
            <h2
              id="company-solutions-title"
              className="mt-4 max-w-[14ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#10202a] sm:text-5xl"
            >
              {t('solutions.title')}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">{t('solutions.description')}</p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {items.map((item) => {
            const icon = icons[item.key] || { kind: 'budget', tone: 'mint' };
            return (
              <details
                key={item.key}
                className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,34,42,0.05)]"
              >
                <summary className="cursor-pointer list-none p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-inset sm:p-7 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-start justify-between gap-5">
                    <FriendlyIcon kind={icon.kind} tone={icon.tone} size="sm" />
                    <ChevronDown className="mt-2 h-5 w-5 shrink-0 text-slate-400 transition duration-300 group-open:rotate-180 group-open:text-emerald-700 motion-reduce:transition-none" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">{item.horizon}</p>
                  <h3 className="mt-2 max-w-[22ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#10202a]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-extrabold text-emerald-700">
                    <span className="group-open:hidden">{t('solutions.detailsShow')}</span>
                    <span className="hidden group-open:inline">{t('solutions.detailsHide')}</span>
                  </span>
                </summary>

                <div className="border-t border-slate-100 px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
                  <ul className="space-y-3">
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
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompanySolutions;
