import { useState } from 'react'
import Lightbox from '../Lightbox'
import { thumbFor } from '../../lib/content'

export default function GalleryLayout({ section }) {
  const [open, setOpen] = useState(null)
  const images = section.items ?? []

  return (
    <>
      <div className="gallery">
        {images.map((image, i) => (
          <button
            type="button"
            key={image.src}
            className="gallery__item"
            onClick={() => setOpen(i)}
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <img
              src={thumbFor(image.src)}
              alt={image.alt || `Photograph ${i + 1}`}
              loading={i < 6 ? 'eager' : 'lazy'}
              decoding="async"
              // Falls back to the full-size file when no thumbnail exists yet.
              onError={(e) => {
                if (e.currentTarget.src !== image.src) {
                  e.currentTarget.src = image.src
                }
              }}
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          images={images}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  )
}
