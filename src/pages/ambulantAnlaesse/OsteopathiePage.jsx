import React from 'react';
import AmbulantAnlassPage from '@/pages/AmbulantAnlassPage';
import inhalt from '@/content/ambulantAnlaesse/osteopathie';

// Eigene Datei je Anlassseite, damit jede Seite nur ihre eigenen Texte lädt.
const OsteopathiePage = () => <AmbulantAnlassPage key={inhalt.slug} inhalt={inhalt} />;

export default OsteopathiePage;
