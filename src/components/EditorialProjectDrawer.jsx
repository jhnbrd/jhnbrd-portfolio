import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'

export default function EditorialProjectDrawer({ project, onClose }) {
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  // Split technology tags into Frontend vs Backend cleanly
  const frontendKeywords = ['react', 'vue', 'html', 'css', 'javascript', 'customtkinter', 'ui', 'tailwind', 'three.js']
  const backendKeywords = ['python', 'fastapi', 'laravel', 'php', 'sqlite', 'mysql', 'postgresql', 'postgis', 'node.js', 'openwrt', 'scikit-learn', 'psutil', 'nodogsplash', 'c++', 'arduino', 'spring boot', 'graphql', 'mongodb', 'c#', '.net', 'sql', 'paymongo', 'tensorflow']

  const frontendStack = project?.tags?.filter(t => 
    frontendKeywords.some(kw => t.toLowerCase().includes(kw))
  ) || []
  const backendStack = project?.tags?.filter(t => 
    !frontendKeywords.some(kw => t.toLowerCase().includes(kw)) || backendKeywords.some(kw => t.toLowerCase().includes(kw))
  ) || []

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black text-white"
        >
          {/* Top navigation row */}
          <div className="max-w-5xl mx-auto px-5 sm:px-12 pt-6 sm:pt-8 pb-4 sm:pb-6 flex items-center justify-between">
            {/* Back button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 py-2 text-xs uppercase tracking-widest font-mono text-neutral-400 hover:text-white transition-colors"
            >
              <X size={16} />
              <span>Back</span>
            </button>

            {/* Top right external link icon */}
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                  aria-label="Visit live site"
                >
                  <ArrowUpRight size={18} />
                </a>
              )}
              {project.github && !project.liveUrl && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                  aria-label="View source repository"
                >
                  <ArrowUpRight size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Main Case Study Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto px-5 sm:px-12 py-6 sm:py-10 space-y-10 sm:space-y-16"
          >
            {/* Project Title & Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-3 sm:mb-4">
                {project.name}
              </h1>
              <p className="text-neutral-400 font-mono text-xs sm:text-sm">
                {project.subtitle} · {project.year}
              </p>
            </div>

            {/* Description & Technologies Two-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-16 pt-6 sm:pt-8 border-t border-neutral-900">
              {/* Left Column: DESCRIPTION */}
              <div className="md:col-span-7 space-y-3 sm:space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Description
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Right Column: TECHNOLOGIES */}
              <div className="md:col-span-5 space-y-3 sm:space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Technologies
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-neutral-300 font-light">
                  <div>
                    <span className="font-semibold text-white">Frontend: </span>
                    <span className="text-neutral-400">
                      {frontendStack.length > 0 ? frontendStack.join(', ') : 'Tailwind CSS, JavaScript'}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Backend: </span>
                    <span className="text-neutral-400">
                      {backendStack.length > 0 ? backendStack.join(', ') : 'Python, SQLite, REST API'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Framed UI Screenshot Showcase */}
            <div className="pt-6 sm:pt-8 border-t border-neutral-900 pb-8">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950 shadow-2xl">
                <img
                  src={project.image}
                  alt={`${project.name} preview`}
                  className="w-full h-auto object-cover max-h-[380px] sm:max-h-[640px]"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
