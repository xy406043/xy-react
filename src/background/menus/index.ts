import CameraMenu from './camera'
import CanvasDraw from './draw'
import { nanoid } from 'nanoid'

const cameraId = nanoid()
const drawId = nanoid()

const ACTION_ID = {
  camera: cameraId,
  draw: drawId
}

const menuTriggerMap = {
  [ACTION_ID.camera]: CameraMenu,
  [ACTION_ID.draw]: CanvasDraw
}

// 监听右侧面板点击
browser.contextMenus.onClicked.addListener((info: browser.contextMenus.OnClickData, tab?: browser.tabs.Tab): void => {
  console.log('调用了右侧菜单内容！', info, tab, cameraId)
  const triggerFunc = menuTriggerMap[info.menuItemId]
  if (triggerFunc) triggerFunc(info, tab)
})

// Extensions using event pages or Service Workers cannot pass an onclick parameter to chrome.contextMenus.create. Instead, use the chrome.contextMenus.onClicked event.
// 因此问题 ，本项目创建右键菜单不可使用onclick 属性

// https://developer.chrome.com/docs/extensions/reference/contextMenus/
const MenuCreator = () => {
  console.log('获取调用次数')
  // 使用removeAll 以避免重复创建插件内容，需要加入插件在内部进行添加即可
  browser.contextMenus.removeAll().then(() => {
    browser.contextMenus.create({
      id: ACTION_ID.camera,
      title: 'xy-调用摄像头',
      visible: true,
      // 在哪些地方鼠标右键可以显示此菜单
      contexts: ['page', 'selection', 'frame', 'link', 'editable', 'image', 'video']
      // onclick: CameraMenu
    })

    browser.contextMenus.create({
      id: ACTION_ID.draw,
      title: 'xy-fabric绘图',
      visible: true
      // onclick: CameraMenu
    })
  })
}

export default MenuCreator
