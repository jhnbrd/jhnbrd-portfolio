import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function EditorialFooter({ personal }) {
  const { isDark } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
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
    <footer 
      id="contact" 
      className={`relative w-full min-h-screen flex flex-col justify-center py-28 sm:py-36 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-neutral-950 text-white' : 'bg-white text-black'
      }`}
    >
      {/* Ambient pastel glow */}
      {!isDark && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background: 'radial-gradient(circle at 50% 90%, rgba(219, 234, 254, 0.7) 0%, rgba(243, 232, 255, 0.45) 45%, #ffffff 80%)'
          }}
        />
      )}
      {isDark && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 90%, rgba(34, 197, 94, 0.08) 0%, rgba(56, 189, 248, 0.05) 45%, transparent 80%)'
          }}
        />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="w-full flex flex-col items-center"
        >
          <motion.p 
            variants={itemVariants}
            className={`text-sm font-sans mb-3 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}
          >
            Want to collaborate?
          </motion.p>

          <motion.h2 
            variants={itemVariants}
            className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-12 font-sans ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Let's have a chat!
          </motion.h2>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 mb-20"
          >
            <a
              href={`mailto:${personal.email}`}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all duration-200 border transform hover:-translate-y-0.5 ${
                isDark 
                  ? 'bg-transparent hover:bg-neutral-800 text-white border-neutral-700 shadow-sm' 
                  : 'bg-transparent hover:bg-neutral-100 text-black border-neutral-300 shadow-sm'
              }`}
            >
              <Mail size={14} />
              <span>Email</span>
            </a>

            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all duration-200 border transform hover:-translate-y-0.5 ${
                isDark 
                  ? 'bg-transparent hover:bg-neutral-800 text-white border-neutral-700 shadow-sm' 
                  : 'bg-transparent hover:bg-neutral-100 text-black border-neutral-300 shadow-sm'
              }`}
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4 text-xs font-sans">
            <div className="flex flex-col items-center">
              <span className={`text-xl font-bold tracking-tighter mb-1 ${isDark ? 'text-white' : 'text-black'}`}>jb</span>
              <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Jhianne Berida</span>
            </div>

            <p className={`max-w-md text-center text-[11px] leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              © Jhianne Berida {new Date().getFullYear()}. All rights reserved. Location: Davao City, Philippines.<br />
              This site showcases my personal projects and professional work.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
