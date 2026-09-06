/**
 * Single entry point for every piece of content on the site.
 *
 * Nothing in `src/components` or `src/pages` contains copy, image paths or
 * links. Everything is read from the JSON files in `src/content/`, so the site
 * can be updated by editing JSON alone. See CONTENT_GUIDE.md.
 */
import site from '../content/site.json'
import about from '../content/about.json'
import cv from '../content/cv.json'
import portfolio from '../content/portfolio.json'
import storiesFile from '../content/stories.json'
import contact from '../content/contact.json'

export { site, about, cv, portfolio, contact }

export const stories = storiesFile.stories ?? []

/** All portfolio sections, in the order they appear in portfolio.json. */
export const sections = portfolio.sections ?? []

export const getSection = (slug) => sections.find((s) => s.slug === slug)

export const getStory = (id) => stories.find((s) => s.id === id)

/** Sections flagged `"featured": true` — used on the home page. */
export const featuredSections = sections.filter((s) => s.featured)

/** Stories flagged `"featured": true`, newest first. */
export const featuredStories = stories
  .filter((s) => s.featured)
  .slice()
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))

/**
 * Resolves the items of a `"layout": "stories"` section into full story
 * objects, so a section only has to reference a story by id.
 */
export const resolveStoryItems = (section) =>
  (section?.items ?? []).map((item) => getStory(item.storyId)).filter(Boolean)

/** Counts shown on section cards, e.g. "34 photographs". */
export const countLabel = (section) => {
  const n = section?.items?.length ?? 0
  const nouns = {
    gallery: ['photograph', 'photographs'],
    video: ['video', 'videos'],
    documents: ['piece', 'pieces'],
    stories: ['story', 'stories'],
  }
  const [one, many] = nouns[section?.layout] ?? ['item', 'items']
  return `${n} ${n === 1 ? one : many}`
}

/** Story navigation: previous / next within the same section. */
export const storyNeighbours = (id) => {
  const story = getStory(id)
  if (!story) return { prev: null, next: null }
  const siblings = stories.filter((s) => s.section === story.section)
  const i = siblings.findIndex((s) => s.id === id)
  return {
    prev: i > 0 ? siblings[i - 1] : null,
    next: i < siblings.length - 1 ? siblings[i + 1] : null,
  }
}

export const youtubeThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

/**
 * Grid-sized copy of a photo, produced by `npm run optimize:images`
 * (/assets/photography/photo-01.jpg -> /assets/photography/thumbs/photo-01.jpg).
 * Callers fall back to the full image if the thumbnail has not been generated.
 */
export const thumbFor = (src) =>
  src?.startsWith('/assets/')
    ? src.replace(/\/([^/]+)$/, '/thumbs/$1')
    : src
