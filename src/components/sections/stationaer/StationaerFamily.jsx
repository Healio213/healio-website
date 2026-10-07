import React, { useCallback, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUp, Check, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

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
  const reduceMotion = useReducedMotion();
  // Nur mobil (unter md): die drei langen Antworten stehen als Akkordeon. Die
  // erste Karte (werdende Eltern) startet offen, weil dort die Bedingungen der
  // Neugeborenen-Nachversicherung stehen (Frist, Ausschluss bei festgestellter
  // Schwangerschaft) und die Zusage im Untertitel sonst ohne sie dasteht. Die
  // anderen beiden starten zugeklappt (Experiment Handy-Conversion 10/2026).
  // Ab md sind alle drei Karten wie bisher dauerhaft offen.
  const [openCard, setOpenCard] = useState(CARDS[0].key);

  const toggleCard = useCallback((key, event) => {
    const article = event.currentTarget.closest('article');
    setOpenCard((current) => (current === key ? null : key));
    // Die Karte nach dem Umschalten oben in den Blick holen, weil die zuvor
    // offene Karte darüber zuklappt und den Inhalt nach oben schiebt.
    window.requestAnimationFrame(() => {
      if (!article) return;
      const top = article.getBoundingClientRect().top;
      if (top < 80 || top > window.innerHeight * 0.6) {
        article.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  }, [reduceMotion]);

  return (
    <section id="familie" className="relative scroll-mt-24 overflow-hidden bg-[#fff8e9] py-12 md:py-24" aria-labelledby="stationaer-family-heading">
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#25c990]/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#9a6713] md:text-xs md:tracking-[0.22em]">
            {t('refresh.family.eyebrow')}
          </p>
          <h2 id="stationaer-family-heading" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#071726] [text-wrap:balance] sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            {t('refresh.family.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 [text-wrap:pretty] sm:text-lg">
            {t('refresh.family.subtitle')}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:mt-12 md:gap-6 lg:grid-cols-3">
          {CARDS.map((card) => {
            const isOpen = openCard === card.key;
            const panelId = `stationaer-family-${card.key}`;
            return (
              <article
                key={card.key}
                className={`flex scroll-mt-24 flex-col rounded-[1.9rem] border ${card.border} bg-white p-5 shadow-[0_8px_24px_rgba(79,55,35,0.07)] sm:p-8 md:shadow-[0_18px_48px_rgba(79,55,35,0.08)]`}
                data-healio-family-card={card.key}
              >
                {/* Mobil: Kopf als Schalter mit Icon, Kennzeichnung und Titel. */}
                <h3 className="md:hidden">
                  <button
                    type="button"
                    onClick={(event) => toggleCard(card.key, event)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex min-h-14 w-full items-center gap-3 rounded-2xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075f46]"
                  >
                    <FriendlyIcon kind={card.icon} tone={card.tone} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-extrabold uppercase tracking-[0.1em] ${card.accent}`}>{t(`refresh.family.${card.key}.label`)}</span>
                      <span className="mt-1 block font-display text-xl font-extrabold leading-tight text-[#071726] [text-wrap:balance]">{t(`refresh.family.${card.key}.title`)}</span>
                    </span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[#087454] transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                </h3>
                {/* Ab md: Kopf wie bisher, immer sichtbar. */}
                <div className="hidden md:flex md:flex-col">
                  <FriendlyIcon kind={card.icon} tone={card.tone} size="md" />
                  <p className={`mt-5 text-xs font-extrabold uppercase tracking-[0.16em] ${card.accent}`}>{t(`refresh.family.${card.key}.label`)}</p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight text-[#071726] [text-wrap:balance]">{t(`refresh.family.${card.key}.title`)}</h3>
                </div>
                <div id={panelId} className={`${isOpen ? 'flex flex-col' : 'hidden'} md:contents`}>
                  <p className="mt-4 text-base leading-relaxed text-slate-600 md:mt-5 md:leading-6">{t(`refresh.family.${card.key}.body`)}</p>
                  <ul className="mb-5 mt-4 space-y-3 text-base text-slate-700 md:mb-6 md:mt-5 md:text-sm">
                    {asList(t(`refresh.family.${card.key}.items`, { returnObjects: true })).map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className={`mt-1 h-4 w-4 shrink-0 md:mt-0.5 ${card.accent}`} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-auto rounded-2xl ${card.noteBg} p-4 text-base font-medium leading-relaxed text-slate-600 md:text-sm md:leading-relaxed`}>
                    {t(`refresh.family.${card.key}.note`)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <article
          id="hebamme"
          className="mt-6 grid scroll-mt-24 grid-cols-[minmax(0,1fr)] gap-6 rounded-[1.9rem] border border-[#f0cfc0] bg-white p-5 shadow-[0_18px_48px_rgba(79,55,35,0.08)] sm:p-8 md:mt-8 md:gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:p-10"
          aria-labelledby="stationaer-hebamme-heading"
          data-healio-midwife="stationaer"
        >
          <div>
            <FriendlyIcon kind="pregnancy" tone="coral" size="md" className="!h-12 !w-12 md:!h-16 md:!w-16" />
            <p className="mt-4 font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[#b75f42] md:mt-6 md:text-xs md:tracking-[0.18em]">
              {t('refresh.family.midwife.eyebrow')}
            </p>
            <h3 id="stationaer-hebamme-heading" className="mt-3 font-display text-2xl font-extrabold leading-[1.12] tracking-[-0.03em] text-[#071726] [text-wrap:balance] sm:text-3xl">
              {t('refresh.family.midwife.title')}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600 [text-wrap:pretty]">
              {t('refresh.family.midwife.lead')}
            </p>
          </div>

          {/* Mobil Wischreihe mit vier kleinen Karten; ab md bleibt es die
              bisherige Liste mit Trennlinien. */}
          <MobileSwipeRow
            label={t('refresh.family.midwife.title')}
            className="min-w-0"
            desktopClassName="-mx-5 scroll-pl-5 px-5 sm:-mx-8 sm:scroll-pl-8 sm:px-8 md:mx-0 md:block md:divide-y md:divide-slate-100 md:px-0"
            itemClassName="md:py-5 md:first:pt-0 md:last:pb-0"
            mobileItemWidth="w-[calc(100%-2rem)]"
            bleed={false}
          >
            {midwifeRows.map((row) => (
              <dl key={row.who} className="h-full rounded-2xl border border-[#f3e1d8] bg-[#fffaf7] p-5 md:rounded-none md:border-0 md:bg-transparent md:p-0">
                <dt>
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-extrabold uppercase tracking-[0.1em] md:text-xs md:tracking-[0.12em] ${MIDWIFE_TONES[row.tone] || MIDWIFE_TONES.nicht}`}>
                    {row.who}
                  </span>
                </dt>
                <dd className="mt-3 text-base leading-relaxed text-slate-700 md:leading-6">
                  {row.text}
                  {row.condition && (
                    <span className="mt-2 block text-sm text-slate-500">{row.condition}</span>
                  )}
                </dd>
              </dl>
            ))}
          </MobileSwipeRow>
        </article>

        <div className="mt-6 text-center md:mt-8">
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
