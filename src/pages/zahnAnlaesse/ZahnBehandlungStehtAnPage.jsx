import React from 'react';
import ZahnAnlassPage from '@/pages/ZahnAnlassPage';
import inhalt from '@/content/zahnAnlaesse/behandlung-steht-an';

// Eigene Datei je Anlassseite, damit jede Seite nur ihre eigenen Texte lädt.
const ZahnBehandlungStehtAnPage = () => <ZahnAnlassPage key={inhalt.slug} inhalt={inhalt} />;

export default ZahnBehandlungStehtAnPage;
