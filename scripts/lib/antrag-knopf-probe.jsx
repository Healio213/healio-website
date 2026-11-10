// Nur für scripts/check-antrag-aufnehmen-rendered.mjs: rendert den noch nirgends eingebundenen Knopf
// „Antrag gemeinsam aufnehmen“ im Vite-Entwicklungsserver, damit die Prüfung sieht, ob er nur mit Schalter erscheint.
import React from 'react';
import { createRoot } from 'react-dom/client';
import AntragGespraechKnopf from '@/components/antrag/AntragGespraechKnopf';

export function zeigeKnopf(ziel) {
  createRoot(ziel).render(<AntragGespraechKnopf />);
}
