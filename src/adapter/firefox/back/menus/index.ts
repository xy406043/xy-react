import CameraMenu from './camera'
import DrawMenu from './draw'
import { nanoid } from 'nanoid'
import { XyContextMenuItem } from '~/src/enums/adapterEnum'

const CAMERA_ID = nanoid()
const DRAW_ID = nanoid()

const MenuMap = {
  [CAMERA_ID]: CameraMenu,
  [DRAW_ID]: DrawMenu
}

// 监听右侧面板点击
// 区分不同的子事件
chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): void => {
  console.log('info', info.menuItemId, MenuMap)
  // 调用事件
  const menuFunc = MenuMap[info.menuItemId]
  menuFunc && menuFunc(info, tab)
})

// Extensions using event pages or Service Workers cannot pass an onclick parameter to chrome.contextMenus.create. Instead, use the chrome.contextMenus.onClicked event.
// 因此问题 ，本项目创建右键菜单不可使用onclick 属性

// https://developer.chrome.com/docs/extensions/reference/contextMenus/
const MenuCreator = () => {
  chrome.contextMenus.removeAll(() => {
    // 摄像头
    chrome.contextMenus.create({
      id: CAMERA_ID,
      title: XyContextMenuItem.CAMERA,
      // 出现场景
      contexts: ['all']
    })

    // 绘画
    chrome.contextMenus.create({
      id: DRAW_ID,
      title: XyContextMenuItem.DRAW,
      contexts: ['all']
    })
  })
}

export default MenuCreator
