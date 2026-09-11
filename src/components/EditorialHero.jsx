import React, { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import BaybayinScrambleText from './BaybayinScrambleText'

/**
 * Option D: Physics Repulsion Shards / Binary Particle Cloud
 * Monospace code glyphs and binary shards drift in the hero space.
 * When the cursor sweeps past, shards dynamically scatter away with spring physics
 * and organically oscillate back to their origin.
 */
function CodeRepulsionField() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const shardsRef = useRef([])
  const rafRef = useRef(null)

  const REPEL_RADIUS = 150
  const GLYPHS = ['0', '1', '{}', '[]', '//', '=>', ';', '&&', '()', '!=', '::', 'nil', '0x1']

  const initShards = useCallback((w, h) => {
    const isMobile = w < 640
    const shardCount = isMobile ? 32 : 65
    const shards = []
    for (let i = 0; i < shardCount; i++) {
      const originX = Math.random() * w
      const originY = Math.random() * h
      const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      const isAccent = Math.random() < 0.2
      const size = Math.floor(Math.random() * 4) + (isMobile ? 10 : 11)

      shards.push({
        x: originX,
        y: originY,
        originX,
        originY,
        vx: 0,
        vy: 0,
        glyph,
        size,
        isAccent,
        alpha: Math.random() * 0.3 + 0.15,
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.008 + 0.004,
      })
    }
    return shards
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      shardsRef.current = initShards(canvas.offsetWidth, canvas.offsetHeight)
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      } else {
        mouseRef.current = { x: -1000, y: -1000 }
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    let frame = 0
    const animate = () => {
      frame++
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const shards = shardsRef.current
      const mouse = mouseRef.current

      for (let i = 0; i < shards.length; i++) {
        const s = shards[i]

        // Gentle floating ambient drift
        s.driftPhase += s.driftSpeed
        const targetX = s.originX + Math.sin(s.driftPhase) * 12
        const targetY = s.originY + Math.cos(s.driftPhase * 0.8) * 12

        // Repulsion physics from cursor
        const dx = s.x - mouse.x
        const dy = s.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_RADIUS && dist > 0) {
          const repelForce = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * 3.2
          s.vx += (dx / dist) * repelForce
          s.vy += (dy / dist) * repelForce
        }

        // Hooke's spring force returning shard to target floating point
        const springK = 0.045
        s.vx += (targetX - s.x) * springK
        s.vy += (targetY - s.y) * springK

        // Damping / air resistance
        s.vx *= 0.91
        s.vy *= 0.91

        s.x += s.vx
        s.y += s.vy

        // Draw code shard
        ctx.font = `${s.size}px 'JetBrains Mono', monospace, monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // Highlight shards near cursor with energetic neon tone
        const proximityBoost = dist < REPEL_RADIUS ? (1 - dist / REPEL_RADIUS) * 0.45 : 0
        const currentAlpha = Math.min(1, s.alpha + proximityBoost)

        if (s.isAccent || dist < REPEL_RADIUS) {
          ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`
        }

        ctx.fillText(s.glyph, s.x, s.y)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [initShards])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default function EditorialHero() {
  return (
    <section className="relative w-full min-h-screen min-h-[100dvh] bg-[#050505] text-white flex flex-col items-center justify-center px-5 sm:px-6 overflow-hidden select-none">
      {/* Option D: Physics Repulsion Shards / Binary Particle Cloud */}
      <CodeRepulsionField />

      {/* Architectural wireframe lines */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[1px] h-full bg-white/[0.04]" />
        <div className="absolute left-1/4 w-[1px] h-full bg-white/[0.02] hidden md:block" />
        <div className="absolute right-1/4 w-[1px] h-full bg-white/[0.02] hidden md:block" />

        <svg 
          className="absolute w-full max-w-4xl h-full opacity-30 pointer-events-none" 
          viewBox="0 0 1000 800" 
          fill="none"
        >
          <line x1="380" y1="0" x2="380" y2="800" stroke="white" strokeWidth="0.75" strokeOpacity="0.06" />
          <line x1="500" y1="0" x2="500" y2="800" stroke="white" strokeWidth="0.75" strokeOpacity="0.1" />
          <line x1="620" y1="0" x2="620" y2="800" stroke="white" strokeWidth="0.75" strokeOpacity="0.06" />
          <path d="M380 540 L500 630 L620 540" stroke="white" strokeWidth="0.75" strokeOpacity="0.2" />
          <path d="M440 600 L500 645 L560 600" stroke="white" strokeWidth="0.75" strokeOpacity="0.12" />
        </svg>
      </div>

      {/* Hero Content with relaxed pacing */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center pt-8"
      >
        <BaybayinScrambleText />

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.25, ease: 'easeOut' }}
          className="mt-5 sm:mt-6 text-xs sm:text-base md:text-lg text-neutral-400 font-light max-w-lg mx-auto leading-relaxed px-2"
        >
          Backend architect building scalable APIs, cloud infrastructure, and zero-trust platforms from Davao City.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      >
        <div className="w-[1px] h-7 sm:h-8 bg-gradient-to-b from-white/30 via-white/10 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
