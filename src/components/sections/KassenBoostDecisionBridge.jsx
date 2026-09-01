import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { KASSENBOOST_COMPARE_URL } from '@/config/kassenBoost';

const KassenBoostDecisionBridge = () => {
  const { t } = useTranslation('common');
  const choices = t('kassenBoostBridge.choices', { returnObjects: true });
  const choiceItems = Array.isArray(choices) ? choices : [];

  return (
    <section className="bg-[#F8F4ED] py-14 sm:py-16 lg:py-20" aria-labelledby="kassenboost-decision-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-home-midnight px-6 py-8 text-white shadow-[0_26px_70px_rgba(7,22,35,0.16)] sm:px-9 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-home-mint/10" aria-hidden="true" />
          <div className="absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-home-mint/[0.07] blur-3xl" aria-hidden="true" />

          <div className="relative grid gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14">
            <div>
              <div className="flex items-center gap-4">
                <FriendlyIcon kind="weighing" tone="mint" size="xl" className="-rotate-2" />
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-home-mint">{t('kassenBoostBridge.eyebrow')}</p>
              </div>
              <h2 id="kassenboost-decision-title" className="mt-6 max-w-[15ch] font-friendly text-3xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-4xl">
                {t('kassenBoostBridge.title')}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">{t('kassenBoostBridge.description')}</p>
              <a
                href={KASSENBOOST_COMPARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-home-mint px-6 py-3.5 font-display text-sm font-extrabold text-home-midnight shadow-[0_12px_34px_rgba(37,201,144,0.22)] transition hover:-translate-y-0.5 hover:bg-home-mint-active motion-reduce:transform-none"
              >
                {t('kassenBoostBridge.cta')}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {choiceItems.map((choice) => (
                <article key={choice.title} className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-home-mint/15 text-home-mint">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-friendly text-lg font-bold">{choice.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{choice.description}</p>
                </article>
              ))}

              <aside className="rounded-2xl border border-home-mint/25 bg-home-mint/[0.1] p-5 sm:col-span-2">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-home-mint">{t('kassenBoostBridge.noteLabel')}</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{t('kassenBoostBridge.note')}</p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KassenBoostDecisionBridge;
