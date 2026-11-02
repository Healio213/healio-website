import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Kommt ein Besucher mit Sprungmarke auf eine neue Seite (/stationaer#familie
// aus einem Ratgeber), springt die Seite sofort statt sanft. Grund
// (Wegprüfung 02.11.2026, nachgestellt): Beim Aufbau der Seite misst
// framer-motion eine Höhenanimation (offene FAQ) und setzt dabei die alte
// Scrollposition per window.scrollTo zurück. Das bricht ein laufendes sanftes
// Scrollen ab, mobil landete der Besucher dadurch oben. Danach wird die Lage
// noch kurz nachgeprüft, falls sich der Inhalt darüber verschiebt. Sobald der
// Besucher selbst scrollt, tippt oder eine Taste drückt, hört das auf.
// Sprünge innerhalb derselben Seite bleiben sanft wie bisher.
const NACHPRUEFEN_MS = [120, 350, 800, 1500, 2500];
const TOLERANZ_PX = 4;

const springeSofort = (target) => {
  const html = document.documentElement;
  const vorher = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  target.scrollIntoView({ block: 'start' });
  html.style.scrollBehavior = vorher;
};

const liegtRichtig = (target) => {
  const abstand = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
  const oben = target.getBoundingClientRect().top;
  if (Math.abs(oben - abstand) <= TOLERANZ_PX) return true;
  // Am Seitenende kann die Marke nicht ganz nach oben rücken.
  const amEnde = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  return amEnde && oben > abstand;
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const letzterPfad = useRef(null);

  useEffect(() => {
    const neueSeite = letzterPfad.current !== pathname;
    letzterPfad.current = pathname;

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
      const nachpruefungen = [];
      const eingriffe = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
      const besucherScrollt = () => { stopped = true; };

      const findeZiel = () => {
        const homeDesktopTargets = {
          'so-funktioniert': 'desktop-home-process',
          schutz: 'desktop-home-products',
        };
        const resolvedId = (pathname === '/' || pathname === '/en')
          && window.matchMedia('(min-width: 1024px)').matches
          ? homeDesktopTargets[targetId] || targetId
          : targetId;
        return document.getElementById(resolvedId);
      };

      const scrollToTarget = () => {
        if (stopped) return false;
        const target = findeZiel();
        if (!target) return false;
        window.requestAnimationFrame(() => {
          if (stopped || !document.contains(target)) return;
          if (!neueSeite) {
            target.scrollIntoView({ block: 'start' });
            return;
          }
          springeSofort(target);
          eingriffe.forEach((name) => window.addEventListener(name, besucherScrollt, { passive: true, once: true }));
          NACHPRUEFEN_MS.forEach((ms) => {
            nachpruefungen.push(window.setTimeout(() => {
              const aktuell = findeZiel();
              if (!stopped && aktuell && !liegtRichtig(aktuell)) springeSofort(aktuell);
            }, ms));
          });
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
        nachpruefungen.forEach((id) => window.clearTimeout(id));
        eingriffe.forEach((name) => window.removeEventListener(name, besucherScrollt));
      };
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
