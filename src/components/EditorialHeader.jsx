import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function EditorialHeader({ onOpenFreedomWall }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false)
  const { isDark, toggle } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.85
      setIsScrolledPastHero(window.scrollY > heroHeight)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dynamic header color: white on hero, then adapts to theme on white/dark sections
  const headerTextColor = !isScrolledPastHero
    ? 'text-white'
    : isDark ? 'text-white' : 'text-black'

  const barColor = !isScrolledPastHero
    ? 'bg-white'
    : isDark ? 'bg-white' : 'bg-black'

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-5 sm:px-12 md:px-16 py-5 sm:py-8 flex items-center justify-between pointer-events-none transition-colors duration-300">
        {/* Left mark */}
        <a 
          href="#" 
          className={`pointer-events-auto text-2xl font-bold tracking-tighter hover:opacity-75 transition-colors duration-300 select-none font-sans ${headerTextColor}`}
        >
          jb
        </a>

        {/* Right actions */}
        <div className="flex items-center gap-4 sm:gap-5 pointer-events-auto">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 hover:opacity-75 ${headerTextColor}`}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Menu toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`w-8 h-8 rounded-full flex items-center justify-center group transition-colors duration-300 select-none hover:opacity-75 ${headerTextColor}`}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1 w-4">
              <span className={`h-[1.5px] w-full transition-all group-hover:w-3 ml-auto ${barColor}`} />
              <span className={`h-[1.5px] w-full transition-all ${barColor}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Right Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 38 }}
              className={`fixed top-0 right-0 h-full w-full sm:w-[480px] md:w-[540px] z-50 p-6 sm:p-12 md:p-14 flex flex-col justify-between shadow-2xl transition-colors duration-500 overflow-y-auto ${
                isDark ? 'bg-neutral-950 text-white' : 'bg-white text-black'
              }`}
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                    isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
                  }`}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col-reverse sm:grid sm:grid-cols-12 gap-8 my-auto pt-6">
                {/* Social links */}
                <div className="sm:col-span-5 space-y-3 sm:space-y-4 font-sans">
                  <div className={`text-xs font-mono uppercase tracking-widest mb-4 sm:mb-6 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Social
                  </div>
                  <div className={`flex flex-col space-y-2.5 sm:space-y-3 text-sm sm:text-base ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <a href="https://linkedin.com/in/jhianneberida" target="_blank" rel="noreferrer" className={`${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors py-0.5`}>LinkedIn</a>
                    <a href="https://facebook.com/yanjisama" target="_blank" rel="noreferrer" className={`${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors py-0.5`}>Facebook</a>
                    <a href="https://github.com/jhnbrd" target="_blank" rel="noreferrer" className={`${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors py-0.5`}>GitHub</a>
                  </div>
                </div>

                {/* Sections navigation */}
                <div className="sm:col-span-7 space-y-4 sm:space-y-6">
                  <div className={`text-xs font-mono uppercase tracking-widest mb-4 sm:mb-6 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Menu
                  </div>
                  <nav className="flex flex-col space-y-3 sm:space-y-4">
                    {[
                      { label: 'About Me', href: '#about' },
                      { label: 'DevJunction', href: '#devjunction' },
                      { label: 'Projects', href: '#projects' },
                      { label: 'Contact', href: '#contact' },
                    ].map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-2xl sm:text-4xl font-medium tracking-tight transition-colors py-1 ${
                          isDark ? 'text-white hover:text-neutral-400' : 'text-neutral-900 hover:text-neutral-500'
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>

              <div className={`pt-6 sm:pt-8 flex items-center justify-between text-xs font-sans ${
                isDark ? 'border-t border-neutral-800' : 'border-t border-neutral-100'
              }`}>
                <div>
                  <span className={`block ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Get in touch</span>
                  <a href="mailto:dev@jhnbrd.com" className={`font-medium hover:underline ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    dev@jhnbrd.com
                  </a>
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    onOpenFreedomWall()
                  }}
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-mono transition-colors ${
                    isDark 
                      ? 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white' 
                      : 'border-neutral-200 text-neutral-700 hover:border-black'
                  }`}
                >
                  Live Wall
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
