import { Fragment } from 'react'
import { Link } from 'react-router-dom'

/**
 * Minimal inline formatter so plain JSON strings can still carry links and
 * emphasis without any HTML in the content files:
 *
 *   [label](https://example.com)   external link (new tab)
 *   [label](/portfolio/video)      internal link (client-side route)
 *   **bold**   *italic*
 *
 * Anything else is rendered as plain text, so content can never inject markup.
 */

// Built per call: a shared /g regex would carry lastIndex between renders.
const tokenizer = () =>
  /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g

const isSafeHref = (href) => {
  const value = String(href).trim().toLowerCase()
  return (
    value.startsWith('/') ||
    value.startsWith('#') ||
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:')
  )
}

export default function RichText({ text }) {
  if (!text) return null

  const nodes = []
  const token = tokenizer()
  let last = 0
  let match
  let key = 0

  while ((match = token.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))

    const [, linkLabel, href, bold, italic] = match

    if (linkLabel && href && isSafeHref(href)) {
      if (href.startsWith('/')) {
        nodes.push(
          <Link key={`l${key++}`} to={href}>
            {linkLabel}
          </Link>,
        )
      } else {
        nodes.push(
          <a
            key={`a${key++}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkLabel}
          </a>,
        )
      }
    } else if (linkLabel) {
      nodes.push(linkLabel)
    } else if (bold) {
      nodes.push(<strong key={`b${key++}`}>{bold}</strong>)
    } else if (italic) {
      nodes.push(<em key={`i${key++}`}>{italic}</em>)
    }

    last = match.index + match[0].length
  }

  if (last < text.length) nodes.push(text.slice(last))

  return (
    <>
      {nodes.map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
    </>
  )
}
