import { getCurrentTab } from '@/utils/adapter/helper'
import { XyMessageType } from '@/enums/adapterEnum'

/**
 * 打开浏览器摄像头创建摄像区域，如有可能，进行视频录制，以及
 * @param info
 * @param tab
 */

// 是否有可能创建子 React 页面程序。 掘金插件的 记个笔记功能。
const CanvasDraw = async (info: browser.contextMenus.OnClickData, tab?: browser.tabs.Tab) => {
  // console.log('Draw - 调用了右侧菜单内容！', info, tab)

  const localTab = await getCurrentTab()
  const tabId: number = localTab?.id || 0
  // console.log('获取tab', tabId)
  browser.tabs.sendMessage(tabId, { type: XyMessageType.MENU_DRAW, tab: localTab }).then(response => {
    console.log('Camera : 收到content-scripts回复：', response)
  })
}

export default CanvasDraw
