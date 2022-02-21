// background.js === browser 插件后台核心
// 可以访问所有browser Api === 需要在manifest.json 中添加权限
// 无法获取Dom

import { FirefoxSpecialPages as excludePages } from '@/adapter/firefox/enum'
import { getCurrentTab } from '@/adapter/firefox/helper'
import clonedeep from 'lodash.clonedeep'
import MenuCreator from './menus'
import { browser } from 'webextension-polyfill-ts'

/**
 * 接收来自 content-scripts/ popup.js的信息
 */
browser.runtime.onMessage.addListener(async function (message, sender) {
  const tab = await getCurrentTab()
  // console.log('已接受到来自content-script的信息', request, sender, sendResponse)

  const res = await browser.storage.local.get(['LocalPageData'])
  const allLocalPage: any = clonedeep(res.LocalPageData) || []
  const localIndex = allLocalPage.findIndex(item => item.tabId === tab.id)
  message.tabId = tab.id
  localIndex === -1 && allLocalPage.push(message)
  localIndex !== -1 && (allLocalPage[localIndex] = message)
  browser.storage.local.set({ LocalPageData: allLocalPage })
})

/**
 *  监听tab页面变化 - 传递给 popup.js 进行数据更新 切换路由、状态变更等
 */
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log('页面发生变化 刷新 or 新建', tabId, changeInfo, tab)
  if (changeInfo.url && excludePages.some(x => changeInfo?.url?.includes(x))) {
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

/**
 * 切换选项卡
 */
browser.tabs.onActivated.addListener(async activeInfo => {
  const tab = await getCurrentTab()
  // console.log('选项卡发生变化', activeInfo, tab)
  if (tab.url && excludePages.some(x => tab?.url?.includes(x))) {
    return
  }

  SendMessage({
    tabId: activeInfo.tabId,
    message: { type: 'tabUpdate', tab }
  })
})

/**
 * 传递消息 给 content-scripts
 * @param options
 *
 */
function SendMessage(options) {
  browser.tabs.sendMessage(options.tabId, options.message)
}

//  右侧菜单指令内容
MenuCreator()
