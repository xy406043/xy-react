import { ChromeSpecialPages } from '/@/enums/chromeEnum'

// 获取当前页面的tab
async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)

  return tab
}

// 获取 content-scripts 存储在storage中的数据
export const catchLocalData = async () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('LocalPageData', async result => {
      const tab: chrome.tabs.Tab = await getCurrentTab()
      console.log('获取链接', tab.url)

      // 特殊页面时 不展示
      if (ChromeSpecialPages.some((x: string) => tab.url?.includes(x))) {
        resolve([])

        return
      }

      // 更新展示页面内容
      console.log('获取接收到的页面信息', result, result['LocalPageData'])
      // resultData = result['LocalPageData'][0]
      const dataResult = result['LocalPageData'][0]
      resolve(dataResult)
    })
  })
}
