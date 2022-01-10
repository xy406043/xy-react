import React, { useState } from 'react'
import {} from 'antd'
import PropTypes from 'prop-types'
import { copyText } from '@/utils/util'

interface Props {
  urls: Array<string>
}

function SiteImgShow({ urls }: Props) {
  return (
    <div className="flex flex-col h-180px overflow-y-scroll">
      {urls.map((item, index) => {
        return (
          <img
            key={index}
            className="mb10px w-80px h-80px cursor-pointer object-contain"
            src={item}
            onClick={() => copyText(item, '复制图片链接成功')}
          />
        )
      })}
    </div>
  )
}

export default SiteImgShow
