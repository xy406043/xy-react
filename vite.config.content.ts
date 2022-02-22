import adapter from './build/scripts/adapter'
import { defineConfig } from 'vite'
import { ShareConfig } from './vite.config'
import { r } from './build/utils'

export default defineConfig(({ command }) => ({
  ...ShareConfig,
  publicDir: false, // 设为false 以避免将public内容打包进去
  build: {
    outDir: r(`dist/${adapter.platform}/content-scripts`),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: 'inline',
    lib: {
      entry: r('src/adapterContent/content-scripts/index.ts'),
      name: 'content-scripts'
      // formats: ['es'] // 默认是 ['esm','cjs','umd]，只有es的话会报  export not defined错误
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.js'
      }
    }
  },
  plugins: [...ShareConfig.plugins!]
}))
