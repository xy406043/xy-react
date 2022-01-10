import React, { useEffect, useState } from 'react'
import './index.scss'
import { Button, Table, Tooltip, Space } from 'antd'
import { formatTableItem } from './hooks/useTableFormat'
import { nanoid } from 'nanoid'
import clonedeep from 'lodash.clonedeep'
import { ShowContentInterface } from '../types'
import { ColumnsType } from 'antd/lib/table'
import SiteImgShow from './components/ImgShow'
import SiteTextShow from './components/textShow'
import { copyText } from '@/utils/util'

/**
 * Storage.sync.set 最大为 800KB
 * Storage.local.set 最大为5M，并不能无限制的进行存储
 * @returns
 */

export default function SiteHistory() {
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [tableData, setTableData] = useState<Array<ShowContentInterface>>([])

  useEffect(() => {
    initData()
  }, [])

  function initData() {
    setTableLoading(true)
    // 获取localStorage 数据
    chrome.storage.local.get(['LocalPageData'], (res: any) => {
      const showData = clonedeep(res.LocalPageData || [])
      console.log('获取chromeLocalPageData 数据', res.LocalPageData)
      showData.forEach(item => {
        item = formatTableItem(item)
      })
      setTableData(showData)
      setTableLoading(false)
    })
  }

  // TODO 重新设置storage数据并刷新展示
  function toDelWeb(record: ShowContentInterface, index: number) {
    console.log('删除index', index)
    const sourceSub = clonedeep(tableData)
    sourceSub.splice(index, 1)
    setTableData(sourceSub)
  }

  function removeAll() {
    chrome.storage.local.remove('LocalPageData')
    setTableData([])
  }

  const HistoryColumns: ColumnsType<ShowContentInterface> = [
    {
      title: '页面',
      dataIndex: 'linkUrl',
      width: 200,
      render: url => (
        <div
          className="site-table__content"
          onClick={() => {
            copyText(url)
          }}
        >
          {url}
        </div>
      )
    },
    {
      title: '标题',
      dataIndex: 'pageTitle',
      width: 200,
      render: text => <SiteTextShow text={text} />
    },
    {
      title: '描述',
      dataIndex: 'desc',
      width: 200,
      render: text => <SiteTextShow text={text} />
    },
    {
      title: '关键词',
      dataIndex: 'keywords',
      width: 120,
      render: text => <SiteTextShow text={text} />
    },
    {
      title: '图标',
      dataIndex: 'icons',
      width: 80,
      render: urls => <SiteImgShow urls={urls} />
    },
    {
      title: '预览图',
      dataIndex: 'imgs',
      width: 80,
      render: urls => <SiteImgShow urls={urls} />
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 120,
      render: (value: any, record: ShowContentInterface, index: number) => {
        return (
          <Space size="middle">
            <div className="xy-del text-red-500 cursor-pointer" onClick={() => toDelWeb(record, index)}>
              删除
            </div>
          </Space>
        )
      }
    }
  ]

  return (
    <div className="site-history mt-40px">
      <Button className="mb-20px" type="primary" ghost onClick={() => removeAll()}>
        清除全部
      </Button>
      <Table
        key={nanoid()}
        scroll={{ x: true }}
        loading={tableLoading}
        columns={HistoryColumns}
        dataSource={tableData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  )
}
