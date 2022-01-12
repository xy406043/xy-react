import { openUrl as chromiumOpenUrl } from '@/adapter/chrome/helper'

/**
 * 必须从环境变量从取出必要参数， 不可从adapter.ts
 */

const env = (key: string) => {
  console.log('import', __APP_INFO__)
  const appInfo = __APP_INFO__
  if (!appInfo) return ''
  return appInfo[key] || ''
}

export const openUrl = (url: string) => {
  if (env('isChrome')) {
    return chromiumOpenUrl(url)
  }

  window.open(url)
}

export const isChrome = !!env('isChrome')
