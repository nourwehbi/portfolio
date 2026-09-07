import { useState } from 'react'
import { Play } from './Icons'

/**
 * A locally hosted vertical clip. The mp4 is only fetched once the visitor
 * presses play (`preload="none"` plus a poster), so a page with several of
 * these still loads quickly.
 */
export default function VideoReel({ video }) {
  const [active, setActive] = useState(false)

  return (
    <figure className="reel">
      <div className="reel__frame">
        {active ? (
          <video
            className="reel__video"
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        ) : (
          <button
            type="button"
            className="reel__facade"
            onClick={() => setActive(true)}
            aria-label={`Play video: ${video.label}`}
          >
            <img src={video.poster} alt="" loading="lazy" decoding="async" />
            <span className="reel__play">
              <span>
                <Play width={20} height={20} />
              </span>
            </span>
            {video.duration && (
              <span className="reel__duration">{video.duration}</span>
            )}
          </button>
        )}
      </div>
      {video.label && <figcaption className="reel__label">{video.label}</figcaption>}
    </figure>
  )
}
