import React from 'react';
import AltersvorsorgeZielgruppePage from '@/pages/AltersvorsorgeZielgruppePage';
import inhalt from '@/content/altersvorsorgeZielgruppen/riester';

// Eigene Datei je Unterseite, damit jede Seite nur ihre eigenen Texte lädt.
const AltersvorsorgeRiesterPage = () => <AltersvorsorgeZielgruppePage key={inhalt.slug} inhalt={inhalt} />;

export default AltersvorsorgeRiesterPage;
