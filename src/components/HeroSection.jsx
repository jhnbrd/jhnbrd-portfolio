import { personal } from '../data/portfolio'

const NODES = [
  { cx: 120, cy: 80, r: 14, filled: true },
  { cx: 340, cy: 50, r: 8, filled: false },
  { cx: 580, cy: 120, r: 8, filled: false },
  { cx: 780, cy: 60, r: 8, filled: false },
  { cx: 960, cy: 110, r: 14, filled: true },
  { cx: 1180, cy: 70, r: 8, filled: true },
  { cx: 1350, cy: 100, r: 8, filled: false },
  { cx: 200, cy: 200, r: 8, filled: false },
  { cx: 460, cy: 220, r: 14, filled: true },
  { cx: 680, cy: 180, r: 8, filled: false },
  { cx: 880, cy: 230, r: 8, filled: true },
  { cx: 1080, cy: 190, r: 8, filled: false },
  { cx: 1280, cy: 210, r: 14, filled: true },
  { cx: 80, cy: 340, r: 8, filled: false },
  { cx: 300, cy: 310, r: 8, filled: false },
  { cx: 540, cy: 360, r: 8, filled: true },
  { cx: 740, cy: 300, r: 14, filled: true },
  { cx: 1000, cy: 350, r: 8, filled: false },
  { cx: 1200, cy: 320, r: 8, filled: false },
  { cx: 1400, cy: 360, r: 8, filled: false },
  { cx: 160, cy: 460, r: 14, filled: true },
  { cx: 420, cy: 430, r: 8, filled: false },
  { cx: 640, cy: 480, r: 8, filled: false },
  { cx: 860, cy: 440, r: 8, filled: false },
  { cx: 1140, cy: 460, r: 14, filled: true },
  { cx: 1340, cy: 480, r: 8, filled: true },
]

const EDGES = [
  [120, 80, 340, 50], [340, 50, 580, 120], [580, 120, 780, 60], [780, 60, 960, 110],
  [960, 110, 1180, 70], [1180, 70, 1350, 100],
  [120, 80, 200, 200], [340, 50, 200, 200], [340, 50, 460, 220], [580, 120, 460, 220],
  [580, 120, 680, 180], [780, 60, 680, 180], [780, 60, 880, 230], [960, 110, 880, 230],
  [960, 110, 1080, 190], [1180, 70, 1080, 190], [1180, 70, 1280, 210], [1350, 100, 1280, 210],
  [200, 200, 80, 340], [200, 200, 300, 310], [460, 220, 300, 310], [460, 220, 540, 360],
  [680, 180, 540, 360], [680, 180, 740, 300], [880, 230, 740, 300], [880, 230, 1000, 350],
  [1080, 190, 1000, 350], [1080, 190, 1200, 320], [1280, 210, 1200, 320], [1280, 210, 1400, 360],
  [80, 340, 160, 460], [300, 310, 160, 460], [300, 310, 420, 430], [540, 360, 420, 430],
  [540, 360, 640, 480], [740, 300, 640, 480], [740, 300, 860, 440], [1000, 350, 860, 440],
  [1000, 350, 1140, 460], [1200, 320, 1140, 460], [1200, 320, 1340, 480], [1400, 360, 1340, 480],
  [160, 460, 420, 430], [420, 430, 640, 480], [640, 480, 860, 440], [860, 440, 1140, 460],
  [1140, 460, 1340, 480],
]

const NAV_ITEMS = [
  { id: 'projects', label: '~/projects' },
  { id: 'about', label: '~/about' },
  { id: 'stack', label: '~/stack' },
  { id: 'credentials', label: '~/credentials' },
  { id: 'github', label: '~/github' },
  { id: 'contact', label: '~/contact' },
]

