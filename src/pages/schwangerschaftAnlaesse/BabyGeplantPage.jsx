import React from 'react';
import SchwangerschaftAnlassPage from '@/pages/SchwangerschaftAnlassPage';
import inhalt from '@/content/schwangerschaftAnlaesse/baby-geplant';

// Eigene Datei je Anlassseite, damit jede Seite nur ihre eigenen Texte lädt.
const BabyGeplantPage = () => <SchwangerschaftAnlassPage key={inhalt.slug} inhalt={inhalt} />;

export default BabyGeplantPage;
