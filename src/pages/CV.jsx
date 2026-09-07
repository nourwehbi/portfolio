import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cv } from '../lib/content'
import useDocumentMeta from '../lib/useDocumentMeta'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import DocumentPreview from '../components/DocumentPreview'
import { ArrowRight, Download, Eye } from '../components/Icons'

/** One entry in the Experience / Projects timelines. */
function TimelineEntry({ item }) {
  return (
    <li className="timeline__item">
      <span className="timeline__period">{item.period}</span>
      <div className="timeline__body">
        <h3 className="timeline__role">{item.role}</h3>
        <p className="timeline__org">{item.organisation}</p>
        {item.location && <p className="timeline__place">{item.location}</p>}
        {item.points?.length > 0 && (
          <ul className="timeline__points">
            {item.points.map((point, n) => (
              <li key={n}>{point}</li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export default function CV() {
  const [previewing, setPreviewing] = useState(false)
  useDocumentMeta('CV', cv.summary)

  const pdf = cv.originalDocument?.file

  return (
    <>
      <PageHead
        eyebrow={cv.eyebrow}
        title={cv.title}
        lead={cv.summary}
        crumbs={[{ label: 'CV' }]}
        actions={
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {pdf && (
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setPreviewing(true)}
              >
                <Eye width={16} height={16} />
                Preview CV
              </button>
            )}
            {cv.downloads.map((file) => (
              <a
                key={file.href}
                href={file.href}
                download
                className="btn btn--ghost"
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
                  <TimelineEntry item={item} key={`${item.role}-${i}`} />
                ))}
              </ul>
            </Reveal>

            {cv.projects?.items?.length > 0 && (
              <Reveal className="cv-block">
                <h2 className="cv-block__title">{cv.projects.title}</h2>
                <ul className="timeline">
                  {cv.projects.items.map((item, i) => (
                    <TimelineEntry item={item} key={`${item.role}-${i}`} />
                  ))}
                </ul>
              </Reveal>
            )}

            {cv.courses?.items?.length > 0 && (
              <Reveal className="cv-block">
                <h2 className="cv-block__title">{cv.courses.title}</h2>
                <ul className="course-list">
                  {cv.courses.items.map((course) => (
                    <li key={course.name}>
                      <p className="course-list__name">{course.name}</p>
                      <p className="course-list__meta">
                        {[course.issuer, course.year].filter(Boolean).join(' · ')}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

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
              <div style={{ display: 'grid', gap: '1.1rem' }}>
                {cv.skillGroups.map((group) => (
                  <div key={group.name}>
                    <p className="skill-group__name" style={{ marginBottom: '0.5rem' }}>
                      {group.name}
                    </p>
                    <div className="chip-row">
                      {group.items.map((skill) => (
                        <span className="chip" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
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

      {pdf && (
        <section className="section section--alt section--tight">
          <div className="shell shell--narrow" style={{ display: 'grid', gap: '1.25rem', justifyItems: 'start' }}>
            <p className="eyebrow">{cv.originalDocument.title}</p>
            {cv.originalDocument.caption && (
              <p className="muted">{cv.originalDocument.caption}</p>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setPreviewing(true)}
              >
                <Eye width={16} height={16} />
                Read it here
              </button>
              <a href={pdf} download className="btn btn--ghost">
                <Download width={16} height={16} />
                Download PDF
              </a>
            </div>
          </div>
        </section>
      )}

      {previewing && (
        <DocumentPreview
          title={`${cv.title} — CV`}
          file={pdf}
          downloadFile={pdf}
          onClose={() => setPreviewing(false)}
        />
      )}
    </>
  )
}
