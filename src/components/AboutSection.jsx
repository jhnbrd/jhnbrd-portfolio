import { GraduationCap, Briefcase, Server, ArrowUpRight, Terminal, CheckCircle2 } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { personal, machines, homelab, education, experience } from '../data/portfolio'

export default function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="cat README.md" title="About &amp; Background" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bio & Core Focus (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Punchy Bio */}
          <Reveal>
            <div className="card p-6 border-l-2 border-l-primary flex flex-col gap-3 bg-gradient-to-br from-surface to-background">
              <div className="flex items-center gap-2 text-2xs font-mono text-primary uppercase tracking-widest">
                <Terminal size={12} /> Executive Summary
              </div>
              {personal.bio.map((para, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                {personal.tags.map((tag) => (
                  <span key={tag} className="tag-chip text-2xs">
                    <span className="text-primary text-xs" aria-hidden="true">◆</span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Key Experience & Leadership */}
          <Reveal delay="delay-100">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-2xs text-muted-foreground tracking-widest uppercase font-mono">
                <Briefcase size={12} className="text-primary" /> Key Roles &amp; Ventures
              </div>
              <div className="flex flex-col gap-3">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="card p-4 rounded-sm border border-border/80 hover:border-primary/40 transition-colors flex flex-col gap-2"
                  >
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      {exp.url ? (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group/link"
                        >
                          <span>{exp.org}</span>
                          <ArrowUpRight size={12} className="text-primary group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      ) : (
                        <span className="text-sm font-bold text-foreground">{exp.org}</span>
                      )}
                      <span className="text-2xs text-muted-foreground font-mono">{exp.period}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-primary font-medium">{exp.role}</span>
                      <span className="text-3xs text-muted-foreground bg-background border border-border px-1.5 py-0.5 rounded-sm">
                        {exp.type}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-1 mt-1">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                          <span className="text-primary mt-1 shrink-0 text-3xs">›</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Clean Education Card */}
          <Reveal delay="delay-150">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-2xs text-muted-foreground tracking-widest uppercase font-mono">
                <GraduationCap size={13} className="text-primary" /> Academic Foundation
              </div>
              <div className="card p-4 flex flex-col gap-2 bg-surface/50 border border-border">
                {education.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className={`flex flex-col gap-1 ${
                      idx < education.length - 1 ? 'pb-3 border-b border-border/40' : ''
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <span className="text-sm text-foreground font-bold">{edu.school}</span>
                      <span className="text-2xs text-muted-foreground font-mono">{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-primary">{edu.degree}</span>
                      {edu.honors && (
                        <span className="text-3xs font-bold text-success bg-success/10 border border-success/30 px-1.5 py-0.2 rounded-sm">
                          {edu.honors}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Staging & Homelab Operations (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Machines Card */}
          <Reveal delay="delay-100">
            <div className="card p-5 border border-border bg-surface">
              <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-border">
                <div className="flex items-center gap-2 text-2xs text-muted-foreground tracking-widest uppercase font-mono">
                  <Server size={12} className="text-primary" /> Active Staging Nodes
                </div>
                <span className="text-3xs font-mono text-success flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> 2 Online
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {machines.map((m) => (
                  <div key={m.name} className="flex flex-col gap-1 p-2.5 rounded-sm bg-background/50 border border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">{m.name}</span>
                      <span className="text-3xs text-success font-mono font-bold">● online</span>
                    </div>
                    <span className="text-2xs text-primary font-mono">{m.specs}</span>
                    <span className="text-2xs text-muted-foreground">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Homelab & Live Tunnel Services */}
          <Reveal delay="delay-150">
            <div className="card overflow-hidden border border-border">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-2xs font-mono text-foreground font-bold">jhnbrd.com edge tunnel</span>
                </div>
                <span className="text-3xs text-muted-foreground font-mono">Cloudflare Zero-Trust</span>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="text-2xs text-muted-foreground font-mono tracking-wider uppercase">
                  Reverse Proxy Endpoints
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {homelab.tunnels.map((t) => (
                    <div
                      key={t.subdomain}
                      className="flex items-center justify-between px-2.5 py-1.5 bg-background/60 rounded-sm border border-border/40 font-mono text-2xs"
                    >
                      <span className="text-primary truncate">{t.subdomain}</span>
                      <span className="text-muted-foreground text-3xs shrink-0">port {t.port} → active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
