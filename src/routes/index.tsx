import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from "@/App"
import { SiteShow, None, Nop } from '@/pages/index'

function SelfRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<App />} >
          <Route index element={< SiteShow />} />
          <Route path="*" element={< Nop />} />
        </Route>


        <Route path="*" element={<None />} />
      </Routes>
    </BrowserRouter>
  )
}

export default SelfRoutes
