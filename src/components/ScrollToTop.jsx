import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let targetId;
      try {
        targetId = decodeURIComponent(hash.slice(1));
      } catch {
        window.scrollTo(0, 0);
        return undefined;
      }

      let stopped = false;
      let observer;
      let timeout;
      const scrollToTarget = () => {
        if (stopped) return false;
        const target = document.getElementById(targetId);
        if (!target) return false;
        window.requestAnimationFrame(() => {
          if (!stopped && document.contains(target)) target.scrollIntoView({ block: 'start' });
        });
        return true;
      };

      window.scrollTo(0, 0);
      if (!scrollToTarget()) {
        const root = document.getElementById('root') || document.body;
        observer = new MutationObserver(() => {
          if (scrollToTarget()) observer.disconnect();
        });
        observer.observe(root, { childList: true, subtree: true });
        timeout = window.setTimeout(() => observer.disconnect(), 5000);
      }

      return () => {
        stopped = true;
        observer?.disconnect();
        if (timeout) window.clearTimeout(timeout);
      };
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
