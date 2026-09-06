import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, Close } from './Icons'

/**
 * Full-screen image viewer with keyboard navigation.
 * `images` is an array of { src, alt, caption, credit }.
 */
export default function Lightbox({ images, index, onClose, onIndexChange }) {
  const closeRef = useRef(null)
  const total = images.length
  const image = images[index]

  const go = useCallback(
    (step) => onIndexChange((index + step + total) % total),
    [index, total, onIndexChange],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [go, onClose])

  if (!image) return null

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="lightbox__bar">
        <span>
          {index + 1} / {total}
        </span>
        <button
          type="button"
          ref={closeRef}
          className="lightbox__close"
          onClick={onClose}
        >
          <Close width={20} height={20} />
          Close
        </button>
      </div>

      <div className="lightbox__stage">
        <img
          key={image.src}
          src={image.src}
          alt={image.alt || image.caption || 'Photograph'}
        />
        {total > 1 && (
          <>
            <button
              type="button"
              className="lightbox__btn lightbox__btn--prev"
              onClick={() => go(-1)}
              aria-label="Previous image"
            >
              <ArrowLeft width={20} height={20} />
            </button>
            <button
              type="button"
              className="lightbox__btn lightbox__btn--next"
              onClick={() => go(1)}
              aria-label="Next image"
            >
              <ArrowRight width={20} height={20} />
            </button>
          </>
        )}
      </div>

      <p className="lightbox__caption">
        {image.caption}
        {image.credit ? ` — ${image.credit}` : ''}
      </p>
    </div>,
    document.body,
  )
}
