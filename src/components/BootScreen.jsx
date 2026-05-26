import { useEffect, useState, useCallback } from 'react'

const BOOT_LINES = [
  { id: 0, text: 'kernel: jhnbrd-portfolio v1.0.0 loaded', ts: '0.001', ok: false, delay: 100 },
  { id: 1, text: 'cpu: Ryzen 5 7535HS detected', ts: '0.143', ok: false, delay: 350 },
  { id: 2, text: 'profile: jhianne.berida', ts: '0.284', ok: true, delay: 600 },
  { id: 3, text: 'reading /dev/credentials', ts: '0.421', ok: true, delay: 850 },
  { id: 4, text: 'mounting project filesystem', ts: '0.557', ok: true, delay: 1100 },
  { id: 5, text: 'initializing network stack', ts: '0.694', ok: true, delay: 1350 },
  { id: 6, text: 'compiling assets', ts: '0.830', ok: true, delay: 1550 },
  { id: 7, text: 'launching ui daemon', ts: '0.967', ok: true, delay: 1750 },
]

const READY_DELAY = 2050
const EXIT_DELAY = 2650

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [showReady, setShowReady] = useState(false)
  const [exiting, setExiting] = useState(false)

  const triggerExit = useCallback(() => {
    setExiting(true)
    setTimeout(() => onComplete(), 600)
  }, [onComplete])

  useEffect(() => {
    const timers = []

    BOOT_LINES.forEach((line) => {
      timers.push(setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.id])
      }, line.delay))
    })

    timers.push(setTimeout(() => setShowReady(true), READY_DELAY))
    timers.push(setTimeout(() => triggerExit(), EXIT_DELAY))

    return () => timers.forEach(clearTimeout)
  }, [triggerExit])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
        exiting ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
      }`}
      onClick={triggerExit}
      role="dialog"
      aria-label="Portfolio loading"
      aria-busy={!showReady}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines" aria-hidden="true" />

      <div className="w-full max-w-2xl px-6 sm:px-0 font-mono select-none">
        {/* Header */}
        <div className="border border-border bg-surface rounded-sm mb-6 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-background">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-muted" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted" />
            </div>
            <span className="text-xs text-muted-foreground ml-1">portfolio.exe — boot sequence</span>
          </div>
          <div className="px-5 py-4">
            <div className="text-primary text-sm font-bold mb-1">JHNBRD.DEV — PORTFOLIO OS v1.0.0</div>
            <div className="text-xs text-muted-foreground">
              Copyright © 2026 Jhianne Berida. All systems reserved.
            </div>
          </div>
        </div>

        {/* Boot lines */}
        <div className="space-y-1.5 mb-4" aria-live="polite">
          {BOOT_LINES.map((line) => (
            <div
              key={line.id}
              className={`flex items-baseline gap-3 text-xs transition-all duration-300 ${
                visibleLines.includes(line.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-1'
              }`}
              aria-hidden={!visibleLines.includes(line.id)}
            >
              <span className="text-border shrink-0 tabular-nums">[{line.ts}]</span>
              <span className="flex-1 text-muted-foreground">{line.text}</span>
              {line.ok && visibleLines.includes(line.id) && (
                <span className="text-success font-bold shrink-0">[&nbsp;OK&nbsp;]</span>
              )}
            </div>
          ))}
        </div>

        {/* Ready state */}
        <div
          className={`transition-all duration-400 ${
            showReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="border-t border-border pt-4 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-primary">jhianne@portfolio</span>
              <span className="text-muted-foreground">~$</span>
              <span className="text-foreground">./launch portfolio.exe</span>
              <span className="inline-block w-2 h-4 bg-primary cursor-blink ml-1" aria-hidden="true" />
            </div>
            <p className="text-2xs text-muted-foreground mt-3">
              System ready — launching interface...&nbsp;
              <span className="text-border">(click anywhere to skip)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
