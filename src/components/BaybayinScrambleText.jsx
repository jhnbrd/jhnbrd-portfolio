import { useEffect, useState } from 'react'

const BAYBAYIN = {
  engineering: '\u1701\u1708\u1704\u1703\u1708\u1701\u170d\u1705\u170a\u170c\u1707',
  resilient: '\u170d\u1710\u170e\u170c\u1708\u1706\u170a\u1703\u1704',
  systems: '\u1710\u1706\u170b\u1710\u1703\u170e\u1708',
}

function Glyphs({ text, offset = 0 }) {
  return [...text].map((glyph, index) => (
    <span
      className="hero-title-glyph"
      style={{ '--glyph-index': offset + index }}
      key={`${glyph}-${index}`}
    >
      {glyph}
    </span>
  ))
}

export default function BaybayinScrambleText() {
  const [isLatin, setIsLatin] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLatin(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  const showBaybayin = () => {
    if (window.matchMedia('(hover: hover)').matches) setIsLatin(false)
  }
  const showLatin = () => {
    if (window.matchMedia('(hover: hover)').matches) setIsLatin(true)
  }
  const toggle = () => setIsLatin((current) => !current)

  return (
    <h1
      className={`hero-title ${isLatin ? 'is-latin' : 'is-baybayin'}`}
      onMouseEnter={showBaybayin}
      onMouseLeave={showLatin}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          toggle()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Engineering Resilient Systems. Toggle Baybayin translation."
      title="Tap or hover to toggle Baybayin and English"
    >
      <span className="hero-title-layer hero-title-latin" aria-hidden={!isLatin}>
        <span><Glyphs text="Engineering" /></span>
        <span>
          <strong><Glyphs text="Resilient" offset={11} /></strong>
          <i aria-hidden="true" />
          <Glyphs text="Systems" offset={20} />
        </span>
      </span>
      <span className="hero-title-layer hero-title-baybayin" aria-hidden={isLatin}>
        <span><Glyphs text={BAYBAYIN.engineering} /></span>
        <span>
          <strong><Glyphs text={BAYBAYIN.resilient} offset={11} /></strong>
          <i aria-hidden="true" />
          <Glyphs text={BAYBAYIN.systems} offset={20} />
        </span>
      </span>
    </h1>
  )
}
