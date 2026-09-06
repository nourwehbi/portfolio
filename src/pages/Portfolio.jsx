import { portfolio, sections } from '../lib/content'
import useDocumentMeta from '../lib/useDocumentMeta'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import { SectionCard } from '../components/Cards'

export default function Portfolio() {
  useDocumentMeta('Portfolio', portfolio.lead)

  return (
    <>
      <PageHead
        eyebrow={portfolio.eyebrow}
        title={portfolio.title}
        lead={portfolio.lead}
        crumbs={[{ label: 'Portfolio' }]}
      />

      <section className="section">
        <div className="shell card-grid">
          {sections.map((section, i) => (
            <Reveal key={section.slug} delay={i * 60}>
              <SectionCard section={section} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
