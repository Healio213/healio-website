import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const calloutPositions = [
  'left-[1%] top-[33%] sm:left-[4%] lg:left-[4%] lg:top-[36%]',
  'right-0 top-[22%] sm:right-[2%] lg:right-[5%] lg:top-[27%]',
  'right-[3%] bottom-[4%] sm:right-[8%] lg:left-[56%] lg:right-auto lg:bottom-[4%]',
];

const imageMask = 'radial-gradient(ellipse 68% 86% at 68% 50%, #000 58%, rgba(0,0,0,0.96) 73%, transparent 100%)';

const HealthPassHeroVisual = ({ labels = [] }) => {
  const visualRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.55 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.55 });
  const rotateY = useTransform(smoothPointerX, [-1, 1], [-2.4, 2.4]);
  const rotateX = useTransform(smoothPointerY, [-1, 1], [1.8, -1.8]);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  });
  const scrollY = useTransform(scrollYProgress, [0, 0.48, 1], [24, 0, -38]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.48, 1], [0.985, 1, 0.965]);

  const handlePointerMove = (event) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const visibleLabels = Array.isArray(labels) ? labels.slice(0, 3) : [];

  return (
    <motion.div
      ref={visualRef}
      data-health-pass-visual
      className="relative h-[430px] w-full overflow-visible sm:h-[560px] lg:h-[560px] xl:h-[580px] 2xl:h-[650px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: reducedMotion ? 0 : scrollY,
          scale: reducedMotion ? 1 : scrollScale,
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reducedMotion ? { rotateY: 0, rotateZ: 0 } : {
            rotateY: [-0.7, 0.7, -0.7],
            rotateZ: [-0.4, 0.4, -0.4],
          }}
          transition={reducedMotion ? { duration: 0 } : {
            duration: 11,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute left-1/2 top-1/2 w-[180%] -translate-x-[58%] -translate-y-1/2 sm:w-[168%] sm:-translate-x-[57%] lg:w-[145%] lg:-translate-x-[52%] 2xl:w-[150%] 2xl:-translate-x-[53%]"
            style={{ maskImage: imageMask, WebkitMaskImage: imageMask }}
            aria-hidden="true"
          >
            <img
              src="/images/healio-health-pass-hero-v2.png"
              alt=""
              width="1536"
              height="1024"
              fetchPriority="high"
              draggable="false"
              className="h-auto w-full max-w-none select-none mix-blend-screen"
            />
          </div>

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible lg:hidden"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="health-pass-callout-line-mobile" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#73E2BD" stopOpacity="0.88" />
                <stop offset="1" stopColor="#8CCBFF" stopOpacity="0.22" />
              </linearGradient>
            </defs>
            <path d="M 9 50 L 9 38 L 25 38" fill="none" stroke="url(#health-pass-callout-line-mobile)" strokeWidth="0.55" vectorEffect="non-scaling-stroke" />
            <path d="M 93 42 L 93 27 L 79 27" fill="none" stroke="url(#health-pass-callout-line-mobile)" strokeWidth="0.55" vectorEffect="non-scaling-stroke" />
            <path d="M 39 91 L 68 91" fill="none" stroke="url(#health-pass-callout-line-mobile)" strokeWidth="0.55" vectorEffect="non-scaling-stroke" />
          </svg>

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="health-pass-callout-line-desktop" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#73E2BD" stopOpacity="0.88" />
                <stop offset="1" stopColor="#8CCBFF" stopOpacity="0.22" />
              </linearGradient>
            </defs>
            <path d="M 25 48 L 25 41 L 20 41" fill="none" stroke="url(#health-pass-callout-line-desktop)" strokeWidth="0.55" vectorEffect="non-scaling-stroke" />
            <path d="M 92 40 L 92 32 L 83 32" fill="none" stroke="url(#health-pass-callout-line-desktop)" strokeWidth="0.55" vectorEffect="non-scaling-stroke" />
            <path d="M 50 95 L 50 92 L 57 92" fill="none" stroke="url(#health-pass-callout-line-desktop)" strokeWidth="0.55" vectorEffect="non-scaling-stroke" />
          </svg>

          {visibleLabels.map((label, index) => (
            <div
              key={label}
              data-protection-label
              className={`absolute z-10 border-l border-home-mint/70 bg-home-midnight/75 py-2 pl-3 pr-4 shadow-[0_12px_34px_rgba(0,0,0,0.32)] backdrop-blur-md ${calloutPositions[index]}`}
              style={{ transform: 'translateZ(26px)' }}
            >
              <span className="font-display text-[11px] font-extrabold uppercase tracking-[0.16em] text-white sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HealthPassHeroVisual;
