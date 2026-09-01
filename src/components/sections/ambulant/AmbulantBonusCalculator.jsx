
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useReferrer } from '@/hooks/useReferrer';
import { buildSdkUrl, trackSdkClick, trackIkkClick, IKK_LINK } from '@/lib/sdk-url';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowRightLeft, Plus, Minus, Pencil, ChevronDown, HeartHandshake, Watch } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { TextHighlight } from '@/components/ui/ScrollAnimation';
import { trackEvent } from '@/lib/analytics';
import { calculateIkkBonus, capActivityCount } from '@/lib/ikkBonusCalculator';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

// IKK classic Bonustabelle 2026. Geldbonus und Zuschuss sind Alternativen;
// der Zuschuss beträgt das Dreifache des Geldbonus und ist auf die
// nachgewiesenen zuschussfähigen Kosten begrenzt.
const ACTIVITY_DEFS = [
  // Gesetzliche Vorsorge und Impfungen
  // Bestehende Rechnergrenze für den jährlichen Beispielpfad.
  { id: 'impfung', cash: 5, subsidy: 15, countable: true, max: 8 },
  { id: 'zahn', cash: 5, subsidy: 15, countable: true, max: 2 },
  { id: 'zahnFrueh', cash: 5, subsidy: 15, countable: true, max: 6 },
  { id: 'hautkrebs', cash: 10, subsidy: 30 },
  { id: 'ultraschall', cash: 10, subsidy: 30 },
  { id: 'mammographie', cash: 10, subsidy: 30 },
  // Das dokumentierte 1.155-EUR-Beispiel setzt zwölf anerkannte Vorsorgen an.
  { id: 'mutterschaft', cash: 10, subsidy: 30, countable: true, max: 12 },
  { id: 'kind', cash: 10, subsidy: 30, countable: true, max: 12 },
  { id: 'jugend', cash: 10, subsidy: 30, countable: true, max: 2 },
  { id: 'amblyopie', cash: 10, subsidy: 30, countable: true, max: 2 },
  { id: 'lungenkrebs', cash: 10, subsidy: 30 },
  { id: 'checkup', cash: 10, subsidy: 30 },
  { id: 'krebs', cash: 10, subsidy: 30 },
  { id: 'darmkrebs', cash: 10, subsidy: 30 },
  // Regelmäßige Aktivitäten
  { id: 'outdoorSport', cash: 25, subsidy: 75, category: 'regular' },
  { id: 'rueckbildung', cash: 25, subsidy: 75, category: 'regular' },
  { id: 'kurs', cash: 25, subsidy: 75, category: 'regular', tip: true },
  { id: 'fitness', cash: 25, subsidy: 75, category: 'regular', tip: true },
  { id: 'sport', cash: 25, subsidy: 75, category: 'regular' },
  // Statuswerte zählen nur zusammen mit mindestens einer regelmäßigen Aktivität.
  { id: 'abzeichen', cash: 25, subsidy: 75, category: 'status' },
  { id: 'leistungsabzeichen', cash: 25, subsidy: 75, category: 'status' },
  { id: 'bmi', cash: 25, subsidy: 75, category: 'status' },
  { id: 'blutdruck', cash: 25, subsidy: 75, category: 'status' },
];

const IKK_BONUS_2026_INFO = 'https://cdn.ikk-classic.de/exporter/19125-infoblatt-ikkbonus.pdf';

