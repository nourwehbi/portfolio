import { resolveStoryItems } from '../../lib/content'
import { StoryCard } from '../Cards'

export default function StoriesLayout({ section }) {
  const stories = resolveStoryItems(section)

  return (
    <div className="story-list">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  )
}
