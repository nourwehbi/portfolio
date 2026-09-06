import { Link } from 'react-router-dom'
import { about, site } from '../lib/content'
import useDocumentMeta from '../lib/useDocumentMeta'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import { ArrowRight } from '../components/Icons'

export default function About() {
  useDocumentMeta('About me', about.lead, about.portrait)

  return (
    <>
      <PageHead
        eyebrow={about.eyebrow}
        title={about.title}
        lead={about.lead}
        crumbs={[{ label: 'About' }]}
      />

      <section className="section">
        <div className="shell about-grid">
          <Reveal className="about-portrait">
            <div className="about-portrait__frame">
              <img src={about.portrait} alt={about.portraitCaption} />
            </div>
            <p className="meta">{about.portraitCaption}</p>
          </Reveal>

          <Reveal delay={80} className="about-body">
            {about.body.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'is-lead' : undefined}>
                {paragraph}
              </p>
            ))}

            {about.closing && <p className="callout">{about.closing}</p>}

            <p style={{ marginTop: '0.5rem' }}>
              <Link to="/contact" className="link-arrow">
                Get in touch
                <ArrowRight width={15} height={15} />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="shell">
          <Reveal className="sec-head">
            <div className="sec-head__copy">
              <p className="eyebrow">{about.whatIDo.title}</p>
              <h2 className="display-3">Four ways I tell a story</h2>
            </div>
          </Reveal>

          <Reveal delay={60} className="feature-grid">
            {about.whatIDo.items.map((item, i) => (
              <div className="feature" key={item.title}>
                <span className="feature__index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="feature__title">{item.title}</h3>
                <p className="feature__desc">{item.description}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal className="sec-head">
            <div className="sec-head__copy">
              <p className="eyebrow">{about.skills.title}</p>
              <h2 className="display-3">Toolkit</h2>
            </div>
          </Reveal>

          <Reveal delay={60} className="skill-groups">
            {about.skills.groups.map((group) => (
              <div className="skill-group" key={group.name}>
                <p className="skill-group__name">{group.name}</p>
                <div className="chip-row">
                  {group.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="skill-group">
              <p className="skill-group__name">Languages</p>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {about.languages.map((lang) => (
                  <div key={lang.name}>
                    <strong>{lang.name}</strong>
                    <span className="muted"> — {lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-group">
              <p className="skill-group__name">Beyond the newsroom</p>
              <div className="chip-row">
                {about.interests.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="shell">
          <Reveal className="sec-head">
            <div className="sec-head__copy">
              <p className="eyebrow">{about.values.title}</p>
              <h2 className="display-3">Principles I hold to</h2>
            </div>
          </Reveal>

          <Reveal delay={60} className="feature-grid">
            {about.values.items.map((item, i) => (
              <div className="feature" key={item.label}>
                <span className="feature__index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="feature__title">{item.label}</h3>
                <p className="feature__desc">{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <Reveal className="cta-band">
            <h2>Want the one-page version?</h2>
            <p>
              The CV covers education, experience and skills — or reach out
              directly at {site.identity.location}.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/cv" className="btn btn--primary">
                View CV
                <ArrowRight width={16} height={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
