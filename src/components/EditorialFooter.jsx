import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, MessageCircle } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function EditorialFooter({ personal }) {
  const { isDark } = useTheme()

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
    hidden: { opacity: 0, y: 45 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <footer 
      id="contact" 
      className={`relative w-full min-h-screen flex flex-col justify-between pt-32 pb-10 sm:pb-12 px-6 sm:px-12 overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-neutral-950 text-white' : 'bg-white text-black'
      }`}
    >
      {/* Ambient pastel or neon glow */}
      {!isDark && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background: 'radial-gradient(circle at 50% 70%, rgba(219, 234, 254, 0.7) 0%, rgba(243, 232, 255, 0.45) 45%, #ffffff 80%)'
          }}
        />
      )}
      {isDark && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 70%, rgba(34, 197, 94, 0.08) 0%, rgba(56, 189, 248, 0.05) 45%, transparent 80%)'
          }}
        />
      )}

      {/* Top balance anchor */}
      <div className="hidden sm:block h-4" />

      {/* Center Collaboration CTA Area - triggers when centered on screen */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-18% 0px -18% 0px', amount: 0.35 }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center my-auto py-12 w-full"
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

        {/* Action CTAs: Email, LinkedIn, Facebook Messenger */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
        >
          <a
            href={`mailto:${personal.email}`}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 border transform hover:-translate-y-0.5 ${
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
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 border transform hover:-translate-y-0.5 ${
              isDark 
                ? 'bg-transparent hover:bg-neutral-800 text-white border-neutral-700 shadow-sm' 
                : 'bg-transparent hover:bg-neutral-100 text-black border-neutral-300 shadow-sm'
            }`}
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://m.me/yanjisama"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 border transform hover:-translate-y-0.5 ${
              isDark 
                ? 'bg-transparent hover:bg-[#1877F2]/15 text-white border-neutral-700 hover:border-[#1877F2]/50 shadow-sm' 
                : 'bg-transparent hover:bg-[#1877F2]/10 text-black border-neutral-300 hover:border-[#1877F2]/50 shadow-sm'
            }`}
          >
            <MessageCircle size={14} className="text-[#1877F2]" />
            <span>Facebook Message</span>
          </a>
        </motion.div>
      </motion.div>

      {/* True Bottom Pinned Footer Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: '-10% 0px 0px 0px', amount: 0.2 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className={`relative z-10 w-full max-w-5xl mx-auto pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans ${
          isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-600'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`text-base font-bold tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>jb</span>
          <span className="opacity-40">·</span>
          <span className="font-medium">Jhianne Berida</span>
          <span className="opacity-40">·</span>
          <span className="opacity-75">Davao City, Philippines</span>
        </div>

        <p className={`text-[11px] text-center sm:text-right ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
          © {new Date().getFullYear()} Jhianne Berida. All rights reserved.
        </p>
      </motion.div>
    </footer>
  )
}
