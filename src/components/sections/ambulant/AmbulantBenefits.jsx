
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const highlightCards = [
  {
    emoji: "🌿",
    title: "Heilpraktiker & Naturheilkunde",
    desc: "Heilpraktiker, Osteopathie, TCM, Chiropraktik, Akupunktur",
    budget: "Bis zu 1.000 € (alle 2 Jahre) | inkl. Hufelandverzeichnis",
    bgColor: "bg-amber-50",
    details: [
      { name: "Heilpraktikerbehandlungen", info: "Bis zu 1.000 € alle 2 Jahre nach Hufelandverzeichnis" },
      { name: "Chiropraktik", info: "Im Budget Heilpraktiker & Naturheilkunde enthalten" },
      { name: "Osteopathie", info: "Bis zu 160 €/Jahr über IKK classic (4 Sitzungen à 40 €) + Zusatzbudget" },
      { name: "Akupunktur", info: "Im Budget Heilpraktiker & Naturheilkunde enthalten" },
      { name: "Traditionelle Chinesische Medizin (TCM)", info: "Im Budget Heilpraktiker & Naturheilkunde enthalten" },
      { name: "Naturheilkundliche Behandlungen durch Ärzte", info: "Erstattung nach GOÄ bis zum 3,5-fachen Satz" },
      { name: "Homöopathie", info: "Im Budget Heilpraktiker & Naturheilkunde enthalten" },
    ]
  },
  {
    emoji: "👓",
    title: "Sehhilfen & Augen-Laser",
    desc: "Brillen, Kontaktlinsen, Sonnenbrillen mit Sehstärke",
    budget: "Bis zu 500 € (alle 2 Jahre) | LASIK bis 1.000 € je Auge",
    bgColor: "bg-blue-50",
    details: [
      { name: "Brillen & Brillengläser", info: "Bis zu 500 € alle 2 Jahre" },
      { name: "Kontaktlinsen", info: "Im Budget Sehhilfen enthalten" },
      { name: "Sonnenbrillen mit Sehstärke", info: "Im Budget Sehhilfen enthalten" },
      { name: "Augen-Laser (LASIK/LASEK)", info: "Bis zu 1.000 € je Auge (einmalig)" },
    ]
  },
  {
    emoji: "🩺",
    title: "Vorsorge & Impfungen",
    desc: "Krebsvorsorge, Schwangerschaftsvorsorge, Check-ups, Impfungen",
    budget: "Bis zu 500 € (alle 2 Jahre) | inkl. Präventionskurse",
    bgColor: "bg-teal-50",
    details: [
      { name: "Krebsvorsorge-Untersuchungen", info: "Erweiterte Vorsorge über GKV-Leistung hinaus" },
      { name: "Schwangerschaftsvorsorge", info: "z. B. Toxoplasmose-Test, Streptokokken-Test, zusätzliche Ultraschall-Untersuchungen" },
      { name: "Gesundheits-Check-ups", info: "Erweiterte Laborwerte und Diagnostik" },
      { name: "STIKO-Impfungen", info: "Alle empfohlenen Standardimpfungen" },
      { name: "Reiseimpfungen", info: "z. B. Gelbfieber, Hepatitis A/B, Typhus" },
      { name: "Präventionskurse", info: "z. B. Yoga, Rückentraining, Stressbewältigung" },
    ]
  },
  {
    emoji: "💊",
    title: "Arzneimittel & Zuzahlungen",
    desc: "Gesetzliche Zuzahlungen für Arznei-, Heil- und Hilfsmittel",
    budget: "Bis zu 1.000 € (alle 2 Jahre) | plus Auslandsschutz inklusive",
    bgColor: "bg-green-50",
    details: [
      { name: "Arzneimittel-Zuzahlungen", info: "Erstattung der gesetzlichen Zuzahlung (5–10 € pro Medikament)" },
      { name: "Heilmittel-Zuzahlungen", info: "z. B. Physiotherapie, Ergotherapie, Logopädie" },
      { name: "Hilfsmittel-Zuzahlungen", info: "z. B. Einlagen, Bandagen, Kompressionsstrümpfe" },
      { name: "Auslandsschutz", info: "100 % Erstattung, beliebig viele Reisen bis 56 Tage" },
      { name: "Medizinisch-psychologischer Beratungsservice", info: "Telefonische Beratung inklusive" },
    ]
  },
  {
    emoji: "🤰",
    title: "Schwangerschaft & Geburt",
    desc: "Über 1.100 € Gesamtleistung mit IKK classic — Hebamme, Vorsorge, Baby-Bonus",
    budget: "250 € Hebamme | 100 € Vorsorge | 180 € Baby-Bonus (IKK classic)",
    bgColor: "bg-pink-50",
    details: [
      { name: "Hebammen-Rufbereitschaft", info: "Bis zu 250 € je Schwangerschaft (IKK classic)" },
      { name: "Schwangerschaftsvorsorge (IGeL)", info: "100 € für Toxoplasmose-Test, Streptokokken, zusätzliche Ultraschalls" },
      { name: "Mineralstoffe in der Schwangerschaft", info: "Eisen, Folsäure & Magnesium — Kostenübernahme durch IKK classic" },
      { name: "Geburtsvorbereitungskurse", info: "Kostenübernahme inkl. kostenloser Partner-Kurs (Keleya)" },
      { name: "Rückbildungsgymnastik", info: "Volle Kostenübernahme + 25 € Bonus über IKK Bonusprogramm" },
      { name: "Baby-Bonus", info: "180 € im ersten Lebensjahr über das IKK Bonusprogramm" },
      { name: "Haus- & Geburtshausgeburt", info: "Volle Kostenübernahme für Hebamme + Zuschuss Betriebskosten" },
    ]
  },
];

const BenefitCard = ({ benefit, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white border-2 border-gray-100 rounded-xl shadow-md hover:shadow-lg hover:shadow-green-200 hover:border-[#10b981] transition-all duration-300 flex flex-col"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex flex-col items-center text-center cursor-pointer"
      >
        <div className={`${benefit.bgColor} rounded-full p-5 w-fit mb-4`}>
          <span className="text-4xl" role="img" aria-label={benefit.title}>
            {benefit.emoji}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{benefit.desc}</p>
        <p className="text-[#10b981] font-semibold text-sm mb-3">{benefit.budget}</p>
        <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
          <span>{isOpen ? 'Weniger anzeigen' : 'Leistungen im Detail'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <ul className="space-y-3">
                {benefit.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#10b981] mt-0.5 flex-shrink-0">✓</span>
                    <div className="text-left">
                      <span className="text-sm font-semibold text-gray-900">{detail.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{detail.info}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AmbulantBenefits = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Das bekommst du mit Healio
          </h2>
          <p className="text-gray-500 mt-4 text-lg">Klicke auf eine Kategorie für alle Einzelleistungen</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightCards.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmbulantBenefits;
