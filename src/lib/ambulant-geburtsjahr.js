import { useSyncExternalStore } from 'react';

// Das Geburtsjahr aus dem Rechner auf /ambulant für den Kopfknopf (Nachbesserung
// 22.11.2026): Der Knopf oben gibt es wie die Tarifkarte an die Antragsmaske
// weiter (vorbelegung). Nur das Jahr, nur im Arbeitsspeicher dieser Seite, nie
// im Browser gespeichert. Verlässt man /ambulant, setzt die Seite es zurück.
const listeners = new Set();
let current = null;

export const setAmbulantGeburtsjahr = (jahr) => {
  const wert = Number.isInteger(jahr) ? jahr : null;
  if (wert === current) return;
  current = wert;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useAmbulantGeburtsjahr = () => useSyncExternalStore(subscribe, () => current, () => null);
