import adapter from './build/scripts/adapter'
import { defineConfig } from 'vite'
import { ShareConfig } from './vite.config'
import { r } from './build/utils'

export default defineConfig(({ command }) => ({
  ...ShareConfig,
  publicDir: false,
  build: {
    outDir: r(`extension/${adapter.platform}/dist/back`),
    cssCodeSplit: false,
    emptyOutDir: true,
    sourcemap: 'inline',
    lib: {
      entry: r('src/background/index.ts'),
      name: 'back'
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
