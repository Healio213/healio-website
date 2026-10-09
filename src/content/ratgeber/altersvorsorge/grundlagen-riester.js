// Node-Einstieg für Redaktion und Prüfungen. Der Browser lädt Artikel einzeln
// über registry.loaders.js; der Hub verwendet nur schlanke Metadaten.
import { article as article1 } from '../altersvorsorgedepot-was-ist-das.js';
import { article as article2 } from '../altersvorsorgedepot-ab-wann.js';
import { article as article3 } from '../altersvorsorgedepot-foerderung.js';
import { article as article4 } from '../altersvorsorgedepot-wer-ist-berechtigt.js';
import { article as article5 } from '../riester-altersvorsorgedepot-wechsel.js';
import { article as article6 } from '../riester-kuendigen-oder-behalten.js';
import { article as article7 } from '../riester-jahresmitteilung-checkliste.js';
import { article as article8 } from '../riester-alte-oder-neue-foerderung.js';

export const articles = [article1, article2, article3, article4, article5, article6, article7, article8];
