import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Scroll-triggered reveal wrapper.
 * Sections fade + slide up into view when they enter the viewport.
 * `fullHeight` makes the section fill the viewport.
 */
export default function RevealSection({ children, className = '', fullHeight = false, id }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={`${fullHeight ? 'min-h-screen flex flex-col justify-center' : ''} ${className}`}
    >
      {children}
    </motion.section>
  )
}
