import React from 'react';
import { ArrowUp, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

// Drei Antworten für Familien (Frank 29.09.2026): SDK ohne Vorlauf, die
// Bayerische mit Vorlauf, dazu die Kindertarife. Nur belegte Punkte aus den
// AVB der SDK (SP1/SP2 08/2025) und der Bayerischen (AVB B 275000 Stand
// 11/2024, TB 11/2024). Bayerische-Karte seit 05.10.2026: Familienzimmer
// Prestige ohne Begrenzung, Komfort bis Zweibettzimmer (TB 2.1, Highlightblatt
// B 275008), nur über den Vertrag der Mutter (Auskunft der Bayerischen
// 05.10.2026), Begleitperson 100 Prozent unter 16 (TB 2.3).
// Hebamme: SDK laut Bedingungen (SP1/SP2). Hebammen-Aussage der Bayerischen
// laut Produktunterlagen (Highlightblatt B 275008, Produktsteckbrief B 275010),
// Freigabe Frank 29.09.2026, bestätigt 06.10.2026; nicht in den
// Tarifbedingungen, schriftliche Bestätigung beim Versicherer angefragt.
const CARDS = [
  { key: 'parents', icon: 'pregnancy', tone: 'coral', border: 'border-[#f0cfc0]', accent: 'text-[#b75f42]', noteBg: 'bg-[#fff4ef]' },
  { key: 'bayerische', icon: 'calendar', tone: 'sky', border: 'border-[#cfe0f0]', accent: 'text-[#2b6497]', noteBg: 'bg-[#f1f7fd]' },
  { key: 'children', icon: 'family', tone: 'mint', border: 'border-[#c9e7dc]', accent: 'text-[#087454]', noteBg: 'bg-[#eefaf5]' },
];

const MIDWIFE_TONES = {
  kasse: 'bg-[#eefaf5] text-[#075f46]',
  sdk: 'bg-[#fff4ef] text-[#a4523a]',
  bay: 'bg-[#f1f7fd] text-[#1f4f7a]',
  nicht: 'bg-slate-100 text-slate-600',
};

const asList = (value) => (Array.isArray(value) ? value : []);

const StationaerFamily = () => {
  const { t } = useTranslation('stationaer');
  const midwifeRows = asList(t('refresh.family.midwife.rows', { returnObjects: true }));

  return (
    <section id="familie" className="relative scroll-mt-24 overflow-hidden bg-[#fff8e9] py-20 md:py-24" aria-labelledby="stationaer-family-heading">
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#25c990]/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#9a6713]">
            {t('refresh.family.eyebrow')}
          </p>
          <h2 id="stationaer-family-heading" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#071726] [text-wrap:balance] sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            {t('refresh.family.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 [text-wrap:pretty] sm:text-lg">
            {t('refresh.family.subtitle')}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.key}
              className={`flex flex-col rounded-[1.9rem] border ${card.border} bg-white p-6 shadow-[0_18px_48px_rgba(79,55,35,0.08)] sm:p-8`}
              data-healio-family-card={card.key}
            >
              <FriendlyIcon kind={card.icon} tone={card.tone} size="md" />
              <p className={`mt-5 text-xs font-extrabold uppercase tracking-[0.16em] ${card.accent}`}>{t(`refresh.family.${card.key}.label`)}</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight text-[#071726] [text-wrap:balance]">{t(`refresh.family.${card.key}.title`)}</h3>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">{t(`refresh.family.${card.key}.body`)}</p>
              <ul className="mb-6 mt-5 space-y-3 text-sm text-slate-700">
                {asList(t(`refresh.family.${card.key}.items`, { returnObjects: true })).map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${card.accent}`} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className={`mt-auto rounded-2xl ${card.noteBg} p-4 text-sm font-medium leading-relaxed text-slate-600`}>
                {t(`refresh.family.${card.key}.note`)}
              </p>
            </article>
          ))}
        </div>

        <article
          id="hebamme"
          className="mt-8 grid scroll-mt-24 gap-8 rounded-[1.9rem] border border-[#f0cfc0] bg-white p-6 shadow-[0_18px_48px_rgba(79,55,35,0.08)] sm:p-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:p-10"
          aria-labelledby="stationaer-hebamme-heading"
          data-healio-midwife="stationaer"
        >
          <div>
            <FriendlyIcon kind="pregnancy" tone="coral" size="md" />
            <p className="mt-6 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[#b75f42]">
              {t('refresh.family.midwife.eyebrow')}
            </p>
            <h3 id="stationaer-hebamme-heading" className="mt-3 font-display text-2xl font-extrabold leading-[1.12] tracking-[-0.03em] text-[#071726] [text-wrap:balance] sm:text-3xl">
              {t('refresh.family.midwife.title')}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600 [text-wrap:pretty]">
              {t('refresh.family.midwife.lead')}
            </p>
          </div>

          <dl className="divide-y divide-slate-100">
            {midwifeRows.map((row) => (
              <div key={row.who} className="py-5 first:pt-0 last:pb-0">
                <dt>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] ${MIDWIFE_TONES[row.tone] || MIDWIFE_TONES.nicht}`}>
                    {row.who}
                  </span>
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {row.text}
                  {row.condition && (
                    <span className="mt-2 block text-sm text-slate-500">{row.condition}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </article>

        <div className="mt-8 text-center">
          <a
            href="#tarife"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#0a6c50] px-5 py-2.5 text-sm font-extrabold text-[#075f46] transition hover:bg-[#075f46] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075f46]"
          >
            {t('refresh.family.cta')}
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default StationaerFamily;
