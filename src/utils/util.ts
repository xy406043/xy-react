import { $ams, $ame } from './notice'

/**
 * 检查类型
 * @param item 任意
 * @returns 返回类型
 */
export const checkType = (item: any): string => {
  return Object.prototype.toString.call(item).slice(8, 13)
}

/**
 * 复制文字
 * @param str 文本内容
 * @param tip 复制成功提醒
 * @returns
 */
export const copyText = (str: string, tip = '复制成功') => {
  try {
    navigator.clipboard.writeText(str)
    $ams(tip)
  } catch (err: any) {
    $ame(err.toString())
  }
}
