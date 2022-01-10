const fs = require('fs')
const path = require('path')
import { PlatFormEnum } from '@/enums/adapterEnum'

// 平台处理
const platform = (process.env.hasOwnProperty('xy_adapter') ? process.env.xy_adapter : '') as string

const IS_CHROME = platform === 'chrome'

// 删除文件
const removeFile = filePath => {
  fs.existsSync(filePath) && fs.unlinkSync(filePath)
}

const chromeConfigWrite = {
  remove() {},
  write() {
    console.log('执行迁移。。。')
    fs.writeFileSync(
      path.join(__dirname, '../../public/manifest.json'),
      fs
        .readFileSync(path.join(__dirname, '../adapter/chrome/manifest.json'))
        .toString()
        .replace(/##version##/g, process.env.npm_package_version)
    )
  }
}

export default {
  isChrome: IS_CHROME,
  initialize: function () {
    // 移除配置文件
    chromeConfigWrite.remove()
    // 添加配置文件
    chromeConfigWrite.write()
  }
}
