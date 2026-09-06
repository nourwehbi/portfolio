import { Link } from 'react-router-dom'
import { site, sections } from '../lib/content'

export default function Footer() {
  const { identity, nav, socials, footer } = site
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div>
          <p className="eyebrow">{identity.shortRole}</p>
          <p className="footer__title">{identity.fullName}</p>
          <p className="muted" style={{ maxWidth: '34ch' }}>
            {footer.note}
          </p>
        </div>

        <div>
          <p className="footer__heading">Pages</p>
          <ul className="footer__list">
            {nav.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer__heading">Portfolio</p>
          <ul className="footer__list">
            {sections.map((section) => (
              <li key={section.slug}>
                <Link to={`/portfolio/${section.slug}`}>{section.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell footer__bottom">
        <span>
          © {year} {footer.credit}. All rights reserved.
        </span>
        <span style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              {s.label}
            </a>
          ))}
        </span>
      </div>
    </footer>
  )
}
