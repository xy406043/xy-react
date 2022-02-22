import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Router from './routes/index'
import 'antd/dist/antd.variable.min.css'
import './antd.custom.css' // 引入的静态资源必须同main.tsx
import 'uno.css'

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
)
