
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Gift, Shield, Users } from 'lucide-react';

const PartnerTrustBar = () => {
  const trustItems = [
    { icon: <CheckCircle className="w-5 h-5 text-[#25c990] flex-shrink-0" />, text: "Über 120 Partnerpraxen" },
    { icon: <Gift className="w-5 h-5 text-[#25c990] flex-shrink-0" />, text: "Kostenloses Material" },
    { icon: <Shield className="w-5 h-5 text-[#25c990] flex-shrink-0" />, text: "Keine Verpflichtungen" },
    { icon: <Users className="w-5 h-5 text-[#25c990] flex-shrink-0" />, text: "Persönlicher Ansprechpartner" }
  ];

  return (
    <section className="bg-white border-b border-slate-100 py-8 px-4 relative z-30" aria-label="Vertrauenssignale">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100"
            >
              {item.icon}
              <span className="text-sm md:text-base font-semibold text-slate-700">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerTrustBar;
