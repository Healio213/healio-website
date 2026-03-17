
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, User, Clock, Wallet, Globe, Baby, Coffee, MapPin } from 'lucide-react';

const mainBenefits = [
  {
    title: "Medizinische Spitzenversorgung",
    description: "Zugang zu Spezialisten und modernster Diagnostik."
  },
  {
    title: "Mehr Privatsphäre",
    description: "Einzelzimmer statt Mehrbettzimmer. Bessere Erholung."
  },
  {
    title: "Kürzere Wartezeiten",
    description: "Schnellerer Zugang zu Operationen und Behandlungen."
  },
  {
    title: "Familienfreundlich",
    description: "Rooming-in: Eltern bleiben bei ihren Kindern."
  }
];

const featureCards = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Ein- oder Zweibettzimmer",
    description: "Privatsphäre und Ruhe für Ihre Genesung."
  },
  {
    icon: <User className="w-8 h-8" />,
    title: "Chefarztbehandlung",
    description: "Die erfahrensten Spezialisten. Für Sie."
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Freie Krankenhauswahl",
    description: "Jede Klinik in Deutschland. Auch Privatkliniken."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Keine Wartezeiten",
    description: "Sofortschutz bei Unfällen. Kurze Wartezeiten bei Krankheit."
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: "Ersatzkrankenhaustage",
    description: "Tagegeld, wenn Sie auf den stationären Aufenthalt verzichten."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Weltweiter Schutz",
    description: "Ihr Schutz gilt weltweit. Auch im Ausland."
  },
  {
    icon: <Baby className="w-8 h-8" />,
    title: "Rooming-in",
    description: "Bleiben Sie bei Ihrem Kind. Kosten übernommen."
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    title: "Premium-Komfort",
    description: "Erweiterte Besuchszeiten. Bessere Verpflegung."
  }
];

const HospitalBenefits = () => {
  return (
    <section className="py-24 bg-white" aria-labelledby="hospital-benefits-heading" id="leistungen">
      <div className="healio-container text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 id="hospital-benefits-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Stationäre Zusatzversicherung: Privatpatienten-Status. Ohne privat versichert zu sein.
          </h2>
          <p className="mt-6 text-lg text-slate-600 font-medium">
            Wer ins Krankenhaus muss, sollte sich auf die Genesung konzentrieren — nicht auf das Budget. Mit der stationären Zusatzversicherung erhalten Sie Zugang zu den besten Ärzten und Kliniken.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }} 
          viewport={{ once: true }} 
          className="mt-16 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {mainBenefits.map((benefit, idx) => (
              <article key={idx} className="bg-[#25c990]/5 p-6 rounded-xl border border-[#25c990]/20 flex flex-col justify-center text-left">
                <h4 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h4>
                <p className="text-slate-600">{benefit.description}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {featureCards.map((feature, index) => (
            <motion.article 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              viewport={{ once: true }} 
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-[#25c990]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-[#25c990]/10 text-[#25c990] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalBenefits;
