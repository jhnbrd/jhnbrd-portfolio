import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, Terminal, Activity } from 'lucide-react'
import { personal } from '../data/portfolio'

const NAV_ITEMS = [
  { id: 'projects', label: '~/projects', desc: 'Featured works & client deliverables' },
  { id: 'about', label: '~/about', desc: 'Interactive profile, roles & homelab' },
  { id: 'stack', label: '~/stack', desc: 'Architecture & technology matrix' },
  { id: 'credentials', label: '~/credentials', desc: 'Certifications & competitive record' },
  { id: 'github', label: '~/github', desc: 'Code repositories & activity' },
  { id: 'freedom-wall', label: '~/freedom-wall', desc: 'Simultaneous live chat & transient feed' },
  { id: 'contact', label: '~/contact', desc: 'Direct message & contract inquiries' },
]

export default function MobileNav({ activeSection }) {
  const [open, setOpen] = useState(false)

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="lg:hidden sticky top-0 z-50 bg-background/95 border-b border-border backdrop-blur-md">
      {/* Top Navbar Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <a
          href="#projects"
          onClick={(e) => handleNav(e, 'projects')}
          className="flex items-center gap-2 group"
        >
          <div className="w-6 h-6 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold font-mono group-hover:border-primary transition-colors">
            JB
          </div>
          <span className="text-foreground text-sm font-bold tracking-tight group-hover:text-primary transition-colors">
            jhnbrd<span className="text-primary font-mono">.dev</span>
          </span>
          <span className="text-border text-xs" aria-hidden="true">|</span>
          <span className="text-2xs text-muted-foreground font-mono truncate max-w-[120px] hidden xs:inline">
            operator@mobile
          </span>
        </a>

        <div className="flex items-center gap-2.5">
          {/* Availability badge */}
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-surface border border-border"
            aria-label="Status: available for work"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">available</span>
          </div>

          {/* Hamburger trigger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`p-2 rounded-sm border transition-all duration-150 focus-ring ${
              open
                ? 'bg-primary text-background border-primary shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'bg-surface text-muted-foreground hover:text-foreground border-border'
            }`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Fullscreen Cyberpunk Slide-Down Drawer */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={`transition-all duration-300 ease-out border-b border-border overflow-y-auto ${
          open
            ? 'max-h-[calc(100vh-56px)] opacity-100 bg-background/98 shadow-[0_20px_40px_rgba(0,0,0,0.8)]'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-4 flex flex-col gap-4">
          {/* Active Profile Pill Card */}
          <div className="p-3.5 bg-surface border border-border rounded-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {personal.avatar ? (
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-10 h-10 rounded-full object-cover border border-primary/40 shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm">
                  JB
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">{personal.name}</span>
                <span className="text-xs text-primary font-mono">{personal.title}</span>
              </div>
            </div>

            <a
              href={personal.devjunctionUrl || 'https://facebook.com/DevJunctionInc'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono bg-primary/10 border border-primary/30 text-primary px-2 py-1 rounded-sm flex items-center gap-1 hover:bg-primary hover:text-background transition-colors shrink-0"
            >
              <span>@ DevJunction</span>
              <ArrowUpRight size={11} />
            </a>
          </div>

          {/* Nav list */}
          <div className="flex flex-col gap-1.5">
            <span className="text-2xs font-mono uppercase tracking-widest text-muted-foreground px-2 py-0.5">
              Navigation Index
            </span>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNav(e, item.id)}
                  className={`p-3 rounded-sm border transition-all duration-150 flex items-center justify-between group ${
                    isActive
                      ? 'bg-surface border-primary text-primary shadow-[inset_3px_0_0_#38bdf8]'
                      : 'bg-surface/50 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex flex-col">
                    <span className={`text-sm font-mono font-bold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </div>
                  <span className={`text-xs font-mono transition-transform duration-150 group-hover:translate-x-1 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    ›
                  </span>
                </a>
              )
            })}
          </div>

          {/* Terminal Footer Info in Menu */}
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Terminal size={12} className="text-primary" />
                <span>Node: Client Session</span>
              </span>
              <span className="text-success font-bold">WAF Active</span>
            </div>
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              "{personal.quote}" — <span className="not-italic text-foreground">{personal.quoteAuthor}</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
