import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function EditorialBio({ personal }) {
  const { isDark } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 45 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section 
      id="about" 
      className={`w-full min-h-screen flex flex-col justify-center py-28 sm:py-40 transition-colors duration-500 ${
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
          {/* Top Manifesto Statement */}
          <motion.div
            variants={itemVariants}
            className="mb-20 sm:mb-28"
          >
            <h2 className={`text-3xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tight leading-[1.18] max-w-4xl ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              I believe in an engineering-first, user-centered approach, ensuring that every system I build is tailored to meet the specific operational needs of its users.
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16">
            {/* Left Column: Greeting & Pill Button */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-5 flex flex-col justify-between items-start space-y-8"
            >
              <h3 className={`text-4xl sm:text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                Hi, I'm Jhianne.
              </h3>

              <a
                href={`mailto:${personal.email}`}
                className={`inline-flex items-center gap-2.5 font-medium text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm ${
                  isDark 
                    ? 'bg-white hover:bg-neutral-200 text-black' 
                    : 'bg-black hover:bg-neutral-800 text-white'
                }`}
              >
                <ArrowUpRight size={15} />
                <span>Get in Touch</span>
              </a>
            </motion.div>

            {/* Right Column: Narrative */}
            <motion.div 
              variants={itemVariants}
              className={`md:col-span-7 space-y-6 text-sm sm:text-[0.95rem] font-light leading-relaxed ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              <p>
                I'm a backend developer and systems architect dedicated to turning complex architectures into resilient solutions. I specialize in building high-throughput APIs, cloud systems, and scalable database schemas.
              </p>
              <p>
                I'm involved in every step of the process: from schema discovery and system design to implementation, automated testing, and multi-machine staging. I focus on delivering high-quality, scalable results that drive reliable operations.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
