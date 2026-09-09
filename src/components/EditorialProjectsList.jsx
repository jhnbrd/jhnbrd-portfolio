import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

export default function EditorialProjectsList({ projects, onSelectProject }) {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const { isDark } = useTheme()

  const displayProjects = projects.slice(0, 4)

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section 
      ref={ref}
      id="projects" 
      className={`relative w-full py-28 sm:py-36 transition-colors duration-500 ${
        isDark ? 'bg-neutral-950 text-white' : 'bg-white text-black'
      }`}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        {/* Title centered */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`text-xl sm:text-2xl font-normal text-center mb-20 select-none font-sans ${
            isDark ? 'text-neutral-300' : 'text-neutral-800'
          }`}
        >
          Selected Projects
        </motion.h2>

        {/* Project list */}
        <div className={`divide-y border-y ${
          isDark ? 'divide-neutral-800 border-neutral-800' : 'divide-neutral-200 border-neutral-200'
        }`}>
          {displayProjects.map((project, index) => {
            const indexNumber = `0${index + 1}`
            const category = project.subtitle ? project.subtitle.split('·')[0].trim() : 'Backend Development'

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => onSelectProject(project)}
                className="group relative flex items-baseline justify-between py-10 sm:py-14 cursor-pointer select-none transition-all duration-300"
              >
                <div className="flex items-baseline space-x-6 sm:space-x-10 z-10">
                  <span className={`text-xs sm:text-sm font-mono transition-colors ${
                    isDark ? 'text-neutral-600 group-hover:text-white' : 'text-neutral-400 group-hover:text-neutral-900'
                  }`}>
                    {indexNumber}
                  </span>
                  <h3 className={`text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight transition-colors duration-300 ${
                    isDark 
                      ? 'text-neutral-100 group-hover:text-neutral-500' 
                      : 'text-neutral-950 group-hover:text-neutral-400'
                  }`}>
                    {project.name}
                  </h3>
                </div>

                <div className="z-10 text-right">
                  <span className={`text-xs sm:text-sm font-light transition-colors ${
                    isDark 
                      ? 'text-neutral-500 group-hover:text-neutral-300' 
                      : 'text-neutral-500 group-hover:text-neutral-800'
                  }`}>
                    {category}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Floating Cursor-Follower Preview */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: mousePos.x + 24,
              y: mousePos.y - 80,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 32,
              mass: 0.4,
            }}
            className="pointer-events-none fixed top-0 left-0 z-40 w-64 sm:w-80 rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-neutral-100 bg-black hidden md:block"
          >
            <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
              <img 
                src={hoveredProject.image} 
                alt={hoveredProject.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
