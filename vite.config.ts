import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { prerenderPlugin } from './vite/prerender'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderPlugin()],
})
