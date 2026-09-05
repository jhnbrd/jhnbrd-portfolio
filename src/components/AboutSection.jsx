import { useState } from 'react'
import {
  Terminal,
  ShieldCheck,
  Cpu,
  Server,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  Code2,
  Database,
  Layers,
  Activity,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { personal, machines, homelab, education, experience } from '../data/portfolio'

const TABS = [
  { id: 'overview', label: '01 // Core Profile', icon: Terminal },
  { id: 'experience', label: '02 // Experience & Roles', icon: Briefcase },
  { id: 'infrastructure', label: '03 // Edge & Staging', icon: Server },
  { id: 'education', label: '04 // Academic Track', icon: GraduationCap },
]

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <section aria-labelledby="about-heading" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="cat README.md --interactive" title="About &amp; Background" />

      {/* Main Interactive Station Window */}
      <Reveal>
        <div className="border border-border rounded-sm overflow-hidden bg-surface shadow-[0_0_35px_rgba(0,0,0,0.6)]">
          {/* Top Console Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-border bg-background px-4 py-2.5 gap-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-2xs font-mono text-muted-foreground ml-2">
                operator@jhnbrd:~# inspect --target=engineer
              </span>
            </div>

            {/* Interactive Mode Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono transition-all duration-150 whitespace-nowrap ${
                      isActive
                        ? 'bg-primary text-background font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                    }`}
                  >
                    <Icon size={12} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dynamic Interactive Body */}
          <div className="p-6 sm:p-8 min-h-[340px]">
            {/* TAB 1: OVERVIEW & CORE PROFILE */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-sm bg-primary/10 text-primary text-2xs font-mono font-bold border border-primary/30 uppercase">
                      Philosophy &amp; Focus
                    </span>
                    <span className="text-2xs font-mono text-muted-foreground">Systems-First Engineering</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                    Architecting resilient backends with end-to-end infrastructure oversight.
                  </h3>

                  <div className="flex flex-col gap-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      As Co-Founder &amp; Backend Developer at <strong>DevJunction</strong>, I turn complex business requirements into high-throughput REST APIs, normalized relational databases, and containerized deployment workflows.
                    </p>
                    <p>
                      I audit ports before launching services and design data propagation from network edges down to SSD write IOPS — ensuring zero bottlenecks, strict authentication, and enterprise reliability.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-background border border-border rounded-sm flex flex-col gap-1">
                      <span className="text-primary text-xs font-bold font-mono">Backend Core</span>
                      <span className="text-2xs text-muted-foreground">Laravel · .NET 8 · FastAPI</span>
                    </div>
                    <div className="p-3 bg-background border border-border rounded-sm flex flex-col gap-1">
                      <span className="text-primary text-xs font-bold font-mono">Persistence</span>
                      <span className="text-2xs text-muted-foreground">MySQL · PostgreSQL · MS SQL</span>
                    </div>
                    <div className="p-3 bg-background border border-border rounded-sm flex flex-col gap-1">
                      <span className="text-primary text-xs font-bold font-mono">Infrastructure</span>
                      <span className="text-2xs text-muted-foreground">Cloudflare WAF · Linux · CI/CD</span>
                    </div>
                  </div>
                </div>

                {/* Live Engineering Telemetry Sidecard */}
                <div className="lg:col-span-5 flex flex-col gap-4 bg-background/80 border border-border rounded-sm p-5 font-mono">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-2xs text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Activity size={12} /> System Telemetry
                    </span>
                    <span className="text-3xs text-success flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> NOMINAL
                    </span>
                  </div>

                  <div className="space-y-2.5 text-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Venture</span>
                      <span className="text-foreground font-bold">DevJunction Inc.</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Active Role</span>
                      <span className="text-primary">Co-Founder / Backend</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Deployment Staging</span>
                      <span className="text-foreground">Zero-Trust WAF</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Certifications</span>
                      <span className="text-foreground">Certiport + TESDA COC 1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Current Availability</span>
                      <span className="text-success font-bold">Client Projects &amp; Contracts</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EXPERIENCE & VENTURES */}
            {activeTab === 'experience' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-sm border border-border bg-background hover:border-primary/50 transition-colors flex flex-col justify-between gap-4 group"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Org Header with Logo */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="w-14 h-14 rounded-md bg-white p-2 border border-border/80 flex items-center justify-center shrink-0 shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-105">
                          <img
                            src={exp.logo}
                            alt={`${exp.org} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-3xs text-primary font-mono bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-sm font-bold">
                            {exp.type}
                          </span>
                          <span className="text-2xs text-muted-foreground font-mono">{exp.period}</span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        {exp.url ? (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-bold text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1"
                          >
                            <span>{exp.org}</span>
                            <ArrowUpRight size={13} />
                          </a>
                        ) : (
                          <span className="text-base font-bold text-foreground">{exp.org}</span>
                        )}
                        <span className="text-xs text-primary font-mono mt-0.5">{exp.role}</span>
                      </div>

                      <ul className="flex flex-col gap-1.5 mt-1">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                            <span className="text-primary mt-1 shrink-0 text-3xs">›</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: EDGE & STAGING ARCHITECTURE */}
            {activeTab === 'infrastructure' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                {/* Node overview */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div className="text-2xs font-mono text-muted-foreground uppercase tracking-widest">
                    Local Physical Staging Cluster
                  </div>
                  {machines.map((m) => (
                    <div key={m.name} className="p-4 bg-background border border-border rounded-sm flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">{m.name}</span>
                        <span className="text-3xs font-mono text-success font-bold">● ACTIVE</span>
                      </div>
                      <span className="text-2xs text-primary font-mono">{m.specs}</span>
                      <p className="text-2xs text-muted-foreground">{m.role}</p>
                    </div>
                  ))}
                </div>

                {/* Cloudflare Tunnel Ingress */}
                <div className="lg:col-span-7 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-mono text-muted-foreground uppercase tracking-widest">
                      Zero-Trust Edge Ingress Endpoints
                    </span>
                    <span className="text-3xs text-success font-mono">WAF / SSL Active</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {homelab.tunnels.map((t) => (
                      <div
                        key={t.subdomain}
                        className="flex items-center justify-between p-3 bg-background border border-border rounded-sm font-mono text-xs"
                      >
                        <span className="text-primary font-bold">{t.subdomain}</span>
                        <span className="text-2xs text-muted-foreground">{t.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ACADEMIC TRACK */}
            {activeTab === 'education' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in">
                {education.map((edu) => (
                  <div key={edu.id} className="p-6 bg-background border border-border rounded-sm flex flex-col justify-between gap-4 group">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="w-16 h-16 rounded-md bg-white p-2 border border-border/80 flex items-center justify-center shrink-0 shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-105">
                          <img
                            src={edu.logo}
                            alt={`${edu.school} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                        </div>
                        <span className="text-2xs text-muted-foreground font-mono">{edu.period}</span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <h4 className="text-base font-bold text-foreground">{edu.school}</h4>
                        <span className="text-xs text-primary font-mono">{edu.degree}</span>
                        {edu.honors && (
                          <span className="text-3xs text-success font-bold font-mono mt-0.5">
                            ★ {edu.honors}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/40">
                      <span className="text-3xs text-muted-foreground uppercase tracking-wider font-mono block mb-1.5">
                        Focus Coursework
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {edu.courses.map((c) => (
                          <span key={c} className="text-3xs bg-surface border border-border px-2 py-0.5 rounded-sm text-foreground/80">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
