import { Link, Navigate, useParams } from 'react-router-dom'
import { getSection, getStory, storyNeighbours } from '../lib/content'
import useDocumentMeta from '../lib/useDocumentMeta'
import Reveal from '../components/Reveal'
import StoryBlocks from '../components/StoryBlocks'

export default function Story() {
  const { section: sectionSlug, story: storyId } = useParams()
  const story = getStory(storyId)
  const section = getSection(sectionSlug)

  useDocumentMeta(
    story?.titleEn || story?.title,
    story?.deckEn || story?.deck,
    story?.cover,
  )

  if (!story) return <Navigate to="/portfolio" replace />

  // Stories published elsewhere have no page here — send visitors who land on
  // this URL back to the section, where the card links out.
  if (story.externalUrl) {
    return <Navigate to={`/portfolio/${story.section}`} replace />
  }

  const { prev, next } = storyNeighbours(story.id)
  const rtl = story.dir === 'rtl'

  return (
    <article className="article">
      <div className="shell">
        <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to={`/portfolio/${sectionSlug}`}>
                {section?.title ?? sectionSlug}
              </Link>
            </li>
            <li>{story.kicker}</li>
          </ol>
        </nav>

        <Reveal as="header" className="article__head">
          <p className="eyebrow">{story.kicker}</p>
          <h1
            className="article__title"
            dir={story.dir}
            lang={story.lang}
            style={rtl ? { textAlign: 'right' } : undefined}
          >
            {story.title}
          </h1>

          {story.titleEn && (
            <p className="muted" style={{ fontSize: '1rem' }}>
              {story.titleEn}
            </p>
          )}

          <p
            className="article__deck"
            dir={story.dir}
            lang={story.lang}
            style={rtl ? { textAlign: 'right' } : undefined}
          >
            {story.deck}
          </p>

          {story.deckEn && <p className="muted">{story.deckEn}</p>}

          <div className="article__byline">
            <span>
              By <strong>{story.byline}</strong>
            </span>
            <span>{story.displayDate}</span>
            {story.location && <span>{story.location}</span>}
            <span>{story.readingTime}</span>
          </div>
        </Reveal>

        <div
          className="article__body"
          dir={story.dir}
          lang={story.lang}
          style={rtl ? { textAlign: 'right' } : undefined}
        >
          <StoryBlocks blocks={story.blocks} />
        </div>

        {story.sources?.length > 0 && (
          <section className="article__sources">
            <h2>Sources & interviews</h2>
            <ul className="source-list">
              {story.sources.map((source) => (
                <li key={source.name}>
                  <strong>{source.name}</strong>
                  <span>
                    {[source.role, source.type].filter(Boolean).join(' · ')}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(prev || next) && (
          <nav className="article__nav" aria-label="More stories">
            {prev ? (
              <Link to={`/portfolio/${prev.section}/${prev.id}`}>
                <span>Previous</span>
                <strong>{prev.titleEn || prev.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/portfolio/${next.section}/${next.id}`}>
                <span>Next</span>
                <strong>{next.titleEn || next.title}</strong>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </article>
  )
}
