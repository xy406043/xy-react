import adapter from './build/scripts/adapter'
import { defineConfig } from 'vite'
import { ShareConfig } from './vite.config'
import { r } from './build/utils'

export default defineConfig(({ command }) => ({
  ...ShareConfig,
  publicDir: false, // 设为false 以避免将public内容打包进去
  build: {
    outDir: r(`extension/${adapter.platform}/dist/content-scripts`),

    // 此处设置 true 和 false 的区别只是生成的CSS文件名一个是 index  一个是style
    cssCodeSplit: true,
    emptyOutDir: false,
    sourcemap: 'inline',
    lib: {
      entry: r('src/content-scripts/index.ts'),
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
