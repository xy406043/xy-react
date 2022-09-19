import { ColumnProps } from 'antd/lib/table'

export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>
