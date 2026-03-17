import React from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

const SocialProofSection = () => {
  return (
    <section className="healio-section bg-healio-primary text-white py-24">
      <div className="healio-container text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Sprout size={40} className="text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            Wir spenden <span className="text-white underline decoration-healio-accent decoration-4 underline-offset-4">10% unseres Umsatzes</span> <br/>
            an gemeinnützige Organisationen.
          </h2>

          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 font-light">
            Erfolg bedeutet für uns, Verantwortung zu übernehmen. Nicht nur für Ihre Finanzen, 
            sondern auch für die Gesellschaft, in der wir leben.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-90">
            {/* Placeholders for charity icons - using simple divs with text for now */}
            <div className="flex flex-col items-center group cursor-pointer">
               <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:text-healio-primary transition-all duration-300">
                 🌍
               </div>
               <span className="text-sm font-medium">Umweltschutz</span>
            </div>
            <div className="flex flex-col items-center group cursor-pointer">
               <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:text-healio-primary transition-all duration-300">
                 🎓
               </div>
               <span className="text-sm font-medium">Bildung</span>
            </div>
            <div className="flex flex-col items-center group cursor-pointer">
               <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:text-healio-primary transition-all duration-300">
                 🏥
               </div>
               <span className="text-sm font-medium">Gesundheit</span>
            </div>
            <div className="flex flex-col items-center group cursor-pointer">
               <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:text-healio-primary transition-all duration-300">
                 🤝
               </div>
               <span className="text-sm font-medium">Soziales</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;