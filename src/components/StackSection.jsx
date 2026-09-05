import { useState, useMemo } from 'react'
import {
  Server,
  Database,
  Layout,
  Terminal,
  ShieldCheck,
  Cpu,
  Search,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { stack } from '../data/portfolio'

const CATEGORY_ICONS = {
  'Backend & APIs': Server,
  'Databases & Storage': Database,
  'Frontend & Mobile': Layout,
  'Systems & Infrastructure': Terminal,
  'Networking & Security': ShieldCheck,
  'Hardware & Embedded': Cpu,
}

function LevelBadge({ level }) {
  if (level.includes('Production')) {
    return (
      <span className="text-xs font-mono font-bold text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-sm flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span>Production / Core</span>
      </span>
    )
  }
  if (level.includes('Proficient')) {
    return (
      <span className="text-xs font-mono font-bold text-sky-400/90 bg-surface border border-border px-2 py-0.5 rounded-sm flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-sm bg-sky-400/80" />
        <span>Proficient</span>
      </span>
    )
  }
  return (
    <span className="text-xs font-mono text-muted-foreground bg-surface border border-border px-2 py-0.5 rounded-sm flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full border border-muted-foreground/60" />
      <span>Specialized</span>
    </span>
  )
}

export default function StackSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = useMemo(() => ['All', ...stack.map((s) => s.category)], [])

  const filteredStack = useMemo(() => {
    return stack
      .filter((group) => {
        if (activeFilter !== 'All' && group.category !== activeFilter) return false
        if (!searchQuery.trim()) return true

        const query = searchQuery.toLowerCase()
        const matchCategory = group.category.toLowerCase().includes(query)
        const matchItems = group.items.some((item) => item.toLowerCase().includes(query))
        const matchLevel = group.level.toLowerCase().includes(query)
        return matchCategory || matchItems || matchLevel
      })
      .map((group) => {
        if (!searchQuery.trim()) return group
        return {
          ...group,
          highlightedItems: group.items.map((item) => ({
            name: item,
            matched: item.toLowerCase().includes(searchQuery.toLowerCase()),
          })),
        }
      })
  }, [activeFilter, searchQuery])

  const totalTechCount = useMemo(() => {
    return stack.reduce((acc, curr) => acc + curr.items.length, 0)
  }, [])

  return (
    <section id="stack" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="cat ./stack.json --inspect" title="Tech Stack &amp; Architecture" />

      {/* Control Console: Search & Filters */}
      <Reveal>
        <div className="border border-border rounded-sm bg-surface p-4 sm:p-5 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Real-time search query input */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, framework, or protocol (e.g. Laravel, .NET, Redis)..."
              className="w-full bg-background border border-border rounded-sm pl-10 pr-4 py-2 text-xs font-mono text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-2xs font-mono text-muted-foreground hover:text-foreground"
              >
                [clear]
              </button>
            )}
          </div>

          {/* Quick telemetry summary badge */}
          <div className="flex items-center gap-3 self-end md:self-center font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary" />
              <strong className="text-foreground">{totalTechCount}</strong> technologies mapped
            </span>
          </div>
        </div>
      </Reveal>

      {/* Layer Filter Buttons */}
      <Reveal delay="delay-100">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`text-xs font-mono px-3 py-1.5 rounded-sm whitespace-nowrap transition-all duration-150 ${
                activeFilter === cat
                  ? 'bg-primary text-background font-bold shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                  : 'bg-surface text-muted-foreground hover:text-foreground border border-border hover:border-primary/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Tech Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStack.map((group, idx) => {
          const IconComponent = CATEGORY_ICONS[group.category] || Code2

          return (
            <Reveal key={group.category} delay={idx % 2 === 0 ? '' : 'delay-100'}>
              <div className="card card-hover shimmer-sweep p-5 flex flex-col justify-between gap-5 h-full group hover:border-primary/50 transition-all duration-200">
                <div className="flex flex-col gap-4">
                  {/* Category Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm bg-background border border-border flex items-center justify-center shrink-0 text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.2)] transition-all">
                        <IconComponent size={18} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {group.category}
                        </h3>
                        <span className="text-2xs font-mono text-muted-foreground">
                          {group.items.length} tools &amp; libraries
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Level Pill */}
                  <div>
                    <LevelBadge level={group.level} />
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {group.highlightedItems
                      ? group.highlightedItems.map(({ name, matched }) => (
                          <span
                            key={name}
                            className={`text-xs px-2.5 py-1 rounded-sm border font-mono transition-colors ${
                              matched
                                ? 'bg-primary text-background font-bold border-primary shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                                : 'bg-surface border-border text-foreground/90'
                            }`}
                          >
                            {name}
                          </span>
                        ))
                      : group.items.map((item) => (
                          <span
                            key={item}
                            className="skill-tag text-xs font-mono px-2.5 py-1"
                          >
                            {item}
                          </span>
                        ))}
                  </div>
                </div>

                {/* Subtle bottom telemetry status */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-2xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1 text-success">
                    <CheckCircle2 size={12} />
                    <span>Active In Workflows</span>
                  </span>
                  <span>SYS-REV // 2026</span>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {filteredStack.length === 0 && (
        <div className="p-8 border border-border rounded-sm bg-surface text-center flex flex-col items-center gap-2 font-mono">
          <span className="text-xs text-muted-foreground">No stack elements match query "{searchQuery}"</span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setActiveFilter('All')
            }}
            className="text-xs text-primary underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  )
}
