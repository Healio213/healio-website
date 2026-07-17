import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const imageMask = 'radial-gradient(ellipse 68% 86% at 68% 50%, #000 58%, rgba(0,0,0,0.96) 73%, transparent 100%)';
const depthRingMask = 'radial-gradient(ellipse at center, transparent 0 62%, #000 63%, #000 64.5%, transparent 66%)';
const wordmarkMask = 'linear-gradient(90deg, transparent 0%, #000 22%, #000 76%, transparent 100%)';

const HealthPassHeroVisual = () => {
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
        <div
          className="pointer-events-none absolute left-[54%] top-1/2 w-[96%] -translate-x-1/2 -translate-y-1/2 sm:w-[88%] lg:left-[63%] lg:w-[86%]"
          style={{ maskImage: wordmarkMask, WebkitMaskImage: wordmarkMask }}
          aria-hidden="true"
        >
          <motion.img
            data-health-pass-wordmark
            src="/healio-logo-white.svg"
            alt=""
            width="1000"
            height="400"
            draggable="false"
            className="h-auto w-full select-none opacity-[0.05] blur-[0.4px]"
            animate={reducedMotion ? { x: 0, y: 0, rotate: -3 } : {
              x: [-10, 12, -10],
              y: [6, -8, 6],
              rotate: [-3, -1.5, -3],
            }}
            transition={reducedMotion ? { duration: 0 } : {
              duration: 22,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />
        </div>

        <div className="pointer-events-none absolute left-[54%] top-1/2 h-[62%] w-[92%] -translate-x-1/2 -translate-y-1/2 sm:w-[84%] lg:left-[63%] lg:h-[64%] lg:w-[78%]" aria-hidden="true">
          <motion.div
            data-health-pass-depth-ring
            className="absolute inset-0 rounded-[50%] opacity-40"
            animate={reducedMotion ? { rotate: -8 } : { rotate: [-8, -368] }}
            transition={reducedMotion ? { duration: 0 } : {
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{
              background: 'conic-gradient(from 25deg, transparent 0deg, rgba(115,226,189,0.24) 65deg, rgba(140,203,255,0.1) 140deg, transparent 205deg, rgba(185,167,255,0.16) 285deg, transparent 360deg)',
              maskImage: depthRingMask,
              WebkitMaskImage: depthRingMask,
            }}
          />
        </div>

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
              src="/images/healio-health-pass-hero-v2.webp"
              alt=""
              width="1536"
              height="1024"
              fetchPriority="high"
              draggable="false"
              className="h-auto w-full max-w-none select-none mix-blend-screen"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HealthPassHeroVisual;
