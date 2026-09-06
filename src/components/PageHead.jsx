import { Link } from 'react-router-dom'

/** Shared page banner: breadcrumb, eyebrow, title, lead. */
export default function PageHead({ eyebrow, title, lead, crumbs = [], actions }) {
  return (
    <section className="page-head">
      <div className="shell page-head__inner">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>
                  {c.path ? <Link to={c.path}>{c.label}</Link> : c.label}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display-2">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {actions}
      </div>
    </section>
  )
}
