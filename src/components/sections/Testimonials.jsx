import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonialsData = [
  { name: "Michael K. (45), Frankfurt", tag: "Implantat", highlight: "1.460 € erstattet", text: "Ein Implantat für knapp 2.000 Euro. Ohne Zusatzversicherung wäre mein Eigenanteil bei 1.460 Euro gelegen. Mit meiner Zahnzusatzversicherung habe ich alles erstattet bekommen. Eigenanteil: 0 Euro. Das hat sich innerhalb eines Eingriffs für Jahre bezahlt gemacht.", rating: 5 },
  { name: "Stefanie R. (33), Düsseldorf", tag: "Zahnreinigung", highlight: "Effektiv 0 €", text: "Zweimal im Jahr professionelle Zahnreinigung, komplett erstattet. Dazu der IKK Bonus, der meinen Monatsbeitrag mehr als ausgleicht. Ich zahle effektiv nichts und bekomme Top-Leistungen. So muss Versicherung sein.", rating: 5 },
  { name: "Andreas M. (52), Hamburg", tag: "Fehlende Zähne", highlight: "3 fehlende Zähne mitversichert", text: "Ich hatte bereits fehlende Zähne und war unsicher, ob mich überhaupt noch eine Zahnzusatzversicherung annimmt. Bei Healio war genau das möglich: bis zu 3 fehlende Zähne mitversichert und trotzdem starker Schutz für hochwertigen Zahnersatz.", rating: 5 },
];

const renderHighlight = (text) =>
  text.split('<highlight>').map((part, i) => {
    if (i === 0) return part;
    const [highlighted, rest] = part.split('</highlight>');
    return <React.Fragment key={i}><span className="text-healio-primary">{highlighted}</span>{rest}</React.Fragment>;
  });

const Testimonials = ({ headline }) => {
  const { t } = useTranslation('home');

  return (
    <section className="healio-section bg-white" aria-labelledby="testimonials-heading">
      <div className="healio-container">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl lg:text-5xl font-extrabold text-healio-text break-words hyphens-auto">
            {renderHighlight(headline || t('testimonials.title'))}
          </h2>
          <p className="mt-4 text-lg text-healio-text-light max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
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
