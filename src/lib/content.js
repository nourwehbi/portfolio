/**
 * Single entry point for every piece of content on the site.
 *
 * Nothing in `src/components` or `src/pages` contains copy, image paths or
 * links. Everything is read from the JSON files in `src/content/`, so the site
 * can be updated by editing JSON alone. See CONTENT_GUIDE.md.
 */
import siteJson from '../content/site.json'
import aboutJson from '../content/about.json'
import cvJson from '../content/cv.json'
import portfolioJson from '../content/portfolio.json'
import storiesJson from '../content/stories.json'
import contactJson from '../content/contact.json'
import internshipJson from '../content/internship.json'

/**
 * The path the site is served from — "/" locally, "/portfolio/" on GitHub
 * Pages. Vite sets it from `base` in vite.config.js.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/**
 * The JSON files write file paths from the site root ("/assets/…", "/docs/…")
 * because that is the simplest thing to type and keeps them portable. When the
 * site is served from a subfolder those need the prefix, so every loaded file
 * is walked once here and only those two prefixes are rewritten.
 *
 * Route paths ("/about"), external URLs and mailto:/tel: links are left alone —
 * the router applies its own basename to those.
 */
const isFilePath = (value) =>
  typeof value === 'string' &&
  (value.startsWith('/assets/') || value.startsWith('/docs/'))

const withBase = (value) => {
  if (isFilePath(value)) return BASE + value
  if (Array.isArray(value)) return value.map(withBase)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, withBase(v)]),
    )
  }
  return value
}

export const site = withBase(siteJson)
export const about = withBase(aboutJson)
export const cv = withBase(cvJson)
export const portfolio = withBase(portfolioJson)
export const contact = withBase(contactJson)
export const internship = withBase(internshipJson)

export const stories = withBase(storiesJson).stories ?? []

/** Prefixes a file path that did not come from the content JSON. */
export const asset = (path) => (isFilePath(path) ? BASE + path : path)

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

/** True for a story published elsewhere, which has no page on this site. */
export const isExternalStory = (story) => Boolean(story?.externalUrl)

/**
 * Story navigation: previous / next within the same section. Externally
 * published stories are skipped — they have no article page to link to.
 */
export const storyNeighbours = (id) => {
  const story = getStory(id)
  if (!story) return { prev: null, next: null }
  const siblings = stories.filter(
    (s) => s.section === story.section && !isExternalStory(s),
  )
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
  src?.includes('/assets/')
    ? src.replace(/\/([^/]+)$/, '/thumbs/$1')
    : src
