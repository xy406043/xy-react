import { openUrl as chromiumOpenUrl } from '~/src/adapterContent/helper'
import { FirefoxSpecialPages } from '../adapter/firefox/enum'
import { ChromeSpecialPages } from '../adapter/chrome/enum'

/**
 * 必须从环境变量从取出必要参数， 不可从adapter.ts
 */

const env = (key: string) => {
  // console.log('import', __APP_INFO__)
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

/**
 * 扩展ID映射
 */
const ChromeExtensionId = 'bcnaccipofjingkpleggogbhlpnbaehi'
const FirefoxExtensionId = 'd19045ea-f0d0-4e41-a3d7-ee37b159b8ef'
const EdgeExtensionID = 'dkaajmgiemjgbcdcingkohiodmidpimd'
const ExtensionIdMap = {
  chrome: ChromeExtensionId,
  firefox: FirefoxExtensionId,
  edge: EdgeExtensionID
}

export const ExtensionId = ExtensionIdMap[env('platform')]

/**
 * 排除页面映射
 */

const ExcludesPagesMap = {
  chrome: ChromeSpecialPages,
  firefox: FirefoxSpecialPages,
  edge: []
}

export const excludePages = ExcludesPagesMap[env('platform')]

/**
 * 部分内容导出展示
 */

export const AdapterToolContent = {
  ExtensionId
}
