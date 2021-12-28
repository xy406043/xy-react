const fs = require('fs-extra')
const path = require('path')
const execa = require('execa') // 开启子进程打包
const { logger } = require('./utils')

// 获取scripts 参数
const args = require('minimist')(process.argv.slice(2))

// 按流程 执行构建脚本
main()

async function main() {
  // 执行 rollup 构建命令
  await execa('rollup', ['-c'], {
    stdio: 'inherit'
  })

  logger.ln()
  logger.info('执行rollup 构建完毕')
  logger.ln()
}
