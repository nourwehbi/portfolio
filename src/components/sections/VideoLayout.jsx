import { useState } from 'react'
import { youtubeThumb } from '../../lib/content'
import { Play } from '../Icons'

/**
 * YouTube embeds are loaded only after a click, so the page does not pull in
 * five players (and their cookies) on first paint.
 */
function VideoPlayer({ video }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="video-frame">
      <button
        type="button"
        className="video-facade"
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${video.title}`}
      >
        <img
          src={video.thumbnail || youtubeThumb(video.youtubeId)}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="video-facade__play">
          <span>
            <Play width={22} height={22} style={{ color: '#fff' }} />
          </span>
        </span>
      </button>
    </div>
  )
}

export default function VideoLayout({ section }) {
  return (
    <div className="video-grid">
      {(section.items ?? []).map((video) => (
        <article className="video-card" key={video.youtubeId}>
          <VideoPlayer video={video} />
          <div style={{ display: 'grid', gap: '0.4rem' }}>
            <p className="meta">
              {[video.type, video.year].filter(Boolean).join(' · ')}
            </p>
            <h3 className="video-card__title">{video.title}</h3>
            {video.description && (
              <p className="video-card__desc">{video.description}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
