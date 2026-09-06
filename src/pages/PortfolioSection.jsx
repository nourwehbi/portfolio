import { Navigate, useParams } from 'react-router-dom'
import { getSection, countLabel } from '../lib/content'
import useDocumentMeta from '../lib/useDocumentMeta'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import SectionBody from '../components/sections'

export default function PortfolioSection() {
  const { section: slug } = useParams()
  const section = getSection(slug)

  useDocumentMeta(section?.title, section?.description, section?.cover)

  if (!section) return <Navigate to="/portfolio" replace />

  return (
    <>
      <PageHead
        eyebrow={`${section.kicker} · ${countLabel(section)}`}
        title={section.title}
        lead={section.description}
        crumbs={[
          { label: 'Portfolio', path: '/portfolio' },
          { label: section.title },
        ]}
      />

      <section className="section">
        <div className="shell">
          {section.note && (
            <p className="meta" style={{ marginBottom: '1.75rem' }}>
              {section.note}
            </p>
          )}
          <Reveal>
            <SectionBody section={section} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
