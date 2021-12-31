const fs = require('fs-extra')
import path from 'path'
const execa = require('execa') // 开启子进程打包
const { logger } = require('./utils')
import { SystemConfig } from '../src/config/themeConfig'

const pathResolve = dir => path.resolve(__dirname, dir)

// 获取scripts 参数
const args = require('minimist')(process.argv.slice(2))

// 按流程 执行构建脚本
main()

async function main() {
  await execa('tsc')

  logger.ln()
  logger.info('tsc 编译完毕')
  logger.ln()

  await execa('babel-node', ['esbuild.config.js'])

  logger.ln()
  logger.info('esbuild 构建 chrome extension 脚本完毕')
  logger.ln()

  await execa('lessc', [
    '--js',
    `-modify-var=ant-prefix=${SystemConfig.prefixCls}`,
    'node_modules/antd/dist/antd.variable.less',
    'src/antd.custom.css'
  ]).catch(e => {
    logger.error('lessc error : ' + e)
  })

  logger.ln()
  logger.info('生成自定义前缀的antd variable文件成功 :' + SystemConfig.prefixCls)
  logger.ln()

  await execa('vite', ['build'], {
    stdio: 'inherit' // 展示过程
  }).catch(e => {
    logger.error('vite error: ' + e)
  })

  logger.ln()
  logger.info('vite 构建成功')
  logger.ln()
}
