import {
  Network,
  FileText,
  Code,
  Database,
  Code2,
  Coffee,
  Cpu,
  Trophy,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { credentials, competitions } from '../data/portfolio'

const ICON_MAP = {
  network: Network,
  'file-text': FileText,
  code: Code,
  database: Database,
  'code-2': Code2,
  coffee: Coffee,
  cpu: Cpu,
}

function CredentialCard({ cred }) {
  const Icon = ICON_MAP[cred.icon] || Code

  return (
    <div className="card card-hover shimmer-sweep p-5 flex gap-4 items-start group">
      <div className="w-10 h-10 rounded-sm bg-accent-dim border border-border flex items-center justify-center shrink-0 transition-[transform,border-color,box-shadow] duration-200 group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.2)]">
        <Icon size={18} className="text-primary transition-colors duration-200 group-hover:text-sky-300" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <span className="text-sm text-foreground font-bold leading-tight">{cred.name}</span>
          <span className="text-xs text-muted-foreground shrink-0">{cred.year}</span>
        </div>
        <span className="text-xs text-primary">{cred.issuer}</span>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">{cred.description}</p>
      </div>
    </div>
  )
}

export default function CredentialsSection() {
  return (
    <section id="credentials" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="cat ./credentials --verify" title="Credentials" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Certifications */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-2xs text-muted-foreground tracking-widest uppercase mb-1">
            Certifications
          </div>
          {credentials.map((cred, i) => (
            <Reveal key={cred.id} delay={i % 2 === 0 ? '' : 'delay-100'}>
              <CredentialCard cred={cred} />
            </Reveal>
          ))}
        </div>

        {/* Competitions */}
        <div className="lg:w-72 shrink-0">
          <div className="text-2xs text-muted-foreground tracking-widest uppercase mb-3">
            Competitions
          </div>
          <Reveal delay="delay-100">
          <div className="card overflow-hidden">
            {competitions.map((comp, idx) => (
              <div
                key={comp.name}
                className={`flex gap-3 items-start p-4 row-hover ${
                  idx < competitions.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {comp.highlight ? (
                    <Trophy size={13} className="text-warning" aria-hidden="true" />
                  ) : (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-border mt-1" aria-hidden="true" />
                  )}
                </div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="text-xs text-foreground leading-tight">{comp.name}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`text-2xs font-bold ${
                        comp.highlight ? 'text-warning' : 'text-muted-foreground'
                      }`}
                    >
                      {comp.result}
                    </span>
                    <span className="text-2xs text-muted-foreground">{comp.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
