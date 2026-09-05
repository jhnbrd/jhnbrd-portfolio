import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { stack } from '../data/portfolio'

function LevelBadge({ level }) {
  if (level.includes('Production')) {
    return (
      <span className="text-2xs font-bold text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-sm">
        ● {level}
      </span>
    )
  }
  if (level.includes('Proficient')) {
    return (
      <span className="text-2xs font-bold text-sky-400/90 bg-surface border border-border px-2 py-0.5 rounded-sm">
        ◆ {level}
      </span>
    )
  }
  return (
    <span className="text-2xs text-muted-foreground bg-surface border border-border px-2 py-0.5 rounded-sm">
      ◌ {level}
    </span>
  )
}

export default function StackSection() {
  return (
    <section id="stack" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="cat ./stack.json" title="Tech Stack &amp; Architecture" />

      <Reveal>
        <div className="border border-border rounded-sm overflow-hidden bg-surface">
          {/* Table Header */}
          <div className="flex items-center gap-4 sm:gap-6 py-3 px-4 sm:px-5 border-b border-border bg-background">
            <div className="w-36 sm:w-48 text-2xs text-muted-foreground tracking-widest uppercase shrink-0">
              Domain / Category
            </div>
            <div className="flex-1 text-2xs text-muted-foreground tracking-widest uppercase">
              Technologies &amp; Frameworks
            </div>
            <div className="text-2xs text-muted-foreground tracking-widest uppercase shrink-0 hidden sm:block w-36 text-right">
              Maturity Level
            </div>
          </div>

          {/* Table Rows */}
          <div className="px-4 sm:px-5">
            {stack.map((row, idx) => (
              <div
                key={row.category}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4 row-hover ${
                  idx < stack.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="w-36 sm:w-48 flex items-center justify-between sm:justify-start gap-2 shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    {row.category}
                  </span>
                  <div className="sm:hidden">
                    <LevelBadge level={row.level} />
                  </div>
                </div>

                <div className="flex-1 flex flex-wrap gap-1.5 py-1">
                  {row.items.map((item) => (
                    <span
                      key={item}
                      className="skill-tag"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="shrink-0 hidden sm:block w-36 text-right">
                  <LevelBadge level={row.level} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
