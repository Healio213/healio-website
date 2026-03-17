
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Stethoscope, FileText, ShieldCheck, Sparkles, Shield, Smile, Star } from 'lucide-react';

const dentalBenefitsData = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Sofortschutz",
    description: "Kein Warten. Versicherungsschutz ab Tag 1."
  },
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "Freie Zahnarztwahl",
    description: "Jeder Zahnarzt. Weltweit. Ohne Einschränkung."
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Schnelle Erstattung",
    description: "Rechnung einreichen. Erstattung in wenigen Tagen."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Lebenslanger Schutz",
    description: "Einmal abgeschlossen. Dauerhaft geschützt."
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Professionelle Zahnreinigung",
    description: "100 % Erstattung. Bis zu 2x pro Jahr."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Zahnersatz Premium",
    description: "Bis zu 100 % Erstattung für Implantate, Kronen und Brücken."
  },
  {
    icon: <Smile className="w-8 h-8" />,
    title: "Ästhetische Zahnmedizin",
    description: "Bleaching, Veneers, ästhetische Korrektionen — mitversichert."
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Kieferorthopädie",
    description: "Erstattung für KFO-Behandlungen. Kinder und Erwachsene."
  }
];

const DentalBenefits = () => {
  return (
    <section className="py-24 bg-white" aria-labelledby="dental-benefits-heading" id="leistungen">
      <div className="healio-container text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 id="dental-benefits-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Zahnzusatzversicherung: Was die gesetzliche Kasse nicht zahlt.
          </h2>
          <p className="mt-6 text-lg text-slate-600 font-medium">
            Die GKV übernimmt bei Zahnersatz nur den Regelversorgungssatz. Den Rest zahlen Sie selbst — oder eine intelligente Zusatzversicherung.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {dentalBenefitsData.map((benefit, index) => (
            <motion.article 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              viewport={{ once: true }} 
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-[#25c990]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-[#25c990]/10 text-[#25c990] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DentalBenefits;
