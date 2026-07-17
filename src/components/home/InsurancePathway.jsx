import React from 'react';
import { ArrowUpRight, Building2, HeartPulse, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const iconMap = {
  ambulant: HeartPulse,
  dental: Smile,
  hospital: Building2,
};

const cardStyles = {
  ambulant: {
    shell: 'bg-home-midnight text-white border-home-midnight',
    label: 'text-home-mint',
    body: 'text-slate-300',
    detail: 'text-slate-400',
    icon: 'bg-home-mint text-home-midnight',
    motif: 'border-home-mint/20',
  },
  dental: {
    shell: 'bg-white text-home-midnight border-slate-200',
    label: 'text-sky-700',
    body: 'text-slate-600',
    detail: 'text-slate-500',
    icon: 'bg-sky-100 text-sky-800',
    motif: 'border-sky-200/70',
  },
  hospital: {
    shell: 'bg-[#f2efff] text-home-midnight border-violet-200/70',
    label: 'text-violet-700',
    body: 'text-slate-600',
    detail: 'text-slate-500',
    icon: 'bg-violet-200/80 text-violet-900',
    motif: 'border-violet-300/60',
  },
};

const InsurancePathway = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();
  const items = t('products.items', { returnObjects: true });

  return (
    <section id="schutz" className="home-section scroll-mt-20 bg-home-ice" aria-labelledby="insurance-pathway-title">
      <div className="healio-container">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="home-eyebrow text-emerald-700">{t('products.eyebrow')}</p>
            <h2 id="insurance-pathway-title" className="mt-4 max-w-[15ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-5xl">
              {t('products.title')}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">
            {t('products.description')}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.key];
            const styles = cardStyles[item.key];
            return (
              <Link
                key={item.key}
                to={getPath(item.routeKey)}
                className={`home-focus group relative isolate min-h-[430px] overflow-hidden rounded-[2rem] border p-7 shadow-[0_18px_60px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_80px_rgba(15,23,42,0.13)] ${styles.shell}`}
              >
                <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full border ${styles.motif}`} aria-hidden="true" />
                <div className={`absolute -right-6 top-8 h-36 w-36 rounded-full border ${styles.motif}`} aria-hidden="true" />
                {item.key === 'hospital' && (
                  <div className="absolute inset-y-0 right-8 flex gap-3 opacity-30" aria-hidden="true">
                    <span className="w-px bg-violet-400/50" />
                    <span className="w-px bg-violet-400/30" />
                    <span className="w-px bg-violet-400/20" />
                  </div>
                )}

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${styles.icon}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-xs font-bold tracking-[0.18em] opacity-40">0{index + 1}</span>
                  </div>
                  <p className={`mt-16 text-xs font-bold uppercase tracking-[0.2em] ${styles.label}`}>{item.label}</p>
                  <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em]">{item.title}</h3>
                  <p className={`mt-5 text-base leading-7 ${styles.body}`}>{item.description}</p>
                  <p className={`mt-5 text-xs font-semibold uppercase tracking-[0.12em] ${styles.detail}`}>{item.detail}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 font-display text-sm font-extrabold">
                    {item.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InsurancePathway;
