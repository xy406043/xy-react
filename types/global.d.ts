export {}

declare global {
  type Recordable<T = any> = Record<string, T>

  const __APP_INFO__: {
    version: string
    lastBuildTime: string
    platform: string
    isChrome: boolean
  }
}
