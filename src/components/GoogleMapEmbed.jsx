import React, { useMemo } from 'react';
import ExternalProviderGate from '@/components/ExternalProviderGate';

const MAPS_EXTERNAL_URL = 'https://www.google.com/maps/search/?api=1&query=Arndtstra%C3%9Fe%206%2C%2022085%20Hamburg';

const getSafeMapUrl = (value) => {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== 'www.google.com' || url.pathname !== '/maps/embed') return null;
    return url.toString();
  } catch {
    return null;
  }
};

const GoogleMapEmbed = ({ className = 'h-[400px] md:h-[500px]', title, url }) => {
  const safeUrl = useMemo(() => getSafeMapUrl(url), [url]);
  if (!safeUrl) return null;

  return (
    <ExternalProviderGate
      provider="maps"
      externalUrl={MAPS_EXTERNAL_URL}
      placeholderClassName={className}
    >
      <iframe
        src={safeUrl}
        className={`w-full border-0 ${className}`}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title={title}
      />
    </ExternalProviderGate>
  );
};

export default GoogleMapEmbed;
