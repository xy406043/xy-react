import React, { useState, useEffect } from 'react'
import './index.scss'
import { SketchPicker } from 'react-color'
import { SystemConfig } from '@/enums/themeConfig'
import { ConfigProvider, Form } from 'antd'
import { catchLocalTheme } from '@/utils/themeUtil'
import db from '~/src/utils/adapter/db'

export default function SiteConfig() {
  const [color, setColor] = useState(SystemConfig.theme)

  // form布局
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  // 获取本地设置的主题色 或者 默认的主题色
  const getThemeConfig = async () => {
    const theme: any = await catchLocalTheme()
    const localTheme = theme || SystemConfig.theme
    setColor(localTheme)
  }

  //  设置项发生变化时，更新本地存储内容
  const onColorChange = nextColor => {
    const mergedColor = {
      ...color,
      ...nextColor
    }

    setColor(mergedColor)
    console.log('SiteConfig设置React展示的内容的Antd 主题配置', mergedColor)
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
      <Form className="w-600px" {...layout}>
        <Form.Item className="flex" label="主题默认颜色">
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
        </Form.Item>
        <Form.Item className="flex" label="消息颜色">
          {/* // 消息显示颜色 */}
          <SketchPicker
            presetColors={['#1890ff', '#25b864', '#ff6f00']}
            color={color.infoColor}
            onChange={({ hex }) => {
              onColorChange({
                infoColor: hex
              })
            }}
          />
        </Form.Item>
      </Form>
    </div>
  )
}
