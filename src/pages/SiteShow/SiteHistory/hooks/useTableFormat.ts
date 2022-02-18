import { HistoryTableShow } from '../../types'
import { SiteShowOrder } from '@/enums/siteEnum'

export const formatTableItem = (item: HistoryTableShow) => {
  Object.keys(SiteShowOrder).forEach((key: string | number) => {
    // TODO 这样是否会不符合类型
    item[key] = item[key] || '--'
  })
}
