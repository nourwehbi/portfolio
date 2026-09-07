import { useState } from 'react'
import Lightbox from './Lightbox'
import { thumbFor } from '../lib/content'

/** A row of photos that open full size in the shared lightbox. */
export default function PhotoStrip({ photos = [] }) {
  const [open, setOpen] = useState(null)

  if (!photos.length) return null

  return (
    <>
      <div className="photo-strip">
        {photos.map((photo, i) => (
          <button
            type="button"
            key={photo.src}
            className="photo-strip__item"
            onClick={() => setOpen(i)}
            aria-label={`Open image ${i + 1} of ${photos.length}`}
          >
            <img
              src={thumbFor(photo.src)}
              alt={photo.alt || ''}
              loading="lazy"
              decoding="async"
              // `"fit": "contain"` in the JSON keeps a logo or screenshot
              // whole instead of cropping it to fill the tile.
              data-fit={photo.fit ?? 'cover'}
              onError={(e) => {
                if (!e.currentTarget.src.endsWith(photo.src)) {
                  e.currentTarget.src = photo.src
                }
              }}
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          images={photos}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  )
}
