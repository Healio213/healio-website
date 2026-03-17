import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Shield, Heart, Zap } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Transparenz',
    description: 'Keine versteckten Kosten, keine komplizierten Klauseln. Wir zeigen Ihnen genau, was Sie bekommen und was es kostet.',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Users,
    title: 'Kundenorientierung',
    description: 'Ihre Gesundheit und Zufriedenheit stehen im Mittelpunkt. Wir sind für Sie da – vor, während und nach dem Abschluss.',
    gradient: 'from-emerald-500 to-teal-400'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Wir nutzen modernste Technologie, um Ihnen ein einfaches, digitales und zeitgemäßes Versicherungserlebnis zu bieten.',
    gradient: 'from-purple-500 to-pink-400'
  },
  {
    icon: Shield,
    title: 'Verlässlichkeit',
    description: 'Wir arbeiten nur mit renommierten Versicherungspartnern zusammen und stehen zu unseren Versprechen.',
    gradient: 'from-orange-500 to-red-400'
  },
  {
    icon: Heart,
    title: 'Empathie',
    description: 'Gesundheit ist persönlich. Wir verstehen Ihre Bedürfnisse und finden die Lösung, die wirklich zu Ihnen passt.',
    gradient: 'from-pink-500 to-rose-400'
  },
  {
    icon: Zap,
    title: 'Effizienz',
    description: 'Zeit ist wertvoll. Deshalb gestalten wir alle Prozesse so einfach und schnell wie möglich – ohne Kompromisse bei der Qualität.',
    gradient: 'from-yellow-500 to-amber-400'
  }
];

const CompanyValues = () => {
  return (
    <section className="healio-section bg-white" aria-labelledby="values-heading">
      <div className="healio-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="values-heading" className="text-3xl lg:text-5xl font-extrabold text-healio-text mb-4">
            Unsere <span className="healio-gradient-text">Werte</span>
          </h2>
          <p className="text-lg text-healio-text-light max-w-3xl mx-auto">
            Was uns antreibt und warum Sie uns vertrauen können.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Animated gradient border on hover */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <value.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-healio-text mb-3">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-healio-text-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-healio-primary to-healio-dark rounded-2xl p-12 text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative text-center">
              <h3 className="text-3xl font-bold mb-4">Unsere Mission</h3>
              <p className="text-xl text-emerald-100 leading-relaxed">
                Wir wollen Gesundheitsversicherung neu denken. Einfach, transparent und auf Ihre Bedürfnisse zugeschnitten. 
                Mit Healio erhalten Sie nicht nur Versicherungsschutz, sondern einen Partner, der Sie auf Ihrem Weg zu besserer 
                Gesundheit begleitet – digital, persönlich und mit echtem Mehrwert.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyValues;