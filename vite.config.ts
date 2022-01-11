import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import UnocssConfig from './windi.config'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import adapter from '@/adapterTool/adapter'
import dayjs from 'dayjs'

const pathResolve = (dir: string) => {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss(UnocssConfig),
    react(),
    // !! 报 doesn't exist on type JSX.IntrinsicElements； 直接引用写法吧
    // AutoImport({
    //   // 自动引入 iconify 的 图标 https://github.com/antfu/unplugin-icons#auto-importing
    //   resolvers: [
    //     IconsResolver({
    //       prefix: 'Icon',
    //       extension: 'jsx'
    //     })
    //   ]
    // }),
    Icons({
      compiler: 'jsx', // or 'solid'
      jsx: 'react'
    })
  ],
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
  // 定义全局内容替换
  // TODO  自定义vite插件添加到环境变量
  // define: {
  //   __APP_INFO__: JSON.stringify({
  //     env: adapter.env,
  //     lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
  //   })
  // },

  base: './',
  build: {
    target: 'es2015',
    // Turning off brotliSize display can slightly reduce packaging time
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      external: ['src/antd.custom.css', 'scripts/utils']
    }
  }
})
