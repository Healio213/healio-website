import React from 'react';
import { motion } from 'framer-motion';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const impactAreas = [
  { label: 'Umweltschutz', kind: 'naturopathy', tone: 'mint' },
  { label: 'Bildung', kind: 'document', tone: 'sky' },
  { label: 'Gesundheit', kind: 'hospital', tone: 'coral' },
  { label: 'Soziales', kind: 'support', tone: 'butter' },
];

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
          <FriendlyIcon kind="naturopathy" tone="mint" size="lg" className="mx-auto mb-8" />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            Wir spenden <span className="text-white underline decoration-healio-accent decoration-4 underline-offset-4">10% unseres Umsatzes</span> <br/>
            an gemeinnützige Organisationen.
          </h2>

          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 font-light">
            Erfolg bedeutet für uns, Verantwortung zu übernehmen. Nicht nur für Ihre Finanzen, 
            sondern auch für die Gesellschaft, in der wir leben.
          </p>

          <div className="grid grid-cols-2 gap-8 opacity-95 md:grid-cols-4">
            {impactAreas.map((area) => (
              <div key={area.label} className="flex flex-col items-center">
                <FriendlyIcon kind={area.kind} tone={area.tone} size="md" className="mb-3" />
                <span className="text-sm font-medium">{area.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
