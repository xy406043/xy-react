// content-scripts 向原页面注入脚本。 或者 在popup.js  中   通过chrome.scripting.executeScript 动态注入脚本
// 以上 都 无法获取 原页面Js。 如需此等操作 ，则需使用 inject-scripts

// content-scrips 要做的事情比较简单  根据插件需要的内容 获取页面的信息。
// 而后将其发送给background 通过chrome.storage 存储 (依据tabId进行存储) ，当点击 popup 的时候 ，popup.js 也就可以通过chrome.storage 获取

// content-scripts 只能访问以下Api
// chrome.runtime
// chrome.extension (manifest_version <=2)
// chrome.i18n
// chrome.storage

import { XyMessageType } from '~/src/enums/adapterEnum'

import { loadWebScript } from './actions/webScript'
import { InjectCameraIframe, InjectCameraElement } from './actions/camera/cameraScript'

// 默认加载内容
loadWebScript()

// 监听来自 background 的消息
// TODO: background 页面 通过content-scripts似乎传不到消息给background.js，下面在back中是空的
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse('background你好，我收到了你的消息！' + request.type)
  console.log('接收到来自background的消息', request)

  if (request.type === XyMessageType.TAB_UPDATE) {
    loadWebScript()
  }
  if (request.type === XyMessageType.PAGE_CAMERA) {
    InjectCameraIframe()
    // InjectCameraElement()
  }
})

export default {}
