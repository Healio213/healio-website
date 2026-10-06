
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { openConsentSettings } from '@/lib/consent';
import { HEALIO_WHATSAPP_URL } from '@/config/contactChannels';

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
    <picture>
      <source srcSet="/images/healio-app-icon.webp" type="image/webp" />
      <img
        src="/images/healio-app-icon.png"
        alt=""
        width="140"
        height="140"
        loading="lazy"
        decoding="async"
        className="h-full w-full rounded-[1.35rem] object-cover shadow-[0_14px_30px_rgba(0,0,0,0.38)]"
      />
    </picture>
  </span>
);

const StoreDownloadButtons = ({ t, className = '' }) => (
  <div className={`flex flex-wrap gap-2.5 md:gap-3 ${className}`} aria-label={t('footer.appDownloadLabel')}>
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('footer.appStoreAria')}
      className="group inline-flex min-h-[3.4rem] min-w-0 flex-1 basis-[8.75rem] items-center justify-center gap-2 rounded-xl border border-white/20 bg-black px-3 py-2 text-white md:min-w-[10.25rem] md:flex-none md:basis-auto md:justify-start md:gap-3 md:px-4 shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none"
    >
      <AppleMark />
      <span className="text-left leading-none">
        <span className="hidden text-[0.62rem] font-medium text-slate-300 md:block">{t('footer.appStoreEyebrow')}</span>
        <span className="block font-display text-base font-bold tracking-[-0.02em] md:mt-1">{t('footer.appStore')}</span>
      </span>
    </a>
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('footer.playStoreAria')}
      className="group inline-flex min-h-[3.4rem] min-w-0 flex-1 basis-[8.75rem] items-center justify-center gap-2 rounded-xl border border-white/20 bg-black px-3 py-2 text-white md:min-w-[10.25rem] md:flex-none md:basis-auto md:justify-start md:gap-3 md:px-4 shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none"
    >
      <PlayStoreMark />
      <span className="text-left leading-none">
        <span className="hidden text-[0.62rem] font-medium uppercase tracking-[0.08em] text-slate-300 md:block">{t('footer.playStoreEyebrow')}</span>
        <span className="block font-display text-base font-bold tracking-[-0.02em] md:mt-1">{t('footer.playStore')}</span>
      </span>
    </a>
  </div>
);

