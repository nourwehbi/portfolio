import { Link } from 'react-router-dom'
import { countLabel, thumbFor } from '../lib/content'
import { ArrowRight, ExternalLink } from './Icons'

/** Falls back to the full-size file when no thumbnail has been generated. */
const withFallback = (src) => (e) => {
  if (!e.currentTarget.src.endsWith(src)) e.currentTarget.src = src
}

/** Card for one portfolio section (used on Home and the Portfolio hub). */
export function SectionCard({ section }) {
  return (
    <Link to={`/portfolio/${section.slug}`} className="card">
      <div className="card__media">
        <img
          src={thumbFor(section.cover)}
          alt=""
          loading="lazy"
          decoding="async"
          onError={withFallback(section.cover)}
        />
        <span className="card__count">{countLabel(section)}</span>
      </div>
      <div className="card__body">
        <span className="card__kicker">{section.kicker}</span>
        <h3 className="card__title">{section.title}</h3>
        <p className="card__desc">{section.description}</p>
        <span className="card__more">
          Explore <ArrowRight width={15} height={15} />
        </span>
      </div>
    </Link>
  )
}

/**
 * Card for one long-form story. A story with `externalUrl` in stories.json is
 * published elsewhere (Shorthand), so the card opens it in a new tab instead
 * of routing to an on-site article page.
 */
export function StoryCard({ story }) {
  const external = Boolean(story.externalUrl)

  const linkProps = external
    ? {
        href: story.externalUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : { to: `/portfolio/${story.section}/${story.id}` }

  const Tag = external ? 'a' : Link

  return (
    <Tag className="story-card" {...linkProps}>
      <div className="story-card__media">
        <img
          src={thumbFor(story.cover)}
          alt=""
          loading="lazy"
          decoding="async"
          onError={withFallback(story.cover)}
        />
      </div>
      <div className="story-card__body">
        <div className="story-card__meta">
          <span className="tag">{story.kicker}</span>
          {story.displayDate && <span>{story.displayDate}</span>}
          {story.readingTime && <span>{story.readingTime}</span>}
          {external && story.externalLabel && (
            <span className="story-card__host">
              <ExternalLink width={13} height={13} />
              {story.externalLabel}
            </span>
          )}
        </div>

        <h3 className="story-card__title" dir={story.dir} lang={story.lang}>
          {story.title}
        </h3>
        {story.titleEn && (
          <p className="muted" style={{ fontSize: '0.9rem' }}>
            {story.titleEn}
          </p>
        )}

        <p className="story-card__deck" dir={story.dir} lang={story.lang}>
          {story.deck}
        </p>
        {story.deckEn && (
          <p className="story-card__deck muted" style={{ fontSize: '0.88rem' }}>
            {story.deckEn}
          </p>
        )}

        <span className="card__more">
          {external ? 'Read on ' + (story.externalLabel ?? 'the web') : 'Read the story'}
          {external ? (
            <ExternalLink width={14} height={14} />
          ) : (
            <ArrowRight width={15} height={15} />
          )}
        </span>
      </div>
    </Tag>
  )
}
