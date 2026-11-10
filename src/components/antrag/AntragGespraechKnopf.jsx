import React from 'react';
import { Mic } from 'lucide-react';
import { HEALIO_ANTRAG_GESPRAECH_AKTIV, HEALIO_ANTRAG_KNOPF_AKTIV } from '@/config/contactChannels';
import { buttonClass } from './ui';

// Einstieg „Antrag gemeinsam aufnehmen“ (10.11.2026, SCHNITTSTELLE.md 11.2). Echter Link als volle
// Seitennavigation (kein Router-Link), damit auf /antrag/aufnehmen keine Mess-Skripte der vorigen Seite im
// selben Dokument weiterlaufen. Rendert nur, wenn Seite und Knopf beide eingeschaltet sind. Noch in keiner Seite eingebunden.
export default function AntragGespraechKnopf({ variant = 'secondary', className }) {
  if (!HEALIO_ANTRAG_GESPRAECH_AKTIV || !HEALIO_ANTRAG_KNOPF_AKTIV) return null;
  return (
    <a href="/antrag/aufnehmen" data-antrag-gespraech-knopf="" className={buttonClass(variant, className)}>
      <Mic className="h-5 w-5" aria-hidden="true" />
      Antrag gemeinsam aufnehmen
    </a>
  );
}
