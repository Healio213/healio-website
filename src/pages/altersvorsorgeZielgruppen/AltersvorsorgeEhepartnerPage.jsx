import React from 'react';
import AltersvorsorgeZielgruppePage from '@/pages/AltersvorsorgeZielgruppePage';
import inhalt from '@/content/altersvorsorgeZielgruppen/ehepartner';

// Eigene Datei je Unterseite, damit jede Seite nur ihre eigenen Texte lädt.
const AltersvorsorgeEhepartnerPage = () => <AltersvorsorgeZielgruppePage key={inhalt.slug} inhalt={inhalt} />;

export default AltersvorsorgeEhepartnerPage;
