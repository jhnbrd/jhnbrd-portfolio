import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
// import BaybayinScrambleText from './BaybayinScrambleText'
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
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    amount: 0.3,
    margin: '-20% 0px -20% 0px',
  })
  const isVisible = reduceMotion || isInView
  const scrollToWork = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section ref={sectionRef} className="hero-cinematic">
      <div className="hero-glow" aria-hidden="true" />
      <TechnicalFrame />

      <motion.h1
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.97 }}
        transition={{
          duration: reduceMotion ? 0 : 1.1,
          delay: isVisible && !reduceMotion ? 0.16 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="hero-name"
        aria-label="Jhianne Berida"
      >
        <span>Jhianne</span>
        <span>Berida</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 34, scale: 0.92, filter: 'blur(12px)' }}
        animate={isVisible
          ? {
              opacity: [0, 1, 1],
              y: [34, -3, 0],
              scale: [0.92, 1.028, 1],
              filter: ['blur(12px)', 'blur(0px)', 'blur(0px)'],
            }
          : { opacity: 0, y: 28, scale: 0.92, filter: 'blur(9px)' }}
        transition={isVisible
          ? {
              duration: reduceMotion ? 0 : 1.4,
              times: [0, 0.72, 1],
              ease: [0.16, 1, 0.3, 1],
            }
          : { duration: reduceMotion ? 0 : 0.85, ease: [0.4, 0, 0.2, 1], delay: 0 }}
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
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={isVisible
          ? { duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }
          : { duration: reduceMotion ? 0 : 0.75, delay: 0, ease: [0.4, 0, 0.2, 1] }}
        className="hero-copy"
      >
        {/* Temporarily hidden while the hero uses the name-led composition. */}
        {/* <BaybayinScrambleText /> */}
        {/* Temporarily hidden with the previous hero title. */}
        {/*
        <p className="hero-subtitle">
          Backend architect building scalable APIs, cloud infrastructure, and zero-trust platforms from Davao City.
        </p>
        */}
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
