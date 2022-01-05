import { ShowContentInterface } from '../../types'

export const formatTableItem = (item: ShowContentInterface) => {
  Object.keys(item).forEach((key: string | number) => {
    // TODO 这样是否会不符合类型
    item[key] = item[key] || '--'
  })
}
