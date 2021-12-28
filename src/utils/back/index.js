// background.js === chrome 插件后台核心
// 可以访问所有chrome Api === 需要在manifest.json 中添加权限
// 无法获取Dom

import { ChromeSpecialPages as excludePages } from '@/enums/chromeEnum'

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)

  return tab
}

//  监听tab页面变化 - 传递给 popup.js 进行数据更新 切换路由、状态变更等
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log('页面发生变化 刷新 or 新建', tabId, changeInfo, tab)
  if (changeInfo.url && excludePages.some(x => changeInfo.url.includes(x))) {
    return
  }
  if (changeInfo.status === 'loading' || !changeInfo.url) {
    return
  }
  // 通知对应的tab页面url变化了,需要优化为离开立即移除，进入则加载完毕再添加
  SendMessage({
    tabId,
    message: { type: 'tabUpdate', tab }
  })
})

// 切换选项卡时
chrome.tabs.onActivated.addListener(async activeInfo => {
  let tab = await getCurrentTab()
  console.log('选项卡发生变化', activeInfo, tab)
  if (tab.url && excludePages.some(x => tab.url.includes(x))) {
    return
  }

  SendMessage({
    tabId: activeInfo.tabId,
    message: { type: 'tabUpdate', tab }
  })
})

function SendMessage(options) {
  chrome.tabs.sendMessage(options.tabId, options.message, function (response) {
    console.log('来自content-script: direct.js的回复：' + response)
  })
}
