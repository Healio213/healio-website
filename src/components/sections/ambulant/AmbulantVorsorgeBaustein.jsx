import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, ChevronDown, ExternalLink, ShieldCheck } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import LeadCaptureLink from '@/components/LeadCaptureLink';
import { useLanguage } from '@/hooks/useLanguage';
import { getUkvAmbulantUrl, trackUkvAmbulantAntrag } from '@/components/sections/ambulant/ukvAmbulantLinks';

// Vorsorge-Baustein (UKV VorsorgePRIVAT) als klar abgegrenzte Zusatzoption
// unter der SDK-Tarifwahl (Vorgabe 05.10.2026). Das SDK-Gesundheitsbudget
// bleibt das Kernprodukt: kein zweiter Hauptknopf, keine Abfrage zum
// Gesundheitszustand. Alle Zahlen stammen aus den freigegebenen UKV-Fakten
// (Beiträge gültig ab 01.05.2026) in ambulant.json.
// Franks Entscheidung 05.10.2026: Auf der Website steht nur der Vorsorge-Baustein.
// Ein weiterer ambulanter UKV-Tarif wird nicht genannt; für den umfassenden
// ambulanten Schutz bleibt ausschließlich die SDK.
// Kompakt gehalten, damit die IKK-Strecke mobil nicht weit nach unten rutscht:
// sichtbar sind nur Nutzen, drei Beispiele, Leistung und Beitrag, zwei
// Pflichtangaben, der Knopf und der Verweis auf die SDK. Alles Weitere steht im
// gemeinsamen Aufklapper „Alle Details“.
const labelClass = 'text-sm font-bold uppercase tracking-[0.06em] text-slate-500 md:text-xs md:tracking-[0.12em]';
const detailTitleClass = 'font-display text-sm font-extrabold text-home-midnight';
const detailTextClass = 'mt-1 text-base leading-6 text-home-slate md:text-sm md:leading-6';

