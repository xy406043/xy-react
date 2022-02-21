import db from '@/adapterTool/db'
import { SystemConfig } from '@/config/themeConfig'

/**
 * 获取本地的主题色配置
 */
export const catchLocalTheme = async () => {
  const localTheme = (await db.get('XyLocalThemeConfig')) || SystemConfig.theme

  return localTheme
}
