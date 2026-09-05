import { ArrowUpRight, ShieldCheck, Cpu, Database, ExternalLink } from 'lucide-react'
import Reveal from './Reveal'
import { personal } from '../data/portfolio'

export default function DevJunctionSpotlight() {
  const handleContactNav = (e) => {
    e.preventDefault()
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Reveal className="mb-10">
      <div className="relative rounded-sm border border-primary/40 bg-gradient-to-br from-surface via-[#0b1320] to-background p-6 sm:p-8 overflow-hidden group shadow-[0_0_28px_rgba(56,189,248,0.08)] hover:shadow-[0_0_36px_rgba(56,189,248,0.16)] transition-all duration-300">
        {/* Glow ambient background accents */}
        <div 
          className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/15 transition-colors duration-500" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-24 -left-24 w-60 h-60 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1 flex flex-col gap-3">
            {/* Header tag and status */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                Featured Tech Venture
              </span>
              <span className="text-2xs text-muted-foreground font-mono">
                Startup · Established 2025
              </span>
            </div>

            {/* Venture Title & Role */}
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  DevJunction
                </h2>
                <span className="text-xs sm:text-sm text-primary font-mono font-medium">
                  Co-Founder &amp; Backend Developer
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mt-1">
                A modern tech startup delivering high-performance web platforms, custom backend infrastructures, and client digital systems. We architect scalable databases, secure API endpoints, and production-grade software solutions tailored to business operations.
              </p>
            </div>

            {/* Core Competencies badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-foreground/80 bg-background/80 border border-border px-2.5 py-1 rounded-sm">
                <Database size={12} className="text-primary" /> Scalable Backend &amp; APIs
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-foreground/80 bg-background/80 border border-border px-2.5 py-1 rounded-sm">
                <Cpu size={12} className="text-primary" /> Systems &amp; Database Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-foreground/80 bg-background/80 border border-border px-2.5 py-1 rounded-sm">
                <ShieldCheck size={12} className="text-primary" /> Enterprise Client Solutions
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-row lg:flex-col items-stretch gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={personal.devjunctionUrl || 'https://facebook.com/DevJunctionInc'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wide bg-primary text-background hover:bg-sky-400 transition-all shadow-[0_0_16px_rgba(56,189,248,0.25)] hover:shadow-[0_0_24px_rgba(56,189,248,0.4)] group/btn"
              aria-label="Visit DevJunction on Facebook"
            >
              <span>Visit DevJunction</span>
              <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={handleContactNav}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm text-xs font-mono text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 bg-background/50 hover:bg-surface transition-colors"
            >
              <span>Inquire for Project</span>
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
