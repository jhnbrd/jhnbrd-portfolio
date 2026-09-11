import React from 'react'

/**
 * Baybayin Name Morph Component for "Jhianne":
 * - Pure slot-based dual-layer dissolve (matching BaybayinScrambleText architecture).
 * - Controlled directly via `isLatin` prop from parent, ensuring perfect synchronization
 *   between line break (1 line for Latin, 2 lines for Baybayin) and letter transitions.
 * - Dynamic slot width transition ensures the period '.' gracefully slides without clipping.
 * - Baybayin uses authentic native Tagalog glyphs (ᜌ ᜑ ᜁ ᜀ ᜈ ᜈ ᜁ) with smaller font size (0.85em).
 * - Latin uses natural proportional Inter metrics matching font-light.
 */
const LETTERS = [
  { latin: 'J', baybayin: 'ᜌ', latinWidth: '0.40em' },
  { latin: 'h', baybayin: 'ᜑ', latinWidth: '0.52em' },
  { latin: 'i', baybayin: 'ᜁ', latinWidth: '0.24em' },
  { latin: 'a', baybayin: 'ᜀ', latinWidth: '0.50em' },
  { latin: 'n', baybayin: 'ᜈ', latinWidth: '0.52em' },
  { latin: 'n', baybayin: 'ᜈ', latinWidth: '0.52em' },
  { latin: 'e', baybayin: 'ᜁ', latinWidth: '0.48em' },
]

export default function BaybayinNameMorph({ isLatin = false }) {
  return (
    <span
      className="inline-flex items-baseline select-none"
      aria-label="Jhianne"
    >
      {LETTERS.map((item, i) => {
        const delayMs = i * 100

        return (
          <span
            key={i}
            className="inline-block relative text-center"
            style={{
              width: isLatin ? item.latinWidth : '0.78em',
              height: '1.20em',
              margin: isLatin ? '0 0.01em' : '0 0.04em',
              verticalAlign: 'baseline',
              overflow: 'visible',
              transition:
                'width 1.2s cubic-bezier(0.16, 1, 0.3, 1), margin 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Layer 1: Authentic Native Baybayin Glyph */}
            <span
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
              style={{
                fontFamily: '"Noto Sans Tagalog", "Segoe UI Historic", system-ui, sans-serif',
                fontSize: '0.85em',
                overflow: 'visible',
                opacity: isLatin ? 0 : 1,
                transform: isLatin
                  ? 'translateY(-8px) scale(0.75)'
                  : 'translateY(0px) scale(1)',
                filter: isLatin ? 'blur(6px)' : 'blur(0px)',
                transitionProperty: 'opacity, transform, filter',
                transitionDuration: '1100ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${delayMs}ms`,
                willChange: 'opacity, transform, filter',
              }}
            >
              {item.baybayin}
            </span>

            {/* Layer 2: Latin Glyph */}
            <span
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none font-light"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '1em',
                overflow: 'visible',
                opacity: isLatin ? 1 : 0,
                transform: isLatin
                  ? 'translateY(0px) scale(1)'
                  : 'translateY(8px) scale(0.75)',
                filter: isLatin ? 'blur(0px)' : 'blur(6px)',
                transitionProperty: 'opacity, transform, filter',
                transitionDuration: '1100ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${delayMs}ms`,
                willChange: 'opacity, transform, filter',
              }}
            >
              {item.latin}
            </span>
          </span>
        )
      })}
      {/* Trailing Period naturally follows the animated slots without clipping */}
      <span className="inline-block font-light">.</span>
    </span>
  )
}
