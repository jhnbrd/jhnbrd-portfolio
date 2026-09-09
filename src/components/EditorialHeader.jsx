import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Github, ExternalLink, Mail, Linkedin } from 'lucide-react'

export default function EditorialHeader({ onOpenFreedomWall }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-none">
        {/* Left mark: exact "bb" minimal style (here "jb" for Jhianne Berida) */}
        <a 
          href="#" 
          className="pointer-events-auto text-white text-2xl font-bold tracking-tighter hover:opacity-75 transition-opacity select-none font-sans"
        >
          jb
        </a>

        {/* Right action: exact "menu ＝" minimal style */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="pointer-events-auto flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium tracking-tight group transition-all select-none"
          aria-label="Toggle Menu"
        >
          <span className="text-xs uppercase tracking-wider font-sans font-normal opacity-80 group-hover:opacity-100">menu</span>
          <div className="flex flex-col gap-1 w-4">
            <span className="h-[1.5px] w-full bg-white transition-all group-hover:w-3 ml-auto" />
            <span className="h-[1.5px] w-full bg-white transition-all" />
          </div>
        </button>
      </header>

      {/* Fullscreen Minimalist Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col justify-between p-8 sm:p-16"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold font-sans tracking-tighter">jb</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-neutral-400 hover:text-white text-xs uppercase tracking-widest font-mono"
              >
                <span>Close</span>
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 my-auto max-w-2xl">
              {[
                { label: 'Overview', href: '#' },
                { label: 'About & Manifesto', href: '#about' },
                { label: 'Selected Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-baseline gap-6 text-4xl sm:text-6xl font-bold tracking-tight text-neutral-400 hover:text-white transition-colors"
                >
                  <span className="text-xs font-mono text-neutral-600 group-hover:text-accent-mint">
                    0{idx + 1}
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}

              <div className="pt-8">
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    onOpenFreedomWall()
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-accent-neon animate-pulse" />
                  <span>Open Live Freedom Wall</span>
                </button>
              </div>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-neutral-900 text-xs text-neutral-500 font-mono gap-4">
              <span>JHIANNE JOSE BERIDA · DAVAO CITY, PH</span>
              <div className="flex gap-6">
                <a href="https://github.com/jhnbrd" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
                <a href="https://linkedin.com/in/jhianneberida" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
                <a href="mailto:dev@jhnbrd.com" className="hover:text-white">Email</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
