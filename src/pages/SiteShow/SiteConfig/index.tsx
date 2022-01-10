import React, { useState } from 'react'
import './index.scss'
import { SketchPicker } from 'react-color'
import { SystemConfig } from '@/config/themeConfig'
import { ConfigProvider } from 'antd'

export default function SiteConfig() {
  const [color, setColor] = useState(SystemConfig.theme)

  const onColorChange = nextColor => {
    const mergedColor = {
      ...color,
      ...nextColor
    }

    setColor(mergedColor)

    ConfigProvider.config({
      theme: mergedColor
    })
  }

  return (
    <div className="flex justify-center p-20px">
      <div className="w-600px">
        <div className="flex">
          {/* 默认颜色 */}
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
