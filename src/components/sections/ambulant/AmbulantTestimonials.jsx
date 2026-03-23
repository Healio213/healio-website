
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Heart, Glasses, Baby, GraduationCap, Stethoscope } from 'lucide-react';

const testimonials = [
  {
    name: "Julia S.",
    initials: "JS",
    age: 28,
    city: "Berlin",
    tag: "Osteopathie",
    icon: Stethoscope,
    highlight: "540 € erstattet",
    text: "Ich gehe seit Jahren zur Osteopathie, aber 80 Euro pro Sitzung selbst zahlen war auf Dauer zu viel. Mit Healio wurden letztes Jahr 6 Behandlungen zu 90% erstattet. Zusammen mit dem IKK Bonus habe ich unterm Strich sogar plus gemacht. Hätte ich das mal früher gewusst!"
  },
  {
    name: "Thomas & Katrin T.",
    initials: "TK",
    age: "34 & 36",
    city: "Hamburg",
    tag: "Familie",
    icon: Baby,
    highlight: "1.200 € gespart",
    text: "Wir haben Healio für die ganze Familie abgeschlossen: Neue Brille für unseren Sohn, meine Osteopathie nach der Schwangerschaft, Zahnreinigung für alle vier und der Bonus für den Sportverein. In einem Jahr haben wir über 1.200 Euro an Leistungen bekommen und zahlen durch den IKK Bonus effektiv nichts dafür."
  },
  {
    name: "Max B.",
    initials: "MB",
    age: 24,
    city: "München",
    tag: "Student",
    icon: GraduationCap,
    highlight: "Brille für 0 €",
    text: "Als Student zählt wirklich jeder Euro. Meine neue Brille hat 380 Euro gekostet, davon wurden 300 Euro von der SDK erstattet. Dazu kommen noch 75 Euro IKK Bonus für den Hochschulsport und 30 Euro für die Grippeimpfung. Mein Versicherungsbeitrag liegt bei 19 Euro im Monat. Die Rechnung geht voll auf."
  },
  {
    name: "Sandra M.",
    initials: "SM",
    age: 42,
    city: "Köln",
    tag: "Heilpraktikerin",
    icon: Heart,
    highlight: "3 neue Patienten/Monat",
    text: "Als Heilpraktikerin empfehle ich Healio meinen Patienten. Seitdem können sich viele längere Behandlungsserien leisten, die vorher am Geld gescheitert sind. Für meine Praxis bedeutet das planbare Einnahmen, und meine Patienten bekommen die Therapie, die sie wirklich brauchen. Eine echte Win-Win-Situation."
  },
  {
    name: "Andreas K.",
    initials: "AK",
    age: 51,
    city: "Frankfurt",
    tag: "Brillenträger",
    icon: Glasses,
    highlight: "500 € Sehhilfen",
    text: "Gleitsichtbrille für 680 Euro, davon 500 Euro von der SDK erstattet. Dazu die professionelle Zahnreinigung zweimal im Jahr über das IKK Gesundheitskonto. Ich bin seit 30 Jahren gesetzlich versichert und hatte noch nie so gute Leistungen. Der Wechsel zur IKK war in 5 Minuten erledigt."
  },
  {
    name: "Lisa & Markus F.",
    initials: "LM",
    age: "31 & 33",
    city: "Stuttgart",
    tag: "Junge Eltern",
    icon: Baby,
    highlight: "Baby sofort versichert",
    text: "Unser Sohn wurde im Januar geboren und wir konnten ihn innerhalb von 2 Monaten ohne Gesundheitsprüfung mitversichern. Die Hebammen-Nachsorge, Osteopathie fürs Baby und meine Rückbildungskurse werden alle bezuschusst. Und das Beste: Durch den Familienbonus bei der IKK zahlen wir effektiv nichts drauf."
  }
];

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "HEALIO GmbH",
  "url": "https://www.healio.de",
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
    "reviewBody": t.text,
    "datePublished": "2026-03-01"
  }))
};

const stats = [
  { value: "5.000+", label: "zufriedene Kunden" },
  { value: "4,9/5", label: "Sterne Bewertung" },
  { value: "Ø 2.400 €", label: "Erstattung pro Jahr" },
  { value: "0 €", label: "effektive Kosten" },
];

const AmbulantTestimonials = () => {
  return (
    <section className="py-24 bg-green-50/50">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Das sagen unsere Kunden</h2>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">Echte Erfahrungen von Menschen, die das Healio Gesundheitsbudget bereits nutzen.</p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="text-center py-4"
            >
              <p className="text-2xl md:text-3xl font-extrabold text-healio-primary">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between group"
              >
                <div>
                  {/* Header: Tag + Highlight */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-healio-primary text-sm font-semibold rounded-full">
                      <Icon className="w-3.5 h-3.5" />
                      {t.tag}
                    </span>
                    <span className="text-sm font-bold text-healio-primary flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {t.highlight}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex space-x-0.5 mb-3">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 relative z-10 mb-6 text-[15px] leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                {/* Author */}
                <div className="border-t border-gray-100 pt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-healio-primary text-white flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.age} Jahre, {t.city}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AmbulantTestimonials;
