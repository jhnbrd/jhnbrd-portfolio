import { useEffect } from 'react'

// Keep document scrolling, anchors and native touch/keyboard navigation intact.
// Wheel gestures advance one section; oversized sections retain normal scrolling.
export default function useSectionScroll(pageRef) {
  useEffect(() => {
    const root = pageRef.current
    if (!root) return
    const panels = [...root.children].filter(node => node.matches('section, footer'))
    document.documentElement.classList.add('section-scroll-enabled')
    let locked = false
    let moving = false
    let quietTimer
    let movementTimer
    let accumulated = 0
    let previousDirection = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const nativeTouch = window.matchMedia('(pointer: coarse)')

    const settle = () => { moving = false }
    const isOverlay = target => {
      if (document.body.style.overflow === 'hidden' || document.querySelector('[aria-modal="true"]')) return true
      for (let node = target; node instanceof Element && node !== root; node = node.parentElement) {
        if (node.matches('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return true
        const style = getComputedStyle(node)
        if (style.position === 'fixed' && style.pointerEvents !== 'none') return true
        if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1) return true
      }
      return false
    }
    const onWheel = event => {
      if (nativeTouch.matches || window.innerWidth < 640 || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY || isOverlay(event.target)) return
      const direction = Math.sign(event.deltaY)
      const viewport = window.innerHeight
      const position = window.scrollY
      const current = panels.reduce((closest, node) => Math.abs(node.offsetTop - position) < Math.abs(closest.offsetTop - position) ? node : closest, panels[0])
      // A panel taller than the viewport must be readable before advancing.
      const containing = panels.find(node => position >= node.offsetTop - 2 && position < node.offsetTop + node.offsetHeight - 2) || current
      const top = containing.offsetTop
      const bottom = top + containing.offsetHeight
      if (!locked && !moving && ((direction > 0 && position + viewport < bottom - 4) || (direction < 0 && position > top + 4))) return

      event.preventDefault()
      clearTimeout(quietTimer)
      quietTimer = setTimeout(() => { locked = false; accumulated = 0 }, 240)
      if (locked || moving) return
      if (previousDirection !== direction) accumulated = 0
      previousDirection = direction
      accumulated += Math.abs(event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport : 1)
      if (accumulated < 12) return
      const index = panels.indexOf(containing)
      const next = panels[index + direction]
      if (!next) return
      locked = true
      moving = true
      accumulated = 0
      next.scrollIntoView({ block: 'start', behavior: reduced.matches ? 'instant' : 'smooth' })
      clearTimeout(movementTimer)
      movementTimer = setTimeout(settle, 1100)
    }
    const suppressContextMenu = event => event.preventDefault()
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scrollend', settle)
    root.addEventListener('contextmenu', suppressContextMenu)
    return () => {
      clearTimeout(quietTimer)
      clearTimeout(movementTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scrollend', settle)
      root.removeEventListener('contextmenu', suppressContextMenu)
      document.documentElement.classList.remove('section-scroll-enabled')
    }
  }, [pageRef])
}
