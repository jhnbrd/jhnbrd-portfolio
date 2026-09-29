import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import BaybayinScrambleText from './BaybayinScrambleText'
import InteractiveCodeField from './InteractiveCodeField'

function TechnicalFrame() {
  return (
    <div className="hero-tech" aria-hidden="true">
      <div className="hero-grid" />
      <i className="hero-rule" />
      <i className="hero-beam hero-beam-one" />
      <i className="hero-beam hero-beam-two" />
      <i className="hero-beam hero-beam-three" />
      <i className="hero-hatch hero-hatch-one" />
      <i className="hero-hatch hero-hatch-two" />
    </div>
  )
}

export default function EditorialHero() {
  const reduceMotion = useReducedMotion()
  const scrollToWork = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section className="hero-cinematic">
      <div className="hero-glow" aria-hidden="true" />
      <TechnicalFrame />

      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="hero-portrait"
        aria-hidden="true"
      >
        <div className="hero-aura" />
        <img src="/images/avatar-hero.png" alt="" draggable="false" />
      </motion.div>

      <div className="hero-side-fade" aria-hidden="true" />
      <div className="hero-floor-fade" aria-hidden="true" />

      <InteractiveCodeField />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hero-copy"
      >
        <BaybayinScrambleText />
        <p className="hero-subtitle">
          Backend architect building scalable APIs, cloud infrastructure, and zero-trust platforms from Davao City.
        </p>
        <button type="button" onClick={scrollToWork} className="hero-explore" aria-label="Scroll to explore the portfolio">
          <i className="hero-scroll-stem" aria-hidden="true" />
          <span className="hero-double-chevron" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </motion.div>

      <div className="hero-location" aria-hidden="true"><i />Davao City · PH</div>
      <div className="hero-coordinates" aria-hidden="true">07°04′N · 125°36′E</div>
    </section>
  )
}
