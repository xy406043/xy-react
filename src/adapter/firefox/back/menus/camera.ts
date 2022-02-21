import { getCurrentTab } from '@/adapter/firefox/helper'
import { XyMessageType } from '~/src/enums/adapterEnum'
import { browser } from 'webextension-polyfill-ts'

/**
 * 打开浏览器摄像头创建摄像区域，如有可能，进行视频录制，以及
 * @param info
 * @param tab
 */

// TODO  是否有可能创建子 React 页面程序。 掘金插件的 记个笔记功能。
const CameraMenu = async (info, tab) => {
  // console.log('Camera - 调用了右侧菜单内容！', info, tab)

  //  1. 打开 指定React页面
  const JumpUrl = browser.runtime.getURL('index.html') + '#' + '/XyCameraShow'
  // browser.tabs.create({ url: JumpUrl })

  //  2. 传递消息给 content-scripts，而后 将指定React页面 使用iframe 内嵌到页面中
  const localTab = await getCurrentTab()
  const tabId: number = localTab?.id || 0
  console.log('获取tab', tabId)
  browser.tabs.sendMessage(tabId, { type: XyMessageType.PAGE_CAMERA, tab: localTab }).then(response => {
    console.log('Camera : 收到content-scripts回复：', response)
  })
}

export default CameraMenu
