import { articles as grundlagenRiester } from './grundlagen-riester.js';
import { articles as familienSelbststaendige } from './familien-selbststaendige.js';
import { articles as entscheidung } from './entscheidung.js';

export { altersvorsorgeClusters, ALTERSVORSORGE_HUB_PATH } from './shared.js';
export const altersvorsorgeArticles = [...grundlagenRiester, ...familienSelbststaendige, ...entscheidung];
