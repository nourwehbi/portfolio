import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site, sections, countLabel } from '../lib/content'
import { Close, Menu, Moon, Sun } from './Icons'

export default function Header({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const { identity, nav } = site

  return (
    <>
      <header className="header" data-scrolled={scrolled}>
        <div className="shell header__inner">
          <Link to="/" className="brand">
            <span className="brand__mark">{identity.initials}</span>
            {identity.fullName}
            <span className="brand__role">{identity.shortRole}</span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {nav.map((item) => (
              <div className="nav__item" key={item.path}>
                <NavLink
                  to={item.path}
                  className="nav__link"
                  data-active={isActive(item.path)}
                >
                  {item.label}
                </NavLink>

                {item.hasChildren && sections.length > 0 && (
                  <div className="nav__panel">
                    {sections.map((section) => (
                      <Link
                        key={section.slug}
                        to={`/portfolio/${section.slug}`}
                        className="nav__panel-link"
                      >
                        <span className="nav__panel-title">{section.title}</span>
                        <span className="nav__panel-desc">
                          {section.kicker} · {countLabel(section)}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
            <button
              type="button"
              className="icon-btn nav-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu" id="mobile-menu">
          {nav.map((item) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className="mobile-menu__link"
                data-active={isActive(item.path)}
              >
                {item.label}
              </Link>
              {item.hasChildren &&
                sections.map((section) => (
                  <Link
                    key={section.slug}
                    to={`/portfolio/${section.slug}`}
                    className="mobile-menu__sub"
                  >
                    {section.title}
                    <span className="muted"> · {countLabel(section)}</span>
                  </Link>
                ))}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
