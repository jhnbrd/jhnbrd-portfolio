import React from 'react'
import { motion } from 'framer-motion'

export default function EditorialHero({ personal }) {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 overflow-hidden select-none">
      {/* 
        Architectural wireframe structure matching Screenshot 1:
        Subtle central vertical guide line, flanked vertical framing lines,
        and delicate angled chevron perspective lines converging at the center.
      */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Center vertical axis line */}
        <div className="w-[1px] h-full bg-white/[0.04]" />
        
        {/* Flanked vertical guide lines */}
        <div className="absolute left-1/4 w-[1px] h-full bg-white/[0.02] hidden md:block" />
        <div className="absolute right-1/4 w-[1px] h-full bg-white/[0.02] hidden md:block" />

        {/* Central perspective wireframe box / chevron lines from screenshot */}
        <svg 
          className="absolute w-full max-w-4xl h-full opacity-40" 
          viewBox="0 0 1000 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Vertical central corridor */}
          <line x1="380" y1="0" x2="380" y2="800" stroke="white" strokeWidth="0.75" strokeOpacity="0.08" />
          <line x1="500" y1="0" x2="500" y2="800" stroke="white" strokeWidth="0.75" strokeOpacity="0.12" />
          <line x1="620" y1="0" x2="620" y2="800" stroke="white" strokeWidth="0.75" strokeOpacity="0.08" />

          {/* Perspective chevron lines below text */}
          <path d="M380 540 L500 630 L620 540" stroke="white" strokeWidth="0.75" strokeOpacity="0.25" />
          <path d="M440 600 L500 645 L560 600" stroke="white" strokeWidth="0.75" strokeOpacity="0.15" />
        </svg>
      </div>

      {/* Hero Content with Smooth Entrance Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pt-8"
      >
        {/* Headline exact typographic scale & font from screenshot 1 */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.08] text-white">
          Turning ideas into{' '}
          <span className="creative-gradient font-bold tracking-tight">creative</span>{' '}
          solutions.
        </h1>

        {/* Subtle sub-headline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="mt-6 text-sm sm:text-base md:text-lg text-neutral-400 font-light max-w-md mx-auto leading-relaxed"
        >
          Backend architect &amp; developer crafting resilient systems and unique digital experiences.
        </motion.p>
      </motion.div>

      {/* Delicate scroll down indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  )
}
