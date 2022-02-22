import { ShowContentInterface } from '@/option/pages/SiteShow/types'
import { SiteShowOrder } from '@/enums/siteEnum'

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
 * 扩展ID映射
 */
const ChromeExtensionId = 'geiplnmgainflpopenjefgjndggjnadb'
const FirefoxExtensionId = 'd19045ea-f0d0-4e41-a3d7-ee37b159b8ef'
const EdgeExtensionID = 'dkaajmgiemjgbcdcingkohiodmidpimd'
const ExtensionIdMap = {
  chrome: ChromeExtensionId,
  firefox: FirefoxExtensionId,
  edge: EdgeExtensionID
}

export const ExtensionId = ExtensionIdMap[env('platform')]

// 获取当前页面的tab
export async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true }
  const [tab] = await browser.tabs.query(queryOptions)

  return tab
}

// 获取 content-scripts 存储在storage中的数据
export const catchLocalData = async () => {
  return new Promise(resolve => {
    console.log('获取数据', browser.storage)
    if (!browser?.storage) return resolve([])
    browser.storage.local.get('LocalPageData').then(async result => {
      const tab: browser.tabs.Tab = await getCurrentTab()
      // console.log('获取链接', tab.url)

      // 特殊页面时 不展示
      if (checkSpecialPage(tab?.url)) {
        console.log('特殊页面，不进行展示')
        resolve([])

        return
      }

      const dataResult = result['LocalPageData']?.find(item => item.tabId === tab.id) || {}
      const resultArray: Array<ShowContentInterface> = []
      Object.keys(dataResult).forEach(item => {
        const imgKeys = ['icons', 'imgs']
        resultArray[SiteShowOrder[item]] = {
          title: item,
          type: imgKeys.includes(item) ? 'img' : 'text',
          content: dataResult[item]
        }
      })

      // 更新展示页面内容
      // console.log('获取接收到的页面信息', result['LocalPageData'], tab, dataResult, resultArray)

      resolve(resultArray)
    })
  })
}

/**
 * 排除页面映射
 */

export const excludePages = [
  'chrome://newtab/',
  'chrome://extensions/',
  'chrome://bookmarks',
  'chrome-extension://',
  'edge://newtab/',
  'edge://extensions/',
  'edge://bookmarks',
  'edge-extension://',
  'about:debugging',
  'about:extension'
]

/**
 * 检查是否是特殊页面，如果是特殊页面则不展示tab选项卡信息
 
 */
export const checkSpecialPage = (url: string | undefined) => {
  if (!url) return true

  return excludePages.some((x: string) => url.includes(x))
}

/**
 * 部分内容导出展示
 */

export default {
  envFunc: env,
  ExtensionId
}
