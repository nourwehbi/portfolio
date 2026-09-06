import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { site, about, featuredSections, featuredStories } from '../lib/content'
import useDocumentMeta from '../lib/useDocumentMeta'
import Reveal from '../components/Reveal'
import { SectionCard, StoryCard } from '../components/Cards'
import { ArrowRight, Download } from '../components/Icons'

/** Cycles the accent word in the hero headline. */
function Rotator({ words, interval = 2600 }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!words || words.length < 2) return
    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduced) return

    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words, interval])

  if (!words?.length) return null

  return (
    <span className="hero__rotator">
      <span className="hero__word" key={i}>
        {words[i]}
      </span>
      {/* Keeps the line width stable on the longest word. */}
      <span
        aria-hidden="true"
        style={{ gridArea: '1 / 1', visibility: 'hidden' }}
      >
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
    </span>
  )
}

export default function Home() {
  const { identity, hero, homeSections } = site
  useDocumentMeta(null, site.seo.description, identity.heroImage)

  const lead = featuredStories[0]

  return (
    <>
      <section className="hero">
        <div className="shell hero__inner">
          <div className="hero__copy">
            <Reveal>
              <p className="eyebrow">{hero.eyebrow}</p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="hero__title">
                {hero.headlinePrefix}
                <br />
                <Rotator words={hero.rotatingWords} />
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="lead" style={{ maxWidth: '46ch' }}>
                {hero.intro}
              </p>
            </Reveal>

            <Reveal delay={240} className="hero__actions">
              <Link to={hero.primaryCta.path} className="btn btn--primary">
                {hero.primaryCta.label}
                <ArrowRight width={16} height={16} />
              </Link>
              <a
                href={hero.secondaryCta.href}
                className="btn btn--ghost"
                download={hero.secondaryCta.download || undefined}
              >
                <Download width={16} height={16} />
                {hero.secondaryCta.label}
              </a>
            </Reveal>
          </div>

          <Reveal delay={120} className="hero__media">
            <div className="hero__frame">
              <img
                src={identity.heroImage}
                alt={`${identity.fullName}, ${identity.shortRole}`}
                fetchPriority="high"
              />
              <div className="hero__badge">
                <span className="pulse" />
                {identity.availability}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="stats">
        {hero.stats.map((stat) => (
          <div className="stats__item" key={stat.label}>
            <span className="stats__value">{stat.value}</span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ---- about teaser ---- */}
      <section className="section">
        <div className="shell about-grid">
          <Reveal className="about-portrait">
            <div className="about-portrait__frame">
              <img
                src={about.portrait}
                alt={about.portraitCaption}
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={80} className="about-body">
            <p className="eyebrow">{homeSections.aboutTeaser.eyebrow}</p>
            <h2 className="display-3">{homeSections.aboutTeaser.title}</h2>
            <p>{homeSections.aboutTeaser.body}</p>
            <div className="feature-grid" style={{ marginTop: '0.5rem' }}>
              {about.whatIDo.items.map((item, i) => (
                <div className="feature" key={item.title}>
                  <span className="feature__index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="feature__title">{item.title}</h3>
                  <p className="feature__desc">{item.description}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '0.75rem' }}>
              <Link to={homeSections.aboutTeaser.cta.path} className="link-arrow">
                {homeSections.aboutTeaser.cta.label}
                <ArrowRight width={15} height={15} />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- selected work ---- */}
      <section className="section section--alt">
        <div className="shell">
          <Reveal className="sec-head">
            <div className="sec-head__copy">
              <p className="eyebrow">{homeSections.workTeaser.eyebrow}</p>
              <h2 className="display-3">{homeSections.workTeaser.title}</h2>
              <p className="muted">{homeSections.workTeaser.body}</p>
            </div>
            <Link to="/portfolio" className="link-arrow">
              All work
              <ArrowRight width={15} height={15} />
            </Link>
          </Reveal>

          <div className="card-grid">
            {featuredSections.map((section, i) => (
              <Reveal key={section.slug} delay={i * 70}>
                <SectionCard section={section} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- featured story ---- */}
      {lead && (
        <section className="section">
          <div className="shell">
            <Reveal className="sec-head">
              <div className="sec-head__copy">
                <p className="eyebrow">{homeSections.storyTeaser.eyebrow}</p>
                <h2 className="display-3">{lead.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <StoryCard story={lead} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ---- contact band ---- */}
      <section className="section section--tight">
        <div className="shell">
          <Reveal className="cta-band">
            <p className="eyebrow eyebrow--plain" style={{ color: 'inherit', opacity: 0.7 }}>
              {homeSections.contactTeaser.eyebrow}
            </p>
            <h2>{homeSections.contactTeaser.title}</h2>
            <p>{homeSections.contactTeaser.body}</p>
            <Link
              to={homeSections.contactTeaser.cta.path}
              className="btn btn--primary"
            >
              {homeSections.contactTeaser.cta.label}
              <ArrowRight width={16} height={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
