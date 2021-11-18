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

let localPageDataInfo = {}
let showIconsList = []
let showImagesList = []
const httpRegex = new RegExp(/http/)

loadScriprt()

// 将内容存储在 storage 区域
function savePageData() {
  chrome.storage.sync.get(['LocalPageData'], res => {
    chrome.storage.sync.set({ LocalPageData: [localPageDataInfo] }, () => {
      console.log('设置数据成功')
    })
  })
}

// 更新页面展示内容
function refreshIconImg() {
  savePageData()
}

async function loadScriprt(id) {
  // ~~ 获取网页的 Icon
  function getIcons() {
    // 方式一 直接获取link属性 截取url。 shortcut icon 是过时的写法
    const textArr = ['shortcut icon', 'icon', 'alternate icon', 'mask-icon', 'apple-touch-icon']
    textArr.forEach(item => {
      let checkHref = document.querySelector(`link[rel="${item}"]`)?.href
      if (checkHref) showIconsList.push(checkHref)
    })

    // 方式二 PWA 应用可以获取根域名的manifest  有链接的返回链接 没有的直接进行拼接
    // 只有 fetch 引入成功时才可以使用
    if (hasLoadFetch) {
      let feil = document.querySelector('link[rel="manifest"]')?.href
      // console.log("%c查找mainfest信息", "color:orange", feil);
      if (feil) {
        fetch(feil).then(async res => {
          let data = await res.json()

          if (!data.icons || !data.icons.length) return

          data.icons.forEach((iconItem, iconIndex) => {
            let url = httpRegex.test(iconItem.src) ? iconItem.src : document.location.origin + '/' + iconItem.src
            showIconsList.push(url)
          })

          // console.log(
          //   "%c预存-mainfest.json数据 ",
          //   "color:blue",
          //   data,
          //   showIconsList
          // );

          setTimeout(function () {
            refreshIconImg()
          }, 2000)
        })
      }
    }

    // 方式三 未设置 link rel=type,而是直接放到网站根目录下，浏览器会  直接获取 favicon.ico
    let img = new Image()
    img.src = document.location.origin + '/favicon.ico'
    img.onload = function () {
      showIconsList.push(img.src)

      // console.log("获取到favcion", img.src, showIconsList);
      setTimeout(function () {
        refreshIconImg()
      }, 2000)
    }
    img.onerror = function () {
      console.log('该链接无效')
    }
  }

  // 获取网页描述
  function getDesc() {
    const textArrDes = ['description', 'twitter:description']
    const richArrs = ['og:description', 'twitter:description']
    let metas = document.getElementsByTagName('meta')

    let subMetas = []
    for (let i = 0; i < metas.length; i++) {
      if (textArrDes.includes(metas[i].getAttribute('name'))) {
        subMetas.push(metas[i].getAttribute('content'))
      }
      if (richArrs.includes(metas[i].getAttribute('property'))) {
        subMetas.push(metas[i].getAttribute('content'))
      }
    }
    // console.log("描述List", subMetas);

    return subMetas
  }

  // ~~ 获取网页预览图
  function getImgs() {
    const textArrDes = ['image', 'twitter:image', 'twitter:image:src']
    const richArrs = ['og:image']
    const catchProperty = ['name', 'property', 'itemprop']
    let metas = document.getElementsByTagName('meta')

    let subImgs = []
    // 摆烂 - 没有的不会匹配到 - 就这样吧
    for (let i = 0; i < metas.length; i++) {
      catchProperty.forEach(y => {
        let imgContent = metas[i].getAttribute('content')

        let url = httpRegex.test(imgContent) ? imgContent : document.location.origin + '/' + imgContent

        if (textArrDes.includes(metas[i].getAttribute(y))) {
          subImgs.push(url)
        }
        if (richArrs.includes(metas[i].getAttribute(y))) {
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

  // descipiton
  const desc = getDesc()[0] || ''

  // 获取网页关键词
  const keywords = document.querySelector('meta[name="keywords"]')?.content || ''

  // 获取网页icon
  getIcons()

  // 获取网页预览图
  getImgs()

  // setInterval(() => {
  //   addContent();
  // }, 4000);

  addContent()

  // 将获取到的数据 传输给background.js 或者 popup.js
  function addContent() {
    let pageData = {
      tabId: id,
      pageTitle,
      linkUrl,
      desc,
      keywords,
      icons: showIconsList,
      imgs: showImagesList
    }
    LocalPageDataInfo = pageData

    savePageData()
    // chrome.runtime.sendMessage(pageData, res => {
    //   // console.log("来自后台的回复数据", res);
    // })
  }
}
