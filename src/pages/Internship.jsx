import { Link } from 'react-router-dom'
import { internship } from '../lib/content'
import useDocumentMeta from '../lib/useDocumentMeta'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import PhotoStrip from '../components/PhotoStrip'
import VideoReel from '../components/VideoReel'
import { ArrowRight, ExternalLink } from '../components/Icons'

function Placement({ placement }) {
  return (
    <Reveal as="article" className="placement" id={placement.id}>
      <header className="placement__head">
        <span className="placement__index">{placement.index}</span>
        <div className="placement__titles">
          <h2 className="placement__name">{placement.name}</h2>
          <p className="placement__org">{placement.organisation}</p>
        </div>
        <div className="placement__badges">
          <span className="chip">{placement.hours}</span>
          {placement.favourite && (
            <span className="tag">The one I enjoyed most</span>
          )}
        </div>
      </header>

      <div className="placement__grid">
        <div className="placement__body">
          <p className="placement__role">{placement.role}</p>
          {placement.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          {placement.links?.length > 0 && (
            <ul className="placement__links">
              {placement.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <ExternalLink width={15} height={15} />
                    <span>
                      {link.label}
                      {link.note && <em> — {link.note}</em>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {placement.highlights?.length > 0 && (
          <aside className="placement__aside">
            <p className="skill-group__name">What I worked on</p>
            <ul className="placement__tasks">
              {placement.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {placement.photos?.length > 0 && <PhotoStrip photos={placement.photos} />}

      {placement.videos?.length > 0 && (
        <div className="reel-row">
          {placement.videos.map((video) => (
            <VideoReel key={video.src} video={video} />
          ))}
        </div>
      )}
    </Reveal>
  )
}

export default function Internship() {
  useDocumentMeta('Internship experience', internship.lead)

  return (
    <>
      <PageHead
        eyebrow={internship.eyebrow}
        title={internship.title}
        lead={internship.lead}
        crumbs={[{ label: 'Internship' }]}
      />

      {internship.stats?.length > 0 && (
        <div className="stats">
          {internship.stats.map((stat) => (
            <div className="stats__item" key={stat.label}>
              <span className="stats__value">{stat.value}</span>
              <span className="stats__label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      <section className="section">
        <div className="shell placement-list">
          {internship.placements.map((placement) => (
            <Placement key={placement.id} placement={placement} />
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="shell shell--narrow">
          <Reveal style={{ display: 'grid', gap: '1.25rem' }}>
            <p className="eyebrow">{internship.closing.eyebrow}</p>
            <h2 className="display-3">{internship.closing.title}</h2>
            {internship.closing.body.map((paragraph, i) => (
              <p key={i} className="lead">
                {paragraph}
              </p>
            ))}

            <div className="a-list" style={{ marginTop: '0.75rem' }}>
              <p className="a-list__title">
                {internship.closing.recommendationsTitle}
              </p>
              <ol>
                {internship.closing.recommendations.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>

            <p style={{ marginTop: '0.5rem' }}>
              <Link to="/cv" className="link-arrow">
                See the full CV
                <ArrowRight width={15} height={15} />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
