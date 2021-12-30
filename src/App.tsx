import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { SystemConfig } from '@/config/themeConfig'

function App() {
  ConfigProvider.config({
    theme: {
      primaryColor: '#1890ff',
      errorColor: '#ff4d4f',
      warningColor: '#faad14',
      successColor: '#52c41a',
      infoColor: '#1890ff'
    }
  })

  return (
    //  antd 全局化配置
    <ConfigProvider>
      <Outlet />
    </ConfigProvider>
  )
}

export default App
