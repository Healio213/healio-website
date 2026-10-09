// Node-Einstieg für Redaktion und Prüfungen. Der Browser lädt Artikel einzeln
// über registry.loaders.js; der Hub verwendet nur schlanke Metadaten.
import { article as article1 } from '../altersvorsorgedepot-kinderzulage.js';
import { article as article2 } from '../altersvorsorgedepot-kinderzulage-elternteil.js';
import { article as article3 } from '../altersvorsorgedepot-teilzeit-elternzeit.js';
import { article as article4 } from '../altersvorsorgedepot-kindergeld-ende.js';
import { article as article5 } from '../altersvorsorgedepot-selbststaendige.js';
import { article as article6 } from '../altersvorsorgedepot-schwankendes-einkommen.js';
import { article as article7 } from '../altersvorsorgedepot-heilpraktiker.js';
import { article as article8 } from '../altersvorsorgedepot-oder-ruerup.js';

export const articles = [article1, article2, article3, article4, article5, article6, article7, article8];
