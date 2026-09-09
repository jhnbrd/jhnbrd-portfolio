import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageSquare } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function FloatingFreedomWallButton({ onClick }) {
  const [isVisible, setIsVisible] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    const contactSection = document.getElementById('contact')
    if (!contactSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    observer.observe(contactSection)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 50, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30, rotate: 8 }}
          transition={{
            type: 'spring',
            stiffness: 450,
            damping: 22,
            mass: 0.6,
          }}
          className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40 pointer-events-auto"
        >
          {/* Cute subtle floating bounce */}
          <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md border transition-all duration-300 select-none cursor-pointer ${
              isDark
                ? 'bg-neutral-900/90 text-white border-neutral-700/70 hover:border-emerald-500/50 hover:shadow-[0_12px_36px_rgba(34,197,94,0.2)]'
                : 'bg-white/95 text-neutral-900 border-neutral-200/90 hover:border-emerald-500/50 hover:shadow-[0_12px_36px_rgba(34,197,94,0.18)]'
            }`}
            aria-label="Open Freedom Wall"
          >
            {/* Pulsing online green beacon */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            <span className="text-xs font-medium tracking-wide">
              Freedom Wall
            </span>

            <Sparkles size={13} className="text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
