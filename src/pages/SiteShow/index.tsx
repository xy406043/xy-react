import { useState, useEffect } from 'react'
import { Tag } from 'antd'
import './index.css'
import './index.scss'
import { catchLocalData } from '@/utils/index'

interface ShowContentInterface {
  title: string
  key?: string
  type?: string
  content: any
}

// 页面内容完成渲染
function SiteShow() {
  const [tabList, setTab] = useState<Array<ShowContentInterface>>([])
  const [special, setSpecial] = useState<boolean>(false)

  useEffect(() => {
    // componentDidMount 初始化时加载一次
    catchLocalData().then((list: any) => {
      if (!list.length) {
        return setSpecial(true)
      }
      setTab(list)
    })

    // componentDidUmount 组件卸载时调用一次
    return () => {
      // console.log('卸载')
    }
  }, [])

  // 复制词条内容
  const clipSome = (content: any) => {
    navigator.clipboard.writeText(content)
  }

  const excludeKeys = ['tabId']

  // Render 渲染
  return (
    <div className="site-show">
      {special ? (
        <div className="xy-none-info">该页面无法获取网页信息！</div>
      ) : (
        <div className="app-show">
          {tabList.map((item: ShowContentInterface, index: number) => {
            return (
              <div className={`come-item ` + (excludeKeys.includes(item.title) ? 'come-none' : '')} key={index}>
                <div className="xy-auto-webs-panel-item-title">
                  <Tag> {item.title}</Tag>
                </div>
                <div className="xy-auto-webs-panel-item-content">
                  {item.type === 'text' && (
                    <div className=" xy-select-all" onClick={() => clipSome(item.content)}>
                      {item.content}
                    </div>
                  )}
                  {item.type === 'img' &&
                    item.content.map((imgItem: string, index: number) => {
                      return (
                        <div key={index}>
                          <div className="xy-auto-webs-panel-item-img-url  xy-select-all" onClick={() => clipSome(imgItem)}>
                            {imgItem}
                          </div>
                          <img className="xy-auto-webs-panel-item-img" src={imgItem} />
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SiteShow
