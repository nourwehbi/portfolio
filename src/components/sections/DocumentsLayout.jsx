import { useState } from 'react'
import DocumentPreview from '../DocumentPreview'
import { Download, Eye } from '../Icons'

export default function DocumentsLayout({ section }) {
  const [previewing, setPreviewing] = useState(null)

  return (
    <>
      <div className="doc-list">
        {(section.items ?? []).map((doc) => {
          // A .docx has a generated PDF alongside it; a PDF previews itself.
          const previewFile =
            doc.preview ?? (doc.format === 'PDF' ? doc.file : null)

          return (
            <article className="doc" key={doc.file || doc.title}>
              <span className="doc__icon" aria-hidden="true">
                {doc.format || 'DOC'}
              </span>

              <div className="doc__body">
                <h3 className="doc__title">{doc.title}</h3>
                {doc.description && <p className="doc__desc">{doc.description}</p>}
                <p className="doc__meta">
                  {[doc.type, doc.language, doc.date]
                    .filter(Boolean)
                    .map((bit) => (
                      <span key={bit}>{bit}</span>
                    ))}
                </p>
              </div>

              <div className="doc__action">
                {previewFile && (
                  <button
                    type="button"
                    className="btn btn--primary btn--small"
                    onClick={() =>
                      setPreviewing({ title: doc.title, file: previewFile, downloadFile: doc.file })
                    }
                  >
                    <Eye width={15} height={15} />
                    Preview
                  </button>
                )}
                {doc.file && (
                  <a
                    className="btn btn--ghost btn--small"
                    href={doc.file}
                    download
                  >
                    <Download width={15} height={15} />
                    Download
                  </a>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {previewing && (
        <DocumentPreview
          title={previewing.title}
          file={previewing.file}
          downloadFile={previewing.downloadFile}
          onClose={() => setPreviewing(null)}
        />
      )}
    </>
  )
}
