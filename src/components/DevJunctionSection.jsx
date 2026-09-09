import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Server, Database, Cloud } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function DevJunctionSection({ personal }) {
  const { isDark } = useTheme()
  const [logoHovered, setLogoHovered] = useState(false)

  const handleContactClick = (e) => {
    e.preventDefault()
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Smooth, relaxed scroll reveal transitions (1.8s duration)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const pillars = [
    { icon: Server, label: 'Scalable APIs' },
    { icon: Database, label: 'Database Architecture' },
    { icon: Cloud, label: 'Cloud Staging' },
  ]

  return (
    <section
      id="devjunction"
      className={`relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center py-20 sm:py-32 overflow-hidden transition-colors duration-700 ${
        isDark
          ? 'bg-[#060b16] text-white border-b border-[#1D64F2]/15'
          : 'bg-[#f7f9fd] text-black border-b border-[#1D64F2]/10'
      }`}
    >
      {/* DevJunction Static Ambient Glows (Zero CPU/GPU overhead) */}
      <div
        className="absolute top-1/4 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(29, 100, 242, 0.45) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-20 w-64 sm:w-80 h-64 sm:h-80 rounded-full blur-3xl pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(29, 100, 242, 0.3) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-12 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px', amount: 0.3 }}
          className="w-full flex flex-col space-y-8 sm:space-y-12"
        >
          {/* Spotlight Tag */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs uppercase tracking-widest">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider bg-[#1D64F2]/10 text-[#1D64F2] border border-[#1D64F2]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D64F2] animate-pulse" aria-hidden="true" />
              Featured Tech Venture
            </span>
            <span className={`text-[11px] sm:text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Startup · Established 2026
            </span>
          </motion.div>

          {/* DevJunction Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
            {/* Left Column: Brand Mark & Identity */}
            <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col items-start space-y-6">
              {/* Logo Badge */}
              <div 
                className="relative group/logo cursor-pointer"
                onMouseEnter={() => setLogoHovered(true)}
                onMouseLeave={() => setLogoHovered(false)}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-3 border border-[#1D64F2]/30 shadow-[0_0_30px_rgba(29,100,242,0.2)] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover/logo:shadow-[0_0_40px_rgba(29,100,242,0.35)] group-hover/logo:scale-105">
                  <img
                    src="/images/devjunction.png"
                    alt="DevJunction Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div 
                  className={`absolute -inset-2 bg-gradient-to-r from-[#1D64F2] via-[#38BDF8] to-[#1D64F2] rounded-3xl blur-lg pointer-events-none -z-10 transition-opacity duration-300 ${
                    logoHovered ? 'opacity-50' : 'opacity-20'
                  }`}
                />
              </div>

              {/* Title & Role */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08]">
                  Dev<span className="text-[#1D64F2]">Junction</span>
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm font-mono text-[#1D64F2] font-medium tracking-wide">
                  Backend Developer
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={personal.devjunctionUrl || 'https://facebook.com/DevJunctionInc'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-normal bg-[#1D64F2] hover:bg-[#1651c6] text-white transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(29,100,242,0.3)] hover:shadow-[0_0_30px_rgba(29,100,242,0.5)] whitespace-nowrap group/btn"
                  aria-label="Visit DevJunction Facebook Page"
                >
                  <span>Visit DevJunction</span>
                  <ArrowUpRight size={14} className="shrink-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={handleContactClick}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono transition-all duration-300 border whitespace-nowrap ${
                    isDark
                      ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-[#1D64F2]/50 hover:bg-[#1D64F2]/5'
                      : 'border-neutral-300 text-neutral-600 hover:text-black hover:border-[#1D64F2]/50 hover:bg-white'
                  }`}
                >
                  <span>Inquire for Project</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column: Mission & Core Capabilities */}
            <motion.div variants={itemVariants} className="md:col-span-7 flex flex-col space-y-6 pt-1">
              <p className={`text-base sm:text-lg md:text-xl font-light leading-relaxed ${
                isDark ? 'text-neutral-200' : 'text-neutral-800'
              }`}>
                A modern tech startup delivering high-performance backend infrastructure, custom web platforms, and client digital systems engineered for scalable business operations.
              </p>

              <p className={`text-xs sm:text-sm font-light leading-relaxed ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                DevJunction bridges startup development agility with enterprise systems reliability — overseeing full architectural lifecycles from database modeling and API contracts to automated staging and cloud deployments.
              </p>

              {/* Streamlined Capability Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2">
                {pillars.map((pill, idx) => {
                  const Icon = pill.icon
                  return (
                    <div
                      key={idx}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors border ${
                        isDark
                          ? 'bg-[#081226]/80 text-neutral-300 border-[#1D64F2]/20 hover:border-[#1D64F2]/50'
                          : 'bg-white text-neutral-800 border-[#1D64F2]/20 hover:border-[#1D64F2]/40 shadow-sm'
                      }`}
                    >
                      <Icon size={14} className="text-[#1D64F2]" />
                      <span>{pill.label}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
