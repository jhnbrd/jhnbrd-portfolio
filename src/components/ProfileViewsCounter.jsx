import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

const STORAGE_KEY = 'jb_strictly_real_views'
const SESSION_FLAG = 'jb_has_counted_session_v2'

export default function ProfileViewsCounter({ inline = false }) {
  const [views, setViews] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? parseInt(saved, 10) : 0
  })

  useEffect(() => {
    let isMounted = true

    async function fetchRealViews() {
      // Determine if this browser session was already counted (prevent counting +1 on every page reload)
      const hasCountedSession = sessionStorage.getItem(SESSION_FLAG)
      const method = hasCountedSession ? 'GET' : 'POST'

      try {
        // Calls your own server endpoint directly through Cloudflare (/api/views)
        const res = await fetch('/api/views', {
          method,
          headers: { 'Content-Type': 'application/json' },
        })

        if (res.ok) {
          const data = await res.json()
          if (isMounted && data && typeof data.views === 'number') {
            setViews(data.views)
            localStorage.setItem(STORAGE_KEY, String(data.views))
            sessionStorage.setItem(SESSION_FLAG, 'true')
            return
          }
        }
      } catch (err) {
        // Graceful direct localhost fallback if testing locally
      }

      // If running standalone or disconnected from server, fallback to pure organic local count
      if (isMounted) {
        let localCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
        if (!hasCountedSession) {
          localCount += 1
          localStorage.setItem(STORAGE_KEY, String(localCount))
          sessionStorage.setItem(SESSION_FLAG, 'true')
        }
        setViews(localCount)
      }
    }

    fetchRealViews()

    return () => {
      isMounted = false
    }
  }, [])

  if (inline) {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-surface border border-border px-2.5 py-1 rounded-sm">
        <Eye size={13} className="text-primary animate-pulse" />
        <span>Views:</span>
        <span className="text-foreground font-bold font-mono">
          {views.toLocaleString()}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between font-mono text-xs">
      <span className="text-muted-foreground flex items-center gap-1.5">
        <Eye size={12} className="text-primary" />
        <span>Profile Views</span>
      </span>
      <span className="text-primary font-bold">
        {views.toLocaleString()}
      </span>
    </div>
  )
}