export default function HeroSection({ activeSection }) {
  const handleNav = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative overflow-hidden border-b border-border" style={{ height: '420px' }}>
      {/* Network SVG Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 540"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <radialGradient id="nodeglow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Static edges */}
          {EDGES.map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#38bdf8"
              strokeOpacity={0.04 + (i % 3) * 0.035}
              strokeWidth="1"
            />
          ))}

          {/* Animated flowing edges — every 6th edge gets a dash-flow */}
          {EDGES.filter((_, i) => i % 6 === 0).map(([x1, y1, x2, y2], i) => (
            <line
              key={`flow-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#38bdf8"
              strokeOpacity={0.18}
              strokeWidth="1"
              className="edge-flow"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}

          {/* Nodes */}
          {NODES.map((n, i) => (
            <g key={i}>
              {/* Glow halo */}
              <circle cx={n.cx} cy={n.cy} r={n.r} fill="url(#nodeglow)" />
              {/* Core dot */}
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.filled ? 3 : 2}
                fill={n.filled ? '#38bdf8' : '#1e5e80'}
                opacity={n.filled ? 1 : 0.7}
              />
              {/* Pulse ring on filled nodes */}
              {n.filled && (
                <circle cx={n.cx} cy={n.cy} r={n.r} fill="none" stroke="#38bdf8" strokeWidth="1">
                  <animate
                    attributeName="r"
                    values={`${n.r};${n.r * 2.8};${n.r}`}
                    dur={`${2.5 + i * 0.25}s`}
                    repeatCount="indefinite"
                    begin={`${(i * 0.4) % 2}s`}
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.45;0;0.45"
                    dur={`${2.5 + i * 0.25}s`}
                    repeatCount="indefinite"
                    begin={`${(i * 0.4) % 2}s`}
                  />
                </circle>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, #0a0c10 0%, rgba(10,12,16,0.5) 50%, #0a0c10 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,12,16,0.3) 0%, #0a0c10 100%)',
        }}
        aria-hidden="true"
      />

      {/* Desktop Top Navbar — only visible inside hero on large screens */}
      <div
        className="absolute top-0 left-0 right-0 hidden lg:flex items-center justify-between px-10 py-4 border-b border-border"
        style={{ background: 'rgba(10,12,16,0.85)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-primary text-sm font-bold">JB.dev</span>
          <span className="text-border text-xs">|</span>
          <span className="text-muted-foreground text-xs">jhianne@portfolio:~</span>
        </div>
        <nav className="flex items-center gap-6" aria-label="Top navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNav(e, item.id)}
              className={`text-xs transition-colors duration-150 focus-ring rounded-sm ${
                activeSection === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">sys: nominal</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-12 pb-10">
        <div className="terminal-prompt mb-3">
          <span className="text-primary">jhianne@portfolio</span>
          <span className="text-muted-foreground">~$</span>
          <span className="text-foreground">whoami</span>
          <span className="inline-block w-2 h-4 bg-primary ml-1 cursor-blink" aria-hidden="true" />
        </div>
        <h1
          className="font-bold text-foreground leading-none mb-3"
          style={{ fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '-1px' }}
        >
          {personal.name}
        </h1>
        <p className="text-primary text-base sm:text-lg tracking-wide mb-2">
          {personal.title}
        </p>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed">
          {personal.tagline}
          <span className="mx-2 text-border">·</span>
          TESDA COC 1 · IT Specialist · Homelab Admin
        </p>
      </div>

      {/* Status Badges — top right, floating */}
      <div className="absolute top-16 right-4 sm:right-8 flex-col items-end gap-2 hidden sm:flex" aria-hidden="true">
        {[
          { label: '127.0.0.1:3000', dur: '4s', delay: '0s' },
          { label: 'socket: active',  dur: '5s', delay: '0.8s' },
          { label: 'port 22 · ssh',   dur: '3.5s', delay: '1.6s' },
        ].map(({ label, dur, delay }, i) => (
          <div
            key={label}
            className="flex items-center gap-2 border border-border bg-background px-3 py-1 rounded-sm float-chip"
            style={{
              opacity: 0.7 - i * 0.15,
              '--float-dur': dur,
              '--float-delay': delay,
            }}
          >
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <span className="text-2xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
