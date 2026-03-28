
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const AmbulantVideoSection = () => {
  const { t } = useTranslation('ambulant');
  const [isPlaying, setIsPlaying] = useState(false);
  const stockImageUrl = "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2000"; // Hiking/Nature/Active couple

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            {t('video.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto font-medium">
            {t('video.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video group cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            {!isPlaying ? (
              <>
                <img
                  src={stockImageUrl}
                  alt={t('video.imageAlt')}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-10 h-10 text-white ml-2" />
                  </div>
                </div>
              </>
            ) : (
              <video
                className="w-full h-full"
                controls
                autoPlay
                playsInline
              >
                <source src="/erklaervideo.mp4" type="video/mp4" />
                {t('video.videoFallback')}
              </video>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AmbulantVideoSection;
