import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from /port/; everywhere else uses the root.
  base: process.env.GITHUB_PAGES ? '/port/' : '/',
  server: {
    port: 3000,
    open: true
  }
})