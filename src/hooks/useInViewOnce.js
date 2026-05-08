import { useEffect, useRef, useState } from 'react'

export function useInViewOnce(options) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (e?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.25, ...options },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [inView, options])

  return { ref, inView }
}

