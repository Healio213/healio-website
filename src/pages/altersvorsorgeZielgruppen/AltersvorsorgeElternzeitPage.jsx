import React from 'react';
import AltersvorsorgeZielgruppePage from '@/pages/AltersvorsorgeZielgruppePage';
import inhalt from '@/content/altersvorsorgeZielgruppen/elternzeit';

// Eigene Datei je Unterseite, damit jede Seite nur ihre eigenen Texte lädt.
const AltersvorsorgeElternzeitPage = () => <AltersvorsorgeZielgruppePage key={inhalt.slug} inhalt={inhalt} />;

export default AltersvorsorgeElternzeitPage;
