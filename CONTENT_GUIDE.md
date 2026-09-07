# Editing the site

Everything you see on the site — every heading, paragraph, photo, video, link
and CV entry — lives in five JSON files:

```
src/content/
├── site.json        name, tagline, navigation, hero, footer, social links
├── about.json       the About Me page
├── cv.json          the CV page
├── portfolio.json   the portfolio sections (Multimedia, Photography, Video, Text, Research)
├── stories.json     the long-form stories
└── contact.json     the Contact page and its form
```

**No page ever hard-codes text.** Change a JSON file, save, and the page
updates. You never need to touch the code in `src/components` or `src/pages`.

While `npm run dev` is running, the browser refreshes the moment you save.

> One rule: JSON is picky. Every value goes in `"double quotes"`, every item in
> a list is separated by a comma, and the **last** item never has a comma after
> it. If the site goes blank, that is almost always a stray or missing comma.

---

## Adding photos

1. Drop the image files into `public/assets/photography/`.
2. Run `npm run optimize:images` — this shrinks them and builds the small
   preview versions the grid loads.
3. Add one entry per photo to the `photography` section in `portfolio.json`:

```json
{ "src": "/assets/photography/my-new-photo.jpg", "alt": "What the photo shows", "caption": "" }
```

`alt` is read aloud by screen readers and shown if the image fails — describe
the picture in a few words. `caption` appears under the photo in the full-size
viewer; leave it as `""` if you do not want one.

---

## Adding a video

Copy the YouTube video's ID — the part after `v=` in the address bar
(`youtube.com/watch?v=`**`eVY9lsAUWYc`**) — and add it to the `video` section of
`portfolio.json`:

```json
{
  "title": "Title of the video",
  "youtubeId": "eVY9lsAUWYc",
  "type": "Video feature",
  "year": "2026",
  "description": "One or two sentences about it."
}
```

---

## Adding a written piece (op-ed, report, feature)

1. Put the Word file in `public/docs/`.
2. Run `npm run docs:previews`. This makes a PDF copy in
   `public/docs/previews/` so visitors can **read the piece in the browser**
   instead of having to download it. (Needs Microsoft Word on your computer.)
3. Add an entry to the `text` section of `portfolio.json`:

```json
{
  "title": "Headline of the piece",
  "type": "Report",
  "language": "Arabic",
  "description": "What the piece is about.",
  "file": "/docs/my-report.docx",
  "preview": "/docs/previews/my-report.pdf",
  "format": "DOCX"
}
```

`preview` is what the **Preview** button opens. If you leave it out, that piece
gets a Download button only. A piece that is already a PDF needs no `preview` —
set `"format": "PDF"` and it previews itself.

---

## Adding a new story

Stories are the long reads with photos, quotes and subheadings. Add a new
object to the `stories` list in `stories.json`, then reference it from the
`multimedia` section of `portfolio.json`:

```json
{ "storyId": "the-id-you-chose" }
```

A story looks like this:

```json
{
  "id": "my-story",
  "section": "multimedia",
  "kicker": "Multimedia story",
  "title": "The headline",
  "deck": "The standfirst — one or two sentences under the headline.",
  "byline": "Nour Wehbi",
  "date": "2026-03-14",
  "displayDate": "14 March 2026",
  "location": "Beirut, Lebanon",
  "readingTime": "4 min read",
  "lang": "en",
  "dir": "ltr",
  "cover": "/assets/stories/my-story/01.jpg",
  "tags": ["Reporting"],
  "featured": true,
  "sources": [
    { "name": "Person interviewed", "role": "Their job", "type": "Interview" }
  ],
  "blocks": [ ... ]
}
```

- `id` — lowercase, hyphens, no spaces. It becomes the web address.
- `dir` — `"ltr"` for English, `"rtl"` for Arabic. Arabic stories switch to an
  Arabic typeface and right-to-left layout automatically.
- `featured: true` makes the story eligible for the home page.
- `sources` is the list shown at the bottom under **Sources & interviews**.
- `titleEn` / `deckEn` — optional English translation shown under an Arabic
  headline, so an English-speaking reader still knows what the piece is about.

### Linking to a story published somewhere else

For a story that lives on another platform (Shorthand, a newspaper site, a
magazine), give it an `externalUrl` **instead of** `blocks`. It then appears as
a card that opens in a new tab, with no article page on this site:

```json
{
  "id": "my-shorthand-story",
  "section": "multimedia",
  "kicker": "Multimedia story",
  "title": "The headline",
  "deck": "One or two sentences about it.",
  "byline": "Nour Wehbi",
  "date": "2026",
  "displayDate": "2026",
  "lang": "en",
  "dir": "ltr",
  "cover": "/assets/stories/my-shorthand-story/cover.jpg",
  "featured": true,
  "externalUrl": "https://example.com/the-story",
  "externalLabel": "Shorthand"
}
```

`externalLabel` is the platform name shown on the card ("Read on Shorthand").
Save a `cover` image into the project rather than linking to the other site's
image — that way the card keeps working even if the original link changes.

### The building blocks

`blocks` is the body of the story, in order. Mix and match:

