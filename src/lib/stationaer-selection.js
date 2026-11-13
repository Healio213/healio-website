import { useSyncExternalStore } from 'react';

// Gewählter SDK-Klinik-Tarif auf /stationaer. Die Tarifwahl schreibt ihn, der
// Schlussknopf weiter unten liest ihn und führt mit demselben Tarif zum Rechner.
// SP2 ist die Vorwahl, solange nichts anderes gewählt wurde.
export const STATIONAER_DEFAULT_TARIFF = 'sp2';

let current = STATIONAER_DEFAULT_TARIFF;
const listeners = new Set();

export const setStationaerSelection = (key) => {
  if (!key || key === current) return;
  current = key;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useStationaerSelection = () =>
  useSyncExternalStore(subscribe, () => current, () => STATIONAER_DEFAULT_TARIFF);
