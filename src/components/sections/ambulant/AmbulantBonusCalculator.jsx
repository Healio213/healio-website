
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowRightLeft, Plus, Minus, Pencil } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { TextHighlight } from '@/components/ui/ScrollAnimation';

const ACTIVITY_DEFS = [
  { id: 'impfung', perUnit: 30, max: 8 },
  { id: 'zahn', perUnit: 30, max: 2 },
  { id: 'checkup', amount: 75 },
  { id: 'krebs', amount: 75 },
  { id: 'ultraschall', amount: 75 },
  { id: 'kurs', perUnit: 75, max: 5, tip: true },
  { id: 'sport', perUnit: 75, max: 4 },
  { id: 'abzeichen', amount: 75 },
  { id: 'bmi', amount: 75 },
  { id: 'blutdruck', amount: 75 },
  { id: 'zahnreinigung', amount: 40 },
  { id: 'kind', perUnit: 30, max: 6 },
  { id: 'fitness', amount: 180, tip: true },
];

const AmbulantBonusCalculator = () => {
  const { t } = useTranslation('ambulant');
  const calculatorUrl = "https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=Ambulant,Station%C3%A4r&agentId1=901334&agentId2=&insurers=36&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJIZWFsaW8iLCJsYXN0TmFtZSI6IkdtYkgiLCJjb21wYW55IjoiSGVhbGlvIEdtYkgiLCJzdHJlZXQiOiJBcm5kdHN0ci4gNiIsInppcGNvZGUiOiIyMjA4NSIsImNpdHkiOiJIYW1idXJnIiwibW9iaWxlIjoiMDE3NjI0MTUzMTg4IiwiZW1haWwiOiJpbmZvQGhlYWxpby5kZSJ9&remarks=IkJlaSBS/GNrZnJhZ2VuIHNpbmQgd2lyIGdlcm5lIGb8ciBTaWUgZGEuIg==&defaultContact=false&employeeInsurance=NOT_BKV";
  const ikkLink = "https://www.ikk-classic.de/formulare/mitglied-werden-vp?dsid=koop_reg&pid=V3700025016";

  const ACTIVITIES = useMemo(() => ACTIVITY_DEFS.map(def => ({
    ...def,
    title: t(`bonusCalculator.activities.${def.id}.title`),
    desc: t(`bonusCalculator.activities.${def.id}.desc`),
    unit: t(`bonusCalculator.activities.${def.id}.unit`, { defaultValue: '' }),
  })), [t]);

  const [selectedActivities, setSelectedActivities] = useState({});
  const [monatsbeitrag, setMonatsbeitrag] = useState(45);
  const [beitragEditing, setBeitragEditing] = useState(false);
  const beitragInputRef = useRef(null);
  const analyticsTimer = useRef(null);
  const lastTracked = useRef(null);

  const handleToggle = (id) => {
    setSelectedActivities((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCount = (id, delta, max) => {
    setSelectedActivities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(max, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const handleReset = () => {
    setSelectedActivities({});
    setMonatsbeitrag(45);
  };

  const handleBeitragChange = (e) => {
    const val = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    setMonatsbeitrag(val === '' ? '' : Number(val));
  };

  const handleBeitragBlur = () => {
    setBeitragEditing(false);
    if (monatsbeitrag === '' || isNaN(monatsbeitrag) || monatsbeitrag < 0) {
      setMonatsbeitrag(45);
    }
  };

  const jahresbeitrag = Math.round((monatsbeitrag || 0) * 12);

  const totalBonus = useMemo(() => {
    return ACTIVITY_DEFS.reduce((sum, activity) => {
      if (activity.perUnit) {
        const count = selectedActivities[activity.id] || 0;
        return sum + count * activity.perUnit;
      }
      return selectedActivities[activity.id] ? sum + activity.amount : sum;
    }, 0);
  }, [selectedActivities]);

  const nettoErgebnis = totalBonus - jahresbeitrag;

  const trackUsage = useCallback(() => {
    if (typeof window === 'undefined' || !window.gtag) return;
    if (totalBonus === 0) return;

    const trackData = JSON.stringify({ totalBonus, jahresbeitrag, nettoErgebnis });
    if (trackData === lastTracked.current) return;
    lastTracked.current = trackData;

    window.gtag('event', 'bonus_calculator_result', {
      event_category: 'Bonusrechner',
      event_label: nettoErgebnis >= 0 ? 'Plus' : 'Minus',
      bonus_total: totalBonus,
      jahresbeitrag: jahresbeitrag,
      netto_ergebnis: nettoErgebnis,
      monatsbeitrag: monatsbeitrag,
      aktivitaeten_count: Object.values(selectedActivities).filter(v => v && v !== 0).length,
    });
  }, [totalBonus, jahresbeitrag, nettoErgebnis, monatsbeitrag, selectedActivities]);

  useEffect(() => {
    if (totalBonus === 0) return;
    if (analyticsTimer.current) clearTimeout(analyticsTimer.current);
    analyticsTimer.current = setTimeout(trackUsage, 480000);
    return () => { if (analyticsTimer.current) clearTimeout(analyticsTimer.current); };
  }, [totalBonus, jahresbeitrag, trackUsage]);

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
    <section id="bonus-calculator" className="bg-white py-24 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">

          {/* Left Column: Checkboxes (60%) */}
          <div className="w-full lg:w-[60%] bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-healio-dark mb-6">{t('bonusCalculator.selectActivities')}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACTIVITIES.map((activity, index) => {
                const def = ACTIVITY_DEFS[index];
                const isMulti = !!def.perUnit;
                const count = isMulti ? (selectedActivities[def.id] || 0) : 0;
                const isActive = isMulti ? count > 0 : !!selectedActivities[def.id];
                const displayAmount = isMulti ? count * def.perUnit : def.amount;

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
                  >
                    {!isMulti && (
                      <div className="mt-1">
                        <Checkbox
                          id={def.id}
                          checked={isActive}
                          onCheckedChange={() => handleToggle(def.id)}
                          className="data-[state=checked]:bg-healio-primary data-[state=checked]:border-healio-primary"
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
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-healio-primary hover:text-healio-primary transition-colors disabled:opacity-30"
                            disabled={count === 0}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-bold text-healio-dark text-lg">{count}</span>
                          <button
                            type="button"
                            onClick={() => handleCount(def.id, 1, def.max)}
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-healio-primary hover:text-healio-primary transition-colors disabled:opacity-30"
                            disabled={count === def.max}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs text-gray-400 ml-1">{t('bonusCalculator.max')} {def.max}</span>
                        </div>
                      )}
                    </div>
                    <div className="font-bold text-healio-primary whitespace-nowrap flex-shrink-0">
                      {isMulti && count > 1 && <span className="text-xs font-normal text-gray-400 block text-right">{count}× {def.perUnit}€</span>}
                      +{displayAmount}€
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Vertrauens-Hinweis */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
              <span className="text-xl flex-shrink-0 mt-0.5">🤝</span>
              <div>
                <p className="text-sm font-bold text-blue-900 mb-1">{t('bonusCalculator.trustNote')}</p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {t('bonusCalculator.trustNoteDesc')}
                </p>
              </div>
            </div>

            {/* Fitnessgeräte-Zuschuss */}
            <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-4 flex gap-3 items-start">
              <span className="text-xl flex-shrink-0 mt-0.5">⌚</span>
              <div>
                <p className="text-sm font-bold text-purple-900 mb-1">{t('bonusCalculator.fitnessNote')}</p>
                <p className="text-sm text-purple-800 leading-relaxed">
                  {t('bonusCalculator.fitnessNoteDesc')}
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
              className="bg-gradient-to-b from-[#25c990] to-[#076046] rounded-2xl p-8 lg:p-10 shadow-xl border border-healio-primary/20 overflow-hidden relative"
            >
              <div className="relative z-10 text-center">
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4">
                  {t('bonusCalculator.yourBonus')}
                </h3>

                <div className="flex justify-center items-center h-32 mb-6">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={totalBonus}
                      initial={{ scale: 0.8, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 1.2, opacity: 0, y: -20 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="text-7xl lg:text-8xl font-extrabold tracking-tighter text-white"
                    >
                      {totalBonus}€
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Netto-Vergleich mit editierbarem Beitrag */}
                <div className="bg-white/15 rounded-xl p-4 mb-6 backdrop-blur-sm">
                  <p className="text-white/80 text-sm font-medium mb-3">{t('bonusCalculator.tariffInfo')}</p>

                  {/* Editierbarer Monatsbeitrag */}
                  <div className="flex justify-between items-center text-white text-sm mb-2">
                    <span>{t('bonusCalculator.yourMonthly')}</span>
                    {beitragEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          ref={beitragInputRef}
                          type="text"
                          inputMode="decimal"
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
                        className="flex items-center gap-1.5 font-bold hover:bg-white/10 rounded px-2 py-0.5 transition-colors group"
                      >
                        <span>{monatsbeitrag} €/Monat</span>
                        <Pencil className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </div>

                  <div className="flex justify-between text-white text-sm mb-1">
                    <span>{t('bonusCalculator.yearlyContribution')}</span>
                    <span className="font-bold">{jahresbeitrag} €</span>
                  </div>
                  <div className="flex justify-between text-white text-sm mb-1">
                    <span>{t('bonusCalculator.yourBonusLabel')}</span>
                    <span className="font-bold">{totalBonus} €</span>
                  </div>
                  <div className={`flex justify-between text-sm pt-2 border-t border-white/30 font-extrabold ${nettoErgebnis >= 0 ? 'text-green-200' : 'text-yellow-200'}`}>
                    <span>{t('bonusCalculator.resultLabel')}</span>
                    <span>{nettoErgebnis >= 0 ? `+${nettoErgebnis} € ${t('bonusCalculator.resultPlus')}` : `${nettoErgebnis} €`}</span>
                  </div>

                  <p className="text-white/50 text-xs mt-2">
                    {t('bonusCalculator.editHint')}
                  </p>
                </div>

                <p className="text-white/90 text-sm leading-relaxed mb-8 max-w-sm mx-auto font-medium">
                  {t('bonusCalculator.bonusPayout')}
                </p>

                <div className="flex flex-col gap-4">
                  <a
                    href={calculatorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-healio-primary font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-full"
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    {t('bonusCalculator.ctaCalculate')}
                  </a>

                  <a
                    href={ikkLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 hover:shadow-md transition-all duration-300 w-full"
                  >
                    <ArrowRightLeft className="w-5 h-5 mr-2" />
                    {t('bonusCalculator.ctaSwitchIKK')}
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
