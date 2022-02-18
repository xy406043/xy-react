import { fetchWebsInfo } from '@/utils/webUtil'
import { browser } from 'webextension-polyfill-ts'

/**
 * DOM操作获取页面的 标题、图标、链接、预览图等信息
 */
export const loadWebScript = async () => {
  const pageData = await fetchWebsInfo()

  // 传递消息给 background 或者 popup
  browser.runtime.sendMessage(pageData, res => {
    // console.log('content-scripts 收到 来自后台的回复数据', res)
  })
}
