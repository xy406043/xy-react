import adapter from './build/scripts/adapter'
import { defineConfig } from 'vite'
import { ShareConfig } from './vite.config'
import { r } from './build/utils'

export default defineConfig(({ command }) => ({
  ...ShareConfig,
  publicDir: false,
  build: {
    outDir: r(`dist/${adapter.platform}/content-scripts`),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: 'inline',
    lib: {
      entry: r('src/adapter/chrome/content-scripts/index.ts'),
      name: 'content-scripts'
      // formats: ['es']
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.js'
      }
    }
  },
  plugins: [...ShareConfig.plugins!]
}))
