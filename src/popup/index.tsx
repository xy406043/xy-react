import React from 'react'
import ReactDOM from 'react-dom'

import SiteShow from './SiteShow'

import 'antd/dist/antd.variable.min.css'
import '@/antd.custom.css' // 这样引用 不能在rollupOptions的external中排除编译
import 'uno.css'
import './styles/index.css'

ReactDOM.render(<SiteShow />, document.getElementById('xy-popup'))
