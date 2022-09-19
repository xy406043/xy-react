import { defineConfig, UserConfig, ConfigEnv } from 'vite'
import dayjs from 'dayjs'
import adapter from './build/scripts/adapter'
import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugins'
import { createRollupPlugin } from './build/rollup/plugins'
import { r } from './build/utils'

const root = process.cwd()

export const ShareConfig: UserConfig = {
  root,

  // vitePlugins
  plugins: createVitePlugins(),

  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      },
      {
        find: '~',
        replacement: r('') + '/'
      },
      {
        find: '@',
        replacement: r('src') + '/'
      },
      {
        find: '#',
        replacement: r('types') + '/'
      }
    ]
  },

  // 定义全局内容替换，使用需要设置global.d.ts 类型定义
  define: {
    __APP_INFO__: JSON.stringify({
      version: adapter.version,
      lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      platform: adapter.platform,
      isChrome: adapter.isChrome
    })
  },

  optimizeDeps: {
    include: ['webextension-polyfill']
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, root)
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH } = viteEnv
  const isBuild = command === 'build'

  return {
    ...ShareConfig,
    // 静态资源目录
    // publicDir: 'public',

    // https://cn.vitejs.dev/guide/assets.html#the-public-directory
    // 使用构建后的静态层级目录
    base: `/dist/`,
    server: {
      port: VITE_PORT
    },

    // https://vitejs.cn/guide/features.html#css-pre-processors
    // vite内置了 sass、less等css预编译器的解析模块，只需要安装对应的依赖即可使用

    build: {
      outDir: r(`extension/${adapter.platform}/dist`), // 不同插件构建到不同的目录
      // 构建后是Es6，(经 tree shaking 之后)不可使用留存require等 commonjs写法，否则会引起报错
      target: 'es2015',
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        input: [r('src/popup/index.html'), r('src/option/index.html')],
        // 排除编译
        // external: [r('scripts/utils')],
        // todo 异步引入组件 如何生成chunkName
        plugins: createRollupPlugin(),
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
