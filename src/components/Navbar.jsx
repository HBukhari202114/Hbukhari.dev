import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { FaBars, FaEnvelope, FaGithub, FaLinkedinIn, FaXmark } from 'react-icons/fa6'
import { IDENTITY } from '../lib/content'
import { cn } from '../lib/utils'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'appointment', label: 'Appointment' },
  { id: 'contact', label: 'Contact' },
]

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? 'home')

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.12, 0.25, 0.35] },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sectionIds])

  return active
}

export default function Navbar() {
  const sectionIds = useMemo(() => NAV.map((n) => n.id), [])
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const jump = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    setOpen(false)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8',
          scrolled ? 'pt-3' : 'pt-4',
        )}
      >
        <div
          className={cn(
            'glass rounded-2xl',
            scrolled ? 'bg-white/6' : 'bg-white/4',
            'transition-colors',
          )}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-5">
            <button
              type="button"
              onClick={() => jump('home')}
              className="group inline-flex min-w-0 items-center gap-3"
              aria-label="Go to top"
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-[rgba(96,165,250,0.22)] bg-white/5 shadow-[0_0_0_1px_rgba(96,165,250,0.18),0_0_22px_rgba(96,165,250,0.12)] transition group-hover:bg-white/7">
                <img src="/logo.svg" alt="HB logo" className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-heading text-sm font-extrabold tracking-tight text-white">
                  Hussnain Bukhari
                </span>
                <span className="hidden truncate text-xs text-slate-400 md:block">
                  {IDENTITY.title}
                </span>
              </span>
            </button>

            <nav className="hidden items-center gap-1.5 lg:flex">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => jump(n.id)}
                  className={cn(
                    'relative rounded-xl px-3 py-2 text-xs font-semibold transition-colors',
                    active === n.id ? 'text-white' : 'text-slate-300 hover:text-white',
                  )}
                >
                  {active === n.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-xl bg-white/7 shadow-[0_0_0_1px_rgba(96,165,250,0.18)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="hidden items-center gap-2 sm:flex">
              <a
                className="rounded-xl border border-[rgba(96,165,250,0.22)] bg-white/5 p-2 text-slate-200 transition hover:bg-white/8 hover:text-white"
                href={`mailto:${IDENTITY.email}`}
                aria-label="Email"
              >
                <FaEnvelope className="h-4 w-4" />
              </a>
              <a
                className="rounded-xl border border-[rgba(96,165,250,0.22)] bg-white/5 p-2 text-slate-200 transition hover:bg-white/8 hover:text-white"
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="h-4 w-4" />
              </a>
              <a
                className="rounded-xl border border-[rgba(96,165,250,0.22)] bg-white/5 p-2 text-slate-200 transition hover:bg-white/8 hover:text-white"
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-[rgba(96,165,250,0.22)] bg-white/5 p-2 text-slate-200 transition hover:bg-white/8 hover:text-white lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              {open ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>

          {open ? (
            <div className="border-t border-[rgba(96,165,250,0.16)] px-3 py-3 lg:hidden">
              <div className="grid grid-cols-2 gap-2">
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => jump(n.id)}
                    className={cn(
                      'rounded-xl px-3 py-2 text-left text-sm font-semibold',
                      active === n.id
                        ? 'bg-white/8 text-white shadow-[0_0_0_1px_rgba(96,165,250,0.22)]'
                        : 'bg-white/4 text-slate-200 hover:bg-white/7',
                    )}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

