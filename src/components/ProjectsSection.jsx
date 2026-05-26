import { ArrowUpRight } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { featuredProjects, otherProjects } from '../data/portfolio'

function StatusBadge({ status }) {
  if (status === 'live')         return <span className="status-badge-live">● live</span>
  if (status === 'turned-over')  return <span className="status-badge-turned">⇢ turned over</span>
  if (status === 'academic')     return <span className="status-badge-academic">◆ academic</span>
  return <span className="status-badge-dev">◌ in dev</span>
}

function ProjectCard({ project, delay }) {
  return (
    <Reveal delay={delay} as="article" className="h-full">
      <div className="card card-hover shimmer-sweep overflow-hidden flex flex-col group h-full">
      {/* Thumbnail */}
      <div className="relative overflow-hidden shrink-0 bg-surface" style={{ height: '160px', background: 'linear-gradient(135deg, #0d1117 0%, #0f1923 50%, #0a0c10 100%)' }}>
        <img
          src={project.image}
          alt={`${project.name} project thumbnail`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-background opacity-10 group-hover:opacity-0 transition-opacity duration-300" aria-hidden="true" />
        <div className="absolute top-2.5 right-2.5">
          <StatusBadge status={project.status} />
        </div>
        <div className="absolute top-2.5 left-2.5">
          <span className="text-xs text-muted-foreground bg-background border border-border px-2 py-0.5 rounded-sm">
            {project.year}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-0.5">
          <span className="text-base text-foreground font-bold">{project.name}</span>
          <span className="text-xs text-muted-foreground">{project.subtitle}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-2xs text-muted-foreground italic">{project.role}</span>
          {project.private ? (
            <span className="text-2xs text-muted-foreground italic">currently private</span>
          ) : project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors group/link"
              aria-label={`Visit ${project.name} live`}
            >
              visit live
              <ArrowUpRight
                size={11}
                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </a>
          ) : project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors group/link"
              aria-label={`View ${project.name} on GitHub`}
            >
              view on github
              <ArrowUpRight
                size={11}
                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </a>
          ) : (
            <span className="text-2xs text-muted-foreground italic">
              {project.type === 'research' ? 'research paper' : 'hardware build'}
            </span>
          )}
        </div>
      </div>
      </div>
    </Reveal>
  )
}

const DELAYS = ['', 'delay-100', 'delay-200', 'delay-100', 'delay-200', 'delay-300']

export default function ProjectsSection() {
  return (
    <section aria-labelledby="projects-heading" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="ls ./projects --thumbnails" title="Projects" />

      {/* Featured project cards — live first */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={DELAYS[i] ?? ''} />
        ))}
      </div>

      {/* Other projects — compact list */}
      <Reveal>
        <div className="border border-border rounded-sm overflow-hidden bg-surface">
          <div className="flex items-center gap-4 py-2.5 px-4 sm:px-5 border-b border-border bg-background">
            <div className="flex-1 text-2xs text-muted-foreground tracking-widest uppercase">
              Other Projects
            </div>
            <div className="text-2xs text-muted-foreground tracking-widest uppercase hidden sm:block w-36 shrink-0">
              Period
            </div>
            <div className="text-2xs text-muted-foreground tracking-widest uppercase shrink-0">
              Stack
            </div>
          </div>
          <div className="px-4 sm:px-5">
            {otherProjects.map((p, idx) => (
              <div
                key={p.name}
                className={`flex items-start gap-4 py-3 ${
                  idx < otherProjects.length - 1 ? 'border-b border-border' : ''
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
        </div>
      </Reveal>
    </section>
  )
}
