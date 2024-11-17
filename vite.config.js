import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src/app',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  publicDir: '../public',
  server: {
    open: true
  }
})