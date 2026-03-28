import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Award, TrendingUp, ArrowRight } from 'lucide-react';

const DentalConcept = () => {
  const { t } = useTranslation('zahn');

  const tariffDetails = t('concept.tariffDetails', { returnObjects: true });
  const besonderheiten = t('concept.besonderheiten', { returnObjects: true });

  const tariffRows = tariffDetails ? [
    [tariffDetails.zahnersatz?.label, tariffDetails.zahnersatz?.value],
    [tariffDetails.zahnbehandlung?.label, tariffDetails.zahnbehandlung?.value],
    [tariffDetails.prophylaxe?.label, tariffDetails.prophylaxe?.value],
    [tariffDetails.bleaching?.label, tariffDetails.bleaching?.value],
    [tariffDetails.kfo?.label, tariffDetails.kfo?.value],
    [tariffDetails.unfall?.label, tariffDetails.unfall?.value],
    [tariffDetails.maxErstattung?.label, tariffDetails.maxErstattung?.value],
    [tariffDetails.kinderBeitrag?.label, tariffDetails.kinderBeitrag?.value],
  ] : [];

  return (
    <section className="healio-section bg-gray-50 py-20" aria-labelledby="dental-concept-heading">
      <div className="healio-container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="dental-concept-heading" className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
              {t('concept.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t('concept.subtitle')}
            </p>
          </div>

          {/* Haupt-Tarifkarte ZahnUpgrade 90+ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 relative ring-2 ring-healio-primary mb-12 max-w-3xl mx-auto"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3" /> {t('concept.testsieger')}
            </div>

            <div className="text-center mb-8 mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900">{t('concept.tariffName')}</h3>
              <p className="text-4xl font-extrabold text-healio-primary mt-2">{t('concept.tariffRate')}</p>
              <p className="text-slate-500 mt-1">{t('concept.tariffRateLabel')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm mb-8">
              {tariffRows.map(([label, value], i) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-semibold text-slate-900 text-right whitespace-nowrap ml-4">{value}</span>
                </div>
              ))}
            </div>

            {/* BonusPlus Staffel */}
            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-slate-900 mb-4 text-center">{t('concept.bonusPlusTitle')}</h4>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="text-center p-3 bg-white rounded-lg shadow-sm flex-1">
                  <p className="text-2xl font-extrabold text-healio-primary">{t('concept.bonusPlus90')}</p>
                  <p className="text-xs text-slate-500 mt-1">{t('concept.bonusPlus90Label')}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 hidden md:block" />
                <div className="text-center p-3 bg-white rounded-lg shadow-sm flex-1">
                  <p className="text-2xl font-extrabold text-healio-primary">{t('concept.bonusPlus95')}</p>
                  <p className="text-xs text-slate-500 mt-1">{t('concept.bonusPlus95Label')}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 hidden md:block" />
                <div className="text-center p-3 bg-white rounded-lg shadow-sm flex-1 ring-2 ring-healio-primary">
                  <p className="text-2xl font-extrabold text-healio-primary">{t('concept.bonusPlus100')}</p>
                  <p className="text-xs text-slate-500 mt-1">{t('concept.bonusPlus100Label')}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 text-center">{t('concept.bonusPlusNote')}</p>
            </div>
          </motion.div>

          {/* IKK Kombination Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300/50 rounded-2xl p-6 md:p-8 mb-8 max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-extrabold text-yellow-600">
                0 €
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">{t('concept.ikkComboTitle')}</h3>
                <p className="text-slate-700" dangerouslySetInnerHTML={{ __html: t('concept.ikkComboText') }} />
              </div>
            </div>
          </motion.div>

          {/* Vorversicherung Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-healio-primary/10 to-green-50 border-2 border-healio-primary/30 rounded-2xl p-6 md:p-8 mb-12 max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-healio-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-8 h-8 text-healio-primary" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">{t('concept.vorversicherungTitle')}</h3>
                <p className="text-slate-700" dangerouslySetInnerHTML={{ __html: t('concept.vorversicherungText') }} />
              </div>
            </div>
          </motion.div>

          {/* Beispielrechnungen */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            >
              <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-healio-primary" />
                {t('concept.exampleImplantat')}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.rechnungsbetrag')}</span><span className="font-bold">1.998,95 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.gkvLeistung')}</span><span>539,65 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.eigenanteilOhne')}</span><span className="text-red-500 font-bold">1.459,30 €</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-slate-600">{t('concept.erstattungZahn')}</span><span className="text-healio-primary font-bold">1.459,30 €</span></div>
                <div className="flex justify-between bg-green-50 rounded-lg p-2 mt-2"><span className="font-bold">{t('concept.deinEigenanteil')}</span><span className="text-healio-primary font-extrabold text-lg">0,00 €</span></div>
              </div>
              <p className="text-xs text-slate-400 mt-3">{t('concept.mitBonusPlus10')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            >
              <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-healio-primary" />
                {t('concept.exampleBleaching')}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.rechnungsbetrag')}</span><span className="font-bold">400,00 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.gkvLeistung')}</span><span>0,00 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.eigenanteilOhne')}</span><span className="text-red-500 font-bold">400,00 €</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-slate-600">{t('concept.erstattungZahn')}</span><span className="text-healio-primary font-bold">190,00 €</span></div>
                <div className="flex justify-between bg-green-50 rounded-lg p-2 mt-2"><span className="font-bold">{t('concept.deinEigenanteil')}</span><span className="text-healio-primary font-extrabold text-lg">210,00 €</span></div>
              </div>
              <p className="text-xs text-slate-400 mt-3">{t('concept.mitBonusPlus5')}</p>
            </motion.div>
          </div>

          {/* Besonderheiten */}
          <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">{t('concept.besonderheitenTitle')}</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {Array.isArray(besonderheiten) && besonderheiten.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-healio-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalConcept;
