import { motion } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { FaEnvelope, FaGithub, FaLinkedinIn, FaLocationDot, FaPhone } from 'react-icons/fa6'
import CountUp from './components/CountUp'
import CursorTrail from './components/CursorTrail'
import Navbar from './components/Navbar'
import ParticlesCanvas from './components/ParticlesCanvas'
import SectionHeading from './components/SectionHeading'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import AppointmentSection from './components/AppointmentSection'
import ContactChoiceButton from './components/ContactChoiceButton'
import { useInViewOnce } from './hooks/useInViewOnce'
import { useGithubRepos } from './hooks/useGithubRepos'
import { useTypewriter } from './hooks/useTypewriter'
import {
  ABOUT_BIO,
  EXPERIENCE,
  FEATURED_PROJECTS,
  HERO_ROLES,
  IDENTITY,
  SERVICES,
  SKILL_GROUPS,
  STATS,
} from './lib/content'
import { makeGmailComposeLink, makeMailtoLink } from './lib/contactLinks'
import { cn } from './lib/utils'

const sectionFade = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

function GlassCard({ className, children }) {
  return <div className={cn('glass rounded-2xl p-5 sm:p-6', className)}>{children}</div>
}

function Divider() {
  return (
    <div className="container-pad">
      <div className="divider" />
    </div>
  )
}

