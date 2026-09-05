import { useState } from 'react'
import { ArrowUpRight, ChevronDown, ChevronUp, Layers } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import DevJunctionSpotlight from './DevJunctionSpotlight'
import ProjectModal from './ProjectModal'
import { featuredProjects, otherProjects } from '../data/portfolio'

function StatusBadge({ status }) {
  if (status === 'live')         return <span className="status-badge-live">● live</span>
  if (status === 'turned-over')  return <span className="status-badge-turned">⇢ turned over</span>
  if (status === 'academic')     return <span className="status-badge-academic">◆ academic</span>
  return <span className="status-badge-dev">◌ in dev</span>
}

function ProjectCard({ project, delay, onSelect }) {
  return (
    <Reveal delay={delay} as="article" className="h-full">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(project)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(project) }}
        className="card card-hover shimmer-sweep overflow-hidden flex flex-col group h-full cursor-pointer transition-all duration-200 hover:border-primary/50 text-left focus:outline-none focus:ring-1 focus:ring-primary"
        aria-label={`View details for ${project.name}`}
      >
        {/* Thumbnail */}
        <div
          className="relative overflow-hidden shrink-0 bg-surface"
          style={{ height: '175px', background: 'linear-gradient(135deg, #0d1117 0%, #0f1923 50%, #0a0c10 100%)' }}
        >
          <img
            src={project.image}
            alt={`${project.name} thumbnail`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300" aria-hidden="true" />
          <div className="absolute top-2.5 right-2.5">
            <StatusBadge status={project.status} />
          </div>
          <div className="absolute top-2.5 left-2.5">
            <span className="text-2xs font-mono text-muted-foreground bg-background/90 border border-border px-2 py-0.5 rounded-sm">
              {project.year}
            </span>
          </div>
        </div>

        {/* Minimalist Card Body */}
        <div className="p-5 flex flex-col justify-between flex-1 gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-base text-foreground font-bold group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{project.subtitle}</p>
          </div>

          {/* Core tech tags (max 3) */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="skill-tag text-2xs">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-2xs text-muted-foreground px-1 py-0.5">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Action indicator */}
          <div className="flex items-center justify-between pt-3 border-t border-border/40 text-2xs text-muted-foreground font-mono">
            <span>{project.role}</span>
            <span className="text-primary group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 font-bold">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

const DELAYS = ['', 'delay-100', 'delay-200', 'delay-100', 'delay-200', 'delay-300']

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAllOther, setShowAllOther] = useState(false)
  const displayedOther = showAllOther ? otherProjects : otherProjects.slice(0, 4)

  return (
    <section aria-labelledby="projects-heading" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="ls ./projects --thumbnails" title="Projects &amp; Ventures" />

      {/* DevJunction Featured Startup Spotlight */}
      <DevJunctionSpotlight />

      {/* Featured project cards — live first */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
        {featuredProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            delay={DELAYS[i] ?? ''}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      {/* Interactive Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Other projects — compact curated list */}
      <Reveal>
        <div className="border border-border rounded-sm overflow-hidden bg-surface">
          <div className="flex items-center gap-4 py-2.5 px-4 sm:px-5 border-b border-border bg-background">
            <div className="flex-1 text-2xs text-muted-foreground tracking-widest uppercase">
              Project Archive &amp; Prototypes
            </div>
            <div className="text-2xs text-muted-foreground tracking-widest uppercase hidden sm:block w-36 shrink-0">
              Period
            </div>
            <div className="text-2xs text-muted-foreground tracking-widest uppercase shrink-0">
              Stack
            </div>
          </div>
          <div className="px-4 sm:px-5">
            {displayedOther.map((p, idx) => (
              <div
                key={p.name}
                className={`flex items-start gap-4 py-3 ${
                  idx < displayedOther.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground leading-tight">{p.name}</div>
                  {p.description && (
                    <div className="text-2xs text-muted-foreground mt-0.5 leading-relaxed">
                      {p.description}
                    </div>
                  )}
                  {p.team && (
                    <div className="text-2xs text-muted-foreground mt-0.5">
                      w/ {p.team}
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground shrink-0 hidden sm:block w-36">
                  {p.period}
                </div>
                <div className="flex flex-wrap gap-1 shrink-0 justify-end" style={{ maxWidth: '120px' }}>
                  {p.tags.map((tag) => (
                    <span key={tag} className="skill-tag whitespace-nowrap">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {otherProjects.length > 4 && (
            <div className="border-t border-border bg-background/50 px-4 py-2 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllOther(!showAllOther)}
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 py-1 px-3 rounded-sm"
              >
                {showAllOther ? (
                  <>
                    Show fewer archived projects <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    Show all {otherProjects.length} archived prototypes <ChevronDown size={14} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}
