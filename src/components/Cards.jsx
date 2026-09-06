import { Link } from 'react-router-dom'
import { countLabel, thumbFor } from '../lib/content'
import { ArrowRight } from './Icons'

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

/** Card for one long-form story. */
export function StoryCard({ story }) {
  return (
    <Link to={`/portfolio/${story.section}/${story.id}`} className="story-card">
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
          <span>{story.displayDate}</span>
          <span>{story.readingTime}</span>
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
        <span className="card__more">
          Read the story <ArrowRight width={15} height={15} />
        </span>
      </div>
    </Link>
  )
}
