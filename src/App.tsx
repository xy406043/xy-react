import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { SystemConfig } from '@/config/themeConfig'
import Header from './components/Layout/Header'
import { catchLocalTheme } from '@/utils/themeUtil'

function App() {
  const location = useLocation()
  const singleRoutes = ['/', '/XyCameraShow']
  // 单独的页面隐藏掉顶部的目录栏
  const checkSiteShow = singleRoutes.includes(location.pathname)

  useEffect(() => {
    ConfigProvider.config({
      prefixCls: SystemConfig.prefixCls, // 需同时设置 下面的prefixCls 并生成对应prefix的css文件并引入
      theme: catchLocalTheme()
    })
  })

  return (
    //  antd 全局化配置
    <ConfigProvider prefixCls={SystemConfig.prefixCls}>
      {!checkSiteShow && (
        <div>
          <div className="placeholder"></div>
          <Header />
        </div>
      )}
      <Outlet />
    </ConfigProvider>
  )
}

export default App
