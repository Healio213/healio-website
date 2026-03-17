import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const VideoCard = ({ title, description, videoLabel, delay, isHero = false, imageUrl }) => {
  const { toast } = useToast();
  const handleVideoPlay = () => {
    toast({
      title: "🚧 Video-Player in Kürze verfügbar!",
      description: "Diese Funktion ist noch nicht implementiert. 🚀",
      duration: 5000,
      className: "bg-healio-mint border-healio-primary text-healio-slate"
    });
  };

  const containerMotion = isHero ? {} : {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  };

  const backgroundStyle = imageUrl
    ? { backgroundImage: `url(${imageUrl})` }
    : {};

  const backgroundClasses = imageUrl
    ? 'bg-cover bg-center'
    : 'bg-gradient-to-br from-healio-primary to-healio-mint';

  return (
    <motion.div {...containerMotion} className="healio-card p-6 space-y-4 rounded-xl border border-healio-gray/20 shadow-lg bg-white">
      <div 
        className={`relative aspect-video rounded-lg flex items-center justify-center cursor-pointer group ${backgroundClasses}`}
        style={backgroundStyle}
        onClick={handleVideoPlay}
      >
        <div className="absolute inset-0 bg-black/30 rounded-lg transition-opacity duration-300 group-hover:opacity-50"></div>
        {videoLabel && (
          <div className="absolute text-white font-bold text-lg sm:text-xl text-center px-4 -translate-y-16 drop-shadow-md">
            {videoLabel}
          </div>
        )}
        <PlayCircle className="w-20 h-20 text-healio-primary group-hover:text-healio-primary-dark transform transition-transform duration-300 group-hover:scale-110 drop-shadow-xl" />
      </div>
      <h3 className="text-xl font-bold text-healio-slate">{title}</h3>
      <p className="text-healio-text-light text-sm">{description}</p>
    </motion.div>
  );
};

export default VideoCard;