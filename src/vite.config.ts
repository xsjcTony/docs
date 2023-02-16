import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'


export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../.vitepress', import.meta.url))
    }
  },
  server: {
    host: true
  }
})
