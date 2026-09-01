import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Mail,
  Phone,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useLanguage } from '@/hooks/useLanguage';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';

const SITE_URL = 'https://healio.de';

const SectionHeading = ({ id, number, iconKind, iconTone = 'mint', title, children, className = '' }) => (
  <section id={id} className={`scroll-mt-28 border-t border-slate-200 py-10 first:border-t-0 first:pt-0 sm:py-12 ${className}`}>
    <div className="grid gap-5 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-7">
      <FriendlyIcon kind={iconKind} tone={iconTone} size="sm" />
      <div className="min-w-0">
        <p className="mb-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-healio-primary-dark">{number}</p>
        <h2 className="break-words font-display text-2xl font-bold tracking-[-0.02em] text-slate-950 [hyphens:auto] [overflow-wrap:anywhere] sm:text-3xl">{title}</h2>
        <div className="mt-6 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
          {children}
        </div>
      </div>
    </div>
  </section>
);

const ContactLink = ({ href, icon: Icon, children }) => (
  <a
    href={href}
    className="inline-flex min-w-0 items-center gap-2 font-semibold text-slate-950 underline decoration-emerald-300 decoration-2 underline-offset-4 transition hover:text-healio-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary-dark focus-visible:ring-offset-4"
  >
    <Icon className="h-4 w-4 shrink-0 text-healio-primary-dark" aria-hidden="true" />
    <span className="break-all">{children}</span>
  </a>
);

const ExternalTextLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex min-w-0 items-center gap-1.5 font-semibold text-slate-950 underline decoration-emerald-300 decoration-2 underline-offset-4 transition hover:text-healio-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary-dark focus-visible:ring-offset-4"
  >
    <span className="break-all">{children}</span>
    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
  </a>
);

