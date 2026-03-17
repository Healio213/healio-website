import React from 'react';
import { motion } from 'framer-motion';
import { Bed, UserCheck, Shield, HeartPulse } from 'lucide-react';

const UnterbringungSection = () => {
  const cards = [
    {
      icon: UserCheck,
      title: "Privatsphäre & Ruhe",
      description: "Genesung erfordert Ruhe. Im Einbettzimmer haben Sie keinen fremden Besuch, keine nächtlichen Störungen und volle Diskretion für vertrauliche Arztgespräche."
    },
    {
      icon: Bed,
      title: "Hotel-Standard",
      description: "Eigene Nasszelle, hochwertiges Menü, Multimedia-Ausstattung und Service-Leistungen, die den Krankenhausaufenthalt so angenehm wie möglich gestalten."
    },
    {
      icon: Shield,
      title: "Chefarzt-Behandlung",
      description: "Freie Arztwahl im Krankenhaus. Sie werden nicht vom diensthabenden Assistenzarzt, sondern vom Spezialisten Ihrer Wahl oder dem Chefarzt behandelt."
    },
    {
      icon: HeartPulse,
      title: "Volle Kostendeckung",
      description: "Erstattung auch über die Höchstsätze der Gebührenordnung (GOÄ) hinaus. Keine versteckten Eigenanteile bei Spezialisten-Honoraren."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="healio-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-6">Die Unterbringungssituation</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Der Unterschied zwischen Kassenleistung und Privatstatus ist nirgendwo so spürbar wie im Krankenhaus. 
            Sichern Sie sich die Umgebung, die Ihre Genesung optimal unterstützt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#1E3A5F] hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center mb-6">
                <card.icon className="w-6 h-6 text-[#1E3A5F]" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnterbringungSection;