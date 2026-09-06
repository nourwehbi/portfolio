import { useEffect, useRef, useState } from 'react'

/**
 * Adds a one-shot "has scrolled into view" flag so sections can fade in.
 * Falls back to visible immediately when IntersectionObserver is unavailable
 * or the visitor prefers reduced motion.
 */
export default function useReveal({
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.08,
} = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return [ref, visible]
}
