import React, { useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import ExplainerVideoCard from '@/components/sections/shared/ExplainerVideoCard';
import { getDentalContent } from './dentalContent';

const DentalVideoSection = () => {
  const { lang } = useLanguage();
  const content = useMemo(() => getDentalContent(lang).video, [lang]);

  return (
    <ExplainerVideoCard
      id="zahn-erklaervideo"
      videoSrc="/videos/erklaerfilme/erklaervideo-zahn-v1.mp4"
      poster="/videos/erklaerfilme/erklaervideo-zahn-v1-poster.jpg"
      captionsSrc="/videos/erklaerfilme/erklaervideo-zahn-v1-de.vtt"
      eyebrow={content.eyebrow}
      title={content.title}
      badge={content.badge}
      subtitle={content.subtitle}
      disclosure={content.disclosure}
      ariaLabel={content.aria}
      className="bg-[#fffaf0]"
    />
  );
};

export default DentalVideoSection;
