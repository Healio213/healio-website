import React from 'react';

/**
 * HighlightText
 * Rendert einen String, in dem Schlüsselwörter mit <highlight>...</highlight>
 * markiert sind, und färbt diese im Healio-Grün (#25c990) ein mit einem
 * subtilen Farbverlauf von hellgrün zu dunkelgrün.
 *
 * Verwendung:
 *   <HighlightText text={t('hero.title')} />
 *
 * Beispiel-String in den i18n-JSONs:
 *   "Gesundheit fördern. <highlight>Mitarbeiter binden</highlight>."
 *
 * Optional lässt sich eine className übergeben (z. B. für Headlines auf
 * dunklem Hintergrund). In dem Fall wird der Default-Gradient nicht angewendet.
 */
const HIGHLIGHT_REGEX = /<highlight>(.*?)<\/highlight>/g;

// Healio-Grün-Farbverlauf: deutlich von hell nach dunkel
const DEFAULT_GRADIENT_STYLE = {
  backgroundImage: 'linear-gradient(135deg, #5eeab8 0%, #25c990 45%, #0f6646 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

const HighlightText = ({ text, className, as: Tag = React.Fragment }) => {
  if (!text) return null;

  // Split on highlight tags AND unmittelbar folgende Satzzeichen, damit
  // Punkt/Komma/Ausrufezeichen etc. direkt neben dem Highlight ebenfalls
  // den Farbverlauf bekommen (weißer Punkt neben grünem Text sieht sonst
  // komisch aus).
  const parts = text.split(/<highlight>(.*?)<\/highlight>([.,!?:;…]*)/);
  const useDefaultGradient = !className;

  // Split-Ergebnis mit 2 Capture-Groups hat folgendes Muster:
  // [text, highlight, punct, text, highlight, punct, text, ...]
  const content = [];
  for (let i = 0; i < parts.length; i++) {
    const mod = i % 3;
    if (mod === 0) {
      content.push(<React.Fragment key={i}>{parts[i]}</React.Fragment>);
    } else if (mod === 1) {
      const punct = parts[i + 1] || '';
      content.push(
        <span
          key={i}
          className={className}
          style={useDefaultGradient ? DEFAULT_GRADIENT_STYLE : undefined}
        >
          {parts[i] + punct}
        </span>
      );
    }
    // mod === 2 wird in mod === 1 bereits konsumiert
  }

  if (Tag === React.Fragment) {
    return <>{content}</>;
  }
  return <Tag>{content}</Tag>;
};

export { HIGHLIGHT_REGEX };
export default HighlightText;
