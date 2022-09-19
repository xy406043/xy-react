// 自动引入
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'

export function configAutoImportPlugin() {
  const autoImportPlugin = [
    AutoImport({
      imports: [
        {
          'webextension-polyfill': [['default', 'browser']]
        }
      ],
      dts: false
    })
  ]

  return autoImportPlugin
}