export default function App() {
  const typed = useTypewriter(HERO_ROLES)
  const { repos, loading } = useGithubRepos('HBukhari202114')
  const topRepos = useMemo(() => repos.slice(0, 9), [repos])

  const { ref: statsRef, inView: statsInView } = useInViewOnce()
  const heroRef = useRef(null)

  const onContactSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') || '')
    const email = String(fd.get('email') || '')
    const message = String(fd.get('message') || '')
    const submitter = e.nativeEvent?.submitter
    const channel = submitter?.value || 'whatsapp'

    if (channel === 'email') {
      const subject = `Portfolio Inquiry — ${name || 'New message'}`
      const body =
        `Hi Hussnain,\n\nI want to connect from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n(Please reply to: ${email})`
      const gmailCompose = makeGmailComposeLink(IDENTITY.email, subject, body)
      const mailtoFallback = makeMailtoLink(IDENTITY.email, subject, body)
      const popup = window.open(gmailCompose, '_blank', 'noopener,noreferrer')
      if (!popup) window.location.href = mailtoFallback
      return
    }

    const text = encodeURIComponent(
      `Hi Hussnain, I want to connect from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    )
    window.open(`https://wa.me/923146793354?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-vibe relative min-h-screen bg-ink">
      <ParticlesCanvas density={52} />
      <CursorTrail />
      <Navbar />
      <ContactChoiceButton />

      <main className="relative z-10">
        {/* HERO */}
        <section
          id="home"
          ref={heroRef}
          className="relative overflow-hidden bg-ink bg-radial-hero pb-16 pt-28 sm:pt-32"
        >
          <div className="container-pad">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <motion.h1
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                  className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                  {IDENTITY.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
                  className="mt-4 text-base font-semibold tracking-wide text-slate-300 sm:text-lg"
                >
                  <span className="text-slate-300">I’m </span>
                  <span className="text-glow">{typed}</span>
                  <span className="ml-1 inline-block h-5 w-[2px] translate-y-[3px] animate-pulse bg-glow" />
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: 'easeOut', delay: 0.18 }}
                  className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <a href="#projects" className="btn-primary animate-glow-breathe">
                    Explore My Work
                  </a>
                  <a
                    href={IDENTITY.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    View My Company →
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: 'easeOut', delay: 0.26 }}
                  className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300"
                >
                  <span className="inline-flex items-center gap-2">
                    <FaLocationDot className="h-4 w-4 text-glow" />
                    {IDENTITY.location}
                  </span>
                  <a
                    href={`mailto:${IDENTITY.email}`}
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <FaEnvelope className="h-4 w-4 text-glow" />
                    {IDENTITY.email}
                  </a>
                  <a href={`tel:${IDENTITY.phone}`} className="inline-flex items-center gap-2 hover:text-white">
                    <FaPhone className="h-4 w-4 text-glow" />
                    {IDENTITY.phone}
                  </a>
                </motion.div>
              </div>

              <div className="relative lg:col-span-5">
                <div className="glass relative aspect-[4/4] w-full overflow-hidden rounded-3xl p-5 sm:p-6 animate-float-soft">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(96,165,250,0.28),transparent_40%),radial-gradient(circle_at_78%_70%,rgba(37,99,235,0.2),transparent_46%)]" />
                  <div className="relative h-full rounded-2xl border border-[rgba(96,165,250,0.2)] bg-[rgba(9,16,36,0.72)] p-5">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(96,165,250,0.3)] bg-white/5 px-3 py-1 text-xs font-bold text-slate-100"
                    >
                      <span className="h-2 w-2 rounded-full bg-glow shadow-[0_0_14px_rgba(96,165,250,0.55)]" />
                      Premium Portfolio Preview
                    </motion.div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {[
                        ['Frontend', 'React + Tailwind'],
                        ['Cloud', 'AWS + DevOps'],
                        ['Networking', 'CCNA + GNS3'],
                        ['Delivery', '50+ happy clients'],
                      ].map(([label, value], i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.25 + i * 0.06 }}
                          className="rounded-xl border border-[rgba(96,165,250,0.2)] bg-white/5 p-3 transition hover:border-[rgba(56,189,248,0.45)] hover:bg-white/8"
                        >
                          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            {label}
                          </div>
                          <div className="mt-1 text-sm font-bold text-white">{value}</div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.9, delay: 0.45 }}
                      className="mt-5 rounded-xl border border-[rgba(96,165,250,0.22)] bg-gradient-to-r from-[rgba(37,99,235,0.18)] via-[rgba(96,165,250,0.12)] to-transparent px-4 py-3 text-xs font-semibold text-slate-200"
                    >
                      Building sleek, scalable products with a premium execution standard.
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.35 }}
            className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
          >
            <div className="animate-pulse text-sm font-semibold text-slate-300">
              Scroll to explore ↓
            </div>
          </motion.div>
        </section>

        {/* STATS BAR */}
        <section className="relative -mt-10 pb-12">
          <div className="container-pad">
            <div ref={statsRef} className="glass grid gap-4 rounded-2xl p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-heading text-3xl font-extrabold text-white">
                    <CountUp to={s.value} suffix={s.suffix} start={statsInView} />
                  </div>
                  <div className="mt-1 text-xs font-semibold text-slate-300">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ABOUT */}
        <section id="about" className="py-16 sm:py-20">
          <SectionHeading eyebrow="About" title="Built to ship. Built to scale." subtitle="A multi-disciplinary profile that blends product-quality frontend, real infrastructure, and networking fundamentals." />
          <div className="container-pad mt-10 grid gap-7 lg:grid-cols-12 lg:items-center">
            <motion.div
              variants={sectionFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto aspect-square w-full max-w-sm">
                <div className="glass glow-ring absolute inset-0 rounded-3xl" />
                <div className="absolute inset-[14px] rounded-3xl bg-gradient-to-b from-white/7 to-white/2" />
                <div className="absolute inset-[14px] overflow-hidden rounded-3xl">
                  <img
                    src="/profile.png"
                    alt="Syed Muhammad Hussnain Bukhari portrait"
                    className="h-full w-full object-cover object-[50%_18%] contrast-[1.04] saturate-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(96,165,250,0.18)]" />
                </div>
                <div className="pointer-events-none absolute -inset-10 rounded-[44px] bg-[radial-gradient(circle_at_40%_20%,rgba(96,165,250,0.2),transparent_45%)]" />
              </div>
            </motion.div>

            <motion.div
              variants={sectionFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="lg:col-span-7"
            >
              <GlassCard>
                <p className="text-balance text-sm leading-relaxed text-slate-200 sm:text-base">
                  {ABOUT_BIO}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={IDENTITY.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    View My Company →
                  </a>
                  <a
                    href="#contact"
                    className="btn-secondary"
                  >
                    Let’s talk
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* SKILLS */}
        <section id="skills" className="py-16 sm:py-20">
          <SectionHeading eyebrow="Skills" title="A modern stack with real-world depth" subtitle="Frontend polish, cloud fundamentals, and hands-on networking — grouped for clarity." />
          <div className="container-pad mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((g) => (
              <motion.div
                key={g.title}
                variants={sectionFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="glass group rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-extrabold text-white">{g.title}</h3>
                  <span className="h-2 w-2 rounded-full bg-glow opacity-80 shadow-[0_0_16px_rgba(96,165,250,0.45)] transition group-hover:opacity-100" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[rgba(96,165,250,0.18)] bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition group-hover:border-[rgba(96,165,250,0.3)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* EXPERIENCE */}
        <section id="experience" className="py-16 sm:py-20">
          <SectionHeading eyebrow="Experience" title="A timeline of real delivery" subtitle="Roles across frontend, DevOps, Flutter, and networking — each sharpening a different edge." />
          <div className="container-pad mt-10">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-px bg-[rgba(96,165,250,0.28)] shadow-[0_0_18px_rgba(96,165,250,0.2)] sm:left-6" />
              <div className="space-y-5">
                {EXPERIENCE.map((e) => (
                  <motion.div
                    key={`${e.company}-${e.role}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative pl-12 sm:pl-16"
                  >
                    <div className="absolute left-[10px] top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-glow shadow-[0_0_22px_rgba(96,165,250,0.55)] sm:left-[14px]" />
                    <GlassCard className="relative">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="text-sm font-extrabold text-white">
                            {e.role} @ <span className="text-glow">{e.company}</span>
                          </div>
                          <div className="mt-1 text-xs font-semibold text-slate-300">{e.date}</div>
                        </div>
                        <div className="inline-flex w-fit rounded-full border border-[rgba(96,165,250,0.28)] bg-white/5 px-3 py-1 text-xs font-bold text-slate-100">
                          {e.mode}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* PROJECTS */}
        <section id="projects" className="py-16 sm:py-20">
          <SectionHeading eyebrow="Projects" title="Live GitHub + featured builds" subtitle="Glass cards powered by the GitHub REST API, plus featured products in the pipeline." />

          <div className="container-pad mt-10 grid gap-5 lg:grid-cols-3">
            {FEATURED_PROJECTS.map((p) => (
              <motion.div
                key={p.name}
                variants={sectionFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="glass relative rounded-2xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-heading text-xl font-extrabold text-white">{p.name}</div>
                    <div className="mt-2 text-sm text-slate-300">{p.description}</div>
                  </div>
                  <span className="rounded-full border border-[rgba(96,165,250,0.35)] bg-[rgba(37,99,235,0.18)] px-2.5 py-1 text-[10px] font-extrabold text-white">
                    {p.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="container-pad mt-8">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-extrabold text-white">GitHub Repositories</div>
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[rgba(96,165,250,0.22)] bg-white/5 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-white/8"
              >
                <FaGithub className="h-4 w-4 text-glow" />
                View GitHub →
              </a>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {(loading ? Array.from({ length: 6 }) : topRepos).map((r, i) => {
                if (loading) {
                  return (
                    <div key={i} className="glass rounded-2xl p-6">
                      <div className="h-4 w-2/3 rounded bg-white/10" />
                      <div className="mt-3 h-3 w-full rounded bg-white/8" />
                      <div className="mt-2 h-3 w-5/6 rounded bg-white/8" />
                      <div className="mt-6 h-9 w-28 rounded-xl bg-white/10" />
                    </div>
                  )
                }

                return (
                  <motion.div
                    key={r.id}
                    variants={sectionFade}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="glass rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-extrabold text-white">{r.name}</div>
                        <div className="mt-2 overflow-hidden text-ellipsis text-sm leading-relaxed text-slate-300 [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                          {r.description || 'No description provided.'}
                        </div>
                      </div>
                      {r.language ? (
                        <span className="shrink-0 rounded-full border border-[rgba(96,165,250,0.25)] bg-white/5 px-2.5 py-1 text-[10px] font-extrabold text-slate-100">
                          {r.language}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-300">
                      <span>★ {r.stargazers_count || 0}</span>
                      <a
                        href={r.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-cyan-500 px-3 py-2 text-xs font-extrabold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)]"
                      >
                        View on GitHub →
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* SERVICES */}
        <section id="services" className="py-16 sm:py-20">
          <SectionHeading eyebrow="Services" title="Built for clients who want premium delivery" subtitle="Six core offers designed to ship fast, look premium, and hold up under scale." />
          <div className="container-pad mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={sectionFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="glass group rounded-2xl p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(96,165,250,0.22)] bg-white/5 text-xl">
                    {s.icon}
                  </div>
                  <div className="text-sm font-extrabold text-white">{s.title}</div>
                </div>
                <div className="mt-4 h-px w-full bg-[rgba(96,165,250,0.16)]" />
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  High-signal delivery with clean UX, secure defaults, and a neon-blue premium finish.
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-16 sm:py-20">
          <SectionHeading eyebrow="Testimonials" title="Trusted — and repeat-hired" subtitle="Auto-scrolling infinite carousel. Pause on hover, swipe on mobile, arrows on desktop." />
          <div className="mt-10">
            <TestimonialsCarousel />
          </div>
        </section>

        <Divider />

        <AppointmentSection />

        <Divider />

        {/* CONTACT */}
        <section id="contact" className="py-16 sm:py-20">
          <SectionHeading eyebrow="Contact" title="Let's Build Something Great" subtitle="Tell me what you’re building — I’ll respond fast with a clear plan and next steps." />
          <div className="container-pad mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
            <motion.div
              variants={sectionFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-5"
            >
              <GlassCard>
                <div className="space-y-3 text-sm text-slate-200">
                  <a className="flex items-center gap-3 hover:text-white" href={`mailto:${IDENTITY.email}`}>
                    <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(96,165,250,0.22)] bg-white/5">
                      <FaEnvelope className="h-4 w-4 text-glow" />
                    </span>
                    <span className="font-semibold">{IDENTITY.email}</span>
                  </a>
                  <a className="flex items-center gap-3 hover:text-white" href={IDENTITY.github} target="_blank" rel="noreferrer">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(96,165,250,0.22)] bg-white/5">
                      <FaGithub className="h-4 w-4 text-glow" />
                    </span>
                    <span className="font-semibold">GitHub</span>
                  </a>
                  <a className="flex items-center gap-3 hover:text-white" href={IDENTITY.linkedin} target="_blank" rel="noreferrer">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(96,165,250,0.22)] bg-white/5">
                      <FaLinkedinIn className="h-4 w-4 text-glow" />
                    </span>
                    <span className="font-semibold">LinkedIn</span>
                  </a>
                </div>

                <div className="mt-6">
                  <a
                    href={IDENTITY.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full"
                  >
                    Visit CodeNest Tech Solutions →
                  </a>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a
                      href={`mailto:${IDENTITY.email}`}
                      className="btn-secondary px-4 py-3 text-xs"
                    >
                      Email
                    </a>
                    <a
                      href="https://wa.me/923146793354"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary px-4 py-3 text-xs"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              variants={sectionFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-7"
            >
              <form onSubmit={onContactSubmit} className="glass rounded-2xl p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <div className="text-xs font-bold text-slate-300">Name</div>
                    <input
                      name="name"
                      required
                      className="mt-2 w-full rounded-xl border border-[rgba(96,165,250,0.2)] bg-white/5 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-[rgba(96,165,250,0.35)] focus:bg-white/7"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <div className="text-xs font-bold text-slate-300">Email</div>
                    <input
                      name="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-xl border border-[rgba(96,165,250,0.2)] bg-white/5 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-[rgba(96,165,250,0.35)] focus:bg-white/7"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="mt-4 block">
                  <div className="text-xs font-bold text-slate-300">Message</div>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full resize-none rounded-xl border border-[rgba(96,165,250,0.2)] bg-white/5 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-[rgba(96,165,250,0.35)] focus:bg-white/7"
                    placeholder="Tell me what you’re building…"
                  />
                </label>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <button
                    type="submit"
                    value="whatsapp"
                    className="btn-primary w-full"
                  >
                    WhatsApp
                  </button>
                  <button
                    type="submit"
                    value="email"
                    className="btn-secondary w-full"
                  >
                    Email
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          <div className="container-pad mt-10 pb-6 text-center text-xs font-semibold text-slate-400">
            © {new Date().getFullYear()} {IDENTITY.name}. Built with React + Tailwind + Three.js + Framer Motion.
          </div>
        </section>
      </main>
    </div>
  )
}
