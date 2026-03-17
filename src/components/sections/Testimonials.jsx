import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonialsData = [
  { name: "Julia S. (28), Berlin", text: "Ich hätte nie gedacht, dass ich mir die Osteopathie-Behandlung leisten kann. Dank Healio wurden 90% übernommen und der Bonus hat den Rest fast abgedeckt. Einfach genial!", rating: 5 },
  { name: "Familie T. (34 & 36), Hamburg", text: "Für uns als Familie ist das die perfekte Lösung. Die Brille für unseren Sohn, meine Massagen und der Bonus für den Sportverein – das spart uns hunderte Euro im Jahr. Absolut empfehlenswert!", rating: 5 },
  { name: "Max B. (24), München", text: "Als Student zählt jeder Euro. Mit dem IKK Bonus finanziere ich meine Zahnreinigungen und bekomme sogar noch Geld raus. Healio macht's möglich!", rating: 5 }
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