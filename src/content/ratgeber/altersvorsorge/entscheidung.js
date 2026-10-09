// Node-Einstieg für Redaktion und Prüfungen. Der Browser lädt Artikel einzeln
// über registry.loaders.js; der Hub verwendet nur schlanke Metadaten.
import { article as article1 } from '../altersvorsorgedepot-kosten.js';
import { article as article2 } from '../altersvorsorgedepot-garantie.js';
import { article as article3 } from '../altersvorsorgedepot-etf-sparplan.js';
import { article as article4 } from '../altersvorsorgedepot-steuern.js';
import { article as article5 } from '../altersvorsorgedepot-geld-entnehmen.js';
import { article as article6 } from '../altersvorsorgedepot-auszahlung.js';
import { article as article7 } from '../altersvorsorgedepot-anbieterwechsel.js';
import { article as article8 } from '../altersvorsorgedepot-passt-das-zu-mir.js';

export const articles = [article1, article2, article3, article4, article5, article6, article7, article8];
