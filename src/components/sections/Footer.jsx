
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { CheckCircle2, ExternalLink, Smartphone } from 'lucide-react';
import { openConsentSettings } from '@/lib/consent';

const APP_STORE_URL = 'https://apps.apple.com/de/app/healio/id6762125390';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=de.healio.gesundheit';

const Footer = ({ hideCta = false, hideAppPromotion = false }) => {
  const { t } = useTranslation('common');
  const { getPath, lang } = useLanguage();
  const { pathname } = useLocation();
  const isDentalCheckRoute = pathname === '/zahn' || pathname === '/en/dental';

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-8 mt-auto relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-healio-primary/40 to-transparent"></div>

      <div className="healio-container">
        {!hideAppPromotion && (
          <div className="relative mb-16 overflow-hidden rounded-2xl border border-healio-primary/20 bg-gradient-to-br from-slate-900 via-[#071d24] to-slate-950 p-6 shadow-2xl shadow-black/25 md:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-healio-primary/60 to-transparent" />
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-healio-primary/25 bg-healio-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-healio-primary">
                <Smartphone className="h-4 w-4" />
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
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
                >
                  {t('footer.appStore')}
                  <ExternalLink className="h-4 w-4 text-slate-500" />
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:border-healio-primary/50 hover:bg-healio-primary/12"
                >
                  {t('footer.playStore')}
                  <ExternalLink className="h-4 w-4 text-slate-500" />
                </a>
              </div>
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
              {lang === 'de' && (
                <>
                  <li><Link to="/zahnaerzte" className="hover:text-healio-primary transition-colors">{t('footer.zahnaerzte')}</Link></li>
                  <li><Link to="/heilberufe-vorsorge" className="hover:text-healio-primary transition-colors">{t('footer.heilberufe')}</Link></li>
                </>
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
