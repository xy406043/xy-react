// ?? unplugin-auto-import 打开会报  can't find estree and its..... 以及 Cannot find name 'Plugin$1'，Did you mean 'Plugin'
// import IconsResolver from 'unplugin-icons/resolver'
// import AutoImport from 'unplugin-auto-import/vite'

import Icons from 'unplugin-icons/vite'

export function configAutoIconsPlugin(isBuild: boolean) {
  const autoIconsPlugin = [
    // !! 报 doesn't exist on type JSX.IntrinsicElements； 直接引用写法吧
    // AutoImport({
    //   // 自动引入 iconify 的 图标 https://github.com/antfu/unplugin-icons#auto-importing
    //   resolvers: [
    //     IconsResolver({
    //       prefix: 'Icon',
    //       extension: 'jsx'
    //     })
    //   ]
    // }),

    // https://github.com/antfu/unplugin-icons
    Icons({
      compiler: 'jsx', // or 'solid'
      jsx: 'react'
    })
  ]
  return autoIconsPlugin
}
