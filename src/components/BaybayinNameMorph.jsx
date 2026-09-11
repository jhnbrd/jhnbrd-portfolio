import React from 'react'

/**
 * Baybayin Name Morph Component for "Jhianne":
 * - Natural in-flow typography for Latin text: preserves 100% authentic Inter font kerning,
 *   proportions, and true typographic baseline without artificial letter widths or centered flexboxes.
 * - Authentic Baybayin characters with 0.85em optical scale and clean letter-spacing.
 * - Smooth GPU-accelerated staggered dissolve for both scripts.
 */
const LATIN_CHARS = ['J', 'h', 'i', 'a', 'n', 'n', 'e', '.']
const BAYBAYIN_CHARS = ['ᜌ', 'ᜑ', 'ᜁ', 'ᜀ', 'ᜈ', 'ᜈ', 'ᜁ', '.']

export default function BaybayinNameMorph({ isLatin = false }) {
  return (
    <span
      className="inline-block relative select-none align-baseline"
      aria-label="Jhianne."
    >
      {/* 
        Layer 1: Latin "Jhianne."
        Natural Inter typography: inherits font-light and tracking-tight.
        Each character has its natural glyph width and baseline.
      */}
      <span
        className="inline-flex items-baseline font-light"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          letterSpacing: '-0.025em',
        }}
      >
        {LATIN_CHARS.map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: isLatin ? 1 : 0,
              filter: isLatin ? 'blur(0px)' : 'blur(6px)',
              transform: isLatin ? 'translateY(0px)' : 'translateY(5px)',
              transitionProperty: 'opacity, filter, transform',
              transitionDuration: '700ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${i * 45}ms`,
              willChange: 'opacity, filter, transform',
            }}
          >
            {char}
          </span>
        ))}
      </span>

      {/* 
        Layer 2: Baybayin "ᜌᜑᜁᜀᜈᜈᜁ."
        Authentic Tagalog glyphs with 0.85em scale and comfortable letter-spacing.
      */}
      <span
        className="absolute left-0 top-0 inline-flex items-baseline pointer-events-none select-none font-normal"
        style={{
          fontFamily: '"Noto Sans Tagalog", "Segoe UI Historic", system-ui, sans-serif',
          fontSize: '0.85em',
          letterSpacing: '0.10em',
        }}
      >
        {BAYBAYIN_CHARS.map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: isLatin ? 0 : 1,
              filter: isLatin ? 'blur(6px)' : 'blur(0px)',
              transform: isLatin ? 'translateY(-5px)' : 'translateY(0px)',
              transitionProperty: 'opacity, filter, transform',
              transitionDuration: '700ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${i * 45}ms`,
              willChange: 'opacity, filter, transform',
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  )
}
