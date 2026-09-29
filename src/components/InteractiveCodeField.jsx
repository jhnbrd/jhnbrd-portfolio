import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const GLYPHS = ['0', '1', '{}', '[]', '//', '=>', ';', '&&', '()', '!=', '::', 'nil', '0x1']

export default function InteractiveCodeField() {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
    if (!context) return undefined
    const pointer = { x: -1000, y: -1000 }
    let shards = []
    let frame

    const resize = () => {
      const ratio = Math.min(devicePixelRatio || 1, 2)
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const count = width < 640 ? 32 : 66
      shards = Array.from({ length: count }, () => {
        const x = Math.random() * width
        const y = Math.random() * height
        return {
          x, y, homeX: x, homeY: y, vx: 0, vy: 0,
          glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          size: 10 + Math.random() * 5,
          accent: Math.random() < 0.32,
          alpha: 0.18 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
        }
      })
    }
    const locate = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = clientX - rect.left
      pointer.y = clientY - rect.top
    }
    const onMove = (event) => locate(event.clientX, event.clientY)
    const onTouch = (event) => {
      if (event.touches?.[0]) locate(event.touches[0].clientX, event.touches[0].clientY)
    }
    const onLeave = () => {
      pointer.x = -1000
      pointer.y = -1000
    }

    const draw = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      context.clearRect(0, 0, width, height)
      shards.forEach((shard) => {
        shard.phase += reduceMotion ? 0 : 0.006
        const targetX = shard.homeX + Math.sin(shard.phase) * 11
        const targetY = shard.homeY + Math.cos(shard.phase * 0.8) * 11
        const dx = shard.x - pointer.x
        const dy = shard.y - pointer.y
        const distance = Math.hypot(dx, dy)
        const radius = 150
        if (!reduceMotion && distance < radius && distance > 0) {
          const force = ((radius - distance) / radius) * 3.2
          shard.vx += (dx / distance) * force
          shard.vy += (dy / distance) * force
        }
        shard.vx = (shard.vx + (targetX - shard.x) * 0.045) * 0.91
        shard.vy = (shard.vy + (targetY - shard.y) * 0.045) * 0.91
        shard.x += shard.vx
        shard.y += shard.vy
        const boost = distance < radius ? (1 - distance / radius) * 0.5 : 0
        context.font = `${shard.size}px ui-monospace, monospace`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillStyle = shard.accent || distance < radius
          ? `rgba(0,229,255,${Math.min(0.95, shard.alpha + boost)})`
          : `rgba(255,255,255,${Math.min(0.62, shard.alpha + boost)})`
        context.fillText(shard.glyph, shard.x, shard.y)
      })
      frame = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [reduceMotion])

  return <canvas ref={canvasRef} className="hero-code-field" aria-hidden="true" />
}
