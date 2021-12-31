import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import UnocssConfig from './windi.config'
import path from 'path' // package.json 中 type设置了 module，必须使用 import

const pathResolve = (dir: string) => {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Unocss(UnocssConfig), react()],
  css: {},
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      },
      {
        find: '@',
        replacement: pathResolve('src') + '/'
      },
      {
        find: '#',
        replacement: pathResolve('types') + '/'
      }
    ]
  },

  base: './',
  build: {
    target: 'es2015',
    // Turning off brotliSize display can slightly reduce packaging time
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      external: ['src/antd.custom.css']
    }
  }
})