| Block | What it does |
| --- | --- |
| `{ "type": "paragraph", "text": "…" }` | A normal paragraph |
| `{ "type": "paragraph", "lead": true, "text": "…" }` | The opening paragraph, with a drop cap |
| `{ "type": "heading", "text": "…" }` | A subheading inside the story |
| `{ "type": "image", "src": "…", "alt": "…", "caption": "…", "credit": "…" }` | A photo with a caption |
| `{ "type": "gallery", "images": [ … ], "credit": "…" }` | A slideshow with thumbnails |
| `{ "type": "quote", "text": "…", "attribution": "…" }` | A pull quote |
| `{ "type": "list", "style": "bullet", "title": "…", "items": ["…"] }` | A bulleted box (`"style": "number"` for numbers) |
| `{ "type": "note", "text": "…" }` | A background/explainer note |
| `{ "type": "youtube", "id": "…", "title": "…" }` | An embedded video |
| `{ "type": "audio", "label": "…", "href": "…", "platform": "SoundCloud" }` | A link to an audio report |

### Links and emphasis inside text

Inside any `"text"` value you can write:

- `[the words you see](https://the-address.com)` — a link
- `**bold**` and `*italic*`

So this:

```json
{ "type": "paragraph", "text": "According to [Al-Akhbar](https://www.al-akhbar.com/), the decision was **contested**." }
```

renders as: According to [Al-Akhbar](https://www.al-akhbar.com/), the decision
was **contested**.

Links starting with `/` (like `/portfolio/video`) stay inside the site.

---

## Adding a whole new portfolio section

Add an object to `sections` in `portfolio.json`. The navigation menu, the
portfolio page, the footer and the web address all pick it up automatically —
no code change needed.

```json
{
  "slug": "podcasts",
  "title": "Podcasts",
  "kicker": "Audio work",
  "description": "Shown under the title.",
  "cover": "/assets/photography/photo-03.jpg",
  "layout": "documents",
  "featured": true,
  "items": []
}
```

`layout` must be one of:

| `layout` | Shows items as |
| --- | --- |
| `"gallery"` | A photo grid with a full-screen viewer |
| `"video"` | A grid of videos |
| `"documents"` | A list of downloadable pieces |
| `"stories"` | A list of long-form stories |

`featured: true` also shows the section on the home page.

---

## The Internship page

`internship.json` holds the whole page. The three placements live in
`placements`, in the order they appear:

```json
{
  "id": "co-creatives",
  "index": "03",
  "name": "CŌ Creatives",
  "organisation": "Creative agency",
  "hours": "120 hours",
  "role": "Content & campaign intern",
  "favourite": true,
  "body": ["First paragraph.", "Second paragraph."],
  "highlights": ["Research", "Script writing"],
  "photos": [{ "src": "/assets/internship/co/photo-01.jpg", "alt": "What it shows" }],
  "videos": [
    {
      "src": "/assets/internship/co/video-01.mp4",
      "poster": "/assets/internship/co/video-01-poster.jpg",
      "label": "Discovery meeting with the team",
      "duration": "0:21"
    }
  ],
  "links": [{ "label": "Log of articles", "note": "Google Sheet", "href": "https://…" }]
}
```

- `highlights` is the "What I worked on" box. `favourite: true` adds the
  "The one I enjoyed most" badge.
- `photos` open full size when clicked. Add `"fit": "contain"` to a photo that
  should not be cropped — a logo or a screenshot.
- `links` are the outward links under the text.
- `stats` at the top of the file is the number strip; add or remove entries and
  the row re-spaces itself.

### Adding a video

Videos are hosted in this project rather than on YouTube, so each needs a
**poster** — the still shown before someone presses play. The clip itself is
only downloaded once play is pressed, which keeps the page fast.

1. Put the `.mp4` in `public/assets/internship/<placement>/`.
2. Save a still frame beside it as `<name>-poster.jpg`. (Any frame from the
   clip works — a screenshot is fine.)
3. Add the entry to that placement's `videos` list, as above.

Then run `npm run optimize:images` so the poster gets shrunk with the rest.

## The contact form

By default the form opens the visitor's own email app with the message
pre-filled. To receive messages straight to your inbox instead:

1. Create a free form at [formspree.io](https://formspree.io) using
   `nur.a.wehbi@gmail.com`.
2. Paste the endpoint it gives you into `contact.json`:

```json
"endpoint": "https://formspree.io/f/xxxxxxxx"
```

That is the only change needed — the form starts sending immediately.

---

## Replacing the CV

The CV exists in two places, and they should always say the same thing:

1. **The file** — replace `public/docs/nour-wehbi-cv.pdf` with your new PDF,
   keeping the same filename. That is what the Preview and Download buttons
   use, on the CV page, the home page and the contact page.
2. **The page** — update `cv.json` so the version rendered on the site matches.

`cv.json` has these lists:

| Key | What it holds |
| --- | --- |
| `summary` | The profile paragraph under your name |
| `details` | Phone, email, location in the sidebar |
| `education` | Degrees — `period`, `institution`, `qualification`, `notes` |
| `experience` | Jobs — `period`, `role`, `organisation`, `points` |
| `projects.items` | Projects & events, same shape as `experience` |
| `courses.items` | Courses — `name`, `issuer`, `year` |
| `skillGroups` | Skills, grouped — `name` plus an `items` list |
| `languages` | `name` and `level` |
| `selectedWork.items` | Links to work elsewhere on the site |
| `lastUpdated` | Shown at the bottom of the sidebar |

To drop a whole block from the page, delete its `items` (an empty list hides
the section). To add a job, copy an existing entry and change the values —
`points` can hold as many bullets as you like.

## Replacing the photos of yourself

- `public/assets/profile/hero.jpg` — the large image on the home page
- `public/assets/profile/portrait.jpg` — the portrait on the About page

Keep the same filenames and they will swap straight in. (To use the portrait on
the home page instead, set `identity.heroImage` in `site.json` to
`/assets/profile/portrait.jpg`.)