// Linkgruppe im Seitenfuß. Unter md (768 px) ein Aufklapper, damit der Fuß
// auf dem Handy nicht endlos wird; ab md die bisherige offene Liste.
// mobileItems enthält die Links, die mobil im Aufklapper stehen (Impressum,
// Datenschutz und Cookie-Einstellungen stehen mobil dauerhaft sichtbar in der
// Zeile über dem Copyright, siehe unten).
const FooterGroup = ({ id, title, items, mobileItems = items, renderItem, className = '' }) => {
  const [open, setOpen] = useState(false);
  const panelId = `footer-group-${id}`;

  return (
    <div className={`border-b border-slate-800 md:border-b-0 ${className}`}>
      <div className="md:hidden">
        <h4>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex min-h-14 w-full items-center justify-between gap-4 text-left text-base font-semibold text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary"
          >
            {title}
            <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </h4>
        <ul id={panelId} hidden={!open} className="pb-3 text-base text-slate-300">
          {mobileItems.map((item) => (
            <li key={item.id}>{renderItem(item, 'flex min-h-11 w-full items-center text-left transition-colors hover:text-healio-primary')}</li>
          ))}
        </ul>
      </div>
      <div className="hidden md:block">
        <h4 className="font-semibold mb-4 text-slate-200">{title}</h4>
        <ul className="space-y-3 text-sm text-slate-400">
          {items.map((item) => (
            <li key={item.id}>{renderItem(item, item.type === 'cookie' ? 'text-left transition-colors hover:text-healio-primary' : 'hover:text-healio-primary transition-colors')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Footer = ({ hideCta = false, hideAppPromotion = false }) => {
  const { t } = useTranslation('common');
  const { getPath, lang } = useLanguage();
  const { pathname } = useLocation();
  const isDentalCheckRoute = pathname === '/zahn' || pathname === '/en/dental';

  // Linkgruppen als Daten, damit Handy-Aufklapper und Desktop-Liste dieselben
  // Links zeigen. Reihenfolge und Bedingungen wie bisher.
  const groups = [
    {
      id: 'privat',
      title: t('footer.privateCustomers'),
      items: [
        { id: 'leistungen', to: getPath('leistungen'), label: t('footer.leistungen') },
        { id: 'kassenbonus', to: getPath('kassenbonus'), label: t('footer.kassenbonus') },
        { id: 'kassenboost', to: getPath('kassenboost'), label: t('footer.kassenboost') },
        { id: 'tier', to: getPath('tierkrankenversicherung'), label: t('footer.tierkrankenversicherung') },
      ],
    },
    {
      id: 'firma',
      title: t('footer.company'),
      items: [
        { id: 'unternehmen', to: getPath('unternehmen'), label: t('footer.unternehmen') },
        { id: 'vorsorge', to: getPath('vorsorgeRechner'), label: t('footer.vorsorgeRechner') },
        { id: 'potenzial', to: getPath('potenzialanalyse'), label: t('footer.potenzialanalyse') },
      ],
    },
    {
      id: 'praxen',
      title: t('footer.practices'),
      items: [
        { id: 'partner', to: getPath('partner'), label: t('footer.partner') },
        { id: 'hebammen', to: getPath('hebammen'), label: t('footer.hebammen') },
        { id: 'heilberufe', to: getPath('heilberufeVorsorge'), label: t('footer.heilberufe') },
        ...(lang === 'de' ? [{ id: 'zahnaerzte', to: '/zahnaerzte', label: t('footer.zahnaerzte') }] : []),
      ],
    },
    {
      id: 'healio',
      title: t('footer.healioLegal'),
      items: [
        { id: 'about', to: getPath('about'), label: t('footer.aboutUs') },
        ...(lang === 'de' ? [{ id: 'blog', to: getPath('blog'), label: t('footer.ratgeber') }] : []),
        { id: 'kontakt', to: getPath('kontakt'), label: t('footer.contact') },
        ...(lang === 'de' ? [{ id: 'presse', to: '/presse', label: t('footer.presse') }] : []),
        { id: 'impressum', to: getPath('impressum'), label: t('footer.impressum'), pflicht: true },
        { id: 'datenschutz', to: getPath('datenschutz'), label: t('footer.datenschutz'), pflicht: true },
        ...(!isDentalCheckRoute ? [{ id: 'cookie', type: 'cookie', label: t('footer.cookieSettings'), pflicht: true }] : []),
        { id: 'agb', to: getPath('agb'), label: t('footer.agb') },
        { id: 'erstinformation', to: getPath('erstinformation'), label: t('footer.erstinformation') },
      ],
    },
  ];

  const renderItem = (item, className) => (
    item.type === 'cookie'
      ? <button type="button" onClick={() => openConsentSettings()} className={className}>{item.label}</button>
      : <Link to={item.to} className={className}>{item.label}</Link>
  );

  // Pflichtlinks (Impressum, Datenschutz, Cookie-Einstellungen) stehen mobil
  // dauerhaft sichtbar unten und nicht im Aufklapper.
  const pflichtItems = groups.flatMap((group) => group.items.filter((item) => item.pflicht));
  const mobileGroups = groups.map((group) => ({ ...group, mobileItems: group.items.filter((item) => !item.pflicht) }));

  return (
    <footer id="site-footer" className="bg-slate-950 text-white pt-10 pb-6 mt-auto relative overflow-hidden md:pt-20 md:pb-8">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-healio-primary/40 to-transparent"></div>

      <div className="healio-container">
        {hideAppPromotion && (
          <div className="relative mb-6 flex flex-col gap-4 overflow-hidden rounded-[1.35rem] border border-white/[0.12] bg-gradient-to-r from-white/[0.07] via-[#092028]/80 to-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.18)] sm:p-6 md:mb-12 md:gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="absolute -left-12 top-1/2 h-32 w-40 -translate-y-1/2 rounded-full bg-healio-primary/[0.08] blur-3xl" aria-hidden="true" />
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-healio-primary/55 to-transparent" aria-hidden="true" />
            <div className="flex items-center gap-4">
              <AppIconTile />
              <div>
                <p className="font-display text-base font-bold text-white sm:text-lg">{t('footer.appCompactTitle')}</p>
                <p className="mt-1 text-base leading-6 text-slate-400 md:text-sm md:leading-6">{t('footer.appCompactBody')}</p>
              </div>
            </div>
            <StoreDownloadButtons t={t} />
          </div>
        )}

        {!hideAppPromotion && (
          <div className="relative mb-8 overflow-hidden rounded-2xl border border-healio-primary/20 bg-gradient-to-br from-slate-900 via-[#071d24] to-slate-950 p-5 shadow-2xl shadow-black/25 sm:p-6 md:mb-16 md:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-healio-primary/60 to-transparent" />
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-healio-primary/25 bg-healio-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-healio-primary md:mb-4">
                <img src="/images/healio-app-icon.png" alt="" width="1024" height="1024" loading="lazy" decoding="async" className="h-4 w-4 rounded-[0.3rem]" />
                {t('footer.appLabel')}
              </div>
              <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                {t('footer.appTitle')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-300 md:leading-6">
                {t('footer.appBody')}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-200 md:mt-5">
                {[t('footer.appFeatureBudget'), t('footer.appFeatureReceipts'), t('footer.appFeatureBonus')].map((feature) => (
                  <span key={feature} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1.5 md:px-3 md:py-2">
                    <CheckCircle2 className="h-4 w-4 text-healio-primary" />
                    {feature}
                  </span>
                ))}
              </div>
              <StoreDownloadButtons t={t} className="mt-5 md:mt-6" />
            </div>
            {/* Der Handy-Screenshot ist reine Illustration und fällt auf dem Handy weg. */}
            <div className="mx-auto hidden w-full max-w-[190px] sm:max-w-[210px] md:block md:max-w-[250px] lg:max-w-[270px]">
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

        <div className="mb-6 md:mb-16 md:grid md:grid-cols-2 md:gap-10 xl:grid-cols-[1.25fr_repeat(4,minmax(0,1fr))]">
          <div className="mb-5 md:col-span-2 md:mb-0 xl:col-span-1">
            <h3 className="mb-2 text-2xl font-bold text-white md:mb-4">Healio</h3>
            <p className="text-base leading-relaxed text-slate-400 md:text-sm md:leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400 md:text-xs md:leading-relaxed md:text-slate-500">
              {t('footer.disclaimer')}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 text-base text-slate-400 md:mt-5 md:block md:space-y-3 md:text-sm">
              <li><a href="mailto:info@healio.de" className="inline-flex min-h-11 items-center hover:text-healio-primary transition-colors md:inline md:min-h-0">info@healio.de</a></li>
              <li><a href="tel:+494089755705" className="inline-flex min-h-11 items-center hover:text-healio-primary transition-colors md:inline md:min-h-0">+49 40 89755705</a></li>
              <li><a href={HEALIO_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-healio-whatsapp="footer" className="inline-flex min-h-11 items-center hover:text-healio-primary transition-colors md:inline md:min-h-0">WhatsApp · {lang === 'en' ? 'external service' : 'externer Dienst'}</a></li>
            </ul>
          </div>
          {mobileGroups.map((group, index) => (
            <FooterGroup
              key={group.id}
              id={group.id}
              title={group.title}
              items={group.items}
              mobileItems={group.mobileItems}
              renderItem={renderItem}
              className={index === 0 ? 'border-t border-slate-800 md:border-t-0' : ''}
            />
          ))}
        </div>

        {/* CTA Banner */}
        {!hideCta && (
          <div className="bg-gradient-to-r from-healio-primary/10 to-emerald-500/10 border border-healio-primary/20 rounded-2xl p-5 md:p-8 lg:p-10 mb-8 md:mb-16 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{t('footer.ctaTitle')}</h3>
              <p className="text-slate-400">{t('footer.ctaSubtitle')}</p>
            </div>
            <Link
              to={getPath('terminvereinbarung')}
              className="inline-block w-full bg-healio-primary hover:bg-[#1da877] text-white text-center font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_6px_20px_rgba(37,201,144,0.3)] hover:-translate-y-0.5 whitespace-nowrap md:w-auto md:text-start"
            >
              {t('footer.ctaButton')}
            </Link>
          </div>
        )}

        <div className="border-t border-slate-800 pt-3 text-center text-sm text-slate-500 md:pt-8">
          {/* Mobil dauerhaft sichtbare Pflichtlinks; ab md stehen sie in der Spalte oben. */}
          <ul className="mb-2 flex flex-wrap justify-center gap-x-6 text-slate-400 md:hidden">
            {pflichtItems.map((item) => (
              <li key={item.id}>{renderItem(item, 'inline-flex min-h-11 items-center transition-colors hover:text-healio-primary')}</li>
            ))}
          </ul>
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
