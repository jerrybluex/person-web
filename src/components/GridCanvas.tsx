import { useEffect, useRef } from 'react'
import { animate, stagger, remove } from 'animejs'

interface GridLine {
  type: 'h' | 'v'
  position: number // X for vertical, Y for horizontal
  progress: number // Animated 0 -> 1 by Anime.js
  length: number
}

interface DataPacket {
  type: 'h' | 'v'
  lineIndex: number
  progress: number // 0 -> 1
  speed: number
  size: number
  direction: 1 | -1
}

export function GridCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Keep mouse state in ref to avoid re-renders and keep canvas animation smooth
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    active: false,
    lerpX: -1000,
    lerpY: -1000,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = container.parentElement || container
    let animationFrameId: number
    let lines: GridLine[] = []
    let dataPackets: DataPacket[] = []

    const gridSize = 60 // Grid spacing in pixels
    const accentColor = '79, 209, 197'
    const baseColor = '243, 247, 244'

    const initCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.scale(dpr, dpr)

      const width = rect.width
      const height = rect.height
      const hLinesCount = Math.ceil(height / gridSize) + 1
      const vLinesCount = Math.ceil(width / gridSize) + 1

      const newLines: GridLine[] = []

      // Create Horizontal Lines
      for (let i = 0; i < hLinesCount; i++) {
        newLines.push({
          type: 'h',
          position: i * gridSize,
          progress: 0,
          length: width
        })
      }

      // Create Vertical Lines
      for (let i = 0; i < vLinesCount; i++) {
        newLines.push({
          type: 'v',
          position: i * gridSize,
          progress: 0,
          length: height
        })
      }

      lines = newLines

      // Animate line drawing with Anime.js v4
      remove(lines)
      animate(lines, {
        progress: 1,
        duration: 2000,
        ease: 'easeOutExpo',
        delay: stagger(40, {
          from: 'center'
        })
      })

      // Create random moving packets along the grid lines
      const packetCount = Math.min(10, Math.floor(width / 180))
      const packets: DataPacket[] = []
      for (let i = 0; i < packetCount; i++) {
        const isHorizontal = Math.random() > 0.5
        packets.push({
          type: isHorizontal ? 'h' : 'v',
          lineIndex: isHorizontal 
            ? Math.floor(Math.random() * hLinesCount) 
            : Math.floor(Math.random() * vLinesCount),
          progress: Math.random(),
          speed: 0.0015 + Math.random() * 0.002,
          size: 1.2 + Math.random() * 1.5,
          direction: Math.random() > 0.5 ? 1 : -1
        })
      }
      dataPackets = packets
    }

    initCanvas()

    // Handle Resize
    const resizeObserver = new ResizeObserver(() => {
      initCanvas()
    })
    resizeObserver.observe(container)

    // Mouse Tracking on the Parent Container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true

      if (mouseRef.current.lerpX === -1000) {
        mouseRef.current.lerpX = mouseRef.current.x
        mouseRef.current.lerpY = mouseRef.current.y
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    parent.addEventListener('mousemove', handleMouseMove)
    parent.addEventListener('mouseleave', handleMouseLeave)

    // Continuous rendering loop
    const render = () => {
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      const mouse = mouseRef.current
      if (mouse.active) {
        mouse.lerpX += (mouse.x - mouse.lerpX) * 0.08
        mouse.lerpY += (mouse.y - mouse.lerpY) * 0.08
      } else {
        mouse.lerpX += (-1000 - mouse.lerpX) * 0.08
        mouse.lerpY += (-1000 - mouse.lerpY) * 0.08
      }

      // Draw mouse radial glow
      const hasGlow = mouse.active || Math.abs(mouse.lerpX - (-1000)) > 1
      if (hasGlow) {
        const glowRadius = 160
        const gradient = ctx.createRadialGradient(
          mouse.lerpX, mouse.lerpY, 0,
          mouse.lerpX, mouse.lerpY, glowRadius
        )
        gradient.addColorStop(0, `rgba(${accentColor}, 0.05)`)
        gradient.addColorStop(0.5, `rgba(${accentColor}, 0.015)`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouse.lerpX, mouse.lerpY, glowRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw Grid Lines
      lines.forEach((line) => {
        if (line.progress === 0) return

        ctx.beginPath()
        let startX = 0, startY = 0, endX = 0, endY = 0

        if (line.type === 'h') {
          startY = line.position
          endY = line.position
          const centerX = w / 2
          const halfLen = (line.length / 2) * line.progress
          startX = centerX - halfLen
          endX = centerX + halfLen
        } else {
          startX = line.position
          endX = line.position
          const centerY = h / 2
          const halfLen = (line.length / 2) * line.progress
          startY = centerY - halfLen
          endY = centerY + halfLen
        }

        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)

        let opacity = 0.035 * line.progress // Base opacity

        if (mouse.active) {
          let dist = 1000
          if (line.type === 'h') {
            if (mouse.lerpX >= startX && mouse.lerpX <= endX) {
              dist = Math.abs(mouse.lerpY - line.position)
            }
          } else {
            if (mouse.lerpY >= startY && mouse.lerpY <= endY) {
              dist = Math.abs(mouse.lerpX - line.position)
            }
          }

          if (dist < 120) {
            const factor = 1 - dist / 120
            opacity += factor * 0.045
          }
        }

        ctx.strokeStyle = `rgba(${accentColor}, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw Grid Intersection Nodes (dots)
      const hCount = Math.ceil(h / gridSize) + 1
      const vCount = Math.ceil(w / gridSize) + 1

      for (let i = 0; i < vCount; i++) {
        const nx = i * gridSize
        for (let j = 0; j < hCount; j++) {
          const ny = j * gridSize

          // Find the lines intersecting at this point to animate dots only if lines exist
          const vLine = lines.find((l) => l.type === 'v' && l.position === nx)
          const hLine = lines.find((l) => l.type === 'h' && l.position === ny)

          if (vLine && hLine && vLine.progress > 0.1 && hLine.progress > 0.1) {
            const minProgress = Math.min(vLine.progress, hLine.progress)
            let dotSize = 1.2
            let dotOpacity = 0.06 * minProgress

            if (mouse.active) {
              const dx = nx - mouse.lerpX
              const dy = ny - mouse.lerpY
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist < 160) {
                const factor = 1 - dist / 160
                dotSize += factor * 1.0
                dotOpacity += factor * 0.12
              }
            }

            ctx.fillStyle = `rgba(${baseColor}, ${dotOpacity})`
            ctx.beginPath()
            ctx.arc(nx, ny, dotSize, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Draw Data Packets
      dataPackets.forEach((packet) => {
        packet.progress += packet.speed * packet.direction
        if (packet.progress > 1) {
          packet.progress = 0
          packet.direction = 1
        } else if (packet.progress < 0) {
          packet.progress = 1
          packet.direction = -1
        }

        let px = 0
        let py = 0
        let isDrawable = false

        if (packet.type === 'h') {
          const line = lines.find((l) => l.type === 'h' && l.position === packet.lineIndex * gridSize)
          if (line && line.progress > 0.2) {
            const startX = (w / 2) - (line.length / 2) * line.progress
            const endX = (w / 2) + (line.length / 2) * line.progress
            px = startX + (endX - startX) * packet.progress
            py = line.position
            isDrawable = true
          }
        } else {
          const line = lines.find((l) => l.type === 'v' && l.position === packet.lineIndex * gridSize)
          if (line && line.progress > 0.2) {
            const startY = (h / 2) - (line.length / 2) * line.progress
            const endY = (h / 2) + (line.length / 2) * line.progress
            px = line.position
            py = startY + (endY - startY) * packet.progress
            isDrawable = true
          }
        }

        if (isDrawable) {
          let opacity = 0.12
          if (mouse.active) {
            const dx = px - mouse.lerpX
            const dy = py - mouse.lerpY
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 120) {
              const factor = 1 - dist / 120
              opacity += factor * 0.2
            }
          }

          ctx.fillStyle = `rgba(${accentColor}, ${opacity})`
          ctx.beginPath()
          ctx.arc(px, py, packet.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      parent.removeEventListener('mousemove', handleMouseMove)
      parent.removeEventListener('mouseleave', handleMouseLeave)
      remove(lines)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Pass-through clicks to underlying content
        zIndex: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
