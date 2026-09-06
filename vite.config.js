import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Where the site is served from.
 *
 * - Locally: "/"
 * - GitHub Pages project site (github.com/user/portfolio -> user.github.io/portfolio/):
 *   "/portfolio/", derived automatically from GITHUB_REPOSITORY in Actions.
 * - GitHub Pages user site (repo named user.github.io) or a custom domain: "/"
 *
 * Override any time with VITE_BASE, e.g. `VITE_BASE=/ npm run build`.
 */
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base =
  process.env.VITE_BASE ??
  (repo && !repo.endsWith('.github.io') ? `/${repo}/` : '/')

/**
 * GitHub Pages cannot rewrite unknown paths to index.html, so a direct visit
 * to /portfolio/about would 404. Shipping an identical 404.html makes Pages
 * serve the app instead, and the router takes it from there.
 */
const spaFallback = () => ({
  name: 'spa-404-fallback',
  apply: 'build',
  // Runs after Vite has written index.html to the output directory.
  writeBundle(options) {
    const dir = options.dir ?? 'dist'
    const index = path.join(dir, 'index.html')
    if (existsSync(index)) copyFileSync(index, path.join(dir, '404.html'))
  },
})

export default defineConfig({
  base,
  plugins: [react(), spaFallback()],
})
