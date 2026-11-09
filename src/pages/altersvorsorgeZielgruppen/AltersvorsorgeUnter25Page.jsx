import React from 'react';
import AltersvorsorgeZielgruppePage from '@/pages/AltersvorsorgeZielgruppePage';
import inhalt from '@/content/altersvorsorgeZielgruppen/unter-25';

// Eigene Datei je Unterseite, damit jede Seite nur ihre eigenen Texte lädt.
const AltersvorsorgeUnter25Page = () => <AltersvorsorgeZielgruppePage key={inhalt.slug} inhalt={inhalt} />;

export default AltersvorsorgeUnter25Page;
