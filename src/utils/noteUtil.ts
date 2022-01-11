import { message, notification } from 'antd'

export const $ams = (str: string) => message.success(str)
export const $ame = (str: string) => message.error(str)
export const $amw = (str: string) => message.warning(str)

const baseNots = (type, str, title) =>
  notification[type]({
    message: title,
    description: str
  })
export const $ans = (str: string, title = '成功') => baseNots('success', str, title)
export const $anw = (str: string, title = '警告') => baseNots('warning', str, title)
export const $ane = (str: string, title = '失败') => baseNots('error', str, title)