const ErstinformationPage = () => {
  const { t } = useTranslation('legal');
  const { t: tSeo } = useTranslation('seo');
  const { lang, getPath } = useLanguage();
  const isGerman = lang === 'de';
  const canonicalUrl = isGerman ? `${SITE_URL}/erstinformation` : `${SITE_URL}/en/initial-information`;
  const alternateUrls = {
    de: `${SITE_URL}/erstinformation`,
    en: `${SITE_URL}/en/initial-information`,
  };
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      createOrganizationSchema(),
      createWebPageSchema(
        t('erstinformation.title'),
        tSeo('erstinformation.description'),
        canonicalUrl,
        isGerman ? 'de-DE' : 'en-US',
      ),
    ],
  };

  const navigation = [
    ['anbieter', 'erstinformation.nav.provider'],
    ['status', 'erstinformation.nav.status'],
    ['beratung', 'erstinformation.nav.advice'],
    ['beteiligungen', 'erstinformation.nav.participations'],
    ['schlichtung', 'erstinformation.nav.dispute'],
    ['beratungsgrundlage', 'erstinformation.nav.advisoryBasis'],
  ];

  useEffect(() => {
    document.documentElement.classList.add('legal-information-active');
    return () => document.documentElement.classList.remove('legal-information-active');
  }, []);

  return (
    <>
      <SEOHead
        title={tSeo('erstinformation.title')}
        description={tSeo('erstinformation.description')}
        canonicalUrl={canonicalUrl}
        ogUrl={canonicalUrl}
        alternateUrls={alternateUrls}
        schemaMarkup={schemaMarkup}
      />

      <article className="legal-information-document min-h-screen bg-[#f5f8f8] text-slate-950 print:bg-white">
        <header className="relative isolate overflow-hidden bg-[#061622] pb-16 pt-32 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40 print:bg-white print:pb-8 print:pt-6 print:text-slate-950">
          <div
            className="absolute inset-0 -z-20 opacity-[0.16] print:hidden"
            style={{
              backgroundImage: 'linear-gradient(rgba(148,163,184,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.18) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
              maskImage: 'linear-gradient(to right, black, transparent 76%)',
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-[44%] bg-[radial-gradient(circle_at_70%_42%,rgba(37,201,144,0.19),transparent_50%)] lg:block print:hidden" aria-hidden="true" />
          <span className="absolute -bottom-28 right-[5%] -z-10 hidden select-none font-display text-[26rem] font-extrabold leading-none text-white/[0.035] xl:block print:hidden" aria-hidden="true">§</span>

          <div className="healio-container px-4 sm:px-6 lg:px-8">
            <nav aria-label={t('erstinformation.breadcrumb')} className="mb-8 text-sm text-slate-300 print:hidden">
              <Link to={getPath('home')} className="transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[#061622]">
                {t('impressum.home')}
              </Link>
              <span className="mx-2 text-slate-600" aria-hidden="true">/</span>
              <span className="text-white" aria-current="page">{t('erstinformation.shortTitle')}</span>
            </nav>

            <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-16">
              <div className="max-w-3xl">
                <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.24em] text-healio-primary">
                  {t('erstinformation.eyebrow')}
                </p>
                <h1 className="break-words font-display text-4xl font-extrabold leading-[1.03] tracking-[-0.045em] [hyphens:auto] [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
                  {t('erstinformation.title')}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg print:text-slate-700">
                  {t('erstinformation.intro')}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold print:text-slate-700">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 print:border-slate-200 print:bg-white">
                    <FileCheck2 className="h-4 w-4 text-healio-primary" aria-hidden="true" />
                    {t('erstinformation.freeOfCharge')}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 print:border-slate-200 print:bg-white">
                    <ShieldCheck className="h-4 w-4 text-healio-primary" aria-hidden="true" />
                    {t('erstinformation.lastUpdated')}
                  </span>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-sm print:border-slate-200 print:bg-white">
                <div className="grid grid-cols-[94px_minmax(0,1fr)] border-b border-white/10 print:border-slate-200">
                  <div className="flex items-center justify-center border-r border-white/10 px-4 py-6 font-display text-2xl font-extrabold text-healio-primary print:border-slate-200">§§ 15–16</div>
                  <div className="px-5 py-5">
                    <p className="font-display text-sm font-bold text-white print:text-slate-950">{t('erstinformation.lawPanel.primaryTitle')}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300 print:text-slate-600">{t('erstinformation.lawPanel.primaryText')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-[94px_minmax(0,1fr)]">
                  <div className="flex items-center justify-center border-r border-white/10 px-4 py-6 font-display text-2xl font-extrabold text-healio-primary print:border-slate-200">§ 60</div>
                  <div className="px-5 py-5">
                    <p className="font-display text-sm font-bold text-white print:text-slate-950">{t('erstinformation.lawPanel.secondaryTitle')}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300 print:text-slate-600">{t('erstinformation.lawPanel.secondaryText')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="healio-container grid gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:px-8 lg:py-24 print:block print:px-0 print:py-6">
          <aside className="print:hidden">
            <div className="sticky top-28">
              <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{t('erstinformation.contents')}</p>
              <nav aria-label={t('erstinformation.contents')}>
                <ol className="space-y-1 border-l border-slate-200">
                  {navigation.map(([id, key], index) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="group flex gap-3 border-l-2 border-transparent py-2.5 pl-4 text-sm leading-5 text-slate-600 transition hover:border-healio-primary hover:text-slate-950 focus:outline-none focus-visible:border-healio-primary focus-visible:text-slate-950"
                      >
                        <span className="font-display text-xs font-bold text-slate-500 group-hover:text-healio-primary-dark">{String(index + 1).padStart(2, '0')}</span>
                        <span>{t(key)}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <button
                type="button"
                onClick={() => window.print()}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-healio-primary hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary-dark focus-visible:ring-offset-4"
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                {t('erstinformation.print')}
              </button>
            </div>
          </aside>

          <div className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-white px-4 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:px-9 lg:px-12 lg:py-14 print:rounded-none print:border-0 print:px-0 print:py-0 print:shadow-none">
            <SectionHeading id="anbieter" number="01" iconKind="protection" title={t('erstinformation.provider.title')}>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-1 text-slate-700">
                  <p className="font-bold text-slate-950">Healio GmbH</p>
                  <p>Arndtstraße 6</p>
                  <p>22085 Hamburg</p>
                  <p className="pt-3"><span className="font-semibold text-slate-950">{t('erstinformation.provider.managingDirectorLabel')}</span> Frank Steinfurt</p>
                  <p><span className="font-semibold text-slate-950">{t('erstinformation.provider.commercialRegisterLabel')}</span> HRB 196905</p>
                  <p><span className="font-semibold text-slate-950">{t('erstinformation.provider.registryCourtLabel')}</span> Amtsgericht Hamburg</p>
                </div>
                <div className="space-y-4">
                  <ContactLink href="tel:+494089755705" icon={Phone}>+49 40 89755705</ContactLink>
                  <br />
                  <ContactLink href="mailto:info@healio.de" icon={Mail}>info@healio.de</ContactLink>
                </div>
              </div>
            </SectionHeading>

            <SectionHeading id="status" number="02" iconKind="protection" iconTone="sky" title={t('erstinformation.status.title')}>
              <p className="font-semibold text-slate-950">{t('erstinformation.status.type')}</p>
              <div className="mt-7 grid gap-7 md:grid-cols-2">
                <div className="legal-print-avoid rounded-xl bg-slate-50 p-5 sm:p-6 print:border print:border-slate-200 print:bg-white">
                  <p className="font-display text-sm font-bold text-slate-950">{t('erstinformation.status.authorityTitle')}</p>
                  <address className="mt-3 not-italic text-slate-600">
                    Handelskammer Hamburg<br />
                    Adolphsplatz 1<br />
                    20457 Hamburg
                  </address>
                  <div className="mt-3">
                    <ExternalTextLink href="https://www.ihk.de/hamburg/">www.ihk.de/hamburg</ExternalTextLink>
                  </div>
                </div>
                <div className="legal-print-avoid rounded-xl bg-slate-50 p-5 sm:p-6 print:border print:border-slate-200 print:bg-white">
                  <p className="font-display text-sm font-bold text-slate-950">{t('erstinformation.status.registerTitle')}</p>
                  <p className="mt-3 text-slate-600">{t('erstinformation.status.registerNumberLabel')}</p>
                  <p className="mt-1 break-all font-display text-lg font-extrabold tracking-wide text-slate-950">D-C1LE-OVLQH-98</p>
                </div>
              </div>
              <div className="mt-7 border-l-2 border-healio-primary pl-5">
                <p className="font-display font-bold text-slate-950">{t('erstinformation.status.registryOfficeTitle')}</p>
                <address className="mt-2 not-italic">
                  DIHK | Deutsche Industrie- und Handelskammer<br />
                  Breite Straße 29, 10178 Berlin<br />
                  {t('erstinformation.status.phoneLabel')} 0180 600 58 50 ({t('erstinformation.status.phoneFee')}) · <a href="mailto:vr@dihk.de" className="font-semibold text-slate-950 underline decoration-emerald-300 decoration-2 underline-offset-4">vr@dihk.de</a>
                </address>
                <div className="mt-2">
                  <ExternalTextLink href="https://www.vermittlerregister.info/">www.vermittlerregister.info</ExternalTextLink>
                </div>
              </div>
            </SectionHeading>

            <SectionHeading id="beratung" number="03" iconKind="budget" iconTone="butter" title={t('erstinformation.advice.title')}>
              <div className="space-y-5">
                <p>{t('erstinformation.advice.offered')}</p>
                <div className="legal-print-avoid rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 sm:p-6 print:bg-white">
                  <p className="font-semibold text-slate-950">{t('erstinformation.advice.remuneration')}</p>
                  <p className="mt-3">{t('erstinformation.advice.noOtherRemuneration')}</p>
                </div>
              </div>
            </SectionHeading>

            <SectionHeading id="beteiligungen" number="04" iconKind="protection" iconTone="lavender" title={t('erstinformation.participations.title')}>
              <div className="grid gap-4 md:grid-cols-2">
                {[t('erstinformation.participations.outbound'), t('erstinformation.participations.inbound')].map((text) => (
                  <div key={text} className="legal-print-avoid flex gap-3 rounded-xl border border-slate-200 p-5 sm:p-6">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-healio-primary" aria-hidden="true" />
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </SectionHeading>

            <SectionHeading id="schlichtung" number="05" iconKind="comparison" iconTone="sky" title={t('erstinformation.dispute.title')}>
              <p>{t('erstinformation.dispute.intro')}</p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <article className="legal-print-avoid rounded-xl border border-slate-200 p-5 sm:p-6">
                  <h3 className="font-display text-lg font-bold text-slate-950">Versicherungsombudsmann e. V.</h3>
                  <address className="mt-3 not-italic">
                    Postfach 08 06 32<br />
                    10006 Berlin<br />
                    {t('erstinformation.status.phoneLabel')} 0800 3696000<br />
                    <a href="mailto:beschwerde@versicherungsombudsmann.de" className="break-all font-semibold text-slate-950 underline decoration-emerald-300 decoration-2 underline-offset-4">beschwerde@versicherungsombudsmann.de</a>
                  </address>
                  <div className="mt-3"><ExternalTextLink href="https://www.versicherungsombudsmann.de/">www.versicherungsombudsmann.de</ExternalTextLink></div>
                </article>
                <article className="legal-print-avoid rounded-xl border border-slate-200 p-5 sm:p-6">
                  <h3 className="font-display text-lg font-bold text-slate-950">Ombudsmann Private Kranken- und Pflegeversicherung</h3>
                  <address className="mt-3 not-italic">
                    Postfach 06 02 22<br />
                    10052 Berlin<br />
                    {t('erstinformation.status.phoneLabel')} 0800 2 55 04 44<br />
                    <a href="mailto:ombudsmann@pkv-ombudsmann.de" className="break-all font-semibold text-slate-950 underline decoration-emerald-300 decoration-2 underline-offset-4">ombudsmann@pkv-ombudsmann.de</a>
                  </address>
                  <div className="mt-3"><ExternalTextLink href="https://www.pkv-ombudsmann.de/">www.pkv-ombudsmann.de</ExternalTextLink></div>
                </article>
              </div>
            </SectionHeading>

            <SectionHeading id="beratungsgrundlage" number="06 · § 60 VVG" iconKind="document" title={t('erstinformation.advisoryBasis.title')}>
              <div className="legal-print-avoid rounded-2xl bg-[#061622] p-6 text-slate-300 sm:p-8 print:border print:border-slate-300 print:bg-white print:text-slate-700">
                <p className="font-display text-xl font-bold leading-8 text-white print:text-slate-950">{t('erstinformation.advisoryBasis.lead')}</p>
                <p className="mt-4">{t('erstinformation.advisoryBasis.text')}</p>
                <p className="mt-4">{t('erstinformation.advisoryBasis.restricted')}</p>
              </div>
            </SectionHeading>

            <div className="border-t border-slate-200 pt-8 text-sm leading-6 text-slate-500">
              <p>{t('erstinformation.closing')}</p>
              <button
                type="button"
                onClick={() => window.print()}
                className="mt-5 inline-flex items-center gap-2 font-bold text-slate-950 underline decoration-emerald-300 decoration-2 underline-offset-4 transition hover:text-healio-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary-dark focus-visible:ring-offset-4 print:hidden"
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                {t('erstinformation.print')}
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default ErstinformationPage;
