import { checkPreHref } from '@/utils/webUtil'

let showIconsList = [] as any
let showImagesList = [] as any
const httpRegex = new RegExp(/http/)

// TODO  简化代码，使用 正则进行标签匹配
/**
 * DOM操作获取页面的 标题、图标、链接、预览图等信息
 */
export const loadWebScript = async () => {
  showIconsList = []
  showImagesList = []

  loadInfo(true)

  async function loadInfo(hasLoadFetch) {
    // ================================ 获取网页的 Icon =================================
    async function getIcons() {
      const requestList: Array<any> = []
      // 方式一 直接获取link属性 截取url。 shortcut icon 是过时的写法
      requestList.push(
        new Promise(resolve => {
          const textArr = ['shortcut icon', 'icon', 'alternate icon', 'mask-icon', 'apple-touch-icon']
          textArr.forEach(item => {
            const checkHref: any = document.querySelector(`link[rel="${item}"]`)?.getAttribute('href')

            if (checkHref) showIconsList.push(checkPreHref(checkHref))
          })
          resolve(true)
        })
      )

      // 方式二 PWA 应用可以获取根域名的manifest  有链接的返回链接 没有的直接进行拼接
      // 只有 fetch 引入成功时才可以使用
      if (hasLoadFetch) {
        requestList.push(
          new Promise((resolve, reject) => {
            const pwaUrl = document.querySelector('link[rel="manifest"]')?.getAttribute('href')
            if (pwaUrl) {
              fetch(pwaUrl)
                .then(async res => {
                  const data = await res.json()

                  if (!data.icons || !data.icons.length) return

                  data.icons.forEach(iconItem => {
                    showIconsList.push(checkPreHref(iconItem.src))
                  })

                  resolve(true)
                })
                .catch(() => {
                  resolve(true)
                })
            } else {
              resolve(true)
            }
          })
        )
      }

      // 方式三 未设置 link rel=type,而是直接放到网站根目录下，浏览器会  直接获取 favicon.ico
      requestList.push(
        new Promise(resolve => {
          const img = new Image()
          img.src = document.location.origin + '/favicon.ico'
          img.crossOrigin = 'anonymous'
          img.onload = function () {
            // console.log('添加icon', document.location.origin, img.src)
            showIconsList.push(img.src)
            resolve(true)
          }
          img.onerror = function () {
            // console.log('该链接无效', img.src)
            resolve(true)
          }
        })
      )

      return Promise.all(requestList)
    }

    // 获取网页描述
    function getDesc() {
      const textArrDes = ['description', 'twitter:description']
      const richList = ['og:description', 'twitter:description']
      const oMe: any = document.getElementsByTagName('meta')

      const descList: Array<any> = []
      for (let i = 0; i < oMe.length; i++) {
        if (textArrDes.includes(oMe[i]?.getAttribute('name'))) {
          descList.push(oMe[i].getAttribute('content'))
        }
        if (richList.includes(oMe[i]?.getAttribute('property'))) {
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
      const oMe: any = document.getElementsByTagName('meta')

      const subImgs: Array<string> = []
      // 摆烂 - 没有的不会匹配到 - 就这样吧
      for (let i = 0; i < oMe.length; i++) {
        catchProperty.forEach(y => {
          const imgContent = oMe[i].getAttribute('content') as string
          const url = httpRegex.test(imgContent) ? imgContent : document.location.origin + '/' + imgContent

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
    const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content')

    // 获取网页icon
    await getIcons()

    // 获取网页预览图
    getImgs()

    addContent()

    // 将获取到的数据 传输给background.js 或者 popup.js
    function addContent() {
      const pageData = {
        pageTitle,
        linkUrl,
        desc,
        keywords,
        icons: showIconsList,
        imgs: showImagesList
      }
      // console.log('xy-react 获取页面数据内容', pageData, LocalPageDataInfo)
      chrome.runtime.sendMessage(pageData, res => {
        // console.log('content-scripts 收到 来自后台的回复数据', res)
      })
    }
  }
}
