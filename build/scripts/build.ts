const fs = require('fs-extra')
import path from 'path'
const execa = require('execa') // 开启子进程打包
const { logger } = require('../utils')
import { SystemConfig } from '@/enums/themeConfig'
import adapter from './adapter'
import dayjs from 'dayjs'

const pathResolve = dir => path.resolve(__dirname, dir)

// 获取scripts 参数 --- 只有写在scripts 内才能获取； 而npm_config_adapter必须在调用scripts时且使用npm/cnpm包管理器才能够自动生成
const args = require('minimist')(process.argv.slice(2))

// 按流程 执行构建脚本
main()

async function main() {
  const startTime = Date.now()

  await execa('rimraf', [`dist/${adapter.platform}/**`])
  logger.ci('清除dist文件成功')

  await execa('tsc')
  logger.ci('tsc 编译完毕')

  if (!adapter.platform || !adapter.rightPlatform) {
    // 异常处理
    logger.error('请以 --adapter=[chrome|firefox|utools]的格式进行设置')
    process.exit(1)
  }

  // 编译antd 样式主题文件
  await execa('lessc', [
    '--js',
    `-modify-var=ant-prefix=${SystemConfig.prefixCls}`,
    'node_modules/antd/dist/antd.variable.less',
    'src/antd.custom.css'
  ]).catch(e => {
    logger.error('lessc error : ' + e)
  })
  logger.ci(`生成自定义前缀( ${SystemConfig.prefixCls} )的antd variable文件成功`)

  // vite 构建 React主体程序
  await execa('vite', ['build'], {
    stdio: 'inherit' // 展示运行过程
  }).catch(e => {
    logger.error('vite error: ' + e)
  })

  // 执行复制manifest.json到对应目录
  adapter.initialize()

  // vite 构建 background
  await execa('vite', ['build', '--config', 'vite.config.back.ts'], {
    stdio: 'inherit' // 展示运行过程
  }).catch(e => {
    logger.error('vite error: ' + e)
  })

  // vite 构建 content
  await execa('vite', ['build', '--config', 'vite.config.content.ts'], {
    stdio: 'inherit' // 展示运行过程
  }).catch(e => {
    logger.error('vite error: ' + e)
  })

  // esbuild 构建 需要注入的样式文件
  await execa('babel-node', ['esbuild.config.js'])
  logger.ci('esbuild 构建 extension 所需脚本完毕')

  const useTime = (Date.now() - startTime) / 1000
  logger.cs('vite 构建成功 : ' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '； 总用时：' + useTime + '秒')
}
