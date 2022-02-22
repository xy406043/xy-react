import type { Plugin, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import UnocssConfig from '../../../windi.config'
// import { configAutoIconsPlugin } from './icons'
import { configAutoImportPlugin } from './import'
import vite from 'unplugin-icons/vite'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  // 初始化vite Plugin
  const vitePlugins: (PluginOption | PluginOption[])[] = [react()]

  // unocss
  vitePlugins.push(Unocss(UnocssConfig))

  // !! unplugin-icon ，构建存在问题，暂不使用了
  // vitePlugins.push(configAutoIconsPlugin(isBuild))

  // unplugin-import
  vitePlugins.push(configAutoImportPlugin(isBuild))

  return vitePlugins
}
