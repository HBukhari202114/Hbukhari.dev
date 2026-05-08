import { useEffect, useMemo, useRef, useState } from 'react'

export function useTypewriter(words, options) {
  const opts = useMemo(
    () => ({
      typeMs: 55,
      deleteMs: 32,
      holdMs: 1100,
      betweenMs: 250,
      ...options,
    }),
    [options],
  )

  const [idx, setIdx] = useState(0)
  const [sub, setSub] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const t = useRef()

  useEffect(() => {
    const word = words[idx % words.length] ?? ''
    const next = () => {
      if (!deleting) {
        const nextSub = Math.min(word.length, sub + 1)
        setSub(nextSub)
        if (nextSub === word.length) {
          t.current = window.setTimeout(() => setDeleting(true), opts.holdMs)
          return
        }
        t.current = window.setTimeout(next, opts.typeMs)
        return
      }

      const nextSub = Math.max(0, sub - 1)
      setSub(nextSub)
      if (nextSub === 0) {
        setDeleting(false)
        setIdx((v) => (v + 1) % words.length)
        t.current = window.setTimeout(next, opts.betweenMs)
        return
      }
      t.current = window.setTimeout(next, opts.deleteMs)
    }

    t.current = window.setTimeout(next, deleting ? opts.deleteMs : opts.typeMs)
    return () => window.clearTimeout(t.current)
  }, [deleting, idx, opts, sub, words])

  const currentWord = words[idx % words.length] ?? ''
  return currentWord.slice(0, sub)
}

