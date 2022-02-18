export {}

declare global {
  const __APP_INFO__: {
    version: string
    lastBuildTime: string
    platform: string
    isChrome: boolean
  }

  type Recordable<T = any> = Record<string, T>

  interface ViteEnv {
    VITE_PORT: number
    VITE_USE_MOCK: boolean
    VITE_USE_PWA: boolean
    VITE_PUBLIC_PATH: string
    VITE_PROXY: [string, string][]
    VITE_GLOB_APP_TITLE: string
    VITE_GLOB_APP_SHORT_NAME: string
    VITE_USE_CDN: boolean
    VITE_DROP_CONSOLE: boolean
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    VITE_LEGACY: boolean
    VITE_USE_IMAGEMIN: boolean
    VITE_GENERATE_UI: string

    // 微信授权使用
    VITE_WX_APP_ID?: string
    VITE_WX_APP_SECRET?: string

    // sass应用的appid
    VITE_SASS_APP_ID?: string

    // 第三方企业微信服务商的appId
    VITE_QY_THIRD_CORP_ID?: string
  }
}
