import { Link } from 'react-router-dom'
import { cv } from '../lib/content'
import useDocumentMeta from '../lib/useDocumentMeta'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import { ArrowRight, Download } from '../components/Icons'

export default function CV() {
  useDocumentMeta('CV', cv.summary, cv.originalDocument?.image)

  return (
    <>
      <PageHead
        eyebrow={cv.eyebrow}
        title={cv.title}
        lead={cv.summary}
        crumbs={[{ label: 'CV' }]}
        actions={
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {cv.downloads.map((file) => (
              <a
                key={file.href}
                href={file.href}
                download
                className="btn btn--primary"
              >
                <Download width={16} height={16} />
                {file.label}
              </a>
            ))}
            <Link to="/contact" className="btn btn--ghost">
              Contact me
            </Link>
          </div>
        }
      />

      <section className="section">
        <div className="shell cv-grid">
          <div className="cv-main">
            <Reveal className="cv-block">
              <h2 className="cv-block__title">Education</h2>
              <ul className="timeline">
                {cv.education.map((item) => (
                  <li className="timeline__item" key={item.institution}>
                    <span className="timeline__period">{item.period}</span>
                    <div className="timeline__body">
                      <h3 className="timeline__role">{item.qualification}</h3>
                      <p className="timeline__org">{item.institution}</p>
                      {item.notes && (
                        <p className="timeline__place">{item.notes}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="cv-block">
              <h2 className="cv-block__title">Experience</h2>
              <ul className="timeline">
                {cv.experience.map((item, i) => (
                  <li className="timeline__item" key={`${item.role}-${i}`}>
                    <span className="timeline__period">{item.period}</span>
                    <div className="timeline__body">
                      <h3 className="timeline__role">{item.role}</h3>
                      <p className="timeline__org">{item.organisation}</p>
                      {item.location && (
                        <p className="timeline__place">{item.location}</p>
                      )}
                      {item.points?.length > 0 && (
                        <ul className="timeline__points">
                          {item.points.map((point, n) => (
                            <li key={n}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            {cv.selectedWork?.items?.length > 0 && (
              <Reveal className="cv-block">
                <h2 className="cv-block__title">{cv.selectedWork.title}</h2>
                <ul className="timeline">
                  {cv.selectedWork.items.map((item) => (
                    <li className="timeline__item" key={item.label}>
                      <span className="timeline__period">{item.meta}</span>
                      <div className="timeline__body">
                        <Link to={item.path} className="link-arrow">
                          {item.label}
                          <ArrowRight width={15} height={15} />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <Reveal delay={80} className="cv-aside">
            <div>
              <h2 className="cv-block__title" style={{ marginBottom: '1rem' }}>
                Details
              </h2>
              <ul className="cv-aside__list">
                {cv.details.map((detail) => (
                  <li key={detail.label}>
                    <span className="cv-aside__label">{detail.label}</span>
                    {detail.href ? (
                      <a className="cv-aside__value" href={detail.href}>
                        {detail.value}
                      </a>
                    ) : (
                      <span className="cv-aside__value">{detail.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="cv-block__title" style={{ marginBottom: '1rem' }}>
                Skills
              </h2>
              <div className="chip-row">
                {cv.skills.map((skill) => (
                  <span className="chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="cv-block__title" style={{ marginBottom: '1rem' }}>
                Languages
              </h2>
              <ul className="cv-aside__list">
                {cv.languages.map((lang) => (
                  <li key={lang.name}>
                    <span className="cv-aside__value">{lang.name}</span>
                    <span className="cv-aside__label">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            {cv.lastUpdated && (
              <p className="meta">Last updated {cv.lastUpdated}</p>
            )}
          </Reveal>
        </div>
      </section>

      {cv.originalDocument?.image && (
        <section className="section section--alt">
          <div className="shell shell--narrow cv-doc">
            <Reveal>
              <p className="eyebrow">{cv.originalDocument.title}</p>
            </Reveal>
            <Reveal delay={60}>
              <img
                src={cv.originalDocument.image}
                alt={`${cv.title} — CV`}
                loading="lazy"
              />
            </Reveal>
            {cv.originalDocument.caption && (
              <p className="meta">{cv.originalDocument.caption}</p>
            )}
          </div>
        </section>
      )}
    </>
  )
}
