import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
const path = require('path')

const pathResolve = (dir: string) => {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss({
      // 原子化CSS  ，效果比windicss 好
      // https://github.com/antfu/unocss
      /** */
    }),
    react()
  ],
  css: {
    preprocessorOptions: {
      additionalData: '@import "src/assets/styles/global.scss";'
    }
  },
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      },
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/'
      },
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/'
      }
    ]
  },
  build: {
    target: 'es2015',
    // Turning off brotliSize display can slightly reduce packaging time
    brotliSize: false,
    chunkSizeWarningLimit: 2000
  }
})
