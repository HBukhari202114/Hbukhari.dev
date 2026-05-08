import { useEffect, useMemo, useRef, useState } from 'react'

export default function CountUp({ to, suffix = '', start = false, durationMs = 1200 }) {
  const [v, setV] = useState(0)
  const raf = useRef(0)

  const target = useMemo(() => Number(to) || 0, [to])

  useEffect(() => {
    if (!start) return
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / durationMs)
      const ease = 1 - Math.pow(1 - p, 3)
      setV(Math.round(target * ease))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [durationMs, start, target])

  return (
    <span className="tabular-nums">
      {v}
      {suffix}
    </span>
  )
}

