import React, { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

/**
 * Interactive particle constellation that follows the cursor.
 * Nodes drift organically and form glowing connections when near each other or the cursor.
 */
function ParticleField() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef([])
  const rafRef = useRef(null)

  const PARTICLE_COUNT = 60
  const CONNECTION_DIST = 140
  const MOUSE_DIST = 180

  const initParticles = useCallback((w, h) => {
    const particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
      })
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      particlesRef.current = initParticles(canvas.offsetWidth, canvas.offsetHeight)
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      // Only track if within or near the hero viewport
      if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      } else {
        mouseRef.current = { x: -1000, y: -1000 }
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Gentle drift
        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        // Cursor attraction
        const dxM = mouse.x - p.x
        const dyM = mouse.y - p.y
        const distM = Math.sqrt(dxM * dxM + dyM * dyM)
        if (distM < MOUSE_DIST && distM > 0) {
          const force = (MOUSE_DIST - distM) / MOUSE_DIST * 0.015
          p.vx += dxM / distM * force
          p.vy += dyM / distM * force
        }

        // Dampen velocity
        p.vx *= 0.995
        p.vy *= 0.995

        // Draw particle
        const alpha = distM < MOUSE_DIST ? 0.9 : 0.35
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`
        ctx.fill()

        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(34, 197, 94, ${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Draw connection to cursor
        if (distM < MOUSE_DIST) {
          const lineAlpha = (1 - distM / MOUSE_DIST) * 0.3
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(34, 197, 94, ${lineAlpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default function EditorialHero() {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 overflow-hidden select-none">
      {/* Interactive Particle Constellation Background */}
      <ParticleField />

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

      {/* Hero Content with smooth entry & scroll awareness */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pt-8"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.08] text-white">
          Engineering{' '}
          <span className="creative-gradient font-bold tracking-tight">resilient</span>{' '}
          systems.
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 text-sm sm:text-base md:text-lg text-neutral-400 font-light max-w-lg mx-auto leading-relaxed"
        >
          Backend architect building scalable APIs, cloud infrastructure, and zero-trust platforms from Davao City.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 via-white/10 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
