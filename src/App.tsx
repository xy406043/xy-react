import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { SystemConfig } from '@/config/themeConfig'

function App() {
  ConfigProvider.config({
    prefixCls: SystemConfig.prefixCls, // 需同时设置 下面的prefixCls 并生成对应prefix的css文件并引入
    theme: SystemConfig.theme
  })

  return (
    //  antd 全局化配置
    <ConfigProvider prefixCls={SystemConfig.prefixCls}>
      <Outlet />
    </ConfigProvider>
  )
}

export default App
