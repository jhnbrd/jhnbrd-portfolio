import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function DevJunctionSection({ personal }) {
  const { isDark } = useTheme()
  const [isLogoHovered, setIsLogoHovered] = useState(false)

  const handleContactClick = (e) => {
    e.preventDefault()
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Smooth, relaxed scroll reveal transitions (1.8s duration matching Editorial theme)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section
      id="devjunction"
      className={`relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-center py-20 sm:py-32 overflow-hidden transition-colors duration-700 ${
        isDark
          ? 'bg-neutral-950 text-white border-b border-neutral-800'
          : 'bg-white text-black border-b border-neutral-200'
      }`}
    >
      {/* Subtle radial bloom behind center mark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full blur-3xl pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(29, 100, 242, 0.4) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-12 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-18% 0px -18% 0px', amount: 0.3 }}
          className="w-full flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* Prominent Large Logo with tactile hover dynamics */}
          <motion.div variants={itemVariants} className="relative group/logo">
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div 
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-3xl bg-white p-4 sm:p-5 border border-neutral-200/90 shadow-[0_12px_45px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-1"
              >
                <img
                  src="/images/devjunction.png"
                  alt="DevJunction Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Glowing aura around emblem on hover */}
              <div
                className={`absolute -inset-4 bg-gradient-to-r from-[#1D64F2] via-[#38BDF8] to-[#1D64F2] rounded-full blur-2xl pointer-events-none -z-10 transition-opacity duration-500 ${
                  isLogoHovered ? 'opacity-40' : 'opacity-15'
                }`}
              />
            </div>
          </motion.div>

          {/* Minimal Meta Indicator */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider uppercase border transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D64F2] animate-pulse" />
            <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
              Backend Developer · 2026
            </span>
          </motion.div>

          {/* Grand Typographic Title matching DevJunction brand identity font */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-[-0.04em] leading-none select-none font-devjunction">
              <span className="text-[#1D64F2]">Dev</span><span className={isDark ? 'text-white' : 'text-[#060b16]'}>Junction</span>
            </h2>
            <div className={`text-[11px] sm:text-xs tracking-[0.25em] uppercase font-devjunction font-light pt-1 ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              Software Solutions, Inc.
            </div>
          </motion.div>

          {/* Single Clean Manifesto Statement */}
          <motion.p
            variants={itemVariants}
            className={`text-base sm:text-xl font-light max-w-xl mx-auto leading-relaxed tracking-tight ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            High-performance backend systems, REST APIs, and automated cloud staging.
          </motion.p>

          {/* Clean High-Contrast Action Pill Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href={personal.devjunctionUrl || 'https://facebook.com/DevJunctionInc'}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-md group/btn ${
                isDark
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
              aria-label="Visit DevJunction Page"
            >
              <span>Visit DevJunction</span>
              <ArrowUpRight size={14} className="shrink-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={handleContactClick}
              className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono transition-all duration-300 transform hover:-translate-y-0.5 border ${
                isDark
                  ? 'border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 bg-neutral-900/50 hover:bg-neutral-900'
                  : 'border-neutral-300 text-neutral-700 hover:text-black hover:border-neutral-500 bg-white hover:bg-neutral-50'
              }`}
            >
              <span>Inquire for Project</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
