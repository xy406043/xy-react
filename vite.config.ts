import { defineConfig, UserConfig, ConfigEnv } from 'vite'
import path from 'path'
import dayjs from 'dayjs'
import adapter from './build/scripts/adapter'
import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugins'
import { createRollupPlugin } from './build/rollup/plugins'

const pathResolve = (dir: string) => {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,

    // vitePlugins
    plugins: createVitePlugins(viteEnv, isBuild),

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

    // 定义全局内容替换，使用需要设置global.d.ts 类型定义
    define: {
      __APP_INFO__: JSON.stringify({
        version: adapter.version,
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        platform: adapter.platform,
        isChrome: adapter.isChrome
      })
    },

    server: {
      port: VITE_PORT
    },

    build: {
      outDir: `dist/${adapter.platform}`, // 不同插件构建到不同的目录
      // 构建后是Es6，(经 tree shaking 之后)不可使用留存require等 commonjs写法，否则会引起报错
      target: 'es2015',
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        external: ['src/antd.custom.css', 'scripts/utils'],
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
