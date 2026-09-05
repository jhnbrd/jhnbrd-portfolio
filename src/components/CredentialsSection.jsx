import { useState } from 'react'
import {
  Network,
  FileText,
  Code,
  Database,
  Code2,
  Coffee,
  Cpu,
  Trophy,
  ShieldCheck,
  CheckCircle2,
  Medal,
  Sparkles,
  Layers,
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

const CATEGORIES = [
  'All',
  'Backend & Data',
  'Networking & Infrastructure',
  'Software Engineering',
  'Hardware & Systems',
]

function CredentialCard({ cred }) {
  const Icon = ICON_MAP[cred.icon] || Code

  return (
    <div className="card card-hover shimmer-sweep p-5 flex flex-col justify-between gap-4 group transition-all duration-200 hover:border-primary/50">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-sm bg-surface border border-border flex items-center justify-center shrink-0 transition-[transform,border-color,box-shadow] duration-200 group-hover:scale-105 group-hover:border-primary/40 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.2)]">
          <Icon size={18} className="text-primary transition-colors duration-200 group-hover:text-sky-300" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="text-sm text-foreground font-bold leading-snug group-hover:text-primary transition-colors">
              {cred.name}
            </h3>
            <span className="text-xs text-muted-foreground font-mono shrink-0">{cred.year}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-primary font-mono font-medium">{cred.issuer}</span>
            {cred.category && (
              <>
                <span className="text-muted-foreground/50 text-xs">•</span>
                <span className="text-xs text-muted-foreground font-mono">{cred.category}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed pl-13 sm:pl-0">
        {cred.description}
      </p>

      <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono">
        <span className="inline-flex items-center gap-1.5 text-success font-semibold">
          <CheckCircle2 size={13} />
          <span>Verified Credential</span>
        </span>
        <span className="text-muted-foreground">ID: #{String(cred.id).padStart(3, '0')}</span>
      </div>
    </div>
  )
}

export default function CredentialsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredCredentials =
    selectedCategory === 'All'
      ? credentials
      : credentials.filter((c) => c.category === selectedCategory)

  return (
    <section id="credentials" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="cat ./credentials --verify" title="Credentials &amp; Honors" />

      {/* Metric Telemetry Row */}
      <Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-3.5 bg-surface border border-border rounded-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <ShieldCheck size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground font-mono">{credentials.length} Validated</span>
              <span className="text-xs text-muted-foreground font-mono">Certifications</span>
            </div>
          </div>

          <div className="p-3.5 bg-surface border border-border rounded-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-warning/10 border border-warning/20 flex items-center justify-center text-warning shrink-0">
              <Trophy size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground font-mono">2 Major Titles</span>
              <span className="text-xs text-muted-foreground font-mono">Mindanao &amp; Nat'l</span>
            </div>
          </div>

          <div className="p-3.5 bg-surface border border-border rounded-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-success/10 border border-success/20 flex items-center justify-center text-success shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground font-mono">100% Industry</span>
              <span className="text-xs text-muted-foreground font-mono">Accredited Bodies</span>
            </div>
          </div>

          <div className="p-3.5 bg-surface border border-border rounded-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground font-mono">Pearson &amp; TESDA</span>
              <span className="text-xs text-muted-foreground font-mono">Global Standards</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Certifications Grid with Category Filter */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest font-semibold">
                Industry Certifications
              </span>
              <span className="text-xs font-mono bg-surface border border-border text-primary px-2 py-0.5 rounded-sm font-bold">
                {filteredCredentials.length}
              </span>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-mono px-2.5 py-1 rounded-sm transition-all duration-150 ${
                    selectedCategory === cat
                      ? 'bg-primary text-background font-bold shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                      : 'bg-surface text-muted-foreground hover:text-foreground border border-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards 2-column on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCredentials.map((cred, i) => (
              <Reveal key={cred.id} delay={i % 2 === 0 ? '' : 'delay-100'}>
                <CredentialCard cred={cred} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right Column: Competitive Record & Hackathons */}
        <div className="lg:w-80 shrink-0 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1 border-b border-border">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest font-semibold">
              Competitive Record
            </span>
            <span className="text-xs font-mono text-warning font-semibold flex items-center gap-1">
              <Trophy size={13} /> {competitions.length} Events
            </span>
          </div>

          <Reveal delay="delay-100">
            <div className="card overflow-hidden border border-border divide-y divide-border/60">
              {competitions.map((comp) => (
                <div
                  key={comp.name}
                  className="flex gap-3 items-start p-4 row-hover transition-colors group"
                >
                  <div className="mt-0.5 shrink-0">
                    {comp.highlight ? (
                      <div className="w-6 h-6 rounded-full bg-warning/15 border border-warning/30 flex items-center justify-center text-warning">
                        <Trophy size={12} aria-hidden="true" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center text-muted-foreground">
                        <Medal size={12} aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="text-xs text-foreground font-semibold leading-tight group-hover:text-primary transition-colors">
                      {comp.name}
                    </span>
                    <div className="flex items-center justify-between mt-0.5">
                      <span
                        className={`text-xs font-mono font-bold ${
                          comp.highlight
                            ? 'text-warning bg-warning/10 px-1.5 py-0.2 rounded-sm border border-warning/20'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {comp.result}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{comp.year}</span>
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
