
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Clock, Users } from 'lucide-react';

const TrustBar = () => {
  const trustItems = [
    { icon: <CheckCircle className="w-5 h-5 text-healio-primary flex-shrink-0" />, text: "IKK Classic Partner" },
    { icon: <Shield className="w-5 h-5 text-healio-primary flex-shrink-0" />, text: "100% digital" },
    { icon: <Clock className="w-5 h-5 text-healio-primary flex-shrink-0" />, text: "Keine Wartezeit" },
    { icon: <Users className="w-5 h-5 text-healio-primary flex-shrink-0" />, text: "Unabhängiger Makler (§34d GewO)" }
  ];

  return (
    <section className="bg-white border-b border-gray-100 py-6 px-4 relative z-30 shadow-sm" aria-label="Vertrauenssignale">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {item.icon}
              <span className="text-sm font-medium text-gray-700">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
