import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Github, ExternalLink, Server, Layers } from 'lucide-react'

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

  const frontendKeywords = ['react', 'vue', 'html', 'css', 'javascript', 'customtkinter', 'ui', 'tailwind']
  const backendKeywords = ['python', 'fastapi', 'laravel', 'php', 'sqlite', 'mysql', 'postgresql', 'openwrt', 'scikit-learn', 'psutil', 'nodogsplash', 'c++', 'arduino']

  const frontendStack = project?.tags?.filter(t => 
    frontendKeywords.some(kw => t.toLowerCase().includes(kw))
  ) || []
  const backendStack = project?.tags?.filter(t => 
    !frontendKeywords.some(kw => t.toLowerCase().includes(kw)) || backendKeywords.some(kw => t.toLowerCase().includes(kw))
  ) || []

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
        >
          {/* Backdrop with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container with Spring Scale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0a0a0c] border border-neutral-800 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-850 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent-orange" />
                <span className="text-xs font-mono text-neutral-400">
                  {project.name.toUpperCase()} // CASE STUDY
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-10">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                    {project.name}
                  </h2>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                    {project.year} · {project.role}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-mono text-neutral-400">
                  {project.subtitle}
                </p>
              </div>

              {/* Spec Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-neutral-800">
                <div className="md:col-span-7 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Problem &amp; Outcome
                  </div>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                    {project.description}
                  </p>
                  
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-medium px-5 py-2.5 rounded-full text-xs transition-colors"
                      >
                        <span>Live Deployment</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium px-5 py-2.5 rounded-full text-xs transition-colors"
                      >
                        <Github size={13} />
                        <span>Source Code</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 space-y-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5">
                        <Server size={12} className="text-accent-orange" />
                        <span>Backend &amp; Infrastructure</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {backendStack.map((tech, idx) => (
                          <span key={idx} className="text-xs font-mono bg-black/60 border border-neutral-800 px-2.5 py-1 rounded-md text-neutral-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5">
                        <Layers size={12} className="text-accent-mint" />
                        <span>Interface &amp; UI</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(frontendStack.length > 0 ? frontendStack : ['Tailwind CSS', 'JavaScript']).map((tech, idx) => (
                          <span key={idx} className="text-xs font-mono bg-black/60 border border-neutral-800 px-2.5 py-1 rounded-md text-neutral-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Framed Screenshot */}
              <div className="pt-6 border-t border-neutral-800">
                <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-black">
                  <img
                    src={project.image}
                    alt={`${project.name} interface`}
                    className="w-full h-auto object-cover max-h-[460px]"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
