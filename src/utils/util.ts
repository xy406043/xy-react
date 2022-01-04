/**
 * 检查类型
 * @param item 任意
 * @returns 返回类型
 */
export const checkType = (item: any): string => {
  return Object.prototype.toString.call(item).slice(8, 13)
}
