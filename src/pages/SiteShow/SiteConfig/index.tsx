import React, { useState, useEffect } from 'react'
import './index.scss'
import { SketchPicker } from 'react-color'
import { SystemConfig } from '@/config/themeConfig'
import { ConfigProvider } from 'antd'
import { catchLocalTheme } from '@/utils/themeUtil'
import db from '@/adapterTool/db'

export default function SiteConfig() {
  const [color, setColor] = useState(SystemConfig.theme)

  // 获取本地设置的主题色 或者 默认的主题色
  const getThemeConfig = () => {
    // TODO 调整db方法
    const localTheme = SystemConfig.theme
    setColor(localTheme)
  }

  //  设置项发生变化时，更新本地存储内容
  const onColorChange = nextColor => {
    const mergedColor = {
      ...color,
      ...nextColor
    }

    setColor(mergedColor)
    db.set('XyLocalThemeConfig', mergedColor)
    ConfigProvider.config({
      theme: mergedColor
    })
  }

  useEffect(() => {
    getThemeConfig()
  }, [])

  return (
    <div className="flex justify-center p-20px">
      <div className="w-600px">
        <div className="flex">
          {/* // 默认颜色 */}
          <SketchPicker
            presetColors={['#1890ff', '#25b864', '#ff6f00']}
            color={color.primaryColor}
            onChange={({ hex }) => {
              onColorChange({
                primaryColor: hex
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}
