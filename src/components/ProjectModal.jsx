import { useEffect } from 'react'
import { X, ArrowUpRight, Github, ExternalLink, Calendar, User, Layers } from 'lucide-react'

function StatusBadge({ status }) {
  if (status === 'live')         return <span className="status-badge-live">● live</span>
  if (status === 'turned-over')  return <span className="status-badge-turned">⇢ turned over</span>
  if (status === 'academic')     return <span className="status-badge-academic">◆ academic</span>
  return <span className="status-badge-dev">◌ in dev</span>
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-surface border border-border/80 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-background border-b border-border select-none shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="text-2xs font-mono text-muted-foreground ml-2">
              ~/projects/{project.id}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm focus-ring"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 flex flex-col gap-6">
          {/* Project Preview Image */}
          <div className="relative w-full h-48 sm:h-64 rounded-sm overflow-hidden bg-background border border-border shrink-0">
            <img
              src={project.image}
              alt={`${project.name} thumbnail`}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div className="absolute top-3 right-3">
              <StatusBadge status={project.status} />
            </div>
            <div className="absolute top-3 left-3">
              <span className="text-xs text-muted-foreground bg-background/90 border border-border px-2.5 py-0.5 rounded-sm">
                {project.year}
              </span>
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h3 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-foreground">
                {project.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                <User size={13} className="text-primary" />
                <span>{project.role}</span>
              </div>
            </div>
            <p className="text-sm text-primary font-mono">{project.subtitle}</p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <div className="text-2xs text-muted-foreground tracking-widest uppercase font-mono">
              Overview &amp; Architecture
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col gap-2">
            <div className="text-2xs text-muted-foreground tracking-widest uppercase font-mono flex items-center gap-1.5">
              <Layers size={13} className="text-primary" />
              Technologies &amp; Tools
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-border flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wide bg-primary text-background hover:bg-sky-400 transition-all shadow-[0_0_14px_rgba(56,189,248,0.25)]"
                >
                  <span>Visit Live Demo</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
              {project.github && !project.private && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-mono text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 bg-background transition-colors"
                >
                  <Github size={14} />
                  <span>View on GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
              {project.private && (
                <span className="text-xs text-muted-foreground italic">
                  🔒 Source repository is private (client/commercial NDA)
                </span>
              )}
              {!project.liveUrl && !project.github && (
                <span className="text-xs text-muted-foreground italic">
                  {project.type === 'research' ? 'Academic research paper' : 'Hardware & embedded build'}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-xs text-muted-foreground hover:text-foreground font-mono transition-colors"
            >
              [Close / Esc]
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
