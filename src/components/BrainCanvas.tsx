import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

interface BrainNode {
  baseX: number
  baseY: number
  baseZ: number
  x: number // Current 3D X (including float offset)
  y: number // Current 3D Y (including float offset)
  z: number // Current 3D Z (including float offset)
  projectedX: number
  projectedY: number
  projectedZ: number
  phaseX: number
  phaseY: number
  floatSpeed: number
  size: number
  opacity: number // Animated 0 -> 1 by Anime.js on bootup
  scale: number   // Animated 0 -> 1 by Anime.js on bootup
  neighbors: number[]
  hemisphere: 'left' | 'right'
}

interface SynapseSignal {
  currentNodeIndex: number
  targetNodeIndex: number
  progress: number // 0 -> 1
  speed: number
  size: number
}

export function BrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Keep mouse coordinates in a ref for smooth frame-by-frame interpolation
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
    let nodes: BrainNode[] = []
    let signals: SynapseSignal[] = []
    
    // 3D rotation angles
    let angleY = 0
    const angleX = 0.25 // Constant slight downward tilt to view hemispheres from the top-front

    let globalTime = 0
    const canvasSize = 400
    const accentColor = '47, 91, 234' // RGB of --color-steel (#2f5bea - cobalt)
    const connectionDist = 38        // Max 3D distance to form a neural line (scaled up with radius)

    const initBrain = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      // Keep aspect ratio 1:1, bounded by container size or max 400px
      const size = Math.min(canvasSize, rect.width)
      canvas.width = size * dpr
      canvas.height = size * dpr
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`

      ctx.scale(dpr * (size / canvasSize), dpr * (size / canvasSize))

      // Generate 3D Spherical Left/Right Brain Hemisphere Nodes (scaled up by ~1.2x)
      const tempNodes: BrainNode[] = []
      const latBands = 13
      const lonBands = 13
      const R = 115 // Sphere base radius

      for (let lat = 1; lat < latBands; lat++) {
        const theta = (lat / latBands) * Math.PI
        const sinTheta = Math.sin(theta)
        const cosTheta = Math.cos(theta)

        // Number of points in this band increases near equator
        const numPoints = Math.round(lonBands * sinTheta * 1.5)
        for (let lon = 0; lon < numPoints; lon++) {
          const phi = (lon / numPoints) * 2 * Math.PI
          const sinPhi = Math.sin(phi)
          const cosPhi = Math.cos(phi)

          // 3D Spherical coordinates
          const nx = sinTheta * cosPhi
          const ny = cosTheta
          const nz = sinTheta * sinPhi

          // Brain-like gyri (folds) modulation
          // We combine high frequency sine/cosine waves across all axes
          const fold = 0.15 * Math.sin(nx * 6.5) * Math.cos(ny * 6.5) * Math.sin(nz * 6.5)
          const r = R * (1 + fold)

          // Elongate front-to-back (Z-axis) and scale width (X-axis) to look like a real brain shape
          let px = nx * r * 0.90  // Width
          let py = ny * r * 0.85  // Height
          let pz = nz * r * 1.15  // Length (front-to-back)

          // Separating left/right hemispheres to form the longitudinal fissure (midline gap)
          const gap = 9
          const hemisphere = px < 0 ? 'left' : 'right'
          if (hemisphere === 'left') {
            px -= gap
          } else {
            px += gap
          }

          // Add surface node
          tempNodes.push({
            baseX: px,
            baseY: py,
            baseZ: pz,
            x: px,
            y: py,
            z: pz,
            projectedX: 0,
            projectedY: 0,
            projectedZ: 0,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            floatSpeed: 0.015 + Math.random() * 0.015,
            size: 1.1 + Math.random() * 0.8,
            opacity: 0,
            scale: 0,
            neighbors: [],
            hemisphere
          })

          // 35% chance to add deep nodes inside the hemisphere to create a volumetric 3D network
          if (Math.random() < 0.35) {
            tempNodes.push({
              baseX: px * 0.72,
              baseY: py * 0.72,
              baseZ: pz * 0.72,
              x: px * 0.72,
              y: py * 0.72,
              z: pz * 0.72,
              projectedX: 0,
              projectedY: 0,
              projectedZ: 0,
              phaseX: Math.random() * Math.PI * 2,
              phaseY: Math.random() * Math.PI * 2,
              floatSpeed: 0.015 + Math.random() * 0.015,
              size: 0.8 + Math.random() * 0.5,
              opacity: 0,
              scale: 0,
              neighbors: [],
              hemisphere
            })
          }
        }
      }

      nodes = tempNodes

      // Pre-compute neighbors for 3D connections
      // We only connect neighbors within the same hemisphere to keep the middle gap clean and visible!
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i]
          const nodeB = nodes[j]

          if (nodeA.hemisphere === nodeB.hemisphere) {
            const dx = nodeA.baseX - nodeB.baseX
            const dy = nodeA.baseY - nodeB.baseY
            const dz = nodeA.baseZ - nodeB.baseZ
            const distSq = dx * dx + dy * dy + dz * dz
            if (distSq < connectionDist * connectionDist) {
              nodeA.neighbors.push(j)
              nodeB.neighbors.push(i)
            }
          }
        }
      }

      // Animate Bootup using Anime.js (expanding scale and fading opacity)
      animate(nodes, {
        scale: 1,
        opacity: 1,
        duration: 1600,
        ease: 'easeOutExpo',
        delay: stagger(6, {
          from: 'center'
        })
      })

      // Initialize synaptic signals firing through pathways in 3D
      const signalCount = 6
      const newSignals: SynapseSignal[] = []
      for (let i = 0; i < signalCount; i++) {
        let startIndex = Math.floor(Math.random() * nodes.length)
        while (nodes[startIndex].neighbors.length === 0) {
          startIndex = Math.floor(Math.random() * nodes.length)
        }
        const neighbors = nodes[startIndex].neighbors
        const targetIndex = neighbors[Math.floor(Math.random() * neighbors.length)]

        newSignals.push({
          currentNodeIndex: startIndex,
          targetNodeIndex: targetIndex,
          progress: Math.random(),
          speed: 0.01 + Math.random() * 0.008,
          size: 1.2 + Math.random() * 0.8
        })
      }
      signals = newSignals
    }

    initBrain()

    const handleResize = () => {
      initBrain()
    }
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    // Mouse Tracking inside the Hero container (bypassing overlays)
    const handleMouseMove = (e: MouseEvent) => {
      const canvasRect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - canvasRect.left
      mouseRef.current.y = e.clientY - canvasRect.top
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

    // Main Draw Loop
    const draw = () => {
      const centerX = canvasSize / 2
      const centerY = canvasSize / 2

      ctx.clearRect(0, 0, canvasSize, canvasSize)
      globalTime += 0.5

      const mouse = mouseRef.current
      if (mouse.active) {
        mouse.lerpX += (mouse.x - mouse.lerpX) * 0.08
        mouse.lerpY += (mouse.y - mouse.lerpY) * 0.08
      } else {
        mouse.lerpX += (-1000 - mouse.lerpX) * 0.08
        mouse.lerpY += (-1000 - mouse.lerpY) * 0.08
      }

      // Rotate Y slowly over time
      angleY += 0.003

      // 1. Update Node 3D Coordinates (ambient floating) & Project to 2D Screen
      nodes.forEach((node) => {
        // Slow float offset in 3D
        const floatX = Math.sin(globalTime * node.floatSpeed + node.phaseX) * 1.5
        const floatY = Math.cos(globalTime * node.floatSpeed * 0.85 + node.phaseY) * 1.5
        const floatZ = Math.sin(globalTime * node.floatSpeed * 0.7 + node.phaseX + node.phaseY) * 1.5

        node.x = node.baseX + floatX
        node.y = node.baseY + floatY
        node.z = node.baseZ + floatZ

        // Apply 3D Y-rotation
        const xRotY = node.x * Math.cos(angleY) - node.z * Math.sin(angleY)
        const zRotY = node.x * Math.sin(angleY) + node.z * Math.cos(angleY)

        // Apply 3D X-tilt
        const yFinal = node.y * Math.cos(angleX) - zRotY * Math.sin(angleX)
        const zFinal = node.y * Math.sin(angleX) + zRotY * Math.cos(angleX)

        // Project onto 2D viewport
        node.projectedX = centerX + xRotY
        node.projectedY = centerY + yFinal
        node.projectedZ = zFinal // Serves as depth buffer value
      })

      // 2. Draw Neural Connections (Lines)
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i]
        if (nodeA.opacity < 0.1) continue

        nodeA.neighbors.forEach((neighborIndex) => {
          // Prevent double drawing lines
          if (i > neighborIndex) return

          const nodeB = nodes[neighborIndex]
          if (nodeB.opacity < 0.1) return

          // Calculate average depth to shade/fade line (depth cues)
          // projectedZ ranges from -R to +R. Let's normalize it to 0 (back) -> 1 (front)
          const avgZ = (nodeA.projectedZ + nodeB.projectedZ) / 2
          const depthFactor = (avgZ + 120) / 240 // Normalize using approximate bounds
          const clampedDepth = Math.max(0.1, Math.min(1.0, depthFactor))

          // Base line opacity scaled by depth and loading progress (increased for deeper look)
          let opacity = clampedDepth * 0.10 * nodeA.opacity * nodeB.opacity

          // Interactive highlight near the cursor (in 2D projected space)
          if (mouse.active) {
            const midX = (nodeA.projectedX + nodeB.projectedX) / 2
            const midY = (nodeA.projectedY + nodeB.projectedY) / 2
            const mdx = mouse.lerpX - midX
            const mdy = mouse.lerpY - midY
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
            if (mdist < 75) {
              const factor = 1 - mdist / 75
              opacity += factor * 0.18
            }
          }

          ctx.strokeStyle = `rgba(${accentColor}, ${opacity})`
          ctx.beginPath()
          ctx.moveTo(nodeA.projectedX, nodeA.projectedY)
          ctx.lineTo(nodeB.projectedX, nodeB.projectedY)
          ctx.stroke()
        })
      }

      // 3. Draw Nodes (Particles)
      nodes.forEach((node) => {
        if (node.opacity < 0.02) return

        // Scale and fade node based on depth (projectedZ)
        const depthFactor = (node.projectedZ + 120) / 240
        const clampedDepth = Math.max(0.15, Math.min(1.0, depthFactor))

        let size = node.size * node.scale * (0.6 + 0.6 * clampedDepth)
        let opacity = 0.55 * node.opacity * (0.3 + 0.7 * clampedDepth) // Increased particle opacity for deeper colors

        // Highlight nodes close to the 2D cursor
        if (mouse.active) {
          const dx = mouse.lerpX - node.projectedX
          const dy = mouse.lerpY - node.projectedY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 75) {
            const factor = 1 - dist / 75
            size += factor * 1.5
            opacity += factor * 0.45
          }
        }

        ctx.fillStyle = `rgba(${accentColor}, ${opacity})`
        ctx.beginPath()
        ctx.arc(node.projectedX, node.projectedY, size, 0, Math.PI * 2)
        ctx.fill()
      })

      // 4. Update and Draw 3D Synaptic Signals
      signals.forEach((signal) => {
        signal.progress += signal.speed
        if (signal.progress >= 1) {
          // Select next neighbor node along the 3D grid
          const curIndex = signal.targetNodeIndex
          const neighbors = nodes[curIndex].neighbors
          if (neighbors.length > 0) {
            let nextIndex = neighbors[Math.floor(Math.random() * neighbors.length)]
            // Prevent backing up if alternative exits exist
            if (neighbors.length > 1 && nextIndex === signal.currentNodeIndex) {
              const altList = neighbors.filter((n) => n !== signal.currentNodeIndex)
              nextIndex = altList[Math.floor(Math.random() * altList.length)]
            }
            signal.currentNodeIndex = curIndex
            signal.targetNodeIndex = nextIndex
            signal.progress = 0
          } else {
            // Find a new starting point if stuck
            signal.currentNodeIndex = Math.floor(Math.random() * nodes.length)
            while (nodes[signal.currentNodeIndex].neighbors.length === 0) {
              signal.currentNodeIndex = Math.floor(Math.random() * nodes.length)
            }
            const nb = nodes[signal.currentNodeIndex].neighbors
            signal.targetNodeIndex = nb[Math.floor(Math.random() * nb.length)]
            signal.progress = 0
          }
        }

        const nodeA = nodes[signal.currentNodeIndex]
        const nodeB = nodes[signal.targetNodeIndex]

        if (nodeA && nodeB && nodeA.opacity > 0.3 && nodeB.opacity > 0.3) {
          // Linear interpolation of 3D coordinates
          const signalX = nodeA.x + (nodeB.x - nodeA.x) * signal.progress
          const signalY = nodeA.y + (nodeB.y - nodeA.y) * signal.progress
          const signalZ = nodeA.z + (nodeB.z - nodeA.z) * signal.progress

          // Apply Y-rotation and X-tilt to get the projected screen coordinates
          const xRotY = signalX * Math.cos(angleY) - signalZ * Math.sin(angleY)
          const zRotY = signalX * Math.sin(angleY) + signalZ * Math.cos(angleY)

          const yFinal = signalY * Math.cos(angleX) - zRotY * Math.sin(angleX)
          const zFinal = signalY * Math.sin(angleX) + zRotY * Math.cos(angleX)

          const screenX = centerX + xRotY
          const screenY = centerY + yFinal

          // Scale opacity and size based on depth
          const depthFactor = (zFinal + 120) / 240
          const clampedDepth = Math.max(0.1, Math.min(1.0, depthFactor))

          let size = signal.size * (0.6 + 0.6 * clampedDepth)
          let opacity = 0.55 * Math.min(nodeA.opacity, nodeB.opacity) * clampedDepth

          // Interact with mouse in 2D projection space
          if (mouse.active) {
            const mdx = mouse.lerpX - screenX
            const mdy = mouse.lerpY - screenY
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
            if (mdist < 75) {
              const factor = 1 - mdist / 75
              opacity += factor * 0.45
              size += factor * 0.8
            }
          }

          ctx.fillStyle = `rgba(${accentColor}, ${opacity})`
          ctx.beginPath()
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      parent.removeEventListener('mousemove', handleMouseMove)
      parent.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '400px',
        aspectRatio: '1 / 1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        userSelect: 'none',
        pointerEvents: 'none',
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
