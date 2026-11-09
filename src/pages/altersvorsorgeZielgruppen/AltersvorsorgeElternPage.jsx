import React from 'react';
import AltersvorsorgeZielgruppePage from '@/pages/AltersvorsorgeZielgruppePage';
import inhalt from '@/content/altersvorsorgeZielgruppen/eltern';

// Eigene Datei je Unterseite, damit jede Seite nur ihre eigenen Texte lädt.
const AltersvorsorgeElternPage = () => <AltersvorsorgeZielgruppePage key={inhalt.slug} inhalt={inhalt} />;

export default AltersvorsorgeElternPage;
