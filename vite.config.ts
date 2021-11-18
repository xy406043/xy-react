import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'

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
  }
})
