
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Dr. Müller",
    initials: "DM",
    profession: "Heilpraktiker",
    city: "Hamburg",
    text: "Seitdem meine Patienten das Gesundheitsbudget nutzen, brechen deutlich weniger Behandlungen ab. Die Patienten können sich die volle Therapie leisten, das macht einen enormen Unterschied."
  },
  {
    name: "Li Wei Chen",
    initials: "LC",
    profession: "TCM Therapeutin",
    city: "Berlin",
    text: "Meine Patienten können jetzt die komplette TCM Kur durchziehen: Akupunktur, Kräutertherapie, alles. Vorher haben viele nach der dritten Sitzung aufgehört. Das war frustrierend."
  },
  {
    name: "Thomas Weber",
    initials: "TW",
    profession: "Osteopath & Chiropraktiker",
    city: "München",
    text: "Der Aufsteller steht im Wartezimmer, die Patienten informieren sich selbst. Ich muss nichts verkaufen, nichts erklären. Das läuft einfach."
  }
];

const PartnerTestimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-emerald-50/30 via-emerald-50/10 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Stimmen aus der <span className="text-healio-primary">Praxis</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Das sagen Therapeuten und Behandler über die Zusammenarbeit mit <span className="text-healio-primary font-semibold">Healio</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#25c990] relative flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
                <div className="text-6xl text-[#25c990] absolute top-4 right-6 font-serif opacity-20">"</div>
                <p className="text-slate-700 italic relative z-10 mb-8 text-lg leading-relaxed">
                  "{t.text}"
                </p>
              </div>
              <div className="border-t border-slate-100 pt-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#25c990] text-white flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0 shadow-md">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.profession}, {t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerTestimonials;
