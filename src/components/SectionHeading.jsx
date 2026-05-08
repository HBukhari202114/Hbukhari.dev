import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="container-pad">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mx-auto max-w-2xl text-center"
      >
        {eyebrow ? (
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[rgba(96,165,250,0.22)] bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_14px_rgba(96,165,250,0.45)]" />
            <span>{eyebrow}</span>
          </div>
        ) : null}
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 text-balance text-sm leading-relaxed text-slate-300 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </motion.div>
    </div>
  )
}

