/**
 * Sichtbarer Text eines Ratgeberartikels als reine Zeichenkette.
 *
 * Gemeinsame Quelle für die Vorlage (Inhaltsverzeichnis ab rund 1.500
 * Wörtern) und für scripts/check-ratgeber-contract.mjs (Sperrwörter,
 * Gedankenstriche, Umlaute). Kennt die älteren Blöcke (paragraph, list,
 * table, segments) und die optionalen Bausteine der Zahn-Vorlage vom
 * 06.10.2026 (quickAnswer, costCard, steps, honest, cards, path,
 * calculator, sources, author).
 */

const pushListItems = (items, parts) => {
  for (const item of items || []) {
    if (typeof item === 'string') parts.push(item);
    else if (item) parts.push(item.lead, item.text);
  }
};

export const collectBlockText = (blocks, parts) => {
  for (const block of blocks || []) {
    switch (block.type) {
      case 'list':
        pushListItems(block.items, parts);
        break;
      case 'table':
        parts.push(block.caption, block.note, ...(block.head || []));
        for (const row of block.rows || []) parts.push(...row);
        break;
      case 'segments':
        for (const segment of block.segments || []) parts.push(segment.text);
        break;
      case 'costCard':
        // Die Vorlage (CostCard in RatgeberBausteine.jsx) zeigt Kopfzeile und
        // Zeilen als Listen, genau wie bei table. Die frühere Objektform
        // ({ label, kasse, ohne, mit, note }) wird weiter gelesen, damit kein
        // Zellentext an Sperrwort-, Zahlen- und Wortzahlprüfung vorbeigeht.
        parts.push(block.caption, block.title, block.tariffLabel, ...(block.head || []), block.note, block.bonusNote);
        for (const row of block.rows || []) {
          if (Array.isArray(row)) parts.push(...row);
          else if (row) parts.push(row.label, row.kasse, row.ohne, row.mit, row.note);
        }
        break;
      case 'steps':
        parts.push(block.heading);
        for (const step of block.items || []) parts.push(step.title, step.text);
        break;
      case 'honest':
        parts.push(block.heading);
        pushListItems(block.items, parts);
        parts.push(block.text);
        break;
      case 'cards':
        parts.push(block.heading, block.hint);
        for (const card of block.items || []) parts.push(card.eyebrow, card.title, card.text, card.linkLabel);
        break;
      case 'path':
        parts.push(block.text, block.label);
        break;
      case 'calculator':
        // Der Rechner bringt seinen Text aus src/lib/zahnkostenRechner.js mit;
        // der Vertragstest prüft ihn dort gesondert.
        parts.push(block.heading, block.intro);
        break;
      default:
        parts.push(block.text);
    }
  }
  return parts;
};

export const renderArticleText = (article, { includeMeta = true } = {}) => {
  const parts = [article.headline, article.lead];
  if (includeMeta) {
    parts.push(article.ctaLabel, article.footnote, article.listTitle, article.listTeaser, article.metaTitle, article.metaDescription);
  }
  parts.push(article.factNugget);

  if (article.quickAnswer) {
    const quick = article.quickAnswer;
    parts.push(quick.title, quick.text);
    for (const fact of quick.facts || []) parts.push(fact.value, fact.label);
    if (quick.path) parts.push(quick.path.text, quick.path.label);
  }

  for (const section of article.sections || []) {
    parts.push(section.heading);
    collectBlockText(section.blocks, parts);
  }
  for (const faq of article.faqs || []) parts.push(faq.question, faq.answer);
  if (article.internalCta) {
    parts.push(article.internalCta.heading, article.internalCta.label);
    collectBlockText(article.internalCta.blocks, parts);
  }
  if (article.onward) {
    parts.push(article.onward.heading);
    for (const segment of article.onward.segments || []) parts.push(segment.text);
  }
  if (article.sources) {
    parts.push(article.sources.heading, article.sources.intro, article.sources.checkedAtLabel);
    for (const source of article.sources.items || []) {
      parts.push(source.label, source.publisher, source.stand, source.note);
    }
  }
  return parts.filter(Boolean).join('\n');
};

export const countArticleWords = (article) => (
  renderArticleText(article, { includeMeta: false })
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word))
    .length
);

// Ab dieser Länge zeigt die Vorlage ein Inhaltsverzeichnis, wenn der Artikel
// toc: 'auto' setzt (Marktanalyse 06.10.2026, I-7).
export const TOC_MIN_WORDS = 1500;

export const shouldShowToc = (article) => {
  if (article.toc === true) return true;
  if (article.toc !== 'auto') return false;
  return countArticleWords(article) >= TOC_MIN_WORDS;
};
