
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Julia S.",
    initials: "JS",
    age: 28,
    city: "Berlin",
    text: "Ich hätte nie gedacht, dass ich mir die Osteopathie-Behandlung leisten kann. Dank Healio wurden 90% übernommen und der Bonus hat den Rest fast abgedeckt. Einfach genial!"
  },
  {
    name: "Familie T.",
    initials: "FT",
    age: "34 & 36",
    city: "Hamburg",
    text: "Für uns als Familie ist das die perfekte Lösung. Die Brille für unseren Sohn, meine Massagen und der Bonus für den Sportverein – das spart uns hunderte Euro im Jahr. Absolut empfehlenswert!"
  },
  {
    name: "Max B.",
    initials: "MB",
    age: 24,
    city: "München",
    text: "Als Student zählt jeder Euro. Mit dem IKK Bonus finanziere ich meine Brille und Zusatzleistungen und bekomme sogar noch Geld raus. Healio macht's möglich!"
  }
];

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "HEALIO GmbH",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "5000",
    "reviewCount": "347"
  },
  "review": testimonials.map(t => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": t.name },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": t.text
  }))
};

const AmbulantTestimonials = () => {
  return (
    <section className="py-24 bg-green-50/50">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Das sagen unsere Kunden</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-healio-primary relative flex flex-col justify-between"
            >
              <div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
                <div className="text-6xl text-green-200 absolute top-4 right-6 font-serif opacity-50">"</div>
                <p className="text-gray-700 italic relative z-10 mb-8 text-lg leading-relaxed">
                  {t.text}
                </p>
              </div>
              <div className="border-t border-gray-100 pt-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-healio-primary text-white flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.age} Jahre, {t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmbulantTestimonials;
