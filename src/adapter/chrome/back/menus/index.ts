import CameraMenu from './camera'
import { nanoid } from 'nanoid'

const cameraId = nanoid()

// 监听右侧面板点击
browser.contextMenus.onClicked.addListener((info: browser.contextMenus.OnClickData, tab?: browser.tabs.Tab): void => {
  console.log('调用了右侧菜单内容！', info, tab, cameraId)
  CameraMenu(info, tab)
})

// Extensions using event pages or Service Workers cannot pass an onclick parameter to chrome.contextMenus.create. Instead, use the chrome.contextMenus.onClicked event.
// 因此问题 ，本项目创建右键菜单不可使用onclick 属性

// https://developer.chrome.com/docs/extensions/reference/contextMenus/
const MenuCreator = () => {
  console.log('获取调用次数')
  browser.contextMenus.create({
    id: cameraId,
    title: 'xy-调用摄像头',
    visible: true
    // onclick: CameraMenu
  })
}

export default MenuCreator
