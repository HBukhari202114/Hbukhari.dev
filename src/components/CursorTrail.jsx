import { useEffect, useRef } from 'react'

const DOTS = 12

export default function CursorTrail() {
  const ref = useRef(null)
  const raf = useRef(0)
  const state = useRef({
    enabled: true,
    x: -999,
    y: -999,
    dots: Array.from({ length: DOTS }, () => ({ x: -999, y: -999, vx: 0, vy: 0 })),
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    state.current.enabled = mq.matches

    const onMq = (e) => {
      state.current.enabled = e.matches
      el.style.display = e.matches ? 'block' : 'none'
    }
    mq.addEventListener?.('change', onMq)
    el.style.display = state.current.enabled ? 'block' : 'none'

    const onMove = (e) => {
      state.current.x = e.clientX
      state.current.y = e.clientY
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const tick = () => {
      const s = state.current
      if (!s.enabled || document.visibilityState === 'hidden') {
        raf.current = window.requestAnimationFrame(tick)
        return
      }
      let x = s.x
      let y = s.y
      for (let i = 0; i < s.dots.length; i++) {
        const d = s.dots[i]
        const spring = 0.18 - i * 0.006
        d.vx += (x - d.x) * spring
        d.vy += (y - d.y) * spring
        d.vx *= 0.72
        d.vy *= 0.72
        d.x += d.vx
        d.y += d.vy
        x = d.x
        y = d.y
      }

      const children = el.children
      for (let i = 0; i < children.length; i++) {
        const d = s.dots[i]
        const node = children[i]
        const scale = 1 - i / children.length
        node.style.transform = `translate(${d.x}px, ${d.y}px) translate(-50%, -50%) scale(${scale})`
        node.style.opacity = `${0.55 * scale}`
      }

      raf.current = window.requestAnimationFrame(tick)
    }

    raf.current = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      mq.removeEventListener?.('change', onMq)
      window.cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[60]">
      {Array.from({ length: DOTS }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 top-0 h-2 w-2 rounded-full bg-glow/90 blur-[0.2px] shadow-[0_0_24px_rgba(96,165,250,0.25)]"
        />
      ))}
    </div>
  )
}

