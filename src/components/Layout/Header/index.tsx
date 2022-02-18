import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

export default function Header() {
  return (
    <div className="xy-header flex items-center justify-center">
      <Link to="History">页面历史</Link>
      <Link to="SiteConfig" className="ml-40px">
        页面设置
      </Link>
      <Link to="SiteTest" className="ml-40px">
        其它
      </Link>
    </div>
  )
}
