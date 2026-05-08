import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa6'
import { IDENTITY } from '../lib/content'
import { makeGmailComposeLink, makeMailtoLink, makeWhatsappLink } from '../lib/contactLinks'
import { cn } from '../lib/utils'

export default function ContactChoiceButton({ className }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onDown = (e) => {
      if (!open) return
      const el = panelRef.current
      if (!el) return
      if (el.contains(e.target)) return
      setOpen(false)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [open])

  const baseMessage =
    "Hi Hussnain — I found your portfolio and I'd like to discuss a project."

  const openEmail = () => {
    const subject = 'Project inquiry from portfolio'
    const body = `${baseMessage}\n\n(Please reply to this email.)`
    const gmailCompose = makeGmailComposeLink(IDENTITY.email, subject, body)
    const mailtoFallback = makeMailtoLink(IDENTITY.email, subject, body)
    const popup = window.open(gmailCompose, '_blank', 'noopener,noreferrer')
    if (!popup) window.location.href = mailtoFallback
  }

  const openWhatsApp = () => {
    window.open(makeWhatsappLink(baseMessage), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={cn('fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6', className)}>
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="glass mb-3 w-[260px] rounded-2xl p-3"
          >
            <div className="px-2 pb-2 text-xs font-extrabold text-white">Contact me via</div>

            <button
              type="button"
              onClick={openWhatsApp}
              className="group flex w-full items-center justify-between rounded-xl border border-[rgba(96,165,250,0.22)] bg-white/5 px-3 py-3 text-left text-sm font-bold text-white transition hover:bg-white/8"
            >
              <span className="inline-flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(37,99,235,0.18)]">
                  <FaWhatsapp className="h-5 w-5 text-glow" />
                </span>
                WhatsApp
              </span>
              <span className="text-xs font-extrabold text-slate-300 group-hover:text-white">
                Choose →
              </span>
            </button>

            <button
              type="button"
              onClick={openEmail}
              className="mt-2 group flex w-full items-center justify-between rounded-xl border border-[rgba(96,165,250,0.22)] bg-white/5 px-3 py-3 text-left text-sm font-bold text-white transition hover:bg-white/8"
            >
              <span className="inline-flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(37,99,235,0.18)]">
                  <FaEnvelope className="h-5 w-5 text-glow" />
                </span>
                Email
              </span>
              <span className="text-xs font-extrabold text-slate-300 group-hover:text-white">
                Choose →
              </span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto inline-flex items-center gap-3 rounded-2xl border border-[rgba(96,165,250,0.28)] bg-white/5 px-4 py-3 text-sm font-extrabold text-white shadow-glow transition hover:bg-white/8"
        aria-label="Open contact options"
        aria-expanded={open}
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-[rgba(37,99,235,0.18)]">
          <span className="absolute inset-0 rounded-xl shadow-[0_0_24px_rgba(96,165,250,0.25)]" />
          <FaWhatsapp className="h-4.5 w-4.5 text-glow" />
        </span>
        Contact
        <span className="text-xs font-black text-slate-300">{open ? 'Close' : 'Pick'}</span>
      </button>
    </div>
  )
}

