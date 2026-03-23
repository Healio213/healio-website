import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Award, TrendingUp } from 'lucide-react';

const tarife = [
  {
    name: "ZahnUpgrade 50",
    highlight: false,
    erstattung: "50 %",
    zahnersatz: "50 %",
    zahnbehandlung: "50 %",
    extra: "50 %, bis 100 €/Jahr",
    bleaching: false,
    bonusPlus: false,
    wechselOption: false,
    maxErstattung: "1.000 € / 2.500 € / unbegrenzt",
    kfo: "50 % (Kinder)",
    beitragAb: "ab 5 €",
    kinderBeitrag: "6,50 €",
  },
  {
    name: "ZahnUpgrade 70+",
    highlight: true,
    erstattung: "70 %",
    zahnersatz: "70 % (mit BonusPlus 75 %)",
    zahnbehandlung: "70 % (mit BonusPlus 75 %)",
    extra: "70 %, bis 140 €/Jahr",
    bleaching: true,
    bonusPlus: true,
    wechselOption: true,
    maxErstattung: "1.000 € / 4.000 € / unbegrenzt",
    kfo: "70 % (Kinder), max. 2.000 €",
    beitragAb: "ab 8 €",
    kinderBeitrag: "14,50 €",
  },
  {
    name: "ZahnUpgrade 90+",
    highlight: false,
    erstattung: "90 %",
    zahnersatz: "90 % (mit BonusPlus bis 100 %)",
    zahnbehandlung: "90 % (mit BonusPlus bis 100 %)",
    extra: "90 %, bis 180 €/Jahr",
    bleaching: true,
    bonusPlus: true,
    wechselOption: false,
    maxErstattung: "1.000 € / 4.000 € / unbegrenzt",
    kfo: "90 % (Kinder), max. 2.500 €",
    beitragAb: "ab 13,50 €",
    kinderBeitrag: "21,50 €",
    testsieger: true,
  },
];

const DentalConcept = () => {
  return (
    <section className="healio-section bg-gray-50 py-20" aria-labelledby="dental-concept-heading">
      <div className="healio-container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="dental-concept-heading" className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
              ZahnUpgrade – Drei Tarife, ein Ziel
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Drei leistungsstarke Tarife für deinen perfekten Zahnschutz. Stiftung Warentest: SEHR GUT (0,8). Maximal 3 Gesundheitsfragen, bis zu 3 fehlende Zähne mitversicherbar.
            </p>
          </div>

          {/* Vorversicherung Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-healio-primary/10 to-green-50 border-2 border-healio-primary/30 rounded-2xl p-6 md:p-8 mb-12 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-healio-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-8 h-8 text-healio-primary" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Du hast bereits eine Zahnzusatzversicherung? Perfekt!</h3>
                <p className="text-slate-700">
                  <strong>Deine Vorversicherung wird angerechnet.</strong> Die Summenbegrenzung im ersten Kalenderjahr entfällt komplett, wenn deine bisherige Versicherung mindestens 40 % Zahnersatz erstattet hat. Du startest also nicht bei Null, sondern profitierst sofort vom vollen Leistungsumfang. Ein Wechsel lohnt sich besonders, wenn du bisher weniger als 90 % Erstattung bekommst.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tarif-Karten */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {tarife.map((tarif, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg p-6 relative ${tarif.highlight ? 'ring-2 ring-healio-primary' : 'border border-gray-100'}`}
              >
                {tarif.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-healio-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    Beliebtester Tarif
                  </div>
                )}
                {tarif.testsieger && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" /> Testsieger
                  </div>
                )}

                <h3 className="text-xl font-extrabold text-slate-900 mt-2 mb-1">{tarif.name}</h3>
                <p className="text-3xl font-extrabold text-healio-primary mb-1">{tarif.erstattung}</p>
                <p className="text-sm text-slate-500 mb-6">Erstattung, {tarif.beitragAb}/Monat</p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-slate-600">Zahnersatz</span>
                    <span className="font-semibold text-slate-900 text-right">{tarif.zahnersatz}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-slate-600">Zahnbehandlung</span>
                    <span className="font-semibold text-slate-900 text-right">{tarif.zahnbehandlung}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-slate-600">Prophylaxe & PZR</span>
                    <span className="font-semibold text-slate-900 text-right">{tarif.extra}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-slate-600">Bleaching</span>
                    {tarif.bleaching ? <Check className="w-5 h-5 text-healio-primary" /> : <X className="w-5 h-5 text-gray-300" />}
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-slate-600">BonusPlus</span>
                    {tarif.bonusPlus ? <Check className="w-5 h-5 text-healio-primary" /> : <X className="w-5 h-5 text-gray-300" />}
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-slate-600">KFO Kinder</span>
                    <span className="font-semibold text-slate-900 text-right">{tarif.kfo}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-slate-600">Kinder-Beitrag</span>
                    <span className="font-semibold text-slate-900">{tarif.kinderBeitrag}/Monat</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Max. Erstattung</span>
                    <span className="font-semibold text-slate-900 text-right text-xs">{tarif.maxErstattung}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
                Beispiel: Implantat
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Rechnungsbetrag</span><span className="font-bold">1.998,95 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">GKV-Leistung</span><span>539,65 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Eigenanteil ohne Versicherung</span><span className="text-red-500 font-bold">1.459,30 €</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-slate-600">Erstattung ZahnUpgrade 90+</span><span className="text-healio-primary font-bold">1.459,30 €</span></div>
                <div className="flex justify-between bg-green-50 rounded-lg p-2 mt-2"><span className="font-bold">Dein Eigenanteil</span><span className="text-healio-primary font-extrabold text-lg">0,00 €</span></div>
              </div>
              <p className="text-xs text-slate-400 mt-3">Mit BonusPlus (10 Jahre Bonusheft)</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            >
              <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-healio-primary" />
                Beispiel: Bleaching
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Rechnungsbetrag</span><span className="font-bold">400,00 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">GKV-Leistung</span><span>0,00 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Eigenanteil ohne Versicherung</span><span className="text-red-500 font-bold">400,00 €</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-slate-600">Erstattung ZahnUpgrade 90+</span><span className="text-healio-primary font-bold">190,00 €</span></div>
                <div className="flex justify-between bg-green-50 rounded-lg p-2 mt-2"><span className="font-bold">Dein Eigenanteil</span><span className="text-healio-primary font-extrabold text-lg">210,00 €</span></div>
              </div>
              <p className="text-xs text-slate-400 mt-3">Mit BonusPlus (5 Jahre Bonusheft)</p>
            </motion.div>
          </div>

          {/* Besonderheiten */}
          <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Das macht ZahnUpgrade besonders</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                "Keine Wartezeiten – Sofortschutz ab Tag 1",
                "Maximal 3 Gesundheitsfragen beim Antrag",
                "Bis zu 3 fehlende Zähne mitversicherbar (5 € Zuschlag/Zahn)",
                "BonusPlus: Erstattung steigt auf bis zu 100 %",
                "Vorversicherung wird angerechnet (Summenbegrenzung entfällt im 1. Jahr)",
                "Wechsel-Option: Nach 3 Jahren in höheren Tarif ohne Gesundheitsprüfung",
                "Unfall-Sofortschutz ohne Höchstsummen oder Altersbegrenzung",
                "Inflationsvorsorge: Erstattungsgrenzen werden indexorientiert angepasst",
                "Innovationsvorsorge: Zukünftige Behandlungsmethoden werden abgedeckt",
                "Optional mit Alterungsrückstellungen für günstigere Beiträge im Alter",
              ].map((item, i) => (
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