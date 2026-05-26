import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { personal, machines, homelab, education, experience } from '../data/portfolio'

function TagChip({ children }) {
  return (
    <span className="tag-chip">
      <span className="text-primary text-xs" aria-hidden="true">◆</span>
      {children}
    </span>
  )
}

export default function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="cat README.md" title="About Me" />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Bio + Education + Experience */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Bio */}
          <Reveal>
            <div
              className="border-l-2 pl-6 flex flex-col gap-4"
              style={{ borderColor: 'rgba(56,189,248,0.3)' }}
            >
              {personal.bio.map((para, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay="delay-100">
            <div className="flex flex-wrap gap-2">
              {personal.tags.map((tag) => (
                <TagChip key={tag}>{tag}</TagChip>
              ))}
            </div>
          </Reveal>

          {/* Education */}
          <Reveal delay="delay-150">
            <div>
              <div className="text-2xs text-muted-foreground tracking-widest uppercase mb-3">
                Education
              </div>
              <div className="flex flex-col gap-4">
                {education.map((edu) => (
                  <div key={edu.id} className="flex flex-col gap-0.5">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <span className="text-sm text-foreground font-bold leading-tight">{edu.school}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{edu.period}</span>
                    </div>
                    <span className="text-xs text-primary">{edu.degree}</span>
                    {edu.honors && <span className="text-xs text-success">{edu.honors}</span>}
                    {edu.note && (
                      <span className="text-2xs text-muted-foreground italic leading-relaxed mt-0.5">{edu.note}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Experience */}
          <Reveal delay="delay-200">
            <div>
              <div className="text-2xs text-muted-foreground tracking-widest uppercase mb-3">
                Experience &amp; Affiliations
              </div>
              <div className="flex flex-col gap-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="pl-4 border-l border-border flex flex-col gap-1 rounded-r-sm transition-[border-color,background-color] duration-150 hover:border-primary/40 hover:bg-primary/[0.02]">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <span className="text-sm text-foreground font-bold leading-tight">{exp.org}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-primary">{exp.role}</span>
                      <span className="text-2xs text-muted-foreground border border-border px-1.5 py-0.5 rounded-sm">
                        {exp.type}
                      </span>
                    </div>
                    <ul className="mt-1 flex flex-col gap-1">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                          <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">›</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Staging Ecosystem + Homelab */}
        <div className="lg:w-72 shrink-0 flex flex-col gap-4">
          {/* Machines */}
          <Reveal>
            <div className="card p-5 flex flex-col gap-4">
              <div className="text-2xs text-muted-foreground tracking-widest uppercase">
                Staging Ecosystem
              </div>
              {machines.map((m, i) => (
                <div
                  key={m.name}
                  className={`flex items-start justify-between gap-2 pb-3 px-1 -mx-1 rounded-sm row-hover ${
                    i < machines.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm text-foreground font-bold leading-tight">{m.name}</span>
                    <span className="text-2xs text-primary">{m.specs}</span>
                    <span className="text-xs text-muted-foreground">{m.role}</span>
                    <span className="text-xs text-muted-foreground">{m.os}</span>
                    {m.ip && (
                      <span className="text-2xs text-muted-foreground font-mono">{m.ip}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold shrink-0 ${
                      m.status === 'online' ? 'text-success' : 'text-muted-foreground'
                    }`}
                  >
                    {m.status === 'online' ? '● online' : '○ idle'}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Homelab Services */}
          <Reveal delay="delay-100">
            <div className="card overflow-hidden">
              {/* Terminal titlebar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-background">
                <div className="flex gap-1" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-muted" />
                  <span className="w-2 h-2 rounded-full bg-muted" />
                  <span className="w-2 h-2 rounded-full bg-muted" />
                </div>
                <span className="text-2xs text-muted-foreground ml-1">jhnbrd homelab</span>
              </div>
              <div className="p-4 flex flex-col gap-3">

                {/* Network topology */}
                <div className="flex flex-col gap-1.5 pb-3 border-b border-border">
                  <div className="text-2xs text-muted-foreground tracking-widest uppercase mb-0.5">
                    Network
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col gap-0">
                      <span className="text-xs text-foreground font-bold">{homelab.isp}</span>
                      <span className="text-2xs text-muted-foreground">Main ISP</span>
                    </div>
                    <span className="text-2xs font-bold text-success shrink-0">● active</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col gap-0">
                      <span className="text-xs text-foreground font-bold">{homelab.captiveRouter.device}</span>
                      <span className="text-2xs text-muted-foreground">{homelab.captiveRouter.role}</span>
                    </div>
                    <span className="text-2xs font-bold text-success shrink-0">● online</span>
                  </div>
                </div>

                {/* Local server services */}
                <div className="flex flex-col gap-2 pb-3 border-b border-border">
                  <div className="text-2xs text-muted-foreground tracking-widest uppercase">
                    {homelab.server.machine} — {homelab.server.ip}
                  </div>
                  {homelab.localServices.map((svc) => (
                    <div key={svc.port} className="flex items-center justify-between gap-2 row-hover px-1 -mx-1 rounded-sm">
                      <div className="flex flex-col gap-0 min-w-0">
                        <span className="text-2xs text-foreground leading-tight truncate">{svc.name}</span>
                        <span className="text-2xs text-muted-foreground">{svc.runtime}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-2xs text-primary font-mono">:{svc.port}</span>
                        <span className="text-2xs text-success" aria-hidden="true">●</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cloudflare Tunnel */}
                <div className="flex flex-col gap-2">
                  <div className="text-2xs text-muted-foreground tracking-widest uppercase">
                    Cloudflare Tunnel — jhnbrd.com
                  </div>
                  {homelab.tunnels.map((t) => (
                    <div key={t.subdomain} className="flex items-center justify-between gap-2 row-hover px-1 -mx-1 rounded-sm">
                      <span className="text-2xs text-primary font-mono truncate">{t.subdomain}</span>
                      <span className="text-2xs text-muted-foreground font-mono shrink-0">→ :{t.port}</span>
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
