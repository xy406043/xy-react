// 自动引入

import AutoImport from 'unplugin-auto-import/vite'

export function configAutoImportPlugin(isBuild) {
  const autoImportPlugin = [
    AutoImport({
      imports: [
        {
          'webextension-polyfill': [['default', 'browser']]
        }
      ]
    })
  ]

  return autoImportPlugin
}
