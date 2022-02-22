import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Router from './routes/index'
import 'antd/dist/antd.variable.min.css'
import '@/antd.custom.css' // 这样引用 不能在rollupOptions的external中排除编译
import 'uno.css'

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
)
