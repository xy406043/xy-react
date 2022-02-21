import { FirefoxSpecialPages } from '@/adapter/firefox/enum'
import { ShowContentInterface } from '@/pages/SiteShow/types'
import { SiteShowOrder } from '@/enums/siteEnum'
import { browser } from 'webextension-polyfill-ts'

// 获取当前页面的tab
export async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true }
  const [tab] = await browser.tabs.query(queryOptions)

  return tab
}

// 获取 content-scripts 存储在storage中的数据
export const catchLocalData = async () => {
  return new Promise(resolve => {
    if (!browser?.storage) return resolve([])
    browser.storage.local.get('LocalPageData').then(async result => {
      const tab = await getCurrentTab()
      // console.log('获取链接', tab.url)

      // 特殊页面时 不展示
      if (checkSpecialPage(tab?.url)) {
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

// 检查是否是特殊页面，如果是特殊页面则不展示tab选项卡信息
export const checkSpecialPage = (url: string | undefined) => {
  if (!url) return true

  return FirefoxSpecialPages.some((x: string) => url.includes(x))
}

/**
 * 打开页面
 * @param url
 * @returns
 */
export const openUrl = (url: string) => {
  if (url.indexOf('browser://') === 0) {
    return browser.tabs.create({ url: url })
  }

  return window.open(url)
}
