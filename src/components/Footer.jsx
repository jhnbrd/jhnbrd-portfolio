export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 sm:px-10 lg:px-12 py-5 flex items-center justify-between flex-wrap gap-3">
      <div className="text-xs text-muted-foreground">
        © 2026 Jhianne Berida
        <span className="mx-2 text-border">·</span>
        Davao City, Philippines
      </div>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
        <span className="text-xs text-muted-foreground">v1.0.0 · all systems nominal</span>
      </div>
      <div className="text-xs text-muted-foreground">
        built with React · Vite ·{' '}
        <span className="text-primary" aria-label="love">♥</span>
      </div>
    </footer>
  )
}
