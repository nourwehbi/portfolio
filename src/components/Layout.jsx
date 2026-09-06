import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import useTheme from '../lib/useTheme'

/** Scrolls to the top on every route change (except hash links). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function Layout() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Header theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
