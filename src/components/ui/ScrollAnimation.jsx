import React from 'react';
import { motion } from 'framer-motion';

/**
 * Wiederverwendbare Scroll-Animation Komponenten
 * Inspiriert von privatehealthclub.de
 */

// Fade In + Slide Up (Standard-Animation für Sektionen)
export const FadeInUp = ({ children, delay = 0, duration = 0.7, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Fade In von links
export const FadeInLeft = ({ children, delay = 0, duration = 0.7, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Fade In von rechts
export const FadeInRight = ({ children, delay = 0, duration = 0.7, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scale In (für Karten, Bilder)
export const ScaleIn = ({ children, delay = 0, duration = 0.6, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Gestaffelte Kinder-Animation (für Card-Grids)
export const StaggerContainer = ({ children, staggerDelay = 0.15, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Counter-Animation für Zahlen
export const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2, className = '' }) => {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.,]/g, '').replace(',', '.')) : value;

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {prefix}
        <CounterValue target={numericValue} duration={duration} />
        {suffix}
      </motion.span>
    </motion.span>
  );
};

// Interner Counter-Hook
const CounterValue = ({ target, duration }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const animate = (currentTime) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString('de-DE')}</span>;
};

// Parallax-Effekt für Hintergrundbilder
export const ParallaxSection = ({ children, bgImage, speed = 0.3, className = '', overlay = true }) => {
  const ref = React.useRef(null);
  const [offsetY, setOffsetY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        setOffsetY(scrolled * speed);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${bgImage}")`,
            transform: `translateY(${offsetY}px)`,
            top: '-50px',
            bottom: '-50px',
          }}
        />
      )}
      {overlay && <div className="absolute inset-0 bg-black/40" />}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Text-Highlight Animation: Glow + Farbwechsel (grau → grün mit Leuchten)
export const TextHighlight = ({ children, color = '#25C990', delay = 0 }) => (
  <motion.span
    className="relative inline-block font-bold"
    initial={{ color: '#6B7280', textShadow: '0 0 0px transparent', opacity: 0.5 }}
    whileInView={{
      color: color,
      opacity: 1,
      textShadow: [
        '0 0 0px transparent',
        `0 0 30px ${color}`,
        `0 0 10px ${color}60`,
      ],
    }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{
      duration: 0.8,
      delay,
      ease: 'easeOut',
      textShadow: { duration: 1.2, delay, times: [0, 0.4, 1] },
    }}
  >
    {children}
  </motion.span>
);
