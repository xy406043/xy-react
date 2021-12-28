// content-scripts 向原页面注入脚本。 或者 在popup.js  中   通过chrome.scripting.executeScript 动态注入脚本
// 以上 都 无法获取 原页面Js。 如需此等操作 ，则需使用 inject-scripts

// content-scrips 要做的事情比较简单  根据插件需要的内容 获取页面的信息。
// 而后将其发送给background 通过chrome.storage 存储 (依据tabId进行存储) ，当点击 popup 的时候 ，popup.js 也就可以通过chrome.storage 获取

// !! 原chrome 插件 在background 进行存储，似乎只要在 content-scripts 中进行存储即可 ，这样是不是就不需要判断选项卡了

// content-scripts 只能访问以下Api
// chrome.runtime
// chrome.extension (manifest_version <=2)
// chrome.i18n
// chrome.storage

// TODO  简化代码，使用 正则进行标签匹配

let localPageDataInfo = {}
let showIconsList = []
let showImagesList = []
const httpRegex = new RegExp(/http/)

loadScript()

// 监听来自 background 的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'tabUpdated') {
    loadScript()
  }

  sendResponse('background你好，我收到了你的消息！')
})

// 将内容存储在 storage 区域
// TODO  异步将页面数据调取后完成存储，当重新点击 popup时，对于已存储的tabId，直接使用原有的数据
// TODO  id 页面发生变化时刷新调取内容
function savePageData(dataInfo) {
  let result = []
  Object.keys(dataInfo).forEach(item => {
    const imgKeys = ['icons', 'imgs']
    result.push({
      title: item,
      type: imgKeys.includes(item) ? 'img' : 'text',
      content: dataInfo[item]
    })
  })
  chrome.storage.sync.get(['LocalPageData'], res => {
    chrome.storage.sync.set({ LocalPageData: [result] }, () => {
      // console.log('xy-react 设置数据成功', result)
    })
  })
}

async function loadScript(id) {
  LocalPageDataInfo = []
  showIconsList = []
  showImagesList = []

  loadInfo(true)

  async function loadInfo(hasLoadFetch) {
    // ================================ 获取网页的 Icon =================================
    async function getIcons() {
      let requestList = []
      // 方式一 直接获取link属性 截取url。 shortcut icon 是过时的写法
      requestList.push(
        new Promise((resolve, reject) => {
          const textArr = ['shortcut icon', 'icon', 'alternate icon', 'mask-icon', 'apple-touch-icon']
          textArr.forEach(item => {
            let checkHref = document.querySelector(`link[rel="${item}"]`)?.href
            if (checkHref) showIconsList.push(checkHref)
          })
          resolve()
        })
      )

      // 方式二 PWA 应用可以获取根域名的manifest  有链接的返回链接 没有的直接进行拼接
      // 只有 fetch 引入成功时才可以使用
      if (hasLoadFetch) {
        requestList.push(
          new Promise((resolve, reject) => {
            let pwaUrl = document.querySelector('link[rel="manifest"]')?.href
            if (pwaUrl) {
              fetch(pwaUrl)
                .then(async res => {
                  let data = await res.json()

                  if (!data.icons || !data.icons.length) return

                  data.icons.forEach((iconItem, iconIndex) => {
                    let url = httpRegex.test(iconItem.src) ? iconItem.src : document.location.origin + '/' + iconItem.src
                    showIconsList.push(url)
                  })

                  resolve()
                })
                .catch(() => {
                  resolve()
                })
            } else {
              resolve()
            }
          })
        )
      }

      // 方式三 未设置 link rel=type,而是直接放到网站根目录下，浏览器会  直接获取 favicon.ico
      requestList.push(
        new Promise((resolve, reject) => {
          let img = new Image()
          img.src = document.location.origin + '/favicon.ico'
          img.crossOrigin = 'anonymous'
          img.onload = function () {
            console.log('添加icon')
            showIconsList.push(img.src)
            resolve()
          }
          img.onerror = function () {
            console.log('该链接无效')
            resolve()
          }
        })
      )

      return Promise.all(requestList)
    }

    // 获取网页描述
    function getDesc() {
      const textArrDes = ['description', 'twitter:description']
      const richList = ['og:description', 'twitter:description']
      let oMe = document.getElementsByTagName('meta')

      let descList = []
      for (let i = 0; i < oMe.length; i++) {
        if (textArrDes.includes(oMe[i].getAttribute('name'))) {
          descList.push(oMe[i].getAttribute('content'))
        }
        if (richList.includes(oMe[i].getAttribute('property'))) {
          descList.push(oMe[i].getAttribute('content'))
        }
      }
      // console.log("描述List", descList);

      return descList
    }

    // ========================== 获取网页预览图 =====================================
    async function getImgs() {
      const textArrDes = ['image', 'twitter:image', 'twitter:image:src']
      const richList = ['og:image']
      const catchProperty = ['name', 'property', 'itemprop']
      let oMe = document.getElementsByTagName('meta')

      let subImgs = []
      // 摆烂 - 没有的不会匹配到 - 就这样吧
      for (let i = 0; i < oMe.length; i++) {
        catchProperty.forEach(y => {
          let imgContent = oMe[i].getAttribute('content')

          let url = httpRegex.test(imgContent) ? imgContent : document.location.origin + '/' + imgContent

          if (textArrDes.includes(oMe[i].getAttribute(y))) {
            subImgs.push(url)
          }
          if (richList.includes(oMe[i].getAttribute(y))) {
            subImgs.push(url)
          }
        })
      }
      // console.log("预览图List", subImgs);
      showImagesList = subImgs
    }

    // 获取网页title
    const titles = document.getElementsByTagName('title')
    const pageTitle = titles[0]?.innerText

    // 获取网页链接
    const linkUrl = window.location.href

    // description
    const desc = getDesc()[0] || ''

    // 获取网页关键词
    const keywords = document.querySelector('meta[name="keywords"]')?.content || ''

    // 获取网页icon
    const iconResult = await getIcons()
    console.log('添加icons完成', iconResult)

    // 获取网页预览图
    getImgs()

    addContent()

    // 将获取到的数据 传输给background.js 或者 popup.js
    function addContent() {
      let pageData = {
        tabId: id || 0,
        pageTitle,
        linkUrl,
        desc,
        keywords,
        icons: showIconsList,
        imgs: showImagesList
      }
      LocalPageDataInfo = pageData
      console.log('xy-react 获取页面数据内容', pageData, LocalPageDataInfo)
      savePageData(pageData)
    }
  }
}
