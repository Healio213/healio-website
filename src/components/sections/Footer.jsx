
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { CheckCircle2 } from 'lucide-react';
import { openConsentSettings } from '@/lib/consent';

const APP_STORE_URL = 'https://apps.apple.com/de/app/healio/id6762125390';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=de.healio.gesundheit';

const AppleMark = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.08-.48-3.23 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.06 7.31c1.23.07 2.09.68 2.81.73 1.08-.22 2.11-.85 3.27-.76 1.39.11 2.44.66 3.13 1.65-2.87 1.72-2.19 5.5.44 6.56-.53 1.4-1.21 2.8-1.66 4.79ZM12.03 7.25c-.15-2.08 1.55-3.79 3.49-3.95.27 2.4-2.17 4.2-3.49 3.95Z" />
  </svg>
);

const PlayStoreMark = () => (
  <svg viewBox="0 0 32 36" className="h-7 w-7 shrink-0" aria-hidden="true">
    <path fill="#34A853" d="M1.8 1.5A3.1 3.1 0 0 0 1 3.7v28.6c0 .8.3 1.6.8 2.2l16-16.5-16-16.5Z" />
    <path fill="#FBBC04" d="m23.1 23.5-5.3-5.5-16 16.5c.9.9 2.3 1 3.5.3l17.8-11.3Z" />
    <path fill="#EA4335" d="M23.1 12.5 5.3 1.2C4.1.5 2.7.6 1.8 1.5l16 16.5 5.3-5.5Z" />
    <path fill="#4285F4" d="M30 16.9 23.1 12.5 17.8 18l5.3 5.5 6.9-4.4c1.3-.8 1.3-1.4 0-2.2Z" />
  </svg>
);

const AppIconTile = () => (
  <span className="h-[4.35rem] w-[4.35rem] shrink-0" aria-hidden="true">
    <img
      src="/images/healio-app-icon.png"
      alt=""
      width="1024"
      height="1024"
      loading="lazy"
      decoding="async"
      className="h-full w-full rounded-[1.35rem] object-cover shadow-[0_14px_30px_rgba(0,0,0,0.38)]"
    />
  </span>
);

const StoreDownloadButtons = ({ t, className = '' }) => (
  <div className={`flex flex-wrap gap-3 ${className}`} aria-label={t('footer.appDownloadLabel')}>
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('footer.appStoreAria')}
      className="group inline-flex min-h-[3.4rem] min-w-[10.25rem] items-center gap-3 rounded-xl border border-white/20 bg-black px-4 py-2 text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none"
    >
      <AppleMark />
      <span className="text-left leading-none">
        <span className="block text-[0.62rem] font-medium text-slate-300">{t('footer.appStoreEyebrow')}</span>
        <span className="mt-1 block font-display text-base font-bold tracking-[-0.02em]">{t('footer.appStore')}</span>
      </span>
    </a>
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('footer.playStoreAria')}
      className="group inline-flex min-h-[3.4rem] min-w-[10.25rem] items-center gap-3 rounded-xl border border-white/20 bg-black px-4 py-2 text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none"
    >
      <PlayStoreMark />
      <span className="text-left leading-none">
        <span className="block text-[0.62rem] font-medium uppercase tracking-[0.08em] text-slate-300">{t('footer.playStoreEyebrow')}</span>
        <span className="mt-1 block font-display text-base font-bold tracking-[-0.02em]">{t('footer.playStore')}</span>
      </span>
    </a>
  </div>
);

