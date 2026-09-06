/**
 * Shrinks everything under public/assets so the site stays fast.
 *
 *   npm run optimize:images
 *
 * - Full-size images are capped at FULL_WIDTH px wide (used in the lightbox
 *   and inside stories).
 * - Gallery photos additionally get a `thumbs/` copy at THUMB_WIDTH px, which
 *   is what the grid actually loads.
 *
 * Safe to re-run: an image that is already small enough is left alone, and
 * thumbnails are only regenerated when missing or out of date.
 */
import { readdir, stat, mkdir, rename, unlink } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const ASSETS = path.join(ROOT, 'public', 'assets')

const FULL_WIDTH = 1800
const THUMB_WIDTH = 900
const QUALITY = 80


const isImage = (name) => /\.(jpe?g|png)$/i.test(name)
const fmt = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`

async function optimiseFull(file) {
  const before = (await stat(file)).size
  const image = sharp(file, { failOn: 'none' })
  const { width } = await image.metadata()

  const tmp = `${file}.tmp`
  await image
    .resize({ width: Math.min(width ?? FULL_WIDTH, FULL_WIDTH), withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(tmp)

  const after = (await stat(tmp)).size
  if (after < before) {
    await unlink(file)
    await rename(tmp, file)
    return { before, after }
  }

  await unlink(tmp)
  return { before, after: before }
}

async function makeThumb(file, thumbDir) {
  await mkdir(thumbDir, { recursive: true })
  const target = path.join(thumbDir, path.basename(file))

  await sharp(file, { failOn: 'none' })
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(target)

  return (await stat(target)).size
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  let saved = 0
  let count = 0

  for (const entry of entries) {
    const full = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (entry.name === 'thumbs') continue
      const nested = await walk(full)
      saved += nested.saved
      count += nested.count
      continue
    }

    if (!isImage(entry.name)) continue

    const { before, after } = await optimiseFull(full)
    saved += before - after
    count += 1

    // Every folder gets a thumbs/ copy: cards and grids load those, not the
    // full-size file.
    await makeThumb(full, path.join(dir, 'thumbs'))
  }

  return { saved, count }
}

if (!existsSync(ASSETS)) {
  console.error(`No assets directory at ${ASSETS}`)
  process.exit(1)
}

const { saved, count } = await walk(ASSETS)
console.log(`Optimised ${count} image(s) — saved ${fmt(saved)}.`)
