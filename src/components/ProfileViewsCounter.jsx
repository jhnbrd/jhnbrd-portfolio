import React, { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const STORAGE_KEY = 'jb_real_site_visits_v1'
const SESSION_FLAG = 'jb_real_session_counted_v1'

export default function ProfileViewsCounter({ inline = false, className = '' }) {
  const { isDark } = useTheme()
  const [views, setViews] = useState(() => {
    // Clear legacy mock seed if present
    try {
      localStorage.removeItem('jb_strictly_real_views')
      sessionStorage.removeItem('jb_has_counted_session_v2')
    } catch (e) {}

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
        // Calls server endpoint directly (/api/views)
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
        // Graceful direct fallback if testing locally
      }

      // If running standalone or disconnected from server, fallback to organic local count starting from 0
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
      <span
        className={`inline-flex items-baseline gap-1.5 text-[11px] transition-colors duration-300 ${
          isDark ? 'text-neutral-500' : 'text-neutral-400'
        } ${className}`}
        title="Unique site visits"
      >
        <span className="uppercase tracking-[0.12em]">
          Visitors
        </span>
        <span className={`font-mono font-medium tracking-tight ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
          {views ? views.toLocaleString() : '...'}
        </span>
      </span>
    )
  }

  return (
    <div className={`flex items-center justify-between font-mono text-xs ${className}`}>
      <span className="text-neutral-400 flex items-center gap-1.5">
        <Eye size={12} className="text-emerald-500" />
        <span>Site Visits</span>
      </span>
      <span className="font-bold text-white font-mono">
        {views ? views.toLocaleString() : '...'}
      </span>
    </div>
  )
}
