import { Link } from 'react-router-dom'
import useDocumentMeta from '../lib/useDocumentMeta'
import { ArrowRight } from '../components/Icons'

export default function NotFound() {
  useDocumentMeta('Page not found')

  return (
    <div className="shell notfound">
      <p className="eyebrow">404</p>
      <h1 className="display-2">This page has moved on</h1>
      <p className="lead" style={{ maxWidth: '38ch' }}>
        The page you were looking for is not here. The portfolio is a good place
        to pick the trail back up.
      </p>
      <Link to="/portfolio" className="btn btn--primary">
        Go to the portfolio
        <ArrowRight width={16} height={16} />
      </Link>
    </div>
  )
}
