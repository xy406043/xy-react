import React from 'react'
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'

import App from '@/App'
import { SiteShow, None, Nop } from '@/pages/index'

function SelfRoutes() {
  return (
    <HashRouter>
      <Routes>
        {/* // 使用 HashRouter模式才能够默认构建生效*/}
        <Route path="/" element={<SiteShow />}></Route>
      </Routes>
    </HashRouter>

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<SiteShow />}></Route>

    //     {/* //  BrowserRouter 模式 这种形式也无法构建SiteShow页面,如果加上Nop 默认页面也会变成Nop */}
    //     {/* <Route path="/" element={<SiteShow />}></Route> */}
    //     {/* <Route path="*" element={<Nop />} /> */}

    //     {/* // BrowRouter 模式 使用以下的形式，构建到chrome插件中， 默认目录一直都是 Nop 页面 */}
    //     {/* <Route path="/" element={<App />}>
    //       <Route index element={<SiteShow />} />
    //       <Route path="*" element={<Nop />} />
    //     </Route>
    //     <Route path="*" element={<None />} /> */}
    //   </Routes>
    // </BrowserRouter>
  )
}

export default SelfRoutes
