import React, { useState, useEffect } from 'react'

/**
 * Baybayin Character Pool:
 * Unicode range U+1700–U+171F (Tagalog script).
 * Standalone letterforms provide distinct, authentic, 
 * clean glyphs without combining mark collisions.
 */
const WORDS = [
  { text: 'Engineering', isGradient: false },
  { text: 'Resilient', isGradient: true },
  { text: 'Systems', isGradient: false },
]

// Authentic native Baybayin character mapping for the 27 letter slots
// (Engineering: 11, Resilient: 9, Systems: 7)
const DEFAULT_BAYBAYIN = [
  // Engineering (11 chars)
  'ᜁ', 'ᜈ', 'ᜄ', 'ᜃ', 'ᜈ', 'ᜁ', 'ᜍ', 'ᜅ', 'ᜊ', 'ᜌ', 'ᜇ',
  // Resilient (9 chars)
  'ᜍ', 'ᜐ', 'ᜎ', 'ᜌ', 'ᜈ', 'ᜆ', 'ᜊ', 'ᜃ', 'ᜄ',
  // Systems (7 chars)
  'ᜐ', 'ᜆ', 'ᜋ', 'ᜐ', 'ᜃ', 'ᜎ', 'ᜈ',
]

// Flattened target Latin characters (27 letters)
const LATIN_TARGET = WORDS.flatMap((w) => w.text.split(''))

// Word start indices
const WORD_OFFSETS = [0, 11, 20]

// Proportional typographic widths for Latin characters (matches natural Inter metrics)
function getLatinWidth(char) {
  if ('ilI'.includes(char)) return '0.28em'
  if ('rtfj'.includes(char)) return '0.38em'
  if ('mwMW'.includes(char)) return '0.85em'
  if (char >= 'A' && char <= 'Z') return '0.64em'
  return '0.54em'
}

export default function BaybayinScrambleText() {
  // false = Baybayin state, true = Latin state
  const [isLatin, setIsLatin] = useState(false)

  // Initial load: Display native Baybayin for 500ms, then smoothly transition into Latin
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLatin(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <h1
      className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.18] sm:leading-[1.10] text-white cursor-pointer select-none text-center"
      onMouseEnter={() => setIsLatin(false)}
      onMouseLeave={() => setIsLatin(true)}
      aria-label="Engineering Resilient Systems"
      style={{
        fontFamily: 'Inter, "Noto Sans Tagalog", "Segoe UI Historic", system-ui, sans-serif',
      }}
    >
      {WORDS.map((wordObj, wIdx) => {
        const wordStartIndex = WORD_OFFSETS[wIdx]
        const wordLength = wordObj.text.length
        const wordChars = wordObj.text.split('')

        return (
          <React.Fragment key={wordObj.text}>
            {/* Semantic line break on medium/large viewports */}
            {wIdx === 1 && (
              <>
                <span className="inline md:hidden">&nbsp;</span>
                <br className="hidden md:inline" />
              </>
            )}
            {wIdx === 2 && <span>&nbsp;</span>}

            <span className="inline-block whitespace-nowrap">
              {wordChars.map((_, cIdx) => {
                const globalIdx = wordStartIndex + cIdx
                const baybayinChar = DEFAULT_BAYBAYIN[globalIdx]
                const latinChar = LATIN_TARGET[globalIdx]
                const isGradient = wordObj.isGradient

                // Gradient styling for "Resilient" (spans across all 9 letters)
                const gradientPos = (cIdx / Math.max(1, wordLength - 1)) * 100
                const gradientStyle = isGradient
                  ? {
                      background:
                        'linear-gradient(100deg, #ff4d4d 0%, #ff6b3d 45%, #ffd23f 100%)',
                      backgroundSize: `${wordLength * 100}% 100%`,
                      backgroundPosition: `${gradientPos}% 0%`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  : {}

                // Stagger timing calculation
                // Half speed: 110ms per letter (was 55ms)
                const delayMs = globalIdx * 110

                return (
                  <span
                    key={cIdx}
                    className="inline-block relative text-center"
                    style={{
                      width: isLatin ? getLatinWidth(latinChar) : '0.92em',
                      height: '1.22em',
                      margin: isLatin ? '0 0.01em' : '0 0.08em',
                      verticalAlign: 'baseline',
                      overflow: 'visible',
                      transition:
                        'width 1.3s cubic-bezier(0.16, 1, 0.3, 1), margin 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Layer 1: Native Baybayin Glyph */}
                    <span
                      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                      style={{
                        ...gradientStyle,
                        overflow: 'visible',
                        opacity: isLatin ? 0 : 1,
                        transform: isLatin
                          ? 'translateY(-12px) scale(0.70)'
                          : 'translateY(0px) scale(0.85)',
                        filter: isLatin ? 'blur(6px)' : 'blur(0px)',
                        transitionProperty: 'opacity, transform, filter',
                        transitionDuration: '1200ms',
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: `${delayMs}ms`,
                        willChange: 'opacity, transform, filter',
                      }}
                    >
                      {baybayinChar}
                    </span>

                    {/* Layer 2: Latin Glyph */}
                    <span
                      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                      style={{
                        ...gradientStyle,
                        overflow: 'visible',
                        opacity: isLatin ? 1 : 0,
                        transform: isLatin
                          ? 'translateY(0px) scale(1)'
                          : 'translateY(12px) scale(0.85)',
                        filter: isLatin ? 'blur(0px)' : 'blur(6px)',
                        transitionProperty: 'opacity, transform, filter',
                        transitionDuration: '1200ms',
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: `${delayMs}ms`,
                        willChange: 'opacity, transform, filter',
                      }}
                    >
                      {latinChar}
                    </span>
                  </span>
                )
              })}
            </span>
          </React.Fragment>
        )
      })}
    </h1>
  )
}
