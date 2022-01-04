import { checkType } from '@/utils/util'

export const HistoryColumns = [
  {
    title: '页面',
    dataIndex: 'linkUrl',
    width: 120,
    textWrap: 'word-break',
    ellipsis: true
  },
  {
    title: '标题',
    dataIndex: 'pageTitle',
    width: 120,
    slots: { customRender: 'pageTitle' },
    textWrap: 'word-break',
    ellipsis: true
  },
  {
    title: '描述',
    dataIndex: 'desc',
    width: 120,
    textWrap: 'word-break',
    ellipsis: true
  },
  {
    title: '关键词',
    dataIndex: 'keywords',
    width: 120,
    textWrap: 'word-break',
    ellipsis: true
  },
  {
    title: '图标',
    dataIndex: 'icons',
    width: 80,
    textWrap: 'word-break',
    ellipsis: true
  },
  {
    title: '预览图',
    dataIndex: 'imgs',
    width: 80,
    textWrap: 'word-break',
    ellipsis: true
  }
]

// TODO  指定类型
export const formatTableItem = (item: any) => {
  if (checkType(item) === 'Array') {
    item.forEach(key => (key.content = key.content || '--'))
  }
}
