import { defineConfig, UserConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import UnocssConfig from './windi.config'
import path from 'path'
import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// ?? unplugin-auto-import 打开会报  can't find estree and its..... 以及 Cannot find name 'Plugin$1'，Did you mean 'Plugin'
// import AutoImport from 'unplugin-auto-import/vite'
import adapter from './scripts/adapter'
import dayjs from 'dayjs'

const pathResolve = (dir: string) => {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  return {
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
          find: '~',
          replacement: pathResolve('') + '/'
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
    // 定义全局内容替换，但是只能在项目内使用(不能在执行vite前使用)
    define: {
      __APP_INFO__: JSON.stringify({
        env: adapter.env,
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    },

    base: './',
    build: {
      // 构建后是Es6，(经 tree shaking 之后)不可使用留存require等 commonjs写法，否则会引起报错
      target: 'es2015',
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        external: ['src/antd.custom.css', 'scripts/utils']
      }
    }
  }
})
