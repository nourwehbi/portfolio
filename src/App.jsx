import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import PortfolioSection from './pages/PortfolioSection'
import Story from './pages/Story'
import CV from './pages/CV'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/**
 * Portfolio subsections and story pages are resolved from portfolio.json and
 * stories.json at render time, so new sections and stories need no new routes.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:section" element={<PortfolioSection />} />
        <Route path="portfolio/:section/:story" element={<Story />} />
        <Route path="cv" element={<CV />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
