import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
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
        duration: 1.6,
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
      className="group relative flex flex-col sm:flex-row sm:items-baseline justify-between py-6 sm:py-12 gap-1.5 sm:gap-0 cursor-pointer select-none transition-colors duration-300"
    >
      <div className="flex items-baseline space-x-4 sm:space-x-8 z-10">
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
          className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight transition-colors duration-300 ${
            isDark 
              ? 'text-neutral-100 group-hover:text-neutral-400' 
              : 'text-neutral-950 group-hover:text-neutral-500'
          }`}
        >
          {project.name}
        </motion.h3>
      </div>

      <div className="z-10 pl-8 sm:pl-0 text-left sm:text-right">
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
  const [isPreviewActive, setIsPreviewActive] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const hoverTimerRef = useRef(null)
  const leaveTimerRef = useRef(null)
  const { isDark } = useTheme()

  const displayProjects = projects.slice(0, 4)

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  // Row Hover handler with half-second (500ms) initial delay
  const handleRowHover = (project) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }

    if (isPreviewActive) {
      // Already actively previewing -> instant switch without delay!
      setHoveredProject(project)
    } else {
      // First hover -> half second (500ms) delay
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = setTimeout(() => {
        setHoveredProject(project)
        setIsPreviewActive(true)
      }, 500)
    }
  }

  // Row Leave handler with short grace period for moving between rows
  const handleRowLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }

    leaveTimerRef.current = setTimeout(() => {
      setHoveredProject(null)
      setIsPreviewActive(false)
    }, 150)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  }

  return (
    <section 
      id="projects" 
      className={`relative w-full py-20 sm:py-36 transition-colors duration-700 ${
        isDark ? 'bg-neutral-950 text-white' : 'bg-white text-black'
      }`}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-12">
        {/* Title centered with relaxed pacing, triggers only when centered in view */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-20% 0px -20% 0px', amount: 0.4 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className={`text-lg sm:text-2xl font-normal text-center mb-12 sm:mb-20 select-none font-sans ${
            isDark ? 'text-neutral-300' : 'text-neutral-800'
          }`}
        >
          Selected Projects
        </motion.h2>

        {/* Project list - triggers when centered on screen */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-18% 0px -18% 0px', amount: 0.35 }}
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
              onHover={handleRowHover}
              onLeave={handleRowLeave}
            />
          ))}
        </motion.div>

        {/* See 30+ projects on GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-10% 0px -10% 0px', amount: 0.3 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-16 flex justify-center"
        >
          <a
            href="https://github.com/jhnbrd?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className={`group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-mono transition-all duration-300 transform hover:-translate-y-0.5 border w-full sm:w-auto ${
              isDark
                ? 'border-neutral-800 hover:border-neutral-600 bg-neutral-900/50 hover:bg-neutral-900 text-neutral-400 hover:text-white'
                : 'border-neutral-200 hover:border-neutral-400 bg-neutral-50 hover:bg-white text-neutral-600 hover:text-black shadow-sm'
            }`}
          >
            <span>See 30+ projects on GitHub</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>

      {/* Floating Cursor-Follower Preview with spring entrance */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: mousePos.x + 28, 
              y: mousePos.y - 90 
            }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 30,
              mass: 0.35,
            }}
            className="pointer-events-none fixed top-0 left-0 z-40 w-64 sm:w-80 rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.35)] border border-neutral-200 dark:border-neutral-800 bg-neutral-900 hidden md:block"
          >
            <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
              <img 
                src={hoveredProject.image} 
                alt={hoveredProject.name}
                className="w-full h-full object-cover transition-transform duration-500 scale-105"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
