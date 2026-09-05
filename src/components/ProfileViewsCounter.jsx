import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

const COUNTAPI_NAMESPACE = 'jhnbrd-portfolio-views'
const COUNTAPI_KEY = 'visits'
const STORAGE_KEY = 'jb_portfolio_profile_views'
const SEED_COUNT = 1420

export default function ProfileViewsCounter({ inline = false }) {
  const [views, setViews] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? parseInt(saved, 10) : SEED_COUNT
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchViews() {
      try {
        // Attempt to fetch from counter service, or gracefully fall back to persistent localStorage
        const res = await fetch(`https://api.counterapi.dev/v1/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}/up`)
        if (res.ok) {
          const data = await res.json()
          if (isMounted && data && typeof data.count === 'number') {
            const total = Math.max(data.count + SEED_COUNT, views)
            setViews(total)
            localStorage.setItem(STORAGE_KEY, String(total))
            setLoading(false)
            return
          }
        }
      } catch (err) {
        // Graceful fallback if offline or network blocks third-party counter
      }

      // Local persistent fallback increment
      if (isMounted) {
        const hasCountedSession = sessionStorage.getItem('jb_has_visited_session')
        let current = parseInt(localStorage.getItem(STORAGE_KEY) || String(SEED_COUNT), 10)
        if (!hasCountedSession) {
          current += 1
          localStorage.setItem(STORAGE_KEY, String(current))
          sessionStorage.setItem('jb_has_visited_session', 'true')
        }
        setViews(current)
        setLoading(false)
      }
    }

    fetchViews()
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
