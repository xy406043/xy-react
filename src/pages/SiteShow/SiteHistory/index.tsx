import React, { useEffect, useState } from 'react'
import './index.scss'
import { Button, Table, Space } from 'antd'
import { formatTableItem } from "./hooks/useTableFormat"
import { nanoid } from 'nanoid'
import clonedeep from 'lodash.clonedeep'
import { ShowContentInterface } from '../types'
import { ColumnsType } from 'antd/lib/table'

export default function SiteHistory() {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    initData()
  }, [])

  function initData() {
    // 获取localStorage 数据
    chrome.storage.sync.get(['LocalPageData'], (res: any) => {
      const showData = clonedeep(res.LocalPageData)
      console.log('获取chromeLocalPageData 数据', res.LocalPageData)
      showData.forEach(item => {
        item = formatTableItem(item)
      })
      setTableData(showData)
    })
  }

  // TODO 重新设置storage数据并刷新展示
  function toDelWeb(record: ShowContentInterface, index: number) {
    tableData.splice(index, 1)
    setTableData(tableData)

  }


  const HistoryColumns: ColumnsType<ShowContentInterface> = [
    {
      title: '页面',
      dataIndex: 'linkUrl',
      width: 120,
      ellipsis: true
    },
    {
      title: '标题',
      dataIndex: 'pageTitle',
      width: 120,
      ellipsis: true
    },
    {
      title: '描述',
      dataIndex: 'desc',
      width: 120,
      ellipsis: true
    },
    {
      title: '关键词',
      dataIndex: 'keywords',
      width: 120,
      ellipsis: true
    },
    {
      title: '图标',
      dataIndex: 'icons',
      width: 80,
      ellipsis: true
    },
    {
      title: '预览图',
      dataIndex: 'imgs',
      width: 80,
      ellipsis: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 120,
      render: (value: any, record: ShowContentInterface, index: number) => {
        return (
          <Space size="middle">
            <div className='xy-del' onClick={() => toDelWeb(record, index)}>删除</div>
          </Space>
        )
      }
    }
  ]


  return (
    <div className="site-history mt-40px">
      <Table key={nanoid()} columns={HistoryColumns} dataSource={tableData} />
    </div>
  )
}
