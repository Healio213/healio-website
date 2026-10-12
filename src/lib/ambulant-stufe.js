import { useSyncExternalStore } from 'react';
import { AMBULANT_STUFE_DEFAULT } from '@/lib/sdk-url';

// Die zuletzt gewählte Ambulant-Stufe (50/70/90/100) für alle Rechner-Knöpfe
// auf /ambulant. Nur die Zahl, keine Personendaten.
const STORAGE_KEY = 'healio_ambulant_stufe';
const VALID = [50, 70, 90, 100];
const listeners = new Set();
let current = null;

const read = () => {
  if (current !== null) return current;
  try {
    const stored = Number(sessionStorage.getItem(STORAGE_KEY));
    current = VALID.includes(stored) ? stored : AMBULANT_STUFE_DEFAULT;
  } catch {
    current = AMBULANT_STUFE_DEFAULT;
  }
  return current;
};

export const setAmbulantStufe = (stufe) => {
  const value = Number(stufe);
  if (!VALID.includes(value)) return;
  current = value;
  try {
    sessionStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // sessionStorage ist nicht in jedem Browser-Kontext verfügbar.
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useAmbulantStufe = () => useSyncExternalStore(subscribe, read, () => AMBULANT_STUFE_DEFAULT);
