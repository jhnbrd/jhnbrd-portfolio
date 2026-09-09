import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

/**
 * Calculates current age dynamically from epoch timestamp without exposing birthdate string
 */
function useDynamicAge() {
  return useMemo(() => {
    // Epoch timestamp for March 18, 2004 UTC (1079568000000 ms)
    const epochDelta = Date.now() - 1079568000000
    const avgYearMs = 365.2425 * 24 * 60 * 60 * 1000
    return Math.floor(epochDelta / avgYearMs)
  }, [])
}

export default function EditorialBio({ personal }) {
  const { isDark } = useTheme()
  const age = useDynamicAge()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section 
      id="about" 
      className={`w-full min-h-screen flex flex-col justify-center py-28 sm:py-40 transition-colors duration-700 ${
        isDark 
          ? 'bg-neutral-950 text-white border-b border-neutral-800' 
          : 'bg-white text-black border-b border-[#e5e7eb]'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="w-full flex flex-col"
        >
          {/* Top Unique Manifesto Statement */}
          <motion.div
            variants={itemVariants}
            className="mb-20 sm:mb-28"
          >
            <h2 className={`text-3xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tight leading-[1.18] max-w-4xl ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              I engineer backend architectures where resilience, performance, and simplicity converge to solve real operational challenges.
            </h2>
          </motion.div>

          {/* Hairline Divider & "This is me." Label */}
          <motion.div 
            variants={itemVariants}
            className={`w-full pt-4 mb-12 ${isDark ? 'border-t border-neutral-800' : 'border-t border-neutral-200'}`}
          >
            <span className={`text-xs italic font-serif ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              This is me.
            </span>
          </motion.div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-start">
            {/* Left Column: Greeting & Pill Button */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-5 flex flex-col justify-between items-start space-y-8"
            >
              <div>
                <h3 className={`text-4xl sm:text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                  Hi, I'm Jhianne.
                </h3>
                <p className={`mt-2 font-mono text-xs tracking-wider uppercase ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  Davao City, Philippines
                </p>
              </div>

              <a
                href={`mailto:${personal.email}`}
                className={`inline-flex items-center gap-2.5 font-medium text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm ${
                  isDark 
                    ? 'bg-white hover:bg-neutral-200 text-black' 
                    : 'bg-black hover:bg-neutral-800 text-white'
                }`}
              >
                <ArrowUpRight size={15} />
                <span>Get in Touch</span>
              </a>
            </motion.div>

            {/* Right Column: Single Concise, High-Impact Narrative */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-7 pt-1"
            >
              <p className={`text-base sm:text-lg font-light leading-relaxed ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                I'm a {age}-year-old backend developer and systems architect based in Davao City, Philippines. At DevJunction, I specialize in engineering high-throughput REST APIs, resilient database architectures, and automated cloud staging environments built to power mission-critical software operations.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
