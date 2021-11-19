import { useState, useEffect } from 'react'
import './App.css'
import './App.scss'
import 'antd/dist/antd.css'
import { connect } from 'http2'

const excludePages: Array<string> = ['chrome://newtab/', 'chrome://extensions/', 'chrome://bookmarks', 'chrome-extension://']
const httpRegex = new RegExp(/http/)

interface PageInterface {
  tabId: number
  title?: string
  pageTitle: string
  linkUrl: string
  desc: string
  keywords: string
  icons: Array<string>
  imgs: Array<string>
}
interface ShowContentInterface {
  title: string
  key?: string
  content: Array<string> | string | number
}

// 获取当前页面的tab
async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)

  return tab
}
let resultData: Array<ShowContentInterface> = []
// 获取storage内容并更新到页面上
chrome.storage.sync.get('LocalPageData', async result => {
  const tab: chrome.tabs.Tab = await getCurrentTab()
  console.log('获取链接', tab.url)

  // 特殊页面时 不展示
  if (excludePages.some((x: string) => tab.url?.includes(x))) {
    return
  }

  // 更新展示页面内容
  console.log('获取接收到的页面信息', result)
  resultData = result['LocalPageData'][0]
})

function App() {
  console.log('关于在应用内部使用chrome Api', chrome)

  const [count, setCount] = useState(0)
  const [tabList, setTab] = useState<Array<ShowContentInterface>>(resultData)

  useEffect(() => {
    console.log('数据更新了', count)
  })

  return (
    <div className="App">
      <header className="App-header xy-none-text">
        <div className="mb-10px">Hello Vite + React!</div>
        <p>
          <button type="button" onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
      <main>
        {tabList.map((item: ShowContentInterface, index: number) => {
          return (
            <div className="come-item" key={index}>
              <div className="xy-title">{item.title}</div>
              <div className="xy-content" onClick={() => navigator.clipboard.writeText('https://www.baidu.com')}>
                内容
              </div>
            </div>
          )
        })}
      </main>
    </div>
  )
}

export default App
