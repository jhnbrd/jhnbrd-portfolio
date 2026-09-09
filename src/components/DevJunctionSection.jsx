import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Database, Cpu, ShieldCheck } from 'lucide-react'
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
        staggerChildren: 0.22,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const competencies = [
    {
      icon: Database,
      title: 'Scalable Backend & APIs',
      desc: 'High-concurrency REST endpoints, authentication protocols, and distributed services.',
    },
    {
      icon: Cpu,
      title: 'Systems & Database Architecture',
      desc: 'Optimized schema modeling, caching layers, and relational transaction integrity.',
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Client Solutions',
      desc: 'Production-grade staging, reverse proxy routing, and zero-trust security pipelines.',
    },
  ]

  return (
    <section
      id="devjunction"
      className={`relative w-full min-h-screen flex flex-col justify-center py-28 sm:py-36 overflow-hidden transition-colors duration-700 ${
        isDark
          ? 'bg-[#060b16] text-white border-b border-[#1D64F2]/15'
          : 'bg-[#f7f9fd] text-black border-b border-[#1D64F2]/10'
      }`}
    >
      {/* DevJunction Signature Brand Ambient Glows */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: isDark ? [0.15, 0.22, 0.15] : [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(29, 100, 242, 0.35) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(11, 27, 59, 0.35) 0%, rgba(29, 100, 242, 0.1) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(29, 100, 242, 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px', amount: 0.35 }}
          className="w-full flex flex-col space-y-12"
        >
          {/* Spotlight Tag */}
          <motion.div variants={itemVariants} className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-[#1D64F2]/10 text-[#1D64F2] border border-[#1D64F2]/25 shadow-[0_0_12px_rgba(29,100,242,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D64F2] animate-pulse" aria-hidden="true" />
              Featured Tech Venture
            </span>
            <span className={isDark ? 'text-neutral-500' : 'text-neutral-400'}>
              Startup · Established 2026
            </span>
          </motion.div>

          {/* DevJunction Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Logo & Brand Presence */}
            <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col items-start space-y-7">
              {/* Interactive DevJunction Logo Badge */}
              <motion.div 
                className="relative group/logo cursor-pointer"
                onMouseEnter={() => setLogoHovered(true)}
                onMouseLeave={() => setLogoHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-3.5 border border-[#1D64F2]/30 shadow-[0_0_36px_rgba(29,100,242,0.22)] flex items-center justify-center overflow-hidden transition-shadow duration-500 group-hover/logo:shadow-[0_0_50px_rgba(29,100,242,0.4)]">
                  <img
                    src="/images/devjunction.png"
                    alt="DevJunction Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <motion.div 
                  animate={{ opacity: logoHovered ? 0.6 : 0.25, scale: logoHovered ? 1.15 : 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-2 bg-gradient-to-r from-[#1D64F2] via-[#38BDF8] to-[#1D64F2] rounded-3xl blur-lg pointer-events-none -z-10" 
                />
              </motion.div>

              {/* Title & Role */}
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.05]">
                  Dev<span className="text-[#1D64F2]">Junction</span>
                </h2>
                <p className="mt-2 text-sm font-mono text-[#1D64F2] font-medium tracking-wide">
                  Backend Developer
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={personal.devjunctionUrl || 'https://facebook.com/DevJunctionInc'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-[#1D64F2] hover:bg-[#1651c6] text-white transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_24px_rgba(29,100,242,0.35)] hover:shadow-[0_0_36px_rgba(29,100,242,0.55)] group/btn"
                  aria-label="Visit DevJunction Facebook Page"
                >
                  <span>Visit DevJunction</span>
                  <ArrowUpRight size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={handleContactClick}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-mono transition-all duration-300 border ${
                    isDark
                      ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-[#1D64F2]/50 hover:bg-[#1D64F2]/5'
                      : 'border-neutral-300 text-neutral-600 hover:text-black hover:border-[#1D64F2]/50 hover:bg-white'
                  }`}
                >
                  <span>Inquire for Project</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column: Mission Narrative & Interactive Competency Tiles */}
            <motion.div variants={itemVariants} className="md:col-span-7 flex flex-col space-y-6 pt-2">
              <p className={`text-lg sm:text-xl font-medium leading-relaxed ${
                isDark ? 'text-neutral-100' : 'text-neutral-900'
              }`}>
                A modern tech startup delivering high-performance web platforms, custom backend infrastructures, and client digital systems tailored for scalable business operations.
              </p>

              <p className={`text-sm sm:text-[0.95rem] font-light leading-relaxed ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                From full-stack SaaS builds to database architecture and multi-server staging environments, DevJunction bridges the gap between startup speed and enterprise reliability — handling everything from technical discovery to production deployment.
              </p>

              {/* Interactive Competency Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                {competencies.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                      className={`group/card p-4 rounded-xl border transition-all duration-300 cursor-default ${
                        isDark
                          ? 'bg-[#081226]/60 hover:bg-[#0b1a38] border-[#1D64F2]/20 hover:border-[#1D64F2]/60 hover:shadow-[0_8px_24px_rgba(29,100,242,0.18)]'
                          : 'bg-white hover:bg-[#f0f5ff] border-[#1D64F2]/15 hover:border-[#1D64F2]/50 hover:shadow-[0_8px_20px_rgba(29,100,242,0.12)]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#1D64F2]/10 border border-[#1D64F2]/25 flex items-center justify-center mb-2.5 transition-colors group-hover/card:bg-[#1D64F2] group-hover/card:text-white">
                        <Icon size={16} className="text-[#1D64F2] group-hover/card:text-white transition-colors" />
                      </div>
                      <h4 className={`text-xs font-semibold tracking-tight mb-1 transition-colors ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {item.title}
                      </h4>
                      <p className={`text-[11px] leading-snug ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {item.desc}
                      </p>
                    </motion.div>
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
