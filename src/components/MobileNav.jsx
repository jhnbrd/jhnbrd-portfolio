import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { personal } from '../data/portfolio'

const NAV_ITEMS = [
  { id: 'about', label: '~/about' },
  { id: 'projects', label: '~/projects' },
  { id: 'stack', label: '~/stack' },
  { id: 'credentials', label: '~/credentials' },
  { id: 'github', label: '~/github' },
  { id: 'contact', label: '~/contact' },
]

export default function MobileNav({ activeSection }) {
  const [open, setOpen] = useState(false)

  const handleNav = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    /* sticky top-0 — sticks to top of the #scroll-container */
    <header className="lg:hidden sticky top-0 z-50 bg-background/95 border-b border-border backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-primary text-sm font-bold">JB.dev</span>
          <span className="text-border text-xs" aria-hidden="true">|</span>
          <span className="text-muted-foreground text-xs hidden sm:inline">jhianne@portfolio:~</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-label="Status: available for work">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
            <span className="text-xs text-muted-foreground hidden sm:block">available</span>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="p-1.5 text-muted-foreground hover:text-foreground focus-ring rounded-sm transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Dropdown menu */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-border bg-surface px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNav(e, item.id)}
              className={`nav-link text-sm focus-ring ${
                activeSection === item.id ? 'nav-link-active' : 'nav-link-inactive'
              }`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-2xs text-muted-foreground italic leading-relaxed">{personal.quote}</p>
            <span className="text-2xs text-muted-foreground">— {personal.quoteAuthor}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