const Footer = ({ hideCta = false, hideAppPromotion = false }) => {
  const { t } = useTranslation('common');
  const { getPath, lang } = useLanguage();
  const { pathname } = useLocation();
  const isDentalCheckRoute = pathname === '/zahn' || pathname === '/en/dental';

  return (
    <footer id="site-footer" className="bg-slate-950 text-white pt-20 pb-8 mt-auto relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-healio-primary/40 to-transparent"></div>

      <div className="healio-container">
        {hideAppPromotion && (
          <div className="relative mb-12 flex flex-col gap-5 overflow-hidden rounded-[1.35rem] border border-white/[0.12] bg-gradient-to-r from-white/[0.07] via-[#092028]/80 to-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.18)] sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="absolute -left-12 top-1/2 h-32 w-40 -translate-y-1/2 rounded-full bg-healio-primary/[0.08] blur-3xl" aria-hidden="true" />
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-healio-primary/55 to-transparent" aria-hidden="true" />
            <div className="flex items-center gap-4">
              <AppIconTile />
              <div>
                <p className="font-display text-base font-bold text-white sm:text-lg">{t('footer.appCompactTitle')}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{t('footer.appCompactBody')}</p>
              </div>
            </div>
            <StoreDownloadButtons t={t} />
          </div>
        )}

        {!hideAppPromotion && (
          <div className="relative mb-16 overflow-hidden rounded-2xl border border-healio-primary/20 bg-gradient-to-br from-slate-900 via-[#071d24] to-slate-950 p-6 shadow-2xl shadow-black/25 md:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-healio-primary/60 to-transparent" />
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-healio-primary/25 bg-healio-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-healio-primary">
                <img src="/images/healio-app-icon.png" alt="" width="1024" height="1024" loading="lazy" decoding="async" className="h-4 w-4 rounded-[0.3rem]" />
                {t('footer.appLabel')}
              </div>
              <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                {t('footer.appTitle')}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
                {t('footer.appBody')}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-200">
                {[t('footer.appFeatureBudget'), t('footer.appFeatureReceipts'), t('footer.appFeatureBonus')].map((feature) => (
                  <span key={feature} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2">
                    <CheckCircle2 className="h-4 w-4 text-healio-primary" />
                    {feature}
                  </span>
                ))}
              </div>
              <StoreDownloadButtons t={t} className="mt-6" />
            </div>
            <div className="mx-auto w-full max-w-[190px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[270px]">
              <div className="rotate-2 rounded-[2rem] border border-white/15 bg-slate-950 p-2.5 shadow-2xl shadow-healio-primary/10">
                <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-slate-900">
                  <img
                    src="/images/healio-app-dashboard-card.webp"
                    alt={t('footer.appScreenshotAlt')}
                    className="block h-auto w-full"
                    width="720"
                    height="1565"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

        <div className="mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-[1.25fr_repeat(4,minmax(0,1fr))]">
          <div className="sm:col-span-2 xl:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-white">Healio</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              {t('footer.disclaimer')}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li><a href="mailto:info@healio.de" className="hover:text-healio-primary transition-colors">info@healio.de</a></li>
              <li><a href="tel:+494089755705" className="hover:text-healio-primary transition-colors">+49 40 89755705</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">{t('footer.privateCustomers')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to={getPath('leistungen')} className="hover:text-healio-primary transition-colors">{t('footer.leistungen')}</Link></li>
              <li><Link to={getPath('kassenbonus')} className="hover:text-healio-primary transition-colors">{t('footer.kassenbonus')}</Link></li>
              <li><Link to={getPath('kassenboost')} className="hover:text-healio-primary transition-colors">{t('footer.kassenboost')}</Link></li>
              <li><Link to={getPath('tierkrankenversicherung')} className="hover:text-healio-primary transition-colors">{t('footer.tierkrankenversicherung')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to={getPath('unternehmen')} className="hover:text-healio-primary transition-colors">{t('footer.unternehmen')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">{t('footer.practices')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to={getPath('partner')} className="hover:text-healio-primary transition-colors">{t('footer.partner')}</Link></li>
              <li><Link to={getPath('hebammen')} className="hover:text-healio-primary transition-colors">{t('footer.hebammen')}</Link></li>
              <li><Link to={getPath('heilberufeVorsorge')} className="hover:text-healio-primary transition-colors">{t('footer.heilberufe')}</Link></li>
              {lang === 'de' && (
                <li><Link to="/zahnaerzte" className="hover:text-healio-primary transition-colors">{t('footer.zahnaerzte')}</Link></li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">{t('footer.healioLegal')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to={getPath('about')} className="hover:text-healio-primary transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link to={getPath('blog')} className="hover:text-healio-primary transition-colors">{t('footer.ratgeber')}</Link></li>
              <li><Link to={getPath('kontakt')} className="hover:text-healio-primary transition-colors">{t('footer.contact')}</Link></li>
              <li><Link to={getPath('impressum')} className="hover:text-healio-primary transition-colors">{t('footer.impressum')}</Link></li>
              <li><Link to={getPath('datenschutz')} className="hover:text-healio-primary transition-colors">{t('footer.datenschutz')}</Link></li>
              {!isDentalCheckRoute && (
                <li>
                  <button type="button" onClick={() => openConsentSettings()} className="text-left transition-colors hover:text-healio-primary">
                    {t('footer.cookieSettings')}
                  </button>
                </li>
              )}
              <li><Link to={getPath('agb')} className="hover:text-healio-primary transition-colors">{t('footer.agb')}</Link></li>
              <li><Link to={getPath('erstinformation')} className="hover:text-healio-primary transition-colors">{t('footer.erstinformation')}</Link></li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        {!hideCta && (
          <div className="bg-gradient-to-r from-healio-primary/10 to-emerald-500/10 border border-healio-primary/20 rounded-2xl p-8 lg:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{t('footer.ctaTitle')}</h3>
              <p className="text-slate-400">{t('footer.ctaSubtitle')}</p>
            </div>
            <Link
              to={getPath('terminvereinbarung')}
              className="inline-block bg-healio-primary hover:bg-[#1da877] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_6px_20px_rgba(37,201,144,0.3)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              {t('footer.ctaButton')}
            </Link>
          </div>
        )}

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
