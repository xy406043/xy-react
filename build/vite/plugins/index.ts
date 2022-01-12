import type { Plugin, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import UnocssConfig from '../../../windi.config'
import { configAutoIconsPlugin } from './icons'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

  // 初始化vite Plugin
  const vitePlugins: (PluginOption | PluginOption[])[] = [react()]

  // unocss
  vitePlugins.push(Unocss(UnocssConfig))

  // unplugin-icon
  vitePlugins.push(configAutoIconsPlugin(isBuild))

  // 生产才使用
  if (isBuild) {
  }
  return vitePlugins
}
