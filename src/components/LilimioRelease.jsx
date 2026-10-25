import { useEffect, useState } from 'react'

const endpoint = 'https://api.github.com/repos/jhnbrd/lilimio/releases/latest'
const releasesUrl = 'https://github.com/jhnbrd/lilimio/releases'
const cacheKey = 'lilimio-latest-release-v1'
const refreshAfter = 15 * 60 * 1000
const dateFormat = new Intl.DateTimeFormat('en-PH', {
  timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric',
  hour: 'numeric', minute: '2-digit', hour12: true,
})

function validRelease(value) {
  return value && typeof value.published_at === 'string'
    && Number.isFinite(Date.parse(value.published_at))
    && typeof value.html_url === 'string'
    && value.html_url.startsWith(`${releasesUrl}/tag/`)
}

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey))
    return validRelease(cached?.release) && Number.isFinite(cached.fetchedAt) ? cached : null
  } catch { return null }
}

export default function LilimioRelease() {
  const [release, setRelease] = useState(() => readCache()?.release || null)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    let disposed = false
    let pending = false
    let controller
    let lastFetched = readCache()?.fetchedAt || 0
    const refresh = async () => {
      if (document.hidden || pending || Date.now() - lastFetched < refreshAfter) return
      pending = true
      controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      try {
        const response = await fetch(endpoint, {
          headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal,
        })
        if (!response.ok) throw new Error('Release request unavailable')
        const data = await response.json()
        if (!validRelease(data) || data.draft || data.prerelease) throw new Error('No published release')
        if (disposed) return
        const latest = { published_at: data.published_at, html_url: data.html_url }
        lastFetched = Date.now()
        setRelease(latest)
        setUnavailable(false)
        try { localStorage.setItem(cacheKey, JSON.stringify({ release: latest, fetchedAt: lastFetched })) } catch { /* Storage is optional. */ }
      } catch {
        if (!disposed) setUnavailable(true)
      } finally {
        clearTimeout(timeout)
        pending = false
      }
    }
    refresh()
    const interval = setInterval(refresh, refreshAfter)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      disposed = true
      controller?.abort()
      clearInterval(interval)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])

  return (
    <p className="lilimio-updated">
      <a href={release?.html_url || releasesUrl} target="_blank" rel="noopener noreferrer">
        {release ? <>
          Last updated · <time dateTime={release.published_at}>{dateFormat.format(new Date(release.published_at))} PHT</time>
        </> : unavailable ? 'Release date unavailable · View releases ↗' : 'Checking latest release…'}
      </a>
    </p>
  )
}
