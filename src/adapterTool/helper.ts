import { openUrl as chromiumOpenUrl } from '@/adapter/chrome/helper'
import { getCurrentTab as chromeGetCurrentTab, catchLocalData as chromeCatchLocalData } from '@/adapter/chrome/helper'

/**
 * 必须从环境变量从取出必要参数， 不可从adapter.ts
 */

const env = (key: string) => {
  // console.log('import', __APP_INFO__)
  const appInfo = __APP_INFO__
  if (!appInfo) return ''

  return appInfo[key] || ''
}

/**
 * 打开页面
 * @param url
 * @returns
 */
export const openUrl = (url: string) => {
  if (env('isChrome')) {
    return chromiumOpenUrl(url)
  }

  window.open(url)
}

export const isChrome = !!env('isChrome')

/**
 * 插件识别ID
 */
const CHROME_EXTENSION_ID = 'hkbemkhamjpinblcabpbhhaeicjiginn'
const FIREFOX_EXTENSION_ID = '29354874-1a55-4fbc-9aeb-0dc4ef536486'
export const ExtensionMap = {
  chrome: CHROME_EXTENSION_ID,
  firefox: FIREFOX_EXTENSION_ID
}
export const ExtensionId = ExtensionMap[env('platform')]

/**
 * 插件获取页面内容
 */
const TabCatchMap = {
  chrome: chromeGetCurrentTab,
  firefox: chromeCatchLocalData
}
export const getCurrentTab = TabCatchMap[env('platform')]

/**
 * 插件获取存储的数据
 */
const SaveDataMap = {
  chrome: chromeCatchLocalData
}
export const catchLocalData = SaveDataMap[env['platform']]
