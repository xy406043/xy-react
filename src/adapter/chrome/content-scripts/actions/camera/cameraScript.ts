/**
 * 向页面中注入DOM ，嵌入指定React页面的路径 以展示摄像机操作
 *
 */

// TODO 如果无法通过iframe 嵌入内容，那么还是需要直接注入脚本的形式
export const InjectCameraIframe = () => {
  // 如果页面中已经存在摄像头，则不继续进行
  if (document.querySelector('iframe[name="xy-chrome-camera"]')) {
    return
  }
  // 摄像机页面在Chrome中展示的路径
  const JumpUrl = chrome.runtime.getURL('index.html') + '#' + '/XyCameraShow'

  // 创建iframe层
  const iframe: HTMLIFrameElement = document.createElement('iframe')
  iframe.name = 'xy-chrome-camera'
  iframe.className = 'xy-iframe'
  iframe.src = JumpUrl
  iframe.height = '300'
  iframe.width = '300'
  // iframe.sandbox = 'allow-scripts  allow-top-navigation allow-same-origin allow-popups'
  // TODO   Iframe被屏蔽 （掘金插件是如何解除这种屏蔽的？？？？）
  iframe.referrerPolicy = 'no-referrer'

  // 外面包裹几层div 以进行内容嵌入展示，展示之后 可以通过按钮进行隐藏
  const conDiv = document.createElement('div')
  conDiv.className = 'xy-react-camera__content'
  const outerDiv = document.createElement('div')
  outerDiv.className = 'xy-react-camera__outer'

  // 将内容添加到body里；样式文件 通过manifest.json 中 content_scripts的CSS参数进行注入
  outerDiv.appendChild(iframe)
  conDiv.appendChild(outerDiv)
  document.body.appendChild(conDiv)
}

/**
 * 直接注入到页面上。
 *
 * typescripts 中，需要引入 @types/webrtc 并添加到 tsconfig.json中
 * https://stackoverflow.com/questions/13641692/how-to-use-getusermedia-from-typescript/35185230
 */
export const InjectCameraElement = () => {
  if (document.querySelector('video[id="xy-inject-video"]')) {
    return
  }
  // 先创建视频媒体
  const video = document.createElement('video')
  video.id = 'xy-inject-video'
  video.className = 'xy-video'
  document.body.appendChild(video)
  video.addEventListener('click', () => {
    // 点击时移除
    const parent = video.parentElement
    parent?.removeChild(video)
  })

  // 打开摄像头
  const params = {
    audio: false,
    video: {
      width: 300,
      height: 300
    }
  }
  navigator.getUserMedia(
    params,
    stream => {
      // 将画面映射到画布上
      video.srcObject = stream
      video.onloadedmetadata = function (e) {
        video.play()
      }
    },
    err => {
      console.log(err)
    }
  )
}
