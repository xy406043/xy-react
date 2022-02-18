import db from '@/adapterTool/db'
import { SystemConfig } from '@/config/themeConfig'

/**
 * 获取本地的主题色配置
 */
export const catchLocalTheme = async () => {
  // const localTheme = (await db.get('XyLocalThemeConfig')) || SystemConfig.theme

  const localTheme = SystemConfig.theme
  console.log('获取到主题', localTheme, SystemConfig.theme)

  return Promise.resolve(localTheme)
}
