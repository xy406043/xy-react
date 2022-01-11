import db from '@/adapterTool/db'
import { SystemConfig } from '@/config/themeConfig'

/**
 * 获取本地的主题色配置
 */
export const catchLocalTheme = () => {
  const localTheme = db.get('XyLocalThemeConfig') || SystemConfig.theme
  return localTheme
}
