import { personal, stats } from '../data/portfolio'

const FALLBACK_AVATAR = null // renders initials block when no image

const NAV_ITEMS = [
  { id: 'projects', label: '~/projects' },
  { id: 'about', label: '~/about' },
  { id: 'stack', label: '~/stack' },
  { id: 'credentials', label: '~/credentials' },
  { id: 'github', label: '~/github' },
  { id: 'contact', label: '~/contact' },
]

export default function Sidebar({ activeSection }) {
  const handleNav = (e, id) => {
    e.preventDefault()
    const container = document.getElementById('scroll-container')
    const el = document.getElementById(id)
    if (!container || !el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-56 z-40 border-r border-border bg-surface flex-col py-8 px-6 gap-8"
      aria-label="Portfolio sidebar"
    >
      {/* Profile */}
      <div className="flex flex-col gap-2">
        {personal.avatar ? (
          <img
            src={personal.avatar}
            alt={personal.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-border transition-[box-shadow,border-color] duration-200 hover:border-primary/60 hover:shadow-[0_0_22px_rgba(56,189,248,0.32)]"
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full bg-accent-dim border-2 border-border flex items-center justify-center text-primary text-xl font-bold select-none transition-[box-shadow,border-color] duration-200 hover:border-primary/60 hover:shadow-[0_0_22px_rgba(56,189,248,0.32)]"
            aria-hidden="true"
          >
            JB
          </div>
        )}
        <div className="mt-1">
          <div className="text-sm text-foreground font-bold leading-tight">{personal.name}</div>
          <div className="text-xs text-primary mt-0.5">{personal.title}</div>
        </div>
      </div>

      {/* Availability status */}
      <div className="flex items-center gap-2" aria-label="Availability: available for work">
        <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0 animate-pulse" aria-hidden="true" />
        <span className="text-xs text-muted-foreground">available for work</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1" aria-label="Portfolio sections">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNav(e, item.id)}
            className={`nav-link focus-ring ${
              activeSection === item.id ? 'nav-link-active' : 'nav-link-inactive'
            }`}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="border-t border-border pt-5 flex flex-col gap-3">
        <div className="text-2xs text-muted-foreground tracking-widest uppercase">Quick Stats</div>
        {[
          { label: 'Projects', value: stats.projects },
          { label: 'Languages', value: stats.languages },
          { label: 'Stack', value: stats.stack },
          { label: 'Machines', value: stats.machines },
        ].map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <span className="text-xs text-primary font-bold">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="mt-auto border-t border-border pt-5 flex flex-col gap-2">
        <p className="text-2xs text-muted-foreground leading-relaxed italic">{personal.quote}</p>
        <span className="text-2xs text-muted-foreground">— {personal.quoteAuthor}</span>
      </div>
    </aside>
  )
}
