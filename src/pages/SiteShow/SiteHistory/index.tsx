import React, { useEffect, useState } from 'react'
import './index.scss'
import { Button, Table, Tooltip, Space } from 'antd'
import { formatTableItem } from './hooks/useTableFormat'
import { nanoid } from 'nanoid'
import clonedeep from 'lodash.clonedeep'
import { HistoryTableShow } from '../types'
import { ColumnsType } from 'antd/lib/table'
import SiteImgShow from './components/ImgShow'
import SiteTextShow from './components/textShow'
import { commonUtil } from '@/utils'
import { openUrl } from '~/src/adapterTool/helper'
import db from '~/src/adapterTool/db'

/**
 * Storage.sync.set 最大为 800KB
 * Storage.local.set 最大为5M，并不能无限制的进行存储
 * @returns
 */

export default function SiteHistory() {
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [tableData, setTableData] = useState<Array<HistoryTableShow>>([])

  useEffect(() => {
    initData()
  }, [])

  async function initData() {
    setTableLoading(true)

    const res = await db.get(['LocalPageData'])
    const showData = clonedeep(res?.LocalPageData || [])
    // console.log('获取chromeLocalPageData 数据', res.LocalPageData)
    showData.forEach(item => {
      item = formatTableItem(item)
    })
    setTableData(showData)
    setTableLoading(false)
  }

  // 重新设置storage数据并刷新展示
  function toDelWeb(record: HistoryTableShow, index: number) {
    console.log('删除index', index)
    const sourceSub = clonedeep(tableData)
    sourceSub.splice(index, 1)
    setTableData(sourceSub)
  }

  // 清除当前key
  function removeAll() {
    db.remove('LocalPageData')
    setTableData([])
  }

  // 打开窗口跳转到对应的页面
  const jumpTo = record => {
    openUrl(record.linkUrl)
  }

  const HistoryColumns: ColumnsType<HistoryTableShow> = [
    {
      title: '页面',
      dataIndex: 'linkUrl',
      width: 200,
      render: url => (
        <div
          className="site-table__content"
          onClick={() => {
            commonUtil.copyText(url)
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
      render: (value: any, record: HistoryTableShow, index: number) => {
        return (
          <Space size="middle">
            <div className="xy-del text-red-500 cursor-pointer" onClick={() => toDelWeb(record, index)}>
              删除
            </div>
            <div
              className="ml-20px text-blue-500"
              onClick={() => {
                jumpTo(record)
              }}
            >
              jump
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
