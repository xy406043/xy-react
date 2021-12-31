import React from 'react'
import './index.scss'
import { Button } from 'antd'

export default function SiteHistory() {
  return (
    <div className="site-history mt-40px">
      <Button type="primary">确认</Button>
      <Button type="dashed" className="ml-20px" danger>
        警告
      </Button>
    </div>
  )
}
