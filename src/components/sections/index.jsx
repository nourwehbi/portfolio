import GalleryLayout from './GalleryLayout'
import VideoLayout from './VideoLayout'
import DocumentsLayout from './DocumentsLayout'
import StoriesLayout from './StoriesLayout'

/**
 * Maps a section's `"layout"` value in portfolio.json to a renderer.
 * Adding a new kind of subsection means adding one entry here — the routes,
 * navigation and cards all come from the JSON automatically.
 */
const LAYOUTS = {
  gallery: GalleryLayout,
  video: VideoLayout,
  documents: DocumentsLayout,
  stories: StoriesLayout,
}

export default function SectionBody({ section }) {
  const Renderer = LAYOUTS[section.layout]

  if (!Renderer) {
    return (
      <p className="muted">
        No renderer is configured for the layout “{section.layout}”.
      </p>
    )
  }

  return <Renderer section={section} />
}
