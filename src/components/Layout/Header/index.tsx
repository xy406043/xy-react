import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

export default function Header() {
  return (
    <div className="xy-header flex items-center justify-center">
      <Link to="/">Invoices</Link>
      <Link to="SiteConfig" className="ml-40px">
        Team
      </Link>
    </div>
  )
}
