import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function EditorialProjectsList({ projects, onSelectProject }) {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // 4 top projects as seen in Screenshot 3
  const displayProjects = projects.slice(0, 4)

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section 
      id="projects" 
      className="relative w-full bg-white text-black py-28 sm:py-36"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        {/* Title centered matching Screenshot 3 */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl font-normal text-center text-neutral-800 mb-20 select-none"
        >
          Selected Projects
        </motion.h2>

        {/* 
          Exact project rows with hairline borders matching Screenshot 3:
          Index (01), Title in elegant typography, Right-aligned category 
        */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {displayProjects.map((project, index) => {
            const indexNumber = `0${index + 1}`
            const category = project.subtitle ? project.subtitle.split('·')[0].trim() : 'Backend Development'

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => onSelectProject(project)}
                className="group relative flex items-baseline justify-between py-10 sm:py-14 cursor-pointer select-none transition-all duration-300"
              >
                {/* Left: 01 + Title */}
                <div className="flex items-baseline space-x-6 sm:space-x-10 z-10">
                  <span className="text-xs sm:text-sm font-mono text-neutral-400 group-hover:text-neutral-900 transition-colors">
                    {indexNumber}
                  </span>
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-950 group-hover:text-neutral-400 transition-colors duration-300">
                    {project.name}
                  </h3>
                </div>

                {/* Right: Category label */}
                <div className="z-10 text-right">
                  <span className="text-xs sm:text-sm font-light text-neutral-500 group-hover:text-neutral-800 transition-colors">
                    {category}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Floating Interactive Hover Card with Spring Physics (bencodes.de signature) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              x: mousePos.x > (typeof window !== 'undefined' ? window.innerWidth - 420 : 800) ? -380 : 25,
            }}
            exit={{ opacity: 0, scale: 0.88, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="pointer-events-none fixed z-50 w-72 sm:w-88 md:w-96 rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-neutral-200 bg-neutral-900 hidden md:block"
            style={{
              top: mousePos.y - 120,
              left: mousePos.x,
            }}
          >
            <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
              <img 
                src={hoveredProject.image} 
                alt={hoveredProject.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                <span className="font-semibold">{hoveredProject.name}</span>
                <span className="text-neutral-400">{hoveredProject.year}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
