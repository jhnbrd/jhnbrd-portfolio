import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function FloatingFreedomWallButton({ onClick, isOpen, onSectionVisibilityChange }) {
  const [isVisible, setIsVisible] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    const contactSection = document.getElementById('contact')
    if (!contactSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        onSectionVisibilityChange?.(entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '-30% 0px -35% 0px' }
    )

    observer.observe(contactSection)
    return () => observer.disconnect()
  }, [onSectionVisibilityChange])

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
          className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 z-[60] pointer-events-auto"
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
            className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md border transition-all duration-300 select-none cursor-pointer ${
              isDark
                ? 'bg-[#1683ff] text-white border-white/10 hover:bg-[#0878ed] hover:shadow-[0_12px_36px_rgba(22,131,255,0.3)]'
                : 'bg-[#1683ff] text-white border-[#1683ff] hover:bg-[#0878ed] hover:shadow-[0_12px_36px_rgba(22,131,255,0.28)]'
            }`}
            aria-label={isOpen ? 'Close live chat' : 'Open live chat'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={21} /> : <MessageCircle size={23} fill="currentColor" />}
            {!isOpen && (
              <span className="absolute top-0.5 right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" aria-hidden="true" />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
