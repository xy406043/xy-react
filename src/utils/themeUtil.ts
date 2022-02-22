import db from '~/src/utils/adapter/db'
import { SystemConfig } from '@/enums/themeConfig'

/**
 * 获取本地的主题色配置
 */
export const catchLocalTheme = async () => {
  const localTheme = (await db.get('XyLocalThemeConfig')) || SystemConfig.theme

  return localTheme
}