// ctaOverride: { href, label } ersetzt den SDK-Abschluss-CTA, z.B. auf /zahn
// (dort soll der Button zur Tarif-Weiche scrollen statt zur SDK-Strecke).
// Seitenspezifische Angaben (Beispielbeitrag, Tarifzeile, "Unterm Strich"-Werte)
// kommen per Props, damit /zahn und /stationaer nicht die Ambulant-Werte zeigen.
const AmbulantBonusCalculator = ({
  ctaOverride,
  secondaryCtaOverride,
  tarifTypes = 'Ambulant',
  defaultMonatsbeitrag = 44.13,
  tariffInfoText,
  effectiveLabel,
  effectiveValue,
  effectiveNote,
  bonusPayoutText,
  embedded = false,
}) => {
  const { t, i18n } = useTranslation('ambulant');
  const referrer = useReferrer();
  const calculatorUrl = buildSdkUrl({ ref: referrer, tarifTypes });
  const ikkLink = IKK_LINK;

  const handleOverrideClick = (e) => {
    if (ctaOverride && ctaOverride.href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(ctaOverride.href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const ACTIVITIES = useMemo(() => ACTIVITY_DEFS.map(def => ({
    ...def,
    title: t(`bonusCalculator.activities.${def.id}.title`),
    desc: t(`bonusCalculator.activities.${def.id}.desc`),
    unit: t(`bonusCalculator.activities.${def.id}.unit`, { defaultValue: '' }),
  })), [t]);

  // Seitenspezifischer Orientierungswert; im eingebetteten Ambulant-Funnel
  // wird der aktuell veröffentlichte SDK-Wert explizit übergeben.
  const DEFAULT_MONATSBEITRAG = defaultMonatsbeitrag;

  // Typische Beispiel-Vorauswahl (Conversion-Paket 2, 17.08.2026): Der Rechner
  // begrüßte Besucher vorher mit 0 EUR Bonus und negativem Ergebnis in Warngelb,
  // das exakte Gegenteil des Hero-Versprechens. Das UI kennzeichnet die
  // Vorauswahl ausdrücklich als anpassbares Beispiel.
  const EXAMPLE_SELECTION = {
    kurs: true,
    fitness: true,
    checkup: true,
    zahn: 2,
    hautkrebs: true,
    blutdruck: true,
    bmi: true,
  };

  const [selectedActivities, setSelectedActivities] = useState(EXAMPLE_SELECTION);
  const [monatsbeitrag, setMonatsbeitrag] = useState(DEFAULT_MONATSBEITRAG);
  const [beitragEditing, setBeitragEditing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const beitragInputRef = useRef(null);
  const analyticsTimer = useRef(null);
  const usageTracked = useRef(false);

  const handleToggle = (id) => {
    setSelectedActivities((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCount = (id, delta, max) => {
    setSelectedActivities((prev) => {
      const current = Number(prev[id]);
      const next = capActivityCount((Number.isFinite(current) ? current : 0) + delta, max);
      return { ...prev, [id]: next };
    });
  };

  const handleReset = () => {
    setSelectedActivities({});
    setMonatsbeitrag(DEFAULT_MONATSBEITRAG);
  };

  const handleBeitragChange = (e) => {
    const val = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    setMonatsbeitrag(val === '' ? '' : Number(val));
  };

  const handleBeitragBlur = () => {
    setBeitragEditing(false);
    if (monatsbeitrag === '' || isNaN(monatsbeitrag) || monatsbeitrag < 0) {
      setMonatsbeitrag(DEFAULT_MONATSBEITRAG);
    }
  };

  const numberLocale = i18n.language?.startsWith('en') ? 'en-US' : 'de-DE';
  const formatEuro = (value) => new Intl.NumberFormat(numberLocale, {
    minimumFractionDigits: Number.isInteger(Number(value)) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

  const jahresbeitrag = Math.round((monatsbeitrag || 0) * 1200) / 100;

  const hasRegularActivity = useMemo(() => ACTIVITY_DEFS.some((activity) => (
    activity.category === 'regular' && Boolean(selectedActivities[activity.id])
  )), [selectedActivities]);

  const hasBlockedStatusValue = useMemo(() => !hasRegularActivity && ACTIVITY_DEFS.some((activity) => (
    activity.category === 'status' && Boolean(selectedActivities[activity.id])
  )), [hasRegularActivity, selectedActivities]);

  const { totalCashBonus, totalSubsidyPotential } = useMemo(() => {
    return calculateIkkBonus({
      activityDefs: ACTIVITY_DEFS,
      selectedActivities,
      hasRegularActivity,
    });
  }, [hasRegularActivity, selectedActivities]);

  const anrechenbarerZuschuss = Math.min(totalSubsidyPotential, jahresbeitrag);
  const effektivKosten = Math.max(0, Math.round((jahresbeitrag - anrechenbarerZuschuss) * 100) / 100);
  const ungenutztesZuschusspotenzial = Math.max(0, Math.round((totalSubsidyPotential - anrechenbarerZuschuss) * 100) / 100);

  const trackUsage = useCallback(() => {
    if (totalSubsidyPotential === 0 || usageTracked.current) return;
    const tracked = trackEvent('bonus_calculator_used', {
      component: 'bonus_calculator',
      interaction_type: 'configured',
    });
    if (tracked) usageTracked.current = true;
  }, [totalSubsidyPotential]);

  useEffect(() => {
    if (totalSubsidyPotential === 0) return;
    if (analyticsTimer.current) clearTimeout(analyticsTimer.current);
    analyticsTimer.current = setTimeout(trackUsage, 1500);
    return () => { if (analyticsTimer.current) clearTimeout(analyticsTimer.current); };
  }, [totalSubsidyPotential, trackUsage]);

  useEffect(() => {
    if (beitragEditing && beitragInputRef.current) {
      beitragInputRef.current.focus();
      beitragInputRef.current.select();
    }
  }, [beitragEditing]);

  // Parse title with <highlight> tags
  const rawTitle = t('bonusCalculator.title');
  const titleParts = rawTitle.split(/<highlight>(.*?)<\/highlight>/);

  return (
    <section id="bonus-calculator" className={`scroll-mt-24 font-sans ${embedded ? 'bg-transparent py-0' : 'bg-white py-12 md:py-24'}`}>
      <div className={embedded ? 'mx-auto max-w-7xl' : 'container mx-auto px-4 max-w-7xl'}>
        {/* Header Section */}
        {!embedded && <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-controls="bonus-calculator-content"
          className="mb-6 flex w-full items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-white p-5 text-left shadow-lg md:hidden"
        >
          <div>
            <h2 className="text-2xl font-extrabold leading-tight text-healio-dark">
              {titleParts.map((part, i) =>
                i % 2 === 1
                  ? <TextHighlight key={i}>{part}</TextHighlight>
                  : <React.Fragment key={i}>{part}</React.Fragment>
              )}
            </h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-gray-600">
              {t('bonusCalculator.subtitle')}
            </p>
          </div>
          <ChevronDown className={`h-6 w-6 flex-shrink-0 text-emerald-500 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>}

        <div className={`${embedded ? 'hidden' : 'hidden md:block'} text-center mb-16`}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-healio-dark mb-4"
          >
            {titleParts.map((part, i) =>
              i % 2 === 1
                ? <TextHighlight key={i}>{part}</TextHighlight>
                : <React.Fragment key={i}>{part}</React.Fragment>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto font-medium"
          >
            {t('bonusCalculator.subtitle')}
          </motion.p>
        </div>

        {/* Two Column Layout */}
        <div id="bonus-calculator-content" className={`${embedded || mobileOpen ? 'flex' : 'hidden'} md:flex flex-col lg:flex-row gap-6 lg:gap-12 items-start relative`}>

          {/* Left Column: Checkboxes (60%) */}
          <div className="w-full lg:w-[60%] bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-healio-dark mb-2">{t('bonusCalculator.selectActivities')}</h3>
            <p className="mb-6 text-sm font-medium text-gray-500">{t('bonusCalculator.exampleNote')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACTIVITIES.map((activity, index) => {
                const def = ACTIVITY_DEFS[index];
                const isMulti = !!def.countable;
                const count = isMulti ? capActivityCount(selectedActivities[def.id], def.max) : 0;
                const isActive = isMulti ? count > 0 : !!selectedActivities[def.id];
                const units = isMulti ? count : 1;
                const displayCash = units * def.cash;
                const displaySubsidy = units * def.subsidy;
                const statusBlocked = def.category === 'status' && isActive && !hasRegularActivity;

                return (
                  <motion.div
                    key={def.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-300 select-none
                      ${isActive
                        ? 'border-healio-primary bg-healio-light'
                        : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-md'
                      } ${!isMulti ? 'cursor-pointer' : ''}`}
                    onClick={!isMulti ? () => handleToggle(def.id) : undefined}
                    onKeyDown={!isMulti ? (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleToggle(def.id);
                      }
                    } : undefined}
                    role={!isMulti ? 'checkbox' : undefined}
                    aria-checked={!isMulti ? isActive : undefined}
                    aria-label={!isMulti ? `${activity.title}. ${activity.desc}. ${def.cash} ${t('bonusCalculator.cashShort')}, ${def.subsidy} ${t('bonusCalculator.subsidyShort')}.` : undefined}
                    tabIndex={!isMulti ? 0 : undefined}
                  >
                    {!isMulti && (
                      <div className="mt-1">
                        <Checkbox
                          id={def.id}
                          checked={isActive}
                          tabIndex={-1}
                          aria-hidden="true"
                          className="pointer-events-none data-[state=checked]:bg-healio-primary data-[state=checked]:border-healio-primary"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-healio-dark leading-tight mb-1">
                        {activity.title}
                        {def.tip && <span className="ml-2 inline-block bg-amber-100 text-amber-700 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">{t('bonusCalculator.tip')}</span>}
                      </div>
                      <div className={`text-sm leading-snug ${def.tip ? 'text-amber-600 font-medium' : 'text-gray-500'}`}>
                        {activity.desc}
                      </div>
                      {isMulti && (
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => handleCount(def.id, -1, def.max)}
                            aria-label={`${activity.title}: ${t('bonusCalculator.decrease')}`}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-healio-primary hover:bg-gray-100 hover:text-healio-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-2 disabled:opacity-30"
                            disabled={count === 0}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-bold text-healio-dark text-lg">{count}</span>
                          <button
                            type="button"
                            onClick={() => handleCount(def.id, 1, def.max)}
                            aria-label={`${activity.title}: ${t('bonusCalculator.increase')}`}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-healio-primary hover:bg-gray-100 hover:text-healio-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-2 disabled:opacity-30"
                            disabled={count >= def.max}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs text-gray-400 ml-1">
                            {def.max ? `${t('bonusCalculator.max')} ${def.max}` : activity.unit}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className={`whitespace-nowrap flex-shrink-0 text-right ${statusBlocked ? 'text-amber-700' : 'text-healio-primary'}`}>
                      {isMulti && count > 1 && (
                        <span className="block text-[11px] font-normal text-gray-400">{count}×</span>
                      )}
                      <span className="block text-xs font-bold">{displayCash} € {t('bonusCalculator.cashShort')}</span>
                      <span className="block text-sm font-extrabold">{displaySubsidy} € {t('bonusCalculator.subsidyShort')}</span>
                      {statusBlocked && <span className="block text-[10px] font-bold">{t('bonusCalculator.notCounted')}</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {hasBlockedStatusValue && (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium leading-relaxed text-amber-900" role="status">
                {t('bonusCalculator.statusCondition')}
              </div>
            )}

            {/* Vertrauens-Hinweis */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
              <HeartHandshake className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-700" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-blue-900 mb-1">{t('bonusCalculator.trustNote')}</p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {t('bonusCalculator.trustNoteDesc')}
                </p>
                <a
                  href={IKK_BONUS_2026_INFO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex text-xs font-bold text-blue-900 underline decoration-blue-400 underline-offset-2 hover:text-blue-700"
                >
                  {t('bonusCalculator.officialSource')}
                </a>
              </div>
            </div>

            {/* Apple Watch Hinweis */}
            <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-4 flex gap-3 items-start">
              <Watch className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-700" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-purple-900 mb-1">{t('bonusCalculator.appleWatchNote')}</p>
                <p className="text-sm text-purple-800 leading-relaxed">
                  {t('bonusCalculator.appleWatchNoteDesc')}
                </p>
              </div>
            </div>

            <div className="mt-4 text-center md:text-left">
              <button
                onClick={handleReset}
                className="text-gray-400 hover:text-healio-dark underline text-sm font-medium transition-colors"
              >
                {t('bonusCalculator.resetSelection')}
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Result Box (40%) */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#081f2b] via-[#064b3d] to-[#03362f] p-8 shadow-xl lg:p-10"
            >
              <div className="relative z-10 text-center">
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4">
                  {t('bonusCalculator.yourBonus')}
                </h3>

                <div className="flex justify-center items-center h-32 mb-6" aria-live="polite" aria-atomic="true">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={anrechenbarerZuschuss}
                      initial={{ scale: 0.8, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 1.2, opacity: 0, y: -20 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="text-6xl lg:text-7xl font-extrabold tracking-tighter text-white"
                    >
                      {formatEuro(anrechenbarerZuschuss)} €
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Netto-Vergleich mit editierbarem Beitrag */}
                <div className="bg-white/15 rounded-xl p-4 mb-6 backdrop-blur-sm">
                  <p className="text-white/80 text-sm font-medium mb-3">{tariffInfoText || t('bonusCalculator.tariffInfo')}</p>

                  {/* Editierbarer Monatsbeitrag */}
                  <div className="flex justify-between items-center text-white text-sm mb-2">
                    <span>{t('bonusCalculator.yourMonthly')}</span>
                    {beitragEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          ref={beitragInputRef}
                          type="text"
                          inputMode="decimal"
                          aria-label={t('bonusCalculator.monthlyInputLabel')}
                          value={monatsbeitrag}
                          onChange={handleBeitragChange}
                          onBlur={handleBeitragBlur}
                          onKeyDown={(e) => e.key === 'Enter' && handleBeitragBlur()}
                          className="w-16 bg-white/20 border border-white/40 rounded px-2 py-0.5 text-white text-right font-bold text-sm focus:outline-none focus:border-white"
                        />
                        <span className="font-bold">€</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setBeitragEditing(true)}
                        aria-label={t('bonusCalculator.editMonthlyLabel', { amount: formatEuro(monatsbeitrag) })}
                        className="flex items-center gap-1.5 font-bold hover:bg-white/10 rounded px-2 py-0.5 transition-colors group"
                      >
                        <span>{formatEuro(monatsbeitrag)} {t('bonusCalculator.perMonth')}</span>
                        <Pencil className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </div>

                  <div className="flex justify-between text-white text-sm mb-1">
                    <span>{t('bonusCalculator.yearlyContribution')}</span>
                    <span className="font-bold">{formatEuro(jahresbeitrag)} €</span>
                  </div>
                  <div className="flex justify-between text-white text-sm mb-1">
                    <span>{t('bonusCalculator.subsidyPotentialLabel')}</span>
                    <span className="font-bold">{formatEuro(totalSubsidyPotential)} €</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-white/30 font-extrabold text-green-100">
                    <span>{t('bonusCalculator.eligibleSubsidyLabel')}</span>
                    <span>{formatEuro(anrechenbarerZuschuss)} €</span>
                  </div>

                  <div className="mt-3 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-left text-sm text-white">
                    <span className="font-semibold">{t('bonusCalculator.orCashBonus')}</span>{' '}
                    <span className="font-extrabold">{formatEuro(totalCashBonus)} €</span>
                  </div>

                  {ungenutztesZuschusspotenzial > 0 && (
                    <p className="mt-3 text-left text-xs leading-relaxed text-white/85">
                      {t('bonusCalculator.unusedPotential', { amount: formatEuro(ungenutztesZuschusspotenzial) })}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-white/80">
                    {t('bonusCalculator.editHint')}
                  </p>
                </div>

                {/* Der Tausch unterm Strich: effektive Kosten gegen 3.000-EUR-Budget */}
                <div className="bg-white rounded-xl p-5 mb-6 text-left shadow-lg">
                  <p className="text-healio-dark text-sm font-extrabold uppercase tracking-wide mb-3">
                    {t('bonusCalculator.effectiveTitle')}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600 text-sm font-medium">{t('bonusCalculator.effectiveCosts')}</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={effektivKosten}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        className={`text-3xl font-extrabold whitespace-nowrap ${effektivKosten === 0 ? 'text-healio-primary' : 'text-healio-dark'}`}
                      >
                        {formatEuro(effektivKosten)} €
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  {effektivKosten === 0 && totalSubsidyPotential > 0 && (
                    <p className="text-healio-primary text-xs font-bold mt-1">
                      {t('bonusCalculator.effectiveZeroNote')}
                    </p>
                  )}
                  <div className="my-3 border-t border-gray-100" />
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <span className="text-gray-600 text-sm font-medium">{effectiveLabel || t('bonusCalculator.effectiveBudget')}</span>
                    <span className="text-2xl font-extrabold text-healio-dark">{effectiveValue || t('bonusCalculator.effectiveBudgetValue')}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                    {effectiveNote || t('bonusCalculator.effectiveNote')}
                  </p>
                </div>

                <p className="text-white/90 text-sm leading-relaxed mb-8 max-w-sm mx-auto font-medium">
                  {bonusPayoutText || t('bonusCalculator.bonusPayout')}
                  <span className="mt-2 block text-xs text-white/80">{t('bonusCalculator.choiceDisclaimer')}</span>
                </p>

                <div className="flex flex-col gap-4">
                  {ctaOverride ? (
                    <a
                      href={ctaOverride.href}
                      onClick={handleOverrideClick}
                      className="inline-flex items-center justify-center bg-white text-healio-primary font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-full"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      {ctaOverride.label}
                    </a>
                  ) : (
                    <a
                      href={calculatorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackSdkClick('bonus-calculator', referrer)}
                      className="inline-flex items-center justify-center bg-white text-healio-primary font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-full"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      {t('bonusCalculator.ctaCalculate')}
                    </a>
                  )}

                  <a
                    href={secondaryCtaOverride?.href || ikkLink}
                    target={secondaryCtaOverride?.href?.startsWith('/') ? undefined : '_blank'}
                    rel={secondaryCtaOverride?.href?.startsWith('/') ? undefined : 'noopener noreferrer'}
                    onClick={(e) => {
                      if (secondaryCtaOverride) {
                        secondaryCtaOverride.onClick?.(e);
                        return;
                      }
                      // Funnel-Fix 17.08.2026: erst der Zusatzschutz, dann der
                      // IKK-Wechsel. Wenn der Erklär-Abschnitt auf der Seite
                      // existiert, dorthin scrollen statt direkt in den
                      // Mitgliedsantrag zu springen.
                      const section = document.getElementById('ikk-wechsel');
                      if (section) {
                        e.preventDefault();
                        section.scrollIntoView({ behavior: 'smooth' });
                        trackIkkClick('bonusrechner-scroll');
                      } else {
                        trackIkkClick('bonusrechner');
                      }
                    }}
                    className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 hover:shadow-md transition-all duration-300 w-full"
                  >
                    <ArrowRightLeft className="w-5 h-5 mr-2" />
                    {secondaryCtaOverride?.label || t('bonusCalculator.ctaSwitchIKK')}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AmbulantBonusCalculator;
