import { useEffect, useRef } from 'react'

function rand(min, max) {
  return min + Math.random() * (max - min)
}

export default function ParticlesCanvas({ density = 56 }) {
  const ref = useRef(null)
  const raf = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const points = []
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const lowPower = (navigator.deviceMemory && navigator.deviceMemory <= 4) || window.innerWidth < 768
    const perfFactor = reducedMotion ? 0.35 : lowPower ? 0.62 : 1
    let running = true
    const reset = () => {
      points.length = 0
      const count = Math.round((Math.round((w * h) / 26000) + density) * perfFactor)
      for (let i = 0; i < count; i++) {
        points.push({
          x: rand(0, w),
          y: rand(0, h),
          r: rand(0.6, 1.8),
          vx: rand(-0.14, 0.14),
          vy: rand(-0.08, 0.08),
          a: rand(0.12, 0.55),
          tw: rand(0, Math.PI * 2),
        })
      }
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      reset()
    }

    const tick = (t) => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(96,165,250,0.85)'

      for (const p of points) {
        p.tw += 0.02
        const pulse = 0.55 + 0.45 * Math.sin(p.tw + t * 0.001)
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx.globalAlpha = p.a * pulse
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      raf.current = window.requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      running = document.visibilityState !== 'hidden'
      if (running) raf.current = window.requestAnimationFrame(tick)
      else window.cancelAnimationFrame(raf.current)
    }

    resize()
    raf.current = window.requestAnimationFrame(tick)
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.cancelAnimationFrame(raf.current)
    }
  }, [density])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  )
}

