import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Zap } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function DevJunctionSection({ personal }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { isDark } = useTheme()

  return (
    <section
      ref={ref}
      id="devjunction"
      className={`w-full min-h-screen flex flex-col justify-center py-28 sm:py-36 transition-colors duration-500 ${
        isDark
          ? 'bg-[#0a0c0e] text-white border-b border-neutral-800'
          : 'bg-[#fafafa] text-black border-b border-neutral-200'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        {/* Monospace index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-12 ${
            isDark ? 'text-neutral-500' : 'text-neutral-400'
          }`}
        >
          <Zap size={13} className="text-accent-neon" />
          <span>Startup Spotlight</span>
        </motion.div>

        {/* DevJunction Feature */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column: Brand & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex flex-col items-start justify-center space-y-8"
          >
            <div>
              <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Dev
                <span className="creative-gradient">Junction</span>
              </h2>
              <p className={`mt-2 font-mono text-xs tracking-wider uppercase ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                Co-Founded · 2026
              </p>
            </div>

            <a
              href={personal.devjunctionUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2.5 font-medium text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm ${
                isDark
                  ? 'bg-white hover:bg-neutral-200 text-black'
                  : 'bg-black hover:bg-neutral-800 text-white'
              }`}
            >
              <span>Visit DevJunction</span>
              <ArrowUpRight size={15} />
            </a>
          </motion.div>

          {/* Right column: Short description */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 flex flex-col justify-center space-y-6"
          >
            <p className={`text-lg sm:text-xl font-medium leading-relaxed ${
              isDark ? 'text-neutral-200' : 'text-neutral-800'
            }`}>
              A startup software development studio delivering enterprise-grade web platforms, backend API systems, and cloud deployment solutions for businesses across the Philippines.
            </p>
            <p className={`text-sm sm:text-[0.95rem] font-light leading-relaxed ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              From full-stack SaaS builds to database design and multi-server staging, DevJunction bridges the gap between startup agility and enterprise reliability — handling everything from client discovery to production deployment.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Enterprise Web Apps', 'Cloud APIs', 'Database Architecture', 'Client Operations'].map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs font-mono px-3 py-1.5 rounded-full transition-colors ${
                    isDark
                      ? 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                      : 'bg-white border border-neutral-200 text-neutral-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
