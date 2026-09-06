import { useEffect } from 'react'
import { site } from './content'

const setMeta = (name, content) => {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const setProperty = (property, content) => {
  if (!content) return
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/** Per-page <title> and description, driven by the content JSON. */
export default function useDocumentMeta(title, description, image) {
  useEffect(() => {
    const full = title
      ? `${title} — ${site.identity.fullName}`
      : site.seo.title
    document.title = full

    const desc = description || site.seo.description
    setMeta('description', desc)
    setProperty('og:title', full)
    setProperty('og:description', desc)
    setProperty('og:type', 'website')
    if (image) setProperty('og:image', image)
  }, [title, description, image])
}
