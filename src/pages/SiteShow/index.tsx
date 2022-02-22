import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tag } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import './index.css'
import './index.scss'
import { getCurrentTab, catchLocalData } from '~/src/adapterContent/helper'
import { ExtensionId } from '@/adapterTool/helper'
import { ShowContentInterface } from './types'

// 页面内容完成渲染
function SiteShow() {
  const [tabList, setTab] = useState<Array<ShowContentInterface>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [special, setSpecial] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    // componentDidMount 初始化时加载一次
    // index页面，判断当前页面所处内容，跳转到对应的路由
    initData()

    // componentDidUmount 组件卸载时调用一次
    return () => {
      // console.log('卸载')
    }
  }, [])

  async function initData() {
    const res = await getCurrentTab()

    if (ExtensionId && res.url?.includes(ExtensionId)) {
      // 跳转到其它页面
      navigate('/History')

      return
    }

    setLoading(true)
    const list: any = await catchLocalData()

    console.log('popup: 获取当前页面的TDKI信息', list)
    if (!list.length) {
      return setSpecial(true)
    }

    setTab(list)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }

  // 复制词条内容
  const clipSome = (content: any) => {
    navigator.clipboard.writeText(content)
  }

  const excludeKeys = ['tabId']

  // Render 渲染
  return (
    <div>
      {special ? (
        <div className="xy-none-info">该页面无法获取网页信息！</div>
      ) : (
        <div className="site-show">
          {' '}
          {loading ? (
            <div className="xy-show-loading flex items-center justify-center" style={{ height: '100vh' }}>
              <RedoOutlined style={{ fontSize: '42px', color: 'white' }} />
            </div>
          ) : (
            <div className="app-show">
              {tabList.map((item: ShowContentInterface, index: number) => {
                return (
                  <div
                    className={`come-item  mb-10px` + (excludeKeys.includes(item.title) ? 'come-none' : '')}
                    key={index}
                  >
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
                              <div
                                className="xy-auto-webs-panel-item-img-url  xy-select-all"
                                onClick={() => clipSome(imgItem)}
                              >
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
      )}
    </div>
  )
}

export default SiteShow
