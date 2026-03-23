import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonialsData = [
  { name: "Michael K. (45), Frankfurt", tag: "Implantat", highlight: "1.460 € erstattet", text: "Ein Implantat für knapp 2.000 Euro. Ohne Zusatzversicherung wäre mein Eigenanteil bei 1.460 Euro gelegen. Mit dem ZahnUpgrade 90+ und meinem Bonusheft habe ich alles erstattet bekommen. Eigenanteil: 0 Euro. Das hat sich innerhalb eines Eingriffs für Jahre bezahlt gemacht.", rating: 5 },
  { name: "Stefanie R. (33), Düsseldorf", tag: "Zahnreinigung", highlight: "Effektiv 0 €", text: "Zweimal im Jahr professionelle Zahnreinigung, komplett erstattet. Dazu der IKK Bonus von über 300 Euro im Jahr. Mein Beitrag von 13,50 Euro im Monat ist damit mehr als ausgeglichen. Ich zahle effektiv nichts und bekomme Top-Leistungen. So muss Versicherung sein.", rating: 5 },
  { name: "Familie W. (38 & 40), Hamburg", tag: "KFO Kinder", highlight: "2.250 € für Zahnspange", text: "Unsere Tochter brauchte eine Zahnspange. Die Kasse hat nur einen Teil übernommen, unser Eigenanteil wäre 2.800 Euro gewesen. Das ZahnUpgrade hat davon 2.250 Euro erstattet. Und das Beste: Auch leichte Fehlstellungen werden übernommen, nicht erst ab KIG 3.", rating: 5 },
];

const Testimonials = () => {
  return (
    <section className="healio-section bg-white" aria-labelledby="testimonials-heading">
      <div className="healio-container">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl lg:text-5xl font-extrabold text-healio-text">
            Echte Kunden, <span className="healio-gradient-text">echte Ersparnis</span>
          </h2>
          <p className="mt-4 text-lg text-healio-text-light max-w-3xl mx-auto">
            Zufriedene Nutzer:innen teilen ihre Erfahrungen mit dem Healio-Konzept.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="healio-testimonial space-y-4 text-center"
            >
              <div className="flex items-center gap-1 justify-center" aria-label={`${testimonial.rating} von 5 Sternen`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-md text-healio-text-light italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              <p className="font-bold text-healio-text pt-2">{testimonial.name}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;