import React, { Suspense, lazy, useEffect, useState } from 'react';
import HomeProtectionFallback from './protection/HomeProtectionFallback';
import ProtectionLabels from './protection/ProtectionLabels';

const GlassShieldScene = lazy(() => import('./protection/GlassShieldScene'));
const ProtectionCoreScene = lazy(() => import('./protection/ProtectionCoreScene'));
const ScrollUnfoldScene = lazy(() => import('./protection/ScrollUnfoldScene'));

const HomeProtectionScene = ({ concept = 'glass', reducedMotion = false, labels = [] }) => {
  const [readyConcept, setReadyConcept] = useState(null);
  const [failedConcept, setFailedConcept] = useState(null);

  const Scene = concept === 'core'
    ? ProtectionCoreScene
    : concept === 'scroll'
      ? ScrollUnfoldScene
      : GlassShieldScene;
  const ready = readyConcept === concept;
  const failed = failedConcept === concept;

  useEffect(() => {
    setReadyConcept(null);
    setFailedConcept(null);
  }, [concept]);

  if (reducedMotion || failed) {
    return <HomeProtectionFallback concept={concept} labels={labels} />;
  }

  return (
    <div
      className="relative h-full min-h-[420px] w-full"
      aria-hidden="true"
      data-protection-concept={concept}
    >
      <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        <HomeProtectionFallback concept={concept} labels={labels} showLabels={false} />
      </div>
      <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        <Suspense fallback={null}>
          <Scene
            key={concept}
            onReady={() => setReadyConcept(concept)}
            onError={() => setFailedConcept(concept)}
          />
        </Suspense>
      </div>
      <ProtectionLabels concept={concept} labels={labels} />
    </div>
  );
};

export default HomeProtectionScene;
