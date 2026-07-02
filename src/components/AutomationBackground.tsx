import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 45
const CONNECTION_DIST = 160
const SPEED = 0.22
const ACCENT_R = 0
const ACCENT_G = 212
const ACCENT_B = 255

type Particle = { x: number; y: number; vx: number; vy: number }

export default function AutomationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Size the canvas before spawning particles so they spread over the full
    // viewport, not the default 300x150 canvas.
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    }))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Keep particles inside the new bounds — otherwise after a shrink they
      // drift outside the canvas and the background looks sparse.
      for (const p of particles) {
        p.x = ((p.x % canvas.width) + canvas.width) % canvas.width
        p.y = ((p.y % canvas.height) + canvas.height) % canvas.height
      }
    }
    window.addEventListener('resize', resize)

    let animId = 0

    // Render a single frame (advance + draw). Kept separate from the loop so
    // it can be used for a static frame under reduced-motion.
    const renderFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},0.45)`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.18
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      renderFrame()
      animId = requestAnimationFrame(loop)
    }

    // Respect prefers-reduced-motion: draw one static frame, no RAF loop.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      renderFrame()
    } else {
      loop()
    }

    // Pause the loop while the tab is hidden to save CPU/battery.
    const onVisibility = () => {
      if (reduceMotion) return
      if (document.hidden) {
        cancelAnimationFrame(animId)
        animId = 0
      } else if (!animId) {
        loop()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#05050a]" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
