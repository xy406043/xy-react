import React, { useEffect, useState } from 'react'
import './index.scss'
import { Button, Table } from 'antd'
import { HistoryColumns } from './config'
import { nanoid } from 'nanoid'
import clonedeep from 'lodash.clonedeep'

export default function SiteHistory() {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    initData()
  }, [])

  function initData() {
    // 获取localStorage 数据
    chrome.storage.sync.get(['LocalPageData'], (res: any) => {
      console.log('获取chromeLocalPageData 数据', res.LocalPageData)
      const resultArray = [] as any
      res.LocalPageData.forEach(item => {
        const showItem = {
          subInfo: clonedeep(item)
        }
        item.forEach(key => {
          showItem[key.title] = key.content
        })

        resultArray.push(showItem)
      })
      console.log('输出结果', resultArray)
      setTableData(resultArray)
    })
  }

  return (
    <div className="site-history mt-40px">
      <Table key={nanoid()} columns={HistoryColumns} dataSource={tableData} />
    </div>
  )
}
