import { Download } from '../Icons'

export default function DocumentsLayout({ section }) {
  return (
    <div className="doc-list">
      {(section.items ?? []).map((doc) => (
        <article className="doc" key={doc.file || doc.title}>
          <span className="doc__icon" aria-hidden="true">
            {doc.format || 'DOC'}
          </span>

          <div className="doc__body">
            <h3 className="doc__title">{doc.title}</h3>
            {doc.description && <p className="doc__desc">{doc.description}</p>}
            <p className="doc__meta">
              {[doc.type, doc.language, doc.date].filter(Boolean).map((bit) => (
                <span key={bit}>{bit}</span>
              ))}
            </p>
          </div>

          {doc.file && (
            <a
              className="btn btn--ghost btn--small doc__action"
              href={doc.file}
              download
            >
              <Download width={15} height={15} />
              Download
            </a>
          )}
        </article>
      ))}
    </div>
  )
}
