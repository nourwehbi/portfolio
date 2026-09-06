import { useState } from 'react'
import RichText from './RichText'
import Lightbox from './Lightbox'
import { thumbFor } from '../lib/content'
import { Sound } from './Icons'

function Figure({ block, onOpen }) {
  return (
    <figure className="a-figure">
      <img
        src={block.src}
        alt={block.alt || block.caption || ''}
        loading="lazy"
        decoding="async"
        onClick={onOpen}
        style={{ cursor: onOpen ? 'zoom-in' : undefined }}
      />
      {(block.caption || block.credit) && (
        <figcaption>
          {block.caption}
          {block.credit && <span className="credit">Credit: {block.credit}</span>}
        </figcaption>
      )}
    </figure>
  )
}

function Slideshow({ block, onOpen }) {
  const [active, setActive] = useState(0)
  const images = block.images ?? []
  const current = images[active]

  if (!current) return null

  return (
    <div className="a-slideshow">
      <div className="a-slideshow__stage">
        <img
          src={current.src}
          alt={current.alt || ''}
          loading="lazy"
          decoding="async"
          onClick={() => onOpen?.(active)}
          style={{ cursor: onOpen ? 'zoom-in' : undefined }}
        />
      </div>

      {images.length > 1 && (
        <div className="a-slideshow__thumbs">
          {images.map((image, i) => (
            <button
              type="button"
              key={image.src}
              className="a-slideshow__thumb"
              aria-current={i === active}
              aria-label={`Show image ${i + 1}`}
              onClick={() => setActive(i)}
            >
              <img
                src={thumbFor(image.src)}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}

      {block.credit && (
        <p className="muted" style={{ fontSize: '0.8rem' }}>
          {block.credit}
        </p>
      )}
    </div>
  )
}

/** Renders the `blocks` array of a story from stories.json. */
export default function StoryBlocks({ blocks = [] }) {
  const [viewer, setViewer] = useState(null)

  // Every image in the article, so the lightbox can page through them all.
  const allImages = blocks.flatMap((block) => {
    if (block.type === 'image') return [block]
    if (block.type === 'gallery') return block.images ?? []
    return []
  })

  const openAt = (src) => {
    const index = allImages.findIndex((img) => img.src === src)
    if (index >= 0) setViewer(index)
  }

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={i} className={block.lead ? 'is-lead' : undefined}>
                <RichText text={block.text} />
              </p>
            )

          case 'heading':
            return <h2 key={i}>{block.text}</h2>

          case 'image':
            return (
              <Figure key={i} block={block} onOpen={() => openAt(block.src)} />
            )

          case 'gallery':
            return (
              <Slideshow
                key={i}
                block={block}
                onOpen={(n) => openAt(block.images[n].src)}
              />
            )

          case 'quote':
            return (
              <blockquote key={i} className="a-quote">
                <p>{block.text}</p>
                {block.attribution && <cite>{block.attribution}</cite>}
              </blockquote>
            )

          case 'list': {
            const List = block.style === 'number' ? 'ol' : 'ul'
            return (
              <div key={i} className="a-list">
                {block.title && <p className="a-list__title">{block.title}</p>}
                <List>
                  {(block.items ?? []).map((item, n) => (
                    <li key={n}>
                      <RichText text={item} />
                    </li>
                  ))}
                </List>
              </div>
            )
          }

          case 'note':
            return (
              <p key={i} className="a-note">
                <RichText text={block.text} />
              </p>
            )

          case 'youtube':
            return (
              <figure key={i} className="a-figure">
                <div className="video-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${block.id}?rel=0`}
                    title={block.title || 'Video report'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                {block.title && <figcaption>{block.title}</figcaption>}
              </figure>
            )

          case 'audio':
            return (
              <a
                key={i}
                className="a-audio"
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="a-audio__icon">
                  <Sound width={18} height={18} />
                </span>
                <span style={{ display: 'grid', gap: '0.1rem' }}>
                  <strong style={{ fontSize: '0.98rem' }}>{block.label}</strong>
                  <span className="muted" style={{ fontSize: '0.82rem' }}>
                    Listen on {block.platform || 'the web'}
                  </span>
                </span>
              </a>
            )

          default:
            return null
        }
      })}

      {viewer !== null && (
        <Lightbox
          images={allImages}
          index={viewer}
          onIndexChange={setViewer}
          onClose={() => setViewer(null)}
        />
      )}
    </>
  )
}
