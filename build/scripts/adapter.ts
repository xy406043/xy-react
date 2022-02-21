const fs = require('fs')
const path = require('path')
import { logger } from '../utils'
import chalk from 'chalk'
import { PlatFormEnum } from '../../src/enums/adapterEnum'

/**
 * 平台处理文件，只用于构建脚本。
 * 不可在执行vite后使用，因构建后是 Es6 无法识别 require等cjs写法
 * 此文件有被vite.config.ts使用，不可设置别名
 */

// 平台处理
const platform = (process.env.npm_config_adapter ? process.env.npm_config_adapter : '') as string
const IS_CHROME = platform === 'chrome'

// 删除文件
const removeFile = filePath => {
  fs.existsSync(filePath) && fs.unlinkSync(filePath)
}

const chromeConfigWrite = {
  remove() {},
  write() {
    fs.writeFileSync(
      path.join(__dirname, '../../public/manifest.json'),
      fs
        .readFileSync(path.join(__dirname, `../../src/adapter/${platform}/manifest.json`))
        .toString()
        .replace(/##version##/g, process.env.npm_package_version)
    )

    logger.ln()
    console.log(`${chalk.bgBlue.black(' IN ')} ${chalk.magenta('迁移' + platform + '配置文件成功')}`)
    logger.ln()
  }
}

export default {
  version: process.env.npm_package_version,
  platform,
  rightPlatform: PlatFormEnum[platform],
  isChrome: IS_CHROME,
  initialize: function () {
    // 移除配置文件
    chromeConfigWrite.remove()
    // 添加配置文件
    chromeConfigWrite.write()
  }
}
