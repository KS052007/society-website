/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const launchRoutes = (process.env.VITE_LAUNCH_ROUTES || 'home,events')
  .split(',')
  .map((s) => s.trim().toLowerCase())

const isArticlesLive = launchRoutes.includes('articles')
const isResourcesLive = launchRoutes.includes('resources')
const isDashboardLive = launchRoutes.includes('dashboard')

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  define: {
    __LAUNCH_ARTICLES__: JSON.stringify(isArticlesLive),
    __LAUNCH_RESOURCES__: JSON.stringify(isResourcesLive),
    __LAUNCH_DASHBOARD__: JSON.stringify(isDashboardLive),
  },
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
