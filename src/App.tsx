import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { SystemConfig } from '@/config/themeConfig'
import Header from './components/Layout/Header'

function App() {
  // TODO 从本地获取设置，如果没有进行设置则使用默认的主题色
  ConfigProvider.config({
    prefixCls: SystemConfig.prefixCls, // 需同时设置 下面的prefixCls 并生成对应prefix的css文件并引入
    theme: SystemConfig.theme
  })

  const location = useLocation()

  const checkSiteShow = location.pathname === '/'

  useEffect(() => {
    console.log('当前路由信息')
  })

  return (
    //  antd 全局化配置
    <ConfigProvider prefixCls={SystemConfig.prefixCls}>
      <div className="placeholder"></div>
      {!checkSiteShow && <Header />}
      <Outlet />
    </ConfigProvider>
  )
}

export default App
