import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, TrendingUp, Award } from 'lucide-react';

const HospitalConcept = () => {
  return (
    <section className="healio-section bg-gray-50 py-20" aria-labelledby="hospital-concept-heading">
      <div className="healio-container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="hospital-concept-heading" className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
              KlinikUpgrade Top – Privatpatient im Krankenhaus
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Einbettzimmer, Chefarztbehandlung, freie Krankenhauswahl. Keine Begrenzung auf die Gebührenordnung. Erstattung auch über dem 3,5-fachen Satz der GOÄ möglich.
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
              <Award className="w-3 h-3" /> Empfehlung
            </div>

            <div className="text-center mb-8 mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900">KlinikUpgrade Top</h3>
              <p className="text-4xl font-extrabold text-healio-primary mt-2">Einbettzimmer</p>
              <p className="text-slate-500 mt-1">ab 11,22 €/Monat (ohne AR) | ab 33,33 € (mit AR)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm mb-8">
              {[
                ["Komfort-Unterbringung", "Einbettzimmer"],
                ["Freie Krankenhauswahl", "Ja"],
                ["Rooming-In (Kinder unter 14)", "Ja"],
                ["Familienzimmer bei Entbindung", "Ja"],
                ["Privatärztliche Behandlung", "Chefarzt, Spezialisten, Belegarzt"],
                ["Gebührenordnung", "Keine Begrenzung (über 3,5-fach GOÄ)"],
                ["Ambulante OPs im Krankenhaus", "Ja"],
                ["Vor- und nachstationäre Behandlung", "Ja"],
                ["Ersatz-Krankenhaustagegeld", "Bis zu 100 €/Tag"],
                ["Keine allgemeine Wartezeit", "Ja"],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-semibold text-slate-900 text-right whitespace-nowrap ml-4">{value}</span>
                </div>
              ))}
            </div>

            {/* Top vs Plus Vergleich */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-4 text-center">KlinikUpgrade Top vs. Plus</h4>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm flex-1">
                  <p className="text-lg font-extrabold text-slate-700">Plus</p>
                  <p className="text-sm text-slate-500 mt-1">Zweibettzimmer</p>
                  <p className="text-sm text-slate-500">Tagegeld bis 80 €</p>
                  <p className="text-healio-primary font-bold mt-2">ab 8,98 €/Monat</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 hidden md:block" />
                <div className="text-center p-4 bg-white rounded-lg shadow-sm flex-1 ring-2 ring-healio-primary">
                  <p className="text-lg font-extrabold text-healio-primary">Top</p>
                  <p className="text-sm text-slate-500 mt-1">Einbettzimmer</p>
                  <p className="text-sm text-slate-500">Tagegeld bis 100 €</p>
                  <p className="text-healio-primary font-bold mt-2">ab 11,22 €/Monat</p>
                </div>
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
                Beispiel: Blinddarm-OP (4 Tage)
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">GKV-Fallpauschale</span><span>3.993,38 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Einbettzimmer (4 Tage)</span><span>600,00 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Privatärztliche Leistungen</span><span>1.233,12 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Zuzahlung pro Tag</span><span>40,00 €</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-slate-600 font-bold">Zu zahlen</span><span className="text-red-500 font-bold">1.873,12 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Erstattung KlinikUpgrade Top</span><span className="text-healio-primary font-bold">1.833,12 €</span></div>
                <div className="flex justify-between bg-green-50 rounded-lg p-2 mt-2"><span className="font-bold">Dein Eigenanteil</span><span className="text-healio-primary font-extrabold text-lg">40,00 €</span></div>
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
                Beispiel: Ambulante Leistenbruch-OP
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Privatärztliche Leistungen</span><span className="font-bold">1.206,35 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">GKV-Übernahme</span><span>606,02 €</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-slate-600 font-bold">Zu zahlen</span><span className="text-red-500 font-bold">600,33 €</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Erstattung KlinikUpgrade</span><span className="text-healio-primary font-bold">600,33 €</span></div>
                <div className="flex justify-between bg-green-50 rounded-lg p-2 mt-2"><span className="font-bold">Dein Eigenanteil</span><span className="text-healio-primary font-extrabold text-lg">0,00 €</span></div>
              </div>
            </motion.div>
          </div>

          {/* Besonderheiten */}
          <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Das macht KlinikUpgrade besonders</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                "Keine allgemeine Wartezeit – Sofortschutz",
                "Keine Begrenzung auf Gebührenordnung (über 3,5-fach GOÄ)",
                "Einbettzimmer im Top-Tarif, Zweibettzimmer im Plus-Tarif",
                "Ersatz-Krankenhaustagegeld bis 100 €/Tag",
                "Familienzimmer bei stationärer Entbindung",
                "Rooming-In: Elternbegleitung bei Kindern unter 14 Jahren",
                "Ambulante Operationen im Krankenhaus abgedeckt",
                "Vor- und nachstationäre Behandlung inklusive",
                "Keine Altersbegrenzung beim Abschluss",
                "Tarife mit oder ohne Alterungsrückstellungen wählbar",
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

export default HospitalConcept;