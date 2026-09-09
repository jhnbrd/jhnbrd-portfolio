import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

function ProjectRow({ project, index, isDark, onSelectProject, onHover, onLeave }) {
  const rowRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!rowRef.current) return
    const rect = rowRef.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    // Smooth magnetic displacement within range (up to 20px on X, 6px on Y)
    setOffset({
      x: Math.max(-20, Math.min(20, (relX / (rect.width / 2)) * 20)),
      y: Math.max(-6, Math.min(6, (relY / (rect.height / 2)) * 6)),
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover(project)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setOffset({ x: 0, y: 0 })
    onLeave()
  }

  const indexNumber = `0${index + 1}`
  const category = project.subtitle ? project.subtitle.split('·')[0].trim() : 'Backend Development'

  const rowVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      ref={rowRef}
      variants={rowVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectProject(project)}
      className="group relative flex items-baseline justify-between py-10 sm:py-14 cursor-pointer select-none transition-colors duration-300"
    >
      <div className="flex items-baseline space-x-6 sm:space-x-10 z-10">
        <motion.span
          animate={{
            x: isHovered ? offset.x * 0.4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`text-xs sm:text-sm font-mono transition-colors ${
            isDark ? 'text-neutral-600 group-hover:text-white' : 'text-neutral-400 group-hover:text-neutral-900'
          }`}
        >
          {indexNumber}
        </motion.span>

        {/* Magnetic Project Name - moves with mouse proximity */}
        <motion.h3
          animate={{
            x: isHovered ? offset.x : 0,
            y: isHovered ? offset.y : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 24,
            mass: 0.25,
          }}
          className={`text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight transition-colors duration-300 ${
            isDark 
              ? 'text-neutral-100 group-hover:text-neutral-400' 
              : 'text-neutral-950 group-hover:text-neutral-500'
          }`}
        >
          {project.name}
        </motion.h3>
      </div>

      <div className="z-10 text-right">
        <motion.span
          animate={{
            x: isHovered ? -offset.x * 0.3 : 0,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`text-xs sm:text-sm font-light transition-colors ${
            isDark 
              ? 'text-neutral-500 group-hover:text-neutral-300' 
              : 'text-neutral-500 group-hover:text-neutral-800'
          }`}
        >
          {category}
        </motion.span>
      </div>
    </motion.div>
  )
}

export default function EditorialProjectsList({ projects, onSelectProject }) {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { isDark } = useTheme()

  const displayProjects = projects.slice(0, 4)

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <section 
      id="projects" 
      className={`relative w-full py-28 sm:py-36 transition-colors duration-500 ${
        isDark ? 'bg-neutral-950 text-white' : 'bg-white text-black'
      }`}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        {/* Title centered */}
        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`text-xl sm:text-2xl font-normal text-center mb-20 select-none font-sans ${
            isDark ? 'text-neutral-300' : 'text-neutral-800'
          }`}
        >
          Selected Projects
        </motion.h2>

        {/* Project list */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className={`divide-y border-y ${
            isDark ? 'divide-neutral-800 border-neutral-800' : 'divide-neutral-200 border-neutral-200'
          }`}
        >
          {displayProjects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isDark={isDark}
              onSelectProject={onSelectProject}
              onHover={(p) => setHoveredProject(p)}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating Cursor-Follower Preview */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: mousePos.x + 28, 
              y: mousePos.y - 90 
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 32,
              mass: 0.35,
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
