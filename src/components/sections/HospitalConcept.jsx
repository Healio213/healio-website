import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, ArrowRight, TrendingUp, Award } from 'lucide-react';

const HospitalConcept = () => {
  const { t } = useTranslation('stationaer');

  const tariffDetails = t('concept.tariffDetails', { returnObjects: true });
  const besonderheiten = t('concept.besonderheiten', { returnObjects: true });
  const plus = t('concept.plus', { returnObjects: true });
  const top = t('concept.top', { returnObjects: true });

  const tariffRows = tariffDetails ? [
    [tariffDetails.komfort?.label, tariffDetails.komfort?.value],
    [tariffDetails.klinikwahl?.label, tariffDetails.klinikwahl?.value],
    [tariffDetails.roomingIn?.label, tariffDetails.roomingIn?.value],
    [tariffDetails.familienzimmer?.label, tariffDetails.familienzimmer?.value],
    [tariffDetails.privatarzt?.label, tariffDetails.privatarzt?.value],
    [tariffDetails.gebuehren?.label, tariffDetails.gebuehren?.value],
    [tariffDetails.ambulanteOps?.label, tariffDetails.ambulanteOps?.value],
    [tariffDetails.vorNachStationaer?.label, tariffDetails.vorNachStationaer?.value],
    [tariffDetails.tagegeld?.label, tariffDetails.tagegeld?.value],
    [tariffDetails.keineWartezeit?.label, tariffDetails.keineWartezeit?.value],
  ] : [];

  return (
    <section className="healio-section bg-gray-50 py-20" aria-labelledby="hospital-concept-heading">
      <div className="healio-container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="hospital-concept-heading" className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
              {t('concept.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t('concept.subtitle')}
            </p>
          </div>

          {/* Haupt-Tarifkarte */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 relative ring-2 ring-healio-primary mb-12 max-w-3xl mx-auto"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-healio-primary text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3" /> {t('concept.empfehlung')}
            </div>

            <div className="text-center mb-8 mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900">{t('concept.tariffName')}</h3>
              <p className="text-4xl font-extrabold text-healio-primary mt-2">{t('concept.tariffType')}</p>
              <p className="text-slate-500 mt-1">{t('concept.tariffPrice')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm mb-8">
              {tariffRows.map(([label, value], i) => (
                <div key={i} className="flex justify-between items-start py-2 border-b border-gray-50 gap-4">
                  <span className="text-slate-600 flex-shrink-0">{label}</span>
                  <span className="font-semibold text-slate-900 text-right">{value}</span>
                </div>
              ))}
            </div>

            {/* Top vs Plus Vergleich */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-4 text-center">{t('concept.vergleichTitle')}</h4>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm flex-1">
                  <p className="text-lg font-extrabold text-slate-700">{plus?.name}</p>
                  <p className="text-sm text-slate-500 mt-1">{plus?.zimmer}</p>
                  <p className="text-sm text-slate-500">{plus?.tagegeld}</p>
                  <p className="text-healio-primary font-bold mt-2">{plus?.preis}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 hidden md:block" />
                <div className="text-center p-4 bg-white rounded-lg shadow-sm flex-1 ring-2 ring-healio-primary">
                  <p className="text-lg font-extrabold text-healio-primary">{top?.name}</p>
                  <p className="text-sm text-slate-500 mt-1">{top?.zimmer}</p>
                  <p className="text-sm text-slate-500">{top?.tagegeld}</p>
                  <p className="text-healio-primary font-bold mt-2">{top?.preis}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* IKK Kombination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300/50 rounded-2xl p-6 md:p-8 mb-12 max-w-3xl mx-auto"
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
                {t('concept.exampleBlinddarm')}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.gkvFallpauschale')}</span><span>3.993,38 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.einbettzimmer')}</span><span>600,00 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.privatarztLeistungen')}</span><span>1.233,12 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.zuzahlungTag')}</span><span>40,00 €</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-slate-600 font-bold">{t('concept.zuZahlen')}</span><span className="text-red-500 font-bold">1.873,12 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.erstattungKlinik')}</span><span className="text-healio-primary font-bold">1.833,12 €</span></div>
                <div className="flex justify-between bg-green-50 rounded-lg p-2 mt-2"><span className="font-bold">{t('concept.deinEigenanteil')}</span><span className="text-healio-primary font-extrabold text-lg">40,00 €</span></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            >
              <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-healio-primary" />
                {t('concept.exampleLeistenbruch')}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.privatarztLeistungen')}</span><span className="font-bold">1.206,35 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.gkvUebernahme')}</span><span>606,02 €</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-slate-600 font-bold">{t('concept.zuZahlen')}</span><span className="text-red-500 font-bold">600,33 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('concept.erstattungKlinikGeneral')}</span><span className="text-healio-primary font-bold">600,33 €</span></div>
                <div className="flex justify-between bg-green-50 rounded-lg p-2 mt-2"><span className="font-bold">{t('concept.deinEigenanteil')}</span><span className="text-healio-primary font-extrabold text-lg">0,00 €</span></div>
              </div>
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

export default HospitalConcept;
