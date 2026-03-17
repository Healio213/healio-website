
import React, { useEffect } from 'react';

/**
 * PerformanceMetrics Component
 * Logs Core Web Vitals (LCP, FID, CLS) to the console during development.
 * Uses import.meta.env.DEV to comply with Vite's environment variable system and avoid ESLint errors.
 */
const PerformanceMetrics = () => {
  useEffect(() => {
    // Only run performance monitoring in development mode
    if (import.meta.env.DEV) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log(`[Core Web Vitals] LCP: ${Math.round(lastEntry.startTime)}ms`, lastEntry);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          if (clsValue > 0) {
             console.log(`[Core Web Vitals] CLS: ${clsValue.toFixed(4)}`);
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const delay = entry.processingStart - entry.startTime;
            console.log(`[Core Web Vitals] FID: ${Math.round(delay)}ms`, entry);
          }
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

        return () => {
          lcpObserver.disconnect();
          clsObserver.disconnect();
          fidObserver.disconnect();
        };
      } catch (e) {
        console.warn('PerformanceObserver not fully supported in this browser.', e);
      }
    }
  }, []);

  return null;
};

export default PerformanceMetrics;
