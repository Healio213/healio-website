
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Clock, Users } from 'lucide-react';

const trustDefs = [
  { icon: CheckCircle, key: 'trustBar.ikkPartner' },
  { icon: Shield, key: 'trustBar.digital' },
  { icon: Clock, key: 'trustBar.noWait' },
  { icon: Users, key: 'trustBar.independentBroker' },
];

const TrustBar = () => {
  const { t } = useTranslation('ambulant');

  return (
    <section className="bg-white border-b border-gray-100 py-6 px-4 relative z-30 shadow-sm" aria-label={t('trustBar.ariaLabel')}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center">
          {trustDefs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-center lg:justify-start gap-3"
              >
                <Icon className="w-5 h-5 text-healio-primary flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{t(item.key)}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
