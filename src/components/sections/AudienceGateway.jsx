import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Stethoscope, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

const audienceConfig = [
  {
    key: 'companies',
    icon: Building2,
    routeKey: 'unternehmen',
    number: '01',
    featured: true,
    accent: 'bg-healio-primary',
  },
  {
    key: 'practices',
    icon: Stethoscope,
    routeKey: 'partner',
    number: '02',
    accent: 'bg-healio-primary-dark',
  },
  {
    key: 'patients',
    icon: Users,
    routeKey: 'ambulant',
    number: '03',
    accent: 'bg-healio-primary',
  },
];

const AudienceGateway = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#f6faf8] py-16 md:py-20 border-b border-slate-100" aria-labelledby="audience-gateway-heading">
      <div className="healio-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-healio-primary">
              {t('audience.eyebrow')}
            </p>
            <h2 id="audience-gateway-heading" className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              {t('audience.title')}
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              {t('audience.subtitle')}
            </p>
          </div>
          <div className="w-fit rounded-lg border border-healio-primary/20 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
            {t('audience.context')}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {audienceConfig.map(({ key, icon: Icon, routeKey, number, featured, accent }) => (
            <Link
              key={key}
              to={getPath(routeKey)}
              className={cn(
                'group relative min-h-[280px] overflow-hidden rounded-lg border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-healio-primary focus:ring-offset-2',
                featured
                  ? 'border-slate-800 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-900'
              )}
            >
              <span className={cn('absolute inset-x-0 top-0 h-1', accent)} aria-hidden="true" />
              <span
                className={cn(
                  'absolute right-5 top-6 text-5xl font-black leading-none',
                  featured ? 'text-white/10' : 'text-slate-100'
                )}
                aria-hidden="true"
              >
                {number}
              </span>

              <div className="relative flex items-start justify-between gap-4">
                <div className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-lg transition-colors',
                  featured ? 'bg-white text-slate-900' : 'bg-slate-900 text-white group-hover:bg-healio-primary'
                )}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <ArrowRight
                  className={cn(
                    'mt-2 h-5 w-5 transition-transform group-hover:translate-x-1',
                    featured ? 'text-white/60 group-hover:text-healio-primary' : 'text-slate-400 group-hover:text-healio-primary'
                  )}
                  aria-hidden="true"
                />
              </div>

              <p className={cn('relative mt-8 text-xs font-semibold uppercase tracking-[0.16em]', featured ? 'text-healio-primary' : 'text-slate-400')}>
                {t(`audience.${key}.signal`)}
              </p>
              <h3 className={cn('relative mt-3 text-2xl font-extrabold leading-tight', featured ? 'text-white' : 'text-slate-900')}>
                {t(`audience.${key}.title`)}
              </h3>
              <p className={cn('relative mt-4 text-sm leading-6', featured ? 'text-slate-200' : 'text-slate-600')}>
                {t(`audience.${key}.description`)}
              </p>
              <p className={cn('relative mt-6 inline-flex items-center gap-2 text-sm font-semibold', featured ? 'text-white' : 'text-healio-primary')}>
                {t(`audience.${key}.cta`)}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceGateway;
