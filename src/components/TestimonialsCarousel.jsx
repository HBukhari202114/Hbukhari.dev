import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TESTIMONIALS } from '../lib/content'
import { cn } from '../lib/utils'

function stars(n) {
  return Array.from({ length: 5 }).map((_, i) => (i < n ? '★' : '☆')).join('')
}

function colorFromInitials(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360
  return `hsl(${h} 80% 55%)`
}

export default function TestimonialsCarousel() {
  const items = useMemo(() => [...TESTIMONIALS, ...TESTIMONIALS], [])
  const trackRef = useRef(null)
  const raf = useRef(0)
  const last = useRef(0)
  const paused = useRef(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    setReady(true)

    const speed = 38 // px/s
    const tick = (t) => {
      const dt = Math.min(0.05, (t - last.current) / 1000 || 0)
      last.current = t
      if (!paused.current) {
        el.scrollLeft += speed * dt
        const half = el.scrollWidth / 2
        if (el.scrollLeft >= half) el.scrollLeft -= half
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf.current)
  }, [])

  const nudge = (dir) => {
    const el = trackRef.current
    if (!el) return
    paused.current = true
    const by = Math.round(el.clientWidth * 0.6) * dir
    el.scrollBy({ left: by, behavior: 'smooth' })
    window.setTimeout(() => (paused.current = false), 1200)
  }

  return (
    <div className="container-pad">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent" />

        <div className="absolute right-0 top-[-52px] hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => nudge(-1)}
            className="glass rounded-xl p-2 text-slate-200 transition hover:bg-white/8 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            className="glass rounded-xl p-2 text-slate-200 transition hover:bg-white/8 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={trackRef}
          className={cn(
            'no-scrollbar glass overflow-x-auto rounded-2xl px-4 py-5',
            ready ? 'opacity-100' : 'opacity-0',
          )}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onTouchStart={() => (paused.current = true)}
          onTouchEnd={() => (paused.current = false)}
        >
          <div className="flex w-max gap-4 pr-6">
            {items.map((t, i) => {
              const isSpecial = Boolean(t.special)
              const badge = t.project
              const initials = t.initials || ''
              const avatarBg = initials ? colorFromInitials(initials) : 'transparent'
              return (
                <div
                  key={`${t.name}-${i}`}
                  className={cn(
                    'relative w-[320px] max-w-[82vw] rounded-2xl border bg-white/5 p-5 backdrop-blur-xl',
                    isSpecial
                      ? 'border-[rgba(96,165,250,0.45)] shadow-glowStrong'
                      : 'border-[rgba(96,165,250,0.2)]',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'grid h-11 w-11 place-items-center rounded-full text-sm font-extrabold text-white',
                          isSpecial ? 'bg-white/10' : '',
                        )}
                        style={isSpecial ? undefined : { background: avatarBg }}
                      >
                        {isSpecial ? '★' : initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{t.name}</div>
                        {badge ? (
                          <div className="mt-1 inline-flex rounded-full border border-[rgba(96,165,250,0.35)] bg-[rgba(37,99,235,0.18)] px-2 py-0.5 text-[10px] font-semibold text-slate-100">
                            {badge}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="text-right text-xs font-black tracking-wide text-gold">
                      {stars(t.stars || 5)}
                    </div>
                  </div>

                  <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-200/90">
                    {t.quote}
                  </p>

                  {isSpecial ? (
                    <div className="mt-5">
                      <a
                        href="#contact"
                        className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-2 text-sm font-extrabold text-white shadow-[0_0_30px_rgba(37,99,235,0.25)] transition hover:bg-[#2a6cf0]"
                      >
                        {t.cta}
                      </a>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

