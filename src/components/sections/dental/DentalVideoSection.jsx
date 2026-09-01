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
      videoSrc="/erklaervideo-zahn.mp4"
      poster="/images/erklaervideo-zahn-poster.jpg"
      eyebrow={content.eyebrow}
      title={content.title}
      ariaLabel={content.aria}
      className="bg-[#fffaf0]"
    />
  );
};

export default DentalVideoSection;
