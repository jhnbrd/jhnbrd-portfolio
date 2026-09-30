import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

function createRandom(seed) {
  let value = seed >>> 0
  return () => {
    value += 0x6d2b79f5
    let result = value
    result = Math.imul(result ^ (result >>> 15), result | 1)
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61)
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296
  }
}

export default function InteractiveCodeField() {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const pointer = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      strength: 0,
      targetStrength: 0,
    }

    let nodes = []
    let width = 0
    let height = 0
    let connectionDistance = 150
    let frame

    const createMesh = () => {
      const compact = width < 640
      const columns = compact ? 8 : 13
      const rows = compact ? 8 : 9
      const random = createRandom(Math.round(width * 29 + height * 47))
      const cellWidth = width / columns
      const cellHeight = height / rows
      const nextNodes = []

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          if (random() < (compact ? 0.13 : 0.11)) continue

          const x = (column + 0.5) * cellWidth + (random() - 0.5) * cellWidth * 0.72
          const y = (row + 0.5) * cellHeight + (random() - 0.5) * cellHeight * 0.72
          const bright = random() < 0.2

          nextNodes.push({
            homeX: x,
            homeY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            phase: random() * Math.PI * 2,
            driftX: 5 + random() * 10,
            driftY: 4 + random() * 8,
            speed: 0.55 + random() * 0.7,
            size: bright ? 2 + random() * 1.05 : 0.95 + random() * 0.85,
            alpha: bright ? 0.9 : 0.38 + random() * 0.34,
            bright,
            hover: 0,
          })
        }
      }

      nodes = nextNodes
      connectionDistance = compact
        ? Math.min(145, Math.max(105, width * 0.32))
        : Math.min(225, Math.max(165, width * 0.14))
    }

    const updateNodes = (time) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.16
      pointer.y += (pointer.targetY - pointer.y) * 0.16
      pointer.strength += (pointer.targetStrength - pointer.strength) * 0.09

      nodes.forEach((node) => {
        const motion = reduceMotion ? 0 : time * 0.00016 * node.speed
        let targetX = node.homeX + Math.sin(motion + node.phase) * node.driftX
        let targetY = node.homeY + Math.cos(motion * 0.86 + node.phase) * node.driftY

        const dx = pointer.x - targetX
        const dy = pointer.y - targetY
        const distance = Math.hypot(dx, dy)
        const influenceRadius = 245
        const hoverTarget = distance < influenceRadius
          ? (1 - distance / influenceRadius) * pointer.strength
          : 0
        node.hover += (hoverTarget - node.hover) * 0.13

        if (!reduceMotion && distance < influenceRadius && distance > 0) {
          const attraction = Math.pow(1 - distance / influenceRadius, 1.55) * 48 * pointer.strength
          targetX += (dx / distance) * attraction
          targetY += (dy / distance) * attraction
        }

        node.vx = (node.vx + (targetX - node.x) * 0.042) * 0.9
        node.vy = (node.vy + (targetY - node.y) * 0.042) * 0.9
        node.x += node.vx
        node.y += node.vy
      })
    }

    const drawConnections = () => {
      const degrees = new Array(nodes.length).fill(0)
      const candidates = []

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const dx = nodes[first].x - nodes[second].x
          const dy = nodes[first].y - nodes[second].y
          const distance = Math.hypot(dx, dy)
          if (distance < connectionDistance) {
            candidates.push({ first, second, distance })
          }
        }
      }

      candidates.sort((a, b) => a.distance - b.distance)
      candidates.forEach(({ first, second, distance }) => {
        if (degrees[first] >= 4 || degrees[second] >= 4) return
        degrees[first] += 1
        degrees[second] += 1

        const proximity = 1 - distance / connectionDistance
        const emphasized = nodes[first].bright || nodes[second].bright
        const hoverBoost = Math.max(nodes[first].hover, nodes[second].hover)
        const alpha = Math.min(0.9, proximity * (emphasized ? 0.5 : 0.3) + hoverBoost * 0.42)
        const gradient = context.createLinearGradient(
          nodes[first].x,
          nodes[first].y,
          nodes[second].x,
          nodes[second].y
        )
        gradient.addColorStop(0, `rgba(0, 229, 255, ${alpha * nodes[first].alpha})`)
        gradient.addColorStop(0.5, `rgba(56, 189, 248, ${alpha})`)
        gradient.addColorStop(1, `rgba(0, 229, 255, ${alpha * nodes[second].alpha})`)

        context.beginPath()
        context.moveTo(nodes[first].x, nodes[first].y)
        context.lineTo(nodes[second].x, nodes[second].y)
        context.strokeStyle = gradient
        context.lineWidth = (emphasized ? 1.15 : 0.75) + hoverBoost * 0.9
        context.shadowColor = emphasized || hoverBoost > 0.15
          ? 'rgba(0, 229, 255, 0.48)'
          : 'transparent'
        context.shadowBlur = emphasized || hoverBoost > 0.15 ? 7 + hoverBoost * 7 : 0
        context.stroke()
        context.shadowBlur = 0
      })
    }

    const drawPointerLinks = () => {
      if (pointer.strength < 0.02) return

      const nearest = nodes
        .map((node) => ({
          node,
          distance: Math.hypot(node.x - pointer.x, node.y - pointer.y),
        }))
        .filter(({ distance }) => distance < 235)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)

      nearest.forEach(({ node, distance }) => {
        const alpha = (1 - distance / 235) * 0.62 * pointer.strength
        const gradient = context.createLinearGradient(pointer.x, pointer.y, node.x, node.y)
        gradient.addColorStop(0, `rgba(186, 247, 255, ${alpha})`)
        gradient.addColorStop(1, `rgba(0, 229, 255, ${alpha * 0.18})`)
        context.beginPath()
        context.moveTo(pointer.x, pointer.y)
        context.lineTo(node.x, node.y)
        context.strokeStyle = gradient
        context.lineWidth = 1.05
        context.stroke()
      })
    }

    const drawPointerAura = () => {
      if (pointer.strength < 0.02) return

      const radius = 125
      const aura = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        radius
      )
      aura.addColorStop(0, `rgba(0, 229, 255, ${0.12 * pointer.strength})`)
      aura.addColorStop(0.45, `rgba(0, 229, 255, ${0.045 * pointer.strength})`)
      aura.addColorStop(1, 'rgba(0, 229, 255, 0)')
      context.fillStyle = aura
      context.fillRect(pointer.x - radius, pointer.y - radius, radius * 2, radius * 2)
    }

    const drawNodes = (time) => {
      nodes.forEach((node) => {
        const pulse = reduceMotion
          ? 1
          : 0.86 + Math.sin(time * 0.0014 * node.speed + node.phase) * 0.14
        const alpha = Math.min(1, node.alpha * pulse + node.hover * 0.42)
        const hoverScale = 1 + node.hover * 1.35
        const glowRadius = 19 + node.hover * 22

        if (node.bright || node.hover > 0.08) {
          const glow = context.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            glowRadius
          )
          glow.addColorStop(0, `rgba(103, 232, 249, ${alpha * (0.5 + node.hover * 0.28)})`)
          glow.addColorStop(1, 'rgba(0, 229, 255, 0)')
          context.fillStyle = glow
          context.fillRect(
            node.x - glowRadius,
            node.y - glowRadius,
            glowRadius * 2,
            glowRadius * 2
          )
        }

        context.beginPath()
        context.arc(node.x, node.y, node.size * pulse * hoverScale, 0, Math.PI * 2)
        context.fillStyle = node.bright
          ? `rgba(186, 247, 255, ${alpha})`
          : `rgba(0, 229, 255, ${alpha})`
        context.fill()
      })
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)
      updateNodes(time)
      drawPointerAura()
      drawConnections()
      drawPointerLinks()
      drawNodes(time)
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      createMesh()
      draw(performance.now())
    }

    const locate = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      if (pointer.targetStrength < 0.01) {
        pointer.x = x
        pointer.y = y
      }
      pointer.targetX = x
      pointer.targetY = y
      pointer.targetStrength = 1
    }

    const onMove = (event) => locate(event.clientX, event.clientY)
    const onTouch = (event) => {
      if (event.touches?.[0]) locate(event.touches[0].clientX, event.touches[0].clientY)
    }
    const onLeave = () => {
      pointer.targetStrength = 0
    }

    const animate = (time) => {
      draw(time)
      frame = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)

    if (!reduceMotion) {
      frame = requestAnimationFrame(animate)
      window.addEventListener('mousemove', onMove)
      document.addEventListener('mouseleave', onLeave)
      window.addEventListener('touchmove', onTouch, { passive: true })
      window.addEventListener('touchend', onLeave)
    }

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