const AmbulantVorsorgeBaustein = () => {
  const { t } = useTranslation('ambulant');
  const { getPath } = useLanguage();
  const ukvUrl = getUkvAmbulantUrl();
  const text = (key) => t(`vorsorgeBaustein.${key}`);
  const list = (key) => {
    const value = t(`vorsorgeBaustein.${key}`, { returnObjects: true });
    return Array.isArray(value) ? value : [];
  };
  const ctaClass = 'home-focus inline-flex min-h-12 items-center justify-center rounded-full border border-home-midnight/20 bg-white px-6 text-center font-display text-sm font-extrabold text-home-midnight transition hover:border-home-mint hover:bg-home-ice sm:text-base';

  return (
    <aside
      id="vorsorge-baustein"
      aria-labelledby="vorsorge-baustein-title"
      data-healio-ambulant="vorsorge-baustein"
      className="mt-8 scroll-mt-20 overflow-hidden rounded-[2rem] border-2 border-emerald-600/40 bg-emerald-50 shadow-lg shadow-emerald-900/10 md:mt-14 md:border md:border-emerald-900/10 md:bg-home-ice md:shadow-none"
    >
      <div className="p-5 sm:p-8 lg:p-10">
        <div className="flex items-center gap-3 sm:items-start sm:gap-4">
          <span className="hidden shrink-0 sm:block"><FriendlyIcon kind="prevention" tone="mint" size="md" /></span>
          <div className="min-w-0">
            <p className="inline-block rounded-full bg-emerald-700 px-3 py-1 font-display text-sm font-extrabold uppercase tracking-[0.08em] text-white md:bg-transparent md:p-0 md:text-xs md:tracking-[0.18em] md:text-emerald-700">{text('eyebrow')}</p>
            <h3 id="vorsorge-baustein-title" className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-home-midnight [text-wrap:balance] sm:text-3xl">{text('title')}</h3>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-6 text-home-slate sm:leading-7">{text('lead')}</p>
        <p className="mt-2 max-w-3xl text-base leading-6 text-home-midnight md:text-sm md:leading-6">
          <span className="font-bold">{text('examplesTitle')}:</span> {list('examplesShort').join(' · ')}
        </p>

        <div className="mt-4 grid gap-x-6 gap-y-3 rounded-[1.4rem] border border-emerald-900/10 bg-white px-4 py-3 sm:grid-cols-2 md:px-5 md:py-4">
          <div className="min-w-0">
            <p className={labelClass}>{text('preventionLabel')}</p>
            <p className="mt-0.5 font-display text-xl font-extrabold tracking-[-0.02em] text-emerald-700 sm:text-2xl">{text('preventionValue')}</p>
            <p className="text-sm leading-5 text-slate-500 md:text-xs md:leading-5">{text('preventionStart')}</p>
          </div>
          <div className="min-w-0 border-t border-emerald-900/10 pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <p className={labelClass}>{text('priceLabel')}</p>
            <p className="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="font-display text-xl font-extrabold tracking-[-0.02em] text-home-midnight sm:text-2xl" data-healio-ambulant="vorsorge-price">
                {text('priceValue')} <span className="text-sm font-semibold tracking-normal text-home-slate">{text('perMonth')}</span>
              </span>
              <span className="text-sm text-home-slate">
                {text('priceChildLabel')} <strong className="whitespace-nowrap font-display font-extrabold text-home-midnight">{text('priceChildValue')}</strong>
              </span>
            </p>
            <p className="text-sm leading-5 text-slate-500 md:text-xs md:leading-5">{text('priceGlassesShort')}</p>
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1" data-healio-ambulant="vorsorge-facts">
          {list('facts').map((fact) => (
            <li key={fact} className="flex items-center gap-2 font-display text-base font-extrabold leading-6 text-home-midnight md:text-sm md:leading-6">
              <Check className="h-4 w-4 shrink-0 text-home-mint" aria-hidden="true" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>

        {/* Schwangere gehören in den SDK-Vorsorge-Topf, nicht in diesen Baustein
            (Gegenprüfung 05.10.2026). Bewusst sichtbar, nicht im Aufklapper,
            und direkt vor dem Antragslink, damit er vor dem Klick gelesen wird. */}
        <p className="mt-3 max-w-3xl text-base font-semibold leading-6 text-home-midnight md:text-sm md:leading-6" data-healio-ambulant="vorsorge-pregnancy">
          {text('pregnancyNote')}
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          {ukvUrl ? (
            <LeadCaptureLink
              href={ukvUrl}
              trackingCategory="ukv-vorsorge"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackUkvAmbulantAntrag()}
              data-healio-ambulant="vorsorge-cta"
              className={ctaClass}
            >
              {text('ctaLink')}
              <ExternalLink className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
            </LeadCaptureLink>
          ) : (
            <Link to={getPath('kontakt')} data-healio-ambulant="vorsorge-cta" className={ctaClass}>
              {text('cta')}
              <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          )}
          <p className="text-center text-sm leading-5 text-slate-500 sm:max-w-sm sm:text-left md:text-xs md:leading-5">{ukvUrl ? text('ctaLinkHint') : text('ctaHint')}</p>
        </div>

        <div className="mt-5 flex items-start gap-3 border-t border-emerald-900/10 pt-4">
          <ShieldCheck className="mt-0.5 hidden h-5 w-5 shrink-0 text-home-mint sm:block" aria-hidden="true" />
          <p className="font-display text-base font-extrabold leading-6 text-home-midnight">{text('sdkTitle')}</p>
        </div>

        <details className="group mt-4 rounded-[1.4rem] border border-emerald-900/10 bg-white/60" data-healio-ambulant="vorsorge-details">
          <summary className="home-focus flex cursor-pointer list-none items-start justify-between gap-3 px-5 py-3 [&::-webkit-details-marker]:hidden">
            <span className="min-w-0">
              <span className="block font-display text-sm font-extrabold leading-6 text-home-midnight">{text('detailsTitle')}</span>
              <span className="hidden text-sm leading-5 text-slate-500 sm:block md:text-xs md:leading-5">{text('detailsHint')}</span>
            </span>
            <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-home-midnight transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="space-y-6 border-t border-emerald-900/10 px-5 py-5">
            <div>
              <p className={detailTitleClass}>{text('preventionLabel')}</p>
              <p className={detailTextClass}>{text('preventionStaffel')}</p>
              <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {list('examples').map((item) => (
                  <li key={item} className="flex gap-2.5 text-base leading-6 text-home-midnight md:text-sm md:leading-6">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-home-mint" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-5 text-slate-500 md:text-xs md:leading-5">{text('preventionRule')}</p>
            </div>

            <div>
              <p className={detailTitleClass}>{text('includedTitle')}</p>
              <dl className="mt-2 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {list('included').map((item) => (
                  <div key={item.label} className="min-w-0">
                    <dt className="text-sm font-semibold text-home-midnight">{item.label}</dt>
                    <dd className="mt-0.5 text-base leading-6 text-home-slate md:text-sm md:leading-6">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="min-w-0">
                <p className={detailTitleClass}>{text('applicationTitle')}</p>
                <p className={detailTextClass}>{text('questionsNote')}</p>
              </div>
              <div className="min-w-0">
                <p className={detailTitleClass}>{text('fitTitle')}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {list('fit').map((item) => (
                    <span key={item} className="rounded-full border border-emerald-900/10 bg-white px-3 py-1.5 text-sm font-semibold text-home-slate md:text-xs">{item}</span>
                  ))}
                </div>
                <p className={`${detailTextClass} mt-3`}>{text('sdkText')}</p>
              </div>
            </div>

            <p className="text-sm leading-5 text-slate-500 md:text-xs md:leading-5">{text('priceGlasses')} {text('priceAgeRule')} {text('disclosure')}</p>
          </div>
        </details>
      </div>
    </aside>
  );
};

export default AmbulantVorsorgeBaustein;
