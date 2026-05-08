import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa6'
import { IDENTITY } from '../lib/content'
import {
  formatAppointment,
  makeGmailComposeLink,
  makeMailtoLink,
  makeWhatsappLink,
} from '../lib/contactLinks'
import { cn } from '../lib/utils'

export default function AppointmentSection() {
  const [dt, setDt] = useState('')
  const [method, setMethod] = useState('whatsapp') // 'whatsapp' | 'email'
  const [note, setNote] = useState('')

  const pretty = useMemo(() => formatAppointment(dt), [dt])

  const submit = (e) => {
    e.preventDefault()
    if (!dt) return

    const msg = [
      'Hi Hussnain — I’d like to book an appointment.',
      `Preferred: ${pretty}`,
      note ? `Message: ${note}` : null,
      'Sent from: Portfolio website',
    ]
      .filter(Boolean)
      .join('\n')

    if (method === 'email') {
      const subject = `Appointment request — ${pretty}`
      const gmailCompose = makeGmailComposeLink(IDENTITY.email, subject, msg)
      const mailtoFallback = makeMailtoLink(IDENTITY.email, subject, msg)
      const popup = window.open(gmailCompose, '_blank', 'noopener,noreferrer')
      // Fallback for blocked popups or users not signed into Gmail
      if (!popup) window.location.href = mailtoFallback
      return
    }

    window.open(makeWhatsappLink(msg), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="appointment" className="py-16 sm:py-20">
      <div className="container-pad">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass overflow-hidden rounded-3xl"
        >
          <div className="grid gap-0 lg:grid-cols-12">
            <div className="relative p-6 sm:p-8 lg:col-span-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(96,165,250,0.22),transparent_55%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(96,165,250,0.22)] bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_14px_rgba(96,165,250,0.45)]" />
                  Appointment
                </div>
                <h3 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Book a time — then choose WhatsApp or Email
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Pick a date and time. When you submit, I’ll open your selected channel with a prefilled message containing the exact month, year, date, and time.
                </p>

                <div className="mt-6 space-y-2 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="h-4 w-4 text-glow" />
                    WhatsApp: +92 314 679 3354
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="h-4 w-4 text-glow" />
                    Email: {IDENTITY.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[rgba(96,165,250,0.16)] p-6 sm:p-8 lg:col-span-7 lg:border-l lg:border-t-0">
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <div className="text-xs font-bold text-slate-300">Date & time</div>
                    <input
                      value={dt}
                      onChange={(e) => setDt(e.target.value)}
                      type="datetime-local"
                      required
                      className="mt-2 w-full rounded-xl border border-[rgba(96,165,250,0.2)] bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[rgba(96,165,250,0.35)] focus:bg-white/7"
                    />
                    {pretty ? (
                      <div className="mt-2 text-[11px] font-semibold text-slate-400">
                        Selected: <span className="text-slate-200">{pretty}</span>
                      </div>
                    ) : null}
                  </label>

                  <label className="block">
                    <div className="text-xs font-bold text-slate-300">Contact via</div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setMethod('whatsapp')}
                        className={cn(
                          'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-extrabold transition',
                          method === 'whatsapp'
                            ? 'border-[rgba(96,165,250,0.45)] bg-[rgba(37,99,235,0.18)] text-white shadow-glow'
                            : 'border-[rgba(96,165,250,0.2)] bg-white/5 text-slate-200 hover:bg-white/8',
                        )}
                      >
                        <FaWhatsapp className="h-4 w-4 text-glow" />
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => setMethod('email')}
                        className={cn(
                          'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-extrabold transition',
                          method === 'email'
                            ? 'border-[rgba(96,165,250,0.45)] bg-[rgba(37,99,235,0.18)] text-white shadow-glow'
                            : 'border-[rgba(96,165,250,0.2)] bg-white/5 text-slate-200 hover:bg-white/8',
                        )}
                      >
                        <FaEnvelope className="h-4 w-4 text-glow" />
                        Email
                      </button>
                    </div>
                  </label>
                </div>

                <label className="block">
                  <div className="text-xs font-bold text-slate-300">What should we discuss?</div>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-[rgba(96,165,250,0.2)] bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[rgba(96,165,250,0.35)] focus:bg-white/7"
                    placeholder="A quick summary (optional)…"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-extrabold text-white shadow-[0_0_40px_rgba(37,99,235,0.22)] transition hover:bg-[#2a6cf0]"
                >
                  Continue to {method === 'email' ? 'Email' : 'WhatsApp'} →
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

